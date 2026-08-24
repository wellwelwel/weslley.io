import type { LoadContext, Plugin } from '@docusaurus/types';
import type { ProcessedRedirect } from '../../src/@types/redirect';
import { redirects } from '../../src/data/redirects';
import { localePrefix } from '../locale';

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
    loadContent: async () =>
      redirects.map(({ title, slug, url, social }) => ({
        title,
        slug,
        url,
        social,
        socialUrl: social ?? getDefaultSocialUrl(url),
      })),
    contentLoaded: async ({ content, actions }) => {
      const { addRoute, createData } = actions;
      const prefix = localePrefix(context.i18n);

      for (const redirect of content) {
        const dataPath = await createData(
          `redirect-${redirect.slug}.json`,
          JSON.stringify(redirect, null, 0)
        );

        const modules: Record<string, string> = Object.create(null);
        modules.data = dataPath;

        addRoute({
          path: `${prefix}/r/${redirect.slug}`,
          component: '@site/src/pages/_dynamic/redirect/index.tsx',
          exact: true,
          modules,
        });
      }
    },
  };
};
