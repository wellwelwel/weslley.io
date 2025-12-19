import type { ArticleNavigation } from '../../../@types/article';
import Link from '@docusaurus/Link';
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

  return (
    <>
      <hr />
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          marginTop: '2rem',
        }}
      >
        {previous ? (
          <Link
            to={`/${route}/${previous.slug}`}
            style={{
              flex: '1',
              padding: '1rem',
              border: '1px solid var(--ifm-color-emphasis-300)',
              borderRadius: '8px',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--ifm-color-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor =
                'var(--ifm-color-emphasis-300)';
            }}
          >
            <div
              style={{
                fontSize: '0.85rem',
                opacity: 0.7,
              }}
            >
              ← Anterior
            </div>
            {previous.social && (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '56.25%',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={previous.social}
                  alt={previous.title}
                  loading='lazy'
                  decoding='async'
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            )}
            <div>
              <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                {previous.title}
              </div>
              {previous.description && (
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      fontSize: '0.9rem',
                      opacity: 0.8,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    <MarkdownWithAdmonitions content={previous.description} />
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '25px',
                      background:
                        'linear-gradient(to bottom, transparent, #ffffffdd)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              )}
            </div>
          </Link>
        ) : (
          <div style={{ flex: '1' }} />
        )}

        {next ? (
          <Link
            to={`/${route}/${next.slug}`}
            style={{
              flex: '1',
              padding: '1rem',
              border: '1px solid var(--ifm-color-emphasis-300)',
              borderRadius: '8px',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--ifm-color-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor =
                'var(--ifm-color-emphasis-300)';
            }}
          >
            <div
              style={{
                fontSize: '0.85rem',
                opacity: 0.7,
                textAlign: 'right',
              }}
            >
              Próximo →
            </div>
            {next.social && (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '56.25%',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={next.social}
                  alt={next.title}
                  loading='lazy'
                  decoding='async'
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            )}
            <div>
              <div
                style={{
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  textAlign: 'right',
                }}
              >
                {next.title}
              </div>
              {next.description && (
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      fontSize: '0.9rem',
                      opacity: 0.8,
                      textAlign: 'right',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    <MarkdownWithAdmonitions content={next.description} />
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '25px',
                      background:
                        'linear-gradient(to bottom, transparent, #ffffffdd)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              )}
            </div>
          </Link>
        ) : (
          <div style={{ flex: '1' }} />
        )}
      </nav>
    </>
  );
};
