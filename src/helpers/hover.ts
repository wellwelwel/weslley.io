let query: MediaQueryList | undefined;

export const canHover = (): boolean =>
  (query ??= window.matchMedia('(hover: hover)')).matches;
