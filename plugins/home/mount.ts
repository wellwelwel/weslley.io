import type {
  LoadContext,
  Plugin,
  RouteConfig,
  RouteModules,
} from '@docusaurus/types';
import { resolve } from 'node:path';
import { talks } from '../../src/components/Talks/catalog';
import { downloadsLabel } from '../../src/helpers/downloads';
import { stripMarkdown } from '../../src/helpers/strip-markdown';
import { downloads } from '../../tools/downloads';
import { findArticles } from '../../tools/find-articles';

type PluginOptions = {
  pluginName: string;
};

type Page = {
  title: string;
  description: string | null;
  image?: string;
};

type Talk = Page & {
  slug: string;
  social?: string;
};

type Content = {
  listing: Page;
  talks: Talk[];
};

const HOME = '@site/src/pages/_dynamic/home/index.tsx';
const HEAD = '@site/src/pages/_dynamic/home/head.tsx';

/** What the talks listing page always shared, kept for the bare /talks/ link. */
const listingOf = (yearly: string): Page => ({
  title: 'Palestras',
  description: `Com mais de ${yearly} de downloads anuais em projetos autorais, sou autor e mantenedor de projetos críticos no ecossistema open source e levo ao palco experiências reais de sistemas usados em escala global.`,
  image: '/img/slide/codecon-002.jpg',
});

/** The talk pages always dropped the percent signs of an encoded slug, and the
    links out there carry that shape. */
const slugOf = (slug: string | undefined): string =>
  slug?.replace(/%/g, '') ?? '';

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
    const listing = listingOf(downloadsLabel(rolling));

    const found = [...talks.keys()].map((slug) => {
      const article = articles.find(
        (candidate) => slugOf(candidate.slug) === slug
      );

      if (!article)
        throw new Error(
          `The talk "${slug}" has no MDX file under i18n/${currentLocale}/talks.`
        );

      return {
        slug,
        title: article.title,
        description: summarize(article.description),
        ...(article.socialPath && { social: article.socialPath }),
      };
    });

    return { listing, talks: found };
  },
  contentLoaded: async ({ content, actions }) => {
    const { addRoute, createData } = actions;
    const { i18n } = context;
    const localePrefix =
      i18n.currentLocale === i18n.defaultLocale ? '' : `/${i18n.currentLocale}`;
    const listing = await createData(
      'talks.json',
      JSON.stringify(content.listing)
    );
    const routes: RouteConfig[] = [
      { path: `${localePrefix}/`, exact: true, component: HEAD },
      {
        path: `${localePrefix}/talks`,
        exact: true,
        component: HEAD,
        modules: { page: listing },
      },
    ];

    for (const { slug, social, ...page } of content.talks) {
      const data = await createData(`talk-${slug}.json`, JSON.stringify(page));
      const modules: RouteModules = { page: data };

      if (social) modules.social = social;

      routes.push({
        path: `${localePrefix}/talks/${slug}`,
        exact: true,
        component: HEAD,
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
