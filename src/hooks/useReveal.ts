import type { RefObject } from 'react';
import { useCallback, useRef, useState } from 'react';
import { useOutside } from '@site/src/hooks/useOutside';

type Reveal<T extends HTMLElement> = {
  container: RefObject<T | null>;
  revealed: string | null;
  toggle: (key: string) => void;
};

/** Reveals one item at a time, dismissed by a pointer outside the container. */
export const useReveal = <T extends HTMLElement>(): Reveal<T> => {
  const container = useRef<T>(null);
  const [revealed, setRevealed] = useState<string | null>(null);
  const hide = useCallback(() => setRevealed(null), []);

  useOutside(Boolean(revealed), container, hide);

  return {
    container,
    revealed,
    toggle: (key) => setRevealed((current) => (current === key ? null : key)),
  };
};
