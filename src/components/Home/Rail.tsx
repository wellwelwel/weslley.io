import type { CSSProperties, ReactNode, RefObject } from 'react';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { groupOf, groups, starts } from '@site/src/components/Home/slides';
import { Picture } from '@site/src/components/Picture';
import { motion } from '@site/src/helpers/reduced-motion';

gsap.registerPlugin(useGSAP);

type RailOptions = {
  ref: RefObject<HTMLDivElement | null>;
  active: number;
  open: boolean;
  place: (index: number) => (chip: HTMLButtonElement | null) => void;
  onSelect: (index: number) => void;
  onHover: (index: number | null) => void;
};

const TRAVEL = { full: 100, reduced: 55 };
const SWAP = 0.5;

const HIDDEN: CSSProperties = { opacity: 0, visibility: 'hidden' };

const SIZE =
  '[--chip:clamp(2.75rem,24.4svh-3.5rem,16rem)] short:[--chip:clamp(2.5rem,25svh-5.5rem,13rem)] squat:[--chip:clamp(2.5rem,25svh-5.5rem,13rem)]';

const CLIP = 'overflow-clip [overflow-clip-margin:16rem]';

const FOLD =
  'grid content-end transition-[grid-template-rows,padding-top,opacity] duration-[500ms,500ms,250ms] ease-swift';

const OPEN =
  'grid-rows-[1fr] pt-[clamp(0.5rem,2.75svh-0.5rem,1.5rem)] opacity-100 short:pt-1';

const FOLDED = 'pointer-events-none grid-rows-[0fr] pt-0 opacity-0';

export const Rail = ({
  ref,
  active,
  open,
  place,
  onSelect,
  onHover,
}: RailOptions): ReactNode => {
  const placed = useRef(false);
  const carried = useRef(false);
  const highlight = useRef(0);
  const group = groupOf[active];

  if (open) highlight.current = active;

  useGSAP(
    () => {
      const rows = ref.current?.querySelectorAll('[data-group]') ?? [];
      const folding = placed.current && !open;
      const swapping = placed.current && carried.current;

      placed.current = true;
      carried.current = open;

      if (folding) return;

      rows.forEach((row, index) =>
        gsap.to(row, {
          yPercent: (index - group) * motion(TRAVEL),
          autoAlpha: index === group ? 1 : 0,
          duration: swapping ? SWAP : 0,
          ease: 'power3.out',
          overwrite: true,
        })
      );
    },
    { dependencies: [group, open], scope: ref }
  );

  return (
    <div
      ref={ref}
      className={clsx(
        'mt-auto min-h-0 sm:-mx-8 lg:-mx-14',
        SIZE,
        CLIP,
        FOLD,
        open ? OPEN : FOLDED
      )}
    >
      {groups.map(({ label, slides: members }, groupIndex) => (
        <div
          key={label}
          data-group
          style={groupIndex === 0 ? undefined : HIDDEN}
          className='col-start-1 row-start-1 flex max-h-full min-h-0 justify-center gap-2 self-end lg:gap-6'
        >
          {members.map(({ src, alt }, memberIndex) => {
            if (!src) return null;

            const index = starts[groupIndex] + memberIndex;

            return (
              <button
                key={src}
                ref={place(index)}
                type='button'
                onClick={() => onSelect(index)}
                onPointerEnter={({ pointerType }) =>
                  pointerType === 'mouse' && onHover(index)
                }
                onPointerLeave={() => onHover(null)}
                onFocus={() => onHover(index)}
                onBlur={() => onHover(null)}
                aria-label={alt}
                aria-current={index === active}
                className='group block min-w-0 max-w-(--chip) flex-1 origin-bottom cursor-pointer appearance-none border-0 bg-transparent p-0 transition-[scale] duration-200 ease-swift focus-visible:-outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent active:scale-95'
              >
                <Picture
                  src={src}
                  alt=''
                  sizes='(min-width: 40rem) 16rem, 25vw'
                  decoding='async'
                  deferred={groupIndex !== group}
                  draggable={false}
                  className={clsx(
                    'block aspect-square max-h-full w-full origin-bottom object-contain object-bottom drop-shadow-[0_2px_3px_var(--shade-deep)] transition-[scale] duration-250 ease-swift',
                    index === highlight.current ? 'scale-100' : 'scale-65'
                  )}
                />
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
