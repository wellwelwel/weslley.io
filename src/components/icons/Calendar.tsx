import type { FC, SVGProps } from 'react';

export const Calendar: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    style={{ strokeWidth: 'var(--line, 1.2px)' }}
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
    {...props}
  >
    <path d='M19.81 3.76H4.19V11.96H19.81Z' />
    <path d='M19.81 18.99H4.19V21.41H19.81Z' />
    <path d='M19.81 11.96H4.19L2.59 18.99H21.41Z' />
    <path d='M7.31 2.59V4.93' />
    <path d='M12 2.59V4.93' />
    <path d='M16.69 2.59V4.93' />
    <path d='M8.09 8.05H9.76V15.87' />
    <path d='M12.67 8.05H14.34V15.87' />
  </svg>
);
