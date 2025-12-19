import { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export type ViewMode = 'card' | 'list';

export const useViewMode = (defaultMode: ViewMode = 'card') => {
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;
  const [viewMode, setViewMode] = useState<ViewMode>(defaultMode);

  const translations = {
    cardView: currentLocale === 'en' ? 'Card view' : 'Visualização em cards',
    listView: currentLocale === 'en' ? 'List view' : 'Visualização em lista',
  };

  const ViewToggle = () => (
    <div className='view-toggle'>
      <button
        type='button'
        className={viewMode === 'card' ? 'active' : ''}
        onClick={() => setViewMode('card')}
        aria-label={translations.cardView}
        title={translations.cardView}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <rect x='3' y='3' width='18' height='6' />
          <rect x='3' y='14' width='18' height='6' />
        </svg>
      </button>
      <button
        type='button'
        className={viewMode === 'list' ? 'active' : ''}
        onClick={() => setViewMode('list')}
        aria-label={translations.listView}
        title={translations.listView}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <line x1='8' y1='6' x2='21' y2='6' />
          <line x1='8' y1='12' x2='21' y2='12' />
          <line x1='8' y1='18' x2='21' y2='18' />
          <line x1='3' y1='6' x2='3.01' y2='6' />
          <line x1='3' y1='12' x2='3.01' y2='12' />
          <line x1='3' y1='18' x2='3.01' y2='18' />
        </svg>
      </button>
    </div>
  );

  return {
    viewMode,
    setViewMode,
    ViewToggle,
    isListView: viewMode === 'list',
  };
};
