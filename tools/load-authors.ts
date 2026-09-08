import type { AuthorsMap } from '../src/@types/article';
import { resolve } from 'node:path';
import { parse } from 'yaml.min';

export const loadAuthors = async (locale: string): Promise<AuthorsMap> => {
  const authorsPath = resolve(`./i18n/${locale}/articles/authors.yml`);

  return parse(await Bun.file(authorsPath).text());
};
