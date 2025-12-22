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
    <span>{name}</span>
  </SafeLink>
);

export default () => {
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;
  const isPtBr = currentLocale === 'pt-BR';
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
      name: 'Universidade de São Paulo (USP)',
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
      name: 'The Developer Conference (TDC)',
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
    <Articles route='talks'>
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
