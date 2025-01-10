import type { FC, ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import Parallax from './Parallax';
import SafeLink from './SafeLink';

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
      <SafeLink to={href}>
        <img loading='lazy' src={`/img/${icon}.svg`} alt={alt} title={alt} />
        <p>
          <strong>{name}</strong>
          <span>{description}</span>
        </p>
        <ExternalLink />
      </SafeLink>
    </Parallax>
  );
};

export default Card;
