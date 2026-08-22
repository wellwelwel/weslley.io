import type { SideConfig } from '@site/src/@types/side';
import type { ComponentType } from 'react';

export type Talk = {
  Content: ComponentType;
  sides: SideConfig[];
  banner: string;
};

type Module = {
  default: ComponentType;
  frontMatter: Record<string, unknown>;
};

type Source = {
  content: () => Promise<Module>;
  banner: () => Promise<{ default: string }>;
};

const isSide = (value: unknown): value is SideConfig =>
  typeof value === 'object' &&
  value !== null &&
  'id' in value &&
  typeof value.id === 'string' &&
  'label' in value &&
  typeof value.label === 'string';

const unwrap = async ({ content, banner }: Source): Promise<Talk> => {
  const [{ default: Content, frontMatter }, image] = await Promise.all([
    content(),
    banner(),
  ]);
  const { sides } = frontMatter;

  return {
    Content,
    sides: Array.isArray(sides) ? sides.filter(isSide) : [],
    banner: image.default,
  };
};

/** Keyed by the slug the talk pages always had, so the old links keep working. */
export const talks = new Map<string, () => Promise<Talk>>([
  [
    'codecon-summit-embrace-the-hacker-way',
    () =>
      unwrap({
        content: () =>
          import(
            /* webpackChunkName: "talk-codecon-summit-2025" */ '@site/i18n/pt-BR/talks/2025/07/19/codecon-summit.mdx'
          ),
        banner: () =>
          import(
            /* webpackChunkName: "talk-codecon-summit-2025" */ '@site/i18n/pt-BR/talks/2025/07/19/banner.jpeg'
          ),
      }),
  ],
  [
    'mvp-conf-2025-brasil',
    () =>
      unwrap({
        content: () =>
          import(
            /* webpackChunkName: "talk-mvp-conf-2025" */ '@site/i18n/pt-BR/talks/2025/10/25/mvpconf.mdx'
          ),
        banner: () =>
          import(
            /* webpackChunkName: "talk-mvp-conf-2025" */ '@site/i18n/pt-BR/talks/2025/10/25/banner.jpeg'
          ),
      }),
  ],
]);
