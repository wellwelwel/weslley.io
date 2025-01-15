import { FC } from 'react';

export const dynamicRequire = (
  context: __WebpackModuleApi.RequireContext
): FC[] =>
  context
    .keys()
    .sort()
    .map((path) => context(path).default);

type LocalizedImports<T> = {
  [locale: string]: T;
};

export const dynamicImport = <T>(
  locale: string,
  imports: LocalizedImports<T>
): T => {
  if (locale in imports) {
    return imports[locale];
  }
  throw new Error(`No import found for locale: ${locale}`);
};
