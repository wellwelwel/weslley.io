import type { ReactNode } from 'react';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export type ProgressOptions = {
  /** Normalized position, from 0 to 1. */
  value: number;
  color?: string;
};

const FILL_IN = 0.5;

export const Progress = ({ value, color }: ProgressOptions): ReactNode => {
  const fill = useRef<HTMLDivElement>(null);
  const placed = useRef(false);

  useGSAP(
    () => {
      const animated = placed.current;

      placed.current = true;

      gsap.to(fill.current, {
        scaleX: value,
        duration: animated ? FILL_IN : 0,
        ease: 'power3.out',
      });
    },
    { dependencies: [value] }
  );

  return (
    <div
      aria-hidden='true'
      className='pointer-events-none fixed inset-x-0 top-0 z-50 h-1 bg-progress-track'
    >
      <div
        ref={fill}
        style={{ backgroundColor: color }}
        className='size-full origin-left scale-x-0 bg-accent transition-colors duration-500 ease-[cubic-bezier(0.2,0,0,1)]'
      />
    </div>
  );
};
