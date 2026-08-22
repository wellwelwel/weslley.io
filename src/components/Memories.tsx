import type { CSSProperties, ReactNode } from 'react';
import { memo } from 'react';
import { Picture } from '@site/src/components/Picture';
import { motion } from '@site/src/helpers/reduced-motion';

type Band = {
  /** Speed relative to the middle band. */
  rate: number;
  /** Where the strip starts inside its loop, from 0 to 1. */
  phase: number;
};

type ReelStyle = CSSProperties & {
  '--pace': string;
  '--ticker-travel': string;
};

type BandStyle = CSSProperties & {
  '--rate': string;
  '--phase': string;
};

/* Dealt to the bands in runs of four, so no event repeats inside a band. */
const PHOTOS = [
  '/img/slide/codecon-001.jpg',
  '/img/slide/roga-001.jpg',
  '/img/slide/devfest-cerrado-001.jpg',
  '/img/slide/tdc-001.jpg',

  '/img/slide/codecon-002.jpg',
  '/img/slide/roga-002.jpg',
  '/img/slide/devfest-cerrado-002.jpg',
  '/img/slide/usp-001.jpg',

  '/img/slide/mvpconf-001.jpg',
  '/img/slide/oracle-001.jpg',
  '/img/talks/devfest-cerrado-2025/moments/07.jpg',
  '/img/slide/nodebr-001.jpg',
];

/** Seconds per photo on the middle band. */
const PACE = {
  full: 9,
  reduced: 15,
};

const TICKER = {
  full: '0.6em',
  reduced: '0.35em',
};

const DRAG = 0.5;

const LEAD = 200;
const STEP = 90;

/* Three bands span the screen plus what the tilt sweeps across it. */
const REEL =
  'pointer-events-none fixed inset-0 overflow-hidden vignette [--band:calc((100dvh+var(--sweep)-2*var(--gap))/3)] [--frame:min(78vw,44svh)] [--gap:1.25rem] [--sweep:calc(100vw*0.115)] [--tilt:-6deg] sm:[--frame:calc(var(--band)*3/2)]';

/* Overshoots both sides, so the tilt never shows a strip end. */
const FIELD =
  'absolute inset-y-0 -inset-x-[8%] flex flex-col justify-center gap-(--gap) rotate-(--tilt)';

const FRAME =
  'w-(--frame) shrink-0 overflow-hidden rounded-3xl bg-ink/8 shadow-[inset_0_0_0_1px_rgb(240_244_255_/_0.08),0_16px_32px_-18px_rgb(0_0_0_/_0.6)] aspect-4/3 sm:aspect-3/2';

/* Darkens the ground under the text beyond the slide tint. */
const SCRIM =
  'pointer-events-none fixed inset-0 bg-linear-to-b from-paper/15 via-paper/60 to-paper/25';

const SIZES = '(min-width: 40rem) 48vw, 78vw';

const BANDS: Band[] = [
  { rate: DRAG, phase: 0.62 },
  { rate: 1, phase: 0.18 },
  { rate: DRAG, phase: 0.34 },
];

/** Photos per band. Equal strips keep the rates true, even if a few repeat. */
const SHARE = Math.ceil(PHOTOS.length / BANDS.length);

/** Doubled, so the strip loops seamlessly. */
const strip = (band: number): string[] => {
  const share = Array.from(
    { length: SHARE },
    (_, index) => PHOTOS[(band * SHARE + index) % PHOTOS.length]
  );

  return [...share, ...share];
};

export const Memories = memo((): ReactNode => {
  const style: ReelStyle = {
    '--pace': `${motion(PACE) * SHARE}s`,
    '--ticker-travel': motion(TICKER),
  };

  return (
    <>
      <div
        role='img'
        aria-label='Memórias de palestras, mentorias e comunidades'
        style={style}
        className={REEL}
      >
        <div className={FIELD}>
          {BANDS.map(({ rate, phase }, index) => {
            const photos = strip(index);
            const drift: BandStyle = {
              '--rate': String(rate),
              '--phase': String(phase),
            };

            return (
              <div
                key={photos[0]}
                style={{ animationDelay: `${LEAD + index * STEP}ms` }}
                className='animate-ticker'
              >
                <ul
                  style={drift}
                  className='m-0 flex w-max drift list-none gap-(--gap) p-0'
                >
                  {photos.map((src, position) => (
                    <li key={`${src}:${position}`} className={FRAME}>
                      <Picture
                        src={src}
                        alt=''
                        sizes={SIZES}
                        loading='lazy'
                        decoding='async'
                        draggable={false}
                        className='size-full object-cover'
                      />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div aria-hidden='true' className={SCRIM} />
    </>
  );
});
