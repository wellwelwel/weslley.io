import type {
  LoadContext,
  Plugin,
  RouteConfig,
  RouteModules,
} from '@docusaurus/types';
import type { Author, FoundArticle } from '../../src/@types/article';
import type { Shape } from '../../src/@types/image';
import type { Preview, SlideId } from '../../src/data/previews';
import { relative, sep } from 'node:path';
import { describeTalks, pathOf, previews, ROOT } from '../../src/data/previews';
import { slots } from '../../src/data/slots';
import { downloadsLabel } from '../../src/helpers/downloads';
import { stripMarkdown } from '../../src/helpers/strip-markdown';
import { downloads } from '../../tools/downloads';
import { findArticles } from '../../tools/find-articles';
import { loadAuthors } from '../../tools/load-authors';
import { measureImage } from '../../tools/measure-image';
import { registerCounters } from '../../tools/register-counters';
import { contentDir, localePrefix, watchGlob } from '../locale';

type PluginOptions = {
  pluginName: string;
};

type Banner = Shape & {
  file: string;
};

type Talk = {
  slug: string;
  title: string;
  description: string | null;
  content: string;
  counter: string;
  authors: Author[];
  banner?: Banner;
};

type Content = {
  yearly: string;
  talks: Talk[];
};

const TALKS = 'talks';

const HOME = '@site/src/pages/_dynamic/home/index.tsx';
const PREVIEW = '@site/src/pages/_dynamic/home/preview.tsx';

const summarize = (description: string | null): string | null =>
  description && stripMarkdown(description).split('\n').join(' ');

const aliased = (siteDir: string, file: string): string =>
  `@site/${relative(siteDir, file).split(sep).join('/')}`;

const lazy = (siteDir: string, file: string): string =>
  `() => import(${JSON.stringify(aliased(siteDir, file))})`;

const bannerOf = async (
  file: string | undefined
): Promise<Banner | undefined> =>
  file ? { file, ...(await measureImage(file)) } : undefined;

const bannerLine = (siteDir: string, { file, width, height }: Banner): string =>
  `    banner: { load: ${lazy(siteDir, file)}, width: ${width}, height: ${height} },`;

const catalog = (talks: Talk[], siteDir: string): string =>
  [
    'export const sources = new Map([',
    ...talks.map(({ slug, content, counter, authors, banner }) =>
      [
        `  [${JSON.stringify(slug)}, {`,
        `    content: ${lazy(siteDir, content)},`,
        `    counter: ${JSON.stringify(counter)},`,
        `    authors: ${JSON.stringify(authors)},`,
        ...(banner ? [bannerLine(siteDir, banner)] : []),
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
    const [articles, { rolling }, authors] = await Promise.all([
      findArticles(contentDir(currentLocale, TALKS)),
      downloads(),
      loadAuthors(currentLocale),
    ]);
    const yearly = downloadsLabel(rolling);

    if (context.siteConfig.customFields?.showViewsCounter === true)
      await registerCounters(articles.map(({ slug }) => slug));

    const credit = (article: FoundArticle, name: string): Author => {
      const author = authors[name];

      if (!author)
        throw new Error(
          `The talk "${article.title}" (${article.mdxPath}) credits "${name}", who is missing from i18n/${currentLocale}/articles/authors.yml.`
        );

      return author;
    };

    const found = await Promise.all(
      articles.map(async (article): Promise<Talk> => {
        if (!article.slug)
          throw new Error(
            `The talk "${article.title}" (${article.mdxPath}) has no slug.`
          );

        const banner = await bannerOf(article.socialPath);

        return {
          slug: article.path,
          title: article.title,
          description: summarize(article.description),
          content: article.mdxPath,
          counter: article.slug,
          authors: article.authors.map((name) => credit(article, name)),
          ...(banner && { banner }),
        };
      })
    );

    const known = new Set(found.map(({ slug }) => slug));
    const orphan = slots.find(({ talk }) => talk && !known.has(talk));

    if (orphan)
      throw new Error(
        `The agenda slot "${orphan.event}" (${orphan.date}) points to the talk "${orphan.talk}", which has no MDX file under i18n/${currentLocale}/talks.`
      );

    return { yearly, talks: found };
  },
  contentLoaded: async ({ content, actions }) => {
    const { addRoute, createData } = actions;
    const prefix = localePrefix(context.i18n);
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
        path: `${prefix}${pathOf(id)}`,
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

      if (banner) modules.banner = banner.file;

      routes.push({
        path: `${prefix}${pathOf('talks')}${slug}`,
        exact: true,
        component: PREVIEW,
        modules,
      });
    }

    addRoute({
      path: `${prefix}/`,
      exact: false,
      component: HOME,
      routes,
    });
  },
  getPathsToWatch: () => watchGlob([context.i18n.currentLocale], TALKS),
});
