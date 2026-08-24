import type { SideConfig } from '@site/src/@types/side';
import type { ComponentType, ReactNode } from 'react';

export type Author = {
  name: string;
  title: string;
  url: string;
  image_url: string;
};

export type AuthorsMap = Record<string, Author>;

export type ArticleRoute = 'articles';

export type ArticlesOptions = {
  route: ArticleRoute;
  description?: string;
  children?: ReactNode;
};

export type ArticleFrontMatter = {
  title: string;
  slug?: string;
  date: string;
  authors: string[];
  tags: string[];
  social?: string;
  sides?: SideConfig[];
  order?: number;
};

export type ArticleNavigation = {
  title: string;
  path: string;
  description: string | null;
  social?: string;
};

/** `slug` is the counter key, `path` the route segment. */
export type FoundArticle = Omit<ArticleFrontMatter, 'slug'> & {
  slug: string;
  path: string;
  content: string;
  filePath: string;
  mdxPath: string;
  summary: SummaryItem[];
  description: string | null;
  socialPath?: string;
  readingTime: number;
  lastModified?: string;
};

export type ProcessedArticle = FoundArticle & {
  route: string;
  authorsData: Author[];
  previousArticle?: ArticleNavigation;
  nextArticle?: ArticleNavigation;
};

export type ArticleListing = Pick<
  ProcessedArticle,
  | 'title'
  | 'slug'
  | 'path'
  | 'date'
  | 'description'
  | 'readingTime'
  | 'lastModified'
  | 'tags'
  | 'order'
  | 'social'
  | 'mdxPath'
>;

export type ArticlePageOptions = {
  data: ProcessedArticle;
  content: ComponentType;
  social?: string;
  previousSocial?: string;
  nextSocial?: string;
};

export type SummaryItem = {
  text: string;
  level: number;
  items: SummaryItem[];
};
