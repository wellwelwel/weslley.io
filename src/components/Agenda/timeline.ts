import { slots } from '@site/src/data/slots';
import { todayInBrazil } from '@site/src/helpers/today';

type Calendar = {
  day: string;
  month: string;
  weekday: string;
  brief: string;
};

const DAY = 86_400_000;

const PITCH = { inset: 32, least: 72, daily: 4, most: 128 };

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

export const longDate = (date: string): string => {
  const [year, month, day] = date.split('-').map(Number);

  return `${day} de ${MONTHS[month - 1]} de ${year}`;
};

const parse = (date: string): Date => {
  const [year, month, day] = date.split('-').map(Number);

  return new Date(year, month - 1, day);
};

const calendar = (date: string): Calendar => {
  const when = parse(date);
  const day = String(when.getDate()).padStart(2, '0');

  return {
    day,
    month: `${MONTHS[when.getMonth()]} ${when.getFullYear()}`,
    weekday: WEEKDAYS[when.getDay()],
    brief: `${day} ${BRIEFS[when.getMonth()]}`,
  };
};

const gauge = (left: number, right: number): number =>
  Math.min(
    Math.max(((right - left) / DAY) * PITCH.daily, PITCH.least),
    PITCH.most
  );

const times = slots.map(({ date }) => parse(date).getTime());

export const labels = slots.map(({ date }) => calendar(date));

export const openings = slots.map(({ time }) => time?.split(' - ')[0]);

export const stations = times.reduce<number[]>(
  (positions, time, index) =>
    index === 0
      ? [PITCH.inset]
      : [...positions, positions[index - 1] + gauge(times[index - 1], time)],
  []
);

export const extent = stations[stations.length - 1] + PITCH.inset;

export const upcomingIndex = (): number => {
  const today = todayInBrazil();
  const nearest = slots.findIndex(({ date }) => date >= today);

  return nearest === -1 ? slots.length - 1 : nearest;
};

export const anchor = (index: number): number =>
  stations[Math.max(0, index - 1)] - PITCH.inset;

export const placeOf = (index: number, at: number): number =>
  (index - at + slots.length) % slots.length;
