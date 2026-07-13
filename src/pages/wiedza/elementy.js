import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from '../../css/wiedza-category.module.css';

const ITEMS = [
  {
    title: 'Dobór łożysk i połączeń',
    body: 'Praktyczne wytyczne z warsztatu, nie tylko z katalogu producenta.',
  },
];

export default function Elementy() {
  return (
    <Layout title="Elementy standardowe" description="Łożyska, połączenia i inne elementy znormalizowane.">
      <div className={styles.wrap}>
        <div className={styles.breadcrumb}>
          <Link to="/wiedza">Wiedza</Link> / <span>Elementy standardowe</span>
        </div>
        <div className={styles.intro}>
          <h1 className={styles.title}>Elementy standardowe</h1>
          <p className={styles.lead}>
            Łożyska, połączenia i inne elementy znormalizowane — dział
            dopiero startuje, będzie rozbudowywany.
          </p>
        </div>
        <div className={styles.grid}>
          {ITEMS.map((item, i) => (
            <Link key={item.title} to="/wiedza/elementy/wzorzec-artykulu" className={`${styles.card} pc-cut-card`}>
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
