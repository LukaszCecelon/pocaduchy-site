import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  BladPasowania,
  policzPasowanie,
} = require("../src/lib/pasowania/oblicz.js");
// Wzor bierzemy z tego samego modulu, ktorego uzywa kalkulator. Wczesniej byl
// tu jego odpis, wiec kontrola mogla przejsc mimo rozjazdu z rysunkiem.
const {
  SREDNICA_PX,
  CEL_SZCZELINY_PX,
  MIN_PASMO_PX,
  szerokoscPasma,
} = require("../src/lib/pasowania/rysunek.js");
const {
  LITERY_OTWOROW,
  LITERY_WALKOW,
  PASOWANIA_UPRZYWILEJOWANE,
} = require("../src/lib/pasowania/dane.js");

const SREDNICE = Object.freeze([1, 3, 6, 10, 18, 20, 30, 50, 80, 120, 180, 250, 315, 400, 500]);
const KLASY = Object.freeze([4, 5, 6, 7, 8, 9, 10, 11, 12]);

const CY = 75;
const R_WALKA = SREDNICA_PX / 2;
const MIN_ROZNICA_UPRZYWILEJOWANYCH_PX = 0.3;
const EPS = 1e-9;

function rozbijSymbol(symbol) {
  const [otwor, walek] = symbol.split("/");
  const podziel = (wartosc) => {
    const match = wartosc.match(/^([A-Za-z]+)(\d+)$/);
    if (!match) {
      throw new Error(`Nieznany symbol pasowania: ${symbol}`);
    }
    return { litera: match[1], klasa: Number(match[2]) };
  };

  return { otwor: podziel(otwor), walek: podziel(walek) };
}

function doRekordu(wynik) {
  const luzUm = Math.max(wynik.luzMaksymalny.um, 0);
  const wciskUm = Math.max(-wynik.luzMinimalny.um, 0);
  const luzPx = szerokoscPasma(luzUm, wynik.srednica);
  const wciskPx = szerokoscPasma(wciskUm, wynik.srednica);

  return {
    symbol: wynik.symbol,
    srednica: wynik.srednica,
    rodzaj: wynik.rodzaj,
    luzUm,
    wciskUm,
    luzPx,
    wciskPx,
  };
}

function formatujLiczbe(wartosc) {
  return Number.isInteger(wartosc) ? String(wartosc) : wartosc.toFixed(4);
}

function opiszMonotonicznosc(typ, b, a) {
  const poleUm = typ === "luz" ? "luzUm" : "wciskUm";
  const polePx = typ === "luz" ? "luzPx" : "wciskPx";

  return `${typ}; fi ${a.srednica} mm; ${a.symbol} ${formatujLiczbe(a[poleUm])} um -> ${formatujLiczbe(a[polePx])} px; `
    + `${b.symbol} ${formatujLiczbe(b[poleUm])} um -> ${formatujLiczbe(b[polePx])} px`;
}

function sprawdzMonotonicznosc(rekordy, typ) {
  const poleUm = typ === "luz" ? "luzUm" : "wciskUm";
  const polePx = typ === "luz" ? "luzPx" : "wciskPx";
  const posortowane = [...rekordy].sort((a, b) => (
    a[poleUm] - b[poleUm]
    || a[polePx] - b[polePx]
    || a.symbol.localeCompare(b.symbol)
  ));
  const naruszenia = [];
  const poprzednie = [];
  let maxPx = -Infinity;

  for (const rekord of posortowane) {
    if (rekord[poleUm] > 0 && rekord[polePx] + EPS < maxPx) {
      for (const poprzedni of poprzednie) {
        if (rekord[poleUm] > poprzedni[poleUm] && rekord[polePx] + EPS < poprzedni[polePx]) {
          naruszenia.push(opiszMonotonicznosc(typ, poprzedni, rekord));
        }
      }
    }

    poprzednie.push(rekord);
    if (rekord[polePx] > maxPx) {
      maxPx = rekord[polePx];
    }
  }

  return naruszenia;
}

function sprawdzGeometrie(rekord) {
  const bledy = [];
  const pasma = [
    ["luz", rekord.luzUm, rekord.luzPx],
    ["wcisk", rekord.wciskUm, rekord.wciskPx],
  ];

  for (const [typ, um, px] of pasma) {
    if (um === 0 && px !== 0) {
      bledy.push(`${typ}; fi ${rekord.srednica} mm; ${rekord.symbol}; 0 um daje ${formatujLiczbe(px)} px`);
    }
    if (um > 0 && px + EPS < MIN_PASMO_PX) {
      bledy.push(`${typ}; fi ${rekord.srednica} mm; ${rekord.symbol}; ${formatujLiczbe(um)} um daje tylko ${formatujLiczbe(px)} px`);
    }
    if (px - EPS > CEL_SZCZELINY_PX) {
      bledy.push(`${typ}; fi ${rekord.srednica} mm; ${rekord.symbol}; pasmo ${formatujLiczbe(px)} px przekracza ${CEL_SZCZELINY_PX} px`);
    }
  }

  if (rekord.wciskPx - EPS > R_WALKA) {
    bledy.push(`wcisk; fi ${rekord.srednica} mm; ${rekord.symbol}; pasmo ${formatujLiczbe(rekord.wciskPx)} px przekracza promien walka ${R_WALKA} px`);
  }

  const yLuzGora = CY - R_WALKA - rekord.luzPx;
  const yLuzDol = CY + R_WALKA + rekord.luzPx;
  if (yLuzGora < -EPS || yLuzDol > 150 + EPS) {
    bledy.push(`luz; fi ${rekord.srednica} mm; ${rekord.symbol}; krawedzie ${formatujLiczbe(yLuzGora)} i ${formatujLiczbe(yLuzDol)} wychodza poza viewBox`);
  }

  return bledy;
}

function policzBezBledu(srednica, symbol) {
  const pasowanie = rozbijSymbol(symbol);

  try {
    return doRekordu(policzPasowanie({ srednica, ...pasowanie }));
  } catch (error) {
    if (error instanceof BladPasowania) {
      return null;
    }
    throw error;
  }
}

function sprawdzUprzywilejowane(srednica) {
  const symbole = new Set([
    ...PASOWANIA_UPRZYWILEJOWANE.stalyOtwor,
    ...PASOWANIA_UPRZYWILEJOWANE.stalyWalek,
  ]);
  const rekordy = [...symbole]
    .map((symbol) => policzBezBledu(srednica, symbol))
    .filter(Boolean)
    .sort((a, b) => a.luzUm - b.luzUm || a.symbol.localeCompare(b.symbol));
  const ostrzezenia = [];

  for (let i = 1; i < rekordy.length; i += 1) {
    const a = rekordy[i - 1];
    const b = rekordy[i];

    if (a.luzUm === b.luzUm) {
      continue;
    }

    const roznicaPx = Math.abs(b.luzPx - a.luzPx);
    if (roznicaPx + EPS < MIN_ROZNICA_UPRZYWILEJOWANYCH_PX) {
      ostrzezenia.push(
        `fi ${srednica} mm; ${a.symbol} ${formatujLiczbe(a.luzUm)} um -> ${formatujLiczbe(a.luzPx)} px; `
          + `${b.symbol} ${formatujLiczbe(b.luzUm)} um -> ${formatujLiczbe(b.luzPx)} px; roznica ${formatujLiczbe(roznicaPx)} px`,
      );
    }
  }

  return ostrzezenia;
}

const naruszeniaMonotonicznosci = [];
const bledyGeometrii = [];
const ostrzezeniaRozroznialnosci = [];
let sprawdzone = 0;
let pominiete = 0;

for (const srednica of SREDNICE) {
  const rekordySrednicy = [];

  for (const literaOtworu of LITERY_OTWOROW) {
    for (const klasaOtworu of KLASY) {
      for (const literaWalka of LITERY_WALKOW) {
        for (const klasaWalka of KLASY) {
          try {
            const wynik = policzPasowanie({
              srednica,
              otwor: { litera: literaOtworu, klasa: klasaOtworu },
              walek: { litera: literaWalka, klasa: klasaWalka },
            });
            const rekord = doRekordu(wynik);
            sprawdzone += 1;
            rekordySrednicy.push(rekord);
            bledyGeometrii.push(...sprawdzGeometrie(rekord));
          } catch (error) {
            if (error instanceof BladPasowania) {
              pominiete += 1;
              continue;
            }
            throw error;
          }
        }
      }
    }
  }

  naruszeniaMonotonicznosci.push(...sprawdzMonotonicznosc(rekordySrednicy, "luz"));
  naruszeniaMonotonicznosci.push(...sprawdzMonotonicznosc(rekordySrednicy, "wcisk"));
  ostrzezeniaRozroznialnosci.push(...sprawdzUprzywilejowane(srednica));
}

console.log(`Sprawdzone kombinacje: ${sprawdzone}`);
console.log(`Pominiete z braku danych: ${pominiete}`);
console.log(`Zlamania monotonicznosci: ${naruszeniaMonotonicznosci.length}`);
console.log(`Bledy geometrii i widocznosci: ${bledyGeometrii.length}`);
console.log(`Ostrzezenia rozroznialnosci: ${ostrzezeniaRozroznialnosci.length}`);

for (const naruszenie of naruszeniaMonotonicznosci) {
  console.log(`BLAD monotonicznosci: ${naruszenie}`);
}

for (const blad of bledyGeometrii) {
  console.log(`BLAD rysunku: ${blad}`);
}

for (const ostrzezenie of ostrzezeniaRozroznialnosci) {
  console.log(`OSTRZEZENIE rozroznialnosci: ${ostrzezenie}`);
}

if (naruszeniaMonotonicznosci.length > 0 || bledyGeometrii.length > 0) {
  console.log("Wynik: poprawka rysunku NIE dziala poprawnie.");
  process.exitCode = 1;
} else {
  console.log("Wynik: poprawka rysunku dziala poprawnie.");
}
