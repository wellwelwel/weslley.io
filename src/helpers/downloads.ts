import { abbreviate } from './abbreviate';

const FALLBACK = '700 milhões';

/** The yearly downloads as the site says them, with a floor when the history is unreachable. */
export const downloadsLabel = (rolling?: number): string =>
  rolling ? abbreviate(rolling, 'pt-BR', 0) : FALLBACK;
