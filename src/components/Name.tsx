import type { CSSProperties, FC, MouseEvent, ReactNode } from 'react';
import { Children } from 'react';
import gsap from 'gsap';
import { isReducedMotion } from '@site/src/helpers/reduced-motion';

export type NameOptions = {
  children: ReactNode;
  stroke?: boolean;
};

type CharacterStyle = CSSProperties & { '--index': number };

const STROKE_WIDTHS = { peak: '2.5px', settle: '1.25px', rest: '0px' };
const STROKE_STEP = { duration: 0.25, ease: 'power1.out', autoRound: false };

const characters = (children: ReactNode) =>
  Children.toArray(children).flatMap((child) =>
    typeof child === 'string' ? [...child] : child
  );

const pop = ({ currentTarget }: MouseEvent<HTMLSpanElement>) => {
  if (isReducedMotion()) return;

  gsap.killTweensOf(currentTarget);
  gsap
    .timeline({ defaults: STROKE_STEP })
    .to(currentTarget, { webkitTextStrokeWidth: STROKE_WIDTHS.peak })
    .to(currentTarget, { webkitTextStrokeWidth: STROKE_WIDTHS.settle })
    .to(currentTarget, { webkitTextStrokeWidth: STROKE_WIDTHS.rest });
};

export const Name: FC<NameOptions> = ({ children, stroke }) =>
  characters(children).map((character, index) => {
    const blank = typeof character === 'string' && !character.trim();
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
