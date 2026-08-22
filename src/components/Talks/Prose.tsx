import type { MDXProvider } from '@mdx-js/react';
import type { LucideIcon } from 'lucide-react';
import type { AnchorHTMLAttributes, ComponentProps, ReactNode } from 'react';
import isInternalUrl from '@docusaurus/isInternalUrl';
import Link from '@docusaurus/Link';
import {
  Info,
  Lightbulb,
  OctagonAlert,
  StickyNote,
  TriangleAlert,
} from 'lucide-react';
import { SafeLink } from '@site/src/components/SafeLink';

type Components = ComponentProps<typeof MDXProvider>['components'];

type AdmonitionOptions = {
  type: string;
  title?: string;
  children?: ReactNode;
};

const TEXT = 'text-[0.9375rem]/[1.7] text-body text-pretty';

const LINK =
  'font-semibold text-accent underline decoration-trim underline-offset-2 transition-colors duration-200 ease-swift hover:text-accent hover:decoration-accent';

const ICONS: Record<string, LucideIcon> = {
  note: StickyNote,
  tip: Lightbulb,
  info: Info,
  warning: TriangleAlert,
  danger: OctagonAlert,
};

const Anchor = ({
  href = '',
  children,
}: AnchorHTMLAttributes<HTMLAnchorElement>): ReactNode =>
  isInternalUrl(href) ? (
    <Link to={href} className={LINK}>
      {children}
    </Link>
  ) : (
    <SafeLink to={href} className={LINK}>
      {children}
    </SafeLink>
  );

const Admonition = ({
  type,
  title,
  children,
}: AdmonitionOptions): ReactNode => {
  const Icon = ICONS[type] ?? StickyNote;

  return (
    <aside className='flex flex-col gap-2.5 rounded-2xl bg-wash px-4 py-3.5 ring-1 ring-trim ring-inset'>
      {title && (
        <p className='m-0 flex items-center gap-1.5 text-[0.625rem]/none font-bold tracking-widest text-accent uppercase'>
          <Icon className='size-3 shrink-0' aria-hidden='true' />
          {title}
        </p>
      )}
      <div className='flex flex-col gap-2.5'>{children}</div>
    </aside>
  );
};

export const components: Components = {
  p: (props) => <p {...props} className={`m-0 ${TEXT}`} />,
  strong: (props) => <strong {...props} className='font-semibold text-ink' />,
  em: (props) => <em {...props} className='italic' />,
  a: Anchor,
  h2: (props) => (
    <h2
      {...props}
      className='mt-2 mb-0 text-lg/tight font-bold tracking-[-0.01em] text-ink text-balance'
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className='mt-1 mb-0 text-base/tight font-bold tracking-[-0.01em] text-ink text-balance'
    />
  ),
  ul: (props) => (
    <ul
      {...props}
      className={`m-0 flex list-disc flex-col gap-1.5 pl-5 ${TEXT}`}
    />
  ),
  ol: (props) => (
    <ol
      {...props}
      className={`m-0 flex list-decimal flex-col gap-1.5 pl-5 ${TEXT}`}
    />
  ),
  li: (props) => <li {...props} className='pl-1 marker:text-muted' />,
  hr: () => <hr className='m-0 h-px w-full border-0 bg-line' />,
  img: ({ alt = '', ...props }) => (
    <img
      {...props}
      alt={alt}
      loading='lazy'
      decoding='async'
      className='h-auto max-w-full rounded-2xl'
    />
  ),
  admonition: Admonition,
};
