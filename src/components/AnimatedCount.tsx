import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

type AnimatedCountProps = {
  value: number;
  locale?: string;
  duration?: number;
};

const NUMBERS = Array.from({ length: 10 }, (_, i) => i);

const Digit: FC<{ char: string; index: number; duration: number }> = ({
  char,
  index,
  duration,
}) => {
  const stripRef = useRef<HTMLDivElement>(null);
  const isNumber = !isNaN(parseInt(char, 10));

  useEffect(() => {
    if (!isNumber || !stripRef.current) return;

    const target = parseInt(char, 10);
    const delay = index * 50;

    animate(stripRef.current, {
      translateY: `-${target * 10}%`,
      duration,
      ease: 'out(1)',
      delay,
    });
  }, [char, index, duration, isNumber]);

  if (!isNumber) {
    return <span className='animated-count__separator'>{char}</span>;
  }

  return (
    <span className='animated-count__digit'>
      <div ref={stripRef} className='animated-count__strip'>
        {NUMBERS.map((n) => (
          <span key={n} className='animated-count__number'>
            {n}
          </span>
        ))}
      </div>
    </span>
  );
};

export const AnimatedCount: FC<AnimatedCountProps> = ({
  value,
  locale = 'pt-BR',
  duration = 500,
}) => {
  const valueStr = value.toLocaleString(locale);
  const chars = valueStr.split('');

  return (
    <span className='animated-count'>
      {chars.map((char, i) => (
        <Digit key={`${i}`} char={char} index={i} duration={duration} />
      ))}
    </span>
  );
};
