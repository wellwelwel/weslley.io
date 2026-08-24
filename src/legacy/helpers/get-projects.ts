import type { FC } from 'react';
import { localized } from '@site/src/helpers/localized';

export const projects = (locale: string): FC[] =>
  localized(locale, {
    'pt-BR': require.context(
      '@site/i18n/pt-BR/projects',
      false,
      /\.(tsx|jsx|mdx)$/
    ),
  });
