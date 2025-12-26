import { useMemo } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { ChevronDown } from 'lucide-react';
import { Articles } from '@site/src/components/Articles/Articles';
import { SafeLink } from '@site/src/components/SafeLink';
import { setLabel, useStats } from '@site/src/components/Stats';

type Places = {
  name: string;
  src: string;
  url?: string;
  width?: number;
  translateY?: number;
};

const Place = ({ name, src, url, width, translateY }: Places) => (
  <SafeLink className='place' to={url}>
    <img
      alt={`Logotipo da ${name}`}
      decoding='async'
      src={src}
      style={{
        width: width ?? 150,
        transform: translateY ? `translateY(${translateY}px)` : undefined,
      }}
    />
  </SafeLink>
);

export default () => {
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;
  const isPtBr = currentLocale === 'pt-BR';
  const stats = useStats();
  const translations = useMemo(
    () => ({
      description: isPtBr
        ? 'Com mais de 200 milhões de downloads anuais em projetos autorais, sou autor e mantenedor de projetos críticos no ecossistema open source e levo ao palco experiências reais de sistemas usados em escala global.'
        : 'With over 200 million annual downloads across my own projects, I author and maintain critical open-source projects and bring to the stage real-world experiences from systems running at global scale.',
      header: isPtBr ? (
        <p>
          Com mais de{' '}
          <strong>
            <Link
              to='/mediakit/'
              title='Métrica dinâmica de downloads no npm nos últimos 365 dias, considerando apenas projetos autorais.'
              aria-label='Métrica dinâmica de downloads no npm nos últimos 365 dias, considerando apenas projetos autorais.'
            >
              {stats?.downloadsPerYear.value
                ? setLabel(stats.downloadsPerYear.value, 'pt-BR', 0)
                : '200 milhões'}{' '}
              de downloads
            </Link>
          </strong>{' '}
          anuais em projetos autorais, sou autor e mantenedor de projetos
          críticos no ecossistema <em>open source</em> e levo ao palco
          experiências reais de sistemas usados em escala global.
        </p>
      ) : (
        <p>
          With over{' '}
          <strong>
            <Link
              to='/mediakit/'
              title='Dynamic metric based on npm downloads in the last 365 days, considering only own projects.'
              aria-label='Dynamic metric based on npm downloads in the last 365 days, considering only own projects.'
            >
              {stats?.downloadsPerYear.value
                ? setLabel(stats.downloadsPerYear.value, 'en', 0)
                : '200 million'}{' '}
              downloads
            </Link>
          </strong>{' '}
          annually across my own projects, I author and maintain critical{' '}
          <em>open-source</em> projects and bring to the stage real-world
          experiences from systems running at global scale.
        </p>
      ),
      cta: isPtBr ? 'Me chame para o seu evento' : 'Call me for your event',
      mediakit: isPtBr ? 'Ver Media Kit' : 'See Media Kit',
    }),

    [isPtBr, stats]
  );

  const places: Places[] = [
    {
      name: 'GitHub',
      src: '/img/talk-places/github.png',
      url: 'https://github.com/',
      width: 125,
      translateY: 2.5,
    },
    {
      name: 'Codecon',
      src: '/img/talk-places/codecon.svg',
      url: 'https://codecon.dev/',
    },
    {
      name: 'Google Developer Groups',
      src: '/img/talk-places/google-developer-groups.svg',
      url: 'https://gdg.community.dev/',
      width: 250,
      translateY: 2.5,
    },
    {
      name: 'Roga DX',
      src: '/img/talk-places/roga-dx.svg',
      url: 'https://rogadx.com/',
      width: 125,
      translateY: 2.5,
    },
    {
      name: 'Universidade de São Paulo',
      src: '/img/talk-places/usp.png',
      url: 'https://www5.usp.br/',
      width: 75,
      translateY: 2.5,
    },
    {
      name: 'Oracle',
      src: '/img/talk-places/oracle.png',
      url: 'https://www.oracle.com/',
      width: 125,
      translateY: 2.5,
    },
    {
      name: 'The Developer Conference',
      src: '/img/talk-places/tdc.png',
      url: 'https://thedevconf.com/',
      width: 160,
    },
    {
      name: 'Microsoft Reactor',
      src: '/img/talk-places/microsoft-reactor.png',
      url: 'https://developer.microsoft.com/reactor/',
      width: 140,
    },
  ];

  const PlaceSet = ({ suffix }: { suffix: string }) => (
    <div className='places-set'>
      {places.map((place, index) => (
        <Place key={`${suffix}-${index}`} {...place} />
      ))}
    </div>
  );

  return (
    <Articles route='talks' description={translations.description}>
      <header>
        <small>
          {translations.header}
          <div className='group'>
            <SafeLink
              className='cta'
              to='https://www.linkedin.com/in/wellwelwel/'
            >
              <span className='btn-content'>{translations.cta}</span>
              <span className='btn-dropdown'>
                <img src='/img/linkedin2.svg' />
              </span>
            </SafeLink>
            <Link className='common' to='/mediakit'>
              {translations.mediakit} <img src='/img/rock.svg' />
            </Link>
          </div>
        </small>
      </header>
      <div className='places'>
        <div className='places-track'>
          <PlaceSet suffix='a' />
          <PlaceSet suffix='b' />
        </div>
      </div>
      <footer>
        {isPtBr ? 'E mais' : 'And more'} <ChevronDown width={20} height={20} />
      </footer>
    </Articles>
  );
};
