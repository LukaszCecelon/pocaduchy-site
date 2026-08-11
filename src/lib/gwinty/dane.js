/**
 * Gwint metryczny zwykly i drobnozwojny: skoki, wymiar pod klucz,
 * dlugosc gwintu srub z lbem szescioktnym.
 *
 * Pola:
 *   d       srednica nominalna gwintu, czyli liczba po literze M
 *   p       skok zwykly wg ISO 261
 *   pd      skoki drobnozwojne spotykane w praktyce, od najgrubszego
 *   k       wymiar pod klucz, ten ktory realnie lezy w szufladzie
 *   kUwaga  rozbieznosc miedzy ISO a starym DIN, jesli wystepuje
 *   pUwaga  zastrzezenie do skoku z kolumny zwyklej
 *   pdUwagi zastrzezenia do konkretnych skokow drobnozwojnych
 *   sruba   czy istnieje sruba z lbem szesciokatnym w tej srednicy
 *   w       kolejnosc wyboru wg ISO 261: 1, 2 albo 3
 *
 * Skoki drobnozwojne to lista **spotykana w praktyce**, a nie komplet
 * z normy. Pelny wykaz dla danej srednicy jest w ISO 261 i DIN 13,
 * i bywa dluzszy. Rozroznienie jest wazne: tabela ma pomoc dobrac gwint,
 * a nie zastapic norme przy sporze z dostawca.
 */

const GWINTY = [
  {d: 1,    p: 0.25, pd: [0.2], w: 1},
  {d: 1.2,  p: 0.25, pd: [0.2], w: 1},
  {d: 1.4,  p: 0.3,  pd: [0.2], w: 2},
  {d: 1.6,  p: 0.35, pd: [0.2],  k: 3.2, w: 1},
  {d: 1.8,  p: 0.35, pd: [0.2], w: 2},
  {d: 2,    p: 0.4,  pd: [0.25], k: 4, w: 1},
  {d: 2.2,  p: 0.45, pd: [0.25], w: 2},
  {d: 2.5,  p: 0.45, pd: [0.35], k: 5, w: 1},
  {d: 3,    p: 0.5,  pd: [0.35], k: 5.5, w: 1},
  {d: 3.5,  p: 0.6,  pd: [0.35], k: 6, w: 2},
  {d: 4,    p: 0.7,  pd: [0.5],  k: 7, w: 1},
  {d: 5,    p: 0.8,  pd: [0.5],  k: 8, w: 1},
  {d: 6,    p: 1,    pd: [0.75, 0.5], k: 10, w: 1},
  {d: 7,    p: 1,    pd: [0.75, 0.5], k: 11, w: 2},
  {d: 8,    p: 1.25, pd: [1, 0.75, 0.5], k: 13, w: 1},
  {d: 9,    p: 1.25, pd: [1, 0.75, 0.5], w: 3},
  // Cztery rozmiary, przy ktorych ISO i stary DIN nie zgadzaja sie co do
  // klucza. W kolumnie stoi ten wymiar, ktory realnie spotkasz w Polsce.
  {d: 10,   p: 1.5,  pd: [1.25, 1, 0.75], k: 17, kUwaga: 'wg ISO 4032 jest 16', w: 1},
  {d: 12,   p: 1.75, pd: [1.5, 1.25, 1],  k: 19, kUwaga: 'wg ISO 4032 jest 18', w: 1},
  {
    d: 14, p: 2, pd: [1.5, 1.25, 1], k: 21, w: 2,
    kUwaga: 'wg starego DIN 934 bylo 22',
    // ISO 261 dopuszcza M14x1,25, ale przypisem zaweza je do swiec
    // zaplonowych. W zwyklej konstrukcji tego skoku sie nie uzywa.
    pdUwagi: {1.25: 'wg ISO 261 tylko do świec zapłonowych silników'},
  },
  {d: 16,   p: 2,    pd: [1.5, 1],        k: 24, w: 1},
  {d: 18,   p: 2.5,  pd: [2, 1.5, 1],     k: 27, w: 2},
  {d: 20,   p: 2.5,  pd: [2, 1.5, 1],     k: 30, w: 1},
  {d: 22,   p: 2.5,  pd: [2, 1.5, 1],     k: 34, kUwaga: 'wg starego DIN 934 bylo 32', w: 2},
  {d: 24,   p: 3,    pd: [2, 1.5, 1],     k: 36, w: 1},
  {d: 27,   p: 3,    pd: [2, 1.5, 1],     k: 41, w: 2},
  {d: 30,   p: 3.5,  pd: [2, 1.5, 1],     k: 46, w: 1},
  {d: 33,   p: 3.5,  pd: [2, 1.5, 1],     k: 50, w: 2},
  {d: 36,   p: 4,    pd: [3, 2, 1.5],     k: 55, w: 1},
  {d: 39,   p: 4,    pd: [3, 2, 1.5],     k: 60, w: 2},
  {d: 42,   p: 4.5,  pd: [3, 2, 1.5],     k: 65, w: 1},
  {d: 45,   p: 4.5,  pd: [3, 2, 1.5],     k: 70, w: 2},
  {d: 48,   p: 5,    pd: [3, 2, 1.5],     k: 75, w: 1},
  {d: 52,   p: 5,    pd: [3, 2, 1.5],     k: 80, w: 2},
  {d: 56,   p: 5.5,  pd: [4, 3, 2, 1.5],  k: 85, w: 1},
  {d: 60,   p: 5.5,  pd: [4, 3, 2, 1.5],  k: 90, w: 2},
  {d: 64,   p: 6,    pd: [4, 3, 2],       k: 95, w: 1},
  {d: 68,   p: 6,    pd: [4, 3, 2],       k: 100, w: 2},
  // Powyzej M68 konczy sie seria zwykla wg DIN 13-1. ISO 261 obejmuje te
  // srednice dalej, ale 6 mm jest tam **skokiem drobnym**, nie zwyklym.
  // W kolumnie zostaje jako skok domyslny, bo taki dostaniesz w praktyce,
  // ale musi byc oznaczony, zeby nikt nie powolal sie na nieistniejaca
  // pozycje serii zwyklej ISO.
  {d: 72,   p: 6,    pd: [4, 3, 2],       k: 105, pUwaga: 'wg ISO 261 to skok drobny, seria zwykła kończy się na M68', w: 1},
  {d: 76,   p: 6,    pd: [4, 3, 2],       k: 110, pUwaga: 'wg ISO 261 to skok drobny, seria zwykła kończy się na M68', w: 2},
  {d: 80,   p: 6,    pd: [4, 3, 2],       k: 115, pUwaga: 'wg ISO 261 to skok drobny, seria zwykła kończy się na M68', w: 1},
  {d: 85,   p: 6,    pd: [4, 3, 2],       k: 120, sruba: false, pUwaga: 'wg ISO 261 to skok drobny, seria zwykła kończy się na M68', w: 2},
  {d: 90,   p: 6,    pd: [4, 3, 2],       k: 130, pUwaga: 'wg ISO 261 to skok drobny, seria zwykła kończy się na M68', w: 1},
  {d: 100,  p: 6,    pd: [4, 3, 2],       k: 145, pUwaga: 'wg ISO 261 to skok drobny, seria zwykła kończy się na M68', w: 1},
];

// Granica serii zwyklej wg ISO 261. Powyzej idziemy za DIN 13.
const GRANICA_ISO_261 = 68;

/**
 * Dlugosc gwintu sruby z lbem szesciokatnym wg DIN 931 i PN-82101.
 * To nie jest tablica do przepisania, tylko trzy wzory zalezne od dlugosci
 * calej sruby. Dlatego liczymy je, zamiast trzymac w danych.
 */
// Granice sa domkniete od gory: dla sruby dlugiej dokladnie 125 mm obowiazuje
// jeszcze pierwszy wzor.
//
// Nie filtrujemy tu dostepnosci handlowej. Probowalismy tego progiem minimalnej
// srednicy i sie nie obronil: najpierw M8x250 obalilo prog 10, potem M5x250
// obalilo prog 8, a M3x150 prog 5. Kazda taka granica jest zgadywaniem rynku
// podanym jak fakt. Tabela mowi, ile wynosi znormalizowane b, a nie co jest
// na magazynie, i tak ma byc napisane w tresci.
const DLUGOSC_GWINTU = [
  {id: 'do125', opis: 'do 125 mm', dodatek: 6, maks: 125},
  {id: 'do200', opis: 'powyżej 125 do 200 mm', dodatek: 12, maks: 200},
  {id: 'powyzej200', opis: 'powyżej 200 mm', dodatek: 25, maks: Infinity},
];

/**
 * Dlugosc gwintu dla danej srednicy w danym przedziale dlugosci sruby.
 * Zwraca null, gdy wynik nie miesci sie w przedziale: sruba M64 o dlugosci
 * do 125 mm musialaby miec 134 mm gwintu, wiec taki wariant nie istnieje.
 */
function dlugoscGwintu(d, idPrzedzialu) {
  const przedzial = DLUGOSC_GWINTU.find((p) => p.id === idPrzedzialu);
  if (!przedzial) return null;
  const g = znajdz(d);
  if (!g || !czyJestSrubaSzesciokatna(g)) return null;
  const b = 2 * d + przedzial.dodatek;
  // Wzor daje ulamek tylko przy M1,6 (9,2). ISO 4014 i DIN 931-1 podaja tam
  // wartosc tablicowa 9 mm, wiec zaokraglenie trafia w norme. Uwaga: to zgodnosc
  // wyniku, a nie regula zaokraglania zapisana w normie.
  return b <= przedzial.maks ? Math.round(b) : null;
}

/**
 * Czy w tej srednicy w ogole robi sie sruby z lbem szesciokatnym.
 *
 * Domyslnie rozpoznajemy to po wymiarze pod klucz: srednice takie jak M1,2,
 * M1,8, M2,2 czy M9 nie maja przypisanego klucza, bo nie ma dla nich lba
 * szesciokatnego. Bez tego wzor na dlugosc gwintu podawalby wymiar sruby,
 * ktorej nikt nie wyprodukowal.
 *
 * Ten skrot ma jeden znany wyjatek i dlatego istnieje jawne pole `sruba`:
 * M85 ma wymiar pod klucz 120 mm, ale to szerokosc szesciokata **nakretki**.
 * ISO 4014 konczy sie na M64, a uzupelniajace DIN 931-2 obejmuje M68, M72,
 * M76, M80, M90 i M100, pomijajac wlasnie M85.
 */
function czyJestSrubaSzesciokatna(g) {
  if (!g) return false;
  if (g.sruba !== undefined) return g.sruba;
  return g.k !== undefined;
}

function znajdz(d) {
  return GWINTY.find((g) => g.d === d) || null;
}

module.exports = {
  GWINTY,
  DLUGOSC_GWINTU,
  GRANICA_ISO_261,
  dlugoscGwintu,
  czyJestSrubaSzesciokatna,
  znajdz,
};
