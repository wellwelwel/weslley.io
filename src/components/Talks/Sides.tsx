import type { SideConfig } from '@site/src/@types/side';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import { CassetteTape, Pen } from 'lucide-react';
import { EYEBROW } from '@site/src/components/Talks/styles';
import { getSideLabel } from '@site/src/helpers/side-label';

type SidesOptions = {
  sides: SideConfig[];
  active: string | null;
  onSelect: (id: string) => void;
};

export const PANEL = 'talk-side';

export const Sides = ({ sides, active, onSelect }: SidesOptions): ReactNode => (
  <div className='flex animate-ticker flex-col gap-2.5'>
    <p
      id={`${PANEL}-choice`}
      className={`${EYEBROW} flex items-center gap-1.5`}
    >
      <Pen className='size-3 shrink-0' aria-hidden='true' />
      Escolha o lado da palestra
    </p>

    <div
      role='tablist'
      aria-labelledby={`${PANEL}-choice`}
      className='flex max-w-full flex-wrap gap-2'
    >
      {sides.map(({ id, label, description }, index) => {
        const selected = active === id;

        return (
          <button
            key={id}
            type='button'
            role='tab'
            aria-selected={selected}
            aria-controls={PANEL}
            onClick={() => onSelect(id)}
            className={clsx(
              'flex min-w-0 flex-1 basis-36 cursor-pointer appearance-none flex-col gap-1 rounded-2xl border px-3.5 py-3 text-left transition-[border-color,background-color,box-shadow,translate,scale] duration-250 ease-swift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.99]',
              selected
                ? 'border-trim bg-wash shadow-[inset_0_1px_0_rgb(255_255_255_/_0.45),0_10px_24px_-16px_rgb(122_119_255_/_0.6)]'
                : 'border-line bg-white hover:-translate-y-0.5 hover:border-edge'
            )}
          >
            <span
              className={clsx(
                `${EYEBROW} flex items-center gap-1`,
                selected ? 'text-accent' : 'text-muted'
              )}
            >
              Lado {getSideLabel(index)}
              <CassetteTape
                className='size-3.5 -translate-y-px'
                aria-hidden='true'
              />
            </span>
            <span className='text-sm/tight font-semibold text-ink'>
              {label}
            </span>
            {description && (
              <span className='text-[0.8125rem]/normal text-soft text-pretty'>
                {description}
              </span>
            )}
          </button>
        );
      })}
    </div>
  </div>
);
