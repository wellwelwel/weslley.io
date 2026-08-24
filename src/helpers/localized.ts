import type { FC } from 'react';

type Contexts = Record<string, __WebpackModuleApi.RequireContext>;

export const forLocale = <T>(locale: string, values: Record<string, T>): T => {
  const value = values[locale];

  if (!value) throw new Error(`Nothing localized for: ${locale}`);

  return value;
};

export const localized = (locale: string, contexts: Contexts): FC[] => {
  const context = forLocale(locale, contexts);

  return context
    .keys()
    .sort()
    .map((path) => context(path).default);
};

export const anchors = (locale: string): FC[] =>
  localized(locale, {
    'pt-BR': require.context(
      '@site/i18n/pt-BR/anchors',
      false,
      /\.(tsx|jsx|mdx)$/
    ),
  });
