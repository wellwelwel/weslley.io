import type { Direction } from '@site/src/components/Talks/chronology';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { subjectOf } from '@site/src/components/Talks/chronology';
import { EYEBROW } from '@site/src/components/Talks/styles';

type NeighborOptions = {
  slug: string;
  direction: Direction;
  onGo: () => void;
};

export const Neighbor = ({
  slug,
  direction,
  onGo,
}: NeighborOptions): ReactNode => {
  const subject = subjectOf(slug);
  if (!subject) return null;

  const ahead = direction === 'next';

  return (
    <button
      type='button'
      onClick={onGo}
      className={clsx(
        'group/neighbor flex cursor-pointer appearance-none flex-col gap-2 rounded-2xl border border-line bg-white px-4 py-3.5 transition-[border-color,scale] duration-250 ease-swift hover:border-edge focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.99]',
        ahead ? 'items-end text-right sm:col-start-2' : 'items-start text-left'
      )}
    >
      <span className={`${EYEBROW} flex items-center gap-1 text-accent`}>
        {ahead ? (
          <>
            Próxima
            <ArrowRight
              className='size-3 transition-transform duration-300 ease-swift group-hover/neighbor:translate-x-0.5'
              aria-hidden='true'
            />
          </>
        ) : (
          <>
            <ArrowLeft
              className='size-3 transition-transform duration-300 ease-swift group-hover/neighbor:-translate-x-0.5'
              aria-hidden='true'
            />
            Anterior
          </>
        )}
      </span>
      <span className='text-sm/tight font-semibold text-ink'>
        {subject.event}
      </span>
      <span className='line-clamp-2 text-[0.8125rem]/normal text-soft text-pretty'>
        {subject.title}
      </span>
    </button>
  );
};
