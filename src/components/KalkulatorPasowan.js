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
const POWIEKSZENIA = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000];

// Napisy interfejsu siedza w pliku tresci, zeby dalo sie je poprawic bez
// dotykania kodu. Tutaj tylko skrot, zeby nie pisac tresc.ui w kazdym miejscu.
const TEKSTY_UI = tresc.ui;

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

function symbolOtworu(wynik) {
  return `${wynik.otwor.litera}${wynik.otwor.klasa}`;
}

function symbolWalka(wynik) {
  return `${wynik.walek.litera}${wynik.walek.klasa}`;
}

function opisZakresu(wynik) {
  if (wynik.rodzaj === 'ciasne') {
    return `Wcisk od ${Math.abs(wynik.luzMaksymalny.um)} do ${Math.abs(wynik.luzMinimalny.um)} µm`;
  }
  if (wynik.rodzaj === 'mieszane') {
    return `Od wcisku ${Math.abs(wynik.luzMinimalny.um)} µm do luzu ${wynik.luzMaksymalny.um} µm`;
  }
  return `Luz od ${wynik.luzMinimalny.um} do ${wynik.luzMaksymalny.um} µm`;
}

function wybierzWerdykt(wynik) {
  const lista = tresc.werdykty?.[wynik.rodzaj] || [];
  if (lista.length === 0) return '';

  const abs = Math.abs(wynik.luzMinimalny.um);
  const rate = abs / wynik.srednica;
  const wartosc = wynik.rodzaj === 'luzne' ? wynik.luzMinimalny.um : abs;

  const dopasowany = lista.find((wpis) => {
    const prog = wynik.rodzaj === 'ciasne' ? wpis.doUmNaMm : wpis.doUm;
    const wartoscPorownawcza = wynik.rodzaj === 'ciasne' ? rate : wartosc;
    return prog !== undefined
      && wartoscPorownawcza <= prog
      && (wpis.maxUm === undefined || abs <= wpis.maxUm);
  });

  return (dopasowany || lista[lista.length - 1]).tekst;
}

// Srednica walka na rysunku. Wycinek jest celowo maly: to podglad w
// narzedziu roboczym, a nie ilustracja do artykulu.
const SREDNICA_PX = 60;
// Do tylu pikseli ma urosnac szczelina po jednej stronie walka.
const CEL_SZCZELINY_PX = 14;

// Walek lezy w osi otworu, wiec luz srednicowy rozklada sie po polowie na
// obie strony. Powiekszenie dobieramy pod te polowe, bo to ona jest tym,
// co widac na rysunku.
function obliczPowiekszenie(wynik) {
  const maxUm = Math.max(Math.abs(wynik.luzMaksymalny.um), Math.abs(wynik.luzMinimalny.um));
  if (maxUm <= 0) return 1;

  const pxNaMm = SREDNICA_PX / wynik.srednica;
  const surowe = CEL_SZCZELINY_PX / (maxUm / 2 * 0.001 * pxNaMm);
  const wybrane = [...POWIEKSZENIA].reverse().find((p) => p <= surowe);
  return Math.max(wybrane || 1, 1);
}

// Polowa wartosci srednicowej, po polsku i bez udawanej dokladnosci.
function polowa(um) {
  const v = um / 2;
  return (Number.isInteger(v) ? String(v) : v.toFixed(1)).replace('.', ',');
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
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={styles.wykres}
      role="img"
      aria-label={`Wykres pól tolerancji dla pasowania ${wynik.symbol} na średnicy ${wynik.srednica} milimetra`}>
      {/* Linia wymiaru nominalnego. Opis stoi w wolnym marginesie po lewej,
          poza obszarem kolumn, zeby zaden prostokat go nie zaslonil. */}
      <line x1="16" y1={OS_Y} x2={W - 40} y2={OS_Y} className={styles.wykresOs} />
      <text x="20" y={OS_Y - 12} className={styles.wykresOsPodpis}>
        ⌀{wynik.srednica} mm
      </text>
      <text x="20" y={OS_Y + 20} className={styles.wykresOsPodpisMaly}>
        {TEKSTY_UI.wymiarNominalny}
      </text>

      {kolumna(190, 150, wynik.otwor.ES.um, wynik.otwor.EI.um, 'var(--pc-navy-soft)',
        `${TEKSTY_UI.otwor.toLowerCase()} ${symbolOtworu(wynik)}`)}
      {kolumna(460, 150, wynik.walek.es.um, wynik.walek.ei.um, 'var(--pc-rust)',
        `${TEKSTY_UI.walek.toLowerCase()} ${symbolWalka(wynik)}`)}

      <text x={W / 2} y={H - 14} className={styles.wykresSkala}>
        {TEKSTY_UI.wartosciMikrometry}
      </text>
    </svg>
  );
}

// Przekroj wzdluzny: walek lezy w OSI otworu, wiec luz srednicowy rozklada
// sie po polowie na obie strony i po obu stronach widac te sama szczeline.
// Dlatego kazdy wymiar ma dwie linie: wartosc srednicowa z tablic i wartosc
// przypadajaca na jedna strone, ktora faktycznie widac na rysunku.
//
// Wycinek jest maly celowo. Im mniej materialu w kadrze, tym wieksze
// powiekszenie szczeliny miesci sie w tej samej ramce, a o to tu chodzi:
// zmiana pola tolerancji ma byc widoczna golym okiem.
//
// Przy pasowaniu ciasnym walek jest wiekszy od otworu, wiec material korpusu
// wchodzi w obszar walka. Ten obszar rysujemy krzyzowym kreskowaniem: to
// wizualne wytlumaczenie, dlaczego takie polaczenie idzie na prase.
function Przekroj({wynik}) {
  const id = React.useId().replace(/:/g, '');
  const wzorKorpusuId = `${id}-korpus`;
  const wzorWalkaId = `${id}-walek`;
  const wzorWciskuId = `${id}-wcisk`;

  // Geometria stala. Prawa czesc rysunku (od X_WYMIARY) jest zarezerwowana na
  // opisy wymiarow, zeby zaden podpis nie wychodzil poza viewBox.
  const CY = 75;
  const R_WALKA = SREDNICA_PX / 2;
  const X_KORPUS = 8;
  const SZER_KORPUSU = 176;
  const X_WALEK = 34;
  const SZER_WALKA = 124;
  const X_WYMIARY = 184;

  const powiekszenie = obliczPowiekszenie(wynik);
  const pxNaUm = (SREDNICA_PX / wynik.srednica) / 1000 * powiekszenie;
  const ciasne = wynik.rodzaj === 'ciasne';
  const mieszane = wynik.rodzaj === 'mieszane';

  // Wartosci z tablic sa srednicowe, a na rysunku widac polowe. Minimalna
  // widoczna grubosc pasma, bo linia zerowej wysokosci zniknełaby zupelnie.
  const naPiksele = (um) => (um > 0 ? Math.max(um / 2 * pxNaUm, 1.5) : 0);

  const luzUm = Math.max(wynik.luzMaksymalny.um, 0);
  const wciskUm = Math.max(-wynik.luzMinimalny.um, 0);
  const luzPx = naPiksele(luzUm);
  const wciskPx = naPiksele(wciskUm);

  // Powierzchnie otworu odjezdzaja od walka przy luzie, a przy wcisku
  // wchodza na niego. Obie strony ruszaja sie symetrycznie.
  const przesuniecie = ciasne ? -wciskPx : luzPx;
  const yWalekGora = CY - R_WALKA;
  const yWalekDol = CY + R_WALKA;

  const labelOtworu = `${TEKSTY_UI.otwor.toUpperCase()} ${symbolOtworu(wynik)}`;
  const labelWalka = `${TEKSTY_UI.walek.toUpperCase()} ${symbolWalka(wynik)}`;
  const opisUkladu = ciasne ? TEKSTY_UI.ukladPrzekrojuCiasne : TEKSTY_UI.ukladPrzekroju;
  const opisSkali = powiekszenie === 1
    ? `${TEKSTY_UI.rysunek11} ${opisUkladu}`
    : `${TEKSTY_UI.roznicaPowiekszona} ${powiekszenie} ${TEKSTY_UI.razy} ${opisUkladu}`;
  const ariaLabel = `${tresc.rodzaje[wynik.rodzaj].nazwa}: ${opisZakresu(wynik)}, ${labelOtworu}, ${labelWalka}.`;

  // Wymiar z dwiema strzalkami i dwuwierszowym podpisem po prawej stronie.
  const wymiar = (yOd, yDo, nazwa, um, klasa) => {
    const srodek = (yOd + yDo) / 2;
    return (
      <g>
        <line x1={X_WYMIARY} y1={yOd} x2={X_WYMIARY} y2={yDo} className={styles.liniaWymiarowa} />
        <line x1={X_WYMIARY - 5} y1={yOd} x2={X_WYMIARY + 5} y2={yOd} className={styles.liniaWymiarowa} />
        <line x1={X_WYMIARY - 5} y1={yDo} x2={X_WYMIARY + 5} y2={yDo} className={styles.liniaWymiarowa} />
        <text x={X_WYMIARY + 8} y={srodek} className={`${styles.wymiarPrzekroju} ${klasa}`}>
          <tspan x={X_WYMIARY + 8} dy="-1">{nazwa} {um} µm</tspan>
          <tspan x={X_WYMIARY + 8} dy="11" className={styles.wymiarNaStrone}>
            {polowa(um)} {TEKSTY_UI.naStrone}
          </tspan>
        </text>
      </g>
    );
  };

  return (
    <div className={styles.przekrojWrap}>
      <svg viewBox="0 0 320 150" className={styles.przekroj} role="img" aria-label={ariaLabel}>
        <defs>
          <pattern id={wzorKorpusuId} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" className={styles.kreskowanieKorpusu} />
          </pattern>
          {/* Sasiadujace czesci kreskuje sie w przeciwne strony. */}
          <pattern id={wzorWalkaId} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <line x1="0" y1="0" x2="0" y2="7" className={styles.kreskowanieWalka} />
          </pattern>
          <pattern id={wzorWciskuId} width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M0 6 L6 0 M0 0 L6 6" className={styles.kreskowanieWcisku} />
          </pattern>
        </defs>

        {/* Walek. Rysowany pierwszy, zeby material korpusu mogl na niego
            nachodzic przy pasowaniu ciasnym. */}
        <g>
          <rect x={X_WALEK} y={yWalekGora} width={SZER_WALKA} height={SREDNICA_PX}
            className={styles.materialWalka} />
          <rect x={X_WALEK} y={yWalekGora} width={SZER_WALKA} height={SREDNICA_PX}
            fill={`url(#${wzorWalkaId})`} />
        </g>

        {/* Powierzchnia otworu od dolu. */}
        <g className={styles.warstwaPrzekroju} style={{transform: `translateY(${przesuniecie}px)`}}>
          <rect x={X_KORPUS} y={yWalekDol} width={SZER_KORPUSU} height="80" className={styles.materialKorpusu} />
          <rect x={X_KORPUS} y={yWalekDol} width={SZER_KORPUSU} height="80" fill={`url(#${wzorKorpusuId})`} />
        </g>

        {/* Powierzchnia otworu od gory. Prostokat siega poza viewBox, zeby
            przy ruchu w dol nie odslonic tla. */}
        <g className={styles.warstwaPrzekroju} style={{transform: `translateY(${-przesuniecie}px)`}}>
          <rect x={X_KORPUS} y={yWalekGora - 80} width={SZER_KORPUSU} height="80"
            className={styles.materialKorpusu} />
          <rect x={X_KORPUS} y={yWalekGora - 80} width={SZER_KORPUSU} height="80"
            fill={`url(#${wzorKorpusuId})`} />
        </g>

        {/* Obszary, w ktorych material walka i korpusu zajmuja to samo miejsce. */}
        {wciskUm > 0 ? (
          <g>
            <rect x={X_WALEK} y={yWalekGora} width={SZER_WALKA} height={wciskPx} className={styles.nakladanie} />
            <rect x={X_WALEK} y={yWalekGora} width={SZER_WALKA} height={wciskPx} fill={`url(#${wzorWciskuId})`} />
            <rect x={X_WALEK} y={yWalekDol - wciskPx} width={SZER_WALKA} height={wciskPx} className={styles.nakladanie} />
            <rect x={X_WALEK} y={yWalekDol - wciskPx} width={SZER_WALKA} height={wciskPx} fill={`url(#${wzorWciskuId})`} />
          </g>
        ) : null}

        {/* Os symetrii: kreska-kropka, tak jak na rysunku technicznym.
            To ona pokazuje, ze walek stoi w osi otworu, a nie lezy na dnie. */}
        <line x1={X_KORPUS - 6} y1={CY} x2={X_WYMIARY + 6} y2={CY} className={styles.osPrzekroju} />

        {/* Tabliczki opisowe stoja nieruchomo, bo material zawsze je pokrywa. */}
        <g>
          <rect x={X_KORPUS + 8} y="6" width="92" height="20" rx="2" className={styles.tablicaOtworu} />
          <text x={X_KORPUS + 54} y="20" className={styles.etykietaPrzekroju}>{labelOtworu}</text>
        </g>
        <g>
          <rect x={X_WALEK + SZER_WALKA / 2 - 46} y={CY - 10} width="92" height="20" rx="2"
            className={styles.tablicaWalka} />
          <text x={X_WALEK + SZER_WALKA / 2} y={CY + 4} className={styles.etykietaPrzekroju}>{labelWalka}</text>
        </g>

        {luzUm > 0
          ? wymiar(yWalekGora - luzPx, yWalekGora, TEKSTY_UI.luzMax, luzUm, styles.wymiarLuzu)
          : null}

        {/* Przy pasowaniu mieszanym oba wymiary stoja obok siebie: to jedyny
            sposob, zeby pokazac, ze jedna sztuka bedzie miala luz, a druga wcisk. */}
        {wciskUm > 0
          ? wymiar(yWalekDol - wciskPx, yWalekDol,
            mieszane || ciasne ? TEKSTY_UI.wciskMax : TEKSTY_UI.wcisk, wciskUm, styles.wymiarWcisku)
          : null}
      </svg>
      <p className={styles.skalaPrzekroju}>{opisSkali}</p>
    </div>
  );
}

function PolaTolerancji({otwor, setOtwor, walek, setWalek}) {
  return (
    <div className={styles.polaTolerancji}>
      <label className={styles.poleKompaktowe}>
        <span className={styles.etykieta}>{TEKSTY_UI.otwor}</span>
        <span className={styles.para}>
          <select
            value={otwor.litera}
            onChange={(e) => setOtwor({...otwor, litera: e.target.value})}
            className={styles.select}
            aria-label={TEKSTY_UI.poleOtworu}>
            {LITERY_OTWOROW.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <select
            value={otwor.klasa}
            onChange={(e) => setOtwor({...otwor, klasa: Number(e.target.value)})}
            className={styles.select}
            aria-label={TEKSTY_UI.klasaOtworu}>
            {KLASY_IT.map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </span>
      </label>

      <label className={styles.poleKompaktowe}>
        <span className={styles.etykieta}>{TEKSTY_UI.walek}</span>
        <span className={styles.para}>
          <select
            value={walek.litera}
            onChange={(e) => setWalek({...walek, litera: e.target.value})}
            className={styles.select}
            aria-label={TEKSTY_UI.poleWalka}>
            {LITERY_WALKOW.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <select
            value={walek.klasa}
            onChange={(e) => setWalek({...walek, klasa: Number(e.target.value)})}
            className={styles.select}
            aria-label={TEKSTY_UI.klasaWalka}>
            {KLASY_IT.map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </span>
      </label>
    </div>
  );
}

function TabelaDanych({wynik}) {
  return (
    <div className={styles.tabelaWrap}>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>{TEKSTY_UI.element}</th>
            <th>{TEKSTY_UI.odchylkaGorna}</th>
            <th>{TEKSTY_UI.odchylkaDolna}</th>
            <th>{TEKSTY_UI.wymiarNajmniejszy}</th>
            <th>{TEKSTY_UI.wymiarNajwiekszy}</th>
            <th>{TEKSTY_UI.tolerancja}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{TEKSTY_UI.otwor} {symbolOtworu(wynik)}</td>
            <td>{znak(wynik.otwor.ES.um)} µm</td>
            <td>{znak(wynik.otwor.EI.um)} µm</td>
            <td>{wynik.otwor.wymiarGraniczny.dolny.toFixed(3)} mm</td>
            <td>{wynik.otwor.wymiarGraniczny.gorny.toFixed(3)} mm</td>
            <td>{wynik.otwor.tolerancja.um} µm</td>
          </tr>
          <tr>
            <td>{TEKSTY_UI.walek} {symbolWalka(wynik)}</td>
            <td>{znak(wynik.walek.es.um)} µm</td>
            <td>{znak(wynik.walek.ei.um)} µm</td>
            <td>{wynik.walek.wymiarGraniczny.dolny.toFixed(3)} mm</td>
            <td>{wynik.walek.wymiarGraniczny.gorny.toFixed(3)} mm</td>
            <td>{wynik.walek.tolerancja.um} µm</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ZapisNaRysunku({wynik}) {
  return (
    <p className={styles.zapis}>
      {TEKSTY_UI.zapisNaRysunku} <strong>⌀{wynik.srednica} {wynik.symbol}</strong>
      {' '}{TEKSTY_UI.zapisOsobno} {TEKSTY_UI.otwor.toLowerCase()} ⌀{wynik.srednica} {symbolOtworu(wynik)}
      {' '}({mm(wynik.otwor.EI.um)} / {mm(wynik.otwor.ES.um)}), {TEKSTY_UI.walek.toLowerCase()} ⌀{wynik.srednica}{' '}
      {symbolWalka(wynik)} ({mm(wynik.walek.ei.um)} / {mm(wynik.walek.es.um)}).
    </p>
  );
}

function WynikKompaktowy({wynik, otwor, setOtwor, walek, setWalek}) {
  const rodzaj = tresc.rodzaje[wynik.rodzaj];
  const werdykt = wybierzWerdykt(wynik);

  return (
    <section className={styles.wynikKompaktowy} aria-live="polite">
      <div className={styles.wynikNaglowek}>
        <span className={`${styles.wynikOdznaka} ${styles[wynik.rodzaj]}`}>{rodzaj.nazwa}</span>
        <p className={styles.wynikLiczba}>{opisZakresu(wynik)}</p>
        <p className={styles.werdykt}>{werdykt}</p>
      </div>

      <Przekroj wynik={wynik} />

      <div className={styles.legendaPrzekroju}>
        <span><span className={`${styles.kropka} ${styles.kropkaOtwor}`} />{TEKSTY_UI.legendaOtwor}</span>
        <span><span className={`${styles.kropka} ${styles.kropkaWalek}`} />{TEKSTY_UI.legendaWalek}</span>
      </div>

      <PolaTolerancji otwor={otwor} setOtwor={setOtwor} walek={walek} setWalek={setWalek} />
    </section>
  );
}

function Szczegoly({wynik, otwarte, setOtwarte}) {
  const aktualizuj = (klucz) => (event) => {
    setOtwarte((stan) => ({...stan, [klucz]: event.currentTarget.open}));
  };

  return (
    <div className={styles.szczegoly}>
      <details open={otwarte.techniczne} onToggle={aktualizuj('techniczne')} className={styles.details}>
        <summary>{TEKSTY_UI.odchylkiDetails}</summary>
        <div className={styles.detailsZawartosc}>
          <TabelaDanych wynik={wynik} />
          <ZapisNaRysunku wynik={wynik} />
          <WykresPol wynik={wynik} />
          <p className={styles.podpisWykresu}>{tresc.podpisWykresu}</p>
        </div>
      </details>

      <details open={otwarte.praktyka} onToggle={aktualizuj('praktyka')} className={styles.details}>
        <summary>{TEKSTY_UI.praktykaDetails}</summary>
        <div className={styles.detailsZawartosc}>
          <p className={styles.opisPraktyczny}>{tresc.rodzaje[wynik.rodzaj].opis}</p>
        </div>
      </details>
    </div>
  );
}

function SterowaniePasowaniem({srednica, setSrednica, zasada, setZasada, symbol, ustawSymbol}) {
  return (
    <section className={styles.sterowanie}>
      <label className={styles.pole}>
        <span className={styles.etykieta}>{TEKSTY_UI.srednica}</span>
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

      <div className={styles.zasady}>
        <span className={styles.etykieta}>{TEKSTY_UI.zasada}</span>
        <div className={styles.przelacznik}>
          <button
            type="button"
            className={`${styles.opcja} ${zasada === 'stalegoOtworu' ? styles.opcjaAktywna : ''}`}
            onClick={() => setZasada('stalegoOtworu')}>
            {tresc.zasadaOtworu}
          </button>
          <button
            type="button"
            className={`${styles.opcja} ${zasada === 'stalegoWalka' ? styles.opcjaAktywna : ''}`}
            onClick={() => setZasada('stalegoWalka')}>
            {tresc.zasadaWalka}
          </button>
        </div>
      </div>

      <div className={styles.skrotyPasowan}>
        <span className={styles.etykieta}>{TEKSTY_UI.najczestsze}</span>
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
    </section>
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
  const [otwarteDetails, setOtwarteDetails] = React.useState({techniczne: false, praktyka: false});

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

  return (
    <div className={styles.kalkulator}>
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

      {tryb === 'pasowanie' ? (
        wynik.ok ? (
          <div className={styles.panelPasowania}>
            <SterowaniePasowaniem
              srednica={srednica}
              setSrednica={setSrednica}
              zasada={zasada}
              setZasada={setZasada}
              symbol={symbol}
              ustawSymbol={ustawSymbol}
            />
            <WynikKompaktowy
              wynik={wynik.ok}
              otwor={otwor}
              setOtwor={setOtwor}
              walek={walek}
              setWalek={setWalek}
            />
            <Szczegoly wynik={wynik.ok} otwarte={otwarteDetails} setOtwarte={setOtwarteDetails} />
          </div>
        ) : (
          <p className={styles.blad}>{wynik.blad}</p>
        )
      ) : (
        <div className={styles.panelLuzu}>
          <div className={styles.polaLuzu}>
            <label className={styles.pole}>
              <span className={styles.etykieta}>{TEKSTY_UI.srednica}</span>
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
            </label>
            <label className={styles.pole}>
              <span className={styles.etykieta}>{TEKSTY_UI.luzMinimalny}</span>
              <div className={styles.zJednostka}>
                <input
                  type="number"
                  step="1"
                  value={luzMin}
                  onChange={(e) => setLuzMin(e.target.value)}
                  className={styles.input}
                />
                <span className={styles.jednostka}>µm</span>
              </div>
            </label>
            <label className={styles.pole}>
              <span className={styles.etykieta}>{TEKSTY_UI.luzMaksymalny}</span>
              <div className={styles.zJednostka}>
                <input
                  type="number"
                  step="1"
                  value={luzMax}
                  onChange={(e) => setLuzMax(e.target.value)}
                  className={styles.input}
                />
                <span className={styles.jednostka}>µm</span>
              </div>
            </label>
          </div>

          <div className={styles.zasady}>
            <span className={styles.etykieta}>{TEKSTY_UI.zasada}</span>
            <div className={styles.przelacznik}>
              <button
                type="button"
                className={`${styles.opcja} ${zasada === 'stalegoOtworu' ? styles.opcjaAktywna : ''}`}
                onClick={() => setZasada('stalegoOtworu')}>
                {tresc.zasadaOtworu}
              </button>
              <button
                type="button"
                className={`${styles.opcja} ${zasada === 'stalegoWalka' ? styles.opcjaAktywna : ''}`}
                onClick={() => setZasada('stalegoWalka')}>
                {tresc.zasadaWalka}
              </button>
            </div>
          </div>

          <div className={styles.propozycje}>
            {propozycje.length === 0 ? (
              <p className={styles.blad}>{TEKSTY_UI.brakPasowania}</p>
            ) : (
              <ol className={styles.listaPropozycji}>
                {propozycje.map((p) => (
                  <li key={p.symbol}>
                    <button type="button" className={styles.propozycja} onClick={() => ustawSymbol(p.symbol)}>
                      <span className={styles.propSymbol}>
                        {p.symbol}
                        {p.uprzywilejowane ? <span className={styles.gwiazdka} title={TEKSTY_UI.gwiazdka}>★</span> : null}
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
            <p className={styles.legenda}>{TEKSTY_UI.legendaGwiazdki}</p>
          </div>
        </div>
      )}

      <p className={styles.zastrzezenie}>{tresc.zastrzezenie}</p>
    </div>
  );
}

export {SKROTY, rozbijSymbol};
