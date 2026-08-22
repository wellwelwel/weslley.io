declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.woff2' {
  const value: string;
  export default value;
}

declare module '*.mdx' {
  export const frontMatter: Record<string, unknown>;
}

declare module '@generated/mount-home/default/talks' {
  import type { Source } from '@site/src/components/Talks/catalog';

  export const sources: Map<string, Source>;
}
