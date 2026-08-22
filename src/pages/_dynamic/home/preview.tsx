import type { ReactNode } from 'react';
import { PageMetadata } from '@docusaurus/theme-common';

type Preview = {
  title: string;
  description?: string | null;
  image?: string;
};

type PreviewOptions = {
  preview?: Preview;
  /** A talk's own banner, resolved by the bundler from its MDX folder. */
  social?: string;
};

export default ({ preview, social }: PreviewOptions): ReactNode => {
  if (!preview) return null;

  const image = social ?? preview.image;

  return (
    <PageMetadata
      title={preview.title}
      description={preview.description ?? undefined}
      image={image}
    >
      {image && <meta property='og:image:alt' content={preview.title} />}
      {image && <meta name='twitter:image:alt' content={preview.title} />}
    </PageMetadata>
  );
};
