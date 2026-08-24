import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';

type Store<T> = {
  read: () => T;
  save: (value: T) => void;
};

const SAVE_DELAY_MS = 400;

export const useDraft = <T>({
  read,
  save,
}: Store<T>): [T, Dispatch<SetStateAction<T>>] => {
  const [draft, setDraft] = useState<T>(read);
  const latest = useRef(draft);

  useEffect(() => {
    latest.current = draft;

    const timer = setTimeout(() => save(draft), SAVE_DELAY_MS);

    return () => clearTimeout(timer);
  }, [draft, save]);

  useEffect(() => () => save(latest.current), [save]);

  return [draft, setDraft];
};
