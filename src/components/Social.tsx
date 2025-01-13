import type { FC } from 'react';
import { SafeLink } from './SafeLink';

export type SocialOptions = {
  imageSrc: string;
  name: string;
  url: string;
};

export const Social: FC<SocialOptions> = ({ name, imageSrc, url }) => (
  <SafeLink to={url} title={name}>
    <img loading='lazy' src={imageSrc} alt={name} />
  </SafeLink>
);
