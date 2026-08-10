import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Okruszki from '@site/src/components/Okruszki';
import Przelicznik from '@site/src/components/Przelicznik';
import {wymiar as znajdzWymiar, przelicz, formatuj} from '@site/src/lib/jednostki/oblicz';
import {DEFINICJE} from '@site/src/lib/jednostki/definicje';
import {absolutePageUrl, SITE_URL} from '@site/src/lib/site';
import hub from '@site/content/przelicznik.json';
import styles from './PrzelicznikWymiarTemplate.module.css';

// Kolejnosc i podpisy stron wymiarow. Trzymam je tutaj, bo kazda strona
// linkuje do pozostalych i lista musi byc jedna dla wszystkich.
export const STRONY_WYMIAROW = [
  {id: 'cisnienie', slug: 'cisnienie', nazwa: 'Ciśnienie i naprężenie'},
  {id: 'dlugosc', slug: 'dlugosc', nazwa: 'Długość'},
  {id: 'moment', slug: 'moment-obrotowy', nazwa: 'Moment obrotowy'},
  {id: 'sila', slug: 'sila', nazwa: 'Siła'},
  {id: 'temperatura', slug: 'temperatura', nazwa: 'Temperatura'},
  {id: 'moc', slug: 'moc', nazwa: 'Moc'},
];

// Para startowa dla kazdej strony. Bez tego narzedzie otwiera sie na dwoch
// pierwszych jednostkach z listy, czyli na przyklad Pa na hPa, i uzytkownik
// widzi przeliczenie, ktorego nikt nigdy nie potrzebowal.
const START = {
  cisnienie: {od: 'cisnienie|bar', na: 'cisnienie|psi', wartosc: '6'},
  dlugosc: {od: 'dlugosc|cal', na: 'dlugosc|mm', wartosc: '1'},
  moment: {od: 'moment|lbf·ft', na: 'moment|N·m', wartosc: '50'},
  sila: {od: 'sila|kgf', na: 'sila|N', wartosc: '100'},
  temperatura: {od: 'temperatura|°C', na: 'temperatura|°F', wartosc: '20'},
  moc: {od: 'moc|KM', na: 'moc|kW', wartosc: '10'},
};

/**
 * Tabela przeliczen gotowa w kodzie strony, zanim ruszy jakikolwiek JavaScript.
 * Wiersze to wszystkie jednostki wymiaru, kolumny tylko te najczestsze, bo
 * dziewietnascie kolumn nie miesci sie nigdzie poza monitorem 4K.
 */
function tabela(idWymiaru) {
  const w = znajdzWymiar(idWymiaru);
  const kolumny = w.jednostki.filter((j) => j.c).slice(0, 6);
  const uzyte = kolumny.length >= 2 ? kolumny : w.jednostki.slice(0, 5);
  return {
    kolumny: uzyte,
    wiersze: w.jednostki.map((j) => ({
      symbol: j.s,
      nazwa: j.n,
      komorki: uzyte.map((k) => ({
        symbol: k.s,
        tekst:
          k.s === j.s ? '1' : formatuj(przelicz(1, `${w.id}|${j.s}`, `${w.id}|${k.s}`)),
      })),
    })),
  };
}

export default function PrzelicznikWymiarTemplate({tresc}) {
  const w = znajdzWymiar(tresc.wymiar);
  const strona = STRONY_WYMIAROW.find((s) => s.id === tresc.wymiar);
  const sciezka = `/przelicznik/${strona.slug}`;
  const adres = absolutePageUrl(sciezka);
  const tab = tabela(tresc.wymiar);
  const start = START[tresc.wymiar];
  const pozostale = STRONY_WYMIAROW.filter((s) => s.id !== tresc.wymiar);

  const daneStrukturalne = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${adres}#artykul`,
        headline: tresc.meta.tytul,
        description: tresc.meta.opis,
        inLanguage: 'pl-PL',
        author: {'@id': `${SITE_URL}/#lukasz`},
        publisher: {'@id': `${SITE_URL}/#organizacja`},
        isPartOf: {'@id': `${SITE_URL}/#strona`},
      },
      {
        '@type': 'FAQPage',
        '@id': `${adres}#pytania`,
        mainEntity: tresc.faq.map((p) => ({
          '@type': 'Question',
          name: p.pytanie,
          acceptedAnswer: {'@type': 'Answer', text: p.odpowiedz},
        })),
      },
    ],
  };

  return (
    <Layout title={tresc.meta.tytul} description={tresc.meta.opis}>
      <Head>
        <link rel="canonical" href={adres} />
        <script type="application/ld+json">{JSON.stringify(daneStrukturalne)}</script>
      </Head>

      <div className={styles.wrap}>
        <Okruszki
          sciezka={[
            {nazwa: 'Narzędzia', url: '/narzedzia'},
            {nazwa: 'Przelicznik jednostek', url: '/przelicznik'},
            {nazwa: strona.nazwa, url: sciezka},
          ]}
        />

        <header className={styles.hero}>
          <h1 className={styles.title}>{tresc.naglowek}</h1>
          <p className={styles.lead}>{tresc.lead}</p>
        </header>

        <Przelicznik
          wymiarStaly={tresc.wymiar}
          odStart={start.od}
          naStart={start.na}
          wartoscStart={start.wartosc}
        />

        <section className={styles.sekcja}>
          {tresc.wstep.map((akapit) => (
            <p key={akapit} className={styles.tekst}>
              {akapit}
            </p>
          ))}
        </section>

        <section className={styles.sekcja}>
          <h2 className={styles.h2}>Na czym się przewracamy</h2>
          {tresc.pulapki.map((p) => (
            <div key={p.tytul} className={styles.pulapka}>
              <h3 className={styles.h3}>{p.tytul}</h3>
              <p className={styles.tekst}>{p.tresc}</p>
            </div>
          ))}
        </section>

        <section className={styles.sekcja}>
          <h2 className={styles.h2}>Tabela przeliczeń</h2>
          <p className={styles.tekstMaly}>
            Każdy wiersz mówi, ile wynosi jedna jednostka z lewej kolumny w pozostałych
            jednostkach. Wartości zaokrąglone do sześciu cyfr znaczących.
          </p>
          <div className={styles.przewijak}>
            <table className={styles.tabela}>
              <thead>
                <tr>
                  <th scope="col">1 jednostka</th>
                  {tab.kolumny.map((k) => (
                    <th key={k.s} scope="col">
                      {k.s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tab.wiersze.map((wiersz) => (
                  <tr key={wiersz.symbol}>
                    <th scope="row">
                      <b>{wiersz.symbol}</b>
                      <span>{wiersz.nazwa}</span>
                    </th>
                    {wiersz.komorki.map((k) => (
                      <td key={k.symbol}>{k.tekst}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.sekcja}>
          <h2 className={styles.h2}>Skąd się biorą te jednostki</h2>
          <div className={styles.definicje}>
            {w.jednostki.map((j) => {
              const d = DEFINICJE[`${w.id}|${j.s}`];
              if (!d) return null;
              return (
                <article key={j.s} className={styles.def}>
                  <h3 className={styles.defTytul}>
                    {j.s} <small>{j.n}</small>
                  </h3>
                  <p>{d.d}</p>
                  <p className={styles.gdzie}>{d.g}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.sekcja}>
          <h2 className={styles.h2}>Najczęstsze pytania</h2>
          {tresc.faq.map((p) => (
            <div key={p.pytanie}>
              <h3 className={styles.h3}>{p.pytanie}</h3>
              <p className={styles.tekst}>{p.odpowiedz}</p>
            </div>
          ))}
        </section>

        <section className={styles.sekcja}>
          <h2 className={styles.h2}>Pozostałe wymiary</h2>
          <div className={styles.linki}>
            {pozostale.map((s) => (
              <Link key={s.id} className={styles.link} to={`/przelicznik/${s.slug}/`}>
                {s.nazwa}
              </Link>
            ))}
            <Link className={styles.link} to="/przelicznik/">
              {hub.naglowek}
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
