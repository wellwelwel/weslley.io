import {
  dynamicImport,
  dynamicRequire,
} from '@site/src/helpers/dynamic-require';

export const projects = (locate: string) =>
  dynamicRequire(
    dynamicImport(locate, {
      'pt-BR': require.context(
        '@site/i18n/pt-BR/projects',
        false,
        /\.(tsx|jsx|mdx)$/
      ),
    })
  );
