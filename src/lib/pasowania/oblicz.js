const {
  PRZEDZIALY_IT,
  PRZEDZIALY_ODCHYLEK,
  ODCHYLKI_WALKOW,
  LITERY_WALKOW,
  LITERY_OTWOROW,
  KLASY_IT,
  PASOWANIA_UPRZYWILEJOWANE,
} = require("./dane.js");

class BladPasowania extends Error {
  constructor(message, code) {
    super(message);
    this.name = "BladPasowania";
    this.code = code;
  }
}

function znajdzPrzedzial(przedzialy, srednica) {
  return przedzialy.find((przedzial) => srednica > przedzial.ponad && srednica <= przedzial.do);
}

function indeksPrzedzialuOdchylek(srednica) {
  const index = PRZEDZIALY_ODCHYLEK.findIndex((przedzial) => srednica > przedzial.ponad && srednica <= przedzial.do);
  if (index === -1) {
    throw new BladPasowania(`Brak przedzialu odchylek podstawowych dla srednicy ${srednica} mm.`, "SREDNICA_POZA_ZAKRESEM");
  }
  return index;
}

function sprawdzSrednice(srednica) {
  if (!Number.isFinite(srednica)) {
    throw new BladPasowania("Srednica musi byc liczba skonczona.", "NIEPRAWIDLOWA_SREDNICA");
  }
  if (srednica <= 0 || srednica > 500) {
    throw new BladPasowania("Zakres obliczen obejmuje srednice powyzej 0 do 500 mm.", "SREDNICA_POZA_ZAKRESEM");
  }
}

function sprawdzKlase(klasa) {
  if (!Number.isInteger(klasa) || !KLASY_IT.includes(klasa)) {
    throw new BladPasowania(`Nieobslugiwana klasa IT${klasa}. Zakres: IT4-IT13.`, "NIEZNANA_KLASA");
  }
}

function tolerancjaIT(srednica, klasa) {
  sprawdzKlase(klasa);
  const przedzial = znajdzPrzedzial(PRZEDZIALY_IT, srednica);
  if (!przedzial) {
    throw new BladPasowania(`Brak przedzialu IT dla srednicy ${srednica} mm.`, "SREDNICA_POZA_ZAKRESEM");
  }
  const wartosc = przedzial.it[klasa];
  if (wartosc === undefined) {
    throw new BladPasowania(`Brak wartosci IT${klasa} dla srednicy ${srednica} mm.`, "BRAK_DANYCH");
  }
  return { wartosc, przedzial };
}

function tolerancjaDoDelty(srednica, klasa) {
  const przedzial = znajdzPrzedzial(PRZEDZIALY_IT, srednica);
  if (!przedzial || przedzial.it[klasa] === undefined) {
    throw new BladPasowania(`Brak wartosci IT${klasa} potrzebnej do reguly delta.`, "BRAK_DANYCH");
  }
  return przedzial.it[klasa];
}

function delta(srednica, klasa) {
  if (srednica <= 3) {
    return 0;
  }
  return tolerancjaDoDelty(srednica, klasa) - tolerancjaDoDelty(srednica, klasa - 1);
}

function wartoscZTabeli(tablica, litera, index, kontekst) {
  const wiersz = tablica[litera];
  if (!wiersz) {
    throw new BladPasowania(`Brak tabeli odchylek dla pola ${litera}.`, "NIEZNANA_LITERA");
  }
  const wartosc = wiersz[index];
  if (wartosc === null || wartosc === undefined) {
    throw new BladPasowania(`Brak wiarygodnej odchylki dla pola ${litera} w przedziale ${kontekst}.`, "BRAK_DANYCH");
  }
  return wartosc;
}

function odchylkiWalka({ srednica, litera, klasa }) {
  if (!LITERY_WALKOW.includes(litera)) {
    throw new BladPasowania(`Nieznane pole tolerancji walka: ${litera}.`, "NIEZNANA_LITERA");
  }

  const { wartosc: it, przedzial: przedzialIT } = tolerancjaIT(srednica, klasa);
  const index = indeksPrzedzialuOdchylek(srednica);
  const przedzialOdchylek = PRZEDZIALY_ODCHYLEK[index];
  const kontekst = `>${przedzialOdchylek.ponad}-${przedzialOdchylek.do} mm`;

  let es;
  let ei;

  if (litera === "h") {
    es = 0;
    ei = -it;
  } else if (litera === "js") {
    es = it / 2;
    ei = -it / 2;
  } else if (litera === "j") {
    const wiersz = ODCHYLKI_WALKOW.j[klasa];
    if (!wiersz) {
      throw new BladPasowania("Pole j dla walkow jest tablicowo potwierdzone tylko dla IT5-IT7.", "BRAK_DANYCH");
    }
    ei = wiersz[index];
    es = ei + it;
  } else if (ODCHYLKI_WALKOW.es[litera]) {
    es = wartoscZTabeli(ODCHYLKI_WALKOW.es, litera, index, kontekst);
    ei = es - it;
  } else {
    const literaTabeli = litera === "k" && klasa >= 8 ? "k" : litera;
    ei = litera === "k" && klasa >= 8
      ? 0
      : wartoscZTabeli(ODCHYLKI_WALKOW.ei, literaTabeli, index, kontekst);
    es = ei + it;
  }

  return {
    es,
    ei,
    tolerancja: it,
    przedzialIT,
    przedzialOdchylek,
  };
}

function odchylkiOtworu({ srednica, litera, klasa }) {
  if (!LITERY_OTWOROW.includes(litera)) {
    throw new BladPasowania(`Nieznane pole tolerancji otworu: ${litera}.`, "NIEZNANA_LITERA");
  }

  const { wartosc: it, przedzial: przedzialIT } = tolerancjaIT(srednica, klasa);
  const index = indeksPrzedzialuOdchylek(srednica);
  const przedzialOdchylek = PRZEDZIALY_ODCHYLEK[index];
  const kontekst = `>${przedzialOdchylek.ponad}-${przedzialOdchylek.do} mm`;
  const mala = litera.toLowerCase();

  let ES;
  let EI;

  if (litera === "H") {
    EI = 0;
    ES = it;
  } else if (litera === "JS") {
    ES = it / 2;
    EI = -it / 2;
  } else if (["A", "C", "D", "E", "F", "G"].includes(litera)) {
    EI = -wartoscZTabeli(ODCHYLKI_WALKOW.es, mala, index, kontekst);
    ES = EI + it;
    if (litera === "A" && klasa === 11 && srednica > 160 && srednica <= 180) {
      ES = 820;
    }
  } else if (litera === "J") {
    if (klasa === 9) {
      ES = it / 2;
      EI = -it / 2;
      return {
        ES,
        EI,
        tolerancja: it,
        przedzialIT,
        przedzialOdchylek,
      };
    }
    const jsEs = {
      6: [2, 5, 5, 6, 6, 8, 8, 10, 10, 13, 13, 16, 16, 18, 18, 18, 22, 22, 22, 25, 25, 29, 29, 33, 33],
      7: [4, 6, 8, 10, 10, 12, 12, 14, 14, 18, 18, 22, 22, 26, 26, 26, 30, 30, 30, 36, 36, 39, 39, 43, 43],
      8: [6, 10, 12, 15, 15, 20, 20, 24, 24, 28, 28, 34, 34, 41, 41, 41, 47, 47, 47, 55, 55, 60, 60, 66, 66],
    };
    const wiersz = jsEs[klasa];
    if (!wiersz) {
      throw new BladPasowania("Pole J dla otworow jest tablicowo potwierdzone tylko dla IT6-IT8.", "BRAK_DANYCH");
    }
    ES = wiersz[index];
    EI = ES - it;
  } else {
    const eiWalka = mala === "k" && klasa >= 9
      ? 0
      : wartoscZTabeli(ODCHYLKI_WALKOW.ei, mala, index, kontekst);

    if (mala === "k") {
      if (srednica <= 3 && klasa <= 8) {
        ES = 0;
      } else if (klasa <= 8) {
        ES = -eiWalka + delta(srednica, klasa);
      } else {
        ES = 0;
      }
    } else if (["m", "n"].includes(mala)) {
      if (mala === "m" && klasa === 6 && srednica > 250 && srednica <= 315) {
        ES = -9;
      } else {
        ES = klasa <= 8 ? -eiWalka + delta(srednica, klasa) : -eiWalka;
      }
    } else {
      // Dla P-Z ISO 286-2/RoyMech stosuja korekte delta do klas 6 i 7.
      // Klasy wyzsze wracaja do odbicia odchyłki podstawowej walka.
      ES = klasa <= 7 ? -eiWalka + delta(srednica, klasa) : -eiWalka;
    }
    EI = ES - it;
  }

  return {
    ES,
    EI,
    tolerancja: it,
    przedzialIT,
    przedzialOdchylek,
  };
}

function mm(um) {
  return um / 1000;
}

function wymiaryGraniczne(srednica, dolnaUm, gornaUm) {
  return {
    dolny: srednica + mm(dolnaUm),
    gorny: srednica + mm(gornaUm),
  };
}

function policzPasowanie({ srednica, otwor, walek }) {
  sprawdzSrednice(srednica);
  if (!otwor || !walek) {
    throw new BladPasowania("Podaj otwor i walek.", "BRAK_ARGUMENTOW");
  }

  const o = odchylkiOtworu({ srednica, litera: otwor.litera, klasa: otwor.klasa });
  const w = odchylkiWalka({ srednica, litera: walek.litera, klasa: walek.klasa });

  // Dodatni wynik oznacza luz, ujemny wynik oznacza wcisk.
  const luzMaksymalny = o.ES - w.ei;
  const luzMinimalny = o.EI - w.es;
  const rodzaj = luzMinimalny >= 0 ? "luzne" : (luzMaksymalny <= 0 ? "ciasne" : "mieszane");
  const symbol = `${otwor.litera}${otwor.klasa}/${walek.litera}${walek.klasa}`;

  return {
    symbol,
    srednica,
    otwor: {
      litera: otwor.litera,
      klasa: otwor.klasa,
      ES: { um: o.ES, mm: mm(o.ES) },
      EI: { um: o.EI, mm: mm(o.EI) },
      tolerancja: { um: o.tolerancja, mm: mm(o.tolerancja) },
      wymiarGraniczny: wymiaryGraniczne(srednica, o.EI, o.ES),
    },
    walek: {
      litera: walek.litera,
      klasa: walek.klasa,
      es: { um: w.es, mm: mm(w.es) },
      ei: { um: w.ei, mm: mm(w.ei) },
      tolerancja: { um: w.tolerancja, mm: mm(w.tolerancja) },
      wymiarGraniczny: wymiaryGraniczne(srednica, w.ei, w.es),
    },
    luzMaksymalny: { um: luzMaksymalny, mm: mm(luzMaksymalny) },
    luzMinimalny: { um: luzMinimalny, mm: mm(luzMinimalny) },
    rodzaj,
    tolerancjaPasowania: {
      um: o.tolerancja + w.tolerancja,
      mm: mm(o.tolerancja + w.tolerancja),
    },
    przedzialy: {
      it: { ponad: o.przedzialIT.ponad, do: o.przedzialIT.do },
      odchylkiOtworu: { ponad: o.przedzialOdchylek.ponad, do: o.przedzialOdchylek.do },
      odchylkiWalka: { ponad: w.przedzialOdchylek.ponad, do: w.przedzialOdchylek.do },
    },
  };
}

function bladKandydata(callback) {
  try {
    return { ok: true, value: callback() };
  } catch (error) {
    if (error instanceof BladPasowania) {
      return { ok: false, error };
    }
    throw error;
  }
}

function czyUprzywilejowane(symbol, zasada) {
  const zestaw = zasada === "stalegoOtworu" ? PASOWANIA_UPRZYWILEJOWANE.stalyOtwor : PASOWANIA_UPRZYWILEJOWANE.stalyWalek;
  return zestaw.has(symbol);
}

function odlegloscOdZakresu(wynik, luzMin, luzMax) {
  const min = wynik.luzMinimalny.um;
  const max = wynik.luzMaksymalny.um;
  const pozaMin = min < luzMin ? luzMin - min : 0;
  const pozaMax = max > luzMax ? max - luzMax : 0;
  return pozaMin + pozaMax;
}

function znajdzPasowania({ srednica, luzMin, luzMax, zasada }) {
  sprawdzSrednice(srednica);
  if (!Number.isFinite(luzMin) || !Number.isFinite(luzMax) || luzMin > luzMax) {
    throw new BladPasowania("Podaj poprawny zakres luzu w mikrometrach: luzMin <= luzMax.", "NIEPRAWIDLOWY_ZAKRES_LUZU");
  }
  if (!["stalegoOtworu", "stalegoWalka"].includes(zasada)) {
    throw new BladPasowania("Zasada musi miec wartosc 'stalegoOtworu' albo 'stalegoWalka'.", "NIEZNANA_ZASADA");
  }

  const kandydaci = [];
  if (zasada === "stalegoOtworu") {
    for (const klasaOtworu of KLASY_IT) {
      for (const literaWalka of LITERY_WALKOW) {
        for (const klasaWalka of KLASY_IT) {
          const proba = bladKandydata(() => policzPasowanie({
            srednica,
            otwor: { litera: "H", klasa: klasaOtworu },
            walek: { litera: literaWalka, klasa: klasaWalka },
          }));
          if (proba.ok) kandydaci.push(proba.value);
        }
      }
    }
  } else {
    for (const literaOtworu of LITERY_OTWOROW) {
      for (const klasaOtworu of KLASY_IT) {
        for (const klasaWalka of KLASY_IT) {
          const proba = bladKandydata(() => policzPasowanie({
            srednica,
            otwor: { litera: literaOtworu, klasa: klasaOtworu },
            walek: { litera: "h", klasa: klasaWalka },
          }));
          if (proba.ok) kandydaci.push(proba.value);
        }
      }
    }
  }

  return kandydaci
    .map((wynik) => ({
      symbol: wynik.symbol,
      otwor: wynik.otwor,
      walek: wynik.walek,
      luzMinimalny: wynik.luzMinimalny,
      luzMaksymalny: wynik.luzMaksymalny,
      rodzaj: wynik.rodzaj,
      tolerancjaPasowania: wynik.tolerancjaPasowania,
      przedzialy: wynik.przedzialy,
      uprzywilejowane: czyUprzywilejowane(wynik.symbol, zasada),
      miesciSie: wynik.luzMinimalny.um >= luzMin && wynik.luzMaksymalny.um <= luzMax,
      odleglosc: odlegloscOdZakresu(wynik, luzMin, luzMax),
    }))
    .sort((a, b) => (
      a.odleglosc - b.odleglosc
      || Number(b.uprzywilejowane) - Number(a.uprzywilejowane)
      || a.tolerancjaPasowania.um - b.tolerancjaPasowania.um
      || a.symbol.localeCompare(b.symbol)
    ))
    .slice(0, 12);
}

module.exports = {
  BladPasowania,
  policzPasowanie,
  znajdzPasowania,
  odchylkiOtworu,
  odchylkiWalka,
};
