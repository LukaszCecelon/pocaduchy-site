# Kalkulatory na pocaduchy.pl - 10 pomyslow gotowych do wdrozenia

Data analizy i sprawdzenia zrodel: 2026-08-05.

Kontekst: strona polskiego inzyniera konstruktora maszyn, 19 artykulow w `content/blog`, zakladka Wiedza w budowie, hosting statyczny. Wszystkie narzedzia ponizej da sie zrobic jako czysty JavaScript w przegladarce, bez backendu.

Zasada selekcji: kalkulator przechodzi tylko wtedy, gdy jest lepszy niz tabela. Jezeli uzytkownik wybiera jedna z kilkunastu kombinacji katalogowych, tabela jest szybsza, lepiej indeksowalna i latwiejsza do wydrukowania.

## Co odrzucam jako tabele w przebraniu

- Rowek pod pierscien DIN 471/DIN 472: najlepsza jest tabela wymiarow i rysunek, nie kalkulator.
- Gwinty metryczne M3-M20: otwor pod gwint, skok i otwor przelotowy to tabela.
- Wpusty pryzmatyczne DIN 6885: przekroj wpustu i glebokosci rowkow to tabela; kalkulator momentu wpustu bylby zbyt blisko obliczen wytrzymalosciowych.
- Nitonakretki i nity: otwor montazowy i zakres zacisku zaleza od rodziny producenta, wiec tabela + ostrzezenie wygrywa z kalkulatorem.
- Pelny kalkulator momentow dokrecania srub: za duze ryzyko. Dopuszczalna jest tabela orientacyjna z mocnym zastrzezeniem, ale nie narzedzie udajace procedure montazu.

## 1. Kalkulator sily silownika pneumatycznego

**Jedno zdanie:** konstruktor wpisuje srednice tloka, tloczyska, cisnienie i wspolczynnik strat, a dostaje sile wysuwu, wsuwu oraz interpretacje, czy wynik jest tylko teoretyczny czy nadaje sie jako punkt startowy do doboru.

**Czy lepszy niz tabela:** tak. Srednica, tloczysko, cisnienie i sprawnosc tworza duza przestrzen wejsc, a wynik wymaga kilku dzialan.

**Wzory i zrodla:** `F = p * A * eta`, `A_wysuw = pi * D^2 / 4`, `A_wsuw = pi * (D^2 - d^2) / 4`. SMC podaje zaleznosc sily teoretycznej od cisnienia i pola tloka: https://content2.smcetech.com/pdf/JMB-D_EU.pdf, sprawdzono 2026-08-05. FIRGELLI podaje `F = P * A * eta` i pole tloka: https://www.firgelliauto.com/blogs/engineering-calculators/pneumatic-cylinder-force-calculator, sprawdzono 2026-08-05.

**Pola wejsciowe:**

| Pole | Jednostka | Zakres | Domyslnie |
|---|---:|---:|---:|
| Srednica tloka D | mm | 6-320 | 40 |
| Srednica tloczyska d | mm | 0 do D - 1 | 16 |
| Cisnienie robocze p | bar | 0,5-10 | 6 |
| Sprawnosc / straty eta | - | 0,50-1,00 | 0,85 |
| Wymagana sila robocza | N | 0-100000 | 500 |

**Wyjscie:** sila teoretyczna wysuwu i wsuwu, sila po stratach, procent zapasu wzgledem wymaganej sily, komunikat "brakuje zapasu", "zapas roboczy umiarkowany" albo "silownik prawdopodobnie przewymiarowany", plus uwaga ze Festo w materialach doborowych zaleca w praktyce przyjmowac okolo 50% sily teoretycznej jako konserwatywny punkt startowy.

**Przypadki brzegowe:** D <= 0, p <= 0 albo eta <= 0 blokuje obliczenie; d >= D pokazuje blad "tloczysko nie moze miec srednicy rownej lub wiekszej od tloka"; bardzo duze p albo D pokazuje ostrzezenie "poza typowym zakresem pneumatyki maszynowej, sprawdz katalog producenta"; wymagana sila = 0 liczy tylko parametry silownika bez oceny zapasu.

**Ryzyko:** ktos moze uzyc wyniku jako ostatecznego doboru w mechanizmie, ktory podnosi ladunek, dociska operatora albo pelni funkcje bezpieczenstwa. Zastrzezenie obok: "Wynik jest orientacyjny. Nie uwzglednia dynamiki, amortyzacji, wyboczenia tloczyska, spadkow cisnienia, prowadnic ani analizy ryzyka maszyny."

**Powiazanie:** artykul `elektrozawory-pneumatyczne-dobor.json`; temat Wiedzy "Sila silownika".

**Koszt wdrozenia:** 8-12 h.

**Fraza Google:** "kalkulator sily silownika pneumatycznego".

**Oceny:** popyt 5/5, przewaga nad tabela 5/5, bezpieczenstwo 3/5, luka w polskim internecie 3/5.

## 2. Kalkulator zuzycia powietrza przez silownik

**Jedno zdanie:** konstruktor wpisuje srednice silownika, skok, cisnienie i liczbe cykli na minute, a dostaje zuzycie powietrza na cykl i przeplyw wymagany od instalacji.

**Czy lepszy niz tabela:** tak. Wynik zalezy liniowo od skoku, cisnienia i czestotliwosci, a tabela musialaby byc ogromna.

**Wzory i zrodla:** dla silownika dwustronnego `A1 = pi * D^2 / 4`, `A2 = pi * (D^2 - d^2) / 4`, `V_cykl = (A1 + A2) * L`, `V_ANR = V_cykl * (p_abs / p_atm)`, `Q = V_ANR * n`. SMC opisuje zuzycie powietrza cylindra, wymagane powietrze na skok, pola czynne, skok i cisnienie: https://www.smcworld.com/catalog/BEST-technical-data-en/pdf/6-2-1-m21-43-tech_en.pdf, sprawdzono 2026-08-05. FIRGELLI podaje analogiczna zaleznosc objetosci, liczby cykli i cisnienia bezwzglednego: https://www.firgelliauto.com/blogs/engineering-calculators/pneumatic-air-consumption-calculator, sprawdzono 2026-08-05.

**Pola wejsciowe:**

| Pole | Jednostka | Zakres | Domyslnie |
|---|---:|---:|---:|
| Srednica tloka D | mm | 6-320 | 40 |
| Srednica tloczyska d | mm | 0 do D - 1 | 16 |
| Skok L | mm | 1-3000 | 100 |
| Cisnienie robocze | bar(g) | 0,5-10 | 6 |
| Cykle pelne na minute | 1/min | 0,1-300 | 10 |
| Zapas na przewody i nieszczelnosci | % | 0-100 | 20 |

**Wyjscie:** litry normalne na jeden pelny cykl, Nl/min bez zapasu i z zapasem, porownanie "maly odbiornik", "uwazaj na przeplyw zaworu i przewodow", "duze zuzycie - sprawdz srednice przewodow, zawor i koszt sprzezonego powietrza".

**Przypadki brzegowe:** zero lub wartosci ujemne blokuja wynik; d >= D blokuje wynik; bardzo duza liczba cykli pokazuje ostrzezenie o dynamice i nagrzewaniu; skok powyzej 3000 mm wymusza reczne potwierdzenie, bo to zwykle nietypowa aplikacja.

**Ryzyko:** ktos moze dobrac zawor lub kompresor tylko z tego wyniku, bez strat na przewodach, jednoczesnosci wielu odbiornikow i spadkow cisnienia. Zastrzezenie: "To bilans orientacyjny jednego aktuatora, nie projekt instalacji pneumatycznej."

**Powiazanie:** `elektrozawory-pneumatyczne-dobor.json`; naturalny drugi kalkulator przy pneumatyce.

**Koszt wdrozenia:** 10-14 h.

**Fraza Google:** "zuzycie powietrza silownik pneumatyczny kalkulator".

**Oceny:** popyt 4/5, przewaga nad tabela 5/5, bezpieczenstwo 4/5, luka w polskim internecie 4/5.

## 3. Kalkulator momentu roboczego napedu i sprzegla

**Jedno zdanie:** konstruktor wpisuje moc, obroty i wspolczynnik pracy, a dostaje moment nominalny oraz minimalny moment katalogowy sprzegla do dalszego doboru.

**Czy lepszy niz tabela:** tak. Moc i obroty sa ciagle, a wynik laczy przeliczenie napedu z mnoznikiem doborowym.

**Wzory i zrodla:** `T = 9550 * P / n`, gdzie P jest w kW, n w obr/min, T w Nm. TEA podaje `M = P * 9550 / n` i wyprowadzenie stalej: https://technische-antriebselemente.de/en/tools/torque-calculator/, sprawdzono 2026-08-05. KTR opisuje dobor sprzegla z uwzglednieniem wspolczynnikow pracy i warunku, ze dopuszczalny moment sprzegla musi byc co najmniej tak duzy jak moment maszyny z czynnikami pracy: https://www.ktr.com/fileadmin/ktr/media/Tools_Downloads/kataloge/coupling_selection_operating_factors.pdf, sprawdzono 2026-08-05. U.S. Tsubaki opisuje liczenie wymaganego momentu i stosowanie service factor: https://www.ustsubaki.com/resources/knowledge-center/coupling-selection-guide-how-to-choose-the-right-coupling-for-your-application/, sprawdzono 2026-08-05.

**Pola wejsciowe:**

| Pole | Jednostka | Zakres | Domyslnie |
|---|---:|---:|---:|
| Moc P | kW | 0,01-500 | 1,5 |
| Predkosc n | obr/min | 1-10000 | 1450 |
| Wspolczynnik pracy k | - | 1,0-3,0 | 1,5 |
| Moment katalogowy sprawdzanego sprzegla | Nm | 0-100000 | 0 |

**Wyjscie:** moment nominalny, moment wymagany `T * k`, werdykt porownania z wpisanym momentem katalogowym, informacja czy k jest lagodny, umiarkowany czy ciezki, oraz ostrzezenie przy napedach impulsowych i rewersyjnych.

**Przypadki brzegowe:** P <= 0 lub n <= 0 blokuje wynik; n bardzo male pokazuje ostrzezenie o bardzo duzym momencie i ryzyku pomylki jednostek; k < 1 blokuje wynik; katalogowy moment = 0 ukrywa werdykt pass/fail i pokazuje tylko wymaganie.

**Ryzyko:** ktos moze dobrac sprzeglo tylko po momencie, ignorujac srednice walkow, niewspolosiowosc, sztywnosc skretna, temperature, drgania i polaczenie piasta-wal. Zastrzezenie: "Kalkulator nie dobiera sprzegla. Podaje moment startowy do porownania z katalogiem producenta."

**Powiazanie:** `dobor-sprzegla-do-aplikacji.json`, `polaczenie-wal-piasta.json`, `tuleje-taper-lock-dobor.json`.

**Koszt wdrozenia:** 6-9 h.

**Fraza Google:** "kalkulator momentu sprzegla kW rpm".

**Oceny:** popyt 5/5, przewaga nad tabela 5/5, bezpieczenstwo 3/5, luka w polskim internecie 3/5.

## 4. Kalkulator sruby trapezowej / pociagowej: sila, moment i predkosc

**Jedno zdanie:** konstruktor wpisuje wymagany posuw, skok sruby, obroty, sile i sprawnosc, a dostaje wymagany moment albo dostepna sile oraz predkosc liniowa.

**Czy lepszy niz tabela:** tak. Laczy ruch obrotowy z liniowym i wymaga przeliczen zaleznosci ciaglych.

**Wzory i zrodla:** uproszczony model energetyczny `T = F * L / (2 * pi * eta)` oraz odwrotnie `F = 2 * pi * eta * T / L`. MOONS podaje `F = (2pi * eta * T) / P`: https://www.moonsindustries.com/article/thrust-generation-principle-linear-lead-screw-motor, sprawdzono 2026-08-05. FIRGELLI podaje `T = F * L / (2pi * eta)`: https://www.firgelliauto.com/blogs/engineering-calculators/lead-screw-torque-and-force-calculator, sprawdzono 2026-08-05. Predkosc liniowa: `v = n * L`, gdzie L to prowadzenie na obrot; wynika z definicji skoku/prowadzenia sruby.

**Pola wejsciowe:**

| Pole | Jednostka | Zakres | Domyslnie |
|---|---:|---:|---:|
| Tryb | - | moment z sily / sila z momentu | moment z sily |
| Sila osiowa F | N | 1-100000 | 500 |
| Moment T | Nm | 0,01-1000 | 1 |
| Prowadzenie sruby L | mm/obr | 0,1-100 | 5 |
| Sprawnosc eta | - | 0,10-0,95 | 0,35 |
| Obroty n | obr/min | 1-5000 | 300 |

**Wyjscie:** wymagany moment albo dostepna sila, predkosc liniowa w mm/s, informacja czy sprawnosc wyglada jak sruba trapezowa czy kulowa, oraz lista rzeczy do sprawdzenia: hamulec przy osi pionowej, lozyskowanie, wyboczenie, samohamownosc, luz osiowy.

**Przypadki brzegowe:** L <= 0, eta <= 0, F <= 0 albo T <= 0 blokuja wynik; eta > 0,95 pokazuje blad; predkosc powyzej praktycznego zakresu dla sruby pokazuje ostrzezenie o krytycznych obrotach i drganiach; tryb osi pionowej dodaje ostrzezenie o opadaniu.

**Ryzyko:** ktos moze uzyc uproszczenia do podnoszenia ladunku bez hamulca lub bez sprawdzenia samohamownosci. Zastrzezenie: "To kalkulator konwersji energii, nie dobor osi bezpiecznej. Dla osi pionowych i ladunkow nad czlowiekiem wymagane sa osobne zabezpieczenia."

**Powiazanie:** `narzedzia-pracy-konstruktora.json`, `pozornie-latwe-miejsca-projektu.json`, tematy przyszlej Wiedzy o mechanizmach liniowych.

**Koszt wdrozenia:** 10-16 h.

**Fraza Google:** "sila sruby trapezowej kalkulator".

**Oceny:** popyt 4/5, przewaga nad tabela 5/5, bezpieczenstwo 3/5, luka w polskim internecie 4/5.

## 5. Kalkulator ugiecia profilu aluminiowego albo belki wspornikowej

**Jedno zdanie:** konstruktor wpisuje dlugosc, obciazenie, modul E i moment bezwladnosci profilu, a dostaje ugiecie oraz praktyczna interpretacje sztywnosci.

**Czy lepszy niz tabela:** tak. Dlugosc wchodzi do wzoru w trzeciej lub czwartej potedze, wiec tabela szybko staje sie nieczytelna.

**Wzory i zrodla:** wspornik z sila na koncu `delta = F * L^3 / (3 * E * I)`, wspornik z obciazeniem rownomiernym `delta = q * L^4 / (8 * E * I)`, belka podparta na koncach z sila w srodku `delta = F * L^3 / (48 * E * I)`, belka podparta z obciazeniem rownomiernym `delta = 5 * q * L^4 / (384 * E * I)`. Engineering ToolBox publikuje wzory dla wspornikow i belek: https://www.engineeringtoolbox.com/cantilever-beams-d_1848.html oraz https://www.engineeringtoolbox.com/beam-stress-deflection-d_1312.html, sprawdzono 2026-08-05.

**Pola wejsciowe:**

| Pole | Jednostka | Zakres | Domyslnie |
|---|---:|---:|---:|
| Schemat | - | wspornik / podparta na koncach | wspornik |
| Typ obciazenia | - | sila punktowa / rownomierne | sila punktowa |
| Dlugosc L | mm | 50-5000 | 500 |
| Sila F | N | 1-10000 | 100 |
| Obciazenie q | N/mm | 0,001-50 | 0,2 |
| Modul E | N/mm2 | 1000-220000 | 70000 |
| Moment bezwladnosci I | mm4 | 100-100000000 | 139600 |

**Wyjscie:** ugiecie w mm, stosunek `L/delta`, komunikat "sztywne", "widoczne ugiecie", "profil moze byc za wiotki", oraz przypomnienie zeby brac I konkretnego profilu z karty producenta. Bez automatycznego werdyktu wytrzymalosciowego.

**Przypadki brzegowe:** E <= 0, I <= 0, L <= 0 albo obciazenie <= 0 blokuja wynik; ugiecie wieksze niz L/20 pokazuje ostrzezenie o przekroczeniu zakresu sensownego modelu liniowego; profil o nieznanym I nie moze byc liczony na oko.

**Ryzyko:** ktos moze uznac, ze male ugiecie oznacza bezpieczna konstrukcje, mimo ze kalkulator nie sprawdza naprezen, wezlow, srub, wyboczenia, zmeczenia ani drgan. Zastrzezenie: "To narzedzie do wstepnej oceny sztywnosci, nie obliczenie nosnosci konstrukcji."

**Powiazanie:** temat Wiedzy "Profile aluminiowe"; `design-for-maintenance-przezbrojenia.json`, `koszty-a-jakosc-w-projektowaniu-maszyn.json`.

**Koszt wdrozenia:** 12-18 h.

**Fraza Google:** "ugiecie profilu aluminiowego kalkulator".

**Oceny:** popyt 4/5, przewaga nad tabela 5/5, bezpieczenstwo 2/5, luka w polskim internecie 4/5.

## 6. Kalkulator zmiany luzu od temperatury

**Jedno zdanie:** konstruktor wpisuje material walu i piasty, srednice, luz poczatkowy oraz temperature montazu i pracy, a dostaje luz albo wcisk po zmianie temperatury.

**Czy lepszy niz tabela:** tak. Kombinacje materialow, srednic, luzow i temperatur sa zbyt liczne dla tabeli.

**Wzory i zrodla:** rozszerzalnosc liniowa `dL = L0 * alpha * (t1 - t0)`. Engineering ToolBox podaje wzor rozszerzalnosci liniowej: https://www.engineeringtoolbox.com/linear-thermal-expansion-d_1379.html, sprawdzono 2026-08-05, oraz wspolczynniki dla materialow: https://www.engineeringtoolbox.com/linear-expansion-coefficients-d_95.html, sprawdzono 2026-08-05. Dla pasowania: `D_otworu_2 = D_otworu_1 * (1 + alpha_otworu * dT_otworu)`, `D_walka_2 = D_walka_1 * (1 + alpha_walka * dT_walka)`, `luz_2 = D_otworu_2 - D_walka_2`.

**Pola wejsciowe:**

| Pole | Jednostka | Zakres | Domyslnie |
|---|---:|---:|---:|
| Srednica nominalna | mm | 1-500 | 40 |
| Luz poczatkowy | mm | -1,000 do 1,000 | 0,020 |
| Material otworu | - | stal / aluminium / mosiadz / tworzywo / wlasne alpha | aluminium |
| Material walka | - | stal / aluminium / mosiadz / tworzywo / wlasne alpha | stal |
| Temperatura odniesienia | st. C | -50 do 200 | 20 |
| Temperatura pracy otworu | st. C | -50 do 200 | 60 |
| Temperatura pracy walka | st. C | -50 do 200 | 60 |

**Wyjscie:** nowy luz lub wcisk w mm i mikrometrach, zmiana srednicy otworu, zmiana srednicy walka, komunikat "luz rosnie", "luz maleje", "przechodzi we wcisk" albo "wcisk znika". Dodatkowo wskazanie, ktory material odpowiada za zmiane.

**Przypadki brzegowe:** srednica <= 0 blokuje wynik; temperatury poza zakresem pokazuja blad, bo wspolczynniki moga nie byc liniowe; bardzo duzy ujemny luz pokazuje ostrzezenie "to juz montaz wciskowy, nie zwykly luz"; tworzywa wymagaja mocnego ostrzezenia o zmiennosci alpha.

**Ryzyko:** ktos moze potraktowac wynik jako pelny dobor pasowania cieplnego lub montazu skurczowego. Zastrzezenie: "Model jest liniowy i orientacyjny. Nie uwzglednia gradientow temperatury, powlok, chropowatosci, odksztalcen cienkosciennych ani naprezen montazowych."

**Powiazanie:** temat Wiedzy "Pasowania H7/g6"; `polaczenie-wal-piasta.json`, `tuleje-taper-lock-dobor.json`.

**Koszt wdrozenia:** 10-14 h.

**Fraza Google:** "zmiana luzu pasowania od temperatury".

**Oceny:** popyt 3/5, przewaga nad tabela 5/5, bezpieczenstwo 3/5, luka w polskim internecie 5/5.

## 7. Kalkulator wspolrzednych otworow na okregu podzialowym

**Jedno zdanie:** konstruktor wpisuje PCD, liczbe otworow, kat startowy i punkt bazowy, a dostaje tabele wspolrzednych X/Y do CAD, rysunku albo obrobki.

**Czy lepszy niz tabela:** tak. Dla dowolnej liczby otworow, srednicy i kata startowego tabela bylaby bez sensu.

**Wzory i zrodla:** `r = PCD / 2`, `theta_i = theta_start + i * 360 / N`, `x_i = Xc + r * cos(theta_i)`, `y_i = Yc + r * sin(theta_i)`. FIRGELLI podaje wzory wspolrzednych otworow na bolt circle: https://www.firgelliauto.com/blogs/engineering-calculators/bolt-circle-calculator-hole-coordinates, sprawdzono 2026-08-05. Vibromera podaje odleglosc cięciwy sasiednich otworow `c = D * sin(pi / N)`: https://vibromera.eu/calculators/bolt-pattern-calculator/, sprawdzono 2026-08-05.

**Pola wejsciowe:**

| Pole | Jednostka | Zakres | Domyslnie |
|---|---:|---:|---:|
| Srednica podzialowa PCD | mm | 1-5000 | 100 |
| Liczba otworow N | szt. | 2-360 | 6 |
| Kat startowy | stopnie | -360 do 360 | 0 |
| X centrum | mm | -10000 do 10000 | 0 |
| Y centrum | mm | -10000 do 10000 | 0 |
| Srednica otworu | mm | 0-1000 | 8 |
| Zaokraglenie | miejsca po przecinku | 0-4 | 3 |

**Wyjscie:** tabela X/Y, kat kazdego otworu, odleglosc miedzy osiami sasiednich otworow, odleglosc miedzy krawedziami otworow jezeli podano srednice otworu, przycisk "kopiuj CSV", oraz informacja czy ligament miedzy otworami robi sie podejrzanie maly.

**Przypadki brzegowe:** N < 2 blokuje wynik; PCD <= 0 blokuje wynik; srednica otworu >= odleglosc osi sasiednich otworow pokazuje blad kolizji; bardzo duze N ostrzega o czytelnosci tabeli i sensie technologii.

**Ryzyko:** niskie. Blad moze dac zly rozstaw otworow, ale nie jest to samodzielne obliczenie bezpieczenstwa. Zastrzezenie: "Wspolrzedne sprawdz wzgledem ukladu bazowego rysunku i konwencji osi maszyny."

**Powiazanie:** `weryfikacja-cad-przed-produkcja.json`, `projektowanie-wielobrylowe-case-study.json`, `narzedzia-pracy-konstruktora.json`.

**Koszt wdrozenia:** 6-10 h.

**Fraza Google:** "kalkulator otworow na okregu wspolrzedne".

**Oceny:** popyt 4/5, przewaga nad tabela 5/5, bezpieczenstwo 5/5, luka w polskim internecie 4/5.

## 8. Kalkulator masy i kosztu polfabrykatu

**Jedno zdanie:** konstruktor wpisuje ksztalt, wymiary, material, naddatek i cene za kilogram, a dostaje mase detalu/polfabrykatu oraz orientacyjny koszt materialu.

**Czy lepszy niz tabela:** tak. Wymiary sa ciagle, a wynik laczy geometrie, gestosc, naddatek i koszt.

**Wzory i zrodla:** gestosc `rho = m / V`, czyli `m = rho * V`. Engineering ToolBox podaje definicje gestosci: https://www.engineeringtoolbox.com/density-specific-weight-gravity-d_290.html, sprawdzono 2026-08-05, wzory objetosci bryl, m.in. walca i rury: https://www.engineeringtoolbox.com/surface-volume-solids-d_322.html, sprawdzono 2026-08-05, oraz gestosci metali i stopow: https://www.engineeringtoolbox.com/metal-alloys-densities-d_50.html i gestosci wybranych cial stalych: https://www.engineeringtoolbox.com/density-solids-d_1265.html, sprawdzono 2026-08-05. Przykladowe objetosci: plyta `V = L * W * T`, walec `V = pi * d^2 * L / 4`, rura `V = pi * (D^2 - d^2) * L / 4`.

**Pola wejsciowe:**

| Pole | Jednostka | Zakres | Domyslnie |
|---|---:|---:|---:|
| Ksztalt | - | plyta / walek / rura / prostopadloscian | plyta |
| Wymiary glowne | mm | 0,1-10000 | zalezne od ksztaltu |
| Material | - | stal / aluminium / nierdzewka / mosiadz / POM / wlasna gestosc | stal |
| Gestosc wlasna | kg/m3 | 10-25000 | 7850 |
| Naddatek materialowy | % | 0-100 | 15 |
| Cena materialu | PLN/kg | 0-1000 | 12 |

**Wyjscie:** objetosc, masa netto, masa z naddatkiem, koszt materialu netto i z naddatkiem, komunikat "lekki detal", "uwazaj na noszenie reczne", "masa wymaga przemyslenia montazu/transportu", oraz lista zalozen o gestosci.

**Przypadki brzegowe:** wymiary <= 0 blokuja wynik; w rurze d >= D blokuje wynik; gestosc <= 0 blokuje wynik; naddatek 0 jest dopuszczalny, ale dostaje etykiete "bez odpadu"; bardzo wysoka masa pokazuje ostrzezenie o ergonomii i logistyce.

**Ryzyko:** niskie. Najwieksze ryzyko to mylenie kosztu materialu z kosztem wykonania detalu. Zastrzezenie: "Koszt dotyczy tylko surowca. Nie obejmuje ciecia, obrobki, odpadu technologicznego, atestu, transportu ani minimalnej wartosci zamowienia."

**Powiazanie:** `koszty-a-jakosc-w-projektowaniu-maszyn.json`, `elementy-znormalizowane-handlowki.json`, `narzedzia-pracy-konstruktora.json`.

**Koszt wdrozenia:** 8-12 h.

**Fraza Google:** "kalkulator masy stali aluminium".

**Oceny:** popyt 4/5, przewaga nad tabela 5/5, bezpieczenstwo 5/5, luka w polskim internecie 2/5.

## 9. Kalkulator PERT dla czasu projektu konstrukcyjnego

**Jedno zdanie:** konstruktor wpisuje wariant optymistyczny, najbardziej prawdopodobny i pesymistyczny dla etapu projektu, a dostaje oczekiwany czas oraz zakres niepewnosci.

**Czy lepszy niz tabela:** tak, bo wynik zalezy od trzech ciaglych estymat i dobrze nadaje sie do szybkiego przeliczenia kilku etapow.

**Wzory i zrodla:** `E = (O + 4M + P) / 6`, `sigma = (P - O) / 6`, `variance = sigma^2`. ProjectManager podaje wzor PERT i wariancje: https://www.projectmanager.com/blog/pert-analysis, sprawdzono 2026-08-05. Project Management Academy podaje tradycyjny wzor beta PERT: https://projectmanagementacademy.net/resources/blog/a-three-point-estimating-technique-pert/, sprawdzono 2026-08-05, oraz odchylenie standardowe `(P - O) / 6`: https://projectmanagementacademy.net/resources/blog/standard-deviation/, sprawdzono 2026-08-05.

**Pola wejsciowe:**

| Pole | Jednostka | Zakres | Domyslnie |
|---|---:|---:|---:|
| Czas optymistyczny O | h | 0,1-1000 | 8 |
| Czas najbardziej prawdopodobny M | h | 0,1-1000 | 16 |
| Czas pesymistyczny P | h | 0,1-1000 | 32 |
| Liczba podobnych etapow | szt. | 1-50 | 1 |
| Bufor decyzyjny | % | 0-100 | 20 |

**Wyjscie:** czas oczekiwany, odchylenie standardowe, wynik z buforem, komunikat czy rozrzut jest maly, umiarkowany czy duzy, oraz sugestia "tu nie brakuje kalkulatora, tylko danych wejsciowych" przy bardzo szerokim zakresie P-O.

**Przypadki brzegowe:** wartosci <= 0 blokuja wynik; jezeli O > M albo M > P, formularz pokazuje blad logiczny; jezeli P/O > 10, pokazuje ostrzezenie o skrajnej niepewnosci; liczba etapow > 1 sumuje czasy, ale opisuje zalozenie niezaleznosci etapow jako uproszczenie.

**Ryzyko:** ktos moze potraktowac wynik jako obietnice terminu dla klienta, mimo ze PERT nie zna zmian zakresu, zatwierdzen i brakow danych. Zastrzezenie: "PERT porzadkuje niepewnosc, ale nie zastepuje rozmowy o zakresie projektu i zalozeniach."

**Powiazanie:** `szacowanie-czasu-projektowania.json`, `projektowanie-z-niepelnymi-danymi.json`, `kick-off-projektu-konstrukcyjnego.json`.

**Koszt wdrozenia:** 5-8 h.

**Fraza Google:** "PERT kalkulator czasu projektu".

**Oceny:** popyt 2/5, przewaga nad tabela 4/5, bezpieczenstwo 5/5, luka w polskim internecie 2/5.

## 10. Kalkulator luzu katowego bazowania na dwoch kolkach

**Jedno zdanie:** konstruktor wpisuje rozstaw kolkow i luzy na otworach, a dostaje maksymalny orientacyjny blad katowy oraz przesuniecie na koncu detalu.

**Czy lepszy niz tabela:** tak. Rozstaw, luzy i dlugosc detalu sa ciagle, a wynik pokazuje skutek geometryczny, ktory trudno poczuc z samej tabeli H7/m6.

**Wzory i zrodla:** dla bazowania dwoma elementami z luzem przyblizenie kata mozna zapisac jako `sin(alpha) = (A2 + A3) / (2L)`, gdzie A2 i A3 sa maksymalnymi luzami, a L rozstawem; publikacja "Diamond-Pin Location" podaje zwiazek maksymalnego bledu katowego z luzami i rozstawem: https://www.stat.cmu.edu/technometrics/59-69/VOL-09-01/v0901131.pdf, sprawdzono 2026-08-05. Dla przemieszczenia na dlugosci detalu: `s = R * tan(alpha)`, co wynika z podstawowej trygonometrii kata.

**Pola wejsciowe:**

| Pole | Jednostka | Zakres | Domyslnie |
|---|---:|---:|---:|
| Rozstaw kolkow L | mm | 5-2000 | 100 |
| Luz na pierwszym kolku A2 | mm | 0-1,000 | 0,020 |
| Luz na drugim kolku A3 | mm | 0-1,000 | 0,020 |
| Odleglosc kontrolowana R | mm | 0-5000 | 200 |
| Tryb drugiej bazy | - | drugi okragly / otwor podluzny / kolek diamentowy | otwor podluzny |

**Wyjscie:** maksymalny blad katowy w stopniach i mrad, przesuniecie na odleglosci R, komunikat "rozstaw pomaga", "luz widoczny na koncu detalu", oraz zalecenie kiedy przejsc z dwoch kolkow okraglych na kolek + otwor podluzny albo kolek diamentowy.

**Przypadki brzegowe:** L <= 0 blokuje wynik; ujemny luz blokuje wynik; jezeli `(A2 + A3) / (2L) >= 1`, pokazuje blad "geometria poza zakresem wzoru"; R = 0 liczy tylko kat; bardzo male L przy duzych luzach dostaje ostrzezenie o slabej bazie.

**Ryzyko:** ktos moze uznac, ze kalkulator rozstrzyga tolerancje pozycji kolkow. Nie rozstrzyga. Zastrzezenie: "To wizualizacja skutku luzu. Tolerancje pozycji, pasowania i sposob bazowania musza wynikac z funkcji czesci i technologii wykonania."

**Powiazanie:** `design-for-maintenance-przezbrojenia.json`, `weryfikacja-cad-przed-produkcja.json`, temat Wiedzy "Kolki bazujace".

**Koszt wdrozenia:** 8-13 h.

**Fraza Google:** "kolek bazujacy luz katowy kalkulator".

**Oceny:** popyt 2/5, przewaga nad tabela 5/5, bezpieczenstwo 4/5, luka w polskim internecie 5/5.

## Ranking

| Miejsce punktowe | Kalkulator | Popyt | Przewaga nad tabela | Bezpieczenstwo | Luka PL | Suma | Wniosek |
|---:|---|---:|---:|---:|---:|---:|---|
| 1 | Wspolrzedne otworow na okregu | 4 | 5 | 5 | 4 | 18 | Najlepszy szybki evergreen: niskie ryzyko, jasny wynik, dobry do CAD. |
| 2 | Zuzycie powietrza przez silownik | 4 | 5 | 4 | 4 | 17 | Bardzo dobry dodatek do pneumatyki, lepszy SEO niz czysta teoria zaworow. |
| 3 | Sila silownika pneumatycznego | 5 | 5 | 3 | 3 | 16 | Wysoki popyt i sens kalkulatora, ale wymaga mocnych zastrzezen. |
| 4 | Moment roboczy napedu i sprzegla | 5 | 5 | 3 | 3 | 16 | Dobry pomost do artykulu o sprzeglach; nie wolno udawac pelnego doboru. |
| 5 | Masa i koszt polfabrykatu | 4 | 5 | 5 | 2 | 16 | Praktyczne, niskie ryzyko, ale konkurencja w sieci jest spora. |
| 6 | Sruba trapezowa / pociagowa | 4 | 5 | 3 | 4 | 16 | Duza wartosc dla mechanizmow, ale ryzyko przy osiach pionowych. |
| 7 | Zmiana luzu od temperatury | 3 | 5 | 3 | 5 | 16 | Najbardziej ekspercki temat; mniejszy popyt, mocna luka i dobre powiazanie z pasowaniami. |
| 8 | Luz katowy bazowania na dwoch kolkach | 2 | 5 | 4 | 5 | 16 | Suma wysoka, ale popyt niski; swietny jako narzedzie niszowe przy artykule o kolkach. |
| 9 | Ugiecie profilu aluminiowego | 4 | 5 | 2 | 4 | 15 | Wysoka wartosc, ale najwiecej ryzyka interpretacyjnego po stronie konstrukcji. |
| 10 | PERT dla czasu projektu | 2 | 4 | 5 | 2 | 13 | Tani pilot techniczny, ale slaby test popytu inzynierskiego. |

Uwaga do rankingu: to ranking punktowy. Kolejnosc wdrozenia nizej jest bardziej pragmatyczna i mocniej wazy popyt oraz ryzyko pierwszego wdrozenia.

## Rekomendowana kolejnosc wdrozenia

1. **Wspolrzedne otworow na okregu** - najmniejsze ryzyko i szybki efekt.
2. **Sila silownika pneumatycznego** - najblizsze planowi Wiedzy i artykulowi o elektrozaworach.
3. **Zuzycie powietrza przez silownik** - rozszerza pneumatyke o koszt i przeplyw.
4. **Moment roboczy napedu i sprzegla** - naturalnie podpina sie pod sprzegla i Taper Lock.
5. **Masa i koszt polfabrykatu** - dobry, bezpieczny kalkulator kosztowy.
6. **Zmiana luzu od temperatury** - ekspercki wyróżnik przy pasowaniach.
7. **Sruba trapezowa / pociagowa** - warto po zbudowaniu wzorca ostrzezen.
8. **Ugiecie profilu aluminiowego** - dopiero z bardzo czytelnym disclaimerem.
9. **Luz katowy bazowania na dwoch kolkach** - jako niszowe narzedzie do artykulu o kolkach.
10. **PERT** - tylko jako tani widget przy istniejacym artykule, nie jako glowny kierunek SEO.
