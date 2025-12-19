import type { ProcessedArticle } from '../../@types/article';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { ArticlesOptions } from './Article';

export const Tags = ({ route }: ArticlesOptions) => {
  const { globalData, i18n } = useDocusaurusContext();
  const articles =
    (globalData[`mount-${route}`] as { default: ProcessedArticle[] })
      ?.default || [];

  const tagCounts: Record<string, number> = Object.create(null);

  for (const article of articles)
    for (const tag of article.tags) tagCounts[tag] = (tagCounts[tag] || 0) + 1;

  const sortedTags = Object.entries(tagCounts).sort(([tagA], [tagB]) =>
    tagA.localeCompare(tagB, i18n.currentLocale)
  );

  return (
    <Layout title='Tags' description='Todas as tags do blog'>
      <main className='container margin-vert--lg'>
        <h1>Tags</h1>
        <p>Todas as tags utilizadas nos artigos do blog.</p>

        <div className='row'>
          {sortedTags.map(([tag, count]) => (
            <div key={tag} className='col col--3 margin-bottom--md'>
              <Link
                to={`/${route}/tag/${tag.toLowerCase()}`}
                className='card'
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  height: '100%',
                }}
              >
                <div className='card__body'>
                  <h3 style={{ marginBottom: '0.5rem' }}>{tag}</h3>
                  <p style={{ margin: 0, opacity: 0.8 }}>
                    {count} {count === 1 ? 'artigo' : 'artigos'}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {sortedTags.length === 0 && <p>Nenhuma tag encontrada.</p>}
      </main>
    </Layout>
  );
};
