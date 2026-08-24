import type {
  LoadContext,
  Plugin,
  PluginContentLoadedActions,
} from '@docusaurus/types';
import type {
  ArticleListing,
  ArticleNavigation,
  FoundArticle,
  ProcessedArticle,
} from '../../src/@types/article';
import { findArticles } from '../../tools/find-articles';
import { loadAuthors } from '../../tools/load-authors';
import { normalizeTag } from '../../tools/normalize-tag';
import { registerCounters } from '../../tools/register-counters';
import { contentDir, localePrefix, watchGlob } from '../locale';

type PluginOptions = {
  pluginName: string;
  contentDir: string;
};

type RouteOptions = {
  articles: ProcessedArticle[];
  actions: PluginContentLoadedActions;
  route: string;
  prefix: string;
};

/** Global data ships in every page bundle. */
const listing = ({
  title,
  slug,
  path,
  date,
  description,
  readingTime,
  lastModified,
  tags,
  order,
  social,
  mdxPath,
}: ProcessedArticle): ArticleListing => ({
  title,
  slug,
  path,
  date,
  description,
  readingTime,
  lastModified,
  tags,
  order,
  social,
  mdxPath,
});

const neighbor = ({
  title,
  path,
  description,
  socialPath,
}: FoundArticle): ArticleNavigation => ({
  title,
  path,
  description,
  social: socialPath,
});

const newestFirst = (left: FoundArticle, right: FoundArticle): number =>
  new Date(right.date).getTime() - new Date(left.date).getTime();

const articleRoutes = async ({
  articles,
  actions,
  route,
  prefix,
}: RouteOptions): Promise<void> => {
  for (const article of articles) {
    const dataPath = await actions.createData(
      `${route}-${article.path}.json`,
      JSON.stringify(article, null, 0)
    );

    const modules: Record<string, string> = Object.create(null);
    modules.data = dataPath;
    modules.content = article.mdxPath;

    if (article.socialPath) modules.social = article.socialPath;

    if (article.previousArticle?.social)
      modules.previousSocial = article.previousArticle.social;

    if (article.nextArticle?.social)
      modules.nextSocial = article.nextArticle.social;

    actions.addRoute({
      path: `${prefix}/${route}/${article.path}`,
      component: `@site/src/pages/_dynamic/${route}/index.tsx`,
      exact: true,
      modules,
    });
  }
};

const tagRoutes = async ({
  articles,
  actions,
  route,
  prefix,
}: RouteOptions): Promise<void> => {
  const tagMap: Record<string, ProcessedArticle[]> = Object.create(null);

  for (const article of articles)
    for (const tag of article.tags) {
      const normalized = normalizeTag(tag);
      if (!tagMap[normalized]) tagMap[normalized] = [];
      tagMap[normalized].push(article);
    }

  for (const [normalized, tagged] of Object.entries(tagMap)) {
    const originalTag = tagged[0].tags.find(
      (tag) => normalizeTag(tag) === normalized
    );

    const dataPath = await actions.createData(
      `tag-${normalized.replace(/[^a-z0-9]/g, '-')}.json`,
      JSON.stringify({ route, tag: originalTag, articles: tagged }, null, 0)
    );

    actions.addRoute({
      path: `${prefix}/${route}/tag/${normalized}`,
      component: '@site/src/pages/_dynamic/tag/index.tsx',
      exact: true,
      modules: { data: dataPath },
    });
  }
};

export default (
  context: LoadContext,
  options: PluginOptions
): Plugin<ProcessedArticle[]> => {
  const { pluginName, contentDir: route } = options;

  return {
    name: pluginName,
    loadContent: async () => {
      const { currentLocale } = context.i18n;
      const found = await findArticles(contentDir(currentLocale, route));
      const authorsMap = await loadAuthors(currentLocale);

      if (context.siteConfig.customFields?.showViewsCounter === true)
        await registerCounters(found.map(({ slug }) => slug));

      const sorted = found.sort(newestFirst);

      return sorted.map((article, index) => ({
        ...article,
        route,
        authorsData: article.authors
          .map((authorName) => authorsMap[authorName])
          .filter(Boolean),
        ...(sorted[index - 1] && {
          previousArticle: neighbor(sorted[index - 1]),
        }),
        ...(sorted[index + 1] && { nextArticle: neighbor(sorted[index + 1]) }),
      }));
    },
    contentLoaded: async ({ content, actions }) => {
      const scope = {
        articles: content,
        actions,
        route,
        prefix: localePrefix(context.i18n),
      };

      actions.setGlobalData(content.map(listing));

      await articleRoutes(scope);
      await tagRoutes(scope);
    },
    getPathsToWatch: () => watchGlob(context.i18n.locales, route),
  };
};
