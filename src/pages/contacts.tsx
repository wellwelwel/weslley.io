import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default (): ReactNode => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Contatos | ${siteConfig.title}`}
      description='Formas de falar comigo sem sinal de fumaça.'
    >
      <div id='contacts'>
        <main>
          <header>
            <h1>Contatos</h1>
            <img src='/img/contacts.svg' alt='' />
          </header>
          <nav>
            <section>
              <h2>Onde mais estou ativo</h2>
              <p>
                🙋🏻‍♂️ Para assuntos gerais, dicas e dúvidas sobre programação,
                etc., fique à vontade para se conectar comigo no{' '}
                <Link
                  target='_blank'
                  rel='noopener noreferrer'
                  to='https://www.linkedin.com/in/wellwelwel/'
                >
                  LinkedIn
                </Link>{' '}
                e me chamar.
              </p>
            </section>
            <section>
              <h2>Bate Papo</h2>
              <p>
                🫰🏻 Quer conversar sobre algo casual? Me chama no{' '}
                <Link
                  target='_blank'
                  rel='noopener noreferrer'
                  to='https://www.instagram.com/wellwelwel/'
                >
                  Instagram
                </Link>
                . Eu respondo de verdade.
              </p>
            </section>
            <section>
              <h2>Bugs</h2>
              <p>
                🐞 Encontrou algum problema ou dúvida sobre um dos projetos que
                eu mantenho? Basta abrir um <em>Issue</em> lá que eu respondo.
              </p>
            </section>
            <section>
              <h2>Contato Profissional</h2>
              <p>
                👔 Me chame no{' '}
                <Link
                  target='_blank'
                  rel='noopener noreferrer'
                  to='https://www.linkedin.com/in/wellwelwel/'
                >
                  LinkedIn
                </Link>{' '}
                ou no{' '}
                <Link
                  target='_blank'
                  rel='noopener noreferrer'
                  to='https://www.instagram.com/wellwelwel/'
                >
                  Instagram
                </Link>{' '}
                com um resuminho e, se a gente estiver alinhados, eu te envio
                meu e-mail ou número de celular.
              </p>
            </section>
          </nav>
        </main>
      </div>
    </Layout>
  );
};
