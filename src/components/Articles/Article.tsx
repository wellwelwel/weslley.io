import type { ProcessedArticle } from '@site/src/@types/article';
import type { FC } from 'react';
import { useRef } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Parallax } from '@site/src/components/Parallax';
import {
  ArticlesOptions,
  createImagesContext,
  getSocialImage,
} from '@site/src/helpers/get-social';
import { useScroll } from '@site/src/hooks/useScroll';
import { isDevelopment } from '@site/tools/environment';
import { MarkdownWithAdmonitions } from './Admonition';

export const Article: FC<{
  article: ProcessedArticle;
  route: ArticlesOptions['route'];
  viewCounts: Record<string, string>;
  showViewsCounter: boolean;
}> = ({ article, route, viewCounts, showViewsCounter }) => {
  const { i18n } = useDocusaurusContext();
  const ref = useRef<HTMLDivElement>(null);
  const imageMap: Record<string, string> = Object.create(null);
  const currentLocale = i18n.currentLocale;
  const imagesContext = createImagesContext();

  useScroll(ref, (isVisible, target) => {
    if (!isVisible) return;

    target.classList.add('show');
  });

  if (imagesContext) {
    imagesContext.keys().forEach((key) => {
      if (key.includes(`/${currentLocale}/${route}/`))
        imageMap[key] = imagesContext(key).default;
    });
  }

  return (
    <div ref={ref} className='margin-bottom--lg hide'>
      <article className='card' style={{ maxWidth: '780px' }}>
        <div className='card__body'>
          {getSocialImage({ article, route, currentLocale, imageMap }) && (
            <Link to={`/${route}/${article.slug}`}>
              <Parallax
                tiltMaxAngleX={0}
                perspective={1920}
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
                  decoding='async'
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Parallax>
            </Link>
          )}

          <h2>
            <Link to={`/${route}/${article.slug}`}>{article.title}</Link>
          </h2>

          {article.description && (
            <div style={{ color: '#666' }}>
              <MarkdownWithAdmonitions content={article.description} />
            </div>
          )}
        </div>

        <div className='card__footer'>
          {showViewsCounter && (
            <div>
              Visualizações: {article.slug ? viewCounts[article.slug] : '-'}
            </div>
          )}
          <div className='margin-bottom--sm'>
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString(currentLocale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {' · '}
            <span>
              {article.readingTime}{' '}
              {article.readingTime === 1 ? 'minuto' : 'minutos'} de leitura
            </span>
            <div>
              {article.lastModified &&
                article.lastModified !== article.date && (
                  <>
                    <span title='Última modificação'>
                      Última atualização em{' '}
                      <strong>
                        {new Date(article.lastModified).toLocaleDateString(
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

          {article.tags.length > 0 && (
            <div>
              <strong>Tags:</strong>{' '}
              {article.tags.map((tag, index) => (
                <span key={tag}>
                  {index > 0 && ' '}
                  <Link to={`/${route}/tag/${tag.toLowerCase()}`}>
                    <code>{tag}</code>
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
