import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import type { PluginOptions } from '@easyops-cn/docusaurus-search-local';
import { themes as prismThemes } from 'prism-react-renderer';
import { websiteConfigs } from './website.config';

const config: Config = {
  title: 'Weslley Araújo',
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
  staticDirectories: ['./content/assets'],
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
      items: [],
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
    ...(() => {
      if (websiteConfigs.navBarItens?.right?.search)
        return [
          [
            '@easyops-cn/docusaurus-search-local',
            {
              indexDocs: false,
              indexBlog: false,
              indexPages: true,
              hashed: true,
              highlightSearchTermsOnTargetPage: true,
              searchResultLimits: 100,
              language: ['pt', 'en'],
            } satisfies PluginOptions,
          ],
        ];
      return [];
    })(),
    // Blogs
    ...(websiteConfigs.blogs?.map((blog) => [
      '@docusaurus/plugin-content-blog',
      {
        ...blog,
        blogSidebarCount: 'ALL',
        showReadingTime: true,
        feedOptions: {
          type: ['rss', 'atom'],
          xslt: true,
        },
        showLastUpdateTime: true,
        editLocalizedFiles: true,
        onInlineTags: 'throw',
        onInlineAuthors: 'throw',
        onUntruncatedBlogPosts: 'throw',
      },
    ]) as any),
  ],
};

// Load left items
if (websiteConfigs.navBarItens?.left) {
  (config as any)?.themeConfig.navbar.items.push(
    ...websiteConfigs.navBarItens.left.map((item) => ({
      ...item,
      position: 'left',
    }))
  );
}

// Load search item
if (websiteConfigs.navBarItens?.right?.search) {
  (config as any)?.themeConfig.navbar.items.push({
    type: 'search',
    position: 'right',
  });
}

// Load locale item
if (websiteConfigs.navBarItens?.right?.locale) {
  (config as any)?.themeConfig.navbar.items.push({
    type: 'localeDropdown',
    position: 'right',
    className: 'locale',
  });
}

export default config;
