import type { Section } from '@site/src/components/Header';
import type { Theme } from '@site/src/components/Home/slides';
import type { CSSProperties, ReactNode } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { Backdrop } from '@site/src/components/Backdrop';
import { Header } from '@site/src/components/Header';
import { Hill } from '@site/src/components/Hill';
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
import { useSlideshow } from '@site/src/components/Home/useSlideshow';
import { useSpots } from '@site/src/components/Home/useSpots';
import { Name } from '@site/src/components/Name';
import { PartnersDialog } from '@site/src/components/Partners/Dialog';
import { Picture } from '@site/src/components/Picture';
import { Progress } from '@site/src/components/Progress';
import { motion } from '@site/src/helpers/reduced-motion';

gsap.registerPlugin(useGSAP);

type PageStyle = CSSProperties & { '--tint'?: string };

const fallbackBackgrounds = [defaultBackground];

const RAIL = { full: 100, reduced: 55 };

const BLURRED = 'scale-125 blur-[24px] saturate-150 brightness-125';

const THEMES: Record<Theme, string> = {
  light: '',
  dark: '[--color-ink:#f0f4ff] [--color-paper:#0e0927]',
};

/* Reads as a halo on the light theme and as depth on the dark one, since the
   paper token already carries the surface color of each. */
const SHADOWS: Record<Theme, string> = {
  light: 'text-shadow-paper/18',
  dark: 'text-shadow-paper/50',
};

export default (): ReactNode => {
  const { siteConfig } = useDocusaurusContext();
  const [partners, setPartners] = useState(false);
  const [menu, setMenu] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const { active, show, home } = useSlideshow(slides.length, partners || menu);
  const { page, rail, place, spots } = useSpots();
  const railPlaced = useRef(false);
  const group = groupOf[active];
  const preview =
    hovered !== null && hovered !== active && groupOf[hovered] === group
      ? hovered
      : null;
  const focus = preview ?? active;
  const {
    actions,
    background,
    texture,
    color,
    mark,
    hill,
    theme = 'light',
    align,
    still,
    text,
  } = slides[active];
  const { stage: Stage, cta: Cta } = actions ?? {};
  const [titleLead, titleTail, titleMark] = slides[active].title;
  const flow = align === 'left' && 'max-sm:inline-block';
  const tint: PageStyle = { '--tint': color ?? hill };

  const openPartners = useCallback(() => setPartners(true), []);

  const closePartners = useCallback(() => setPartners(false), []);

  const sections = useMemo<Section[]>(
    () =>
      groups.map(({ label }, index) => ({
        label,
        onSelect: () => show(starts[index]),
      })),
    [show]
  );

  useGSAP(
    () => {
      const rows = rail.current?.querySelectorAll('[data-group]') ?? [];

      rows.forEach((row, index) =>
        gsap.to(row, {
          yPercent: (index - group) * motion(RAIL),
          autoAlpha: index === group ? 1 : 0,
          duration: railPlaced.current ? 0.5 : 0,
          ease: 'power3.out',
          overwrite: true,
        })
      );

      railPlaced.current = true;
    },
    { dependencies: [group], scope: rail }
  );

  return (
    <>
      <Head>
        <title>{siteConfig.title}</title>
        <body className='clean overscroll-none' />
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

        {colors.map((tone) => (
          <div
            key={tone}
            aria-hidden='true'
            style={{ backgroundColor: tone, opacity: tone === color ? 1 : 0 }}
            className='pointer-events-none fixed inset-0 transition-opacity duration-700 ease-swift'
          />
        ))}

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

          {/* Past 1440p the scales are frozen, so the stage caps at the height
              it had there and stays on the ground instead of spreading. */}
          <main className='relative flex min-h-0 flex-1 flex-col overflow-hidden sm:rounded-t-[2.5rem] sm:rounded-b-3xl'>
            <div className='relative mt-auto flex h-full max-h-326 flex-col pt-[clamp(1rem,7.75svh-1.75rem,3.5rem)] max-sm:pt-[clamp(0.75rem,7.75svh-2.5rem,3.5rem)] short:pt-1 cramped:pt-0 sm:px-8 lg:px-14'>
              <div
                className={clsx(
                  'mt-auto',
                  align === 'left'
                    ? 'mx-auto flex w-full max-w-7xl flex-col text-left short-wide:flex-row short-wide:items-center short-wide:justify-between short-wide:gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10'
                    : 'text-center'
                )}
              >
                <div className='min-w-0'>
                  <h1
                    className={clsx(
                      'm-0 text-[calc(var(--text-hero)+2px)]/[var(--text-hero--line-height)] font-[900] tracking-[-0.02em] text-ink text-balance text-shadow-md select-none sm:text-hero sm:font-[800] lg:text-[calc(var(--text-hero)-2px)] 2xl:text-hero',
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
                        'mt-[clamp(1rem,4svh-0.5rem,1.75rem)] mb-0 min-h-[clamp(2.5rem,6.67svh+2.25rem,6.75rem)] w-full max-w-150 animate-slide text-[max(0.875rem,min(1rem,3svh-0.25rem))]/normal font-semibold text-ink/70 text-pretty text-shadow-sm sm:mt-10 sm:text-lede short:mt-2 short:min-h-10',
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
                      className='mt-10 animate-slide max-sm:hidden tight:hidden'
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
                        ? 'mt-[clamp(1.5rem,7.5svh-0.5rem,4rem)] shrink-0 short:mt-3 cramped:mt-1 short-wide:mt-0 lg:mt-0'
                        : 'mt-[clamp(0.5rem,2.2svh-0.25rem,1.25rem)]',
                      !still && 'animate-slide'
                    )}
                  >
                    <Stage open={partners} onOpen={openPartners} mark={mark} />
                  </div>
                )}
              </div>

              <div
                ref={rail}
                className='mt-auto grid shrink-0 overflow-hidden pt-[clamp(0.5rem,2.75svh-0.5rem,1.5rem)] [--chip:clamp(2.75rem,24.4svh-3.5rem,16rem)] short:pt-1 short:[--chip:clamp(2.5rem,25svh-5.5rem,13rem)] squat:[--chip:clamp(2.5rem,25svh-5.5rem,13rem)] sm:-mx-8 lg:-mx-14'
              >
                {groups.map(({ label, slides: members }, groupIndex) => (
                  <div
                    key={label}
                    data-group
                    className='col-start-1 row-start-1 flex items-end justify-center gap-2 lg:gap-6'
                  >
                    {members.map(({ src, alt }, memberIndex) => {
                      const index = starts[groupIndex] + memberIndex;

                      return (
                        <button
                          key={alt}
                          ref={place(index)}
                          type='button'
                          onClick={() => show(index)}
                          onPointerEnter={({ pointerType }) =>
                            pointerType === 'mouse' && setHovered(index)
                          }
                          onPointerLeave={() => setHovered(null)}
                          onFocus={() => setHovered(index)}
                          onBlur={() => setHovered(null)}
                          aria-label={alt}
                          aria-current={index === active}
                          className='group block min-w-0 max-w-(--chip) flex-1 origin-bottom cursor-pointer appearance-none border-0 bg-transparent p-0 transition-[scale] duration-200 ease-swift focus-visible:-outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent active:scale-95'
                        >
                          <Picture
                            src={src}
                            alt=''
                            sizes='(min-width: 40rem) 16rem, 25vw'
                            decoding='async'
                            draggable={false}
                            className={clsx(
                              'block aspect-square w-full origin-bottom object-contain drop-shadow-[0_2px_3px_var(--shade-deep)] transition-[scale] duration-250 ease-swift',
                              index === active ? 'scale-100' : 'scale-65'
                            )}
                          />
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>

        {spots[focus] !== undefined && (
          <Hill center={spots[focus]} tone={hill ?? mark} />
        )}
      </div>

      {partners && <PartnersDialog onClose={closePartners} />}
    </>
  );
};
