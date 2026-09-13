import { createStore, useSelect, useStore } from '@site/src/helpers/store';

export type Period = 'monthly' | 'yearly' | 'lifetime';

/** Left to right. */
export const PERIODS: Period[] = ['monthly', 'yearly', 'lifetime'];

const store = createStore<Period>('yearly');

export const setPeriod = store.set;

export const resetPeriod = store.reset;

export const usePeriod = (): Period => useStore(store);

/** Narrower than `usePeriod`: only a change of its own turn re-renders. */
export const useShown = (period: Period): boolean =>
  useSelect(store, (current) => current === period);
