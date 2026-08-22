import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

/** A landing slide opens an unhashed URL without rewriting it, so a talk route
    lands on its slide and keeps its own path. */
export const useSlideshow = (
  ids: readonly string[],
  paused: boolean,
  landing?: string
): Slideshow => {
  const [active, setActive] = useState(0);
  const current = useRef(0);
  const locked = useRef(false);
  const unlock = useRef<gsap.core.Tween | null>(null);
  const indices = useMemo(
    () => new Map(ids.map((id, index) => [id, index])),
    [ids]
  );

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
      if (index === current.current || index < 0 || index >= ids.length) return;

      activate(index, () =>
        window.history.pushState(null, '', `#${ids[index]}`)
      );
    },
    [activate, ids]
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
       this passive one aligns the URL. A press already in flight owns the slide
       and carries its own hash, so the opening alignment steps aside for it. */
    const sync = (opening: boolean) => {
      const index = indices.get(window.location.hash.slice(1));

      if (index === undefined) {
        if (opening && current.current !== 0) return;

        if (landing !== undefined) {
          activate(indices.get(landing) ?? 0);
          return;
        }

        activate(0);
        window.history.replaceState(null, '', `#${ids[0]}`);
        return;
      }

      activate(index);
    };

    const onHashChange = () => sync(false);

    sync(true);
    window.addEventListener('hashchange', onHashChange);

    return () => window.removeEventListener('hashchange', onHashChange);
  }, [activate, ids, indices, landing]);

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
