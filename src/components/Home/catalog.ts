import type { Step } from '@site/src/components/Header';
import { pathOf } from '@site/src/data/previews';
import { groups } from '@site/src/data/slides';

export const slides = groups.flatMap((group) => group.slides);

export const paths = slides.map(({ id }) => pathOf(id));

export const starts = groups.map((_, index) =>
  groups.slice(0, index).reduce((total, { slides }) => total + slides.length, 0)
);

export const groupOf = groups.flatMap((group, index) =>
  group.slides.map(() => index)
);

export const backgrounds = [
  ...new Set(slides.flatMap(({ background }) => background ?? [])),
];

export const textures = [
  ...new Set(slides.flatMap(({ texture }) => texture ?? [])),
];

export const colors = [...new Set(slides.flatMap(({ color }) => color ?? []))];

export const steps: Step[] = slides.map(({ name, Icon }) => ({ name, Icon }));
