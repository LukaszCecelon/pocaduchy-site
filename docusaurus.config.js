// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'poCADuchy',
  tagline: 'Konstruowanie maszyn tak, jak wygląda naprawdę.',
  favicon: 'img/pocaduchy-logo.png',

  future: {
    v4: true,
  },

  // Własna domena (custom domain GitHub Pages) — plik static/CNAME
  // wskazuje ją Pages'om, serwowanie odbywa się z korzenia.
  url: 'https://pocaduchy.pl',
  baseUrl: '/',

  organizationName: 'LukaszCecelon',
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

  // KaTeX — style dla wzorów matematycznych renderowanych w blokach treści
  // (BlockRenderer, typ "wzor") przez react-markdown + rehype-katex.
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+',
      crossorigin: 'anonymous',
    },
  ],

  plugins: [
    // Google Consent Mode v2: przed załadowaniem skryptów reklamowych
    // deklarujemy brak zgód (RODO-safe default). Właściwy baner zgód to
    // CMP Google włączany w panelu AdSense (Privacy & messaging) — po
    // uzyskaniu zgody użytkownika sam zaktualizuje te sygnały.
    function consentModeDefaults() {
      return {
        name: 'consent-mode-defaults',
        injectHtmlTags() {
          return {
            headTags: [
              {
                tagName: 'script',
                innerHTML:
                  "window.dataLayer=window.dataLayer||[];" +
                  "function gtag(){dataLayer.push(arguments);}" +
                  "gtag('consent','default',{ad_storage:'denied'," +
                  "ad_user_data:'denied',ad_personalization:'denied'," +
                  "analytics_storage:'denied',wait_for_update:500});",
              },
            ],
          };
        },
      };
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
