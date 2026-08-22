import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ExternalLink } from 'lucide-react';
import { SafeLink } from '@site/src/components/SafeLink';
import { motion } from '@site/src/helpers/reduced-motion';
import { useYear } from '@site/src/hooks/useDownloads';

type Year = {
  year: number;
  downloads?: number;
  running?: boolean;
};

const CLOSED: Year[] = [
  { year: 2021, downloads: 91 },
  { year: 2022, downloads: 9_470 },
  { year: 2023, downloads: 9_733 },
  { year: 2024, downloads: 46_912_782 },
  { year: 2025, downloads: 233_754_383 },
];

const SPIN = 1.5;
const LEAD = 0.5;

const WHEEL =
  'mx-auto h-[calc(var(--row)*3+1rem)] w-64 max-w-full touch-pan-y overflow-y-auto overscroll-contain scroll-pb-4 picker [--row:2.75rem] [scrollbar-width:none] short:[--row:2.5rem] sm:w-70 sm:[--row:3rem] [&::-webkit-scrollbar]:hidden';
const TRACK = 'm-0 flex list-none flex-col p-0 pt-[calc(var(--row)*2)] pb-4';
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

const chart = (year: number): string =>
  `https://npm-stat.com/charts.html?author=weslley.io&from=${year}-01-01&to=${year}-12-31`;

export const Milestones = (): ReactNode => {
  const wheel = useRef<HTMLDivElement>(null);
  const [settled, setSettled] = useState(false);
  const current = useYear();
  const years: Year[] = [
    ...CLOSED,
    { year: current.year, downloads: current.total, running: true },
  ];
  const focus = years.reduce(
    (last, { downloads }, index) => (downloads === undefined ? last : index),
    0
  );

  useEffect(() => {
    const node = wheel.current;
    if (!node) return;

    const row = node.querySelector('li')?.getBoundingClientRect().height;
    if (!row) return;

    const roll = { full: focus, reduced: focus * 0.6 };
    const rest = () => setSettled(true);

    const spin = gsap.fromTo(
      node,
      { scrollTop: (focus - motion(roll)) * row },
      {
        scrollTop: focus * row,
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
  }, [focus]);

  return (
    <div
      ref={wheel}
      data-scroll=''
      className={clsx(WHEEL, settled && '[scroll-snap-type:y_mandatory]')}
    >
      <ul aria-label='Downloads anuais dos projetos autorais' className={TRACK}>
        {years.map(({ year, downloads, running }) => {
          const exact = downloads?.toLocaleString('pt-BR');
          const note = running && exact ? RUNNING : '';
          const reading = `${year}: ${exact ? `${exact} downloads` : RUNNING}${note ? `, ${note}` : ''}`;

          return (
            <li key={year} className='halo'>
              <SafeLink
                to={running ? current.source : chart(year)}
                draggable={false}
                aria-label={reading}
                className={ROW}
              >
                <span className={LABEL}>{year}</span>

                <span className='flex items-center gap-1.5'>
                  <span className='relative flex'>
                    <span className={exact ? VALUE : OPEN}>
                      {exact ?? RUNNING}
                    </span>

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
};
