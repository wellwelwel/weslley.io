import React, { type ReactNode } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarItem, { type Props as NavbarItemConfig } from '@theme/NavbarItem';
import { anchors } from '@site/src/helpers/get-contents';

function useNavbarItems() {
  return (useThemeConfig().navbar.items as NavbarItemConfig[]) || [];
}

// The primary menu displays the navbar items
export default function NavbarMobilePrimaryMenu(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();

  return (
    <ul className='menu__list'>
      {anchors.map((Anchor, i) => (
        <li className='menu__list-item' key={`anchor:${i}`}>
          <Anchor />
        </li>
      ))}
      {items.map((item, i) => (
        <NavbarItem
          mobile
          {...item}
          onClick={() => mobileSidebar.toggle()}
          key={i}
        />
      ))}
    </ul>
  );
}
