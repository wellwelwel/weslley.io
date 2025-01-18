import type { Props } from '@docusaurus/Link';
import type { FC, ReactNode } from 'react';
import Link from '@docusaurus/Link';

export type AnchorOptions = {
  name: string;
  to?: string;
  icon?: ReactNode;
} & Props;

export const Anchor: FC<AnchorOptions> = ({
  name,
  icon,
  to,
  className,
  ...props
}) => {
  return (
    <Link to={to ?? '#'} className={className ?? 'navbar__link'} {...props}>
      {icon}
      <span>{name}</span>
    </Link>
  );
};
