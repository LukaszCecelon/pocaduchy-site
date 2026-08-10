import React, {useMemo, useState} from 'react';
import {
  WYMIARY,
  PLASKA,
  przelicz,
  przeliczRoznice,
  formatuj,
  parsuj,
  rozsypka,
} from '@site/src/lib/jednostki/oblicz';
import {DEFINICJE} from '@site/src/lib/jednostki/definicje';
import UI from '@site/content/przelicznik-ui.json';
import styles from './Przelicznik.module.css';

// Siedem wymiarow, ktore konstruktor przelicza najczesciej. Reszta chowa sie
// pod jednym przyciskiem, zeby pasek filtrow nie zajmowal polowy ekranu.
const FILTRY_GLOWNE = ['cisnienie', 'dlugosc', 'moment', 'sila', 'temperatura', 'moc', 'przeplyw'];

// Nazwa wymiaru bywa za dluga na przycisk. Skrot dotyczy tylko filtra,
// naglowki grup w listach zostaja pelne.
const SKROTY = {
  cisnienie: 'Ciśnienie',
  moment: 'Moment',
  obroty: 'Obroty',
  przyspieszenie: 'Przyspieszenie',
  bezwladnosc: 'Bezwładność',
  przeplyw: 'Przepływ',
  sztywnosc: 'Sztywność',
  lepkosc: 'Lepkość',
  pole: 'Pole',
  objetosc: 'Objętość',
};

// Skrot do najczestszych par: to sa jednostki, po ktore ludzie siegaja od razu.
const CZESTE = [
  'cisnienie|bar', 'cisnienie|psi', 'cisnienie|MPa', 'moment|N·m', 'moment|lbf·ft',
  'dlugosc|mm', 'dlugosc|cal', 'sila|N', 'sila|kgf', 'moc|kW', 'moc|KM',
  'temperatura|°C', 'temperatura|°F',
];

const znajdz = (klucz) => PLASKA.find((j) => j.klucz === klucz);

// Przy jednostkach typu bar czy cal symbol i nazwa sa tym samym slowem,
// wiec „bar · bar" na liscie wygladaloby jak usterka.
const podpis = (j) => (j.s === j.n ? j.s : `${j.s} · ${j.n}`);

function ListaJednostek({id, etykieta, wartosc, wymiary, pokazCzeste, onChange}) {
  return (
    <select
      id={id}
      className={styles.lista}
      aria-label={etykieta}
      value={wartosc}
      onChange={(e) => onChange(e.target.value)}
    >
      {pokazCzeste && (
        <optgroup label={UI.grupaCzeste}>
          {CZESTE.map((k) => {
            const j = znajdz(k);
            return (
              <option key={`c-${k}`} value={k}>
                {podpis(j)}
              </option>
            );
          })}
        </optgroup>
      )}
      {wymiary.map((w) => (
        <optgroup key={w.id} label={w.nazwa}>
          {w.jednostki.map((j) => (
            <option key={`${w.id}|${j.s}`} value={`${w.id}|${j.s}`}>
              {podpis(j)}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}

function KartaDefinicji({klucz}) {
  const j = znajdz(klucz);
  const d = DEFINICJE[klucz];
  return (
    <div className={styles.def}>
      <h3 className={styles.defTytul}>
        {j.s} <small>{j.n}</small>
      </h3>
      {d ? (
        <>
          <p>{d.d}</p>
          <p className={styles.gdzie}>{d.g}</p>
        </>
      ) : (
        <p className={styles.brakDef}>{UI.brakDefinicji}</p>
      )}
    </div>
  );
}

/**
 * Przelicznik jednostek.
 *
 * `wymiarStaly` przypina narzedzie do jednego wymiaru: tak dziala na stronach
 * wymiarow, gdzie filtry sa zbedne, bo strona i tak jest o cisnieniu.
 */
export default function Przelicznik({wymiarStaly = null, odStart, naStart, wartoscStart = '1'}) {
  const wymiarDomyslny = wymiarStaly ? WYMIARY.find((w) => w.id === wymiarStaly) : null;
  const domyslneOd = odStart || (wymiarDomyslny ? `${wymiarStaly}|${wymiarDomyslny.jednostki[0].s}` : 'cisnienie|bar');
  const domyslneNa = naStart || (wymiarDomyslny ? `${wymiarStaly}|${wymiarDomyslny.jednostki[1].s}` : 'cisnienie|psi');

  // Pole trzyma to, co uzytkownik wpisal, a nie liczbe. Inaczej skasowanie
  // zawartosci zamienia sie w zero i w polu zostaje samotne 0.
  const [wpisane, setWpisane] = useState(wartoscStart);
  const [od, setOd] = useState(domyslneOd);
  const [na, setNa] = useState(domyslneNa);
  const [filtr, setFiltr] = useState(wymiarStaly || '');
  const [rozwiniete, setRozwiniete] = useState(false);
  const [roznica, setRoznica] = useState(false);

  const jOd = znajdz(od);
  const jNa = znajdz(na);
  const zgodne = jOd.wymiar === jNa.wymiar;
  const wartosc = parsuj(wpisane);
  const czyTemperatura = jOd.wymiar === 'temperatura';
  const licz = roznica && czyTemperatura ? przeliczRoznice : przelicz;

  const wymiary = useMemo(() => (filtr ? WYMIARY.filter((w) => w.id === filtr) : WYMIARY), [filtr]);

  const wynik = zgodne && wartosc !== null ? formatuj(licz(wartosc, od, na)) : '';
  const relacja = zgodne ? formatuj(licz(1, od, na)) : '';

  const komorki = useMemo(
    () => (zgodne && wartosc !== null ? rozsypka(wartosc, od).map((p) => ({
      ...p,
      tekst: roznica && czyTemperatura ? formatuj(przeliczRoznice(wartosc, od, p.klucz)) : formatuj(p.wartosc),
    })) : []),
    [zgodne, wartosc, od, roznica, czyTemperatura]
  );

  // Po zmianie filtra zachowujemy wybor, a jesli wypadl z listy, ustawiamy
  // dwie rozne jednostki, zeby nie wyszlo „1 kgf = 1 kgf".
  function zmienFiltr(nowy) {
    setFiltr(nowy);
    const dostepne = nowy ? WYMIARY.filter((w) => w.id === nowy) : WYMIARY;
    const jest = (k) => dostepne.some((w) => w.jednostki.some((j) => `${w.id}|${j.s}` === k));
    if (jest(od) && jest(na) && od !== na) return;
    const w = dostepne.find((x) => x.jednostki.length > 1) || dostepne[0];
    setOd(`${w.id}|${w.jednostki[0].s}`);
    setNa(`${w.id}|${w.jednostki[Math.min(1, w.jednostki.length - 1)].s}`);
  }

  function zamien() {
    setOd(na);
    setNa(od);
  }

  const widoczneFiltry = rozwiniete ? WYMIARY.map((w) => w.id) : FILTRY_GLOWNE;

  return (
    <div className={styles.tool}>
      {!wymiarStaly && (
        <div className={styles.filtry} role="group" aria-label={UI.filtryOpis}>
          <button type="button" className={styles.f} aria-pressed={filtr === ''} onClick={() => zmienFiltr('')}>
            {UI.wszystko}
          </button>
          {widoczneFiltry.map((id) => {
            const w = WYMIARY.find((x) => x.id === id);
            return (
              <button
                key={id}
                type="button"
                className={styles.f}
                aria-pressed={filtr === id}
                onClick={() => zmienFiltr(id)}
              >
                {SKROTY[id] || w.nazwa}
              </button>
            );
          })}
          {!rozwiniete && (
            <button
              type="button"
              className={`${styles.f} ${styles.wiecej}`}
              onClick={() => setRozwiniete(true)}
            >
              {UI.pozostale} {WYMIARY.length - FILTRY_GLOWNE.length}
            </button>
          )}
        </div>
      )}

      <div className={styles.para}>
        <div className={styles.blok}>
          <label className={styles.etykieta} htmlFor="pj-wartosc">{UI.przeliczam}</label>
          <input
            id="pj-wartosc"
            className={styles.wpis}
            inputMode="decimal"
            autoComplete="off"
            value={wpisane}
            onChange={(e) => setWpisane(e.target.value)}
          />
          <ListaJednostek
            id="pj-od"
            etykieta={UI.przeliczam}
            wartosc={od}
            wymiary={wymiary}
            pokazCzeste={!filtr}
            onChange={setOd}
          />
        </div>

        <button type="button" className={styles.zamien} onClick={zamien} title={UI.zamien} aria-label={UI.zamien}>
          ⇅
        </button>

        <div className={styles.blok}>
          <span className={styles.etykieta}>{UI.na}</span>
          <output className={`${styles.wpis} ${styles.wynikowe}`} htmlFor="pj-wartosc pj-od pj-do">
            {wynik}
          </output>
          <ListaJednostek
            id="pj-do"
            etykieta={UI.na}
            wartosc={na}
            wymiary={wymiary}
            pokazCzeste={!filtr}
            onChange={setNa}
          />
        </div>
      </div>

      {czyTemperatura && (
        // Roznica temperatur to inna operacja niz temperatura. Bez tego przelacznika
        // ludzie licza „o ile stopni sie nagrzalo" i dostaja wynik o 32 za duzy.
        <div className={styles.tryb}>
          <button type="button" className={styles.trybBtn} aria-pressed={!roznica} onClick={() => setRoznica(false)}>
            {UI.trybWartosc}
          </button>
          <button type="button" className={styles.trybBtn} aria-pressed={roznica} onClick={() => setRoznica(true)}>
            {UI.trybRoznica}
          </button>
        </div>
      )}

      <p className={styles.relacja}>
        {zgodne ? (
          <>
            1 {jOd.s} = <b>{relacja}</b> {jNa.s}
            <span className={styles.info}>{UI.zaokraglenie}</span>
          </>
        ) : (
          <span className={styles.blad}>{UI.rozneWymiary}</span>
        )}
      </p>

      {komorki.length > 0 && (
        <div className={styles.sekcja}>
          <h2 className={styles.sekcjaTytul}>
            {formatuj(wartosc)} {jOd.s} {UI.rozsypkaTytul} {jOd.wymiarNazwa.toLowerCase()}
          </h2>
          <div className={styles.rozsypka}>
            {komorki.map((p) => {
              const klasy = [styles.kom];
              if (p.klucz === od) klasy.push(styles.wybrana);
              else if (p.klucz === na) klasy.push(styles.docelowa);
              return (
                <div key={p.klucz} className={klasy.join(' ')} title={p.nazwa}>
                  <i>{p.tekst}</i>
                  <u>{p.symbol}</u>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Na stronie wymiaru definicje wszystkich jednostek sa nizej, wiec
          w samym narzedziu bylyby drugim takim samym naglowkiem. Notka
          o cisnieniu zostaje, bo dotyczy wyboru z listy, a nie jednostki. */}
      {!wymiarStaly && (
        <div className={styles.sekcja}>
          <h2 className={styles.sekcjaTytul}>{UI.definicjeTytul}</h2>
          <KartaDefinicji klucz={od} />
          {zgodne && od !== na && <KartaDefinicji klucz={na} />}
        </div>
      )}

      {/* Cisnienie i naprezenie maja ten sam wymiar fizyczny, wiec siedza
          w jednej liscie. Roznica jest realna, ale nie dotyczy przeliczania. */}
      {jOd.wymiar === 'cisnienie' && (
        <div className={styles.uwaga}>
          <b>{UI.notaCisnienieTytul}</b> {UI.notaCisnienie}
        </div>
      )}
    </div>
  );
}
