import {
  dynamicImport,
  dynamicRequire,
} from '@site/src/helpers/dynamic-require';

export const socials = (locate: string) =>
  dynamicRequire(
    dynamicImport(locate, {
      'pt-BR': require.context(
        '@site/i18n/pt-BR/social',
        false,
        /\.(tsx|jsx|mdx)$/
      ),
    })
  );
