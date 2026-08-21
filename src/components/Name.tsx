import type { MouseEvent, ReactElement, ReactNode } from 'react';
import { Children, cloneElement, isValidElement, memo, useMemo } from 'react';
import gsap from 'gsap';
import { motion } from '@site/src/helpers/reduced-motion';

export type NameOptions = {
  children: ReactNode;
  stroke?: boolean;
};

type Inline = ReactElement<{ children: string }, string>;

const STROKE_WIDTHS = {
  full: { peak: '2.5px', settle: '1.25px', rest: '0px' },
  reduced: { peak: '1.5px', settle: '0.75px', rest: '0px' },
};

const STROKE_STEP = { duration: 0.25, ease: 'power1.out', autoRound: false };

const pop = ({ currentTarget }: MouseEvent<HTMLSpanElement>) => {
  const width = motion(STROKE_WIDTHS);

  gsap.killTweensOf(currentTarget);
  gsap
    .timeline({ defaults: STROKE_STEP })
    .to(currentTarget, { webkitTextStrokeWidth: width.peak })
    .to(currentTarget, { webkitTextStrokeWidth: width.settle })
    .to(currentTarget, { webkitTextStrokeWidth: width.rest });
};

const isInline = (child: ReactNode): child is Inline =>
  isValidElement<{ children?: ReactNode }>(child) &&
  typeof child.type === 'string' &&
  typeof child.props.children === 'string';

const letters = (children: ReactNode, stroke?: boolean): ReactNode[] =>
  Children.toArray(children).flatMap<ReactNode>((child, index) => {
    if (isInline(child))
      return cloneElement(
        child,
        undefined,
        letters(child.props.children, stroke)
      );

    if (typeof child !== 'string') return child;

    return [...child].map((character, position) => (
      <span
        key={`name:${index}:${position}`}
        onMouseEnter={stroke && character.trim() ? pop : undefined}
      >
        {character}
      </span>
    ));
  });

export const Name = memo(({ children, stroke }: NameOptions): ReactNode =>
  useMemo(() => letters(children, stroke), [children, stroke])
);
