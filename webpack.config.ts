import type { ConfigureWebpackUtils, PostCssOptions } from '@docusaurus/types';
import { resolve } from 'node:path';

type Resource = {
  request: string;
  context?: string;
};

const STYLESHEET = /\.(css|scss|sass)$/i;
const SITE = '@site/';

const home = resolve(__dirname, 'src/css/tailwind.css');
const empty = resolve(__dirname, 'tools/reset/empty.ts');

const chained = (request: string) => request.includes('!');

const locate = ({ request, context = __dirname }: Resource) =>
  request.startsWith(SITE)
    ? resolve(__dirname, request.slice(SITE.length))
    : resolve(context, request);

const strip = (resource: Resource) => {
  if (chained(resource.request) || locate(resource) === home) return;

  resource.request = empty;
};

export default () => {
  return {
    name: 'custom-webpack-config',
    configurePostCss(postCssOptions: PostCssOptions) {
      postCssOptions.plugins.push(require('@tailwindcss/postcss'));

      return postCssOptions;
    },
    configureWebpack(
      _config: unknown,
      _isServer: boolean,
      { currentBundler }: ConfigureWebpackUtils
    ) {
      return {
        plugins: [
          new currentBundler.instance.NormalModuleReplacementPlugin(
            STYLESHEET,
            strip
          ),
        ],
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
