import React, {useEffect, useRef} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {formatShortDatePl} from '@site/src/lib/site';
import Zebatka3D from '@site/src/components/Zebatka3D';
import styles from './index.module.css';
import blogPosts from '../data/blog-posts.json';

// Manifest jest posortowany od najnowszego, wiec pierwszy wpis to ostatni artykul.
const NAJNOWSZY = blogPosts[0];
import episodesData from '@site/src/data/episodes.json';
import subscribersData from '@site/src/data/subscribers.json';

const YOUTUBE_URL = 'https://youtube.com/@pocaduchy';

// Najnowszy pełny odcinek (bez shortsów) z auto-generowanego episodes.json.
const LATEST_EPISODE = episodesData.episodes.filter((e) => !e.isShort)[0];

// Liczba subskrybentów z auto-generowanego subscribers.json (fetch-subscribers.mjs).
const SUBSCRIBERS = subscribersData?.count;

// Parametryczne koło zębate (18 zębów trapezowych) liczone matematycznie,
// wyśrodkowane w (0,0) — dzięki temu grupa może się obracać wokół środka.
const TEETH = 18;
const R_OUTER = 208;
const R_ROOT = 176;

function buildGearPath() {
  const step = (Math.PI * 2) / TEETH;
  const pt = (r, a) =>
    `${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}`;
  const segments = [];
  for (let i = 0; i < TEETH; i++) {
    const a = i * step;
    segments.push(
      [
        pt(R_ROOT, a + step * 0.08),
        pt(R_OUTER, a + step * 0.2),
        pt(R_OUTER, a + step * 0.38),
        pt(R_ROOT, a + step * 0.5),
      ].join(' L '),
    );
  }
  return `M ${segments.join(' L ')} Z`;
}

const GEAR_PATH = buildGearPath();

// 6 otworów montażowych na okręgu podziałowym otworów.
const BOLT_HOLES = Array.from({length: 6}, (_, i) => {
  const a = (Math.PI / 3) * i - Math.PI / 2;
  return {x: +(118 * Math.cos(a)).toFixed(1), y: +(118 * Math.sin(a)).toFixed(1)};
});

// Trójwymiarowa zębatka w tle hero, stylizowana na widok z okna CAD.
// Bryła to stos warstw SVG rozsuniętych w osi Z (translateZ) wewnątrz sceny
// z perspektywą — warstwy "drukują się" po kolei jak na drukarce 3D
// (stroke-dashoffset), potem cała bryła rusza w powolny obrót i delikatnie
// przechyla się za kursorem.
const GEAR_LAYERS = 7;
const LAYER_STEP = 9; // rozsunięcie warstw w px — łączna "grubość" bryły

function GearLayer({z, edge, delay}) {
  return (
    <svg
      className={`${styles.gearLayer} ${edge ? styles.gearLayerEdge : styles.gearLayerMid}`}
      viewBox="-260 -260 520 520"
      style={{transform: `translateZ(${z}px)`, '--del': `${delay}s`}}
      focusable="false">
      <path className={styles.g3Path} d={GEAR_PATH} pathLength="1" />
      <circle className={styles.g3Path} r="54" pathLength="1" />
      <rect className={styles.g3Path} x="-12" y="-68" width="24" height="16" pathLength="1" />
      {BOLT_HOLES.map((h, i) => (
        <circle key={i} className={styles.g3Path} cx={h.x} cy={h.y} r="16" pathLength="1" />
      ))}
    </svg>
  );
}

// Sekwencja otwarcia strony glownej.
//
// Pomysl: strona najpierw kresli sie jak rysunek techniczny, a potem plaski
// rzut wstaje w bryle. To jest jedyny efekt, ktory moze zrobic strona o
// konstruowaniu maszyn, a nie dowolna strona z ladna animacja.
//
// Twarda zasada: naglowek i przyciski sa widoczne od pierwszej klatki.
// Animacja nigdy nie kaze czekac na tresc, bo to psuje ocene szybkosci
// strony i przy kolejnych wizytach zwyczajnie irytuje.
const KLUCZ_OTWARCIA = 'pc-hero-otwarcie';
const WERSJA_OTWARCIA = 1;

function czyPierwszaWizyta() {
  // Adres z ?otwarcie=1 zawsze odtwarza pelna sekwencje. Sluzy do pokazywania
  // jej komus i do sprawdzania zmian bez czyszczenia pamieci przegladarki.
  try {
    if (new URLSearchParams(window.location.search).has('otwarcie')) return true;
  } catch {
    // Brak obslugi URLSearchParams nie moze wywrocic strony.
  }

  try {
    const zapis = JSON.parse(window.localStorage.getItem(KLUCZ_OTWARCIA) || 'null');
    return !(zapis && zapis.wersja === WERSJA_OTWARCIA);
  } catch {
    // Tryb prywatny potrafi rzucic wyjatkiem. Wtedy pokazujemy pelna wersje:
    // lepiej pokazac za duzo raz niz nie pokazac wcale.
    return true;
  }
}

function zapamietajWizyte() {
  try {
    window.localStorage.setItem(
      KLUCZ_OTWARCIA,
      JSON.stringify({wersja: WERSJA_OTWARCIA, data: new Date().toISOString()}),
    );
  } catch {
    // Brak zapisu oznacza tylko, ze przy nastepnej wizycie sekwencja zagra
    // od nowa. Nic sie nie psuje.
  }
}

function useSekwencjaOtwarcia() {
  // Na serwerze i w pierwszej klatce zakladamy stan koncowy. Dzieki temu
  // strona bez JavaScriptu wyglada poprawnie, a nie zastyga w polowie animacji.
  const [stan, setStan] = React.useState({faza: 'bryla', rysunek: false, webgl: true});

  useEffect(() => {
    const bezRuchu = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Jedno sprawdzenie WebGL zamiast czekania, az komponent 3D sam sie podda.
    // Gdy go nie ma, wracamy do warstwowej wersji CSS, ktora dziala wszedzie.
    let webgl = false;
    try {
      const probny = document.createElement('canvas');
      webgl = Boolean(probny.getContext('webgl') || probny.getContext('experimental-webgl'));
    } catch {
      webgl = false;
    }

    if (bezRuchu || !czyPierwszaWizyta()) {
      setStan({faza: 'bryla', rysunek: false, webgl});
      return undefined;
    }

    // Pelna sekwencja: plaski rzut, na nim kresli sie rysunek, potem bryla wstaje.
    setStan({faza: 'plasko', rysunek: true, webgl});
    zapamietajWizyte();

    const wstan = setTimeout(() => {
      setStan((p) => ({...p, faza: 'bryla'}));
    }, 1800);
    const schowajRysunek = setTimeout(() => {
      setStan((p) => ({...p, rysunek: false}));
    }, 2600);

    return () => {
      clearTimeout(wstan);
      clearTimeout(schowajRysunek);
    };
  }, []);

  return stan;
}

// Warstwa rysunku technicznego: linie pomocnicze, linia wymiarowa z grotami
// i opis. Lezy nad modelem i znika, gdy bryla wstaje.
function RysunekOtwarcia({widoczny}) {
  return (
    <svg
      className={`${styles.rysunekOtwarcia} ${widoczny ? styles.rysunekGra : ''}`}
      // Przezroczystosc ustawiamy wprost, a nie klasa. Klasa zalezalaby od
      // kolejnosci regul w arkuszu, a tu chodzi o jednoznaczne zniknięcie
      // rysunku dokladnie w chwili, gdy bryla wstaje.
      style={{opacity: widoczny ? 1 : 0}}
      viewBox="0 0 520 520"
      aria-hidden="true"
      focusable="false">
      <g className={styles.liniePomocnicze}>
        <path d="M60 260 H460" style={{'--dl': 400, '--op': '0ms'}} />
        <path d="M260 60 V460" style={{'--dl': 400, '--op': '120ms'}} />
      </g>
      <g className={styles.linieWymiarowe}>
        <path d="M60 96 V132" style={{'--dl': 40, '--op': '420ms'}} />
        <path d="M460 96 V132" style={{'--dl': 40, '--op': '480ms'}} />
        <path d="M60 112 H460" style={{'--dl': 400, '--op': '560ms'}} />
      </g>
      <g className={styles.grotyWymiaru}>
        <path d="M60 112 l12 -5 v10 z" />
        <path d="M460 112 l-12 -5 v10 z" />
      </g>
      <text className={styles.opisWymiaru} x="245" y="104">
        ⌀416
      </text>
      <text className={styles.opisDetalu} x="60" y="470">
        PC-001 · KOŁO ZĘBATE · z=18
      </text>
    </svg>
  );
}

// Zapasowa wersja bryly, zlozona z plaskich warstw CSS. Wchodzi tam, gdzie
// nie ma WebGL: starsze urzadzenia, wylaczone przyspieszenie sprzetowe,
// przegladarki w trybie oszczedzania. Strona ma dzialac wszedzie.
function BrylaWarstwowa() {
  const layers = Array.from({length: GEAR_LAYERS}, (_, i) => ({
    z: (i - (GEAR_LAYERS - 1) / 2) * LAYER_STEP,
    edge: i === 0 || i === GEAR_LAYERS - 1,
    delay: +(0.25 + i * 0.22).toFixed(2),
  }));

  return (
    <div className={styles.scene}>
      <div className={styles.tilt} data-tilt>
        <div className={styles.gearSpin3d}>
          {layers.map((l) => (
            <GearLayer key={l.z} z={l.z} edge={l.edge} delay={l.delay} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Cad3dViewport({faza, rysunek, webgl}) {
  return (
    <div className={styles.viewport} aria-hidden="true">
      {webgl ? (
        <Zebatka3D faza={faza} className={styles.bryla3d} />
      ) : (
        <BrylaWarstwowa />
      )}

      <RysunekOtwarcia widoczny={rysunek} />

      {/* Triada osi jak w oknie CAD */}
      <svg
        className={`${styles.triad} ${styles.bpFade}`}
        viewBox="0 0 96 96"
        style={{'--del': '2.4s'}}
        focusable="false">
        <line x1="48" y1="56" x2="48" y2="14" />
        <line x1="48" y1="56" x2="12" y2="78" />
        <line x1="48" y1="56" x2="84" y2="78" />
        <text x="48" y="10" textAnchor="middle">Z</text>
        <text x="4" y="90">X</text>
        <text x="80" y="90">Y</text>
      </svg>

      {/* Tabliczka jak w rogu okna CAD */}
      <div className={`${styles.titleBlock} ${styles.bpFade}`} style={{'--del': '2.8s'}}>
        <span>POCADUCHY · WARSZTAT</span>
        <span>MODEL PC-001 · KOŁO ZĘBATE</span>
        <span>WIDOK 3D · OBRÓT AUTO</span>
      </div>
    </div>
  );
}

// Odsłania element (dodaje klasę is-visible) gdy wjedzie w viewport.
// Bez JS / z prefers-reduced-motion po prostu zostaje widoczny od razu.
function useRevealOnScroll() {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const targets = root.querySelectorAll('[data-reveal]');

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add(styles.isVisible));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      {threshold: 0.15, rootMargin: '0px 0px -40px 0px'},
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}

// Subtelne przechylanie bryły 3D za kursorem (rotateX/rotateY na scenie) —
// tylko gdy użytkownik nie prosi o ograniczenie ruchu.
function useHeroParallax() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;
    const wrap = hero.querySelector('[data-tilt]');
    if (!wrap) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let ograniczRuch = reducedMotion.matches;
    let frameId = null;
    let ostatniRuch = null;

    const resetTilt = () => {
      wrap.style.setProperty('--tx', '0deg');
      wrap.style.setProperty('--ty', '0deg');
    };

    const updateTilt = () => {
      frameId = null;
      if (ograniczRuch || !ostatniRuch) return;

      const r = hero.getBoundingClientRect();
      const nx = ((ostatniRuch.clientX - r.left) / r.width - 0.5) * 2;
      const ny = ((ostatniRuch.clientY - r.top) / r.height - 0.5) * 2;
      wrap.style.setProperty('--tx', `${(nx * 7).toFixed(2)}deg`);
      wrap.style.setProperty('--ty', `${(-ny * 6).toFixed(2)}deg`);
    };

    const onMove = (e) => {
      if (ograniczRuch) return;
      ostatniRuch = {clientX: e.clientX, clientY: e.clientY};
      if (frameId === null) frameId = window.requestAnimationFrame(updateTilt);
    };

    const onLeave = () => {
      ostatniRuch = null;
      resetTilt();
    };

    const onReducedMotionChange = (e) => {
      ograniczRuch = e.matches;
      if (!ograniczRuch) return;
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      frameId = null;
      ostatniRuch = null;
      resetTilt();
    };

    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    reducedMotion.addEventListener('change', onReducedMotionChange);
    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
      reducedMotion.removeEventListener('change', onReducedMotionChange);
    };
  }, []);

  return heroRef;
}

function Hero() {
  const heroRef = useHeroParallax();
  const {faza, rysunek, webgl} = useSekwencjaOtwarcia();
  return (
    <div className={styles.hero} ref={heroRef}>
      <Cad3dViewport faza={faza} rysunek={rysunek} webgl={webgl} />
      <div className={styles.heroGrid}>
        <div className={`${styles.heroCopy} ${styles.rise}`}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowBar} />
            <span>Kanał o inżynierii i konstruowaniu</span>
          </div>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleInner}>
              Konstruowanie maszyn tak, jak wygląda naprawdę.
            </span>
          </h1>
          <p className={styles.heroLead}>
            Rysunki, CAD, druk 3D i montaż: decyzje, koszty i błędy, których
            nikt inny nie pokazuje. Zapraszam Was do świata, którego jeszcze
            nikt nie pokazał na polskim YouTube.
          </p>
          <div className={styles.heroActions}>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btnPrimary} pc-cut`}>
              Subskrybuj na YouTube →
            </a>
            <Link to="/blog" className={`${styles.btnGhost} pc-cut`}>
              Czytaj artykuły
            </Link>
          </div>
          {SUBSCRIBERS ? (
            <p className={styles.subscriberNote}>
              Już {new Intl.NumberFormat('pl-PL').format(SUBSCRIBERS)} konstruktorów
              i inżynierów ogląda, jak to robię.
            </p>
          ) : null}
        </div>
        <div className={`${styles.heroLogoWrap} ${styles.riseDelayed}`}>
          <div className={styles.heroBadgeOrbit}>
            <span className={styles.orbitRing} />
            <div className={styles.heroBadge}>
              <img
                src={useBaseUrl('/img/pocaduchy-logo.png')}
                alt="Łukasz Cecelon, inżynier konstruktor i autor kanału poCADuchy"
                width="252"
                height="252"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Pasek najnowszego odcinka — realna miniatura z YouTube, aktualizowana
// automatycznie przez fetch-episodes.mjs (build + co noc).
function LatestEpisode() {
  const ep = LATEST_EPISODE;
  if (!ep) return null;
  return (
    <div className={styles.latest}>
      <div className={styles.latestInner}>
        <div className={styles.latestHead}>
          <span className={styles.latestBar} />
          <span>Najnowszy odcinek</span>
        </div>
        <a
          href={ep.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.latestCard} pc-cut-card`}>
          <div className={styles.latestThumb}>
            <img
              src={ep.thumbnail}
              alt={`Miniatura odcinka: ${ep.title}`}
              loading="lazy"
            />
            <div className={styles.latestPlay}>
              <div className={styles.latestPlayIcon} />
            </div>
          </div>
          <div className={styles.latestMeta}>
            <span className={styles.latestDate}>{formatShortDatePl(ep.published)}</span>
            <h3 className={styles.latestTitle}>{ep.title}</h3>
            <span className={styles.latestCta}>Obejrzyj na YouTube →</span>
          </div>
        </a>
      </div>
    </div>
  );
}

function Teasers() {
  const cards = [
    {
      n: '01',
      eyebrow: 'ARTYKUŁY',
      title: 'Artykuły',
      body: NAJNOWSZY
        ? `Praktyka konstruktora: decyzje, koszty i wnioski z realnych projektów. Ostatnio: ${NAJNOWSZY.seoTitle || NAJNOWSZY.title}`
        : 'Praktyka konstruktora: decyzje projektowe, koszty i wnioski z realnych projektów.',
      cta: 'Czytaj artykuły →',
      href: '/blog',
    },
    {
      n: '02',
      eyebrow: 'ARCHIWUM',
      title: 'Odcinki',
      body: 'Wszystkie odcinki kanału w jednym miejscu: miniatury, tytuły, linki do YouTube.',
      cta: 'Zobacz odcinki →',
      href: '/odcinki',
    },
    {
      n: '03',
      eyebrow: 'WSPÓŁPRACA',
      title: 'Usługi',
      body: 'Projektowanie konstrukcji, druk 3D i konsultacje dla firm produkcyjnych oraz biur konstrukcyjnych.',
      cta: 'Zobacz zakres →',
      href: '/uslugi',
    },
  ];

  return (
    <div className={styles.teasers}>
      <div className={styles.teasersGrid}>
        {cards.map((c, i) => (
          <Link
            key={c.title}
            to={c.href}
            data-reveal
            style={{transitionDelay: `${i * 90}ms`}}
            className={`${styles.card} ${styles.revealItem} pc-cut-card`}>
            <span className={styles.cardEyebrow}>{c.n} · {c.eyebrow}</span>
            <h3 className={styles.cardTitle}>{c.title}</h3>
            <p className={styles.cardBody}>{c.body}</p>
            <span className={styles.cardCta}>{c.cta}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function CtaBand() {
  return (
    <div className={`${styles.ctaBand} ${styles.revealItem}`} data-reveal>
      <h2 className={styles.ctaTitle}>
        Daj suba, a nic Cię nie ominie
      </h2>
      <a
        href={YOUTUBE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.ctaButton} pc-cut`}>
        Subskrybuj kanał
      </a>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const rootRef = useRevealOnScroll();
  return (
    <Layout
      title={siteConfig.tagline}
      description="poCADuchy to kanał i baza wiedzy o konstruowaniu maszyn. Rysunek techniczny, CAD, dobór materiałów, tolerancje, druk 3D i montaż: realne decyzje, koszty i błędy z warsztatu konstruktora.">
      <div ref={rootRef}>
        <Hero />
        <LatestEpisode />
        <Teasers />
        <CtaBand />
      </div>
    </Layout>
  );
}
