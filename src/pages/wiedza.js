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
            {artykuly.map((a, i) => (
              <Link
                key={a.slug}
                to={`${SCIEZKA}/${a.slug}`}
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
