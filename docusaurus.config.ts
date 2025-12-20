import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import type { PluginOptions } from '@easyops-cn/docusaurus-search-local';
import { env, loadEnvFile } from 'node:process';
import { themes as prismThemes } from 'prism-react-renderer';

try {
  loadEnvFile();
} catch {}

const articlesPlugin = require('./plugins/articles/mount.ts').default;

const config: Config = {
  title: 'Weslley Araújo',
  favicon: 'img/favicon.ico',
  baseUrl: '/',
  url: 'https://weslley.io/',
  customFields: {
    COUNTTY_URL: env.COUNTTY_URL,
    showViewsCounter: true,
  },
  trailingSlash: true,
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'ignore',
    },
  },
  onBrokenLinks: 'ignore',
  onBrokenAnchors: 'ignore',
  onDuplicateRoutes: 'ignore',
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR', 'en'],
    localeConfigs: {
      'pt-BR': {
        label: '🇧🇷 Português (Brasil)',
      },
      en: {
        label: '🇺🇸 English',
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
          customCss: ['./src/css/themes.scss'],
        },
        pages: {
          admonitions: true,
          recmaPlugins: [],
          rehypePlugins: [],
          remarkPlugins: [],
        },
      } satisfies Preset.Options,
    ],
  ],
  staticDirectories: ['./src/assets'],
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
        src: 'img/avatar.png',
      },
      items: [
        {
          type: 'search',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
          className: 'locale',
        },
      ],
    },
    footer: Object.create(null),
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'diff', 'sql'],
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    'docusaurus-plugin-sass',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        indexDocs: false,
        indexBlog: false,
        indexPages: true,
        hashed: true,
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 100,
        ignoreFiles: /(articles|talks)\/(tags)/,
        language: ['pt', 'en'],
      } satisfies PluginOptions,
    ],
    require.resolve('./webpack.config'),
    (context) =>
      articlesPlugin(context, {
        pluginName: 'mount-articles',
        contentDir: 'articles',
      }),
    (context) =>
      articlesPlugin(context, {
        pluginName: 'mount-talks',
        contentDir: 'talks',
      }),
  ],
};

export default config;
