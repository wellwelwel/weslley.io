import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

interface SideContextValue {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  defaultId: string | null;
  setDefaultId: (id: string | null) => void;
}

export const SideContext = createContext<SideContextValue | null>(null);

interface SideProviderProps {
  children: ReactNode;
}

export const SideProvider = ({ children }: SideProviderProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [defaultId, setDefaultId] = useState<string | null>(null);

  return (
    <SideContext.Provider
      value={{ activeId, setActiveId, defaultId, setDefaultId }}
    >
      {children}
    </SideContext.Provider>
  );
};

export const useSideContext = (): SideContextValue => {
  const context = useContext(SideContext);

  if (!context)
    throw new Error('useSideContext must be used within SideProvider');

  return context;
};
