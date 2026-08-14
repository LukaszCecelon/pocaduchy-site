# Rysunek techniczny: dokumenty Word, partia 1B

Data przygotowania: 2026-08-14

## Powstałe dokumenty

| Temat | Plik | Liczba słów | SVG | INVENTOR | ZDJĘCIE | Razem rysunków |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Przekrój pełny, półprzekrój i przekrój miejscowy | `D:\poCADychy_STRONA\BAZA WIEDZY\SEKCJA-RYSUNEK TECHNICZNY\04-przekroje-pelny-polprzekroj-miejscowy\04-przekroje-pelny-polprzekroj-miejscowy.docx` | 2121 | 5 | 1 | 0 | 6 |
| Kreskowanie przekrojów w części i złożeniu | `D:\poCADychy_STRONA\BAZA WIEDZY\SEKCJA-RYSUNEK TECHNICZNY\05-kreskowanie-przekrojow\05-kreskowanie-przekrojow.docx` | 2145 | 5 | 1 | 0 | 6 |
| Kład a przekrój: co zostaje na rysunku | `D:\poCADychy_STRONA\BAZA WIEDZY\SEKCJA-RYSUNEK TECHNICZNY\06-klad-a-przekroj\06-klad-a-przekroj.docx` | 1624 | 4 | 0 | 0 | 4 |
| **Razem** |  | **5890** | **14** | **2** | **0** | **16** |

Liczba słów obejmuje cały widoczny tekst dokumentu, w tym tabelę metadanych i tabele w treści.

## Co Łukasz musi zrobić w Inventorze

1. **Ta sama tuleja pokazana jako przekrój pełny, półprzekrój i przekrój miejscowy**
   - Część: tuleja kołnierzowa o długości 80 mm. Kołnierz ma średnicę 90 mm i grubość 14 mm, a korpus średnicę 60 mm na długości 66 mm.
   - Geometria wewnętrzna: otwór osiowy przelotowy 30 mm, pogłębienie walcowe 48 mm na głębokość 18 mm od lewej, podtoczenie wewnętrzne 36 mm na długości 12 mm od prawej oraz boczny otwór gwintowany M8 z osią 42 mm od lewej powierzchni.
   - Bazy: A na lewej powierzchni czołowej, B na osi otworu 30 mm, C na płaszczyźnie przechodzącej przez oś M8.
   - Arkusz: A3, podziałka 1:1. Umieścić pełny przekrój A-A przez oś główną i M8, półprzekrój osiowy oraz widok zewnętrzny z przekrojem miejscowym odsłaniającym prawe podtoczenie.
   - Opisać: 80, średnice 90, 60, 30, 48 i 36, głębokości 18 i 12, położenie 42 oraz M8.
   - Celowo pominąć izometrię, tolerancje geometryczne, chropowatość i tabelkę firmową. Obraz ma pokazać, że rodzaj przekroju zmienia zakres informacji, a nie geometrię części.
   - Nazwa pliku: `tuleja-trzy-rodzaje-przekroju.png`.

2. **Złożenie pokazujące kreskowanie części, wału, śrub i żeber**
   - Korpus: kołnierz 120 x 90 x 14 mm, boss 70 mm o długości 45 mm, otwór osiowy 42 mm i dwa żebra grubości 8 mm biegnące wzdłuż osi bossa.
   - Tuleja: średnica zewnętrzna 42 mm, otwór 30 mm, długość 40 mm. Wał: średnica 30 mm, długość 130 mm. Pokrywa: średnica 70 mm, grubość 6 mm, otwór 30 mm.
   - Elementy złączne: cztery śruby M6 na okręgu podziałowym 56 mm. Dwie śruby mają leżeć w płaszczyźnie przekroju.
   - Bazy: A na powierzchni montażowej kołnierza, B na osi wału, C na górnej powierzchni kołnierza.
   - Arkusz: A3, podziałka 1:1, pełny przekrój A-A przez oś wału i osie dwóch śrub.
   - Kreskowanie: korpus, tuleję i pokrywę rozdzielić kierunkiem lub odstępem. Wał, śruby, nakrętki, podkładki i żebra przecięte wzdłużnie pozostawić bez kreskowania, ale zachować kontury żeber.
   - Opisać: 120, 90, 14, średnice 70, 42 i 30, długości 45 i 40, grubość żeber 8 oraz okrąg podziałowy 56.
   - Celowo pominąć łożysko, uszczelnienie, tolerancje, chropowatość i izometrię. Obraz ma pokazać, że kreskowanie opisuje granice części i kierunek przecięcia, a nie materiał z BOM.
   - Nazwa pliku: `zlozenie-kreskowanie-wal-sruby-zebra.png`.

## Tematy odpuszczone

Nie odpuszczono żadnego z trzech tematów. Każdy odpowiada na inną decyzję: jaki zakres wnętrza odsłonić, jak rozdzielić przecięte części oraz czy pokazać sam profil, czy również geometrię za płaszczyzną.

## Najsłabsze ogniwo partii

Najsłabszym ogniwem jest lista wyjątków od kreskowania w przekroju wzdłużnym, szczególnie dla żeber, ramion, szprych i elementów złącznych. Branżowa praktyka jest spójna, ale pełnej listy i wszystkich wyjątków nie potwierdzono w płatnym tekście PN-EN ISO 128-3:2023-02. Dokument świadomie opisuje tę granicę w sekcji `Nie potwierdzone bezpośrednio:`. Przed publikacją warto porównać ten fragment z egzemplarzem normy, do którego Łukasz ma dostęp, oraz z ustawieniami przekroju w używanej wersji Inventora.

## Weryfikacja techniczna plików

- Każdy dokument ponownie otwarto przez `python-docx` 1.2.0.
- Każdy ma dokładnie jeden styl `Heading 1`, osiem wierszy metadanych i trzy obowiązkowe sekcje końcowe.
- Długości `seoTitle` wynoszą 39, 40 i 38 znaków, a `description` 142, 149 i 149 znaków.
- W żadnym dokumencie nie ma znaku em dash.
- Rozmiary plików wynoszą odpowiednio 43 967 B, 44 312 B i 42 449 B.
- Dokumenty wyeksportowano do PDF przez Microsoft Word 16.0 i obejrzano wszystkie 20 stron renderu: 7, 7 i 6 stron.
