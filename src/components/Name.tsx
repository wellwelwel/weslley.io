import type { CSSProperties, FC, MouseEvent, ReactNode } from 'react';
import { Children } from 'react';
import gsap from 'gsap';
import { isReducedMotion } from '@site/src/helpers/reduced-motion';

export type NameOptions = {
  children: ReactNode;
  stroke?: boolean;
};

type CharacterStyle = CSSProperties & { '--index': number };

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
  const width = isReducedMotion() ? STROKE_WIDTHS.reduced : STROKE_WIDTHS.full;

  gsap.killTweensOf(currentTarget);
  gsap
    .timeline({ defaults: STROKE_STEP })
    .to(currentTarget, { webkitTextStrokeWidth: width.peak })
    .to(currentTarget, { webkitTextStrokeWidth: width.settle })
    .to(currentTarget, { webkitTextStrokeWidth: width.rest });
};

export const Name: FC<NameOptions> = ({ children, stroke }) =>
  characters(children).map((character, index) => {
    if (typeof character !== 'string') return character;

    const blank = !character.trim();
    const style: CharacterStyle | undefined = blank
      ? undefined
      : { '--index': index };

    return (
      <span
        key={`name:${index}`}
        style={style}
        onMouseEnter={stroke && !blank ? pop : undefined}
      >
        {character}
      </span>
    );
  });
