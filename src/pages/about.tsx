import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { dynamicImport } from '@site/src/helpers/dynamic-require';
import { MDXImports } from '../helpers/get-contents';

export default (): ReactNode => {
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;
  const About = dynamicImport(currentLocale, MDXImports.AboutPage);
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
