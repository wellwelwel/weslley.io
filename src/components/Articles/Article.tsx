import type { ArticleListing, ArticlesOptions } from '@site/src/@types/article';
import type { ViewMode } from '@site/src/hooks/useViewMode';
import type { FC } from 'react';
import { useRef } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { MarkdownWithAdmonitions } from '@site/src/components/Articles/Admonition';
import { Parallax } from '@site/src/components/Parallax';
import {
  createImagesContext,
  getSocialImage,
} from '@site/src/helpers/article-image';
import { isDevelopment } from '@site/src/helpers/environment';
import { localeDate } from '@site/src/helpers/format-date';
import { useScroll } from '@site/src/hooks/useScroll';

export const Article: FC<{
  article: ArticleListing;
  route: ArticlesOptions['route'];
  viewMode?: ViewMode;
}> = ({ article, route, viewMode = 'card' }) => {
  const { i18n } = useDocusaurusContext();
  const ref = useRef<HTMLDivElement>(null);
  const imageMap: Record<string, string> = Object.create(null);
  const currentLocale = i18n.currentLocale;
  const imagesContext = createImagesContext();
  const datetime = article.date.includes('T')
    ? article.date
    : `${article.date}T00:00`;

  const translations = {
    date: currentLocale === 'en' ? 'Date' : 'Data',
    minute: currentLocale === 'en' ? 'minute' : 'minuto',
    minutes: currentLocale === 'en' ? 'minutes' : 'minutos',
    readingTime: currentLocale === 'en' ? 'reading time' : 'de leitura',
    lastUpdate:
      currentLocale === 'en' ? 'Last updated:' : 'Última atualização:',
    simulatedDev:
      currentLocale === 'en'
        ? '(Simulated during development)'
        : '(Simulado durante o desenvolvimento)',
    tags: currentLocale === 'en' ? 'Tags' : 'Tags',
  };

  useScroll(
    ref,
    (isVisible, target) => {
      if (!isVisible) return;

      target.classList.add('show');
    },
    {
      deps: [viewMode],
      onReset: (target) => {
        target.classList.remove('show');
      },
    }
  );

  if (imagesContext) {
    imagesContext.keys().forEach((key) => {
      if (key.includes(`/${currentLocale}/${route}/`))
        imageMap[key] = imagesContext(key).default;
    });
  }

  return (
    <div
      ref={ref}
      className={`article-item ${viewMode === 'list' ? 'list-mode' : ''}`}
      style={
        typeof article.order === 'number'
          ? ({ order: article.order } satisfies React.CSSProperties)
          : undefined
      }
    >
      <article className='card'>
        <div className='card__body'>
          {getSocialImage({ article, route, currentLocale, imageMap }) && (
            <Link to={`/${route}/${article.path}`}>
              {viewMode === 'list' ? (
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
                  decoding='async'
                  className='list-thumbnail'
                />
              ) : (
                <Parallax
                  tiltMaxAngleX={0}
                  perspective={1920}
                  className='parallax-container'
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
                    decoding='async'
                  />
                </Parallax>
              )}
            </Link>
          )}

          <div className='content-wrapper'>
            <h2>
              <Link to={`/${route}/${article.path}`}>{article.title}</Link>
            </h2>

            {viewMode === 'card' && article.description && (
              <div>
                <MarkdownWithAdmonitions content={article.description} />
              </div>
            )}
          </div>
        </div>

        <div className='card__footer'>
          <div>
            <time dateTime={datetime}>
              <strong>{translations.date}:</strong>{' '}
              {localeDate(datetime, currentLocale)}
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

          {viewMode === 'card' && (
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
                    {localeDate(article.lastModified, currentLocale)}
                  </span>
                )}
              {isDevelopment && <em> {translations.simulatedDev}</em>}
            </div>
          )}

          {article.tags.length > 0 && (
            <div
              className={viewMode === 'card' ? 'tags margin-top--sm' : 'tags'}
            >
              <strong>{translations.tags}:</strong>{' '}
              {article.tags.map((tag, index) => (
                <span key={tag}>
                  {index > 0 && ' '}
                  <Link to={`/${route}/tag/${tag.toLowerCase()}`}>
                    <code className='tag'>{tag}</code>
                  </Link>
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
};
