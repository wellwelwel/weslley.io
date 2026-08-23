import type { KeyboardEvent, ReactNode } from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Picture } from '@site/src/components/Picture';

export type Shot = {
  src: string;
  alt: string;
  caption?: string;
};

export type Gallery = {
  label: string;
  shots: Shot[];
  at: number;
};

type ViewerOptions = {
  gallery: Gallery;
};

type Show = (gallery: Gallery) => void;

export const ViewerContext = createContext<Show | null>(null);

export const useViewer = (): Show => {
  const show = useContext(ViewerContext);

  if (!show) throw new Error('useViewer must be used within a ViewerContext');

  return show;
};

const STEPPER =
  'absolute top-1/2 flex size-10 -translate-y-1/2 cursor-pointer appearance-none items-center justify-center rounded-full border-0 bg-paper p-0 text-ink shadow-[0_1px_2px_rgb(14_9_39_/_0.15),0_8px_20px_-10px_rgb(14_9_39_/_0.45)] transition-[background-color,opacity,scale] duration-250 ease-swift hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-90';

const FAINT = 'opacity-45 hover:opacity-70';

const within = (index: number, count: number): number =>
  Math.min(Math.max(index, 0), count - 1);

export const Viewer = ({ gallery }: ViewerOptions): ReactNode => {
  const root = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(() =>
    within(gallery.at, gallery.shots.length)
  );
  const count = gallery.shots.length;
  const shot = gallery.shots[index];

  useEffect(() => {
    root.current?.focus();
  }, []);

  const step = (delta: number): void =>
    setIndex((current) => (current + delta + count) % count);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') step(-1);
    if (event.key === 'ArrowRight') step(1);
  };

  return (
    <div
      ref={root}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      aria-label={gallery.label}
      className='relative flex min-h-0 flex-1 flex-col bg-paper outline-none'
    >
      <div className='flex min-h-9 items-center px-[clamp(1rem,3vw,2rem)] pt-[clamp(1rem,3vw,2rem)] pr-16'>
        <p
          aria-live='polite'
          className='m-0 ml-auto text-[0.6875rem]/none font-bold tracking-widest text-muted uppercase tabular-nums'
        >
          {gallery.label} · {index + 1} / {count}
        </p>
      </div>

      <figure className='relative m-0 flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-[clamp(1rem,3vw,2rem)] py-[clamp(1rem,3vw,2rem)]'>
        <Picture
          key={shot.src}
          src={shot.src}
          alt={shot.alt}
          sizes='(min-width: 80rem) 76rem, 100vw'
          draggable={false}
          className='max-h-full min-h-0 max-w-full rounded-2xl object-contain shadow-[0_20px_50px_-20px_rgb(14_9_39_/_0.5)]'
        />

        {shot.caption && (
          <figcaption className='m-0 shrink-0 text-center text-[0.8125rem]/normal font-medium text-soft text-pretty'>
            {shot.caption}
          </figcaption>
        )}
      </figure>

      <button
        type='button'
        onClick={() => step(-1)}
        aria-label='Anterior'
        className={clsx(STEPPER, 'left-4', index === 0 && FAINT)}
      >
        <ChevronLeft className='size-5' aria-hidden='true' />
      </button>

      <button
        type='button'
        onClick={() => step(1)}
        aria-label='Próximo'
        className={clsx(STEPPER, 'right-4', index === count - 1 && FAINT)}
      >
        <ChevronRight className='size-5' aria-hidden='true' />
      </button>
    </div>
  );
};
