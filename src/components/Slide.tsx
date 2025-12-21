import type { FC } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export type SlideOptions = {
  images: Array<{
    src: string;
    event?: string;
    engagement?: string;
    date?: string;
  }>;
  autoPlay?: boolean;
  autoPlayInterval?: number;
};

export const Slide: FC<SlideOptions> = ({
  images,
  autoPlay = true,
  autoPlayInterval = 5000,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;
  const isPtBr = currentLocale === 'pt-BR';

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scrollToSlide = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const slideWidth = container.offsetWidth;
    container.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth',
    });
  }, []);

  const scheduleNext = useCallback(() => {
    if (!autoPlay || isPaused) return;

    clearTimer();

    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % images.length;

        scrollToSlide(nextIndex);

        return nextIndex;
      });
    }, autoPlayInterval);
  }, [
    autoPlay,
    autoPlayInterval,
    isPaused,
    images.length,
    scrollToSlide,
    clearTimer,
  ]);

  const goToSlide = useCallback(
    (index: number) => {
      clearTimer();
      scrollToSlide(index);
    },
    [scrollToSlide, clearTimer]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, goToSlide]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setCurrentIndex(index);
          }
        }
      },
      {
        root: container,
        threshold: 0.5,
      }
    );

    const slides = container.querySelectorAll('[data-index]');
    slides.forEach((slide) => observer.observe(slide));

    return () => observer.disconnect();
  }, [images.length]);

  useEffect(() => {
    scheduleNext();
    return clearTimer;
  }, [currentIndex, scheduleNext, clearTimer]);

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);
  const handleTouchStart = useCallback(() => setIsPaused(true), []);
  const handleTouchEnd = useCallback(() => setIsPaused(false), []);

  return (
    <div className='slide-container show'>
      <div
        ref={containerRef}
        className='slide-track'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => (
          <figure key={index} className='slide' data-index={index}>
            <picture>
              <img
                src={image.src}
                alt={image.event || `Slide ${index + 1}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding={index === 0 ? 'sync' : 'async'}
              />
            </picture>
            {image.event && (
              <figcaption className='slide-caption'>
                {image.event}
                {image.engagement && (
                  <>
                    <br />
                    <span className='slide-engagement'>{image.engagement}</span>
                  </>
                )}
                {image.date && (
                  <>
                    <br />
                    <span className='slide-engagement'>
                      📅{' '}
                      {new Date(`${image.date}T00:00`).toLocaleDateString(
                        isPtBr ? 'pt-BR' : 'en-US',
                        {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        }
                      )}
                    </span>
                  </>
                )}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            className='slide-nav-button slide-nav-prev'
            onClick={prevSlide}
            aria-label='Previous slide'
          >
            ‹
          </button>
          <button
            className='slide-nav-button slide-nav-next'
            onClick={nextSlide}
            aria-label='Next slide'
          >
            ›
          </button>
        </>
      )}
    </div>
  );
};
