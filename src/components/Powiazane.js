import React from 'react';
import Link from '@docusaurus/Link';
import {powiazaneDla, tytulPowiazanych} from '@site/src/lib/powiazania';
import styles from './Powiazane.module.css';

// Blok linkow do stron innego typu o tym samym temacie: tablica do odcinka,
// artykul do przelicznika. Pary trzyma content/powiazania.json. Strona bez
// par nie dostaje bloku wcale, wiec jej uklad zostaje taki jak byl.
export default function Powiazane({url, pomin, typy}) {
  const lista = powiazaneDla(url, {pomin, typy});
  if (!lista.length) return null;
  return (
    <section className={styles.sekcja}>
      <h2 className={styles.tytul}>{tytulPowiazanych}</h2>
      <div className={styles.kafle}>
        {lista.map((s) => (
          <Link key={s.url} to={s.url} className={styles.kafel}>
            <span className={styles.kafelTag}>{s.etykieta}</span>
            <span className={styles.kafelTytul}>{s.tytul}</span>
            {s.dane ? <span className={styles.kafelDane}>{s.dane}</span> : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
