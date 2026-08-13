import type { ReactNode } from 'react';
import { lazy, Suspense } from 'react';
import { translate } from '@docusaurus/Translate';

const SearchBar = lazy(() => import('@theme-original/SearchBar'));

/* Mirrors the bar the plugin renders on the server, so a client-side
   navigation shows the same input while the deferred chunk arrives. */
const Still = (): ReactNode => {
  const label = translate({
    id: 'theme.SearchBar.label',
    message: 'Search',
    description: 'The ARIA label and placeholder for search button',
  });

  return (
    <div className='navbar__search' dir='ltr'>
      <input
        placeholder={label}
        aria-label={label}
        className='navbar__search-input'
        readOnly
        value=''
      />
    </div>
  );
};

export default function LazySearchBar(): ReactNode {
  return (
    <Suspense fallback={<Still />}>
      <SearchBar />
    </Suspense>
  );
}
