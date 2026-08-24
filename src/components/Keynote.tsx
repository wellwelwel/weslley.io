import type { ReactNode } from 'react';
import { memo } from 'react';
import { MonitorPlay } from 'lucide-react';
import { Picture } from '@site/src/components/Picture';
import { useViewer } from '@site/src/components/Talks/gallery';

export type KeynoteOptions = {
  slides: string[];
};

const LABEL = 'Slides';

export const Keynote = memo(({ slides }: KeynoteOptions): ReactNode => {
  const show = useViewer();
  const count = slides.length;
  const shots = slides.map((src, index) => ({
    src,
    alt: `Slide ${index + 1} de ${count}`,
  }));

  return (
    <button
      type='button'
      onClick={() => show({ label: LABEL, shots, at: 0 })}
      aria-label={`Iniciar apresentação com ${count} ${count === 1 ? 'slide' : 'slides'}`}
      className='group/deck flex w-full cursor-pointer appearance-none items-center gap-4 overflow-hidden rounded-2xl border-0 bg-well p-0 text-left transition-[background-color,scale] duration-250 ease-swift hover:bg-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.99]'
    >
      <span className='relative aspect-video w-40 shrink-0 overflow-hidden bg-well max-sm:w-28'>
        <Picture
          src={slides[0]}
          alt=''
          sizes='10rem'
          loading='lazy'
          draggable={false}
          className='size-full object-cover transition-transform duration-500 ease-swift group-hover/deck:scale-105'
        />
      </span>

      <span className='flex min-w-0 flex-col gap-1.5 pr-4'>
        <span className='flex items-center gap-2 text-sm font-semibold text-ink'>
          <MonitorPlay
            className='size-4 shrink-0 text-accent'
            aria-hidden='true'
          />
          Iniciar apresentação
        </span>
        <span className='text-[0.625rem]/none font-bold tracking-widest text-muted uppercase tabular-nums'>
          {count} {count === 1 ? 'slide' : 'slides'}
        </span>
      </span>
    </button>
  );
});
