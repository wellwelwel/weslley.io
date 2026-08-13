type Locale = 'en' | 'pt-BR';

type Scale = { limit: number; suffix: string };

const DECIMALS: Record<Locale, string> = { 'pt-BR': ',', en: '.' };

const SCALES: Record<Locale, Scale[]> = {
  'pt-BR': [
    { limit: 1_000_000_000, suffix: ' bilhões' },
    { limit: 1_000_000, suffix: ' milhões' },
    { limit: 1_000, suffix: ' mil' },
  ],
  en: [
    { limit: 1_000_000_000, suffix: ' billion' },
    { limit: 1_000_000, suffix: ' million' },
    { limit: 1_000, suffix: ' thousand' },
  ],
};

export const abbreviate = (
  value: number,
  locale: Locale = 'pt-BR',
  fractionDigits: number = 1
): string => {
  const scale = SCALES[locale].find(({ limit }) => value >= limit);

  if (!scale) return value.toLocaleString(locale);

  const compact = (value / scale.limit)
    .toFixed(fractionDigits)
    .replace('.', DECIMALS[locale]);

  return `${compact}${scale.suffix}`;
};
