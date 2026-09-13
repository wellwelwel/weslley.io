import type { Vars } from '@site/src/helpers/vars';
import type { ReactNode } from 'react';
import { memo, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ExternalLink } from 'lucide-react';
import { SafeLink } from '@site/src/components/SafeLink';
import { motion } from '@site/src/helpers/reduced-motion';
import { useDownloads } from '@site/src/hooks/useDownloads';

type TrackStyle = Vars<'--above' | '--below'>;

const SLOTS = 3;
const SPIN = 1.5;
const LEAD = 0.5;
const SPIN_REDUCED = 0.6;

const WHEEL =
  'mx-auto h-[calc(var(--row)*3+1rem)] w-60 max-w-full touch-pan-y overflow-y-auto overscroll-contain scroll-pb-4 [scrollbar-width:none] sm:w-80 [&::-webkit-scrollbar]:hidden';
const TRACK =
  'm-0 flex list-none flex-col px-0 pt-[calc(var(--row)*var(--above))] pb-[calc(var(--row)*var(--below)+1rem)]';
const ROW =
  'group flex h-(--row) items-center justify-between gap-3 no-underline [scroll-snap-align:end] hover:no-underline focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-accent';
const LABEL = 'text-sm/none font-bold tracking-widest text-ink/55 tabular-nums';
const VALUE =
  'font-featured text-2xl/none font-extrabold text-ink tabular-nums sm:text-[1.75rem]/none';
const OPEN = 'text-base/none font-semibold text-ink/50 sm:text-lg/none';
const NOTE =
  'pointer-events-none absolute top-full right-0.25 text-[0.625rem]/none font-semibold tracking-wide text-ink/60';
const ICON =
  'size-3.5 shrink-0 text-accent transition-colors duration-250 ease-swift group-hover:text-ink';
const RUNNING = 'em curso';

const endOf = ({ scrollHeight, clientHeight }: HTMLDivElement): number =>
  scrollHeight - clientHeight;

export const Milestones = memo((): ReactNode => {
  const wheel = useRef<HTMLDivElement>(null);
  const [settled, setSettled] = useState(false);
  const { milestones, source } = useDownloads();
  const scrollable = milestones.length > SLOTS;
  const slack = scrollable ? 0 : (SLOTS - milestones.length) / 2;
  const track: TrackStyle = {
    '--above': String(scrollable ? SLOTS - 1 : slack),
    '--below': String(slack),
  };

  useEffect(() => {
    const node = wheel.current;
    const end = node ? endOf(node) : 0;
    if (!node || !end || settled) return;

    const travel = { full: end, reduced: end * SPIN_REDUCED };
    const rest = () => setSettled(true);

    const spin = gsap.fromTo(
      node,
      { scrollTop: end - motion(travel) },
      {
        scrollTop: end,
        duration: SPIN,
        delay: LEAD,
        ease: 'power3.out',
        onComplete: rest,
      }
    );

    const release = () => {
      spin.kill();
      rest();
    };

    node.addEventListener('pointerdown', release);
    node.addEventListener('wheel', release, { passive: true });

    return () => {
      spin.kill();
      node.removeEventListener('pointerdown', release);
      node.removeEventListener('wheel', release);
    };
  }, [settled]);

  return (
    <div
      ref={wheel}
      data-scroll=''
      className={clsx(
        WHEEL,
        scrollable && 'picker',
        settled && '[scroll-snap-type:y_mandatory]'
      )}
    >
      <ul aria-label='Downloads anuais' style={track} className={TRACK}>
        {milestones.map(({ year, value, running, reading }) => {
          const note = running && value ? RUNNING : '';

          return (
            <li key={year} className='halo'>
              <SafeLink
                to={source}
                draggable={false}
                aria-label={reading}
                className={ROW}
              >
                <span className={LABEL}>{year}</span>

                <span className='flex items-center gap-1.5'>
                  <span className='relative flex'>
                    {value ? (
                      <span aria-hidden='true' className={VALUE}>
                        {value}
                      </span>
                    ) : (
                      <span className={OPEN}>{RUNNING}</span>
                    )}

                    {note && (
                      <span aria-hidden='true' className={NOTE}>
                        {note}
                      </span>
                    )}
                  </span>

                  <ExternalLink aria-hidden='true' className={ICON} />
                </span>
              </SafeLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
});
