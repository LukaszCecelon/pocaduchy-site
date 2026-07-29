import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import BlockRenderer from './BlockRenderer';
import styles from './WiedzaArticleTemplate.module.css';

const SITE = 'https://pocaduchy.pl';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

// Dane strukturalne artykułu: TechArticle (treść techniczna) + ścieżka
// okruszków. Dzięki temu Google i modele AI wiedzą, że to artykuł
// merytoryczny, kto jest autorem i gdzie leży w strukturze serwisu.
function articleJsonLd({title, description, date, permalink, categoryLabel, categoryHref}) {
  const url = `${SITE}${permalink || ''}`;
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
        image: `${SITE}/img/og-pocaduchy.jpg`,
        ...(date ? {datePublished: date, dateModified: date} : {}),
        author: {'@id': `${SITE}/#lukasz`},
        publisher: {'@id': `${SITE}/#organizacja`},
        isPartOf: {'@id': `${SITE}/#strona`},
        articleSection: categoryLabel,
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
          {'@type': 'ListItem', position: 2, name: 'Wiedza', item: `${SITE}/wiedza`},
          {
            '@type': 'ListItem',
            position: 3,
            name: categoryLabel,
            item: `${SITE}${categoryHref}`,
          },
          {'@type': 'ListItem', position: 4, name: title, item: url},
        ],
      },
    ],
  };
}

// Layout artykułu bazy Wiedzy — treść (blocks) przychodzi z pliku danych
// w content/wiedza/<kategoria>/<slug>.json, wygenerowanego/edytowanego
// przez panel CMS (/admin) albo bezpośrednio przeze mnie.
export default function WiedzaArticleTemplate({
  title,
  description,
  date,
  permalink,
  categoryLabel,
  categoryHref,
  blocks,
}) {
  return (
    <Layout title={title} description={description}>
      <Head>
        <meta property="og:type" content="article" />
        {date ? <meta property="article:published_time" content={date} /> : null}
        <meta property="article:author" content="Łukasz Cecelon" />
        <meta property="article:section" content={categoryLabel} />
        <script type="application/ld+json">
          {JSON.stringify(
            articleJsonLd({title, description, date, permalink, categoryLabel, categoryHref}),
          )}
        </script>
      </Head>

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
            {date ? (
              <p className={styles.meta}>
                <time dateTime={date}>{formatDate(date)}</time> · Łukasz Cecelon
              </p>
            ) : null}
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
