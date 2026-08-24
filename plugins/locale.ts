import type { I18n } from '@docusaurus/types';
import { resolve } from 'node:path';

export const localePrefix = ({ currentLocale, defaultLocale }: I18n): string =>
  currentLocale === defaultLocale ? '' : `/${currentLocale}`;

export const contentDir = (locale: string, dir: string): string =>
  resolve(`./i18n/${locale}/${dir}`);

export const watchGlob = (locales: readonly string[], dir: string): string[] =>
  locales
    .filter(Boolean)
    .map((locale) => resolve(`${contentDir(locale, dir)}/**/*.{md,mdx}`));
