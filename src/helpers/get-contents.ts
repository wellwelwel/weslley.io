import { dynamicRequire } from './dynamic-require';

export const socials = dynamicRequire(
  require.context('@site/content/social', false, /\.(tsx|jsx|mdx)$/)
);

export const anchors = dynamicRequire(
  require.context('@site/content/anchors', false, /\.(tsx|jsx|mdx)$/)
);

export const cards = dynamicRequire(
  require.context('@site/content/cards', false, /\.(tsx|jsx|mdx)$/)
);

export const projects = dynamicRequire(
  require.context('@site/content/projects', false, /\.(tsx|jsx|mdx)$/)
);
