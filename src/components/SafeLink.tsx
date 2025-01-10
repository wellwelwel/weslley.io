import Link, { type Props } from '@docusaurus/Link';
import type { FC, ReactNode } from 'react';

type SafeLinkOptions = {
  to: string;
  children: ReactNode;
} & Props;

/** Use for external links only */
const SafeLink: FC<SafeLinkOptions> = ({ children, to, ...props }) => (
  <Link target='_blank' rel='noopener noreferrer' to={to} {...props}>
    {children}
  </Link>
);

export default SafeLink;
