import type { Props } from '@docusaurus/Link';
import type { FC, ReactNode } from 'react';
import Link from '@docusaurus/Link';

export type SafeLinkOptions = {
  children: ReactNode;
} & Props;

export const SafeLink: FC<SafeLinkOptions> = ({ children, to, ...props }) => (
  <Link target='_blank' rel='noopener noreferrer' to={to} {...props}>
    {children}
  </Link>
);
