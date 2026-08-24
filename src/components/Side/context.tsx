import type { ReactNode } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

type SideContextValue = {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  defaultId: string | null;
  setDefaultId: (id: string | null) => void;
};

type SideProviderOptions = {
  children: ReactNode;
};

type SideScopeOptions = SideProviderOptions & {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
};

export const SideContext = createContext<SideContextValue | null>(null);

export const SideProvider = ({ children }: SideProviderOptions) => {
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

export const SideScope = ({
  activeId,
  setActiveId,
  children,
}: SideScopeOptions) => {
  const value = useMemo(
    () => ({
      activeId,
      setActiveId,
      defaultId: null,
      setDefaultId: () => undefined,
    }),
    [activeId, setActiveId]
  );

  return <SideContext.Provider value={value}>{children}</SideContext.Provider>;
};

export const useSideContext = (): SideContextValue => {
  const context = useContext(SideContext);

  if (!context)
    throw new Error('useSideContext must be used within SideProvider');

  return context;
};
