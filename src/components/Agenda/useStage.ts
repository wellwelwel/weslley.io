import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { upcomingIndex } from '@site/src/components/Agenda/timeline';
import { slots } from '@site/src/data/slots';

gsap.registerPlugin(Observer);

type Stage = {
  focus: number;
  from: number;
};

type Deck = Stage & {
  focusOn: (index: number) => void;
  step: (delta: number) => void;
};

/** Mirrors the card's `duration-500`. */
const SETTLE = 500;

const SWIPE = 24;

export const useStage = (deck: RefObject<HTMLDivElement | null>): Deck => {
  const [{ focus, from }, setStage] = useState<Stage>(() => {
    const start = upcomingIndex();

    return { focus: start, from: start };
  });
  const swiped = useRef(false);

  const focusOn = (index: number): void =>
    setStage(({ focus: current }) => ({ focus: index, from: current }));

  const step = (delta: number): void => {
    navigator.vibrate?.(10);
    setStage(({ focus: current }) => ({
      focus: (current + delta + slots.length) % slots.length,
      from: current,
    }));
  };

  const swipe = (delta: number): void => {
    if (swiped.current) return;

    swiped.current = true;
    step(delta);
  };

  useEffect(() => {
    const observer = Observer.create({
      target: deck.current,
      type: 'touch',
      lockAxis: true,
      tolerance: SWIPE,
      onDragStart: () => (swiped.current = false),
      onLeft: () => swipe(1),
      onRight: () => swipe(-1),
    });

    return () => observer.kill();
  }, []);

  useEffect(() => {
    if (from === focus) return;

    const timer = window.setTimeout(
      () => setStage((stage) => ({ focus: stage.focus, from: stage.focus })),
      SETTLE
    );

    return () => window.clearTimeout(timer);
  }, [from, focus]);

  return { focus, from, focusOn, step };
};
