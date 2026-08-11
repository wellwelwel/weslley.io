import type { ReactNode } from 'react';
import { useLayoutEffect, useRef } from 'react';

type TooltipOptions = {
  label: string;
  detail?: string;
};

const EDGE = 8;
const CORNER = 16;

const BUBBLE =
  'pointer-events-none absolute bottom-[calc(100%+0.625rem)] left-1/2 flex w-max max-w-[min(13rem,calc(50vw-1rem))] translate-x-[calc(-50%_+_var(--shift,0px))] translate-y-1 flex-col gap-1 rounded-xl bg-ink px-3.5 py-2.5 opacity-0 shadow-[0_1px_2px_var(--shade-soft),0_12px_24px_-12px_var(--shade-deep)] transition-[opacity,translate] duration-250 ease-[cubic-bezier(0.2,0,0,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 group-data-revealed:translate-y-0 group-data-revealed:opacity-100';

const ARROW =
  'absolute -bottom-1 left-1/2 size-2.5 translate-x-[calc(-50%_-_var(--point,0px))] rotate-45 rounded-xs bg-ink';

/** Anchors to the closest parent carrying `group relative`, which owns the hover, focus and `data-revealed` states that open it. */
export const Tooltip = ({ label, detail }: TooltipOptions): ReactNode => {
  const bubble = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const node = bubble.current;
    const group = node?.closest('.group');
    if (!node || !group) return;

    const clipper = (() => {
      for (
        let parent = node.parentElement;
        parent;
        parent = parent.parentElement
      )
        if (getComputedStyle(parent).overflow !== 'visible') return parent;

      return null;
    })();

    const fit = () => {
      const anchor = group.getBoundingClientRect();
      const crop = clipper?.getBoundingClientRect();
      const half = node.offsetWidth / 2;
      const center = anchor.left + anchor.width / 2;
      const start = Math.max(crop?.left ?? 0, 0) + EDGE;
      const end =
        Math.min(
          crop?.right ?? Infinity,
          document.documentElement.clientWidth
        ) - EDGE;
      const shift =
        Math.max(start - (center - half), 0) - Math.max(center + half - end, 0);
      const reach = Math.max(half - CORNER, 0);

      node.style.setProperty('--shift', `${shift}px`);
      node.style.setProperty(
        '--point',
        `${Math.min(Math.max(shift, -reach), reach)}px`
      );
    };

    fit();

    group.addEventListener('pointerenter', fit);
    group.addEventListener('focusin', fit);
    window.addEventListener('resize', fit);

    return () => {
      group.removeEventListener('pointerenter', fit);
      group.removeEventListener('focusin', fit);
      window.removeEventListener('resize', fit);
    };
  }, []);

  return (
    <span ref={bubble} aria-hidden='true' className={BUBBLE}>
      <span className='text-[0.8125rem]/[1.35] font-semibold text-paper text-balance'>
        {label}
      </span>

      {detail && (
        <span className='text-[0.75rem]/[1.35] text-paper/65 text-balance'>
          {detail}
        </span>
      )}

      <span className={ARROW} />
    </span>
  );
};
