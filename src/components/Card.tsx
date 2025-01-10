import type { FC, ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import Link from '@docusaurus/Link';
import Parallax from './Parallax';

type CardOptions = {
  icon: string;
  name: string;
  description: ReactNode;
  href: string;
  alt?: string;
};

const Card: FC<CardOptions> = ({
  name,
  icon,
  alt = name,
  href,
  description,
}) => {
  return (
    <Parallax tiltMaxAngleX={1} tiltMaxAngleY={1} perspective={1000}>
      <Link to={href} target='_blank' rel='noopener noreferrer'>
        <img loading='lazy' src={`/img/${icon}.svg`} alt={alt} title={alt} />
        <p>
          <strong>{name}</strong>
          <span>{description}</span>
        </p>
        <ExternalLink />
      </Link>
    </Parallax>
  );
};

export default Card;
