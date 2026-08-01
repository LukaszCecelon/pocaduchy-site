import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import BlockRenderer from './BlockRenderer';
import styles from '@site/src/pages/blog/blog.module.css';

const SITE = 'https://pocaduchy.pl';

function formatDate(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

// Dane strukturalne wpisu: BlogPosting + ścieżka okruszków. Dzięki temu
// Google i modele AI wiedzą, że to artykuł, kto go napisał i kiedy.
function articleJsonLd({title, description, date, permalink, image}) {
  const url = `${SITE}${permalink || ''}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#artykul`,
        headline: title,
        description,
        inLanguage: 'pl-PL',
        url,
        mainEntityOfPage: url,
        image: `${SITE}${image || '/img/og-pocaduchy.jpg'}`,
        ...(date ? {datePublished: date, dateModified: date} : {}),
        author: {'@id': `${SITE}/#lukasz`},
        publisher: {'@id': `${SITE}/#organizacja`},
        isPartOf: {'@id': `${SITE}/#strona`},
        audience: {
          '@type': 'Audience',
          audienceType: 'konstruktorzy, inżynierowie mechanicy, technolodzy',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#okruszki`,
        itemListElement: [
          {'@type': 'ListItem', position: 1, name: 'Strona główna', item: SITE},
          {'@type': 'ListItem', position: 2, name: 'Artykuły', item: `${SITE}/blog`},
          {'@type': 'ListItem', position: 3, name: title, item: url},
        ],
      },
    ],
  };
}

// Layout wpisu na blogu — treść (blocks) przychodzi z pliku danych
// w content/blog/<slug>.json.
export default function BlogArticleTemplate({
  title,
  description,
  date,
  permalink,
  image,
  linkedinUrl,
  blocks,
}) {
  return (
    <Layout title={title} description={description}>
      <Head>
        <meta property="og:type" content="article" />
        {image ? <meta property="og:image" content={`${SITE}${image}`} /> : null}
        {image ? <meta name="twitter:image" content={`${SITE}${image}`} /> : null}
        {date ? <meta property="article:published_time" content={date} /> : null}
        <meta property="article:author" content="Łukasz Cecelon" />
        <script type="application/ld+json">
          {JSON.stringify(articleJsonLd({title, description, date, permalink, image}))}
        </script>
      </Head>

      <div className={styles.articleWrap}>
        <div className={styles.breadcrumb}>
          <Link to="/blog">Artykuły</Link> / <span>{title}</span>
        </div>

        <h1 className={styles.articleTitle}>{title}</h1>

        <div className={styles.metaRow}>
          {date ? (
            <span className={styles.metaDate}>
              <time dateTime={date}>{formatDate(date)}</time> · Łukasz Cecelon
            </span>
          ) : null}
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

        <BlockRenderer blocks={blocks} />

        <div className={styles.divider} />
        <Link to="/blog" className={styles.backLink}>
          ← Wróć do artykułów
        </Link>
      </div>
    </Layout>
  );
}
