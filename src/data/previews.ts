export type Preview = {
  title: string;
  description?: string;
  image?: string;
};

export type SlideId = keyof typeof previews;

export const images = {
  brazil: '/img/br.svg',
  claude: '/img/plush/claude.png',
  github: '/img/plush/github.png',
  lagune: '/img/plush/lagune.png',
  laguneBackground: '/img/plush/lagune-bg.png',
  me: '/img/plush/me.png',
  mvp: '/img/plush/mvp.png',
  mysql: '/img/plush/mysql.png',
  mysql2Background: '/img/plush/mysql2-bg.png',
  poku: '/img/plush/poku.png',
  pokuBackground: '/img/plush/poku-bg.png',
  stage: '/img/talks/codecon-2025/moments/04.jpg',
  summit: '/img/social/recognition.jpg',
  talks: '/img/slide/codecon-002.jpg',
  velvet: '/img/plush/velvet-texture.png',
};

export const previews = {
  'open-source': { title: 'Open Source' },
  talks: { title: 'Palestras', image: images.talks },
  recognition: {
    title: 'Reconhecimentos',
    description:
      'Weslley é reconhecido como Microsoft MVP (Developer Technologies: Developer Tools e Web Development) e verificado pelo Anthropic Cyber Verification Program (CVP).',
    image: images.summit,
  },
  impact: {
    title: 'Impacto',
    description:
      'Os milhões não são apenas números: refletem usuários e projetos que dependem do trabalho que Weslley desenvolveu do zero, de desenvolvedores independentes a empresas como Google, Microsoft e Cloudflare.',
    image: images.stage,
  },
  mysql2: {
    title: 'MySQL2',
    description:
      'Weslley é mantenedor do MySQL2 e autor de diversos projetos open source críticos usados publicamente por empresas como Amazon, Microsoft, Google, Cloudflare, Vercel, dentre outras.',
    image: images.mysql2Background,
  },
  lagune: {
    title: 'Lagune',
    description:
      'Weslley é o criador do Lagune, o pioneiro de sua categoria (Security-Driven Hardening) ao trazer proteção antes, durante e depois do desenvolvimento para desenvolvedores e não desenvolvedores.',
    image: images.laguneBackground,
  },
  poku: {
    title: 'Poku',
    description:
      'Weslley é autor do Poku, um executor de testes que democratiza os testes para qualquer desenvolvedor. Usado por projetos oficiais da OWASP, o Poku conta com contribuições de colaboradores do Jest, um dos executores de testes mais populadores da história.',
    image: images.pokuBackground,
  },
  socials: {
    title: 'Redes Sociais',
    description:
      'Me siga nas redes sociais e acompanhe meu trabalho. Apoie meu trabalho deixando sua estrela nos projetos open source que eu mantenho com todo carinho do mundo.',
    image: images.me,
  },
} satisfies Record<string, Preview>;

export const describeTalks = (yearly: string): string =>
  `Com mais de ${yearly} de downloads anuais em projetos autorais, sou autor e mantenedor de projetos críticos no ecossistema open source e levo ao palco experiências reais de sistemas usados em escala global.`;

export const ROOT: SlideId = 'open-source';

export const pathOf = (id: SlideId): string => (id === ROOT ? '/' : `/${id}/`);
