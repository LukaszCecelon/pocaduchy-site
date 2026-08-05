# Analiza wykonalnosci: narzedzie do analizy CAD i rysunkow 2D na pocaduchy.pl

Data analizy: 5 sierpnia 2026.

Punkt wyjscia: poCADuchy dziala jako strona statyczna na GitHub Pages. Nie ma
backendu, serwera, bazy ani miejsca, gdzie mozna bezpiecznie przetwarzac pliki po
stronie serwera. Kazde narzedzie CAD musi dzialac w przegladarce uzytkownika,
na pliku wczytanym przez File API. WebAssembly jest dopuszczalne, ale musi byc
ladowane leniwie, tylko na stronie narzedzia.

Najkrotszy wniosek: da sie zbudowac sensowne narzedzia, ale nie da sie zbudowac
"automatycznego eksperta CAD", ktory wiarygodnie analizuje wszystkie modele
i rysunki. Najlepszy zakres to:

1. analiza siatek 3D pod druk 3D: STL, OBJ, 3MF,
2. kalkulator ciecia z DXF 2D,
3. przegladarka i orientacyjny analizator STEP oparty o OpenCascade WASM.

Nie nalezy obiecywac automatycznej oceny poprawnosci dokumentacji technicznej,
analizy natywnych plikow SolidWorks/Inventor/CATIA ani pewnej obslugi DWG bez
licencjonowanego konwertera.

## Zrodla techniczne i rozmiary sprawdzone w trakcie analizy

Metadane paczek sprawdzone przez `npm view` 5 sierpnia 2026:

| Biblioteka | Wersja | Licencja | Rozmiar paczki po rozpakowaniu |
|---|---:|---|---:|
| `three` | 0.185.1 | MIT | 23.2 MB |
| `three-stdlib` | 2.36.1 | MIT | 26.4 MB |
| `three-mesh-bvh` | 0.9.14 | MIT | 2.3 MB |
| `dxf-parser` | 1.1.2 | MIT | 0.19 MB |
| `@tarikjabiri/dxf` | 2.8.9 | MIT | 0.29 MB |
| `pdfjs-dist` | 6.2.108 | Apache-2.0 | 34.5 MB |
| `occt-import-js` | 0.0.23 | LGPL-2.1 | 11.6 MB |
| `opencascade.js` | 1.1.1 | LGPL-2.1-only | 66.7 MB |
| `three-mf` | 1.1.2 | MIT | 0.24 MB |
| `jszip` | 3.10.1 | MIT lub GPL-3.0-or-later | 0.76 MB |
| `@mlightcad/libredwg-web` | 0.7.9 | GPL-3.0 | 11.2 MB |
| `@flyfish-dev/cad-viewer` | 0.8.0 | AGPL-3.0-only | 13.1 MB |
| `dwgdxf` | 2.0.1 | MIT | 0.87 MB |

Uwagi:

- Rozmiar po rozpakowaniu nie jest tym samym co rozmiar koncowego bundla.
  Pokazuje jednak rzad wielkosci i ryzyko dla GitHub Pages.
- `occt-import-js.wasm` w CDN dla wersji 0.0.23 ma okolo 7.6 MB. To jest
  akceptowalne tylko jako leniwie ladowany modul na stronie STEP, nie jako
  element glownego bundle strony.
- `opencascade.js` jest pelniejszym portem OCCT, ale paczka 66.7 MB oznacza,
  ze bez custom builda i code splittingu jest za ciezka dla zwyklej strony
  edukacyjnej.

## Granica architektury

Na GitHub Pages mozna zrobic:

- wczytanie pliku przez `<input type="file">`,
- parsowanie w Web Workerze,
- obliczenia geometryczne w JavaScript albo WASM,
- wizualizacje w WebGL przez Three.js,
- eksport raportu jako JSON, CSV albo PDF generowany lokalnie,
- brak wysylania pliku na serwer.

Nie mozna zrobic:

- przetwarzania plikow na backendzie,
- kolejkowania ciezkich zadan,
- trwalego zapisu projektow uzytkownika,
- pewnego limitowania czasu CPU poza mechanizmami przegladarki,
- kontroli naglowkow HTTP potrzebnych np. do pelnej izolacji COOP/COEP, jezeli
  kiedys chcielibysmy uzyc wielowatkowego WASM z `SharedArrayBuffer`.

Wniosek praktyczny: parser CAD musi dzialac w osobnym workerze, miec limit
rozmiaru pliku, mierzyc czas pracy i umiec przerwac analize.

## 1. STL

### Co da sie policzyc

STL jest najlatwiejszy, bo opisuje siatke trojkatow, a nie model parametryczny.
Da sie policzyc wiarygodnie:

- liczbe trojkatow,
- wymiary gabarytowe `X x Y x Z`,
- objetosc zamknietej siatki,
- pole powierzchni,
- srodek masy siatki,
- mase dla zadanej gestosci materialu,
- koszt materialu dla zadanej ceny za kg albo za cm3,
- orientacyjny czas druku na podstawie objetosci i zalozonego przeplywu,
- czy siatka jest watertight, czyli czy kazda krawedz nalezy do dokladnie dwoch
  trojkatow,
- liczbe krawedzi brzegowych,
- odwracanie normalnych i niespojnosc orientacji trojkatow,
- samoprzeciecia orientacyjnie, jezeli uzyjemy BVH,
- zwisy wzgledem osi Z dla zadanego kata, np. 45 stopni,
- bardzo orientacyjne cienkie scianki przez strzaly normalne/raycasting.

### Co konkretnie narzedzie zwraca uzytkownikowi

Raport:

- format: ASCII STL albo binary STL,
- jednostka przyjeta przez uzytkownika: mm, cm, cal,
- gabaryt,
- objetosc,
- pole powierzchni,
- masa dla wybranego materialu,
- liczba trojkatow,
- status szczelnosci siatki,
- lista problemow: otwarte krawedzie, zdublowane trojkaty, odwrocone normalne,
  bardzo male elementy, prawdopodobne samoprzeciecia,
- mapa zwisow w podgladzie 3D,
- wynik "do wyceny" tylko wtedy, gdy siatka jest szczelna i jednostka jest
  potwierdzona przez uzytkownika.

### Biblioteka, licencja, waga

Najrozsadniej:

- `three` z `STLLoader` z `examples/jsm/loaders/STLLoader.js`, MIT, cala paczka
  23.2 MB, ale do bundla trafia tylko potrzebna czesc,
- wlasne obliczenia siatki w workerze,
- `three-mesh-bvh`, MIT, 2.3 MB, jezeli potrzebne beda szybsze raycasty do
  samoprzeciec i grubosci scianek.

Alternatywa: `@jscad/stl-deserializer`, MIT, 0.04 MB. Dobre do parsowania, ale
Three i tak bedzie potrzebne do podgladu 3D.

### Pulapki

- STL nie ma jednostek. Ten sam plik moze oznaczac mm albo cale.
  Wykrycie: pokazac gabaryt i wymusic wybor jednostki przed liczeniem kosztu.
- Objetosc ma sens tylko dla szczelnej i poprawnie zorientowanej siatki.
  Wykrycie: policzyc uzycia krawedzi i sume zorientowanych objetosci.
- ASCII STL potrafi byc wielokrotnie wiekszy od binary STL.
  Wykrycie: limit rozmiaru i parser strumieniowy albo ostrzezenie.
- Normalne zapisane w STL bywaja bledne.
  Wykrycie: liczyc normalne z geometrii, nie ufac zapisanym normalnym.
- Bardzo cienkie scianki sa trudne.
  Wykrycie: raportowac jako "podejrzenie", nie jako pewny blad.

### Szacunek pracy

- MVP: 18-28 h.
- Wersja dobra produktowo z podgladem 3D, raportem i mapa zwisow: 45-70 h.

### Wiarygodnosc

Wysoka dla gabarytu, pola i objetosci zamknietej siatki. Srednia dla problemow
drukarskich. Zwisy sa wiarygodne geometrycznie, ale nie mowia jeszcze, czy dany
material i drukarka sobie poradza. Cienkie scianki tylko orientacyjnie, chyba ze
zrobimy kosztowniejszy algorytm z BVH i jasnymi progami.

## 2. STEP, ISO 10303-21

### Co da sie wyciagnac bez pelnego jadra geometrycznego

STEP jest plikiem tekstowym w skladni ISO 10303-21. Bez jadra geometrycznego da
sie zrobic tylko lekki odczyt metadanych i struktury:

- nazwy produktu,
- jednostki, jezeli sa zapisane w czytelnej strukturze,
- autor/program eksportujacy,
- data eksportu,
- lista czesci i zlozen,
- nazwy ksztaltow/instancji,
- przyblizona informacja, czy plik zawiera BREP, powierzchnie, krzywe,
- liczba encji,
- ostrzezenie, ze plik jest AP203/AP214/AP242, jezeli da sie to odczytac.

Nie da sie bez jadra geometrycznego wiarygodnie policzyc:

- objetosci bryly,
- pola powierzchni,
- masy,
- promieni, kieszeni i otworow,
- minimalnej grubosci,
- poprawnosci topologii,
- kolizji w zlozeniu,
- rozwijalnosci blachy,
- cech technologicznych.

Powod: STEP nie jest lista trojkatow. To opis topologii i geometrii BREP:
powierzchnie NURBS, krzywe, krawedzie, petle, orientacje, tolerancje i relacje.
Same rekordy tekstowe nie wystarcza, trzeba je zinterpretowac jako model
geometryczny.

### Co wymaga OpenCascade skompilowanego do WebAssembly

Pelniejsza analiza STEP wymaga jadra CAD, praktycznie OCCT:

- wczytanie STEP jako ksztaltu BREP,
- triangulacja do podgladu 3D,
- gabaryt z prawdziwego ksztaltu,
- pole powierzchni,
- objetosc,
- srodek masy,
- odczyt struktury zlozenia,
- obsluga kolorow i nazw z XCAF, jezeli eksporter je zapisal,
- kontrola podstawowych bledow topologii,
- wykrywanie prostych cech po triangulacji albo po topologii, np. cylindryczne
  otwory, ale to juz osobny projekt.

### Biblioteka, licencja, waga

Scenariusz lekki:

- wlasny parser tekstowy STEP tylko do metadanych,
- brak zewnetrznej duzej biblioteki,
- koszt paczki pomijalny,
- wynik tylko informacyjny.

Scenariusz realnej geometrii:

- `occt-import-js`, LGPL-2.1, paczka 11.6 MB, plik WASM okolo 7.6 MB,
- albo `opencascade.js`, LGPL-2.1-only, paczka 66.7 MB, ale daje pelniejszy
  dostep do API OCCT.

Na pocaduchy.pl akceptowalne jest `occt-import-js` jako narzedzie ladowane
leniwe po kliknieciu "Analizuj STEP". Nie jest akceptowalne wrzucenie OCCT do
globalnego bundle strony. Pelny `opencascade.js` ma sens dopiero wtedy, gdy STEP
stanie sie osobnym duzym produktem.

### Co konkretnie narzedzie zwraca uzytkownikowi

Wersja bez OCCT:

- metadane pliku,
- prawdopodobny typ pliku: czesc/zlozenie,
- wykryte jednostki, jezeli pewne,
- liczba encji,
- informacja, ze obliczenia masy i objetosci wymagaja pelnej analizy BREP.

Wersja z OCCT:

- gabaryt,
- pole powierzchni,
- objetosc,
- masa dla gestosci wybranej przez uzytkownika,
- lista bryl i czesci w zlozeniu, jezeli dostepna,
- podglad 3D po triangulacji,
- ostrzezenia importu: nieudana triangulacja, puste ksztalty, brak jednostek,
  bardzo duze zlozenie, utracone nazwy.

### Pulapki

- STEP moze byc duzym zlozeniem, a telefon uzytkownika tego nie przemieli.
  Wykrycie: limit rozmiaru pliku, liczby encji i czasu importu.
- Jednostki moga byc niejednoznaczne albo ukryte w strukturze.
  Wykrycie: pokazac jednostke i wymagac potwierdzenia.
- Import moze zmienic tolerancje i triangulacje.
  Wykrycie: oddzielic wartosci z BREP od wartosci z siatki.
- OCCT w WASM moze potrzebowac duzo RAM.
  Wykrycie: worker, pasek postepu, obsluga bledu "out of memory".
- LGPL wymaga pilnowania obowiazkow licencyjnych, zwlaszcza przy linkowaniu
  i dystrybucji pliku WASM.
  Wykrycie: jawna lista licencji i zachowanie mozliwosci podmiany biblioteki.

### Szacunek pracy

- Lekki czytnik metadanych STEP: 16-30 h.
- STEP przez `occt-import-js`, podglad i podstawowe wlasnosci masowe: 60-100 h.
- Pelniejsza analiza cech technologicznych STEP: 200 h i wiecej. To osobny
  produkt, nie kalkulator.

### Wiarygodnosc

Bez OCCT: niska dla geometrii, srednia dla metadanych.

Z OCCT: wysoka dla gabarytu, pola, objetosci i masy pojedynczej bryly po udanym
imporcie. Srednia dla zlozen i nazw czesci. Niska dla automatycznego rozpoznania
intencji konstruktora.

## 3. 3MF i OBJ

### 3MF

3MF jest kontenerem ZIP z modelem 3D, materialami, miniaturami i metadanymi.
Z punktu widzenia analizy druku 3D jest lepszy niz STL, bo moze niesc jednostki,
kolory i informacje o kilku obiektach.

Co da sie policzyc:

- lista obiektow,
- jednostki, jezeli podane,
- gabaryt,
- objetosc i pole dla siatek,
- masa i koszt materialu,
- orientacyjne problemy druku 3D jak dla STL,
- informacje o kolorach/materialach, jezeli sa zapisane prosto.

Biblioteka:

- `three` z `3MFLoader`, MIT,
- `three-mf`, MIT, 0.24 MB, jezeli potrzebny jest bardziej jawny odczyt struktury
  3MF,
- `jszip`, MIT lub GPL-3.0-or-later, 0.76 MB, jezeli parsujemy kontener sami.

Pulapki:

- 3MF moze zawierac wiecej niz jeden obiekt i transformacje.
  Wykrycie: pokazac liste obiektow i laczny wynik po transformacjach.
- Materaly moga byc zdefiniowane inaczej przez rozne slicery.
  Wykrycie: traktowac material jako metadane, nie jako pewna gestosc.
- Nie kazdy 3MF jest prostym modelem do druku, moga byc rozszerzenia.
  Wykrycie: wypisac nieobslugiwane rozszerzenia.

Szacunek pracy:

- 3MF jako rozszerzenie analizatora STL: 12-24 h.
- Pelniejszy raport per obiekt: 25-45 h.

Wiarygodnosc:

Wysoka dla siatki po poprawnym odczycie transformacji. Srednia dla materialow
i ustawien procesu.

### OBJ

OBJ jest prosty i popularny, ale gorzej nadaje sie do inzynierii niz STL/3MF.
Czesto pochodzi z grafiki 3D, nie z CAD.

Co da sie policzyc:

- liczba wierzcholkow i scian,
- gabaryt,
- pole powierzchni,
- objetosc tylko wtedy, gdy siatka jest zamknieta i jednoznacznie zorientowana,
- podstawowe problemy siatki,
- podglad 3D.

Biblioteka:

- `three` z `OBJLoader`, MIT.

Pulapki:

- OBJ nie ma pewnych jednostek.
- Moze zawierac n-gony, grupy, materialy `.mtl`, normalne i UV, ale nie
  semantyke CAD.
- Czesto siatka nie jest zamknieta.
- Obiekty moga miec skale i transformacje poza samym OBJ.

Szacunek pracy:

- OBJ w analizatorze siatek: 8-16 h.

Wiarygodnosc:

Wysoka dla gabarytu i pola. Objetosc tylko warunkowo. Dla druku 3D OBJ nalezy
traktowac gorzej niz STL/3MF.

## 4. DXF

DXF jest realnym formatem dla kalkulatora ciecia 2D, ale trzeba jasno ograniczyc
zakres. Najlepszy pierwszy produkt: DXF 2D z konturami do lasera/plazmy/wody,
nie pelna kontrola rysunku technicznego.

### Encje do obslugi w pierwszej wersji

Do wyceny ciecia:

- `LINE`,
- `LWPOLYLINE`,
- `POLYLINE`,
- `ARC`,
- `CIRCLE`,
- `ELLIPSE` po aproksymacji,
- `SPLINE` po aproksymacji i z ostrzezeniem,
- `INSERT` dla blokow, jezeli rozwiniemy transformacje bloku,
- warstwy/layers,
- kolor/linetype tylko pomocniczo.

Poza pierwszym MVP:

- `HATCH`,
- `TEXT`, `MTEXT`,
- `DIMENSION`,
- `LEADER`, `MULTILEADER`,
- `XLINE`, `RAY`,
- krzywe 3D,
- dane niestandardowe aplikacji CAD.

### Co da sie zmierzyc i sprawdzic

Dla ciecia 2D:

- laczna dlugosc linii ciecia,
- dlugosc per warstwa,
- liczba zamknietych konturow,
- liczba konturow wewnetrznych,
- orientacyjna liczba przebic: zwykle liczba osobnych zamknietych petli,
- minimalna odleglosc miedzy konturami,
- minimalny promien luku,
- otwarte kontury,
- zdublowane albo nalozone odcinki,
- bardzo krotkie segmenty,
- skala i gabaryt,
- ostrzezenie o braku jednostek,
- lista nieobslugiwanych encji.

Dla kontroli rysunku 2D:

- liczba wymiarow,
- lista tekstow,
- lista warstw,
- obecnosci blokow tabelki rysunkowej, jezeli znamy lokalny standard,
- obecnosci wymiarow/tolerancji jako tekstu,
- proste reguly typu "brak wymiarow na warstwie DIM".

Nie da sie wiarygodnie stwierdzic kompletnej poprawnosci dokumentacji.

### Biblioteka, licencja, waga

Parser:

- `dxf-parser`, MIT, 0.19 MB. Dobre do prostego odczytu DXF do obiektu JS.
- alternatywnie `@tarikjabiri/dxf`, MIT, 0.29 MB, jezeli lepiej pasuje do
  TypeScriptu i wlasnego modelu geometrii.

Geometria:

- wlasne funkcje do dlugosci linii, lukow i polilinii,
- wlasny graf konturow z tolerancja laczenia punktow,
- opcjonalnie `three` tylko do podgladu, ale dla 2D lepszy moze byc Canvas/SVG.

### Co konkretnie narzedzie zwraca uzytkownikowi

Raport dla wyceny:

- jednostka i skala do potwierdzenia,
- gabaryt arkusza/rysunku,
- laczna dlugosc ciecia,
- dlugosc ciecia per warstwa,
- liczba konturow zamknietych,
- szacowana liczba przebic,
- lista otwartych konturow,
- lista nakladajacych sie odcinkow,
- lista malych szczelin ponizej progu, np. 0.05 mm,
- lista nieobslugiwanych encji,
- podglad 2D z kolorami: kontury zamkniete, otwarte, podejrzane,
- wynik "do wyceny" tylko gdy nie ma nieobslugiwanych encji w warstwach ciecia
  i jednostka zostala potwierdzona.

### Pulapki

- Jednostki w DXF bywaja puste albo ignorowane.
  Wykrycie: odczytac `$INSUNITS`, pokazac gabaryt i wymagac potwierdzenia.
- Bloki `INSERT` moga miec skale, obrot, odbicie lustrzane i zagniezdzenia.
  Wykrycie: rozwinac bloki rekurencyjnie z limitem glebokosci; raportowac bloki
  nieobslugiwane.
- Splajny nie maja jednej oczywistej dlugosci bez aproksymacji.
  Wykrycie: aproksymowac z podana tolerancja i oznaczyc wynik jako przyblizony.
- Otwarte kontury moga miec mikroszczeliny.
  Wykrycie: laczyc punkty z tolerancja, pokazac szczeliny w podgladzie.
- Linie pomocnicze moga byc na tych samych warstwach co ciecie.
  Wykrycie: pozwolic uzytkownikowi wlaczac/wyklaczac warstwy.
- Kontury moga sie nakladac, co zawyzy dlugosc ciecia.
  Wykrycie: haszowanie segmentow z tolerancja i wykrywanie duplikatow.
- Rysunek moze byc w przestrzeni papieru zamiast modelu.
  Wykrycie: pokazac `model space` i `paper space` osobno albo ograniczyc MVP do
  `model space`.

### Czy da sie policzyc dlugosc ciecia i liczbe przebic z DXF

Tak, ale tylko dla jasno okreslonego DXF 2D.

Wiarygodny wynik jest realny, jezeli:

- uzytkownik wskaze warstwy ciecia,
- encje sa obslugiwane,
- bloki zostaly poprawnie rozwiniete,
- jednostka i skala sa potwierdzone,
- kontury sa zamkniete albo narzedzie pokazuje miejsca przerw,
- splajny sa aproksymowane z jawna tolerancja.

Liczba przebic jest zwykle liczba osobnych konturow, ale to nadal uproszczenie.
Technolog moze zmienic strategie wejscia, mostki, mikrozlaczenia, kolejnosc
ciecia i wspolne krawedzie. Narzedzie moze dac dobry wsad do wyceny, nie gotowy
postprocesor CAM.

### Szacunek pracy

- MVP: LINE, ARC, CIRCLE, LWPOLYLINE, warstwy, dlugosc, przebicia, otwarte
  kontury: 35-55 h.
- Wersja solidna: bloki, splajny, duplikaty, podglad, eksport raportu: 80-130 h.

### Wiarygodnosc

Wysoka dla prostych DXF 2D po walidacji. Srednia przy blokach i splajnach.
Niska dla przypadkowych rysunkow produkcyjnych bez standardu warstw.

## 5. DWG

DWG jest natywnym formatem AutoCAD i formatem zamknietym/proprietary. W
przegladarce bez backendu i bez licencjonowanego SDK nie jest dobrym celem.

### Czy to realne bez licencji

Technicznie sa projekty oparte o LibreDWG skompilowane do WASM. Problem:

- LibreDWG jest GPL-3.0,
- gotowe przegladarkowe pakiety bywaja GPL-3.0 albo AGPL-3.0-only,
- wsparcie DWG zalezy od wersji pliku i konkretnych obiektow,
- format jest bardziej ryzykowny niz DXF,
- komercyjne SDK typu ODA/RealDWG wymagaloby licencji i zwykle backendu albo
  natywnego komponentu.

Pakiety znalezione w npm:

- `@mlightcad/libredwg-web`, GPL-3.0, 11.2 MB,
- `@flyfish-dev/cad-viewer`, AGPL-3.0-only, 13.1 MB,
- `dwgdxf`, MIT, 0.87 MB, ale to nie znaczy, ze pokrywa produkcyjnie wszystkie
  przypadki DWG.

### Rekomendacja

Nie budowac pierwszej wersji DWG. Komunikat dla uzytkownika powinien byc prosty:
"DWG jest formatem zamknietym. Wyeksportuj plik do DXF 2010/2013 i wczytaj DXF".

### Szacunek pracy

- Proba integracji istniejacego DWG WASM: 40-80 h, ale z wysokim ryzykiem
  licencyjnym i jakosciowym.
- Produkcyjna obsluga DWG: niewykonalna w tej architekturze bez zewnetrznego
  licencjonowanego komponentu.

### Wiarygodnosc

Niska jako obietnica produktowa. DWG mozna traktowac co najwyzej jako
eksperymentalny import, nie jako rdzen narzedzia poCADuchy.

## 6. PDF z rysunkiem technicznym

PDF nie jest formatem CAD. To format prezentacji/drukowania. Nawet jezeli
rysunek wyglada technicznie, semantyka wymiarow, tolerancji, srednic i geometrii
czesto jest utracona.

### Co da sie odczytac przez pdf.js

Da sie:

- wyrenderowac strone do Canvas,
- odczytac warstwe tekstowa, jezeli tekst nie zostal zamieniony na krzywe albo
  raster,
- odczytac pozycje fragmentow tekstu,
- w pewnym zakresie przejrzec operatory rysowania wektorowego,
- wykryc liczbe stron,
- pokazac podglad i pozwolic uzytkownikowi zaznaczyc obszary.

Mozna zrobic narzedzie pomocnicze:

- wyciagnij tekst z tabelki rysunkowej,
- znajdz oznaczenia typu `Ra`, `ISO 2768`, `M6`, `H7`, `+-0.1`,
- policz wystapienia symboli/wymiarow tekstowych,
- zrob checkliste "co znaleziono, czego nie znaleziono".

### Czego nie da sie wiarygodnie odczytac

Nie da sie ogolnie i wiarygodnie:

- odtworzyc modelu 2D CAD z PDF,
- rozpoznac, ktora linia jest krawedzia, osia, kreskowaniem albo wymiarem,
- odtworzyc skali rysunku bez informacji z tabelki i bez kalibracji,
- stwierdzic, czy wszystkie cechy sa zwymiarowane,
- zweryfikowac poprawnosci tolerancji,
- policzyc dlugosci ciecia dla losowego PDF.

Powod: w PDF tekst i kreski sa obiektami graficznymi. Rysunek techniczny widzi
czlowiek, ale plik nie musi zawierac wiedzy, ze dany tekst jest wymiarem
konkretnego otworu.

### Biblioteka, licencja, waga

- `pdfjs-dist`, Apache-2.0, paczka 34.5 MB, ale uzyteczny bundle moze byc
  mniejszy przy imporcie tylko potrzebnych modulow.

### Pulapki

- Tekst moze byc zamieniony na krzywe.
  Wykrycie: `getTextContent()` zwraca malo albo zero tekstu.
- PDF moze byc skanem.
  Wykrycie: brak tekstu i duzy obraz rastrowy na stronie.
- Skala rysunku moze byc inna niz opis w tabelce.
  Wykrycie: wymagac kalibracji przez wskazanie znanego wymiaru.
- Fonty techniczne i znaki tolerancji moga byc zakodowane niestandardowo.
  Wykrycie: pokazac surowe fragmenty tekstu i pewnosc odczytu.

### Szacunek pracy

- Ekstraktor tekstu i checklista PDF: 25-45 h.
- Proba analizy geometrii wektorowej PDF: 100-180 h i nadal wynik orientacyjny.

### Wiarygodnosc

Srednia dla tekstu, jezeli PDF ma prawdziwa warstwe tekstowa. Niska dla geometrii
i poprawnosci rysunku.

## 7. Formaty zamkniete: SLDPRT, IPT, CATPart

### Realne czy nie

Nie jako narzedzie statyczne w przegladarce.

Powody:

- formaty sa wlasnosciowe,
- pelny odczyt wymaga bibliotek producenta albo komercyjnych translatorow,
- biblioteki sa zwykle natywne, licencjonowane i nie do wrzucenia legalnie jako
  statyczny WASM na publiczna strone,
- pliki zawieraja historie operacji, cechy parametryczne, konfiguracje,
  materialy, relacje i zaleznosci, ktore nie maja prostego publicznego parsera.

Co mozna zrobic uczciwie:

- pokazac instrukcje eksportu: STL/3MF do druku 3D, STEP do geometrii, DXF do
  ciecia 2D,
- przyjmowac tylko formaty eksportowe,
- napisac artykul "jaki format wyeksportowac do analizy online".

Szacunek pracy:

- Obsluga natywnych SLDPRT/IPT/CATPart w tej architekturze: niewykonalna.
- Strona-instrukcja eksportu: 6-10 h.

Wiarygodnosc:

Brak. Nie obiecywac.

## Pytania graniczne

### Czy da sie automatycznie sprawdzic poprawnosc rysunku technicznego

Nie w ogolnym sensie.

Da sie sprawdzac proste reguly syntaktyczne:

- czy sa jakies wymiary,
- czy znaleziono tolerancje ogolne,
- czy znaleziono material,
- czy tabelka ma numer rysunku,
- czy warstwy maja oczekiwane nazwy,
- czy sa teksty typu `ISO 2768`, `Ra`, `H7`, `M6`.

Nie da sie wiarygodnie sprawdzic:

- czy brakuje wymiaru konkretnej cechy,
- czy wymiar jest logicznie wystarczajacy do wykonania,
- czy baza tolerancji geometrycznej jest poprawnie dobrana,
- czy tolerancja jest technologicznie sensowna,
- czy rysunek jest jednoznaczny dla wytworcy.

Dlaczego: to wymaga zrozumienia intencji konstrukcyjnej, funkcji czesci,
procesu wykonania, baz obrobkowych, montazu i relacji miedzy widokami. W PDF
albo DXF nie ma kompletnej semantyki. Nawet w pliku CAD 3D pelna ocena wymaga
PMI/MBD i znajomosci standardu firmowego. Narzedzie moze byc asystentem
checklisty, nie automatycznym rewidentem dokumentacji.

### Czy da sie policzyc dlugosc ciecia i liczbe przebic z DXF na potrzeby wyceny

Tak, to jeden z najlepszych scenariuszy.

Warunek: ograniczyc wejscie do DXF 2D, pozwolic uzytkownikowi wybrac warstwy
ciecia i jawnie raportowac nieobslugiwane encje. Dlugosc jest wiarygodna dla
linii, lukow, okregow i polilinii. Splajny sa przyblizane. Liczba przebic jest
dobrym szacunkiem, ale zalezy od strategii technologicznej.

### Czy da sie wykryc problemy modelu pod druk 3D

Tak, dla STL/3MF/OBJ jako analiza siatki.

Da sie wiarygodnie:

- wykryc nieszczelna siatke,
- wykryc krawedzie brzegowe,
- wykryc zle zorientowane lub niespojne normalne,
- policzyc zwisy wzgledem kierunku druku,
- znalezc bardzo male detale,
- ostrzec o zbyt duzym gabarycie.

Da sie orientacyjnie:

- wykrywac cienkie scianki,
- wykrywac samoprzeciecia,
- oceniac potrzebe podpor,
- sugerowac obrot modelu.

Nie da sie pewnie:

- przewidziec udanego wydruku dla kazdej drukarki,
- ocenic wytrzymalosci czesci,
- stwierdzic, czy dany detal bedzie dzialal mechanicznie.

### Prywatnosc: czy plik naprawde nie opuszcza komputera

Moze nie opuszczac komputera, jezeli narzedzie jest napisane konsekwentnie jako
client-side only:

- plik czytany przez File API,
- analiza w Web Workerze,
- brak `fetch`, `XMLHttpRequest`, WebSocket i uploadu w kodzie analizatora,
- brak wysylania tresci pliku do analityki,
- biblioteki ladowane z tego samego hosta, nie z zewnetrznego CDN,
- raport generowany lokalnie.

Jak to udowodnic uzytkownikowi:

- umiescic na stronie jasny komunikat: "Plik jest analizowany lokalnie
  w przegladarce. Nie jest wysylany na serwer",
- dodac tryb testowy "odlacz internet po zaladowaniu strony - analiza nadal
  dziala",
- publikowac kod narzedzia w repozytorium,
- dodac automatyczny test Playwright, ktory po wczytaniu pliku blokuje/monitoruje
  requesty sieciowe i sprawdza, ze nie ma zadnego requestu zawierajacego dane
  pliku,
- na stronach analizatorow rozwazyc wylaczenie reklam i ograniczenie analityki,
  bo nawet jezeli plik nie jest wysylany, zaufanie uzytkownika spada, gdy obok
  dzialaja skrypty zewnetrzne.

Na GitHub Pages nie da sie tego udowodnic naglowkami HTTP tak mocno jak na
wlasnym serwerze z CSP/COOP/COEP. Da sie jednak udowodnic praktycznie: kodem,
testem sieciowym i dzialaniem offline po zaladowaniu aplikacji.

## Trzy narzedzia rekomendowane do budowy

### 1. Analizator STL/3MF/OBJ pod druk 3D

Dlaczego pierwsze:

- najlepiej pasuje do kanalu YouTube i obecnej listy kalkulatorow,
- dziala w pelni statycznie,
- daje szybko zrozumiala wartosc,
- ryzyko licencyjne jest niskie,
- mozna zaczac od STL i rozszerzyc do 3MF/OBJ.

Zakres:

- podglad 3D,
- gabaryt,
- objetosc,
- pole,
- masa i koszt materialu,
- watertight check,
- zwisy,
- lista problemow siatki.

Biblioteki:

- `three`, MIT,
- `three-mesh-bvh`, MIT, jezeli potrzebna analiza grubosci/samoprzeciec,
- `three-mf` albo `3MFLoader` dla 3MF.

Czas:

- MVP: 30-45 h,
- dobra wersja publiczna: 60-90 h.

Wiarygodnosc:

- wysoka dla pomiarow siatki,
- srednia dla diagnozy drukarskiej.

### 2. Kalkulator ciecia z DXF 2D

Dlaczego drugie:

- bezposrednio laczy sie z watkiem wyceny i technologii wykonania z analizy
  kalkulatorow,
- daje wynik materialny: dlugosc ciecia i liczba przebic,
- moze pozycjonowac sie na konkretne zapytania po polsku,
- da sie jasno okreslic warunki wiarygodnosci.

Zakres:

- DXF 2D,
- wybor warstw ciecia,
- dlugosc ciecia per warstwa,
- liczba konturow i przebic,
- wykrywanie otwartych konturow,
- wykrywanie duplikatow,
- podglad 2D,
- eksport raportu.

Biblioteki:

- `dxf-parser`, MIT,
- wlasny modul geometrii 2D,
- Canvas/SVG do podgladu.

Czas:

- MVP: 35-55 h,
- wersja dobra publicznie: 80-130 h.

Wiarygodnosc:

- wysoka dla prostych DXF,
- srednia przy blokach/splajnach,
- niska dla rysunkow bez porzadku warstw.

### 3. Przegladarka STEP z pomiarami masowymi

Dlaczego trzecie:

- bardzo atrakcyjne dla konstruktorow,
- ale ciezsze technicznie i bardziej ryzykowne niz STL/DXF,
- wymaga WASM i pilnowania rozmiaru.

Zakres pierwszej wersji:

- wczytanie STEP,
- podglad 3D,
- gabaryt,
- pole powierzchni,
- objetosc,
- masa z zadanej gestosci,
- lista czesci, jezeli dostepna,
- ostrzezenia importu.

Biblioteki:

- `occt-import-js`, LGPL-2.1, WASM okolo 7.6 MB,
- `three`, MIT, do renderowania siatki.

Czas:

- wersja sensowna: 60-100 h,
- rozpoznawanie cech technologicznych: nie w pierwszej wersji.

Wiarygodnosc:

- wysoka dla prostych i srednich modeli po udanym imporcie,
- srednia dla duzych zlozen,
- niska dla interpretacji intencji projektowej.

## Lista rzeczy niewykonalnych albo nie do obiecania

1. Pelna automatyczna ocena poprawnosci rysunku technicznego.
2. Pewne wykrywanie brakujacych wymiarow na dowolnym rysunku.
3. Pewna walidacja tolerancji geometrycznych i pasowan bez kontekstu funkcji
   czesci.
4. Produkcyjna obsluga DWG bez licencji albo bez ryzyka GPL/AGPL.
5. Odczyt natywnych `SLDPRT`, `IPT`, `CATPart` w statycznej przegladarce.
6. Pelna analiza STEP bez jadra geometrycznego.
7. Gwarancja drukowalnosci modelu 3D na kazdej drukarce.
8. Automatyczne przeliczenie PDF technicznego na poprawny CAD 2D.
9. Wycena produkcji jako "prawda", jezeli zalezy od strategii konkretnego
   zakladu. Mozna podac kalkulacje wedlug jawnych zalozen.

## Decyzja

Tak, da sie zbudowac narzedzia analizujace modele CAD i rysunki 2D na
pocaduchy.pl, ale trzeba uzyc jezyka "analizator pliku" i "raport wedlug
zalozen", nie "automatyczny kontroler CAD".

Najbezpieczniejsza kolejnosc:

1. analizator STL/3MF/OBJ pod druk 3D,
2. kalkulator ciecia z DXF 2D,
3. przegladarka STEP z pomiarami masowymi przez OCCT WASM.

Takie trzy narzedzia mieszcza sie w statycznej architekturze, sa uczciwe wobec
uzytkownika i nie wymagaja obiecywania rzeczy, ktorych przegladarka bez backendu
nie dowiezie.
