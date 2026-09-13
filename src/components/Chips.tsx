import type { Vars } from '@site/src/helpers/vars';
import type { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';

type Option<Id extends string> = {
  id: Id;
  label: string;
};

type ChipsOptions<Id extends string> = {
  label: string;
  options: readonly Option<Id>[];
  value: Id | '';
  onChange: (id: Id) => void;
};

type PillStyle = Vars<'--at'>;

const GROUP =
  'relative grid items-stretch gap-1 rounded-xl border border-ink/12 bg-ink/3 p-1 backdrop-blur-sm';

/* The 0.25rem step matches the group's gap-1. */
const PILL =
  'pointer-events-none col-start-1 row-start-1 translate-x-[calc(var(--at)*(100%+0.25rem))] rounded-lg border border-accent/50 bg-accent/15 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]';

const CHIP =
  'relative z-1 row-start-1 cursor-pointer appearance-none rounded-lg border-0 bg-transparent px-3.5 py-1.5 text-[0.8125rem] font-bold tracking-[-0.01em] whitespace-nowrap transition-colors duration-200 ease-swift after:absolute after:inset-x-0 after:-inset-y-1.25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

const columnsOf = (count: number): CSSProperties => ({
  gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
});

export const Chips = <Id extends string>({
  label,
  options,
  value,
  onChange,
}: ChipsOptions<Id>): ReactNode => {
  const at = options.findIndex((option) => option.id === value);
  const pill: PillStyle = { '--at': String(at) };

  return (
    <div
      role='radiogroup'
      aria-label={label}
      style={columnsOf(options.length)}
      className={GROUP}
    >
      {at >= 0 && <span aria-hidden='true' style={pill} className={PILL} />}

      {options.map((option, index) => (
        <button
          key={option.id}
          type='button'
          role='radio'
          aria-checked={value === option.id}
          onClick={() => onChange(option.id)}
          style={{ gridColumnStart: index + 1 }}
          className={clsx(
            CHIP,
            value === option.id ? 'text-ink' : 'text-muted hover:text-ink'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
