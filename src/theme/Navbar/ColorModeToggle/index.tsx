import type { Props } from '@theme/Navbar/ColorModeToggle';
import type { ReactNode } from 'react';
import { useColorMode, useThemeConfig } from '@docusaurus/theme-common';
import ColorModeToggle from '@theme/ColorModeToggle';

export default function NavbarColorModeToggle({ className }: Props): ReactNode {
  const disabled = useThemeConfig().colorMode.disableSwitch;
  const { colorMode, setColorMode } = useColorMode();

  if (disabled) {
    return null;
  }

  return (
    <ColorModeToggle
      respectPrefersColorScheme={false}
      className={className}
      value={colorMode}
      onChange={setColorMode}
    />
  );
}
