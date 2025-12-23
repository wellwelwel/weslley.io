import type { FC } from 'react';
import { memo, useEffect, useId, useMemo, useRef, useState } from 'react';
import '../css/custom/_moments.scss';

export type MomentOptions = {
  src: string;
  alt?: string;
};

export type MomentsProps = {
  moments: MomentOptions[];
};

const MomentsBase: FC<MomentsProps> = ({ moments }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const dialogTitleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < moments.length - 1;
  const active = useMemo(() => moments[activeIndex], [moments, activeIndex]);

  const openAt = (index: number) => {
    setActiveIndex(index);
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
    <div className='moments'>
      <div className='moments__grid' aria-label='Galeria de imagens'>
        {moments.map(({ src, alt }, index) => (
          <button
            key={`${src}-${index}`}
            type='button'
            className='moments__thumb'
            onClick={() => openAt(index)}
            aria-label={`Abrir imagem ${index + 1} de ${moments.length}`}
          >
            <img
              className='moments__thumbImage'
              loading='lazy'
              decoding='async'
              src={src}
              alt={alt ?? ''}
            />
          </button>
        ))}
      </div>

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
                {activeIndex + 1} / {moments.length}
              </div>

              <h3>{active.alt}</h3>

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
                aria-label='Imagem anterior'
                title='Anterior (←)'
              >
                <span aria-hidden='true'>‹</span>
              </button>

              <figure className='moments__figure'>
                <img
                  className='moments__fullImage'
                  src={active?.src}
                  alt={active?.alt ?? ''}
                  loading='lazy'
                  decoding='async'
                />
              </figure>

              <button
                type='button'
                className='moments__navButton moments__navButton--next'
                onClick={goNext}
                disabled={!canGoNext}
                aria-label='Próxima imagem'
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

export const Moments = memo(MomentsBase);
