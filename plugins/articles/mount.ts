import type { ProcessedArticle } from '../../src/@types/article';
import { resolve } from 'node:path';
import { LoadContext, Plugin } from '@docusaurus/types';
import { findArticles } from '../../tools/find-articles';
import { loadAuthors } from '../../tools/load-authors';
import { normalizeTag } from '../../tools/normalize-tag';

interface PluginOptions {
  pluginName: string;
  contentDir: string;
}

export default (
  context: LoadContext,
  options: PluginOptions
): Plugin<ProcessedArticle[]> => {
  const pluginName = options.pluginName;
  const contentDir = options.contentDir;

  return {
    name: pluginName,
    loadContent: async () => {
      const { i18n } = context;
      const currentLocale = i18n.currentLocale;

      const articlesDir = resolve(`./i18n/${currentLocale}/${contentDir}`);

      const articles = await findArticles(articlesDir);
      const authorsMap = await loadAuthors(currentLocale);

      for (const article of articles) {
        article.authorsData = article.authors
          .map((authorName) => authorsMap[authorName])
          .filter(Boolean);
      }

      articles.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      for (let i = 0; i < articles.length; i++) {
        const current = articles[i];
        const previous = articles[i - 1];
        const next = articles[i + 1];

        if (previous)
          current.previousArticle = {
            title: previous.title,
            slug: previous.slug?.replace(/%/g, '') ?? '',
            description: previous.description,
            social: previous.socialPath,
          };

        if (next)
          current.nextArticle = {
            title: next.title,
            slug: next.slug?.replace(/%/g, '') ?? '',
            description: next.description,
            social: next.socialPath,
          };
      }

      return articles;
    },
    contentLoaded: async ({ content, actions }) => {
      const { addRoute, createData, setGlobalData } = actions;
      const { i18n } = context;
      const currentLocale = i18n.currentLocale;
      const localePrefix =
        currentLocale === i18n.defaultLocale ? '' : `/${currentLocale}`;

      setGlobalData(content);

      for (const article of content) {
        const dataPath = await createData(
          `${contentDir}-${article.slug}.json`,
          JSON.stringify({ ...article, route: contentDir }, null, 0)
        );

        const modules: Record<string, string> = Object.create(null);
        modules.data = dataPath;
        modules.content = article.mdxPath;

        if (article.socialPath) modules.social = article.socialPath;

        if (article.previousArticle?.social)
          modules.previousSocial = article.previousArticle.social;

        if (article.nextArticle?.social)
          modules.nextSocial = article.nextArticle.social;

        addRoute({
          path: `${localePrefix}/${contentDir}/${article.slug?.replace(/%/g, '')}`,
          component: `@site/src/pages/_dynamic/${contentDir}/index.tsx`,
          exact: true,
          modules,
        });
      }

      const tagMap: Record<string, ProcessedArticle[]> = Object.create(null);

      for (const article of content)
        for (const tag of article.tags) {
          const normalized = normalizeTag(tag);
          if (!tagMap[normalized]) tagMap[normalized] = [];
          tagMap[normalized].push(article);
        }

      for (const [normalized, articles] of Object.entries(tagMap)) {
        const originalTag = articles[0].tags.find(
          (t) => normalizeTag(t) === normalized
        );

        const tagDataPath = await createData(
          `tag-${normalized.replace(/[^a-z0-9]/g, '-')}.json`,
          JSON.stringify(
            { route: contentDir, tag: originalTag, articles },
            null,
            0
          )
        );

        addRoute({
          path: `${localePrefix}/${contentDir}/tag/${normalized}`,
          component: '@site/src/pages/_dynamic/tag/index.tsx',
          exact: true,
          modules: {
            data: tagDataPath,
          },
        });
      }
    },

    getPathsToWatch() {
      const { i18n } = context;
      return i18n.locales
        .filter((locale) => !!locale)
        .map((locale) =>
          resolve(`./i18n/${locale}/${contentDir}/**/*.{md,mdx}`)
        );
    },
  };
};
