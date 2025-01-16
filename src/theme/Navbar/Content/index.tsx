import React, { type ReactNode } from 'react';
import { useThemeConfig, ErrorCauseBoundary } from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem, { type Props as NavbarItemConfig } from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import { anchors } from '@site/src/helpers/get-contents';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Importa os anchors gerados dinamicamente

function useNavbarItems() {
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

function NavbarItems({ items }: { items: NavbarItemConfig[] }): ReactNode {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              { cause: error }
            )
          }
        >
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

function NavbarContentLayout({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className='navbar__inner'>
      <div className='navbar__items navbar__items--left'>{left}</div>
      <div className='navbar__items navbar__items--right'>{right}</div>
    </div>
  );
}

export default function NavbarContent(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const hasAnchors = anchors.length > 0;
  const [, rightItems] = splitNavbarItems(items);
  const searchBarItem = items.find((item) => item.type === 'search');
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;
  const Anchors = anchors(currentLocale);

  return (
    <NavbarContentLayout
      left={
        <>
          {(!mobileSidebar.disabled || hasAnchors) && (
            <NavbarMobileSidebarToggle />
          )}
          <NavbarLogo />
          {Anchors.map((Anchor, i) => (
            <Anchor key={`anchor:${i}`} />
          ))}
        </>
      }
      right={
        <>
          <NavbarItems items={rightItems} />
          <NavbarColorModeToggle />
          {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
        </>
      }
    />
  );
}
