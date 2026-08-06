import type { ReactNode } from 'react';
import { useEffect, useId, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import avatar from '@site/src/assets/img/avatar.png';
import { isReducedMotion } from '@site/src/helpers/reduced-motion';

export type Section = {
  label: string;
  onSelect: () => void;
};

export type HeaderOptions = {
  sections: Section[];
  names: string[];
  active: number;
  menu: boolean;
  partners: boolean;
  onMenu: (open: boolean) => void;
  onNavigate: (index: number) => void;
  onHome: () => void;
  onPartners: () => void;
};

const PANEL_IN = 0.3;
const PANEL_OUT = 0.16;
const ITEM_IN = 0.26;
const ITEM_STAGGER = 0.05;
const ITEM_LEAD = 0.06;
const CURRENT_IN = 0.25;

const TRAVEL = {
  full: { panelY: 10, panelScale: 0.96, itemY: 6, exitY: 4, exitScale: 0.98 },
  reduced: { panelY: 0, panelScale: 1, itemY: 0, exitY: 0, exitScale: 1 },
};

const iconClass =
  'col-start-1 row-start-1 size-5 transition-[scale,opacity,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)]';

const itemClass =
  'flex h-11 w-full cursor-pointer appearance-none items-center rounded-xl border-0 bg-transparent px-4 font-sans text-base font-medium text-ink/70 transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-ink/5 hover:text-ink focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent';

const stepClass =
  'relative hidden size-8 shrink-0 appearance-none items-center justify-center rounded-full border-0 bg-transparent p-0 transition-[color,scale] duration-200 ease-[cubic-bezier(0.2,0,0,1)] after:absolute after:-inset-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:flex [&>svg]:size-4';

export const Header = ({
  sections,
  names,
  active,
  menu,
  partners,
  onMenu,
  onNavigate,
  onHome,
  onPartners,
}: HeaderOptions): ReactNode => {
  const actions = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const placed = useRef(false);
  const panelId = useId();

  useEffect(() => {
    if (!menu) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      onMenu(false);
      trigger.current?.focus();
    };

    const onPointerDown = ({ target }: PointerEvent) => {
      if (target instanceof Node && actions.current?.contains(target)) return;

      onMenu(false);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointerdown', onPointerDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menu, onMenu]);

  useGSAP(
    () => {
      const travel = isReducedMotion() ? TRAVEL.reduced : TRAVEL.full;

      gsap.fromTo(
        label.current,
        { opacity: 0, y: travel.itemY },
        { opacity: 1, y: 0, duration: CURRENT_IN, ease: 'power2.out' }
      );
    },
    { dependencies: [active] }
  );

  useGSAP(
    () => {
      const animated = placed.current;
      const travel = isReducedMotion() ? TRAVEL.reduced : TRAVEL.full;

      placed.current = true;

      if (!menu) {
        gsap.to(panel.current, {
          autoAlpha: 0,
          y: -travel.exitY,
          scale: travel.exitScale,
          duration: animated ? PANEL_OUT : 0,
          ease: 'power2.out',
        });

        return;
      }

      gsap
        .timeline()
        .fromTo(
          panel.current,
          { autoAlpha: 0, y: -travel.panelY, scale: travel.panelScale },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: PANEL_IN,
            ease: 'power3.out',
          }
        )
        .fromTo(
          '[data-menu-item]',
          { autoAlpha: 0, y: -travel.itemY },
          {
            autoAlpha: 1,
            y: 0,
            duration: ITEM_IN,
            stagger: ITEM_STAGGER,
            ease: 'power2.out',
          },
          ITEM_LEAD
        );
    },
    { dependencies: [menu], scope: panel }
  );

  const closingMenu = (action: () => void) => () => {
    onMenu(false);
    action();
  };

  const hasPrevious = active > 0;
  const hasNext = active < names.length - 1;

  return (
    <header className='relative z-10 flex h-20 shrink-0 items-center justify-between px-4'>
      <button
        type='button'
        onClick={closingMenu(onHome)}
        aria-label='Weslley Araújo, voltar ao início'
        className='relative flex cursor-pointer appearance-none items-center gap-3 rounded-full border-0 bg-transparent p-0 transition-[scale] duration-200 ease-[cubic-bezier(0.2,0,0,1)] after:absolute after:inset-x-0 after:-inset-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-98'
      >
        <img
          src={avatar}
          alt=''
          aria-hidden='true'
          draggable={false}
          className='size-9 shrink-0 rounded-full'
        />
        <span className='hidden font-semibold tracking-tight whitespace-nowrap text-ink sm:inline'>
          Weslley Araújo
        </span>
      </button>

      <div className='absolute left-1/2 flex -translate-x-1/2 items-center gap-1'>
        <button
          type='button'
          onClick={() => onNavigate(active - 1)}
          disabled={!hasPrevious}
          aria-label='Slide anterior'
          className={clsx(
            stepClass,
            hasPrevious
              ? 'cursor-pointer text-ink/45 hover:text-ink active:scale-90'
              : 'cursor-not-allowed text-ink/15'
          )}
        >
          <ChevronLeft aria-hidden='true' />
        </button>

        <span
          aria-live='polite'
          className='grid justify-items-center px-1 text-sm font-semibold tracking-tight text-ink/70 whitespace-nowrap select-none'
        >
          {names.map((name) => (
            <span
              key={name}
              aria-hidden='true'
              className='invisible col-start-1 row-start-1 max-sm:hidden'
            >
              {name}
            </span>
          ))}

          <span ref={label} className='col-start-1 row-start-1'>
            {names[active]}
          </span>
        </span>

        <button
          type='button'
          onClick={() => onNavigate(active + 1)}
          disabled={!hasNext}
          aria-label='Próximo slide'
          className={clsx(
            stepClass,
            hasNext
              ? 'cursor-pointer text-ink/45 hover:text-ink active:scale-90'
              : 'cursor-not-allowed text-ink/15'
          )}
        >
          <ChevronRight aria-hidden='true' />
        </button>
      </div>

      <div ref={actions} className='relative'>
        <button
          ref={trigger}
          type='button'
          onClick={() => onMenu(!menu)}
          aria-label='Menu'
          aria-expanded={menu}
          aria-controls={panelId}
          className={clsx(
            'flex size-11 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-full border text-ink transition-[background-color,border-color,scale] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:border-ink/25 hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-95',
            menu ? 'border-ink/25 bg-ink/5' : 'border-ink/12 bg-paper'
          )}
        >
          <span
            aria-hidden='true'
            className='relative grid size-5 place-items-center'
          >
            <Menu
              className={clsx(
                iconClass,
                menu
                  ? 'scale-25 opacity-0 blur-xs'
                  : 'scale-100 opacity-100 blur-none'
              )}
            />
            <X
              className={clsx(
                iconClass,
                menu
                  ? 'scale-100 opacity-100 blur-none'
                  : 'scale-25 opacity-0 blur-xs'
              )}
            />
          </span>
        </button>

        <div
          ref={panel}
          id={panelId}
          inert={!menu}
          className='invisible absolute top-full right-0 mt-3 w-52 origin-top-right rounded-[1.25rem] border border-ink/10 bg-paper p-2 opacity-0 shadow-[0_1px_2px_rgb(14_9_39_/_0.12),0_14px_32px_-10px_rgb(14_9_39_/_0.35)]'
        >
          <nav className='flex flex-col'>
            {sections.map(({ label, onSelect }) => (
              <button
                key={label}
                data-menu-item
                type='button'
                onClick={closingMenu(onSelect)}
                className={itemClass}
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            data-menu-item
            type='button'
            onClick={closingMenu(onPartners)}
            aria-haspopup='dialog'
            aria-expanded={partners}
            className='mt-2 flex h-11 w-full cursor-pointer appearance-none items-center justify-center gap-3 rounded-xl border-0 bg-ink font-sans text-[0.9375rem] font-medium whitespace-nowrap text-paper transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-ink/90 focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent'
          >
            Let's Talk
            <span className='size-3.5 shrink-0 rounded-full bg-accent' />
          </button>
        </div>
      </div>
    </header>
  );
};
