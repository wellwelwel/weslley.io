import Link, { type Props } from '@docusaurus/Link';
import type { FC, ReactNode } from 'react';

export type SafeLinkOptions = {
  children: ReactNode;
} & Props;

/** Use for external links only */
export const SafeLink: FC<SafeLinkOptions> = ({ children, to, ...props }) => (
  <Link target='_blank' rel='noopener noreferrer' to={to} {...props}>
    {children}
  </Link>
);
