type Scale = { limit: number; one: string; other: string };

type AbbreviateOptions = {
  fractionDigits?: number;
  decimal?: string;
};

const LOCALE = 'pt-BR';

const PLURALS = new Intl.PluralRules(LOCALE);

const SCALES: Scale[] = [
  { limit: 1_000_000_000, one: 'bilhão', other: 'bilhões' },
  { limit: 1_000_000, one: 'milhão', other: 'milhões' },
  { limit: 1_000, one: 'mil', other: 'mil' },
];

export const abbreviate = (
  value: number,
  { fractionDigits = 1, decimal = ',' }: AbbreviateOptions = {}
): string => {
  const scale = SCALES.find(({ limit }) => value >= limit);

  if (!scale) return value.toLocaleString(LOCALE);

  const compact = (value / scale.limit).toFixed(fractionDigits);
  const suffix =
    PLURALS.select(Number(compact)) === 'one' ? scale.one : scale.other;

  return `${compact.replace('.', decimal)} ${suffix}`;
};
