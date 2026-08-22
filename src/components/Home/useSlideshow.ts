import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { load, ready } from '@site/src/components/Home/slides';

type Slideshow = {
  active: number;
  show: (index: number) => void;
  home: () => void;
};

gsap.registerPlugin(useGSAP, Observer);

const STEP_LOCK = 0.6;
const TOLERANCE = 10;

const FORWARD_KEYS = ['ArrowDown', 'ArrowRight', 'PageDown'];
const BACKWARD_KEYS = ['ArrowUp', 'ArrowLeft', 'PageUp'];

/* A talk path sits under the talks slide, so the longest path that starts the
   pathname names the slide. */
const indexOf = (paths: readonly string[], pathname: string): number =>
  paths.reduce(
    (found, path, index) =>
      pathname.startsWith(path) && path.length > paths[found].length
        ? index
        : found,
    0
  );

export const useSlideshow = (
  paths: readonly string[],
  paused: boolean
): Slideshow => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [active, setActive] = useState(0);
  const current = useRef(0);
  const locked = useRef(false);
  const opening = useRef(true);
  const unlock = useRef<gsap.core.Tween | null>(null);

  const activate = useCallback((index: number, after?: () => void) => {
    if (index === current.current) return;

    const previous = current.current;

    current.current = index;

    const commit = () => {
      setActive(index);
      after?.();

      locked.current = true;
      unlock.current?.kill();
      unlock.current = gsap.delayedCall(STEP_LOCK, () => {
        locked.current = false;
      });
    };

    if (ready(index)) return commit();

    load(index).then(
      () => current.current === index && commit(),
      () => {
        if (current.current === index) current.current = previous;
      }
    );
  }, []);

  const show = useCallback(
    (index: number) => {
      if (index === current.current || index < 0 || index >= paths.length)
        return;

      activate(index, () => history.push(paths[index]));
    },
    [activate, history, paths]
  );

  const home = useCallback(() => show(0), [show]);

  useEffect(
    () => () => {
      unlock.current?.kill();
    },
    []
  );

  useEffect(() => {
    /* The keyboard listener is a layout effect, so it can answer a press before
       this passive one reads the path. A press already in flight owns the slide
       and pushes its own path, so the opening alignment steps aside for it. */
    const first = opening.current;

    opening.current = false;

    if (first && current.current !== 0) return;

    activate(indexOf(paths, pathname));
  }, [activate, pathname, paths]);

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
    { dependencies: [paused, show], revertOnUpdate: true }
  );

  return { active, show, home };
};
