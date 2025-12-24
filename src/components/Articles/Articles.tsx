import type { ProcessedArticle } from '@site/src/@types/article';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { ArticlesOptions } from '@site/src/helpers/get-social';
import { useViewMode } from '@site/src/hooks/useViewMode';
import { MarkdownWithAdmonitions } from './Admonition';
import { Article } from './Article';
import '@site/src/css/pages/articles.scss';

export const Articles = ({ route, description, children }: ArticlesOptions) => {
  const { globalData, i18n } = useDocusaurusContext();
  const { viewMode, ViewToggle, isListView } = useViewMode();
  const currentLocale = i18n.currentLocale;

  const socialBanner =
    route === 'talks'
      ? '/img/slide/codecon-002.jpg'
      : '/img/slide/roga-002.jpg';

  const translations = {
    title: {
      articles: currentLocale === 'en' ? 'Articles' : 'Artigos',
      talks: currentLocale === 'en' ? 'Talks' : 'Palestras',
    },
    noArticles:
      currentLocale === 'en'
        ? 'No articles found.'
        : 'Nenhum artigo encontrado.',
  };

  const articles =
    (globalData[`mount-${route}`] as { default: ProcessedArticle[] })
      ?.default || [];

  return (
    <Layout title={translations.title[route]}>
      <Head>
        <meta property='og:image' content={socialBanner} data-rh='true' />
        <meta property='twitter:image' content={socialBanner} data-rh='true' />
        {description && (
          <meta name='description' content={description} data-rh='true' />
        )}
        {description && (
          <meta name='og:description' content={description} data-rh='true' />
        )}
      </Head>
      <div id='articles'>
        <header>
          <h1>{translations.title[route]}</h1>
          <ViewToggle />
        </header>

        {children ?? null}

        <section className={isListView ? 'list-view' : ''}>
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
  );
};
export { MarkdownWithAdmonitions };
