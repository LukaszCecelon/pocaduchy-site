import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  BladPrzelicznika,
  WYMIARY,
  PLASKA,
  przelicz,
  przeliczRoznice,
  formatuj,
  parsuj,
  rozsypka,
  tabelaWartosci,
  tabelaKrzyzowa,
  szukaj,
} = require("./oblicz.js");

const blisko = (a, b, tol = 1e-9) =>
  assert.ok(Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${a} != ${b}`);

test("wartosci dokladne z definicji", () => {
  assert.equal(przelicz(1, "dlugosc|cal", "dlugosc|mm"), 25.4);
  assert.equal(przelicz(1, "sila|kgf", "sila|N"), 9.80665);
  assert.equal(przelicz(1, "cisnienie|bar", "cisnienie|Pa"), 100000);
  assert.equal(przelicz(1, "masa|funt", "masa|kg"), 0.45359237);
});

test("cisnienie i naprezenie w jednym wymiarze", () => {
  // Ta rownosc jest powodem, dla ktorego wytrzymalosc liczy sie w MPa.
  blisko(przelicz(235, "cisnienie|MPa", "cisnienie|N/mm²"), 235);
  blisko(przelicz(1, "cisnienie|bar", "cisnienie|psi"), 14.503773773, 1e-8);
  blisko(przelicz(1, "cisnienie|MPa", "cisnienie|bar"), 10);
  blisko(przelicz(1, "cisnienie|ksi", "cisnienie|MPa"), 6.894757293, 1e-8);
});

test("moment obrotowy, klucz dynamometryczny z importu", () => {
  blisko(przelicz(50, "moment|lbf·ft", "moment|N·m"), 67.79089742, 1e-7);
  blisko(przelicz(1, "moment|lbf·ft", "moment|lbf·in"), 12);
  blisko(przelicz(1, "moment|kgf·m", "moment|N·m"), 9.80665);
});

test("temperatura: wartosc kontra roznica", () => {
  blisko(przelicz(0, "temperatura|°C", "temperatura|°F"), 32);
  blisko(przelicz(100, "temperatura|°C", "temperatura|°F"), 212);
  blisko(przelicz(0, "temperatura|°C", "temperatura|K"), 273.15);
  blisko(przelicz(-40, "temperatura|°C", "temperatura|°F"), -40);
  // Roznica 1 stopnia Celsjusza to 1,8 stopnia Fahrenheita, a nie 33,8.
  blisko(przeliczRoznice(1, "temperatura|°C", "temperatura|°F"), 1.8);
  blisko(przeliczRoznice(1, "temperatura|°C", "temperatura|K"), 1);
});

test("moc: KM to nie hp", () => {
  blisko(przelicz(1, "moc|KM", "moc|W"), 735.49875);
  blisko(przelicz(1, "moc|hp", "moc|W"), 745.6998715822702, 1e-9);
  blisko(przelicz(100, "moc|KM", "moc|kW"), 73.549875);
});

test("obroty i predkosc katowa", () => {
  blisko(przelicz(1, "obroty|obr/min", "obroty|rad/s"), (2 * Math.PI) / 60);
  blisko(przelicz(1500, "obroty|obr/min", "obroty|Hz"), 25);
});

test("przeliczenie tam i z powrotem wraca do punktu wyjscia", () => {
  for (const w of WYMIARY) {
    for (const j of w.jednostki) {
      const klucz = `${w.id}|${j.s}`;
      const bazowa = `${w.id}|${w.jednostki[0].s}`;
      const tam = przelicz(7.25, bazowa, klucz);
      blisko(przelicz(tam, klucz, bazowa), 7.25, 1e-9);
    }
  }
});

test("rozne wymiary to blad, nie liczba", () => {
  assert.throws(() => przelicz(1, "dlugosc|mm", "masa|kg"), BladPrzelicznika);
  assert.throws(() => przelicz(1, "dlugosc|nieistnieje", "dlugosc|mm"), BladPrzelicznika);
  assert.throws(() => przelicz(NaN, "dlugosc|mm", "dlugosc|cal"), BladPrzelicznika);
});

test("formatowanie po polsku", () => {
  assert.equal(formatuj(14.503773773), "14,5038");
  assert.equal(formatuj(100000), "100 000");
  assert.equal(formatuj(0), "0");
  assert.equal(formatuj(NaN), "");
  assert.equal(formatuj(1), "1");
});

test("parsowanie wpisanej wartosci", () => {
  assert.equal(parsuj("12,5"), 12.5);
  assert.equal(parsuj("1 000"), 1000);
  assert.equal(parsuj(""), null);
  assert.equal(parsuj("   "), null);
  assert.equal(parsuj("abc"), null);
});

test("rozsypka pokazuje caly wymiar", () => {
  const lista = rozsypka(5, "cisnienie|bar");
  assert.equal(lista.length, WYMIARY.find((w) => w.id === "cisnienie").jednostki.length);
  const psi = lista.find((p) => p.symbol === "psi");
  blisko(psi.wartosc, 72.51886887, 1e-7);
});

test("tabela wartosci i tabela krzyzowa", () => {
  const tab = tabelaWartosci("cisnienie|bar", "cisnienie|psi");
  assert.equal(tab.length, 13);
  assert.equal(tab[0].odTekst, "1");
  assert.equal(tab[0].naTekst, "14,5038");

  const krzyz = tabelaKrzyzowa("sila");
  assert.equal(krzyz.wiersze.length, krzyz.jednostki.length);
  krzyz.wiersze.forEach((wiersz, i) => assert.equal(wiersz.komorki[i].tekst, "1"));
});

test("wyszukiwarka lapie aliasy z polskiej dokumentacji", () => {
  assert.ok(szukaj("kG").some((j) => j.klucz === "sila|kgf"));
  assert.ok(szukaj("cal").some((j) => j.klucz === "dlugosc|cal"));
  assert.ok(szukaj("um").some((j) => j.klucz === "dlugosc|µm"));
  assert.equal(szukaj("").length, 0);
});

test("dane sa spojne: brak duplikatow, sensowne wspolczynniki", () => {
  const klucze = new Set();
  for (const j of PLASKA) {
    assert.ok(!klucze.has(j.klucz), `duplikat klucza ${j.klucz}`);
    klucze.add(j.klucz);
    assert.ok(Number.isFinite(j.w) && j.w > 0, `zly wspolczynnik przy ${j.klucz}`);
    assert.ok(typeof j.n === "string" && j.n.length > 0, `brak nazwy przy ${j.klucz}`);
    assert.ok(["m", "t", "i"].includes(j.g), `zla grupa przy ${j.klucz}`);
  }
  for (const w of WYMIARY) {
    const baza = w.jednostki.find((j) => j.s === w.baza);
    assert.ok(baza, `wymiar ${w.id} nie ma jednostki bazowej ${w.baza}`);
    assert.equal(baza.w, 1, `jednostka bazowa ${w.baza} musi miec wspolczynnik 1`);
  }
});
