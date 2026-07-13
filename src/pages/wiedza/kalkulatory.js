import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from '../../css/wiedza-category.module.css';

export default function Kalkulatory() {
  return (
    <Layout title="Kalkulatory" description="Interaktywne narzędzia obliczeniowe dla konstruktorów.">
      <div className={styles.wrap}>
        <div className={styles.breadcrumb}>
          <Link to="/wiedza">Wiedza</Link> / <span>Kalkulatory</span>
        </div>
        <div className={styles.intro}>
          <h1 className={styles.title}>Kalkulatory inżynierskie</h1>
          <p className={styles.lead}>
            Interaktywne narzędzia obliczeniowe — w przygotowaniu. Miejsce
            zarezerwowane pod przyszłe kalkulatory.
          </p>
        </div>
        <div className={styles.grid}>
          {[1, 2, 3].map((n) => (
            <div key={n} className={`${styles.slot} pc-cut-card`}>
              <span className={styles.slotPlus}>＋</span>
              <span className={styles.slotLabel}>Miejsce na kalkulator</span>
            </div>
          ))}
        </div>
        <p className={styles.footnote}>
          Napisz, co ma liczyć pierwszy kalkulator, a zbudujemy go w tym
          miejscu.
        </p>
      </div>
    </Layout>
  );
}
