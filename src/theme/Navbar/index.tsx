import React, { memo, type ReactNode } from 'react';
import NavbarLayout from '@theme/Navbar/Layout';
import NavbarContent from '@theme/Navbar/Content';

const Navbar = (): ReactNode => {
  return (
    <NavbarLayout>
      <NavbarContent />
    </NavbarLayout>
  );
};

export default memo(Navbar);
