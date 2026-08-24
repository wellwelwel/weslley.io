import type { ArticleListing, ArticleRoute } from '@site/src/@types/article';

type LookupOptions = {
  article: ArticleListing;
  route: ArticleRoute;
  currentLocale: string;
  imageMap: Record<string, string>;
};

const PATTERNS: Record<ArticleRoute, RegExp> = {
  articles: /^articles\/(.+?)\/[^/]+\.mdx$/,
};

export const getSocialImage = ({
  article,
  route,
  currentLocale,
  imageMap,
}: LookupOptions): string | null => {
  if (!article.social || !article.social.startsWith('./')) return null;

  const mdxPath = article.mdxPath.split(route);
  mdxPath.shift();

  const mdxPathMatch = mdxPath
    .map((path) => `${route}${path}`)
    .join()
    .match(PATTERNS[route]);
  if (!mdxPathMatch) return null;

  const articleDir = mdxPathMatch[1];
  const imageName = article.social.replace('./', '');
  const expectedKey = `./${currentLocale}/${route}/${articleDir}/${imageName}`;

  return imageMap[expectedKey] || null;
};

export const createImagesContext = () => {
  try {
    return require.context('@site/i18n', true, /\.(png|jpe?g|gif|svg|webp)$/i);
  } catch {
    return null;
  }
};
