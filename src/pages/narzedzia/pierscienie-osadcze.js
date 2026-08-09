import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Okruszki from '@site/src/components/Okruszki';
import KalkulatorPierscieni from '@site/src/components/KalkulatorPierscieni';
import {absolutePageUrl, SITE_URL} from '@site/src/lib/site';
import tresc from '@site/content/narzedzia-pierscienie.json';
import styles from './pierscienie-osadcze.module.css';

const SCIEZKA = '/narzedzia/pierscienie-osadcze';
const PAGE_URL = absolutePageUrl(SCIEZKA);

// Kalkulator jest dla wyszukiwarki niewidoczny, bo wynik powstaje dopiero po
// wpisaniu srednicy. Strone opisujemy wiec jako artykul z pytaniami.
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
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}#pytania`,
        mainEntity: tresc.faq.map((pytanie) => ({
          '@type': 'Question',
          name: pytanie.pytanie,
          acceptedAnswer: {'@type': 'Answer', text: pytanie.odpowiedz},
        })),
      },
    ],
  };
}

export default function PierscienieOsadcze() {
  return (
    <Layout title={tresc.meta.tytul} description={tresc.meta.opis}>
      <Head>
        <script type="application/ld+json">{JSON.stringify(daneStrukturalne())}</script>
      </Head>

      <div className={styles.wrap}>
        <Okruszki
          sciezka={[
            {nazwa: 'Narzędzia', url: '/narzedzia'},
            {nazwa: 'Pierścienie osadcze', url: SCIEZKA},
          ]}
        />

        <header className={styles.hero}>
          <h1 className={styles.title}>{tresc.naglowek}</h1>
          <p className={styles.lead}>{tresc.lead}</p>
        </header>

        <KalkulatorPierscieni />

        <section className={styles.sekcja}>
          <h2 className={styles.h2}>Najczęstsze pytania</h2>
          {tresc.faq.map((p) => (
            <div key={p.pytanie} className={styles.tekst}>
              <h3 className={styles.h3}>{p.pytanie}</h3>
              <p>{p.odpowiedz}</p>
            </div>
          ))}
        </section>

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
