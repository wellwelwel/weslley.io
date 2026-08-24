import type { FC } from 'react';
import { localized } from '@site/src/helpers/localized';

export const cards = (locale: string): FC[] =>
  localized(locale, {
    'pt-BR': require.context(
      '@site/i18n/pt-BR/cards',
      false,
      /\.(tsx|jsx|mdx)$/
    ),
  });
