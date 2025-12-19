import { resolve } from 'node:path';

export default () => {
  return {
    name: 'custom-webpack-config',
    configureWebpack() {
      return {
        resolve: {
          alias: {
            '@site': resolve(__dirname),
            '@Modal': resolve(__dirname, 'src/components/Modal'),
            '@Side': resolve(__dirname, 'src/components/Side'),
          },
        },
      };
    },
  };
};
