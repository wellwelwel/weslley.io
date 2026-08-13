import type { ConfigureWebpackUtils, PostCssOptions } from '@docusaurus/types';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { env } from 'node:process';

type Resource = {
  request: string;
  context?: string;
};

type Manifest = {
  origins: Record<string, string[]>;
};

type Alias = {
  module: string;
  assets: string[];
};

type Compiler = {
  options: { plugins: unknown[] };
  hooks: {
    afterEmit: {
      tapPromise: (name: string, callback: () => Promise<void>) => void;
    };
  };
};

const STYLESHEET = /\.(css|scss|sass)$/i;

/* Two theme client modules go silent. The Prism register drags
   prism-react-renderer into every page's entry bundle, so it lives in
   src/theme/CodeBlock instead. The nprogress bar depends on a stylesheet this
   config strips, so the module animates something that never renders. */
const SILENCED =
  /theme-classic[\\/]lib[\\/](?:prism-include-languages|nprogress)(\.js)?$/;

const SITE = '@site/';

const MANIFEST = 'client-manifest.json';
const REGISTRY = 'registry.js';
const ROUTE_SCRIPTS = 'route-scripts';

/** Each entry pairs the chunk name with the module path the route asks for. */
const ENTRY =
  /^\s*"(?<chunk>[^"]+)": \[\(\) => import\([^)]*\), "(?<module>[^"]+)"/gm;

const home = resolve(__dirname, 'src/css/tailwind.css');
const empty = resolve(__dirname, 'tools/reset/empty.ts');

const chained = (request: string) => request.includes('!');

const locate = ({ request, context = __dirname }: Resource) =>
  request.startsWith(SITE)
    ? resolve(__dirname, request.slice(SITE.length))
    : resolve(context, request);

const strip = (resource: Resource) => {
  if (chained(resource.request) || locate(resource) === home) return;

  resource.request = empty;
};

const silence = (resource: Resource) => {
  resource.request = empty;
};

const isManifest = (value: unknown): value is Manifest => {
  if (typeof value !== 'object' || value === null || !('origins' in value))
    return false;

  const { origins } = value;

  return typeof origins === 'object' && origins !== null;
};

const manifestOf = (plugin: unknown): string | undefined => {
  if (typeof plugin !== 'object' || plugin === null || !('options' in plugin))
    return undefined;

  const { options } = plugin;

  if (
    typeof options !== 'object' ||
    options === null ||
    !('filename' in options)
  )
    return undefined;

  const { filename } = options;

  return typeof filename === 'string' && filename.endsWith(MANIFEST)
    ? filename
    : undefined;
};

const aliasesOf = (registry: string, origins: Manifest['origins']): Alias[] =>
  [...registry.matchAll(ENTRY)].flatMap(({ groups }) => {
    const assets = groups?.chunk ? origins[groups.chunk] : undefined;

    return assets && groups?.module && !origins[groups.module]
      ? [{ module: groups.module, assets }]
      : [];
  });

/* The server reports the module path a route loaded, while this bundler keys the
   loadable manifest by chunk name, so every lookup misses and no route script
   ever reaches the HTML. Aliasing one onto the other hands each page its own
   scripts up front instead of leaving them for the runtime to discover. */
const restoreRouteScripts = async (path: string): Promise<void> => {
  const [manifest, registry] = await Promise.all([
    readFile(path, 'utf8'),
    readFile(join(dirname(path), REGISTRY), 'utf8'),
  ]);

  const parsed: unknown = JSON.parse(manifest);

  if (!isManifest(parsed)) return;

  const aliases = aliasesOf(registry, parsed.origins);

  if (!aliases.length) return;

  await writeFile(
    path,
    JSON.stringify({
      ...parsed,
      origins: {
        ...parsed.origins,
        ...Object.fromEntries(
          aliases.map(({ module, assets }) => [module, assets])
        ),
      },
    })
  );
};

const routeScripts = {
  apply(compiler: Compiler) {
    compiler.hooks.afterEmit.tapPromise(ROUTE_SCRIPTS, async () => {
      const path = compiler.options.plugins.reduce<string | undefined>(
        (found, plugin) => found ?? manifestOf(plugin),
        undefined
      );

      if (path) await restoreRouteScripts(path);
    });
  },
};

export default () => {
  return {
    name: 'custom-webpack-config',
    configurePostCss(postCssOptions: PostCssOptions) {
      postCssOptions.plugins.push(require('@tailwindcss/postcss'));

      return postCssOptions;
    },
    configureWebpack(
      _config: unknown,
      isServer: boolean,
      { currentBundler }: ConfigureWebpackUtils
    ) {
      const patching = !isServer && env.NODE_ENV === 'production';

      return {
        plugins: [
          new currentBundler.instance.NormalModuleReplacementPlugin(
            STYLESHEET,
            strip
          ),
          new currentBundler.instance.NormalModuleReplacementPlugin(
            SILENCED,
            silence
          ),
          ...(patching ? [routeScripts] : []),
        ],
        resolve: {
          alias: {
            '@site': resolve(__dirname),
            '@Modal': resolve(__dirname, 'src/components/Modal'),
            '@Side': resolve(__dirname, 'src/components/Side'),
            '@Moments': resolve(__dirname, 'src/components/Moments'),
            '@Keynote': resolve(__dirname, 'src/components/Keynote'),
          },
        },
        ...(isServer
          ? {}
          : {
              optimization: {
                splitChunks: {
                  cacheGroups: {
                    prism: {
                      test: /[\\/]node_modules[\\/](?:prism-react-renderer|prismjs)[\\/]/,
                      chunks: 'async',
                      minChunks: 2,
                      priority: 45,
                      reuseExistingChunk: true,
                      name: 'prism',
                    },
                  },
                },
              },
            }),
      };
    },
  };
};
