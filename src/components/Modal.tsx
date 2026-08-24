import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Info } from 'lucide-react';
import { Dialog } from '@site/src/components/Dialog';

type ModalOptions = {
  trigger: string;
  title?: ReactNode;
  children: ReactNode;
};

const HEADING =
  'm-0 flex items-center gap-2.5 font-featured text-2xl/tight font-extrabold tracking-tight text-ink text-balance [&_img]:size-7';

const BODY =
  'flex flex-col gap-3.5 text-[0.9375rem]/[1.7] text-body text-pretty [&>*]:m-0';

export const Modal = ({
  trigger,
  title,
  children,
}: ModalOptions): ReactNode => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;

  const label = typeof title === 'string' ? title : trigger;

  const clickToSeeMore =
    currentLocale === 'en' ? 'Click to see more' : 'Clique para ver mais';

  const reveal = useCallback(() => {
    setMounted(true);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const settle = useCallback(() => setMounted(false), []);

  return (
    <>
      <button
        type='button'
        onClick={reveal}
        aria-haspopup='dialog'
        aria-expanded={open}
        title={clickToSeeMore}
      >
        {trigger}
        <span aria-hidden='true'>
          <Info />
        </span>
      </button>

      {mounted && (
        <Dialog open={open} label={label} onClose={close} onClosed={settle}>
          <div className='flex flex-col gap-5 p-8 pr-16 max-sm:p-6 max-sm:pr-14'>
            <h2 className={HEADING}>{title ?? trigger}</h2>
            <div className={BODY}>{children}</div>
          </div>
        </Dialog>
      )}
    </>
  );
};
