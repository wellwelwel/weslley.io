import type { ReactNode } from 'react';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import IconMenu from '@theme/Icon/Menu';
import { anchors } from '@site/src/helpers/localized';

export default function MobileSidebarToggle(): ReactNode {
  const { i18n } = useDocusaurusContext();
  const hasAnchors = anchors(i18n.currentLocale).length > 0;
  const { toggle, shown } = useNavbarMobileSidebar();

  return (
    <button
      onClick={toggle}
      aria-label={translate({
        id: 'theme.docs.sidebar.toggleSidebarButtonAriaLabel',
        message: 'Toggle navigation bar',
        description:
          'The ARIA label for hamburger menu button of mobile navigation',
      })}
      aria-expanded={shown || hasAnchors}
      className='navbar__toggle clean-btn'
      type='button'
    >
      <IconMenu />
    </button>
  );
}
