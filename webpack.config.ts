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

const UTILS_COMMON = /^@docusaurus\/utils-common$/;

/** Registered from src/theme/CodeBlock instead, off the entry bundle. */
const PRISM_REGISTER =
  /theme-classic[\\/]lib[\\/]prism-include-languages(\.js)?$/;

/** Animates a stylesheet this config strips. */
const NPROGRESS = /theme-classic[\\/]lib[\\/]nprogress(\.js)?$/;

const SITE = '@site/';

const MANIFEST = 'client-manifest.json';
const REGISTRY = 'registry.js';
const ROUTE_SCRIPTS = 'route-scripts';

/** Pairs each chunk name with the module path its route asks for. */
const ENTRY =
  /^\s*"(?<chunk>[^"]+)": \[\(\) => import\([^)]*\), "(?<module>[^"]+)"/gm;

const home = resolve(__dirname, 'src/css/tailwind.css');
const empty = resolve(__dirname, 'tools/reset/empty.ts');
const utilsCommon = resolve(__dirname, 'tools/reset/utils-common.ts');

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

/* The package's ESM deep files carry no tslib. */
const lighten = (resource: Resource) => {
  resource.request = utilsCommon;
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

/* The server looks the manifest up by module path. */
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
            PRISM_REGISTER,
            silence
          ),
          new currentBundler.instance.NormalModuleReplacementPlugin(
            NPROGRESS,
            silence
          ),
          ...(isServer
            ? []
            : [
                new currentBundler.instance.NormalModuleReplacementPlugin(
                  UTILS_COMMON,
                  lighten
                ),
              ]),
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
                    slots: {
                      test: /[\\/]src[\\/]components[\\/]Agenda[\\/]slots\.ts$/,
                      chunks: 'async',
                      minChunks: 2,
                      minSize: 0,
                      priority: 40,
                      reuseExistingChunk: true,
                      name: 'slots',
                    },
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
