import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  BladPierscienia,
  dobierzPierscien,
  wymiaryRowka,
  luzOsiowy,
  listaSrednic,
} = require("./oblicz.js");

test("dobor pierscienia na walek 20 mm", () => {
  const wynik = dobierzPierscien({ typ: "walek", srednica: 20 });

  assert.equal(wynik.trafienie, true);
  assert.equal(wynik.oznaczenie, "DIN 471 - 20x1,2");
  assert.equal(wynik.rowek.d2, 19);
  assert.equal(wynik.rowek.m, 1.3);
  assert.equal(wynik.rowek.n, 1.5);
  assert.equal(wynik.rowek.glebokosc, 0.5);
});

test("dobor pierscienia do otworu 20 mm", () => {
  const wynik = dobierzPierscien({ typ: "otwor", srednica: 20 });

  assert.equal(wynik.trafienie, true);
  assert.equal(wynik.oznaczenie, "DIN 472 - 20x1");
  assert.equal(wynik.rowek.d2, 21);
  assert.equal(wynik.rowek.m, 1.1);
  assert.equal(wynik.rowek.glebokosc, 0.5);
});

const klasyD2 = [
  ["walek", 8, "h10"],
  ["walek", 20, "h11"],
  ["walek", 40, "h12"],
  ["otwor", 20, "H11"],
  ["otwor", 40, "H12"],
];

for (const [typ, srednica, klasa] of klasyD2) {
  test(`klasa d2 ${typ} ${srednica} mm`, () => {
    assert.equal(wymiaryRowka({ typ, srednica }).d2Klasa, klasa);
  });
}

test("brak trafienia zwraca sasiadow bez interpolacji", () => {
  const wynik = dobierzPierscien({ typ: "walek", srednica: 23 });

  assert.equal(wynik.trafienie, false);
  assert.deepEqual(wynik.najblizsze.map((rekord) => rekord.d1), [22, 24]);
});

const przypadkiBledow = [
  ["srednica ponizej tabeli", () => dobierzPierscien({ typ: "walek", srednica: 2 })],
  ["srednica powyzej tabeli", () => dobierzPierscien({ typ: "walek", srednica: 500 })],
  ["srednica zero", () => dobierzPierscien({ typ: "walek", srednica: 0 })],
  ["srednica tekstowa", () => dobierzPierscien({ typ: "walek", srednica: "20" })],
  ["nieznany typ", () => dobierzPierscien({ typ: "x", srednica: 20 })],
];

for (const [nazwa, fn] of przypadkiBledow) {
  test(`blad wejscia: ${nazwa}`, () => {
    assert.throws(fn, (error) => error instanceof BladPierscienia);
  });
}

test("luz osiowy dla pierscienia na walek 20 mm", () => {
  const luz = luzOsiowy({ typ: "walek", srednica: 20 });

  assert.equal(luz.nominalny, 0.1);
  assert.ok(luz.maksymalny > luz.nominalny);
  assert.equal(luz.zalozenie, "grubosc s w wymiarze nominalnym");
});

test("d2Max dla walka jest rowne wymiarowi nominalnemu w klasie h", () => {
  const rowek = wymiaryRowka({ typ: "walek", srednica: 20 });

  assert.equal(rowek.d2Max, rowek.d2);
});

// Przebieg po wszystkich srednicach z obu tablic. Wylapuje niespojnosci,
// ktorych pojedyncze przypadki nie pokazuja: odwrocone wymiary graniczne,
// ujemna glebokosc rowka albo luz maksymalny mniejszy od nominalnego.
for (const typ of ["walek", "otwor"]) {
  test(`kazda srednica w tablicy ${typ} daje spojny wynik`, () => {
    for (const srednica of listaSrednic(typ)) {
      const w = dobierzPierscien({ typ, srednica });
      assert.equal(w.trafienie, true, `brak trafienia dla ${srednica}`);

      const r = w.rowek;
      assert.ok(r.d2Min <= r.d2 && r.d2 <= r.d2Max, `d2 poza granicami dla ${srednica}`);
      assert.ok(r.mMin <= r.m && r.m <= r.mMax, `m poza granicami dla ${srednica}`);
      assert.ok(r.glebokosc > 0, `glebokosc niedodatnia dla ${srednica}`);
      assert.ok(
        w.luzOsiowy.maksymalny > w.luzOsiowy.nominalny,
        `luz maksymalny nie wiekszy od nominalnego dla ${srednica}`
      );
      assert.equal(w.luzOsiowy.zalozenie, "grubosc s w wymiarze nominalnym");

      // Rowek na walku jest wymiarem zewnetrznym w klasie h, wiec nie moze
      // wyjsc ponad wymiar nominalny. W otworze jest odwrotnie.
      if (typ === "walek") {
        assert.equal(r.d2Max, r.d2, `d2Max rozne od nominalu dla ${srednica}`);
      } else {
        assert.equal(r.d2Min, r.d2, `d2Min rozne od nominalu dla ${srednica}`);
      }
    }
  });
}
