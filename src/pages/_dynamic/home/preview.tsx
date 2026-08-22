import type { ReactNode } from 'react';
import { PageMetadata } from '@docusaurus/theme-common';

type Preview = {
  title: string;
  description?: string | null;
  image?: string;
};

type PreviewOptions = {
  preview?: Preview;
  banner?: string;
};

export default ({ preview, banner }: PreviewOptions): ReactNode => {
  if (!preview) return null;

  const image = banner ?? preview.image;

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
