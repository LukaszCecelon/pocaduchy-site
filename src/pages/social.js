import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './social.module.css';
import episodesData from '../data/episodes.json';

const YOUTUBE_URL = 'https://youtube.com/@pocaduchy';
// Kanały bez href renderują się jako nieklikalne karty "wkrótce".
// Gdy konto powstanie — wystarczy dopisać href, reszta zadzieje się sama.
const CHANNELS = [
  {
    name: 'YOUTUBE',
    body: 'Odcinki o budowie pracowni i realnych wyzwaniach inżynierskich.',
    cta: 'Subskrybuj →',
    href: YOUTUBE_URL,
  },
  {
    name: 'LINKEDIN',
    body: 'Zawodowa strona projektowania — realizacje i wnioski z pracy inżynierskiej.',
    cta: 'Obserwuj →',
  },
  {
    name: 'INSTAGRAM',
    body: 'Kulisy pracowni i krótkie ujęcia z bieżących projektów.',
    cta: 'Obserwuj →',
  },
  {
    name: 'TIKTOK',
    body: 'Krótkie, szybkie wstawki z warsztatu — bez lania wody.',
    cta: 'Obserwuj →',
  },
];

// Ostatnie 3 pełne odcinki z automatycznie generowanego episodes.json
const PREVIEW_EPISODES = episodesData.episodes
  .filter((e) => !e.isShort)
  .slice(0, 3);

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function Social() {
  return (
    <Layout title="Social media" description="Wszystkie kanały poCADuchy w jednym miejscu.">
      <div className={styles.wrap}>
        <div className={styles.intro}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowBar} />
            <span>Social media</span>
          </div>
          <h1 className={styles.title}>Wszystkie kanały w jednym miejscu</h1>
          <p className={styles.lead}>
            Od warsztatu po codzienną robotę przy komputerze — wybierz
            platformę, na której chcesz mnie śledzić.
          </p>
        </div>

        <div className={styles.channelGrid}>
          {CHANNELS.map((c) =>
            c.href ? (
              <a
                key={c.name}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.channelCard} pc-cut-card`}>
                <span className={styles.channelName}>{c.name}</span>
                <p className={styles.channelBody}>{c.body}</p>
                <span className={styles.channelCta}>{c.cta}</span>
              </a>
            ) : (
              <div
                key={c.name}
                className={`${styles.channelCard} ${styles.channelCardSoon} pc-cut-card`}>
                <span className={styles.channelNameSoon}>{c.name}</span>
                <p className={styles.channelBody}>{c.body}</p>
                <span className={styles.soonTag}>Wkrótce</span>
              </div>
            ),
          )}
        </div>

        <div className={styles.sectionHead}>
          <div>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowBar} />
              <span>Archiwum</span>
            </div>
            <h2 className={styles.sectionTitle}>Ostatnie odcinki</h2>
          </div>
          <Link to="/odcinki" className={styles.sectionLink}>
            Zobacz pełne archiwum →
          </Link>
        </div>
        <div className={styles.epGrid}>
          {PREVIEW_EPISODES.map((ep) => (
            <a
              key={ep.id}
              href={ep.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.epCard} pc-cut-card`}>
              <div className={styles.epThumb}>
                <img src={ep.thumbnail} alt="" loading="lazy" />
                <div className={styles.playBadge}>
                  <div className={styles.playIcon} />
                </div>
              </div>
              <div className={styles.epMeta}>
                <span className={styles.epNumber}>{formatDate(ep.published)}</span>
                <span className={styles.epTitle}>{ep.title}</span>
              </div>
            </a>
          ))}
        </div>

        <div className={styles.postsBlock}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowBar} />
            <span>Posty</span>
          </div>
          <div className={`${styles.postsPlaceholder} pc-cut-card`}>
            <span className={styles.postsLabel}>Miejsce na osadzone posty</span>
            <p className={styles.postsBody}>
              Do uzupełnienia po podłączeniu kont społecznościowych.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
