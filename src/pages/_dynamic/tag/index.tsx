import type { ProcessedArticle } from '../../../@types/article';
import { useEffect, useState } from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MarkdownWithAdmonitions } from '@site/src/components/Articles/Admonition';
import {
  ArticlesOptions,
  createImagesContext,
  getSocialImage,
} from '@site/src/helpers/get-social';
import { isDevelopment } from '../../../../tools/environment';
import '@site/src/css/pages/_article-item.scss';

type TagPageProps = {
  data: {
    route: ArticlesOptions['route'];
    tag: string;
    articles: ProcessedArticle[];
  };
};

export default ({ data }: TagPageProps) => {
  const { route, tag, articles } = data;
  const { siteConfig, i18n } = useDocusaurusContext();
  const API = siteConfig.customFields?.COUNTTY_URL;
  const currentLocale = i18n.currentLocale;
  const imagesContext = createImagesContext();
  const imageMap: Record<string, string> = Object.create(null);
  const showViewsCounter = siteConfig.customFields?.showViewsCounter === true;

  if (imagesContext) {
    imagesContext.keys().forEach((key: string) => {
      if (key.includes(`/${currentLocale}/${route}/`))
        imageMap[key] = imagesContext(key).default;
    });
  }

  const [viewCounts, setViewCounts] = useState<Record<string, string>>(
    Object.create(null)
  );

  useEffect(() => {
    const controller = new AbortController();

    for (const article of articles) {
      if (!article.slug || !showViewsCounter) continue;

      const slug = article.slug;

      fetch(`${API}/peek?slug=${slug}`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((data) => {
          const typedData = data as { label: string };

          setViewCounts((prev) => ({ ...prev, [slug]: typedData.label }));
        })
        .catch(() => {});
    }

    return () => controller.abort();
  }, [articles, API]);

  return (
    <>
      <Head>
        <meta name='robots' content='noindex, nofollow' />
      </Head>
      <Layout
        title={`Tag: ${tag}`}
        description={`Artigos relacionados à tag ${tag}`}
      >
        <div id='articles'>
          <header>
            <h1>Tag: {tag}</h1>
            <p>
              {articles.length} {articles.length === 1 ? 'artigo' : 'artigos'}{' '}
              {articles.length === 1 ? 'encontrado' : 'encontrados'}
            </p>
          </header>

          <section>
            {articles.map((article) => (
              <div key={article.slug} className='article-item show'>
                <article className='card'>
                  <div className='card__body'>
                    {getSocialImage({
                      article,
                      route,
                      currentLocale,
                      imageMap,
                    }) && (
                      <Link to={`/${route}/${article.slug}`}>
                        <img
                          src={
                            getSocialImage({
                              article,
                              route,
                              currentLocale,
                              imageMap,
                            }) ?? undefined
                          }
                          alt={article.title}
                          loading='lazy'
                        />
                      </Link>
                    )}

                    <h2>
                      <Link to={`/${route}/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>

                    {article.description && (
                      <div>
                        <MarkdownWithAdmonitions
                          content={article.description}
                        />
                      </div>
                    )}
                  </div>

                  <div className='card__footer'>
                    {showViewsCounter && (
                      <div>
                        Visualizações:{' '}
                        {article.slug ? viewCounts[article.slug] : '-'}
                      </div>
                    )}
                    <div>
                      <time dateTime={article.date}>
                        {new Date(article.date).toLocaleDateString(
                          currentLocale,
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </time>
                      {' · '}
                      <span>
                        {article.readingTime}{' '}
                        {article.readingTime === 1 ? 'minuto' : 'minutos'} de
                        leitura
                      </span>
                      <div>
                        {article.lastModified &&
                          article.lastModified !== article.date && (
                            <span title='Última modificação'>
                              Última atualização em{' '}
                              <strong>
                                {new Date(
                                  article.lastModified
                                ).toLocaleDateString(currentLocale, {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </strong>
                            </span>
                          )}
                        {isDevelopment && (
                          <em> (Simulado durante o desenvolvimento)</em>
                        )}
                      </div>
                    </div>

                    {article.tags.length > 0 && (
                      <div>
                        <strong>Tags:</strong>{' '}
                        {article.tags.map((tagName, index) => (
                          <span key={tagName}>
                            {index > 0 && ' '}
                            <Link to={`/${route}/tag/${tagName.toLowerCase()}`}>
                              <code>{tagName}</code>
                            </Link>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </div>
            ))}

            {articles.length === 0 && (
              <div className='empty-state'>
                <p>Nenhum artigo encontrado.</p>
              </div>
            )}
          </section>
        </div>
      </Layout>
    </>
  );
};
