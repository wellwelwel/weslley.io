import type { ReactNode } from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import { IoRocketSharp } from 'react-icons/io5';
import { socialLinks } from '@site/src/data/socials';

export type TriggerOptions = {
  open: boolean;
  onOpen: () => void;
};

type Tone = 'ink' | 'night';

type Shape = 'pill' | 'nested';

type PartnersTriggerOptions = TriggerOptions & {
  label?: string;
  social?: string | null;
  tone?: Tone;
  shape?: Shape;
  onRestore?: () => void;
};

type RollingLabel = {
  current: string;
  previous: string;
};

const TONES: Record<Tone, string> = {
  ink: 'bg-ink text-paper shadow-[0_1px_2px_var(--shade-soft),0_4px_10px_-4px_var(--shade-deep)] hover:bg-ink/90 hover:shadow-[0_1px_2px_var(--shade-soft),0_10px_18px_-8px_var(--shade-deep)]',
  night: 'bg-[#312f76] text-[#bcaeff] hover:bg-[#3c3a8b]',
};

const SHAPES: Record<Shape, { trigger: string; badge: string }> = {
  pill: { trigger: 'rounded-full', badge: 'rounded-full' },
  nested: { trigger: 'rounded-xl', badge: 'rounded-md' },
};

const TRIGGER_LABEL = 'Bora trabalhar juntos';

const SOCIAL_LABELS = Object.values(socialLinks).map(({ name }) => name);

const rollingPlace = (text: string, { current, previous }: RollingLabel) => {
  if (text === current) return 'translate-y-0 opacity-100';
  if (text === previous) return '-translate-y-[120%] opacity-0';

  return 'translate-y-[120%] opacity-0';
};

export const PartnersTrigger = ({
  open,
  onOpen,
  label = TRIGGER_LABEL,
  social,
  tone = 'ink',
  shape = 'pill',
  onRestore,
}: PartnersTriggerOptions): ReactNode => {
  const current = social ?? label;
  const [rolling, setRolling] = useState<RollingLabel>({
    current,
    previous: current,
  });

  if (rolling.current !== current)
    setRolling({ current, previous: rolling.current });

  return (
    <button
      type='button'
      onClick={onOpen}
      onPointerEnter={onRestore}
      onFocus={onRestore}
      aria-haspopup='dialog'
      aria-expanded={open}
      aria-label={label}
      className={clsx(
        'group inline-flex h-11 cursor-pointer appearance-none items-center gap-3.5 border-0 pr-1.5 pl-6 font-sans text-[0.9375rem] font-semibold max-sm:h-10 max-sm:gap-3 max-sm:pl-5 max-sm:text-sm transition-[background-color,box-shadow,scale] duration-750 ease-swift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-98',
        SHAPES[shape].trigger,
        TONES[tone]
      )}
    >
      <span aria-hidden='true' className='grid overflow-hidden leading-6'>
        {[label, ...SOCIAL_LABELS].map((text) => (
          <span
            key={text}
            className={clsx(
              'col-start-1 row-start-1 text-center whitespace-nowrap transition-[opacity,translate] duration-300 ease-swift',
              rollingPlace(text, rolling)
            )}
          >
            {text}
          </span>
        ))}
      </span>

      <span
        className={clsx(
          'flex size-8 shrink-0 items-center justify-center bg-accent text-white max-sm:size-7',
          SHAPES[shape].badge
        )}
      >
        <span className='relative grid size-4 place-items-center overflow-hidden'>
          <IoRocketSharp
            className='col-start-1 row-start-1 size-4 transition-transform duration-300 ease-swift group-hover:translate-x-[120%] group-hover:translate-y-[-120%]'
            aria-hidden='true'
          />
          <IoRocketSharp
            className='col-start-1 row-start-1 size-4 translate-x-[-120%] translate-y-[120%] transition-transform duration-300 ease-swift group-hover:translate-x-0 group-hover:translate-y-0'
            aria-hidden='true'
          />
        </span>
      </span>
    </button>
  );
};
