import type { Props } from '@theme/Navbar/Search';
import type { ReactNode } from 'react';
import clsx from 'clsx';
// @ts-ignore
import styles from './styles.module.scss';

export default function NavbarSearch({
  children,
  className,
}: Props): ReactNode {
  return (
    <div className={clsx(className, styles.navbarSearchContainer)}>
      {children}
    </div>
  );
}
