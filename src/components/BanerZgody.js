import React from 'react';
import Link from '@docusaurus/Link';
import prawne from '@site/content/prawne.json';
import styles from './BanerZgody.module.css';

// Wlasny baner zgody na statystyki i na reklamy, kazda z osobna.
//
// Bez zgody na reklamy skrypt AdSense ani piksel OpenAI w ogole nie trafiaja na
// strone: laduja je dopiero window.pcReklamy i window.pcPikselOpenAI
// (zdefiniowane w <head>, docusaurus.config.js).
// Consent Mode v2 startuje z odmowa wszystkiego, a baner podnosi tylko te
// kategorie, na ktore czytelnik sie zgodzil.
//
// Decyzja zyje w localStorage, nie w cookie: sama zgoda nie potrzebuje
// cookie, a dzieki temu przed zgoda strona nie zapisuje zadnego.

const KLUCZ = 'pc-zgoda-analityka';
// Podbicie wersji uniewaznia wczesniejsze decyzje i pokazuje baner ponownie.
// Robimy to tylko wtedy, gdy zmienia sie zakres przetwarzania danych.
// Wersja 2 doszla ze zgoda na reklamy; zapis z wersji 1 (sama zgoda na
// statystyki) dalej obowiazuje dla statystyk, a o reklamy pytamy od nowa.
const WERSJA = 2;

function decyzja(wartosc) {
  if (wartosc === 'granted') return 'granted';
  if (wartosc === 'denied') return 'denied';
  return null;
}

// Zwraca {statystyki, reklamy}; null w polu = jeszcze bez decyzji.
export function odczytajZgode() {
  const brak = {statystyki: null, reklamy: null};
  if (typeof window === 'undefined') return brak;
  try {
    const zapis = JSON.parse(window.localStorage.getItem(KLUCZ) || 'null');
    if (!zapis) return brak;
    if (zapis.wersja === WERSJA) {
      return {statystyki: decyzja(zapis.statystyki), reklamy: decyzja(zapis.reklamy)};
    }
    if (zapis.wersja === 1) return {statystyki: decyzja(zapis.decyzja), reklamy: null};
    return brak;
  } catch {
    // Prywatny tryb przegladarki potrafi rzucic wyjatkiem przy odczycie.
    return brak;
  }
}

function zapiszZgode({statystyki, reklamy}) {
  try {
    window.localStorage.setItem(
      KLUCZ,
      JSON.stringify({statystyki, reklamy, wersja: WERSJA, data: new Date().toISOString()}),
    );
  } catch {
    // Brak zapisu oznacza tylko, ze baner pokaze sie znowu przy nastepnej wizycie.
  }
}

function przekazDoGoogle({statystyki, reklamy}) {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('consent', 'update', {
    analytics_storage: statystyki,
    ad_storage: reklamy,
    ad_user_data: reklamy,
    ad_personalization: reklamy,
  });
}

// Cookies piksela OpenAI: identyfikator klikniecia w reklame i przegladarki.
const COOKIES_OPENAI = ['__oppref', '__obref'];

function usunCookiesOpenAI() {
  // Piksel sam kasuje swoje cookies przy consent=false, ale tylko gdy SDK
  // zdazylo sie wczytac; kasujemy je wiec takze recznie, w obu wariantach
  // domeny, bo nie wiemy, ktorego uzylo SDK.
  if (typeof window.oaiq === 'function') window.oaiq('consent', false);
  const domena = window.location.hostname.replace(/^www\./, '');
  for (const nazwa of COOKIES_OPENAI) {
    document.cookie = `${nazwa}=; Max-Age=0; path=/`;
    document.cookie = `${nazwa}=; Max-Age=0; path=/; domain=.${domena}`;
  }
}

function wlaczReklamy({reklamy}) {
  const zaladowane = Boolean(document.getElementById('pc-adsense')) || Boolean(window.oaiq);
  if (reklamy === 'granted') {
    if (typeof window.pcReklamy === 'function') window.pcReklamy();
    if (typeof window.pcPikselOpenAI === 'function') window.pcPikselOpenAI();
    return;
  }
  // Wycofanie zgody, gdy skrypt reklam albo piksel juz dziala: skryptu nie da
  // sie wyladowac, wiec przeladowujemy strone. Po przeladowaniu <head> nie
  // zaladuje ich ponownie, bo zapis mowi juz "denied".
  usunCookiesOpenAI();
  if (zaladowane) window.location.reload();
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
  // Widok szczegolowy: osobne pola na statystyki i reklamy.
  const [szczegoly, setSzczegoly] = React.useState(false);
  const [wybor, setWybor] = React.useState({statystyki: false, reklamy: false});
  const {baner} = prawne;

  React.useEffect(() => {
    // Pokazujemy sie tylko wtedy, gdy brakuje decyzji w ktorejkolwiek
    // kategorii. Samo przywrocenie wczesniejszej zgody robi skrypt w <head>,
    // zeby zdazyl przed konfiguracja GA4.
    // Pola startuja od zapisanego stanu (np. zgoda na statystyki z wersji 1),
    // zeby "Zapisz wybor" po cichu jej nie wycofal; bez decyzji = odznaczone.
    const zgoda = odczytajZgode();
    setWybor({
      statystyki: zgoda.statystyki === 'granted',
      reklamy: zgoda.reklamy === 'granted',
    });
    if (zgoda.statystyki === null || zgoda.reklamy === null) setWidoczny(true);

    // Z polityki prywatnosci otwieramy od razu pola z obecnym stanem, zeby
    // wycofanie jednej zgody bylo jednym kliknieciem w pole i jednym w Zapisz.
    const otworz = () => {
      const obecna = odczytajZgode();
      setWybor({
        statystyki: obecna.statystyki === 'granted',
        reklamy: obecna.reklamy === 'granted',
      });
      setSzczegoly(true);
      setWidoczny(true);
    };
    window.addEventListener(ZDARZENIE_OTWARCIA, otworz);
    return () => window.removeEventListener(ZDARZENIE_OTWARCIA, otworz);
  }, []);

  function zdecyduj(zgoda) {
    zapiszZgode(zgoda);
    przekazDoGoogle(zgoda);
    wlaczReklamy(zgoda);
    setWidoczny(false);
    setSzczegoly(false);
  }

  const wszystko = (wartosc) => ({statystyki: wartosc, reklamy: wartosc});
  const zWyboru = () => ({
    statystyki: wybor.statystyki ? 'granted' : 'denied',
    reklamy: wybor.reklamy ? 'granted' : 'denied',
  });

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
          .{' '}
          {!szczegoly && (
            <button
              type="button"
              onClick={() => setSzczegoly(true)}
              className={styles.wybor}>
              {baner.przyciskWybor}
            </button>
          )}
        </p>

        {/* Bez wczesniejszej decyzji pola sa odznaczone: RODO nie uznaje
            zaznaczonej z gory zgody. */}
        {szczegoly && (
          <div className={styles.pola}>
            {[
              ['statystyki', baner.zgodaStatystyki],
              ['reklamy', baner.zgodaReklamy],
            ].map(([klucz, etykieta]) => (
              <label key={klucz} className={styles.pole}>
                <input
                  type="checkbox"
                  checked={wybor[klucz]}
                  onChange={(e) => setWybor({...wybor, [klucz]: e.target.checked})}
                />
                <span>{etykieta}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Oba przyciski maja te sama wage wizualna: RODO wymaga, zeby odmowa
          byla rownie latwa jak zgoda. */}
      <div className={styles.przyciski}>
        <button
          type="button"
          onClick={() => zdecyduj(wszystko('denied'))}
          className={`${styles.przycisk} ${styles.odmowa} pc-cut`}>
          {baner.przyciskOdmowa}
        </button>
        <button
          type="button"
          onClick={() => zdecyduj(szczegoly ? zWyboru() : wszystko('granted'))}
          className={`${styles.przycisk} ${styles.zgoda} pc-cut`}>
          {szczegoly ? baner.przyciskZapisz : baner.przyciskZgoda}
        </button>
      </div>
    </div>
  );
}
