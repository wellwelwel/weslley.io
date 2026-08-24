import type { ArticleNavigation } from '@site/src/@types/article';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { MarkdownWithAdmonitions } from '@site/src/components/Articles/Admonition';
import { stripLinks } from '@site/src/helpers/strip-links';

type NavigationOptions = {
  previous?: ArticleNavigation;
  next?: ArticleNavigation;
  route: string;
};

export const Navigation = ({ previous, next, route }: NavigationOptions) => {
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;

  if (!previous && !next) return null;

  const translations = {
    previous: currentLocale === 'en' ? '← Previous' : '← Anterior',
    next: currentLocale === 'en' ? 'Next →' : 'Próximo →',
  };

  return (
    <>
      <hr />
      <nav className='article-navigation'>
        {previous ? (
          <Link to={`/${route}/${previous.path}`}>
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
                    <MarkdownWithAdmonitions
                      content={stripLinks(previous.description)}
                    />
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
          <Link to={`/${route}/${next.path}`}>
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
                    <MarkdownWithAdmonitions
                      content={stripLinks(next.description)}
                    />
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
