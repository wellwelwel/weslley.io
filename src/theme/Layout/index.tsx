import type { Props } from '@theme/Layout';
import type { ReactNode } from 'react';
import { PageMetadata } from '@docusaurus/theme-common';
import LayoutProvider from '@theme/Layout/Provider';

export default function Layout({
  children,
  title,
  description,
}: Props): ReactNode {
  return (
    <LayoutProvider>
      <PageMetadata title={title} description={description} />
      {children}
    </LayoutProvider>
  );
}
