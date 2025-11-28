import '@site/src/css/pages/about.scss';
import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Admonition from '@theme/Admonition';
import Layout from '@theme/Layout';
import MediaKit from '@site/content/about/mediakit.mdx';

export default (): ReactNode => {
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale as 'en' | 'pt-BR';
  const isPtBr = currentLocale === 'pt-BR';

  return (
    <Layout title='Media Kit' description='Conheça um pouco sobre meu impacto.'>
      <div id='mediakit'>
        <main>
          <header>
            <h1>Let's Collab 🤘🏻</h1>
            <img
              loading='lazy'
              decoding='async'
              src='/img/mediakit.svg'
              alt=''
            />
          </header>
          <nav>
            {!isPtBr && (
              <>
                <Admonition type='info'>
                  Available in Portuguese only 🇧🇷
                </Admonition>
                <hr />
              </>
            )}
            <MediaKit />
          </nav>
        </main>
      </div>
    </Layout>
  );
};
