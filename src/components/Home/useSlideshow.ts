import { useCallback, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(useGSAP, Observer);

type Slideshow = {
  active: number;
  show: (index: number) => void;
  home: () => void;
};

const STEP_LOCK = 0.6;
const TOLERANCE = 10;

const FORWARD_KEYS = ['ArrowDown', 'ArrowRight', 'PageDown'];
const BACKWARD_KEYS = ['ArrowUp', 'ArrowLeft', 'PageUp'];

export const useSlideshow = (count: number, paused: boolean): Slideshow => {
  const [active, setActive] = useState(0);
  const current = useRef(0);
  const locked = useRef(false);
  const unlock = useRef<gsap.core.Tween | null>(null);

  const show = useCallback(
    (index: number) => {
      if (index === current.current || index < 0 || index > count - 1) return;

      current.current = index;
      setActive(index);

      locked.current = true;
      unlock.current?.kill();
      unlock.current = gsap.delayedCall(STEP_LOCK, () => {
        locked.current = false;
      });
    },
    [count]
  );

  const home = useCallback(() => show(0), [show]);

  useGSAP(
    () => {
      if (paused) return;

      const step = (direction: number) => {
        if (locked.current) return;

        show(current.current + direction);
      };

      const observer = Observer.create({
        type: 'wheel,touch',
        wheelSpeed: -1,
        tolerance: TOLERANCE,
        preventDefault: true,
        allowClicks: true,
        lockAxis: true,
        ignoreCheck: ({ target }) =>
          target instanceof Element && target.closest('[data-scroll]') !== null,
        onUp: (self) => self.axis !== 'x' && step(1),
        onDown: (self) => self.axis !== 'x' && step(-1),
      });

      const onKeyDown = (event: KeyboardEvent) => {
        const direction = FORWARD_KEYS.includes(event.key)
          ? 1
          : BACKWARD_KEYS.includes(event.key)
            ? -1
            : 0;

        if (!direction) return;

        event.preventDefault();
        step(direction);
      };

      window.addEventListener('keydown', onKeyDown);

      return () => {
        observer.kill();
        window.removeEventListener('keydown', onKeyDown);
      };
    },
    { dependencies: [paused], revertOnUpdate: true }
  );

  return { active, show, home };
};
