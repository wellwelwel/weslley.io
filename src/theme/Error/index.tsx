import type { ReactNode } from 'react';
import Head from '@docusaurus/Head';

type PageErrorOptions = {
  error: Error;
  tryAgain: () => void;
};

const causes = (error: Error): Error[] =>
  error.cause instanceof Error ? [error, ...causes(error.cause)] : [error];

/* Replaces the core fallback, whose static Layout import chains the whole
   theme into every page's entry bundle. The crash screen renders bare. */
export default function PageError({
  error,
  tryAgain,
}: PageErrorOptions): ReactNode {
  return (
    <>
      <Head>
        <title>Page Error</title>
      </Head>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          minHeight: '100vh',
          width: '100%',
          maxWidth: '80ch',
          fontSize: '20px',
          margin: '0 auto',
          padding: '1rem',
        }}
      >
        <h1 style={{ fontSize: '3rem' }}>This page crashed</h1>
        <button
          type='button'
          onClick={tryAgain}
          style={{
            margin: '1rem 0',
            fontSize: '2rem',
            cursor: 'pointer',
            borderRadius: 20,
            padding: '1rem',
          }}
        >
          Try again
        </button>
        <p style={{ whiteSpace: 'pre-wrap' }}>
          {causes(error)
            .map((cause) => cause.message)
            .join('\n\nCause:\n')}
        </p>
      </div>
    </>
  );
}
