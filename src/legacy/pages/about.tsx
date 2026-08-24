import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import AboutPage from '@site/i18n/pt-BR/about/page.mdx';
import { forLocale } from '@site/src/helpers/localized';

export default (): ReactNode => {
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;
  const About = forLocale(currentLocale, { 'pt-BR': AboutPage });
  const isPtBr = currentLocale === 'pt-BR';

  return (
    <Layout title='Sobre' description='Conheça um pouco sobre mim.'>
      <div id='about'>
        <main>
          <header>
            <h1>{isPtBr ? 'Sobre' : 'About'}</h1>
          </header>
          <nav>
            <About />
          </nav>
        </main>
      </div>
    </Layout>
  );
};
