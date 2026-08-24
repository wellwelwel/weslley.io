import { createContext, useContext } from 'react';

export type Shot = {
  src: string;
  alt: string;
  caption?: string;
};

export type Gallery = {
  label: string;
  shots: Shot[];
  at: number;
};

type Show = (gallery: Gallery) => void;

export const ViewerContext = createContext<Show | null>(null);

export const useViewer = (): Show => {
  const show = useContext(ViewerContext);

  if (!show) throw new Error('useViewer must be used within a ViewerContext');

  return show;
};
