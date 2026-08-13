import { useEffect, useRef, useState } from 'react';
import { write } from '@site/src/helpers/clipboard';

type Copier = [copied: boolean, copy: (value: string) => void];

const RESET_MS = 1600;

export const useCopy = (): Copier => {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = (value: string): void => {
    write(value).then((done) => {
      if (!done) return;

      navigator.vibrate?.(10);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), RESET_MS);
    });
  };

  return [copied, copy];
};
