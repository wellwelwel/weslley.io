import type { ProcessedArticle } from '@site/src/@types/article';
import { useEffect, useState } from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { ArticlesOptions } from '@site/src/helpers/get-social';
import { useViewMode } from '@site/src/hooks/useViewMode';
import { MarkdownWithAdmonitions } from './Admonition';
import { Article } from './Article';
import '@site/src/css/pages/articles.scss';

export const Articles = ({ route, children }: ArticlesOptions) => {
  const { globalData, siteConfig, i18n } = useDocusaurusContext();
  const [viewCounts, setViewCounts] = useState<Record<string, string>>(
    Object.create(null)
  );
  const { viewMode, ViewToggle, isListView } = useViewMode();
  const currentLocale = i18n.currentLocale;
  const API = siteConfig.customFields?.COUNTTY_URL;
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
  const showViewsCounter = siteConfig.customFields?.showViewsCounter === true;
  const articles =
    (globalData[`mount-${route}`] as { default: ProcessedArticle[] })
      ?.default || [];

  useEffect(() => {
    if (!showViewsCounter) return;

    const controller = new AbortController();

    articles.forEach((article) => {
      if (!article.slug) return;

      const slug = article.slug;

      API &&
        fetch(`${API}/peek?slug=${slug}`, {
          signal: controller.signal,
        })
          .then((res) => res.json())
          .then((data) => {
            const typedData = data as { label: string };

            setViewCounts((prev) => ({ ...prev, [slug]: typedData.label }));
          })
          .catch(() => {});
    });

    return () => controller.abort();
  }, [articles, showViewsCounter, API]);

  return (
    <Layout title={translations.title[route]}>
      <Head>
        <meta property='og:image' content={socialBanner} data-rh='true' />
        <meta property='twitter:image' content={socialBanner} data-rh='true' />
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
              viewCounts={viewCounts}
              showViewsCounter={showViewsCounter}
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
