# Runda 5: kontratak i schemat danych (Codex)

Przeczytalem rundy 1-4 po kolei i sprawdzilem repo. Istotne fakty techniczne:

- obecne pliki tresci siedza w `content/**/*.json`, a nie w MDX,
- blog ma angielskie pola glowne: `title`, `seoTitle`, `description`, `date`, `dateModified`, `image`, `tags`, `related`, `faq`, `howTo`, `blocks`,
- jednoczesnie zagniezdzone pola tresciowe sa po polsku: `pytanie`, `odpowiedz`, `nazwa`, `opis`, `kroki`, `tresc`, `wyrownanie`, `podpis`,
- Wiedza jest przygotowana w generatorze, ale `content/wiedza` jeszcze realnie nie istnieje,
- `BlockRenderer.js` obsluguje dzisiaj: `tekst`, `obraz`, `rysunek`, `galeria`, `tabela`, `wzor`,
- `tabela` to dzis markdown, wiec dla danych normatywnych potrzebny jest nowy blok danych, nie rozciaganie markdowna.

Wniosek dla punktu 3: w przykładowym JSON-ie zostawiam konwencje Docusaurusa i generatora tam, gdzie juz istnieja, ale nowe pola dziedzinowe nazywam po polsku.

## 1. Atak na Segery jako pierwszy temat

Claude ma racje tylko pod jednym warunkiem: jesli pierwszy temat ma przetestowac cala architekture bazy wiedzy, a nie wygrac ruch lub najszybciej dac wartosc uzytkownikowi.

Jesli liczymy uczciwie sam temat jako temat, momenty dokrecania wygrywaja.

### RICE po korekcie zalozen

W rundzie 4 Segery mialy zbyt optymistyczny effort. `14 h` jest realne tylko dla jednej tabeli i jednego prostego SVG bez porzadnego rezimu danych. Pelny temat "rowki pod pierscienie osadcze" prawie na pewno oznacza:

- DIN 471, czyli rowek na wale,
- DIN 472, czyli rowek w otworze, bo uzytkownik bedzie tego oczekiwal pod jednym haslem,
- dwa warianty rysunku albo jeden komponent z trybem `zewnetrzny` i `wewnetrzny`,
- dane zakresu,
- karta zaufania,
- walidator probek,
- tekst decyzji i typowych bledow.

Moja korekta RICE:

| Temat | R | I | C | E | RICE |
|---|:--:|:--:|:--:|:--:|:--:|
| Momenty dokrecania srub | 9 | 3 | 0,80 | 18 | 1,20 |
| Rowki pod pierscienie osadcze, tylko walek DIN 471 | 6 | 3 | 0,80 | 16 | 0,90 |
| Rowki pod pierscienie osadcze, walek plus otwor DIN 471/472 | 7 | 3 | 0,75 | 24 | 0,66 |
| Rowki pod wpusty | 6 | 3 | 0,85 | 18 | 0,85 |

Dlaczego Confidence spada dla Segerow: nie przez trudnosc geometrii, tylko przez prawdziwosc danych. Trzeba przepisywac wiele wartosci wymiarowych i tolerancyjnych. Testy ochronia przed pozniejsza zmiana, ale nie przed zlym przepisaniem na starcie.

Dlaczego Effort rosnie: pierwszy temat niesie koszt infrastruktury rysunku, tabeli danych, walidacji i karty zaufania. Claude wlicza to troche za nisko.

### Wniosek

Jesli celem pierwszego tematu jest "najlepszy stosunek ruchu do pracy", wybralbym momenty dokrecania. Maja wiekszy popyt, brak komponentu rysunku, prostszy pierwszy ekran i latwiejsza produkcje tresci.

Jesli celem pierwszego tematu jest "sprawdzic, czy baza wiedzy ma sens jako system: dane, tabela HTML, karta zaufania, SVG, zakres i walidacja", Segery sa lepsze. Nie dlatego, ze maja najwyzszy RICE, tylko dlatego, ze sa testem architektury.

To trzeba nazwac wprost. Segery nie sa najlepszym tematem biznesowo. Sa najlepszym tematem techniczno-produktowym do pierwszego pionowego wycinka. Moment dokrecania powinien byc temat numer dwa albo nawet rownolegly temat bez rysunku, jezeli celem jest szybciej sprawdzic Search Console.

Moja rekomendacja po ataku:

1. Pierwszy pionowy wycinek: `rowek pod pierscien osadczy na wale`, tylko DIN 471, zakres jawnie ograniczony.
2. Nie nazywac go jeszcze pelnym tematem "rowki pod pierscienie osadcze", jesli nie ma DIN 472.
3. Drugi temat: `momenty dokrecania srub`, bo sprawdzi popyt i format bazy bez kosztu SVG.
4. Trzeci temat: `rowek pod pierscien osadczy w otworze`, dopiero wtedy testujemy ponowne uzycie komponentu.

To jest bardziej uczciwe niz obietnica, ze od razu robimy Segery jako komplet.

## 2. Atak na komponent na typ geometrii

Claude ma racje co do kierunku: komponent na typ geometrii jest lepszy niz komponent na kazdy temat. Ale liczba "szesc typow" jest mysleniem zyczeniowym, jesli mowimy o sensownej bazie wiedzy konstruktora maszyn, a nie tylko o pierwszych kilku tematach elementow standardowych.

Szesc typow pokrywa dobry start, nie pokrywa sensownej bazy.

### Minimalna uczciwa mapa typow geometrii

Dla bazy praktycznej, ktora obejmuje elementy maszyn, otwory, walowane detale, blachy, spawanie i oznaczenia, widze co najmniej 18 rodzin komponentow rysunkowych.

| Nr | Typ geometrii | Przyklady tematow |
|---:|---|---|
| 1 | Walek z rowkiem obwodowym | pierscien osadczy na wale, rowek pod uszczelnienie, rowek odciazajacy |
| 2 | Otwor z rowkiem obwodowym | pierscien osadczy w otworze, osadzenie lozyska z zabezpieczeniem |
| 3 | Stopien walka z podcieciem | podciecia DIN 509, przejscia srednic, miejsce pod szlifowanie |
| 4 | Nakielek na czole walka | nakielki A/B/R, przygotowanie do toczenia |
| 5 | Otwor gwintowany nieprzelotowy | otwor pod gwint, glebokosc wiercenia, faza, dno otworu |
| 6 | Otwor gwintowany przelotowy | otwor pod gwint przelotowy, fazowanie, oznaczenie gwintu |
| 7 | Gwint zewnetrzny na walku | faza poczatkowa, podciecie gwintu, dlugosc gwintu |
| 8 | Rowek pod wpust na walku | wpust pryzmatyczny, glebokosc rowka, promien naroza |
| 9 | Rowek pod wpust w piascie | rowek w otworze, przeciaganie, tolerancja rowka |
| 10 | Otwor gladki z faza | otwory pod sruby, otwory montazowe, gratowanie |
| 11 | Otwor z pogłębieniem walcowym | sruby imbusowe, podkladki, gniazda srub |
| 12 | Otwor z pogłębieniem stozkowym | sruby stozkowe, fazy 90/120 stopni |
| 13 | Para otwor plus pasowanie | otwor H7, walek g6, osadzenie lozysk, tuleje |
| 14 | Gniazdo lozyska z oporem | srednica osadzenia, ramie oporowe, promien przejscia |
| 15 | Rowek pod O-ring, radialny | uszczelnienia na walku i w otworze |
| 16 | Rowek pod O-ring, czolowy | uszczelnienie pokrywy, rowek prostokatny na czole |
| 17 | Blacha gietą | promien giecia, naddatek, minimalna polka, odleglosc otworu od giecia |
| 18 | Spoina i przygotowanie krawedzi | spoina pachwinowa, ukosowanie, szczelina, przetop |
| 19 | Tolerancja geometryczna jako ramka i baza | pozycja, prostopadlosc, bicie, bazy A/B/C |
| 20 | Chropowatosc i oznaczenie powierzchni | symbol, kierunkowosc, obrobka, Ra/Rz |
| 21 | Stozek lub sfazowanie walka/otworu | stozki centrujace, fazy montazowe, natarcia |
| 22 | Otwor fasolkowy i otwor regulacyjny | regulacja, montaz, tolerancje polozenia |
| 23 | Sworzen, zawleczka, podkladka, otwor poprzeczny | zabezpieczenia osiowe, otwory pod zawleczki |
| 24 | Przekroj profilu i rury | profile zamkniete, grubosc scianki, promienie narozy |

Da sie to grupowac. Mozna powiedziec, ze wiele z nich to warianty "otworu", "walka" albo "rowka". Ale komponent rysunkowy to nie abstrakcyjna klasa CAD. Komponent musi miec czytelne etykiety, strzalki, odsuniecia, priorytety tekstu i zachowanie na mobile. Pod tym wzgledem `otwor gwintowany nieprzelotowy`, `pogłębienie walcowe` i `rowek pod O-ring` to inne komponenty, nawet jesli wszystkie maja okrag w rzucie.

### Ile typow trzeba naprawde napisac

Dla MVP: 1 typ.

Dla pierwszych 5-8 sensownych tematow: 4-6 typow. Tu Claude ma racje, ale tylko dla bardzo waskiego zakresu startowego.

Dla pierwszej uzytecznej bazy konstruktora maszyn, powiedzmy 25-40 tematow: 12-16 typow.

Dla dojrzalej bazy, ktora obejmuje elementy standardowe, obrobke, blachy, spawanie, pasowania i oznaczenia: 20-24 typy plus warianty.

Czyli szesc to za malo jako teza architektoniczna. Szesc wystarczy jako backlog pierwszego etapu.

### Korekta architektury

Nie robilbym komponentu "na temat", ale tez nie zakladalbym, ze da sie wszystko zamknac w kilku typach. Lepszy podzial:

1. `komponent bazowy`: linie wymiarowe, strzalki, etykiety, przekreslenia, kreskowanie, style.
2. `komponent geometrii`: walek z rowkiem, otwor z pogłębieniem, blacha gietą itd.
3. `konfiguracja tematu`: ktore wymiary pokazac, jakie etykiety, ktory rekord tabeli steruje rysunkiem, jaki podpis.

To oznacza, ze koszt pierwszego komponentu jest wysoki, ale koszt kolejnego z tej samej rodziny spada. Jednak nie spada do zera i nie wolno tego obiecywac.

## 3. Fragment realnego JSON-a

Ponizej fragment pliku docelowo w stylu `content/wiedza/elementy/rowek-pod-pierscien-osadczy-na-wale.json`.

Zostawiam `title`, `seoTitle`, `description`, `date`, `dateModified`, `tags`, `related`, `blocks`, bo to pasuje do bloga i obecnego generatora. Nowe pola dziedzinowe sa po polsku. Bloki sa zgodne z obecnym wzorcem `type`, ale dodaja nowe typy, ktore trzeba dopisac w `BlockRenderer.js`.

```json
{
  "title": "Rowek pod pierścień osadczy na wale",
  "seoTitle": "Rowek pod pierścień osadczy na wale DIN 471 - wymiary",
  "description": "Wymiary rowka pod pierścień osadczy sprężynujący zewnętrzny na wale: średnica rowka, szerokość rowka i podstawowy zakres stosowania.",
  "date": "2026-08-03",
  "dateModified": "2026-08-03",
  "tags": [
    "elementy maszyn",
    "elementy standardowe",
    "pierścienie osadcze"
  ],
  "related": [],
  "synonimy": [
    "seger",
    "pierścień segera",
    "pierścień osadczy",
    "pierścień osadczy zewnętrzny",
    "rowek pod segera",
    "rowek pod pierścień osadczy",
    "DIN 471",
    "zabezpieczenie osiowe wału"
  ],
  "normy": [
    "DIN 471"
  ],
  "zakres": {
    "opis": "Rowki pod pierścienie osadcze sprężynujące zewnętrzne na wałach według DIN 471, dla średnic wału od 3 mm do 100 mm w zakresie opracowanym w tej tabeli.",
    "srednicaNominalna": {
      "symbol": "d1",
      "jednostka": "mm",
      "od": 3,
      "do": 100
    },
    "obejmuje": [
      "rowek obwodowy na wale",
      "dobór podstawowych wymiarów rowka",
      "szerokość rowka m",
      "średnica dna rowka d2",
      "promień lub fazę krawędzi rowka r"
    ],
    "nieObejmuje": [
      "doboru samego pierścienia pod obciążenie osiowe",
      "sprawdzenia wytrzymałości wału w osłabionym przekroju",
      "rowków pod pierścienie osadcze w otworach według DIN 472",
      "nietypowych pierścieni producentów poza zakresem normy"
    ]
  },
  "zrodla": [
    {
      "id": "din-471",
      "typ": "norma",
      "nazwa": "DIN 471",
      "opis": "Pierścienie osadcze sprężynujące zewnętrzne na wały. Źródło traktowane jako odniesienie normatywne do wymiarów.",
      "dostep": "do sprawdzenia w oficjalnej normie lub katalogu producenta zgodnym z DIN 471"
    },
    {
      "id": "katalog-producenta-probka",
      "typ": "katalog",
      "nazwa": "Katalog producenta pierścieni osadczych zgodnych z DIN 471",
      "opis": "Źródło pomocnicze do kontroli wybranych wartości z tabeli.",
      "dostep": "publiczny katalog producenta"
    }
  ],
  "weryfikacja": {
    "status": "w trakcie weryfikacji",
    "data": "2026-08-03",
    "autor": "Łukasz Cecelon",
    "poziomRyzyka": "wysoki",
    "notatka": "Przed publikacją wymagane sprawdzenie próbek kontrolnych z drugim źródłem. Testy automatyczne pilnują stabilności danych, nie potwierdzają prawdziwości normy."
  },
  "blocks": [
    {
      "type": "kartaZaufania",
      "status": "w trakcie weryfikacji",
      "autor": "Łukasz Cecelon",
      "dataWeryfikacji": "2026-08-03",
      "zrodla": [
        "din-471",
        "katalog-producenta-probka"
      ],
      "komunikat": "Dane normatywne wymagają sprawdzenia z aktualną normą lub katalogiem producenta przed użyciem w dokumentacji krytycznej."
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
          "opis": "średnica nominalna wału"
        },
        {
          "klucz": "d2",
          "tekst": "d2",
          "opis": "średnica dna rowka"
        },
        {
          "klucz": "m",
          "tekst": "m",
          "opis": "szerokość rowka"
        },
        {
          "klucz": "r",
          "tekst": "r",
          "opis": "promień lub faza krawędzi rowka"
        }
      ],
      "podpis": "Schemat rowka obwodowego pod pierścień osadczy zewnętrzny na wale. Oznaczenia odpowiadają kolumnom tabeli."
    },
    {
      "type": "tabelaDanych",
      "id": "wymiary-rowka-din-471",
      "tytul": "Wymiary rowka pod pierścień osadczy na wale",
      "klasaTresci": "normatywna",
      "jednostka": "mm",
      "domyslneZrodlo": "din-471",
      "domyslnaDataWeryfikacji": "2026-08-03",
      "kolumny": [
        {
          "klucz": "d1",
          "naglowek": "d1",
          "opis": "średnica nominalna wału",
          "typ": "liczba",
          "wymagana": true
        },
        {
          "klucz": "d2",
          "naglowek": "d2",
          "opis": "średnica dna rowka",
          "typ": "liczba",
          "wymagana": true
        },
        {
          "klucz": "m",
          "naglowek": "m",
          "opis": "szerokość rowka",
          "typ": "liczba",
          "wymagana": true
        },
        {
          "klucz": "r",
          "naglowek": "r max",
          "opis": "maksymalny promień lub faza krawędzi rowka",
          "typ": "liczba",
          "wymagana": false
        }
      ],
      "wiersze": [
        {
          "d1": 10,
          "d2": 9.6,
          "m": 1.1,
          "r": 0.1,
          "zrodlo": "din-471",
          "dataWeryfikacji": "2026-08-03"
        },
        {
          "d1": 12,
          "d2": 11.5,
          "m": 1.1,
          "r": 0.1,
          "zrodlo": "din-471",
          "dataWeryfikacji": "2026-08-03"
        },
        {
          "d1": 15,
          "d2": 14.3,
          "m": 1.1,
          "r": 0.1,
          "zrodlo": "din-471",
          "dataWeryfikacji": "2026-08-03",
          "kontrola": {
            "status": "probka kontrolna",
            "drugieZrodlo": "katalog-producenta-probka"
          }
        },
        {
          "d1": 20,
          "d2": 19.0,
          "m": 1.3,
          "r": 0.2,
          "zrodlo": "din-471",
          "dataWeryfikacji": "2026-08-03",
          "kontrola": {
            "status": "probka kontrolna",
            "drugieZrodlo": "katalog-producenta-probka"
          }
        }
      ]
    },
    {
      "type": "decyzjaPraktyka",
      "klasaTresci": "subiektywna",
      "tytul": "Kiedy stosować pierścień osadczy na wale",
      "kiedyStosowac": [
        "Gdy potrzebujesz prostego zabezpieczenia osiowego elementu osadzonego na wale.",
        "Gdy akceptujesz osłabienie wału rowkiem i masz miejsce na montaż pierścienia.",
        "Gdy demontaż ma być możliwy bez niszczenia elementu zabezpieczającego."
      ],
      "kiedyNieStosowac": [
        "Gdy obciążenie osiowe jest duże i rowek znacząco osłabia wał.",
        "Gdy nie masz dostępu narzędziem montażowym do założenia lub zdjęcia pierścienia.",
        "Gdy element pracuje w warunkach, w których zgubienie pierścienia byłoby awarią krytyczną."
      ],
      "typoweBledy": [
        "Przepisanie wymiaru dla pierścienia zewnętrznego DIN 471 do rowka w otworze DIN 472.",
        "Brak sprawdzenia promienia naroża rowka względem narzędzia i koncentracji naprężeń.",
        "Założenie, że sam dobór rowka wystarcza do potwierdzenia nośności zabezpieczenia osiowego."
      ],
      "zastrzezenie": "To jest komentarz praktyczny autora, a nie treść normatywna. Dla elementów krytycznych sprawdź obciążenie osiowe, materiał wału i zalecenia producenta pierścienia."
    },
    {
      "type": "tekst",
      "body": "## Co sprawdzić przed wpisaniem wymiaru na rysunku\n\nNajpierw upewnij się, że dobierasz rowek dla pierścienia zewnętrznego na wale, a nie dla pierścienia w otworze. Potem sprawdź, czy średnica wału mieści się w zakresie tabeli i czy rowek nie wypada w miejscu krytycznym naprężeniowo."
    }
  ]
}
```

Wazna uwaga: wartosci w przykladowych wierszach sa demonstracyjne dla schematu. Przed publikacja nie wolno ich traktowac jako zatwierdzonej tabeli DIN 471 bez weryfikacji z aktualnym zrodlem. Fragment pokazuje format danych gotowy do implementacji, nie gotowa norme.

## 4. Czego nadal brakuje w dyskusji

### 1. Polityka praw autorskich i licencji danych

Watek mowi "nie przepisywac tabeli z podrecznika", ale nie rozstrzyga najtrudniejszego: co wolno legalnie opublikowac z normy. Sama informacja techniczna i uklad tabeli to nie zawsze ten sam problem. Przy DIN/ISO trzeba ustalic praktyczna polityke:

- czy publikujemy pelne tabele wymiarowe,
- czy publikujemy tylko zakresy i wybrane dane opracowane samodzielnie,
- jak opisujemy zrodlo bez reprodukowania chronionego ukladu,
- czy bezpieczniejsze sa katalogi producentow z publicznymi danymi.

Bez tego baza moze umrzec nie przez blad techniczny, tylko przez niepewnosc prawna.

### 2. Proces pozyskania danych

Mamy architekture pliku, ale nie mamy procesu wprowadzania danych. To slepa plamka. Dla jednego tematu mozna recznie wpisac 30 wierszy. Dla dwudziestu tematow to bedzie najwiekszy koszt projektu.

Brakuje decyzji:

- czy dane sa wpisywane recznie,
- czy powstaja najpierw w arkuszu,
- czy robimy import CSV do JSON,
- jak oznaczamy probki kontrolne,
- kto i kiedy robi druga weryfikacje.

Moja ocena: bez prostego arkusza roboczego albo skryptu importu autor zacznie walczyc z JSON-em przy duzych tabelach.

### 3. Strategia odpowiedzialnosci za dane wysokiego ryzyka

Karta zaufania to dobry kierunek, ale jeszcze nie wystarcza. Trzeba rozroznic dane, ktore mozna pokazac jako sciage, od danych, ktore moga byc potraktowane jako instrukcja projektowa.

Momenty dokrecania sa tu czerwonym alarmem. Zaleza od klasy sruby, materialu, tarcia, smarowania, powloki, rodzaju podkladki, sposobu montazu i wymagan producenta. To temat z wysokim ruchem, ale tez wysokim ryzykiem uproszczenia. Moze byc lepszy SEO, ale gorszy reputacyjnie niz Segery.

Brakuje pola lub reguly typu `trybUzycia`: `wymiar do rysunku`, `punkt startowy`, `wymaga sprawdzenia u producenta`, `tylko komentarz praktyczny`.

### 4. Brakuje miernika sukcesu pierwszych trzech tematow

Runda 2 wspomina Search Console po 6 miesiacach, ale to za grubo. Trzeba ustalic, co sprawdzamy po kazdym temacie i po kwartale.

Minimalne metryki:

- czy temat buduje sie bez JS-only danych,
- czy tabela jest widoczna w HTML,
- ile minut zajmuje znalezienie wartosci przez uzytkownika testowego,
- ile czasu zajmuje dodanie kolejnego tematu tego samego typu,
- ile wejsc z Google po 30, 90 i 180 dniach,
- jakie frazy przynosza wejscia,
- czy ktos kliknal zgloszenie bledu lub kontakt.

Bez tych metryk dyskusja o MVP zostanie opinia, nie eksperymentem.

### 5. Brakuje projektu mobile dla tabel

Wszyscy mowimy "tabela HTML", ale nie rozstrzygnelismy najgorszego UX: szerokie tabele techniczne na telefonie. To nie jest detal CSS. Konstruktor moze otworzyc strone przy maszynie albo w biurze na laptopie.

Trzeba zdecydowac, czy mobilnie:

- tabela przewija sie poziomo,
- rekord wybranej srednicy pokazuje sie jako karta,
- kolumny da sie ukryc,
- rysunek i tabela sa zsynchronizowane selektorem rozmiaru.

Dla Segerow to kluczowe, bo tabela wymiarowa bedzie szeroka szybciej, niz sie wydaje.

### 6. Brakuje strategii laczenia tematow

Baza konstruktora nie bedzie uzywana liniowo. Ktos wejdzie w Segera i za chwile bedzie potrzebowal pasowania, tolerancji rowka, materialu, promienia, lozyska albo sposobu zabezpieczenia osiowego.

Brakuje modelu relacji:

- `powiazaneTematy`,
- `nastepnyKrok`,
- `czestoMyliSieZ`,
- `alternatywy`,
- `wymagaSprawdzenia`.

Obecne `related` z bloga jest za slabe, bo nie mowi, jaka jest relacja. Dla Wiedzy relacja jest czescia decyzji projektowej.

### 7. Brakuje decyzji o pierwszym poziomie kompletności

Mowimy "jawny zakres", ale nie ma zasady publikacji. Czy publikujemy temat, gdy ma 10 najpopularniejszych srednic, czy dopiero pelny zakres? Czy wolno pokazac `status: szkic` publicznie? Czy temat bez drugiego zrodla moze wejsc na produkcje?

Moja twarda propozycja:

- publicznie tylko `status: zweryfikowane` albo `status: ograniczone`,
- `status: szkic` nigdy nie renderuje sie w publicznym indeksie,
- zakres ograniczony jest dopuszczalny, ale musi byc widoczny w H1 albo pierwszym ekranie,
- rekord bez zrodla nie przechodzi builda.

## Konkluzja po rundzie 5

Segery sa dobrym pierwszym testem architektury, ale nie nalezy udawac, ze wygrywaja klasyczny RICE z momentami dokrecania. Wygrywaja jako pionowy wycinek z rysunkiem i tabela danych. Przegrywaja jako najszybszy temat ruchu.

Teza "komponent na typ geometrii" jest dobra, ale liczba szesc jest za niska poza MVP. Realnie trzeba myslec o 12-16 typach dla pierwszej uzytecznej bazy i 20-24 dla dojrzalszej. Dlatego architektura musi miec male wspolne prymitywy SVG, a nie wiare w kilka cudownych komponentow.

Najwieksza slepa plamka po czterech rundach to nie React, SVG ani SEO. To proces danych: legalnosc zrodel, wprowadzanie, weryfikacja, status publikacji i odpowiedzialnosc za uzycie. Jesli to nie zostanie opisane, technicznie poprawna baza nadal moze byc zawodowo ryzykowna.
