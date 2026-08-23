import type { ReactNode } from 'react';
import clsx from 'clsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Direction = 'previous' | 'next';

type Emphasis = 'strong' | 'faint';

type StepperOptions = {
  direction: Direction;
  label: string;
  onClick: () => void;
  emphasis?: Emphasis;
};

const BASE =
  'relative flex size-9 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-full border-0 p-0 transition-[background-color,color,scale] duration-250 ease-swift after:absolute after:-inset-0.75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-90 max-sm:size-8 short:size-8';

const EMPHASIS: Record<Emphasis, string> = {
  strong:
    'bg-accent text-paper hover:bg-[color-mix(in_srgb,var(--color-accent)_82%,white)]',
  faint: 'bg-accent/15 text-accent hover:bg-accent/28',
};

const ARROWS: Record<Direction, typeof ArrowLeft> = {
  previous: ArrowLeft,
  next: ArrowRight,
};

export const Stepper = ({
  direction,
  label,
  onClick,
  emphasis = 'strong',
}: StepperOptions): ReactNode => {
  const Arrow = ARROWS[direction];

  return (
    <button
      type='button'
      aria-label={label}
      onClick={onClick}
      className={clsx(BASE, EMPHASIS[emphasis])}
    >
      <Arrow className='size-4' aria-hidden='true' />
    </button>
  );
};
