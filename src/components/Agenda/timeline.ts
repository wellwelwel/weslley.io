import type { Slot } from '@site/src/data/slots';
import { slots } from '@site/src/data/slots';
import { todayInBrazil } from '@site/src/helpers/today';

type Calendar = {
  day: string;
  month: string;
  weekday: string;
  brief: string;
  opens: string;
};

type Marker = {
  center: number;
  first: number;
  last: number;
};

const DAY = 86_400_000;

const PITCH = { inset: 32, least: 72, daily: 4, most: 128, sibling: 48 };

export const MONTHS = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

export const BRIEFS = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
];

export const WEEKDAYS = [
  'domingo',
  'segunda-feira',
  'terça-feira',
  'quarta-feira',
  'quinta-feira',
  'sexta-feira',
  'sábado',
];

const parse = (date: string): Date => {
  const [year, month, day] = date.split('-').map(Number);

  return new Date(year, month - 1, day);
};

const span = (date: Slot['date']): string[] =>
  Array.isArray(date) ? date : [date];

const opensAt = (date: Slot['date']): string => span(date)[0];

const closesAt = (date: Slot['date']): string => {
  const covered = span(date);

  return covered[covered.length - 1];
};

const series = (parts: string[]): string =>
  parts.length > 1
    ? `${parts.slice(0, -1).join(', ')} e ${parts[parts.length - 1]}`
    : parts[0];

const numeral = (when: Date): string => String(when.getDate()).padStart(2, '0');

const range = (numerals: string[]): string =>
  numerals.length > 1
    ? `${numerals[0]}-${numerals[numerals.length - 1]}`
    : numerals[0];

export const longDate = (date: Slot['date']): string => {
  const covered = span(date).map(parse);
  const opening = covered[0];
  const numbers = series(covered.map((when) => String(when.getDate())));

  return `${numbers} de ${MONTHS[opening.getMonth()]} de ${opening.getFullYear()}`;
};

const calendar = (date: Slot['date']): Calendar => {
  const covered = span(date).map(parse);
  const opening = covered[0];
  const numerals = covered.map(numeral);

  return {
    day: series(numerals),
    month: `${MONTHS[opening.getMonth()]} ${opening.getFullYear()}`,
    weekday: series(covered.map((when) => WEEKDAYS[when.getDay()])),
    brief: `${range(numerals)} ${BRIEFS[opening.getMonth()]}`,
    opens: opensAt(date),
  };
};

const gauge = (left: number, right: number): number =>
  Math.min(
    Math.max(((right - left) / DAY) * PITCH.daily, PITCH.least),
    PITCH.most
  );

const times = slots.map(({ date }) => parse(opensAt(date)).getTime());

const keys = slots.map(({ event, date }) => `${event}:${span(date).join()}`);

const sibling = (index: number): boolean =>
  index > 0 && keys[index] === keys[index - 1];

const distance = (index: number): number =>
  sibling(index) ? PITCH.sibling : gauge(times[index - 1], times[index]);

export const labels = slots.map(({ date }) => calendar(date));

export const openings = slots.map(({ time }) => time?.split(' - ')[0]);

export const stations = slots.reduce<number[]>(
  (positions, _, index) =>
    index === 0
      ? [PITCH.inset]
      : [...positions, positions[index - 1] + distance(index)],
  []
);

const heads = slots.flatMap((_, index) => (sibling(index) ? [] : [index]));

export const markers = heads.map<Marker>((first, order) => {
  const last = (heads[order + 1] ?? slots.length) - 1;

  return { center: (stations[first] + stations[last]) / 2, first, last };
});

export const extent = stations[stations.length - 1] + PITCH.inset;

export const upcomingIndex = (): number => {
  const today = todayInBrazil();
  const nearest = slots.findIndex(({ date }) => closesAt(date) >= today);

  return nearest === -1 ? slots.length - 1 : nearest;
};

export const anchor = (index: number): number =>
  stations[Math.max(0, index - 1)] - PITCH.inset;

export const placeOf = (index: number, at: number): number =>
  (index - at + slots.length) % slots.length;
