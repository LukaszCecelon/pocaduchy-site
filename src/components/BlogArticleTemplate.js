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

        {/* Dyskusja toczy się pod oryginalnym postem na LinkedIn — pokazujemy
            przycisk tylko wtedy, gdy artykuł ma podany link. */}
        {linkedinUrl ? (
          <aside className={`${styles.discussBox} pc-cut-card`}>
            <div className={styles.discussText}>
              <span className={styles.discussLabel}>Dyskusja</span>
              <p className={styles.discussBody}>
                Masz własne doświadczenia z tym tematem? Napisz w komentarzu
                pod oryginalnym postem.
              </p>
            </div>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.discussBtn} pc-cut`}>
              <svg
                className={styles.discussIcon}
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false">
                <path
                  fill="currentColor"
                  d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"
                />
              </svg>
              Skomentuj na LinkedIn
            </a>
          </aside>
        ) : null}

        <div className={styles.divider} />
        <Link to="/blog" className={styles.backLink}>
          ← Wróć do artykułów
        </Link>
      </div>
    </Layout>
  );
}
