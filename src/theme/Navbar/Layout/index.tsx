import type { Props } from '@theme/Navbar/Layout';
import type { ComponentProps, ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { useLocation } from '@docusaurus/router';
import { useThemeConfig } from '@docusaurus/theme-common';
import {
  useHideableNavbar,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import NavbarMobileSidebar from '@theme/Navbar/MobileSidebar';
import clsx from 'clsx';

function NavbarBackdrop(props: ComponentProps<'div'>) {
  return (
    <div
      role='presentation'
      {...props}
      className={clsx('navbar-sidebar__backdrop', props.className)}
    />
  );
}

export default function NavbarLayout({ children }: Props): ReactNode {
  const {
    navbar: { hideOnScroll, style },
  } = useThemeConfig();
  const mobileSidebar = useNavbarMobileSidebar();
  const { navbarRef } = useHideableNavbar(hideOnScroll);
  const location = useLocation();
  const isInitialLoad = useRef(true);
  const navbarNode = useRef<HTMLElement | null>(null);
  const isLinks = ['/links/', '/en/links/'].includes(location.pathname);

  useEffect(() => {
    if (!isLinks || !navbarNode.current) return;

    const doc = document.querySelector('#__docusaurus');
    if (!doc) return;

    const checkScroll = () => {
      if (mobileSidebar.shown) return;
      const scrollTop = doc.scrollTop;

      if (scrollTop > 20) {
        navbarNode.current?.classList.remove('is-links');
        return;
      }

      navbarNode.current?.classList.add('is-links');
    };

    checkScroll();
    doc.addEventListener('scroll', checkScroll);

    return () => {
      doc.removeEventListener('scroll', checkScroll);
    };
  }, [isLinks, navbarNode.current, mobileSidebar.shown]);

  useEffect(() => {
    if (!mobileSidebar.shown) return;

    navbarNode.current?.classList.remove('is-links');
  }, [mobileSidebar.shown]);

  useEffect(() => {
    if (isLinks) return;

    isInitialLoad.current = false;
  }, [isLinks, location.hash]);

  return (
    <nav
      ref={(node) => {
        navbarRef(node);
        navbarNode.current = node;
      }}
      aria-label={translate({
        id: 'theme.NavBar.navAriaLabel',
        message: 'Main',
        description: 'The ARIA label for the main navigation',
      })}
      className={clsx('navbar', 'navbar--fixed-top', {
        'is-links': isInitialLoad.current && isLinks,
        show: !isInitialLoad.current || !isLinks,
        'navbar--dark': style === 'dark',
        'navbar--primary': style === 'primary',
        'navbar-sidebar--show': mobileSidebar.shown,
      })}
    >
      {children}
      <NavbarBackdrop onClick={mobileSidebar.toggle} />
      <NavbarMobileSidebar />
    </nav>
  );
}
