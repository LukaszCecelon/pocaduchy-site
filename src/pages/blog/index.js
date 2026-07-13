import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './blog.module.css';

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

        <div className={`${styles.empty} pc-cut-card`}>
          <span className={styles.emptyLabel}>Pierwszy artykuł wkrótce</span>
          <p className={styles.emptyBody}>
            Ta sekcja czeka na pierwsze teksty rozwinięte z LinkedIn. Układ
            strony artykułu jest już gotowy — możesz go zobaczyć poniżej.
          </p>
          <Link to="/blog/wzorzec-artykulu" className={styles.emptyLink}>
            Zobacz wzorzec strony artykułu →
          </Link>
        </div>
      </div>
    </Layout>
  );
}
