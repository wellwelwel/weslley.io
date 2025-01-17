import type * as Preset from '@docusaurus/preset-classic';

type NavbarLink = {
  to?: string;
  label?: string;
};

type WebsiteConfigs = {
  /** Create as many blogs as you want */
  blogs?: Preset.Options['blog'][];

  /** NavBar (header) links and items */
  navBarItens?: {
    left?: NavbarLink[];
    right?: {
      search?: boolean;
      locale?: boolean;
    };
  };
};

export const websiteConfigs: WebsiteConfigs = {
  navBarItens: {
    right: {
      search: true,
      locale: true,
    },
  },
  blogs: [
    {
      id: 'articles',
      routeBasePath: 'articles',
      blogTitle: 'Artigos',
      blogSidebarTitle: 'Artigos recentes 📜',
      path: './content/articles',
    },
    {
      id: 'talks',
      routeBasePath: 'talks',
      blogTitle: 'Palestras',
      blogSidebarTitle: 'Palestras Recentes 🎙️',
      path: './content/talks',
    },
  ],
};
