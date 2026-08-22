import type {
  LoadContext,
  Plugin,
  RouteConfig,
  RouteModules,
} from '@docusaurus/types';
import type { Preview, SlideId } from '../../src/components/Home/previews';
import { relative, resolve, sep } from 'node:path';
import { pathOf, previews, ROOT } from '../../src/components/Home/previews';
import { downloadsLabel } from '../../src/helpers/downloads';
import { stripMarkdown } from '../../src/helpers/strip-markdown';
import { downloads } from '../../tools/downloads';
import { findArticles } from '../../tools/find-articles';

type PluginOptions = {
  pluginName: string;
};

type Talk = {
  slug: string;
  title: string;
  description: string | null;
  content: string;
  banner?: string;
};

type Content = {
  yearly: string;
  talks: Talk[];
};

const HOME = '@site/src/pages/_dynamic/home/index.tsx';
const PREVIEW = '@site/src/pages/_dynamic/home/preview.tsx';

const describeTalks = (yearly: string): string =>
  `Com mais de ${yearly} de downloads anuais em projetos autorais, sou autor e mantenedor de projetos críticos no ecossistema open source e levo ao palco experiências reais de sistemas usados em escala global.`;

const summarize = (description: string | null): string | null =>
  description && stripMarkdown(description).split('\n').join(' ');

const routeSlug = (slug: string): string => slug.replace(/%/g, '');

const aliased = (siteDir: string, file: string): string =>
  `@site/${relative(siteDir, file).split(sep).join('/')}`;

const lazy = (siteDir: string, file: string): string =>
  `() => import(${JSON.stringify(aliased(siteDir, file))})`;

const catalog = (talks: Talk[], siteDir: string): string =>
  [
    'export const sources = new Map([',
    ...talks.map(({ slug, content, banner }) =>
      [
        `  [${JSON.stringify(slug)}, {`,
        `    content: ${lazy(siteDir, content)},`,
        ...(banner ? [`    banner: ${lazy(siteDir, banner)},`] : []),
        '  }],',
      ].join('\n')
    ),
    ']);',
    '',
  ].join('\n');

export default (
  context: LoadContext,
  options: PluginOptions
): Plugin<Content> => ({
  name: options.pluginName,
  loadContent: async () => {
    const { currentLocale } = context.i18n;
    const [articles, { rolling }] = await Promise.all([
      findArticles(resolve(`./i18n/${currentLocale}/talks`)),
      downloads(),
    ]);
    const yearly = downloadsLabel(rolling);

    const found = articles.map((article): Talk => {
      if (!article.slug)
        throw new Error(
          `The talk "${article.title}" (${article.mdxPath}) has no slug.`
        );

      return {
        slug: routeSlug(article.slug),
        title: article.title,
        description: summarize(article.description),
        content: article.mdxPath,
        ...(article.socialPath && { banner: article.socialPath }),
      };
    });

    return { yearly, talks: found };
  },
  contentLoaded: async ({ content, actions }) => {
    const { addRoute, createData } = actions;
    const { i18n } = context;
    const localePrefix =
      i18n.currentLocale === i18n.defaultLocale ? '' : `/${i18n.currentLocale}`;
    const routes: RouteConfig[] = [];

    await createData('talks.js', catalog(content.talks, context.siteDir));

    for (const id of Object.keys(previews) as SlideId[]) {
      const modules: RouteModules = {};

      if (id !== ROOT) {
        const preview: Preview = {
          ...previews[id],
          ...(id === 'talks' && { description: describeTalks(content.yearly) }),
        };

        modules.preview = await createData(
          `preview-${id}.json`,
          JSON.stringify(preview)
        );
      }

      routes.push({
        path: `${localePrefix}${pathOf(id)}`,
        exact: true,
        component: PREVIEW,
        modules,
      });
    }

    for (const { slug, title, description, banner } of content.talks) {
      const data = await createData(
        `talk-${slug}.json`,
        JSON.stringify({ title, description })
      );
      const modules: RouteModules = { preview: data };

      if (banner) modules.banner = banner;

      routes.push({
        path: `${localePrefix}${pathOf('talks')}${slug}`,
        exact: true,
        component: PREVIEW,
        modules,
      });
    }

    addRoute({
      path: `${localePrefix}/`,
      exact: false,
      component: HOME,
      routes,
    });
  },
  getPathsToWatch: () => [
    resolve(`./i18n/${context.i18n.currentLocale}/talks/**/*.{md,mdx}`),
  ],
});
