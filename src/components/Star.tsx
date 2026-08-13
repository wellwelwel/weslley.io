import type { ReactNode } from 'react';
import { Star as StarIcon } from 'lucide-react';
import { Github } from '@site/src/components/icons/Github';
import { SafeLink } from '@site/src/components/SafeLink';

type StarOptions = {
  repo: string;
  mark?: string;
};

const LABEL = 'Deixe sua estrela';

const motion = 'duration-250 ease-swift';

const iconClass = `col-start-1 row-start-1 size-4 transition-[opacity,scale,filter] ${motion}`;

export const Star = ({ repo, mark }: StarOptions): ReactNode => (
  <SafeLink
    to={`https://github.com/${repo}`}
    aria-label={`${LABEL} no ${repo}`}
    draggable={false}
    className='group inline-flex h-11 items-center gap-3 rounded-full bg-ink pr-1.5 pl-5 font-sans text-[0.9375rem] font-semibold text-paper no-underline shadow-[0_1px_2px_var(--shade-soft),0_4px_10px_-4px_var(--shade-deep)] transition-[box-shadow,scale] duration-750 ease-swift hover:no-underline hover:shadow-[0_1px_2px_var(--shade-soft),0_10px_18px_-8px_var(--shade-deep)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-98'
  >
    <span className='flex items-center gap-2.5 leading-6 whitespace-nowrap'>
      <Github className='size-4.5 shrink-0' />
      {LABEL}
    </span>

    <span className='relative flex size-8 shrink-0 items-center justify-center rounded-full bg-ink'>
      <span
        style={{ backgroundColor: mark }}
        className={`absolute inset-0 rounded-full bg-paper transition-opacity ${motion} group-hover:opacity-0 group-focus-visible:opacity-0`}
      />

      <span className='relative grid size-4 place-items-center'>
        <StarIcon
          fill='currentColor'
          className={`${iconClass} text-ink group-hover:scale-25 group-hover:opacity-0 group-hover:blur-[4px] group-focus-visible:scale-25 group-focus-visible:opacity-0 group-focus-visible:blur-[4px]`}
          aria-hidden='true'
        />
        <StarIcon
          fill='currentColor'
          style={{ color: mark }}
          className={`${iconClass} scale-25 text-paper opacity-0 blur-[4px] group-hover:scale-100 group-hover:opacity-100 group-hover:blur-none group-focus-visible:scale-100 group-focus-visible:opacity-100 group-focus-visible:blur-none`}
          aria-hidden='true'
        />
      </span>
    </span>
  </SafeLink>
);
