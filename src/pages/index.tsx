import type { Section, Step } from '@site/src/components/Header';
import type { Trigger } from '@site/src/components/Partners';
import type { ComponentType, CSSProperties, ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { GiBigWave } from 'react-icons/gi';
import { IoIosCalendar } from 'react-icons/io';
import { RiMicrosoftLine } from 'react-icons/ri';
import { TbBrandMysql, TbBrandOpenSource, TbPig } from 'react-icons/tb';
import { Agenda } from '@site/src/components/Agenda';
import { Backdrop } from '@site/src/components/Backdrop';
import { Badges } from '@site/src/components/Badges';
import { Header } from '@site/src/components/Header';
import { Name } from '@site/src/components/Name';
import { PartnersAction, PartnersDialog } from '@site/src/components/Partners';
import { Picture } from '@site/src/components/Picture';
import { Progress } from '@site/src/components/Progress';
import { Star } from '@site/src/components/Star';
import { setLabel, useStats } from '@site/src/components/Stats';
import { isReducedMotion } from '@site/src/helpers/reduced-motion';

gsap.registerPlugin(useGSAP, Observer);

type SlideAction = ComponentType<Trigger & { mark?: string }>;

type Theme = 'light' | 'dark';

type TitleStyle = CSSProperties & {
  '--title-travel': string;
  '--title-blur': string;
};

type Slide = {
  src: string;
  alt: string;
  name: string;
  Icon: IconType;
  title: [ReactNode, ReactNode, ReactNode?];
  text?: ReactNode;
  background?: string;
  texture?: string;
  color?: string;
  mark?: string;
  theme?: Theme;
  align?: 'left';
  frosted?: boolean;
  Action?: SlideAction;
};

type Group = {
  label: string;
  slides: Slide[];
};

const defaultBackground = '/img/talks/codecon-2025/moments/04.jpg';
const github = '/img/plush/github.png';
const lagune = '/img/plush/lagune.png';
const laguneBackground = '/img/plush/lagune-bg.png';
const me = '/img/plush/me.png';
const mvp = '/img/plush/mvp.png';
const mysql = '/img/plush/mysql.png';
const mysql2Background = '/img/plush/mysql2-bg.png';
const poku = '/img/plush/poku.png';
const pokuBackground = '/img/plush/poku-bg.png';
const velvet = '/img/plush/velvet-texture.png';

const FALLBACK_DOWNLOADS = '600 milhões';
const NUMBERS = Array.from({ length: 10 }, (_, i) => i);
const ROLL = { duration: 0.3, stagger: 0.05, ease: 'none' };
const STEP_LOCK = 0.6;
const TOLERANCE = 10;
const TITLE_IN = 0.32;
const TEXT_IN = 0.38;
const TEXT_GAP = 0.05;

const TRAVEL = {
  full: {
    titleY: 55,
    titleBlur: 6,
    titleStagger: 0.05,
    textX: 48,
    railY: 100,
    roll: 1,
  },
  reduced: {
    titleY: 30,
    titleBlur: 3,
    titleStagger: 0.05,
    textX: 26,
    railY: 55,
    roll: 0.65,
  },
};

const motion = (): (typeof TRAVEL)['full'] =>
  isReducedMotion() ? TRAVEL.reduced : TRAVEL.full;

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

const FORWARD_KEYS = ['ArrowDown', 'ArrowRight', 'PageDown'];
const BACKWARD_KEYS = ['ArrowUp', 'ArrowLeft', 'PageUp'];

const Digit = ({ char, index }: { char: string; index: number }): ReactNode => {
  const strip = useRef<HTMLSpanElement>(null);
  const shown = useRef(Number(char));
  const target = Number(char);

  useGSAP(
    () => {
      if (!strip.current || shown.current === target) return;

      const from = (target - shown.current) * 10 * motion().roll;

      shown.current = target;
      gsap.fromTo(
        strip.current,
        { yPercent: from },
        {
          yPercent: 0,
          duration: ROLL.duration,
          ease: ROLL.ease,
          delay: index * ROLL.stagger,
        }
      );
    },
    { dependencies: [target] }
  );

  return (
    <span className='relative inline-block'>
      <span className='invisible'>{char}</span>
      <span className='absolute inset-0 overflow-hidden'>
        <span
          className='block'
          style={{ transform: `translateY(-${target * 10}%)` }}
        >
          <span ref={strip} className='block'>
            {NUMBERS.map((n) => (
              <span key={n} className='block'>
                <Name stroke>{String(n)}</Name>
              </span>
            ))}
          </span>
        </span>
      </span>
    </span>
  );
};

const Downloads = (): ReactNode => {
  const stats = useStats();

  const downloads = stats
    ? setLabel(stats.downloadsPerYear.value, 'pt-BR', 0)
    : FALLBACK_DOWNLOADS;

  const [amount, suffix] = downloads.split(' ');

  return (
    <Name stroke>
      {'Mais de '}
      <span className='font-featured tabular-nums'>
        <span className='sr-only'>{amount}</span>
        <span aria-hidden='true'>
          {[...amount].map((char, index) =>
            /^\d$/.test(char) ? (
              <Digit key={`digit:${index}`} char={char} index={index} />
            ) : (
              <Name key={`char:${index}`} stroke>
                {char}
              </Name>
            )
          )}
        </span>
      </span>
      {` ${suffix}`}
    </Name>
  );
};

const groups: Group[] = [
  {
    label: 'Home',
    slides: [
      {
        src: github,
        alt: 'Pelúcia do GitHub',
        name: 'Open Source',
        Icon: TbBrandOpenSource,
        title: [<Downloads />, 'de downloads anuais', '.'],
        text: 'Weslley impacta diretamente milhões de desenvolvedores e projetos globalmente através do open source.',
        texture: velvet,
        Action: PartnersAction,
      },
      {
        src: me,
        alt: 'Pelúcia do Weslley Araújo',
        name: 'Agenda',
        Icon: IoIosCalendar,
        title: ['Próximos', 'eventos', '.'],
        color: '#000000aa',
        background: defaultBackground,
        theme: 'dark',
        align: 'left',
        frosted: true,
        Action: () => <Agenda />,
      },
      {
        src: mvp,
        alt: 'Pelúcia do MVP',
        name: 'Microsoft MVP',
        Icon: RiMicrosoftLine,
        title: ['Microsoft MVP &', 'Anthropic CVP', '.'],
        text: 'Weslley é reconhecido como Microsoft MVP (Developer Technologies: Developer Tools e Web Development) e verificado pelo Anthropic Cyber Verification Program (CVP).',
        texture: velvet,
        Action: Badges,
      },
    ],
  },
  {
    label: 'Projetos',
    slides: [
      {
        src: mysql,
        alt: 'Pelúcia do MySQL',
        name: 'MySQL2',
        Icon: TbBrandMysql,
        title: [
          'O driver MySQL mais baixado do',
          'ecossistema JavaScript',
          '.',
        ],
        text: 'Weslley mantém o MySQL2, driver para MySQL Server usado publicamente por empresas como Amazon, Microsoft, Google e Facebook.',
        background: mysql2Background,
        color: '#00afff40',
        mark: '#00a1ff',
      },
      {
        src: lagune,
        alt: 'Pelúcia do Lagune',
        name: 'Lagune',
        Icon: GiBigWave,
        title: ['Lagune, seu copiloto', 'em segurança', '.'],
        text: 'Weslley é o criador do Lagune, o pioneiro de sua categoria ao trazer proteção antes, durante e depois do desenvolvimento para desenvolvedores e não desenvolvedores.',
        background: laguneBackground,
        color: '#00a7ff66',
        mark: '#f0f9ff',
        Action: ({ mark }) => <Star repo='wellwelwel/lagune' mark={mark} />,
      },
      {
        src: poku,
        alt: 'Pelúcia do Poku',
        name: 'Poku',
        Icon: TbPig,
        title: ['Tornando testes fáceis', 'para Node.js, Bun e Deno', '.'],
        text: 'Weslley é autor do Poku, um executor de testes que democratiza os testes para desenvolvedores de todos os níveis.',
        background: pokuBackground,
        color: '#56d0ff2b',
        mark: '#ff5498',
        Action: ({ mark }) => <Star repo='wellwelwel/poku' mark={mark} />,
      },
    ],
  },
];

const slides = groups.flatMap((group) => group.slides);

const starts = groups.map((_, index) =>
  groups.slice(0, index).reduce((total, { slides }) => total + slides.length, 0)
);

const groupOf = groups.flatMap((group, index) => group.slides.map(() => index));

const customBackgrounds = [
  ...new Set(slides.flatMap(({ background }) => background ?? [])),
];

const textures = [...new Set(slides.flatMap(({ texture }) => texture ?? []))];

const colors = [...new Set(slides.flatMap(({ color }) => color ?? []))];

const steps: Step[] = slides.map(({ name, Icon }) => ({ name, Icon }));

export default (): ReactNode => {
  const { siteConfig } = useDocusaurusContext();
  const [active, setActive] = useState(0);
  const [live, setLive] = useState(false);
  const [partners, setPartners] = useState(false);
  const [menu, setMenu] = useState(false);
  const stage = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const current = useRef(0);
  const locked = useRef(false);
  const unlock = useRef<gsap.core.Tween | null>(null);
  const railPlaced = useRef(false);
  const group = groupOf[active]!;
  const {
    Action,
    background,
    texture,
    color,
    mark,
    theme = 'light',
    align,
    frosted,
  } = slides[active];
  const [titleLead, titleTail, titleMark] = slides[active].title;
  const travel = live && isReducedMotion() ? TRAVEL.reduced : TRAVEL.full;

  const entrance: TitleStyle | undefined = live
    ? {
        '--title-travel': `${travel.titleY}%`,
        '--title-blur': `${travel.titleBlur}px`,
      }
    : undefined;

  const show = useCallback((index: number) => {
    if (index === current.current || index < 0 || index > slides.length - 1)
      return;

    current.current = index;
    setActive(index);

    locked.current = true;
    unlock.current?.kill();
    unlock.current = gsap.delayedCall(STEP_LOCK, () => {
      locked.current = false;
    });
  }, []);

  const home = useCallback(() => show(0), [show]);

  const openPartners = useCallback(() => setPartners(true), []);

  const closePartners = useCallback(() => setPartners(false), []);

  const sections = useMemo<Section[]>(
    () =>
      groups.map(({ label }, index) => ({
        label,
        onSelect: () => show(starts[index]!),
      })),
    [show]
  );

  useEffect(() => setLive(true), []);

  useGSAP(
    () => {
      if (partners || menu) return;

      const step = (direction: number) => {
        if (locked.current) return;

        show(current.current + direction);
      };

      const observer = Observer.create({
        type: 'wheel,touch',
        wheelSpeed: -1,
        tolerance: TOLERANCE,
        preventDefault: true,
        allowClicks: true,
        lockAxis: true,
        ignoreCheck: ({ target }) =>
          target instanceof Element && target.closest('[data-scroll]') !== null,
        onUp: (self) => self.axis !== 'x' && step(1),
        onDown: (self) => self.axis !== 'x' && step(-1),
      });

      const onKeyDown = (event: KeyboardEvent) => {
        const direction = FORWARD_KEYS.includes(event.key)
          ? 1
          : BACKWARD_KEYS.includes(event.key)
            ? -1
            : 0;

        if (!direction) return;

        event.preventDefault();
        step(direction);
      };

      window.addEventListener('keydown', onKeyDown);

      return () => {
        observer.kill();
        window.removeEventListener('keydown', onKeyDown);
      };
    },
    { dependencies: [partners, menu], revertOnUpdate: true }
  );

  useGSAP(
    () => {
      const texts = stage.current?.querySelectorAll('[data-slide-text]');

      if (texts?.length)
        gsap.fromTo(
          texts,
          { opacity: 0, x: travel.textX },
          {
            opacity: 1,
            x: 0,
            duration: TEXT_IN,
            ease: 'power2.out',
            delay: TITLE_IN + travel.titleStagger + TEXT_GAP,
          }
        );
    },
    { dependencies: [active], scope: stage, revertOnUpdate: true }
  );

  useGSAP(
    () => {
      const travel = motion();

      const rows = rail.current?.querySelectorAll('[data-group]') ?? [];

      rows.forEach((row, index) =>
        gsap.to(row, {
          yPercent: (index - group) * travel.railY,
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
        className={clsx(
          'relative flex h-dvh touch-pan-x touch-pinch-zoom flex-col p-5 antialiased max-sm:h-svh max-sm:pt-6',
          THEMES[theme]
        )}
      >
        <Backdrop
          sources={[defaultBackground]}
          active={background ?? defaultBackground}
          className={`fixed ${BLURRED}`}
        />

        <Backdrop
          sources={customBackgrounds}
          active={background}
          className={`fixed object-bottom-right ${BLURRED}`}
        />

        {colors.map((tone) => (
          <div
            key={tone}
            aria-hidden='true'
            style={{ backgroundColor: tone, opacity: tone === color ? 1 : 0 }}
            className='pointer-events-none fixed inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.2,0,0,1)]'
          />
        ))}

        <div
          aria-hidden='true'
          className={clsx(
            'pointer-events-none fixed inset-0 bg-paper transition-opacity duration-700 ease-[cubic-bezier(0.2,0,0,1)] sm:hidden',
            background ? 'opacity-0' : 'opacity-100'
          )}
        />

        <div
          className={clsx(
            'relative flex min-h-0 flex-1 flex-col p-4 pt-0 transition-[background-color,box-shadow] duration-700 ease-[cubic-bezier(0.2,0,0,1)] max-sm:p-0 sm:overflow-hidden sm:rounded-[2rem]',
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

          <main
            ref={stage}
            className='relative min-h-0 flex-1 overflow-hidden sm:rounded-t-[2.5rem] sm:rounded-b-3xl'
          >
            <div className='relative flex h-full flex-col pt-[clamp(1rem,7.75svh-1.75rem,3.5rem)] max-sm:pt-[clamp(0.75rem,7.75svh-2.5rem,3.5rem)] sm:px-8 lg:px-14'>
              <div
                className={clsx(
                  'mt-auto',
                  align === 'left'
                    ? 'mx-auto flex w-full max-w-7xl flex-col text-left short-wide:flex-row short-wide:items-end short-wide:justify-between short-wide:gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10'
                    : 'text-center'
                )}
              >
                <div className='min-w-0'>
                  <h1
                    style={entrance}
                    className={clsx(
                      'm-0 text-[calc(var(--text-hero)+2px)]/[var(--text-hero--line-height)] font-[900] tracking-[-0.02em] text-ink text-shadow-md select-none sm:text-hero sm:font-[800] lg:text-[calc(var(--text-hero)-2px)] 2xl:text-hero',
                      SHADOWS[theme]
                    )}
                  >
                    <span
                      key={`lead:${active}`}
                      className={clsx('block', live && 'animate-title')}
                    >
                      <Name stroke>{titleLead}</Name>
                    </span>
                    <span
                      key={`tail:${active}`}
                      className={clsx(
                        'block',
                        live && 'animate-title [animation-delay:50ms]'
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

                  {slides[active].text && (
                    <p
                      data-slide-text
                      className={clsx(
                        'mt-[clamp(1rem,4svh-0.5rem,1.75rem)] mb-0 min-h-[clamp(2.5rem,6.67svh+2.25rem,6.75rem)] w-full max-w-150 text-[max(0.875rem,min(1rem,3svh-0.25rem))]/normal font-semibold text-ink/70 text-pretty text-shadow-sm sm:mt-10 sm:text-[max(1rem,min(1.125rem,3svh-0.25rem))]',
                        align !== 'left' && 'mx-auto',
                        SHADOWS[theme]
                      )}
                    >
                      {slides[active].text}
                    </p>
                  )}
                </div>

                {Action && (
                  <div
                    data-slide-text={frosted ? undefined : ''}
                    className={
                      align === 'left'
                        ? 'mt-[clamp(0.875rem,3.5svh-0.5rem,2rem)] shrink-0 short-wide:mt-0 lg:mt-0'
                        : 'mt-[clamp(0.5rem,2.2svh-0.25rem,1.25rem)]'
                    }
                  >
                    <Action open={partners} onOpen={openPartners} mark={mark} />
                  </div>
                )}
              </div>

              <div
                ref={rail}
                className='mt-auto grid shrink-0 overflow-hidden pt-[clamp(0.5rem,2.75svh-0.5rem,1.5rem)] sm:-mx-8 lg:-mx-14'
              >
                {groups.map(({ label, slides: members }, groupIndex) => (
                  <div
                    key={label}
                    data-group
                    className='col-start-1 row-start-1 flex items-end justify-center gap-2 lg:gap-6'
                  >
                    {members.map(({ src, alt }, memberIndex) => {
                      const index = starts[groupIndex]! + memberIndex;

                      return (
                        <button
                          key={alt}
                          type='button'
                          onClick={() => show(index)}
                          aria-label={alt}
                          aria-current={index === active}
                          className='group block min-w-0 max-w-[clamp(2.75rem,24.4svh-3.5rem,13rem)] flex-1 origin-bottom cursor-pointer appearance-none border-0 bg-transparent p-0 transition-[scale] duration-200 ease-[cubic-bezier(0.2,0,0,1)] focus-visible:-outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent active:scale-95'
                        >
                          <Picture
                            src={src}
                            alt=''
                            sizes='(min-width: 40rem) 13rem, 25vw'
                            decoding='async'
                            draggable={false}
                            className={clsx(
                              'aspect-square w-full origin-bottom object-contain drop-shadow-[0_2px_2px_rgb(14_9_39_/_0.3)] transition-[scale] duration-250 ease-[cubic-bezier(0.2,0,0,1)] max-sm:block',
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
      </div>

      {partners && <PartnersDialog onClose={closePartners} />}
    </>
  );
};
