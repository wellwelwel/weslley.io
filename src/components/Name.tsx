import type { MouseEvent, ReactNode } from 'react';
import { Children, memo, useMemo } from 'react';
import gsap from 'gsap';
import { motion } from '@site/src/helpers/reduced-motion';

export type NameOptions = {
  children: ReactNode;
  stroke?: boolean;
};

const STROKE_WIDTHS = {
  full: { peak: '2.5px', settle: '1.25px', rest: '0px' },
  reduced: { peak: '1.5px', settle: '0.75px', rest: '0px' },
};

const STROKE_STEP = { duration: 0.25, ease: 'power1.out', autoRound: false };

const characters = (children: ReactNode) =>
  Children.toArray(children).flatMap((child) =>
    typeof child === 'string' ? [...child] : child
  );

const pop = ({ currentTarget }: MouseEvent<HTMLSpanElement>) => {
  const width = motion(STROKE_WIDTHS);

  gsap.killTweensOf(currentTarget);
  gsap
    .timeline({ defaults: STROKE_STEP })
    .to(currentTarget, { webkitTextStrokeWidth: width.peak })
    .to(currentTarget, { webkitTextStrokeWidth: width.settle })
    .to(currentTarget, { webkitTextStrokeWidth: width.rest });
};

export const Name = memo(({ children, stroke }: NameOptions): ReactNode => {
  const letters = useMemo(() => characters(children), [children]);

  return letters.map((character, index) => {
    if (typeof character !== 'string') return character;

    const blank = !character.trim();

    return (
      <span
        key={`name:${index}`}
        onMouseEnter={stroke && !blank ? pop : undefined}
      >
        {character}
      </span>
    );
  });
});
