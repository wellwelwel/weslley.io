import React from 'react';
import { ArrowRight } from 'lucide-react';

type CardOptions = {
  icon: string;
  name: string;
  description: string;
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
    <a href={href} target='_blank' rel='noopener noreferrer'>
      <img loading='lazy' src={`/images/${icon}.svg`} alt={alt} title={alt} />
      <p>
        <strong>{name}</strong>
        <span>{description}</span>
      </p>
      <ArrowRight />
    </a>
  );
};

export default Card;
