import type { ProcessedArticle } from '../src/@types/article';
import { exec } from 'node:child_process';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, extname, join } from 'node:path';
import { promisify } from 'node:util';
import config from '../docusaurus.config';
import { extractDescription } from './extract-description';
import { extractSummary } from './extract-summary';
import { matter } from './front-matter';
import { getGitLastModified } from './git-last-modified';
import { calculateReadingTime } from './reading-time';

const execAsync = promisify(exec);

export const findArticles = async (
  dir: string
): Promise<ProcessedArticle[]> => {
  const articles: ProcessedArticle[] = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      const subArticles = await findArticles(fullPath);

      articles.push(...subArticles);
      continue;
    }

    if (entry.isFile()) {
      const ext = extname(entry.name);
      if (ext !== '.mdx' && ext !== '.md') continue;

      const fileContent = await readFile(fullPath, 'utf8');
      const { data, content } = matter<ProcessedArticle>(fileContent);
      const slug = (data.slug || data.title)
        .toLocaleLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[()—]/g, '')
        .replace(/\s+/g, '-');

      // Create Countty slug
      if (config.customFields?.showViewsCounter) {
        execAsync(`countty create "${slug}"`).catch(() => {});
        execAsync(`countty create "${slug}:like"`).catch(() => {});
        execAsync(`countty create "${slug}:love"`).catch(() => {});
        execAsync(`countty create "${slug}:insightful"`).catch(() => {});
      }

      const socialPath: string | undefined = data.social
        ? join(dirname(fullPath), data.social)
        : undefined;

      const lastModified = await getGitLastModified(fullPath);

      articles.push({
        title: data.title,
        slug: encodeURIComponent(slug),
        date: data.date,
        authors: data.authors || [],
        tags: data.tags || [],
        content,
        filePath: entry.name,
        mdxPath: fullPath,
        summary: extractSummary(content),
        description: extractDescription(content),
        social: data.social,
        socialPath,
        readingTime: calculateReadingTime(content),
        ...(lastModified ? { lastModified } : Object.create(null)),
        ...(data.sides ? { sides: data.sides } : Object.create(null)),
      });
    }
  }

  return articles;
};
