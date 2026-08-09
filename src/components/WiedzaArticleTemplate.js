import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import BlockRenderer from './BlockRenderer';
import {SITE_URL, absolutePageUrl, formatLongDatePl} from '@site/src/lib/site';
import styles from './WiedzaArticleTemplate.module.css';

// Dane strukturalne artykułu: TechArticle (treść techniczna) + ścieżka
// okruszków. Dzięki temu Google i modele AI wiedzą, że to artykuł
// merytoryczny, kto jest autorem i gdzie leży w strukturze serwisu.
function articleJsonLd({title, description, date, permalink}) {
  const url = absolutePageUrl(permalink || '/');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${url}#artykul`,
        headline: title,
        description,
        inLanguage: 'pl-PL',
        url,
        mainEntityOfPage: url,
        image: `${SITE_URL}/img/og-pocaduchy.jpg`,
        ...(date ? {datePublished: date, dateModified: date} : {}),
        author: {'@id': `${SITE_URL}/#lukasz`},
        publisher: {'@id': `${SITE_URL}/#organizacja`},
        isPartOf: {'@id': `${SITE_URL}/#strona`},
        audience: {
          '@type': 'Audience',
          audienceType: 'konstruktorzy, inżynierowie mechanicy, technolodzy',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#okruszki`,
        itemListElement: [
          {'@type': 'ListItem', position: 1, name: 'Strona główna', item: absolutePageUrl('/')},
          {'@type': 'ListItem', position: 2, name: 'Wiedza', item: absolutePageUrl('/wiedza')},
          {'@type': 'ListItem', position: 3, name: title, item: url},
        ],
      },
    ],
  };
}

// Layout artykułu bazy Wiedzy. Treść (blocks) przychodzi z pliku danych
// w content/wiedza/<slug>.json, edytowanego ręcznie.
export default function WiedzaArticleTemplate({
  title,
  seoTitle,
  description,
  date,
  permalink,
  linkedinUrl,
  blocks,
}) {
  return (
    <Layout title={seoTitle || title} description={description}>
      <Head>
        <meta property="og:type" content="article" />
        {date ? <meta property="article:published_time" content={date} /> : null}
        <meta property="article:author" content="Łukasz Cecelon" />
        <script type="application/ld+json">
          {JSON.stringify(articleJsonLd({title, description, date, permalink}))}
        </script>
      </Head>

      <div className={styles.wrap}>
        <div className={styles.breadcrumb}>
          <Link to="/wiedza">Wiedza</Link> / <span>{title}</span>
        </div>

        <div className={styles.layout}>
          <div>
            <h1 className={styles.title}>{title}</h1>
            {description ? <p className={styles.lead}>{description}</p> : null}
            {date ? (
              <p className={styles.meta}>
                <time dateTime={date}>{formatLongDatePl(date)}</time> · Łukasz Cecelon
              </p>
            ) : null}
            <BlockRenderer blocks={blocks} />

            {/* Materiał ukazał się najpierw na LinkedIn. Odnośnik do oryginału
                stoi pod treścią, żeby nie wyprowadzał czytelnika ze strony,
                zanim ten w ogóle zacznie czytać. */}
            {linkedinUrl ? (
              <p className={styles.zrodlo}>
                Ten materiał ukazał się najpierw na LinkedIn.{' '}
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                  Zobacz oryginalną publikację ↗
                </a>
              </p>
            ) : null}
          </div>

          <div className={`${styles.sidebar} pc-cut-card`}>
            <span className={styles.sidebarLabel}>Baza wiedzy</span>
            <Link to="/wiedza" className={styles.sidebarNote}>
              ← Wszystkie materiały
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
