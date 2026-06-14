import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'EchoTrace',
  tagline: 'Observe your business. Not just your infrastructure.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true, // Mantém a compatibilidade com a futura v4
  },

  // CONFIGURAÇÃO DO GITHUB PAGES
  url: 'https://tluizp.github.io',
  baseUrl: '/EchoTraceDoc/',
  organizationName: 'tluizp',
  projectName: 'EchoTraceDoc',
  trailingSlash: false, // Recomendado para GitHub Pages

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'pt-BR', // Mudado para português para fazer sentido com sua landing page
    locales: ['pt-BR'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/tluizp/echotrace/tree/main/',
        },
        blog: false, // Desativado para focar puramente no produto e na doc (caso queira reativar, mude para objeto)
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg', // Card de preview para redes sociais
    
    // Configuração estética Dark Mode First (Estilo Datadog/PostHog)
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true, // Força o visual escuro premium sem que o usuário mude para um tema claro desalinhado
      respectPrefersColorScheme: false,
    },
    
    navbar: {
      title: 'EchoTrace',
      logo: {
        alt: 'EchoTrace Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Documentação',
        },
        {
          href: 'https://github.com/tluizp/echotrace',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentação',
          items: [
            {
              label: 'Quick Start',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Comunidade & Links',
          items: [
            {
              label: 'GitHub Project',
              href: 'https://github.com/tluizp/echotrace',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/tluizp/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} EchoTrace. Open Source (MIT).`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula, // O tema dracula combina perfeitamente com os blocos de código do CSS customizado
    },
  } satisfies Preset.ThemeConfig,
};

export default config;