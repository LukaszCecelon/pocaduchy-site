# Rysunek techniczny: dokumenty Word, partia 03

Data opracowania: 2026-08-14

## Utworzone dokumenty

| Nr | Temat | Plik | Liczba słów | Rozmiar [B] | SVG | INVENTOR | ZDJĘCIE |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: |
| 13 | Wymiar w nawiasie, ramce, podkreślony i z gwiazdką | `D:\poCADychy_STRONA\BAZA WIEDZY\SEKCJA-RYSUNEK TECHNICZNY\13-wymiar-pomocniczy-ted-gwiazdka\13-wymiar-pomocniczy-ted-gwiazdka.docx` | 2009 | 43418 | 6 | 0 | 0 |
| 14 | Średnica, promień, sfera, kwadrat i grubość: który znak | `D:\poCADychy_STRONA\BAZA WIEDZY\SEKCJA-RYSUNEK TECHNICZNY\14-symbole-wymiarowe-srednica-promien-sfera\14-symbole-wymiarowe-srednica-promien-sfera.docx` | 1822 | 43110 | 7 | 0 | 0 |
| 15 | Faza na rysunku: jeden zapis czy dwa wymiary | `D:\poCADychy_STRONA\BAZA WIEDZY\SEKCJA-RYSUNEK TECHNICZNY\15-wymiarowanie-faz\15-wymiarowanie-faz.docx` | 2182 | 43949 | 5 | 1 | 0 |

Liczba słów obejmuje całą widoczną zawartość dokumentu, w tym metadane, nagłówki i tabele.

## Co Łukasz musi zrobić w Inventorze

1. Wymodelować tuleję obrotową o długości 20 mm, średnicy zewnętrznej Ø30 i otworze przelotowym Ø8.
2. Na przedniej krawędzi zewnętrznej wykonać fazę 1 × 45°.
3. Na tylnej krawędzi zewnętrznej wykonać fazę 2 × 30°. Kąt ma być mierzony od powierzchni czołowej.
4. Przy przednim wejściu otworu wykonać pogłębienie stożkowe do Ø12 z pełnym kątem wierzchołkowym 90°.
5. Przygotować arkusz A4 z przekrojem osiowym A-A w podziałce 2:1.
6. Pokazać długość 20, średnice Ø30 i Ø8 oraz trzy noty faz. Dla fazy 2 × 30° jednoznacznie wskazać powierzchnię odniesienia.
7. Celowo nie pokazywać linii niewidocznych, wymiarów modelowych szkicu, tolerancji geometrycznych, chropowatości, materiału ani tabelki firmowej.
8. Wyeksportować obraz pod nazwą `15-fazy-tuleja-przekroj.png`.

Obraz ma wykazać, że faza zewnętrzna 45°, faza o innym kącie i pogłębienie stożkowe wymagają różnych par parametrów. Tematy 13 i 14 mają komplet zamówień na autorskie schematy SVG i nie wymagają obrazu z Inventora.

## Zakres i ryzyko

Nie pominięto żadnego z trzech tematów. Każdy broni się jako osobna strona i odpowiada na inne pytanie praktyczne.

Najsłabszym ogniwem partii jest temat 15. Publiczne karty katalogowe potwierdzają zakres norm dotyczący faz i pogłębień, lecz nie pokazują pełnych reguł typograficznych noty pogłębienia stożkowego ani kolejności wartości w skróconych zapisach faz nierównych. Przed publikacją trzeba sprawdzić przykłady w pełnym PN-EN ISO 129-1:2020-03 i ISO 15786:2008 oraz porównać wynik ze stylem ISO używanym w Inventorze.

## Wynik kontroli

Każdy plik otwarto ponownie przez `python-docx`. Potwierdzono dokładnie jedną H1, tabelę metadanych 8 × 2, obecność sekcji `Pytania i odpowiedzi`, `Źródła i status norm` i `Uwagi dla Claude`, poprawne długości pól SEO, od 6 do 12 słów kluczowych, brak znaku em dash oraz co najmniej jeden znacznik rysunku. Wszystkie 20 stron sprawdzono także po renderowaniu do PDF bezpośrednio z programu Microsoft Word.
