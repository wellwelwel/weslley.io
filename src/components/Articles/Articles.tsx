import type { ProcessedArticle } from '@site/src/@types/article';
import { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { ArticlesOptions } from '@site/src/helpers/get-social';
import { MarkdownWithAdmonitions } from './Admonition';
import { Article } from './Article';

const title = {
  articles: 'Artigos 📜',
  talks: 'Palestras 🎙️',
} as const;

export const Articles = ({ route }: ArticlesOptions) => {
  const { globalData, siteConfig } = useDocusaurusContext();
  const [viewCounts, setViewCounts] = useState<Record<string, string>>(
    Object.create(null)
  );
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
      <main className='container margin-vert--lg' style={{ width: 'unset' }}>
        <h1>{title[route]}</h1>

        <div>
          {articles.map((article) => (
            <Article
              key={article.slug}
              article={article}
              route={route}
              viewCounts={viewCounts}
              showViewsCounter={showViewsCounter}
            />
          ))}
        </div>

        {articles.length === 0 && <p>Nenhum artigo encontrado.</p>}
      </main>
    </Layout>
  );
};
export { MarkdownWithAdmonitions };
