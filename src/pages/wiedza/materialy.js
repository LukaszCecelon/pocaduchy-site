import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from '../../css/wiedza-category.module.css';

const ITEMS = [
  {
    title: 'Dobór materiałów',
    body: 'Ściągawka do szybkich decyzji konstrukcyjnych bez zgadywania.',
  },
];

export default function Materialy() {
  return (
    <Layout title="Materiały konstrukcyjne" description="Dobór materiałów do zastosowań konstrukcyjnych.">
      <div className={styles.wrap}>
        <div className={styles.breadcrumb}>
          <Link to="/wiedza">Wiedza</Link> / <span>Materiały konstrukcyjne</span>
        </div>
        <div className={styles.intro}>
          <h1 className={styles.title}>Materiały konstrukcyjne</h1>
          <p className={styles.lead}>
            Dobór materiałów do zastosowań konstrukcyjnych — dział dopiero
            startuje, będzie rozbudowywany.
          </p>
        </div>
        <div className={styles.grid}>
          {ITEMS.map((item, i) => (
            <Link key={item.title} to="/wiedza/materialy/wzorzec-artykulu" className={`${styles.card} pc-cut-card`}>
              <div className={styles.cardHead}>
                <span className={styles.cardN}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.badge}>W przygotowaniu</span>
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardBody}>{item.body}</p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
