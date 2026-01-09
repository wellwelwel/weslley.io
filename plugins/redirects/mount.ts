import type { LoadContext, Plugin } from '@docusaurus/types';
import type { ProcessedRedirect } from '../../src/@types/redirect';
import { redirects } from '../../src/pages/_dynamic/redirect/_redirects.js';

type PluginOptions = {
  pluginName: string;
};

const getDefaultSocialUrl = (githubUrl: string): string => {
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/?#]+)/);
  if (!match) return '';

  const [, owner, repo] = match;

  return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
};

export default (
  context: LoadContext,
  options: PluginOptions
): Plugin<ProcessedRedirect[]> => {
  const { pluginName } = options;

  return {
    name: pluginName,
    loadContent: async () => {
      const processed: ProcessedRedirect[] = [];

      for (const redirect of redirects) {
        const socialUrl = redirect.social ?? getDefaultSocialUrl(redirect.url);

        processed.push({
          title: redirect.title,
          slug: redirect.slug,
          url: redirect.url,
          social: redirect.social,
          socialUrl,
        });
      }

      return processed;
    },
    contentLoaded: async ({ content, actions }) => {
      const { addRoute, createData, setGlobalData } = actions;
      const { i18n } = context;
      const currentLocale = i18n.currentLocale;
      const localePrefix =
        currentLocale === i18n.defaultLocale ? '' : `/${currentLocale}`;

      setGlobalData(content);

      for (const redirect of content) {
        const dataPath = await createData(
          `redirect-${redirect.slug}.json`,
          JSON.stringify(redirect, null, 0)
        );

        const modules: Record<string, string> = Object.create(null);
        modules.data = dataPath;

        addRoute({
          path: `${localePrefix}/r/${redirect.slug}`,
          component: '@site/src/pages/_dynamic/redirect/index.tsx',
          exact: true,
          modules,
        });
      }
    },
  };
};
