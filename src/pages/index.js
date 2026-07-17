import React, {useEffect, useRef} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';
import episodesData from '@site/src/data/episodes.json';
import subscribersData from '@site/src/data/subscribers.json';

const YOUTUBE_URL = 'https://youtube.com/@pocaduchy';

// Najnowszy pełny odcinek (bez shortsów) z auto-generowanego episodes.json.
const LATEST_EPISODE = episodesData.episodes.filter((e) => !e.isShort)[0];

// Liczba subskrybentów z auto-generowanego subscribers.json (fetch-subscribers.mjs).
const SUBSCRIBERS = subscribersData?.count;

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

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

function Cad3dViewport() {
  const layers = Array.from({length: GEAR_LAYERS}, (_, i) => ({
    z: (i - (GEAR_LAYERS - 1) / 2) * LAYER_STEP,
    edge: i === 0 || i === GEAR_LAYERS - 1,
    delay: +(0.25 + i * 0.22).toFixed(2),
  }));

  return (
    <div className={styles.viewport} aria-hidden="true">
      <div className={styles.scene}>
        <div className={styles.tilt} data-tilt>
          <div className={styles.gearSpin3d}>
            {layers.map((l) => (
              <GearLayer key={l.z} z={l.z} edge={l.edge} delay={l.delay} />
            ))}
          </div>
        </div>
      </div>

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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }
    const wrap = hero.querySelector('[data-tilt]');
    if (!wrap) return undefined;

    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
      wrap.style.setProperty('--tx', `${(nx * 7).toFixed(2)}deg`);
      wrap.style.setProperty('--ty', `${(-ny * 6).toFixed(2)}deg`);
    };
    const onLeave = () => {
      wrap.style.setProperty('--tx', '0deg');
      wrap.style.setProperty('--ty', '0deg');
    };

    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    return () => {
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return heroRef;
}

function Hero() {
  const heroRef = useHeroParallax();
  return (
    <div className={styles.hero} ref={heroRef}>
      <Cad3dViewport />
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
            Rysunki, CAD, druk 3D i montaż — decyzje, koszty i błędy, których
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
            <Link to="/wiedza" className={`${styles.btnGhost} pc-cut`}>
              Zobacz bazę wiedzy
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
              <img src={useBaseUrl('/img/pocaduchy-logo.png')} alt="poCADuchy" />
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
            <img src={ep.thumbnail} alt="" loading="lazy" />
            <div className={styles.latestPlay}>
              <div className={styles.latestPlayIcon} />
            </div>
          </div>
          <div className={styles.latestMeta}>
            <span className={styles.latestDate}>{formatDate(ep.published)}</span>
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
      eyebrow: 'BAZA WIEDZY',
      title: 'Wiedza',
      body: 'Wzory, tabele i poradniki dla konstruktorów maszyn — uporządkowane w działy i gotowe do rozbudowy.',
      cta: 'Przeglądaj bazę →',
      href: '/wiedza',
    },
    {
      n: '02',
      eyebrow: 'ARCHIWUM',
      title: 'Odcinki',
      body: 'Wszystkie odcinki kanału w jednym miejscu — miniatury, tytuły, linki do YouTube.',
      cta: 'Zobacz odcinki →',
      href: '/odcinki',
    },
    {
      n: '03',
      eyebrow: 'ARTYKUŁY',
      title: 'Blog',
      body: 'Artykuły o konstruowaniu i pracy inżyniera — rozwinięte z LinkedIn.',
      cta: 'Czytaj →',
      href: '/blog',
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
        Nowy odcinek co tydzień — albo kiedy się uda w warsztacie.
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
      description="Baza wiedzy i archiwum kanału poCADuchy — wzory, tabele i poradniki dla konstruktorów maszyn.">
      <div ref={rootRef}>
        <Hero />
        <LatestEpisode />
        <Teasers />
        <CtaBand />
      </div>
    </Layout>
  );
}
