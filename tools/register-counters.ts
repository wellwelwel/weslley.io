import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);

const create = async (key: string): Promise<void> => {
  try {
    await run('countty', ['create', key]);
  } catch {}
};

export const registerCounters = async (keys: string[]): Promise<void> => {
  await Promise.all(
    keys.flatMap((key) => [create(key), create(`${key}:like`)])
  );
};
