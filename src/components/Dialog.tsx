import type { PointerEvent, ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { images } from '@site/src/components/Home/previews';
import { Picture } from '@site/src/components/Picture';
import { motion } from '@site/src/helpers/reduced-motion';

export type DialogOptions = {
  open: boolean;
  label: string;
  onClose: () => void;
  onClosed: () => void;
  fill?: boolean;
  solid?: boolean;
  children: ReactNode;
};

const ENTER = 0.35;
const EXIT = 0.18;

const TRAVEL = {
  full: { y: 24, scale: 0.98 },
  reduced: { y: 14, scale: 0.99 },
};

const PANEL =
  'relative flex max-h-full w-full flex-col overflow-hidden rounded-[2rem] shadow-[0_40px_120px_-30px_rgb(14_9_39_/_0.75)] outline-none max-sm:h-full max-sm:max-w-none max-sm:rounded-none';

const SURFACES = {
  glass: 'border border-paper/50 bg-paper/90 backdrop-blur-2xl max-sm:border-0',
  solid: 'bg-paper',
};

const SIZES = {
  content: 'max-w-5xl',
  fill: 'h-full max-w-7xl',
};

let openDialogs = 0;

const page = (): HTMLElement | null => document.getElementById('__docusaurus');

const hold = (): (() => void) => {
  const previousOverflow = document.body.style.overflow;
  const opener = document.activeElement;

  openDialogs += 1;
  document.body.style.overflow = 'hidden';
  page()?.setAttribute('inert', '');

  return () => {
    openDialogs -= 1;
    document.body.style.overflow = previousOverflow;

    if (openDialogs === 0) page()?.removeAttribute('inert');
    if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
  };
};

export const Dialog = ({
  open,
  label,
  onClose,
  onClosed,
  fill = false,
  solid = false,
  children,
}: DialogOptions): ReactNode => {
  const overlay = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const settle = useRef(onClosed);
  const close = useRef(onClose);

  settle.current = onClosed;
  close.current = onClose;

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') close.current();
    };

    panel.current?.focus();
    window.addEventListener('keydown', onKeyDown);

    const release = hold();

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      release();
    };
  }, []);

  useGSAP(() => {
    const travel = motion(TRAVEL);

    timeline.current = gsap
      .timeline({ paused: true, onReverseComplete: () => settle.current() })
      .fromTo(
        overlay.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: ENTER, ease: 'power2.out' }
      )
      .fromTo(
        panel.current,
        { autoAlpha: 0, y: travel.y, scale: travel.scale },
        { autoAlpha: 1, y: 0, scale: 1, duration: ENTER, ease: 'power3.out' },
        0
      );
  });

  useEffect(() => {
    const track = timeline.current;

    if (!track) return;
    if (open) {
      track.timeScale(1).play();
      return;
    }

    track.timeScale(ENTER / EXIT).reverse();
  }, [open]);

  const onBackdrop = (event: PointerEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div
      ref={overlay}
      role='presentation'
      tabIndex={-1}
      onPointerDown={onBackdrop}
      className='fixed inset-0 z-100 flex items-center justify-center bg-ink/70 p-[clamp(1rem,3vw,2.5rem)] backdrop-blur-sm outline-none max-sm:p-0'
    >
      <div
        ref={panel}
        role='dialog'
        aria-modal='true'
        aria-label={label}
        tabIndex={-1}
        className={clsx(
          PANEL,
          fill ? SIZES.fill : SIZES.content,
          solid ? SURFACES.solid : SURFACES.glass
        )}
      >
        {!solid && (
          <Picture
            src={images.velvet}
            alt=''
            aria-hidden='true'
            sizes='(min-width: 80rem) 80rem, 100vw'
            decoding='async'
            draggable={false}
            className='pointer-events-none absolute inset-0 size-full object-cover opacity-12'
          />
        )}

        <button
          type='button'
          onClick={onClose}
          aria-label='Fechar'
          className='absolute top-3 right-3 z-2 inline-flex size-9 cursor-pointer appearance-none items-center justify-center rounded-full border border-[color-mix(in_srgb,white_30%,var(--color-blush))] bg-blush text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.35),0_4px_5px_-4px_rgb(253_121_168_/_0.85)] transition-[background-color,border-color,box-shadow,scale] duration-200 ease-swift hover:border-[color-mix(in_srgb,white_30%,var(--color-blush-deep))] hover:bg-blush-deep hover:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.35),0_5px_10px_-4px_rgb(232_67_147_/_0.95)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-deep active:scale-95 [&>svg]:size-4.5'
        >
          <X aria-hidden='true' />
        </button>

        <div className='relative flex min-h-0 flex-1 flex-col overflow-y-auto'>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
