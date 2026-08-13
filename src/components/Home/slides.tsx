import type { Step } from '@site/src/components/Header';
import type { Trigger } from '@site/src/components/Partners/Trigger';
import type { ComponentType, ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { GiBigWave } from 'react-icons/gi';
import { IoIosCalendar } from 'react-icons/io';
import { LuTrophy } from 'react-icons/lu';
import {
  TbBrandMysql,
  TbBrandOpenSource,
  TbPig,
  TbUsersGroup,
} from 'react-icons/tb';
import { Adopters } from '@site/src/components/Adopters';
import { Agenda } from '@site/src/components/Agenda';
import { Badges } from '@site/src/components/Badges';
import { Downloads } from '@site/src/components/Home/Downloads';
import { Memories } from '@site/src/components/Memories';
import { Milestones } from '@site/src/components/Milestones';
import { PartnersAction } from '@site/src/components/Partners/Action';
import { PartnersTrigger } from '@site/src/components/Partners/Trigger';
import { Star } from '@site/src/components/Star';

export type Theme = 'light' | 'dark';

type SlideAction = ComponentType<Trigger & { mark?: string }>;

type Slide = {
  src?: string;
  alt?: string;
  name: string;
  Icon: IconType;
  title: [ReactNode, ReactNode, ReactNode?];
  text?: ReactNode;
  /** Closing line, at the very bottom of the slide. */
  note?: ReactNode;
  background?: string;
  /** Moving backdrop, layered under the slide's tint. */
  scene?: ComponentType;
  texture?: string;
  color?: string;
  mark?: string;
  hill?: string;
  theme?: Theme;
  align?: 'left';
  still?: boolean;
  actions?: {
    stage?: SlideAction;
    cta?: SlideAction;
  };
};

type Group = {
  label: string;
  slides: Slide[];
};

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

const brazil = '/img/br.svg';

const pink = '#ff5498';
const white = '#ffffff';

export const defaultBackground = '/img/talks/codecon-2025/moments/04.jpg';

export const groups: Group[] = [
  {
    label: 'Home',
    slides: [
      {
        src: github,
        alt: 'Pelúcia do GitHub',
        name: 'Open Source',
        Icon: TbBrandOpenSource,
        title: [<Downloads />, 'de downloads anuais', '.'],
        hill: '#a3b6c9',
        text: 'Weslley impacta diretamente milhões de desenvolvedores e projetos globalmente através do open source e palestras globais.',
        texture: velvet,
        actions: { stage: PartnersAction },
      },
      {
        src: me,
        alt: 'Pelúcia do Weslley Araújo',
        name: 'Agenda',
        Icon: IoIosCalendar,
        title: ['Onde me', 'encontrar', '.'],
        hill: pink,
        color: '#000000aa',
        background: defaultBackground,
        theme: 'dark',
        align: 'left',
        still: true,
        actions: {
          stage: () => <Agenda />,
          cta: ({ open, onOpen }) => (
            <PartnersTrigger
              open={open}
              onOpen={onOpen}
              tone='night'
              label='Me convide para o seu evento'
            />
          ),
        },
      },
      {
        src: mvp,
        alt: 'Pelúcia do MVP',
        name: 'Reconhecimento',
        Icon: LuTrophy,
        title: ['Microsoft MVP &', 'Anthropic CVP', '.'],
        hill: '#2d86ff',
        text: 'Weslley é reconhecido como Microsoft MVP (Developer Technologies: Developer Tools e Web Development) e verificado pelo Anthropic Cyber Verification Program (CVP).',
        texture: velvet,
        actions: { stage: Badges },
      },
    ],
  },
  {
    label: 'Impacto',
    slides: [
      {
        name: 'Impacto',
        Icon: TbUsersGroup,
        title: [
          [
            'Os ',
            <span key='millions' style={{ color: pink }}>
              milhões
            </span>,
            ' não são',
          ],
          'apenas números',
          '.',
        ],
        text: 'Esse número reflete milhões de usuários e projetos que dependem do trabalho que Weslley desenvolveu do zero, de desenvolvedores independentes a empresas como Google, Microsoft e Cloudflare.',
        note: (
          <>
            Do Brasil para o mundo
            <img src={brazil} alt='' className='h-4 w-auto' />
          </>
        ),
        background: defaultBackground,
        scene: Memories,
        color: '#0e0927cc',
        mark: pink,
        hill: pink,
        theme: 'dark',
        actions: { stage: Milestones },
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
        text: 'Weslley é mantenedor do MySQL2 e autor de diversos projetos open source críticos usados publicamente por empresas como Amazon, Microsoft, Google, Cloudflare, Vercel, dentre outras.',
        background: mysql2Background,
        color: '#00afff40',
        mark: '#00a1ff',
        hill: white,
        still: true,
        actions: { stage: Adopters },
      },
      {
        src: lagune,
        alt: 'Pelúcia do Lagune',
        name: 'Lagune',
        Icon: GiBigWave,
        title: ['Lagune, seu copiloto', 'em segurança', '.'],
        text: 'Weslley é o criador do Lagune, o pioneiro de sua categoria (Security-Driven Hardening) ao trazer proteção antes, durante e depois do desenvolvimento para desenvolvedores e não desenvolvedores.',
        background: laguneBackground,
        color: '#00a7ff66',
        mark: '#f0f9ff',
        hill: white,
        actions: {
          stage: ({ mark }) => <Star repo='wellwelwel/lagune' mark={mark} />,
        },
      },
      {
        src: poku,
        alt: 'Pelúcia do Poku',
        name: 'Poku',
        Icon: TbPig,
        title: ['Tornando testes fáceis', 'para Node.js, Bun e Deno', '.'],
        text: 'Weslley é autor do Poku, um executor de testes que democratiza os testes para qualquer desenvolvedor. Usado por projetos oficiais da OWASP, o Poku conta com contribuições de colaboradores do Jest, um dos executores de testes mais populadores da história.',
        background: pokuBackground,
        color: '#56d0ff2b',
        mark: pink,
        hill: '#fdff00',
        actions: {
          stage: ({ mark }) => <Star repo='wellwelwel/poku' mark={mark} />,
        },
      },
    ],
  },
];

export const slides = groups.flatMap((group) => group.slides);

export const starts = groups.map((_, index) =>
  groups.slice(0, index).reduce((total, { slides }) => total + slides.length, 0)
);

export const groupOf = groups.flatMap((group, index) =>
  group.slides.map(() => index)
);

export const backgrounds = [
  ...new Set(slides.flatMap(({ background }) => background ?? [])),
];

export const textures = [
  ...new Set(slides.flatMap(({ texture }) => texture ?? [])),
];

export const colors = [...new Set(slides.flatMap(({ color }) => color ?? []))];

export const steps: Step[] = slides.map(({ name, Icon }) => ({ name, Icon }));
