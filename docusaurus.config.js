// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'poCADuchy',
  tagline: 'Warsztat, rysunki i realne problemy inżynierskie.',
  favicon: 'img/pocaduchy-logo.png',

  future: {
    v4: true,
  },

  // TODO: podmień na docelową domenę (np. https://pocaduchy.pl) przed deployem
  url: 'https://pocaduchy.pl',
  baseUrl: '/',

  organizationName: 'pocaduchy',
  projectName: 'pocaduchy-site',

  onBrokenLinks: 'throw',

  // Google AdSense — ładowany na każdej stronie (weryfikacja + auto ads).
  scripts: [
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5245798413568501',
      async: true,
      crossorigin: 'anonymous',
    },
  ],

  i18n: {
    defaultLocale: 'pl',
    locales: ['pl'],
  },

  // Docs (Wiedza) i Blog wyłączone na start — MVP to Home + Wiedza (statyczna
  // strona kategorii) + Odcinki. Włączymy docs plugin pod /wiedza gdy pojawi
  // się pierwsza realna treść do migracji.
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        // Strona jest zaprojektowana tylko na jasny motyw — przełącznik
        // wyłączony, dopóki nie powstanie pełny dark theme.
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'poCADuchy',
        logo: {
          alt: 'poCADuchy',
          src: 'img/pocaduchy-logo.png',
        },
        items: [
          {to: '/', label: 'Główna', position: 'left'},
          {to: '/wiedza', label: 'Wiedza', position: 'left'},
          {to: '/odcinki', label: 'Odcinki', position: 'left'},
          {to: '/uslugi', label: 'Usługi', position: 'left'},
          {to: '/social', label: 'Social media', position: 'left'},
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://youtube.com/@pocaduchy',
            label: 'SUBSKRYBUJ',
            position: 'right',
            className: 'navbar__cta',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Strona',
            items: [
              {label: 'Wiedza', to: '/wiedza'},
              {label: 'Odcinki', to: '/odcinki'},
              {label: 'Usługi', to: '/uslugi'},
              {label: 'Social media', to: '/social'},
              {label: 'Blog', to: '/blog'},
            ],
          },
          {
            title: 'Kanały',
            items: [
              {label: 'YouTube', href: 'https://youtube.com/@pocaduchy'},
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} poCADuchy. Zrobione w warsztacie, nie w biurze.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
