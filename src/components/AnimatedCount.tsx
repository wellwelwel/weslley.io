import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

type AnimatedCountProps = {
  value: number;
  locale?: string;
  duration?: number;
};

export const AnimatedCount: FC<AnimatedCountProps> = ({
  value,
  locale = 'pt-BR',
  duration = 500,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const prevValue = useRef<number>(0);

  useEffect(() => {
    if (ref.current && value !== prevValue.current) {
      const obj = { count: prevValue.current };

      animate(obj, {
        count: value,
        round: 1,
        ease: 'out(3)',
        duration,
        onUpdate: () => {
          if (!ref.current) return;

          ref.current.textContent = Math.round(obj.count).toLocaleString(
            locale
          );
        },
        onComplete: () => {
          if (ref.current) {
            ref.current.textContent = value
              ? Intl.NumberFormat(locale, {
                  notation: 'compact',
                  compactDisplay: 'long',
                }).format(value)
              : '0';
          }
        },
      });

      prevValue.current = value;
    }
  }, [value, locale, duration]);

  return <span ref={ref}>{value.toLocaleString(locale)}</span>;
};
