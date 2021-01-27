const math = require('remark-math')
const katex = require('rehype-katex')

module.exports = {
  title: 'nalgebra',
  tagline: 'Linear algebra library for the Rust programming language.',
  url: 'https://nalgebra.org',
  baseUrl: '/',
  onBrokenLinks: 'error', // 'throw',
  favicon: 'img/favicon.png',
  organizationName: 'dimforge', // Usually your GitHub org/user name.
  projectName: 'nalgebra', // Usually your repo name.
  themeConfig: {
    prism: {
        theme: require('prism-react-renderer/themes/github'),
        additionalLanguages: ['toml', 'rust'],
    },
    // announcementBar: {
    //   id: 'supportus',
    //   content:
    //     '⭐️ If you like nalgebra, support us on <a target="_blank" rel="noopener noreferrer" href="https://github.com/sponsors/dimforge">GitHub Sponsor</a>! ⭐️',
    // },
    navbar: {
      title: '',
      logo: {
        alt: 'nalgebra Logo',
        src: 'img/logo_nalgebra.svg',
      },
      hideOnScroll: true,
      items: [
        {
          type: 'doc',
          position: 'left',
          docId: 'about_nalgebra',
          label: 'Docs',
        },
        {
          to: '/community',
          position: 'left',
          activeBaseRegex: `/community/`,
          label: 'Community',
        },
        {
          href: 'https://dimforge.com/blog',
          label: 'Blog ↪',
          position: 'left',
        },
        {
          href: 'https://github.com/sponsors/dimforge',
          label: 'Donate ♥',
          position: 'right',
          className: 'header-button-donate'
        },
        {
          href: 'https://dimforge.com/about',
          label: 'Dimforge ↪',
          position: 'right',
        },
        {
          href: 'https://github.com/dimforge/nalgebra',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'Dimforge EURL Logo',
        src: 'https://www.dimforge.com/img/logo/logo_dimforge_small_rect.svg',
        href: 'https://www.dimforge.com/'
      },
      copyright: `Built by <a href="https://www.dimforge.com">Dimforge, EURL</a>.`,
      links: [
        {
          title: 'Resources',
          items: [
            {
              label: 'Documentation',
              to: 'docs/',
            },
            {
              label: 'Blog ↪',
              href: 'https://dimforge.com/blog',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/nalgebra',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/vt9DJSW',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/dimforge',
            },
          ],
        },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: 'blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/dimforge/nalgebra',
            },
          ],
        },
      ],
      // copyright: `Copyright © ${new Date().getFullYear()} Dimforge EURL. Website built with Docusaurus.`,
    },
  },
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'community',
        path: 'community',
        routeBasePath: 'community',
        sidebarPath: require.resolve('./sidebar_community.js'),
        showLastUpdateTime: false,
      }
    ],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebar_docs.js'),
          showLastUpdateTime: false,
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/dimforge/nalgebra.rs/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  stylesheets: [
      'https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css'
  ]
};
