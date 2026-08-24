import type { ReactNode } from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { slides } from '@site/src/components/Home/catalog';
import { srcset } from '@site/src/components/Picture';
import interLatin from '@site/src/fonts/inter-latin.woff2';
import noto800 from '@site/src/fonts/noto-sans-latin-800.woff2';
import noto900 from '@site/src/fonts/noto-sans-latin-900.woff2';

const MEDIA = {
  narrow: '(max-width: 39.9375rem)',
  wide: '(min-width: 40rem)',
};

const DESCRIPTION =
  'Microsoft MVP e Anthropic CVP, Weslley Araújo mantém o MySQL2 e criou o Poku e o Lagune, impactando milhões de desenvolvedores através do open source.';

const opening = slides[0].texture;

const grain = opening && srcset(opening, 'avif');

export const Preloads = (): ReactNode => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Head>
      <title>{siteConfig.title}</title>
      <meta name='description' content={DESCRIPTION} />
      <body className='clean overscroll-none' />
      <link
        rel='preload'
        as='font'
        type='font/woff2'
        href={interLatin}
        crossOrigin='anonymous'
      />
      <link
        rel='preload'
        as='font'
        type='font/woff2'
        href={noto900}
        media={MEDIA.narrow}
        crossOrigin='anonymous'
      />
      <link
        rel='preload'
        as='font'
        type='font/woff2'
        href={noto800}
        media={MEDIA.wide}
        crossOrigin='anonymous'
      />
      {grain && (
        <link
          rel='preload'
          as='image'
          type='image/avif'
          imageSrcSet={grain}
          imageSizes='100vw'
          media={MEDIA.wide}
          fetchPriority='high'
        />
      )}
    </Head>
  );
};
