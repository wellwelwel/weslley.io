import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import About from '@site/about/page.mdx';

export default (): ReactNode => {
  return (
    <Layout title='Sobre' description='Conheça um pouco sobre mim.'>
      <div id='about'>
        <main>
          <header>
            <h1>Sobre</h1>
            <img loading='lazy' src='/img/about.svg' alt='' />
          </header>
          <nav>
            <About />
          </nav>
        </main>
      </div>
    </Layout>
  );
};
