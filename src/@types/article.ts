import type { ComponentType } from 'react';
import type { SideConfig } from './side';

export type AuthorSocials = {
  linkedin?: string;
  github?: string;
  instagram?: string;
  youtube?: string;
};

export type Author = {
  name: string;
  title: string;
  url: string;
  image_url: string;
  socials: AuthorSocials;
};

export type AuthorsMap = Record<string, Author>;

export type ArticleFrontMatter = {
  title: string;
  slug?: string;
  date: string;
  authors: string[];
  tags: string[];
  social?: string;
  sides?: SideConfig[];
};

export type ArticleNavigation = {
  title: string;
  slug: string;
  description: string | null;
  social?: string;
};

export type ProcessedArticle = ArticleFrontMatter & {
  route: 'articles' | 'talks';
  content: string;
  filePath: string;
  mdxPath: string;
  summary: SummaryItem[];
  description: string | null;
  socialPath?: string;
  readingTime: number;
  lastModified?: string;
  authorsData: Author[];
  previousArticle?: ArticleNavigation;
  nextArticle?: ArticleNavigation;
  order?: number;
};

export type ArticlePageProps = {
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
