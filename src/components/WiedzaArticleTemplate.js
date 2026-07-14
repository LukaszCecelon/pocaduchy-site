import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import BlockRenderer from './BlockRenderer';
import styles from './WiedzaArticleTemplate.module.css';

// Layout artykułu bazy Wiedzy — treść (blocks) przychodzi z pliku danych
// w content/wiedza/<kategoria>/<slug>.json, wygenerowanego/edytowanego
// przez panel CMS (/admin) albo bezpośrednio przeze mnie.
export default function WiedzaArticleTemplate({
  title,
  description,
  categoryLabel,
  categoryHref,
  blocks,
}) {
  return (
    <Layout title={title} description={description}>
      <div className={styles.wrap}>
        <div className={styles.breadcrumb}>
          <Link to="/wiedza">Wiedza</Link> /{' '}
          <Link to={categoryHref}>{categoryLabel}</Link> /{' '}
          <span>{title}</span>
        </div>

        <div className={styles.layout}>
          <div>
            <h1 className={styles.title}>{title}</h1>
            {description ? <p className={styles.lead}>{description}</p> : null}
            <BlockRenderer blocks={blocks} />
          </div>

          <div className={`${styles.sidebar} pc-cut-card`}>
            <span className={styles.sidebarLabel}>Dział</span>
            <Link to={categoryHref} className={styles.sidebarNote}>
              ← {categoryLabel}
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
