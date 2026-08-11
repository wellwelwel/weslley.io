import type { SideConfig } from '../../@types/side';
import { useContext, useEffect, useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { CassetteTape, Pen } from 'lucide-react';
import { getSideLabel } from '../../helpers/get-side-label';
import { SideContext } from './context';

interface SideSelectorProps {
  sides: SideConfig[];
}

export const SideSelector = ({ sides }: SideSelectorProps) => {
  const context = useContext(SideContext);
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;

  const translations = {
    chooseArticleSide:
      currentLocale === 'en'
        ? 'Choose the article side'
        : 'Escolha o lado do artigo',
    side: currentLocale === 'en' ? 'Side' : 'Side',
  };

  if (!context) return null;
  if (!sides || sides.length === 0) return null;

  const { activeId, setActiveId, setDefaultId } = context;

  const defaultId = useMemo(
    () => (sides.length > 0 ? sides[0].id : null),
    [sides]
  );

  useEffect(() => {
    setDefaultId(defaultId);
    if (activeId === null) {
      setActiveId(defaultId);
    }
  }, [defaultId, setDefaultId, activeId, setActiveId]);

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
              onClick={() => setActiveId(side.id)}
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
