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

  const translations = {
    tag: currentLocale === 'en' ? 'Tag' : 'Tag',
    articlesRelatedToTag: (tag: string) =>
      currentLocale === 'en'
        ? `Articles related to tag ${tag}`
        : `Artigos relacionados à tag ${tag}`,
    article: currentLocale === 'en' ? 'article' : 'artigo',
    date: currentLocale === 'en' ? 'Date' : 'Data',
    articles: currentLocale === 'en' ? 'articles' : 'artigos',
    found: currentLocale === 'en' ? 'found' : 'encontrado',
    foundPlural: currentLocale === 'en' ? 'found' : 'encontrados',
    views: currentLocale === 'en' ? 'Views' : 'Visualizações',
    minute: currentLocale === 'en' ? 'minute' : 'minuto',
    minutes: currentLocale === 'en' ? 'minutes' : 'minutos',
    readingTime: currentLocale === 'en' ? 'reading time' : 'de leitura',
    lastModification:
      currentLocale === 'en' ? 'Last modification' : 'Última modificação',
    lastUpdate:
      currentLocale === 'en' ? 'Last updated on' : 'Última atualização em',
    simulatedDev:
      currentLocale === 'en'
        ? '(Simulated during development)'
        : '(Simulado durante o desenvolvimento)',
    tags: currentLocale === 'en' ? 'Tags' : 'Tags',
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
        title={`${translations.tag}: ${tag}`}
        description={translations.articlesRelatedToTag(tag)}
      >
        <div id='articles'>
          <header>
            <h1>
              {translations.tag}: {tag}
            </h1>
            <p>
              {articles.length}{' '}
              {articles.length === 1
                ? translations.article
                : translations.articles}{' '}
              {articles.length === 1
                ? translations.found
                : translations.foundPlural}
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
                        <strong>{translations.views}:</strong>{' '}
                        {article.slug ? viewCounts[article.slug] : '-'}
                      </div>
                    )}

                    <div>
                      <time dateTime={article.date}>
                        <strong>{translations.date}:</strong>{' '}
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
                        {article.readingTime === 1
                          ? translations.minute
                          : translations.minutes}{' '}
                        {translations.readingTime}
                      </span>
                    </div>

                    <div>
                      {article.lastModified &&
                        article.lastModified !== article.date && (
                          <span
                            title={
                              currentLocale === 'en'
                                ? 'Last modification'
                                : 'Última modificação'
                            }
                          >
                            <strong>{translations.lastUpdate}</strong>{' '}
                            {new Date(article.lastModified).toLocaleDateString(
                              currentLocale,
                              {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              }
                            )}
                          </span>
                        )}
                      {isDevelopment && <em> {translations.simulatedDev}</em>}
                    </div>

                    {article.tags.length > 0 && (
                      <div className='margin-top--sm'>
                        <strong>{translations.tags}:</strong>{' '}
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
                <p>{translations.noArticles}</p>
              </div>
            )}
          </section>
        </div>
      </Layout>
    </>
  );
};
