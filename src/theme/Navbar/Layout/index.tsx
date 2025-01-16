import { useEffect, useRef, type ComponentProps, type ReactNode } from 'react';
import clsx from 'clsx';
import { useThemeConfig } from '@docusaurus/theme-common';
import {
  useHideableNavbar,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import NavbarMobileSidebar from '@theme/Navbar/MobileSidebar';
import type { Props } from '@theme/Navbar/Layout';
import { useLocation } from '@docusaurus/router';
// @ts-ignore
import styles from './styles.module.scss';

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
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll);
  const location = useLocation();
  const isInitialLoad = useRef(true);
  const navbarNode = useRef<HTMLElement | null>(null);
  const isHome = ['/', '/en/'].includes(location.pathname);

  useEffect(() => {
    if (!isHome || !navbarNode.current) return;

    const doc = document.querySelector('#__docusaurus');
    if (!doc) return;

    const checkScroll = () => {
      if (mobileSidebar.shown) return;
      const scrollTop = doc.scrollTop;

      if (scrollTop > 20) {
        navbarNode.current?.classList.remove('is-home');
        return;
      }

      navbarNode.current?.classList.add('is-home');
    };

    checkScroll();
    doc.addEventListener('scroll', checkScroll);

    return () => {
      doc.removeEventListener('scroll', checkScroll);
    };
  }, [isHome, navbarNode.current, mobileSidebar.shown]);

  useEffect(() => {
    if (!mobileSidebar.shown) return;

    navbarNode.current?.classList.remove('is-home');
  }, [mobileSidebar.shown]);

  useEffect(() => {
    if (isHome) return;

    isInitialLoad.current = false;
  }, [isHome, location.hash]);

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
      className={clsx(
        'navbar',
        'navbar--fixed-top',
        hideOnScroll && [
          styles.navbarHideable,
          !isNavbarVisible && styles.navbarHidden,
        ],
        {
          'is-home': isInitialLoad.current && isHome,
          show: !isInitialLoad.current || !isHome,
          'navbar--dark': style === 'dark',
          'navbar--primary': style === 'primary',
          'navbar-sidebar--show': mobileSidebar.shown,
        }
      )}
    >
      {children}
      <NavbarBackdrop onClick={mobileSidebar.toggle} />
      <NavbarMobileSidebar />
    </nav>
  );
}
