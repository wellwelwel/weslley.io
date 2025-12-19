import type { AuthorsMap } from '../src/@types/article';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parse } from 'yaml';

export const loadAuthors = async (locale: string): Promise<AuthorsMap> => {
  const authorsPath = resolve(`./i18n/${locale}/articles/authors.yml`);
  const content = await readFile(authorsPath, 'utf-8');

  return parse(content) as AuthorsMap;
};
