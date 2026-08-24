import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

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

const MANIFEST = 'client-manifest.json';
const REGISTRY = 'registry.js';
const ROUTE_SCRIPTS = 'route-scripts';

/** Pairs each chunk name with the module path its route asks for. */
const ENTRY =
  /^\s*"(?<chunk>[^"]+)": \[\(\) => import\([^)]*\), "(?<module>[^"]+)"/gm;

export const isManifest = (value: unknown): value is Manifest => {
  if (typeof value !== 'object' || value === null || !('origins' in value))
    return false;

  const { origins } = value;

  return typeof origins === 'object' && origins !== null;
};

export const manifestOf = (plugin: unknown): string | undefined => {
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

export const aliasesOf = (
  registry: string,
  origins: Manifest['origins']
): Alias[] =>
  [...registry.matchAll(ENTRY)].flatMap(({ groups }) => {
    const assets = groups?.chunk ? origins[groups.chunk] : undefined;

    return assets && groups?.module && !origins[groups.module]
      ? [{ module: groups.module, assets }]
      : [];
  });

/* The server looks the manifest up by module path. */
const restore = async (path: string): Promise<void> => {
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

export const routeScripts = {
  apply: (compiler: Compiler) => {
    compiler.hooks.afterEmit.tapPromise(ROUTE_SCRIPTS, async () => {
      const path = compiler.options.plugins.reduce<string | undefined>(
        (found, plugin) => found ?? manifestOf(plugin),
        undefined
      );

      if (path) await restore(path);
    });
  },
};
