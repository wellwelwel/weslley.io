import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { memo, useEffect, useId, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { PartnersTrigger } from '@site/src/components/Partners/Trigger';
import { Picture } from '@site/src/components/Picture';
import { motion } from '@site/src/helpers/reduced-motion';

export type Section = {
  label: string;
  onSelect: () => void;
};

export type Step = {
  name: string;
  Icon: IconType;
};

export type HeaderOptions = {
  sections: Section[];
  steps: Step[];
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
const VEIL_IN = 0.5;
const VEIL_OUT = 0.24;
const VEIL_COVER = 142;

const TRAVEL = {
  full: {
    panelY: 10,
    panelScale: 0.96,
    itemY: 6,
    exitY: 4,
    exitScale: 0.98,
    veilStart: 0,
  },
  reduced: {
    panelY: 6,
    panelScale: 0.98,
    itemY: 4,
    exitY: 2,
    exitScale: 0.99,
    veilStart: 60,
  },
};

const circle = (radius: number): string => `circle(${radius}% at 100% 0%)`;

const iconClass =
  'col-start-1 row-start-1 size-5 transition-[scale,opacity,filter] duration-300 ease-swift';

const itemClass =
  'flex h-11 w-full cursor-pointer appearance-none items-center rounded-xl border-0 bg-transparent px-4 font-sans text-base font-medium text-ink/70 transition-colors duration-200 ease-swift hover:bg-ink/5 hover:text-ink focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent';

const arrowClass =
  'relative hidden size-8 shrink-0 appearance-none items-center justify-center rounded-full border-0 bg-transparent p-0 transition-[color,scale] duration-200 ease-swift after:absolute after:-inset-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent steps:flex [&>svg]:size-4';

const markerClass =
  'col-start-1 row-start-1 items-center gap-2 [&>svg]:size-4 [&>svg]:shrink-0';

const avatar = '/img/avatar.png';

export const Header = memo(
  ({
    sections,
    steps,
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
    const veil = useRef<HTMLDivElement>(null);
    const trigger = useRef<HTMLButtonElement>(null);
    const label = useRef<HTMLSpanElement>(null);
    const labelled = useRef(false);
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
        const marked = labelled.current;
        const travel = motion(TRAVEL);

        labelled.current = true;

        if (!marked) return;

        gsap.fromTo(
          label.current,
          { opacity: 0, y: travel.itemY },
          { opacity: 1, y: 0, duration: CURRENT_IN, ease: 'power2.out' }
        );
      },
      { dependencies: [active], revertOnUpdate: true }
    );

    useGSAP(
      () => {
        const animated = placed.current;
        const travel = motion(TRAVEL);

        placed.current = true;

        if (!menu) {
          gsap.to(panel.current, {
            autoAlpha: 0,
            y: -travel.exitY,
            scale: travel.exitScale,
            duration: animated ? PANEL_OUT : 0,
            ease: 'power2.out',
          });

          gsap.to(veil.current, {
            autoAlpha: 0,
            clipPath: circle(travel.veilStart),
            duration: animated ? VEIL_OUT : 0,
            ease: 'power2.out',
          });

          return;
        }

        gsap
          .timeline()
          .fromTo(
            veil.current,
            { autoAlpha: 0, clipPath: circle(travel.veilStart) },
            {
              autoAlpha: 1,
              clipPath: circle(VEIL_COVER),
              duration: VEIL_IN,
              ease: 'power2.out',
            }
          )
          .fromTo(
            panel.current,
            { autoAlpha: 0, y: -travel.panelY, scale: travel.panelScale },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: PANEL_IN,
              ease: 'power3.out',
            },
            0
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
    const hasNext = active < steps.length - 1;
    const { name, Icon } = steps[active];

    return (
      <header className='relative z-60 flex h-20 shrink-0 items-center justify-between px-1.5 max-sm:h-9 max-sm:px-0 short:h-9'>
        <div
          ref={veil}
          aria-hidden='true'
          className='invisible fixed inset-0 z-10 bg-veil/70 opacity-0'
        />

        <button
          type='button'
          onClick={closingMenu(onHome)}
          aria-label='Weslley Araújo, voltar ao início'
          className='relative flex cursor-pointer appearance-none items-center gap-3 rounded-full border-0 bg-transparent p-0 transition-[scale] duration-200 ease-swift after:absolute after:inset-x-0 after:-inset-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-98'
        >
          <Picture
            src={avatar}
            alt=''
            aria-hidden='true'
            sizes='2.25rem'
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
              arrowClass,
              hasPrevious
                ? 'cursor-pointer text-ink/45 hover:text-ink active:scale-90'
                : 'cursor-not-allowed text-ink/15'
            )}
          >
            <ChevronLeft aria-hidden='true' />
          </button>

          <span
            aria-live='polite'
            className='grid justify-items-center text-sm font-semibold tracking-tight text-ink/70 whitespace-nowrap select-none'
          >
            {steps.map((step) => (
              <span
                key={step.name}
                aria-hidden='true'
                className={clsx(markerClass, 'invisible hidden steps:flex')}
              >
                <step.Icon />
                {step.name}
              </span>
            ))}

            <span ref={label} className={clsx(markerClass, 'flex')}>
              <Icon aria-hidden='true' className='max-[22rem]:hidden' />
              {name}
            </span>
          </span>

          <button
            type='button'
            onClick={() => onNavigate(active + 1)}
            disabled={!hasNext}
            aria-label='Próximo slide'
            className={clsx(
              arrowClass,
              hasNext
                ? 'cursor-pointer text-ink/45 hover:text-ink active:scale-90'
                : 'cursor-not-allowed text-ink/15'
            )}
          >
            <ChevronRight aria-hidden='true' />
          </button>
        </div>

        <div ref={actions} className='relative z-20'>
          <button
            ref={trigger}
            type='button'
            onClick={() => onMenu(!menu)}
            aria-label='Menu'
            aria-expanded={menu}
            aria-controls={panelId}
            className={clsx(
              '-mr-1 flex size-11 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-full border-0 text-ink transition-[background-color,scale] duration-200 ease-swift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-95 max-sm:-mr-3',
              menu ? 'bg-paper' : 'bg-transparent hover:bg-ink/5'
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
            className='invisible absolute top-full right-0 mt-3 w-max origin-top-right rounded-[1.25rem] border border-ink/10 bg-paper p-2 opacity-0 shadow-[0_1px_2px_var(--shade-soft),0_14px_28px_-12px_var(--shade-deep)]'
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

            <div data-menu-item className='mt-2 flex justify-center'>
              <PartnersTrigger
                open={partners}
                onOpen={closingMenu(onPartners)}
                shape='nested'
              />
            </div>
          </div>
        </div>
      </header>
    );
  }
);
