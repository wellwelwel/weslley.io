import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import avatar from '@site/src/assets/img/avatar.png';
import claude from '@site/src/assets/img/plush/claude.png';
import lagune from '@site/src/assets/img/plush/lagune.png';
import me from '@site/src/assets/img/plush/me.png';
import mvp from '@site/src/assets/img/plush/mvp.png';
import mysql from '@site/src/assets/img/plush/mysql.png';
import poku from '@site/src/assets/img/plush/poku.png';
import velvet from '@site/src/assets/img/plush/velvet-texture.png';
import background from '@site/src/assets/img/talks/codecon-2025/moments/04.jpg';

gsap.registerPlugin(useGSAP, Observer);

type Slide = {
  src: string;
  alt: string;
  title: [string, string];
  text: string;
};

const STEP_LOCK = 0.6;
const GROUP_SIZE = 3;

// Reduced motion shortens the travel instead of removing it: the same move at
// a fraction of the distance stays legible without the sweep that unsettles.
// The rail leans on its fade for the swap, so a short rise still reads.
const TRAVEL = {
  full: {
    titleY: 55,
    titleBlur: 6,
    titleStagger: 0.05,
    textX: 48,
    railY: 100,
    hintY: 8,
  },
  reduced: {
    titleY: 12,
    titleBlur: 2,
    titleStagger: 0.05,
    textX: 12,
    railY: 25,
    hintY: 3,
  },
};

const motion = (): (typeof TRAVEL)['full'] =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? TRAVEL.reduced
    : TRAVEL.full;

const FORWARD_KEYS = ['ArrowDown', 'ArrowRight', 'PageDown'];
const BACKWARD_KEYS = ['ArrowUp', 'ArrowLeft', 'PageUp'];

const sections = ['Works', 'About', 'Contact'];

const slides: Slide[] = [
  // About and Recognitions
  {
    src: me,
    alt: 'Pelúcia do Weslley Araújo',
    title: ['Com mais de', '600 milhões'],
    text: 'de downloads anuais em projetos autorais, Weslley impacta milhões de desenvolvedores globalmente através do open source.',
  },
  {
    src: mvp,
    alt: 'Pelúcia do MVP',
    title: ['Reconhecido como', 'Microsoft MVP'],
    text: 'nas categorias Developer Technologies: Web Development e Developer Tools',
  },
  {
    src: claude,
    alt: 'Pelúcia do Claude',
    title: ['Verificado pelo', 'Anthropic CVP'],
    text: 'O Cybersecurity Verification Program (CVP) permite a profissionais de segurança qualificados trabalharem com exploração de vulnerabilidades e ferramentas de segurança ofensiva, bloqueadas para os demais usuários.',
  },
  // Projects
  {
    src: mysql,
    alt: 'Pelúcia do MySQL',
    title: ['We keep data', 'honest.'],
    text: 'Schemas stay predictable and migrations stay reversible, because the surprises belong in the design and never in the data.',
  },
  {
    src: lagune,
    alt: 'Pelúcia do Lagune',
    title: ['Seu copiloto', 'em segurança:'],
    text: 'Lagune inova a segurança na era da IA, trazendo um conceito de proteção antes, durante e depois do desenvolvimento.',
  },
  {
    src: poku,
    alt: 'Pelúcia do Poku',
    title: ['We break it', 'before you do.'],
    text: 'Every release runs through a suite that assumes nothing works until the test says otherwise, so bugs surface here first.',
  },
];

const groups = Array.from(
  { length: Math.ceil(slides.length / GROUP_SIZE) },
  (_, index) => slides.slice(index * GROUP_SIZE, (index + 1) * GROUP_SIZE)
);

const Dot = (): ReactNode => (
  <span className='size-3.5 shrink-0 rounded-full bg-accent' />
);

export default (): ReactNode => {
  const { siteConfig } = useDocusaurusContext();
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLSpanElement>(null);
  const hintShell = useRef<HTMLDivElement>(null);
  const current = useRef(0);
  const locked = useRef(false);
  const unlock = useRef<gsap.core.Tween | null>(null);
  const railPlaced = useRef(false);
  const group = Math.floor(active / GROUP_SIZE);
  const last = active === slides.length - 1;
  const hinting = active === 0 || last;

  const show = (index: number) => {
    if (index === current.current || index < 0 || index > slides.length - 1)
      return;

    current.current = index;
    setActive(index);

    locked.current = true;
    unlock.current?.kill();
    unlock.current = gsap.delayedCall(STEP_LOCK, () => {
      locked.current = false;
    });
  };

  useGSAP(() => {
    const step = (direction: number) => {
      if (locked.current) return;

      show(current.current + direction);
    };

    const observer = Observer.create({
      type: 'wheel,touch',
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: true,
      allowClicks: true,
      onUp: () => step(1),
      onDown: () => step(-1),
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
  });

  useGSAP(
    () => {
      const travel = motion();

      gsap
        .timeline()
        .fromTo(
          '[data-slide-title]',
          {
            opacity: 0,
            yPercent: travel.titleY,
            filter: `blur(${travel.titleBlur}px)`,
          },
          {
            opacity: 1,
            yPercent: 0,
            filter: 'blur(0px)',
            duration: 0.32,
            stagger: travel.titleStagger,
            ease: 'power3.out',
          }
        )
        .fromTo(
          '[data-slide-text]',
          { opacity: 0, x: travel.textX },
          { opacity: 1, x: 0, duration: 0.38, ease: 'power2.out' },
          '-=0.22'
        );
    },
    { dependencies: [active], scope: stage }
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
        })
      );

      railPlaced.current = true;
    },
    { dependencies: [group], scope: rail }
  );

  useGSAP(
    () => {
      const travel = motion();

      if (!hinting) {
        gsap.to(hintShell.current, {
          autoAlpha: 0,
          duration: 0.3,
          ease: 'power2.out',
        });

        return;
      }

      gsap.fromTo(
        hintShell.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3, ease: 'power2.out' }
      );

      // On the last slide the only way forward is back, so the wheel rides up.
      gsap
        .timeline({ repeat: -1, repeatDelay: 0.35 })
        .fromTo(
          hint.current,
          { y: 0, opacity: 0 },
          { opacity: 1, duration: 0.25, ease: 'none' }
        )
        .to(
          hint.current,
          {
            y: last ? -travel.hintY : travel.hintY,
            duration: 0.8,
            ease: 'power1.in',
          },
          0
        )
        .to(hint.current, { opacity: 0, duration: 0.32 }, 0.48);
    },
    { dependencies: [hinting, last], revertOnUpdate: true }
  );

  return (
    <>
      <Head>
        <title>{siteConfig.title}</title>
        <body className='clean overscroll-none' />
      </Head>

      <div
        className={clsx(
          'relative flex h-dvh touch-pan-x touch-pinch-zoom flex-col p-5 antialiased transition-[padding-bottom] duration-500 ease-[cubic-bezier(0.2,0,0,1)] md:p-10 lg:p-20 xl:p-32',
          hinting
            ? 'pb-18 md:pb-20 lg:pb-26 xl:pb-32'
            : 'pb-5 md:pb-10 lg:pb-14 xl:pb-20'
        )}
      >
        <img
          src={background}
          alt=''
          aria-hidden='true'
          className='pointer-events-none fixed inset-0 size-full scale-125 object-cover blur-xl saturate-150 brightness-125'
        />

        <div className='relative flex min-h-0 flex-1 flex-col rounded-[2.5rem] bg-paper p-4 shadow-[0_1px_2px_rgb(14_9_39_/_0.12),0_8px_20px_rgb(14_9_39_/_0.14),0_28px_56px_rgb(14_9_39_/_0.20)]'>
          <header className='relative flex h-16 shrink-0 items-center justify-between px-4'>
            <span className='flex items-center gap-3'>
              <img
                src={avatar}
                alt=''
                className='size-9 shrink-0 rounded-full'
              />
              <span className='font-semibold tracking-tight text-ink'>
                Weslley Araújo
              </span>
            </span>

            <nav className='absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex'>
              {sections.map((section) => (
                <a
                  key={section}
                  href='#'
                  className='flex h-10 items-center text-base text-ink/70 transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:text-ink'
                >
                  {section}
                </a>
              ))}
            </nav>

            <a
              href='#'
              className='flex h-11 items-center gap-4 rounded-full bg-ink px-6 text-[0.9375rem] font-medium text-paper transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-ink/90'
            >
              Let's Talk
              <Dot />
            </a>
          </header>

          <main
            ref={stage}
            className='relative min-h-0 flex-1 overflow-hidden rounded-3xl border border-ink/10 bg-paper'
          >
            <img
              src={velvet}
              alt=''
              aria-hidden='true'
              className='pointer-events-none absolute inset-0 size-full object-cover opacity-25'
            />

            <div className='relative flex h-full flex-col p-8 pb-0 lg:p-14 lg:pb-0'>
              <div className='mt-auto'>
                <h1 className='m-0 text-[clamp(2.25rem,6.6vw,7rem)]/[1.02] font-bold tracking-[-0.02em] text-ink'>
                  <span data-slide-title className='block'>
                    {slides[active].title[0]}
                  </span>
                  <span data-slide-title className='block'>
                    {slides[active].title[1]}
                  </span>
                </h1>

                <p
                  data-slide-text
                  className='mt-6 mb-0 min-h-34 w-full max-w-150 text-lg/normal text-ink/70 text-pretty lg:min-h-27 lg:text-pretty'
                >
                  {slides[active].text}
                </p>
              </div>

              <div
                ref={rail}
                className='mt-auto -mx-8 grid overflow-hidden pt-6 lg:-mx-14'
              >
                {groups.map((members, groupIndex) => (
                  <div
                    key={members[0]!.alt}
                    data-group
                    className='col-start-1 row-start-1 flex items-end justify-center gap-2 lg:gap-6'
                  >
                    {members.map(({ src, alt }, memberIndex) => {
                      const index = groupIndex * GROUP_SIZE + memberIndex;

                      return (
                        <button
                          key={alt}
                          type='button'
                          onClick={() => show(index)}
                          aria-label={alt}
                          aria-current={index === active}
                          className='group block min-w-0 max-w-52 flex-1 cursor-pointer appearance-none border-0 bg-transparent p-0 focus-visible:-outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent'
                        >
                          <img
                            src={src}
                            alt=''
                            className={clsx(
                              'aspect-square w-full origin-bottom object-contain drop-shadow-[0_2px_2px_rgb(14_9_39_/_0.3)] transition-[filter,scale] duration-250 ease-[cubic-bezier(0.2,0,0,1)]',
                              index === active
                                ? 'scale-110 grayscale-0'
                                : 'scale-90 grayscale group-hover:grayscale-0 group-focus-visible:grayscale-0'
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

        <div
          ref={hintShell}
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 bottom-5 flex justify-center md:bottom-7 lg:bottom-9'
        >
          <span className='flex h-9 w-6 justify-center rounded-full border-2 border-paper/75 pt-1.5 shadow-[0_2px_10px_rgb(14_9_39_/_0.45)]'>
            <span ref={hint} className='size-1.25 rounded-full bg-paper' />
          </span>
        </div>
      </div>
    </>
  );
};
