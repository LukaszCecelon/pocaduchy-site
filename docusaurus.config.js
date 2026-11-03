// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';
import {readFileSync, existsSync} from 'node:fs';

// Daty zmian stron z indeksu, ktory generuje scripts/build-content-pages.mjs
// (hook prebuild). Sitemapa bierze z nich <lastmod>. Strony bez daty w pliku
// tresci (narzedzia, huby) wychodza bez lastmod: lepiej nic niz zgadywanie.
const INDEKS_STRON = new URL('./src/data/strony-indeks.json', import.meta.url);
const PLIK_ODCINKOW = new URL('./src/data/episodes.json', import.meta.url);
const STRONY_Z_INDEKSU = existsSync(INDEKS_STRON) ? JSON.parse(readFileSync(INDEKS_STRON, 'utf8')) : [];
const DATY_ZMIAN = new Map(STRONY_Z_INDEKSU.filter((s) => s.zmiana).map((s) => [s.url, s.zmiana]));

// Huby, ktorych cala tresc to lista stron danego typu: ich uczciwa data zmiany
// to data najnowszej pozycji na liscie (nowy wpis zmienia hub). Pozostale huby
// (glowna, Uslugi, O mnie, narzedzia, przeliczniki) nie maja takiej daty,
// wiec zostaja bez lastmod.
for (const [hub, typ] of [
  ['/blog/', 'artykul'],
  ['/wiedza/', 'wiedza'],
  ['/odcinki/', 'odcinek'],
]) {
  const najnowsza = STRONY_Z_INDEKSU.filter((s) => s.typ === typ && s.zmiana)
    .map((s) => s.zmiana)
    .sort()
    .pop();
  const daty = najnowsza ? [najnowsza] : [];
  // Lista odcinkow pokazuje tez filmy z RSS bez wlasnej strony opisu: liczy sie
  // najnowszy pelny film (bez shortsow), nie tylko opisane odcinki.
  if (hub === '/odcinki/' && existsSync(PLIK_ODCINKOW)) {
    try {
      for (const e of JSON.parse(readFileSync(PLIK_ODCINKOW, 'utf8')).episodes || []) {
        if (!e.isShort && e.published) daty.push(e.published.slice(0, 10));
      }
    } catch {}
  }
  const wynik = daty.sort().pop();
  if (wynik && !DATY_ZMIAN.has(hub)) DATY_ZMIAN.set(hub, wynik);
}

// Identyfikator Google Analytics 4 w formacie G-XXXXXXXXXX.
// Dopoki jest pusty, zaden skrypt analityczny sie nie laduje i strona dziala
// dokladnie tak jak przed dodaniem analityki. Wystarczy wkleic tu identyfikator
// z panelu GA4, zeby wlaczyc zbieranie danych.
const GA4_ID = 'G-JJ9Q0WW43T';

// Wydawca Google AdSense. Skrypt reklam nie jest juz wpiety na sztywno:
// laduje go dopiero zgoda na reklamy w banerze (src/components/BanerZgody.js,
// funkcja window.pcReklamy z <head>). Weryfikacje witryny w AdSense
// zapewnia meta google-adsense-account oraz static/ads.txt.
const ADSENSE_CLIENT = 'ca-pub-5245798413568501';

// Piksel OpenAI: pomiar kampanii reklamowej w ChatGPT (kto przyszedl z reklamy
// i czy napisal maila). Jak AdSense laduje go dopiero zgoda na reklamy
// (window.pcPikselOpenAI z <head>). DEBUG wypisuje dzialanie SDK w konsoli:
// tylko na czas testu kampanii, potem false.
const OPENAI_PIXEL_ID = '7qstBawaiCSN9L4tT7trc8';
const OPENAI_PIXEL_DEBUG = true;

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
    {
      tagName: 'meta',
      attributes: {
        name: 'google-adsense-account',
        content: ADSENSE_CLIENT,
      },
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
    // Kalkulator pasowań mieszkał najpierw pod /wiedza/pasowania i ten adres
    // zdążył trafić do sitemapy oraz do wyszukiwarek. Po przeniesieniu do
    // zakładki Narzędzia stary adres musi prowadzić do nowego, inaczej
    // tracimy to, co Google już zaindeksował.
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {from: '/wiedza/pasowania', to: '/narzedzia/pasowania/'},
          // Wiedza miała przez chwilę działy. Zrezygnowaliśmy z nich, bo przy
          // kilku artykułach kategoria niczego nie porządkuje, ale adresy
          // zdążyły trafić do sitemapy, więc muszą prowadzić do nowych.
          {from: '/wiedza/elementy', to: '/wiedza/'},
          // Wczesny artykul o tym, po co poCADuchy pokazuje warsztat, a nie
          // sam gotowy model. Zostal usuniety przy sprzataniu 29 lipca 2026,
          // ale zdazyl sie zaindeksowac i nadal zbiera wyswietlenia na
          // pozycji okolo 3. Kierujemy na strone O mnie, bo to ona niesie
          // dzis ten sam temat.
          {from: '/blog/warsztat-zamiast-biura', to: '/o-mnie/'},
          {
            from: '/wiedza/elementy/pozycjonowanie-czesci-w-maszynie',
            to: '/wiedza/pozycjonowanie-czesci-w-maszynie/',
          },
        ],
      },
    ],

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

    // Google Consent Mode v2: na starcie deklarujemy brak wszystkich zgód
    // (RODO-safe default). Zgody na statystyki i na reklamy aktualizuje nasz
    // własny baner (src/components/BanerZgody.js); bez zgody na reklamy
    // skrypt AdSense w ogóle się nie ładuje.
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
    // uzytkownik dawno ja wyrazil. Klucz i wersje jak w BanerZgody.js.
    //
    // Tu tez zyje jedyny loader skryptu AdSense (window.pcReklamy). Wola go
    // ten skrypt przy zapisanej zgodzie na reklamy i baner w chwili zgody.
    // Bez zgody skrypt reklam nie trafia na strone wcale. window.pcBezReklam
    // blokuje loader na stronie bledu (wstawia go scripts/strip-ads-from-404.mjs).
    // Zapis w wersji 1 (sama zgoda na statystyki) dalej wlacza statystyki;
    // o reklamy baner zapyta ponownie.
    //
    // Obok zyje loader piksela OpenAI (window.pcPikselOpenAI), wolany przy tej
    // samej zgodzie na reklamy. Kolejka oaiq to fragment kodu instalacyjnego
    // OpenAI; po inicjalizacji od razu idzie odslona strony wejscia, kolejne
    // zglasza src/clientModules/analityka.js. Strony bledu nie blokujemy:
    // zakaz reklam na 404 dotyczy wyswietlania reklam, nie pomiaru.
    function consentStored() {
      const src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
      const piksel = {pixelId: OPENAI_PIXEL_ID, debug: OPENAI_PIXEL_DEBUG};
      return {
        name: 'consent-stored',
        injectHtmlTags() {
          return {
            headTags: [
              {
                tagName: 'script',
                innerHTML:
                  'window.dataLayer=window.dataLayer||[];' +
                  'window.pcReklamy=function(){' +
                  "if(window.pcBezReklam||document.getElementById('pc-adsense'))return;" +
                  "var s=document.createElement('script');" +
                  "s.id='pc-adsense';s.async=true;s.crossOrigin='anonymous';" +
                  `s.src='${src}';` +
                  'document.head.appendChild(s);};' +
                  // Identyfikator klikniecia w reklame (oppref) jest tylko w
                  // adresie strony wejscia, a nawigacja SPA go gubi. Trzymamy go
                  // w pamieci strony (nic nie zapisujemy przed zgoda) i po
                  // zgodzie oddajemy SDK przez jego wlasne cookie __oppref.
                  "window.pcOppref=(location.search.match(/[?&]oppref=([^&#]+)/)||[])[1]||null;" +
                  'window.pcPikselOpenAI=function(){' +
                  'if(window.oaiq)return;' +
                  "if(window.pcOppref&&!/[?&]oppref=/.test(location.search))" +
                  "document.cookie='__oppref='+window.pcOppref+'; Max-Age=2592000; path=/; SameSite=Lax';" +
                  'var q=function(){q.q.push(arguments);};q.q=[];window.oaiq=q;' +
                  "var p=document.createElement('script');" +
                  "p.async=true;p.src='https://bzrcdn.openai.com/sdk/oaiq.min.js';" +
                  'document.head.appendChild(p);' +
                  // Po wycofaniu zgody SDK zapamietuje odmowe (__oaiq_consent)
                  // i bez jawnego consent=true milczaloby po ponownej zgodzie.
                  "q('consent',true);" +
                  `q('init',${JSON.stringify(piksel)});` +
                  "q('measure','page_viewed',{type:'contents',contents:[{id:location.pathname,name:document.title,content_type:'page'}]});};" +
                  'try{' +
                  'var g=function(){dataLayer.push(arguments);};' +
                  "var z=JSON.parse(localStorage.getItem('pc-zgoda-analityka')||'null');" +
                  "var st=z&&(z.wersja===2?z.statystyki:z.wersja===1?z.decyzja:null);" +
                  "if(st==='granted')g('consent','update',{analytics_storage:'granted'});" +
                  "if(z&&z.wersja===2&&z.reklamy==='granted'){" +
                  "g('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});" +
                  'window.pcReklamy();window.pcPikselOpenAI();}' +
                  '}catch(e){}',
              },
            ],
          };
        },
      };
    },

    // Google Analytics 4. Laduje sie dopiero, gdy GA4_ID jest uzupelniony.
    // Consent Mode v2 jest zadeklarowany wyzej z domyslna odmowa, wiec do
    // czasu zgody GA4 wysyla wylacznie sygnaly bez cookies. Obie zgody
    // (statystyki i reklamy) daje wlasny baner.
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
        // Jednakowe priority i changefreq na kazdym adresie nic nie mowia,
        // a Google i tak je pomija. Zostaje sam adres i data zmiany.
        sitemap: {
          lastmod: null,
          changefreq: null,
          priority: null,
          createSitemapItems: async ({defaultCreateSitemapItems, ...reszta}) => {
            const pozycje = await defaultCreateSitemapItems(reszta);
            return pozycje.map((p) => {
              const sciezka = new URL(p.url).pathname;
              const data = DATY_ZMIAN.get(sciezka);
              return data ? {...p, lastmod: data} : p;
            });
          },
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
          // Kopia 96 px (logo w pasku ma 32 px, zapas na ekrany 3x).
          // Pelny plik 504 px zostaje jako favicon i logo w danych strukturalnych.
          src: 'img/pocaduchy-logo-96.png',
          // Kwadratowe proporcje pliku zrodlowego. Wysokosc i tak narzuca
          // pasek nawigacji, ale zadeklarowane wymiary rezerwuja miejsce,
          // zanim obraz sie wczyta.
          width: 96,
          height: 96,
        },
        items: [
          {to: '/', label: 'Główna', position: 'left'},
          {type: 'custom-menuWiedzy', position: 'left'},
          {to: '/narzedzia/', label: 'Narzędzia', position: 'left'},
          {to: '/blog/', label: 'Artykuły', position: 'left'},
          {to: '/odcinki/', label: 'Odcinki', position: 'left'},
          {to: '/uslugi/', label: 'Usługi', position: 'left'},
          {to: '/o-mnie/', label: 'O mnie', position: 'left'},
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
              {label: 'Wiedza', to: '/wiedza/'},
              {label: 'Narzędzia', to: '/narzedzia/'},
              {label: 'Artykuły', to: '/blog/'},
              {label: 'Odcinki', to: '/odcinki/'},
              {label: 'Usługi', to: '/uslugi/'},
              {label: 'O mnie', to: '/o-mnie/'},
            ],
          },
          {
            title: 'Formalności',
            items: [
              {label: 'Polityka prywatności i cookies', to: '/polityka-prywatnosci/'},
              {label: 'Regulamin', to: '/regulamin/'},
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
