import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

type Spots = {
  page: RefObject<HTMLDivElement | null>;
  rail: RefObject<HTMLDivElement | null>;
  place: (index: number) => (chip: HTMLButtonElement | null) => void;
  spots: number[];
};

export const useSpots = (): Spots => {
  const [spots, setSpots] = useState<number[]>([]);
  const page = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const chips = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const measure = () => {
      const base = page.current;

      if (!base) return;

      const origin = base.getBoundingClientRect().left;

      const centers = chips.current.map((chip) => {
        const box = chip?.getBoundingClientRect();

        return box ? box.left + box.width / 2 - origin : 0;
      });

      setSpots((previous) =>
        centers.length === previous.length &&
        centers.every((center, index) => center === previous[index])
          ? previous
          : centers
      );
    };

    measure();

    if (!rail.current) return;

    let frame = 0;

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });

    observer.observe(rail.current);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const place = (index: number) => (chip: HTMLButtonElement | null) => {
    chips.current[index] = chip;
  };

  return { page, rail, place, spots };
};
