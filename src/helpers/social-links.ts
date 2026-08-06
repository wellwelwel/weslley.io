import type { SocialOptions } from '@site/src/components/Social';

export type SocialLink = Omit<SocialOptions, 'description'>;

export const socialLinks = {
  linkedin: {
    name: 'LinkedIn',
    imageSrc: '/img/linkedin.svg',
    url: 'https://www.linkedin.com/in/wellwelwel/',
  },
  github: {
    name: 'GitHub',
    imageSrc: '/img/github.svg',
    url: 'https://github.com/wellwelwel',
  },
  instagram: {
    name: 'Instagram',
    imageSrc: '/img/instagram.svg',
    url: 'https://www.instagram.com/wellwelwel/',
  },
  youtube: {
    name: 'YouTube',
    imageSrc: '/img/youtube.svg',
    url: 'https://www.youtube.com/@weslleyio',
  },
  sponsors: {
    name: 'GitHub Sponsors',
    imageSrc: '/img/sponsor.svg',
    url: 'https://github.com/sponsors/wellwelwel',
  },
} satisfies Record<string, SocialLink>;
