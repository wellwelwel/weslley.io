import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { Name } from '@site/src/components/Name';
import { Parallax } from '@site/src/components/Parallax';
import {
  anchors,
  cards,
  MDXImports,
  socials,
} from '@site/src/helpers/get-contents';
import { dynamicImport } from '../helpers/dynamic-require';
import '@site/src/css/pages/home.scss';

export default (): ReactNode => {
  const { siteConfig, i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;
  const isPtBr = currentLocale === 'pt-BR';
  const Anchors = anchors(currentLocale);
  const Socials = socials(currentLocale);
  const Cards = cards(currentLocale);
  const AboutResume = dynamicImport(currentLocale, MDXImports.AboutResume);

  return (
    <Layout
      title='Links'
      description='Minhas principais redes sociais e projetos'
    >
      <div id='home'>
        <main>
          <header>
            <Parallax scale={1.1} tiltMaxAngleX={5} tiltMaxAngleY={5}>
              <img
                className='secondary'
                loading='lazy'
                decoding='async'
                src='/img/1738374865030.jpeg'
                alt='Photo'
              />
              <img
                className='main'
                loading='eager'
                src='/img/avatar.png'
                alt='Avatar'
              />
            </Parallax>
            <h1>
              <Name name={siteConfig.title} /> {!isPtBr && '🇧🇷'}
            </h1>
            <small>
              <AboutResume />
            </small>
            <nav>
              {Socials.map((Social, i) => (
                <Social key={`card:${i}`} />
              ))}
            </nav>
            <menu>
              <section>
                {Anchors.map((Anchor, i) => (
                  <Anchor key={`anchor:${i}`} />
                ))}
              </section>
            </menu>
          </header>
          <nav>
            {Cards.map((Card, i) => (
              <Card key={`card:${i}`} />
            ))}
          </nav>
        </main>
      </div>
    </Layout>
  );
};
