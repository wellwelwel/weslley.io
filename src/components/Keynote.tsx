import type { FC } from 'react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { MonitorPlay } from 'lucide-react';
import '../css/custom/_moments.scss';
import '../css/custom/_keynote.scss';

export type KeynoteProps = {
  slides: string[];
};

export const Keynote: FC<KeynoteProps> = ({ slides }) => {
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;
  const isPtBr = currentLocale === 'pt-BR';
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const dialogTitleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < slides.length - 1;
  const active = useMemo(() => slides[activeIndex], [slides, activeIndex]);

  const open = () => {
    setActiveIndex(0);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const goPrev = () => {
    if (!canGoPrev) return;
    setActiveIndex((v) => v - 1);
  };

  const goNext = () => {
    if (!canGoNext) return;
    setActiveIndex((v) => v + 1);
  };

  useEffect(() => {
    if (!isOpen) return;

    const mainWrapper = document.querySelector<HTMLDivElement>('.navbar')!;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    mainWrapper.style.visibility = 'hidden';
    mainWrapper.style.pointerEvents = 'none';

    return () => {
      document.body.style.overflow = previousOverflow;
      mainWrapper.style.visibility = 'unset';
      mainWrapper.style.pointerEvents = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
  }, [isOpen]);

  return (
    <div className='keynote'>
      <button
        type='button'
        className='keynote__startButton'
        onClick={open}
        aria-label={`Iniciar apresentação com ${slides.length} ${slides.length === 1 ? 'slide' : 'slides'}`}
      >
        <MonitorPlay className='keynote__startIcon' size={24} />
        <span className='keynote__startTitle'>
          {isPtBr ? 'Iniciar Apresentação' : 'Start Presentation'}
        </span>
        <span className='keynote__startCount'>
          {slides.length} {slides.length === 1 ? 'slide' : 'slides'}
        </span>
      </button>

      {isOpen && (
        <div
          className='moments__overlay'
          role='dialog'
          aria-modal='true'
          aria-labelledby={dialogTitleId}
          tabIndex={-1}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') goPrev();
            if (e.key === 'ArrowRight') goNext();
          }}
        >
          <div
            className='moments__viewer'
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
          >
            <div className='moments__topBar'>
              <div className='moments__counter' aria-live='polite'>
                {activeIndex + 1} / {slides.length}
              </div>

              <button
                ref={closeButtonRef}
                type='button'
                className='moments__iconButton'
                onClick={close}
                aria-label='Fechar galeria'
                title='Fechar (Esc)'
              >
                <span aria-hidden='true'>×</span>
              </button>
            </div>

            <div className='moments__stage'>
              <button
                type='button'
                className='moments__navButton moments__navButton--prev'
                onClick={goPrev}
                disabled={!canGoPrev}
                aria-label='Slide anterior'
                title='Anterior (←)'
              >
                <span aria-hidden='true'>‹</span>
              </button>

              <figure className='moments__figure'>
                <img
                  className='moments__fullImage'
                  src={active}
                  loading='lazy'
                  decoding='async'
                />
              </figure>

              <button
                type='button'
                className='moments__navButton moments__navButton--next'
                onClick={goNext}
                disabled={!canGoNext}
                aria-label='Próximo slide'
                title='Próxima (→)'
              >
                <span aria-hidden='true'>›</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
