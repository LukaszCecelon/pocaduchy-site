import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {absolutePageUrl} from '@site/src/lib/site';
import nawigacja from '@site/content/nawigacja.json';
import styles from './Okruszki.module.css';

// Ścieżka nawigacji widoczna na stronie plus odpowiadające jej dane
// strukturalne BreadcrumbList. Google pokazuje taką ścieżkę zamiast
// surowego adresu URL w wynikach wyszukiwania.
//
// Użycie: <Okruszki sciezka={[{nazwa: 'Usługi', url: '/uslugi'}]} />
// Strona główna dokładana jest automatycznie jako pierwszy element.
export default function Okruszki({sciezka = []}) {
  const pelna = [{nazwa: nawigacja.stronaGlowna, url: '/'}, ...sciezka];

  // Staly identyfikator, zeby okruszki dalo sie scalic z reszta grafu strony
  // zamiast dokladac anonimowy byt obok istniejacych.
  const ostatniAdres = pelna[pelna.length - 1].url;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${absolutePageUrl(ostatniAdres)}#okruszki`,
    itemListElement: pelna.map((el, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: el.nazwa,
      item: absolutePageUrl(el.url),
    })),
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      <nav className={styles.okruszki} aria-label={nawigacja.ariaOkruszki}>
        {pelna.map((el, i) => {
          const ostatni = i === pelna.length - 1;
          return (
            <React.Fragment key={el.url}>
              {ostatni ? (
                <span aria-current="page">{el.nazwa}</span>
              ) : (
                <Link to={el.url}>{el.nazwa}</Link>
              )}
              {ostatni ? null : <span className={styles.sep}>/</span>}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
