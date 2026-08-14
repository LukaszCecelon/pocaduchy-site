import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Okruszki from '@site/src/components/Okruszki';
import {absolutePageUrl, SITE_URL, formatLongDatePl} from '@site/src/lib/site';
import styles from './wiedza.module.css';
import artykuly from '@site/src/data/wiedza-artykuly.json';
import dzialyTresc from '@site/content/wiedza-dzialy.json';

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

// Szukanie ma dzialac tak, jak ludzie pisza: bez ogonkow, bez wielkich liter
// i bez trafiania w odmiane. Dlatego porownujemy uproszczone formy, a nie
// tekst wprost.
const OGONKI = {ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z'};

function uprosc(tekst) {
  return (tekst || '')
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (z) => OGONKI[z])
    .replace(/\s+/g, ' ')
    .trim();
}

// Polska liczba mnoga: 1 material, 2 do 4 materialy, reszta materialow.
// Nastki lecza sie z ta regula, wiec 12 to materialow, nie materialy.
function odmienMaterial(n) {
  if (n === 1) return 'materiał';
  const ost = n % 10;
  const dwie = n % 100;
  if (ost >= 2 && ost <= 4 && !(dwie >= 12 && dwie <= 14)) return 'materiały';
  return 'materiałów';
}

function pasuje(artykul, fraza) {
  if (!fraza) return true;
  // Slowa kluczowe sa czescia stogu, bo tytul i opis nie zawieraja wszystkich
  // okreslen, ktorych ludzie uzywaja. Ktos szuka "seger", a w tytule stoi
  // "pierscienie osadcze".
  const stog = uprosc(
    `${artykul.title} ${artykul.description} ${(artykul.slowaKluczowe || []).join(' ')}`,
  );
  // Kazde slowo z zapytania musi gdzies byc. Dzieki temu "tolerancje gwintu"
  // znajduje artykul, w ktorym te dwa slowa nie stoja obok siebie.
  return uprosc(fraza)
    .split(' ')
    .every((slowo) => stog.includes(slowo));
}

export default function Wiedza() {
  const [fraza, setFraza] = React.useState('');

  // Dzialy trzymaja kolejnosc z pliku tresci, a nie z danych artykulow.
  // Dzial bez trafien znika, zeby wynik szukania nie byl lista pustych naglowkow.
  const grupy = dzialyTresc.dzialy
    .map((d) => ({
      ...d,
      pozycje: artykuly.filter((a) => (a.kategoria || 'inne') === d.id && pasuje(a, fraza)),
    }))
    .filter((d) => d.pozycje.length > 0);

  const znalezione = grupy.reduce((suma, d) => suma + d.pozycje.length, 0);

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

        {/* Szukajka filtruje po stronie przegladarki. Wszystkie artykuly sa
            w statycznym HTML, wiec wyszukiwarka i czytnik ekranu widza cala
            liste niezaleznie od tego, co wpisano w pole. */}
        {artykuly.length > 0 ? (
          <div className={styles.szukajka}>
            <label className={styles.szukajkaLabel} htmlFor="szukaj-w-wiedzy">
              Szukaj w bazie wiedzy
            </label>
            <input
              id="szukaj-w-wiedzy"
              type="search"
              className={styles.szukajkaPole}
              placeholder="np. tolerancja, gwint, chropowatość"
              value={fraza}
              onChange={(e) => setFraza(e.target.value)}
              autoComplete="off"
            />
            <p className={styles.szukajkaWynik} role="status">
              {fraza
                ? `${znalezione} z ${artykuly.length}`
                : `${artykuly.length} ${odmienMaterial(artykuly.length)}`}
            </p>
          </div>
        ) : null}

        {artykuly.length > 0 ? (
          grupy.length > 0 ? (
            grupy.map((dzial) => (
              <section key={dzial.id} className={styles.dzial}>
                <div className={styles.dzialGlowa}>
                  <h2 className={styles.dzialNazwa}>{dzial.nazwa}</h2>
                  <p className={styles.dzialOpis}>{dzial.opis}</p>
                </div>
                <div className={styles.grid}>
                  {dzial.pozycje.map((a, i) => {
                    const Znak = ZNAKI[a.slug];
                    return (
                      <Link
                        key={a.slug}
                        to={`${SCIEZKA}/${a.slug}/`}
                        className={`${styles.card} pc-cut-card`}>
                        <span className={styles.cardGora}>
                          <span className={styles.cardN}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {Znak ? <Znak /> : null}
                        </span>
                        <h3 className={styles.cardTitle}>{a.title}</h3>
                        <p className={styles.cardBody}>{a.description}</p>
                        {a.date ? (
                          <div className={styles.cardFooter}>
                            <span className={styles.soonTag}>
                              {formatLongDatePl(a.date)}
                            </span>
                          </div>
                        ) : null}
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))
          ) : (
            <p className={styles.brakWynikow}>
              Nic nie pasuje do „{fraza}". Spróbuj krótszego słowa albo{' '}
              <button
                type="button"
                className={styles.wyczysc}
                onClick={() => setFraza('')}>
                pokaż wszystko
              </button>
              .
            </p>
          )
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
