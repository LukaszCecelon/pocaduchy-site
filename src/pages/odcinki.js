import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './odcinki.module.css';
import episodesData from '../data/episodes.json';

const SITE = 'https://pocaduchy.pl';
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

// Lista odcinków jako dane strukturalne — każdy wpis to VideoObject
// z tytułem, miniaturą i datą publikacji, wskazujący na YouTube.
const EPISODES_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE}/odcinki#lista`,
  name: 'Odcinki kanału poCADuchy',
  numberOfItems: EPISODES.length,
  itemListElement: EPISODES.map((ep, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'VideoObject',
      name: ep.title,
      thumbnailUrl: ep.thumbnail,
      uploadDate: ep.published,
      url: ep.url,
      embedUrl: `https://www.youtube.com/embed/${ep.id}`,
      description: ep.title,
      inLanguage: 'pl-PL',
      publisher: {'@id': `${SITE}/#organizacja`},
    },
  })),
};

export default function Odcinki() {
  return (
    <Layout
      title="Odcinki — archiwum filmów o konstruowaniu maszyn"
      description="Wszystkie odcinki kanału poCADuchy w jednym miejscu: projektowanie w CAD, druk 3D, montaż i realne problemy inżynierskie z warsztatu.">
      <Head>
        <script type="application/ld+json">{JSON.stringify(EPISODES_JSON_LD)}</script>
      </Head>
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
                  <img
                    src={ep.thumbnail}
                    alt={`Miniatura odcinka: ${ep.title}`}
                    loading="lazy"
                  />
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
