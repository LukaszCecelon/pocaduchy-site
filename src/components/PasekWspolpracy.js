import React from 'react';
import Link from '@docusaurus/Link';
import tresc from '@site/content/pasek-wspolpracy.json';
import styles from './PasekWspolpracy.module.css';

// Dyskretna informacja pod tablicami Wiedzy i kalkulatorami, ze autor bierze
// zlecenia projektowe. Teksty w content/pasek-wspolpracy.json; puste pola =
// paska nie ma, wiec strona wyglada jak dotad.
export default function PasekWspolpracy({miejsce}) {
  if (!tresc.tekst || !tresc.link) return null;
  return (
    <aside className={styles.pasek}>
      <p className={styles.tekst}>{tresc.tekst}</p>
      <Link
        to="/uslugi/"
        data-zdarzenie="wspolpraca_pasek"
        data-miejsce={miejsce}
        className={styles.link}>
        {tresc.link}
      </Link>
    </aside>
  );
}
