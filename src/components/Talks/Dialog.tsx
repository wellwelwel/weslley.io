import type { Author, AuthorSocials } from '@site/src/@types/article';
import type { SideConfig } from '@site/src/@types/side';
import type { Talk } from '@site/src/components/Talks/catalog';
import type { Gallery } from '@site/src/components/Talks/Viewer';
import type { CSSProperties, ReactNode } from 'react';
import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { MDXProvider } from '@mdx-js/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import {
  ArrowLeft,
  ArrowRight,
  CassetteTape,
  Eye,
  Mic,
  Pen,
} from 'lucide-react';
import { flushSync } from 'react-dom';
import { AVATAR, slots } from '@site/src/components/Agenda/slots';
import { MONTHS } from '@site/src/components/Agenda/timeline';
import { Dialog } from '@site/src/components/Dialog';
import { pathOf } from '@site/src/components/Home/previews';
import { Picture } from '@site/src/components/Picture';
import { SafeLink } from '@site/src/components/SafeLink';
import { SideContext } from '@site/src/components/Side/context';
import { Stepper } from '@site/src/components/Stepper';
import { talks } from '@site/src/components/Talks/catalog';
import { components } from '@site/src/components/Talks/Prose';
import { Viewer, ViewerContext } from '@site/src/components/Talks/Viewer';
import { getSideLabel } from '@site/src/helpers/get-side-label';
import { motion } from '@site/src/helpers/reduced-motion';
import { socialLinks } from '@site/src/helpers/social-links';

gsap.registerPlugin(Observer);

export type TalkDialogOptions = {
  slug: string;
  open: boolean;
  onClose: () => void;
  onClosed: () => void;
};

type Direction = 'previous' | 'next';

type NeighborOptions = {
  slug: string;
  direction: Direction;
  onGo: () => void;
};

type SidesOptions = {
  sides: SideConfig[];
  active: string | null;
  onSelect: (id: string) => void;
};

type AuthorsOptions = {
  authors: Author[];
};

type Network = keyof AuthorSocials;

type Count = number | 'pending' | 'unavailable';

type ViewsOptions = {
  count: Count;
};

type CoverOptions = {
  src: string;
  alt: string;
};

type Ready = {
  slug: string;
  talk: Talk;
};

type RootStyle = CSSProperties & { '--ticker-travel': string };

const EYEBROW =
  'm-0 text-[0.625rem]/none font-bold tracking-widest text-muted uppercase';

const COLUMN = 'mx-auto w-full max-w-4xl px-[clamp(1.25rem,4vw,3rem)]';

const PANEL = 'talk-side';

const FLANK = 'absolute top-1/2 -translate-y-1/2 max-[90rem]:hidden';

const FLIP = { full: '0.75rem', reduced: '0.5rem' };

/** Travel in rem, signed by the direction at runtime. */
const LEAVE = { full: 1.5, reduced: 1 };

const ARRIVE = { full: 2.5, reduced: 1.5 };

const DRIFT: Record<Direction, number> = { previous: -1, next: 1 };

const SWIPE = 24;

const NUMBER = new Intl.NumberFormat('pt-BR');

const NETWORKS: Network[] = ['linkedin', 'github', 'instagram', 'youtube'];

const PROFILES: Record<Network, (handle: string) => string> = {
  linkedin: (handle) => `https://www.linkedin.com/in/${handle}/`,
  github: (handle) => `https://github.com/${handle}`,
  instagram: (handle) => `https://www.instagram.com/${handle}/`,
  youtube: (handle) => `https://www.youtube.com/@${handle}`,
};

const TALKS = pathOf('talks');

const chronology = slots.flatMap(({ talk }) =>
  talk && talks.has(talk) ? [talk] : []
);

const subjectOf = (slug: string) => slots.find(({ talk }) => talk === slug);

const neighborsOf = (slug: string) => {
  const at = chronology.indexOf(slug);
  if (at < 0) return { previous: undefined, next: undefined };

  return { previous: chronology[at - 1], next: chronology[at + 1] };
};

const counterOf = (
  fields: Record<string, unknown> | undefined
): string | null => {
  const api = fields?.COUNTTY_URL;

  return fields?.showViewsCounter === true &&
    typeof api === 'string' &&
    api !== ''
    ? api
    : null;
};

const isViews = (value: unknown): value is { views: number } =>
  typeof value === 'object' &&
  value !== null &&
  'views' in value &&
  typeof value.views === 'number';

const countView = async (api: string, counter: string): Promise<Count> => {
  const url = new URL('/views', api);

  url.searchParams.set('slug', counter);

  try {
    const data: unknown = await fetch(url, { cache: 'no-store' }).then(
      (response) => response.json()
    );

    return isViews(data) ? data.views : 'unavailable';
  } catch {
    return 'unavailable';
  }
};

const longDate = (date: string): string => {
  const [year, month, day] = date.split('-').map(Number);

  return `${day} de ${MONTHS[month - 1]} de ${year}`;
};

const prefetch = (src: string | null): void => {
  if (!src) return;

  new Image().src = src;
};

const warm = (slug: string | undefined): void => {
  if (!slug) return;

  talks
    .get(slug)
    ?.load()
    .then(
      (loaded) => prefetch(loaded.banner),
      () => undefined
    );
};

const clipOf = (panel: Element): string => {
  const { top, right, bottom, left } = panel.getBoundingClientRect();
  const { borderRadius } = getComputedStyle(panel);

  return `inset(${top}px ${window.innerWidth - right}px ${window.innerHeight - bottom}px ${left}px round ${borderRadius})`;
};

/** Feeds the transition pseudo-elements, which only inherit from the root. */
const stage = (direction: Direction, panel: Element | null): (() => void) => {
  const { style } = document.documentElement;
  const drift = DRIFT[direction];

  style.setProperty('--talk-leave', `${drift * motion(LEAVE)}rem`);
  style.setProperty('--talk-arrive', `${drift * motion(ARRIVE)}rem`);
  if (panel) style.setProperty('--talk-clip', clipOf(panel));

  return () => {
    style.removeProperty('--talk-leave');
    style.removeProperty('--talk-arrive');
    style.removeProperty('--talk-clip');
  };
};

const Neighbor = ({ slug, direction, onGo }: NeighborOptions): ReactNode => {
  const subject = subjectOf(slug);
  if (!subject) return null;

  const ahead = direction === 'next';

  return (
    <button
      type='button'
      onClick={onGo}
      className={clsx(
        'group/neighbor flex cursor-pointer appearance-none flex-col gap-2 rounded-2xl border border-line bg-white px-4 py-3.5 transition-[border-color,scale] duration-250 ease-swift hover:border-edge focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.99]',
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
      <span className='line-clamp-2 text-[0.8125rem]/normal text-soft text-pretty'>
        {subject.title}
      </span>
    </button>
  );
};

const Views = ({ count }: ViewsOptions): ReactNode => {
  if (count === 'unavailable') return null;

  return (
    <span className='inline-flex items-center gap-1 tabular-nums'>
      <Eye className='size-3 shrink-0' aria-hidden='true' />
      {count === 'pending' ? (
        <span
          aria-label='Carregando visualizações'
          className='inline-block h-2.5 w-32 animate-pulse rounded-sm bg-line'
        />
      ) : (
        `${NUMBER.format(count)} ${count === 1 ? 'visualização' : 'visualizações'}`
      )}
    </span>
  );
};

const Cover = ({ src, alt }: CoverOptions): ReactNode => {
  const [shown, setShown] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      decoding='async'
      draggable={false}
      onLoad={() => setShown(true)}
      className={clsx(
        'size-full object-cover transition-opacity duration-500 ease-swift',
        shown ? 'opacity-100' : 'opacity-0'
      )}
    />
  );
};

const Authors = ({ authors }: AuthorsOptions): ReactNode => {
  const heading = authors.length > 1 ? 'Palestrantes' : 'Palestrante';

  return (
    <section
      aria-label={heading}
      className='flex animate-ticker flex-col gap-2.5'
    >
      <p className={`${EYEBROW} flex items-center gap-1.5`}>
        <Mic className='size-3 shrink-0' aria-hidden='true' />
        {heading}
      </p>

      <div className='flex flex-wrap gap-3'>
        {authors.map(({ name, title, url, image_url, socials }) => (
          <article
            key={name}
            className='flex min-w-0 flex-1 basis-72 items-start gap-3 rounded-2xl border border-line bg-white px-4 py-3.5'
          >
            <Picture
              src={image_url}
              alt=''
              sizes='2.5rem'
              decoding='async'
              draggable={false}
              className='size-10 shrink-0 rounded-full object-cover'
            />

            <div className='flex min-w-0 flex-col gap-1'>
              <SafeLink
                to={url}
                className='self-start text-sm/tight font-semibold text-ink underline decoration-edge underline-offset-2 transition-colors duration-200 ease-swift hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
              >
                {name}
              </SafeLink>
              <p className='m-0 text-[0.8125rem]/normal text-soft text-pretty'>
                {title}
              </p>

              <nav
                aria-label={`Redes de ${name}`}
                className='-ml-2.5 flex items-center'
              >
                {NETWORKS.flatMap((network) => {
                  const handle = socials[network];
                  if (!handle) return [];

                  const { name: label, Icon, tone } = socialLinks[network];

                  return (
                    <SafeLink
                      key={network}
                      to={PROFILES[network](encodeURIComponent(handle))}
                      aria-label={label}
                      draggable={false}
                      style={{ color: tone }}
                      className='group flex size-10 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
                    >
                      <Icon
                        aria-hidden='true'
                        className='size-4 transition-[scale,translate] duration-250 ease-swift group-hover:-translate-y-0.5 group-hover:scale-115'
                      />
                    </SafeLink>
                  );
                })}
              </nav>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

const Sides = ({ sides, active, onSelect }: SidesOptions): ReactNode => (
  <div className='flex animate-ticker flex-col gap-2.5'>
    <p
      id={`${PANEL}-choice`}
      className={`${EYEBROW} flex items-center gap-1.5`}
    >
      <Pen className='size-3 shrink-0' aria-hidden='true' />
      Escolha o lado da palestra
    </p>

    <div
      role='tablist'
      aria-labelledby={`${PANEL}-choice`}
      className='flex max-w-full flex-wrap gap-2'
    >
      {sides.map(({ id, label, description }, index) => {
        const selected = active === id;

        return (
          <button
            key={id}
            type='button'
            role='tab'
            aria-selected={selected}
            aria-controls={PANEL}
            onClick={() => onSelect(id)}
            className={clsx(
              'flex min-w-0 flex-1 basis-36 cursor-pointer appearance-none flex-col gap-1 rounded-2xl border px-3.5 py-3 text-left transition-[border-color,background-color,box-shadow,translate,scale] duration-250 ease-swift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.99]',
              selected
                ? 'border-trim bg-wash shadow-[inset_0_1px_0_rgb(255_255_255_/_0.45),0_10px_24px_-16px_rgb(122_119_255_/_0.6)]'
                : 'border-line bg-white hover:-translate-y-0.5 hover:border-edge'
            )}
          >
            <span
              className={clsx(
                `${EYEBROW} flex items-center gap-1`,
                selected ? 'text-accent' : 'text-muted'
              )}
            >
              Lado {getSideLabel(index)}
              <CassetteTape
                className='size-3.5 -translate-y-px'
                aria-hidden='true'
              />
            </span>
            <span className='text-sm/tight font-semibold text-ink'>
              {label}
            </span>
            {description && (
              <span className='text-[0.8125rem]/normal text-soft text-pretty'>
                {description}
              </span>
            )}
          </button>
        );
      })}
    </div>
  </div>
);

export const TalkDialog = ({
  slug,
  open,
  onClose,
  onClosed,
}: TalkDialogOptions): ReactNode => {
  const history = useHistory();
  const { siteConfig } = useDocusaurusContext();
  const api = counterOf(siteConfig.customFields);
  const [current, setCurrent] = useState(slug);
  const subject = subjectOf(current) ?? null;
  const shape = talks.get(current)?.shape ?? null;
  const { previous, next } = neighborsOf(current);
  const [ready, setReady] = useState<Ready | null>(null);
  const talk = ready?.slug === current ? ready.talk : null;
  const [failed, setFailed] = useState(false);
  const [side, setSide] = useState<string | null>(null);
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [views, setViews] = useState<Count>('pending');
  useEffect(() => setCurrent(slug), [slug]);

  useEffect(() => {
    let stale = false;

    setFailed(false);
    setGallery(null);
    setViews('pending');

    talks
      .get(current)
      ?.load()
      .then(
        (loaded) => {
          if (stale) return;

          startTransition(() => {
            setSide(loaded.sides[0]?.id ?? null);
            setReady({ slug: current, talk: loaded });
          });
          warm(previous);
          warm(next);

          if (api)
            countView(api, loaded.counter).then(
              (count) => !stale && setViews(count)
            );
        },
        () => !stale && setFailed(true)
      );

    return () => {
      stale = true;
    };
  }, [current, api]);

  const sides = useMemo(
    () => ({
      activeId: side,
      setActiveId: setSide,
      defaultId: null,
      setDefaultId: () => undefined,
    }),
    [side]
  );

  const label = subject?.title ?? talk?.title ?? 'Palestra';

  const rootStyle: RootStyle = { '--ticker-travel': motion(FLIP) };

  const root = useRef<HTMLDivElement | null>(null);

  const moving = useRef(false);

  const around: Record<Direction, string | undefined> = {
    previous: previous ?? chronology.at(-1),
    next: next ?? chronology[0],
  };

  const travel = (direction: Direction): void => {
    const to = around[direction];
    if (!to || to === current || moving.current) return;

    navigator.vibrate?.(10);
    moving.current = true;

    const swap = (): void => {
      root.current?.parentElement?.scrollTo({ top: 0 });
      setCurrent(to);
    };

    const follow = (): void =>
      startTransition(() =>
        history.replace(`${TALKS}${to}/`, history.location.state)
      );

    if (typeof document.startViewTransition !== 'function') {
      swap();
      follow();
      moving.current = false;
      return;
    }

    const release = stage(
      direction,
      root.current?.closest('[role="dialog"]') ?? null
    );

    const done = (): void => {
      release();
      moving.current = false;
    };

    document
      .startViewTransition(() => {
        flushSync(swap);
        follow();
      })
      .finished.then(done, done);
  };

  const latest = useRef(travel);
  latest.current = travel;

  const attach = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    root.current = node;

    let swiped = false;

    const swipe = (direction: Direction): void => {
      if (swiped) return;

      swiped = true;
      latest.current(direction);
    };

    const observer = Observer.create({
      target: node,
      type: 'touch',
      lockAxis: true,
      tolerance: SWIPE,
      onPress: () => (swiped = false),
      onLeft: () => swipe('next'),
      onRight: () => swipe('previous'),
    });

    return () => {
      observer.kill();
      root.current = null;
    };
  }, []);

  return (
    <Dialog
      fill
      bare
      screen={Boolean(gallery)}
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
        <Viewer
          key={`${gallery.label}:${gallery.at}`}
          gallery={gallery}
          onBack={() => setGallery(null)}
        />
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
                <div className='absolute inset-0 blur-[4px] opacity-6 mask-b-from-30% grayscale'>
                  <Cover src={talk.banner} alt='' />
                </div>
              )}
            </div>

            <header
              key={current}
              className={`${COLUMN} col-start-1 row-start-1 flex inverted flex-col gap-6 pt-[clamp(3.5rem,6vw,5rem)] pb-[clamp(1.5rem,3vw,2.5rem)] [view-transition-name:talk-header]`}
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
                <div
                  style={{ aspectRatio: `${shape.width} / ${shape.height}` }}
                  className='animate-ticker overflow-hidden rounded-3xl bg-well shadow-[0_1px_2px_rgb(14_9_39_/_0.12),0_24px_56px_-24px_rgb(14_9_39_/_0.55)] [animation-delay:140ms] [view-transition-name:talk-banner]'
                >
                  <div className='size-full [view-transition-name:talk-cover]'>
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

                  <SideContext.Provider value={sides}>
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
                  </SideContext.Provider>

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
