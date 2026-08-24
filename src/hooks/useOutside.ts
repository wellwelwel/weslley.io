import type { RefObject } from 'react';
import { useEffect } from 'react';

export const useOutside = (
  active: boolean,
  container: RefObject<HTMLElement | null>,
  onDismiss: () => void
): void => {
  useEffect(() => {
    if (!active) return;

    const dismiss = ({ target }: PointerEvent) => {
      if (target instanceof Node && container.current?.contains(target)) return;

      onDismiss();
    };

    document.addEventListener('pointerdown', dismiss);

    return () => document.removeEventListener('pointerdown', dismiss);
  }, [active, container, onDismiss]);
};
