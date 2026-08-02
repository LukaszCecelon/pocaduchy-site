import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Okruszki from '@site/src/components/Okruszki';
import styles from './wiedza.module.css';
import wzory from '@site/src/data/wiedza-wzory.json';
import materialy from '@site/src/data/wiedza-materialy.json';
import elementy from '@site/src/data/wiedza-elementy.json';

function articleCount(n) {
  return n === 1 ? '1 artykuł' : `${n} artykuły`;
}

// Pokazujemy wyłącznie działy, które mają już artykuły - pusty dział pojawi
// się na liście automatycznie, gdy trafi do niego pierwsza treść.
const CATEGORIES = [
  {
    title: 'Wzory i tabele',
    body: 'Obliczenia wytrzymałościowe, tolerancje i normy rysunkowe.',
    href: '/wiedza/wzory',
    articles: wzory,
  },
  {
    title: 'Materiały konstrukcyjne',
    body: 'Dobór materiałów do zastosowań konstrukcyjnych.',
    href: '/wiedza/materialy',
    articles: materialy,
  },
  {
    title: 'Elementy standardowe',
    body: 'Łożyska, połączenia i inne elementy znormalizowane.',
    href: '/wiedza/elementy',
    articles: elementy,
  },
]
  .filter((c) => c.articles.length > 0)
  .map((c, i) => ({
    ...c,
    n: String(i + 1).padStart(2, '0'),
    count: articleCount(c.articles.length),
  }));

export default function Wiedza() {
  return (
    <Layout
      title="Baza wiedzy dla konstruktorów - wzory, tabele i normy"
      description="Praktyczna baza wiedzy dla konstruktorów maszyn: wzory wytrzymałościowe, tabele tolerancji i pasowań, normy rysunkowe DIN i ISO - opracowane po inżyniersku, z przykładami.">
      <div className={styles.wrap}>
        <Okruszki sciezka={[{nazwa: 'Wiedza', url: '/wiedza'}]} />
        <div className={styles.intro}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowBar} />
            <span>Baza wiedzy</span>
          </div>
          <h1 className={styles.title}>
            Wzory, tabele i poradniki, które faktycznie się przydają
          </h1>
          <p className={styles.lead}>
            {CATEGORIES.length > 0
              ? 'Baza uporządkowana w działy - wybierz jeden, żeby przejść dalej. Będzie się rozrastać wraz z kanałem.'
              : 'Miejsce na wzory, tabele i normy, po które sięgam w codziennej pracy. Sekcja powstaje - będzie rosła wraz z kanałem.'}
          </p>
        </div>

        {CATEGORIES.length > 0 ? (
          <div className={styles.grid}>
            {CATEGORIES.map((c) => (
              <Link key={c.title} to={c.href} className={`${styles.card} pc-cut-card`}>
                <span className={styles.cardN}>{c.n}</span>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardBody}>{c.body}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.soonTag}>{c.count}</span>
                </div>
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
            <Link to="/blog" className={`${styles.emptyCta} pc-cut`}>
              Przejdź do artykułów →
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
