import { FC } from 'react';

type LocalizedImports<T> = {
  [locale: string]: T;
};

export const dynamicRequire = (
  context: __WebpackModuleApi.RequireContext
): FC[] =>
  context
    .keys()
    .sort()
    .map((path) => context(path).default);

export const dynamicImport = <T>(
  locale: string,
  imports: LocalizedImports<T>
): T => {
  if (locale in imports) return imports[locale];

  throw new Error(`No import found for locale: ${locale}`);
};
