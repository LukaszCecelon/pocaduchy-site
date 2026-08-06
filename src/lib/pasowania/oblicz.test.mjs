import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { BladPasowania, policzPasowanie, znajdzPasowania, odchylkiOtworu, odchylkiWalka } = require("./oblicz.js");

const sredniceKontrolne = [3, 6, 10, 14, 18, 24, 30, 40, 50, 65, 80, 100, 120, 140, 160, 180, 200, 225, 250, 280, 315, 355, 400, 450, 500];

function pasowanie(srednica, symbol) {
  const [otworRaw, walekRaw] = symbol.split("/");
  const otworMatch = otworRaw.match(/^([A-Z]+)(\d+)$/);
  const walekMatch = walekRaw.match(/^([a-z]+)(\d+)$/);
  return policzPasowanie({
    srednica,
    otwor: { litera: otworMatch[1], klasa: Number(otworMatch[2]) },
    walek: { litera: walekMatch[1], klasa: Number(walekMatch[2]) },
  });
}

function assertPasowanie(wynik, expected) {
  assert.equal(wynik.otwor.EI.um, expected.EI, `${wynik.symbol}: EI`);
  assert.equal(wynik.otwor.ES.um, expected.ES, `${wynik.symbol}: ES`);
  assert.equal(wynik.walek.ei.um, expected.ei, `${wynik.symbol}: ei`);
  assert.equal(wynik.walek.es.um, expected.es, `${wynik.symbol}: es`);
  assert.equal(wynik.luzMinimalny.um, expected.luzMin, `${wynik.symbol}: luz min`);
  assert.equal(wynik.luzMaksymalny.um, expected.luzMax, `${wynik.symbol}: luz max`);
  assert.equal(wynik.rodzaj, expected.rodzaj, `${wynik.symbol}: rodzaj`);
}

// Wartosci referencyjne sprawdzone poza tabela robocza RoyMech:
// ISO 286-2:2010 Table 1 i tabele limitow, probka iTeh Standards; dla
// popularnych par dodatkowo Xometry/MachiningDoctor/Simply Bearings.
const przypadkiReferencyjne = [
  [1, "H7/c8", { EI: 0, ES: 10, ei: -74, es: -60, luzMin: 60, luzMax: 84, rodzaj: "luzne" }],
  [3, "H7/h6", { EI: 0, ES: 10, ei: -6, es: 0, luzMin: 0, luzMax: 16, rodzaj: "luzne" }],
  [5, "H7/g6", { EI: 0, ES: 12, ei: -12, es: -4, luzMin: 4, luzMax: 24, rodzaj: "luzne" }],
  [8, "H7/f7", { EI: 0, ES: 15, ei: -28, es: -13, luzMin: 13, luzMax: 43, rodzaj: "luzne" }],
  [12, "H8/e8", { EI: 0, ES: 27, ei: -59, es: -32, luzMin: 32, luzMax: 86, rodzaj: "luzne" }],
  [20, "H7/g6", { EI: 0, ES: 21, ei: -20, es: -7, luzMin: 7, luzMax: 41, rodzaj: "luzne" }],
  [25, "H7/h6", { EI: 0, ES: 21, ei: -13, es: 0, luzMin: 0, luzMax: 34, rodzaj: "luzne" }],
  [30, "H7/p6", { EI: 0, ES: 21, ei: 22, es: 35, luzMin: -35, luzMax: -1, rodzaj: "ciasne" }],
  [40, "H7/p6", { EI: 0, ES: 25, ei: 26, es: 42, luzMin: -42, luzMax: -1, rodzaj: "ciasne" }],
  [50, "H7/k6", { EI: 0, ES: 25, ei: 2, es: 18, luzMin: -18, luzMax: 23, rodzaj: "mieszane" }],
  [63, "H8/f7", { EI: 0, ES: 46, ei: -60, es: -30, luzMin: 30, luzMax: 106, rodzaj: "luzne" }],
  [75, "H7/s6", { EI: 0, ES: 30, ei: 59, es: 78, luzMin: -78, luzMax: -29, rodzaj: "ciasne" }],
  [90, "H7/r6", { EI: 0, ES: 35, ei: 51, es: 73, luzMin: -73, luzMax: -16, rodzaj: "ciasne" }],
  [110, "H8/u8", { EI: 0, ES: 54, ei: 144, es: 198, luzMin: -198, luzMax: -90, rodzaj: "ciasne" }],
  [150, "H7/n6", { EI: 0, ES: 40, ei: 27, es: 52, luzMin: -52, luzMax: 13, rodzaj: "mieszane" }],
  [200, "H7/m6", { EI: 0, ES: 46, ei: 17, es: 46, luzMin: -46, luzMax: 29, rodzaj: "mieszane" }],
  [260, "H7/x8", { EI: 0, ES: 52, ei: 475, es: 556, luzMin: -556, luzMax: -423, rodzaj: "ciasne" }],
  [320, "H8/z8", { EI: 0, ES: 89, ei: 900, es: 989, luzMin: -989, luzMax: -811, rodzaj: "ciasne" }],
  [420, "H7/g6", { EI: 0, ES: 63, ei: -60, es: -20, luzMin: 20, luzMax: 123, rodzaj: "luzne" }],
  [500, "H8/e8", { EI: 0, ES: 97, ei: -232, es: -135, luzMin: 135, luzMax: 329, rodzaj: "luzne" }],
  [20, "G7/h6", { EI: 7, ES: 28, ei: -13, es: 0, luzMin: 7, luzMax: 41, rodzaj: "luzne" }],
  [40, "P7/h6", { EI: -42, ES: -17, ei: -16, es: 0, luzMin: -42, luzMax: -1, rodzaj: "ciasne" }],
  [50, "K7/h6", { EI: -18, ES: 7, ei: -16, es: 0, luzMin: -18, luzMax: 23, rodzaj: "mieszane" }],
  [150, "N7/h6", { EI: -52, ES: -12, ei: -25, es: 0, luzMin: -52, luzMax: 13, rodzaj: "mieszane" }],
  [75, "JS7/js6", { EI: -15, ES: 15, ei: -9.5, es: 9.5, luzMin: -24.5, luzMax: 24.5, rodzaj: "mieszane" }],
];

for (const [srednica, symbol, expected] of przypadkiReferencyjne) {
  test(`wartosc referencyjna ${srednica} ${symbol}`, () => {
    assertPasowanie(pasowanie(srednica, symbol), expected);
  });
}

const granice = [
  [30, "H7/p6", { it: [18, 30], odchylki: [24, 30], luzMin: -35, luzMax: -1 }],
  [30.0001, "H7/p6", { it: [30, 50], odchylki: [30, 40], luzMin: -42, luzMax: -1 }],
  [50, "H7/k6", { it: [30, 50], odchylki: [40, 50], luzMin: -18, luzMax: 23 }],
  [50.0001, "H7/k6", { it: [50, 80], odchylki: [50, 65], luzMin: -21, luzMax: 28 }],
  [80, "H7/s6", { it: [50, 80], odchylki: [65, 80], luzMin: -78, luzMax: -29 }],
  [80.0001, "H7/s6", { it: [80, 120], odchylki: [80, 100], luzMin: -93, luzMax: -36 }],
  [120, "H7/g6", { it: [80, 120], odchylki: [100, 120], luzMin: 12, luzMax: 69 }],
  [120.0001, "H7/g6", { it: [120, 180], odchylki: [120, 140], luzMin: 14, luzMax: 79 }],
];

for (const [srednica, symbol, expected] of granice) {
  test(`granica przedzialu ${srednica} ${symbol}`, () => {
    const wynik = pasowanie(srednica, symbol);
    assert.deepEqual([wynik.przedzialy.it.ponad, wynik.przedzialy.it.do], expected.it);
    assert.deepEqual([wynik.przedzialy.odchylkiWalka.ponad, wynik.przedzialy.odchylkiWalka.do], expected.odchylki);
    assert.equal(wynik.luzMinimalny.um, expected.luzMin);
    assert.equal(wynik.luzMaksymalny.um, expected.luzMax);
  });
}

const parySymetrii = [
  [20, "H7/g6", "G7/h6"],
  [40, "H7/p6", "P7/h6"],
  [50, "H7/k6", "K7/h6"],
  [150, "H7/n6", "N7/h6"],
  [63, "H8/f7", "F8/h7"],
  [110, "H8/u8", "U8/h8"],
];

for (const [srednica, stalyOtwor, stalyWalek] of parySymetrii) {
  test(`symetria zasad ${srednica} ${stalyOtwor} ~= ${stalyWalek}`, () => {
    const a = pasowanie(srednica, stalyOtwor);
    const b = pasowanie(srednica, stalyWalek);
    assert.ok(Math.abs(a.luzMinimalny.um - b.luzMinimalny.um) <= 1);
    assert.ok(Math.abs(a.luzMaksymalny.um - b.luzMaksymalny.um) <= 1);
  });
}

const symetryczne = [
  [5, "js", 5],
  [20, "js", 6],
  [75, "js", 7],
  [260, "js", 8],
  [5, "JS", 5],
  [20, "JS", 6],
  [75, "JS", 7],
  [260, "JS", 8],
];

for (const [srednica, litera, klasa] of symetryczne) {
  test(`pole symetryczne ${srednica} ${litera}${klasa}`, () => {
    const wynik = litera === "js"
      ? odchylkiWalka({ srednica, litera, klasa })
      : odchylkiOtworu({ srednica, litera, klasa });
    const gorna = litera === "js" ? wynik.es : wynik.ES;
    const dolna = litera === "js" ? wynik.ei : wynik.EI;
    assert.equal(gorna, -dolna);
  });
}

const odchylkiJ = [
  ["j5", 5, [-2, -2, -2, -3, -3, -4, -4, -5, -5, -7, -7, -9, -9, -11, -11, -11, -13, -13, -13, -16, -16, -18, -18, -20, -20]],
  ["j6", 6, [-2, -2, -2, -3, -3, -4, -4, -5, -5, -7, -7, -9, -9, -11, -11, -11, -13, -13, -13, -16, -16, -18, -18, -20, -20]],
  ["j7", 7, [-4, -4, -5, -6, -6, -8, -8, -10, -10, -12, -12, -15, -15, -18, -18, -18, -21, -21, -21, -26, -26, -28, -28, -32, -32]],
];

for (const [symbol, klasa, eiTablicowe] of odchylkiJ) {
  test(`tablicowe odchylki walka ${symbol}`, () => {
    for (const [index, srednica] of sredniceKontrolne.entries()) {
      const wynik = odchylkiWalka({ srednica, litera: "j", klasa });
      assert.equal(wynik.ei, eiTablicowe[index], `${symbol} ${srednica} mm: ei`);
      assert.equal(wynik.es, eiTablicowe[index] + wynik.tolerancja, `${symbol} ${srednica} mm: es`);
    }
  });
}

const otworyDeltaDo3 = [
  ["M6", 6, { ES: -2, EI: -8 }],
  ["N6", 6, { ES: -4, EI: -10 }],
  ["P6", 6, { ES: -6, EI: -12 }],
  ["M7", 7, { ES: -2, EI: -12 }],
  ["N7", 7, { ES: -4, EI: -14 }],
  ["R7", 7, { ES: -10, EI: -20 }],
  ["S7", 7, { ES: -14, EI: -24 }],
];

for (const [symbol, klasa, expected] of otworyDeltaDo3) {
  test(`delta zero do 3 mm dla ${symbol}`, () => {
    const wynik = odchylkiOtworu({ srednica: 3, litera: symbol[0], klasa });
    assert.equal(wynik.ES, expected.ES);
    assert.equal(wynik.EI, expected.EI);
  });
}

test("wyjatek ISO 286 dla otworu M6 w przedziale 250-315 mm", () => {
  for (const srednica of [280, 315]) {
    const wynik = odchylkiOtworu({ srednica, litera: "M", klasa: 6 });
    assert.equal(wynik.ES, -9, `M6 ${srednica} mm: ES`);
    assert.equal(wynik.EI, -41, `M6 ${srednica} mm: EI`);
  }
});

test("tablicowe pole walka a11 i pasowanie H11/a11", () => {
  const poczatek = odchylkiWalka({ srednica: 3, litera: "a", klasa: 11 });
  assert.equal(poczatek.es, -270);
  assert.equal(poczatek.ei, -330);

  const koniec = odchylkiWalka({ srednica: 500, litera: "a", klasa: 11 });
  assert.equal(koniec.es, -1650);
  assert.equal(koniec.ei, -2050);

  assertPasowanie(pasowanie(3, "H11/a11"), { EI: 0, ES: 60, ei: -330, es: -270, luzMin: 270, luzMax: 390, rodzaj: "luzne" });
});

test("tablicowe pole otworu A11 i pasowanie A11/h11", () => {
  const poczatek = odchylkiOtworu({ srednica: 3, litera: "A", klasa: 11 });
  assert.equal(poczatek.ES, 330);
  assert.equal(poczatek.EI, 270);

  const srodek = odchylkiOtworu({ srednica: 180, litera: "A", klasa: 11 });
  assert.equal(srodek.ES, 820);
  assert.equal(srodek.EI, 580);

  const koniec = odchylkiOtworu({ srednica: 500, litera: "A", klasa: 11 });
  assert.equal(koniec.ES, 2050);
  assert.equal(koniec.EI, 1650);

  assertPasowanie(pasowanie(3, "A11/h11"), { EI: 270, ES: 330, ei: -60, es: 0, luzMin: 270, luzMax: 390, rodzaj: "luzne" });
});

test("otwor J9 jest symetryczny jak JS9", () => {
  for (const [srednica, expected] of [[3, 12.5], [100, 43.5], [315, 65], [500, 77.5]]) {
    const wynik = odchylkiOtworu({ srednica, litera: "J", klasa: 9 });
    assert.equal(wynik.ES, expected, `J9 ${srednica} mm: ES`);
    assert.equal(wynik.EI, -expected, `J9 ${srednica} mm: EI`);
  }
});

test("tablicowa koncowka otworu J6", () => {
  for (const [srednica, expected] of [[280, { ES: 25, EI: -7 }], [315, { ES: 25, EI: -7 }], [400, { ES: 29, EI: -7 }], [500, { ES: 33, EI: -7 }]]) {
    const wynik = odchylkiOtworu({ srednica, litera: "J", klasa: 6 });
    assert.equal(wynik.ES, expected.ES, `J6 ${srednica} mm: ES`);
    assert.equal(wynik.EI, expected.EI, `J6 ${srednica} mm: EI`);
  }
});

const przypadkiBledow = [
  ["srednica zero", () => pasowanie(0, "H7/h6"), "SREDNICA_POZA_ZAKRESEM"],
  ["srednica ujemna", () => pasowanie(-1, "H7/h6"), "SREDNICA_POZA_ZAKRESEM"],
  ["srednica powyzej 500", () => pasowanie(500.0001, "H7/h6"), "SREDNICA_POZA_ZAKRESEM"],
  ["srednica NaN", () => policzPasowanie({ srednica: Number.NaN, otwor: { litera: "H", klasa: 7 }, walek: { litera: "h", klasa: 6 } }), "NIEPRAWIDLOWA_SREDNICA"],
  ["nieznany otwor", () => policzPasowanie({ srednica: 20, otwor: { litera: "Q", klasa: 7 }, walek: { litera: "h", klasa: 6 } }), "NIEZNANA_LITERA"],
  ["nieznany walek", () => policzPasowanie({ srednica: 20, otwor: { litera: "H", klasa: 7 }, walek: { litera: "q", klasa: 6 } }), "NIEZNANA_LITERA"],
  ["klasa za niska", () => policzPasowanie({ srednica: 20, otwor: { litera: "H", klasa: 3 }, walek: { litera: "h", klasa: 6 } }), "NIEZNANA_KLASA"],
  ["klasa za wysoka", () => policzPasowanie({ srednica: 20, otwor: { litera: "H", klasa: 7 }, walek: { litera: "h", klasa: 13 } }), "NIEZNANA_KLASA"],
  ["brak tablicy t dla malej srednicy", () => policzPasowanie({ srednica: 10, otwor: { litera: "H", klasa: 7 }, walek: { litera: "t", klasa: 6 } }), "BRAK_DANYCH"],
];

for (const [nazwa, fn, code] of przypadkiBledow) {
  test(`jawny blad: ${nazwa}`, () => {
    assert.throws(fn, (error) => error instanceof BladPasowania && error.code === code);
  });
}

const odwrotne = [
  { srednica: 20, luzMin: 7, luzMax: 41, zasada: "stalegoOtworu" },
  { srednica: 40, luzMin: -42, luzMax: -1, zasada: "stalegoOtworu" },
  { srednica: 20, luzMin: 7, luzMax: 41, zasada: "stalegoWalka" },
  { srednica: 40, luzMin: -42, luzMax: -1, zasada: "stalegoWalka" },
  { srednica: 75, luzMin: -90, luzMax: -20, zasada: "stalegoOtworu" },
  { srednica: 150, luzMin: -55, luzMax: 15, zasada: "stalegoWalka" },
];

for (const args of odwrotne) {
  test(`funkcja odwrotna spojna ${args.srednica} ${args.zasada}`, () => {
    const wyniki = znajdzPasowania(args);
    assert.ok(wyniki.length > 0);
    assert.ok(wyniki.length <= 12);
    const mieszczace = wyniki.filter((wynik) => wynik.miesciSie);
    assert.ok(mieszczace.length > 0);
    for (const wynik of mieszczace) {
      const kontrola = pasowanie(args.srednica, wynik.symbol);
      assert.equal(kontrola.luzMinimalny.um, wynik.luzMinimalny.um);
      assert.equal(kontrola.luzMaksymalny.um, wynik.luzMaksymalny.um);
      assert.ok(kontrola.luzMinimalny.um >= args.luzMin);
      assert.ok(kontrola.luzMaksymalny.um <= args.luzMax);
    }
  });
}

const uprzywilejowane = [
  [{ srednica: 20, luzMin: 7, luzMax: 41, zasada: "stalegoOtworu" }, "H7/g6"],
  [{ srednica: 40, luzMin: -42, luzMax: -1, zasada: "stalegoOtworu" }, "H7/p6"],
  [{ srednica: 20, luzMin: 7, luzMax: 41, zasada: "stalegoWalka" }, "G7/h6"],
  [{ srednica: 40, luzMin: -42, luzMax: -1, zasada: "stalegoWalka" }, "P7/h6"],
];

for (const [args, symbol] of uprzywilejowane) {
  test(`oznaczenie pasowania uprzywilejowanego ${symbol}`, () => {
    const wynik = znajdzPasowania(args).find((item) => item.symbol === symbol);
    assert.ok(wynik);
    assert.equal(wynik.uprzywilejowane, true);
  });
}
