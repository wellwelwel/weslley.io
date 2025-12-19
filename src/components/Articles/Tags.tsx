import type { ArticlesOptions } from '@site/src/helpers/get-social';
import type { ProcessedArticle } from '../../@types/article';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import '@site/src/css/pages/articles.scss';

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
      <div id='articles'>
        <header>
          <h1>Tags</h1>
          <p>Todas as tags utilizadas nos artigos do blog.</p>
        </header>

        <section className='row'>
          {sortedTags.map(([tag, count]) => (
            <div key={tag} className='col'>
              <Link to={`/${route}/tag/${tag.toLowerCase()}`} className='card'>
                <div className='card__body'>
                  <h3>{tag}</h3>
                  <p>
                    {count} {count === 1 ? 'artigo' : 'artigos'}
                  </p>
                </div>
              </Link>
            </div>
          ))}

          {sortedTags.length === 0 && (
            <div className='empty-state'>
              <p>Nenhuma tag encontrada.</p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};
