import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from '../../css/wiedza-category.module.css';

const ITEMS = [
  {
    title: 'Wytrzymałość materiałów',
    body: 'Wzory i przykłady obliczeń przydatne przy doborze przekrojów i materiałów.',
  },
  {
    title: 'Tolerancje i pasowania',
    body: 'Tabele ISO do szybkiego sprawdzenia pasowań bez grzebania w normie.',
  },
  {
    title: 'Rysunek techniczny',
    body: 'Normy i oznaczenia, które faktycznie trzeba znać na produkcji.',
  },
];

export default function Wzory() {
  return (
    <Layout title="Wzory i tabele" description="Obliczenia wytrzymałościowe, tolerancje i normy rysunkowe.">
      <div className={styles.wrap}>
        <div className={styles.breadcrumb}>
          <Link to="/wiedza">Wiedza</Link> / <span>Wzory i tabele</span>
        </div>
        <div className={styles.intro}>
          <h1 className={styles.title}>Wzory i tabele</h1>
          <p className={styles.lead}>
            Obliczenia wytrzymałościowe, tabele tolerancji i normy rysunkowe —
            praktyczne ściągawki do szybkiego sprawdzenia.
          </p>
        </div>
        <div className={styles.grid}>
          {ITEMS.map((item, i) => (
            <Link key={item.title} to="/wiedza/wzory/wzorzec-artykulu" className={`${styles.card} pc-cut-card`}>
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
