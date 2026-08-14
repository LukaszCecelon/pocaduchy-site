# Rysunek techniczny: zamówienia obrazów z Inventora

Stan: 2026-08-14. Poniższe trzy obrazy są uzupełnieniem pierwszych artykułów. Nie wstawiam jeszcze bloków `obraz` do JSON, dopóki pliki nie istnieją.

## 1. Kompletna ramka w kontekście rysunku wspornika

- **Plik docelowy:** `static/img/wiedza/rysunek-techniczny/ramka-tolerancji-geometrycznej-wspornik.png`
- **Część:** frezowany wspornik w kształcie litery L. Podstawa 100 x 70 x 12 mm, pionowe ramię 70 x 60 x 12 mm, dwa otwory mocujące w podstawie i jeden otwór roboczy w ramieniu. Wewnętrzne przejście z promieniem, zewnętrzne krawędzie z małą fazą.
- **Układ arkusza:** fragment arkusza A3, bez pełnej tabelki. Widok z przodu ramienia, widok z góry podstawy i mały widok izometryczny. Podziałka główna 1:1. Przekrój nie jest potrzebny.
- **Co dokładnie opisać:** płaskość dolnej powierzchni `0,05` bez bazy; oznaczyć dolną powierzchnię jako element bazowy A; boczną powierzchnię podstawy jako B; czołową powierzchnię podstawy jako C; prostopadłość osi otworu roboczego `⌀0,08 | A`; pozycję dwóch otworów mocujących `⌀0,20 | A | B | C` wraz z wymiarami TED. Zachować osobny wymiar średnicy otworów.
- **Czego nie pokazywać:** chropowatości, pasowań, spoin, tolerancji ogólnych, gwintów i więcej niż trzech ram tolerancji. Nie dodawać modyfikatora MMR, żeby obraz nie mieszał dwóch lekcji.
- **Po co jest obraz:** ma pokazać, że ramka nie działa samodzielnie. Jej sens zależy od miejsca przyłączenia, wymiaru cechy, TED i baz widocznych na tym samym rysunku.
- **Kadr i eksport:** poziomo 3:2, sugerowane 1800 x 1200 px. Białe lub przezroczyste tło arkusza, czarne linie CAD, bez interfejsu Inventora. Tekst musi zostać czytelny po wyświetleniu na szerokości około 700 px.

## 2. Układ baz A, B i C na płycie funkcjonalnej

- **Plik docelowy:** `static/img/wiedza/rysunek-techniczny/bazy-tolerancji-geometrycznych-plyta-bazowa.png`
- **Część:** prostokątna płyta 160 x 100 x 20 mm z frezowanym spodem, jednym długim bokiem oporowym, krótkim czołem oporowym, centralną kieszenią i szykiem czterech otworów przelotowych. Dodać jeden większy otwór ustalający, aby część miała jasny kierunek montażu.
- **Widok:** izometria modelu w lewym polu i rzut z góry z małym rzutem bocznym w prawym polu. Podziałka 1:1 dla rzutów, izometria `NTS` lub bez deklaracji skali, zależnie od szablonu.
- **Co dokładnie opisać:** dolna powierzchnia jako A, długi bok jako B, krótkie czoło jako C. W izometrii można użyć subtelnego koloru lub półprzezroczystych płaszczyzn tylko do pokazania kolejności styku. Na rzucie dodać jedną ramkę pozycji szyku otworów `⌀0,20 | A | B | C` oraz dwa wymiary TED od B i C. Jeśli Inventor pozwala, pokazać trzy pary punktów kontaktu jako osobną nakładkę, ale nie zasłaniać geometrii.
- **Czego nie pokazywać:** nie oznaczać baz alfabetem tylko dlatego, że są kolejno wygodne. Nie dodawać bazy D, MMR przy bazie, baz cząstkowych ani wspólnej bazy A-B. Nie robić przekroju.
- **Po co jest obraz:** ma dowodzić, że kolejność baz wynika z funkcji ustalenia części i orientuje cylindryczne pole pozycji. Ma też pokazać różnicę między elementem bazowym na detalu a abstrakcyjną płaszczyzną odniesienia.
- **Kadr i eksport:** poziomo 16:10, sugerowane 1800 x 1125 px. Bez interfejsu, ViewCube i siatki. Oznaczenia A, B, C mają być czytelne przy szerokości 700 px.

## 3. Stary i aktualny sposób organizacji tolerancji ogólnych na arkuszu

- **Plik docelowy:** `static/img/wiedza/rysunek-techniczny/iso-2768-a-iso-22081-tolerancje-ogolne-arkusz.png`
- **Część:** prosty frezowany klocek 120 x 70 x 25 mm z kieszenią, dwoma otworami przelotowymi i jedną powierzchnią funkcjonalną. Geometria ma być wystarczająco realna, ale nie może odciągać uwagi od uwag nad tabelką.
- **Układ:** dwa fragmenty tego samego arkusza A3 obok siebie. Lewy podpisany `Zapis spotykany w starszej dokumentacji`, prawy `Rozdzielone wymagania w aktualnym szablonie`. Widok główny i mały przekrój, podziałka 1:1.
- **Co dokładnie opisać po lewej:** pokazać popularny zapis `ISO 2768-mK` jako zapis historyczny. Dodać lokalną tolerancję jednego wymiaru, aby było jasne, że ma pierwszeństwo przed zapisem ogólnym.
- **Co dokładnie opisać po prawej:** dwa osobne, wyraźnie nazwane wiersze w obszarze uwag: `Tolerancje ogólne wymiarów liniowych i kątowych` oraz `Ogólne specyfikacje geometryczne`. W pierwszym wskazać `ISO 2768-1, klasa m`. W drugim nie wymyślać skrótu ani klasy. Wstawić tekst roboczy `według zatwierdzonej specyfikacji zakładowej opartej na ISO 22081`, a przed publikacją obrazu zastąpić go dokładnym zapisem uzgodnionym na podstawie posiadanego egzemplarza normy i zakładowej reguły. Dodać datę lub rewizję szablonu.
- **Czego nie pokazywać:** nie wpisywać `ISO 22081-K`, `ISO 2768-3` ani samego `ISO 22081` jako rzekomej klasy tabelarycznej. Nie pokazywać pełnej tabeli wartości normowych. Nie sugerować, że ISO 2768-1 jest już wycofana.
- **Po co jest obraz:** ma pokazać zmianę procesu, a nie tylko zmianę numeru normy. Stary zapis łączył klasę wymiarową i geometryczną, natomiast aktualizacja wymaga świadomego rozdzielenia obu grup wymagań.
- **Kadr i eksport:** poziomo 16:9, sugerowane 1920 x 1080 px. Bez interfejsu Inventora. Najważniejszy tekst w obszarze uwag powinien mieć co najmniej 28 px w pliku wynikowym.

## Kontrola przed przekazaniem plików

1. Otworzyć PNG w rzeczywistej szerokości około 700 px i sprawdzić odczyt ramek oraz liter baz.
2. Nie kadrować grotów, ramek, opisów `A`, `B`, `C` ani symboli średnicy.
3. Użyć tej samej czcionki rysunkowej i tej samej grupy grubości linii we wszystkich trzech obrazach.
4. Wyłączyć dekoracyjne cienie, perspektywę i tekstury materiałów. To dokumentacja, nie render produktu.
5. Zachować plik źródłowy Inventora z nazwanymi widokami, żeby po korekcie normy dało się odświeżyć PNG bez odtwarzania arkusza.
