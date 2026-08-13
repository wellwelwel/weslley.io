import type { ReactNode } from 'react';
import { memo } from 'react';

type HillOptions = {
  center: number;
  tone?: string;
};

const WIDTH = 16;
const HEIGHT = 8;

export const Hill = memo(({ center, tone }: HillOptions): ReactNode => (
  <svg
    aria-hidden='true'
    viewBox='0 0 64 32'
    width={WIDTH}
    height={HEIGHT}
    style={{ fill: tone, transform: `translateX(${center - WIDTH / 2}px)` }}
    className='pointer-events-none absolute bottom-0 left-0 fill-accent transition-transform duration-340 ease-[cubic-bezier(0.25,0.8,0.3,1)] will-change-transform'
  >
    <path d='M0 32C15 32 22 0 32 0s17 32 32 32Z' />
  </svg>
));
