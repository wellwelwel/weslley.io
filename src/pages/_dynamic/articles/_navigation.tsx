import type { ArticleNavigation } from '../../../@types/article';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { MarkdownWithAdmonitions } from '@site/src/components/Articles/Articles';

type ArticleNavigationProps = {
  previous?: ArticleNavigation;
  next?: ArticleNavigation;
  route: string;
};

export const Navigation = ({
  previous,
  next,
  route,
}: ArticleNavigationProps) => {
  if (!previous && !next) return null;

  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;

  const translations = {
    previous: currentLocale === 'en' ? '← Previous' : '← Anterior',
    next: currentLocale === 'en' ? 'Next →' : 'Próximo →',
  };

  return (
    <>
      <hr />
      <nav className='article-navigation'>
        {previous ? (
          <Link to={`/${route}/${previous.slug}`}>
            <div className='nav-label'>{translations.previous}</div>
            {previous.social && (
              <div className='nav-image'>
                <img
                  src={previous.social}
                  alt={previous.title}
                  loading='lazy'
                  decoding='async'
                />
              </div>
            )}
            <div className='nav-content'>
              <div className='nav-title'>{previous.title}</div>
              {previous.description && (
                <div className='nav-description'>
                  <div className='description-text'>
                    <MarkdownWithAdmonitions content={previous.description} />
                  </div>
                  <div className='description-fade' />
                </div>
              )}
            </div>
          </Link>
        ) : (
          <div className='nav-spacer' />
        )}

        {next ? (
          <Link to={`/${route}/${next.slug}`}>
            <div className='nav-label next'>{translations.next}</div>
            {next.social && (
              <div className='nav-image'>
                <img
                  src={next.social}
                  alt={next.title}
                  loading='lazy'
                  decoding='async'
                />
              </div>
            )}
            <div className='nav-content'>
              <div className='nav-title next'>{next.title}</div>
              {next.description && (
                <div className='nav-description'>
                  <div className='description-text next'>
                    <MarkdownWithAdmonitions content={next.description} />
                  </div>
                  <div className='description-fade' />
                </div>
              )}
            </div>
          </Link>
        ) : (
          <div className='nav-spacer' />
        )}
      </nav>
    </>
  );
};
