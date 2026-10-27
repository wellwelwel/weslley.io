/* Loaded by the home plugin under Node, where the `@site` alias does not
   resolve. Imports here stay relative. */
import { abbreviate } from './abbreviate';

const FALLBACK = '700 milhões';

const BILLION = 1_000_000_000;

const precision = (value: number): number => (value >= BILLION ? 2 : 0);

export const downloadsLabel = (rolling?: number): string =>
  rolling
    ? abbreviate(rolling, { fractionDigits: precision(rolling), decimal: '.' })
    : FALLBACK;
