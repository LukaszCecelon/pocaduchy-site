const dane = require("./dane.json");

// Wszystkie wymiary w mm, wyniki procentowe w %. Zaokraglenia robi widok,
// nie silnik, zeby testy porownywaly prawdziwe liczby.

function tolerancjaD2(d2) {
  const przedzial = dane.tolerancjaD2.przedzialy.find(([od, do_]) => d2 > od && d2 <= do_);
  return przedzial ? przedzial[2] : null;
}

// Scisk liczony od przekroju O-ringa: (d2 - t) / d2. Bez rozciagniecia,
// bez pecznienia, dla nominalnych wymiarow.
function sciskProc(d2, t) {
  return ((d2 - t) / d2) * 100;
}

// Spadek przekroju d2 po rozciagnieciu srednicy wewnetrznej o S %,
// wzor Trelleborga (dwa zakresy). Zwraca R w %.
function spadekPrzekroju(rozciagnieciePro) {
  const s = rozciagnieciePro;
  if (s <= 0) return 0;
  if (s <= 3) return 0.01 + 1.06 * s - 0.1 * s * s;
  if (s <= 25) return 0.56 + 0.59 * s - 0.0046 * s * s;
  return null;
}

// Rozciagniecie O-ringa o srednicy wewnetrznej d1 na dnie rowka o srednicy d3.
function rozciagnieciePro(d1, d3) {
  return (d3 / d1 - 1) * 100;
}

// Scisk graniczny w gniezdzie z tolerancjami. tMin/tMax to skrajne
// glebokosci gniazda z tolerancji srednic, spadek to R w %.
function sciskGraniczny({ d2, tMin, tMax, spadek = 0 }) {
  const tol = tolerancjaD2(d2);
  const k = 1 - spadek / 100;
  const d2Min = (d2 - tol) * k;
  const d2Max = (d2 + tol) * k;
  return {
    min: sciskProc(d2Min, tMax),
    max: sciskProc(d2Max, tMin),
  };
}

// Wypelnienie rowka: pole przekroju O-ringa do pola b x t.
function wypelnienieProc(d2, b, t) {
  return ((Math.PI * d2 * d2) / 4 / (b * t)) * 100;
}

function wierszePrzekrojow() {
  return dane.przekroje.wiersze.map((w) => ({
    ...w,
    h: w.tStat,
    sciskStat: sciskProc(w.d2, w.tStat),
    sciskDyn: w.tDyn == null ? null : sciskProc(w.d2, w.tDyn),
    tolD2: tolerancjaD2(w.d2),
  }));
}

function fazowaniePrzyjete() {
  return dane.fazowanie.wiersze.map((w) => ({
    d2Do: w.d2Do,
    z15: Math.max(w.T15, w.C15),
    z20: Math.max(w.T20, w.C20),
    rozne: w.T15 !== w.C15 || w.T20 !== w.C20,
  }));
}

module.exports = {
  dane,
  tolerancjaD2,
  sciskProc,
  spadekPrzekroju,
  rozciagnieciePro,
  sciskGraniczny,
  wypelnienieProc,
  wierszePrzekrojow,
  fazowaniePrzyjete,
};
