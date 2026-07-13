import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

const YOUTUBE_URL = 'https://youtube.com/@pocaduchy';

function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
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
        <div className={styles.heroLogoWrap}>
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
      soon: false,
    },
    {
      n: '02',
      eyebrow: 'ARCHIWUM',
      title: 'Odcinki',
      body: 'Wszystkie odcinki kanału w jednym miejscu — miniatury, tytuły, linki do YouTube.',
      cta: 'Zobacz odcinki →',
      href: '/odcinki',
      soon: false,
    },
    {
      n: '03',
      eyebrow: 'ARTYKUŁY',
      title: 'Blog',
      body: 'Artykuły o konstruowaniu i pracy inżyniera — rozwinięte z LinkedIn.',
      cta: 'Czytaj →',
      href: '/blog',
      soon: false,
    },
  ];

  return (
    <div className={styles.teasers}>
      <div className={styles.teasersGrid}>
        {cards.map((c) =>
          c.soon ? (
            <div key={c.title} className={`${styles.card} ${styles.cardSoon} pc-cut-card`}>
              <span className={styles.cardEyebrowSoon}>{c.eyebrow}</span>
              <h3 className={styles.cardTitleSoon}>{c.title}</h3>
              <p className={styles.cardBodySoon}>{c.body}</p>
              <span className={styles.soonTag}>Wkrótce</span>
            </div>
          ) : (
            <Link key={c.title} to={c.href} className={`${styles.card} pc-cut-card`}>
              <span className={styles.cardEyebrow}>{c.n} · {c.eyebrow}</span>
              <h3 className={styles.cardTitle}>{c.title}</h3>
              <p className={styles.cardBody}>{c.body}</p>
              <span className={styles.cardCta}>{c.cta}</span>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}

function CtaBand() {
  return (
    <div className={styles.ctaBand}>
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
  return (
    <Layout
      title={siteConfig.tagline}
      description="Baza wiedzy i archiwum kanału poCADuchy — wzory, tabele i poradniki dla konstruktorów maszyn.">
      <Hero />
      <Teasers />
      <CtaBand />
    </Layout>
  );
}
