/**
 * Chropowatosc osiagana roznymi metodami obrobki.
 *
 * WAZNE, i to musi byc powiedziane na stronie: to nie sa wartosci normowe.
 * Zadna norma nie mowi, ze toczenie "daje Ra 1,6". To sa zakresy osiagalne
 * w praktyce warsztatowej, zbierane z poradnikow i danych narzedziowych,
 * i roznia sie miedzy zrodlami. Sluza do doboru metody obrobki do wymagania
 * z rysunku, a nie do sporu z podwykonawca.
 *
 * Pola procesu:
 *   grupa   klucz grupy technologicznej
 *   nazwa   nazwa metody
 *   wariant doprecyzowanie metody, jesli jest
 *   rz      {min, od, do, max} w mikrometrach, null gdy zrodlo nie podaje
 *   ra      {min, od, do, max} w mikrometrach, null gdy zrodlo nie podaje
 *   uwagi   zastrzezenia do konkretnych wartosci, klucz to 'rz.max' itd.
 *
 * min  to granica osiagalna specjalnie, przy dobranym narzedziu i parametrach
 * od...do to zakres spotykany, czyli to, co wychodzi bez zabiegow specjalnych
 * max  to zgrubna granica spotykana w zestawieniach
 *
 * Nie sa to trzy klasy normowe i nie wolno ich tak nazywac. Slowo "normalny"
 * jest za mocne dla obwiedni obejmujacej rozne materialy i odmiany procesu.
 *
 * Kolumny Rz i Ra pochodza z **niezaleznych obwiedni**. Skrajne wartosci w
 * jednym wierszu nie opisuja tej samej probki, wiec dzielenie jednej przez
 * druga nie ma sensu i nie dowodzi bledu w danych.
 *
 * Ra i Rz to **dwa niezalezne parametry**, a nie ten sam wymiar w dwoch
 * jednostkach. Nie wolno przeliczac jednego na drugi jednym wspolczynnikiem,
 * bo zaleznosc zalezy od ksztaltu profilu. W tej tablicy obie kolumny opisuja
 * te sama metode, ale nie sa swoimi przelicznikami.
 */

const GRUPY = [
  {id: 'wstepne', nazwa: 'Kształtowanie wstępne'},
  {id: 'bezubytkowa', nazwa: 'Obróbka bezubytkowa'},
  {id: 'ubytkowa', nazwa: 'Obróbka ubytkowa'},
];

// null w polu rz albo ra znaczy: zrodlo nie podaje, a nie zero.
const z = (min, od, doW, max) => ({min, od, do: doW, max});

const PROCESY = [
  {grupa: 'wstepne', nazwa: 'Odlewanie', wariant: 'ciśnieniowe',
    rz: z(4, 10, 100, 160), ra: z(null, 0.8, 30, null),
    uwagi: {'ra.zakres': 'górna granica opisuje pełną obwiednię z poradników, nie typowy wynik'}},
  {grupa: 'wstepne', nazwa: 'Odlewanie', wariant: 'kokilowe',
    rz: z(10, 25, 160, 250), ra: z(null, 3.2, 50, null),
    uwagi: {'ra.zakres': 'górna granica opisuje złą powierzchnię, nie typowy wynik kokili'}},
  {grupa: 'wstepne', nazwa: 'Odlewanie', wariant: 'w formach piaskowych',
    rz: z(25, 63, 250, 1000), ra: z(null, 12.5, 50, null)},
  {grupa: 'wstepne', nazwa: 'Spiekanie', wariant: 'normalne',
    rz: z(null, 2.5, 10, null), ra: z(null, 0.4, 1.6, null)},
  {grupa: 'wstepne', nazwa: 'Spiekanie', wariant: 'kalibrowane',
    rz: z(null, 1.6, 7, null), ra: z(null, 0.3, 0.8, null)},

  {grupa: 'bezubytkowa', nazwa: 'Wyciskanie',
    rz: z(4, 25, 100, 400), ra: z(0.8, 3.2, 12.5, 25)},
  {grupa: 'bezubytkowa', nazwa: 'Kucie matrycowe',
    rz: z(10, 63, 400, 1000), ra: z(0.8, 2.5, 12.5, 25)},
  {grupa: 'bezubytkowa', nazwa: 'Wytłaczanie',
    rz: z(4, 25, 100, 400), ra: z(0.8, 3.2, 12.5, 25)},
  {grupa: 'bezubytkowa', nazwa: 'Ciągnienie głębokie',
    rz: z(0.4, 4, 10, 16), ra: z(0.2, 1, 3.2, 6.3)},
  {grupa: 'bezubytkowa', nazwa: 'Walcowanie', wariant: 'dogniatanie',
    rz: z(0.1, 0.5, 6.3, 10), ra: z(0.025, 0.06, 1.6, 2)},

  {grupa: 'ubytkowa', nazwa: 'Erozja', wariant: 'drutowa',
    rz: z(0.8, 2.8, 10, 16), ra: z(0.1, 0.4, 1, 3.2)},
  {grupa: 'ubytkowa', nazwa: 'Erozja', wariant: 'wgłębna',
    rz: z(1.5, 5, 10, 31), ra: z(0.2, 0.45, 0.45, 6.3),
    uwagi: {'ra.zakres': 'w źródle jedna wartość, nie zakres'}},
  {grupa: 'ubytkowa', nazwa: 'Przecinanie', wariant: 'palnikiem',
    rz: z(16, 40, 100, 1000), ra: z(3.2, 8, 16, 50),
    uwagi: {'rz.max': 'poza klasami jakości ISO 9013, wartość źródłowa niepotwierdzona'}},
  {grupa: 'ubytkowa', nazwa: 'Przecinanie', wariant: 'laserem',
    rz: z(null, 10, 100, null), ra: z(null, 1, 10, null)},
  {grupa: 'ubytkowa', nazwa: 'Przecinanie', wariant: 'plazmą',
    rz: z(null, 6, 280, null), ra: z(null, 1, 10, null)},
  {grupa: 'ubytkowa', nazwa: 'Przecinanie', wariant: 'na gilotynie',
    rz: z(null, 10, 63, null), ra: z(null, 1.6, 12.5, null)},
  {grupa: 'ubytkowa', nazwa: 'Przecinanie', wariant: 'strumieniem wody',
    rz: z(4, 16, 100, 400), ra: z(1.6, 6.3, 25, 50)},
  {grupa: 'ubytkowa', nazwa: 'Wiercenie', wariant: 'w pełnym materiale',
    rz: z(16, 40, 160, 250), ra: z(1.6, 6.3, 12.5, 25)},
  {grupa: 'ubytkowa', nazwa: 'Wytaczanie i rozwiercanie',
    rz: z(0.1, 2.5, 25, 40), ra: z(0.05, 0.4, 3.2, 12.5)},
  {grupa: 'ubytkowa', nazwa: 'Pogłębianie',
    rz: z(6.3, 10, 25, 40), ra: z(0.8, 1.6, 6.3, 12.5)},
  {grupa: 'ubytkowa', nazwa: 'Rozwiercanie', wariant: 'dokładne',
    rz: z(0.4, 4, 10, 25), ra: z(0.2, 0.8, 2, 6.3)},
  {grupa: 'ubytkowa', nazwa: 'Toczenie', wariant: 'wzdłużne',
    rz: z(1, 4, 63, 250), ra: z(0.2, 0.8, 12.5, 50)},
  {grupa: 'ubytkowa', nazwa: 'Toczenie', wariant: 'poprzeczne',
    rz: z(2.5, 10, 63, 250), ra: z(0.4, 1.6, 12.5, 50)},
  {grupa: 'ubytkowa', nazwa: 'Frezowanie', wariant: 'obwodowe i czołowe',
    rz: z(1.6, 10, 63, 160), ra: z(0.4, 1.6, 12.5, 25)},
  {grupa: 'ubytkowa', nazwa: 'Gładzenie', wariant: 'o krótkim skoku',
    rz: z(0.04, 0.1, 1, 2.5), ra: z(0.006, 0.02, 0.17, 0.3),
    uwagi: {'ra.max': 'w źródle 0,34; trzy cyfry znaczące to zaokrąglony wynik pomiaru, nie granica metody'}},
  {grupa: 'ubytkowa', nazwa: 'Gładzenie', wariant: 'o długim skoku',
    rz: z(0.04, 1, 11, 15), ra: z(0.006, 0.13, 0.65, 1.6)},
  {grupa: 'ubytkowa', nazwa: 'Docieranie',
    rz: z(0.04, 0.25, 1.6, 10), ra: z(0.006, 0.025, 0.2, null),
    uwagi: {'ra.max': 'w źródle 0,21, czyli 0,01 ponad końcem zakresu; nie potwierdzone jako osobna granica'}},
  {grupa: 'ubytkowa', nazwa: 'Docieranie', wariant: 'polerujące',
    rz: z(null, 0.04, 0.25, 0.4), ra: z(null, 0.005, 0.035, 0.05)},
  {grupa: 'ubytkowa', nazwa: 'Szlifowanie',
    rz: z(0.1, 1.6, 4, 25), ra: z(0.012, 0.2, 0.8, 6.3)},
];

/** Procesy jednej grupy, w kolejnosci z tablicy. */
function procesyGrupy(idGrupy) {
  return PROCESY.filter((p) => p.grupa === idGrupy);
}

/** Pelna nazwa metody: nazwa plus wariant, jesli jest. */
function pelnaNazwa(p) {
  return p.wariant ? `${p.nazwa}: ${p.wariant}` : p.nazwa;
}

/**
 * Czy dana metoda dosiega wymaganej chropowatosci Ra.
 * Bierzemy granice metody, czyli `min`, bo o to chodzi przy doborze:
 * czy tym procesem w ogole da sie to zrobic.
 */
function osiagaRa(p, wymaganeRa) {
  const granica = p.ra.min !== null ? p.ra.min : p.ra.od;
  return granica !== null && granica <= wymaganeRa;
}

function metodyDlaRa(wymaganeRa) {
  return PROCESY.filter((p) => osiagaRa(p, wymaganeRa));
}

module.exports = {GRUPY, PROCESY, procesyGrupy, pelnaNazwa, osiagaRa, metodyDlaRa};
