import { useMemo } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { ChevronDown } from 'lucide-react';
import { Articles } from '@site/src/components/Articles/Articles';
import { SafeLink } from '@site/src/components/SafeLink';

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
  const translations = useMemo(
    () => ({
      description: isPtBr
        ? 'Como autor e mantenedor de projetos críticos no ecossistema open source, somando mais de 200 milhões de downloads por ano, levo ao palco experiências reais de sistemas usados em escala global.'
        : 'As the author and maintainer of critical projects in the open source ecosystem, with more than 200 million downloads a year, I bring to the stage real experiences of software used on a global scale.',
      header: isPtBr ? (
        <p>
          Como autor e mantenedor de projetos críticos no ecossistema{' '}
          <em>open source</em>, somando mais de{' '}
          <strong>200 milhões de downloads</strong> por ano, levo ao palco
          experiências reais de sistemas usados em escala global.
        </p>
      ) : (
        <p>
          As the author and maintainer of critical projects in the{' '}
          <em>open source</em> ecosystem, with more than{' '}
          <strong>200 million downloads</strong> a year, I bring to the stage
          real experiences of software used on a global scale.
        </p>
      ),
      cta: isPtBr ? 'Me chame para o seu evento' : 'Call me for your event',
      mediakit: isPtBr ? 'Ver Media Kit' : 'See Media Kit',
    }),

    [isPtBr]
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
        {isPtBr ? 'E mais' : 'And more'} <ChevronDown />
      </footer>
    </Articles>
  );
};
