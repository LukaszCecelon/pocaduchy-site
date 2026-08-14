# Rysunek techniczny: plan sekcji Wiedzy

Stan researchu: 2026-08-14. Ten dokument kończy fazę 1 przed rozpoczęciem pisania artykułów.

## Decyzja w skrócie

Sekcja powinna być zbiorem odpowiedzi na pojedyncze problemy z otwartego arkusza, a nie kursem prowadzonym od rodzajów ołówków do kompletnego rysunku. Plan obejmuje **54 konkretne strony**. Dokładnie trzy mają priorytet 1 i tworzą pierwszy pakiet: ramka tolerancji geometrycznej, bazy A/B/C oraz przejście od ISO 2768-2 do ISO 22081.

Ta trójka daje od razu przewagę nad typowym wynikiem wyszukiwania. Każdy temat ma duży koszt złej interpretacji, da się go wyjaśnić własnymi schematami i opiera się na normach, których status lub wydanie zmieniły się w ostatnich latach.

## Jak powstała lista

Research miał trzy warstwy:

1. **Język pytań.** Sprawdzałem polskie wyniki dla fraz wpisywanych przez konstruktora, technologa i kontrolera, między innymi `ramka tolerancji`, `bazy A B C`, `ISO 2768 mK wycofana`, `wymiar w nawiasie`, `jak wymiarować otwór`, `przekrój a kład`, `oznaczenia spoin` i `stan krawędzi ISO 13715`.
2. **Luka odpowiedzi.** Oceniałem, czy wynik pozwala wykonać następną czynność na rysunku. Wiele stron kończy się na definicji symbolu, pokazuje zrzut okna CAD albo powtarza materiał szkolny bez wyjaśnienia pola tolerancji, elementu tolerowanego i skutku dla kontroli.
3. **Aktualność norm.** Statusy sprawdzałem w katalogach ISO i PKN. Nie korzystałem z przypadkowych tabel jako źródła statusu. Szczególnie ważne są zmiany ISO 5459:2024, ISO 14405-1:2025, ISO 21920-1:2021 i ISO 22081:2021.

To nie jest badanie wolumenów z płatnego narzędzia SEO. Frazy niżej są rzeczywistymi formami widocznymi w wynikach, podpowiedziach, tytułach i pytaniach użytkowników, ale nie przypisuję im liczby wyszukiwań. Priorytet łączy widoczny popyt, koszt błędu na produkcji, lukę jakościową i możliwość udzielenia samodzielnej odpowiedzi.

## Co jest dziurą w polskim internecie

- **Materiały są najczęściej szkolne albo sprzedażowe.** Dobrze odpowiadają na `co to jest tolerancja`, ale słabo na `który element jest tolerowany`, `jak wygląda pole tolerancji` i `jak to zamocować do pomiaru`.
- **Zrzut z programu zastępuje interpretację.** Pomoc CAD opisuje pola okna dialogowego, ale nie mówi, czy zapis jest funkcjonalnie poprawny. Da się więc bezbłędnie kliknąć błędne wymaganie.
- **Stare oznaczenia żyją dłużej niż normy.** Nadal łatwo znaleźć `ISO 2768-mK` bez informacji, że część 2 wycofano, oraz symbolikę powierzchni opisaną wyłącznie przez ISO 1302, choć polskie wydanie PN-EN ISO 21920-1 zastąpiło PN-EN ISO 1302.
- **Przykład jest odklejony od kontroli.** Ramka bywa podpisana kolorowymi literami, lecz brakuje odpowiedzi, co kontrola jakości ma zmierzyć i względem jakiego układu.
- **Treści szerokie konkurują z konkretnym pytaniem.** Artykuł `wszystko o rysunku technicznym` zmusza do przewijania kilkunastu ekranów. Tu jedna strona ma rozwiązywać jeden typ decyzji i prowadzić do najbliższego następnego problemu.
- **Są też pojedyncze dobre materiały specjalistyczne.** Nie ma sensu ich przepisywać. Przewagą poCADuchów ma być szybsza ścieżka: odpowiedź w pierwszym akapicie, własny schemat, przypadek poprawny i błędny, skutek dla wykonania oraz jawny status normy.

## Znaczenie priorytetów

- **Priorytet 1:** pierwszy pakiet wzorcowy, dokładnie trzy strony.
- **Priorytet 2:** następny rdzeń sekcji. To pytania częste albo kosztowne, które powinny powstać przed rozbudową niszową.
- **Priorytet 3:** potrzebne dla kompletności kopalni wiedzy, ale węższe lub zależne od wcześniejszego artykułu.

## Lista tematów

### Widoki, linie i przekroje

| Nr | Roboczy tytuł i slug | Pytanie, na które strona odpowiada | Realne zapytania po polsku | Priorytet | Długość i główny nośnik |
| ---: | --- | --- | --- | ---: | --- |
| 1 | **Rodzaje linii: co pokazuje każda linia**<br>`linie-na-rysunku-technicznym` | Jaką linią pokazać kontur, oś, krawędź niewidoczną, płaszczyznę cięcia i urwanie, żeby wydruk nadal był czytelny? | `rodzaje linii rysunek techniczny`; `linia punktowa co oznacza`; `grubość linii rysunek techniczny` | 2 | 1800 słów, tabela + 4 SVG |
| 2 | **Rzutowanie europejskie i amerykańskie: gdzie trafia widok**<br>`rzutowanie-pierwszego-i-trzeciego-kata` | Jak rozpoznać metodę pierwszego i trzeciego kąta oraz po której stronie umieścić widok boczny? | `rzutowanie europejskie`; `first angle third angle różnica`; `symbol rzutowania` | 2 | 1500 słów, 3 SVG |
| 3 | **Widok główny i liczba rzutów: ile naprawdę potrzeba**<br>`widok-glowny-i-liczba-rzutow` | Który kierunek wybrać jako główny i kiedy dwa rzuty opisują detal lepiej niż trzy? | `ile rzutów rysunek techniczny`; `jak wybrać widok główny`; `minimalna liczba rzutów` | 3 | 1500 słów, porównanie + SVG + Inventor |
| 4 | **Przekrój pełny, półprzekrój i przekrój miejscowy**<br>`przekroje-pelny-polprzekroj-miejscowy` | Który rodzaj przekroju odsłoni potrzebną geometrię bez dokładania zbędnego widoku? | `rodzaje przekrojów rysunek techniczny`; `półprzekrój kiedy`; `przekrój miejscowy oznaczenie` | 2 | 2100 słów, 5 SVG + Inventor |
| 5 | **Kreskowanie przekrojów w części i złożeniu**<br>`kreskowanie-przekrojow` | Jak kreskować sąsiednie części, cienkie żebra i elementy, których wzdłużnie się nie kreskuje? | `kreskowanie przekrojów zasady`; `czy śruby kreskuje się w przekroju`; `żebro w przekroju rysunek` | 2 | 1800 słów, tabela + 4 SVG |
| 6 | **Kład a przekrój: co zostaje na rysunku**<br>`klad-a-przekroj` | Kiedy pokazać sam kształt przecięcia jako kład, a kiedy widok za płaszczyzną cięcia jako przekrój? | `kład a przekrój różnica`; `kład miejscowy rysunek techniczny`; `co to jest kład` | 2 | 1400 słów, 4 SVG |
| 7 | **Widok cząstkowy, miejscowy i szczegół w powiększeniu**<br>`widok-czastkowy-miejscowy-szczegol` | Jak pokazać tylko potrzebny fragment i jak oznaczyć jego granicę oraz podziałkę? | `widok cząstkowy rysunek techniczny`; `szczegół A podziałka`; `widok miejscowy oznaczenie` | 2 | 1700 słów, 4 SVG |
| 8 | **Widok urwany: jak skrócić długi detal bez utraty wymiaru**<br>`widok-urwany-i-linie-przerwania` | Jak przerwać wał, profil lub blachę, żeby czytelnik nie pomylił skróconego obrazu z długością części? | `widok urwany rysunek techniczny`; `linia przerwania wału`; `jak rysować długi wał` | 2 | 1400 słów, 3 SVG |
| 9 | **Linie niewidoczne czy przekrój: co będzie czytelniejsze**<br>`linie-niewidoczne-czy-przekroj` | Kiedy kreski ukrytych krawędzi wystarczą, a kiedy trzeba zrobić przekrój? | `linie niewidoczne w przekroju`; `czy rysować niewidoczne krawędzie`; `przekrój zamiast linii kreskowych` | 3 | 1300 słów, porównanie + 3 SVG |

### Wymiarowanie, otwory i gwinty

| Nr | Roboczy tytuł i slug | Pytanie, na które strona odpowiada | Realne zapytania po polsku | Priorytet | Długość i główny nośnik |
| ---: | --- | --- | --- | ---: | --- |
| 10 | **Linia wymiarowa, pomocnicza i odniesienia: gdzie kończyć grot**<br>`linie-wymiarowe-i-odniesienia` | Jak poprowadzić wymiar i odnośnik, żeby było jasne, czy opis dotyczy krawędzi, powierzchni czy całego elementu? | `zasady wymiarowania linie wymiarowe`; `linia odniesienia zakończenie`; `groty wymiarowe rysunek` | 2 | 1700 słów, 5 SVG |
| 11 | **Bazy wymiarowe: konstrukcyjna, obróbkowa i pomiarowa**<br>`bazy-wymiarowe-na-rysunku` | Od której powierzchni podawać wymiary, żeby funkcja, ustawienie na maszynie i kontrola nie używały trzech różnych początków? | `bazy wymiarowe`; `baza konstrukcyjna obróbkowa pomiarowa`; `od czego wymiarować detal` | 2 | 2200 słów, diagram decyzji + Inventor |
| 12 | **Łańcuch czy wymiarowanie od wspólnej bazy**<br>`lancuch-wymiarowy-czy-wspolna-baza` | Kiedy suma tolerancji w łańcuchu zabierze luz montażowy i które wymiary przenieść do wspólnej bazy? | `łańcuch wymiarowy tolerancje`; `wymiarowanie od bazy`; `kumulacja tolerancji` | 2 | 2100 słów, tabela + 4 SVG + wzór |
| 13 | **Wymiar w nawiasie, ramce, podkreślony i z gwiazdką**<br>`wymiar-pomocniczy-ted-gwiazdka` | Jak odróżnić wymiar pomocniczy, teoretycznie dokładny, niezgodny z podziałką i odwołanie do uwagi zakładowej? | `wymiar w nawiasie rysunek techniczny`; `wymiar w ramce co oznacza`; `gwiazdka przy wymiarze` | 2 | 1900 słów, tabela + 5 SVG |
| 14 | **Średnica, promień, sfera, kwadrat i grubość: który znak**<br>`symbole-wymiarowe-srednica-promien-sfera` | Który symbol postawić przed liczbą i kiedy znak jest potrzebny mimo widocznego kształtu? | `symbol średnicy rysunek techniczny`; `R promień oznaczenie`; `S średnica kuli rysunek` | 2 | 1600 słów, 6 SVG |
| 15 | **Faza na rysunku: jeden zapis czy dwa wymiary**<br>`wymiarowanie-faz` | Kiedy zapis `1 x 45°` jest jednoznaczny, a kiedy trzeba podać dwie długości albo kąt i średnicę? | `jak wymiarować fazę`; `oznaczenie fazy rysunek techniczny`; `faza 1x45` | 2 | 1500 słów, tabela + 4 SVG |
| 16 | **Stożek i pochylenie: średnice, kąt czy zbieżność**<br>`wymiarowanie-stozkow-i-pochylen` | Który zestaw wymiarów definiuje stożek bez nadmiaru i jak zapisać zbieżność? | `wymiarowanie stożka`; `zbieżność 1:10 rysunek`; `symbol stożka rysunek techniczny` | 3 | 1700 słów, 4 SVG + wzór |
| 17 | **Otwór przelotowy, ślepy i pogłębiony: kompletny zapis**<br>`wymiarowanie-otworow-i-poglebien` | Jak w jednym odnośniku podać średnicę, głębokość, pogłębienie walcowe lub stożkowe i liczbę otworów? | `jak wymiarować otwór ślepy`; `oznaczenie pogłębienia walcowego`; `otwór przelotowy rysunek techniczny` | 2 | 2300 słów, tabela + 7 SVG + Inventor |
| 18 | **Otwór gwintowany: głębokość gwintu i głębokość wiercenia**<br>`otwor-gwintowany-na-rysunku` | Jak zapisać gwint wewnętrzny tak, żeby warsztat nie pomylił pełnej głębokości gwintu z dnem wiertła? | `oznaczenie otworu gwintowanego`; `M8 głębokość gwintu rysunek`; `otwór ślepy gwintowany wymiarowanie` | 2 | 2100 słów, 6 SVG + Inventor |
| 19 | **Powtarzalne otwory, okrąg podziałowy i szyk**<br>`szyk-otworow-i-okrag-podzialowy` | Jak podać liczbę, rozstaw i średnicę podziałową bez wymiarowania każdego otworu osobno? | `6 otworów co 60 stopni rysunek`; `okrąg podziałowy otworów oznaczenie`; `szyk otworów wymiarowanie` | 2 | 1700 słów, 5 SVG |
| 20 | **Gwint na widoku i przekroju: linie oraz pełne oznaczenie**<br>`gwint-na-rysunku-technicznym` | Które średnice gwintu rysować linią grubą i cienką oraz co musi znaleźć się w oznaczeniu? | `jak rysować gwint`; `oznaczenie gwintu na rysunku`; `gwint w przekroju linie` | 2 | 2000 słów, tabela + 6 SVG |
| 21 | **Rowek, podtoczenie i wybieg: jak nie wymiarować do ostrego naroża**<br>`wymiarowanie-rowkow-podtoczen-i-wybiegow` | Jak opisać rowek lub podtoczenie, gdy funkcjonalna krawędź nie jest idealnym przecięciem dwóch powierzchni? | `wymiarowanie rowka rysunek`; `podtoczenie rysunek techniczny`; `wybieg gwintu oznaczenie` | 3 | 1900 słów, 5 SVG + link do Segera |

### Tolerancje wymiarowe i ogólne

| Nr | Roboczy tytuł i slug | Pytanie, na które strona odpowiada | Realne zapytania po polsku | Priorytet | Długość i główny nośnik |
| ---: | --- | --- | --- | ---: | --- |
| 22 | **Tolerancja wymiaru: zapis symetryczny, jednostronny i graniczny**<br>`zapis-tolerancji-wymiarowej` | Jak zapisać dopuszczalny zakres i szybko policzyć oba wymiary graniczne bez pomylenia znaków? | `jak zapisać tolerancję wymiaru`; `tolerancja jednostronna`; `wymiar graniczny górny dolny` | 2 | 1900 słów, tabela + 5 SVG + wzór |
| 23 | **Pasowanie H7/g6 na rysunku części i złożenia**<br>`pasowanie-na-rysunku-technicznym` | Gdzie wpisać pole tolerancji otworu i wałka oraz jak nie przenieść zapisu złożeniowego na zły rysunek wykonawczy? | `H7 g6 co oznacza`; `pasowanie zapis na rysunku`; `H7/g6 rysunek złożeniowy` | 2 | 2000 słów, wykres pól + tabela + link do kalkulatora |
| 24 | **ISO 2768-mK po wycofaniu części 2: co wpisać dziś**<br>`iso-2768-a-iso-22081-tolerancje-ogolne` | Co nadal oznacza `m`, co stało się z klasą `K` i dlaczego ISO 22081 nie jest prostą podmianą tekstu w tabelce? | `ISO 2768 mK wycofana`; `co zamiast ISO 2768-2`; `ISO 22081 po polsku`; `tolerancje ogólne rysunek techniczny` | 1 | 2400 słów, tabela statusów + 5 SVG + Inventor |
| 25 | **Których wymiarów nie obejmuje tolerancja ogólna**<br>`zakres-tolerancji-ogolnych` | Czy zapis ogólny obejmuje gwint, wymiar w nawiasie, wymiar TED, promień, surowy odlew i cechę już tolerowaną indywidualnie? | `czego nie obejmuje ISO 2768`; `tolerancja ogólna a gwint`; `wymiar pomocniczy tolerancja` | 2 | 1800 słów, macierz przypadków + 3 SVG |

### Tolerancje geometryczne i bazy

| Nr | Roboczy tytuł i slug | Pytanie, na które strona odpowiada | Realne zapytania po polsku | Priorytet | Długość i główny nośnik |
| ---: | --- | --- | --- | ---: | --- |
| 26 | **Ramka tolerancji geometrycznej: co znaczy każde pole**<br>`ramka-tolerancji-geometrycznej` | Jak przejść od lewej do prawej przez symbol, kształt i wartość pola, modyfikator oraz układ baz i ustalić, co naprawdę jest kontrolowane? | `ramka tolerancji`; `jak czytać tolerancje geometryczne`; `co oznaczają pola tolerancji geometrycznej` | 1 | 2400 słów, tabela + 7 SVG + Inventor |
| 27 | **Symbole tolerancji geometrycznych i kształt pola**<br>`symbole-tolerancji-geometrycznych` | Który symbol ogranicza kształt, kierunek, położenie albo bicie i czy pole ma postać dwóch linii, płaszczyzn, okręgów czy walca? | `symbole tolerancji geometrycznych`; `tolerancje kształtu i położenia symbole`; `pole tolerancji walcowości` | 2 | 2600 słów, duża tabela + 12 małych SVG |
| 28 | **Bazy A, B i C: jak ustalić detal do pomiaru**<br>`bazy-tolerancji-geometrycznych` | Co oznacza kolejność A, B, C, jakie stopnie swobody odbiera i dlaczego baza nie jest po prostu powierzchnią dotkniętą suwmiarką? | `bazy A B C tolerancje geometryczne`; `baza główna drugorzędna trzeciorzędna`; `jak wybrać bazę pomiarową` | 1 | 2500 słów, tabela + 7 SVG + Inventor |
| 29 | **Symbol bazy przy powierzchni, wymiarze i osi**<br>`jak-wskazac-element-bazowy` | Gdzie przyłączyć trójkąt bazy, żeby wskazać powierzchnię, oś walca albo płaszczyznę środkową, a nie sąsiedni element? | `symbol bazy na rysunku`; `baza na osi otworu`; `oznaczenie bazy powierzchni` | 2 | 1800 słów, 7 SVG |
| 30 | **Wymiary TED w tolerancji pozycji**<br>`wymiary-ted-i-tolerancja-pozycji` | Dlaczego wymiar w prostokątnej ramce nie ma własnej tolerancji i skąd bierze się dopuszczalne przesunięcie otworu? | `wymiar TED`; `wymiar w prostokątnej ramce`; `basic dimension po polsku` | 2 | 1800 słów, 5 SVG |
| 31 | **Tolerancja pozycji szyku otworów: zapis i kontrola**<br>`tolerancja-pozycji-otworow` | Jak zdefiniować pozycję osi kilku otworów względem baz i wymiarów TED, bez podwójnego tolerowania współrzędnych? | `tolerancja pozycji otworu`; `pozycja otworów A B C`; `tolerancja szyku otworów` | 2 | 2300 słów, 6 SVG + Inventor |
| 32 | **Prostoliniowość, płaskość, okrągłość i walcowość bez bazy**<br>`tolerancje-ksztaltu-bez-bazy` | Które tolerancje kształtu działają bez odniesienia i jaki fragment cechy każda z nich ogranicza? | `płaskość a baza`; `walcowość co oznacza`; `tolerancje kształtu bez bazy` | 2 | 2100 słów, tabela + 8 SVG |
| 33 | **Równoległość, prostopadłość i nachylenie: czego są względem**<br>`tolerancje-kierunku` | Jak wybrać element tolerowany i bazę, żeby zapis kontrolował właściwą powierzchnię lub oś? | `tolerancja prostopadłości`; `równoległość względem bazy`; `tolerancja nachylenia` | 2 | 2100 słów, 7 SVG + Inventor |
| 34 | **Bicie promieniowe i bicie całkowite: która kontrola**<br>`bicie-promieniowe-i-calkowite` | Kiedy pojedynczy przekrój obrotowy wystarcza, a kiedy wymaganie ma objąć całą powierzchnię podczas pełnego obrotu? | `bicie promieniowe a całkowite`; `tolerancja bicia wału`; `jak mierzyć bicie` | 2 | 2000 słów, 6 SVG + Inventor |
| 35 | **Profil linii i profil powierzchni: kiedy zastępuje kilka tolerancji**<br>`profil-linii-i-powierzchni` | Jak objąć jednym wymaganiem złożony kontur i kiedy profil kontroluje też kierunek oraz położenie względem baz? | `tolerancja profilu powierzchni`; `profil linii symbol`; `profile tolerance ISO` | 2 | 2200 słów, 6 SVG + Inventor |
| 36 | **Maksimum materiału MMR: skąd bierze się bonus tolerancji**<br>`maksimum-materialu-mmr` | Kiedy modyfikator M wiąże wymiar z geometrią i jak policzyć dodatkową tolerancję pozycji otworu? | `warunek maksimum materiału`; `MMC bonus tolerance po polsku`; `M w kółku tolerancja` | 2 | 2400 słów, tabela + 6 SVG + wzór |
| 37 | **CZ i oddzielne pola: wspólna strefa dla kilku cech**<br>`wspolna-strefa-tolerancji-cz` | Kiedy kilka powierzchni ma mieścić się w jednej strefie, a kiedy każda dostaje własną niezależną strefę? | `CZ tolerancja geometryczna`; `wspólna strefa tolerancji`; `common zone ISO 1101` | 3 | 1700 słów, 5 SVG |
| 38 | **Bazy cząstkowe i punkty bazowe: gdy cała powierzchnia nie pracuje**<br>`bazy-czastkowe-datum-targets` | Jak wskazać konkretne punkty, linie lub obszary podparcia, gdy odlew albo spawana rama nie może bazować całą powierzchnią? | `bazy cząstkowe rysunek`; `datum target po polsku`; `punkty bazowe CMM` | 3 | 2100 słów, 6 SVG + Inventor |

### Struktura powierzchni i krawędzie

| Nr | Roboczy tytuł i slug | Pytanie, na które strona odpowiada | Realne zapytania po polsku | Priorytet | Długość i główny nośnik |
| ---: | --- | --- | --- | ---: | --- |
| 39 | **Nowy znak struktury powierzchni według ISO 21920-1**<br>`znak-chropowatosci-iso-21920` | Co zmieniło się po ISO 1302 i jak czytać aktualny zapis wymagania profilowego? | `ISO 1302 wycofana`; `ISO 21920 znak chropowatości`; `nowe oznaczenie chropowatości` | 2 | 2300 słów, tabela zmian + 7 SVG |
| 40 | **Pola znaku chropowatości: parametr, filtr i granica**<br>`pola-znaku-chropowatosci` | Gdzie wpisać Ra lub Rz, wartość graniczną, filtr, kierunek śladu i wymagany proces, żeby zapis dało się skontrolować? | `jak czytać znak chropowatości`; `pola znaku chropowatości`; `Ra na rysunku gdzie wpisać` | 2 | 2300 słów, 8 SVG + link do tablicy Ra/Rz |
| 41 | **Kierunek śladów obróbki: symbole i skutek dla uszczelnienia**<br>`kierunek-sladu-obrobki` | Jak wskazać kierunek struktury i kiedy ślad promieniowy lub śrubowy zmienia szczelność mimo poprawnego Ra? | `kierunek śladów obróbki symbole`; `symbol M C R chropowatość`; `ślad śrubowy simmering` | 3 | 1800 słów, tabela + 7 SVG + zdjęcie |
| 42 | **Stan krawędzi według ISO 13715: plus, minus i zakres**<br>`stan-krawedzi-iso-13715` | Jak zapisać dopuszczalny nadmiar materiału, ubytek lub obie możliwości na krawędzi o nieokreślonym kształcie? | `ISO 13715 oznaczenie`; `stan krawędzi plus minus`; `grat na rysunku technicznym` | 2 | 2100 słów, 7 SVG + zdjęcie |
| 43 | **Ogratować czy sfazować: uwaga ogólna a zdefiniowana krawędź**<br>`ogratowanie-a-fazowanie-krawedzi` | Kiedy wystarczy wymaganie stanu krawędzi, a kiedy funkcja wymaga konkretnej fazy lub promienia? | `ogratować wszystkie krawędzie zapis`; `ostre krawędzie stępić`; `gratowanie a fazowanie` | 3 | 1700 słów, tabela + 5 SVG + zdjęcie |

### Połączenia na rysunku

| Nr | Roboczy tytuł i slug | Pytanie, na które strona odpowiada | Realne zapytania po polsku | Priorytet | Długość i główny nośnik |
| ---: | --- | --- | --- | ---: | --- |
| 44 | **Symbol spoiny: strzałka, linia odniesienia i strona złącza**<br>`oznaczenia-spoin-na-rysunku` | Jak rozpoznać system A lub B i wskazać spoinę po stronie strzałki bez odwrócenia złącza na produkcji? | `oznaczenia spoin na rysunku`; `ISO 2553 strona strzałki`; `system A system B spoiny` | 2 | 2400 słów, tabela + 8 SVG + Inventor |
| 45 | **Wymiar spoiny, długość, podziałka i spoina dookoła**<br>`wymiary-i-symbole-spoin` | Gdzie wpisać a lub z, długość odcinka, podziałkę, obwód i wykonanie na montażu? | `a5 spoina co oznacza`; `spoina przerywana oznaczenie`; `spoina dookoła symbol` | 2 | 2200 słów, 8 SVG + Inventor |

### Arkusz, tabelka i obieg dokumentu

| Nr | Roboczy tytuł i slug | Pytanie, na które strona odpowiada | Realne zapytania po polsku | Priorytet | Długość i główny nośnik |
| ---: | --- | --- | --- | ---: | --- |
| 46 | **Format arkusza i tabelka rysunkowa: minimalny komplet pól**<br>`format-arkusza-i-tabelka-rysunkowa` | Jak dobrać A4 lub A3 i które pola tabelki identyfikują dokument, część, materiał, autora oraz stan wydania? | `formaty arkuszy rysunek techniczny`; `co zawiera tabelka rysunkowa`; `tabliczka rysunkowa wymiary` | 2 | 2100 słów, tabela + 4 SVG + Inventor |
| 47 | **Podziałka główna i lokalna: co wpisać przy widoku**<br>`podzialka-rysunku-i-widoku` | Jak oznaczyć różne skale na jednym arkuszu i dlaczego wymiaru nie wolno brać linijką z wydruku? | `podziałki rysunkowe tabela`; `skala 2:1 co oznacza`; `różne podziałki na rysunku` | 2 | 1600 słów, tabela + 4 SVG |
| 48 | **Rewizja rysunku: co zmienić w tabelce, BOM i pliku**<br>`rewizje-rysunku-technicznego` | Jak oznaczyć zmianę tak, żeby produkcja nie połączyła starego PDF, nowego modelu i nieaktualnej listy części? | `rewizja rysunku technicznego`; `tabela zmian rysunku`; `revision A B rysunek` | 2 | 2100 słów, przepływ + 3 SVG + Inventor |
| 49 | **Uwagi ogólne: jednostki, tolerancje, krawędzie i pierwszeństwo zapisów**<br>`uwagi-ogolne-na-rysunku` | Co wpisać raz dla całego detalu i jak ustalić hierarchię, gdy uwaga, wymiar lokalny i model 3D mówią co innego? | `uwagi ogólne rysunek techniczny`; `co wpisać nad tabelką rysunkową`; `jednostki na rysunku technicznym` | 2 | 2000 słów, checklista + 3 SVG |

### Rysunek złożeniowy, pozycje i lista części

| Nr | Roboczy tytuł i slug | Pytanie, na które strona odpowiada | Realne zapytania po polsku | Priorytet | Długość i główny nośnik |
| ---: | --- | --- | --- | ---: | --- |
| 50 | **Rysunek złożeniowy a wykonawczy: których danych nie mieszać**<br>`rysunek-zlozeniowy-a-wykonawczy` | Które wymiary i wymagania należą do złożenia, a które muszą trafić na rysunek pojedynczej części? | `rysunek złożeniowy a wykonawczy`; `co zawiera rysunek złożeniowy`; `wymiary na rysunku złożeniowym` | 2 | 2100 słów, macierz + Inventor |
| 51 | **Numery pozycji: prowadzenie odnośników bez krzyżowania**<br>`numery-pozycji-na-rysunku-zlozeniowym` | Jak rozmieścić balony i odnośniki, żeby każda pozycja jednoznacznie wskazywała część i zgadzała się z BOM? | `numery pozycji rysunek złożeniowy`; `balony na rysunku technicznym`; `ISO 6433 pozycje` | 2 | 1700 słów, 5 SVG + Inventor |
| 52 | **Lista części BOM: pola, ilość i wariant części**<br>`lista-czesci-bom-na-rysunku` | Jakie minimum danych pozwala kupić lub wykonać właściwy element i nie zgubić wariantu materiału albo długości? | `lista części rysunek złożeniowy`; `co zawiera BOM`; `tabela części rysunek techniczny` | 3 | 1900 słów, tabela + Inventor |

### Adnotacja 3D i model jako nośnik danych

| Nr | Roboczy tytuł i slug | Pytanie, na które strona odpowiada | Realne zapytania po polsku | Priorytet | Długość i główny nośnik |
| ---: | --- | --- | --- | ---: | --- |
| 53 | **Adnotacje 3D PMI: kiedy model może być dokumentem nadrzędnym**<br>`adnotacje-3d-pmi-i-mbd` | Jakie warunki musi spełnić model z wymiarami, tolerancjami i metadanymi, żeby odbiorca nie potrzebował zgadywać na podstawie geometrii? | `PMI model 3D`; `MBD co to jest`; `adnotacje 3D Inventor`; `ISO 16792` | 2 | 2400 słów, diagram + Inventor |
| 54 | **Pakiet wydania 3D: widoki, format neutralny i jedno źródło prawdy**<br>`pakiet-wydania-modelu-3d` | Co przekazać wykonawcy oprócz pliku natywnego i jak zapisać pierwszeństwo modelu, PDF, STEP oraz not zmian? | `jak przekazać model 3D na produkcję`; `STEP z PMI`; `model czy rysunek nadrzędny`; `MBD release package` | 2 | 2200 słów, checklista + przepływ + Inventor |

## Aktualne normy i pułapki statusu

Poniższa tabela jest mapą do researchu stron, nie licencją na przepisywanie norm. Status sprawdzono 2026-08-14.

| Obszar | Oznaczenie, na którym opieramy treść | Co trzeba powiedzieć czytelnikowi |
| --- | --- | --- |
| Zasady przedstawiania | ISO 128-1:2020, ISO 128-2:2022, ISO 128-3:2022 | Stare części ISO 128 dotyczące linii, widoków i przekrojów były porządkowane i zastępowane. Nie cytować automatycznie numerów z materiałów uczelnianych sprzed tej zmiany. |
| Rzutowanie | ISO 5456-2:1996 | Norma jest stara, ale ISO potwierdziło ją w 2025 r. Data wydania sama nie oznacza wycofania. |
| Wymiarowanie | ISO 129-1:2018 z Amd 1:2020 | ISO podaje, że wydanie jest aktualne, ale przeznaczone do rewizji. Rozdzielić sposób zapisu wymiaru od znaczenia tolerancji wymiaru. |
| Wymiary liniowe | ISO 14405-1:2025; w Polsce PN-EN ISO 14405-1:2026-02 | ISO 14405-1:2016 jest już wycofana. To świeża zmiana, której wiele stron jeszcze nie uwzględnia. |
| Tolerancje ogólne wymiarów | ISO 2768-1:1989; następne wydanie ISO 2768 ma etap 60.00 | Część 1 nadal jest opublikowana w katalogu ISO, ale jej następca jest w trakcie publikacji. Status trzeba sprawdzić ponownie tuż przed publikacją kolejnej aktualizacji artykułu. |
| Tolerancje ogólne geometrii | ISO 22081:2021 | ISO 2768-2:1989 jest wycofana i zastąpiona przez ISO 22081:2021. ISO 22081 nie ma klas H, K, L do mechanicznego przepisania. |
| Podstawy GPS | ISO 8015:2011 | Używać do wyjaśnienia zasady niezależności i kompletności specyfikacji, bez robienia osobnego wykładu z macierzy GPS. |
| Tolerancje geometryczne | ISO 1101:2017 | To aktualny fundament symboli i interpretacji ramki. Norma została potwierdzona w 2022 r. |
| Bazy | ISO 5459:2024; w Polsce PN-EN ISO 5459:2025-03 | Wydanie z 2011 r. zostało zastąpione. Artykuł o bazach musi być pisany pod aktualne wydanie 2024. |
| Warunki materiałowe | ISO 2692:2021 | Wydanie 2014 jest wycofane. MMR, LMR i RPR dotyczą elementów wymiarowalnych wskazanych w zakresie normy. |
| Pasowania | ISO 286-1:2010 z Cor 1:2013 oraz ISO 286-2:2010 z Cor 1:2013 | Oddzielić kod pola tolerancji od wyniku liczbowego i prowadzić do kalkulatora pasowań. |
| Struktura powierzchni | ISO 21920-1:2021, ISO 21920-2:2021, ISO 21920-3:2021; PN-EN ISO 21920-1:2022-06 | ISO 1302:2002 i PN-EN ISO 1302:2004 są wycofane. Nowy zapis trzeba pokazać obok starego, bo stary nadal jest na rysunkach w obiegu. |
| Krawędzie | ISO 13715:2017; PN-EN ISO 13715:2020-03 | Aktualne wydanie potwierdzone przez ISO w 2024 r. Zdefiniowana faza podlega ISO 129-1, a nie zapisowi krawędzi o nieokreślonym kształcie. |
| Gwinty na rysunku | ISO 6410-1:1993 | ISO potwierdziło wydanie w 2024 r. Nie mylić aktualności konwencji rysunkowej z tabelami wymiarów gwintów. |
| Otwory | ISO 15786:2008 | Norma jest aktualna i potwierdzona w 2024 r. Obejmuje uproszczone przedstawienie oraz wymiarowanie otworów, pogłębień, gwintów wewnętrznych i faz. |
| Stożki | ISO 3040:2016 | Wydanie 2009 jest wycofane. |
| Spoiny | ISO 2553:2019, wersja skorygowana 2021 | Norma jest opublikowana, ale ma status `to be revised`, a projekt następcy jest rozwijany. Trzeba jasno nazwać system A lub B. |
| Arkusze i tabelka | ISO 5457:1999 z Amd 1:2010, ISO 5455:1979, ISO 7200:2004 | Wszystkie trzy nadal są opublikowane. ISO 5455 i ISO 7200 potwierdzono w 2025 r.; ISO 5457 jest w przeglądzie. |
| Pozycje i lista części | ISO 6433:2012, ISO 7573:2008 | Stare ISO 6433:1981 i ISO 7573:1983 są wycofane. |
| Dokument i rewizja | ISO 11442:2006 | Norma jest w przeglądzie w 2026 r. Nie przypisywać jej szczegółowego systemu liter rewizji bez sprawdzenia pełnego tekstu i reguł zakładowych. |
| Model 3D jako definicja | ISO 16792:2021 | Obsługuje model-only i model z rysunkiem 2D. Wydanie jest przeznaczone do rewizji, a projekt następcy jest w toku. |

## Architektura informacji

### Układ sekcji na hubie

Kafelki powinny odpowiadać etapom pracy z dokumentacją, nie numerom norm:

1. **Pokaż geometrię:** linie, rzuty, przekroje, kłady, widoki cząstkowe i urwane.
2. **Podaj wymiary:** bazy wymiarowe, łańcuchy, otwory, fazy, stożki, gwinty.
3. **Określ dopuszczalne odchyłki:** tolerancje wymiarowe, ogólne, pasowania i GPS.
4. **Ustal geometrię względem baz:** ramki, symbole, bazy, TED, MMR i pola wspólne.
5. **Opisz powierzchnię i krawędzie:** ISO 21920, kierunek śladu, ISO 13715.
6. **Opisz połączenie:** spoiny, gwinty i pasowania na rysunku.
7. **Wydaj dokument:** arkusz, tabelka, podziałka, rewizja i uwagi ogólne.
8. **Wydaj złożenie lub model 3D:** pozycje, BOM, PMI, pakiet wydania.

### Wejście z wyszukiwarki

Czytelnik nie ma zaczynać od huba. Każda strona musi działać jako lądowanie na konkretną frazę i mieć ten sam szkielet orientacyjny:

1. pierwszy akapit daje odpowiedź i wskazuje najgroźniejszą pułapkę;
2. pierwszy schemat pokazuje poprawny zapis w skali telefonu;
3. tabela `zapis -> znaczenie -> skutek dla wykonania lub kontroli` pozwala znaleźć przypadek bez czytania całości;
4. przykład poprawny i błędny pokazują, co zmieni się na hali;
5. krótka checklista zamyka decyzję;
6. sekcja `Normy i zakres` podaje wydanie, status, datę sprawdzenia i granicę artykułu;
7. FAQ zbiera 5 do 7 form pytania używanych w wyszukiwarce.

### Linkowanie, które ma zatrzymać czytelnika

Linki powinny iść w dwóch kierunkach:

- **Wstecz do warunku:** pozycja otworów prowadzi do baz A/B/C i wymiarów TED; pasowanie prowadzi do zapisu tolerancji wymiarowej.
- **Dalej do skutku:** ramka prowadzi do kształtu pola i kontroli; otwór gwintowany prowadzi do tabeli gwintów; stan krawędzi prowadzi do chropowatości, gdy ważna jest powierzchnia po gratowaniu.

Najważniejsze klastry linków:

- `ramka tolerancji` -> `symbole i pola` -> `bazy A/B/C` -> `TED` -> `pozycja otworów` -> `MMR`;
- `bazy wymiarowe` -> `łańcuch` -> `otwory` -> `pasowanie` -> `/narzedzia/pasowania/`;
- `gwint na rysunku` -> `otwór gwintowany` -> `/wiedza/gwinty-metryczne-tabela/`;
- `rowki i podtoczenia` -> `/wiedza/rowki-pod-pierscienie-osadcze-seger/`;
- `znak struktury powierzchni` -> `pola znaku` -> `kierunek śladu` -> `/wiedza/chropowatosc-powierzchni/`;
- `wymiary i jednostki` -> `/przelicznik/` tylko tam, gdzie czytelnik rzeczywiście przechodzi między mm, calami, stopniami lub mikrometrami;
- `rysunek złożeniowy` -> `numery pozycji` -> `BOM` -> `pakiet wydania 3D`.

Nie robimy ślepego bloku `zobacz też` z sześcioma linkami. Każdy link ma stać w zdaniu rozwiązującym bieżący problem.

## Lista rysunków według ścieżki wykonania

### 1. Własne SVG, ścieżka domyślna

Plan zakłada co najmniej 40 małych schematów. Nie będą kopiami ilustracji normowych. Każdy powstaje od zera na własnej geometrii.

1. Próbnik sześciu linii z realnym zastosowaniem na jednej prostej części.
2. Ta sama część w rzutowaniu pierwszego i trzeciego kąta wraz z symbolem metody.
3. Przekrój pełny, półprzekrój, miejscowy i łamany jako cztery osobne schematy.
4. Kład przesunięty i kład miejscowy zestawione z przekrojem.
5. Widok cząstkowy, szczegół A i dwa typy linii urwania.
6. Poprawne i błędne zakończenia linii odniesienia.
7. Łańcuch trzech wymiarów oraz te same cechy od wspólnej bazy.
8. Nawias, ramka TED, podkreślenie i gwiazdka jako cztery niezależne przypadki.
9. Zestaw znaków średnicy, promienia, sfery, kwadratu i grubości.
10. Trzy poprawne warianty wymiarowania fazy i jeden nadmiarowy.
11. Otwór przelotowy, ślepy, pogłębienie walcowe i stożkowe.
12. Otwór gwintowany z osobną głębokością pełnego gwintu i wiercenia.
13. Szyk na okręgu podziałowym oraz szyk prostokątny z TED.
14. Gwint zewnętrzny i wewnętrzny w widoku oraz przekroju.
15. Wymiar nominalny z odchyłkami i przedział wymiarów granicznych.
16. Pola tolerancji H7/g6 względem linii zerowej.
17. Historia zapisu `ISO 2768-mK`: część 1 pozostaje, część 2 prowadzi do ISO 22081.
18. Mapa ramki tolerancji z wyróżnianym kolejno każdym polem.
19. Cztery przykładowe ramki: płaskość, prostopadłość, pozycja i bicie.
20. Pola tolerancji: dwie linie, dwie płaszczyzny, dwa okręgi i walec.
21. Układ 3-2-1 z odebranymi stopniami swobody.
22. Baza płaszczyzny, baza osi walca i baza płaszczyzny środkowej.
23. Pozycja otworu z TED oraz cylindrycznym polem tolerancji.
24. MMR na otworze z trzema rzeczywistymi średnicami i rosnącym bonusem.
25. Oddzielne pola dwóch powierzchni oraz wspólna strefa CZ.
26. Bazy cząstkowe jako trzy punkty podparcia odlewu.
27. Stary znak ISO 1302 i nowa struktura zapisu ISO 21920 bez kopiowania rysunku z normy.
28. Pola znaku struktury powierzchni rozbite na trzy czytelne schematy.
29. Symbole kierunku śladu pokazane na prostych własnych teksturach.
30. Krawędź idealna, nadmiar materiału, ubytek i zakres dwustronny według logiki ISO 13715.
31. Ogratowanie kontra faza 1 x 45° na tej samej krawędzi.
32. System A i B oznaczania strony spoiny na własnym złączu teowym.
33. Spoina pachwinowa ciągła, przerywana, dookoła i na montażu.
34. Format A4/A3, strefy arkusza i uproszczona tabelka bez danych firmowych.
35. Ten sam detal pokazany 1:1, 2:1 i 1:2 przy niezmienionej liczbie wymiarowej.
36. Przepływ rewizji: CAD -> PDF -> BOM -> wydanie.
37. Poprawne i krzyżujące się odnośniki pozycji.
38. Macierz `rysunek części / złożenie / model z PMI`.
39. Model z adnotacjami uporządkowanymi w zapisanych widokach.
40. Hierarchia źródeł w pakiecie wydania wraz z jednoznaczną rewizją.

### 2. Rysunki do wykonania w Inventorze

Te obrazy są potrzebne tam, gdzie schemat nie pokaże prawdziwego arkusza, geometrii części albo złożenia. Szczegółowe zamówienia dla pierwszych trzech artykułów trafią do `analizy/rysunek-techniczny-obrazy.md`.

1. Płyta bazowa z otworami, kieszenią i trzema płaszczyznami funkcjonalnymi, pokazana jako rysunek wykonawczy.
2. Ta sama płyta z poprawnym i błędnym układem baz A/B/C.
3. Wspornik z ramkami płaskości, prostopadłości i pozycji, do pokazania całego kontekstu adnotacji.
4. Tuleja stopniowana z przekrojem, rowkiem, fazą i otworem gwintowanym.
5. Wał długi pokazany pełny i jako widok urwany.
6. Korpus z otworem ślepym, pogłębieniem oraz przekrojem miejscowym.
7. Płyta z szykiem otworów kontrolowanym pozycją względem baz.
8. Wał z biciem promieniowym i całkowitym oraz powierzchnią pod łożysko.
9. Prosty wspornik spawany z kompletem dwóch oznaczeń spoin.
10. Arkusz A3 z tabelką, widokiem lokalnym w innej podziałce i tabelą rewizji.
11. Małe złożenie 6 do 8 części z pozycjami i listą części.
12. Model MBD z zapisanymi widokami PMI, materiałem, tolerancjami i stanem wydania.

### 3. Zdjęcia warsztatowe

Zdjęcie ma pokazać rzecz, której schemat nie odda. Nie planuję zdjęć dekoracyjnych.

1. Grat i ubytek na dwóch rzeczywistych krawędziach po cięciu lub frezowaniu.
2. Czop pod uszczelnienie z widocznym śladem osiowym, obwodowym i śrubowym, jeśli uda się przygotować uczciwe próbki.
3. Spoina pachwinowa ciągła i przerywana na własnych próbkach, z linijką tylko jako pomoc skali.
4. Wydruk A3 po redukcji do A4 pokazujący, które linie i opisy przestają być czytelne.

## Czego świadomie nie robimy

- Nie robimy kursu odręcznego kreślenia, ćwiczeń z geometrii wykreślnej ani listy przyborów. Konstruktor z otwartym arkuszem nie rozwiąże przez to bieżącej decyzji.
- Nie przepisujemy całych norm i pełnych katalogów symboli. Podajemy tyle reguł, ile potrzeba do interpretacji przykładu, oraz precyzyjnie wskazujemy normę i wydanie.
- Nie tworzymy jednej strony `wszystkie symbole rysunku`. Taka strona będzie długa, trudna w wyszukiwaniu i pozbawiona kontekstu wykonania.
- Nie wchodzimy w obliczenia wytrzymałości spoin, śrub i połączeń wciskowych. Sekcja mówi, jak wynik decyzji zapisać, a nie zastępuje obliczeń konstrukcyjnych.
- Nie budujemy pełnego podręcznika metrologii CMM. Pokazujemy, co zapis każe ustalić i kontrolować, ale strategia pomiaru i niepewność zasługują na osobny dział.
- Nie opisujemy szczegółowo rysunku budowlanego, elektrycznego, P&ID ani schematów hydraulicznych. Zakres główny to dokumentacja części i zespołów maszyn.
- Nie narzucamy jednego zakładowego systemu rewizji, nazw plików ani gwiazdek przy wymiarach jako reguły ISO. Pokazujemy wymagane znaczenie i każemy zdefiniować konwencję w systemie dokumentacji.
- Nie obiecujemy, że 3D zastąpi 2D samym dodaniem kilku wymiarów. Model jako źródło wymaga adnotacji semantycznych, zapisanych widoków, metadanych, formatu wymiany i reguły pierwszeństwa.
- Nie pobieramy ani nie odrysowujemy ilustracji z norm, poradników i katalogów. Własny schemat ma nową geometrię i własny układ informacji.

## Pierwsze trzy strony do fazy 2

1. `ramka-tolerancji-geometrycznej`
2. `bazy-tolerancji-geometrycznych`
3. `iso-2768-a-iso-22081-tolerancje-ogolne`

To spójny mini-klaster. Pierwsza strona uczy czytać zapis, druga ustala odniesienie, a trzecia porządkuje wymagania stosowane do cech bez indywidualnego zapisu. Każda odpowiada na inne pytanie, ale mogą się naturalnie linkować i wspólnie sprawdzą format: schemat symbolu, rysunek części, tabela decyzji, ostrzeżenie o statusie normy oraz checklista przed wydaniem.

## Źródła researchu

### Katalogi norm i źródła pierwotne

- ISO 128-1:2020: https://www.iso.org/standard/65296.html
- ISO 128-2:2022: https://www.iso.org/standard/83355.html
- ISO 128-3:2022: https://www.iso.org/standard/83356.html
- ISO 129-1:2018: https://www.iso.org/standard/64007.html
- ISO 2768-1:1989 i projekt następcy: https://www.iso.org/standard/7748.html oraz https://www.iso.org/standard/85741.html
- ISO 2768-2:1989, status wycofania: https://www.iso.org/standard/7749.html
- ISO 22081:2021: https://www.iso.org/standard/72514.html
- PN-EN ISO 22081:2021-07: https://sklep.pkn.pl/pn-en-iso-22081-2021-07p.html
- ISO 1101:2017: https://www.iso.org/standard/66777.html
- PN-EN ISO 1101:2017-05: https://sklep.pkn.pl/normy/pn-en-iso-1101-2017-05p.html
- ISO 5459:2024: https://www.iso.org/standard/87855.html
- PN-EN ISO 5459:2025-03: https://sklep.pkn.pl/normy/pn-en-iso-5459-2025-03e.html
- ISO 2692:2021: https://www.iso.org/standard/74592.html
- ISO 14405-1:2025: https://www.iso.org/standard/14405-1
- ISO 21920-1:2021 i polskie wdrożenie: https://www.iso.org/standard/72196.html oraz https://sklep.pkn.pl/pn-en-iso-21920-1-2022-06p.html
- ISO 13715:2017: https://www.iso.org/standard/61328.html
- ISO 2553:2019: https://www.iso.org/standard/72740.html
- ISO 16792:2021: https://www.iso.org/standard/73871.html
- ISO 5455:1979: https://www.iso.org/standard/11500.html
- ISO 5457:1999: https://www.iso.org/standard/29017.html
- ISO 7200:2004: https://www.iso.org/standard/35446.html
- ISO 6410-1:1993: https://www.iso.org/standard/12750.html
- ISO 15786:2008: https://www.iso.org/standard/42099.html
- ISO 6433:2012 i ISO 7573:2008: katalog ISO/TC 10/SC 1 https://www.iso.org/committee/46022/x/catalogue/

### Materiał do oceny języka i luki

Przejrzano wyniki polskiej pomocy Autodesk i SOLIDWORKS, materiały edukacyjne ORE i uczelni, strony specjalistyczne o GPS/GD&T oraz artykuły firm szkoleniowych i produkcyjnych. Służyły do sprawdzenia pytań, słownictwa i braków odpowiedzi, nie do ustalania statusu norm. Nie planuję kopiowania ich ilustracji ani układu przykładów.
