import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './blog.module.css';

const LINKEDIN_URL = '#'; // TODO: podmień na realny link do posta

export default function BlogWzorzecArtykulu() {
  return (
    <Layout title="Wzorzec artykułu" description="Wzorzec strony artykułu na blogu.">
      <div className={styles.articleWrap}>
        <div className={styles.breadcrumb}>
          <Link to="/blog">Blog</Link> / <span>Nazwa artykułu</span>
        </div>

        <span className={styles.badge}>Wzorzec strony artykułu</span>
        <h1 className={styles.articleTitle}>Tu pojawi się tytuł artykułu</h1>

        <div className={styles.metaRow}>
          <span className={styles.metaDate}>--.--.---- · -- min czytania</span>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={styles.metaLink}>
            Pierwotnie na LinkedIn ↗
          </a>
        </div>

        <p className={styles.articleBody}>
          Tu pojawi się treść artykułu — wklejona i zredagowana wersja tekstu
          z LinkedIn.
        </p>
        <p className={styles.articleBody}>Kolejny akapit treści — do uzupełnienia.</p>

        <div className={styles.divider} />
        <Link to="/blog" className={styles.backLink}>
          ← Wróć do bloga
        </Link>
      </div>
    </Layout>
  );
}
