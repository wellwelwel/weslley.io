import type { ArticlePageProps } from '../../../@types/article';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import MDXContent from '@theme/MDXContent';
import { Parallax } from '@site/src/components/Parallax';
import { SafeLink } from '@site/src/components/SafeLink';
import { stripMarkdown } from '@site/src/helpers/strip-markdown';
import { isDevelopment } from '../../../../tools/environment';
import { SideProvider } from '../../../components/Side/context';
import { SideSelector } from '../../../components/Side/Selector';
import { Navigation } from './_navigation';
import { SocialShare } from './_social-share';
import { Summary } from './_summary';
import '@site/src/css/pages/article-page.scss';

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
  const showViewsCounter = siteConfig.customFields?.showViewsCounter === true;
  const socialBanner = social ? `${siteConfig.url}${social}` : undefined;
  const articleUrl = `${siteConfig.url}/${route}/${slug}`;
  const { currentLocale } = i18n;
  const datetime = date.includes('T') ? date : `${date}T00:00`;
  const authorName =
    authorsData?.[0]?.name ?? (currentLocale === 'en' ? 'Author' : 'Autor');
  const normalizedDescription = description
    ? stripMarkdown(description)
    : undefined;

  const translations = {
    views: currentLocale === 'en' ? 'Article Views' : 'Visualizações do Artigo',
    minute: currentLocale === 'en' ? 'minute' : 'minuto',
    minutes: currentLocale === 'en' ? 'minutes' : 'minutos',
    readingTime: currentLocale === 'en' ? 'reading time' : 'de leitura',
    lastUpdate:
      currentLocale === 'en' ? 'Last updated on' : 'Última atualização em',
    lastModification:
      currentLocale === 'en' ? 'Last modification' : 'Última modificação',
    simulatedDev:
      currentLocale === 'en'
        ? '(Simulated during development)'
        : '(Simulado durante o desenvolvimento)',
    tags: currentLocale === 'en' ? 'Tags' : 'Tags',
  };

  return (
    <Layout title={title} description={normalizedDescription ?? undefined}>
      <Head>
        <meta property='og:title' content={title} />
        <meta property='og:type' content='article' />
        {socialBanner && <meta property='og:image' content={socialBanner} />}
        {socialBanner && <meta property='og:image:alt' content={title} />}
        {socialBanner && (
          <meta name='twitter:card' content='summary_large_image' />
        )}
        {socialBanner && <meta name='twitter:image' content={socialBanner} />}
        {socialBanner && <meta name='twitter:image:alt' content={title} />}
        <meta name='twitter:title' content={title} />
        {normalizedDescription && (
          <meta name='twitter:description' content={normalizedDescription} />
        )}
      </Head>
      <div id='article-page'>
        <article>
          <header>
            <h1>{title}</h1>

            <div className='metadata'>
              <time dateTime={datetime}>
                {new Date(datetime).toLocaleDateString(currentLocale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {' · '}
              <span>
                {readingTime}{' '}
                {readingTime === 1 ? translations.minute : translations.minutes}{' '}
                {translations.readingTime}
              </span>
              <div>
                {lastModified && lastModified !== date && (
                  <span title={translations.lastModification}>
                    {translations.lastUpdate}{' '}
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
                )}
                {isDevelopment && <em> {translations.simulatedDev}</em>}
              </div>
            </div>

            {authorsData && authorsData.length > 0 && (
              <div className='authors'>
                {authorsData.map(({ image_url, name, socials, title, url }) => (
                  <div key={name} className='author'>
                    <img
                      src={image_url}
                      alt={name}
                      loading='lazy'
                      decoding='async'
                    />
                    <div className='author-info'>
                      <div className='author-name'>
                        <a href={url} target='_blank' rel='noopener noreferrer'>
                          {name}
                        </a>
                      </div>
                      <div className='author-title'>{title}</div>
                      <div className='author-socials'>
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
              <div className='tags'>
                <strong>{translations.tags}:</strong>{' '}
                {tags.map((tag: string, index: number) => (
                  <span key={tag}>
                    {index > 0 && ' '}
                    <Link to={`/${route}/tag/${tag.toLowerCase()}`}>
                      <code>{tag}</code>
                    </Link>
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
              className='article-image'
            >
              <img src={social} alt={title} loading='lazy' decoding='async' />
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

          {showViewsCounter && (
            <SafeLink
              to='https://github.com/wellwelwel/countty'
              className='views-counter'
            >
              <img
                src={`${API}/badge?slug=${slug}&label=${encodeURIComponent(translations.views)}&labelColor=70a1ff&color=273c75&logo=PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iI2ZmZmZmZiIgdmlld0JveD0iMCAwIDE2IDE2Ij48cGF0aCBkPSJNMTAuNSA4YTIuNSAyLjUgMCAxIDEtNSAwIDIuNSAyLjUgMCAwIDEgNSAwIi8+PHBhdGggZD0iTTAgOHMzLTUuNSA4LTUuNVMxNiA4IDE2IDhzLTMgNS41LTggNS41UzAgOCAwIDhtOCAzLjVhMy41IDMuNSAwIDEgMCAwLTcgMy41IDMuNSAwIDAgMCAwIDciLz48L3N2Zz4=`}
              />
            </SafeLink>
          )}

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
      </div>
    </Layout>
  );
};
