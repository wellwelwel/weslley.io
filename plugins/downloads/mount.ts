import type { LoadContext, Plugin } from '@docusaurus/types';
import type { Downloads } from '../../src/@types/downloads';
import { downloads } from '../../tools/downloads';

type PluginOptions = {
  pluginName: string;
};

/* The numbers barely move between builds. */
export default (
  _context: LoadContext,
  options: PluginOptions
): Plugin<Downloads> => ({
  name: options.pluginName,
  loadContent: downloads,
  contentLoaded: ({ content, actions }) => {
    if (content.rolling === undefined)
      console.warn('Downloads stats are unreachable, falling back.');
    else if (content.total === undefined)
      console.warn('Downloads history is unreachable, falling back.');

    actions.setGlobalData(content);
  },
});
