/**
 * Silnik przelicznika jednostek.
 *
 * Zasada jest jedna: kazda jednostka ma wspolczynnik do jednostki bazowej swojego
 * wymiaru, wiec przeliczenie idzie zawsze przez baze. Przesuniecie ma znaczenie
 * tylko przy temperaturze, bo skale nie maja wspolnego zera.
 *
 * Modul jest CommonJS, tak jak silnik pierscieni, zeby dalo sie go uruchomic
 * bezposrednio w node przy testach i w skryptach budujacych.
 */

const {WYMIARY, GRUPY} = require('./dane.js');

class BladPrzelicznika extends Error {
  constructor(kod, komunikat) {
    super(komunikat);
    this.name = 'BladPrzelicznika';
    this.kod = kod;
  }
}

// Plaska lista wszystkich jednostek z doklejonym wymiarem. Budowana raz,
// bo strony wymiarow i komponent siegaja do niej wielokrotnie.
const PLASKA = [];
const INDEKS = new Map();

for (const wymiar of WYMIARY) {
  for (const jednostka of wymiar.jednostki) {
    const wpis = {
      ...jednostka,
      wymiar: wymiar.id,
      wymiarNazwa: wymiar.nazwa,
      klucz: `${wymiar.id}|${jednostka.s}`,
    };
    PLASKA.push(wpis);
    INDEKS.set(wpis.klucz, wpis);
  }
}

const INDEKS_WYMIAROW = new Map(WYMIARY.map((w) => [w.id, w]));

function wymiar(id) {
  const w = INDEKS_WYMIAROW.get(id);
  if (!w) throw new BladPrzelicznika('NIEZNANY_WYMIAR', `Nie ma wymiaru ${id}.`);
  return w;
}

function jednostka(klucz) {
  const j = INDEKS.get(klucz);
  if (!j) throw new BladPrzelicznika('NIEZNANA_JEDNOSTKA', `Nie ma jednostki ${klucz}.`);
  return j;
}

/**
 * Przeliczenie miedzy dwiema jednostkami tego samego wymiaru.
 * Kolejnosc dziala tak: wartosc na baze, baza na jednostke docelowa.
 */
function przelicz(wartosc, kluczOd, kluczNa) {
  const od = jednostka(kluczOd);
  const na = jednostka(kluczNa);
  if (od.wymiar !== na.wymiar) {
    throw new BladPrzelicznika(
      'ROZNE_WYMIARY',
      `${od.s} i ${na.s} sa z roznych wymiarow, nie ma czego przeliczac.`
    );
  }
  if (typeof wartosc !== 'number' || !Number.isFinite(wartosc)) {
    throw new BladPrzelicznika('ZLA_WARTOSC', 'Wartosc musi byc skonczona liczba.');
  }
  const wBazie = wartosc * od.w + (od.p || 0);
  return (wBazie - (na.p || 0)) / na.w;
}

/**
 * Roznica temperatur to inna operacja niz wartosc temperatury: przesuniecie skali
 * sie znosi, zostaje samo nachylenie. To najczestsza pomylka przy Fahrenheitach.
 */
function przeliczRoznice(wartosc, kluczOd, kluczNa) {
  const od = jednostka(kluczOd);
  const na = jednostka(kluczNa);
  if (od.wymiar !== na.wymiar) {
    throw new BladPrzelicznika('ROZNE_WYMIARY', `${od.s} i ${na.s} sa z roznych wymiarow.`);
  }
  return (wartosc * od.w) / na.w;
}

// Wykladnik zapisany indeksem gornym, zeby nie pisac w tekscie „10^-6".
const CYFRY_GORNE = {'-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴',
  5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹'};

function gornyIndeks(tekst) {
  return String(Number(tekst))
    .split('')
    .map((z) => CYFRY_GORNE[z] || z)
    .join('');
}

/**
 * Formatowanie po polsku: przecinek dziesietny, spacja jako separator tysiecy.
 * Bardzo duze i bardzo male liczby ida w notacji wykladniczej, bo inaczej
 * w komorce tabeli robi sie sznur zer.
 */
function formatuj(x, cyfry = 6) {
  if (x === null || x === undefined || !Number.isFinite(x)) return '';
  if (x === 0) return '0';
  const a = Math.abs(x);
  // Notacja wykladnicza dopiero na skraju. Przy przeliczeniu Pa na MPa wychodzi
  // 0,000001 i to jest liczba, ktora konstruktor czyta bez zastanowienia,
  // a „1 x 10 do minus szostej" juz nie.
  if (a >= 1e12 || a < 1e-9) {
    const [mantysa, wykladnik] = x.toExponential(4).split('e');
    return `${mantysa.replace('.', ',')} × 10${gornyIndeks(wykladnik)}`;
  }
  const zaokraglona = Number(x.toPrecision(cyfry));
  // String() dla malych liczb przechodzi na zapis wykladniczy juz przy 1e-7,
  // wiec miejsca po przecinku liczymy sami z rzedu wielkosci.
  const miejsca = Math.min(20, Math.max(0, cyfry - 1 - Math.floor(Math.log10(a))));
  // Zera z konca obcinamy tylko w czesci ulamkowej, inaczej 100 000 zrobiloby sie 1.
  const dziesietnie = miejsca
    ? zaokraglona.toFixed(miejsca).replace(/0+$/, '').replace(/\.$/, '')
    : String(zaokraglona);
  const [calosc, ulamek] = dziesietnie.split('.');
  // Spacja nielamiaca (U+00A0), zeby 100 000 nie rozjechalo sie na koncu wiersza.
  const zeSpacjami = calosc.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return ulamek ? `${zeSpacjami},${ulamek}` : zeSpacjami;
}

/** Parsowanie tego, co uzytkownik wpisal. Przecinek i spacje sa dozwolone. */
function parsuj(tekst) {
  if (typeof tekst !== 'string') return null;
  const czyste = tekst.replace(/\s/g, '').replace(',', '.');
  if (czyste === '') return null;
  const liczba = Number(czyste);
  return Number.isFinite(liczba) ? liczba : null;
}

/** Wszystkie jednostki wymiaru z wartoscia przeliczona z jednej jednostki zrodlowej. */
function rozsypka(wartosc, kluczOd) {
  const od = jednostka(kluczOd);
  return wymiar(od.wymiar).jednostki.map((j) => {
    const klucz = `${od.wymiar}|${j.s}`;
    return {klucz, symbol: j.s, nazwa: j.n, wartosc: przelicz(wartosc, kluczOd, klucz)};
  });
}

// Wartosci do tabel na stronach. Ten sam zestaw dla kazdej pary, zeby tabele
// dalo sie porownywac miedzy stronami.
const WARTOSCI_TABELI = [1, 2, 3, 5, 10, 15, 20, 25, 50, 100, 200, 500, 1000];

/** Tabela wartosci typowych dla pary jednostek. Liczona przy budowaniu strony. */
function tabelaWartosci(kluczOd, kluczNa, wartosci = WARTOSCI_TABELI) {
  return wartosci.map((v) => ({
    od: v,
    na: przelicz(v, kluczOd, kluczNa),
    odTekst: formatuj(v),
    naTekst: formatuj(przelicz(v, kluczOd, kluczNa)),
  }));
}

/**
 * Tabela krzyzowa wymiaru: ile jednej jednostki miesci sie w drugiej.
 * To jest tresc strony wymiaru, gotowa w HTML zanim ruszy JavaScript.
 */
function tabelaKrzyzowa(idWymiaru) {
  const w = wymiar(idWymiaru);
  const jednostki = w.jednostki.map((j) => ({symbol: j.s, nazwa: j.n, klucz: `${w.id}|${j.s}`}));
  const wiersze = jednostki.map((od) => ({
    ...od,
    komorki: jednostki.map((na) => ({
      symbol: na.symbol,
      wartosc: przelicz(1, od.klucz, na.klucz),
      tekst: od.klucz === na.klucz ? '1' : formatuj(przelicz(1, od.klucz, na.klucz)),
    })),
  }));
  return {jednostki, wiersze};
}

/** Wyszukiwanie po symbolu, nazwie i aliasach. Uzywane przez pole filtrowania listy. */
function szukaj(fraza, idWymiaru = null) {
  const igla = String(fraza || '').trim().toLowerCase();
  if (!igla) return [];
  return PLASKA.filter((j) => {
    if (idWymiaru && j.wymiar !== idWymiaru) return false;
    if (j.s.toLowerCase().includes(igla)) return true;
    if (j.n.toLowerCase().includes(igla)) return true;
    return (j.a || []).some((alias) => alias.toLowerCase().includes(igla));
  });
}

module.exports = {
  BladPrzelicznika,
  WYMIARY,
  GRUPY,
  PLASKA,
  WARTOSCI_TABELI,
  wymiar,
  jednostka,
  przelicz,
  przeliczRoznice,
  formatuj,
  parsuj,
  rozsypka,
  tabelaWartosci,
  tabelaKrzyzowa,
  szukaj,
};
