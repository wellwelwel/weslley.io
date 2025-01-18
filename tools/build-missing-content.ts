import { exit } from 'node:process';
import Docusaurus from '@site/docusaurus.config';
import { mirrorMissingLocaleFiles } from '@site/src/helpers/mirror-missing-locale-files';

if (!Docusaurus.i18n) exit(0);

const { defaultLocale, locales } = Docusaurus.i18n;

if (!defaultLocale || !locales) exit(0);

const filteredLocales = locales.filter((locale) => locale !== defaultLocale);

for (const locale of filteredLocales)
  locale && mirrorMissingLocaleFiles(locale);
