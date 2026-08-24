import type { RefObject } from 'react';
import { useEffect, useLayoutEffect, useState } from 'react';

/** Deck height, kept across mounts. */
let held: number | undefined;

export const useDeckHeight = (
  deck: RefObject<HTMLDivElement | null>
): number | undefined => {
  const [height, setHeight] = useState(held);

  useLayoutEffect(() => {
    if (height !== undefined || !deck.current) return;

    /* Fractional on purpose: a rounded height would nudge the lines above. */
    held = deck.current.getBoundingClientRect().height;
    setHeight(held);
  }, [height]);

  useEffect(() => {
    let frame = 0;

    const remeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        held = undefined;
        setHeight(undefined);
      });
    };

    window.addEventListener('resize', remeasure);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', remeasure);
    };
  }, []);

  return height;
};
