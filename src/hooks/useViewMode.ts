import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

export type ViewMode = 'card' | 'list';

type Mode = [ViewMode, Dispatch<SetStateAction<ViewMode>>];

export const useViewMode = (defaultMode: ViewMode = 'card'): Mode =>
  useState<ViewMode>(defaultMode);
