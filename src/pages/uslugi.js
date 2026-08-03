import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Okruszki from '@site/src/components/Okruszki';
import styles from './uslugi.module.css';
import uslugiData from '@site/content/uslugi.json';

const SITE = 'https://pocaduchy.pl';
const SERVICES = uslugiData.services;
const {meta, hero, przebieg, dowody, cta} = uslugiData;
const FAQ = uslugiData.faq || [];

// Tymczasowo prywatna skrzynka - podmienić na kontakt@pocaduchy.pl,
// gdy domena i poczta zostaną skonfigurowane.
const CONTACT_EMAIL = 'RA-Engineering@outlook.com';

// Dane strukturalne oferty - katalog usług, żeby wyszukiwarki i modele AI
// wiedziały, co konkretnie oferujemy i komu. Sekcja pytań idzie osobno jako
// FAQPage; jej treść jest widoczna na stronie, tak jak wymaga tego Google.
const USLUGI_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE}/uslugi#uslugi`,
      name: 'poCADuchy - usługi konstrukcyjne',
      url: `${SITE}/uslugi`,
      email: CONTACT_EMAIL,
      image: `${SITE}/img/og-pocaduchy.jpg`,
      parentOrganization: {'@id': `${SITE}/#organizacja`},
      founder: {'@id': `${SITE}/#lukasz`},
      areaServed: {'@type': 'Country', name: 'Polska'},
      availableLanguage: 'pl',
      knowsAbout: [
        'projektowanie maszyn',
        'dokumentacja wykonawcza',
        'automatyzacja produkcji',
        'druk 3D',
        'audyt dokumentacji konstrukcyjnej',
      ],
      description:
        'Projektowanie konstrukcji maszyn i elementów maszynowych w 3D wraz z dokumentacją wykonawczą, druk 3D prototypów oraz konsultacje i audyty dokumentacji konstrukcyjnej.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Zakres usług',
        itemListElement: SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.title,
            description: s.body,
            serviceType: s.items?.join(', '),
            provider: {'@id': `${SITE}/#organizacja`},
          },
        })),
      },
    },
    ...(FAQ.length
      ? [
          {
            '@type': 'FAQPage',
            '@id': `${SITE}/uslugi#pytania`,
            mainEntity: FAQ.map((p) => ({
              '@type': 'Question',
              name: p.pytanie,
              acceptedAnswer: {'@type': 'Answer', text: p.odpowiedz},
            })),
          },
        ]
      : []),
  ],
};

export default function Uslugi() {
  return (
    <Layout
      title={meta.tytul}
      description={meta.opis}>
      <Head>
        <script type="application/ld+json">{JSON.stringify(USLUGI_JSON_LD)}</script>
      </Head>
      <div className={styles.wrap}>
        <Okruszki sciezka={[{nazwa: 'Usługi', url: '/uslugi'}]} />

        <div className={styles.intro}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowBar} />
            <span>{hero.eyebrow}</span>
          </div>
          <h1 className={styles.title}>{hero.naglowek}</h1>
          <p className={styles.lead}>{hero.lead}</p>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((s, i) => (
            <div key={s.title} className={`${styles.card} pc-cut-card`}>
              <span className={styles.cardN}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardBody}>{s.body}</p>
              <div className={styles.divider} />
              <ul className={styles.list}>
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {przebieg?.kroki?.length ? (
          <section className={styles.sekcja}>
            <h2 className={styles.h2}>{przebieg.naglowek}</h2>
            <p className={styles.sekcjaLead}>{przebieg.lead}</p>
            <ol className={styles.kroki}>
              {przebieg.kroki.map((k, i) => (
                <li key={k.krok} className={styles.krok}>
                  <span className={styles.krokN}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className={styles.krokCopy}>
                    <h3 className={styles.krokTytul}>{k.krok}</h3>
                    <p className={styles.krokTresc}>{k.tresc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <section className={styles.sekcja}>
          <h2 className={styles.h2}>{dowody.naglowek}</h2>
          <p className={styles.sekcjaLead}>{dowody.lead}</p>
          <ul className={styles.dowody}>
            {dowody.pozycje.map((d) => (
              <li key={d.slug}>
                <Link to={`/blog/${d.slug}`}>{d.link}</Link> {d.reszta}
              </li>
            ))}
          </ul>
        </section>

        {FAQ.length ? (
          <section className={styles.sekcja}>
            <h2 className={styles.h2}>{uslugiData.faqNaglowek}</h2>
            <div className={styles.faqList}>
              {FAQ.map((p) => (
                <details key={p.pytanie} className={styles.faqItem}>
                  <summary className={styles.faqQ}>{p.pytanie}</summary>
                  <p className={styles.faqA}>{p.odpowiedz}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <div className={styles.ctaBand}>
        <h2 className={styles.ctaTitle}>{cta.naglowek}</h2>
        <p className={styles.ctaBody}>{cta.tresc}</p>
        <a href={`mailto:${CONTACT_EMAIL}`} className={`${styles.ctaButton} pc-cut`}>
          {cta.przycisk}
        </a>
      </div>
    </Layout>
  );
}
