import type { TalkOpener } from '@site/src/components/Agenda/Card';
import type { Gate } from '@site/src/components/Home/gates';
import type { TriggerOptions } from '@site/src/components/Partners/Trigger';
import type { SlideId } from '@site/src/data/previews';
import type { ComponentType, ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { GiBigWave } from 'react-icons/gi';
import { IoIosCalendar } from 'react-icons/io';
import { LuTrophy } from 'react-icons/lu';
import {
  TbBrandMysql,
  TbBrandOpenSource,
  TbConfetti,
  TbPig,
  TbUsersGroup,
} from 'react-icons/tb';
import { Downloads } from '@site/src/components/Home/Downloads';
import {
  adopters,
  agenda,
  badges,
  memories,
  milestones,
  star,
} from '@site/src/components/Home/stages';
import { PartnersAction } from '@site/src/components/Partners/Action';
import { PartnersTrigger } from '@site/src/components/Partners/Trigger';
import { Socials } from '@site/src/components/Socials';
import { images, previews } from '@site/src/data/previews';

export type Theme = 'light' | 'dark';

type SlideAction = ComponentType<
  TriggerOptions & { mark?: string; onTalk: TalkOpener }
>;

export type Slide = {
  id: SlideId;
  src?: string;
  alt?: string;
  name: string;
  Icon: IconType;
  title: [ReactNode, ReactNode, ReactNode?];
  text?: ReactNode;
  footnote?: ReactNode;
  background?: string;
  scene?: ComponentType;
  texture?: string;
  color?: string;
  mark?: string;
  hill?: string;
  theme?: Theme;
  align?: 'left';
  still?: boolean;
  gates?: Gate[];
  actions?: {
    stage?: SlideAction;
    cta?: SlideAction;
  };
};

type Group = {
  label: string;
  slides: Slide[];
};

const {
  brazil,
  github,
  lagune,
  laguneBackground,
  me,
  mvp,
  mysql,
  mysql2Background,
  poku,
  pokuBackground,
  velvet,
} = images;

const pink = '#ff5498';
const white = '#ffffff';

export const defaultBackground = images.stage;

export const groups: Group[] = [
  {
    label: 'Home',
    slides: [
      {
        id: 'open-source',
        src: github,
        alt: 'Pelúcia do GitHub',
        name: previews['open-source'].title,
        Icon: TbBrandOpenSource,
        title: [<Downloads />, 'de downloads anuais', '.'],
        hill: '#a3b6c9',
        text: 'Weslley impacta diretamente milhões de desenvolvedores e projetos globalmente através do open source e palestras globais.',
        texture: velvet,
        actions: { stage: PartnersAction },
      },
      {
        id: 'talks',
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
        gates: [agenda.gate],
        actions: {
          stage: ({ onTalk }) => <agenda.View onTalk={onTalk} />,
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
        id: 'recognition',
        src: mvp,
        alt: 'Pelúcia do MVP',
        name: previews.recognition.title,
        Icon: LuTrophy,
        title: ['Microsoft MVP &', 'Anthropic CVP', '.'],
        hill: '#2d86ff',
        text: previews.recognition.description,
        texture: velvet,
        gates: [badges.gate],
        actions: { stage: badges.View },
      },
    ],
  },
  {
    label: 'Impacto',
    slides: [
      {
        id: 'impact',
        name: previews.impact.title,
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
        text: 'Eles refletem milhões de usuários e projetos que dependem do trabalho que Weslley desenvolveu do zero, de desenvolvedores independentes a empresas como Google, Microsoft e Cloudflare.',
        footnote: (
          <>
            Do Brasil para o mundo
            <img
              decoding='async'
              loading='lazy'
              src={brazil}
              alt=''
              className='h-4 w-auto'
            />
          </>
        ),
        background: defaultBackground,
        scene: memories.View,
        color: '#0e0927cc',
        mark: pink,
        hill: pink,
        theme: 'dark',
        gates: [memories.gate, milestones.gate],
        actions: { stage: milestones.View },
      },
    ],
  },
  {
    label: 'Projetos',
    slides: [
      {
        id: 'mysql2',
        src: mysql,
        alt: 'Pelúcia do MySQL',
        name: previews.mysql2.title,
        Icon: TbBrandMysql,
        title: [
          'O driver MySQL mais baixado do',
          'ecossistema JavaScript',
          '.',
        ],
        text: previews.mysql2.description,
        background: mysql2Background,
        color: '#00afff40',
        mark: '#00a1ff',
        hill: white,
        still: true,
        gates: [adopters.gate],
        actions: { stage: adopters.View },
      },
      {
        id: 'lagune',
        src: lagune,
        alt: 'Pelúcia do Lagune',
        name: previews.lagune.title,
        Icon: GiBigWave,
        title: ['Lagune, seu copiloto', 'em segurança', '.'],
        text: previews.lagune.description,
        background: laguneBackground,
        color: '#00a7ff66',
        mark: '#f0f9ff',
        hill: white,
        gates: [star.gate],
        actions: {
          stage: ({ mark }) => (
            <star.View repo='wellwelwel/lagune' mark={mark} />
          ),
        },
      },
      {
        id: 'poku',
        src: poku,
        alt: 'Pelúcia do Poku',
        name: previews.poku.title,
        Icon: TbPig,
        title: ['Tornando testes fáceis', 'para Node.js, Bun e Deno', '.'],
        text: previews.poku.description,
        background: pokuBackground,
        color: '#56d0ff2b',
        mark: pink,
        hill: '#fdff00',
        gates: [star.gate],
        actions: {
          stage: ({ mark }) => <star.View repo='wellwelwel/poku' mark={mark} />,
        },
      },
    ],
  },
  {
    label: 'Redes Sociais',
    slides: [
      {
        id: 'socials',
        src: me,
        alt: 'Pelúcia do Weslley Araújo',
        name: previews.socials.title,
        Icon: TbConfetti,
        title: ['Você chegou', 'ao fim', '.'],
        hill: pink,
        text: previews.socials.description,
        texture: velvet,
        actions: {
          stage: () => (
            <div className='flex justify-center'>
              <Socials />
            </div>
          ),
        },
      },
    ],
  },
];
