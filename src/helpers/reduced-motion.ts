let query: MediaQueryList | undefined;

export const isReducedMotion = (): boolean =>
  (query ??= window.matchMedia('(prefers-reduced-motion: reduce)')).matches;
