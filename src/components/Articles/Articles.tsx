import type { ArticleListing, ArticlesOptions } from '@site/src/@types/article';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { Article } from '@site/src/components/Articles/Article';
import { ViewToggle } from '@site/src/components/Articles/ViewToggle';
import { useViewMode } from '@site/src/hooks/useViewMode';

export const Articles = ({ route, description, children }: ArticlesOptions) => {
  const { globalData, i18n } = useDocusaurusContext();
  const [viewMode, setViewMode] = useViewMode();
  const currentLocale = i18n.currentLocale;

  const socialBanner = '/img/slide/roga-002.jpg';

  const translations = {
    title: {
      articles: currentLocale === 'en' ? 'Articles' : 'Artigos',
    },
    noArticles:
      currentLocale === 'en'
        ? 'No articles found.'
        : 'Nenhum artigo encontrado.',
  };

  const articles =
    (globalData[`mount-${route}`] as { default: ArticleListing[] })?.default ||
    [];

  return (
    <Layout title={translations.title[route]}>
      <Head>
        <meta property='og:image' content={socialBanner} />
        <meta property='twitter:image' content={socialBanner} />
        {description && <meta name='description' content={description} />}
        {description && <meta name='og:description' content={description} />}
      </Head>
      <div id='articles'>
        <header>
          <h1>{translations.title[route]}</h1>
          <ViewToggle mode={viewMode} onChange={setViewMode} />
        </header>

        {children ?? null}

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
  );
};
