import { slides } from '@site/src/components/Home/catalog';

export type Gate = {
  ready: () => boolean;
  load: () => Promise<void>;
};

export const ready = (index: number): boolean =>
  (slides[index].gates ?? []).every((gate) => gate.ready());

export const load = (index: number): Promise<unknown> =>
  Promise.all((slides[index].gates ?? []).map((gate) => gate.load()));

export const warm = (): void => {
  for (const gate of slides.flatMap(({ gates }) => gates ?? []))
    gate.load().catch(() => undefined);
};
