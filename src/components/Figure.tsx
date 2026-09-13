import type { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import { SafeLink } from '@site/src/components/SafeLink';

type FigureOptions = {
  title: string;
  label: ReactNode;
  /** Formatted count, absent when the numbers are unreachable. */
  value?: string;
  href: string;
};

const SEAT = 'mx-auto flex h-(--row) w-60 max-w-full items-center sm:w-80';
const ROW =
  'group flex h-(--row) w-full items-center justify-between gap-3 no-underline halo hover:no-underline focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-accent';
const LABEL =
  'text-sm/none font-bold tracking-wide text-ink/55 max-sm:text-xs/none';
const VALUE =
  'font-featured text-2xl/none font-extrabold text-ink tabular-nums sm:text-[1.75rem]/none';
const OPEN = 'text-base/none font-semibold text-ink/50 sm:text-lg/none';
const ICON =
  'size-3.5 shrink-0 text-accent transition-colors duration-250 ease-swift group-hover:text-ink';
const UNAVAILABLE = 'indisponível';

export const Figure = ({
  title,
  label,
  value,
  href,
}: FigureOptions): ReactNode => (
  <div className={SEAT}>
    <SafeLink
      to={href}
      draggable={false}
      aria-label={`${title}: ${value ? `${value} downloads` : UNAVAILABLE}`}
      className={ROW}
    >
      <span className={LABEL}>{label}</span>

      <span className='flex items-center gap-1.5'>
        {value ? (
          <span aria-hidden='true' className={VALUE}>
            {value}
          </span>
        ) : (
          <span className={OPEN}>{UNAVAILABLE}</span>
        )}

        <ExternalLink aria-hidden='true' className={ICON} />
      </span>
    </SafeLink>
  </div>
);
