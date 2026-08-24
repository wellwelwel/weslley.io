import type { Slot } from '@site/src/data/slots';
import { talks } from '@site/src/components/Talks/catalog';
import { slots } from '@site/src/data/slots';

export type Direction = 'previous' | 'next';

type Neighbors = Record<Direction, string | undefined>;

export const chronology = slots.flatMap(({ talk }) =>
  talk && talks.has(talk) ? [talk] : []
);

export const subjectOf = (slug: string): Slot | undefined =>
  slots.find(({ talk }) => talk === slug);

export const neighborsOf = (slug: string): Neighbors => {
  const at = chronology.indexOf(slug);
  if (at < 0) return { previous: undefined, next: undefined };

  return { previous: chronology[at - 1], next: chronology[at + 1] };
};

export const aroundOf = (slug: string): Neighbors => {
  const { previous, next } = neighborsOf(slug);

  return {
    previous: previous ?? chronology.at(-1),
    next: next ?? chronology[0],
  };
};
