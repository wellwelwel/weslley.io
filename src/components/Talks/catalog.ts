import type { Author } from '@site/src/@types/article';
import type { SideConfig } from '@site/src/@types/side';
import type { ComponentType } from 'react';
import { sources } from '@generated/mount-home/default/talks';

export type Talk = {
  Content: ComponentType;
  title: string | null;
  authors: Author[];
  sides: SideConfig[];
  banner: string | null;
};

type Module = {
  default: ComponentType;
  frontMatter: Record<string, unknown>;
};

export type Source = {
  content: () => Promise<Module>;
  authors: Author[];
  banner?: () => Promise<{ default: string }>;
};

const isSide = (value: unknown): value is SideConfig =>
  typeof value === 'object' &&
  value !== null &&
  'id' in value &&
  typeof value.id === 'string' &&
  'label' in value &&
  typeof value.label === 'string' &&
  (!('description' in value) || typeof value.description === 'string');

const unwrap = async ({ content, authors, banner }: Source): Promise<Talk> => {
  const [{ default: Content, frontMatter }, image] = await Promise.all([
    content(),
    banner?.(),
  ]);
  const { title, sides } = frontMatter;

  return {
    Content,
    title: typeof title === 'string' ? title : null,
    authors,
    sides: Array.isArray(sides) ? sides.filter(isSide) : [],
    banner: image?.default ?? null,
  };
};

export const talks = new Map(
  [...sources].map(([slug, source]): [string, () => Promise<Talk>] => [
    slug,
    () => unwrap(source),
  ])
);
