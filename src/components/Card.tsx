import React, { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import Link from '@docusaurus/Link';

type CardOptions = {
  icon: string;
  name: string;
  description: ReactNode;
  href: string;
  alt?: string;
};

const Card: React.FC<CardOptions> = ({
  name,
  icon,
  alt = name,
  href,
  description,
}) => {
  return (
    <Link to={href} target='_blank' rel='noopener noreferrer'>
      <img loading='lazy' src={`/img/${icon}.svg`} alt={alt} title={alt} />
      <p>
        <strong>{name}</strong>
        <span>{description}</span>
      </p>
      <ExternalLink />
    </Link>
  );
};

export default Card;
