import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
import useIsomorphicLayoutEffect from '@docusaurus/useIsomorphicLayoutEffect';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { load, ready } from '@site/src/components/Home/gates';

type Slideshow = {
  active: number;
  show: (index: number) => void;
  home: () => void;
};

gsap.registerPlugin(useGSAP, Observer);

const STEP_LOCK_MS = 600;
const TOLERANCE = 10;

const STEPS: Record<string, 1 | -1 | undefined> = {
  ArrowDown: 1,
  ArrowRight: 1,
  PageDown: 1,
  ArrowUp: -1,
  ArrowLeft: -1,
  PageUp: -1,
};

const longestPrefix = (paths: readonly string[], pathname: string): number =>
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
  const unlock = useRef(0);

  const activate = useCallback((index: number, after?: () => void) => {
    if (index === current.current) return;

    const previous = current.current;

    current.current = index;

    const commit = () => {
      setActive(index);
      after?.();

      locked.current = true;
      window.clearTimeout(unlock.current);
      unlock.current = window.setTimeout(() => {
        locked.current = false;
      }, STEP_LOCK_MS);
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

  useEffect(() => () => window.clearTimeout(unlock.current), []);

  useIsomorphicLayoutEffect(() => {
    activate(longestPrefix(paths, pathname));
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
        const direction = STEPS[event.key];

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
