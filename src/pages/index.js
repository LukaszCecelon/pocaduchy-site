import React, {useEffect, useRef} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

const YOUTUBE_URL = 'https://youtube.com/@pocaduchy';

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

// Animowany "rysunek techniczny" w tle hero: linie środkowe i okrąg podziałowy
// pojawiają się pierwsze, zarys zębatki kreśli się jak pod ręką kreślarza
// (stroke-dashoffset), na końcu wchodzi wymiarowanie i tabliczka rysunkowa,
// a cała zębatka rusza w powolny obrót.
function Blueprint() {
  return (
    <div className={styles.blueprintWrap} data-parallax aria-hidden="true">
      <svg viewBox="0 0 900 640" preserveAspectRatio="xMidYMid meet" focusable="false">
        <g transform="translate(560,300)">
          {/* Linie środkowe (kreska-kropka, jak w CAD) */}
          <line className={`${styles.bpDashDot} ${styles.bpFade}`} x1="-268" y1="0" x2="268" y2="0" style={{'--del': '0.2s'}} />
          <line className={`${styles.bpDashDot} ${styles.bpFade}`} x1="0" y1="-268" x2="0" y2="268" style={{'--del': '0.3s'}} />
          {/* Okrąg podziałowy */}
          <circle className={`${styles.bpDashDot} ${styles.bpFade}`} r="192" style={{'--del': '0.5s'}} />

          {/* Obracająca się część rysunku */}
          <g className={styles.gearSpin}>
            <path className={styles.bpDraw} d={GEAR_PATH} pathLength="1" style={{'--del': '0.6s', '--dur': '1.9s'}} />
            <circle className={styles.bpDraw} r="54" pathLength="1" style={{'--del': '1.25s', '--dur': '0.8s'}} />
            {/* Rowek wpustowy */}
            <rect className={styles.bpDraw} x="-12" y="-68" width="24" height="16" pathLength="1" style={{'--del': '1.6s', '--dur': '0.5s'}} />
            {BOLT_HOLES.map((h, i) => (
              <circle
                key={i}
                className={styles.bpDraw}
                cx={h.x}
                cy={h.y}
                r="16"
                pathLength="1"
                style={{'--del': `${(1.4 + i * 0.11).toFixed(2)}s`, '--dur': '0.45s'}}
              />
            ))}
          </g>

          {/* Wymiar średnicy zewnętrznej */}
          <g className={styles.bpFade} style={{'--del': '2.5s'}}>
            <line className={styles.bpLine} x1="-208" y1="18" x2="-208" y2="268" />
            <line className={styles.bpLine} x1="208" y1="18" x2="208" y2="268" />
            <line className={styles.bpLine} x1="-208" y1="256" x2="208" y2="256" />
            <path className={styles.bpArrow} d="M -208,256 l 15,-4.5 l 0,9 Z" />
            <path className={styles.bpArrow} d="M 208,256 l -15,-4.5 l 0,9 Z" />
            <text className={styles.bpText} x="0" y="244" textAnchor="middle">Ø 416</text>
          </g>

          {/* Odnośnik do otworów montażowych */}
          <g className={styles.bpFade} style={{'--del': '2.75s'}}>
            <line className={styles.bpLine} x1="116" y1="-67" x2="196" y2="-146" />
            <line className={styles.bpLine} x1="196" y1="-146" x2="304" y2="-146" />
            <text className={styles.bpText} x="200" y="-154">6 × Ø 32</text>
          </g>
        </g>

        {/* Tabliczka rysunkowa */}
        <g className={styles.bpFade} style={{'--del': '3s'}} transform="translate(662,548)">
          <rect className={styles.bpLine} x="0" y="0" width="218" height="72" />
          <line className={styles.bpLine} x1="0" y1="24" x2="218" y2="24" />
          <line className={styles.bpLine} x1="0" y1="48" x2="218" y2="48" />
          <text className={styles.bpTextSmall} x="10" y="17">POCADUCHY · WARSZTAT</text>
          <text className={styles.bpTextSmall} x="10" y="41">RYS. PC-001 · KOŁO ZĘBATE</text>
          <text className={styles.bpTextSmall} x="10" y="65">SKALA 1:2 · ARKUSZ 1/1</text>
        </g>
      </svg>
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

// Subtelna paralaksa rysunku technicznego za kursorem — tylko gdy użytkownik
// nie prosi o ograniczenie ruchu.
function useHeroParallax() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }
    const wrap = hero.querySelector('[data-parallax]');
    if (!wrap) return undefined;

    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
      wrap.style.setProperty('--mx', `${(-nx * 14).toFixed(1)}px`);
      wrap.style.setProperty('--my', `${(-ny * 10).toFixed(1)}px`);
    };
    const onLeave = () => {
      wrap.style.setProperty('--mx', '0px');
      wrap.style.setProperty('--my', '0px');
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
      <Blueprint />
      <div className={styles.heroGrid}>
        <div className={`${styles.heroCopy} ${styles.rise}`}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowBar} />
            <span>Kanał o konstruowaniu</span>
          </div>
          <h1 className={styles.heroTitle}>
            Warsztat, rysunki i realne problemy inżynierskie.
          </h1>
          <p className={styles.heroLead}>
            Buduję pracownię konstruktora na oczach widzów i pokazuję, jak
            naprawdę wygląda praca nad maszynami — bez korporacyjnego
            sztafażu, za to z realnymi błędami i poprawkami.
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
          <p className={styles.subscriberNote}>
            Dołącza już blisko 550 konstruktorów i inżynierów.
          </p>
        </div>
        <div className={`${styles.heroLogoWrap} ${styles.riseDelayed}`}>
          <div className={`${styles.heroLogoFrame} pc-cut`}>
            <img src={useBaseUrl('/img/pocaduchy-logo.png')} alt="poCADuchy" />
          </div>
        </div>
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
        <Teasers />
        <CtaBand />
      </div>
    </Layout>
  );
}
