import type {
  LoadContext,
  Plugin,
  RouteConfig,
  RouteModules,
} from '@docusaurus/types';
import type { Preview, SlideId } from '../../src/components/Home/previews';
import { resolve } from 'node:path';
import { pathOf, previews, ROOT } from '../../src/components/Home/previews';
import { talks } from '../../src/components/Talks/catalog';
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

    const found = [...talks.keys()].map((slug) => {
      const article = articles.find(
        (candidate) => candidate.slug?.replace(/%/g, '') === slug
      );

      if (!article)
        throw new Error(
          `The talk "${slug}" has no MDX file under i18n/${currentLocale}/talks.`
        );

      return {
        slug,
        title: article.title,
        description: summarize(article.description),
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

    for (const { slug, banner, ...preview } of content.talks) {
      const data = await createData(
        `talk-${slug}.json`,
        JSON.stringify(preview)
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
