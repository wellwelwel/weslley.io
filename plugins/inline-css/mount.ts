import type { LoadContext, Plugin } from '@docusaurus/types';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

type PluginOptions = {
  pluginName: string;
};

const STYLESHEET = /<link rel=stylesheet href=([^ >]{1,300}) \/>/;

const local = (href: string): boolean =>
  href.startsWith('/assets/css/') && href.endsWith('.css');

const pages = async (dir: string): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true });

  const found = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? pages(join(dir, entry.name))
        : entry.name.endsWith('.html')
          ? [join(dir, entry.name)]
          : []
    )
  );

  return found.flat();
};

/* Inlining the one small stylesheet beats its render-blocking round trip. */
export default (
  _context: LoadContext,
  options: PluginOptions
): Plugin<undefined> => ({
  name: options.pluginName,
  postBuild: async ({ outDir }) => {
    const sheets = new Map<string, string>();

    const inline = async (file: string): Promise<void> => {
      const html = await readFile(file, 'utf8');
      const match = html.match(STYLESHEET);

      if (!match || !local(match[1])) return;

      const [link, href] = match;

      if (!sheets.has(href))
        sheets.set(href, await readFile(join(outDir, href), 'utf8'));

      await writeFile(
        file,
        html.replace(link, `<style>${sheets.get(href)}</style>`)
      );
    };

    const files = await pages(outDir);

    await Promise.all(files.map(inline));
  },
});
