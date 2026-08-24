import type { TalkOpener } from '@site/src/components/Agenda/Card';
import type { Slide, Theme } from '@site/src/data/slides';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Name } from '@site/src/components/Name';

type HeroOptions = {
  slide: Slide;
  index: number;
  partners: boolean;
  onPartners: () => void;
  onTalk: TalkOpener;
};

const SHADOWS: Record<Theme, string> = {
  light: 'text-shadow-paper/18',
  dark: 'text-shadow-paper/50',
};

const FRAME =
  'mx-auto flex w-full max-w-7xl flex-col text-left short-wide:flex-row short-wide:items-center short-wide:justify-between short-wide:gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10';

const LOOSE =
  'flex flex-1 flex-col justify-center gap-[clamp(1.5rem,5svh,3rem)]';

const TITLE =
  'm-0 text-[calc(var(--text-hero)+2px)]/[var(--text-hero--line-height)] font-[900] tracking-[-0.02em] text-ink text-balance text-shadow-md select-none sm:text-hero sm:font-[800]';

const LEDE =
  'mt-[clamp(1rem,4svh-0.5rem,1.75rem)] mb-0 w-full max-w-225 animate-slide text-[max(0.875rem,min(1rem,3svh-0.25rem))]/normal font-semibold text-ink/70 text-pretty text-shadow-sm sm:mt-10 sm:text-lede short:mt-2';

const LEDE_PLUSH =
  'min-h-[clamp(2.5rem,6.67svh+2.25rem,6.75rem)] short:min-h-10';

const STAGE_ASIDE =
  'mt-[clamp(1.5rem,20svh-7.25rem,4rem)] shrink-0 short:mt-3 cramped:mt-1 short-wide:mt-0 lg:mt-0';

const STAGE_UNDER = 'mt-[clamp(0.5rem,2.2svh-0.25rem,1.25rem)]';

const FOOTNOTE =
  'm-0 flex animate-ticker items-center justify-center gap-2 text-[0.8125rem]/none font-semibold text-ink/55 halo [animation-delay:700ms]';

export const Hero = ({
  slide,
  index,
  partners,
  onPartners,
  onTalk,
}: HeroOptions): ReactNode => {
  const {
    src: plush,
    mark,
    theme = 'light',
    align,
    still,
    text,
    footnote,
    actions,
  } = slide;
  const { stage: Stage, cta: Cta } = actions ?? {};
  const [titleLead, titleTail, titleMark] = slide.title;
  const left = align === 'left';
  const flow = left && 'max-lg:inline-block';

  return (
    <div
      className={clsx(plush ? 'mt-auto' : LOOSE, left ? FRAME : 'text-center')}
    >
      <div className='min-w-0'>
        <h1 className={clsx(TITLE, SHADOWS[theme])}>
          <span
            key={`lead:${index}`}
            className={clsx('block animate-title', flow)}
          >
            <Name stroke>{titleLead}</Name>
          </span>{' '}
          <span
            key={`tail:${index}`}
            className={clsx('block animate-title [animation-delay:50ms]', flow)}
          >
            <Name stroke>{titleTail}</Name>
            {titleMark && (
              <span className='text-accent' style={{ color: mark }}>
                <Name stroke>{titleMark}</Name>
              </span>
            )}
          </span>
        </h1>

        {text && (
          <p
            key={`text:${index}`}
            className={clsx(
              LEDE,
              plush && LEDE_PLUSH,
              !left && 'mx-auto',
              SHADOWS[theme]
            )}
          >
            {text}
          </p>
        )}

        {Cta && (
          <div
            key={`cta:${index}`}
            className='mt-10 animate-slide max-lg:hidden'
          >
            <Cta
              open={partners}
              onOpen={onPartners}
              onTalk={onTalk}
              mark={mark}
            />
          </div>
        )}
      </div>

      {Stage && (
        <div
          key={`stage:${index}`}
          className={clsx(
            left ? STAGE_ASIDE : plush && STAGE_UNDER,
            !still && 'animate-slide'
          )}
        >
          <Stage
            open={partners}
            onOpen={onPartners}
            onTalk={onTalk}
            mark={mark}
          />
        </div>
      )}

      {footnote && (
        <p key={`footnote:${index}`} className={FOOTNOTE}>
          {footnote}
        </p>
      )}
    </div>
  );
};
