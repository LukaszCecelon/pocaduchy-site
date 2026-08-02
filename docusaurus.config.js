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
    // Dane strukturalne JSON-LD wspólne dla całej witryny: kto ją prowadzi
    // (Person + Organization) i czym jest (WebSite). Wyszukiwarki i modele
    // AI używają tego do zrozumienia i cytowania źródła.
    function structuredData() {
      const SITE = 'https://pocaduchy.pl';
      const graph = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': `${SITE}/#lukasz`,
            name: 'Łukasz Cecelon',
            jobTitle: 'Inżynier konstruktor',
            url: SITE,
            sameAs: [
              'https://youtube.com/@pocaduchy',
              'https://www.linkedin.com/in/lukaszcecelon',
              'https://www.tiktok.com/@pocaduchy',
            ],
            knowsAbout: [
              'konstruowanie maszyn',
              'projektowanie CAD',
              'rysunek techniczny',
              'tolerancje i pasowania',
              'druk 3D',
              'dobór materiałów konstrukcyjnych',
            ],
          },
          {
            '@type': 'Organization',
            '@id': `${SITE}/#organizacja`,
            name: 'poCADuchy',
            url: SITE,
            logo: `${SITE}/img/pocaduchy-logo.png`,
            image: `${SITE}/img/og-pocaduchy.jpg`,
            email: 'RA-Engineering@outlook.com',
            founder: {'@id': `${SITE}/#lukasz`},
            sameAs: [
              'https://youtube.com/@pocaduchy',
              'https://www.linkedin.com/in/lukaszcecelon',
              'https://www.tiktok.com/@pocaduchy',
            ],
            description:
              'Kanał YouTube i baza wiedzy o konstruowaniu maszyn: CAD, rysunek techniczny, dobór materiałów, druk 3D. Prowadzi inżynier konstruktor Łukasz Cecelon.',
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE}/#strona`,
            url: SITE,
            name: 'poCADuchy',
            inLanguage: 'pl-PL',
            publisher: {'@id': `${SITE}/#organizacja`},
            description:
              'Baza wiedzy dla konstruktorów maszyn: wzory, tabele norm (DIN, ISO), rysunek techniczny i praktyka warsztatowa.',
          },
        ],
      };
      return {
        name: 'structured-data',
        injectHtmlTags() {
          return {
            headTags: [
              {
                tagName: 'script',
                attributes: {type: 'application/ld+json'},
                innerHTML: JSON.stringify(graph),
              },
            ],
          };
        },
      };
    },

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
      // Obrazek pokazywany przy udostępnianiu linków (LinkedIn, Facebook,
      // X, Messenger) — Docusaurus rozgłasza go jako og:image i twitter:image.
      image: 'img/og-pocaduchy.jpg',
      metadata: [
        {name: 'author', content: 'Łukasz Cecelon'},
        {
          name: 'keywords',
          content:
            'konstruowanie maszyn, rysunek techniczny, CAD, tolerancje i pasowania, DIN, ISO, chropowatość powierzchni, druk 3D, konstruktor, inżynieria mechaniczna',
        },
        {property: 'og:type', content: 'website'},
        {property: 'og:site_name', content: 'poCADuchy'},
        {name: 'twitter:card', content: 'summary_large_image'},
      ],
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
          {to: '/blog', label: 'Artykuły', position: 'left'},
          {to: '/odcinki', label: 'Odcinki', position: 'left'},
          {to: '/uslugi', label: 'Usługi', position: 'left'},
          {to: '/o-mnie', label: 'O mnie', position: 'left'},
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
              {label: 'Artykuły', to: '/blog'},
              {label: 'Odcinki', to: '/odcinki'},
              {label: 'Usługi', to: '/uslugi'},
              {label: 'O mnie', to: '/o-mnie'},
            ],
          },
          {
            title: 'Kanały',
            items: [
              {label: 'YouTube', href: 'https://youtube.com/@pocaduchy'},
              {label: 'LinkedIn', href: 'https://www.linkedin.com/in/lukaszcecelon'},
              {label: 'TikTok', href: 'https://www.tiktok.com/@pocaduchy'},
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
