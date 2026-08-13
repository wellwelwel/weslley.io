import type { IconType } from 'react-icons';
import { FaLinkedin } from 'react-icons/fa6';
import {
  SiGithub,
  SiGithubsponsors,
  SiInstagram,
  SiYoutube,
} from 'react-icons/si';

export type SocialLink = {
  name: string;
  Icon: IconType;
  tone: string;
  imageSrc: string;
  url: string;
};

export const socialLinks = {
  linkedin: {
    name: 'LinkedIn',
    Icon: FaLinkedin,
    tone: '#0a66c2',
    imageSrc: '/img/linkedin.svg',
    url: 'https://www.linkedin.com/in/wellwelwel/',
  },
  github: {
    name: 'GitHub',
    Icon: SiGithub,
    tone: '#181717',
    imageSrc: '/img/github.svg',
    url: 'https://github.com/wellwelwel',
  },
  instagram: {
    name: 'Instagram',
    Icon: SiInstagram,
    tone: '#e4405f',
    imageSrc: '/img/instagram.svg',
    url: 'https://www.instagram.com/wellwelwel/',
  },
  youtube: {
    name: 'YouTube',
    Icon: SiYoutube,
    tone: '#ff0000',
    imageSrc: '/img/youtube.svg',
    url: 'https://www.youtube.com/@weslleyio',
  },
  sponsors: {
    name: 'GitHub Sponsors',
    Icon: SiGithubsponsors,
    tone: '#ea4aaa',
    imageSrc: '/img/sponsor.svg',
    url: 'https://github.com/sponsors/wellwelwel',
  },
} satisfies Record<string, SocialLink>;
