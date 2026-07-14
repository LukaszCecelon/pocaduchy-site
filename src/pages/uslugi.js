import React from 'react';
import Layout from '@theme/Layout';
import styles from './uslugi.module.css';
import uslugiData from '@site/content/uslugi.json';

const SERVICES = uslugiData.services;

// Tymczasowo prywatna skrzynka — podmienić na kontakt@pocaduchy.pl,
// gdy domena i poczta zostaną skonfigurowane.
const CONTACT_EMAIL = 'RA-Engineering@outlook.com';

export default function Uslugi() {
  return (
    <Layout
      title="Usługi"
      description="Projektowanie, prototypowanie i konsultacje dla firm produkcyjnych i biur konstrukcyjnych.">
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
