import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const dane = require("../src/lib/pierscienie/dane.json");
const {
  BladPierscienia,
  dobierzPierscien,
  wymiaryRowka,
  luzOsiowy,
} = require("../src/lib/pierscienie/oblicz.js");

const TYPY = Object.freeze(["walek", "otwor"]);
const POLA_OBOWIAZKOWE = Object.freeze(["d1", "s", "d3", "b", "d2", "m", "n"]);
const EPS = 1e-9;

function formatujRekord(typ, index, rekord) {
  return `${typ}[${index}] d1=${rekord.d1}`;
}

function dodajBlad(bledy, typ, index, rekord, regula, opis) {
  bledy.push(`${formatujRekord(typ, index, rekord)}; ${regula}: ${opis}`);
}

function wPrzedzialeTolerancji(typ, d1) {
  return dane.tolerancjeRowka[typ].d2.some(([od, do_]) => d1 >= od && d1 <= do_);
}

function szerokoscTolerancji(odchylki) {
  if (Object.prototype.hasOwnProperty.call(odchylki, "ES")) {
    return odchylki.ES - odchylki.EI;
  }
  return odchylki.es - odchylki.ei;
}

const bledy = [];
let sprawdzone = 0;

for (const typ of TYPY) {
  const rekordy = dane[typ];

  for (let index = 0; index < rekordy.length; index += 1) {
    const rekord = rekordy[index];
    const poprzedni = rekordy[index - 1];
    sprawdzone += 1;

    for (const pole of POLA_OBOWIAZKOWE) {
      if (!Object.prototype.hasOwnProperty.call(rekord, pole)) {
        dodajBlad(bledy, typ, index, rekord, "pola obowiazkowe", `brak pola ${pole}`);
      }
    }

    if (poprzedni) {
      if (rekord.d1 <= poprzedni.d1) {
        dodajBlad(bledy, typ, index, rekord, "monotonicznosc d1", `poprzednie d1=${poprzedni.d1}`);
      }
      if (rekord.d3 < poprzedni.d3) {
        dodajBlad(bledy, typ, index, rekord, "monotonicznosc d3", `poprzednie d3=${poprzedni.d3}`);
      }
      if (rekord.s + EPS < poprzedni.s) {
        dodajBlad(bledy, typ, index, rekord, "monotonicznosc s", `poprzednie s=${poprzedni.s}`);
      }
    }

    if (typ === "walek" && !(rekord.d2 < rekord.d1)) {
      dodajBlad(bledy, typ, index, rekord, "geometria d2", `dla walka wymagane d2 < d1, otrzymano d2=${rekord.d2}`);
    }
    if (typ === "otwor" && !(rekord.d2 > rekord.d1)) {
      dodajBlad(bledy, typ, index, rekord, "geometria d2", `dla otworu wymagane d2 > d1, otrzymano d2=${rekord.d2}`);
    }

    try {
      const rowek = wymiaryRowka({ typ, srednica: rekord.d1 });
      if (!(rowek.glebokosc > 0)) {
        dodajBlad(bledy, typ, index, rekord, "glebokosc rowka", `glebokosc=${rowek.glebokosc}`);
      }
      if (!(szerokoscTolerancji(rowek.d2Odchylki) > 0)) {
        dodajBlad(bledy, typ, index, rekord, "tolerancja d2", `szerokosc=${szerokoscTolerancji(rowek.d2Odchylki)}`);
      }
      if (!(szerokoscTolerancji(rowek.mOdchylki) > 0)) {
        dodajBlad(bledy, typ, index, rekord, "tolerancja m", `szerokosc=${szerokoscTolerancji(rowek.mOdchylki)}`);
      }
    } catch (error) {
      if (error instanceof BladPierscienia) {
        dodajBlad(bledy, typ, index, rekord, "obliczenia rowka", `${error.code}: ${error.message}`);
      } else {
        throw error;
      }
    }

    try {
      dobierzPierscien({ typ, srednica: rekord.d1 });
      const luz = luzOsiowy({ typ, srednica: rekord.d1 });
      if (!(rekord.m > rekord.s)) {
        dodajBlad(bledy, typ, index, rekord, "luz nominalny", `m=${rekord.m} nie jest wieksze od s=${rekord.s}`);
      }
      if (luz.nominalny + EPS < 0.05 || luz.nominalny - EPS > 0.2) {
        dodajBlad(bledy, typ, index, rekord, "zakres luzu nominalnego", `luz=${luz.nominalny} mm`);
      }
    } catch (error) {
      if (error instanceof BladPierscienia) {
        dodajBlad(bledy, typ, index, rekord, "dobor pierscienia", `${error.code}: ${error.message}`);
      } else {
        throw error;
      }
    }

    if (!wPrzedzialeTolerancji(typ, rekord.d1)) {
      dodajBlad(bledy, typ, index, rekord, "przedzial tolerancji d1", "brak przedzialu w tolerancjeRowka");
    }
  }
}

console.log(`Sprawdzone rekordy: ${sprawdzone}`);
console.log(`Niezgodnosci: ${bledy.length}`);

for (const blad of bledy) {
  console.log(`BLAD ${blad}`);
}

if (bledy.length > 0) {
  process.exitCode = 1;
} else {
  console.log("Wynik: dane pierscieni sa spojne.");
}
