import type { MouseEvent, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Picture } from '@site/src/components/Picture';
import { SafeLink } from '@site/src/components/SafeLink';
import { canHover } from '@site/src/helpers/hover';

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
  const [revealed, setRevealed] = useState<string | null>(null);
  const row = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!revealed) return;

    const dismiss = ({ target }: PointerEvent) => {
      if (target instanceof Node && row.current?.contains(target)) return;

      setRevealed(null);
    };

    document.addEventListener('pointerdown', dismiss);

    return () => document.removeEventListener('pointerdown', dismiss);
  }, [revealed]);

  const press = (event: MouseEvent<HTMLElement>, title: string) => {
    if (canHover()) return;

    if (revealed === title) {
      setRevealed(null);
      return;
    }

    event.preventDefault();
    setRevealed(title);
  };

  return (
    <div ref={row} className='flex items-center justify-center gap-5'>
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
              className='size-full object-contain drop-shadow-[0_1px_2px_rgb(14_9_39_/_0.3)] transition-[scale,translate] duration-250 ease-[cubic-bezier(0.2,0,0,1)] group-hover:-translate-y-0.5 group-hover:scale-110 group-focus-visible:scale-110 group-data-revealed:scale-110'
            />

            <span
              aria-hidden='true'
              className='pointer-events-none absolute bottom-[calc(100%+0.625rem)] left-1/2 flex w-max max-w-[min(13rem,calc(50vw-1rem))] -translate-x-1/2 translate-y-1 flex-col gap-1 rounded-xl bg-ink px-3.5 py-2.5 opacity-0 shadow-[0_2px_4px_rgb(14_9_39_/_0.2),0_14px_28px_-10px_rgb(14_9_39_/_0.55)] transition-[opacity,translate] duration-250 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 group-data-revealed:translate-y-0 group-data-revealed:opacity-100'
            >
              <span className='text-[0.8125rem]/[1.35] font-semibold text-paper text-balance'>
                {title}
              </span>
              <span className='text-[0.75rem]/[1.35] text-paper/65 text-balance'>
                {issuer}
              </span>
              <span className='absolute -bottom-1 left-1/2 size-2.5 -translate-x-1/2 rotate-45 rounded-xs bg-ink' />
            </span>
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
