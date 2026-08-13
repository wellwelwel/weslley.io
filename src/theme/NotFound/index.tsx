import type { ReactNode } from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import { PageMetadata } from '@docusaurus/theme-common';
import { ArrowLeft } from 'lucide-react';
import { Name } from '@site/src/components/Name';

type Digit = {
  value: string;
  delay: string;
};

const DIGITS: Digit[] = [
  { value: '4', delay: '' },
  { value: '0', delay: '[animation-delay:60ms]' },
  { value: '4', delay: '[animation-delay:120ms]' },
];

export default (): ReactNode => (
  <>
    <PageMetadata title='Página não encontrada' />

    <Head>
      <meta name='robots' content='noindex' />
      <body className='clean overscroll-none' />
    </Head>

    <div className='shaded flex h-dvh flex-col bg-paper p-5 antialiased max-sm:h-svh short:p-3 cramped:p-2'>
      <main className='flex min-h-0 flex-1 flex-col items-center justify-center gap-[clamp(1.5rem,5svh,3rem)] px-4 text-center'>
        <div className='min-w-0'>
          <p
            aria-hidden='true'
            className='m-0 font-featured text-[min(30vw,9rem,26svh)]/none font-[900] tracking-[-0.02em] text-ink select-none sm:font-[800]'
          >
            {DIGITS.map(({ value, delay }, index) => (
              <span
                key={`digit:${index}`}
                className={`inline-block animate-title ${delay}`}
              >
                <Name stroke>{value}</Name>
              </span>
            ))}
          </p>

          <h1 className='mt-[clamp(0.75rem,3svh,1.5rem)] mb-0 animate-slide text-2xl/tight font-extrabold tracking-[-0.01em] text-ink text-balance sm:text-4xl/tight'>
            Página não encontrada.
          </h1>

          <p className='mx-auto mt-[clamp(0.5rem,2svh,1rem)] mb-0 max-w-150 animate-slide text-base/normal font-semibold text-ink/70 text-pretty sm:text-lede'>
            O endereço pode ter mudado ou a página não existe mais.
          </p>
        </div>

        <Link
          to='/'
          className='group inline-flex h-11 animate-slide items-center gap-3.5 rounded-full bg-ink pr-6 pl-1.5 font-sans text-[0.9375rem] font-semibold text-paper no-underline shadow-[0_1px_2px_var(--shade-soft),0_4px_10px_-4px_var(--shade-deep)] transition-[background-color,box-shadow,scale] duration-750 ease-swift hover:bg-ink/90 hover:text-paper hover:no-underline hover:shadow-[0_1px_2px_var(--shade-soft),0_10px_18px_-8px_var(--shade-deep)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-98 max-sm:h-10 max-sm:gap-3 max-sm:pr-5 max-sm:text-sm'
        >
          <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-white max-sm:size-7'>
            <ArrowLeft
              aria-hidden='true'
              className='size-4 transition-transform duration-300 ease-swift group-hover:-translate-x-0.5'
            />
          </span>
          Voltar para o início
        </Link>
      </main>
    </div>
  </>
);
