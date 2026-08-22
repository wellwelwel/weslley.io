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

const DIGITS = 10;
const COPIES = 3;

/** Repeats the digits, so the markup shows the answer before the roll spins. */
const NUMBERS = Array.from(
  { length: DIGITS * COPIES },
  (_, index) => index % DIGITS
);

const ROW = 100 / NUMBERS.length;
const TURN = ROW * DIGITS;
const REST = DIGITS * (COPIES - 1);

const ROLL = { duration: 0.5, stagger: 0.075, ease: 'power2.out' };
const SPIN = { full: TURN * (COPIES - 1), reduced: TURN };

const Digit = ({ char, index }: DigitOptions): ReactNode => {
  const strip = useRef<HTMLSpanElement>(null);
  const target = Number(char);

  useGSAP(() => {
    if (!strip.current) return;

    gsap.fromTo(
      strip.current,
      { yPercent: motion(SPIN) },
      {
        yPercent: 0,
        duration: ROLL.duration,
        ease: ROLL.ease,
        delay: index * ROLL.stagger,
      }
    );
  });

  return (
    <span className='relative inline-block'>
      <span className='invisible'>{char}</span>
      <span className='absolute inset-0 overflow-hidden'>
        <span
          className='block'
          style={{ transform: `translateY(-${(REST + target) * ROW}%)` }}
        >
          <span
            ref={strip}
            className='block'
            style={{ transform: `translateY(${SPIN.full}%)` }}
          >
            {NUMBERS.map((number, position) => (
              <span key={`roll:${position}`} className='block'>
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
