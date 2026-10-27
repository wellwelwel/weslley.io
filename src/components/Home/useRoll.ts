import type { RefObject } from 'react';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion } from '@site/src/helpers/reduced-motion';

gsap.registerPlugin(useGSAP);

type Travel = { full: number; reduced: number };

const ROLL = { duration: 0.5, stagger: 0.075, ease: 'power2.out' };

export const useRoll = (
  travel: Travel,
  index: number,
  tween: gsap.TweenVars = {}
): RefObject<HTMLSpanElement | null> => {
  const target = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!target.current) return;

    gsap.fromTo(
      target.current,
      { yPercent: motion(travel) },
      {
        yPercent: 0,
        duration: ROLL.duration,
        ease: ROLL.ease,
        delay: index * ROLL.stagger,
        ...tween,
      }
    );
  });

  return target;
};
