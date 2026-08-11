import type { FC, SVGProps } from 'react';

const SIDE = 8.5;

const SQUARES = [
  { x: 3, y: 3, fill: '#f25022' },
  { x: 12.5, y: 3, fill: '#7fba00' },
  { x: 3, y: 12.5, fill: '#00a4ef' },
  { x: 12.5, y: 12.5, fill: '#ffb900' },
];

export const Microsoft: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    aria-hidden='true'
    {...props}
  >
    {SQUARES.map(({ x, y, fill }) => (
      <rect key={fill} x={x} y={y} width={SIDE} height={SIDE} fill={fill} />
    ))}
  </svg>
);
