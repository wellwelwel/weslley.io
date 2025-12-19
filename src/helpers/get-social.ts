import { ProcessedArticle } from '../@types/article';

export type ArticlesOptions = {
  route: keyof typeof regex;
};

const regex = {
  articles: /^articles\/(.+?)\/[^/]+\.mdx$/,
  talks: /^talks\/(.+?)\/[^/]+\.mdx$/,
} as const;

export const getSocialImage = ({
  article,
  route,
  currentLocale,
  imageMap,
}: {
  article: ProcessedArticle;
  route: ArticlesOptions['route'];
  currentLocale: string;
  imageMap: Record<string, string>;
}) => {
  if (!article.social || !article.social.startsWith('./')) return null;

  const mdxPath = article.mdxPath.split(route);
  mdxPath.shift();

  const mdxPathMatch = mdxPath
    .map((path) => `${route}${path}`)
    .join()
    .match(regex[route]);
  if (!mdxPathMatch) return null;

  const articleDir = mdxPathMatch[1];
  const imageName = article.social.replace('./', '');
  const expectedKey = `./${currentLocale}/${route}/${articleDir}/${imageName}`;

  return imageMap[expectedKey] || null;
};

export const createImagesContext = () => {
  try {
    return require.context('../../i18n', true, /\.(png|jpe?g|gif|svg|webp)$/i);
  } catch {
    return null;
  }
};
