import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { env, loadEnvFile } from 'node:process';
import { themes as prismThemes } from 'prism-react-renderer';

type CustomFields = {
  COUNTTY_URL: string | undefined;
  showViewsCounter: boolean;
};

try {
  loadEnvFile();
} catch {}

const config: Config = {
  title: 'Weslley Araújo',
  favicon: 'img/favicon.ico',
  baseUrl: '/',
  url: 'https://weslley.io/',
  customFields: {
    COUNTTY_URL: env.COUNTTY_URL,
    showViewsCounter: true,
  } satisfies CustomFields,
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
    locales: ['pt-BR'],
    localeConfigs: {
      'pt-BR': {
        label: '🇧🇷 Português (Brasil)',
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
    image: 'img/social/banner.jpg',
    colorMode: {
      disableSwitch: true,
      respectPrefersColorScheme: false,
      defaultMode: 'light',
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'diff', 'sql'],
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    require.resolve('./plugins/webpack/mount'),
    [
      require.resolve('./plugins/articles/mount'),
      { pluginName: 'mount-articles', contentDir: 'articles' },
    ],
    [require.resolve('./plugins/redirects/mount'), { pluginName: 'redirects' }],
    [require.resolve('./plugins/home/mount'), { pluginName: 'mount-home' }],
    [
      require.resolve('./plugins/inline-css/mount'),
      { pluginName: 'inline-css' },
    ],
    [require.resolve('./plugins/downloads/mount'), { pluginName: 'downloads' }],
  ],
};

export default config;
