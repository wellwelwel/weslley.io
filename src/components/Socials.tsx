import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { SafeLink } from '@site/src/components/SafeLink';
import { socialLinks } from '@site/src/helpers/social-links';

export type SocialsOptions = {
  onHover: (name: string | null) => void;
};

const RESTORE_DELAY_MS = 150;

export const Socials = ({ onHover }: SocialsOptions): ReactNode => {
  const restore = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const enter = (name: string) => {
    clearTimeout(restore.current);
    onHover(name);
  };

  const leave = () => {
    clearTimeout(restore.current);
    restore.current = setTimeout(() => onHover(null), RESTORE_DELAY_MS);
  };

  useEffect(() => () => clearTimeout(restore.current), []);

  return (
    <nav aria-label='Redes sociais' className='flex items-center gap-1'>
      {Object.values(socialLinks).map(({ name, imageSrc, url }) => (
        <SafeLink
          key={name}
          to={url}
          aria-label={name}
          draggable={false}
          onPointerEnter={() => enter(name)}
          onPointerLeave={leave}
          onFocus={() => enter(name)}
          onBlur={leave}
          className='group flex size-10 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
        >
          <img
            src={imageSrc}
            alt=''
            decoding='async'
            draggable={false}
            className='size-5.5 opacity-95 transition-[opacity,scale,translate] duration-250 ease-[cubic-bezier(0.2,0,0,1)] group-hover:-translate-y-0.5 group-hover:scale-115 group-hover:opacity-100 group-focus-visible:scale-115 group-focus-visible:opacity-100'
          />
        </SafeLink>
      ))}
    </nav>
  );
};
