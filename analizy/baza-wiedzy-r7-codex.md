# Runda 7: akceptacja, schemat danych, prymitywy SVG

## 1. Akceptacja albo weto

Akceptuje architekture z sekcji C i plan z sekcji D pliku `r6-claude.md`.
Nie mam weta.

To jest sensowny final: jeden plik danych na temat, statyczny HTML przy buildzie,
SVG skladane z malych prymitywow, jawny zakres, status publikacji, zrodla przy
danych, `trybUzycia` przy liczbach i blok decyzji jako tresc uzytkowa zamiast
tekstu SEO. Plan DIN 471 -> momenty dokrecania -> DIN 472 jest poprawny, bo
najpierw testuje pelny pionowy wycinek, potem format bez rysunku, potem ponowne
uzycie geometrii.

## 2. Gotowy schemat danych

Docelowy plik: `content/wiedza/elementy/rowek-pod-pierscien-osadczy-na-wale.json`

```json
{
  "title": "Rowek pod pierscien osadczy na wale",
  "seoTitle": "Rowek pod pierscien osadczy na wale DIN 471 - wymiary",
  "description": "Wymiary rowka pod pierscien osadczy sprezynujacy zewnetrzny na wale wedlug DIN 471, z jawnym zakresem, zrodlem danych i komentarzem praktycznym.",
  "date": "2026-08-03",
  "dateModified": "2026-08-03",
  "image": "/img/wiedza/rowek-pod-pierscien-osadczy-na-wale.jpg",
  "tags": [
    "elementy maszyn",
    "elementy standardowe",
    "pierscienie osadcze",
    "rowki",
    "DIN 471"
  ],
  "statusPublikacji": "szkic",
  "trybUzycia": "wymiar-do-rysunku",
  "synonimy": [
    "seger",
    "pierscien segera",
    "pierscien osadczy",
    "pierscien osadczy zewnetrzny",
    "rowek pod segera",
    "rowek pod pierscien osadczy",
    "rowek na wale",
    "DIN 471",
    "zabezpieczenie osiowe walu"
  ],
  "normy": [
    "DIN 471"
  ],
  "zakres": {
    "opis": "Rowek obwodowy na wale pod pierscien osadczy sprezynujacy zewnetrzny wedlug DIN 471. Zakres publikacji jest ograniczony do wybranych srednic nominalnych pokazanych w tabeli.",
    "srednicaNominalna": {
      "symbol": "d1",
      "jednostka": "mm",
      "od": 10,
      "do": 50
    },
    "obejmuje": [
      "dobor podstawowych wymiarow rowka na wale",
      "srednice nominalne d1 ujete w tabeli",
      "srednice dna rowka d2",
      "szerokosc rowka m",
      "promien lub faze krawedzi rowka r"
    ],
    "nieObejmuje": [
      "rowkow pod pierscienie osadcze w otworach wedlug DIN 472",
      "doboru pierscienia pod konkretne obciazenie osiowe",
      "sprawdzenia wytrzymalosci walu w oslabionym przekroju",
      "nietypowych pierscieni producentow poza zakresem DIN 471",
      "warunkow pracy wymagajacych indywidualnej analizy bezpieczenstwa"
    ],
    "komunikatPozaZakresem": "Ta srednica nie jest objeta opracowanym zakresem. Sprawdz aktualna norme DIN 471 albo publiczny katalog producenta zgodny z DIN 471."
  },
  "zrodla": [
    {
      "id": "din-471",
      "typ": "norma",
      "nazwa": "DIN 471",
      "opis": "Norma odniesienia dla pierscieni osadczych sprezynujacych zewnetrznych na waly.",
      "dostep": "sprawdzenie w oficjalnym dokumencie normy",
      "uwagaPrawna": "Numer normy jest przywolaniem zrodla. Uklad tabeli i zakres publikacji powinny pozostac opracowaniem wlasnym."
    },
    {
      "id": "katalog-producenta-din-471",
      "typ": "katalog",
      "nazwa": "Publiczny katalog producenta pierscieni zgodnych z DIN 471",
      "opis": "Zrodlo pomocnicze do kontroli wybranych wartosci wymiarowych.",
      "dostep": "publiczny katalog producenta"
    }
  ],
  "weryfikacja": {
    "status": "do-weryfikacji",
    "data": "2026-08-03",
    "autor": "Lukasz Cecelon",
    "poziomRyzyka": "wysoki",
    "notatka": "Przed publikacja wymagane sprawdzenie wartosci z aktualnym zrodlem. Testy automatyczne maja pilnowac integralnosci danych po weryfikacji, nie sa dowodem poprawnosci normatywnej."
  },
  "relacje": [
    {
      "typ": "czestoMyliSieZ",
      "slug": "rowek-pod-pierscien-osadczy-w-otworze",
      "tytul": "Rowek pod pierscien osadczy w otworze",
      "opis": "Podobna geometria, ale inna norma i inne zastosowanie: DIN 472 zamiast DIN 471."
    },
    {
      "typ": "nastepnyKrok",
      "slug": "dobor-pierscienia-osadczego-na-wale",
      "tytul": "Dobor pierscienia osadczego na wale",
      "opis": "Po dobraniu rowka trzeba jeszcze sprawdzic sam pierscien, obciazenie osiowe i warunki montazu."
    },
    {
      "typ": "wymagaSprawdzenia",
      "slug": "wytrzymalosc-walu-z-rowkiem",
      "tytul": "Wytrzymalosc walu z rowkiem",
      "opis": "Rowek oslabia przekroj i moze byc koncentratorem naprezen."
    },
    {
      "typ": "alternatywy",
      "slug": "zabezpieczenia-osiowe-elementow-na-wale",
      "tytul": "Alternatywne zabezpieczenia osiowe elementow na wale",
      "opis": "Nakretka, tuleja dystansowa, kolnierz, sruba z podkladka albo inne rozwiazanie moze byc lepsze przy duzych silach."
    }
  ],
  "blocks": [
    {
      "type": "kartaZaufania",
      "statusPublikacji": "szkic",
      "trybUzycia": "wymiar-do-rysunku",
      "autor": "Lukasz Cecelon",
      "dataWeryfikacji": "2026-08-03",
      "zrodla": [
        "din-471",
        "katalog-producenta-din-471"
      ],
      "zakres": "DIN 471, rowek na wale, tylko srednice ujete w tabeli.",
      "komunikat": "Wartosci w tym pliku sa przykladowe i wymagaja weryfikacji ze zrodlem przed publikacja."
    },
    {
      "type": "rysunekParametryczny",
      "id": "rysunek-rowka-na-wale",
      "typGeometrii": "walek-z-rowkiem-obwodowym",
      "wariant": "rowek-zewnetrzny",
      "sterowanie": {
        "tabela": "wymiary-rowka-din-471",
        "domyslnyRekord": {
          "d1": 20
        }
      },
      "etykiety": [
        {
          "klucz": "d1",
          "tekst": "d1",
          "opis": "srednica nominalna walu"
        },
        {
          "klucz": "d2",
          "tekst": "d2",
          "opis": "srednica dna rowka"
        },
        {
          "klucz": "m",
          "tekst": "m",
          "opis": "szerokosc rowka"
        },
        {
          "klucz": "r",
          "tekst": "r",
          "opis": "promien lub faza krawedzi rowka"
        }
      ],
      "podpis": "Schemat przekroju walu z rowkiem obwodowym pod pierscien osadczy zewnetrzny. Oznaczenia odpowiadaja kolumnom tabeli."
    },
    {
      "type": "tabelaDanych",
      "id": "wymiary-rowka-din-471",
      "tytul": "Przykladowe wymiary rowka pod pierscien osadczy na wale",
      "klasaTresci": "normatywna",
      "trybUzycia": "wymiar-do-rysunku",
      "jednostka": "mm",
      "domyslneZrodlo": "din-471",
      "domyslnaDataWeryfikacji": "2026-08-03",
      "uwagaWartosci": "Wartosci wymiarowe w wierszach sa PRZYKLADOWE i wymagaja weryfikacji ze zrodlem. Nie traktowac jako sprawdzonej tabeli normatywnej.",
      "kolumny": [
        {
          "klucz": "d1",
          "naglowek": "d1",
          "opis": "srednica nominalna walu",
          "typ": "liczba",
          "jednostka": "mm",
          "wymagana": true
        },
        {
          "klucz": "d2",
          "naglowek": "d2",
          "opis": "srednica dna rowka",
          "typ": "liczba",
          "jednostka": "mm",
          "wymagana": true
        },
        {
          "klucz": "m",
          "naglowek": "m",
          "opis": "szerokosc rowka",
          "typ": "liczba",
          "jednostka": "mm",
          "wymagana": true
        },
        {
          "klucz": "r",
          "naglowek": "r max",
          "opis": "maksymalny promien lub faza krawedzi rowka",
          "typ": "liczba",
          "jednostka": "mm",
          "wymagana": false
        }
      ],
      "wiersze": [
        {
          "d1": 10,
          "d2": 9.6,
          "m": 1.1,
          "r": 0.1,
          "statusWartosci": "przykladowe-do-weryfikacji",
          "zrodlo": "din-471",
          "dataWeryfikacji": "2026-08-03"
        },
        {
          "d1": 12,
          "d2": 11.5,
          "m": 1.1,
          "r": 0.1,
          "statusWartosci": "przykladowe-do-weryfikacji",
          "zrodlo": "din-471",
          "dataWeryfikacji": "2026-08-03"
        },
        {
          "d1": 15,
          "d2": 14.3,
          "m": 1.1,
          "r": 0.1,
          "statusWartosci": "przykladowe-do-weryfikacji",
          "zrodlo": "din-471",
          "dataWeryfikacji": "2026-08-03",
          "kontrola": {
            "status": "probka-kontrolna-do-sprawdzenia",
            "drugieZrodlo": "katalog-producenta-din-471"
          }
        },
        {
          "d1": 20,
          "d2": 19.0,
          "m": 1.3,
          "r": 0.2,
          "statusWartosci": "przykladowe-do-weryfikacji",
          "zrodlo": "din-471",
          "dataWeryfikacji": "2026-08-03",
          "kontrola": {
            "status": "probka-kontrolna-do-sprawdzenia",
            "drugieZrodlo": "katalog-producenta-din-471"
          }
        },
        {
          "d1": 25,
          "d2": 23.9,
          "m": 1.3,
          "r": 0.2,
          "statusWartosci": "przykladowe-do-weryfikacji",
          "zrodlo": "din-471",
          "dataWeryfikacji": "2026-08-03"
        },
        {
          "d1": 30,
          "d2": 28.6,
          "m": 1.6,
          "r": 0.3,
          "statusWartosci": "przykladowe-do-weryfikacji",
          "zrodlo": "din-471",
          "dataWeryfikacji": "2026-08-03"
        },
        {
          "d1": 40,
          "d2": 38.0,
          "m": 1.85,
          "r": 0.3,
          "statusWartosci": "przykladowe-do-weryfikacji",
          "zrodlo": "din-471",
          "dataWeryfikacji": "2026-08-03"
        },
        {
          "d1": 50,
          "d2": 47.0,
          "m": 2.15,
          "r": 0.5,
          "statusWartosci": "przykladowe-do-weryfikacji",
          "zrodlo": "din-471",
          "dataWeryfikacji": "2026-08-03",
          "kontrola": {
            "status": "probka-kontrolna-do-sprawdzenia",
            "drugieZrodlo": "katalog-producenta-din-471"
          }
        }
      ]
    },
    {
      "type": "blokDecyzji",
      "klasaTresci": "komentarz-praktyka",
      "trybUzycia": "komentarz-praktyka",
      "tytul": "Kiedy stosowac rowek pod pierscien osadczy na wale",
      "kiedyStosowac": [
        "Gdy potrzebujesz prostego, taniego i rozlacznego zabezpieczenia osiowego elementu osadzonego na wale.",
        "Gdy sila osiowa jest umiarkowana i zostala sprawdzona wzgledem pierscienia, materialu walu oraz geometrii rowka.",
        "Gdy masz dostep do montazu i demontazu pierscienia szczypcami.",
        "Gdy dopuszczasz lokalne oslabienie walu rowkiem."
      ],
      "kiedyNieStosowac": [
        "Gdy utrata zabezpieczenia moze spowodowac awarie krytyczna.",
        "Gdy obciazenie osiowe jest duze i lepszy bedzie stopien walu, nakretka, tuleja dystansowa albo inne zabezpieczenie.",
        "Gdy rowek wypada w miejscu wysokich naprezen zmiennych.",
        "Gdy nie ma miejsca na narzedzie montazowe albo kontrola poprawnego osadzenia pierscienia bedzie utrudniona."
      ],
      "typoweBledy": [
        "Pomylenie DIN 471 dla walu z DIN 472 dla otworu.",
        "Przepisanie samej szerokosci rowka bez sprawdzenia srednicy dna rowka.",
        "Brak sprawdzenia oslabienia przekroju walu przez rowek.",
        "Za duzy promien na dnie lub krawedzi rowka wzgledem wymagan pierscienia.",
        "Brak miejsca na zalozenie albo zdjecie pierscienia w gotowym zespole."
      ],
      "coSprawdzicPrzedRysunkiem": [
        "Czy to na pewno pierscien zewnetrzny na wale.",
        "Czy srednica d1 miesci sie w opublikowanym zakresie tabeli.",
        "Czy wybrany pierscien producenta jest zgodny z DIN 471.",
        "Czy obciazenie osiowe jest dopuszczalne dla pierscienia i rowka.",
        "Czy rowek nie oslabia krytycznego przekroju walu."
      ],
      "zastrzezenie": "Ten blok jest komentarzem praktycznym autora. Nie zastepuje sprawdzenia normy, katalogu producenta ani obliczen dla elementow krytycznych."
    },
    {
      "type": "tekst",
      "body": "## Co sprawdzic przed wpisaniem wymiaru na rysunku\n\nNajpierw upewnij sie, ze dobierasz rowek dla pierscienia zewnetrznego na wale, a nie dla pierscienia w otworze. Potem sprawdz, czy srednica walu miesci sie w zakresie tabeli i czy rowek nie wypada w miejscu krytycznym naprezeniowo."
    }
  ]
}
```

## 3. Lista prymitywow SVG

Minimalny zestaw na krok 1:

```ts
type SvgPoint = {
  x: number;
  y: number;
};

type SvgBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};
```

```ts
type RysunekTechnicznyProps = {
  width: number;
  height: number;
  viewBox?: string;
  title?: string;
  children: React.ReactNode;
};
```

Kontener SVG z definicjami markerow, wspolnymi klasami i `viewBox`.

```ts
type WalPrzekrojProps = {
  x: number;
  y: number;
  dlugosc: number;
  srednica: number;
  className?: string;
};
```

Prosty przekroj walu jako prostokatna sylwetka z osia symetrii po srodku.

```ts
type RowekObwodowyNaWaleProps = {
  x: number;
  y: number;
  szerokosc: number;
  srednicaWalu: number;
  srednicaDna: number;
  promien?: number;
  className?: string;
};
```

Wyciecie rowka obwodowego na widoku przekrojowym walu. Dla MVP moze rysowac
geometrie schematycznie, bez dokladnej skali promienia.

```ts
type LiniaOsiProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  className?: string;
};
```

Linia osi walu, kreskowana lub punktowo-kreskowa.

```ts
type LiniaPomocniczaProps = {
  od: SvgPoint;
  do: SvgPoint;
  className?: string;
};
```

Linia wyniesienia od geometrii do wymiaru.

```ts
type LiniaWymiarowaProps = {
  od: SvgPoint;
  do: SvgPoint;
  strzalki?: "obie" | "poczatek" | "koniec" | "brak";
  className?: string;
};
```

Sama linia wymiarowa ze strzalkami. Marker strzalki powinien byc zdefiniowany
raz w `RysunekTechniczny`.

```ts
type WymiarPoziomyProps = {
  x1: number;
  x2: number;
  y: number;
  offset?: number;
  etykieta: string;
  opis?: string;
  className?: string;
};
```

Wymiar poziomy do szerokosci rowka `m`.

```ts
type WymiarPionowyProps = {
  x: number;
  y1: number;
  y2: number;
  offset?: number;
  etykieta: string;
  opis?: string;
  className?: string;
};
```

Wymiar pionowy do srednic `d1` i `d2`.

```ts
type EtykietaSvgProps = {
  x: number;
  y: number;
  tekst: string;
  anchor?: "start" | "middle" | "end";
  baseline?: "auto" | "middle" | "hanging";
  opis?: string;
  className?: string;
};
```

Tekst etykiety wymiaru z opcjonalnym opisem dla dostepnosci.

```ts
type WynoszenieProps = {
  od: SvgPoint;
  do: SvgPoint;
  tekst: string;
  anchor?: "start" | "end";
  className?: string;
};
```

Leader line do oznaczenia promienia lub fazy `r`.

```ts
type PromienLubFazaProps = {
  punkt: SvgPoint;
  tekst: string;
  kierunek?: "lewo-gora" | "prawo-gora" | "lewo-dol" | "prawo-dol";
  className?: string;
};
```

Mały prymityw opisu `r` przy krawedzi rowka. W MVP moze skladac sie z
`Wynoszenie` i `EtykietaSvg`.

```ts
type KreskowaniePrzekrojuProps = {
  box: SvgBox;
  spacing?: number;
  angle?: number;
  className?: string;
};
```

Opcjonalne kreskowanie przekroju. Nie jest konieczne dla samej tabeli, ale
pomaga utrzymac wyglad rysunku technicznego.

Minimalne zlozenie tematu:

```tsx
<RysunekTechniczny width={720} height={360} title="Rowek pod pierscien osadczy na wale">
  <WalPrzekroj x={80} y={120} dlugosc={560} srednica={120} />
  <RowekObwodowyNaWale x={340} y={120} szerokosc={48} srednicaWalu={120} srednicaDna={92} />
  <LiniaOsi x1={60} y1={180} x2={660} y2={180} />
  <WymiarPionowy x={110} y1={120} y2={240} etykieta="d1" />
  <WymiarPionowy x={380} y1={134} y2={226} etykieta="d2" />
  <WymiarPoziomy x1={340} x2={388} y={92} etykieta="m" />
  <PromienLubFaza punkt={{ "x": 340, "y": 134 }} tekst="r" kierunek="lewo-gora" />
</RysunekTechniczny>
```
