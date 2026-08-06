import type { Section } from '@site/src/components/Header';
import type { Trigger } from '@site/src/components/Partners';
import type { ComponentType, ReactNode } from 'react';
import { useRef, useState } from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import claude from '@site/src/assets/img/plush/claude.png';
import lagune from '@site/src/assets/img/plush/lagune.png';
import me from '@site/src/assets/img/plush/me.png';
import mvp from '@site/src/assets/img/plush/mvp.png';
import mysql from '@site/src/assets/img/plush/mysql.png';
import poku from '@site/src/assets/img/plush/poku.png';
import velvet from '@site/src/assets/img/plush/velvet-texture.png';
import background from '@site/src/assets/img/talks/codecon-2025/moments/04.jpg';
import { Header } from '@site/src/components/Header';
import { Partners, PartnersDialog } from '@site/src/components/Partners';
import { Progress } from '@site/src/components/Progress';
import { Socials } from '@site/src/components/Socials';
import { isReducedMotion } from '@site/src/helpers/reduced-motion';

gsap.registerPlugin(useGSAP, Observer);

type SlideAction = ComponentType<Trigger>;

type Slide = {
  src: string;
  alt: string;
  title: [string, string];
  text: string;
  Action?: SlideAction;
};

const STEP_LOCK = 0.6;
const GROUP_SIZE = 3;
const PROJECTS_GROUP = 1;
const TOLERANCE = 10;
const TITLE_IN = 0.32;
const TEXT_IN = 0.38;
const TEXT_GAP = 0.05;
const HINT_IN = 0.35;
const HINT_OUT = 0.16;
const HINT_LEAD = 0.12;

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
  isReducedMotion() ? TRAVEL.reduced : TRAVEL.full;

const afterContent = (travel: (typeof TRAVEL)['full']): number =>
  TITLE_IN + travel.titleStagger + TEXT_GAP + TEXT_IN - HINT_LEAD;

const FORWARD_KEYS = ['ArrowDown', 'ArrowRight', 'PageDown'];
const BACKWARD_KEYS = ['ArrowUp', 'ArrowLeft', 'PageUp'];

const slides: Slide[] = [
  // About and Recognitions
  {
    src: me,
    alt: 'Pelúcia do Weslley Araújo',
    title: ['Com mais de', '600 milhões'],
    text: 'de downloads anuais em projetos autorais, Weslley impacta milhões de desenvolvedores globalmente através do open source.',
    Action: Partners,
  },
  {
    src: mvp,
    alt: 'Pelúcia do MVP',
    title: ['Reconhecido como', 'Microsoft MVP'],
    text: 'Levo ao palco experiências reais de sistemas usados em escala global e inovação em sua mais pura essência.',
  },
  {
    src: claude,
    alt: 'Pelúcia do Claude',
    title: ['Desenvolvedor verificado pelo', 'Anthropic CVP'],
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

export default (): ReactNode => {
  const { siteConfig } = useDocusaurusContext();
  const [active, setActive] = useState(0);
  const [partners, setPartners] = useState(false);
  const [menu, setMenu] = useState(false);
  const [pressed, setPressed] = useState<number | null>(null);
  const [social, setSocial] = useState<string | null>(null);
  const stage = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLSpanElement>(null);
  const hintShell = useRef<HTMLDivElement>(null);
  const current = useRef(0);
  const locked = useRef(false);
  const unlock = useRef<gsap.core.Tween | null>(null);
  const railPlaced = useRef(false);
  const hintPlaced = useRef(false);
  const group = Math.floor(active / GROUP_SIZE);
  const { Action } = slides[active];
  const last = active === slides.length - 1;
  const groupEnd = Math.min((group + 1) * GROUP_SIZE, slides.length) - 1;
  const hinting = active === groupEnd;

  const show = (index: number) => {
    if (index === current.current || index < 0 || index > slides.length - 1)
      return;

    current.current = index;
    setActive(index);
    setSocial(null);

    locked.current = true;
    unlock.current?.kill();
    unlock.current = gsap.delayedCall(STEP_LOCK, () => {
      locked.current = false;
    });
  };

  const release = () => setPressed(null);

  const home = () => show(0);

  const sections: Section[] = [
    { label: 'Home', onSelect: home },
    { label: 'Projetos', onSelect: () => show(PROJECTS_GROUP * GROUP_SIZE) },
  ];

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
    },
    { dependencies: [partners, menu], revertOnUpdate: true }
  );

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
            duration: TITLE_IN,
            stagger: travel.titleStagger,
            ease: 'power3.out',
          }
        )
        .fromTo(
          '[data-slide-text]',
          { opacity: 0, x: travel.textX },
          { opacity: 1, x: 0, duration: TEXT_IN, ease: 'power2.out' },
          `+=${TEXT_GAP}`
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
      const placed = hintPlaced.current;

      hintPlaced.current = true;

      if (!hinting) {
        gsap.to(hintShell.current, {
          autoAlpha: 0,
          duration: placed ? HINT_OUT : 0,
          ease: 'power2.out',
        });

        return;
      }

      const delay = afterContent(travel);

      gsap.fromTo(
        hintShell.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: HINT_IN, delay, ease: 'power2.out' }
      );

      // On the last slide the only way forward is back, so the wheel rides up.
      gsap
        .timeline({ repeat: -1, repeatDelay: 0.35, delay })
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

      <Progress value={(active + 1) / slides.length} />

      <div className='relative flex h-dvh touch-pan-x touch-pinch-zoom flex-col p-5 antialiased'>
        <img
          src={background}
          alt=''
          aria-hidden='true'
          draggable={false}
          className='pointer-events-none fixed inset-0 size-full scale-125 object-cover blur-xl saturate-150 brightness-125'
        />

        <div className='relative flex min-h-0 flex-1 flex-col rounded-[2rem] bg-paper p-4 pt-0 shadow-[0_1px_2px_rgb(14_9_39_/_0.12),0_8px_20px_rgb(14_9_39_/_0.14),0_28px_56px_rgb(14_9_39_/_0.20)]'>
          <Header
            sections={sections}
            menu={menu}
            partners={partners}
            onMenu={setMenu}
            onHome={home}
            onPartners={() => setPartners(true)}
          />

          <main
            ref={stage}
            className='relative min-h-0 flex-1 overflow-hidden rounded-t-[2.5rem] rounded-b-3xl border border-ink/10 bg-paper'
          >
            <img
              src={velvet}
              alt=''
              aria-hidden='true'
              draggable={false}
              className='pointer-events-none absolute inset-0 size-full object-cover opacity-25'
            />

            <div className='relative flex h-full flex-col p-8 pb-0 lg:p-14 lg:pb-0'>
              <div className='mt-auto text-center'>
                <h1 className='m-0 text-[clamp(2.25rem,6.6vw,7rem)]/[1.02] font-[800] tracking-[-0.02em] text-ink'>
                  <span data-slide-title className='block'>
                    {slides[active].title[0]}
                  </span>
                  <span data-slide-title className='block'>
                    {slides[active].title[1]}
                  </span>
                </h1>

                <p
                  data-slide-text
                  className='mx-auto mt-6 mb-0 min-h-34 w-full max-w-150 text-lg/normal text-ink/70 text-pretty lg:min-h-27 lg:text-pretty'
                >
                  {slides[active].text}
                </p>

                {Action && (
                  <div
                    data-slide-text
                    className='mt-5 flex flex-col items-center gap-3'
                  >
                    <Action
                      open={partners}
                      onOpen={() => setPartners(true)}
                      label={social}
                    />
                    <Socials onHover={setSocial} />
                  </div>
                )}

                <div
                  ref={hintShell}
                  aria-hidden='true'
                  className='pointer-events-none mt-10 flex justify-center'
                >
                  <span className='flex h-9 w-6 justify-center rounded-full border-2 border-ink/75 pt-1.5'>
                    <span
                      ref={hint}
                      className='size-1.25 rounded-full bg-ink/75'
                    />
                  </span>
                </div>
              </div>

              <div
                ref={rail}
                onPointerUp={release}
                onPointerCancel={release}
                onPointerLeave={release}
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
                          onPointerDown={() => setPressed(index)}
                          onClick={() => show(index)}
                          aria-label={alt}
                          aria-current={index === active}
                          className={clsx(
                            'group block min-w-0 max-w-52 flex-1 origin-bottom cursor-pointer appearance-none border-0 bg-transparent p-0 transition-[scale] duration-200 ease-[cubic-bezier(0.2,0,0,1)] focus-visible:-outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent',
                            pressed === index && 'scale-95'
                          )}
                        >
                          <img
                            src={src}
                            alt=''
                            draggable={false}
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
      </div>

      {partners && <PartnersDialog onClose={() => setPartners(false)} />}
    </>
  );
};
