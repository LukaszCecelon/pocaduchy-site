import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Okruszki from '@site/src/components/Okruszki';
import Przelicznik from '@site/src/components/Przelicznik';
import {STRONY_WYMIAROW} from '@site/src/components/PrzelicznikWymiarTemplate';
import {WYMIARY, PLASKA} from '@site/src/lib/jednostki/oblicz';
import {absolutePageUrl, SITE_URL} from '@site/src/lib/site';
import tresc from '@site/content/przelicznik.json';
import styles from './index.module.css';

const SCIEZKA = '/przelicznik';
const PAGE_URL = absolutePageUrl(SCIEZKA);

// Wymiary bez wlasnej strony tez wypisujemy, zeby bylo widac zakres narzedzia.
const OPISANE = new Set(STRONY_WYMIAROW.map((s) => s.id));

function daneStrukturalne() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${PAGE_URL}#aplikacja`,
        name: tresc.meta.tytul,
        description: tresc.meta.opis,
        url: PAGE_URL,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Przeglądarka internetowa',
        inLanguage: 'pl-PL',
        offers: {'@type': 'Offer', price: '0', priceCurrency: 'PLN'},
        publisher: {'@id': `${SITE_URL}/#organizacja`},
      },
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}#pytania`,
        mainEntity: tresc.faq.map((p) => ({
          '@type': 'Question',
          name: p.pytanie,
          acceptedAnswer: {'@type': 'Answer', text: p.odpowiedz},
        })),
      },
    ],
  };
}

// Lead konczy sie zaproszeniem do napisania, wiec ta fraza musi byc klikalna.
// Wyciecie jej z tekstu w kodzie jest prostsze niz wprowadzanie markdownu
// do pliku tresci dla jednego odnosnika.
function LeadZOdnosnikiem({tekst, odnosnik}) {
  if (!odnosnik || !tekst.includes(odnosnik.fraza)) return <>{tekst}</>;
  const [przed, po] = tekst.split(odnosnik.fraza);
  return (
    <>
      {przed}
      <Link to={odnosnik.url}>{odnosnik.fraza}</Link>
      {po}
    </>
  );
}

export default function PrzelicznikHub() {
  const bezStrony = WYMIARY.filter((w) => !OPISANE.has(w.id));

  return (
    <Layout title={tresc.meta.tytul} description={tresc.meta.opis}>
      <Head>
        <link rel="canonical" href={PAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(daneStrukturalne())}</script>
      </Head>

      <div className={styles.wrap}>
        <Okruszki
          sciezka={[
            {nazwa: 'Narzędzia', url: '/narzedzia'},
            {nazwa: 'Przelicznik jednostek', url: SCIEZKA},
          ]}
        />

        <header className={styles.hero}>
          <h1 className={styles.title}>{tresc.naglowek}</h1>
          <p className={styles.lead}>
            <LeadZOdnosnikiem tekst={tresc.lead} odnosnik={tresc.leadLink} />
          </p>
        </header>

        <Przelicznik />

        <section className={styles.sekcja}>
          {tresc.wstep.map((akapit) => (
            <p key={akapit} className={styles.tekst}>
              {akapit}
            </p>
          ))}
        </section>

        <section className={styles.sekcja}>
          <h2 className={styles.h2}>Wielkości opisane osobno</h2>
          <div className={styles.kafelki}>
            {STRONY_WYMIAROW.map((s) => {
              const w = WYMIARY.find((x) => x.id === s.id);
              return (
                <Link key={s.id} className={styles.kafelek} to={`/przelicznik/${s.slug}/`}>
                  <b>{s.nazwa}</b>
                  <span>{w.jednostki.length} jednostek</span>
                </Link>
              );
            })}
          </div>
          <p className={styles.tekstMaly}>
            Pozostałe wielkości działają w przeliczniku powyżej, tylko nie mają jeszcze
            własnej strony z tabelą: {bezStrony.map((w) => w.nazwa.toLowerCase()).join(', ')}.
          </p>
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
          <h2 className={styles.h2}>Pozostałe narzędzia</h2>
          <p className={styles.tekst}>
            Na stronie są jeszcze dwa kalkulatory:{' '}
            <Link to="/narzedzia/pasowania/">pasowań ISO 286</Link> i{' '}
            <Link to="/narzedzia/pierscienie-osadcze/">pierścieni osadczych DIN 471 i 472</Link>.
            Wszystkie razem stoją w <Link to="/narzedzia/">Narzędziach</Link>. Przelicznik
            obejmuje {PLASKA.length} jednostek w {WYMIARY.length} wielkościach.
          </p>
        </section>
      </div>
    </Layout>
  );
}
