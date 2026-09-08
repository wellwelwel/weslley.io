const OUTPUT = 'server';

/* Workers leave import.meta.url undefined, which createRequire rejects. */
export const buildWorker = async (): Promise<void> => {
  await Bun.build({
    entrypoints: ['worker/index.ts'],
    outdir: OUTPUT,
    naming: 'index.js',
    target: 'node',
    format: 'esm',
    minify: true,
    external: ['cloudflare:workers'],
    define: { 'import.meta.url': '"file:///index.js"' },
  });

  await Bun.write(`${OUTPUT}/wrangler.jsonc`, Bun.file('wrangler.prod.jsonc'));
};

if (import.meta.main) buildWorker();
