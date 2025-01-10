import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Card from '../components/Card';
import Name from '../components/Name';
import Parallax from '../components/Parallax';

export default (): ReactNode => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Links | ${siteConfig.title}`}
      description='Minhas principais redes sociais e projetos'
    >
      <div id='home'>
        <main>
          <header>
            <Parallax scale={1.1} tiltMaxAngleX={15} tiltMaxAngleY={15}>
              <img loading='lazy' src='/img/avatar.png' alt='Avatar' />
            </Parallax>
            <h1>
              <Name name={siteConfig.title} />
            </h1>
            <small>
              Open Sourcerer | End-to-End Developer
              <br />
              <Translate id='home.header.mysql'>
                MySQL2 Co-Maintainer
              </Translate>{' '}
              | Criador do{' '}
              <a
                href='https://poku.io/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Poku
              </a>{' '}
              ✨
            </small>
            <menu>
              <section>
                <Link to='/projects'>
                  Projetos <ArrowLeft />
                </Link>
                <Link to='/talks'>
                  <ArrowRight />
                  Palestras
                </Link>
              </section>
              <section>
                <Link to='/articles'>
                  Artigos <ArrowLeft />
                </Link>
                <Link to='/about'>
                  <ArrowRight />
                  Sobre
                </Link>
              </section>
            </menu>
          </header>
          <nav>
            <h2>
              <img src='/img/social.svg' alt='Ícone de Estrela' />
              Redes Sociais
            </h2>
            <Card
              name='LinkedIn'
              icon='linkedin'
              description='Dicas de programação, conquistas e conteúdos técnicos.'
              href='https://www.linkedin.com/in/wellwelwel/'
            />
            <Card
              name='GitHub'
              icon='github'
              description='Aqui você encontra projetos interessantes de verdade.'
              href='https://github.com/wellwelwel'
            />
            <Card
              name='Instagram'
              icon='instagram'
              description={
                <>
                  Um show aqui, um gato ali e do nada, conteúdos sobre{' '}
                  programação.
                </>
              }
              href='https://www.instagram.com/wellwelwel/'
            />
            <Card
              name='YouTube'
              icon='youtube'
              description={
                <>
                  🚧 <strong>WIP:</strong> Conteúdos educacionais e cursos
                  totalmente gratuitos.
                </>
              }
              href='https://www.youtube.com/@weslleyio'
            />
          </nav>
          <nav>
            <h2>
              <img src='/img/star.svg' alt='Ícone de Estrela' />
              Principais Projetos
            </h2>
            <Card
              name='Poku'
              icon='junior'
              description={
                <>
                  Um <em>test runner</em> que torna testes fáceis? Temos! Que
                  tal deixar uma <strong>estrela</strong> pro nosso porquinho
                  brasileiro? 🇧🇷
                </>
              }
              href='https://github.com/wellwelwel/poku'
            />
            <Card
              name='lru.min'
              icon='lru'
              description='Um dos caches baseados em LRU mais performáticos de todo o eco-sistema JavaScript.'
              href='https://www.npmjs.com/package/lru.min'
            />
            <Card
              name='⚡️ MySQL2'
              icon='mysql2'
              description='Cliente MySQL de alta performance mais baixado do eco-sistema JavaScript (Node.js, Deno e Bun).'
              href='https://github.com/sidorares/node-mysql2'
            />
            <small>
              <Link to='/projects'>
                Ver todos <ArrowRight />
              </Link>
            </small>
          </nav>
        </main>
      </div>
    </Layout>
  );
};
