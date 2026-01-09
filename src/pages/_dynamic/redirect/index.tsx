import type { ReactNode } from 'react';
import type { ProcessedRedirect } from '../../../@types/redirect';
import { useEffect } from 'react';
import Head from '@docusaurus/Head';
import { SafeLink } from '@site/src/components/SafeLink';

type RedirectProps = {
  data: ProcessedRedirect;
};

const Redirect = ({ data }: RedirectProps): ReactNode => {
  useEffect(() => {
    window.location.href = data.url;
  }, [data.url]);

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta property='og:title' content={data.title} />
        <meta property='og:image' content={data.socialUrl} />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:title' content={data.title} />
        <meta property='twitter:image' content={data.socialUrl} />
        <meta httpEquiv='refresh' content={`0; url=${data.url}`} />
      </Head>
      <img
        style={{
          margin: 20,
          maxWidth: 360,
          borderRadius: 10,
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.15)',
        }}
        src={data.socialUrl}
        loading='lazy'
        decoding='async'
      />
      <div
        style={{
          paddingInline: 20,
        }}
      >
        You'll be redirected to:
      </div>
      <div
        style={{
          zIndex: 4,
          paddingInline: 30,
        }}
      >
        <SafeLink to={data.url}>
          <strong>→ {data.url}</strong>
        </SafeLink>
      </div>
    </>
  );
};

export default Redirect;
