import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { GWINTY, DLUGOSC_GWINTU, dlugoscGwintu, czyJestSrubaSzesciokatna, znajdz } = require("./dane.js");

test("dlugosc gwintu DIN 931 idzie ze wzoru 2d + 6, 12 albo 25", () => {
  assert.equal(dlugoscGwintu(6, "do125"), 18);
  assert.equal(dlugoscGwintu(6, "do200"), 24);
  assert.equal(dlugoscGwintu(10, "do125"), 26);
  assert.equal(dlugoscGwintu(10, "powyzej200"), 45);
  assert.equal(dlugoscGwintu(20, "do125"), 46);
  assert.equal(dlugoscGwintu(36, "powyzej200"), 97);
  assert.equal(dlugoscGwintu(100, "powyzej200"), 225);
});

test("wariant nie istnieje, gdy gwint nie miesci sie w dlugosci sruby", () => {
  // M64 do 125 mm musialoby miec 134 mm gwintu, wiec takiej sruby nie ma.
  assert.equal(dlugoscGwintu(64, "do125"), null);
  assert.equal(dlugoscGwintu(100, "do125"), null);
  assert.equal(dlugoscGwintu(100, "do200"), null);
  // Granica wypada miedzy M56 a M60: 118 mm jeszcze sie miesci, 126 juz nie.
  assert.equal(dlugoscGwintu(56, "do125"), 118);
  assert.equal(dlugoscGwintu(60, "do125"), null);
});

test("nieznany przedzial to null, a nie wyjatek", () => {
  assert.equal(dlugoscGwintu(10, "cokolwiek"), null);
  assert.equal(dlugoscGwintu(11, "do125"), null);
});

test("srednice bez sruby szesciokatnej nie dostaja dlugosci gwintu", () => {
  // M1,2, M1,8, M2,2 i M9 to srednice drugiego wyboru: wzor by cos policzyl,
  // ale takiej sruby nikt nie robi, wiec w tabeli ma byc kreska.
  for (const d of [1, 1.2, 1.4, 1.8, 2.2, 9]) {
    assert.equal(czyJestSrubaSzesciokatna(znajdz(d)), false, `M${d} nie powinno miec sruby`);
    assert.equal(dlugoscGwintu(d, "do125"), null, `M${d} nie powinno miec dlugosci gwintu`);
  }
  // M1,6 juz tak, a 2d + 6 daje 9,2, ktore norma zapisuje jako 9.
  assert.equal(czyJestSrubaSzesciokatna(znajdz(1.6)), true);
  assert.equal(dlugoscGwintu(1.6, "do125"), 9);
});

test("tabela nie udaje, ze zna stany magazynowe", () => {
  // Probowalismy progu minimalnej srednicy i sie nie obronil: M8x250 obalilo
  // prog 10, M5x250 prog 8, a M3x150 prog 5. Zostaje sam wzor.
  assert.equal(dlugoscGwintu(3, "do200"), 18);
  assert.equal(dlugoscGwintu(4, "do200"), 20);
  assert.equal(dlugoscGwintu(5, "powyzej200"), 35);
  assert.equal(dlugoscGwintu(8, "powyzej200"), 41);
  assert.equal(dlugoscGwintu(10, "powyzej200"), 45);
});

test("kolejnosc wyboru wg ISO 261", () => {
  const licz = (n) => GWINTY.filter((g) => g.w === n).length;
  assert.equal(licz(1), 25);
  assert.equal(licz(2), 17);
  assert.equal(licz(3), 1);
  assert.equal(GWINTY.filter((g) => !g.w).length, 0);
  // Pozycje, przy ktorych najlatwiej o pomylke.
  assert.equal(znajdz(1.2).w, 1);
  assert.equal(znajdz(7).w, 2);
  assert.equal(znajdz(9).w, 3);
  assert.equal(znajdz(72).w, 1);
  assert.equal(znajdz(76).w, 2);
  assert.equal(znajdz(85).w, 2);
  assert.equal(znajdz(100).w, 1);
});

test("M85 nie jest sruba, mimo ze ma wymiar pod klucz", () => {
  // 120 mm to szerokosc szesciokata nakretki. ISO 4014 konczy sie na M64,
  // a DIN 931-2 obejmuje M68, M72, M76, M80, M90 i M100, ale nie M85.
  assert.equal(znajdz(85).k, 120);
  assert.equal(czyJestSrubaSzesciokatna(znajdz(85)), false);
  assert.equal(dlugoscGwintu(85, "powyzej200"), null);
  // Sasiedzi z DIN 931-2 srubami sa.
  for (const d of [68, 72, 76, 80, 90, 100]) {
    assert.equal(czyJestSrubaSzesciokatna(znajdz(d)), true, `M${d} powinno miec srube`);
  }
});

test("skok 6 mm powyzej M68 jest oznaczony jako drobny wg ISO 261", () => {
  for (const d of [72, 76, 80, 85, 90, 100]) {
    assert.match(znajdz(d).pUwaga || "", /drobny/, `brak zastrzezenia przy M${d}`);
  }
  // Do M68 wlacznie 6 mm jest skokiem zwyklym, wiec zastrzezenia byc nie moze.
  for (const d of [64, 68]) {
    assert.equal(znajdz(d).pUwaga, undefined, `zbedne zastrzezenie przy M${d}`);
  }
});

test("M14x1,25 oznaczone jako gwint do swiec zaplonowych", () => {
  const g = znajdz(14);
  assert.ok(g.pd.includes(1.25));
  assert.match(g.pdUwagi[1.25], /świec/);
  // Nigdzie indziej takiego zastrzezenia nie ma.
  const inne = GWINTY.filter((x) => x.d !== 14 && x.pdUwagi);
  assert.equal(inne.length, 0);
});

test("skoki zwykle zgodne z ISO 261", () => {
  const oczekiwane = {
    1: 0.25, 1.6: 0.35, 2: 0.4, 2.5: 0.45, 3: 0.5, 4: 0.7, 5: 0.8,
    6: 1, 8: 1.25, 10: 1.5, 12: 1.75, 16: 2, 20: 2.5, 24: 3, 30: 3.5,
    36: 4, 42: 4.5, 48: 5, 56: 5.5, 64: 6,
  };
  for (const [d, p] of Object.entries(oczekiwane)) {
    assert.equal(znajdz(Number(d)).p, p, `zly skok zwykly dla M${d}`);
  }
});

test("wymiary pod klucz zgodne z tym, co jest w szufladzie", () => {
  const oczekiwane = {
    3: 5.5, 4: 7, 5: 8, 6: 10, 8: 13, 10: 17, 12: 19, 14: 21,
    16: 24, 20: 30, 24: 36, 30: 46, 36: 55,
  };
  for (const [d, k] of Object.entries(oczekiwane)) {
    assert.equal(znajdz(Number(d)).k, k, `zly klucz dla M${d}`);
  }
});

test("rozbieznosci ISO kontra stary DIN sa opisane, a nie przemilczane", () => {
  for (const d of [10, 12, 14, 22]) {
    const g = znajdz(d);
    assert.ok(g.kUwaga && g.kUwaga.length > 0, `brak uwagi o kluczu przy M${d}`);
  }
  // Tam, gdzie normy sie zgadzaja, uwagi byc nie moze, bo mylilaby czytelnika.
  for (const d of [8, 16, 20, 24]) {
    assert.equal(znajdz(d).kUwaga, undefined, `zbedna uwaga przy M${d}`);
  }
});

test("dane sa spojne", () => {
  const srednice = new Set();
  let poprzednia = 0;
  for (const g of GWINTY) {
    assert.ok(!srednice.has(g.d), `duplikat srednicy M${g.d}`);
    srednice.add(g.d);
    assert.ok(g.d > poprzednia, `srednice musza rosnac, potkniecie na M${g.d}`);
    poprzednia = g.d;

    assert.ok(g.p > 0, `zly skok zwykly przy M${g.d}`);
    assert.ok(Array.isArray(g.pd) && g.pd.length > 0, `brak skokow drobnych przy M${g.d}`);

    // Drobnozwojny znaczy drobniejszy: kazdy skok z listy musi byc mniejszy
    // od zwyklego, a cala lista uporzadkowana od najgrubszego.
    for (const pd of g.pd) {
      assert.ok(pd < g.p, `skok drobnozwojny ${pd} nie jest drobniejszy od ${g.p} przy M${g.d}`);
    }
    const posortowane = [...g.pd].sort((a, b) => b - a);
    assert.deepEqual(g.pd, posortowane, `skoki drobne nieuporzadkowane przy M${g.d}`);

    if (g.k !== undefined) {
      assert.ok(g.k > g.d, `klucz ${g.k} nie moze byc mniejszy od srednicy M${g.d}`);
    }
  }
});

test("kazdy przedzial dlugosci ma opis i dodatek", () => {
  assert.equal(DLUGOSC_GWINTU.length, 3);
  for (const p of DLUGOSC_GWINTU) {
    assert.ok(p.id && p.opis && p.dodatek > 0);
  }
});
