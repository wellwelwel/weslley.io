import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Info } from 'lucide-react';

type ModalProps = {
  trigger: string;
  title?: ReactNode;
  children: ReactNode;
};

export const Modal = ({ trigger, title, children }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useDocusaurusContext();
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const currentLocale = i18n.currentLocale;

  const translations = {
    clickToSeeMore:
      currentLocale === 'en' ? 'Click to see more' : 'Clique para ver mais',
    closeModal: currentLocale === 'en' ? 'Close modal' : 'Fechar modal',
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  return (
    <>
      <button
        type='button'
        onClick={open}
        aria-haspopup='dialog'
        aria-expanded={isOpen}
        title={translations.clickToSeeMore}
      >
        {trigger}
        <span aria-hidden='true'>
          <Info />
        </span>
      </button>

      {isOpen && (
        <div onClick={close} role='presentation' aria-hidden='true'>
          <div
            onClick={(event) => event.stopPropagation()}
            role='dialog'
            aria-modal='true'
            aria-labelledby={title ? 'modal-title' : undefined}
          >
            <div>
              <h2 id='modal-title'>{title ?? trigger}</h2>
              <button
                type='button'
                onClick={close}
                aria-label={translations.closeModal}
              >
                ✕
              </button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
