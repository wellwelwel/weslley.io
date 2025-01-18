import type { ReactNode } from 'react';
import {
  useLockBodyScroll,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarMobileSidebarHeader from '@theme/Navbar/MobileSidebar/Header';
import NavbarMobileSidebarLayout from '@theme/Navbar/MobileSidebar/Layout';
import NavbarMobileSidebarPrimaryMenu from '@theme/Navbar/MobileSidebar/PrimaryMenu';
import NavbarMobileSidebarSecondaryMenu from '@theme/Navbar/MobileSidebar/SecondaryMenu';
import { anchors } from '@site/src/helpers/get-contents';

export default function NavbarMobileSidebar(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  const hasAnchors = anchors.length > 0;

  useLockBodyScroll(mobileSidebar.shown);

  if (!mobileSidebar.shouldRender && !hasAnchors) {
    return null;
  }

  return (
    <NavbarMobileSidebarLayout
      header={<NavbarMobileSidebarHeader />}
      primaryMenu={<NavbarMobileSidebarPrimaryMenu />}
      secondaryMenu={<NavbarMobileSidebarSecondaryMenu />}
    />
  );
}
