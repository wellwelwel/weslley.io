import type {
  ConfigureWebpackUtils,
  Plugin,
  PostCssOptions,
} from '@docusaurus/types';
import { resolve } from 'node:path';
import { env } from 'node:process';
import {
  lighten,
  NPROGRESS,
  PRISM_REGISTER,
  ROOT,
  silence,
  strip,
  STYLESHEET,
  UTILS_COMMON,
} from './replacements';
import { routeScripts } from './route-scripts';

export default (): Plugin => ({
  name: 'custom-webpack-config',
  configurePostCss: (postCssOptions: PostCssOptions) => {
    postCssOptions.plugins.push(require('@tailwindcss/postcss'));

    return postCssOptions;
  },
  configureWebpack: (
    _config: unknown,
    isServer: boolean,
    { currentBundler }: ConfigureWebpackUtils
  ) => {
    const patching = !isServer && env.NODE_ENV === 'production';

    return {
      plugins: [
        new currentBundler.instance.NormalModuleReplacementPlugin(
          STYLESHEET,
          strip
        ),
        new currentBundler.instance.NormalModuleReplacementPlugin(
          PRISM_REGISTER,
          silence
        ),
        new currentBundler.instance.NormalModuleReplacementPlugin(
          NPROGRESS,
          silence
        ),
        ...(isServer
          ? []
          : [
              new currentBundler.instance.NormalModuleReplacementPlugin(
                UTILS_COMMON,
                lighten
              ),
            ]),
        ...(patching ? [routeScripts] : []),
      ],
      resolve: {
        alias: {
          '@site': ROOT,
          '@Modal': resolve(ROOT, 'src/components/Modal'),
          '@Side': resolve(ROOT, 'src/components/Side'),
          '@Moments': resolve(ROOT, 'src/components/Moments'),
          '@Keynote': resolve(ROOT, 'src/components/Keynote'),
        },
      },
      ...(isServer
        ? {}
        : {
            optimization: {
              splitChunks: {
                cacheGroups: {
                  slots: {
                    test: /[\\/]src[\\/]data[\\/]slots\.ts$/,
                    chunks: 'async',
                    minChunks: 2,
                    minSize: 0,
                    priority: 40,
                    reuseExistingChunk: true,
                    name: 'slots',
                  },
                  prism: {
                    test: /[\\/]node_modules[\\/](?:prism-react-renderer|prismjs)[\\/]/,
                    chunks: 'async',
                    minChunks: 2,
                    priority: 45,
                    reuseExistingChunk: true,
                    name: 'prism',
                  },
                },
              },
            },
          }),
    };
  },
});
