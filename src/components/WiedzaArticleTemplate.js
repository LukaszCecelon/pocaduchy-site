import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './WiedzaArticleTemplate.module.css';

export default function WiedzaArticleTemplate({ categoryLabel, categoryHref }) {
  return (
    <Layout title="Wzorzec artykułu" description="Wzorzec strony artykułu w bazie wiedzy.">
      <div className={styles.wrap}>
        <div className={styles.breadcrumb}>
          <Link to="/wiedza">Wiedza</Link> /{' '}
          <Link to={categoryHref}>{categoryLabel}</Link> /{' '}
          <span>Nazwa artykułu</span>
        </div>

        <div className={styles.layout}>
          <div>
            <span className={styles.badge}>Wzorzec strony artykułu</span>
            <h1 className={styles.title}>Tu pojawi się tytuł artykułu</h1>
            <p className={styles.lead}>
              Tu pojawi się treść: opis zagadnienia, wzór, tabela lub
              instrukcja krok po kroku — w zależności od artykułu.
            </p>
            <div className={styles.placeholder}>
              <span className={styles.placeholderLabel}>
                Miejsce na wzór / tabelę / rysunek
              </span>
            </div>
            <p className={styles.lead}>Kolejny akapit treści — do uzupełnienia.</p>
          </div>

          <div className={`${styles.sidebar} pc-cut-card`}>
            <span className={styles.sidebarLabel}>Na tej stronie</span>
            <span className={styles.sidebarNote}>
              Spis treści artykułu pojawi się tutaj
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
