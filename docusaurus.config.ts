import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { env, loadEnvFile } from 'node:process';
import { themes as prismThemes } from 'prism-react-renderer';

try {
  loadEnvFile();
} catch {}

const articlesPlugin = require('./plugins/articles/mount.ts').default;
const downloadsPlugin = require('./plugins/downloads/mount.ts').default;
const homePlugin = require('./plugins/home/mount.ts').default;
const inlineCssPlugin = require('./plugins/inline-css/mount.ts').default;
const redirectsPlugin = require('./plugins/redirects/mount.ts').default;

const config: Config = {
  title: 'Weslley Araújo',
  favicon: 'img/favicon.ico',
  baseUrl: '/',
  url: 'https://weslley.io/',
  customFields: {
    COUNTTY_URL: env.COUNTTY_URL,
    showViewsCounter: true,
  },
  future: {
    v4: {
      removeLegacyPostBuildHeadAttribute: true,
      useCssCascadeLayers: false,
      siteStorageNamespacing: true,
      fasterByDefault: true,
      mdx1CompatDisabledByDefault: true,
    },
    faster: true,
    experimental_vcs: true,
  },
  trailingSlash: true,
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onDuplicateRoutes: 'throw',
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR' /* 'en'*/],
    localeConfigs: {
      'pt-BR': {
        label: '🇧🇷 Português (Brasil)',
      },
      // en: {
      //   label: '🇺🇸 English',
      // },
    },
  },
  presets: [
    [
      'classic',
      {
        blog: false,
        docs: false,
        theme: {
          customCss: ['./src/css/tailwind.css'],
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
    require.resolve('./webpack.config'),
    (context) =>
      articlesPlugin(context, {
        pluginName: 'mount-articles',
        contentDir: 'articles',
      }),
    (context) =>
      redirectsPlugin(context, {
        pluginName: 'redirects',
      }),
    (context) =>
      homePlugin(context, {
        pluginName: 'mount-home',
      }),
    (context) =>
      inlineCssPlugin(context, {
        pluginName: 'inline-css',
      }),
    (context) =>
      downloadsPlugin(context, {
        pluginName: 'downloads',
      }),
  ],
};

export default config;
