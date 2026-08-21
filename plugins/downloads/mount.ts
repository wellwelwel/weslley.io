import type { LoadContext, Plugin } from '@docusaurus/types';
import type { Downloads } from '../../tools/downloads';
import { downloads } from '../../tools/downloads';

type PluginOptions = {
  pluginName: string;
};

/* The numbers move by less than the gap between two builds, so the site bakes them in and the browser never fetches them. */
export default (
  _context: LoadContext,
  options: PluginOptions
): Plugin<Downloads> => ({
  name: options.pluginName,
  loadContent: downloads,
  contentLoaded: ({ content, actions }) => {
    if (content.total === undefined)
      console.warn('Downloads history is unreachable, falling back.');

    actions.setGlobalData(content);
  },
});
