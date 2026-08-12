import {
  dynamicImport,
  dynamicRequire,
} from '@site/src/helpers/dynamic-require';

export const anchors = (locate: string) =>
  dynamicRequire(
    dynamicImport(locate, {
      'pt-BR': require.context(
        '@site/i18n/pt-BR/anchors',
        false,
        /\.(tsx|jsx|mdx)$/
      ),
    })
  );
