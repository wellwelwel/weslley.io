import type { LoadContext, Plugin } from '@docusaurus/types';
import type { Downloads } from '../../tools/downloads';
import { downloads } from '../../tools/downloads';

type PluginOptions = {
  pluginName: string;
};

/* Baked in at build time, since the numbers barely move between builds. */
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
