const LONG: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const localeDate = (value: string, locale: string): string =>
  new Date(value).toLocaleDateString(locale, LONG);
