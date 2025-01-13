import { themes as prismThemes } from 'prism-react-renderer';
// import type { PluginOptions } from '@easyops-cn/docusaurus-search-local';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Weslley Araújo',
  tagline:
    "Open Sourcerer | End-to-End Developer | MySQL2 Co-Maintainer | Poku's Creator",
  favicon: 'img/favicon.ico',
  baseUrl: '/',
  url: 'https://weslley.io/',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onBrokenAnchors: 'throw',
  onDuplicateRoutes: 'throw',
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
    localeConfigs: {
      'pt-BR': {
        label: '🇧🇷',
      },
    },
  },
  presets: [
    [
      'classic',
      {
        blog: false,
        docs: false,
        theme: {
          customCss: './src/css/custom.scss',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    colorMode: {
      disableSwitch: true,
      respectPrefersColorScheme: false,
      defaultMode: 'light',
    },
    navbar: {
      title: 'Weslley A.',
      logo: {
        alt: "Weslley's Araújo Avatar",
        src: 'img/logo.png',
      },
      items: [
        { to: '/projects', label: 'Projetos', position: 'left' },
        { to: '/talks', label: 'Palestras', position: 'left' },
        { to: '/articles', label: 'Artigos', position: 'left' },
        { to: '/about', label: 'Sobre', position: 'left' },
        // { type: 'search', position: 'right' },
        // {
        //   type: 'localeDropdown',
        //   position: 'right',
        // },
      ],
    },
    footer: {},
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'diff', 'sql'],
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    'docusaurus-plugin-sass',
    // [
    //   '@easyops-cn/docusaurus-search-local',
    //   {
    //     indexDocs: false,
    //     indexPages: true,

    //     hashed: true,
    //     language: ['pt'],
    //   } satisfies PluginOptions,
    // ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'articles',
        path: './articles',
        routeBasePath: 'articles',
        blogTitle: 'Artigos',
        blogSidebarTitle: 'Artigos recentes 📜',
        showReadingTime: false,
        feedOptions: {
          type: ['rss', 'atom'],
          xslt: true,
        },
        showLastUpdateTime: true,
        onInlineTags: 'throw',
        onInlineAuthors: 'throw',
        onUntruncatedBlogPosts: 'throw',
      } satisfies Preset.Options['blog'],
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'Palestras',
        blogTitle: 'Palestras',
        blogSidebarTitle: 'Palestras Recentes 🎙️',
        routeBasePath: 'talks',
        path: './talks',
        blogSidebarCount: 'ALL',
        showReadingTime: false,
        feedOptions: {
          type: ['rss', 'atom'],
          xslt: true,
        },
        showLastUpdateTime: false,
        onInlineTags: 'throw',
        onInlineAuthors: 'throw',
        onUntruncatedBlogPosts: 'throw',
      } satisfies Preset.Options['blog'],
    ],
  ],
};

export default config;
