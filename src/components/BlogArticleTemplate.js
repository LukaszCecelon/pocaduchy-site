import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import BlockRenderer from './BlockRenderer';
import styles from '@site/src/pages/blog/blog.module.css';

function formatDate(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

// Layout wpisu na blogu — treść (blocks) przychodzi z pliku danych
// w content/blog/<slug>.json, wygenerowanego/edytowanego przez panel CMS.
export default function BlogArticleTemplate({
  title,
  description,
  date,
  linkedinUrl,
  blocks,
}) {
  return (
    <Layout title={title} description={description}>
      <div className={styles.articleWrap}>
        <div className={styles.breadcrumb}>
          <Link to="/blog">Blog</Link> / <span>{title}</span>
        </div>

        <h1 className={styles.articleTitle}>{title}</h1>

        {(date || linkedinUrl) && (
          <div className={styles.metaRow}>
            {date ? <span className={styles.metaDate}>{formatDate(date)}</span> : null}
            {linkedinUrl ? (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.metaLink}>
                Pierwotnie na LinkedIn ↗
              </a>
            ) : null}
          </div>
        )}

        <BlockRenderer blocks={blocks} />

        <div className={styles.divider} />
        <Link to="/blog" className={styles.backLink}>
          ← Wróć do bloga
        </Link>
      </div>
    </Layout>
  );
}
