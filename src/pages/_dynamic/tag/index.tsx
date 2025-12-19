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
      if (!article.slug) continue;

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
        <main
          className='container margin-vert--lg'
          style={{ maxWidth: '780px' }}
        >
          <h1>Tag: {tag}</h1>
          <p>
            {articles.length} {articles.length === 1 ? 'artigo' : 'artigos'}{' '}
            {articles.length === 1 ? 'encontrado' : 'encontrados'}
          </p>

          <div className='row'>
            {articles.map((article) => (
              <div key={article.slug} className='col col--12 margin-bottom--lg'>
                <article className='card'>
                  <div className='card__body'>
                    {getSocialImage({
                      article,
                      route,
                      currentLocale,
                      imageMap,
                    }) && (
                      <div
                        style={{
                          backgroundColor: '#f0f0f0',
                          borderRadius: '8px',
                          marginBottom: '1rem',
                          overflow: 'hidden',
                        }}
                      >
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
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    )}

                    <h2>
                      <Link to={`/${route}/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>

                    {article.description && (
                      <div style={{ color: '#666' }}>
                        <MarkdownWithAdmonitions
                          content={article.description}
                        />
                      </div>
                    )}
                  </div>

                  <div className='card__footer'>
                    <div>
                      Visualizações:{' '}
                      {article.slug ? viewCounts[article.slug] : '-'}
                    </div>
                    <div className='margin-bottom--sm'>
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
                            <>
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
                            </>
                          )}
                        {isDevelopment && (
                          <em style={{ fontSize: '0.85em', opacity: 0.7 }}>
                            {' '}
                            (Simulado durante o desenvolvimento)
                          </em>
                        )}
                      </div>
                    </div>

                    {article.authorsData && article.authorsData.length > 0 && (
                      <div className='margin-bottom--sm'>
                        {article.authorsData.map(
                          ({ image_url, name, socials, title, url }) => (
                            <div
                              key={name}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                marginBottom: '0.75rem',
                              }}
                            >
                              <img
                                src={image_url}
                                alt={name}
                                loading='lazy'
                                style={{
                                  width: '48px',
                                  height: '48px',
                                  borderRadius: '50%',
                                  flexShrink: 0,
                                }}
                              />
                              <div style={{ flex: 1 }}>
                                <div style={{ marginBottom: '0.125rem' }}>
                                  <a
                                    href={url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    style={{
                                      fontSize: '0.95rem',
                                      fontWeight: 'bold',
                                      textDecoration: 'none',
                                    }}
                                  >
                                    {name}
                                  </a>
                                </div>
                                <div
                                  style={{
                                    fontSize: '0.8rem',
                                    marginBottom: '0.25rem',
                                    opacity: 0.85,
                                  }}
                                >
                                  {title}
                                </div>
                                <div
                                  style={{
                                    display: 'flex',
                                    gap: '0.375rem',
                                  }}
                                >
                                  {socials.linkedin && (
                                    <a
                                      href={`https://linkedin.com/in/${socials.linkedin}`}
                                      target='_blank'
                                      rel='noopener noreferrer'
                                      title='LinkedIn'
                                    >
                                      <img
                                        src='/img/linkedin.svg'
                                        alt='LinkedIn'
                                        loading='lazy'
                                        style={{
                                          width: '18px',
                                          height: '18px',
                                        }}
                                      />
                                    </a>
                                  )}
                                  {socials.github && (
                                    <a
                                      href={`https://github.com/${socials.github}`}
                                      target='_blank'
                                      rel='noopener noreferrer'
                                      title='GitHub'
                                    >
                                      <img
                                        src='/img/github.svg'
                                        alt='GitHub'
                                        loading='lazy'
                                        style={{
                                          width: '18px',
                                          height: '18px',
                                        }}
                                      />
                                    </a>
                                  )}
                                  {socials.instagram && (
                                    <a
                                      href={`https://instagram.com/${socials.instagram}`}
                                      target='_blank'
                                      rel='noopener noreferrer'
                                      title='Instagram'
                                    >
                                      <img
                                        src='/img/instagram.svg'
                                        alt='Instagram'
                                        loading='lazy'
                                        style={{
                                          width: '18px',
                                          height: '18px',
                                        }}
                                      />
                                    </a>
                                  )}
                                  {socials.youtube && (
                                    <a
                                      href={`https://youtube.com/@${socials.youtube}`}
                                      target='_blank'
                                      rel='noopener noreferrer'
                                      title='YouTube'
                                    >
                                      <img
                                        src='/img/youtube.svg'
                                        alt='YouTube'
                                        loading='lazy'
                                        style={{
                                          width: '18px',
                                          height: '18px',
                                        }}
                                      />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}

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
          </div>

          {articles.length === 0 && <p>Nenhum artigo encontrado.</p>}
        </main>
      </Layout>
    </>
  );
};
