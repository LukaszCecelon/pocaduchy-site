import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './uslugi.module.css';
import uslugiData from '@site/content/uslugi.json';

const SITE = 'https://pocaduchy.pl';
const SERVICES = uslugiData.services;

// Tymczasowo prywatna skrzynka — podmienić na kontakt@pocaduchy.pl,
// gdy domena i poczta zostaną skonfigurowane.
const CONTACT_EMAIL = 'RA-Engineering@outlook.com';

// Dane strukturalne oferty — katalog usług, żeby wyszukiwarki i modele AI
// wiedziały, co konkretnie oferujemy i komu.
const SERVICES_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE}/uslugi#uslugi`,
  name: 'poCADuchy — usługi konstrukcyjne',
  url: `${SITE}/uslugi`,
  email: CONTACT_EMAIL,
  image: `${SITE}/img/og-pocaduchy.jpg`,
  parentOrganization: {'@id': `${SITE}/#organizacja`},
  founder: {'@id': `${SITE}/#lukasz`},
  areaServed: {'@type': 'Country', name: 'Polska'},
  availableLanguage: 'pl',
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
};

export default function Uslugi() {
  return (
    <Layout
      title="Usługi konstrukcyjne — projektowanie maszyn, druk 3D, konsultacje"
      description="Projektowanie konstrukcji maszyn i elementów maszynowych w 3D z dokumentacją wykonawczą, druk 3D prototypów oraz audyty dokumentacji dla firm produkcyjnych i biur konstrukcyjnych.">
      <Head>
        <script type="application/ld+json">{JSON.stringify(SERVICES_JSON_LD)}</script>
      </Head>
      <div className={styles.wrap}>
        <div className={styles.intro}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowBar} />
            <span>Usługi</span>
          </div>
          <h1 className={styles.title}>
            Współpraca przy realnych projektach konstrukcyjnych
          </h1>
          <p className={styles.lead}>
            Projektowanie, prototypowanie i konsultacje — dla firm
            produkcyjnych i biur konstrukcyjnych.
          </p>
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
                  <li key={it}>— {it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.ctaBand}>
        <h2 className={styles.ctaTitle}>Masz projekt do skonsultowania?</h2>
        <a href={`mailto:${CONTACT_EMAIL}`} className={`${styles.ctaButton} pc-cut`}>
          Napisz w sprawie projektu
        </a>
      </div>
    </Layout>
  );
}
