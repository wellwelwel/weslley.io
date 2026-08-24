import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

type Keep = (name: string) => boolean;

export const walk = async (dir: string, keep: Keep): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true });

  const found = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);

      if (entry.isDirectory()) return walk(path, keep);

      return keep(entry.name) ? [path] : [];
    })
  );

  return found.flat();
};
