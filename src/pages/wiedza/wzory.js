import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from '../../css/wiedza-category.module.css';
import articles from '@site/src/data/wiedza-wzory.json';

// Lista artykułów pochodzi z src/data/wiedza-wzory.json, generowanego przez
// scripts/build-content-pages.mjs z plików w content/wiedza/wzory/.
export default function Wzory() {
  return (
    <Layout
      title="Wzory i tabele"
      description="Obliczenia wytrzymałościowe, tolerancje i normy rysunkowe.">
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
        {articles.length > 0 ? (
          <div className={styles.grid}>
            {articles.map((a, i) => (
              <Link
                key={a.slug}
                to={`/wiedza/wzory/${a.slug}`}
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
