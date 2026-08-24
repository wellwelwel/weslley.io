import type { Direction } from '@site/src/components/Talks/chronology';
import type { RefCallback } from 'react';
import { startTransition, useCallback, useRef } from 'react';
import { useHistory } from '@docusaurus/router';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { flushSync } from 'react-dom';
import { aroundOf } from '@site/src/components/Talks/chronology';
import { pathOf } from '@site/src/data/previews';
import { motion } from '@site/src/helpers/reduced-motion';

gsap.registerPlugin(Observer);

type TravelOptions = {
  current: string;
  onGo: (slug: string) => void;
};

type Travel = {
  attach: RefCallback<HTMLDivElement>;
  travel: (direction: Direction) => void;
};

const DRIFT: Record<Direction, number> = { previous: -1, next: 1 };

/* Travel in rem, signed by the direction at runtime. */
const LEAVE = { full: 1.5, reduced: 1 };
const ARRIVE = { full: 2.5, reduced: 1.5 };

const SWIPE = 24;

const TALKS = pathOf('talks');

const clipOf = (panel: Element): string => {
  const { top, right, bottom, left } = panel.getBoundingClientRect();
  const { borderRadius } = getComputedStyle(panel);

  return `inset(${top}px ${window.innerWidth - right}px ${window.innerHeight - bottom}px ${left}px round ${borderRadius})`;
};

/** View transition pseudo-elements inherit from the root only. */
const stage = (direction: Direction, panel: Element | null): (() => void) => {
  const { style } = document.documentElement;
  const drift = DRIFT[direction];

  style.setProperty('--talk-leave', `${drift * motion(LEAVE)}rem`);
  style.setProperty('--talk-arrive', `${drift * motion(ARRIVE)}rem`);
  if (panel) style.setProperty('--talk-clip', clipOf(panel));

  return () => {
    style.removeProperty('--talk-leave');
    style.removeProperty('--talk-arrive');
    style.removeProperty('--talk-clip');
  };
};

export const useTravel = ({ current, onGo }: TravelOptions): Travel => {
  const history = useHistory();
  const root = useRef<HTMLDivElement | null>(null);
  const moving = useRef(false);
  const around = aroundOf(current);

  const travel = (direction: Direction): void => {
    const to = around[direction];
    if (!to || to === current || moving.current) return;

    navigator.vibrate?.(10);
    moving.current = true;

    const swap = (): void => {
      root.current?.parentElement?.scrollTo({ top: 0 });
      onGo(to);
    };

    const follow = (): void =>
      startTransition(() =>
        history.replace(`${TALKS}${to}/`, history.location.state)
      );

    if (typeof document.startViewTransition !== 'function') {
      swap();
      follow();
      moving.current = false;
      return;
    }

    const release = stage(
      direction,
      root.current?.closest('[role="dialog"]') ?? null
    );

    const done = (): void => {
      release();
      moving.current = false;
    };

    document
      .startViewTransition(() => {
        flushSync(swap);
        follow();
      })
      .finished.then(done, done);
  };

  const latest = useRef(travel);
  latest.current = travel;

  const attach = useCallback<RefCallback<HTMLDivElement>>((node) => {
    if (!node) return;

    root.current = node;

    let swiped = false;

    const swipe = (direction: Direction): void => {
      if (swiped) return;

      swiped = true;
      latest.current(direction);
    };

    const observer = Observer.create({
      target: node,
      type: 'touch',
      lockAxis: true,
      tolerance: SWIPE,
      onPress: () => (swiped = false),
      onLeft: () => swipe('next'),
      onRight: () => swipe('previous'),
    });

    return () => {
      observer.kill();
      root.current = null;
    };
  }, []);

  return { attach, travel };
};
