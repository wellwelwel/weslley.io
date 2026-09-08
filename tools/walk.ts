import { basename, join } from 'node:path';

type Keep = (name: string) => boolean;

const ALL = new Bun.Glob('**/*');

export const walk = async (dir: string, keep: Keep): Promise<string[]> => {
  const found: string[] = [];

  for await (const path of ALL.scan({ cwd: dir, onlyFiles: true }))
    if (keep(basename(path))) found.push(join(dir, path));

  return found;
};
