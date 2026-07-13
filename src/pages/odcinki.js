import React from 'react';
import Layout from '@theme/Layout';
import styles from './odcinki.module.css';

const YOUTUBE_URL = 'https://youtube.com/@pocaduchy';

// TODO: podmień na realne dane odcinków (tytuł, numer, czas, data, link).
// Docelowo można to zasilać automatycznie z RSS/YouTube Data API przy
// buildzie zamiast ręcznie aktualizować tablicę.
const EPISODES = Array.from({ length: 8 }, (_, i) => ({
  number: 8 - i,
  title: null, // null = jeszcze nie uzupełnione
  href: YOUTUBE_URL,
}));

export default function Odcinki() {
  return (
    <Layout
      title="Odcinki"
      description="Archiwum odcinków kanału poCADuchy.">
      <div className={styles.wrap}>
        <div className={styles.intro}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowBar} />
            <span>Archiwum</span>
          </div>
          <h1 className={styles.title}>Wszystkie odcinki z kanału</h1>
          <p className={styles.lead}>
            Podgląd archiwum — miniatury i tytuły do podmiany na realne dane
            odcinków.
          </p>
        </div>

        <div className={styles.grid}>
          {EPISODES.map((ep) => (
            <a
              key={ep.number}
              href={ep.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.card} pc-cut-card`}>
              <div className={styles.thumb}>
                <span className={styles.thumbLabel}>MINIATURA</span>
                <div className={styles.playIcon} />
              </div>
              <div className={styles.meta}>
                <span className={styles.epNumber}>ODCINEK {ep.number}</span>
                <span className={styles.epTitle}>
                  {ep.title ?? 'Wstaw tytuł odcinka'}
                </span>
                <span className={styles.epDate}>-- : -- · --.--.----</span>
              </div>
            </a>
          ))}
        </div>

        <div className={styles.footerCta}>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btn} pc-cut`}>
            Zobacz wszystkie odcinki na YouTube
          </a>
        </div>
      </div>
    </Layout>
  );
}
