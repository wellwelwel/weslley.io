import type { PostCssOptions } from '@docusaurus/types';
import { resolve } from 'node:path';

export default () => {
  return {
    name: 'custom-webpack-config',
    configurePostCss(postCssOptions: PostCssOptions) {
      postCssOptions.plugins.push(require('@tailwindcss/postcss'));

      return postCssOptions;
    },
    configureWebpack() {
      return {
        resolve: {
          alias: {
            '@site': resolve(__dirname),
            '@Modal': resolve(__dirname, 'src/components/Modal'),
            '@Side': resolve(__dirname, 'src/components/Side'),
            '@Moments': resolve(__dirname, 'src/components/Moments'),
            '@Keynote': resolve(__dirname, 'src/components/Keynote'),
          },
        },
      };
    },
  };
};
