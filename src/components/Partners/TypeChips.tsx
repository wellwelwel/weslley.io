import type { PartnershipType } from '@site/src/components/Partners/draft';
import type { Vars } from '@site/src/helpers/vars';
import type { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import { PARTNERSHIP_TYPES } from '@site/src/components/Partners/draft';

type TypeChipsOptions = {
  value: PartnershipType | '';
  onChange: (type: PartnershipType) => void;
};

type PillStyle = Vars<'--at'>;

const GROUP =
  'relative grid items-stretch gap-1 rounded-xl border border-ink/12 bg-ink/3 p-1';

/* The 0.25rem step matches the group's gap-1. */
const PILL =
  'pointer-events-none col-start-1 row-start-1 translate-x-[calc(var(--at)*(100%+0.25rem))] rounded-lg border border-accent/50 bg-accent/15 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]';

const CHIP =
  'relative z-1 row-start-1 cursor-pointer appearance-none rounded-lg border-0 bg-transparent px-3.5 py-1.5 text-[0.8125rem] font-bold tracking-[-0.01em] whitespace-nowrap transition-colors duration-200 ease-swift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

const COLUMNS: CSSProperties = {
  gridTemplateColumns: `repeat(${PARTNERSHIP_TYPES.length}, minmax(0, 1fr))`,
};

export const TypeChips = ({ value, onChange }: TypeChipsOptions): ReactNode => {
  const at = PARTNERSHIP_TYPES.findIndex((type) => type === value);
  const pill: PillStyle = { '--at': String(at) };

  return (
    <div
      role='radiogroup'
      aria-label='Tipo de parceria'
      style={COLUMNS}
      className={GROUP}
    >
      {at >= 0 && <span aria-hidden='true' style={pill} className={PILL} />}

      {PARTNERSHIP_TYPES.map((type, index) => (
        <button
          key={type}
          type='button'
          role='radio'
          aria-checked={value === type}
          onClick={() => onChange(type)}
          style={{ gridColumnStart: index + 1 }}
          className={clsx(
            CHIP,
            value === type ? 'text-ink' : 'text-ink/60 hover:text-ink'
          )}
        >
          {type}
        </button>
      ))}
    </div>
  );
};
