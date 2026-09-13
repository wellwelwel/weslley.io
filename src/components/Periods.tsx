import type { Vars } from '@site/src/helpers/vars';
import type { Period } from '@site/src/hooks/usePeriod';
import type { FC, KeyboardEvent, ReactNode, SVGProps } from 'react';
import { useEffect, useRef } from 'react';
import useIsomorphicLayoutEffect from '@docusaurus/useIsomorphicLayoutEffect';
import clsx from 'clsx';
import { Calendar } from '@site/src/components/icons/Calendar';
import { Parchment } from '@site/src/components/icons/Parchment';
import { Sparkler } from '@site/src/components/icons/Sparkler';
import { motion } from '@site/src/helpers/reduced-motion';
import { resetPeriod, setPeriod, usePeriod } from '@site/src/hooks/usePeriod';

type Option = {
  id: Period;
  label: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
};

type Step = (current: number, last: number) => number;

type PillStyle = Vars<'--at'>;

const OPTIONS: Option[] = [
  { id: 'monthly', label: 'Mensal', Icon: Calendar },
  { id: 'yearly', label: 'Anual', Icon: Sparkler },
  { id: 'lifetime', label: 'Linha do Tempo', Icon: Parchment },
];

/* One cell per option: a row on wide screens, a column on short ones. */
const CELLS = [
  'col-start-1 short-wide:row-start-1',
  'col-start-2 short-wide:row-start-2',
  'col-start-3 short-wide:row-start-3',
];

const next: Step = (current, last) => (current === last ? 0 : current + 1);
const previous: Step = (current, last) => (current === 0 ? last : current - 1);

const STEPS: Record<string, Step | undefined> = {
  ArrowRight: next,
  ArrowDown: next,
  ArrowLeft: previous,
  ArrowUp: previous,
  Home: () => 0,
  End: (_, last) => last,
};

const TICKER = { full: '0.6em', reduced: '0.35em' };

const GROUP =
  'relative inline-grid grid-cols-3 gap-1 rounded-xl p-1 backdrop-blur-sm animate-ticker [animation-delay:800ms] short-wide:grid-cols-1';

/* The 0.25rem step matches the group's gap-1. */
const PILL =
  'pointer-events-none col-start-1 row-start-1 translate-x-[calc(var(--at)*(100%+0.25rem))] rounded-lg border border-accent/50 bg-accent/15 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] short-wide:translate-x-0 short-wide:translate-y-[calc(var(--at)*(100%+0.25rem))]';

const CHIP =
  'relative z-1 row-start-1 flex cursor-pointer appearance-none flex-col items-center justify-center gap-2.5 rounded-lg border-0 bg-transparent px-3.5 py-2 text-[0.8125rem]/none font-bold tracking-[-0.01em] whitespace-nowrap transition-colors duration-200 ease-swift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent max-sm:gap-1.5 max-sm:px-2.5 max-sm:text-xs/none sm:[--line:1.5px] sm:[--stroke:1px] short-wide:col-start-1';

const GLYPH = 'size-6 shrink-0 transition-colors duration-200 ease-swift';

export const Periods = (): ReactNode => {
  const group = useRef<HTMLDivElement>(null);
  const period = usePeriod();
  const at = OPTIONS.findIndex(({ id }) => id === period);
  const pill: PillStyle = { '--at': String(at) };

  useIsomorphicLayoutEffect(() => {
    group.current?.style.setProperty('--ticker-travel', motion(TICKER));
  }, []);

  useEffect(() => resetPeriod, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = STEPS[event.key];
    if (!step) return;

    /* The slideshow binds the same keys on window. */
    event.preventDefault();
    event.stopPropagation();

    const target = step(at, OPTIONS.length - 1);

    setPeriod(OPTIONS[target].id);
    group.current
      ?.querySelectorAll<HTMLButtonElement>('[role="radio"]')
      [target]?.focus();
  };

  return (
    <div
      ref={group}
      role='radiogroup'
      aria-label='Período dos downloads'
      onKeyDown={onKeyDown}
      className={GROUP}
    >
      <span aria-hidden='true' style={pill} className={PILL} />

      {OPTIONS.map(({ id, label, Icon }, index) => {
        const checked = id === period;

        return (
          <button
            key={id}
            type='button'
            role='radio'
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => setPeriod(id)}
            className={clsx(
              CHIP,
              CELLS[index],
              checked ? 'text-ink' : 'text-muted hover:text-ink'
            )}
          >
            <Icon
              aria-hidden='true'
              className={clsx(GLYPH, checked && 'text-accent')}
            />
            {label}
          </button>
        );
      })}
    </div>
  );
};
