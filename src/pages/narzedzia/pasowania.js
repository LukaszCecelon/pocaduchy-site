import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import ReactMarkdown from 'react-markdown';
import Okruszki from '@site/src/components/Okruszki';
import KalkulatorPasowan from '@site/src/components/KalkulatorPasowan';
import {absolutePageUrl, SITE_URL} from '@site/src/lib/site';
import tresc from '@site/content/wiedza-pasowania.json';
import styles from './pasowania.module.css';

const SCIEZKA = '/narzedzia/pasowania';
const PAGE_URL = absolutePageUrl(SCIEZKA);

// Dane strukturalne. Kalkulator sam w sobie jest dla wyszukiwarki niewidoczny,
// bo tresc powstaje po interakcji, wiec opisujemy strone jako artykul, a nie
// jako aplikacje. Bez FAQPage: pytania z pliku tresci nie sa wyswietlane na
// tej stronie, a dane strukturalne musza odpowiadac widocznej tresci.
function daneStrukturalne() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#artykul`,
        headline: tresc.meta.tytul,
        description: tresc.meta.opis,
        inLanguage: 'pl-PL',
        author: {'@id': `${SITE_URL}/#lukasz`},
        publisher: {'@id': `${SITE_URL}/#organizacja`},
        isPartOf: {'@id': `${SITE_URL}/#strona`},
      },
    ],
  };
}

export default function Pasowania() {
  return (
    <Layout title={tresc.meta.tytul} description={tresc.meta.opis}>
      <Head>
        <script type="application/ld+json">{JSON.stringify(daneStrukturalne())}</script>
      </Head>

      <div className={styles.wrap}>
        <Okruszki
          sciezka={[
            {nazwa: 'Narzędzia', url: '/narzedzia'},
            {nazwa: 'Pasowania', url: SCIEZKA},
          ]}
        />

        <header className={styles.hero}>
          <h1 className={styles.title}>{tresc.naglowek}</h1>
          <p className={styles.lead}>{tresc.lead}</p>
        </header>

        <KalkulatorPasowan />

        {/* Warstwa tresci dla czytelnika i dla wyszukiwarki. Sam formularz
            nie wypozycjonuje sie na nic, bo jego zawartosc powstaje dopiero
            po klikniecu. */}
        {tresc.sekcje.map((s) => (
          <section key={s.tytul} className={styles.sekcja}>
            <h2 className={styles.h2}>{s.tytul}</h2>
            {s.akapity.map((a) => (
              <div key={a.slice(0, 30)} className={styles.tekst}>
                <ReactMarkdown>{a}</ReactMarkdown>
              </div>
            ))}
          </section>
        ))}

        <section className={styles.sekcja}>
          <h2 className={styles.h2}>{tresc.zobaczTez.tytul}</h2>
          <p className={styles.tekstProsty}>
            {tresc.zobaczTez.linki.map((link, i) => (
              <React.Fragment key={link.url}>
                {i === 0 ? null : ` ${tresc.zobaczTez.spojnik} `}
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
