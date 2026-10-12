const dane = require("./dane.json");
const szereg = require("./szereg.json");
const pasowania = require("../pasowania/oblicz.js");

// Wszystkie wymiary w mm, wyniki procentowe w %. Zaokraglenia robi widok,
// nie silnik, zeby testy porownywaly prawdziwe liczby.

function tolerancjaD2(d2) {
  const przedzial = dane.tolerancjaD2.przedzialy.find(([od, do_]) => d2 > od && d2 <= do_);
  return przedzial ? przedzial[2] : null;
}

// Tolerancja srednicy wewnetrznej d1 wedlug ISO 3601-1 klasa B, wzorem
// podanym przez Trelleborga (tab. 28 to ten sam wzor rozpisany na przedzialy):
// +-[(d1^0,95 x 0,009) + 0,11]. Zaokraglenie do 0,01 jak w tablicy katalogu.
// Wzor dotyczy wymiarow metrycznych.
function tolerancjaD1(d1) {
  if (!(d1 > 0)) return null;
  return Math.round((Math.pow(d1, 0.95) * 0.009 + 0.11) * 100) / 100;
}

// Scisk liczony od przekroju O-ringa: (d2 - t) / d2. Bez rozciagniecia,
// bez pecznienia, dla nominalnych wymiarow.
function sciskProc(d2, t) {
  return ((d2 - t) / d2) * 100;
}

// Spadek przekroju d2 po rozciagnieciu srednicy wewnetrznej o S %,
// wzor Trelleborga (dwa zakresy). Zwraca R w %. Granica jak w artykule:
// ponizej 3% wzor dolny, od 3% gorny (na samej granicy roznia sie o 0,001).
// Bez rozciagniecia zwraca 0, choc dolny wzor dalby 0,01.
function spadekPrzekroju(rozciagnieciePro) {
  const s = rozciagnieciePro;
  if (s <= 0) return 0;
  if (s < 3) return 0.01 + 1.06 * s - 0.1 * s * s;
  if (s <= 25) return 0.56 + 0.59 * s - 0.0046 * s * s;
  return null;
}

// Rozciagniecie O-ringa o srednicy wewnetrznej d1 na dnie rowka o srednicy d3.
function rozciagnieciePro(d1, d3) {
  return (d3 / d1 - 1) * 100;
}

// Scisk graniczny w gniezdzie z tolerancjami. tMin/tMax to skrajne
// glebokosci gniazda z tolerancji srednic, spadek to R w %. Osobny spadek
// dla kazdej granicy, bo najglebsze gniazdo (najmniejsze dno rowka) daje
// tez najmniejsze rozciagniecie. Brak danych (przekroj poza tablica
// tolerancji, rozciagniecie ponad 25%) zwraca null, a nie zero.
function sciskGraniczny({ d2, tMin, tMax, spadek = 0, spadekMin = spadek, spadekMax = spadek }) {
  const tol = tolerancjaD2(d2);
  if (tol == null || spadekMin == null || spadekMax == null) return null;
  const d2Min = (d2 - tol) * (1 - spadekMin / 100);
  const d2Max = (d2 + tol) * (1 - spadekMax / 100);
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

// Fazowanie wejsciowe z jednego zrodla (Trelleborg tab. 15).
function fazowanie(d2) {
  return dane.fazowanie.wiersze.find((w) => w.d2Do == null || d2 <= w.d2Do);
}

function fazowaniePrzyjete() {
  return dane.fazowanie.wiersze.map((w) => ({ d2Do: w.d2Do, z15: w.z15, z20: w.z20 }));
}

// ---------------------------------------------------------------------------
// Kalkulator gniazda

const UKLADY = ["tlok", "tloczysko", "czolowy"];
const G = dane.gniazdo;
const ZAKRES_SCISKU = {
  stat: dane.scisk.T.promieniowyStat,
  dyn: dane.scisk.T.promieniowyDyn,
  osiowy: dane.scisk.T.osiowyStat,
};

const zaokr = (x, krok) => Math.round(x / krok) * krok;
// Liczby z mnozenia i odejmowania niosa ogon w 15. miejscu. Wymiary
// nominalne obcinamy do tysiecznych, zanim pojda do tolerancji.
const mm = (x) => Math.round(x * 1000) / 1000;

// Wymiar z polem tolerancji ISO 286, np. ("H8", 40). Odchylki w mm.
function wymiarISO(nom, symbol) {
  const litera = symbol.replace(/\d+$/, "");
  const klasa = Number(symbol.slice(litera.length));
  const otwor = litera !== litera.toLowerCase();
  const o = otwor
    ? pasowania.odchylkiOtworu({ srednica: nom, litera, klasa })
    : pasowania.odchylkiWalka({ srednica: nom, litera, klasa });
  const gora = (otwor ? o.ES : o.es) / 1000;
  const dol = (otwor ? o.EI : o.ei) / 1000;
  return { nom, klasa: symbol, gora, dol, min: mm(nom + dol), max: mm(nom + gora) };
}

function wymiarPlus(nom, plus) {
  return { nom, gora: plus, dol: 0, min: nom, max: mm(nom + plus) };
}

// Najmniejsza i najwieksza wartosc funkcji na naroznikach przedzialow.
// Zmienne zmieniaja sie o setne, wiec funkcja jest w praktyce liniowa
// i skrajnosci leza w naroznikach. Brak danych w ktorymkolwiek naroznku
// (rozciagniecie ponad 25%) daje null.
function skrajne(zmienne, f) {
  const klucze = Object.keys(zmienne);
  let min = Infinity;
  let max = -Infinity;
  for (let m = 0; m < 1 << klucze.length; m++) {
    const x = {};
    klucze.forEach((k, i) => (x[k] = zmienne[k][(m >> i) & 1]));
    const v = f(x);
    if (v == null || !Number.isFinite(v)) return null;
    if (v < min) min = v;
    if (v > max) max = v;
  }
  return { min, max };
}

// Przekroj po rozciagnieciu srednicy wewnetrznej d1 do srednicy d. Gdy O-ring
// nie jest rozciagniety (d <= d1), przekroj zostaje nominalny.
function przekrojNa(d2, d1, d) {
  const R = spadekPrzekroju(rozciagnieciePro(d1, d));
  return R == null ? null : d2 * (1 - R / 100);
}

const scisk = (d2e, t) => (d2e == null ? null : sciskProc(d2e, t));

function kolumnaSzczeliny(d2) {
  if (d2 <= 2) return 0;
  if (d2 <= 3) return 1;
  if (d2 <= 5) return 2;
  if (d2 <= 7) return 3;
  return 4;
}

function ocenaCisnienia({ cisnienieMPa, twardosc, d2, d1, ruch, szczelinaMax, szczelinaPrzesunieta }) {
  if (!(cisnienieMPa > 0)) return null;
  const tablica = dane.szczelina[String(twardosc)];
  if (!tablica) return null;
  const wiersz = tablica.find((w) => w.mpa >= cisnienieMPa);
  const PO = G.pierscienOporowy;
  // Dla d1 = 50 zrodlo milczy, przyjmujemy ostrozniejsza granice.
  const granica = ruch === "dyn" ? PO.dyn : d1 >= 50 ? PO.statD1Ponad50 : PO.statD1Do50;
  const wynik = {
    cisnienieMPa,
    twardosc,
    wierszMPa: wiersz ? wiersz.mpa : null,
    dopuszczalna: wiersz ? wiersz.s[kolumnaSzczeliny(d2)] : null,
    granicaBezPierscienia: granica,
    pierscienOporowy: cisnienieMPa > granica,
  };
  if (wynik.dopuszczalna != null && szczelinaMax != null) {
    wynik.przekroczona = szczelinaMax > wynik.dopuszczalna;
    wynik.przekroczonaPrzesunieta = szczelinaPrzesunieta > wynik.dopuszczalna;
  }
  return wynik;
}

// O-ringi z szeregu o tym samym przekroju i d1 w zalecanym zakresie, najpierw
// najblizsze srodka zakresu. Gdy w zakresie nie ma zadnego, zwraca trzy
// najblizsze spoza zakresu z flaga.
function podpowiedzOringi(d2, zakres) {
  const srodek = (zakres.min + zakres.max) / 2;
  const kandydaci = [
    ...szereg.as568.filter((w) => w[2] === d2).map(([nr, d1]) => ({ d1, d2, as568: nr })),
    ...szereg.metryczne.filter((w) => w[1] === d2).map(([d1]) => ({ d1, d2, as568: null })),
  ];
  const w = kandydaci.filter((k) => k.d1 >= zakres.min - 1e-9 && k.d1 <= zakres.max + 1e-9);
  if (w.length) {
    return w.sort((a, b) => Math.abs(a.d1 - srodek) - Math.abs(b.d1 - srodek)).slice(0, 5).map((k) => ({ ...k, wZakresie: true }));
  }
  const odl = (k) => (k.d1 < zakres.min ? zakres.min - k.d1 : k.d1 - zakres.max);
  return kandydaci.sort((a, b) => odl(a) - odl(b)).slice(0, 3).map((k) => ({ ...k, wZakresie: false }));
}

function blad(kod, szczegoly) {
  return { ok: false, blad: kod, ...szczegoly };
}

// Gniazdo pod O-ring z tolerancjami. Wejscie:
//   uklad: "tlok" (rowek na tloku albo czopie, srednica = otwor DN),
//          "tloczysko" (rowek w otworze, srednica = tloczysko dN),
//          "czolowy" (srednica = d7 przy cisnieniu od srodka, d8 z zewnatrz)
//   ruch: "stat" | "dyn" (rowek czolowy zawsze statyczny)
//   d2: przekroj; w trybie katalogowym jeden z wierszy tablicy Trelleborga
//   scisk: % (podany wlacza tryb wlasnego scisku, dowolny d2 0,8-10 mm)
//   pasowanie: "H8/f7" itd. (tylko rowki promieniowe)
//   cisnienie: "wewn" | "zewn" (tylko rowek czolowy)
//   d1: srednica wewnetrzna O-ringa; bez niej kalkulator bierze pierwsza podpowiedz
//   cisnienieMPa, twardosc: 70 | 90 (opcjonalnie, do szczeliny i pierscienia oporowego)
function gniazdo(we) {
  const uklad = we.uklad;
  if (!UKLADY.includes(uklad)) return blad("NIEZNANY_UKLAD");
  const czolowy = uklad === "czolowy";
  const ruch = czolowy ? "stat" : we.ruch === "dyn" ? "dyn" : "stat";
  const srednica = Number(we.srednica);
  const d2 = Number(we.d2);
  if (!(srednica > 0)) return blad("BRAK_SREDNICY");
  if (!(d2 > 0)) return blad("BRAK_PRZEKROJU");
  const wlasny = we.scisk != null && we.scisk !== "";

  // 1. Przekroj gniazda: glebokosc, szerokosc, promien dna.
  let t;
  let b;
  let r;
  let sciskZadany = null;
  if (wlasny) {
    const W = G.wlasnyScisk;
    sciskZadany = Number(we.scisk);
    if (!(d2 > W.d2[0] && d2 <= W.d2[1])) return blad("PRZEKROJ_POZA_ZAKRESEM");
    if (!(sciskZadany >= W.scisk[0] && sciskZadany <= W.scisk[1])) return blad("SCISK_POZA_ZAKRESEM");
    t = mm(zaokr(d2 * (1 - sciskZadany / 100), W.krokT));
    const bDokladne = (Math.PI * d2 * d2) / 4 / ((W.wypelnienie / 100) * t);
    b = mm(Math.ceil(bDokladne / W.krokB - 1e-9) * W.krokB);
    const najblizszy = dane.przekroje.wiersze.reduce((a, w) => (Math.abs(w.d2 - d2) < Math.abs(a.d2 - d2) ? w : a));
    r = najblizszy.r;
  } else {
    const wiersz = dane.przekroje.wiersze.find((w) => w.d2 === d2);
    if (!wiersz) return blad("BRAK_PRZEKROJU");
    t = ruch === "dyn" ? wiersz.tDyn : wiersz.tStat;
    if (t == null) return blad("BRAK_DYNAMICZNEGO");
    b = czolowy ? wiersz.b4 : wiersz.b1;
    r = wiersz.r;
  }
  const tolD2 = tolerancjaD2(d2);
  if (tolD2 == null) return blad("BRAK_TOLERANCJI_D2");
  const D2 = [d2 - tolD2, d2 + tolD2];

  const wynik = {
    ok: true,
    uklad,
    ruch,
    tryb: wlasny ? "wlasny" : "katalog",
    sciskZadany,
    d2,
    tolD2,
    t,
    szerokosc: wymiarPlus(b, czolowy ? G.tolB4 : G.tolB1),
    r,
    uwagi: [],
  };
  const uwaga = (kod) => wynik.uwagi.push(kod);

  // 2. Srednice, glebokosc z tolerancji i zalecany zakres d1.
  const resztaMaterialu = uklad === "tlok" ? srednica - 2 * t : czolowy && we.cisnienie !== "zewn" ? srednica - 2 * b : srednica;
  if (!(resztaMaterialu > 0)) return blad("SREDNICA_ZA_MALA");

  let srednice;
  let glebokosc;
  let zakresD1;
  try {
    if (uklad === "tlok") {
      const [otw, czop] = (we.pasowanie || G.pasowanieDomyslne).split("/");
      const otwor = wymiarISO(srednica, otw);
      srednice = { otwor, czop: wymiarISO(srednica, czop), dno: wymiarISO(mm(srednica - 2 * t), G.dnoTlok) };
      glebokosc = { min: (otwor.min - srednice.dno.max) / 2, max: (otwor.max - srednice.dno.min) / 2 };
      const [sMin, sMax] = G.dobor.tlok[ruch];
      zakresD1 = { min: srednice.dno.nom / (1 + sMax / 100), max: srednice.dno.nom / (1 + sMin / 100) };
    } else if (uklad === "tloczysko") {
      const [otw, wal] = (we.pasowanie || G.pasowanieDomyslne).split("/");
      const walek = wymiarISO(srednica, wal);
      srednice = { walek, otwor: wymiarISO(srednica, otw), dno: wymiarISO(mm(srednica + 2 * t), G.dnoTloczysko) };
      glebokosc = { min: (srednice.dno.min - walek.max) / 2, max: (srednice.dno.max - walek.min) / 2 };
      const d6 = srednice.dno.nom;
      const maks = d6 - 2 * d2 > 250 ? G.dobor.tloczysko.maksPowyzej250 : G.dobor.tloczysko.maks;
      zakresD1 = { min: d6 - 2 * d2, max: d6 * (1 + maks / 100) - 2 * d2 };
    } else {
      const zewn = we.cisnienie === "zewn";
      if (zewn) {
        const d8 = wymiarISO(srednica, G.czolowyZewn);
        srednice = { d8, d7: { nom: mm(srednica + 2 * b) } };
        const [kMin, kMax] = G.dobor.czolowyZewn;
        zakresD1 = { min: srednica * (1 - kMax / 100), max: srednica * (1 - kMin / 100) };
      } else {
        const d7 = wymiarISO(srednica, G.czolowyWewn);
        srednice = { d7, d8: { nom: mm(srednica - 2 * b) } };
        const [cMin, cMax] = G.dobor.czolowyWewn;
        zakresD1 = { min: srednica * (1 + cMin / 100) - 2 * d2, max: srednica * (1 + cMax / 100) - 2 * d2 };
      }
      wynik.cisnienie = zewn ? "zewn" : "wewn";
      glebokosc = { min: t, max: mm(t + G.tolH) };
    }
  } catch (e) {
    if (e && e.name === "BladPasowania") return blad("SREDNICA_POZA_ZAKRESEM", { szczegoly: e.code });
    throw e;
  }
  if (!(zakresD1.max > 0)) return blad("SREDNICA_ZA_MALA");
  if (zakresD1.min < 0) zakresD1.min = 0;
  wynik.srednice = srednice;
  wynik.glebokosc = glebokosc;
  wynik.zakresD1 = zakresD1;

  // 3. O-ring: podany albo pierwszy z podpowiedzi.
  const propozycje = podpowiedzOringi(d2, zakresD1);
  wynik.propozycje = propozycje;
  let d1 = Number(we.d1);
  let oring;
  if (d1 > 0) {
    const zSzeregu = propozycje.find((p) => Math.abs(p.d1 - d1) < 1e-9);
    oring = { d1, d2, as568: zSzeregu ? zSzeregu.as568 : null, wpisany: true };
  } else if (propozycje.length) {
    oring = { ...propozycje[0], wpisany: false };
    d1 = oring.d1;
  } else {
    return blad("BRAK_ORINGA", wynik);
  }
  const tolD1 = tolerancjaD1(d1);
  oring.tolD1 = tolD1;
  oring.wZakresie = d1 >= zakresD1.min - 1e-9 && d1 <= zakresD1.max + 1e-9;
  wynik.oring = oring;
  if (!oring.wpisany && !propozycje.some((p) => p.wZakresie)) uwaga("BRAK_W_SZEREGU");
  const D1 = [d1 - tolD1, d1 + tolD1];

  // 4. Dopasowanie srednicy O-ringa, scisk z lancuchem tolerancji, wypelnienie.
  const sd = srednice;
  let d2Nom; // przekroj nominalnego O-ringa w gniezdzie, po rozciagnieciu
  let sciskZakres;
  let sciskPrzesuniety = null;
  if (uklad === "tlok") {
    const D3 = [sd.dno.min, sd.dno.max];
    wynik.dopasowanie = {
      rodzaj: "rozciagniecie",
      nom: rozciagnieciePro(d1, sd.dno.nom),
      min: rozciagnieciePro(D1[1], sd.dno.min),
      max: rozciagnieciePro(D1[0], sd.dno.max),
      zakres: G.dobor.tlok[ruch],
    };
    d2Nom = przekrojNa(d2, d1, sd.dno.nom);
    const DN = [sd.otwor.min, sd.otwor.max];
    sciskZakres = skrajne({ DN, d3: D3, d1: D1, d2: D2 }, (x) => scisk(przekrojNa(x.d2, x.d1, x.d3), (x.DN - x.d3) / 2));
    // Tlok przesuniety w otworze o caly luz: po drugiej stronie gniazdo
    // poglebia sie o mimosrod.
    const DC = [sd.czop.min, sd.czop.max];
    const p = skrajne({ DN, dc: DC, d3: D3, d1: D1, d2: D2 }, (x) => scisk(przekrojNa(x.d2, x.d1, x.d3), (2 * x.DN - x.dc - x.d3) / 2));
    sciskPrzesuniety = p && p.min;

  } else if (uklad === "tloczysko") {
    const D6 = [sd.dno.min, sd.dno.max];
    const D5 = [sd.walek.min, sd.walek.max];
    const maks = d1 > 250 ? G.dobor.tloczysko.maksPowyzej250 : G.dobor.tloczysko.maks;
    wynik.dopasowanie = {
      rodzaj: "sciskObwodowy",
      nom: ((d1 + 2 * d2) / sd.dno.nom - 1) * 100,
      min: ((D1[0] + 2 * D2[0]) / sd.dno.max - 1) * 100,
      max: ((D1[1] + 2 * D2[1]) / sd.dno.min - 1) * 100,
      zakres: [0, maks],
    };
    // Na tloczysku O-ring moze byc lekko rozciagniety (T: S = (d5 - d1) / d1).
    wynik.rozciagniecie = { nom: rozciagnieciePro(d1, srednica), max: rozciagnieciePro(D1[0], sd.walek.max) };
    d2Nom = przekrojNa(d2, d1, srednica);
    sciskZakres = skrajne({ d6: D6, d5: D5, d1: D1, d2: D2 }, (x) => scisk(przekrojNa(x.d2, x.d1, x.d5), (x.d6 - x.d5) / 2));
    const DH = [sd.otwor.min, sd.otwor.max];
    const p = skrajne({ d6: D6, d5: D5, dh: DH, d1: D1, d2: D2 }, (x) => scisk(przekrojNa(x.d2, x.d1, x.d5), (x.d6 + x.dh) / 2 - x.d5));
    sciskPrzesuniety = p && p.min;

  } else if (wynik.cisnienie === "zewn") {
    const D8 = [sd.d8.min, sd.d8.max];
    wynik.dopasowanie = {
      rodzaj: "mniejszaOdD8",
      nom: (1 - d1 / sd.d8.nom) * 100,
      min: (1 - D1[1] / D8[0]) * 100,
      max: (1 - D1[0] / D8[1]) * 100,
      zakres: G.dobor.czolowyZewn,
    };
    wynik.rozciagniecie = { nom: rozciagnieciePro(d1, sd.d8.nom), max: rozciagnieciePro(D1[0], sd.d8.max) };
    d2Nom = przekrojNa(d2, d1, sd.d8.nom);
    const H = [glebokosc.min, glebokosc.max];
    sciskZakres = skrajne({ h: H, d8: D8, d1: D1, d2: D2 }, (x) => scisk(przekrojNa(x.d2, x.d1, x.d8), x.h));

  } else {
    const D7 = [sd.d7.min, sd.d7.max];
    wynik.dopasowanie = {
      rodzaj: "wiekszaOdD7",
      nom: ((d1 + 2 * d2) / sd.d7.nom - 1) * 100,
      min: ((D1[0] + 2 * D2[0]) / D7[1] - 1) * 100,
      max: ((D1[1] + 2 * D2[1]) / D7[0] - 1) * 100,
      zakres: G.dobor.czolowyWewn,
    };
    d2Nom = d2;
    const H = [glebokosc.min, glebokosc.max];
    sciskZakres = skrajne({ h: H, d2: D2 }, (x) => scisk(x.d2, x.h));
  }
  const dop = wynik.dopasowanie;
  if (dop.nom < dop.zakres[0] - 1e-9 || dop.nom > dop.zakres[1] + 1e-9) uwaga("DOPASOWANIE_POZA");
  if (d2Nom == null || sciskZakres == null) {
    uwaga("ROZCIAGNIECIE_PONAD_25");
    wynik.scisk = null;
    return wynik;
  }
  if (!czolowy && d1 < G.dobor.maleD1) uwaga("MALE_D1");

  const zakresScisku = czolowy ? ZAKRES_SCISKU.osiowy : ZAKRES_SCISKU[ruch];
  wynik.scisk = {
    nom: sciskProc(d2Nom, t),
    nomBezRozciagniecia: sciskProc(d2, t),
    min: sciskZakres.min,
    max: sciskZakres.max,
    przesuniety: sciskPrzesuniety,
    zakres: zakresScisku,
  };
  if (sciskZakres.min < zakresScisku[0]) uwaga("SCISK_MIN_ZA_MALY");
  if (sciskZakres.max > zakresScisku[1]) uwaga("SCISK_MAX_ZA_DUZY");
  if (sciskPrzesuniety != null && sciskPrzesuniety < zakresScisku[0] && sciskZakres.min >= zakresScisku[0]) {
    uwaga("SCISK_PRZESUNIETY_ZA_MALY");
  }

  wynik.wypelnienie = {
    nom: wypelnienieProc(d2Nom, b, t),
    bezRozciagniecia: wypelnienieProc(d2, b, t),
    maks: dane.scisk.wypelnienieMax,
  };
  if (wynik.wypelnienie.nom > wynik.wypelnienie.maks) uwaga("WYPELNIENIE_PONAD");

  // 5. Szczelina (tylko rowki promieniowe) i cisnienie.
  if (!czolowy) {
    const [wewn, zewn] = uklad === "tlok" ? [sd.czop, sd.otwor] : [sd.walek, sd.otwor];
    const luz = { min: zewn.min - wewn.max, max: zewn.max - wewn.min };
    wynik.szczelina = { min: luz.min / 2, max: luz.max / 2, przesunieta: luz.max };
  }
  const twardosc = Number(we.twardosc) === 90 ? 90 : 70;
  const cis = ocenaCisnienia({
    cisnienieMPa: Number(we.cisnienieMPa),
    twardosc,
    d2,
    d1,
    ruch,
    szczelinaMax: wynik.szczelina ? wynik.szczelina.max : null,
    szczelinaPrzesunieta: wynik.szczelina ? wynik.szczelina.przesunieta : null,
  });
  wynik.cisnienieOcena = cis;
  if (cis) {
    if (cis.dopuszczalna == null) uwaga("POZA_TABLICA_SZCZELIN");
    if (cis.pierscienOporowy) uwaga("PIERSCIEN_OPOROWY");
    if (cis.przekroczona) uwaga("SZCZELINA_PRZEKROCZONA");
    else if (cis.przekroczonaPrzesunieta) uwaga("SZCZELINA_PRZESUNIETA");
  }

  // 6. Wykonczenie: fazowanie wejsciowe i chropowatosc (Trelleborg).
  if (!czolowy) {
    const f = fazowanie(d2);
    wynik.fazowanie = { z15: f.z15, z20: f.z20, gdzie: uklad === "tlok" ? "otwor" : "walek" };
  }
  const ra = (nazwa) => dane.chropowatosc.wiersze.find((w) => w.powierzchnia === nazwa).T;
  wynik.chropowatosc = {
    wspolpracujaca: ra(ruch === "dyn" ? "Powierzchnia wspolpracujaca, dynamicznie" : "Powierzchnia wspolpracujaca, statycznie"),
    rowek: ra("Dno i boki rowka"),
    fazowanie: czolowy ? null : ra("Fazowanie wejsciowe"),
  };
  return wynik;
}

function przekrojeKatalogowe() {
  return dane.przekroje.wiersze.map((w) => ({ d2: w.d2, iso: w.iso || null, dyn: w.tDyn != null }));
}

module.exports = {
  dane,
  szereg,
  UKLADY,
  tolerancjaD2,
  tolerancjaD1,
  sciskProc,
  spadekPrzekroju,
  rozciagnieciePro,
  sciskGraniczny,
  wypelnienieProc,
  wierszePrzekrojow,
  fazowanie,
  fazowaniePrzyjete,
  gniazdo,
  podpowiedzOringi,
  przekrojeKatalogowe,
};
