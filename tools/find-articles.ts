import type { ArticleFrontMatter, FoundArticle } from '../src/@types/article';
import { readFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { extractDescription } from './extract-description';
import { extractSummary } from './extract-summary';
import { matter } from './front-matter';
import { getGitLastModified } from './git-last-modified';
import { calculateReadingTime } from './reading-time';
import { walk } from './walk';

const MARKDOWN = /\.mdx?$/;

const slugOf = (data: ArticleFrontMatter): string =>
  (data.slug || data.title)
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[()—]/g, '')
    .replace(/\s+/g, '-');

const read = async (file: string): Promise<FoundArticle> => {
  const { data, content } = matter<ArticleFrontMatter>(
    await readFile(file, 'utf8')
  );
  const slug = slugOf(data);
  const lastModified = await getGitLastModified(file);
  const socialPath = data.social ? join(dirname(file), data.social) : undefined;

  return {
    title: data.title,
    order: data.order,
    slug,
    path: encodeURIComponent(slug).replace(/%/g, ''),
    date: data.date,
    authors: data.authors || [],
    tags: data.tags || [],
    content,
    filePath: basename(file),
    mdxPath: file,
    summary: extractSummary(content),
    description: extractDescription(content),
    social: data.social,
    socialPath,
    readingTime: calculateReadingTime(content),
    ...(lastModified && { lastModified }),
    ...(data.sides && { sides: data.sides }),
  };
};

export const findArticles = async (dir: string): Promise<FoundArticle[]> =>
  Promise.all((await walk(dir, (name) => MARKDOWN.test(name))).map(read));
