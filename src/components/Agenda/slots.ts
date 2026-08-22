export type Slot = {
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
  talk?: string;
};

export const AVATAR = '/img/avatar.png';

export const slots: Slot[] = [
  {
    date: '2024-08-30',
    event: 'Microsoft Reactor & NodeBR',
    logo: '/img/reactor.png',
    coupon: { code: 'Gratuito' },
    venue: 'São Paulo, SP · Online',
    title: 'Criando um Test Runner Multi-Plataforma de Alta Performance',
    role: 'Palestra',
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
  },
  {
    date: '2025-03-14',
    event: 'GitHub Brasil',
    logo: '/img/github-brazil.png',
    coupon: { code: 'Gratuito' },
    venue: 'Online',
    title: 'Conhecendo o Poku',
    role: 'Palestra (Live)',
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
  },
  {
    date: '2025-07-19',
    time: '10:00',
    event: 'Codecon Summit',
    logo: '/img/codecon2.svg',
    talk: 'codecon-summit-embrace-the-hacker-way',
    coupon: {
      code: 'PALESTRANTE15',
      url: 'https://eventos.codecon.dev/codecon-summit-25?cp=PALESTRANTE15',
    },
    venue: 'Curitiba, PR',
    address: 'Viasoft Experience - Curitiba, PR',
    title: 'Criando um Test Runner: O que acontece por trás dos testes?',
    role: 'Palestra',
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
  },
  {
    date: '2025-10-25',
    time: '16:00',
    event: 'MVP Conf',
    logo: '/img/mvpconf.png',
    url: 'https://mvpconf.com.br/',
    talk: 'mvp-conf-2025-brasil',
    venue: 'São Paulo, SP',
    address: 'Rua Vergueiro, 1211 (UNIP) - São Paulo, SP',
    title:
      'Do Open Source ao Microsoft MVP: Interoperabilidade, Segurança e Impacto Global',
    role: 'Palestra',
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
  },
  {
    date: '2026-08-14',
    time: '10:40',
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
  },
  {
    date: '2026-08-15',
    time: '13:00',
    event: 'Roga DX',
    logo: '/img/rogadx.png',
    url: 'https://rogadx.com/',
    venue: 'Maceió, AL',
    address: 'Rua Celso Piatti, 280-372 - Jaraguá, Maceió - AL',
    title: 'Inteligência Sintética: ainda vale a pena investir em humanos?',
    role: 'Palestra',
  },
  {
    date: '2026-08-15',
    time: '14:00',
    event: 'Roga DX',
    logo: '/img/rogadx.png',
    url: 'https://rogadx.com/',
    venue: 'Maceió, AL',
    address: 'Rua Celso Piatti, 280-372 - Jaraguá, Maceió - AL',
    title: 'Mentoria aberta sobre IA, Inovação e Segurança.',
    role: 'Mentoria',
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
  },
];
