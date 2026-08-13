import type { Props } from '@theme/Navbar/Search';
import type { ReactNode } from 'react';

export default function NavbarSearch({
  children,
  className,
}: Props): ReactNode {
  return <div className={className}>{children}</div>;
}
