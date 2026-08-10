# Przelicznik jednostek: wybor jednostki sposrod 150

Dokument projektowy. Nie opisuje komponentow, stron ani CSS. Rozstrzyga tylko mechanizm
wyboru jednostki w przeliczniku.

## 1. Zakres problemu

Problem jest mniejszy niz brzmi haslo "150 jednostek w 21 wymiarach".

Sa trzy punkty wejscia i tylko jeden wymaga pelnego selektora:

| Punkt wejscia | Co wie strona | Co robi uzytkownik | Czy potrzebny jest selektor 150 jednostek |
| --- | --- | --- | --- |
| Strona pary, np. `/przelicznik/bar-na-psi/` | zna wymiar i obie jednostki z adresu | wpisuje wartosc albo czyta tabele | nie |
| Strona wymiaru, np. `/przelicznik/cisnienie/` | zna wymiar | klika pare albo wiersz tabeli | nie |
| Hub `/przelicznik/` | nie zna wymiaru ani pary | szuka jednostki, wymiaru albo pary | tak |

Ta obserwacja jest trafna. Na stronie pary wybieranie jednostek jest operacja poboczna:
uzytkownik wszedl po konkretna pare. Na stronie wymiaru lista jest juz ograniczona do
4 do 12 jednostek, czasem 13, wiec wybor jest kliknieciem w widoczny wiersz albo kafelek.
Hub jest jedynym miejscem, gdzie uzytkownik moze zaczac od `psi`, od slowa `cisnienie`,
od `lbf ft`, albo od niczego poza ogolnym zamiarem "chce cos przeliczyc".

Wniosek projektowy: budujemy jeden dobry selektor hubowy. Na stronach wymiarow i par
wykorzystujemy te same dane, ale nie pokazujemy globalnej listy 150 jednostek jako
podstawowej drogi.

## 2. Zasady wspolne

1. Lista rozwijana ze 150 pozycjami nie jest dopuszczalna jako glowny wybor.
   Na telefonie wymaga przewijania, na komputerze miesza konteksty, a przy `psi`
   nie mowi, czy chodzi o cisnienie czy naprezenie.

2. Pole tekstowe moze filtrowac, ale nie moze po cichu wybierac za uzytkownika.
   Jesli wpis jest niejednoznaczny, uzytkownik musi zobaczyc rozroznienie i kliknac
   konkretna jednostke.

3. Wymiar nie zawsze ma byc pierwszy. Dla osoby, ktora zna symbol `psi`, wymuszony
   wybor wymiaru to dodatkowy krok. Dla osoby, ktora nie zna symbolu, samo pole tekstowe
   jest slepym zaulkiem. Interfejs musi miec dwie drogi w jednym miejscu:
   wpisz symbol albo wybierz wymiar.

4. Jednostki starej dokumentacji sa jednostkami pierwszej klasy. `kgf`, `kG`, `at`,
   `KM`, `obr/min`, `lbf ft` i `kgf/cm2` nie moga byc ukryte jako egzotyka na koncu.

5. Wynik wyboru jednostki nigdy nie jest tylko jednostka. Wynikiem jest kandydat:
   jednostka plus wymiar plus najczestsze pary docelowe.

## 3. Trzy warianty mechanizmu

### Wariant A: najpierw wymiar

Hub pokazuje 21 wymiarow. Po kliknieciu wymiaru pokazuje jednostki z tego wymiaru,
pogrupowane praktycznie. Pole tekstowe istnieje, ale filtruje tylko widoczny wymiar.

Przebieg:

1. Wybierz wymiar.
2. Wybierz jednostke zrodlowa.
3. Wybierz jednostke docelowa albo typowa pare.
4. Wpisz wartosc.

Mocna strona: nie ma niejednoznacznosci. Slaba strona: uzytkownik znajacy symbol placi
dodatkowym krokiem.

Kroki dla scenariuszy:

| Scenariusz | Kroki |
| --- | ---: |
| Znam symbol `psi` | 1 klik `Cisnienie` albo `Naprezenie`, 1 klik `psi`, 1 klik jednostki docelowej, razem 3 klikniecia przed wpisaniem wartosci |
| Wiem tylko, ze cisnienie | 1 klik `Cisnienie`, 1 klik para albo jednostka, razem 2 klikniecia, 0 wpisow |
| Przepisuje `lbf ft` z instrukcji | 1 klik `Moment obrotowy`, 1 klik `lbf ft`, 1 klik `Nm`, 1 klik pole wartosci, 1 wpis, razem 4 klikniecia i 1 wpis |
| Wracam dziesiaty raz do tej samej pary | jesli para jest w ostatnich: 1 klik para, 1 klik pole, 1 wpis, razem 2 klikniecia i 1 wpis; jesli brak pamieci: jak zwykla sciezka, 4 klikniecia i 1 wpis |

Ocena: dobry dla stron wymiarow, za wolny jako jedyny mechanizm huba. Dla `psi` doklada
co najmniej 1 klikniecie, bo uzytkownik musi rozstrzygnac wymiar zanim system pokaze
znana mu jednostke.

### Wariant B: najpierw wyszukiwarka

Hub zaczyna od jednego pola. Uzytkownik wpisuje `psi`, `lbf ft`, `mm2`, `cisnienie`.
Wyniki sa lista jednostek, wymiarow i par. Wymiary sa ponizej jako awaryjne kafelki.

Przebieg:

1. Kliknij pole.
2. Wpisz symbol, alias albo nazwe wymiaru.
3. Kliknij wynik.
4. Wybierz druga jednostke, jesli wynik nie byl para.
5. Wpisz wartosc.

Mocna strona: najszybszy dla osoby znajacej symbol. Slaba strona: osoba bez symbolu
patrzy na pole i nie wie, co wpisac.

Kroki dla scenariuszy:

| Scenariusz | Kroki |
| --- | ---: |
| Znam symbol `psi` | 1 klik pole, 1 wpis `psi`, 1 klik `psi w cisnieniu` albo `psi w naprezeniu`, 1 klik jednostka docelowa, razem 3 akcje plus wpis |
| Wiem tylko, ze cisnienie | 1 klik pole, 1 wpis `cisnienie`, 1 klik wymiar, 1 klik para, razem 3 klikniecia i 1 wpis |
| Przepisuje `lbf ft` z instrukcji | 1 klik pole, 1 wpis `lbf ft`, 1 klik `lbf ft w momencie`, 1 klik `Nm`, razem 3 klikniecia i 1 wpis |
| Wracam dziesiaty raz do tej samej pary | jesli ostatnie pary sa nad polem: 1 klik para, 1 klik pole wartosci, 1 wpis, razem 2 klikniecia i 1 wpis |

Ocena: szybki, ale zbyt zalezy od wpisywania. Na telefonie klawiatura pojawia sie od
razu, a przy pustej pamieci pierwsze wejscie z Google nie ma zadnej historii, ktora
moglaby skrocic wybor.

### Wariant C: selektor dwudrogowy

Hub ma jedno pole filtra i te same wyniki dla obu drog, ale pod polem od razu widac
kafelki wymiarow oraz popularne pary. Wpisanie tekstu zawedza te same kafelki i jednostki.
Klik wymiaru ustawia filtr kontekstowy bez przejscia do osobnego kreatora.

To nie sa dwa interfejsy. To jeden panel wyboru z dwoma sposobami zawężenia listy:

1. Tekst: `psi`, `mm2`, `lbf ft`, `kg`.
2. Kontekst: klik `Cisnienie`, `Moment obrotowy`, `Pole`.

Po wyborze jednostki wynik pokazuje maksymalnie trzy typowe jednostki docelowe w tym
samym wymiarze. Uzytkownik moze kliknac jedna z nich albo wybrac z pelnej, ale juz
ograniczonej listy wymiaru.

Przebieg od symbolu:

1. Kliknij pole.
2. Wpisz symbol.
3. Kliknij jednoznaczny wynik albo rozstrzygnij wymiar.
4. Kliknij jednostke docelowa.
5. Wpisz wartosc.

Przebieg od wymiaru:

1. Kliknij wymiar.
2. Kliknij pare albo jednostke.
3. Wpisz wartosc.

Kroki dla scenariuszy:

| Scenariusz | Kroki |
| --- | ---: |
| Znam symbol `psi` | 1 klik pole, 1 wpis `psi`, 1 klik `psi w cisnieniu` albo `psi w naprezeniu`, 1 klik `bar` lub `MPa`, razem 3 klikniecia i 1 wpis przed wartoscia |
| Wiem tylko, ze cisnienie | 1 klik `Cisnienie`, 1 klik popularna para albo jednostka, razem 2 klikniecia, 0 wpisow |
| Przepisuje `lbf ft` z instrukcji | 1 klik pole, 1 wpis `lbf ft`, 1 klik `lbf ft w momencie obrotowym`, 1 klik `N m`, razem 3 klikniecia i 1 wpis |
| Wracam dziesiaty raz do tej samej pary | 1 klik z `Ostatnio uzywane`, 1 klik pole wartosci, 1 wpis, razem 2 klikniecia i 1 wpis; przy wartosci typowej w tabeli: 1 klik para i 0 wpisow |

Ocena: najlepszy kompromis. Uzytkownik znajacy symbol nie musi zaczynac od wymiaru.
Uzytkownik nieznajacy symbolu nie musi nic wpisywac. Niejednoznacznosci sa jawne,
bo wynik `psi` pokazuje dwa wiersze, a nie jeden zgadniety wynik.

## 4. Rekomendacja

Rekomenduje wariant C: selektor dwudrogowy na hubie.

Liczbowo wygrywa, bo dla czterech wymaganych scenariuszy daje:

| Scenariusz | Wariant A | Wariant B | Wariant C |
| --- | ---: | ---: | ---: |
| Znam symbol `psi` | 3 klikniecia | 3 klikniecia i 1 wpis | 3 klikniecia i 1 wpis |
| Wiem tylko, ze cisnienie | 2 klikniecia | 3 klikniecia i 1 wpis | 2 klikniecia |
| Przepisuje `lbf ft` | 4 klikniecia i 1 wpis | 3 klikniecia i 1 wpis | 3 klikniecia i 1 wpis |
| Wracam do tej samej pary | 2 klikniecia i 1 wpis | 2 klikniecia i 1 wpis | 2 klikniecia i 1 wpis |

Wariant B remisuje lub wygrywa przy znanych symbolach, ale przegrywa przy sytuacji
"wiem tylko, ze cisnienie", bo wymaga wymyslenia tekstu do wpisania. Wariant A dobrze
obsluguje osoby bez symbolu, ale karze osoby z symbolem. Wariant C bierze po 2 klikniecia
dla sciezki wymiarowej i po 3 klikniecia plus wpis dla sciezki symbolowej, bez cichego
zgadywania.

Wazne: to jest rekomendacja dla huba. Na stronie pary nie pokazujemy pelnego selektora,
bo para jest juz wybrana z adresu. Na stronie wymiaru klik w wiersz tabeli albo pare
jest prostszy niz otwieranie selektora hubowego.

## 5. Czy wymiar wybiera sie przed jednostka

Nie. Wymiar nie powinien byc obowiazkowym pierwszym krokiem.

Mechanizm:

1. Pole tekstowe i kafelki wymiarow sa w tym samym panelu.
2. Wpisanie symbolu pokazuje jednostki pasujace do tekstu, z widocznym wymiarem.
3. Klikniecie wymiaru pokazuje jednostki tylko z tego wymiaru.
4. Wybor jednostki nie konczy procesu, jesli jednostka wystepuje w wiecej niz jednym
   wymiarze.

Przyklad `psi`:

1. Uzytkownik wpisuje `psi`.
2. Widzi dwa wyniki:
   `psi, cisnienie, najczesciej: bar, MPa, kPa`
   `psi, naprezenie, najczesciej: MPa, N/mm2, ksi`
3. Klika jeden z nich.
4. Dopiero wtedy wybiera jednostke docelowa.

To sa 3 klikniecia i 1 wpis od huba do gotowej pary. Gdyby wymiar byl wymagany najpierw,
uzytkownik mialby 3 klikniecia bez wpisu, ale musialby wiedziec, czy `psi` w jego
przypadku jest cisnieniem czy naprezeniem. Przy instrukcji hydraulicznej to oczywiste,
przy tabeli materialowej nie. Jawne pokazanie dwoch wynikow jest bezpieczniejsze niz
zgadywanie.

Przyklad "wiem tylko, ze cisnienie":

1. Uzytkownik nie klika pola.
2. Klika kafelek `Cisnienie`.
3. Widzi `bar`, `MPa`, `kPa`, `at`, `psi`, `mmHg`, `mmH2O` w grupach.
4. Klika pare albo jednostke.

To sa 2 klikniecia i 0 wpisow. Pole tekstowe nie blokuje tej sciezki.

## 6. Porzadek jednostek wewnatrz wymiaru

Nie wybierac jednego porzadku dla wszystkich wymiarow. Alfabet jest dobry dla indeksu,
ale slaby dla pracy technicznej. Porzadek wedlug wielkosci jest dobry w tabeli, ale
slaby w wyborze, bo `bar`, `at`, `atm` i `psi` laduja w miejscach, ktore nie odpowiadaja
temu, jak uzytkownik skanuje dokumentacje. Porzadek wedlug czestosci jest najlepszy,
ale tylko wewnatrz grup praktycznych.

Rekomendowany porzadek:

1. Najpierw grupy wedlug praktyki uzycia.
2. W grupie najpierw najczestsze i najbardziej rozpoznawalne.
3. W jednostkach skalowanych SI zachowac porzadek wielkosci, gdy to pomaga skanowac.
4. Jednostki starej dokumentacji umieszczac w osobnej grupie technicznej, nie na koncu.

Przyklad dla cisnienia:

```text
Cisnienie

Najczesciej
bar      MPa      psi      kPa

SI
Pa       kPa      MPa

Praktyczne
mbar     bar

Techniczne i starsza dokumentacja
at       kgf/cm2

Atmosfera i slup cieczy
atm      mmHg     mmH2O    mH2O

Anglosaskie
psi
```

Dlaczego `psi` pojawia sie dwa razy? W sekcji `Najczesciej` jako skrot i w grupie
`Anglosaskie` jako miejsce systematyczne. To nie jest dublowanie mechanizmu, tylko
dublowanie linku do tej samej jednostki w dwoch listach: szybkiej i pelnej.

Przyklad dla momentu obrotowego:

```text
Moment obrotowy

Najczesciej
N m      N mm     lbf ft   lbf in

SI i metryczne
N mm     N m      kN m

Techniczne i starsza dokumentacja
kgf cm   kgf m

Anglosaskie
lbf in   lbf ft   ozf in
```

W tym wymiarze porzadek wielkosci w grupie anglosaskiej nie wygrywa z praktyka.
`lbf ft` i `lbf in` sa oba wazne, ale `lbf ft` jest czestsze przy kluczach
dynamometrycznych, a `lbf in` przy mniejszych momentach. Dlatego oba sa w `Najczesciej`.

Przyklad dla mocy:

```text
Moc

Najczesciej
W        kW       KM       hp

SI
W        kW       MW

Motoryzacja i starsza dokumentacja
KM       hp

Cieplo
BTU/h    kcal/h
```

`KM` nie moze byc na koncu alfabetu ani jako egzotyka. Dla polskiego uzytkownika to
jedna z podstawowych jednostek mocy, zwlaszcza przy silnikach.

## 7. Filtrowanie tekstem bez cichych pomylek

Pole filtra ma szukac po:

- symbolu kanonicznym,
- symbolach bez znakow specjalnych, np. `mm2` dla `mm2`,
- aliasach z dokumentacji, np. `ft-lb`, `lbft`, `lb ft`, `lbf ft`,
- nazwie jednostki,
- nazwie wymiaru,
- popularnych parach.

Pole filtra nie ma:

- automatycznie wybierac pierwszego wyniku po wpisaniu,
- przeliczac, dopoki para nie jest jednoznacznie wybrana,
- naprawiac wielkosci liter bez pokazania konsekwencji tam, gdzie zmienia sie znaczenie.

Regula wyswietlania wynikow:

1. Dokladne dopasowania symbolu na gorze.
2. Alias dokladny pod symbolem.
3. Dopasowania nazw.
4. Dopasowania wymiarow.
5. Maksymalnie 6 wynikow na telefonie i 8 na desktopie.
6. Jesli jest wiecej wynikow, pokazac liczbe ukrytych wynikow i wezwanie do zawężenia.

### Co widzi uzytkownik po wpisaniu `nm`

```text
Szukaj jednostki albo pary
[ nm ]

Znalezione jednostki

nm
nanometr
Wymiar: dlugosc
Najczesciej na: um, mm, m

N m
niutonometr
Wymiar: moment obrotowy
Symbol w dokumentacji: Nm, N m, N.m
Najczesciej na: lbf ft, lbf in, N mm

Nie wybieram automatycznie, bo `nm` i `N m` oznaczaja inne rzeczy.
Kliknij jednostke z wlasnego dokumentu.
```

Uzasadnienie: `nm` jako male litery jest silnym sygnalem nanometra, ale uzytkownik
moze wpisac bez wielkosci liter z telefonu. Pokazanie obu wynikow kosztuje 1 klikniecie,
a chroni przed pomylka dziewieciu rzedow wielkosci i zmiana wymiaru z dlugosci na moment.

### Co widzi uzytkownik po wpisaniu `psi`

```text
Szukaj jednostki albo pary
[ psi ]

Znalezione jednostki

psi
funt na cal kwadratowy
Wymiar: cisnienie
Najczesciej na: bar, MPa, kPa

psi
funt na cal kwadratowy
Wymiar: naprezenie
Najczesciej na: MPa, N/mm2, ksi

`psi` wystepuje w cisnieniu i naprezeniu. Wybierz kontekst.
```

Uzasadnienie: `psi` ma ten sam symbol i ten sam formalny wymiar fizyczny, ale inny
kontekst pracy. Automatyczny wybor cisnienia bylby bledem przy tabeli wytrzymalosciowej.
Dodatkowy klik jest uzasadniony, bo rozstrzyga kontekst.

### Co widzi uzytkownik po wpisaniu `kg`

```text
Szukaj jednostki albo pary
[ kg ]

Znalezione jednostki

kg
kilogram
Wymiar: masa
Najczesciej na: g, t, lb

kgf
kilogram-sila
Wymiar: sila
Alias: kG
Najczesciej na: N, daN, lbf

kgf/cm2
kilogram-sila na centymetr kwadratowy
Wymiar: cisnienie
Najczesciej na: bar, MPa, psi

kgf/mm2
kilogram-sila na milimetr kwadratowy
Wymiar: naprezenie
Najczesciej na: MPa, N/mm2, ksi

Znaleziono tez jednostki zlozone z `kg`. Doprecyzuj, jesli chodzi o sile albo naprezenie.
```

Uzasadnienie: `kg` jest dokladnym symbolem masy, ale w polskiej dokumentacji `kgf`
i `kG` sa czeste. Pokazanie tylko kilograma skrociloby liste, ale ukryloby wazne
jednostki starej dokumentacji. Nie ma automatycznego przeliczenia, bo nie ma pary.

### Co widzi uzytkownik po wpisaniu `mm2`

```text
Szukaj jednostki albo pary
[ mm2 ]

Znalezione jednostki

mm2
milimetr kwadratowy
Wymiar: pole
Pokazuje jako: mm2
Najczesciej na: cm2, m2, cal2

N/mm2
niuton na milimetr kwadratowy
Wymiar: naprezenie
Najczesciej na: MPa, psi, kgf/mm2

`mm2` czytam jako zapis z klawiatury dla `mm2`.
Jesli chodzi o naprezenie, wybierz `N/mm2`.
```

Uzasadnienie: na telefonie wpis `mm2` jest naturalny. Nie mozna wymagac indeksu gornego.
Jednoczesnie `N/mm2` jest bardzo wazne w naprezeniu, wiec wynik powinien byc widoczny,
ale nie wybrany za uzytkownika.

## 8. Pamiec wyborow

Warto zapamietywac ostatnio uzywane pary w przegladarce, ale nie wolno opierac na tym
podstawowego interfejsu.

Powody:

1. Pierwsze wejscie z Google ma pusta pamiec.
2. Tryb prywatny, czyszczenie danych i inna przegladarka kasuja historie.
3. Uzytkownik moze pracowac przy jednym zadaniu przez kilka dni i wtedy pamiec realnie
   skraca droge.

Rekomendacja:

- zapamietac ostatnie 6 par,
- zapamietac osobno ostatnie 3 wymiary,
- trzymac tylko identyfikatory par, bez wpisywanych wartosci,
- pokazac pamiec tylko na hubie i w panelu zmiany jednostki,
- nie synchronizowac, nie wysylac na serwer.

Kroki przy powrocie po raz dziesiaty:

1. Uzytkownik otwiera hub.
2. Widzi `Ostatnio uzywane` jako pierwszy blok pod polem.
3. Klika `lbf ft na N m`.
4. Wpisuje wartosc.

To sa 2 klikniecia i 1 wpis. Bez pamieci w wariancie C sa 3 klikniecia i 1 wpis
przy sciezce przez symbol albo 4 klikniecia i 1 wpis przy sciezce przez wymiar.
Pamiec oszczedza 1 do 2 klikniec, ale tylko od drugiej wizyty.

Co pokazac przy pustej pamieci:

```text
Ostatnio uzywane
Tu pojawia sie 6 ostatnich par z tej przegladarki.

Najczesciej sprawdzane
bar na psi
MPa na N/mm2
N m na lbf ft
cal na mm
kgf na N
KM na kW
```

Pusty stan nie moze byc wielkim komunikatem. Ma byc krotka informacja i od razu
popularne pary, bo one dzialaja od pierwszego wejscia.

## 9. Telefon i klawiatura

Telefon jest domyslnym przypadkiem. Projekt powinien zakladac, ze po kliknieciu pola
filtra albo pola wartosci klawiatura zaslania okolo polowy ekranu.

Zasady:

1. Hub przed fokusem pola pokazuje:
   pole filtra, ostatnie lub popularne pary, kafelki wymiarow.

2. Po fokusie pola filtra:
   lista wynikow ma maksymalnie 6 pozycji,
   kazda pozycja ma 2 do 3 linie,
   wynik nie moze wymagac przewijania przez 20 jednostek.

3. Po kliknieciu jednostki:
   panel przechodzi do wyboru jednostki docelowej,
   klawiatura powinna zostac schowana, bo nastepna decyzja jest kliknieciem.

4. Po kliknieciu pola wartosci:
   para i wynik musza zostac nad klawiatura,
   tabela typowych wartosci moze zniknac ponizej widoku,
   wybor jednostek nie powinien otwierac sie automatycznie.

Makieta stanu z klawiatura:

```text
50 lbf ft na N m

Wartosc
[ 50              ] lbf ft

Wynik
67,791 N m

[Zamien] [Zmien jednostke]

--------------------------
tu zaczyna sie klawiatura systemowa
```

Jesli wynik bylby ponizej klawiatury, uzytkownik musialby wykonac dodatkowy krok:
schowac klawiature. To psuje glowny scenariusz z telefonu, bo zamienia 1 klik i 1 wpis
w 2 klikniecia i 1 wpis.

## 10. Dostepnosc

Selektor powinien byc obslugiwalny bez myszy.

### Klawiatura

1. `Tab` przechodzi kolejno przez:
   pole filtra, ostatnie pary, popularne pary, kafelki wymiarow, wyniki filtrowania.
2. `Enter` na kafelku lub wyniku wybiera go.
3. `Escape` czysci aktywny filtr albo zamyka panel wyboru jednostki.
4. Strzalki gora i dol poruszaja sie po wynikach filtra, gdy fokus jest w polu.
5. `Home` i `End` przechodza na pierwszy i ostatni widoczny wynik.

### Role ARIA

Pole filtra:

- `role="combobox"`,
- `aria-expanded`,
- `aria-controls` wskazujace liste wynikow,
- `aria-autocomplete="list"`,
- `aria-activedescendant` dla aktywnego wyniku.

Lista wynikow:

- `role="listbox"` dla wynikow filtrowania,
- kazdy wynik `role="option"`,
- tekst widoczny w opcji zawiera symbol, nazwe i wymiar.

Kafelki wymiarow:

- zwykle linki albo przyciski,
- jesli prowadza do strony wymiaru bez JavaScriptu, powinny byc linkami,
- jesli tylko zawężaja panel, powinny byc przyciskami z `aria-pressed` dla aktywnego wymiaru.

Komunikaty dynamiczne:

- liczba wynikow w `aria-live="polite"`,
- brak wynikow w `aria-live="polite"`,
- niejednoznacznosc, np. `psi wystepuje w cisnieniu i naprezeniu`, tez w live region.

Zachowanie czytnika ekranu po wpisaniu `psi`:

```text
Pole kombi, Szukaj jednostki albo pary, wpisano psi.
2 wyniki. psi, funt na cal kwadratowy, wymiar cisnienie, opcja 1 z 2.
psi, funt na cal kwadratowy, wymiar naprezenie, opcja 2 z 2.
psi wystepuje w cisnieniu i naprezeniu. Wybierz kontekst.
```

To jest lepsze niz samo "2 wyniki", bo uzytkownik czytnika musi uslyszec, czym one
sie roznia.

## 11. Ile jednostek pokazac na hubie przed filtrowaniem

Na hubie przed filtrowaniem nie pokazywac wszystkich 150 jednostek.

Pokazac:

- 6 ostatnio uzywanych par, jesli istnieja,
- 6 najczestszych par przy pustej pamieci albo pod historia,
- 21 wymiarow jako stale kafelki,
- w kazdym kafelku 3 do 5 symboli przykladowych.

To oznacza, ze uzytkownik widzi naraz okolo:

- 6 par,
- 21 wymiarow,
- 70 do 90 symboli jako przyklady w kafelkach, ale nie jako klikalna lista jednostek.

Dlaczego nie 150:

1. Na telefonie 150 jednostek po 44 px wysokosci daje 6600 px przewijania, czyli okolo
   7 do 9 ekranow.
2. Lista miesza `psi` z cisnienia i naprezenia, `kg` z masa i `kgf` z sila, `nm` z `N m`.
3. Pelna lista nie pomaga osobie, ktora wie tylko "cisnienie", bo musi skanowac obce
   wymiary.

Dlaczego 6 par:

1. Na telefonie 6 par miesci sie w dwoch rzedach po 3 albo w jednej zwartej liscie.
2. Pokrywa glowne sciezki startowe: cisnienie, naprezenie, moment, dlugosc, sila, moc.
3. Siodma pozycja zwykle wymaga dodatkowego rzedu i wypycha kafelki wymiarow ponizej
   pierwszego ekranu.

Proponowane pary przy pustej pamieci:

```text
Najczesciej sprawdzane
bar na psi
MPa na N/mm2
N m na lbf ft
cal na mm
kgf na N
KM na kW
```

Proponowane kafelki wymiarow przed filtrowaniem:

```text
Wybierz wymiar

Cisnienie
bar, MPa, psi, at

Naprezenie
MPa, N/mm2, psi, kgf/mm2

Moment obrotowy
N m, N mm, lbf ft, kgf m

Dlugosc
mm, m, cal, um, nm

Pole
mm2, m2, ha, cal2

Masa
g, kg, t, lb

Sila
N, kN, kgf, lbf

Moc
kW, W, KM, hp

Pozostale wymiary
Temperatura, przeplyw, predkosc, energia, gestosc, czas...
```

21 wymiarow moze byc widoczne w calosci na desktopie. Na telefonie pierwsze 8 wymiarow
powinno pojawic sie przed rzadziej uzywanymi, bo odpowiadaja przewadze narzedzia:
cisnienie, naprezenie, moment, dlugosc, pole, masa, sila, moc.

## 12. Makieta tekstowa rekomendowanego wariantu

### Hub, pamiec pusta

```text
Przelicznik jednostek

Szukaj jednostki, pary albo wybierz wymiar.

[ Szukaj jednostki albo pary                         ]
  np. psi, lbf ft, mm2, kgf, cisnienie

Ostatnio uzywane
Tu pojawia sie 6 ostatnich par z tej przegladarki.

Najczesciej sprawdzane
[bar na psi] [MPa na N/mm2] [N m na lbf ft]
[cal na mm] [kgf na N]     [KM na kW]

Wybierz wymiar

[Cisnienie]
bar, MPa, psi, at

[Naprezenie]
MPa, N/mm2, psi, kgf/mm2

[Moment obrotowy]
N m, N mm, lbf ft, kgf m

[Dlugosc]
mm, m, cal, um, nm

[Pole]
mm2, m2, ha, cal2

[Masa]
g, kg, t, lb

[Sila]
N, kN, kgf, lbf

[Moc]
kW, W, KM, hp

[Pozostale wymiary]
temperatura, przeplyw, predkosc, energia, gestosc...
```

### Hub po wpisaniu `psi`

```text
Przelicznik jednostek

[ psi                                                   ]

2 wyniki. `psi` wystepuje w cisnieniu i naprezeniu.

[psi]
funt na cal kwadratowy
Wymiar: cisnienie
Najczesciej na: bar, MPa, kPa

[psi]
funt na cal kwadratowy
Wymiar: naprezenie
Najczesciej na: MPa, N/mm2, ksi

Wybierz kontekst. Nie przeliczam automatycznie niejednoznacznych jednostek.
```

### Hub po kliknieciu `Cisnienie`

```text
Przelicznik jednostek

Wymiar: Cisnienie
[ Zmien wymiar ] [ wyczysc ]

Popularne pary
[bar na psi] [MPa na bar] [kPa na bar] [at na bar]

Z czego przeliczasz?

Najczesciej
[bar] [MPa] [psi] [kPa]

SI
[Pa] [kPa] [MPa]

Praktyczne
[mbar] [bar]

Techniczne i starsza dokumentacja
[at] [kgf/cm2]

Atmosfera i slup cieczy
[atm] [mmHg] [mmH2O] [mH2O]

Anglosaskie
[psi]
```

### Po wyborze `psi w cisnieniu`

```text
psi
funt na cal kwadratowy
Wymiar: cisnienie

Na co przeliczyc?

Najczesciej dla psi
[bar] [MPa] [kPa]

Pozostale cisnienie
[Pa] [mbar] [at] [atm] [mmHg] [mmH2O] [mH2O] [kgf/cm2]

[Wroc do wynikow]
```

### Po wyborze pary

```text
psi na bar

Wartosc
[ 1                                                ] psi

Wynik
0,0689476 bar

[Zamien] [Zmien jednostke]

Typowe wartosci
1 psi     0,0689476 bar
5 psi     0,344738 bar
10 psi    0,689476 bar
50 psi    3,44738 bar
100 psi   6,89476 bar
```

### Panel zmiany jednostki na stronie pary

```text
Zmien jednostke

Aktualna para
bar na psi

Zmien jednostke zrodlowa w wymiarze Cisnienie
[Pa] [kPa] [MPa] [mbar] [bar] [at] [atm] [psi] [mmHg] [mmH2O] [mH2O]

Zmien jednostke docelowa w wymiarze Cisnienie
[Pa] [kPa] [MPa] [mbar] [bar] [at] [atm] [psi] [mmHg] [mmH2O] [mH2O]

Szukaj w innych wymiarach
[ Szukaj jednostki albo wymiaru ]

Nie mieszam wymiarow w tej parze. Jesli wybierzesz jednostke z innego wymiaru,
zaczne nowa pare od tej jednostki.
```

## 13. Zachowanie stron innych niz hub

### Strona pary

Na stronie pary domyslnie nie ma wyboru jednostki. Uzytkownik widzi:

1. odpowiedz z HTML,
2. pole wartosci,
3. ustawione jednostki,
4. tabele typowych wartosci,
5. przycisk `Zmien jednostke` jako akcje poboczna.

Scenariusz `5 bar na psi`:

1. Wejscie z Google na `/przelicznik/bar-na-psi/`.
2. Jesli `5` jest w tabeli, 0 klikniec i 0 wpisow.
3. Jesli chce wpisac `5`, 1 klik pole, 1 wpis.

Nie ma tu problemu wyboru z 150 jednostek.

### Strona wymiaru

Na stronie wymiaru wybor to klik w jednostke albo pare w ramach jednego wymiaru.
Dla cisnienia uzytkownik skanuje okolo 12 jednostek, nie 150.

Scenariusz "wiem tylko, ze cisnienie":

1. Wejscie na strone wymiaru.
2. Klik `bar na psi` w popularnych parach albo klik `psi` w grupie anglosaskiej.
3. Klik jednostki docelowej, jesli zaczal od jednostki.

To sa 1 do 2 klikniec i 0 wpisow.

## 14. Przypadki brzegowe

Lista uzupelnia poprzedni dokument i skupia sie na samym wyborze jednostki.

1. Ten sam symbol w roznych wymiarach:
   `psi`, `bar`, `MPa`, `kgf/cm2` moga wystapic w cisnieniu i naprezeniu. Wynik filtra
   musi pokazac wymiar jako czesc nazwy wyboru.

2. Ten sam symbol w roznej wielkosci liter:
   `Nm` i `nm` nie sa tym samym. Filtr moze pokazac oba wyniki, ale nie moze wybrac
   automatycznie.

3. Uzytkownik wpisuje bez polskich lub specjalnych znakow:
   `mm2`, `cm2`, `m3`, `um`, `obr/min`, `kgf/cm2` musza dzialac jako aliasy dla ladnie
   wyswietlanych symboli.

4. Uzytkownik wpisuje separator z instrukcji:
   `ft-lb`, `ft lb`, `lbft`, `lbf ft`, `lbf*ft` powinny prowadzic do momentu, ale wynik
   musi pokazac kanoniczne `lbf ft`.

5. Uzytkownik wpisuje jednostke bez kierunku:
   `kgf` nie wystarcza do przeliczenia. Interfejs pokazuje jednostke i najczestsze
   jednostki docelowe, ale nie liczy wyniku.

6. Uzytkownik wpisuje pare bez wartosci:
   `bar psi` albo `bar na psi` powinno ustawic pare i pokazac wartosc domyslna `1`,
   nie wymagac dodatkowego wyboru jednostek.

7. Uzytkownik wpisuje pare z niezgodnych wymiarow:
   `kg na psi` powinno pokazac komunikat: `Te jednostki nie pasuja do jednego wymiaru`.
   Nie wolno szukac najblizszej sensownej pary.

8. Uzytkownik wpisuje nazwe wieloznaczna:
   `cal` moze oznaczac dlugosc, ale `cal2` pole i `cal3` objetosc. Wyniki musza byc
   rozdzielone po wymiarach.

9. Uzytkownik wpisuje `kG`:
   w starej dokumentacji to czesto kilogram-sila, nie kilogram masy. Wynik powinien
   pokazac `kgf, alias kG, wymiar sila`, a `kg, kilogram, masa` jako osobny wynik.

10. Uzytkownik wpisuje `at`:
    `at` jako atmosfera techniczna powinna byc wysoko w cisnieniu. Nie mylic z `atm`.

11. Uzytkownik wpisuje `KM` malymi literami:
    `km` to kilometr, `KM` to kon mechaniczny. Przy wpisie `km` pokazac dlugosc jako
    pierwszy wynik i moc jako mozliwa pomylke tylko jesli system ignoruje wielkosc liter.
    Przy wpisie `KM` pokazac moc jako pierwszy wynik.

12. Uzytkownik wpisuje skrot wymiaru zamiast jednostki:
    `rpm` powinno znalezc `obr/min`, bo katalogi czesto sa angielskie.

13. Uzytkownik zaczyna od wymiaru i potem wpisuje filtr:
    po kliknieciu `Cisnienie` wpis `psi` filtruje tylko cisnienie, ale powinien miec
    link `Pokaz tez psi w naprezeniu`, bo to znana kolizja.

14. Uzytkownik klika `Zamien` przy niejednoznacznej jednostce:
    zamiana pary nie moze zmienic wymiaru. `psi na bar` zostaje cisnieniem, a nie
    naprezeniem.

15. Historia zawiera jednostke, ktora zmienila slug albo zostala wycofana:
    pokazac popularne pary zamiast martwej pozycji. Nie pokazywac bledu danych.

16. Brak wynikow po filtrze:
    komunikat powinien podac przyklady realnych aliasow, np. `Nie znalazlem takiej
    jednostki. Sprobuj: psi, kgf, lbf ft, mm2`.

17. Zbyt wiele wynikow po krotkim wpisie:
    dla `m` pokazac najpierw wymiary i najczestsze jednostki, a nie 40 wynikow.
    Komunikat: `Wpisz jeszcze jedna litere albo wybierz wymiar`.

18. Wklejenie tekstu z wartoscia i jednostkami:
    `50 lbf ft` w polu filtra powinno rozpoznac wartosc jako pomoc, ale nadal wymaga
    wyboru jednostki docelowej. Nie liczyc bez `na N m` albo klikniecia celu.

19. Uzytkownik wpisuje liczbe w polu filtra na hubie:
    `50` samo w sobie nie ma sensu. Pokazac `Wybierz jednostki dla wartosci 50`,
    a nie blad.

20. Czytnik ekranu przy dwoch identycznych symbolach:
    opcje nie moga brzmiec tak samo. `psi, cisnienie` i `psi, naprezenie` musza byc
    pelnymi etykietami dostepnosci.

21. Wymiar temperatury:
    jednostka `C` moze byc wpisana bez stopnia. Po wyborze temperatury trzeba pokazac
    tryb `temperatura` albo `roznica temperatur`, bo wybor jednostki nie rozstrzyga
    wzoru.

22. Jednostki orientacyjne spoza prostego silnika:
    `HRC`, `HB`, `Ra`, `Rz`, `mesh` powinny byc wynikami specjalnymi, oznaczonymi
    `tabela orientacyjna`, a nie jednostkami prostego przelicznika.

23. Jednostka docelowa taka sama jak zrodlowa:
    mozna pokazac wynik `1:1`, ale przy wyborze pary docelowej ta sama jednostka
    powinna byc nizej albo oznaczona jako `ta sama jednostka`, zeby nie zabierala
    miejsca w najczestszych celach.

24. Dwa aliasy prowadzace do tej samej jednostki:
    `N m`, `Nm`, `N.m` i `N*m` powinny pokazac jeden wynik kanoniczny, nie cztery
    osobne pozycje.

25. Wpis z ukośnikiem i spacjami:
    `kgf / cm2`, `kg/cm2`, `kG/cm2` powinny znalezc ta sama jednostke cisnienia,
    ale wynik musi jawnie napisac `kilogram-sila na centymetr kwadratowy`.

## 15. Decyzje do przeniesienia do danych

Zeby selektor dzialal bez zgadywania, model danych powinien zawierac pola redakcyjne:

```text
unit.id
unit.symbol
unit.displaySymbol
unit.name
unit.dimensionId
unit.aliases
unit.searchBoost
unit.groups
unit.commonTargets
unit.ambiguousWith
unit.notesForDisambiguation
```

Najwazniejsze sa `aliases`, `groups`, `commonTargets` i `ambiguousWith`.

Bez `aliases` filtr nie obsluzy `lbft` i `mm2`.
Bez `groups` lista wymiaru bedzie alfabetyczna i ukryje `kgf`, `at`, `KM`.
Bez `commonTargets` wybor po kliknieciu jednostki bedzie wymagal skanowania calego
wymiaru.
Bez `ambiguousWith` parser zacznie zgadywac tam, gdzie powinien pytac.

## 16. Podsumowanie

Pelny problem wyboru 150 jednostek istnieje tylko na hubie. Strona pary ma jednostki
z adresu, a strona wymiaru zawęża liste do jednego wymiaru.

Najlepszy mechanizm to selektor dwudrogowy: jedno pole filtra oraz te same wyniki
osiagalne przez klikniecie wymiaru. Osoba znajaca symbol wpisuje `psi` albo `lbf ft`.
Osoba znajaca tylko obszar klika `Cisnienie` albo `Moment obrotowy`.

Interfejs nie wybiera automatycznie przy kolizjach. `psi`, `nm`, `kg` i `mm2` pokazuja
jawne wyniki z wymiarem, a uzytkownik wykonuje dodatkowe klikniecie tam, gdzie to
klikniecie zapobiega realnej pomylce technicznej.
