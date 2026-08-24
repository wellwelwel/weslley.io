import type { ComponentProps, ReactNode } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import { useNavbarSecondaryMenu } from '@docusaurus/theme-common/internal';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { anchors } from '@site/src/helpers/localized';

function SecondaryMenuBackButton(props: ComponentProps<'button'>) {
  return (
    <button {...props} type='button' className='clean-btn navbar-sidebar__back'>
      <Translate
        id='theme.navbar.mobileSidebarSecondaryMenu.backButtonLabel'
        description='The label of the back button to return to main menu, inside the mobile navbar sidebar secondary menu (notably used to display the docs sidebar)'
      >
        ← Back to main menu
      </Translate>
    </button>
  );
}

export default function NavbarMobileSidebarSecondaryMenu(): ReactNode {
  const { i18n } = useDocusaurusContext();
  const hasAnchors = anchors(i18n.currentLocale).length > 0;

  const isPrimaryMenuEmpty =
    useThemeConfig().navbar.items.length === 0 && !hasAnchors;
  const secondaryMenu = useNavbarSecondaryMenu();
  return (
    <>
      {!isPrimaryMenuEmpty && (
        <SecondaryMenuBackButton onClick={() => secondaryMenu.hide()} />
      )}
      {secondaryMenu.content}
    </>
  );
}
