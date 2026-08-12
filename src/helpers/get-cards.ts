import {
  dynamicImport,
  dynamicRequire,
} from '@site/src/helpers/dynamic-require';

export const cards = (locate: string) =>
  dynamicRequire(
    dynamicImport(locate, {
      'pt-BR': require.context(
        '@site/i18n/pt-BR/cards',
        false,
        /\.(tsx|jsx|mdx)$/
      ),
    })
  );
