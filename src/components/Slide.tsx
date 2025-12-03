import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
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
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;
  const isPtBr = currentLocale === 'pt-BR';

  const scrollToSlide = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const slideWidth = container.offsetWidth;
    container.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth',
    });
  };

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    scrollToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    scrollToSlide(prevIndex);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setCurrentIndex(index);
          }
        });
      },
      {
        root: container,
        threshold: 0.5,
      }
    );

    const slides = container.querySelectorAll('[data-index]');
    slides.forEach((slide) => observer.observe(slide));

    return () => {
      slides.forEach((slide) => observer.unobserve(slide));
    };
  }, [images.length]);

  useEffect(() => {
    if (!autoPlay) return;

    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay, autoPlayInterval, currentIndex]);

  const handleUserInteraction = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  return (
    <div className='slide-container show'>
      <div
        ref={containerRef}
        className='slide-track'
        onMouseEnter={handleUserInteraction}
        onTouchStart={handleUserInteraction}
      >
        {images.map((image, index) => (
          <figure key={index} className='slide' data-index={index}>
            <picture>
              <img
                src={image.src}
                alt={image.event || `Slide ${index + 1}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding='async'
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
