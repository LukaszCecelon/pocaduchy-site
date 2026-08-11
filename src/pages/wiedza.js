import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Okruszki from '@site/src/components/Okruszki';
import {absolutePageUrl, SITE_URL, formatLongDatePl} from '@site/src/lib/site';
import styles from './wiedza.module.css';
import artykuly from '@site/src/data/wiedza-artykuly.json';

const SCIEZKA = '/wiedza';
const OPIS =
  'Praktyczna baza wiedzy dla konstruktorów maszyn: rozwiązania, tabele i normy ' +
  'opracowane po inżyniersku, z przykładami z realnych projektów.';

// Lista artykułów jest jednocześnie treścią strony i źródłem danych
// strukturalnych, więc obie rzeczy biorą się z tego samego manifestu.
function daneStrukturalne() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${absolutePageUrl(SCIEZKA)}#kolekcja`,
        name: 'Baza wiedzy',
        description: OPIS,
        inLanguage: 'pl-PL',
        isPartOf: {'@id': `${SITE_URL}/#strona`},
      },
      {
        '@type': 'ItemList',
        '@id': `${absolutePageUrl(SCIEZKA)}#lista`,
        numberOfItems: artykuly.length,
        itemListElement: artykuly.map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: absolutePageUrl(`${SCIEZKA}/${a.slug}`),
          name: a.title,
        })),
      },
    ],
  };
}


// Znaki na kafelkach. Rysowane kodem, zeby kafelek nie ciagnal zadnego pliku
// i zeby dalo sie je poprawic bez wracania do grafiki. To sa symbole, a nie
// rysunki techniczne: maja powiedziec "o tym jest ten material" w polsekundy,
// wiec zadnych wymiarow ani tolerancji.

// Kolek walcowy i diamentowy w dwoch skrecanych plytach. To jest podpis
// rozpoznawczy tego artykulu, bo wlasnie ta para wraca w nim najczesciej.
function ZnakPozycjonowanie() {
  return (
    <svg viewBox="0 0 60 40" className={styles.znak} aria-hidden="true" focusable="false">
      <rect x="6" y="11" width="48" height="8" className={styles.znakPlyta} />
      <rect x="6" y="21" width="48" height="8" className={styles.znakPlyta} />
      <circle cx="20" cy="20" r="5" className={styles.znakKolek} />
      <path d="M40 15 L45 20 L40 25 L35 20 Z" className={styles.znakKolek} />
    </svg>
  );
}

// Pierscien osadczy: otwarty pierscien z dwoma uchami pod szczypce.
function ZnakPierscien() {
  return (
    <svg viewBox="0 0 60 40" className={styles.znak} aria-hidden="true" focusable="false">
      <path
        d="M42 11 A 13 13 0 1 0 42 29"
        className={styles.znakLinia}
        transform="rotate(-90 30 20)"
      />
      <circle cx="21.5" cy="8.8" r="2" className={styles.znakLinia} />
      <circle cx="38.5" cy="8.8" r="2" className={styles.znakLinia} />
    </svg>
  );
}

// Sruba z lbem szesciokatnym: leb, trzpien i kreski gwintu.
function ZnakGwint() {
  const kreski = [30, 34, 38, 42, 46, 50];
  return (
    <svg viewBox="0 0 60 40" className={styles.znak} aria-hidden="true" focusable="false">
      <rect x="6" y="11" width="10" height="18" className={styles.znakPlyta} />
      <rect x="16" y="15" width="38" height="10" className={styles.znakLinia} />
      {kreski.map((x) => (
        <line key={x} x1={x} y1="15" x2={x} y2="25" className={styles.znakGwint} />
      ))}
    </svg>
  );
}

// Znak dobiera sie po slugu, wiec nowy artykul bez wpisu po prostu go nie ma
// i nic sie nie psuje.
const ZNAKI = {
  'pozycjonowanie-czesci-w-maszynie': ZnakPozycjonowanie,
  'rowki-pod-pierscienie-osadcze-seger': ZnakPierscien,
  'gwinty-metryczne-tabela': ZnakGwint,
};

export default function Wiedza() {
  return (
    <Layout
      title="Baza wiedzy dla konstruktorów maszyn"
      description={OPIS}>
      <Head>
        <script type="application/ld+json">{JSON.stringify(daneStrukturalne())}</script>
      </Head>

      <div className={styles.wrap}>
        <Okruszki sciezka={[{nazwa: 'Wiedza', url: SCIEZKA}]} />
        <div className={styles.intro}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowBar} />
            <span>Baza wiedzy</span>
          </div>
          <h1 className={styles.title}>
            Wzory, tabele i poradniki, które faktycznie się przydają
          </h1>
          <p className={styles.lead}>
            {artykuly.length > 0
              ? 'Materiały, po które sięgam w codziennej pracy nad maszynami. Będzie się rozrastać wraz z kanałem.'
              : 'Miejsce na wzory, tabele i normy, po które sięgam w codziennej pracy. Sekcja powstaje i będzie rosła wraz z kanałem.'}
          </p>
        </div>

        {/* Lista jest płaska. Dopóki artykułów jest kilka, dzielenie ich na
            działy niczego nie porządkuje, a zakopuje treść o jedno kliknięcie
            głębiej. Wrócimy do tego, gdy lista realnie urośnie. */}
        {artykuly.length > 0 ? (
          <div className={styles.grid}>
            {artykuly.map((a, i) => {
              const Znak = ZNAKI[a.slug];
              return (
              <Link
                key={a.slug}
                to={`${SCIEZKA}/${a.slug}`}
                className={`${styles.card} pc-cut-card`}>
                <span className={styles.cardGora}>
                  <span className={styles.cardN}>{String(i + 1).padStart(2, '0')}</span>
                  {Znak ? <Znak /> : null}
                </span>
                <h2 className={styles.cardTitle}>{a.title}</h2>
                <p className={styles.cardBody}>{a.description}</p>
                {a.date ? (
                  <div className={styles.cardFooter}>
                    <span className={styles.soonTag}>{formatLongDatePl(a.date)}</span>
                  </div>
                ) : null}
              </Link>
              );
            })}
          </div>
        ) : (
          <div className={`${styles.empty} pc-cut-card`}>
            <h2 className={styles.emptyTitle}>Baza wiedzy w budowie</h2>
            <p className={styles.emptyBody}>
              Pracuję nad materiałami: wzory, tabele tolerancji i normy
              rysunkowe. W międzyczasie zajrzyj do artykułów o codziennej
              pracy konstruktora.
            </p>
            <Link to="/blog/" className={`${styles.emptyCta} pc-cut`}>
              Przejdź do artykułów →
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
