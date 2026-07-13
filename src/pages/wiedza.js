import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './wiedza.module.css';

const CATEGORIES = [
  {
    n: '01',
    title: 'Wzory i tabele',
    body: 'Obliczenia wytrzymałościowe, tolerancje i normy rysunkowe.',
    href: '/wiedza/wzory',
    count: '3 w przygotowaniu',
  },
  {
    n: '02',
    title: 'Materiały konstrukcyjne',
    body: 'Dobór materiałów do zastosowań konstrukcyjnych.',
    href: '/wiedza/materialy',
    count: '1 w przygotowaniu',
  },
  {
    n: '03',
    title: 'Elementy standardowe',
    body: 'Łożyska, połączenia i inne elementy znormalizowane.',
    href: '/wiedza/elementy',
    count: '1 w przygotowaniu',
  },
  {
    n: '04',
    title: 'Kalkulatory',
    body: 'Interaktywne narzędzia obliczeniowe.',
    href: '/wiedza/kalkulatory',
    count: 'wkrótce',
  },
];

export default function Wiedza() {
  return (
    <Layout
      title="Wiedza"
      description="Baza wiedzy poCADuchy — wzory, tabele i poradniki dla konstruktorów maszyn.">
      <div className={styles.wrap}>
        <div className={styles.intro}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowBar} />
            <span>Baza wiedzy</span>
          </div>
          <h1 className={styles.title}>
            Wzory, tabele i poradniki, które faktycznie się przydają
          </h1>
          <p className={styles.lead}>
            Baza uporządkowana w działy — wybierz jeden, żeby przejść dalej.
            Będzie się rozrastać wraz z kanałem.
          </p>
        </div>

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
      </div>
    </Layout>
  );
}
