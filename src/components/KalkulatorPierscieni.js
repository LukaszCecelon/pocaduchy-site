import React, {useMemo, useState} from 'react';
import {dobierzPierscien, listaSrednic} from '@site/src/lib/pierscienie/oblicz';
import WidokWalek from '@site/src/components/pierscienie/widok-walek.svg';
import WidokOtwor from '@site/src/components/pierscienie/widok-otwor.svg';
import pozycje from '@site/src/components/pierscienie/pozycje.json';
import tresc from '@site/content/narzedzia-pierscienie.json';
import styles from './KalkulatorPierscieni.module.css';

const UI = tresc.ui;
const SREDNICA_STARTOWA = 45;

const WIDOKI = {walek: WidokWalek, otwor: WidokOtwor};
const FOTO = {
  walek: {plik: '/img/pierscien-din471.png', alt: UI.fotoWalekAlt},
  otwor: {plik: '/img/pierscien-din472.png', alt: UI.fotoOtworAlt},
};

// Liczby na rysunku warsztatowym pisze sie z przecinkiem, bez zer na koncu.
function pl(x) {
  return String(Math.round(x * 1000) / 1000).replace('.', ',');
}

// Silnik zwraca odchylki walka jako es/ei, a otworu jako ES/EI. Rowek na walku
// jest wymiarem zewnetrznym, w otworze wewnetrznym, wiec obie formy wystepuja
// w jednym wyniku.
const gornaOdchylka = (o) => (o.ES !== undefined ? o.ES : o.es);
const dolnaOdchylka = (o) => (o.EI !== undefined ? o.EI : o.ei);
const zapisOdchylki = (znak, um) => `${znak}${pl(Math.abs(um) / 1000)}`;

function opisRowka(w) {
  return `⌀${pl(w.rowek.d2)} ${w.rowek.d2Klasa} x ${pl(w.rowek.m)} ${w.rowek.mKlasa}`;
}

// Wymiar zapisany tak jak na rysunku wykonawczym: wartosc, klasa tolerancji
// i odchylki spietrzone w powiekszonym nawiasie. Wymiar bez klasy tolerancji
// zadnego nawiasu nie dostaje.
function Wymiar({glowny, gora, dol}) {
  if (gora === undefined) return <span className={styles.glowny}>{glowny}</span>;
  return (
    <>
      <span className={styles.glowny}>{glowny}</span>
      <span className={styles.naw} aria-hidden="true">(</span>
      <span className={styles.odch}>
        <span>{gora}</span>
        <span>{dol}</span>
      </span>
      <span className={styles.naw} aria-hidden="true">)</span>
    </>
  );
}

// Etykieta zaczepiona za krawedz, nie za srodek. Punkt zaczepienia odpowiada
// rogowi pola tekstowego z oryginalnego rysunku, wiec etykieta rosnie zawsze
// w strone wolnego miejsca i nigdy nie wchodzi na linie wymiarowa ani na groty.
function Etykieta({zaczep, wejscie, children}) {
  const klasy = [styles.et, styles[zaczep.typ], wejscie ? styles.wejscie : ''].join(' ');
  return (
    <div className={klasy} style={{left: `${zaczep.x}%`, top: `${zaczep.y}%`}}>
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
  const walek = typ === 'walek';
  const Widok = WIDOKI[typ];
  const zaczepy = pozycje[typ].zaczepy;
  const foto = FOTO[typ];
  const rowek = trafione ? trafione.rowek : null;

  function zmienTyp(nowy) {
    setTyp(nowy);
    const lista = listaSrednic(nowy);
    if (!lista.includes(srednica)) {
      setSrednica(lista.reduce((a, b) => (Math.abs(b - srednica) < Math.abs(a - srednica) ? b : a)));
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
          <button type="button" onClick={() => zmienTyp('walek')} aria-pressed={walek}>
            {UI.trybWalek}
          </button>
          <button type="button" onClick={() => zmienTyp('otwor')} aria-pressed={!walek}>
            {UI.trybOtwor}
          </button>
        </div>
        <p className={styles.normaChip}>
          {UI.wykonanieNormalneWg} <b>{walek ? UI.normaWalek : UI.normaOtwor}</b>
        </p>
      </div>

      <div className={styles.uklad}>
        <div>
          <div className={styles.plotno}>
            <Widok
              className={styles.cad}
              role="img"
              aria-label={walek ? UI.rysunekWalek : UI.rysunekOtwor}
            />

            <Etykieta zaczep={zaczepy.d1} wejscie>
              <span className={styles.polePrzed} aria-hidden="true">⌀</span>
              <input
                className={styles.wpis}
                type="number"
                inputMode="numeric"
                step="1"
                min="3"
                value={srednica}
                onChange={(e) => setSrednica(Number(e.target.value))}
                aria-label={walek ? UI.etykietaSrednicyWalek : UI.etykietaSrednicyOtwor}
                style={{width: `${Math.max(2.2, String(srednica).length + 0.7)}ch`}}
              />
            </Etykieta>

            <Etykieta zaczep={zaczepy.d2}>
              {rowek ? (
                <Wymiar
                  glowny={`⌀${pl(rowek.d2)} ${rowek.d2Klasa}`}
                  gora={zapisOdchylki('+', gornaOdchylka(rowek.d2Odchylki))}
                  dol={zapisOdchylki('-', dolnaOdchylka(rowek.d2Odchylki))}
                />
              ) : (
                <Wymiar glowny="⌀?" />
              )}
            </Etykieta>

            <Etykieta zaczep={zaczepy.m}>
              {rowek ? (
                <Wymiar
                  glowny={`${pl(rowek.m)} ${rowek.mKlasa}`}
                  gora={zapisOdchylki('+', gornaOdchylka(rowek.mOdchylki))}
                  dol={zapisOdchylki('-', dolnaOdchylka(rowek.mOdchylki))}
                />
              ) : (
                <Wymiar glowny="?" />
              )}
            </Etykieta>

            <Etykieta zaczep={zaczepy.n}>
              <Wymiar glowny={rowek ? `${pl(rowek.n)} ${UI.min}` : '?'} />
            </Etykieta>
          </div>
          <p className={styles.nota}>{UI.notaSchemat}</p>
        </div>

        <aside className={styles.pierscienBox}>
          <div className={styles.foto}>
            <img src={foto.plik} alt={foto.alt} width="551" height="612" loading="lazy" />
          </div>
          <div className={styles.pierscienOpis}>
            <p className={styles.rodzaj}>{walek ? UI.rodzajWalek : UI.rodzajOtwor}</p>
            <p className={styles.oznaczenie}>
              {trafione ? trafione.oznaczenie : walek ? UI.normaWalek : UI.normaOtwor}
            </p>
            <p className={styles.zakres}>{walek ? UI.zakresWalek : UI.zakresOtwor}</p>
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
          </div>

          <details className={styles.szczegoly}>
            <summary>{UI.wszystkieWymiary}</summary>
            <table className={styles.tabela}>
              <tbody>
                <tr>
                  <td>{UI.glebokoscRowka}</td>
                  <td>{`${pl(rowek.glebokosc)} ${UI.jednostkaMm}`}</td>
                  <td>t</td>
                </tr>
                <tr>
                  <td>{UI.gruboscPierscienia}</td>
                  <td>{`${pl(trafione.pierscien.s)} ${UI.jednostkaMm}`}</td>
                  <td>s</td>
                </tr>
                <tr>
                  <td>{UI.srednicaSwobodna}</td>
                  <td>{`${pl(trafione.pierscien.d3)} ${UI.jednostkaMm}`}</td>
                  <td>d3</td>
                </tr>
                {trafione.pierscien.d4 !== undefined && (
                  <tr>
                    <td>{UI.rozstawSzczypiec}</td>
                    <td>{`${pl(trafione.pierscien.d4)} ${UI.jednostkaMm}`}</td>
                    <td>d4</td>
                  </tr>
                )}
              </tbody>
            </table>
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
