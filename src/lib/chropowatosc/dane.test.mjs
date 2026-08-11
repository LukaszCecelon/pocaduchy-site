import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { GRUPY, PROCESY, procesyGrupy, pelnaNazwa, osiagaRa, metodyDlaRa } = require("./dane.js");

test("kazdy proces nalezy do istniejacej grupy", () => {
  const znane = new Set(GRUPY.map((g) => g.id));
  for (const p of PROCESY) {
    assert.ok(znane.has(p.grupa), `nieznana grupa ${p.grupa} przy ${pelnaNazwa(p)}`);
  }
  assert.equal(procesyGrupy("wstepne").length + procesyGrupy("bezubytkowa").length +
    procesyGrupy("ubytkowa").length, PROCESY.length);
});

test("zakresy sa uporzadkowane rosnaco", () => {
  for (const p of PROCESY) {
    for (const [nazwa, w] of [["Rz", p.rz], ["Ra", p.ra]]) {
      const kolejne = [w.min, w.od, w.do, w.max].filter((x) => x !== null);
      for (let i = 1; i < kolejne.length; i += 1) {
        assert.ok(
          kolejne[i] >= kolejne[i - 1],
          `${nazwa} przy ${pelnaNazwa(p)}: ${kolejne[i - 1]} przed ${kolejne[i]}`
        );
      }
    }
  }
});

test("wartosci sa dodatnie, a brak danych to null, nie zero", () => {
  for (const p of PROCESY) {
    for (const w of [p.rz, p.ra]) {
      for (const klucz of ["min", "od", "do", "max"]) {
        const v = w[klucz];
        assert.ok(v === null || v > 0, `${pelnaNazwa(p)}: ${klucz} = ${v}`);
      }
      // Spotykany zakres musi byc podany zawsze, bo to rdzen tablicy.
      assert.ok(w.od !== null && w.do !== null, `${pelnaNazwa(p)}: brak spotykanego zakresu`);
    }
  }
});

test("Rz jest grubsze od Ra dla tej samej metody", () => {
  // Nie jest to przelicznik, ale profil o tej samej fakturze zawsze ma Rz
  // wieksze od Ra. Wpis, gdzie Ra przebija Rz, jest bledem przepisania.
  for (const p of PROCESY) {
    assert.ok(p.rz.od > p.ra.od, `${pelnaNazwa(p)}: Rz od ${p.rz.od} nie jest wieksze od Ra od ${p.ra.od}`);
    assert.ok(p.rz.do > p.ra.do, `${pelnaNazwa(p)}: Rz do ${p.rz.do} nie jest wieksze od Ra do ${p.ra.do}`);
  }
});

test("dobor metody do wymaganego Ra", () => {
  // Ra 0,8 osiaga szlifowanie i gladzenie, ale nie odlewanie w piasku.
  const dla08 = metodyDlaRa(0.8).map(pelnaNazwa);
  assert.ok(dla08.includes("Szlifowanie"));
  assert.ok(dla08.includes("Gładzenie: o krótkim skoku"));
  assert.ok(!dla08.includes("Odlewanie: w formach piaskowych"));

  // Ra 0,05 to juz tylko obrobka wykanczajaca.
  const dla005 = metodyDlaRa(0.05).map(pelnaNazwa);
  assert.ok(dla005.includes("Docieranie"));
  assert.ok(!dla005.includes("Toczenie: wzdłużne"));
  assert.ok(dla005.length < dla08.length);
});

test("gdy metoda nie ma granicy min, bierzemy poczatek zakresu", () => {
  const spiekanie = PROCESY.find((p) => p.nazwa === "Spiekanie" && p.wariant === "normalne");
  assert.equal(spiekanie.ra.min, null);
  assert.equal(osiagaRa(spiekanie, 0.4), true);
  assert.equal(osiagaRa(spiekanie, 0.3), false);
});

test("watpliwe wartosci maja zastrzezenie, a nie zostaly po cichu poprawione", () => {
  const zUwaga = PROCESY.filter((p) => p.uwagi);
  assert.equal(zUwaga.length, 6);
  // Kazdy klucz uwagi musi wskazywac istniejaca kolumne.
  const dozwolone = new Set(["rz.min", "rz.zakres", "rz.max", "ra.min", "ra.zakres", "ra.max"]);
  for (const p of zUwaga) {
    for (const klucz of Object.keys(p.uwagi)) {
      assert.ok(dozwolone.has(klucz), `${pelnaNazwa(p)}: nieznany klucz uwagi ${klucz}`);
      assert.ok(p.uwagi[klucz].length > 20, `${pelnaNazwa(p)}: uwaga za krotka, zeby cos wyjasnic`);
    }
  }
  // Docieranie stracilo Ra max, bo 0,21 bylo falszywa precyzja.
  const docieranie = PROCESY.find((p) => p.nazwa === "Docieranie" && !p.wariant);
  assert.equal(docieranie.ra.max, null);
  assert.ok(docieranie.uwagi["ra.max"]);
});

test("nazwy metod sa unikalne", () => {
  const nazwy = PROCESY.map(pelnaNazwa);
  assert.equal(new Set(nazwy).size, nazwy.length);
});
