# Research do zakladki Wiedza - pakiet pierwszy

Data sprawdzenia zrodel internetowych: 2026-08-05.

Uklad tabel jest wlasny. Dane liczbowe pochodza z publicznych katalogow, kalkulatorow lub materialow technicznych, a nie z platnych dokumentow normalizacyjnych. Wycinki sa dobrane pod prace konstruktora, nie jako kompletna reprodukcja norm.

## Zrodla

| ID | URL | Sprawdzono | Dane uzyte w raporcie |
|---|---|---:|---|
| S1 | https://www.beneri.com/en/prodotto/din-471 | 2026-08-05 | DIN 471: pierscienie na wal, wymiary pierscienia i rowka, jednostki w mm |
| S2 | https://www.beneri.com/en/prodotto/din-472 | 2026-08-05 | DIN 472: pierscienie do otworu, wymiary pierscienia i rowka, jednostki w mm |
| S3 | https://simplybearings.co.uk/shop/Info-Pages-ISO-Limits/c4746_4779/index.html | 2026-08-05 | ISO 286-2: odchylki H7, g6, h6, k6, p6 w mikrometrach oraz opisy typowych pasowan |
| S4 | https://optimas.com/technical-resources/tapping-sizes/ | 2026-08-05 | Gwinty metryczne: skok zwykly, wiertlo pod gwint, otwory przelotowe close/medium/free, wybrane drobne skoki i wiertla |
| S5 | https://www.trfastenings.com/knowledge-base/engineering-data/tapping-sizes-and-clearance-holes | 2026-08-05 | Gwinty metryczne: zalecenia TR Fastenings, wartosci jako rekomendacje, w tym standardowe wiertla pod gwint |
| S6 | https://engicalchub.com/guides/thread-engagement-guide/ | 2026-08-05 | Orientacyjna dlugosc zazebienia gwintu: stal 1,0 x D, aluminium 1,5 x D |
| S7 | https://www.epocrafter.com/metric-thread-chart-callouts/ | 2026-08-05 | Otwor slepy pod gwint: dno wiercenia glebiej od pelnego gwintu o 1,0-1,5 skoku |
| S8 | https://www.gdandtbasics.com/basics-of-surface-finish/ | 2026-08-05 | Definicje Ra i Rz oraz sposob liczenia Rz z pieciu odcinkow probkowania |
| S9 | https://xometry.pro/en/articles/cnc-machining-surface-roughness/ | 2026-08-05 | Koszt chropowatosci CNC: Ra 3,2 jako baza, Ra 1,6 okolo 2,5 procent, Ra 0,8 okolo 5 procent, Ra 0,4 okolo 11-15 procent |
| S10 | https://jlccnc.com/blog/surface-roughness | 2026-08-05 | Typowe poziomy Ra: 12,5, 6,3, 3,2, 1,6, 0,8, 0,4 um i zastosowania |
| S11 | https://www.inovatecmachinery.com/surface-roughness-in-manufacturing/ | 2026-08-05 | Typowe zakresy procesu: toczenie/frezowanie 0,8-6,3 um Ra, szlifowanie 0,1-1,6 um Ra |
| S12 | https://www.engineeringtoolbox.com/surface-roughness-d_1368.html | 2026-08-05 | Lista procesow obrobki objetych wykresem chropowatosci, w tym wiercenie, toczenie, frezowanie i szlifowanie |
| S13 | https://roymech.org/Useful_Tables/Keyways/keyways | 2026-08-05 | Wpusty i rowki wg BS 4235-1:1972: przekroje, glebokosci, promienie, klasy tolerancji |
| S14 | https://www.rexnord.com/contentitems/techlibrary/documents/427-140_manual | 2026-08-05 | Wpusty i rowki metryczne zgodne z DIN 6885/1 oraz ISO/R773, tolerancja Js9 i glebokosci rowka w piascie |

## Temat: rowek pod pierscien osadczy na wale i w otworze, DIN 471 i DIN 472

### A. Zakres

Obejmujemy wybrane srednice robocze z zakresu DIN 471 od 3 mm do 60 mm i DIN 472 od 8 mm do 60 mm, bo Beneri publikuje DIN 471 od 3 mm, a DIN 472 zaczyna sie w uzytym katalogu od 8 mm [S1, S2].

### B. Dane - DIN 471, pierscien na wal

Kolumny: d1 to nominalna srednica walu, S to grubosc pierscienia, d2 to srednica dna rowka, m to szerokosc rowka, n min to minimalny wymiar pomocniczy przy rowku. Wszystkie wartosci w mm.

| d1 | S | d2 rowka | m rowka | n min | Zrodlo |
|---:|---:|---:|---:|---:|---|
| 3 | 0,40 | 2,8 | 0,50 | 0,3 | S1 |
| 4 | 0,40 | 3,8 | 0,50 | 0,3 | S1 |
| 5 | 0,60 | 4,8 | 0,70 | 0,3 | S1 |
| 6 | 0,70 | 5,7 | 0,80 | 0,5 | S1 |
| 8 | 0,80 | 7,6 | 0,90 | 0,6 | S1 |
| 10 | 1,00 | 9,6 | 1,10 | 0,6 | S1 |
| 12 | 1,00 | 11,5 | 1,10 | 0,8 | S1 |
| 15 | 1,00 | 14,3 | 1,10 | 1,1 | S1 |
| 20 | 1,20 | 19,0 | 1,30 | 1,5 | S1 |
| 25 | 1,20 | 23,9 | 1,30 | 1,7 | S1 |
| 30 | 1,50 | 28,6 | 1,60 | 2,1 | S1 |
| 35 | 1,50 | 33,0 | 1,60 | 3,0 | S1 |
| 40 | 1,75 | 37,5 | 1,85 | 3,8 | S1 |
| 45 | 1,75 | 42,5 | 1,85 | 3,8 | S1 |
| 50 | 2,00 | 47,0 | 2,15 | 4,5 | S1 |
| 55 | 2,00 | 52,0 | 2,15 | 4,5 | S1 |
| 60 | 2,00 | 57,0 | 2,15 | 4,5 | S1 |

### B. Dane - DIN 472, pierscien w otworze

Kolumny: d1 to nominalna srednica otworu, S to grubosc pierscienia, d2 to srednica rowka w otworze, m to szerokosc rowka, n min to minimalny wymiar pomocniczy przy rowku. Wszystkie wartosci w mm.

| d1 | S | d2 rowka | m rowka | n min | Zrodlo |
|---:|---:|---:|---:|---:|---|
| 8 | 0,80 | 8,4 | 0,90 | 0,6 | S2 |
| 10 | 1,00 | 10,4 | 1,10 | 0,6 | S2 |
| 12 | 1,00 | 12,5 | 1,10 | 0,8 | S2 |
| 15 | 1,00 | 15,7 | 1,10 | 1,1 | S2 |
| 20 | 1,00 | 21,0 | 1,10 | 1,5 | S2 |
| 25 | 1,20 | 26,2 | 1,30 | 1,8 | S2 |
| 30 | 1,20 | 31,4 | 1,30 | 2,1 | S2 |
| 35 | 1,50 | 37,0 | 1,60 | 3,0 | S2 |
| 40 | 1,75 | 42,5 | 1,85 | 3,8 | S2 |
| 45 | 1,75 | 47,5 | 1,85 | 3,8 | S2 |
| 50 | 2,00 | 53,0 | 2,15 | 4,5 | S2 |
| 55 | 2,00 | 58,0 | 2,15 | 4,5 | S2 |
| 60 | 2,00 | 63,0 | 2,15 | 4,5 | S2 |

### C. Tryb uzycia

`wymiar-do-rysunku`, pod warunkiem ze uzyty pierscien pochodzi z katalogu zgodnego z DIN 471 albo DIN 472 i projektant sprawdzil obciazenie osiowe u producenta [S1, S2].

### D. Warstwa wlasna

Nie stosowac jako jedynego zabezpieczenia, gdy detal moze dostac udar osiowy, gdy rowek lezy przy karbie o wysokim naprezeniu albo gdy demontaz serwisowy ma byc czesty. Pierscien jest szybki i tani, ale rowek oslabia wal albo scianke piasty.

Typowe bledy: wpisanie samego "DIN 471" bez d2 i m, wykonanie rowka zwyklym nozem bez kontroli dna, za maly zapas do krawedzi, brak miejsca na szczypce, pomylenie pierscienia zewnetrznego z wewnetrznym. Przy malych srednicach blad 0,1 mm jest juz duzy wzgledem grubosci pierscienia 0,40-0,80 mm [S1, S2].

Kosztowo rowek jest tani, jesli i tak toczy sie wal albo wykonuje otwor w jednym zamocowaniu. Drozeje, gdy wymaga osobnego narzedzia rowkujacego, kontroli promienia dna albo gdy trzeba wykonac go w glebokim otworze. Przy zamawianiu warto podac typ pierscienia, norme, material, powloke i czy dostawca ma dobrac rowek do konkretnego katalogu.

### E. Rysunek

Rysunek powinien pokazac dwa przekroje obok siebie: wal z rowkiem dla DIN 471 i otwor z rowkiem dla DIN 472. Oznaczyc d1, d2, m, S, n min, kierunek obciazenia osiowego oraz miejsce pracy szczypiec montazowych.

### F. Frazy wyszukiwania

- rowek pod pierscien osadczy na wale wymiary
- DIN 471 tabela rowek
- DIN 472 rowek w otworze
- pierscien Segera wymiary rowka
- pierscien osadczy zewnetrzny wewnetrzny tabela

### G. Ryzyko

Ryzyko: ktos przepisze sam rowek bez sprawdzenia nosnosci pierscienia, materialu i geometrii sasiednich krawedzi. Zastrzezenie przy tabeli: "Tabela podaje wymiary katalogowe rowka, nie potwierdza nosnosci zabezpieczenia osiowego w Twoim zlozeniu" [S1, S2].

## Temat: pasowania walek-otwor

### A. Zakres

Obejmujemy przedzialy ISO 286-2 od ponad 3 mm do 120 mm, bo ten wycinek pokrywa typowe srednice do 60 mm bez publikowania pelnej tablicy tolerancji [S3].

### B. Dane

Wartosci w tabeli sa w mikrometrach. Znak plus oznacza luz, znak minus oznacza wcisk. Zakres pasowania obliczono z granic H7 otworu oraz g6, h6, k6 albo p6 walka z [S3].

| Srednica nominalna | H7/g6 | H7/h6 | H7/k6 | H7/p6 | Typowe znaczenie | Zrodlo |
|---|---:|---:|---:|---:|---|---|
| >3 do 6 mm | +4 do +24 | 0 do +20 | -9 do +11 | -20 do 0 | male osie, prowadzenia, lekkie wciskanie | S3 |
| >6 do 10 mm | +5 do +29 | 0 do +24 | -10 do +14 | -24 do 0 | male tuleje, kola, piasty | S3 |
| >10 do 18 mm | +6 do +35 | 0 do +29 | -12 do +17 | -29 do 0 | typowe walki maszynowe | S3 |
| >18 do 30 mm | +7 do +41 | 0 do +34 | -15 do +19 | -35 do -1 | czopy, lozyskowanie, piasty | S3 |
| >30 do 50 mm | +9 do +50 | 0 do +41 | -18 do +23 | -42 do -1 | piasty i oprawy sredniej wielkosci | S3 |
| >50 do 80 mm | +10 do +59 | 0 do +49 | -21 do +28 | -51 do -2 | osadzenia lozysk i kol | S3 |
| >80 do 120 mm | +12 do +69 | 0 do +57 | -25 do +32 | -59 do -2 | wieksze piasty i czopy | S3 |

**Korekta wprowadzona przy weryfikacji (2026-08-05).** Trzy ostatnie wiersze
byly pierwotnie opisane jako przedzialy 30-40, 40-50 i 50-65 mm. To bylo
bledne: ISO 286 nie dzieli srednic w tych miejscach, tylko na granicach
30, 50, 80 i 120 mm. Same wartosci liczbowe byly poprawne, ale przypisane do
zlych przedzialow, wiec dla walu 45 mm odczytalo by sie dane pasma 50-80.
Przedzialy przeliczone niezaleznie z odchylek podstawowych i szeregow
tolerancji, nie przepisane ze zrodla.

Typowe pary wedlug opisu Simply Bearings: H7/g6 to sliding fit, H7/h6 to location clearance, H7/k6 to slight interference, H7/p6 to press fit [S3].

### C. Tryb uzycia

`punkt-startowy`, bo wartosci liczbowe sa policzone z publicznej tabeli ISO 286-2, ale do rysunku trzeba dobrac pasowanie do funkcji, materialu, temperatury, dlugosci styku i technologii wykonania [S3].

### D. Warstwa wlasna

Nie stosowac samego hasla H7/p6 "bo ma trzymac", jezeli czesc jest cienkoscienna, z aluminium, z tworzywa albo bedzie montowana bez prasy i kontroli temperatury. Wcisk zmienia naprezenia i potrafi zdeformowac piasty. H7/g6 daje przyjemny montaz, ale nie unieruchamia momentu obrotowego bez sruby, wpustu, zacisku albo innego elementu przenoszacego obciazenie.

Typowe bledy: brak informacji, czy tolerancja dotyczy otworu czy walka, wpisanie "H7" przy obu elementach, mieszanie oznaczen malej i wielkiej litery, dobieranie pasowania bez uwzglednienia powloki. Przy powloce kilkanascie mikrometrow potrafi zjesc caly luz w pasowaniu H7/g6 dla malych srednic [S3].

Koszt rosnie, gdy z tolerancji ogolnej przechodzi sie na H7/h6, a jeszcze bardziej przy pasowaniach wymagajacych szlifowania lub rozwiercania. Dla dostawcy trzeba podac nie tylko symbol, ale tez sposob kontroli i powierzchnie funkcjonalna.

### E. Rysunek

Rysunek powinien pokazac otwor H7 i walek g6/h6/k6/p6 jako dwa prostokaty tolerancji wzgledem linii nominalu. Druga czesc rysunku powinna pokazac trzy przypadki: luz, pasowanie przejsciowe i wcisk.

### F. Frazy wyszukiwania

- co oznacza H7 g6
- pasowanie H7 h6 luz
- H7 p6 wcisk tabela
- tolerancje ISO 286 kalkulator
- pasowanie walek otwor jak dobrac

### G. Ryzyko

Ryzyko: ktos wybierze pasowanie po nazwie, nie po funkcji. Zastrzezenie przy tabeli: "Zakres luzu albo wcisku dotyczy tylko idealnego przypadku walka i otworu w temperaturze odniesienia; nie obejmuje ksztaltu, chropowatosci, powlok ani sposobu montazu" [S3].

## Temat: gwinty metryczne M3-M20

### A. Zakres

Obejmujemy gwinty M3, M4, M5, M6, M8, M10, M12, M14, M16, M18 i M20, bo to najczestszy zakres warsztatowy, a Optimas i TR Fastenings publikuja dla niego dane w mm [S4, S5].

### B. Dane

Wiertlo pod gwint zwykly i otwor przelotowy medium fit wg Optimas, z korekta rozbieznosci M8: Optimas podaje 6,75 mm, TR Fastenings podaje 6,8 mm, w tabeli wpisano praktyczne 6,8 mm i oznaczono konflikt [S4, S5]. Glebokosc pelnego gwintu dla stali przyjeto jako 1,0 x D, dla aluminium jako 1,5 x D [S6]. Dno otworu slepego powinno byc glebiej o 1,0-1,5 skoku niz pelny gwint [S7].

| Gwint | Skok zwykly | Wiertlo pod gwint zwykly | Typowy skok drobny | Wiertlo pod skok drobny | Otwor przelotowy medium | Pelny gwint stal | Pelny gwint aluminium | Zrodlo |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| M3 | 0,5 | 2,5 | 0,35 | 2,65 | 3,4 | 3 | 4,5 | S4, S6 |
| M4 | 0,7 | 3,3 | 0,5 | 3,5 | 4,5 | 4 | 6 | S4, S6 |
| M5 | 0,8 | 4,2 | 0,5 | 4,5 | 5,5 | 5 | 7,5 | S4, S6 |
| M6 | 1,0 | 5,0 | 0,75 | 5,25 | 6,6 | 6 | 9 | S4, S6 |
| M8 | 1,25 | 6,8 | 1,0 | 7,0 | 9,0 | 8 | 12 | S4, S5, S6 |
| M10 | 1,5 | 8,5 | 1,25 | 8,75 | 11,0 | 10 | 15 | S4, S6 |
| M12 | 1,75 | 10,2 | 1,5 | 10,5 | 14,0 | 12 | 18 | S4, S6 |
| M14 | 2,0 | 12,0 | 1,5 | 12,5 | 16,0 | 14 | 21 | S4, S6 |
| M16 | 2,0 | 14,0 | 1,5 | 14,5 | 18,0 | 16 | 24 | S4, S6 |
| M18 | 2,5 | 15,5 | 1,5 | 16,5 | 20,0 | 18 | 27 | S4, S6 |
| M20 | 2,5 | 17,5 | 1,5 | 18,5 | 22,0 | 20 | 30 | S4, S6 |

### C. Tryb uzycia

`punkt-startowy`, bo srednice otworow sa katalogowymi rekomendacjami, a glebokosc gwintu zalezy od materialu, klasy sruby, tolerancji gwintu i obciazenia [S4, S5, S6].

### D. Warstwa wlasna

Nie stosowac tych glebokosci dla polaczen odpowiedzialnych bez obliczenia zrywania gwintu. Nie stosowac gwintu w cienkiej blasze bez tulejki, nitonakretki albo wkladki. W aluminium i tworzywach czesto lepiej dac wkladke gwintowa niz wydluzac gwint w nieskonczonosc.

Typowe bledy: pomylenie otworu pod gwint z otworem przelotowym, brak rozroznienia glebokosci wiercenia i glebokosci pelnego gwintu, wpisanie tylko "M8" przy gwincie drobnozwojnym, za plytki otwor slepy pod gwintownik. Dla slepego M8 x 1,25 z pelnym gwintem 8 mm samo wiercenie do 8 mm jest bledem, bo gwintownik potrzebuje miejsca na dobieg i wior [S7].

Kosztowo kazdy gwint slepy jest drozszy od przelotowego, bo wymaga kontroli glebokosci i wynoszenia wiora. Drobny skok zwieksza ryzyko uszkodzenia gwintu i jest mniej odporny na brud przy montazu, ale daje wieksza precyzje regulacji.

### E. Rysunek

Rysunek powinien pokazac trzy przekroje: otwor pod gwintowanie, otwor przelotowy i otwor slepy. Oznaczyc srednice wiercenia, srednice nominalna M, skok, glebokosc pelnego gwintu oraz glebszy otwor pod wior.

### F. Frazy wyszukiwania

- otwor pod gwint M8
- wiertlo pod gwint M6
- tabela gwintow metrycznych M3 M20
- otwor przelotowy pod srube M10
- glebokosc gwintu w aluminium

### G. Ryzyko

Ryzyko: ktos potraktuje 1,0 x D albo 1,5 x D jako obliczenie wytrzymalosciowe. Zastrzezenie przy tabeli: "Glebokosc gwintu to punkt startowy; dla obciazen bezpieczenstwa licz zazebienie gwintu albo stosuj wymagania producenta zlacza" [S6, S7].

## Temat: chropowatosc Ra i Rz

### A. Zakres

Obejmujemy Ra od 0,4 um do 12,5 um oraz praktyczne porownanie z Rz, bo to pokrywa typowe wymagania rysunkowe dla czesci toczonych, frezowanych, wierconych i szlifowanych [S8, S9, S10, S11, S12].

### B. Dane

Ra i Rz nie sa bezposrednio zamienne. Rz opisuje srednia wysokosc ekstremow profilu z odcinkow probkowania, a Ra jest srednia arytmetyczna odchylen profilu [S8, S9]. Dlatego ponizsza tabela jest praktycznym komentarzem, nie przelicznikiem normowym.

| Wymaganie na rysunku | Co zwykle oznacza w produkcji | Typowy proces | Wplyw na koszt CNC | Zrodlo |
|---:|---|---|---|---|
| Ra 12,5 um | zgrubna powierzchnia po obrobce | ciecie, zgrubna obrobka | zwykle bez doplaty, jesli funkcja na to pozwala | S10 |
| Ra 6,3 um | standardowe toczenie albo frezowanie bez ambicji na ladna powierzchnie | toczenie/frezowanie 0,8-6,3 um Ra | zwykle nisko kosztowe | S10, S11 |
| Ra 3,2 um | typowa powierzchnia "as machined" w CNC | standardowe CNC | poziom bazowy kosztu wg Xometry | S9, S10 |
| Ra 1,6 um | powierzchnia wspolpracujaca, lekko gladka | dokladniejsze toczenie/frezowanie albo wykonczenie | okolo +2,5 procent kosztu wg Xometry | S9, S10 |
| Ra 0,8 um | powierzchnia precyzyjna, np. walek, tuleja, uszczelnienie | bardzo dobre toczenie/frezowanie albo szlifowanie | okolo +5 procent kosztu wg Xometry | S9, S10, S11 |
| Ra 0,4 um | bardzo gladka powierzchnia | szlifowanie, polerowanie lub proces dodatkowy | okolo +11-15 procent kosztu wg Xometry | S9, S10, S11 |

Relacja Ra/Rz do opisania na stronie: nie podawac jednego przelicznika. Dla powierzchni toczonych w literaturze spotyka sie stosunek Rz/Ra od 3,4 do 7,5, a dla szlifowanych od 5,8 do 9,5, co pokazuje, ze zalezy on od procesu i profilu powierzchni [S8, S9].

### C. Tryb uzycia

`komentarz-praktyka`, bo zakresy procesu i doplaty sa orientacyjne, zalezne od materialu, geometrii i dostawcy [S9, S10, S11].

### D. Warstwa wlasna

Nie wpisywac Ra 0,8 um na kazdej powierzchni "bo ladnie wyglada". Takie wymaganie zmienia wycene, wydluza termin i zmusza wykonawce do dodatkowej operacji. Wymaganie chropowatosci powinno byc tam, gdzie powierzchnia pracuje: lozysko, uszczelnienie, slizg, docisk, klejenie albo lakier.

Typowe bledy: podanie jednego Ra dla calego detalu, brak informacji o kierunku sladow obrobki, wymaganie gladkosci w kieszeni narzedziowej bez dostepu narzedzia, proba przeliczenia Rz na Ra jedna stala dla wszystkich procesow. Przy zamawianiu trzeba wskazac, ktore powierzchnie maja wymaganie, i dopuszczac lokalne pomiary, bo cala czesc nie musi miec tej samej klasy.

### E. Rysunek

Rysunek powinien pokazac symbol chropowatosci przy konkretnej powierzchni, a obok uproszczony profil: Ra jako srednia odchylek od linii sredniej i Rz jako wysokosc miedzy ekstremami profilu w odcinkach probkowania.

### F. Frazy wyszukiwania

- Ra Rz przelicznik
- chropowatosc po toczeniu
- chropowatosc po frezowaniu
- jaka chropowatosc po szlifowaniu
- Ra 3,2 co oznacza

### G. Ryzyko

Ryzyko: ktos policzy Rz z Ra jedna stala albo narzuci zbyt gladka powierzchnie bez potrzeby funkcjonalnej. Zastrzezenie przy tabeli: "Ra i Rz opisuja rozne cechy profilu; tabela pomaga rozmawiac z wykonawca, ale nie zastepuje uzgodnionego planu kontroli" [S8, S9].

## Temat: wpusty pryzmatyczne

### A. Zakres

Obejmujemy srednice walow od ponad 8 mm do 65 mm, zeby pokryc uzytkowy zakres od 10 mm do 60 mm bez publikowania calej tabeli standardu [S13, S14].

### B. Dane

Wymiary w mm. t1 to glebokosc rowka w wale, t2 to glebokosc rowka w piascie. Zakres srednicy zapisano zgodnie z logika "ponad - do wlacznie" stosowana w tabeli RoyMech [S13].

| Srednica walu d | Wpust b x h | t1 wal | t2 piasta | Promien r min-max | Zrodlo |
|---|---:|---:|---:|---:|---|
| >8 do 10 | 3 x 3 | 1,8 | 1,4 | 0,08-0,16 | S13, S14 |
| >10 do 12 | 4 x 4 | 2,5 | 1,8 | 0,08-0,16 | S13, S14 |
| >12 do 17 | 5 x 5 | 3,0 | 2,3 | 0,16-0,25 | S13, S14 |
| >17 do 22 | 6 x 6 | 3,5 | 2,8 | 0,16-0,25 | S13, S14 |
| >22 do 30 | 8 x 7 | 4,0 | 3,3 | 0,16-0,25 | S13, S14 |
| >30 do 38 | 10 x 8 | 5,0 | 3,3 | 0,25-0,40 | S13, S14 |
| >38 do 44 | 12 x 8 | 5,0 | 3,3 | 0,25-0,40 | S13, S14 |
| >44 do 50 | 14 x 9 | 5,5 | 3,8 | 0,25-0,40 | S13, S14 |
| >50 do 58 | 16 x 10 | 6,0 | 4,3 | 0,25-0,40 | S13, S14 |
| >58 do 65 | 18 x 11 | 7,0 | 4,4 | 0,25-0,40 | S13, S14 |

Tolerancje osadzenia do opisania przy tabeli: RoyMech pokazuje klasy rowka dla luznego, normalnego i ciasnego osadzenia jako H9/D10/N9/Js9/P9 zalezne od tego, czy tolerowana jest strona walu czy piasty [S13]. Rexnord podaje, ze metryczne rowki wpustowe w sprzeglach sa wykonywane wg ISO/R773 z tolerancja szerokosci Js9, jesli nie okreslono inaczej, i zgodnie z DIN 6885/1 [S14].

### C. Tryb uzycia

`wymiar-do-rysunku` dla przekroju wpustu i glebokosci rowka, ale `punkt-startowy` dla klasy tolerancji osadzenia, bo luz lub wcisk zalezy od montazu i sposobu przenoszenia momentu [S13, S14].

### D. Warstwa wlasna

Nie stosowac wpustu jako lekarstwa na kazde polaczenie wal-piasta. Przy czestym rozruchu, zmianach kierunku i udarach wpust potrafi wybijac rowek. Przy bardzo malych piastach rowek oslabia piaste i wal. Przy precyzyjnym pozycjonowaniu katowym lepiej rozwazyc wielowypust, zacisk stozkowy, pierscien rozprezny albo polaczenie skurczowe.

Typowe bledy: dobranie wpustu tylko po srednicy bez sprawdzenia dlugosci czynnej, brak tolerancji szerokosci rowka, za ostry promien dna, nieuwzglednienie oslabenia przekroju walu, wpisanie jednego rowka w piascie bez informacji, czy ma byc przelotowy. Przy zamawianiu trzeba podac b x h, dlugosc wpustu, polozenie rowka, tolerancje szerokosci oraz czy wpust ma byc ciasny w wale, a przesuwny w piascie.

Kosztowo rowek w wale jest zwykle prosty, jesli idzie frezem tarczowym albo dlutowaniem w standardowej szerokosci. Rowek w piascie drozeje przy malym otworze, dlugim rowku nieprzelotowym albo wymaganiu ciasnej tolerancji.

### E. Rysunek

Rysunek powinien pokazac przekroj poprzeczny walu i piasty z wpustem. Oznaczyc d, b, h, t1, t2, r oraz luz nad wpustem. Drugi, maly widok powinien pokazac rowek wzdlozny w wale z dlugoscia wpustu.

### F. Frazy wyszukiwania

- wpust pryzmatyczny wymiary
- rowek wpustowy tabela
- DIN 6885 wpust
- jaki wpust do srednicy walu
- tolerancja rowka wpustowego

### G. Ryzyko

Ryzyko: ktos dobierze przekroj z tabeli, ale nie sprawdzi naciskow powierzchniowych, scinania wpustu i oslabenia walu. Zastrzezenie przy tabeli: "Tabela dobiera standardowy przekroj i geometrie rowka; nie sprawdza momentu, zmeczenia ani luzow eksploatacyjnych" [S13, S14].

## Czego nie udalo sie ustalic

- Nie ustalono jednego wiarygodnego katalogowego "przelicznika Ra na Rz", bo zrodla techniczne podkreslaja, ze Ra i Rz mierza inne cechy profilu, a zakres Rz/Ra zalezy od procesu [S8, S9].
- Nie ustalono jednej bezpiecznej glebokosci gwintowania dla wszystkich materialow i klas srub. Podano reguly startowe 1,0 x D dla stali i 1,5 x D dla aluminium, ale to nie jest obliczenie nosnosci gwintu [S6].
- Nie ustalono pelnego zestawu tolerancji liczbowych dla wszystkich wariantow osadzenia wpustu w kazdym przedziale bez zblizania sie do kompletnej reprodukcji tabel. Do strony lepiej dac klasy tolerancji i osobny komentarz, a liczby ograniczyc do kilku typowych przypadkow [S13, S14].

## Gdzie zrodla sie nie zgadzaly

- Gwint M8 zwykly: Optimas podaje wiertlo 6,75 mm, TR Fastenings podaje 6,8 mm. Do tabeli wpisano 6,8 mm jako praktyczna wartosc warsztatowa i oznaczono rozbieznosc [S4, S5].
- Otwory przelotowe pod sruby: Optimas rozdziela close, medium i free fit, TR Fastenings podaje jedna wartosc "clearance hole". Do tabeli przyjeto medium fit z Optimas, bo lepiej nadaje sie do strony z wyborem luzu [S4, S5].
- Wpusty: RoyMech opisuje zestaw klas tolerancji rowkow, Rexnord w katalogu sprzegiel domyslnie wskazuje Js9. To nie jest sprzecznosc wymiarowa, tylko inny kontekst zastosowania [S13, S14].

## Co wymaga decyzji albo wiedzy Lukasza

- Czy w tabelach pierscieni publikowac wszystkie srednice z zakresu 3-60 mm, czy tylko selektor z typowymi srednicami i link do producenta dla reszty.
- Czy przy pasowaniach pokazac wartosci w mikrometrach, czy od razu przeliczac je na mm z trzema miejscami po przecinku.
- Czy dla gwintow strona ma miec osobny wybor materialu: stal, aluminium, tworzywo.
- Czy przy chropowatosci wpisywac konkretne doplaty procentowe, czy zostawic je jako opis "zwykle drozej" i pokazac liczby tylko w komentarzu.
- Czy wpusty maja byc tylko sciaga geometryczna, czy pelny temat z kalkulatorem momentu.

## Ile realnie zajmie przygotowanie kazdego tematu na strone

Szacunek autorski z 2026-08-05, bez zewnetrznego URL, bo to nie jest dana katalogowa:

| Temat | Czas przygotowania |
|---|---:|
| Rowki pod pierscienie DIN 471 i DIN 472 | 10-14 h |
| Pasowania walek-otwor | 8-12 h |
| Gwinty metryczne M3-M20 | 6-9 h |
| Chropowatosc Ra i Rz | 5-8 h |
| Wpusty pryzmatyczne | 6-10 h |

