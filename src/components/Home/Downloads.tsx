import type { ReactNode } from 'react';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Name } from '@site/src/components/Name';
import { motion } from '@site/src/helpers/reduced-motion';
import { useDownloads } from '@site/src/hooks/useDownloads';

gsap.registerPlugin(useGSAP);

type DigitOptions = {
  char: string;
  index: number;
};

const NUMBERS = Array.from({ length: 10 }, (_, index) => index);
const ROLL = { duration: 0.3, stagger: 0.05, ease: 'none' };
const SPIN = { full: 1, reduced: 0.65 };

const Digit = ({ char, index }: DigitOptions): ReactNode => {
  const strip = useRef<HTMLSpanElement>(null);
  const shown = useRef(Number(char));
  const target = Number(char);

  useGSAP(
    () => {
      if (!strip.current || shown.current === target) return;

      const from = (target - shown.current) * 10 * motion(SPIN);

      shown.current = target;
      gsap.fromTo(
        strip.current,
        { yPercent: from },
        {
          yPercent: 0,
          duration: ROLL.duration,
          ease: ROLL.ease,
          delay: index * ROLL.stagger,
        }
      );
    },
    { dependencies: [target] }
  );

  return (
    <span className='relative inline-block'>
      <span className='invisible'>{char}</span>
      <span className='absolute inset-0 overflow-hidden'>
        <span
          className='block'
          style={{ transform: `translateY(-${target * 10}%)` }}
        >
          <span ref={strip} className='block'>
            {NUMBERS.map((number) => (
              <span key={number} className='block'>
                <Name stroke>{String(number)}</Name>
              </span>
            ))}
          </span>
        </span>
      </span>
    </span>
  );
};

export const Downloads = (): ReactNode => {
  const downloads = useDownloads();
  const [amount, suffix] = downloads.split(' ');

  return (
    <Name stroke>
      {'Mais de '}
      <span className='font-featured tabular-nums'>
        <span className='sr-only'>{amount}</span>
        <span aria-hidden='true'>
          {[...amount].map((char, index) =>
            /^\d$/.test(char) ? (
              <Digit key={`digit:${index}`} char={char} index={index} />
            ) : (
              <Name key={`char:${index}`} stroke>
                {char}
              </Name>
            )
          )}
        </span>
      </span>
      {` ${suffix}`}
    </Name>
  );
};
