import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Okruszki from '@site/src/components/Okruszki';
import posts from '@site/src/data/blog-posts.json';
import subscribers from '@site/src/data/subscribers.json';
import styles from './o-mnie.module.css';

const SITE = 'https://pocaduchy.pl';
const YOUTUBE_URL = 'https://youtube.com/@pocaduchy';
const LINKEDIN_URL = 'https://www.linkedin.com/in/lukaszcecelon';
const TIKTOK_URL = 'https://www.tiktok.com/@pocaduchy';
const CONTACT_EMAIL = 'RA-Engineering@outlook.com';
const SUBSCRIBERS = subscribers?.count || null;

// Rozszerzenie encji Person zdefiniowanej globalnie w docusaurus.config.js.
// Ten sam @id, więc wyszukiwarki scalają oba opisy w jedną osobę.
const AUTOR_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE}/o-mnie#profil`,
  url: `${SITE}/o-mnie`,
  inLanguage: 'pl-PL',
  mainEntity: {
    '@type': 'Person',
    '@id': `${SITE}/#lukasz`,
    name: 'Łukasz Cecelon',
    jobTitle: 'Inżynier konstruktor',
    email: CONTACT_EMAIL,
    url: `${SITE}/o-mnie`,
    image: `${SITE}/img/pocaduchy-logo-transparent.png`,
    knowsAbout: [
      'konstrukcja maszyn',
      'projektowanie 3D CAD',
      'rysunek techniczny',
      'automatyzacja produkcji',
      'elementy znormalizowane',
      'druk 3D FDM',
      'dokumentacja wykonawcza',
    ],
    knowsLanguage: 'pl',
    sameAs: [YOUTUBE_URL, LINKEDIN_URL, TIKTOK_URL],
  },
};

const SCIEZKA = [
  {
    rok: 'od 2018',
    tytul: 'Projektowanie maszyn i linii zautomatyzowanych',
    tresc:
      'Praca konstruktorska przy urządzeniach dla produkcji: transportery, układy kartezjańskie, automatyczne montaże, paletyzacje. Stąd biorą się wszystkie liczby i przykłady, które podaję w artykułach.',
  },
  {
    rok: '2021',
    tytul: 'Własna działalność inżynierska',
    tresc:
      'Otwarcie firmy świadczącej usługi inżynierskie. Sam musiałem od zera wybrać, wycenić i kupić całe wyposażenie: stację roboczą, licencję CAD, narzędzia pomiarowe i drukarkę 3D. Część wniosków z tych zakupów opisałem w artykule o narzędziach pracy.',
  },
  {
    rok: 'dziś',
    tytul: 'Konstrukcje, prototypy i kanał poCADuchy',
    tresc:
      'Projektowanie na zlecenie, druk 3D prototypów i audyty dokumentacji, a obok tego kanał na YouTube, na którym pokazuję tę samą pracę bez upiększania: decyzje, koszty i błędy.',
  },
];

const OBSZARY = [
  'Konstrukcje maszyn i elementów maszynowych w 3D',
  'Dokumentacja wykonawcza i rysunek techniczny',
  'Dobór elementów znormalizowanych i napędów',
  'Automatyzacja i robotyzacja stanowisk produkcyjnych',
  'Druk 3D FDM: prototypy i elementy funkcjonalne',
  'Audyt dokumentacji pod kątem wykonalności',
];

export default function OMnie() {
  const najnowsze = posts.slice(0, 3);

  return (
    <Layout
      title="Łukasz Cecelon, inżynier konstruktor maszyn"
      description="Kim jestem i skąd biorą się treści na poCADuchy: doświadczenie w projektowaniu maszyn i linii zautomatyzowanych, własne biuro konstrukcyjne od 2021 roku, obszary specjalizacji i kontakt.">
      <Head>
        <script type="application/ld+json">{JSON.stringify(AUTOR_JSON_LD)}</script>
      </Head>

      <div className={styles.wrap}>
        <Okruszki sciezka={[{nazwa: 'O mnie', url: '/o-mnie'}]} />

        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowBar} />
              <span>O mnie</span>
            </div>
            <h1 className={styles.title}>
              Łukasz Cecelon, inżynier konstruktor
            </h1>
            <p className={styles.lead}>
              Projektuję maszyny i zautomatyzowane linie produkcyjne. Od 2021
              roku prowadzę własne biuro konstrukcyjne, a na kanale poCADuchy
              pokazuję tę pracę taką, jaka jest naprawdę: z decyzjami, kosztami
              i błędami, o których zwykle się nie mówi.
            </p>
          </div>
          <img
            src="/img/pocaduchy-logo-transparent.png"
            alt="Łukasz Cecelon, inżynier konstruktor i autor kanału poCADuchy"
            className={styles.avatar}
          />
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>Dlaczego powstało poCADuchy</h2>
          <div className={styles.prose}>
            <p>
              Kiedy zaczynałem, brakowało mi treści pokazujących realną pracę
              konstruktora. Podręczniki uczą wzorów, katalogi producentów
              zachwalają produkty, a między jednym a drugim jest cała szara
              strefa decyzji: projektować czy kupić gotowe, gdzie oszczędzić, a
              gdzie na pewno nie, ile realnie zajmie zaprojektowanie modułu.
            </p>
            <p>
              Właśnie o tym są moje materiały. Nie udaję, że mam patent na
              wszystko. Piszę o tym, co sam sprawdziłem w projektach, i podaję
              konkretne liczby, żeby każdy mógł je odnieść do swojej sytuacji.
              Tam, gdzie coś jest moją subiektywną oceną, zaznaczam to wprost.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Droga zawodowa</h2>
          <ol className={styles.timeline}>
            {SCIEZKA.map((e) => (
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
          <h2 className={styles.h2}>Czym się zajmuję</h2>
          <ul className={styles.obszary}>
            {OBSZARY.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
          <p className={styles.prose}>
            Jeśli szukasz kogoś do konkretnego projektu, zakres współpracy i
            sposób jej prowadzenia opisałem w zakładce{' '}
            <Link to="/uslugi">Usługi</Link>.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Gdzie mnie znajdziesz</h2>
          <div className={styles.kanaly}>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.kanal} pc-cut-card`}>
              <span className={styles.kanalNazwa}>YouTube</span>
              <span className={styles.kanalOpis}>
                {SUBSCRIBERS
                  ? `Kanał poCADuchy, ${new Intl.NumberFormat('pl-PL').format(SUBSCRIBERS)} subskrybentów`
                  : 'Kanał poCADuchy'}
              </span>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.kanal} pc-cut-card`}>
              <span className={styles.kanalNazwa}>LinkedIn</span>
              <span className={styles.kanalOpis}>
                Tam najpierw ukazują się moje artykuły i tam toczy się dyskusja
              </span>
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.kanal} pc-cut-card`}>
              <span className={styles.kanalNazwa}>TikTok</span>
              <span className={styles.kanalOpis}>Krótkie formy z warsztatu i CAD-a</span>
            </a>
            <Link to="/blog" className={`${styles.kanal} pc-cut-card`}>
              <span className={styles.kanalNazwa}>Artykuły</span>
              <span className={styles.kanalOpis}>
                {posts.length} tekstów o praktyce konstruktora
              </span>
            </Link>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={`${styles.kanal} pc-cut-card`}>
              <span className={styles.kanalNazwa}>E-mail</span>
              <span className={styles.kanalOpis}>Sprawy projektowe i współpraca</span>
            </a>
          </div>
        </section>

        {najnowsze.length ? (
          <section className={styles.section}>
            <h2 className={styles.h2}>Ostatnio napisałem</h2>
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
