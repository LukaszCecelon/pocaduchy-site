import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Okruszki from '@site/src/components/Okruszki';
import {SITE_URL, formatLongDatePl} from '@site/src/lib/site';
import {wymiaryObrazu} from '@site/src/lib/obrazy';
import styles from './blog.module.css';
import posts from '@site/src/data/blog-posts.json';

// Spis artykułów jako dane strukturalne (Blog + lista wpisów).
const BLOG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${SITE_URL}/blog#blog`,
  name: 'Artykuły o konstruowaniu - poCADuchy',
  url: `${SITE_URL}/blog`,
  inLanguage: 'pl-PL',
  publisher: {'@id': `${SITE_URL}/#organizacja`},
  isPartOf: {'@id': `${SITE_URL}/#strona`},
  blogPost: posts.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    url: `${SITE_URL}/blog/${p.slug}`,
    ...(p.date ? {datePublished: p.date} : {}),
    author: {'@id': `${SITE_URL}/#lukasz`},
  })),
};

// Lista wpisów pochodzi z src/data/blog-posts.json, generowanego przez
// scripts/build-content-pages.mjs z plików w content/blog/.
export default function Blog() {
  return (
    <Layout
      title="Artykuły o konstruowaniu maszyn"
      description="Artykuły o pracy konstruktora: dobór elementów, decyzje projektowe, koszty i praktyka warsztatowa z realnych projektów.">
      <Head>
        <script type="application/ld+json">{JSON.stringify(BLOG_JSON_LD)}</script>
      </Head>

      <div className={styles.wrap}>
        <Okruszki sciezka={[{nazwa: 'Artykuły', url: '/blog'}]} />
        <div className={styles.intro}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowBar} />
            <span>Artykuły</span>
          </div>
          <h1 className={styles.title}>Artykuły o konstruowaniu</h1>
          <p className={styles.lead}>
            O warsztacie, projektowaniu i codziennej pracy inżyniera -
            decyzje, koszty i wnioski z realnych projektów.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className={styles.postsGrid}>
            {posts.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className={`${styles.postCard} pc-cut-card`}>
                {p.image ? (
                  <div className={styles.postThumb}>
                    <img src={p.image} alt={p.title} loading="lazy" {...wymiaryObrazu(p.image)} />
                  </div>
                ) : null}
                <div className={styles.postMeta}>
                  {p.date ? (
                    <span className={styles.postDate}>{formatLongDatePl(p.date)}</span>
                  ) : null}
                  <h2 className={styles.postTitle}>{p.title}</h2>
                  <p className={styles.postBody}>{p.description}</p>
                  <span className={styles.postCta}>Czytaj →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={`${styles.empty} pc-cut-card`}>
            <span className={styles.emptyLabel}>Pierwszy artykuł wkrótce</span>
            <p className={styles.emptyBody}>
              Ta sekcja czeka na pierwsze teksty.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
