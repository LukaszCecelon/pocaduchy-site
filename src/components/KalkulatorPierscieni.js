import React, {useMemo, useState} from 'react';
import {dobierzPierscien, listaSrednic} from '@site/src/lib/pierscienie/oblicz';
import WidokWalek from '@site/src/components/pierscienie/widok-walek.svg';
import WidokOtwor from '@site/src/components/pierscienie/widok-otwor.svg';
import pozycje from '@site/src/components/pierscienie/pozycje.json';
import tresc from '@site/content/narzedzia-pierscienie.json';
import styles from './KalkulatorPierscieni.module.css';

const UI = tresc.ui;
const SREDNICA_STARTOWA = 45;
// Maksymalna wysokosc rysunku w px. Powyzej tego wymiary gina przy geometrii.
const WYSOKOSC_RYSUNKU = 340;

const WIDOKI = {walek: WidokWalek, otwor: WidokOtwor};
const FOTO = {
  walek: {plik: '/img/pierscien-din471.png', alt: UI.fotoWalekAlt},
  otwor: {plik: '/img/pierscien-din472.png', alt: UI.fotoOtworAlt},
};

// Liczby na rysunku warsztatowym pisze sie z przecinkiem, bez zer na koncu.
function pl(x) {
  return String(Math.round(x * 1000) / 1000).replace('.', ',');
}

// Wymiar w formacie z rysunku: wartosc, klasa tolerancji i odchylki
// spietrzone w powiekszonym nawiasie. Bez klasy tolerancji nawias nie
// ma czego pokazac, wiec go nie ma.
function Wymiar({wartosc, klasa, gora, dol, przed = '⌀', po}) {
  const glowny = `${przed}${pl(wartosc)}${klasa ? ` ${klasa}` : ''}${po ? ` ${po}` : ''}`;
  if (gora === undefined) {
    return <span className={styles.wym}><span className={styles.glowny}>{glowny}</span></span>;
  }
  return (
    <span className={styles.wym}>
      <span className={styles.glowny}>{glowny}</span>
      <span className={styles.naw} aria-hidden="true">(</span>
      <span className={styles.odch}>
        <span>{`+${pl(Math.abs(gora))}`}</span>
        <span>{`-${pl(Math.abs(dol))}`}</span>
      </span>
      <span className={styles.naw} aria-hidden="true">)</span>
    </span>
  );
}

function Etykieta({poz, pion, wejscie, children}) {
  const klasy = [styles.et, pion ? styles.pion : '', wejscie ? styles.wejscie : ''].join(' ');
  return (
    <div className={klasy} style={{left: `${poz.x}%`, top: `${poz.y}%`}}>
      {children}
    </div>
  );
}

export default function KalkulatorPierscieni() {
  const [typ, setTyp] = useState('walek');
  const [srednica, setSrednica] = useState(SREDNICA_STARTOWA);
  const [skopiowano, setSkopiowano] = useState(false);

  const wynik = useMemo(() => {
    try {
      return dobierzPierscien({typ, srednica});
    } catch (e) {
      return {trafienie: false, najblizsze: []};
    }
  }, [typ, srednica]);

  const trafione = wynik.trafienie ? wynik : null;
  const Widok = WIDOKI[typ];
  const poz = pozycje[typ].etykiety;
  // Pole wpisywania stoi w miejscu srednicy nominalnej. Na rysunku sasiaduje
  // z wymiarem rowka, wiec odsuwamy je, zeby oba dalo sie przeczytac.
  const odsunD1 = typ === 'walek' ? 3.4 : -3.4;
  // Rysunek ma byc tlem dla wymiarow, a nie odwrotnie. Ograniczamy go
  // wysokoscia i liczymy szerokosc z proporcji viewBox, dzieki czemu
  // geometria sie nie znieksztalca, a etykiety zyskuja przewage wielkosci.
  const [, , szerVB, wysVB] = pozycje[typ].viewBox;
  const szerokoscPlotna = `min(100%, ${Math.round((WYSOKOSC_RYSUNKU * szerVB) / wysVB)}px)`;
  const foto = FOTO[typ];

  function zmienTyp(nowy) {
    setTyp(nowy);
    if (!dostepna(nowy, srednica)) {
      const lista = listaSrednic(nowy);
      const blisko = lista.reduce((a, b) => (Math.abs(b - srednica) < Math.abs(a - srednica) ? b : a));
      setSrednica(blisko);
    }
  }

  function kopiuj() {
    if (!trafione || !navigator.clipboard) return;
    navigator.clipboard.writeText(opisRowka(trafione));
    setSkopiowano(true);
    setTimeout(() => setSkopiowano(false), 1600);
  }

  return (
    <div className={styles.tool}>
      <div className={styles.pasek}>
        <div className={styles.seg} role="group" aria-label={UI.tryb}>
          <button
            type="button"
            onClick={() => zmienTyp('walek')}
            aria-pressed={typ === 'walek'}
          >
            {UI.trybWalek}
          </button>
          <button
            type="button"
            onClick={() => zmienTyp('otwor')}
            aria-pressed={typ === 'otwor'}
          >
            {UI.trybOtwor}
          </button>
        </div>
        <p className={styles.normaChip}>
          {UI.wykonanieNormalneWg} <b>{typ === 'walek' ? UI.normaWalek : UI.normaOtwor}</b>
        </p>
      </div>

      <div className={styles.uklad}>
        <div>
          <div className={styles.plotno} style={{width: szerokoscPlotna}}>
            <Widok
              className={styles.cad}
              role="img"
              aria-label={typ === 'walek' ? UI.rysunekWalek : UI.rysunekOtwor}
            />

            <Etykieta poz={{x: poz.d1.x + odsunD1, y: poz.d1.y}} pion wejscie>
              <span className={styles.polePrzed} aria-hidden="true">⌀</span>
              <input
                className={styles.wpis}
                type="number"
                inputMode="numeric"
                step="1"
                min="3"
                value={srednica}
                onChange={(e) => setSrednica(Number(e.target.value))}
                aria-label={typ === 'walek' ? UI.etykietaSrednicyWalek : UI.etykietaSrednicyOtwor}
                style={{width: `${Math.max(2.6, String(srednica).length + 1.2)}em`}}
              />
            </Etykieta>

            <Etykieta poz={poz.d2} pion>
              {trafione ? (
                <Wymiar
                  wartosc={trafione.rowek.d2}
                  klasa={trafione.rowek.d2Klasa}
                  gora={odchylkaGorna(trafione.rowek.d2Odchylki) / 1000}
                  dol={odchylkaDolna(trafione.rowek.d2Odchylki) / 1000}
                />
              ) : (
                <span className={styles.glowny}>?</span>
              )}
            </Etykieta>

            <Etykieta poz={poz.m}>
              {trafione ? (
                <Wymiar
                  wartosc={trafione.rowek.m}
                  klasa={trafione.rowek.mKlasa}
                  gora={odchylkaGorna(trafione.rowek.mOdchylki) / 1000}
                  dol={odchylkaDolna(trafione.rowek.mOdchylki) / 1000}
                  przed=""
                />
              ) : (
                <span className={styles.glowny}>?</span>
              )}
            </Etykieta>

            <Etykieta poz={poz.n}>
              {trafione ? (
                <Wymiar wartosc={trafione.rowek.n} przed="" po={UI.min} />
              ) : (
                <span className={styles.glowny}>?</span>
              )}
            </Etykieta>
          </div>
          <p className={styles.nota}>{UI.notaSchemat}</p>
        </div>

        <aside className={styles.pierscienBox}>
          <div className={styles.foto}>
            <img src={foto.plik} alt={foto.alt} width="551" height="612" loading="lazy" />
          </div>
          <div className={styles.pierscienOpis}>
            <p className={styles.rodzaj}>{typ === 'walek' ? UI.rodzajWalek : UI.rodzajOtwor}</p>
            <p className={styles.oznaczenie}>
              {trafione ? trafione.oznaczenie : (typ === 'walek' ? UI.normaWalek : UI.normaOtwor)}
            </p>
            <p className={styles.zakres}>{typ === 'walek' ? UI.zakresWalek : UI.zakresOtwor}</p>
            <p className={styles.opisPierscienia}>
              {typ === 'walek' ? UI.opisPierscieniaWalek : UI.opisPierscieniaOtwor}
            </p>
          </div>
        </aside>
      </div>

      {trafione ? (
        <>
          <div className={styles.wynik}>
            <output className={styles.callout}>{opisRowka(trafione)}</output>
            <button type="button" className={styles.copy} onClick={kopiuj}>
              {skopiowano ? UI.skopiowano : UI.kopiuj}
            </button>
            <p className={styles.luz}>
              {UI.luzOsiowy}: <b>{`${UI.doWartosci} ${pl(trafione.luzOsiowy.maksymalny)} ${UI.jednostkaMm}`}</b>
            </p>
          </div>

          {uwagiDoPokazania(trafione).length > 0 && (
            <div className={styles.warn}>
              <p className={styles.warnTytul}>{UI.ostrzezenia}</p>
              <ul>
                {uwagiDoPokazania(trafione).map((o) => (
                  <li key={o.kod}>{UI[`ostrzezenie_${o.kod}`] || o.tresc}</li>
                ))}
              </ul>
            </div>
          )}

          <details className={styles.szczegoly}>
            <summary>{UI.wszystkieWymiary}</summary>
            <table className={styles.tabela}>
              <tbody>
                <Wiersz nazwa={UI.srednicaRowka} symbol="d2">
                  <Wymiar
                    wartosc={trafione.rowek.d2}
                    klasa={trafione.rowek.d2Klasa}
                    gora={odchylkaGorna(trafione.rowek.d2Odchylki) / 1000}
                    dol={odchylkaDolna(trafione.rowek.d2Odchylki) / 1000}
                  />
                </Wiersz>
                <Wiersz nazwa={UI.szerokoscRowka} symbol="m">
                  <Wymiar
                    wartosc={trafione.rowek.m}
                    klasa={trafione.rowek.mKlasa}
                    gora={odchylkaGorna(trafione.rowek.mOdchylki) / 1000}
                    dol={odchylkaDolna(trafione.rowek.mOdchylki) / 1000}
                    przed=""
                  />
                </Wiersz>
                <Wiersz nazwa={UI.glebokoscRowka} symbol="t">
                  {`${pl(trafione.rowek.glebokosc)} ${UI.jednostkaMm}`}
                </Wiersz>
                <Wiersz nazwa={UI.odlegloscOdCzola} symbol="n">
                  {`${pl(trafione.rowek.n)} ${UI.jednostkaMm} ${UI.min}`}
                </Wiersz>
                <Wiersz nazwa={UI.gruboscPierscienia} symbol="s">
                  {`${pl(trafione.pierscien.s)} ${UI.jednostkaMm}`}
                </Wiersz>
                <Wiersz nazwa={UI.srednicaSwobodna} symbol="d3">
                  {`${pl(trafione.pierscien.d3)} ${UI.jednostkaMm}`}
                </Wiersz>
                {trafione.pierscien.d4 !== undefined && (
                  <Wiersz nazwa={UI.rozstawSzczypiec} symbol="d4">
                    {`${pl(trafione.pierscien.d4)} ${UI.jednostkaMm}`}
                  </Wiersz>
                )}
                <Wiersz nazwa={UI.luzOsiowy} symbol={UI.luzOsiowyPodpis}>
                  {`${UI.doWartosci} ${pl(trafione.luzOsiowy.maksymalny)} ${UI.jednostkaMm}`}
                </Wiersz>
              </tbody>
            </table>
            <p className={styles.notaMala}>{UI.notaLuz}</p>
          </details>
        </>
      ) : (
        <div className={styles.warn}>
          <p>{UI.brakTrafienia}</p>
          {wynik.najblizsze && wynik.najblizsze.length > 0 && (
            <p className={styles.najblizsze}>
              {UI.najblizszeSrednice}:{' '}
              {wynik.najblizsze.map((r) => (
                <button
                  key={r.d1}
                  type="button"
                  className={styles.skok}
                  onClick={() => setSrednica(r.d1)}
                >
                  {`⌀${pl(r.d1)}`}
                </button>
              ))}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function Wiersz({nazwa, symbol, children}) {
  return (
    <tr>
      <td>{nazwa}</td>
      <td>{children}</td>
      <td>{symbol}</td>
    </tr>
  );
}

// Luz osiowy wynika z klasy H13 na szerokosci rowka i przekracza 0,2 mm dla
// kazdej srednicy z tabeli. Jako ostrzezenie zapalalby sie zawsze, wiec
// pokazujemy go przy wyniku, a z uwag go usuwamy.
function uwagiDoPokazania(w) {
  return w.ostrzezenia.filter((o) => o.kod !== 'LUZ_DUZY');
}

function dostepna(typ, srednica) {
  return listaSrednic(typ).includes(srednica);
}

// Silnik zwraca odchylki walka jako es/ei, a otworu jako ES/EI. Rowek na walku
// jest wymiarem zewnetrznym, rowek w otworze wewnetrznym, wiec obie formy
// wystepuja w jednym wyniku.
function odchylkaGorna(o) {
  return o.ES !== undefined ? o.ES : o.es;
}

function odchylkaDolna(o) {
  return o.EI !== undefined ? o.EI : o.ei;
}

function opisRowka(w) {
  return `⌀${pl(w.rowek.d2)} ${w.rowek.d2Klasa} x ${pl(w.rowek.m)} ${w.rowek.mKlasa}`;
}
