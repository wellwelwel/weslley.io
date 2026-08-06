import type { ReactNode } from 'react';
import mvp2025 from '@site/src/assets/img/badges/mvp-2025.png';
import mvp2026 from '@site/src/assets/img/badges/mvp-2026.png';
import { SafeLink } from '@site/src/components/SafeLink';

type Badge = {
  src: string;
  title: string;
  issuer: string;
  url: string;
};

const ISSUER = 'Issued by Microsoft Most Valuable Professionals Program';

const BADGES: Badge[] = [
  {
    src: mvp2025,
    title: '2025 Microsoft Most Valuable Professional (MVP)',
    issuer: ISSUER,
    url: 'https://www.credly.com/badges/36aeaad9-6187-47a2-8107-d52a90a565d4',
  },
  {
    src: mvp2026,
    title: '2026-2027 Microsoft Most Valuable Professional (MVP)',
    issuer: ISSUER,
    url: 'https://www.credly.com/badges/b6ddb701-6b63-4b06-8650-f85da5f9c727',
  },
];

export const MvpBadges = (): ReactNode => (
  <div className='flex items-center justify-center gap-5'>
    {BADGES.map(({ src, title, issuer, url }) => (
      <SafeLink
        key={title}
        to={url}
        aria-label={`${title}, ${issuer}`}
        draggable={false}
        className='group relative block size-[clamp(2.5rem,13.33svh-2rem,7rem)] rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'
      >
        <img
          src={src}
          alt=''
          decoding='async'
          draggable={false}
          className='size-full object-contain drop-shadow-[0_1px_2px_rgb(14_9_39_/_0.3)] transition-[scale,translate] duration-250 ease-[cubic-bezier(0.2,0,0,1)] group-hover:-translate-y-0.5 group-hover:scale-110 group-focus-visible:scale-110'
        />

        <span
          aria-hidden='true'
          className='pointer-events-none absolute bottom-[calc(100%+0.625rem)] left-1/2 flex w-max max-w-52 -translate-x-1/2 translate-y-1 flex-col gap-1 rounded-xl bg-ink px-3.5 py-2.5 opacity-0 shadow-[0_2px_4px_rgb(14_9_39_/_0.2),0_14px_28px_-10px_rgb(14_9_39_/_0.55)] transition-[opacity,translate] duration-250 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100'
        >
          <span className='text-[0.8125rem]/[1.35] font-semibold text-paper text-balance'>
            {title}
          </span>
          <span className='text-[0.75rem]/[1.35] text-paper/65 text-balance'>
            {issuer}
          </span>
          <span className='absolute -bottom-1 left-1/2 size-2.5 -translate-x-1/2 rotate-45 rounded-xs bg-ink' />
        </span>
      </SafeLink>
    ))}
  </div>
);
