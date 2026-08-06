import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Okruszki from '@site/src/components/Okruszki';
import {absolutePageUrl, SITE_URL} from '@site/src/lib/site';
import tresc from '@site/content/narzedzia.json';
import styles from './narzedzia.module.css';

const SCIEZKA = '/narzedzia';
const PAGE_URL = absolutePageUrl(SCIEZKA);

// Lista narzedzi jest jednoczesnie trescia strony i zrodlem danych
// strukturalnych, wiec obie rzeczy biora sie z tego samego pliku JSON.
function daneStrukturalne() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${PAGE_URL}#kolekcja`,
        name: tresc.meta.tytul,
        description: tresc.meta.opis,
        inLanguage: 'pl-PL',
        isPartOf: {'@id': `${SITE_URL}/#strona`},
        about: {'@id': `${SITE_URL}/#organizacja`},
      },
      {
        '@type': 'ItemList',
        '@id': `${PAGE_URL}#lista`,
        name: tresc.naglowek,
        numberOfItems: tresc.narzedzia.length,
        itemListElement: tresc.narzedzia.map((n, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: absolutePageUrl(n.url),
          name: n.tytul,
        })),
      },
    ],
  };
}

export default function Narzedzia() {
  return (
    <Layout title={tresc.meta.tytul} description={tresc.meta.opis}>
      <Head>
        <script type="application/ld+json">{JSON.stringify(daneStrukturalne())}</script>
      </Head>

      <div className={styles.wrap}>
        <Okruszki sciezka={[{nazwa: 'Narzędzia', url: SCIEZKA}]} />

        <div className={styles.intro}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowBar} />
            <span>{tresc.eyebrow}</span>
          </div>
          <h1 className={styles.title}>{tresc.naglowek}</h1>
          <p className={styles.lead}>{tresc.lead}</p>
        </div>

        <div className={styles.grid}>
          {tresc.narzedzia.map((n) => (
            <Link key={n.url} to={n.url} className={`${styles.card} pc-cut-card`}>
              <span className={styles.cardTag}>{n.tag}</span>
              <h2 className={styles.cardTitle}>{n.tytul}</h2>
              <p className={styles.cardBody}>{n.opis}</p>
              <span className={styles.cardDane}>{n.dane}</span>
            </Link>
          ))}
        </div>

        <section className={styles.kolejka}>
          <h2 className={styles.kolejkaTytul}>{tresc.wKolejceTytul}</h2>
          <p className={styles.kolejkaOpis}>{tresc.wKolejceOpis}</p>
          <ul className={styles.kolejkaLista}>
            {tresc.wKolejce.map((p) => (
              <li key={p.slice(0, 24)} className={styles.kolejkaPozycja}>{p}</li>
            ))}
          </ul>
        </section>

        <section className={styles.kolejka}>
          <h2 className={styles.kolejkaTytul}>{tresc.zobaczTez.tytul}</h2>
          <p className={styles.kolejkaOpis}>
            {tresc.zobaczTez.wstep}{' '}
            {tresc.zobaczTez.linki.map((link, i) => (
              <React.Fragment key={link.url}>
                {i === 0 ? null : ' oraz '}
                <Link to={link.url}>{link.tekst}</Link>
              </React.Fragment>
            ))}
            .
          </p>
        </section>
      </div>
    </Layout>
  );
}
