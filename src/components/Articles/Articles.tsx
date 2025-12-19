import type { ProcessedArticle } from '@site/src/@types/article';
import { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { ArticlesOptions } from '@site/src/helpers/get-social';
import { MarkdownWithAdmonitions } from './Admonition';
import { Article } from './Article';
import '@site/src/css/pages/articles.scss';

const title = {
  articles: 'Artigos 📜',
  talks: 'Palestras 🎙️',
} as const;

export type ViewMode = 'card' | 'list';

export const Articles = ({ route }: ArticlesOptions) => {
  const { globalData, siteConfig } = useDocusaurusContext();
  const [viewCounts, setViewCounts] = useState<Record<string, string>>(
    Object.create(null)
  );
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const API = siteConfig.customFields?.COUNTTY_URL;
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
    <Layout title={title[route]}>
      <div id='articles'>
        <header>
          <h1>{title[route]}</h1>
          <div className='view-toggle'>
            <button
              type='button'
              className={viewMode === 'card' ? 'active' : ''}
              onClick={() => setViewMode('card')}
              aria-label='Visualização em cards'
              title='Visualização em cards'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <rect x='3' y='3' width='18' height='6' />
                <rect x='3' y='14' width='18' height='6' />
              </svg>
            </button>
            <button
              type='button'
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
              aria-label='Visualização em lista'
              title='Visualização em lista'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='8' y1='6' x2='21' y2='6' />
                <line x1='8' y1='12' x2='21' y2='12' />
                <line x1='8' y1='18' x2='21' y2='18' />
                <line x1='3' y1='6' x2='3.01' y2='6' />
                <line x1='3' y1='12' x2='3.01' y2='12' />
                <line x1='3' y1='18' x2='3.01' y2='18' />
              </svg>
            </button>
          </div>
        </header>

        <section className={viewMode === 'list' ? 'list-view' : ''}>
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
              <p>Nenhum artigo encontrado.</p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};
export { MarkdownWithAdmonitions };
