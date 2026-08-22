import type { SideConfig } from '@site/src/@types/side';
import type { Talk } from '@site/src/components/Talks/catalog';
import type { Gallery } from '@site/src/components/Talks/Viewer';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from '@docusaurus/router';
import { MDXProvider } from '@mdx-js/react';
import clsx from 'clsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AVATAR, slots } from '@site/src/components/Agenda/slots';
import { MONTHS } from '@site/src/components/Agenda/timeline';
import { Dialog } from '@site/src/components/Dialog';
import { pathOf } from '@site/src/components/Home/previews';
import { Parallax } from '@site/src/components/Parallax';
import { Picture } from '@site/src/components/Picture';
import { SideContext } from '@site/src/components/Side/context';
import { talks } from '@site/src/components/Talks/catalog';
import { components } from '@site/src/components/Talks/Prose';
import { Viewer, ViewerContext } from '@site/src/components/Talks/Viewer';

export type TalkDialogOptions = {
  slug: string;
  open: boolean;
  onClose: () => void;
  onClosed: () => void;
};

type NeighborOptions = {
  slug: string;
  direction: 'previous' | 'next';
  onGo: (slug: string) => void;
};

type TabsOptions = {
  sides: SideConfig[];
  active: string | null;
  onSelect: (id: string) => void;
};

const EYEBROW =
  'm-0 text-[0.625rem]/none font-bold tracking-widest text-ink/55 uppercase';

const INSET = 'px-[clamp(1.25rem,4vw,3rem)]';

const TALKS = pathOf('talks');

const chronology = slots.flatMap(({ talk }) =>
  talk && talks.has(talk) ? [talk] : []
);

const subjectOf = (slug: string) => slots.find(({ talk }) => talk === slug);

const neighborsOf = (slug: string) => {
  const at = chronology.indexOf(slug);

  return { previous: chronology[at - 1], next: chronology[at + 1] };
};

const longDate = (date: string): string => {
  const [year, month, day] = date.split('-').map(Number);

  return `${day} de ${MONTHS[month - 1]} de ${year}`;
};

const Neighbor = ({ slug, direction, onGo }: NeighborOptions): ReactNode => {
  const subject = subjectOf(slug);
  if (!subject) return null;

  const ahead = direction === 'next';

  return (
    <button
      type='button'
      onClick={() => onGo(slug)}
      className={clsx(
        'group/neighbor flex cursor-pointer appearance-none flex-col gap-2 rounded-2xl border border-ink/10 bg-paper/70 px-4 py-3.5 transition-[border-color,background-color,scale] duration-250 ease-swift hover:border-ink/25 hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.99]',
        ahead ? 'items-end text-right sm:col-start-2' : 'items-start text-left'
      )}
    >
      <span className={`${EYEBROW} flex items-center gap-1 text-accent`}>
        {ahead ? (
          <>
            Próxima
            <ArrowRight
              className='size-3 transition-transform duration-300 ease-swift group-hover/neighbor:translate-x-0.5'
              aria-hidden='true'
            />
          </>
        ) : (
          <>
            <ArrowLeft
              className='size-3 transition-transform duration-300 ease-swift group-hover/neighbor:-translate-x-0.5'
              aria-hidden='true'
            />
            Anterior
          </>
        )}
      </span>
      <span className='text-sm/tight font-semibold text-ink'>
        {subject.event}
      </span>
      <span className='line-clamp-2 text-[0.8125rem]/normal text-ink/70 text-pretty'>
        {subject.title}
      </span>
    </button>
  );
};

const Tabs = ({ sides, active, onSelect }: TabsOptions): ReactNode => (
  <div
    role='tablist'
    aria-label='Seções da palestra'
    className='flex max-w-full flex-wrap gap-1 self-start rounded-xl border border-ink/12 bg-ink/3 p-1'
  >
    {sides.map(({ id, label }) => (
      <button
        key={id}
        type='button'
        role='tab'
        aria-selected={active === id}
        onClick={() => onSelect(id)}
        className={clsx(
          'cursor-pointer appearance-none rounded-lg border-0 px-3.5 py-1.5 text-[0.8125rem] font-bold tracking-[-0.01em] whitespace-nowrap transition-[color,background-color,box-shadow] duration-200 ease-swift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          active === id
            ? 'bg-accent/15 text-ink shadow-[inset_0_0_0_1px_rgb(122_119_255_/_0.5)]'
            : 'bg-transparent text-ink/60 hover:text-ink'
        )}
      >
        {label}
      </button>
    ))}
  </div>
);

export const TalkDialog = ({
  slug,
  open,
  onClose,
  onClosed,
}: TalkDialogOptions): ReactNode => {
  const history = useHistory();
  const subject = subjectOf(slug) ?? null;
  const { previous, next } = neighborsOf(slug);
  const [talk, setTalk] = useState<Talk | null>(null);
  const [failed, setFailed] = useState(false);
  const [side, setSide] = useState<string | null>(null);
  const [gallery, setGallery] = useState<Gallery | null>(null);

  useEffect(() => {
    let stale = false;

    setTalk(null);
    setFailed(false);
    setGallery(null);

    talks
      .get(slug)?.()
      .then(
        (loaded) => {
          if (stale) return;

          setSide(loaded.sides[0]?.id ?? null);
          setTalk(loaded);
        },
        () => !stale && setFailed(true)
      );

    return () => {
      stale = true;
    };
  }, [slug]);

  const sides = useMemo(
    () => ({
      activeId: side,
      setActiveId: setSide,
      defaultId: null,
      setDefaultId: () => undefined,
    }),
    [side]
  );

  const label = subject?.title ?? 'Palestra';

  const go = (target: string): void =>
    history.replace(`${TALKS}${target}/`, history.location.state);

  return (
    <Dialog
      fill
      open={open}
      label={label}
      onClose={gallery ? () => setGallery(null) : onClose}
      onClosed={onClosed}
    >
      {gallery ? (
        <Viewer
          key={`${gallery.label}:${gallery.at}`}
          gallery={gallery}
          onBack={() => setGallery(null)}
        />
      ) : (
        <div className='flex min-h-0 flex-1 flex-col'>
          <header
            className={`grid shrink-0 gap-5 ${INSET} pt-[clamp(1.25rem,4vw,3rem)] pr-16 pb-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start`}
          >
            <div className='flex min-w-0 flex-col gap-4'>
              {subject && (
                <div className='flex items-center gap-3'>
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
                    <p className='m-0 truncate text-[0.8125rem]/normal font-medium text-ink/55'>
                      {[subject.venue, longDate(subject.date)]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  </div>
                </div>
              )}

              <h2 className='m-0 text-[clamp(1.375rem,3vw,1.875rem)]/[1.2] font-bold tracking-[-0.02em] text-ink text-balance'>
                {label}
              </h2>

              {subject && <p className={EYEBROW}>{subject.role}</p>}

              {talk && talk.sides.length > 0 && (
                <Tabs sides={talk.sides} active={side} onSelect={setSide} />
              )}
            </div>

            <Parallax
              tiltMaxAngleX={0}
              perspective={1920}
              className='aspect-video w-full overflow-hidden rounded-2xl bg-ink/6 shadow-[0_16px_40px_-20px_rgb(14_9_39_/_0.5)] max-lg:order-first lg:w-80 xl:w-96'
            >
              {talk && (
                <img
                  src={talk.banner}
                  alt={label}
                  decoding='async'
                  draggable={false}
                  className='size-full object-cover'
                />
              )}
            </Parallax>
          </header>

          <div
            className={`min-h-0 flex-1 overflow-y-auto ${INSET} pb-[clamp(1.25rem,4vw,3rem)]`}
          >
            {failed ? (
              <p
                role='alert'
                className='m-0 text-[0.9375rem]/[1.7] text-ink/70'
              >
                Não foi possível carregar esta palestra. Tente novamente.
              </p>
            ) : talk ? (
              <ViewerContext.Provider value={setGallery}>
                <SideContext.Provider value={sides}>
                  <MDXProvider components={components}>
                    <div className='flex flex-col gap-4 [&_hr]:m-0 [&_hr]:h-px [&_hr]:border-0 [&_hr]:bg-ink/10'>
                      <talk.Content />
                    </div>
                  </MDXProvider>
                </SideContext.Provider>

                {(previous || next) && (
                  <nav
                    aria-label='Outras palestras'
                    className='mt-8 grid gap-3 sm:grid-cols-2'
                  >
                    {previous && (
                      <Neighbor
                        slug={previous}
                        direction='previous'
                        onGo={go}
                      />
                    )}
                    {next && (
                      <Neighbor slug={next} direction='next' onGo={go} />
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
                <div className='h-5 w-3/4 rounded-lg bg-ink/6' />
                <div className='h-24 rounded-2xl bg-ink/6' />
                <div className='h-40 rounded-2xl bg-ink/6' />
              </div>
            )}
          </div>
        </div>
      )}
    </Dialog>
  );
};
