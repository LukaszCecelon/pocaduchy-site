import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from '../../css/wiedza-category.module.css';
import articles from '@site/src/data/wiedza-elementy.json';

// Lista artykułów pochodzi z src/data/wiedza-elementy.json, generowanego
// przez scripts/build-content-pages.mjs z plików w content/wiedza/elementy/.
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
        {articles.length > 0 ? (
          <div className={styles.grid}>
            {articles.map((a, i) => (
              <Link
                key={a.slug}
                to={`/wiedza/elementy/${a.slug}`}
                className={`${styles.card} pc-cut-card`}>
                <div className={styles.cardHead}>
                  <span className={styles.cardN}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className={styles.cardTitle}>{a.title}</h3>
                <p className={styles.cardBody}>{a.description}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className={styles.lead}>Pierwsze artykuły w tym dziale pojawią się wkrótce.</p>
        )}
      </div>
    </Layout>
  );
}
