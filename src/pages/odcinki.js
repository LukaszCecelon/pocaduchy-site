import React from 'react';
import Layout from '@theme/Layout';
import styles from './odcinki.module.css';
import episodesData from '../data/episodes.json';

const YOUTUBE_URL = 'https://youtube.com/@pocaduchy';

// Dane generuje scripts/fetch-episodes.mjs (prebuild/prestart) z feedu RSS
// kanału — bez ręcznego utrzymania. Tu pokazujemy pełne odcinki, bez shortsów.
const EPISODES = episodesData.episodes.filter((e) => !e.isShort);

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

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
            Pełne odcinki od najnowszego — kliknij, żeby obejrzeć na YouTube.
            Lista aktualizuje się automatycznie.
          </p>
        </div>

        {EPISODES.length > 0 ? (
          <div className={styles.grid}>
            {EPISODES.map((ep) => (
              <a
                key={ep.id}
                href={ep.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.card} pc-cut-card`}>
                <div className={styles.thumb}>
                  <img src={ep.thumbnail} alt="" loading="lazy" />
                  <div className={styles.playBadge}>
                    <div className={styles.playIcon} />
                  </div>
                </div>
                <div className={styles.meta}>
                  <span className={styles.epDate}>{formatDate(ep.published)}</span>
                  <span className={styles.epTitle}>{ep.title}</span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className={`${styles.empty} pc-cut-card`}>
            <span className={styles.emptyLabel}>Odcinki wkrótce</span>
            <p className={styles.emptyBody}>
              Nie udało się pobrać listy odcinków — zajrzyj bezpośrednio na
              kanał.
            </p>
          </div>
        )}

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
