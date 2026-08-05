# Kalkulatory na pocaduchy.pl - druga runda

Data analizy i sprawdzenia zrodel: 2026-08-05.

Cel drugiej rundy: znalezc kalkulatory, ktorych nie bylo na dotychczasowej
liscie. Swiadomie omijam: wspolrzedne otworow na okregu, rozwiniecie blachy,
czas cyklu ruchu liniowego, sila silownika, zuzycie powietrza, masa
polfabrykatu, pasowanie i luz, luz od temperatury, PERT, moment dokrecania,
przelicznik jednostek, ugiecie belki, srube trapezowa i trwalosc lozyska.

Kierunek szukania jest inny niz w pierwszej rundzie: dokumentacja, wycena,
przygotowanie produkcji, pogranicze konstrukcji i technologii oraz druk 3D.
Wspolny mianownik: to sa rzeczy, ktore konstruktor realnie liczy w Excelu,
bo sam katalog albo tabela nie odpowiadaja na pytanie.

## 1. Kalkulator stosu tolerancji wymiarowej

**Co uzytkownik dostaje:** wpisuje lancuch wymiarow z tolerancjami i znakiem
kierunku, a dostaje wymiar wynikowy, zakres worst-case, zakres RSS oraz
informacje, ktory wymiar najbardziej psuje wynik.

**Dlaczego kalkulator wygrywa z tabela:** tabela nie pomoze, gdy wymiarow jest
5, 8 albo 14, czesc dziala dodatnio, czesc ujemnie, a konstruktor chce szybko
porownac warianty tolerancji.

**Wzor ze zrodlem:**

- wynik nominalny: `Y = suma(s_i * X_i)`, gdzie `s_i = +1` albo `-1`;
- worst-case: `T_wc = suma(|T_i|)`;
- RSS: `T_rss = sqrt(suma(T_i^2))`.

Zrodla: NIST opisuje worst-case i statystyczna analize tolerancji jako dwie
podstawowe metody analizy stosu tolerancji:
https://nvlpubs.nist.gov/nistpubs/Legacy/IR/nistir6524.pdf, sprawdzono
2026-08-05. FIRGELLI podaje jawnie wzory worst-case i RSS:
https://www.firgelliauto.com/blogs/engineering-calculators/tolerance-stack-up-calculator-worst-case-and-rss,
sprawdzono 2026-08-05.

**Pola wejsciowe:**

| Pole | Jednostka | Zakres | Domyslnie |
|---|---:|---:|---:|
| Liczba wymiarow | szt. | 2-30 | 5 |
| Wymiar nominalny `X_i` | mm | -10000 do 10000 | zalezne od wiersza |
| Tolerancja plus | mm | 0-10 | 0,1 |
| Tolerancja minus | mm | 0-10 | 0,1 |
| Kierunek w lancuchu | - | + / - | + |
| Wymagany luz albo zakres wynikowy | mm | -1000 do 1000 | opcjonalnie |
| Metoda oceny | - | worst-case / RSS / obie | obie |

**Wyjscie poza sama liczba:** wykres udzialu tolerancji w wyniku, minimalny
i maksymalny wymiar wynikowy, wynik RSS jako scenariusz statystyczny, lista
"3 tolerancje, ktore najbardziej oplaca sie doprecyzowac", komunikat czy
zadany luz miesci sie w worst-case.

**Przypadki brzegowe:** brak co najmniej dwoch wymiarow blokuje wynik;
tolerancje ujemne sa bledem; tolerancja jednostronna jest dopuszczalna, ale
pokazywana osobno; RSS dostaje ostrzezenie, jezeli uzytkownik miesza wymiary
z roznych procesow bez danych procesowych.

**Ryzyko i zastrzezenie:** ryzyko srednie. Uzytkownik moze potraktowac RSS jak
gwarancje montowalnosci. Zastrzezenie przy wyniku: "RSS zaklada niezaleznosc
i statystyczne zachowanie wymiarow. Dla funkcji krytycznych decyduje analiza
projektowa, wymagania klienta i proces produkcji, nie sam kalkulator."

**Powiazanie z istniejaca trescia:** `weryfikacja-cad-przed-produkcja.json`,
`projektowanie-z-niepelnymi-danymi.json`, `koszty-a-jakosc-w-projektowaniu-maszyn.json`.

**Koszt wdrozenia:** 10-14 h.

**Fraza w Google:** "stos tolerancji kalkulator".

**Oceny:** popyt 4/5, przewaga nad tabela 5/5, bezpieczenstwo 3/5, luka PL 5/5.

## 2. Kalkulator pozycji rzeczywistej GD&T z MMC

**Co uzytkownik dostaje:** wpisuje nominalne i zmierzone X/Y otworu lub kolka,
tolerancje pozycji oraz wymiar cechy, a dostaje blad pozycji, bonus MMC,
tolerancje dopuszczalna i prosta decyzje kontrolna.

**Dlaczego kalkulator wygrywa z tabela:** tu nie ma tabeli. Trzeba polaczyc
geometrie 2D, srednice strefy tolerancji i bonus zalezy od rzeczywistego
wymiaru cechy.

**Wzor ze zrodlem:**

- odchylka pozycji: `TP = 2 * sqrt((X_actual - X_nom)^2 + (Y_actual - Y_nom)^2)`;
- bonus dla otworu przy MMC: `Bonus = D_actual - D_MMC`;
- tolerancja dopuszczalna: `T_allowed = T_position + Bonus`;
- sprawdzian funkcjonalny dla otworu: `D_gage = D_MMC - T_position`.

Zrodla: GD&T Basics opisuje pozycje, odchylke diametralna, bonus MMC i wzory
sprawdzianu funkcjonalnego:
https://www.gdandtbasics.com/true-position/, sprawdzono 2026-08-05, oraz
https://www.gdandtbasics.com/maximum-material-condition/, sprawdzono
2026-08-05.

**Pola wejsciowe:**

| Pole | Jednostka | Zakres | Domyslnie |
|---|---:|---:|---:|
| Typ cechy | - | otwor / kolek | otwor |
| X nominalne | mm | -10000 do 10000 | 0 |
| Y nominalne | mm | -10000 do 10000 | 0 |
| X zmierzone | mm | -10000 do 10000 | 0,03 |
| Y zmierzone | mm | -10000 do 10000 | -0,02 |
| Tolerancja pozycji | mm | 0-10 | 0,10 |
| Granice wymiaru cechy | mm | 0,1-1000 | np. 10,00-10,20 |
| Wymiar rzeczywisty | mm | w granicach cechy | 10,08 |
| Modyfikator | - | RFS / MMC | MMC |

**Wyjscie poza sama liczba:** decyzja "miesci sie / nie miesci sie", ile
zostalo zapasu tolerancji, bonus MMC, srednica sprawdzianu, miniwykres kolowej
strefy tolerancji i punktu rzeczywistego.

**Przypadki brzegowe:** wymiar rzeczywisty poza granicami od razu daje
"cecha poza tolerancja wymiaru"; MMC nie moze byc liczony bez granic wymiaru;
tolerancja pozycji rowna 0 jest dopuszczalna tylko jako przypadek pokazowy;
przy RFS bonus jest zerowy.

**Ryzyko i zastrzezenie:** ryzyko srednie. To narzedzie moze wejsc w decyzje
jakosciowa. Zastrzezenie: "Kalkulator nie zastepuje normy ASME/ISO, planu
kontroli ani decyzji dzialu jakosci. Nie analizuje baz, orientacji osi na
glebokosci ani bledow pomiaru."

**Powiazanie z istniejaca trescia:** `weryfikacja-cad-przed-produkcja.json`,
`polaczenie-wal-piasta.json`, przyszla Wiedza o tolerancjach geometrycznych.

**Koszt wdrozenia:** 10-16 h.

**Fraza w Google:** "true position kalkulator mmc".

**Oceny:** popyt 3/5, przewaga nad tabela 5/5, bezpieczenstwo 3/5, luka PL 5/5.

## 3. Optymalizator ciecia pretow, profili i walkow

**Co uzytkownik dostaje:** wpisuje dlugosc handlowa materialu, rzaz, naddatki
i liste detali, a dostaje plan ciecia: ile sztang kupic, jak je pociac,
ile zostaje odpadu i jaka jest efektywnosc.

**Dlaczego kalkulator wygrywa z tabela:** to klasyczny problem kombinatoryczny.
Przy kilkunastu dlugosciach detali czlowiek w Excelu bardzo szybko przestaje
widziec najlepsze ulozenie.

**Wzor ze zrodlem:**

- dolne ograniczenie liczby sztang: `N_min = ceil(suma(q_i * l_i) / L_stock)`;
- odpad: `Waste = N_used * L_stock - suma(q_i * l_i) - suma(cuts * kerf)`;
- wykorzystanie: `Utilization = Used_length / (N_used * L_stock)`.

Algorytm praktyczny: First Fit Decreasing albo Best Fit Decreasing po
posortowaniu detali od najdluzszego. Cornell ORIE opisuje problem cutting
stock jako program calkowitoliczbowy:
https://people.orie.cornell.edu/dpw/orie6300/Lectures/lec16.pdf, sprawdzono
2026-08-05. MetricGate podaje dolne ograniczenie i definicje procentu odpadu
dla 1D cutting stock:
https://metricgate.com/docs/cutting-stock-problem/, sprawdzono 2026-08-05.

**Pola wejsciowe:**

| Pole | Jednostka | Zakres | Domyslnie |
|---|---:|---:|---:|
| Dlugosc handlowa sztangi | mm | 100-12000 | 6000 |
| Rzaz / strata na ciecie | mm | 0-20 | 3 |
| Naddatek na detal | mm | 0-50 | 2 |
| Liczba pozycji detali | szt. | 1-100 | 8 |
| Dlugosc detalu | mm | 1 do L_stock | zalezne od wiersza |
| Ilosc detalu | szt. | 1-1000 | zalezne od wiersza |
| Tryb | - | minimalizuj sztangi / minimalizuj odpad / zachowaj resztki | minimalizuj sztangi |

**Wyjscie poza sama liczba:** lista sztang z kolejnoscia ciecia, resztki z
kazdej sztangi, procent odpadu, porownanie do dolnego ograniczenia, ostrzezenie
gdy pojedynczy detal nie miesci sie w sztandze, eksport CSV dla produkcji.

**Przypadki brzegowe:** detal dluzszy niz sztanga blokuje wynik; rzaz wiekszy
niz najkrotszy detal wymaga potwierdzenia; bardzo duza lista detali pokazuje,
ze wynik heurystyczny nie musi byc matematycznie optymalny; dlugosc resztki
ponizej ustawionego minimum traktowana jest jako odpad.

**Ryzyko i zastrzezenie:** ryzyko niskie. Blad kosztuje material lub czas
ciecia. Zastrzezenie: "Plan ciecia jest pomocniczy. Przed produkcja sprawdz
kierunek wlokien, stan powierzchni, tolerancje po cieciu i realne mozliwosci
pily."

**Powiazanie z istniejaca trescia:** `koszty-a-jakosc-w-projektowaniu-maszyn.json`,
`elementy-znormalizowane-handlowki.json`, `weryfikacja-cad-przed-produkcja.json`.

**Koszt wdrozenia:** 14-22 h.

**Fraza w Google:** "optymalizacja ciecia pretow kalkulator".

**Oceny:** popyt 4/5, przewaga nad tabela 5/5, bezpieczenstwo 5/5, luka PL 4/5.

## 4. Kalkulator wyceny ciecia laserem z rysunku

**Co uzytkownik dostaje:** wpisuje laczna dlugosc ciecia, liczbe przebic,
predkosc ciecia, czas przebicia, material, arkusz i stawke maszyny, a dostaje
orientacyjny koszt czesci lub partii.

**Dlaczego kalkulator wygrywa z tabela:** koszt nie zalezy tylko od pola
detalu. Dwa detale o podobnej powierzchni moga miec zupelnie inny koszt przez
liczbe konturow, przebic i material.

**Wzor ze zrodlem:**

- `t_cut = L_cut / v_cut`;
- `t_pierce = n_pierce * t_one_pierce`;
- `t_machine = t_cut + t_pierce + t_rapid + t_setup / quantity`;
- `Cost_part = material_part + gas + consumables + t_machine * rate`;
- cena przy marzy: `Price = Cost / (1 - margin)`.

Zrodlo: QuoteBuddy opisuje wycene lasera przez czas z dlugosci ciecia,
liczby przebic, predkosci, szybkich przejazdow, stawki maszyny, kosztu
materialu i marzy:
https://quotebuddy.therness.com/en/blog/laser-cutting-cost-calculation,
sprawdzono 2026-08-05.

**Pola wejsciowe:**

| Pole | Jednostka | Zakres | Domyslnie |
|---|---:|---:|---:|
| Dlugosc ciecia | mm | 1-10000000 | 2500 |
| Liczba przebic | szt. | 1-10000 | 12 |
| Predkosc ciecia | mm/min | 10-50000 | 3000 |
| Czas jednego przebicia | s | 0-30 | 0,5 |
| Dodatek na przejazdy szybkie | % czasu ciecia | 0-100 | 10 |
| Stawka maszyny | PLN/h | 1-1000 | 250 |
| Koszt materialu na detal | PLN | 0-100000 | 20 |
| Setup/programowanie | PLN | 0-100000 | 150 |
| Ilosc | szt. | 1-100000 | 10 |
| Marza | % | 0-90 | 20 |

**Wyjscie poza sama liczba:** rozbicie kosztu na ciecie, przebicia, setup,
material i marze; koszt prototypu vs koszt w partii; informacja, czy setup
dominuje nad sama obrobka; eksport pozycji do zapytania ofertowego.

**Przypadki brzegowe:** ilosc 1 pokazuje mocne ostrzezenie o dominacji setupu;
predkosc 0 blokuje wynik; bardzo duzo przebic przy krotkiej dlugosci pokazuje,
ze detal moze byc drozszy niz sugeruje obrys; marza 90% blokuje jako malo
uzyteczna.

**Ryzyko i zastrzezenie:** ryzyko niskie. Najwieksze ryzyko to zbyt pewna
wycena. Zastrzezenie: "To kalkulator ofertowy, nie cennik zakladu. Wymaga
kalibracji na realnych czasach maszyny, gazie, materiale, minimalnej wartosci
zamowienia i wymaganej jakosci krawedzi."

**Powiazanie z istniejaca trescia:** `koszty-a-jakosc-w-projektowaniu-maszyn.json`,
`weryfikacja-cad-przed-produkcja.json`.

**Koszt wdrozenia:** 10-16 h.

**Fraza w Google:** "kalkulator kosztu ciecia laserem".

**Oceny:** popyt 4/5, przewaga nad tabela 5/5, bezpieczenstwo 5/5, luka PL 4/5.

## 5. Kalkulator kosztu jednostkowego partii z amortyzacja setupu

**Co uzytkownik dostaje:** wpisuje koszt materialu, czas operacji, stawki,
setup i ilosc, a dostaje koszt jednej sztuki w zaleznosci od wielkosci partii.

**Dlaczego kalkulator wygrywa z tabela:** uzytkownik chce zobaczyc krzywa:
ile kosztuje 1 szt., 5 szt., 20 szt. i 100 szt. Tabela bez interakcji nie
pokaze szybko progu, od ktorego setup przestaje dominowac.

**Wzor ze zrodlem:**

- `Direct_cost = material + labor + machine + outside_services`;
- `Unit_cost = (fixed_setup + Direct_cost * quantity) / good_quantity`;
- `good_quantity = quantity * (1 - scrap_rate)`;
- `Price = Unit_cost / (1 - margin)`.

Zrodla: Unleashed opisuje `Total Manufacturing Cost = Direct Materials +
Direct Labour + Manufacturing Overheads`:
https://www.unleashedsoftware.com/blog/how-to-calculate-the-total-manufacturing-cost-of-your-business/,
sprawdzono 2026-08-05. Tractian podaje `Cost Per Unit = Total Manufacturing
Cost / Total Units Produced`:
https://tractian.com/en/glossary/average-manufacturing-cost-per-unit,
sprawdzono 2026-08-05. Produmex pokazuje, ze koszty setupu i operacji sa
liczone z czasu, ilosci i stawek zasobow:
https://wiki.produmex.name/doku.php?id=implementation%3Amanufacturing%3Acostcalc,
sprawdzono 2026-08-05.

**Pola wejsciowe:**

| Pole | Jednostka | Zakres | Domyslnie |
|---|---:|---:|---:|
| Koszt materialu / szt. | PLN | 0-100000 | 35 |
| Czas maszynowy / szt. | min | 0-10000 | 12 |
| Czas pracy recznej / szt. | min | 0-10000 | 5 |
| Stawka maszyny | PLN/h | 0-2000 | 250 |
| Stawka pracy | PLN/h | 0-1000 | 120 |
| Setup staly | PLN | 0-100000 | 300 |
| Ilosc | szt. | 1-100000 | 10 |
| Odpad / brak | % | 0-80 | 5 |
| Marza | % | 0-90 | 20 |

**Wyjscie poza sama liczba:** koszt/szt., cena/szt., udzial setupu, udzial
materialu, minimalna partia przy zadanym koszcie docelowym, tabela 1/5/10/25/50/100
sztuk, wykres spadku kosztu jednostkowego.

**Przypadki brzegowe:** odpad 100% blokuje wynik; marza 100% blokuje wynik;
zerowe czasy sa dopuszczalne, jezeli chodzi tylko o zakup z narzutem; ilosc
1 pokazuje wyraznie koszt prototypu.

**Ryzyko i zastrzezenie:** ryzyko niskie. Zastrzezenie: "Wynik pomaga zrobic
should-cost, ale nie zna rabatow dostawcy, minimum logistycznego, ryzyka
terminu, reklamacji ani polityki marz firmy."

**Powiazanie z istniejaca trescia:** `koszty-a-jakosc-w-projektowaniu-maszyn.json`,
`szacowanie-czasu-projektowania.json`, `elementy-znormalizowane-handlowki.json`.

**Koszt wdrozenia:** 8-12 h.

**Fraza w Google:** "kalkulator kosztu jednostkowego produkcji".

**Oceny:** popyt 4/5, przewaga nad tabela 5/5, bezpieczenstwo 5/5, luka PL 4/5.

## 6. Kalkulator czasu frezowania i MRR dla wyceny CNC

**Co uzytkownik dostaje:** wpisuje dlugosc sciezki, posuw, szerokosc i
glebokosc skrawania, a dostaje czas frezowania, objetosc usunietego materialu,
MRR i koszt operacji.

**Dlaczego kalkulator wygrywa z tabela:** to nie jest dobor parametrow
skrawania. To szybkie przeliczenie technologiczne do rozmowy z frezerem albo
wstepnej wyceny detalu, gdzie zmienia sie kilka ciaglych wartosci naraz.

**Wzor ze zrodlem:**

- predkosc obrotowa: `n = 1000 * vc / (pi * Dc)`;
- posuw stolu: `vf = fz * z * n`;
- czas: `Tc = L / vf`;
- material removal rate dla frezowania: `Q = ae * ap * vf / 1000` w `cm3/min`.

Zrodlo: Sandvik Coromant publikuje wzory frezarskie, w tym predkosc
obrotowa, posuw stolu, czas obrobki i MRR:
https://www.sandvik.coromant.com/en-us/knowledge/machining-formulas-definitions/milling-formulas-definitions,
sprawdzono 2026-08-05.

**Pola wejsciowe:**

| Pole | Jednostka | Zakres | Domyslnie |
|---|---:|---:|---:|
| Srednica narzedzia `Dc` | mm | 0,5-200 | 10 |
| Predkosc skrawania `vc` | m/min | 1-2000 | 150 |
| Posuw na zab `fz` | mm/zab | 0,001-2 | 0,04 |
| Liczba zebow `z` | szt. | 1-20 | 4 |
| Dlugosc sciezki `L` | mm | 1-1000000 | 800 |
| Glebokosc `ap` | mm | 0-100 | 2 |
| Szerokosc `ae` | mm | 0-200 | 5 |
| Stawka maszyny | PLN/h | 0-2000 | 250 |
| Dodatek na dojazdy i zmiany narzedzi | % | 0-200 | 30 |

**Wyjscie poza sama liczba:** obroty, posuw stolu, czas czystego frezowania,
czas z dodatkiem, MRR, orientacyjny koszt operacji, ostrzezenie gdy posuw lub
MRR wygladaja jak parametry spoza typowej maszyny warsztatowej.

**Przypadki brzegowe:** `Dc`, `vc`, `fz`, `z` lub `L` <= 0 blokuja wynik;
`ae` wieksze niz `Dc` wymaga potwierdzenia; bardzo wysokie obroty pokazuja
"sprawdz limit wrzeciona"; `ap` albo `ae` = 0 ukrywa MRR, ale czas nadal moze
byc liczony z posuwu.

**Ryzyko i zastrzezenie:** ryzyko niskie do sredniego. Zastrzezenie:
"Kalkulator nie dobiera parametrow skrawania. Parametry musza pochodzic z
katalogu narzedzia, materialu, mocowania, strategii CAM i ograniczen maszyny."

**Powiazanie z istniejaca trescia:** `koszty-a-jakosc-w-projektowaniu-maszyn.json`,
`weryfikacja-cad-przed-produkcja.json`.

**Koszt wdrozenia:** 8-14 h.

**Fraza w Google:** "czas frezowania kalkulator".

**Oceny:** popyt 4/5, przewaga nad tabela 5/5, bezpieczenstwo 4/5, luka PL 3/5.

## 7. Kalkulator pokrycia lakierem proszkowym lub farba

**Co uzytkownik dostaje:** wpisuje powierzchnie detali, grubosc powloki,
gestosc albo SG, sprawnosc nanoszenia i cene materialu, a dostaje zuzycie
proszku/farby i koszt powloki.

**Dlaczego kalkulator wygrywa z tabela:** powierzchnia, grubosc, gestosc,
sprawnosc transferu, cena i odpad zmieniaja wynik naraz. To typowy Excel
do zapytan ofertowych i porownania wariantow wykonczenia.

**Wzor ze zrodlem:**

- `V = A * t`;
- `m_teor = V * rho`;
- `m_real = m_teor / eta_transfer`;
- dla jednostek imperialnych publikowany wzor proszkowy: `Coverage(ft2/lb) =
192 / (SG * mils)`.

Zrodlo: P2 InfoHouse / Powder Coating Institute podaje zaleznosc
`Area = Mass / (Thickness * Density)` oraz przeliczony wzor pokrycia
teoretycznego:
https://p2infohouse.org/ref/39/38194.pdf, sprawdzono 2026-08-05. Powder
Coated Tough opisuje sprawnosc transferu jako stosunek proszku osadzonego na
detalu do proszku wychodzacego z pistoletu:
https://www.powdercoatedtough.com/News/ID/2004/Technology-Interchange-If-You-Cant-Measure-It,
sprawdzono 2026-08-05.

**Pola wejsciowe:**

| Pole | Jednostka | Zakres | Domyslnie |
|---|---:|---:|---:|
| Powierzchnia laczna | m2 | 0,001-10000 | 2 |
| Grubosc powloki | um | 5-500 | 80 |
| Gestosc / SG | g/cm3 | 0,5-3 | 1,6 |
| Sprawnosc transferu | % | 10-95 | 60 |
| Odpad i poprawki | % | 0-100 | 10 |
| Cena materialu | PLN/kg | 0-1000 | 45 |
| Ilosc kompletow | szt. | 1-100000 | 10 |

**Wyjscie poza sama liczba:** masa teoretyczna, masa realna z transferem,
koszt/komplet, koszt partii, wskazanie czy grubosc jest typowo cienka,
standardowa czy gruba, ostrzezenie gdy sprawnosc dominuje nad kosztem.

**Przypadki brzegowe:** sprawnosc 0 blokuje wynik; grubosc 0 blokuje wynik;
SG poza zakresem proszkow/farb wymaga potwierdzenia; przy powierzchni wpisanej
z CAD pokazac przypomnienie o stronach niewidocznych i maskowaniu.

**Ryzyko i zastrzezenie:** ryzyko niskie. Zastrzezenie: "Wynik dotyczy zuzycia
materialu powloki, nie pelnej technologii lakierni. Nie uwzglednia zawieszek,
maskowania, przygotowania powierzchni, wypalania, minimalnej partii i poprawek
jakosciowych."

**Powiazanie z istniejaca trescia:** `koszty-a-jakosc-w-projektowaniu-maszyn.json`,
`weryfikacja-cad-przed-produkcja.json`.

**Koszt wdrozenia:** 6-10 h.

**Fraza w Google:** "kalkulator zuzycia farby proszkowej".

**Oceny:** popyt 3/5, przewaga nad tabela 5/5, bezpieczenstwo 5/5, luka PL 4/5.

## 8. Kalkulator filamentu: masa, dlugosc, koszt i zapas na szpuli

**Co uzytkownik dostaje:** wpisuje mase lub dlugosc filamentu, srednice,
gestosc materialu, cene szpuli i wynik ze slicera, a dostaje czy filament
wystarczy, ile zostanie i ile kosztuje wydruk.

**Dlaczego kalkulator wygrywa z tabela:** tabela PLA/ABS pokazuje tylko
przyblizona dlugosc 1 kg. Konstruktor przy biurku chce przeliczyc konkretna
szpule, tare, material, srednice i koszt prototypu.

**Wzor ze zrodlem:**

- pole przekroju: `A = pi * (d / 2)^2`;
- objetosc: `V = A * L`;
- masa: `m = V * rho`;
- dlugosc: `L = m / (rho * A)`;
- koszt wydruku: `Cost = m_used * price_per_kg / 1000`.

Zrodla: PrintPal podaje `Weight = Length * Cross-Section Area * Density`:
https://printpal.io/tools/filament-converter, sprawdzono 2026-08-05. Threedoo
publikuje kalkulator dlugosci filamentu z gestosciami typowych materialow:
https://www.threedoo.com/tutorial/filament-length-calculator, sprawdzono
2026-08-05.

**Pola wejsciowe:**

| Pole | Jednostka | Zakres | Domyslnie |
|---|---:|---:|---:|
| Tryb | - | masa na dlugosc / dlugosc na mase / czy wystarczy | czy wystarczy |
| Srednica filamentu | mm | 1,0-3,5 | 1,75 |
| Material | - | PLA / PETG / ABS / ASA / PA / TPU / wlasna gestosc | PLA |
| Gestosc wlasna | g/cm3 | 0,5-3,0 | 1,24 |
| Masa netto na szpuli | g | 0-10000 | 1000 |
| Tara szpuli | g | 0-1000 | 250 |
| Masa aktualna z wazenia | g | 0-12000 | opcjonalnie |
| Zuzycie ze slicera | g albo m | 0-10000 | 120 g |
| Cena szpuli | PLN | 0-1000 | 80 |
| Zapas bezpieczenstwa | % | 0-50 | 15 |

**Wyjscie poza sama liczba:** dlugosc filamentu na szpuli, masa zuzycia,
koszt wydruku, zapas po wydruku, komunikat "wystarczy / za malo / granicznie",
ile gramow brakuje, porownanie kosztu dla PLA/PETG/ASA przy tych samych mm3.

**Przypadki brzegowe:** srednica 0 blokuje wynik; gestosc 0 blokuje wynik;
masa aktualna mniejsza niz tara daje blad; przy zapasie mniejszym niz 5%
pokazac ostrzezenie, ze slicer moze nie uwzgledniac purge, brim, podpory
albo kalibracji.

**Ryzyko i zastrzezenie:** ryzyko bardzo niskie. Zastrzezenie: "To bilans
materialu. Rzeczywiste zuzycie zalezy od profilu slicera, podpor, brim/skirt,
purge, wilgotnosci filamentu i ewentualnych restartow."

**Powiazanie z istniejaca trescia:** `narzedzia-pracy-konstruktora.json`,
kanal poCADuchy o druku 3D, przyszla Wiedza o prototypowaniu.

**Koszt wdrozenia:** 6-9 h.

**Fraza w Google:** "kalkulator filamentu ile metrow 1kg".

**Oceny:** popyt 4/5, przewaga nad tabela 5/5, bezpieczenstwo 5/5, luka PL 3/5.

## 9. Kalkulator przeplywu objetosciowego FDM i maksymalnej predkosci druku

**Co uzytkownik dostaje:** wpisuje wysokosc warstwy, szerokosc linii, predkosc
i limit hotendu, a dostaje wymagany przeplyw `mm3/s`, maksymalna predkosc dla
tych ustawien i ostrzezenie przed niedoekstruzja.

**Dlaczego kalkulator wygrywa z tabela:** to jest dokladnie przypadek, gdzie
jedna liczba w slicerze zalezy od trzech innych. Tabela z presetami drukarek
nie odpowiada na pytanie: "czy moge drukowac 0,28 mm warstwa i 0,55 mm linia
przy 180 mm/s?"

**Wzor ze zrodlem:**

- `Q = layer_height * line_width * print_speed`;
- `v_max = Q_max / (layer_height * line_width)`;
- predkosc podawania filamentu: `v_filament = Q / (pi * (d_filament / 2)^2)`.

Zrodla: GrandpaCAD podaje `Flow = Layer Height * Line Width * Print Speed`:
https://grandpacad.com/en/tools/volumetric-flow-calculator, sprawdzono
2026-08-05. Obico podaje zaleznosc `Print Speed = Volumetric Flow Rate /
(Layer Height * Line Width)`:
https://www.obico.io/blog/maximum-volumetric-speed-test-in-orcaslicer-a-comprehensive-guide/,
sprawdzono 2026-08-05.

**Pola wejsciowe:**

| Pole | Jednostka | Zakres | Domyslnie |
|---|---:|---:|---:|
| Wysokosc warstwy | mm | 0,02-1,0 | 0,20 |
| Szerokosc linii | mm | 0,1-2,0 | 0,45 |
| Predkosc druku | mm/s | 1-1000 | 120 |
| Limit hotendu `Q_max` | mm3/s | 1-100 | 12 |
| Srednica filamentu | mm | 1,0-3,5 | 1,75 |
| Zapas przeplywu | % | 0-50 | 15 |

**Wyjscie poza sama liczba:** wymagany flow, wykorzystanie limitu hotendu,
maksymalna predkosc z zapasem, predkosc filamentu w ekstruderze, komunikat
"OK / granicznie / ryzyko niedoekstruzji", mini tabela wariantow dla 0,16,
0,20 i 0,28 mm.

**Przypadki brzegowe:** wysokosc, szerokosc, predkosc lub `Q_max` <= 0 blokuje
wynik; szerokosc linii znacznie wieksza od dyszy wymaga ostrzezenia; wynik
ponad `Q_max` nie blokuje, ale wyraznie pokazuje, ze slicer moze drukowac
za szybko dla hotendu.

**Ryzyko i zastrzezenie:** ryzyko niskie. Zastrzezenie: "To limit przeplywu,
nie pelna ocena jakosci wydruku. Nie uwzglednia chlodzenia, przyspieszen,
temperatury, geometrii detalu, materialu, retrakcji i minimalnego czasu warstwy."

**Powiazanie z istniejaca trescia:** `narzedzia-pracy-konstruktora.json`,
kanal poCADuchy o druku 3D.

**Koszt wdrozenia:** 6-10 h.

**Fraza w Google:** "kalkulator volumetric flow druk 3D".

**Oceny:** popyt 4/5, przewaga nad tabela 5/5, bezpieczenstwo 5/5, luka PL 4/5.

## 10. Kalkulator kompensacji skurczu wydruku 3D

**Co uzytkownik dostaje:** po wpisaniu wymiaru projektowego i zmierzonego
z testowego wydruku dostaje wspolczynnik skalowania osi X/Y/Z oraz wymiar,
na jaki trzeba przeskalowac model.

**Dlaczego kalkulator wygrywa z tabela:** skurcz zalezy od materialu,
drukarki, temperatury, orientacji i osi. Gotowa tabela materialow moze byc
tylko punktem startowym; uzytkownik potrzebuje obliczenia z wlasnego testu.

**Wzor ze zrodlem:**

- skala z testu: `Scale_axis = Designed_axis / Measured_axis`;
- skurcz wzgledny: `Shrinkage = 1 - Measured / Designed`;
- wymiar skompensowany: `Compensated = Desired / (1 - Shrinkage)`.

Zrodla: PrintPal podaje wzor `Compensated Size = Desired Size / (1 -
Shrinkage Rate)`:
https://printpal.io/tools/shrinkage-calculator, sprawdzono 2026-08-05. Bambu
Lab opisuje skurcz wydrukow 3D i kompensacje na podstawie wymiaru
zaprojektowanego oraz zmierzonego:
https://wiki.bambulab.com/en/knowledge-sharing/3d-prints-shrinkage,
sprawdzono 2026-08-05.

**Pola wejsciowe:**

| Pole | Jednostka | Zakres | Domyslnie |
|---|---:|---:|---:|
| Tryb | - | jedna os / X-Y-Z | X-Y-Z |
| Wymiar projektowy X/Y/Z | mm | 1-1000 | 100 |
| Wymiar zmierzony X/Y/Z | mm | 0,5-1000 | 99,6 |
| Docelowy wymiar czesci | mm | 1-1000 | 50 |
| Material | - | PLA / PETG / ABS / ASA / PA / resin / wlasny | PETG |
| Maksymalna dopuszczalna korekta | % | 0-10 | 2 |

**Wyjscie poza sama liczba:** skurcz w procentach dla kazdej osi, skala do
wpisania w slicerze, wymiar skompensowany, ostrzezenie gdy osie roznia sie
znaczaco, sugestia ponowienia testu po zmianie materialu lub temperatury.

**Przypadki brzegowe:** wymiar zmierzony 0 blokuje wynik; korekta powyzej
ustawionego limitu pokazuje "najpierw sprawdz kalibracje ekstrudera i wymiary
mechaniczne"; jezeli wymiar zmierzony jest wiekszy niz projektowy, kalkulator
pokazuje skale mniejsza niz 100%, a nie wymusza "skurczu".

**Ryzyko i zastrzezenie:** ryzyko niskie. Zastrzezenie: "Kompensacja skali nie
naprawia luzu od nadlewow, elephant foot, przegrzania, odksztalcen narozy ani
blednej kalibracji ekstrudera. Najlepiej dziala dla prototypow i pomocniczych
detali, nie dla certyfikowanych czesci."

**Powiazanie z istniejaca trescia:** `narzedzia-pracy-konstruktora.json`,
`projektowanie-wielobrylowe-case-study.json`, kanal poCADuchy o druku 3D.

**Koszt wdrozenia:** 6-10 h.

**Fraza w Google:** "kompensacja skurczu druk 3D kalkulator".

**Oceny:** popyt 3/5, przewaga nad tabela 5/5, bezpieczenstwo 5/5, luka PL 4/5.

## Finalna dziesiatka drugiej rundy

| # | Kalkulator | Popyt | Przewaga nad tabela | Bezpieczenstwo | Luka PL | Suma | Koszt |
|---:|---|---:|---:|---:|---:|---:|---:|
| 1 | Stos tolerancji wymiarowej | 4 | 5 | 3 | 5 | 17 | 10-14 h |
| 2 | Pozycja rzeczywista GD&T z MMC | 3 | 5 | 3 | 5 | 16 | 10-16 h |
| 3 | Optymalizator ciecia pretow/profili | 4 | 5 | 5 | 4 | 18 | 14-22 h |
| 4 | Wycena ciecia laserem | 4 | 5 | 5 | 4 | 18 | 10-16 h |
| 5 | Koszt jednostkowy partii z setupem | 4 | 5 | 5 | 4 | 18 | 8-12 h |
| 6 | Czas frezowania i MRR dla wyceny CNC | 4 | 5 | 4 | 3 | 16 | 8-14 h |
| 7 | Pokrycie lakierem proszkowym/farba | 3 | 5 | 5 | 4 | 17 | 6-10 h |
| 8 | Filament: masa, dlugosc, koszt i zapas | 4 | 5 | 5 | 3 | 17 | 6-9 h |
| 9 | Przeplyw objetosciowy FDM i max predkosc | 4 | 5 | 5 | 4 | 18 | 6-10 h |
| 10 | Kompensacja skurczu wydruku 3D | 3 | 5 | 5 | 4 | 17 | 6-10 h |

## Ktore sa mocniejsze niz najslabsze pozycje z pierwszej listy

Najslabsze pozycje pierwszej listy, patrzac pragmatycznie, to:

- **PERT** - bezpieczny i tani, ale popyt inzynierski jest niski, a SEO nie
  bedzie tak maszynowe jak przy technologii wykonania.
- **Moment dokrecania** - bardzo ciekawy, ale ma najwyzsze ryzyko
  interpretacyjne z calej pierwszej listy.
- **Masa polfabrykatu** - uzyteczna i bezpieczna, ale konkurencja w internecie
  jest duza, wiec luka PL jest slaba.
- **Zmiana luzu od temperatury** - ekspercka, ale popyt bedzie mniejszy i
  trzeba bardzo pilnowac zastrzezen.

Z drugiej dziesiatki mocniejsze od tych pozycji sa:

1. **Optymalizator ciecia pretow/profili** - lepszy niz PERT i masa
   polfabrykatu, bo oszczednosc jest natychmiast materialowa, wynik nie jest
   tabela, a uzytkownik dostaje plan do produkcji.
2. **Wycena ciecia laserem** - mocniejsza od PERT i masy, bo laczy SEO z
   realnym procesem ofertowym. Jest tez bezpieczniejsza niz moment dokrecania.
3. **Koszt jednostkowy partii z setupem** - mocniejszy od PERT, bo odpowiada
   na codzienne pytanie "dlaczego 1 sztuka kosztuje tyle, a 20 sztuk mniej".
   To jest kalkulator, do ktorego konstruktor wraca przy rozmowie z klientem
   albo produkcja.
4. **Przeplyw objetosciowy FDM** - mocniejszy od PERT i porownywalny z
   najlepszymi bezpiecznymi narzedziami z pierwszej listy. Ma wysoka przewage
   nad tabela, niski koszt wdrozenia i mocne powiazanie z kanalem o druku 3D.
5. **Filament: masa, dlugosc, koszt i zapas** - mocniejszy od masy
   polfabrykatu, bo jest bardziej konkretny: uzytkownik nie tylko liczy mase,
   ale podejmuje decyzje, czy puscic wydruk i czy szpula wystarczy.
6. **Stos tolerancji wymiarowej** - mocniejszy od PERT i od masy
   polfabrykatu, bo jest blizej projektowania dokumentacji i ma duza luke po
   polsku. Slabszy od topowych kalkulatorow pierwszej listy tylko przez
   koniecznosc dobrych ostrzezen przy RSS.
7. **Pokrycie lakierem proszkowym/farba** - mocniejsze od PERT i czesciowo od
   masy polfabrykatu, bo laczy geometrie z wycena wykonczenia. Jest mniej
   uniwersalne, ale bardziej ofertowe.
8. **Kompensacja skurczu wydruku 3D** - mocniejsza od PERT, gdy celem jest
   budowanie klastra 3D. Jako glowny kalkulator SEO jest slabsza od flow i
   filamentu, ale bardzo dobrze pasuje do autora strony.

Nie uznalbym za wyraznie mocniejszy od najslabszych z pierwszej listy tylko
**pozycji GD&T z MMC**. To bardzo dobry temat ekspercki, ale wymaga ostroznego
pozycjonowania jako pomoc do zrozumienia i weryfikacji, nie jako narzedzie
ostatecznej kontroli jakosci. Wartosciowy, ale nie pierwszy do wdrozenia.

## Rekomendowana kolejnosc wdrozenia

1. **Przeplyw objetosciowy FDM** - niski koszt, dobry popyt, mocne powiazanie
   z drukiem 3D i szybki efekt.
2. **Filament: masa, dlugosc, koszt i zapas** - tani kalkulator, duza
   uzytecznosc praktyczna, latwy do spiecia z poprzednim.
3. **Koszt jednostkowy partii z setupem** - najlepszy pomost do artykulu o
   kosztach i jakosci.
4. **Wycena ciecia laserem** - dobry temat SEO i ofertowy, ale wymaga wiecej
   wejsc.
5. **Optymalizator ciecia pretow/profili** - bardzo mocny, ale drozszy we
   wdrozeniu przez algorytm i prezentacje planu ciecia.
6. **Stos tolerancji wymiarowej** - swietny pod dokumentacje, ale trzeba
   napisac dobry tekst edukacyjny o worst-case vs RSS.
7. **Kompensacja skurczu wydruku 3D** - warto jako trzeci element klastra 3D.
8. **Pokrycie lakierem proszkowym/farba** - dobry kalkulator kosztowy, ale
   bardziej niszowy.
9. **Czas frezowania i MRR** - przydatny, lecz wymaga mocnego rozdzielenia
   "wycena czasu" od "doboru parametrow".
10. **Pozycja rzeczywista GD&T z MMC** - ekspercki wyroznik, ale dopiero po
    zbudowaniu standardu zastrzezen i przykladow.
