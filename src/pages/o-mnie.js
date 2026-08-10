import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Okruszki from '@site/src/components/Okruszki';
import posts from '@site/src/data/blog-posts.json';
import subscribers from '@site/src/data/subscribers.json';
import tresc from '@site/content/o-mnie.json';
import {SITE_URL} from '@site/src/lib/site';
import styles from './o-mnie.module.css';
const YOUTUBE_URL = 'https://youtube.com/@pocaduchy';
const LINKEDIN_URL = 'https://www.linkedin.com/in/lukaszcecelon';
const TIKTOK_URL = 'https://www.tiktok.com/@pocaduchy';
const CONTACT_EMAIL = 'RA-Engineering@outlook.com';
const SUBSCRIBERS = subscribers?.count || null;

// Cała treść tej strony siedzi w content/o-mnie.json, żeby dało się ją
// poprawiać bez dotykania kodu.
const {hero, dlaczego, sciezka, obszary, warsztat, kanaly, ostatnie, meta} = tresc;

// Rozszerzenie encji Person zdefiniowanej globalnie w docusaurus.config.js.
// Ten sam @id, więc wyszukiwarki scalają oba opisy w jedną osobę. Wykształcenie
// i certyfikaty są tu istotne: Google ocenia treści poradnikowe m.in. przez
// pryzmat udokumentowanego doświadczenia autora.
const AUTOR_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/o-mnie#profil`,
  url: `${SITE_URL}/o-mnie`,
  inLanguage: 'pl-PL',
  mainEntity: {
    '@type': 'Person',
    '@id': `${SITE_URL}/#lukasz`,
    name: 'Łukasz Cecelon',
    jobTitle: 'Inżynier konstruktor',
    description: tresc.biogram,
    email: CONTACT_EMAIL,
    url: `${SITE_URL}/o-mnie`,
    image: `${SITE_URL}/img/pocaduchy-logo-transparent.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mielec',
      addressRegion: 'podkarpackie',
      addressCountry: 'PL',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Politechnika Rzeszowska im. Ignacego Łukasiewicza',
    },
    worksFor: {'@type': 'Organization', name: 'Sure Solutions'},
    hasCredential: (warsztat?.certyfikaty?.pozycje || []).map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c,
    })),
    knowsAbout: [
      'konstrukcja maszyn',
      'automatyzacja produkcji',
      'Autodesk Inventor',
      'SOLIDWORKS',
      'dokumentacja wykonawcza',
      'ATEX',
      'GD&T',
      'druk 3D FDM',
    ],
    knowsLanguage: ['pl', 'en'],
    sameAs: [YOUTUBE_URL, LINKEDIN_URL, TIKTOK_URL],
  },
};

export default function OMnie() {
  const najnowsze = posts.slice(0, 3);

  return (
    <Layout title={meta.tytul} description={meta.opis}>
      <Head>
        <script type="application/ld+json">{JSON.stringify(AUTOR_JSON_LD)}</script>
      </Head>

      <div className={styles.wrap}>
        <Okruszki sciezka={[{nazwa: 'O mnie', url: '/o-mnie'}]} />

        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowBar} />
              <span>{hero.eyebrow}</span>
            </div>
            <h1 className={styles.title}>{hero.naglowek}</h1>
            <p className={styles.lead}>{hero.lead}</p>
          </div>
          <img
            src="/img/pocaduchy-logo-transparent.png"
            alt="Łukasz Cecelon, inżynier konstruktor i autor kanału poCADuchy"
            className={styles.avatar}
          />
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>{dlaczego.naglowek}</h2>
          <div className={styles.prose}>
            {dlaczego.akapity.map((a) => (
              <p key={a.slice(0, 40)}>{a}</p>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>{sciezka.naglowek}</h2>
          <ol className={styles.timeline}>
            {sciezka.wpisy.map((e) => (
              <li key={e.tytul} className={styles.tItem}>
                <span className={styles.tRok}>{e.rok}</span>
                <div className={styles.tCopy}>
                  <h3 className={styles.tTytul}>{e.tytul}</h3>
                  <p className={styles.tTresc}>{e.tresc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>{obszary.naglowek}</h2>
          <ul className={styles.obszary}>
            {obszary.pozycje.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
          <p className={styles.prose}>
            Jeśli szukasz kogoś do konkretnego tematu, zakres i przebieg
            współpracy opisałem w zakładce <Link to="/uslugi/">Usługi</Link>.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>{warsztat.naglowek}</h2>
          <div className={styles.warsztat}>
            <div className={styles.wBlok}>
              <span className={styles.wEtykieta}>{warsztat.narzedzia.etykieta}</span>
              <p className={styles.wTresc}>{warsztat.narzedzia.tresc}</p>
            </div>
            <div className={styles.wBlok}>
              <span className={styles.wEtykieta}>{warsztat.certyfikaty.etykieta}</span>
              <ul className={styles.wLista}>
                {warsztat.certyfikaty.pozycje.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div className={styles.wBlok}>
              <span className={styles.wEtykieta}>
                {warsztat.wyksztalcenie.etykieta}
              </span>
              <p className={styles.wTresc}>{warsztat.wyksztalcenie.tresc}</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>{kanaly.naglowek}</h2>
          <div className={styles.kanaly}>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.kanal} pc-cut-card`}>
              <span className={styles.kanalNazwa}>YouTube</span>
              <span className={styles.kanalOpis}>
                {SUBSCRIBERS
                  ? `${kanaly.youtubeOpis}, ${new Intl.NumberFormat('pl-PL').format(SUBSCRIBERS)} subskrybentów`
                  : kanaly.youtubeOpis}
              </span>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.kanal} pc-cut-card`}>
              <span className={styles.kanalNazwa}>LinkedIn</span>
              <span className={styles.kanalOpis}>{kanaly.linkedinOpis}</span>
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.kanal} pc-cut-card`}>
              <span className={styles.kanalNazwa}>TikTok</span>
              <span className={styles.kanalOpis}>{kanaly.tiktokOpis}</span>
            </a>
            <Link to="/blog/" className={`${styles.kanal} pc-cut-card`}>
              <span className={styles.kanalNazwa}>Artykuły</span>
              <span className={styles.kanalOpis}>
                {posts.length} {kanaly.blogOpis}
              </span>
            </Link>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={`${styles.kanal} pc-cut-card`}>
              <span className={styles.kanalNazwa}>E-mail</span>
              <span className={styles.kanalOpis}>{kanaly.mailOpis}</span>
            </a>
          </div>
        </section>

        {najnowsze.length ? (
          <section className={styles.section}>
            <h2 className={styles.h2}>{ostatnie.naglowek}</h2>
            <div className={styles.ostatnie}>
              {najnowsze.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className={styles.ostatniLink}>
                  {p.seoTitle || p.title}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </Layout>
  );
}
