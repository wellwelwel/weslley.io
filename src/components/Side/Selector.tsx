import type { SideConfig } from '@site/src/@types/side';
import { useContext, useEffect, useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { CassetteTape, Pen } from 'lucide-react';
import { SideContext } from '@site/src/components/Side/context';
import { getSideLabel } from '@site/src/helpers/side-label';

type SideSelectorOptions = {
  sides: SideConfig[];
};

export const SideSelector = ({ sides }: SideSelectorOptions) => {
  const context = useContext(SideContext);
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;
  const defaultId = useMemo(() => sides[0]?.id ?? null, [sides]);
  const activeId = context?.activeId ?? null;
  const setActiveId = context?.setActiveId;
  const setDefaultId = context?.setDefaultId;

  useEffect(() => {
    if (!setDefaultId || !setActiveId) return;

    setDefaultId(defaultId);
    if (activeId === null) setActiveId(defaultId);
  }, [defaultId, setDefaultId, activeId, setActiveId]);

  const translations = {
    chooseArticleSide:
      currentLocale === 'en'
        ? 'Choose the article side'
        : 'Escolha o lado do artigo',
    side: currentLocale === 'en' ? 'Side' : 'Side',
  };

  if (!context) return null;
  if (sides.length === 0) return null;

  const currentId = activeId ?? defaultId;

  return (
    <div>
      <div>
        <Pen /> {translations.chooseArticleSide}
      </div>

      <div>
        {sides.map((side: SideConfig, index: number) => {
          const sideLabel = getSideLabel(index);

          return (
            <button
              key={side.id}
              onClick={() => context.setActiveId(side.id)}
              aria-pressed={currentId === side.id}
            >
              <span>
                {translations.side} {sideLabel}{' '}
                <CassetteTape width={16} height={16} />
              </span>
              <span>{side.label}</span>
              {side.description && <span>{side.description}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};
