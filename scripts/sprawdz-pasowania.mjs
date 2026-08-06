import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { BladPasowania, odchylkiOtworu, odchylkiWalka } = require("../src/lib/pasowania/oblicz.js");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function wczytajJson(sciezka) {
  return JSON.parse(fs.readFileSync(path.join(root, sciezka), "utf8"));
}

function srednicaZRozmiaru(rozmiar) {
  if (rozmiar === "do 3") {
    return 3;
  }
  const match = rozmiar.match(/^(\d+) \.\.\. (\d+)$/);
  if (!match) {
    throw new Error(`Nieznany zapis przedzialu srednicy: ${rozmiar}`);
  }
  return Number(match[2]);
}

function parsujSymbol(symbol, typ) {
  const match = symbol.match(/^([A-Za-z]+)(\d+)$/);
  if (!match) {
    throw new Error(`Nieznany symbol ${typ}: ${symbol}`);
  }
  return { litera: match[1], klasa: Number(match[2]) };
}

function porownajWartosc(roznice, zgodne, opis) {
  if (Object.is(opis.otrzymano, opis.oczekiwano)) {
    return zgodne + 1;
  }
  roznice.push(opis);
  return zgodne;
}

function czyObslugiwanyBlad(error) {
  return error instanceof BladPasowania && ["NIEZNANA_LITERA", "NIEZNANA_KLASA", "BRAK_DANYCH"].includes(error.code);
}

function porownajElementy({ nazwaTablicy, typ, elementy, roznice }) {
  let zgodne = 0;
  let pominiete = 0;

  for (const [symbol, przedzialy] of Object.entries(elementy)) {
    const pole = parsujSymbol(symbol, typ);

    for (const [przedzial, oczekiwane] of Object.entries(przedzialy)) {
      const srednica = srednicaZRozmiaru(przedzial);
      let otrzymane;

      try {
        otrzymane = typ === "otwor"
          ? odchylkiOtworu({ srednica, litera: pole.litera, klasa: pole.klasa })
          : odchylkiWalka({ srednica, litera: pole.litera, klasa: pole.klasa });
      } catch (error) {
        if (czyObslugiwanyBlad(error)) {
          pominiete += Object.keys(oczekiwane).length;
          continue;
        }
        throw error;
      }

      if (typ === "otwor") {
        zgodne = porownajWartosc(roznice, zgodne, {
          tablica: nazwaTablicy,
          symbol,
          przedzial,
          pole: "EI",
          oczekiwano: oczekiwane.EI,
          otrzymano: otrzymane.EI,
        });
        zgodne = porownajWartosc(roznice, zgodne, {
          tablica: nazwaTablicy,
          symbol,
          przedzial,
          pole: "ES",
          oczekiwano: oczekiwane.ES,
          otrzymano: otrzymane.ES,
        });
      } else {
        zgodne = porownajWartosc(roznice, zgodne, {
          tablica: nazwaTablicy,
          symbol,
          przedzial,
          pole: "ei",
          oczekiwano: oczekiwane.ei,
          otrzymano: otrzymane.ei,
        });
        zgodne = porownajWartosc(roznice, zgodne, {
          tablica: nazwaTablicy,
          symbol,
          przedzial,
          pole: "es",
          oczekiwano: oczekiwane.es,
          otrzymano: otrzymane.es,
        });
      }
    }
  }

  return { zgodne, pominiete };
}

const tablice = [
  {
    nazwa: "staly otwor",
    dane: wczytajJson("analizy/tablice-ksiazka-staly-otwor.json"),
  },
  {
    nazwa: "staly walek",
    dane: wczytajJson("analizy/tablice-ksiazka-staly-walek.json"),
  },
];

const roznice = [];
let zgodne = 0;
let pominiete = 0;

for (const tablica of tablice) {
  for (const [typ, klucz] of [["otwor", "otwory"], ["walek", "walki"]]) {
    const wynik = porownajElementy({
      nazwaTablicy: tablica.nazwa,
      typ,
      elementy: tablica.dane[klucz],
      roznice,
    });
    zgodne += wynik.zgodne;
    pominiete += wynik.pominiete;
  }
}

console.log(`Zgodne: ${zgodne}`);
console.log(`Roznice: ${roznice.length}`);
if (pominiete > 0) {
  console.log(`Pominiete wartosci spoza zakresu silnika: ${pominiete}`);
}

for (const roznica of roznice) {
  console.log(`${roznica.tablica}; ${roznica.symbol}; ${roznica.przedzial}; ${roznica.pole}: oczekiwano ${roznica.oczekiwano}, otrzymano ${roznica.otrzymano}`);
}
