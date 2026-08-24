import type {
  ArticlesOptions,
  ProcessedArticle,
} from '@site/src/@types/article';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { Article } from '@site/src/components/Articles/Article';
import { ViewToggle } from '@site/src/components/Articles/ViewToggle';
import { createImagesContext } from '@site/src/helpers/article-image';
import { useViewMode } from '@site/src/hooks/useViewMode';

type TagPageOptions = {
  data: {
    route: ArticlesOptions['route'];
    tag: string;
    articles: ProcessedArticle[];
  };
};

export default ({ data }: TagPageOptions) => {
  const { route, tag, articles } = data;
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;
  const imagesContext = createImagesContext();
  const imageMap: Record<string, string> = Object.create(null);
  const [viewMode, setViewMode] = useViewMode();

  const translations = {
    tag: currentLocale === 'en' ? 'Tag' : 'Tag',
    articlesRelatedToTag: (tag: string) =>
      currentLocale === 'en'
        ? `Articles related to tag ${tag}`
        : `Artigos relacionados à tag ${tag}`,
    article: currentLocale === 'en' ? 'article' : 'artigo',
    articles: currentLocale === 'en' ? 'articles' : 'artigos',
    found: currentLocale === 'en' ? 'found' : 'encontrado',
    foundPlural: currentLocale === 'en' ? 'found' : 'encontrados',
    noArticles:
      currentLocale === 'en'
        ? 'No articles found.'
        : 'Nenhum artigo encontrado.',
  };

  if (imagesContext) {
    imagesContext.keys().forEach((key: string) => {
      if (key.includes(`/${currentLocale}/${route}/`))
        imageMap[key] = imagesContext(key).default;
    });
  }

  return (
    <>
      <Head>
        <meta name='robots' content='noindex, nofollow' />
      </Head>
      <Layout
        title={`${translations.tag}: ${tag}`}
        description={translations.articlesRelatedToTag(tag)}
      >
        <div id='articles'>
          <header>
            <h1>
              {translations.tag}: {tag}
            </h1>
            <ViewToggle mode={viewMode} onChange={setViewMode} />
          </header>

          <small>
            {articles.length}{' '}
            {articles.length === 1
              ? translations.article
              : translations.articles}{' '}
            {articles.length === 1
              ? translations.found
              : translations.foundPlural}
            .
          </small>

          <section className={viewMode === 'list' ? 'list-view' : ''}>
            {articles.map((article) => (
              <Article
                key={article.slug}
                article={article}
                route={route}
                viewMode={viewMode}
              />
            ))}

            {articles.length === 0 && (
              <div className='empty-state'>
                <p>{translations.noArticles}</p>
              </div>
            )}
          </section>
        </div>
      </Layout>
    </>
  );
};
