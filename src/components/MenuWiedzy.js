import React from 'react';
import Link from '@docusaurus/Link';
import artykuly from '@site/src/data/wiedza-artykuly.json';
import dzialyTresc from '@site/content/wiedza-dzialy.json';
import styles from './MenuWiedzy.module.css';

// Rozwijane okienko pod zakladka Wiedza w pasku nawigacji.
//
// Po co: baza wiedzy rosnie do kilkudziesieciu materialow. Bez tego okienka
// jedyna droga do konkretnego tematu prowadzi przez hub, czyli o jedno
// klikniecie i jedno przewiniecie dalej.
//
// Wszystkie odnosniki sa w HTML od razu, wiec wyszukiwarka widzi je niezaleznie
// od tego, czy ktos najechal myszka.

const SCIEZKA = '/wiedza/';
const MAKS_W_DZIALE = 6;

function grupuj() {
  return dzialyTresc.dzialy
    .map((d) => ({
      ...d,
      pozycje: artykuly.filter((a) => (a.kategoria || 'inne') === d.id),
    }))
    .filter((d) => d.pozycje.length > 0);
}

// Wersja na telefon. Panel Docusaurusa w bocznym menu ma swoja mechanike
// rozwijania, wiec nie dokladamy tam drugiej: zwykla lista dzialow wystarczy,
// a do pelnej listy prowadzi hub.
function WersjaMobilna({onClick}) {
  const grupy = grupuj();
  return (
    <li className="menu__list-item">
      <Link className="menu__link" to={SCIEZKA} onClick={onClick}>
        Wiedza
      </Link>
      <ul className="menu__list">
        {grupy.map((d) => (
          <li key={d.id} className="menu__list-item">
            <Link
              className="menu__link"
              to={`${SCIEZKA}#${d.id}`}
              onClick={onClick}>
              {d.nazwa} ({d.pozycje.length})
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

function WersjaBiurkowa() {
  const grupy = grupuj();
  const [otwarte, setOtwarte] = React.useState(false);
  const kontener = React.useRef(null);
  // Zamkniecie po chwili, a nie natychmiast: przy przejsciu kursora z napisu
  // na okienko myszka na moment opuszcza oba elementy i panel mrugalby.
  const licznik = React.useRef(null);

  const pokaz = () => {
    clearTimeout(licznik.current);
    setOtwarte(true);
  };
  const schowaj = () => {
    clearTimeout(licznik.current);
    licznik.current = setTimeout(() => setOtwarte(false), 160);
  };

  React.useEffect(() => () => clearTimeout(licznik.current), []);

  // Escape zamyka i oddaje ognisko, tak jak w kazdym innym menu.
  const naKlawisz = (e) => {
    if (e.key === 'Escape') {
      setOtwarte(false);
      kontener.current?.querySelector('a')?.focus();
    }
  };

  return (
    <div
      ref={kontener}
      className={styles.kotwica}
      onMouseEnter={pokaz}
      onMouseLeave={schowaj}
      onFocus={pokaz}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) schowaj();
      }}
      onKeyDown={naKlawisz}>
      <Link
        className="navbar__item navbar__link"
        to={SCIEZKA}
        aria-expanded={otwarte}
        onClick={() => setOtwarte(false)}>
        Wiedza
      </Link>

      {/* Widocznosc ustawiamy stylem na elemencie, a nie druga klasa. Panel
          siedzi w pasku nawigacji, gdzie o kaskade bije sie sporo regul motywu,
          a styl na elemencie wygrywa bez wzgledu na kolejnosc arkuszy.
          Panel zostaje w drzewie dokumentu takze zwiniety, wiec wyszukiwarka
          widzi wszystkie odnosniki. */}
      <div
        className={styles.panel}
        style={{
          opacity: otwarte ? 1 : 0,
          visibility: otwarte ? 'visible' : 'hidden',
          transform: otwarte ? 'translateY(0)' : 'translateY(-6px)',
        }}>
        <div className={styles.kolumny}>
          {grupuj().map((dzial) => (
            <div key={dzial.id} className={styles.kolumna}>
              <Link
                to={`${SCIEZKA}#${dzial.id}`}
                className={styles.dzial}
                onClick={() => setOtwarte(false)}>
                {dzial.nazwa}
              </Link>
              <ul className={styles.lista}>
                {dzial.pozycje.slice(0, MAKS_W_DZIALE).map((a) => (
                  <li key={a.slug}>
                    <Link
                      to={`${SCIEZKA}${a.slug}/`}
                      className={styles.temat}
                      onClick={() => setOtwarte(false)}>
                      {a.seoTitle || a.title}
                    </Link>
                  </li>
                ))}
                {dzial.pozycje.length > MAKS_W_DZIALE ? (
                  <li>
                    <Link
                      to={`${SCIEZKA}#${dzial.id}`}
                      className={styles.wiecej}
                      onClick={() => setOtwarte(false)}>
                      i jeszcze {dzial.pozycje.length - MAKS_W_DZIALE}
                    </Link>
                  </li>
                ) : null}
              </ul>
            </div>
          ))}
        </div>
        <Link
          to={SCIEZKA}
          className={styles.stopka}
          onClick={() => setOtwarte(false)}>
          Cała baza wiedzy i wyszukiwarka →
        </Link>
      </div>
    </div>
  );
}

export default function MenuWiedzy({mobile, onClick}) {
  if (artykuly.length === 0) {
    return (
      <Link className={mobile ? 'menu__link' : 'navbar__item navbar__link'} to={SCIEZKA}>
        Wiedza
      </Link>
    );
  }
  return mobile ? <WersjaMobilna onClick={onClick} /> : <WersjaBiurkowa />;
}
