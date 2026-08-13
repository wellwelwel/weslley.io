import type { CSSProperties, ReactNode, RefObject } from 'react';
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card } from '@site/src/components/Agenda/Card';
import { AVATAR, slots } from '@site/src/components/Agenda/slots';
import {
  anchor,
  extent,
  labels,
  openings,
  placeOf,
  stations,
  upcomingIndex,
} from '@site/src/components/Agenda/timeline';
import { Picture } from '@site/src/components/Picture';
import { motion } from '@site/src/helpers/reduced-motion';

gsap.registerPlugin(Observer);

type RootStyle = CSSProperties & {
  '--tone': string;
  '--ticker-travel': string;
  '--rise-travel': string;
  '--hop-travel': string;
};

type Stage = {
  focus: number;
  from: number;
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

const STEPPER =
  'relative flex size-9 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-full border-0 p-0 transition-[background-color,color,scale] duration-250 ease-swift after:absolute after:-inset-0.75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-90 max-sm:size-8 short:size-8';

const EMPHASIS = {
  strong:
    'bg-[var(--tone)] text-paper hover:bg-[color-mix(in_srgb,var(--tone)_82%,white)]',
  faint:
    'bg-[color-mix(in_srgb,var(--tone)_15%,transparent)] text-[var(--tone)] hover:bg-[color-mix(in_srgb,var(--tone)_28%,transparent)]',
};

/** Matches the card's own `duration-500`, so a leaving card stays dressed. */
const SETTLE = 500;

const SEEN = 1;
const WINDOW = 2;

/* Every card stretches to the tallest one, so the deck keeps the height it
   measured across visits to the slide, not only across renders. */
let held: number | undefined;

const useDeckHeight = (deck: RefObject<HTMLDivElement | null>) => {
  const [height, setHeight] = useState(held);

  useLayoutEffect(() => {
    if (height !== undefined || !deck.current) return;

    /* Rounding here would resize the deck by half a pixel and nudge every
       line above it, so the fractional height is the one worth keeping. */
    held = deck.current.getBoundingClientRect().height;
    setHeight(held);
  }, [height]);

  useEffect(() => {
    let frame = 0;

    const remeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        held = undefined;
        setHeight(undefined);
      });
    };

    window.addEventListener('resize', remeasure);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', remeasure);
    };
  }, []);

  return height;
};

export const Agenda = memo((): ReactNode => {
  const [{ focus, from }, setStage] = useState<Stage>(() => {
    const start = upcomingIndex();

    return { focus: start, from: start };
  });
  const track = useRef<HTMLElement | null>(null);
  const deck = useRef<HTMLDivElement | null>(null);
  const swiped = useRef(false);
  const height = useDeckHeight(deck);
  const { date } = slots[focus];
  const { day, month, weekday } = labels[focus];
  const opening = openings[focus];

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

  const focusOn = (index: number): void =>
    setStage(({ focus: current }) => ({ focus: index, from: current }));

  const step = (delta: number): void => {
    navigator.vibrate?.(10);
    setStage(({ focus: current }) => ({
      focus: (current + delta + slots.length) % slots.length,
      from: current,
    }));
  };

  const swipe = (delta: number): void => {
    if (swiped.current) return;

    swiped.current = true;
    step(delta);
  };

  const ahead = focus < slots.length - 1;

  useEffect(() => {
    const observer = Observer.create({
      target: deck.current,
      type: 'touch',
      lockAxis: true,
      tolerance: 24,
      onDragStart: () => (swiped.current = false),
      onLeft: () => swipe(1),
      onRight: () => swipe(-1),
    });

    return () => observer.kill();
  }, []);

  useEffect(() => {
    track.current?.scrollTo({ left: anchor(focus), behavior: 'smooth' });
  }, [focus]);

  useEffect(() => {
    if (from === focus) return;

    const timer = window.setTimeout(
      () => setStage((stage) => ({ focus: stage.focus, from: stage.focus })),
      SETTLE
    );

    return () => window.clearTimeout(timer);
  }, [from, focus]);

  return (
    <div
      style={style}
      className='flex flex-col items-start gap-3 [--reach:calc(var(--spread)-0.9rem)] [--spread:15rem] short:gap-1.5 short-wide:[--spread:4rem] lg:[--spread:3.5rem] xl:[--spread:9.5rem] min-[90rem]:[--spread:15rem]'
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
          <button
            type='button'
            aria-label='Evento anterior'
            onClick={() => step(-1)}
            className={clsx(STEPPER, ahead ? EMPHASIS.faint : EMPHASIS.strong)}
          >
            <ArrowLeft className='size-4' aria-hidden='true' />
          </button>
          <button
            type='button'
            aria-label='Próximo evento'
            onClick={() => step(1)}
            className={clsx(STEPPER, ahead ? EMPHASIS.strong : EMPHASIS.faint)}
          >
            <ArrowRight className='size-4' aria-hidden='true' />
          </button>
        </div>
      </div>

      <div
        ref={deck}
        style={{ minHeight: height }}
        className='grid animate-rise [animation-delay:500ms] short-wide:pr-(--reach) lg:pr-(--reach)'
      >
        {slots.map((slot, index) => {
          const here = placeOf(index, focus);
          const there = placeOf(index, from);

          return (
            <Card
              key={`${slot.date}:${slot.title}`}
              slot={slot}
              place={here}
              frosted={here <= SEEN || there <= SEEN}
              dressed={
                height === undefined || here <= WINDOW || there <= WINDOW
              }
              onFocus={() => focusOn(index)}
            />
          );
        })}
      </div>

      <div className='mt-[clamp(0.75rem,6.5svh-1.25rem,3rem)] w-full animate-ticker [animation-delay:580ms] max-sm:mb-[clamp(0px,5svh-2rem,1.5rem)] sm:mb-2 short:mt-4.5 short:mb-0 short-wide:mt-0 cramped:hidden'>
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
