import type { LucideIcon } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  GraduationCap,
  Star,
  TicketPercent,
} from 'lucide-react';
import { BiLinkExternal } from 'react-icons/bi';
import { FaRegHeart } from 'react-icons/fa';
import { RiVideoOnAiLine } from 'react-icons/ri';
import { TbMicrophone2 } from 'react-icons/tb';
import { Picture } from '@site/src/components/Picture';
import { write } from '@site/src/helpers/clipboard';
import { isReducedMotion } from '@site/src/helpers/reduced-motion';

gsap.registerPlugin(Observer);

type Slot = {
  date: string;
  time?: string;
  event: string;
  logo?: string;
  url?: string;
  material?: string;
  coupon?: {
    code: string;
    url?: string;
    off?: number;
  };
  venue?: string;
  address?: string;
  title: string;
  role: string;
  tone: string;
};

type Copier = [copied: boolean, copy: (value: string) => void];

type SwapOptions = {
  copied: boolean;
  className?: string;
};

type RootStyle = CSSProperties & {
  '--tone': string;
  '--ticker-travel'?: string;
  '--rise-travel'?: string;
  '--hop-travel'?: string;
};

type Calendar = {
  day: string;
  month: string;
  weekday: string;
  brief: string;
};

type CardOptions = {
  slot: Slot;
  place: number;
  onFocus: () => void;
};

const AVATAR = '/img/avatar.png';

const slots: Slot[] = [
  {
    date: '2024-08-30',
    event: 'Microsoft Reactor & NodeBR',
    logo: '/img/reactor.png',
    coupon: { code: 'Gratuito' },
    venue: 'São Paulo, SP · Online',
    title: 'Criando um Test Runner Multi-Plataforma de Alta Performance',
    role: 'Palestra',
    tone: '#7a77ff',
  },
  {
    date: '2024-11-23',
    event: 'DevFest Cerrado (GDG)',
    logo: '/img/devfest-cerrado.png',
    venue: 'Goiânia, GO',
    address:
      'Unialfa, 74445-190, Av. Perimetral Norte, St. Vila João Vaz, Goiânia - GO, Goiás',
    title:
      'Superando a síndrome do impostor e os desafios de existir no mercado através do open source',
    role: 'Palestra',
    tone: '#7a77ff',
  },
  {
    date: '2025-03-14',
    event: 'GitHub Brasil',
    logo: '/img/github-brazil.png',
    coupon: { code: 'Gratuito' },
    venue: 'Online',
    title: 'Conhecendo o Poku',
    role: 'Palestra (Live)',
    tone: '#7a77ff',
  },
  {
    date: '2025-06-14',
    event: 'Winx Day (Luciano dii Souza — O Primo Dev)',
    logo: '/img/winxday.png',
    coupon: { code: 'Gratuito' },
    venue: 'Online',
    title:
      'Superando a síndrome do impostor e os desafios de existir no mercado através do open source',
    role: 'Palestra (Live)',
    tone: '#7a77ff',
  },
  {
    date: '2025-07-19',
    time: '10:00',
    event: 'Codecon Summit',
    logo: '/img/codecon2.svg',
    url: '/talks/2025/07/19/codecon-summit/',
    coupon: {
      code: 'PALESTRANTE15',
      url: 'https://eventos.codecon.dev/codecon-summit-25?cp=PALESTRANTE15',
    },
    venue: 'Curitiba, PR',
    address: 'Viasoft Experience - Curitiba, PR',
    title: 'Criando um Test Runner: O que acontece por trás dos testes?',
    role: 'Palestra',
    tone: '#7a77ff',
  },
  {
    date: '2025-08-09',
    time: '17:20',
    event: 'DevConverge & Oracle',
    logo: '/img/dcl.png',
    url: 'https://www.linkedin.com/company/java-dev-converge-latam/',
    coupon: {
      code: 'Gratuito',
      url: 'https://www.sympla.com.br/evento/devconverge-latam---sprint-sp/3026669',
    },
    venue: 'São Paulo, SP',
    address: 'Rua Dr. José Áureo Bustamante, 455 - São Paulo, SP',
    title:
      'Inventando o Novo: o ponto de encontro entre criatividade humana e geração assistida por IA',
    role: 'Palestra',
    tone: '#7a77ff',
  },
  {
    date: '2025-08-21',
    time: '20:20',
    event: 'EACH-USP: Semana de Sistemas de Informação (SSI)',
    logo: '/img/ssi.png',
    url: 'https://www.semanadesi.com/',
    coupon: { code: 'Gratuito' },
    venue: 'São Paulo, SP',
    address: 'EACH (USP Leste) - São Paulo, SP',
    title: 'GitHub além do Código: superando o mercado através do open source',
    role: 'Keynote',
    tone: '#7a77ff',
  },
  {
    date: '2025-08-27',
    time: '20:00',
    event: 'MVP Conf: Tech Talk',
    logo: '/img/mvpconf.png',
    url: 'https://www.youtube.com/watch?v=alfJ6aEJhhA',
    coupon: { code: 'Gratuito' },
    venue: 'Online',
    title: 'GitHub além do Código: superando o mercado através do open source',
    role: 'Palestra (Live)',
    tone: '#7a77ff',
  },
  {
    date: '2025-09-13',
    time: '14:00',
    event: 'Roga DX',
    logo: '/img/rogadx.png',
    url: 'https://rogadx.com/',
    coupon: {
      code: 'SPEAKER10',
      url: 'https://doity.com.br/rogadx25?c=SPEAKER10',
    },
    venue: 'Maceió, AL',
    address: 'Centro de Convenções de Maceió - Maceió, AL',
    title: 'Des(cobrindo) Testes: Criando Sistemas Seguros e Resilientes',
    role: 'Palestra',
    tone: '#7a77ff',
  },
  {
    date: '2025-09-18',
    time: '16:30',
    event: 'TDC São Paulo',
    logo: '/img/tdc.png',
    url: 'https://thedevconf.com/tdc/2025/sao-paulo/trilha-web-e-front-end',
    venue: 'São Paulo, SP · Online',
    address: 'Avenida Professora Ida Kolb, 513 - São Paulo, SP',
    title: 'Des(cobrindo) Testes: Criando Sistemas Seguros e Resilientes',
    role: 'Palestra',
    tone: '#7a77ff',
  },
  {
    date: '2025-10-25',
    time: '16:00',
    event: 'MVP Conf',
    logo: '/img/mvpconf.png',
    url: 'https://mvpconf.com.br/',
    venue: 'São Paulo, SP',
    address: 'Rua Vergueiro, 1211 (UNIP) - São Paulo, SP',
    title:
      'Do Open Source ao Microsoft MVP: Interoperabilidade, Segurança e Impacto Global',
    role: 'Palestra',
    tone: '#7a77ff',
  },
  {
    date: '2025-11-08',
    time: '15:20',
    event: 'Dev Referências',
    logo: '/img/devreferencias.png',
    url: 'https://devreferencias.com.br/',
    coupon: {
      code: 'WeslleyAraújo20',
      url: 'https://www.sympla.com.br/evento/dev-referencias/3060749?referrer=weslley.io&referrer=weslley.io',
    },
    venue: 'São Paulo, SP · Online',
    address: 'R. Cubatão, 726 (Faculdade Impacta) - São Paulo, SP',
    title: 'Como se Tornar uma Referência na Área Tech',
    role: 'Palestra',
    tone: '#7a77ff',
  },
  {
    date: '2025-12-13',
    time: '14:00',
    event: 'DevFest Cerrado (GDG)',
    logo: '/img/devfest-cerrado.png',
    url: 'https://doity.com.br/dfc25',
    material: 'https://github.com/wellwelwel/devfest-cerrado-2025',
    venue: 'Goiânia, GO',
    address:
      'R. 261, 384 - Setor Leste Universitário (HUB Goiás) - Goiânia, GO',
    title:
      'Do Código para o Mundo Real: O Ponto de Encontro entre Dados, Testes e Segurança',
    role: 'Palestra',
    tone: '#7a77ff',
  },
  {
    date: '2025-12-13',
    time: '14:35',
    event: 'DevFest Cerrado (GDG)',
    logo: '/img/devfest-cerrado.png',
    url: 'https://doity.com.br/dfc25',
    material: 'https://github.com/wellwelwel/devfest-cerrado-2025',
    venue: 'Goiânia, GO',
    address:
      'R. 261, 384 - Setor Leste Universitário (HUB Goiás) - Goiânia, GO',
    title: 'Open Source e todo seu ecossistema',
    role: 'Mentoria',
    tone: '#7a77ff',
  },
  {
    date: '2026-03-26',
    event: 'Node Congress',
    logo: '/img/node-congress.png',
    url: 'https://nodecongress.com/',
    coupon: {
      code: 'weslley_araujo_154376',
      url: 'https://gitnation.com/badges/node-congress-2026/weslley_araujo_154376',
    },
    venue: 'Online',
    title: 'Creating a Test Runner: What Happens Behind the Tests?',
    role: 'Palestra',
    tone: '#7a77ff',
  },
  {
    date: '2026-04-09',
    time: '20:25',
    event: 'Practical AI with Node.js',
    logo: '/img/jsconfbr.svg',
    url: 'https://guild.host/events/practical-ai-with-nodejs-pagajf',
    coupon: { code: 'GRATUITO' },
    venue: 'São Paulo, SP',
    address:
      'Av. Paulista, 1374 - 12º Andar - Bela Vista, São Paulo - SP, 01310-000',
    title:
      'Do Código para o Mundo Real: O Ponto de Encontro entre Dados, Testes, Segurança e IA',
    role: 'Palestra',
    tone: '#7a77ff',
  },
  {
    date: '2026-05-29',
    time: '19:00',
    event: 'Codecon Universe',
    logo: '/img/codecon.svg',
    url: 'https://eventos.codecon.dev/eventos/codecon-universe-26',
    venue: 'Online',
    title: 'Hackathon de ideias inúteis e absurdas',
    role: 'Mentoria',
    tone: '#7a77ff',
  },
  {
    date: '2026-08-14',
    event: 'Codecon Summit',
    logo: '/img/codecon2.svg',
    url: 'https://codecon.dev/summit',
    coupon: {
      code: 'WELLWELWEL',
      url: 'https://eventos.codecon.dev/eventos/codecon-summit-26?c=WELLWELWEL',
      off: 20,
    },
    venue: 'Pinhais, PR',
    address:
      'Rod. Dep. João Leopoldo Jacomel, 10454 - Vila Amelia, Pinhais - PR',
    title: 'Você realmente sabe alguma coisa sobre segurança?',
    role: 'Palestra',
    tone: '#7a77ff',
  },
  {
    date: '2026-08-15',
    event: 'Roga DX',
    logo: '/img/rogadx.png',
    url: 'https://rogadx.com/',
    venue: 'Maceió, AL',
    address: 'Rua Celso Piatti, 280-372 - Jaraguá, Maceió - AL',
    title: 'Inteligência Sintética: ainda vale a pena investir em humanos?',
    role: 'Palestra',
    tone: '#7a77ff',
  },
  {
    date: '2026-09-05',
    event: 'DevConverge, NuBank & HumaSynk',
    logo: '/img/dcl.png',
    url: 'https://luma.com/gmrjgn41?tk=5tHTfO',
    coupon: { code: 'Gratuito' },
    title: 'Você realmente sabe alguma coisa sobre segurança?',
    venue: 'São Paulo, SP',
    address:
      'Av. Manuel Bandeira, 500 - Vila Leopoldina, São Paulo - SP, 05317-020, Brazil',
    role: 'Keynote',
    tone: '#7a77ff',
  },
  {
    date: '2026-11-14',
    event: 'Codecon Select Experience',
    logo: '/img/codecon3.png',
    url: 'https://codecon.dev/select',
    coupon: {
      code: 'WELLWELWEL',
      url: 'https://eventos.codecon.dev/eventos/select-experience-26?c=WELLWELWEL',
      off: 10,
    },
    venue: 'São Paulo, SP',
    address: 'STATE INNOVATION CENTER, SÃO PAULO - SP',
    title:
      'Evento exclusivo voltado para profissionais em cargos sênior ou superiores.',
    role: 'Embaixador',
    tone: '#7a77ff',
  },
];

const TICKER = {
  full: '0.6em',
  reduced: '0.35em',
};

const RISE = {
  full: '1.25rem',
  reduced: '0.75rem',
};

const HOP = {
  full: '1',
  reduced: '0.6',
};

const STEPPER =
  'relative flex size-9 shrink-0 cursor-pointer appearance-none items-center justify-center rounded-full border-0 p-0 transition-[background-color,color,scale] duration-250 ease-[cubic-bezier(0.2,0,0,1)] after:absolute after:-inset-0.75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-90 max-sm:size-8 short:size-8';

const EMPHASIS = {
  strong:
    'bg-[var(--tone)] text-paper hover:bg-[color-mix(in_srgb,var(--tone)_82%,white)]',
  faint:
    'bg-[color-mix(in_srgb,var(--tone)_15%,transparent)] text-[var(--tone)] hover:bg-[color-mix(in_srgb,var(--tone)_28%,transparent)]',
};

const COUPON =
  'flex min-w-0 items-center gap-1 text-[0.625rem]/none font-bold tracking-wide text-ink/70 uppercase';

const REDEEM = `${COUPON} relative transition-[color,scale] duration-250 ease-[cubic-bezier(0.2,0,0,1)] after:absolute after:-inset-x-1 after:-inset-y-3.5 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-95`;

const SWAP =
  'absolute inset-0 size-3 transition-[opacity,scale,filter] duration-250 ease-[cubic-bezier(0.2,0,0,1)]';

const FLIGHT =
  'col-start-1 row-start-1 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)]';

const LAUNCH = {
  leave: `${FLIGHT} size-4 group-hover/launch:translate-x-[120%] group-hover/launch:translate-y-[-120%]`,
  enter: `${FLIGHT} size-4 translate-x-[-120%] translate-y-[120%] group-hover/launch:translate-x-0 group-hover/launch:translate-y-0`,
};

const ROLES: Record<string, IconType | LucideIcon> = {
  Keynote: Star,
  Mentoria: GraduationCap,
  Palestra: TbMicrophone2,
  Embaixador: FaRegHeart,
  'Palestra (Live)': RiVideoOnAiLine,
};

const discount = ({ code, off }: NonNullable<Slot['coupon']>): string =>
  off ? `${off}% OFF` : code.replace(/^\D*([1-9]\d?)$/, '$1% OFF');

const arrange = (place: number): string => {
  if (place === 0) return 'z-20';

  if (place === 1)
    return 'z-10 translate-x-(--spread) scale-90 opacity-55 hover:opacity-75 cursor-pointer max-sm:peek squat:opacity-70';

  return 'z-0 translate-x-[calc(var(--spread)+6rem)] scale-75 opacity-0 invisible pointer-events-none';
};

const parse = (date: string): Date => {
  const [year, month, day] = date.split('-').map(Number);

  return new Date(year, month - 1, day);
};

const formatters = {
  monthLong: new Intl.DateTimeFormat('pt-BR', { month: 'long' }),
  monthShort: new Intl.DateTimeFormat('pt-BR', { month: 'short' }),
  weekday: new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }),
};

const calendar = (date: string): Calendar => {
  const when = parse(date);
  const day = String(when.getDate()).padStart(2, '0');

  return {
    day,
    month: `${formatters.monthLong.format(when)} ${when.getFullYear()}`,
    weekday: formatters.weekday.format(when),
    brief: `${day} ${formatters.monthShort.format(when).replace('.', '')}`,
  };
};

const DAY = 86_400_000;

const PITCH = { inset: 32, least: 72, daily: 4, most: 128 };

const labels = slots.map(({ date }) => calendar(date));
const times = slots.map(({ date }) => parse(date).getTime());
const openings = slots.map(({ time }) => time?.split(' - ')[0]);

const gauge = (left: number, right: number): number =>
  Math.min(
    Math.max(((right - left) / DAY) * PITCH.daily, PITCH.least),
    PITCH.most
  );

const stations = times.reduce<number[]>(
  (positions, time, index) =>
    index === 0
      ? [PITCH.inset]
      : [...positions, positions[index - 1]! + gauge(times[index - 1]!, time)],
  []
);

const extent = stations[stations.length - 1]! + PITCH.inset;

const upcomingIndex = (): number => {
  const nearest = times.findIndex((time) => time >= Date.now());

  return nearest === -1 ? slots.length - 1 : nearest;
};

const anchor = (index: number): number =>
  stations[Math.max(0, index - 1)]! - PITCH.inset;

const useCopy = (): Copier => {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = (value: string): void => {
    write(value).then((done) => {
      if (!done) return;

      navigator.vibrate?.(10);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1600);
    });
  };

  return [copied, copy];
};

const Swap = ({ copied, className }: SwapOptions): ReactNode => (
  <span
    className={clsx(
      'relative size-3 shrink-0 transition-opacity duration-250 ease-[cubic-bezier(0.2,0,0,1)]',
      className
    )}
    aria-hidden='true'
  >
    <Copy className={clsx(SWAP, copied && 'scale-25 opacity-0 blur-xs')} />
    <Check className={clsx(SWAP, !copied && 'scale-25 opacity-0 blur-xs')} />
  </span>
);

const Card = ({ slot, place, onFocus }: CardOptions): ReactNode => {
  const [copiedCoupon, copyCoupon] = useCopy();
  const [copiedAddress, copyAddress] = useCopy();
  const [origin] = useState(place);
  const { address, coupon } = slot;
  const center = place === 0;
  const clickable = place === 1;
  const free = coupon?.code.toLowerCase() === 'gratuito';
  const details = slot.material ?? slot.url;
  const Role = ROLES[slot.role] ?? TbMicrophone2;

  return (
    <article
      aria-hidden={!center}
      onClick={clickable ? onFocus : undefined}
      className={clsx(
        'group/card relative col-start-1 row-start-1 flex w-full max-w-72 flex-col gap-3 rounded-3xl bg-ink/6 p-5 shadow-[inset_0_1px_0_rgb(240_244_255_/_0.12),inset_0_0_0_1px_rgb(240_244_255_/_0.06),0_16px_32px_-16px_rgb(0_0_0_/_0.55)] backdrop-blur-xl transition-[translate,scale,opacity,visibility] duration-500 ease-[cubic-bezier(0.2,0,0,1)] select-none max-sm:rounded-[1.25rem] max-sm:p-3.5 short:gap-1.5 short:rounded-[1.25rem] short:p-3',
        origin < 2 && 'animate-fade [animation-delay:500ms]',
        arrange(place)
      )}
    >
      <div className='flex items-center gap-2.5'>
        <Picture
          src={slot.logo ?? AVATAR}
          alt=''
          sizes='2.25rem'
          decoding='async'
          draggable={false}
          className='size-9 shrink-0 object-contain max-sm:size-8 short:size-8'
        />

        <div className='flex min-w-0 flex-col gap-0.5'>
          <p className='m-0 truncate text-sm/tight font-semibold text-ink'>
            {slot.event}
          </p>
          {slot.venue && (
            <p className='m-0 flex items-center gap-1.75 text-[0.6875rem]/normal font-medium text-ink/55'>
              <span className='truncate'>{slot.venue}</span>

              {address && (
                <button
                  type='button'
                  onClick={() => copyAddress(address)}
                  tabIndex={center ? undefined : -1}
                  aria-label={
                    copiedAddress ? 'Endereço copiado' : 'Copiar endereço'
                  }
                  className={clsx(
                    'relative flex cursor-pointer appearance-none border-0 bg-transparent p-0 text-inherit transition-[color,opacity,scale] duration-250 ease-[cubic-bezier(0.2,0,0,1)] after:absolute after:-inset-3.5 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-95',
                    !center && 'pointer-events-none opacity-0'
                  )}
                >
                  <Swap copied={copiedAddress} />
                </button>
              )}
            </p>
          )}
        </div>
      </div>

      <p className='m-0 text-[0.8125rem]/normal font-medium text-pretty text-ink/85'>
        {slot.title}
      </p>

      <footer
        className={clsx(
          'mt-auto flex items-center justify-between gap-3',
          details && 'pr-10.5'
        )}
      >
        <div className='flex min-w-0 flex-col items-start gap-1.5'>
          <span className='flex items-center gap-1 text-[0.625rem]/none font-bold tracking-widest text-ink/70 uppercase'>
            <Role className='size-3 shrink-0' aria-hidden='true' />
            {slot.role}
          </span>

          {coupon &&
            (coupon.url ? (
              <a
                href={coupon.url}
                target='_blank'
                rel='noreferrer'
                tabIndex={center ? undefined : -1}
                aria-label={`Cupom ${discount(coupon)}`}
                className={clsx(REDEEM, !center && 'pointer-events-none')}
              >
                <TicketPercent className='size-3 shrink-0' aria-hidden='true' />
                <span className='truncate'>{discount(coupon)}</span>
                <ExternalLink
                  className={clsx(
                    'size-3 shrink-0 origin-bottom text-[#ff5498] transition-opacity duration-250 ease-[cubic-bezier(0.2,0,0,1)] group-hover/card:animate-hop',
                    !center && 'opacity-0'
                  )}
                  aria-hidden='true'
                />
              </a>
            ) : free ? (
              <span className={COUPON}>
                <TicketPercent className='size-3 shrink-0' aria-hidden='true' />
                <span className='truncate'>{coupon.code}</span>
              </span>
            ) : (
              <button
                type='button'
                onClick={() => copyCoupon(coupon.code)}
                tabIndex={center ? undefined : -1}
                aria-label={
                  copiedCoupon ? 'Cupom copiado' : `Copiar cupom ${coupon.code}`
                }
                className={clsx(
                  REDEEM,
                  'cursor-pointer appearance-none border-0 bg-transparent p-0',
                  !center && 'pointer-events-none'
                )}
              >
                <TicketPercent className='size-3 shrink-0' aria-hidden='true' />
                <span className='truncate'>{coupon.code}</span>
                <Swap
                  copied={copiedCoupon}
                  className={clsx('text-[var(--tone)]', !center && 'opacity-0')}
                />
              </button>
            ))}
        </div>

        {details && (
          <a
            href={details}
            target='_blank'
            rel='noreferrer'
            tabIndex={center ? undefined : -1}
            aria-label={
              slot.time
                ? `Detalhes da palestra às ${slot.time}`
                : 'Detalhes da palestra'
            }
            className={clsx(
              'group/launch absolute right-5 bottom-5 flex size-7.5 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--tone)_15%,transparent)] text-[var(--tone)] transition-[background-color,color,opacity,scale] duration-250 ease-[cubic-bezier(0.2,0,0,1)] after:absolute after:-inset-1.25 hover:bg-[var(--tone)] hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-95 max-sm:right-3.5 max-sm:bottom-3.5 short:right-3 short:bottom-3',
              !center && 'pointer-events-none opacity-0'
            )}
          >
            <span
              className='relative grid size-4 place-items-center overflow-hidden'
              aria-hidden='true'
            >
              <BiLinkExternal className={LAUNCH.leave} />
              <BiLinkExternal className={LAUNCH.enter} />
            </span>
          </a>
        )}
      </footer>
    </article>
  );
};

export const Agenda = memo((): ReactNode => {
  const [focus, setFocus] = useState(upcomingIndex);
  const track = useRef<HTMLElement | null>(null);
  const deck = useRef<HTMLDivElement | null>(null);
  const swiped = useRef(false);
  const { date, tone } = slots[focus];
  const { day, month, weekday } = labels[focus];
  const opening = openings[focus];
  const reduced = isReducedMotion();

  const style: RootStyle = {
    '--tone': tone,
    '--ticker-travel': reduced ? TICKER.reduced : TICKER.full,
    '--rise-travel': reduced ? RISE.reduced : RISE.full,
    '--hop-travel': reduced ? HOP.reduced : HOP.full,
  };

  const attach = useCallback((node: HTMLElement | null): void => {
    if (node && !track.current) node.scrollTo({ left: anchor(focus) });

    track.current = node;
  }, []);

  const step = (delta: number): void => {
    navigator.vibrate?.(10);
    setFocus((current) => (current + delta + slots.length) % slots.length);
  };

  const swipe = (delta: number): void => {
    if (swiped.current) return;

    swiped.current = true;
    step(delta);
  };

  const ahead = focus < slots.length - 1;

  useEffect(() => {
    const observer = Observer.create({
      target: deck.current,
      type: 'touch',
      lockAxis: true,
      tolerance: 24,
      onDragStart: () => (swiped.current = false),
      onLeft: () => swipe(1),
      onRight: () => swipe(-1),
    });

    return () => observer.kill();
  }, []);

  useEffect(() => {
    track.current?.scrollTo({ left: anchor(focus), behavior: 'smooth' });
  }, [focus]);

  return (
    <div
      style={style}
      className='flex flex-col items-start gap-3 [--reach:calc(var(--spread)-0.9rem)] [--spread:15rem] short:gap-1.5 short-wide:[--spread:4rem] lg:[--spread:3.5rem] xl:[--spread:9.5rem] min-[90rem]:[--spread:15rem]'
    >
      <div className='flex w-full animate-ticker items-center justify-between gap-3 [animation-delay:420ms]'>
        <time
          dateTime={opening ? `${date}T${opening}` : date}
          className='flex items-center gap-3 text-shadow-sm text-shadow-paper/50 short:gap-2'
        >
          <span
            key={date}
            className='animate-ticker text-[2rem]/none font-[800] text-[var(--tone)] tabular-nums short:text-lg/none'
          >
            {day}
          </span>

          <span
            key={`labels:${date}:${opening}`}
            className='flex animate-ticker flex-col gap-1 [animation-delay:80ms]'
          >
            <span className='text-[0.6875rem]/none font-bold tracking-widest text-ink uppercase'>
              {month}
            </span>
            <span className='text-[0.6875rem]/none font-medium text-ink/55 capitalize tabular-nums short:hidden'>
              {opening ? `${weekday} · ${opening}` : weekday}
            </span>
          </span>
        </time>

        <div className='flex gap-2'>
          <button
            type='button'
            aria-label='Evento anterior'
            onClick={() => step(-1)}
            className={clsx(STEPPER, ahead ? EMPHASIS.faint : EMPHASIS.strong)}
          >
            <ArrowLeft className='size-4' aria-hidden='true' />
          </button>
          <button
            type='button'
            aria-label='Próximo evento'
            onClick={() => step(1)}
            className={clsx(STEPPER, ahead ? EMPHASIS.strong : EMPHASIS.faint)}
          >
            <ArrowRight className='size-4' aria-hidden='true' />
          </button>
        </div>
      </div>

      <div
        ref={deck}
        className='grid animate-rise [animation-delay:500ms] short-wide:pr-(--reach) xl:pr-(--reach)'
      >
        {slots.map((slot, index) => (
          <Card
            key={`${slot.date}:${slot.title}`}
            slot={slot}
            place={(index - focus + slots.length) % slots.length}
            onFocus={() => setFocus(index)}
          />
        ))}
      </div>

      <div className='mt-[clamp(1rem,5svh-1rem,2rem)] w-full animate-ticker [animation-delay:580ms] max-sm:mb-[clamp(0px,5svh-2rem,1.5rem)] sm:mb-3 short:mt-1 short:mb-0'>
        <nav
          ref={attach}
          data-scroll=''
          aria-label='Linha do tempo dos eventos'
          className='w-full soften touch-pan-x contain-inline-size overflow-x-auto overflow-y-hidden overscroll-x-contain text-shadow-sm text-shadow-paper/50 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        >
          <div
            className='relative h-14 short:h-8.5 sm:h-16.5'
            style={{ width: extent }}
          >
            {slots.map((slot, index) => (
              <button
                key={`${slot.date}:${slot.title}`}
                type='button'
                onClick={() => setFocus(index)}
                aria-current={index === focus ? 'date' : undefined}
                aria-label={`${labels[index].brief}: ${slot.event}`}
                style={{ left: stations[index] }}
                className={clsx(
                  'absolute bottom-0 flex -translate-x-1/2 cursor-pointer appearance-none flex-col items-center gap-1 border-0 bg-transparent p-0 transition-[opacity,scale] duration-250 ease-[cubic-bezier(0.2,0,0,1)] after:absolute after:inset-x-0 after:-inset-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-95 short:gap-0.5',
                  index === focus ? 'scale-105' : 'opacity-55 hover:opacity-75'
                )}
              >
                <span
                  className={clsx(
                    'text-[0.625rem]/none font-bold tracking-widest whitespace-nowrap uppercase',
                    index === focus ? 'text-ink' : 'text-ink/55 max-sm:hidden'
                  )}
                >
                  {labels[index].brief}
                </span>
                <span
                  aria-hidden='true'
                  className='h-2 w-px bg-ink/25 short:h-1'
                />
                <span className='flex size-7.5 items-center justify-center short:size-4 sm:size-10'>
                  <Picture
                    src={slot.logo ?? AVATAR}
                    alt=''
                    sizes='(max-height: 36rem) 1rem, (min-width: 40rem) 2rem, 1.5rem'
                    loading='lazy'
                    decoding='async'
                    draggable={false}
                    className='size-6 object-contain short:size-3.5 sm:size-8'
                  />
                </span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
});
