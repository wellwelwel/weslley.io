import type { MouseEvent, ReactNode } from 'react';
import { Picture } from '@site/src/components/Picture';
import { SafeLink } from '@site/src/components/SafeLink';
import { Tooltip } from '@site/src/components/Tooltip';
import { canHover } from '@site/src/helpers/hover';
import { useReveal } from '@site/src/hooks/useReveal';

type Badge = {
  src: string;
  title: string;
  issuer: string;
  radius: string;
  url?: string;
};

const claude = '/img/plush/claude.png';
const mvp2025 = '/img/badges/mvp-2025.png';
const mvp2026 = '/img/badges/mvp-2026.png';

const MICROSOFT = 'Issued by Microsoft Most Valuable Professionals Program';

const BADGES: Badge[] = [
  {
    src: mvp2025,
    title: '2025 Microsoft Most Valuable Professional (MVP)',
    issuer: MICROSOFT,
    radius: 'rounded-full',
    url: 'https://www.credly.com/badges/36aeaad9-6187-47a2-8107-d52a90a565d4',
  },
  {
    src: mvp2026,
    title: '2026-2027 Microsoft Most Valuable Professional (MVP)',
    issuer: MICROSOFT,
    radius: 'rounded-full',
    url: 'https://www.credly.com/badges/b6ddb701-6b63-4b06-8650-f85da5f9c727',
  },
  {
    src: claude,
    title: 'Anthropic Cyber Verification Program (CVP)',
    issuer: 'Issued by Anthropic on July 19, 2026',
    radius: 'rounded-2xl',
  },
];

const SHELL =
  'group relative block size-[clamp(2.5rem,13.33svh-2rem,7rem)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent';

export const Badges = (): ReactNode => {
  const { container, revealed, toggle } = useReveal<HTMLDivElement>();

  const press = (event: MouseEvent<HTMLElement>, title: string) => {
    if (canHover()) return;

    if (revealed !== title) event.preventDefault();

    toggle(title);
  };

  return (
    <div ref={container} className='flex items-center justify-center gap-5'>
      {BADGES.map(({ src, title, issuer, radius, url }) => {
        const shared = {
          'aria-label': `${title}, ${issuer}`,
          'data-revealed': revealed === title || undefined,
          className: `${SHELL} ${radius}`,
          onClick: (event: MouseEvent<HTMLElement>) => press(event, title),
        };

        const content = (
          <>
            <Picture
              src={src}
              alt=''
              sizes='7rem'
              decoding='async'
              draggable={false}
              className='size-full object-contain drop-shadow-[0_1px_2px_var(--shade-deep)] transition-[scale,translate] duration-250 ease-[cubic-bezier(0.2,0,0,1)] group-hover:-translate-y-0.5 group-hover:scale-110 group-focus-visible:scale-110 group-data-revealed:scale-110'
            />

            <Tooltip label={title} detail={issuer} />
          </>
        );

        if (!url)
          return (
            <div key={title} role='img' tabIndex={0} {...shared}>
              {content}
            </div>
          );

        return (
          <SafeLink key={title} to={url} draggable={false} {...shared}>
            {content}
          </SafeLink>
        );
      })}
    </div>
  );
};
