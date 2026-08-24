import type { ReactNode } from 'react';
import { memo } from 'react';
import { Picture } from '@site/src/components/Picture';
import { useViewer } from '@site/src/components/Talks/gallery';

export type Moment = {
  src: string;
  alt?: string;
};

export type MomentsOptions = {
  moments: Moment[];
};

const LABEL = 'Momentos';

export const Moments = memo(({ moments }: MomentsOptions): ReactNode => {
  const show = useViewer();
  const shots = moments.map(({ src, alt = '' }) => ({
    src,
    alt,
    caption: alt,
  }));

  return (
    <ul
      aria-label='Galeria de imagens'
      className='m-0 grid list-none grid-cols-2 gap-2.5 p-0 sm:grid-cols-3 lg:grid-cols-4'
    >
      {shots.map((shot, index) => (
        <li key={shot.src} className='m-0'>
          <button
            type='button'
            onClick={() => show({ label: LABEL, shots, at: index })}
            aria-label={`Abrir imagem ${index + 1} de ${shots.length}`}
            className='group/shot relative block aspect-4/3 w-full cursor-pointer appearance-none overflow-hidden rounded-2xl border-0 bg-well p-0 transition-[scale,box-shadow] duration-250 ease-swift hover:scale-102 hover:shadow-[0_12px_28px_-14px_rgb(14_9_39_/_0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-98'
          >
            <Picture
              src={shot.src}
              alt={shot.alt}
              sizes='(min-width: 64rem) 18rem, (min-width: 40rem) 30vw, 45vw'
              loading='lazy'
              draggable={false}
              className='size-full object-cover transition-transform duration-500 ease-swift group-hover/shot:scale-105'
            />
          </button>
        </li>
      ))}
    </ul>
  );
});
