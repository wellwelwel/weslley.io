import type { SideConfig } from '../../@types/side';
import { useContext, useEffect, useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { CassetteTape, Pen } from 'lucide-react';
import { getSideLabel } from '../../helpers/get-side-label';
import { SideContext } from './context';
import styles from './styles.module.scss';

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
    <div className={styles.selector}>
      <div className={styles.header}>
        <Pen /> {translations.chooseArticleSide}
      </div>

      <div className={styles.options}>
        {sides.map((side: SideConfig, index: number) => {
          const sideLabel = getSideLabel(index);

          return (
            <button
              key={side.id}
              onClick={() => setActiveId(side.id)}
              className={currentId === side.id ? styles.active : ''}
              aria-pressed={currentId === side.id}
            >
              <span className={styles.side}>
                {translations.side} {sideLabel}{' '}
                <CassetteTape width={16} height={16} />
              </span>
              <span className={styles.label}>{side.label}</span>
              {side.description && (
                <span className={styles.description}>{side.description}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
