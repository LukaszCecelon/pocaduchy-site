const dane = require("./dane.json");
const { odchylkiOtworu, odchylkiWalka } = require("../pasowania/oblicz.js");

const TYPY = Object.freeze(["walek", "otwor"]);
const NORMY = Object.freeze({
  walek: "DIN 471",
  otwor: "DIN 472",
});
const POLA_PIERSCIENIA = Object.freeze(["s", "d3", "d4", "b", "a", "dp"]);
const POLA_OBOWIAZKOWE = Object.freeze(["d1", "s", "d3", "b", "d2", "m", "n"]);

class BladPierscienia extends Error {
  constructor(message, code) {
    super(message);
    this.name = "BladPierscienia";
    this.code = code;
  }
}

function sprawdzTyp(typ) {
  if (!TYPY.includes(typ)) {
    throw new BladPierscienia("Typ musi miec wartosc 'walek' albo 'otwor'.", "NIEZNANY_TYP");
  }
}

function sprawdzSrednice(srednica) {
  if (!Number.isFinite(srednica)) {
    throw new BladPierscienia("Srednica musi byc liczba skonczona.", "NIEPRAWIDLOWA_SREDNICA");
  }
  if (srednica <= 0) {
    throw new BladPierscienia("Srednica musi byc wieksza od zera.", "NIEPRAWIDLOWA_SREDNICA");
  }
}

function rekordyTypu(typ) {
  sprawdzTyp(typ);
  return dane[typ];
}

function listaSrednic(typ) {
  return rekordyTypu(typ).map((rekord) => rekord.d1).sort((a, b) => a - b);
}

function sprawdzZakresTabeli(typ, srednica) {
  const srednice = listaSrednic(typ);
  const min = srednice[0];
  const max = srednice[srednice.length - 1];

  if (srednica < min || srednica > max) {
    throw new BladPierscienia(
      `Srednica ${srednica} mm jest poza zakresem tabeli dla typu ${typ}: ${min}-${max} mm.`,
      "SREDNICA_POZA_TABELA",
    );
  }
}

function znajdzRekord(typ, srednica) {
  sprawdzSrednice(srednica);
  sprawdzZakresTabeli(typ, srednica);
  return rekordyTypu(typ).find((rekord) => rekord.d1 === srednica);
}

function najblizszeRekordy(typ, srednica) {
  const rekordy = rekordyTypu(typ);
  const ponizej = [...rekordy].reverse().find((rekord) => rekord.d1 < srednica);
  const powyzej = rekordy.find((rekord) => rekord.d1 > srednica);
  return [ponizej, powyzej].filter(Boolean);
}

function formatujLiczbe(wartosc) {
  return String(wartosc).replace(".", ",");
}

function oznaczenie(rekord, typ) {
  return `${NORMY[typ]} - ${formatujLiczbe(rekord.d1)}x${formatujLiczbe(rekord.s)}`;
}

function wybierzPola(zrodlo, pola) {
  return pola.reduce((wynik, pole) => {
    if (Object.prototype.hasOwnProperty.call(zrodlo, pole)) {
      wynik[pole] = zrodlo[pole];
    }
    return wynik;
  }, {});
}

function parsujKlase(klasa) {
  const match = klasa.match(/^([A-Za-z]+)(\d+)$/);
  if (!match) {
    throw new BladPierscienia(`Nieprawidlowa klasa tolerancji rowka: ${klasa}.`, "NIEPRAWIDLOWA_KLASA_ROWKA");
  }
  return { litera: match[1], klasa: Number(match[2]) };
}

function znajdzKlaseD2(typ, d1) {
  const przedzial = dane.tolerancjeRowka[typ].d2.find(([od, do_]) => d1 >= od && d1 <= do_);
  if (!przedzial) {
    throw new BladPierscienia(`Brak klasy tolerancji d2 dla ${typ} ${d1} mm.`, "BRAK_TOLERANCJI_ROWKA");
  }
  return przedzial[2];
}

function zaokraglijMm(wartosc) {
  return Math.round((wartosc + Number.EPSILON) * 1000) / 1000;
}

function umNaMm(um) {
  return um / 1000;
}

function graniceWalka(nominal, odchylki) {
  return {
    min: zaokraglijMm(nominal + umNaMm(odchylki.ei)),
    max: zaokraglijMm(nominal + umNaMm(odchylki.es)),
  };
}

function graniceOtworu(nominal, odchylki) {
  return {
    min: zaokraglijMm(nominal + umNaMm(odchylki.EI)),
    max: zaokraglijMm(nominal + umNaMm(odchylki.ES)),
  };
}

function wymiaryRowka({ typ, srednica }) {
  const rekord = znajdzRekord(typ, srednica);
  if (!rekord) {
    return { trafienie: false, najblizsze: najblizszeRekordy(typ, srednica) };
  }

  const d2Klasa = znajdzKlaseD2(typ, rekord.d1);
  const d2Pole = parsujKlase(d2Klasa);
  const mPole = parsujKlase(dane.tolerancjeRowka[typ].m);

  const d2Odchylki = typ === "walek"
    ? odchylkiWalka({ srednica: rekord.d2, litera: d2Pole.litera, klasa: d2Pole.klasa })
    : odchylkiOtworu({ srednica: rekord.d2, litera: d2Pole.litera, klasa: d2Pole.klasa });
  const d2Granice = typ === "walek"
    ? graniceWalka(rekord.d2, d2Odchylki)
    : graniceOtworu(rekord.d2, d2Odchylki);

  const mOdchylki = odchylkiOtworu({ srednica: rekord.m, litera: mPole.litera, klasa: mPole.klasa });
  const mGranice = graniceOtworu(rekord.m, mOdchylki);

  const glebokosc = typ === "walek"
    ? (rekord.d1 - rekord.d2) / 2
    : (rekord.d2 - rekord.d1) / 2;

  return {
    d2: rekord.d2,
    d2Klasa,
    d2Odchylki,
    d2Min: d2Granice.min,
    d2Max: d2Granice.max,
    m: rekord.m,
    mKlasa: dane.tolerancjeRowka[typ].m,
    mOdchylki,
    mMin: mGranice.min,
    mMax: mGranice.max,
    glebokosc: zaokraglijMm(glebokosc),
    n: rekord.n,
  };
}

function luzOsiowy({ typ, srednica }) {
  const rekord = znajdzRekord(typ, srednica);
  if (!rekord) {
    return { trafienie: false, najblizsze: najblizszeRekordy(typ, srednica) };
  }

  const rowek = wymiaryRowka({ typ, srednica });

  // Dolna granica luzu nie jest liczona, poniewaz tolerancja grubosci s
  // pierscienia nie jest jeszcze dostepna w danych.
  return {
    nominalny: zaokraglijMm(rekord.m - rekord.s),
    maksymalny: zaokraglijMm(rowek.mMax - rekord.s),
    jednostka: "mm",
    zalozenie: "grubosc s w wymiarze nominalnym",
  };
}

function wZakresie(zakres, d1) {
  return d1 >= zakres[0] && d1 <= zakres[1];
}

function ostrzezeniaDla({ rowek, luz, wykonanieWzmocnione, pytanieOWzmocnione }) {
  const ostrzezenia = [];

  if (luz.maksymalny > 0.2) {
    ostrzezenia.push({
      kod: "LUZ_DUZY",
      tresc: "Maksymalny luz osiowy przekracza 0,2 mm przy grubosci s w wymiarze nominalnym.",
    });
  }

  if (rowek.glebokosc < 0.3) {
    ostrzezenia.push({
      kod: "ROWEK_PLYTKI",
      tresc: "Glebokosc rowka jest mniejsza niz 0,3 mm.",
    });
  }

  if (pytanieOWzmocnione && !wykonanieWzmocnione) {
    ostrzezenia.push({
      kod: "POZA_ZAKRESEM_WZMOCNIONYM",
      tresc: "Srednica nominalna wykracza poza zakres wykonania wzmocnionego.",
    });
  }

  return ostrzezenia;
}

function dobierzPierscien({ typ, srednica, wykonanie } = {}) {
  const rekord = znajdzRekord(typ, srednica);
  if (!rekord) {
    return { trafienie: false, najblizsze: najblizszeRekordy(typ, srednica) };
  }

  for (const pole of POLA_OBOWIAZKOWE) {
    if (!Object.prototype.hasOwnProperty.call(rekord, pole)) {
      throw new BladPierscienia(`Rekord ${typ} ${rekord.d1} mm nie ma pola ${pole}.`, "BRAK_DANYCH");
    }
  }

  const rowek = wymiaryRowka({ typ, srednica });
  const luz = luzOsiowy({ typ, srednica });
  const wykonanieWzmocnione = wZakresie(dane.zakresNormy.wzmocnione, rekord.d1);

  return {
    trafienie: true,
    typ,
    norma: NORMY[typ],
    oznaczenie: oznaczenie(rekord, typ),
    pierscien: wybierzPola(rekord, POLA_PIERSCIENIA),
    rowek,
    luzOsiowy: luz,
    wykonanieWzmocnione,
    ostrzezenia: ostrzezeniaDla({
      rowek,
      luz,
      wykonanieWzmocnione,
      pytanieOWzmocnione: wykonanie === "wzmocnione",
    }),
  };
}

module.exports = {
  BladPierscienia,
  dobierzPierscien,
  wymiaryRowka,
  luzOsiowy,
  listaSrednic,
};
