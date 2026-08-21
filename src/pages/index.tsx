import type { Section } from '@site/src/components/Header';
import type { Theme } from '@site/src/components/Home/slides';
import type { CSSProperties, ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from '@docusaurus/Head';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import { Backdrop } from '@site/src/components/Backdrop';
import { Header } from '@site/src/components/Header';
import { Hill } from '@site/src/components/Hill';
import { Rail } from '@site/src/components/Home/Rail';
import {
  backgrounds,
  colors,
  defaultBackground,
  groupOf,
  groups,
  slides,
  starts,
  steps,
  textures,
} from '@site/src/components/Home/slides';
import { Tint } from '@site/src/components/Home/Tint';
import { useSlideshow } from '@site/src/components/Home/useSlideshow';
import { useSpots } from '@site/src/components/Home/useSpots';
import { Name } from '@site/src/components/Name';
import { PartnersDialog } from '@site/src/components/Partners/Dialog';
import { srcset } from '@site/src/components/Picture';
import { Progress } from '@site/src/components/Progress';
import interLatin from '@site/src/fonts/inter-latin.woff2';
import noto800 from '@site/src/fonts/noto-sans-latin-800.woff2';
import noto900 from '@site/src/fonts/noto-sans-latin-900.woff2';

type PageStyle = CSSProperties & { '--tint'?: string };

const MEDIA = {
  narrow: '(max-width: 39.9375rem)',
  wide: '(min-width: 40rem)',
};

const fallbackBackgrounds = [defaultBackground];

const opening = slides[0].texture;

const grain = opening && srcset(opening, 'avif');

const BLURRED = 'scale-125 blur-[24px] saturate-150 brightness-125';

const THEMES: Record<Theme, string> = {
  light: '',
  dark: '[--color-ink:#f0f4ff] [--color-paper:#0e0927]',
};

const SHADOWS: Record<Theme, string> = {
  light: 'text-shadow-paper/18',
  dark: 'text-shadow-paper/50',
};

export default (): ReactNode => {
  const { siteConfig } = useDocusaurusContext();
  const { search } = useLocation();
  const [partners, setPartners] = useState(false);
  const [menu, setMenu] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const { active, show, home } = useSlideshow(slides.length, partners || menu);
  const { page, rail, place, spots } = useSpots();
  const group = groupOf[active];
  const preview =
    hovered !== null && hovered !== active && groupOf[hovered] === group
      ? hovered
      : null;
  const focus = preview ?? active;
  const {
    actions,
    src: plush,
    background,
    texture,
    color,
    mark,
    hill,
    scene: Scene,
    theme = 'light',
    align,
    still,
    text,
    footnote,
  } = slides[active];
  const { stage: Stage, cta: Cta } = actions ?? {};
  const [titleLead, titleTail, titleMark] = slides[active].title;
  const flow = align === 'left' && 'max-lg:inline-block';
  const tint: PageStyle = { '--tint': color ?? hill };

  const openPartners = useCallback(() => setPartners(true), []);

  const closePartners = useCallback(() => setPartners(false), []);

  useEffect(() => {
    if (new URLSearchParams(search).has('partners')) setPartners(true);
  }, [search]);

  const sections = useMemo<Section[]>(
    () =>
      groups.map(({ label }, index) => ({
        label,
        onSelect: () => show(starts[index]),
      })),
    [show]
  );

  return (
    <>
      <Head>
        <title>{siteConfig.title}</title>
        <meta
          name='description'
          content='Microsoft MVP e Anthropic CVP, Weslley Araújo mantém o MySQL2 e criou o Poku e o Lagune, impactando milhões de desenvolvedores através do open source.'
        />
        <body className='clean overscroll-none' />
        <link
          rel='preload'
          as='font'
          type='font/woff2'
          href={interLatin}
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          as='font'
          type='font/woff2'
          href={noto900}
          media={MEDIA.narrow}
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          as='font'
          type='font/woff2'
          href={noto800}
          media={MEDIA.wide}
          crossOrigin='anonymous'
        />
        {grain && (
          <link
            rel='preload'
            as='image'
            type='image/avif'
            imageSrcSet={grain}
            imageSizes='100vw'
            media={MEDIA.wide}
            fetchPriority='high'
          />
        )}
      </Head>

      <Progress value={(active + 1) / slides.length} color={mark} />

      <div
        ref={page}
        style={tint}
        className={clsx(
          'shaded relative flex h-dvh touch-pan-x touch-pinch-zoom flex-col p-5 antialiased max-sm:h-svh max-sm:pt-6 short:p-3 cramped:p-2',
          THEMES[theme]
        )}
      >
        <Backdrop
          sources={fallbackBackgrounds}
          active={background ?? defaultBackground}
          className={`fixed ${BLURRED}`}
        />

        <Backdrop
          sources={backgrounds}
          active={background}
          className={`fixed object-bottom-right ${BLURRED}`}
        />

        {Scene && <Scene />}

        <Tint tones={colors} active={color} />

        <div
          aria-hidden='true'
          className={clsx(
            'pointer-events-none fixed inset-0 bg-paper transition-opacity duration-700 ease-swift sm:hidden',
            background ? 'opacity-0' : 'opacity-100'
          )}
        />

        <div
          className={clsx(
            'relative flex min-h-0 flex-1 flex-col p-4 pt-0 transition-[background-color,box-shadow] duration-700 ease-swift max-sm:p-0 short:p-3 short:pt-0 sm:overflow-hidden sm:rounded-[2rem]',
            background
              ? 'bg-transparent shadow-none'
              : 'sm:bg-paper sm:shadow-[0_0_24px_rgb(255_255_255_/_0.3)]'
          )}
        >
          <Backdrop
            sources={textures}
            active={texture}
            className='absolute max-sm:fixed'
            opacity={0.25}
            priority='auto'
          />

          <Header
            sections={sections}
            steps={steps}
            active={active}
            onNavigate={show}
            menu={menu}
            partners={partners}
            onMenu={setMenu}
            onHome={home}
            onPartners={openPartners}
          />

          <main className='relative flex min-h-0 flex-1 flex-col overflow-hidden sm:rounded-t-[2.5rem] sm:rounded-b-3xl'>
            <div
              className={clsx(
                'relative mt-auto flex h-full max-h-326 flex-col sm:px-8 lg:px-14',
                plush &&
                  'pt-[clamp(1rem,7.75svh-1.75rem,3.5rem)] max-sm:pt-[clamp(0.75rem,7.75svh-2.5rem,3.5rem)] short:pt-1 cramped:pt-0'
              )}
            >
              <div
                className={clsx(
                  plush
                    ? 'mt-auto'
                    : 'flex flex-1 flex-col justify-center gap-[clamp(1.5rem,5svh,3rem)]',
                  align === 'left'
                    ? 'mx-auto flex w-full max-w-7xl flex-col text-left short-wide:flex-row short-wide:items-center short-wide:justify-between short-wide:gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10'
                    : 'text-center'
                )}
              >
                <div className='min-w-0'>
                  <h1
                    className={clsx(
                      'm-0 text-[calc(var(--text-hero)+2px)]/[var(--text-hero--line-height)] font-[900] tracking-[-0.02em] text-ink text-balance text-shadow-md select-none sm:text-hero sm:font-[800]',
                      SHADOWS[theme]
                    )}
                  >
                    <span
                      key={`lead:${active}`}
                      className={clsx('block animate-title', flow)}
                    >
                      <Name stroke>{titleLead}</Name>
                    </span>{' '}
                    <span
                      key={`tail:${active}`}
                      className={clsx(
                        'block animate-title [animation-delay:50ms]',
                        flow
                      )}
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
                      key={`text:${active}`}
                      className={clsx(
                        'mt-[clamp(1rem,4svh-0.5rem,1.75rem)] mb-0 w-full max-w-150 animate-slide text-[max(0.875rem,min(1rem,3svh-0.25rem))]/normal font-semibold text-ink/70 text-pretty text-shadow-sm sm:mt-10 sm:text-lede short:mt-2',
                        plush &&
                          'min-h-[clamp(2.5rem,6.67svh+2.25rem,6.75rem)] short:min-h-10',
                        align !== 'left' && 'mx-auto',
                        SHADOWS[theme]
                      )}
                    >
                      {text}
                    </p>
                  )}

                  {Cta && (
                    <div
                      key={`cta:${active}`}
                      className='mt-10 animate-slide max-lg:hidden'
                    >
                      <Cta open={partners} onOpen={openPartners} mark={mark} />
                    </div>
                  )}
                </div>

                {Stage && (
                  <div
                    key={`stage:${active}`}
                    className={clsx(
                      align === 'left'
                        ? 'mt-[clamp(1.5rem,20svh-7.25rem,4rem)] shrink-0 short:mt-3 cramped:mt-1 short-wide:mt-0 lg:mt-0'
                        : plush && 'mt-[clamp(0.5rem,2.2svh-0.25rem,1.25rem)]',
                      !still && 'animate-slide'
                    )}
                  >
                    <Stage open={partners} onOpen={openPartners} mark={mark} />
                  </div>
                )}

                {footnote && (
                  <p
                    key={`footnote:${active}`}
                    className='m-0 flex animate-ticker items-center justify-center gap-2 text-[0.8125rem]/none font-semibold text-ink/55 halo [animation-delay:700ms]'
                  >
                    {footnote}
                  </p>
                )}
              </div>

              <Rail
                ref={rail}
                active={active}
                open={Boolean(plush)}
                place={place}
                onSelect={show}
                onHover={setHovered}
              />
            </div>
          </main>
        </div>

        {plush && spots[focus] !== undefined && (
          <Hill center={spots[focus]} tone={hill ?? mark} />
        )}
      </div>

      {partners && <PartnersDialog onClose={closePartners} />}
    </>
  );
};
