import type { ReactNode } from 'react';
import { Star as StarIcon } from 'lucide-react';
import { Github } from '@site/src/components/icons/Github';
import { SafeLink } from '@site/src/components/SafeLink';

type StarOptions = {
  repo: string;
  mark?: string;
};

const LABEL = 'Deixe sua estrela';

const iconClass =
  'col-start-1 row-start-1 size-4 transition-[opacity,scale,filter] duration-250 ease-[cubic-bezier(0.2,0,0,1)]';

export const Star = ({ repo, mark }: StarOptions): ReactNode => (
  <SafeLink
    to={`https://github.com/${repo}`}
    aria-label={`${LABEL} no ${repo}`}
    draggable={false}
    className='group inline-flex h-11 items-center gap-3 rounded-full bg-ink pr-1.5 pl-5 font-sans text-[0.9375rem] font-semibold text-paper no-underline shadow-[0_1px_2px_rgb(14_9_39_/_0.16),0_5px_5px_-6px_rgb(14_9_39_/_0.4)] transition-[background-color,box-shadow,scale] duration-750 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-ink/90 hover:text-paper hover:no-underline hover:shadow-[0_1px_2px_rgb(14_9_39_/_0.18),0_10px_10px_-8px_rgb(14_9_39_/_0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-98'
  >
    <span className='flex items-center gap-2.5 leading-6 whitespace-nowrap'>
      <Github className='size-4.5 shrink-0' />
      {LABEL}
    </span>

    <span
      style={{ backgroundColor: mark }}
      className='flex size-8 shrink-0 items-center justify-center rounded-full bg-paper text-ink'
    >
      <span className='grid size-4 place-items-center'>
        <StarIcon
          className={`${iconClass} group-hover:scale-25 group-hover:opacity-0 group-hover:blur-[4px] group-focus-visible:scale-25 group-focus-visible:opacity-0 group-focus-visible:blur-[4px]`}
          aria-hidden='true'
        />
        <StarIcon
          fill='currentColor'
          className={`${iconClass} scale-25 opacity-0 blur-[4px] group-hover:scale-100 group-hover:opacity-100 group-hover:blur-none group-focus-visible:scale-100 group-focus-visible:opacity-100 group-focus-visible:blur-none`}
          aria-hidden='true'
        />
      </span>
    </span>
  </SafeLink>
);
