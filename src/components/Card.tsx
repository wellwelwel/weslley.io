import type { FC, ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import { Parallax } from './Parallax';
import { SafeLink } from './SafeLink';

export type CardOptions = {
  name: string;
  imageSrc: string;
  children: ReactNode;
  url: string;
  alt?: string;
};

export const Card: FC<CardOptions> = ({
  name,
  imageSrc,
  alt,
  url,
  children,
}) => {
  return (
    <Parallax tiltMaxAngleX={1} tiltMaxAngleY={1} perspective={1000}>
      <SafeLink to={url} title={alt}>
        <img loading='lazy' src={imageSrc} alt={alt} />
        <div>
          <strong>{name}</strong>
          <span>{children}</span>
        </div>
        <ExternalLink />
      </SafeLink>
    </Parallax>
  );
};
