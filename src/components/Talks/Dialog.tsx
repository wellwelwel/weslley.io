import type { Gallery } from '@site/src/components/Talks/gallery';
import type { Vars } from '@site/src/helpers/vars';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { MDXProvider } from '@mdx-js/react';
import { longDate } from '@site/src/components/Agenda/timeline';
import { Dialog } from '@site/src/components/Dialog';
import { Picture } from '@site/src/components/Picture';
import { SideScope } from '@site/src/components/Side/context';
import { Stepper } from '@site/src/components/Stepper';
import { Authors } from '@site/src/components/Talks/Authors';
import { talks } from '@site/src/components/Talks/catalog';
import {
  chronology,
  neighborsOf,
  subjectOf,
} from '@site/src/components/Talks/chronology';
import { Cover } from '@site/src/components/Talks/Cover';
import { ViewerContext } from '@site/src/components/Talks/gallery';
import { Neighbor } from '@site/src/components/Talks/Neighbor';
import { components } from '@site/src/components/Talks/Prose';
import { PANEL, Sides } from '@site/src/components/Talks/Sides';
import { COLUMN, EYEBROW } from '@site/src/components/Talks/styles';
import { useTalk } from '@site/src/components/Talks/useTalk';
import { useTravel } from '@site/src/components/Talks/useTravel';
import { Viewer } from '@site/src/components/Talks/Viewer';
import { Views } from '@site/src/components/Talks/Views';
import { AVATAR } from '@site/src/data/slots';
import { motion } from '@site/src/helpers/reduced-motion';
import { counterApi } from '@site/src/helpers/site';

export type TalkDialogOptions = {
  slug: string;
  open: boolean;
  onClose: () => void;
  onClosed: () => void;
};

type RootStyle = Vars<'--ticker-travel'>;

const FLANK = 'absolute top-1/2 -translate-y-1/2 max-[90rem]:hidden';

const FLIP = { full: '0.75rem', reduced: '0.5rem' };

export const TalkDialog = ({
  slug,
  open,
  onClose,
  onClosed,
}: TalkDialogOptions): ReactNode => {
  const { siteConfig } = useDocusaurusContext();
  const api = counterApi(siteConfig.customFields);
  const [current, setCurrent] = useState(slug);
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const { talk, failed, side, setSide, views } = useTalk({
    slug: current,
    api,
  });
  const { attach, travel } = useTravel({ current, onGo: setCurrent });
  const subject = subjectOf(current) ?? null;
  const shape = talks.get(current)?.shape ?? null;
  const { previous, next } = neighborsOf(current);
  const label = subject?.title ?? talk?.title ?? 'Palestra';
  const rootStyle: RootStyle = { '--ticker-travel': motion(FLIP) };

  useEffect(() => setCurrent(slug), [slug]);

  useEffect(() => setGallery(null), [current]);

  return (
    <Dialog
      fill
      bare
      screen={Boolean(gallery)}
      back={Boolean(gallery)}
      open={open}
      label={label}
      onClose={gallery ? () => setGallery(null) : onClose}
      onClosed={onClosed}
      aside={
        !gallery &&
        chronology.length > 1 && (
          <>
            <div className={`${FLANK} right-full mr-4`}>
              <Stepper
                direction='previous'
                label='Palestra anterior'
                emphasis={previous ? 'strong' : 'faint'}
                onClick={() => travel('previous')}
              />
            </div>
            <div className={`${FLANK} left-full ml-4`}>
              <Stepper
                direction='next'
                label='Próxima palestra'
                emphasis={next ? 'strong' : 'faint'}
                onClick={() => travel('next')}
              />
            </div>
          </>
        )
      }
    >
      {gallery ? (
        <Viewer key={`${gallery.label}:${gallery.at}`} gallery={gallery} />
      ) : (
        <div ref={attach} style={rootStyle} className='flex flex-1 flex-col'>
          <div className='grid grid-cols-1 grid-rows-[auto_1fr_1fr]'>
            <div
              aria-hidden='true'
              className='col-start-1 row-start-3 bg-paper'
            />

            <div
              aria-hidden='true'
              className='relative col-start-1 row-span-2 row-start-1 inverted overflow-hidden bg-wash [view-transition-name:talk-band]'
            >
              {talk?.banner && (
                <div className='absolute inset-0 blur-[5px] opacity-10 mask-b-from-30%'>
                  <Cover src={talk.banner} alt='' />
                </div>
              )}
            </div>

            <header
              key={current}
              className={`${COLUMN} col-start-1 row-start-1 flex inverted flex-col gap-6 pt-[clamp(3.5rem,6vw,5rem)] pb-[clamp(1.5rem,3vw,2.5rem)] [text-shadow:0_1px_3px_rgb(0_0_0_/_0.85)] [view-transition-name:talk-header]`}
            >
              <h2 className='m-0 animate-ticker text-[clamp(1.625rem,3vw,2.25rem)]/[1.15] font-bold tracking-[-0.02em] text-ink text-balance'>
                {label}
              </h2>

              {(subject || api) && (
                <div className='flex animate-ticker flex-wrap items-center justify-between gap-x-6 gap-y-3 [animation-delay:70ms]'>
                  {subject && (
                    <div className='flex min-w-0 items-center gap-3'>
                      <Picture
                        src={subject.logo ?? AVATAR}
                        alt=''
                        sizes='3rem'
                        decoding='async'
                        draggable={false}
                        className='size-12 shrink-0 rounded-xl object-contain'
                      />

                      <div className='flex min-w-0 flex-col gap-1'>
                        <p className='m-0 truncate text-base/tight font-semibold text-ink'>
                          {subject.event}
                        </p>
                        <p className='m-0 truncate text-[0.8125rem]/normal font-medium text-muted'>
                          {[subject.venue, longDate(subject.date)]
                            .filter(Boolean)
                            .join(' · ')}
                        </p>
                      </div>
                    </div>
                  )}

                  <p
                    className={`${EYEBROW} flex flex-wrap items-center gap-x-2 gap-y-1`}
                  >
                    {subject && <span>{subject.role}</span>}
                    {subject && api && views !== 'unavailable' && (
                      <span aria-hidden='true'>·</span>
                    )}
                    {api && <Views count={views} />}
                  </p>
                </div>
              )}
            </header>

            {shape && (
              <div className={`${COLUMN} col-start-1 row-span-2 row-start-2`}>
                <div className='animate-ticker rounded-[1rem] shadow-[0_1px_4px_rgb(14_9_39_/_0.5)] [animation-delay:140ms] [view-transition-name:talk-banner]'>
                  <div
                    style={{ aspectRatio: `${shape.width} / ${shape.height}` }}
                    className='overflow-hidden rounded-[1rem] bg-well [view-transition-name:talk-cover]'
                  >
                    {talk?.banner && <Cover src={talk.banner} alt={label} />}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='flex flex-1 flex-col bg-paper'>
            <div
              className={`${COLUMN} flex flex-col gap-6 pt-[clamp(1.5rem,3vw,2.5rem)] pb-[clamp(1.25rem,4vw,3rem)] [view-transition-name:talk-body]`}
            >
              {failed ? (
                <p
                  role='alert'
                  className='m-0 animate-ticker text-[0.9375rem]/[1.7] text-soft'
                >
                  Não foi possível carregar esta palestra. Tente novamente.
                </p>
              ) : talk ? (
                <ViewerContext.Provider value={setGallery}>
                  {talk.authors.length > 0 && (
                    <Authors authors={talk.authors} />
                  )}

                  <SideScope activeId={side} setActiveId={setSide}>
                    <div className='flex flex-col gap-4'>
                      {talk.sides.length > 0 && (
                        <Sides
                          sides={talk.sides}
                          active={side}
                          onSelect={setSide}
                        />
                      )}

                      <MDXProvider components={components}>
                        <div
                          key={side}
                          id={PANEL}
                          role='tabpanel'
                          className='flex animate-ticker flex-col gap-4 [&_hr]:m-0 [&_hr]:h-px [&_hr]:border-0 [&_hr]:bg-line'
                        >
                          <talk.Content />
                        </div>
                      </MDXProvider>
                    </div>
                  </SideScope>

                  {(previous || next) && (
                    <nav
                      aria-label='Outras palestras'
                      className='mt-2 grid animate-ticker gap-3 sm:grid-cols-2 [animation-delay:70ms]'
                    >
                      {previous && (
                        <Neighbor
                          slug={previous}
                          direction='previous'
                          onGo={() => travel('previous')}
                        />
                      )}
                      {next && (
                        <Neighbor
                          slug={next}
                          direction='next'
                          onGo={() => travel('next')}
                        />
                      )}
                    </nav>
                  )}
                </ViewerContext.Provider>
              ) : (
                <div
                  aria-busy='true'
                  aria-label='Carregando a palestra'
                  className='flex animate-pulse flex-col gap-4'
                >
                  <div className='h-24 rounded-2xl bg-well' />
                  <div className='h-5 w-3/4 rounded-lg bg-well' />
                  <div className='h-40 rounded-2xl bg-well' />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
};
