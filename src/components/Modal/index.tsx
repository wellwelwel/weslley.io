import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import styles from './styles.module.scss';

type ModalProps = {
  trigger: string;
  title?: ReactNode;
  children: ReactNode;
};

export const Modal = ({ trigger, title, children }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

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
        className={styles.trigger}
        aria-haspopup='dialog'
        aria-expanded={isOpen}
        title={'Clique para ver mais'}
      >
        {trigger}
        <span className={styles.icon} aria-hidden='true'>
          <Info />
        </span>
      </button>

      {isOpen && (
        <div
          className={styles.overlay}
          onClick={close}
          role='presentation'
          aria-hidden='true'
        >
          <div
            className={styles.modal}
            onClick={(event) => event.stopPropagation()}
            role='dialog'
            aria-modal='true'
            aria-labelledby={title ? 'modal-title' : undefined}
          >
            <div className={styles.header}>
              <h2 id='modal-title' className={styles.title}>
                {title ?? trigger}
              </h2>
              <button
                type='button'
                onClick={close}
                className={styles.close}
                aria-label='Close modal'
              >
                ✕
              </button>
            </div>
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
