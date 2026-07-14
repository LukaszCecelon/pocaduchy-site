import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './blog.module.css';
import posts from '@site/src/data/blog-posts.json';

function formatDate(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

// Lista wpisów pochodzi z src/data/blog-posts.json, generowanego przez
// scripts/build-content-pages.mjs z plików w content/blog/.
export default function Blog() {
  return (
    <Layout
      title="Blog"
      description="Artykuły o konstruowaniu i pracy inżyniera — rozwinięte z LinkedIn.">
      <div className={styles.wrap}>
        <div className={styles.intro}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowBar} />
            <span>Blog</span>
          </div>
          <h1 className={styles.title}>Artykuły o konstruowaniu</h1>
          <p className={styles.lead}>
            Teksty przeniesione i rozwinięte z LinkedIn — o warsztacie,
            projektowaniu i codziennej pracy inżyniera.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className={styles.postsGrid}>
            {posts.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className={`${styles.postCard} pc-cut-card`}>
                {p.date ? <span className={styles.postDate}>{formatDate(p.date)}</span> : null}
                <h3 className={styles.postTitle}>{p.title}</h3>
                <p className={styles.postBody}>{p.description}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className={`${styles.empty} pc-cut-card`}>
            <span className={styles.emptyLabel}>Pierwszy artykuł wkrótce</span>
            <p className={styles.emptyBody}>
              Ta sekcja czeka na pierwsze teksty rozwinięte z LinkedIn.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
