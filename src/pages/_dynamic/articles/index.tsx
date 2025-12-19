import type { ArticlePageProps } from '../../../@types/article';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import MDXContent from '@theme/MDXContent';
import { Parallax } from '@site/src/components/Parallax';
import { isDevelopment } from '../../../../tools/environment';
import { SideProvider } from '../../../components/Side/context';
import { SideSelector } from '../../../components/Side/Selector';
import { Navigation } from './_navigation';
import { Reactions } from './_reactions';
import { SocialShare } from './_social-share';
import { Summary } from './_summary';

export default ({
  data,
  content: Content,
  social,
  previousSocial,
  nextSocial,
}: ArticlePageProps) => {
  const {
    route,
    title,
    slug,
    date,
    authorsData,
    tags,
    summary,
    readingTime,
    lastModified,
    description,
    previousArticle,
    nextArticle,
    sides,
  } = data;
  const { siteConfig, i18n } = useDocusaurusContext();
  const API = siteConfig.customFields?.COUNTTY_URL as string | undefined;
  const apiUrl = typeof API === 'string' ? API : undefined;
  const showViewsCounter = siteConfig.customFields?.showViewsCounter === true;
  const socialBanner = social ? `${siteConfig.url}${social}` : undefined;
  const articleUrl = `${siteConfig.url}/article/${slug}`;
  const authorName = authorsData?.[0]?.name ?? 'Autor';
  const { currentLocale } = i18n;

  return (
    <Layout title={title} description={description ?? undefined}>
      <Head>
        <meta property='og:title' content={title} />
        {description && (
          <meta property='og:description' content={description} />
        )}
        <meta property='og:type' content='article' />
        {socialBanner && <meta property='og:image' content={socialBanner} />}
        {socialBanner && <meta property='og:image:alt' content={title} />}
        {socialBanner && (
          <meta name='twitter:card' content='summary_large_image' />
        )}
        {socialBanner && <meta name='twitter:image' content={socialBanner} />}
        {socialBanner && <meta name='twitter:image:alt' content={title} />}
        <meta name='twitter:title' content={title} />
        {description && (
          <meta name='twitter:description' content={description} />
        )}
      </Head>
      <main className='container margin-vert--lg' style={{ width: 'unset' }}>
        <article
          style={{
            padding: 30,
            borderRadius: '15px',
            backgroundColor: '#fff',
            maxWidth: '1080px',
          }}
        >
          <header>
            <h1>{title}</h1>

            {showViewsCounter && (
              <div className='margin-bottom--sm'>
                <img
                  src={`${API}/badge?slug=${slug}&label=Visualizações&labelColor=70a1ff&color=273c75&logo=PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iI2ZmZmZmZiIgdmlld0JveD0iMCAwIDE2IDE2Ij48cGF0aCBkPSJNMTAuNSA4YTIuNSAyLjUgMCAxIDEtNSAwIDIuNSAyLjUgMCAwIDEgNSAwIi8+PHBhdGggZD0iTTAgOHMzLTUuNSA4LTUuNVMxNiA4IDE2IDhzLTMgNS41LTggNS41UzAgOCAwIDhtOCAzLjVhMy41IDMuNSAwIDEgMCAwLTcgMy41IDMuNSAwIDAgMCAwIDciLz48L3N2Zz4=`}
                  loading='lazy'
                  decoding='async'
                />
              </div>
            )}

            <div className='margin-bottom--md'>
              <time dateTime={date}>
                {new Date(date).toLocaleDateString(currentLocale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {' · '}
              <span>
                {readingTime} {readingTime === 1 ? 'minuto' : 'minutos'} de
                leitura
              </span>
              <div>
                {lastModified && lastModified !== date && (
                  <>
                    <span title='Última modificação'>
                      Última atualização em{' '}
                      <strong>
                        {new Date(lastModified).toLocaleDateString(
                          currentLocale,
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
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

            <div
              style={{
                transform: 'scale(0.75)',
                transformOrigin: 'left',
                marginTop: '-40px',
                marginBottom: '-15px',
              }}
            >
              <SocialShare url={articleUrl} title={title} author={authorName} />
            </div>

            <hr />

            {authorsData && authorsData.length > 0 && (
              <div className='margin-bottom--md'>
                {authorsData.map(({ image_url, name, socials, title, url }) => (
                  <div
                    key={name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <img
                      src={image_url}
                      alt={name}
                      loading='lazy'
                      decoding='async'
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ marginBottom: '0.25rem' }}>
                        <a
                          href={url}
                          target='_blank'
                          rel='noopener noreferrer'
                          style={{
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                          }}
                        >
                          {name}
                        </a>
                      </div>
                      <div
                        style={{
                          fontSize: '0.9rem',
                          marginBottom: '0.5rem',
                          opacity: 0.9,
                        }}
                      >
                        {title}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          gap: '0.5rem',
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
                              alt='LinkedIn'
                              src='/img/linkedin.svg'
                              loading='lazy'
                              decoding='async'
                              style={{ width: '24px', height: '24px' }}
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
                              decoding='async'
                              style={{ width: '24px', height: '24px' }}
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
                              decoding='async'
                              style={{ width: '24px', height: '24px' }}
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
                              decoding='async'
                              style={{ width: '24px', height: '24px' }}
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tags.length > 0 && (
              <div className='margin-bottom--md'>
                <strong>Tags:</strong>{' '}
                {tags.map((tag: string, index: number) => (
                  <span key={tag}>
                    {index > 0 && ' '}
                    <a href={`/${route}/tag/${tag.toLowerCase()}`}>
                      <code>{tag}</code>
                    </a>
                  </span>
                ))}
              </div>
            )}
          </header>

          <hr />

          {social && (
            <Parallax
              tiltMaxAngleX={0}
              perspective={1920}
              className='margin-bottom--md'
            >
              <img
                src={social}
                alt={title}
                loading='lazy'
                decoding='async'
                style={{ width: '100%' }}
              />
            </Parallax>
          )}

          <SideProvider>
            {sides && <SideSelector sides={sides} />}

            {summary && summary.length > 0 && (
              <>
                <hr />
                <Summary items={summary} />
                <hr />
              </>
            )}

            <MDXContent>
              <Content />
            </MDXContent>
          </SideProvider>

          <hr />
          <Reactions slug={slug} API={apiUrl} />
          <hr />

          <SocialShare url={articleUrl} title={title} author={authorName} />

          <Navigation
            route={route}
            previous={
              previousArticle
                ? { ...previousArticle, social: previousSocial }
                : undefined
            }
            next={
              nextArticle ? { ...nextArticle, social: nextSocial } : undefined
            }
          />
        </article>
      </main>
    </Layout>
  );
};
