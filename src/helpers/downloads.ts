import { abbreviate } from './abbreviate';

const FALLBACK = '700 milhões';

export const downloadsLabel = (rolling?: number): string =>
  rolling ? abbreviate(rolling, 'pt-BR', 0) : FALLBACK;
