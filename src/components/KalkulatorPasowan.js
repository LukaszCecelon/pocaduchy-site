import React from 'react';
import {policzPasowanie, znajdzPasowania} from '@site/src/lib/pasowania/oblicz.js';
import {
  LITERY_WALKOW,
  LITERY_OTWOROW,
  KLASY_IT,
  PASOWANIA_UPRZYWILEJOWANE,
} from '@site/src/lib/pasowania/dane.js';
import tresc from '@site/content/wiedza-pasowania.json';
import styles from './KalkulatorPasowan.module.css';

// Najczesciej uzywane pasowania, wprost z tablic pasowan normalnych.
// Sluza jako skroty: jedno klikniecie zamiast dwoch list rozwijanych.
const SKROTY = {
  stalegoOtworu: [
    {rodzaj: 'luzne', pasowania: ['H11/c11', 'H8/e8', 'H7/f7', 'H7/g6', 'H7/h6']},
    {rodzaj: 'mieszane', pasowania: ['H7/js6', 'H7/k6', 'H7/m6', 'H7/n6']},
    {rodzaj: 'ciasne', pasowania: ['H7/p6', 'H7/r6', 'H7/s6']},
  ],
  stalegoWalka: [
    {rodzaj: 'luzne', pasowania: ['H11/h11', 'E9/h8', 'F8/h6', 'G7/h6', 'H7/h6']},
    {rodzaj: 'mieszane', pasowania: ['K7/h6', 'M7/h6', 'N7/h6']},
    {rodzaj: 'ciasne', pasowania: ['P7/h6', 'R7/h6', 'S7/h6']},
  ],
};

const SREDNICE_SKROTY = [6, 10, 20, 30, 50, 80, 120];

function rozbijSymbol(symbol) {
  const [otwor, walek] = symbol.split('/');
  const podziel = (s) => {
    const m = s.match(/^([A-Za-z]+)(\d+)$/);
    return {litera: m[1], klasa: Number(m[2])};
  };
  return {otwor: podziel(otwor), walek: podziel(walek)};
}

// Mikrometry na milimetry z sensowna liczba miejsc: przy setnych mikrometra
// nikt nie pracuje, wiec nie udajemy takiej dokladnosci.
function mm(um) {
  return (um / 1000).toFixed(3);
}

function znak(um) {
  return um > 0 ? `+${um}` : String(um);
}

// Wykres pol tolerancji. Dwie kolumny, otwor i walek, wzgledem linii wymiaru
// nominalnego. Skala dobiera sie sama do najwiekszej odchylki, zeby male
// pasowania nie byly niewidoczne, a duze nie wychodzily poza ramke.
function WykresPol({wynik}) {
  const W = 720;
  const H = 300;
  const OS_Y = 168;
  const WYS_MAX = 96;

  const wartosci = [
    wynik.otwor.ES.um,
    wynik.otwor.EI.um,
    wynik.walek.es.um,
    wynik.walek.ei.um,
    0,
  ];
  const zakres = Math.max(...wartosci.map(Math.abs), 1);
  const skala = WYS_MAX / (zakres * 1.25);
  const y = (um) => OS_Y - um * skala;

  const kolumna = (x, szer, gora, dol, kolor, etykieta) => {
    const yG = y(gora);
    const yD = y(dol);
    const wys = Math.max(Math.abs(yD - yG), 2);
    return (
      <g>
        <rect x={x} y={Math.min(yG, yD)} width={szer} height={wys} fill={kolor} opacity="0.9" />
        <text x={x + szer / 2} y={Math.min(yG, yD) - 10} className={styles.wykresEtykieta}>
          {etykieta}
        </text>
        {/* Wartosc rowna zeru lezy dokladnie na linii wymiaru nominalnego,
            wiec bez obwodki tekst zlewalby sie z przerywana linia. */}
        <text x={x + szer + 10} y={yG + 4} className={styles.wykresWartosc}>
          {znak(gora)}
        </text>
        <text x={x + szer + 10} y={yD + 4} className={styles.wykresWartosc}>
          {znak(dol)}
        </text>
      </g>
    );
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.wykres} role="img"
      aria-label={`Wykres pól tolerancji dla pasowania ${wynik.symbol} na średnicy ${wynik.srednica} milimetra`}>
      {/* Linia wymiaru nominalnego. Opis stoi w wolnym marginesie po lewej,
          poza obszarem kolumn, zeby zaden prostokat go nie zaslonil. */}
      <line x1="16" y1={OS_Y} x2={W - 40} y2={OS_Y} className={styles.wykresOs} />
      <text x="20" y={OS_Y - 12} className={styles.wykresOsPodpis}>
        ⌀{wynik.srednica} mm
      </text>
      <text x="20" y={OS_Y + 20} className={styles.wykresOsPodpisMaly}>
        wymiar nominalny
      </text>

      {kolumna(190, 150, wynik.otwor.ES.um, wynik.otwor.EI.um, 'var(--pc-navy-soft)',
        `otwór ${wynik.otwor.litera}${wynik.otwor.klasa}`)}
      {kolumna(460, 150, wynik.walek.es.um, wynik.walek.ei.um, 'var(--pc-rust)',
        `wałek ${wynik.walek.litera}${wynik.walek.klasa}`)}

      <text x={W / 2} y={H - 14} className={styles.wykresSkala}>
        wartości w mikrometrach
      </text>
    </svg>
  );
}

function Wynik({wynik}) {
  const rodzaj = tresc.rodzaje[wynik.rodzaj];
  const ciasne = wynik.rodzaj === 'ciasne';
  const mieszane = wynik.rodzaj === 'mieszane';

  // Przy pasowaniu ciasnym mowienie o "luzie ujemnym" jest myląc e.
  // Konstruktor mysli wtedy wciskiem, wiec tak to nazywamy.
  const naglowek = ciasne
    ? `Wcisk od ${Math.abs(wynik.luzMaksymalny.um)} do ${Math.abs(wynik.luzMinimalny.um)} µm`
    : mieszane
      ? `Od wcisku ${Math.abs(wynik.luzMinimalny.um)} µm do luzu ${wynik.luzMaksymalny.um} µm`
      : `Luz od ${wynik.luzMinimalny.um} do ${wynik.luzMaksymalny.um} µm`;

  return (
    <div className={styles.wynik}>
      <div className={`${styles.wynikGlowny} ${styles[wynik.rodzaj]}`}>
        <span className={styles.wynikOdznaka}>{rodzaj.nazwa}</span>
        <p className={styles.wynikLiczba}>{naglowek}</p>
        <p className={styles.wynikOpis}>{rodzaj.opis}</p>
      </div>

      <WykresPol wynik={wynik} />
      <p className={styles.podpisWykresu}>{tresc.podpisWykresu}</p>

      <div className={styles.tabelaWrap}>
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Element</th>
              <th>Odchyłka górna</th>
              <th>Odchyłka dolna</th>
              <th>Wymiar najmniejszy</th>
              <th>Wymiar największy</th>
              <th>Tolerancja</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Otwór {wynik.otwor.litera}{wynik.otwor.klasa}</td>
              <td>{znak(wynik.otwor.ES.um)} µm</td>
              <td>{znak(wynik.otwor.EI.um)} µm</td>
              <td>{wynik.otwor.wymiarGraniczny.dolny.toFixed(3)} mm</td>
              <td>{wynik.otwor.wymiarGraniczny.gorny.toFixed(3)} mm</td>
              <td>{wynik.otwor.tolerancja.um} µm</td>
            </tr>
            <tr>
              <td>Wałek {wynik.walek.litera}{wynik.walek.klasa}</td>
              <td>{znak(wynik.walek.es.um)} µm</td>
              <td>{znak(wynik.walek.ei.um)} µm</td>
              <td>{wynik.walek.wymiarGraniczny.dolny.toFixed(3)} mm</td>
              <td>{wynik.walek.wymiarGraniczny.gorny.toFixed(3)} mm</td>
              <td>{wynik.walek.tolerancja.um} µm</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className={styles.zapis}>
        Zapis na rysunku: <strong>⌀{wynik.srednica} {wynik.symbol}</strong>
        {'  '}albo osobno: otwór ⌀{wynik.srednica} {wynik.otwor.litera}{wynik.otwor.klasa}
        {' '}({mm(wynik.otwor.EI.um)} / {mm(wynik.otwor.ES.um)}), wałek ⌀{wynik.srednica}{' '}
        {wynik.walek.litera}{wynik.walek.klasa} ({mm(wynik.walek.ei.um)} / {mm(wynik.walek.es.um)}).
      </p>
    </div>
  );
}

export default function KalkulatorPasowan() {
  const [tryb, setTryb] = React.useState('pasowanie');
  const [zasada, setZasada] = React.useState('stalegoOtworu');
  const [srednica, setSrednica] = React.useState(20);
  const [otwor, setOtwor] = React.useState({litera: 'H', klasa: 7});
  const [walek, setWalek] = React.useState({litera: 'g', klasa: 6});
  const [luzMin, setLuzMin] = React.useState(0);
  const [luzMax, setLuzMax] = React.useState(50);

  const symbol = `${otwor.litera}${otwor.klasa}/${walek.litera}${walek.klasa}`;

  const wynik = React.useMemo(() => {
    try {
      return {ok: policzPasowanie({srednica, otwor, walek})};
    } catch (e) {
      return {blad: e.message};
    }
  }, [srednica, otwor, walek]);

  const propozycje = React.useMemo(() => {
    if (tryb !== 'luz') return [];
    try {
      return znajdzPasowania({srednica, luzMin: Number(luzMin), luzMax: Number(luzMax), zasada});
    } catch {
      return [];
    }
  }, [tryb, srednica, luzMin, luzMax, zasada]);

  function ustawSymbol(s) {
    const r = rozbijSymbol(s);
    setOtwor(r.otwor);
    setWalek(r.walek);
    setTryb('pasowanie');
  }

  const zbiorUprzywilejowanych =
    PASOWANIA_UPRZYWILEJOWANE[zasada === 'stalegoOtworu' ? 'stalyOtwor' : 'stalyWalek'];

  return (
    <div className={styles.kalkulator}>
      {/* Wybor trybu: to jest glowna decyzja, wiec stoi najwyzej i jest duza */}
      <div className={styles.tryby} role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tryb === 'pasowanie'}
          className={`${styles.tryb} ${tryb === 'pasowanie' ? styles.trybAktywny : ''}`}
          onClick={() => setTryb('pasowanie')}>
          {tresc.trybPasowanie}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tryb === 'luz'}
          className={`${styles.tryb} ${tryb === 'luz' ? styles.trybAktywny : ''}`}
          onClick={() => setTryb('luz')}>
          {tresc.trybLuz}
        </button>
      </div>

      <div className={styles.pola}>
        <label className={styles.pole}>
          <span className={styles.etykieta}>Średnica nominalna</span>
          <div className={styles.zJednostka}>
            <input
              type="number"
              min="1"
              max="500"
              step="0.5"
              value={srednica}
              onChange={(e) => setSrednica(Number(e.target.value))}
              className={styles.input}
            />
            <span className={styles.jednostka}>mm</span>
          </div>
          <div className={styles.skroty}>
            {SREDNICE_SKROTY.map((d) => (
              <button key={d} type="button" className={styles.skrot} onClick={() => setSrednica(d)}>
                {d}
              </button>
            ))}
          </div>
        </label>

        {tryb === 'pasowanie' ? (
          <>
            <label className={styles.pole}>
              <span className={styles.etykieta}>Otwór</span>
              <div className={styles.para}>
                <select
                  value={otwor.litera}
                  onChange={(e) => setOtwor({...otwor, litera: e.target.value})}
                  className={styles.select}
                  aria-label="Pole tolerancji otworu">
                  {LITERY_OTWOROW.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
                <select
                  value={otwor.klasa}
                  onChange={(e) => setOtwor({...otwor, klasa: Number(e.target.value)})}
                  className={styles.select}
                  aria-label="Klasa dokładności otworu">
                  {KLASY_IT.map((k) => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
            </label>

            <label className={styles.pole}>
              <span className={styles.etykieta}>Wałek</span>
              <div className={styles.para}>
                <select
                  value={walek.litera}
                  onChange={(e) => setWalek({...walek, litera: e.target.value})}
                  className={styles.select}
                  aria-label="Pole tolerancji wałka">
                  {LITERY_WALKOW.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
                <select
                  value={walek.klasa}
                  onChange={(e) => setWalek({...walek, klasa: Number(e.target.value)})}
                  className={styles.select}
                  aria-label="Klasa dokładności wałka">
                  {KLASY_IT.map((k) => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
            </label>
          </>
        ) : (
          <>
            <label className={styles.pole}>
              <span className={styles.etykieta}>Luz minimalny</span>
              <div className={styles.zJednostka}>
                <input type="number" step="1" value={luzMin}
                  onChange={(e) => setLuzMin(e.target.value)} className={styles.input} />
                <span className={styles.jednostka}>µm</span>
              </div>
            </label>
            <label className={styles.pole}>
              <span className={styles.etykieta}>Luz maksymalny</span>
              <div className={styles.zJednostka}>
                <input type="number" step="1" value={luzMax}
                  onChange={(e) => setLuzMax(e.target.value)} className={styles.input} />
                <span className={styles.jednostka}>µm</span>
              </div>
            </label>
          </>
        )}
      </div>

      <div className={styles.zasady}>
        <span className={styles.etykieta}>Zasada</span>
        <div className={styles.przelacznik}>
          <button type="button"
            className={`${styles.opcja} ${zasada === 'stalegoOtworu' ? styles.opcjaAktywna : ''}`}
            onClick={() => setZasada('stalegoOtworu')}>{tresc.zasadaOtworu}</button>
          <button type="button"
            className={`${styles.opcja} ${zasada === 'stalegoWalka' ? styles.opcjaAktywna : ''}`}
            onClick={() => setZasada('stalegoWalka')}>{tresc.zasadaWalka}</button>
        </div>
      </div>

      {tryb === 'pasowanie' ? (
        <div className={styles.skrotyPasowan}>
          <span className={styles.etykieta}>Najczęstsze pasowania</span>
          {SKROTY[zasada].map((grupa) => (
            <div key={grupa.rodzaj} className={styles.grupaSkrotow}>
              <span className={`${styles.nazwaGrupy} ${styles[grupa.rodzaj]}`}>
                {tresc.rodzaje[grupa.rodzaj].nazwa}
              </span>
              <div className={styles.skroty}>
                {grupa.pasowania.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`${styles.skrot} ${s === symbol ? styles.skrotAktywny : ''}`}
                    onClick={() => ustawSymbol(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {tryb === 'pasowanie' ? (
        wynik.ok ? <Wynik wynik={wynik.ok} /> : (
          <p className={styles.blad}>{wynik.blad}</p>
        )
      ) : (
        <div className={styles.propozycje}>
          {propozycje.length === 0 ? (
            <p className={styles.blad}>
              Nie znalazłem pasowania w tym zakresie. Spróbuj poszerzyć widełki luzu.
            </p>
          ) : (
            <ol className={styles.listaPropozycji}>
              {propozycje.map((p) => (
                <li key={p.symbol}>
                  <button type="button" className={styles.propozycja} onClick={() => ustawSymbol(p.symbol)}>
                    <span className={styles.propSymbol}>
                      {p.symbol}
                      {p.uprzywilejowane ? <span className={styles.gwiazdka} title="pasowanie uprzywilejowane">★</span> : null}
                    </span>
                    <span className={styles.propZakres}>
                      {p.luzMinimalny.um} do {p.luzMaksymalny.um} µm
                    </span>
                    <span className={`${styles.propRodzaj} ${styles[p.rodzaj]}`}>{p.rodzaj}</span>
                  </button>
                </li>
              ))}
            </ol>
          )}
          <p className={styles.legenda}>
            ★ oznacza pasowanie uprzywilejowane, czyli takie, które warto wybierać w pierwszej
            kolejności: narzędzia i sprawdziany są na nie łatwiej dostępne.
          </p>
        </div>
      )}

      <p className={styles.zastrzezenie}>{tresc.zastrzezenie}</p>
    </div>
  );
}

export {SKROTY, rozbijSymbol};
