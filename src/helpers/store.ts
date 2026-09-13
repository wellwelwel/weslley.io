import { useSyncExternalStore } from 'react';

type Listener = () => void;

export type Store<T> = {
  read: () => T;
  subscribe: (listener: Listener) => () => void;
  set: (value: T) => void;
  reset: () => void;
};

export const createStore = <T>(initial: T): Store<T> => {
  const listeners = new Set<Listener>();

  let current = initial;

  const set = (value: T): void => {
    if (value === current) return;

    current = value;

    for (const notify of listeners) notify();
  };

  return {
    read: () => current,
    subscribe: (listener) => {
      listeners.add(listener);

      return () => listeners.delete(listener);
    },
    set,
    reset: () => set(initial),
  };
};

export const useStore = <T>(store: Store<T>): T =>
  useSyncExternalStore(store.subscribe, store.read, store.read);

export const useSelect = <T, Reading>(
  store: Store<T>,
  select: (value: T) => Reading
): Reading => {
  const read = () => select(store.read());

  return useSyncExternalStore(store.subscribe, read, read);
};
