import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import BlockRenderer from './BlockRenderer';
import posts from '@site/src/data/blog-posts.json';
import oMnie from '@site/content/o-mnie.json';
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

// Dane strukturalne wpisu: BlogPosting + ścieżka okruszków, a gdy artykuł ma
// sekcję pytań lub instrukcję krok po kroku, dokładamy FAQPage / HowTo.
// Google pokazuje je jako rozszerzony wynik tylko wtedy, gdy ta sama treść
// jest widoczna na stronie, dlatego oba bloki renderujemy też wizualnie.
function articleJsonLd({
  title,
  description,
  date,
  dateModified,
  permalink,
  image,
  tags,
  faq,
  howTo,
}) {
  const url = `${SITE}${permalink || ''}`;
  const graph = [
    {
      '@type': 'BlogPosting',
      '@id': `${url}#artykul`,
      headline: title,
      description,
      inLanguage: 'pl-PL',
      url,
      mainEntityOfPage: url,
      image: `${SITE}${image || '/img/og-pocaduchy.jpg'}`,
      ...(date ? {datePublished: date} : {}),
      ...(date ? {dateModified: dateModified || date} : {}),
      ...(tags && tags.length ? {keywords: tags.join(', ')} : {}),
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
  ];

  if (faq && faq.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#pytania`,
      mainEntity: faq.map((p) => ({
        '@type': 'Question',
        name: p.pytanie,
        acceptedAnswer: {'@type': 'Answer', text: p.odpowiedz},
      })),
    });
  }

  if (howTo && howTo.kroki && howTo.kroki.length) {
    graph.push({
      '@type': 'HowTo',
      '@id': `${url}#instrukcja`,
      name: howTo.nazwa,
      ...(howTo.opis ? {description: howTo.opis} : {}),
      inLanguage: 'pl-PL',
      step: howTo.kroki.map((k, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: k.nazwa,
        text: k.tresc,
      })),
    });
  }

  return {'@context': 'https://schema.org', '@graph': graph};
}

// Sekcja pytań i odpowiedzi. Musi być widoczna na stronie, żeby dane
// strukturalne FAQPage były zgodne z wytycznymi Google.
function Pytania({faq}) {
  if (!faq || !faq.length) return null;
  return (
    <section className={styles.faq}>
      <h2 className={styles.faqTitle}>Najczęstsze pytania</h2>
      <div className={styles.faqList}>
        {faq.map((p) => (
          <details key={p.pytanie} className={styles.faqItem}>
            <summary className={styles.faqQ}>{p.pytanie}</summary>
            <p className={styles.faqA}>{p.odpowiedz}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

// Biogram autora: buduje wiarygodność w oczach Google (doświadczenie autora)
// i daje modelom AI jasną encję osoby stojącej za treścią.
function Autor() {
  return (
    <aside className={styles.authorBox}>
      <img
        src="/img/pocaduchy-logo-transparent.png"
        alt="Łukasz Cecelon, inżynier konstruktor"
        className={styles.authorAvatar}
        loading="lazy"
      />
      <div className={styles.authorText}>
        <span className={styles.authorLabel}>O autorze</span>
        <p className={styles.authorBody}>{oMnie.biogram}</p>
        <Link to="/o-mnie" className={styles.authorLink}>
          Więcej o mnie →
        </Link>
      </div>
    </aside>
  );
}

// Powiązane artykuły. Kolejność: najpierw ręcznie wskazane w polu "related",
// potem uzupełnienie po wspólnych tagach, żeby sekcja nigdy nie była pusta.
function powiazane(slug, related, tags) {
  const inne = posts.filter((p) => p.slug !== slug);
  const wybrane = [];

  for (const s of related || []) {
    const p = inne.find((x) => x.slug === s);
    if (p && !wybrane.includes(p)) wybrane.push(p);
  }
  if (wybrane.length < 3 && tags && tags.length) {
    for (const p of inne) {
      if (wybrane.length >= 3) break;
      if (wybrane.includes(p)) continue;
      if ((p.tags || []).some((t) => tags.includes(t))) wybrane.push(p);
    }
  }
  return wybrane.slice(0, 3);
}

function PrzeczytajTez({slug, related, tags}) {
  const lista = powiazane(slug, related, tags);
  if (!lista.length) return null;
  return (
    <section className={styles.related}>
      <h2 className={styles.relatedTitle}>Przeczytaj też</h2>
      <div className={styles.relatedGrid}>
        {lista.map((p) => (
          <Link
            key={p.slug}
            to={`/blog/${p.slug}`}
            className={`${styles.relatedCard} pc-cut-card`}>
            {p.image ? (
              <span className={styles.relatedThumb}>
                <img src={p.image} alt="" loading="lazy" />
              </span>
            ) : null}
            <span className={styles.relatedName}>{p.seoTitle || p.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Layout wpisu na blogu — treść (blocks) przychodzi z pliku danych
// w content/blog/<slug>.json.
export default function BlogArticleTemplate({
  title,
  seoTitle,
  description,
  date,
  dateModified,
  permalink,
  image,
  linkedinUrl,
  tags,
  related,
  faq,
  howTo,
  blocks,
}) {
  const slug = (permalink || '').replace('/blog/', '');
  return (
    <Layout title={seoTitle || title} description={description}>
      <Head>
        <meta property="og:type" content="article" />
        {image ? <meta property="og:image" content={`${SITE}${image}`} /> : null}
        {image ? <meta name="twitter:image" content={`${SITE}${image}`} /> : null}
        {date ? <meta property="article:published_time" content={date} /> : null}
        {dateModified ? (
          <meta property="article:modified_time" content={dateModified} />
        ) : null}
        <meta property="article:author" content="Łukasz Cecelon" />
        {(tags || []).map((t) => (
          <meta key={t} property="article:tag" content={t} />
        ))}
        <script type="application/ld+json">
          {JSON.stringify(
            articleJsonLd({
              title,
              description,
              date,
              dateModified,
              permalink,
              image,
              tags,
              faq,
              howTo,
            }),
          )}
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

        {tags && tags.length ? (
          <div className={styles.tagRow}>
            {tags.map((t) => (
              <span key={t} className={styles.tag}>
                {t}
              </span>
            ))}
          </div>
        ) : null}

        <BlockRenderer blocks={blocks} />

        <Pytania faq={faq} />

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

        <Autor />

        <PrzeczytajTez slug={slug} related={related} tags={tags} />

        <div className={styles.divider} />
        <Link to="/blog" className={styles.backLink}>
          ← Wróć do artykułów
        </Link>
      </div>
    </Layout>
  );
}
