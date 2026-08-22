import type { ReactNode } from 'react';
import { PageMetadata } from '@docusaurus/theme-common';

type Page = {
  title: string;
  description: string | null;
  image?: string;
};

type HeadOptions = {
  page?: Page;
  /** The talk's own banner, resolved by the bundler from its MDX folder. */
  social?: string;
};

export default ({ page, social }: HeadOptions): ReactNode => {
  if (!page) return null;

  const image = social ?? page.image;

  return (
    <PageMetadata
      title={page.title}
      description={page.description ?? undefined}
      image={image}
    >
      {image && <meta property='og:image:alt' content={page.title} />}
      {image && <meta name='twitter:image:alt' content={page.title} />}
    </PageMetadata>
  );
};
