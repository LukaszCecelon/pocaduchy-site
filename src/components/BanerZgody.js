import React from 'react';
import Link from '@docusaurus/Link';
import prawne from '@site/content/prawne.json';
import styles from './BanerZgody.module.css';

// Wlasny baner zgody na analityke.
//
// Powstal, bo baner Google (Funding Choices) pokazuje sie dopiero po
// zatwierdzeniu witryny w AdSense, a do tego czasu Consent Mode stoi na
// domyslnej odmowie i GA4 nie zbiera nic. Ten baner obsluguje wylacznie
// analityke. Zgody reklamowe zostaja po stronie Google, bo tego wymaga.
//
// Decyzja zyje w localStorage, nie w cookie: sama zgoda nie potrzebuje
// cookie, a dzieki temu przed zgoda strona nie zapisuje zadnego.

const KLUCZ = 'pc-zgoda-analityka';
// Podbicie wersji uniewaznia wczesniejsze decyzje i pokazuje baner ponownie.
// Robimy to tylko wtedy, gdy zmienia sie zakres przetwarzania danych.
const WERSJA = 1;

export function odczytajZgode() {
  if (typeof window === 'undefined') return null;
  try {
    const zapis = JSON.parse(window.localStorage.getItem(KLUCZ) || 'null');
    if (!zapis || zapis.wersja !== WERSJA) return null;
    return zapis.decyzja === 'granted' ? 'granted' : 'denied';
  } catch {
    // Prywatny tryb przegladarki potrafi rzucic wyjatkiem przy odczycie.
    return null;
  }
}

function zapiszZgode(decyzja) {
  try {
    window.localStorage.setItem(
      KLUCZ,
      JSON.stringify({decyzja, wersja: WERSJA, data: new Date().toISOString()}),
    );
  } catch {
    // Brak zapisu oznacza tylko, ze baner pokaze sie znowu przy nastepnej wizycie.
  }
}

function przekazDoGoogle(decyzja) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('consent', 'update', {analytics_storage: decyzja});
}

// Otwarcie banera z zewnatrz, np. z przycisku w polityce prywatnosci.
// Zdarzenie zamiast globalnego stanu, bo baner moze jeszcze nie byc na stronie.
export const ZDARZENIE_OTWARCIA = 'pc-otworz-zgode';

export function otworzBanerZgody() {
  if (typeof window === 'undefined') return false;
  window.dispatchEvent(new CustomEvent(ZDARZENIE_OTWARCIA));
  return true;
}

export default function BanerZgody() {
  const [widoczny, setWidoczny] = React.useState(false);
  const {baner} = prawne;

  React.useEffect(() => {
    // Pokazujemy sie tylko wtedy, gdy uzytkownik jeszcze nie zdecydowal.
    // Samo przywrocenie wczesniejszej zgody robi skrypt w <head>, zeby zdazyl
    // przed konfiguracja GA4.
    if (odczytajZgode() === null) setWidoczny(true);

    const otworz = () => setWidoczny(true);
    window.addEventListener(ZDARZENIE_OTWARCIA, otworz);
    return () => window.removeEventListener(ZDARZENIE_OTWARCIA, otworz);
  }, []);

  function zdecyduj(decyzja) {
    zapiszZgode(decyzja);
    przekazDoGoogle(decyzja);
    setWidoczny(false);
  }

  if (!widoczny) return null;

  return (
    <div
      className={styles.baner}
      role="dialog"
      aria-modal="false"
      aria-label={baner.naglowek}>
      <div className={styles.tresc}>
        <p className={styles.naglowek}>{baner.naglowek}</p>
        <p className={styles.opis}>
          {baner.tresc}{' '}
          <Link to={baner.linkUrl} className={styles.link}>
            {baner.linkTekst}
          </Link>
          .
        </p>
      </div>

      {/* Oba przyciski maja te sama wage wizualna: RODO wymaga, zeby odmowa
          byla rownie latwa jak zgoda. */}
      <div className={styles.przyciski}>
        <button
          type="button"
          onClick={() => zdecyduj('denied')}
          className={`${styles.przycisk} ${styles.odmowa} pc-cut`}>
          {baner.przyciskOdmowa}
        </button>
        <button
          type="button"
          onClick={() => zdecyduj('granted')}
          className={`${styles.przycisk} ${styles.zgoda} pc-cut`}>
          {baner.przyciskZgoda}
        </button>
      </div>
    </div>
  );
}
