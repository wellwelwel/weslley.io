type Travel<T> = { full: T; reduced: T };

let query: MediaQueryList | undefined;

export const isReducedMotion = (): boolean =>
  (query ??= window.matchMedia('(prefers-reduced-motion: reduce)')).matches;

export const motion = <T>(travel: Travel<T>): T =>
  isReducedMotion() ? travel.reduced : travel.full;
