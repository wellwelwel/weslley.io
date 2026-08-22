import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

type Reveal<T extends HTMLElement> = {
  container: RefObject<T | null>;
  revealed: string | null;
  toggle: (key: string) => void;
};

/** Reveals one item at a time, dismissed by a pointer outside the container. */
export const useReveal = <T extends HTMLElement>(): Reveal<T> => {
  const container = useRef<T>(null);
  const [revealed, setRevealed] = useState<string | null>(null);

  useEffect(() => {
    if (!revealed) return;

    const dismiss = ({ target }: PointerEvent) => {
      if (target instanceof Node && container.current?.contains(target)) return;

      setRevealed(null);
    };

    document.addEventListener('pointerdown', dismiss);

    return () => document.removeEventListener('pointerdown', dismiss);
  }, [revealed]);

  return {
    container,
    revealed,
    toggle: (key) => setRevealed((current) => (current === key ? null : key)),
  };
};
