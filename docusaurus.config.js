// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

// Identyfikator Google Analytics 4 w formacie G-XXXXXXXXXX.
// Dopoki jest pusty, zaden skrypt analityczny sie nie laduje i strona dziala
// dokladnie tak jak przed dodaniem analityki. Wystarczy wkleic tu identyfikator
// z panelu GA4, zeby wlaczyc zbieranie danych.
const GA4_ID = 'G-JJ9Q0WW43T';

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

  // GitHub Pages serwuje podstrony pod adresem z koncowym ukosnikiem i
  // przekierowuje na niego wersje bez ukosnika. Bez tej flagi adresy kanoniczne
  // i mapa witryny wskazywalyby adresy, ktore odpowiadaja przekierowaniem,
  // czyli wyszukiwarka szlaby do celu przez dodatkowy skok.
  trailingSlash: true,

  organizationName: 'LukaszCecelon',
  projectName: 'pocaduchy-site',

  onBrokenLinks: 'throw',

  // Zabezpieczenia po stronie dokumentu.
  //
  // GitHub Pages nie pozwala ustawiac wlasnych naglowkow HTTP, wiec to, co da
  // sie zrobic, idzie przez znaczniki meta. Dzialaja: polityka referrera oraz
  // czesc dyrektyw CSP. NIE dzialaja w meta i pozostaja niedostepne bez
  // wlasnego serwera albo CDN przed strona: X-Content-Type-Options,
  // Permissions-Policy oraz frame-ancestors, czyli ochrona przed clickjackingiem.
  //
  // CSP celowo NIE ogranicza script-src, img-src ani frame-src. AdSense laduje
  // skrypty z wielu domen Google i podmienia je w czasie, wiec sztywna lista
  // predzej czy pozniej zablokowalaby reklamy. Zamiast tego blokujemy klasy
  // atakow, ktore z reklamami nie maja nic wspolnego.
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        'http-equiv': 'Content-Security-Policy',
        content: [
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          'upgrade-insecure-requests',
        ].join('; '),
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'referrer',
        content: 'strict-origin-when-cross-origin',
      },
    },
  ],

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
    // deklarujemy brak zgód (RODO-safe default). Zgody reklamowe aktualizuje
    // CMP Google (panel AdSense, Prywatność i wiadomości), a zgodę na
    // statystyki nasz własny baner (src/components/BanerZgody.js).
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

    // Przywrocenie wczesniejszej decyzji uzytkownika. Musi wykonac sie
    // w <head>, miedzy domyslna odmowa a konfiguracja GA4: gdyby czekalo na
    // Reacta, pierwsza odslona kazdej wizyty leciałaby bez zgody, mimo ze
    // uzytkownik dawno ja wyrazil. Klucz i wersja jak w BanerZgody.js.
    function consentStored() {
      return {
        name: 'consent-stored',
        injectHtmlTags() {
          return {
            headTags: [
              {
                tagName: 'script',
                innerHTML:
                  'try{' +
                  "var z=JSON.parse(localStorage.getItem('pc-zgoda-analityka')||'null');" +
                  "if(z&&z.wersja===1&&z.decyzja==='granted'){" +
                  'window.dataLayer=window.dataLayer||[];' +
                  'function gtag(){dataLayer.push(arguments);}' +
                  "gtag('consent','update',{analytics_storage:'granted'});" +
                  '}}catch(e){}',
              },
            ],
          };
        },
      };
    },

    // Google Analytics 4. Laduje sie dopiero, gdy GA4_ID jest uzupelniony.
    // Consent Mode v2 jest zadeklarowany wyzej z domyslna odmowa, wiec do
    // czasu zgody GA4 wysyla wylacznie sygnaly bez cookies. Zgode na
    // statystyki daje wlasny baner, zgody reklamowe CMP Google.
    function googleAnalytics() {
      return {
        name: 'google-analytics-4',
        injectHtmlTags() {
          if (!GA4_ID) return {};
          return {
            headTags: [
              {
                tagName: 'script',
                attributes: {
                  async: true,
                  src: `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`,
                },
              },
              {
                tagName: 'script',
                innerHTML:
                  "window.dataLayer=window.dataLayer||[];" +
                  "function gtag(){dataLayer.push(arguments);}" +
                  "gtag('js',new Date());" +
                  `gtag('config','${GA4_ID}',{anonymize_ip:true});`,
              },
            ],
          };
        },
      };
    },
  ],

  // Modul kliencki dopisujacy odslony przy przejsciach wewnatrz serwisu.
  // Sam z siebie nic nie wysyla, dopoki GA4 nie jest wlaczony.
  clientModules: ['./src/clientModules/analityka.js'],

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
            title: 'Formalności',
            items: [
              {label: 'Polityka prywatności i cookies', to: '/polityka-prywatnosci'},
              {label: 'Regulamin', to: '/regulamin'},
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
