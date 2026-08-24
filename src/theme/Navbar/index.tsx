import type { ReactNode } from 'react';
import { memo } from 'react';
import NavbarContent from '@theme/Navbar/Content';
import NavbarLayout from '@theme/Navbar/Layout';

const Navbar = (): ReactNode => (
  <NavbarLayout>
    <NavbarContent />
  </NavbarLayout>
);

export default memo(Navbar);
