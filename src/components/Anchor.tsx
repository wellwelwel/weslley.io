import Link, { type Props } from '@docusaurus/Link';
import type { FC, ReactNode } from 'react';

export type AnchorOptions = {
  name: string;
  to?: string;
  icon?: ReactNode;
} & Props;

export const Anchor: FC<AnchorOptions> = ({ name, icon, to, ...props }) => {
  return (
    <Link to={to ?? '#'} {...props}>
      {icon}
      <span>{name}</span>
    </Link>
  );
};
