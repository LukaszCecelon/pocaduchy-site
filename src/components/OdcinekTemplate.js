import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Okruszki from '@site/src/components/Okruszki';
import {SITE_URL, absolutePageUrl, formatShortDatePl} from '@site/src/lib/site';
import epizody from '@site/src/data/episodes.json';
import narzedziaTresc from '@site/content/narzedzia.json';
import postyBloga from '@site/src/data/blog-posts.json';
import styles from './OdcinekTemplate.module.css';

// Data publikacji, miniatura i adres na YouTube pochodza z kanalu, wiec bierzemy
// je z pobranych danych, a nie przepisujemy do pliku tresci. Dzieki temu nie ma
// dwoch zrodel prawdy dla tego samego faktu.
function zKanalu(videoId) {
  return (epizody.episodes || []).find((e) => e.id === videoId) || null;
}

// Czas trwania w tresci jest zapisany dla czlowieka ("11 min"), a schema.org
// oczekuje ISO 8601. Rozdzielamy te dwie rzeczy, zeby nie trzeba bylo pisac
// czasu dwa razy w pliku odcinka.
function czasIso(czasTrwania) {
  if (!czasTrwania) return undefined;
  const m = /^\s*(?:(\d+)\s*h)?\s*(?:(\d+)\s*min)?\s*(?:(\d+)\s*s)?\s*$/.exec(czasTrwania);
  if (!m || (!m[1] && !m[2] && !m[3])) return undefined;
  return `PT${m[1] ? `${Number(m[1])}H` : ''}${m[2] ? `${Number(m[2])}M` : ''}${
    m[3] ? `${Number(m[3])}S` : ''
  }`;
}

function daneStrukturalne({videoId, title, description, permalink, kanal, czasTrwania}) {
  const url = absolutePageUrl(permalink);
  // Okruszki emituja wlasny BreadcrumbList, wiec tutaj go nie powtarzamy.
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${url}#wideo`,
    name: title,
    description,
    thumbnailUrl: kanal ? kanal.thumbnail : undefined,
    uploadDate: kanal ? kanal.published : undefined,
    duration: czasIso(czasTrwania),
    // contentUrl ma prowadzic do pliku wideo, a takiego nie mamy. Sam adres
    // ogladania opisuje embedUrl, wiec contentUrl zostaje pominiete.
    embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
    inLanguage: 'pl-PL',
    publisher: {'@id': `${SITE_URL}/#organizacja`},
    creator: {'@id': `${SITE_URL}/#lukasz`},
    isPartOf: {'@id': `${SITE_URL}/#strona`},
  };
}

export default function OdcinekTemplate({
  videoId,
  title,
  seoTitle,
  description,
  permalink,
  lead,
  czasTrwania,
  czegoSieDowiesz = [],
  sekcje = [],
  wnioski = [],
  narzedzia = [],
  related = [],
}) {
  const kanal = zKanalu(videoId);
  const powiazaneNarzedzia = (narzedzia || [])
    .map((url) => (narzedziaTresc.narzedzia || []).find((n) => n.url === url))
    .filter(Boolean);
  const powiazaneArtykuly = (related || [])
    .map((slug) => (postyBloga || []).find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <Layout title={seoTitle || title} description={description}>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(
            daneStrukturalne({videoId, title, description, permalink, kanal, czasTrwania}),
          )}
        </script>
      </Head>

      <div className={styles.wrap}>
        <Okruszki
          sciezka={[
            {nazwa: 'Odcinki', url: '/odcinki/'},
            {nazwa: title, url: permalink},
          ]}
        />

        <header className={styles.hero}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.meta}>
            {kanal ? <span>{formatShortDatePl(kanal.published)}</span> : null}
            {czasTrwania ? <span>{czasTrwania}</span> : null}
          </p>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
        </header>

        {/* youtube-nocookie: odtwarzacz nie zaklada ciasteczek dopoki widz
            nie kliknie odtwarzania, wiec zgoda na statystyki go nie dotyczy */}
        <div className={styles.odtwarzacz}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title={title}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {czegoSieDowiesz.length > 0 && (
          <section className={styles.sekcja}>
            <h2 className={styles.h2}>Czego dotyczy ten odcinek</h2>
            <ul className={styles.lista}>
              {czegoSieDowiesz.map((p) => (
                <li key={p.slice(0, 40)}>{p}</li>
              ))}
            </ul>
          </section>
        )}

        {sekcje.map((s) => (
          <section key={s.tytul} className={styles.sekcja}>
            <h2 className={styles.h2}>{s.tytul}</h2>
            {s.akapity.map((a) => (
              <p key={a.slice(0, 40)} className={styles.tekst}>
                {a}
              </p>
            ))}
          </section>
        ))}

        {wnioski.length > 0 && (
          <section className={styles.sekcja}>
            <h2 className={styles.h2}>Co z tego wynika</h2>
            <ul className={styles.wnioski}>
              {wnioski.map((w) => (
                <li key={w.slice(0, 40)}>{w}</li>
              ))}
            </ul>
          </section>
        )}

        {(powiazaneNarzedzia.length > 0 || powiazaneArtykuly.length > 0) && (
          <section className={styles.sekcja}>
            <h2 className={styles.h2}>Policz albo doczytaj</h2>
            <div className={styles.kafle}>
              {powiazaneNarzedzia.map((n) => (
                <Link key={n.url} to={n.url} className={styles.kafel}>
                  <span className={styles.kafelTag}>{n.tag}</span>
                  <span className={styles.kafelTytul}>{n.tytul}</span>
                  <span className={styles.kafelDane}>{n.dane}</span>
                </Link>
              ))}
              {powiazaneArtykuly.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}/`} className={styles.kafel}>
                  <span className={styles.kafelTag}>Artykuł</span>
                  <span className={styles.kafelTytul}>{p.title}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <p className={styles.powrot}>
          <Link to="/odcinki/">Wszystkie odcinki</Link>
          {kanal ? (
            <>
              {' '}
              ·{' '}
              <a href={kanal.url} target="_blank" rel="noopener noreferrer">
                Obejrzyj na YouTube
              </a>
            </>
          ) : null}
        </p>
      </div>
    </Layout>
  );
}
