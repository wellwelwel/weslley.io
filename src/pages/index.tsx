import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';
import { Name } from '@site/src/components/Name';
import { Parallax } from '@site/src/components/Parallax';
import AboutResume from '@site/content/about/headline.mdx';
import { anchors, cards, socials } from '@site/src/helpers/get-contents';

export default (): ReactNode => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title='Links'
      description='Minhas principais redes sociais e projetos'
    >
      <div id='home'>
        <main>
          <header>
            <Parallax scale={1.1} tiltMaxAngleX={15} tiltMaxAngleY={15}>
              <img loading='eager' src='/img/avatar.png' alt='Avatar' />
            </Parallax>
            <h1>
              <Name name={siteConfig.title} />
            </h1>
            <small>
              <AboutResume />
            </small>
            <nav>
              {socials.map((Social, i) => (
                <Social key={`card:${i}`} />
              ))}
            </nav>
            <menu>
              <section>
                {anchors.map((Anchor, i) => (
                  <Anchor key={`anchor:${i}`} />
                ))}
              </section>
            </menu>
          </header>
          <nav>
            <h2>
              <img loading='lazy' src='/img/star.svg' alt='Ícone de Estrela' />
              Destaques
            </h2>
            {cards.map((Card, i) => (
              <Card key={`card:${i}`} />
            ))}
            <small>
              <Link to='/projects'>
                Ver mais <ArrowRight />
              </Link>
            </small>
          </nav>
        </main>
      </div>
    </Layout>
  );
};
