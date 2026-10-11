import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import {najblizszeStrony} from '@site/src/lib/podpowiedz404.mjs';
import strony from '@site/src/data/strony-indeks.json';
import nawigacja from '@site/content/nawigacja.json';

// Tresc strony 404 z podpowiedzia najblizszego istniejacego adresu.
// GitHub Pages serwuje 404.html pod kazdym nieznanym adresem, a adres
// odczytujemy dopiero w przegladarce, wiec podpowiedz pojawia sie po
// zaladowaniu skryptu. Bez JavaScriptu zostaja stale odnosniki nizej.
//
// <div> zamiast <main>, bo <main> daje juz Layout (src/theme/Layout).
const STALE = ['/wiedza/', '/narzedzia/', '/blog/'];

export default function NotFoundContent({className}) {
  const [podpowiedzi, setPodpowiedzi] = useState([]);

  useEffect(() => {
    let sciezka = window.location.pathname;
    try {
      sciezka = decodeURIComponent(sciezka);
    } catch {
      // Uszkodzone kodowanie w adresie: porownujemy surowy tekst.
    }
    setPodpowiedzi(najblizszeStrony(sciezka, strony));
  }, []);

  const stale = STALE.map((url) => strony.find((s) => s.url === url)).filter(Boolean);

  return (
    <div className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--6 col--offset-3">
          <Heading as="h1" className="hero__title">
            <Translate id="theme.NotFound.title" description="The title of the 404 page">
              Page Not Found
            </Translate>
          </Heading>
          <p>
            <Translate id="theme.NotFound.p1" description="The first paragraph of the 404 page">
              We could not find what you were looking for.
            </Translate>
          </p>

          {podpowiedzi.length > 0 ? (
            <>
              <p>
                <strong>{nawigacja.strona404.podpowiedz}</strong>
              </p>
              <ul>
                {podpowiedzi.map((s) => (
                  <li key={s.url}>
                    <Link to={s.url}>{s.tytul}</Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <p>{nawigacja.strona404.zacznijOd}</p>
          <ul>
            {stale.map((s) => (
              <li key={s.url}>
                <Link to={s.url}>{s.tytul}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
