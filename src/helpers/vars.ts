import type { CSSProperties } from 'react';

export type Vars<K extends string> = CSSProperties & Record<K, string>;
