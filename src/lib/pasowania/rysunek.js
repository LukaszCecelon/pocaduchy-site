const { odchylkiOtworu } = require("./oblicz.js");

// Geometria rysunku pasowania. Trzymana osobno od komponentu, bo korzysta
// z niej takze skrypt kontrolny scripts/sprawdz-rysunek-pasowan.mjs. Gdyby
// wzor istnial w dwoch miejscach, kontrola pilnowalaby wlasnej kopii, a nie
// tego, co widzi uzytkownik.

// Srednica walka na rysunku, w jednostkach viewBox.
const SREDNICA_PX = 76;

// Najszersze pasmo szczeliny po jednej stronie walka.
const CEL_SZCZELINY_PX = 26;

// Ponizej tej grubosci pasmo znikneloby zupelnie, a rysunek klamalby
// w druga strone: pokazywalby zerowy luz tam, gdzie luz jest.
const MIN_PASMO_PX = 1.5;

// Jak szeroka ma byc szczelina na rysunku.
//
// Wersja z sierpnia 2026 dobierala powiekszenie osobno pod KAZDE pasowanie
// tak, zeby pasmo mialo zawsze podobna szerokosc. Skutek byl odwrotny do
// zamierzonego: na fi 20 pasowanie H7/g6 z luzem 41 um rysowalo sie szerzej
// niz H8/e8 ze 106 um, bo drugie dostawalo mniejsze powiekszenie. Rysunek
// klamal o tym, co porownuje sie na nim najczesciej, czyli o tym, ktore
// pasowanie jest luzniejsze.
//
// Odniesieniem jest teraz sama srednica, a nie wybrane pasowanie: tolerancja
// IT7 dla tej srednicy sluzy za miare "typowego" pasowania. Funkcja jest
// rosnaca i ograniczona, wiec luzniejsze pasowanie ZAWSZE rysuje sie szerzej,
// zadne nie wychodzi poza ramke, a to samo pasowanie wyglada tak samo
// niezaleznie od srednicy. Cena: rysunek nie ma juz jednej skali liczbowej,
// wiec dokladne wartosci musza stac obok, przy detalach i w tabeli.
function szerokoscPasma(um, srednica) {
  if (um <= 0) return 0;
  const odniesienie = 2 * odchylkiOtworu({ srednica, litera: "H", klasa: 7 }).tolerancja;
  return Math.max((CEL_SZCZELINY_PX * um) / (um + odniesienie), MIN_PASMO_PX);
}

module.exports = {
  SREDNICA_PX,
  CEL_SZCZELINY_PX,
  MIN_PASMO_PX,
  szerokoscPasma,
};
