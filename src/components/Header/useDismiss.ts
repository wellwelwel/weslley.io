import type { RefObject } from 'react';
import { useEffect } from 'react';
import { useOutside } from '@site/src/hooks/useOutside';

type DismissOptions = {
  active: boolean;
  container: RefObject<HTMLElement | null>;
  trigger: RefObject<HTMLButtonElement | null>;
  onDismiss: () => void;
};

export const useDismiss = ({
  active,
  container,
  trigger,
  onDismiss,
}: DismissOptions): void => {
  useOutside(active, container, onDismiss);

  useEffect(() => {
    if (!active) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      onDismiss();
      trigger.current?.focus();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active, trigger, onDismiss]);
};
