import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Okruszki from '@site/src/components/Okruszki';
import {absolutePageUrl, SITE_URL, formatLongDatePl} from '@site/src/lib/site';
import kategorie from '@site/content/wiedza-kategorie.json';
import styles from '@site/src/pages/wiedza.module.css';

// Dane strukturalne dzialu: kolekcja artykulow. Dzieki temu wyszukiwarka widzi
// liste jako spis tresci dzialu, a nie jako przypadkowy zbior linkow.
function daneStrukturalne({klucz, nazwa, lead, sciezka, artykuly}) {
  const url = absolutePageUrl(sciezka);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#dzial`,
        name: nazwa,
        description: lead,
        inLanguage: 'pl-PL',
        isPartOf: {'@id': `${SITE_URL}/#strona`},
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#lista`,
        name: nazwa,
        numberOfItems: artykuly.length,
        itemListElement: artykuly.map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: absolutePageUrl(`/wiedza/${klucz}/${a.slug}`),
          name: a.title,
        })),
      },
    ],
  };
}

// Strona dzialu bazy wiedzy. Powstaje automatycznie przez
// scripts/build-content-pages.mjs dla kazdego dzialu, ktory ma juz artykuly.
export default function WiedzaKategoriaTemplate({klucz, artykuly = []}) {
  const dzial = kategorie.dzialy[klucz];
  const sciezka = `/wiedza/${klucz}`;

  return (
    <Layout title={`${dzial.nazwa} dla konstruktorów`} description={dzial.lead}>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(daneStrukturalne({klucz, nazwa: dzial.nazwa, lead: dzial.lead, sciezka, artykuly}))}
        </script>
      </Head>

      <div className={styles.wrap}>
        <Okruszki
          sciezka={[
            {nazwa: 'Wiedza', url: '/wiedza'},
            {nazwa: dzial.nazwa, url: sciezka},
          ]}
        />

        <div className={styles.intro}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowBar} />
            <span>{kategorie.ui.eyebrow}</span>
          </div>
          <h1 className={styles.title}>{dzial.nazwa}</h1>
          <p className={styles.lead}>{dzial.lead}</p>
        </div>

        {artykuly.length ? (
          <div className={styles.grid}>
            {artykuly.map((a, i) => (
              <Link
                key={a.slug}
                to={`${sciezka}/${a.slug}`}
                className={`${styles.card} pc-cut-card`}>
                <span className={styles.cardN}>{String(i + 1).padStart(2, '0')}</span>
                <h2 className={styles.cardTitle}>{a.title}</h2>
                <p className={styles.cardBody}>{a.description}</p>
                {a.date ? (
                  <div className={styles.cardFooter}>
                    <span className={styles.soonTag}>{formatLongDatePl(a.date)}</span>
                  </div>
                ) : null}
              </Link>
            ))}
          </div>
        ) : (
          <p className={styles.lead}>{kategorie.ui.pusty}</p>
        )}
      </div>
    </Layout>
  );
}
