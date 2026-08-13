import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { ArrowBigDownDash } from 'lucide-react';
import AboutHeadline from '@site/i18n/pt-BR/about/headline.mdx';
import { AnimatedCount } from '@site/src/components/AnimatedCount';
import { Name } from '@site/src/components/Name';
import { Parallax } from '@site/src/components/Parallax';
import { dynamicImport } from '@site/src/helpers/dynamic-require';
import { anchors } from '@site/src/helpers/get-anchors';
import { socials } from '@site/src/helpers/get-socials';
import { useStats } from '@site/src/hooks/useStats';
import { cards } from '@site/src/legacy/helpers/get-cards';

export default (): ReactNode => {
  const { siteConfig, i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;
  const isPtBr = currentLocale === 'pt-BR';
  const Anchors = anchors(currentLocale);
  const Socials = socials(currentLocale);
  const Cards = cards(currentLocale);
  const stats = useStats();
  const AboutResume = dynamicImport(currentLocale, { 'pt-BR': AboutHeadline });

  return (
    <Layout
      title='Links'
      description='Minhas principais redes sociais e projetos'
    >
      <div id='links'>
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
              <Name>{siteConfig.title}</Name> {!isPtBr && '🇧🇷'}
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
            <h2>
              <ArrowBigDownDash /> Downloads
            </h2>
            <div className='badge'>
              <span>
                {isPtBr ? (
                  <>
                    Projetos <em>open source</em> autorais
                  </>
                ) : (
                  <>Authored open-source projects</>
                )}
              </span>
            </div>
            <div className='show counter'>
              <img src='/img/rocket.svg' alt='Plus' />{' '}
              <span>
                <AnimatedCount
                  value={stats?.downloadsPerYear.value ?? 0}
                  locale={currentLocale}
                />
              </span>{' '}
              {isPtBr ? 'nos últimos 365 dias' : 'in the last 365 days'} ✨
            </div>
            {Cards.map((Card, i) => (
              <Card key={`card:${i}`} />
            ))}
          </nav>
        </main>
      </div>
    </Layout>
  );
};
