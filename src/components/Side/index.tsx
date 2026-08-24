import type { ReactNode } from 'react';
import { useContext } from 'react';
import { SideContext } from '@site/src/components/Side/context';

type SideOptions = {
  id: string;
  children: ReactNode;
};

export const Side = ({ id, children }: SideOptions) => {
  const context = useContext(SideContext);

  if (!context) return <>{children}</>;

  const { activeId, defaultId } = context;
  const currentId = activeId ?? defaultId;

  if (!currentId) return <>{children}</>;
  if (currentId !== id) return null;

  return <>{children}</>;
};
