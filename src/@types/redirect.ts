export type RedirectItem = {
  title: string;
  slug: string;
  url: string;
  social?: string;
};

export type ProcessedRedirect = RedirectItem & {
  slug: string;
  socialUrl: string;
};
