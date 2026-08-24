import type { ViewMode } from '@site/src/hooks/useViewMode';
import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { LayoutGrid, List } from 'lucide-react';

type ViewToggleOptions = {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
};

export const ViewToggle = ({
  mode,
  onChange,
}: ViewToggleOptions): ReactNode => {
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;

  const translations = {
    cardView: currentLocale === 'en' ? 'Card view' : 'Visualização em cards',
    listView: currentLocale === 'en' ? 'List view' : 'Visualização em lista',
  };

  return (
    <div className='view-toggle'>
      <button
        type='button'
        className={mode === 'card' ? 'active' : ''}
        onClick={() => onChange('card')}
        aria-label={translations.cardView}
        title={translations.cardView}
      >
        <LayoutGrid size={20} aria-hidden='true' />
      </button>
      <button
        type='button'
        className={mode === 'list' ? 'active' : ''}
        onClick={() => onChange('list')}
        aria-label={translations.listView}
        title={translations.listView}
      >
        <List size={20} aria-hidden='true' />
      </button>
    </div>
  );
};
