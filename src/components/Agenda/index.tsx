import type { TalkOpener } from '@site/src/components/Agenda/Card';
import type { Vars } from '@site/src/helpers/vars';
import type { ReactNode } from 'react';
import { memo, useCallback, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Card } from '@site/src/components/Agenda/Card';
import {
  anchor,
  extent,
  labels,
  openings,
  placeOf,
  stations,
} from '@site/src/components/Agenda/timeline';
import { useDeckHeight } from '@site/src/components/Agenda/useDeckHeight';
import { useStage } from '@site/src/components/Agenda/useStage';
import { Picture } from '@site/src/components/Picture';
import { Stepper } from '@site/src/components/Stepper';
import { AVATAR, slots } from '@site/src/data/slots';
import { motion } from '@site/src/helpers/reduced-motion';

type RootStyle = Vars<
  '--tone' | '--ticker-travel' | '--rise-travel' | '--hop-travel'
>;

type AgendaOptions = {
  onTalk: TalkOpener;
};

type Placement = {
  place: number;
  passed: boolean;
  frosted: boolean;
  dressed: boolean;
};

const TONE = '#7a77ff';

const TICKER = {
  full: '0.6em',
  reduced: '0.35em',
};

const RISE = {
  full: '1.25rem',
  reduced: '0.75rem',
};

const HOP = {
  full: '1',
  reduced: '0.6',
};

const SEEN = 1;
const WINDOW = 2;

const BEHIND = slots.length - 1;

/** Parks left: the card behind the focus, and any card leaving from there. */
const passedOf = (here: number, there: number): boolean =>
  here === BEHIND || (here > SEEN && (there === 0 || there === BEHIND));

export const Agenda = memo(({ onTalk }: AgendaOptions): ReactNode => {
  const track = useRef<HTMLElement | null>(null);
  const deck = useRef<HTMLDivElement | null>(null);
  const { focus, from, focusOn, step } = useStage(deck);
  const height = useDeckHeight(deck);
  const { date } = slots[focus];
  const { day, month, weekday } = labels[focus];
  const opening = openings[focus];
  const ahead = focus < slots.length - 1;

  const style: RootStyle = {
    '--tone': TONE,
    '--ticker-travel': motion(TICKER),
    '--rise-travel': motion(RISE),
    '--hop-travel': motion(HOP),
  };

  const attach = useCallback((node: HTMLElement | null): void => {
    if (node && !track.current) node.scrollTo({ left: anchor(focus) });

    track.current = node;
  }, []);

  const placement = (index: number): Placement => {
    const here = placeOf(index, focus);
    const there = placeOf(index, from);

    return {
      place: here,
      passed: passedOf(here, there),
      frosted: here <= SEEN || there <= SEEN,
      dressed: height === undefined || here <= WINDOW || there <= WINDOW,
    };
  };

  useEffect(() => {
    track.current?.scrollTo({ left: anchor(focus), behavior: 'smooth' });
  }, [focus]);

  return (
    <div
      style={style}
      className='flex flex-col items-start gap-3 [--reach:calc(var(--spread)-0.9rem)] [--spread:15rem] short:gap-1.5 sm:max-lg:[--spread:min(17.85rem,100vw_-_25.6rem)] short-wide:[--spread:4rem] lg:[--spread:3.5rem] xl:[--spread:9.5rem] min-[90rem]:[--spread:15rem]'
    >
      <div className='flex w-full animate-ticker items-center justify-between gap-3 [animation-delay:420ms]'>
        <time
          dateTime={opening ? `${date}T${opening}` : date}
          className='flex items-center gap-3 text-shadow-sm text-shadow-paper/50 short:gap-2'
        >
          <span
            key={date}
            className='animate-ticker text-[2rem]/none font-[800] text-[var(--tone)] tabular-nums short:text-lg/none'
          >
            {day}
          </span>

          <span
            key={`labels:${date}:${opening}`}
            className='flex animate-ticker flex-col gap-1 [animation-delay:80ms]'
          >
            <span className='text-[0.6875rem]/none font-bold tracking-widest text-ink uppercase'>
              {month}
            </span>
            <span className='text-[0.6875rem]/none font-medium text-ink/55 capitalize tabular-nums short:hidden'>
              {opening ? `${weekday} · ${opening}` : weekday}
            </span>
          </span>
        </time>

        <div className='flex gap-2 max-sm:hidden'>
          <Stepper
            direction='previous'
            label='Evento anterior'
            emphasis={ahead ? 'faint' : 'strong'}
            onClick={() => step(-1)}
          />
          <Stepper
            direction='next'
            label='Próximo evento'
            emphasis={ahead ? 'strong' : 'faint'}
            onClick={() => step(1)}
          />
        </div>
      </div>

      <div
        ref={deck}
        style={{ minHeight: height }}
        className='grid animate-rise [animation-delay:500ms] short-wide:pr-(--reach) lg:pr-(--reach)'
      >
        {slots.map((slot, index) => (
          <Card
            key={`${slot.date}:${slot.title}`}
            slot={slot}
            {...placement(index)}
            onFocus={() => focusOn(index)}
            onTalk={onTalk}
          />
        ))}
      </div>

      <div className='mt-[clamp(0.75rem,18svh-7.125rem,3rem)] w-full animate-ticker [animation-delay:580ms] max-sm:mb-[clamp(0px,5svh-2rem,1.5rem)] sm:mb-2 short:mt-4.5 short:mb-0 short-wide:mt-0 cramped:hidden'>
        <nav
          ref={attach}
          data-scroll=''
          aria-label='Linha do tempo dos eventos'
          className='w-full soften touch-pan-x contain-inline-size overflow-x-auto overflow-y-hidden overscroll-x-contain text-shadow-sm text-shadow-paper/50 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        >
          <div
            className='relative h-14 short:h-8.5 sm:h-16.5'
            style={{ width: extent }}
          >
            {slots.map((slot, index) => (
              <button
                key={`${slot.date}:${slot.title}`}
                type='button'
                onClick={() => focusOn(index)}
                aria-current={index === focus ? 'date' : undefined}
                aria-label={`${labels[index].brief}: ${slot.event}`}
                style={{ left: stations[index] }}
                className={clsx(
                  'absolute bottom-0 flex -translate-x-1/2 cursor-pointer appearance-none flex-col items-center gap-1 border-0 bg-transparent p-0 transition-[opacity,scale] duration-250 ease-swift after:absolute after:inset-x-0 after:-inset-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-95 short:gap-0.5',
                  index === focus ? 'scale-105' : 'opacity-55 hover:opacity-75'
                )}
              >
                <span
                  className={clsx(
                    'text-[0.625rem]/none font-bold tracking-widest whitespace-nowrap uppercase',
                    index === focus ? 'text-ink' : 'text-ink/55 max-sm:hidden'
                  )}
                >
                  {labels[index].brief}
                </span>
                <span
                  aria-hidden='true'
                  className='h-2 w-px bg-ink/25 short:h-1'
                />
                <span className='flex size-7.5 items-center justify-center short:size-4 sm:size-10'>
                  <Picture
                    src={slot.logo ?? AVATAR}
                    alt=''
                    sizes='(max-height: 36rem) 1rem, (min-width: 40rem) 2rem, 1.5rem'
                    loading='lazy'
                    decoding='async'
                    draggable={false}
                    className='size-6 object-contain short:size-3.5 sm:size-8'
                  />
                </span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
});
