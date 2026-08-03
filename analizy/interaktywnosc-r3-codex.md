# Iteracja 3 z 5: odpowiedz Codexa na krytyke Claude'a

Zakladam obecny stan techniczny: Docusaurus 3, static export, widgety jako komponenty React, dane w `content/`, artykuly skladane przez `src/components/BlockRenderer.js`. Istniejacy renderer ma juz typy blokow `tekst`, `obraz`, `galeria`, `tabela`, `wzor`, `rysunek`, wiec interaktywnosc powinna wejsc jako kolejny typ bloku, a nie jako osobny system.

## 1. Czy zgadzam sie z odrzuceniem quizow i rzeczy moderowanych

W duzej czesci tak, ale nie w 100 procentach.

### Quizy 21, 31, 34

Zgadzam sie z krytyka, jesli quiz ma byc klasycznym formatem "jedna poprawna odpowiedz, wynik procentowy, gratulacje". To rzeczywiscie gryzie sie z tonem Lukasza, bo w konstrukcji maszyn odpowiedz prawie zawsze zalezy od warunkow brzegowych. Taki quiz wygladalby jak tani content marketing.

Nie wyrzucalbym jednak calej kategorii interaktywnych decyzji. Uratowalbym je po zmianie nazwy i mechaniki:

- nie "quiz", tylko "decyzownik", "scenariusz decyzyjny" albo "co sprawdzic przed decyzja";
- nie punktacja 0-100, tylko wynik warunkowy: "to ma sens, jezeli...", "uwazaj, jezeli...", "sprawdz jeszcze...";
- nie jedna dobra odpowiedz, tylko komentarz praktyka do kazdej opcji.

W tej formie da sie uratowac szczegolnie pomysl 34 "czy to over-engineering", bo to naturalnie jest temat warunkowy. Slabsze sa 21 i 31, bo latwo spadaja w rozrywkowy quiz bez twardej wartosci SEO.

Wniosek: odrzucic quizy jako format, ale zostawic interaktywne scenariusze decyzyjne jako lzejsza forma narzedzi.

### Rzeczy wymagajace moderacji: 42, 43, 44

Tu zgadzam sie mocniej. Mapa dyskusji LinkedIn, formularz propozycji i glosowanie sa organizacyjnie ryzykowne, bo tworza obietnice ciaglego zycia strony. Jesli Lukasz robi to po godzinach, pusta ankieta albo nieprzegladany formularz pogarsza wizerunek.

Jedyny wariant do uratowania to wersja bez publicznego stanu i bez oczekiwania odpowiedzi:

- przycisk "skopiuj pytanie do dyskusji" pod artykulem, bez osadzania watku;
- statyczny link "masz przypadek, napisz do mnie" prowadzacy do istniejacego kanalu kontaktu;
- brak licznikow glosow, brak publicznych tablic, brak komentarzy na stronie.

Wniosek: jako interaktywnosc produktowa odrzucic. Jako drobny CTA do kontaktu mozna wykorzystac pozniej, ale to nie powinien byc priorytet iteracji.

### Lokalny schowek 37 i skladana checklista 38

Zgadzam sie z Claude'em, ze "schowek konstruktora" jako osobna funkcja jest za duzy wzgledem realnego nawyku uzytkownika. Konstruktor nie bedzie wracal na pocaduchy.pl jak do aplikacji roboczej.

Ale nie odrzucalbym lokalnego zapisu jako mechanizmu pomocniczego. Wyniki kalkulatorow powinny miec:

- "kopiuj wynik";
- "drukuj";
- "pobierz CSV" albo "pobierz Markdown" tam, gdzie wynik jest tabela;
- opcjonalnie localStorage tylko do zapamietania ostatnich wpisanych wartosci w danym kalkulatorze.

Wniosek: nie budowac schowka jako produktu. Uzyc localStorage punktowo w kalkulatorach, jesli poprawia ergonomie.

## 2. Specyfikacja C1 i C2

### C1. Kalkulator pasowan i tolerancji

Cel: szybkie sprawdzenie pasowania typu `H7/g6`, `H7/h6`, `H7/k6`, `H7/p6`, `H7/f7` dla realnej srednicy nominalnej, bez wertowania PDF-ow.

#### Pola formularza

Minimalna wersja v1:

- `srednicaNominalnaMm`: liczba, zakres 1-500 mm, krok 0.001 mm w polu, walidacja do dodatniej liczby.
- `pasowanie`: select z gotowymi parami:
  - `H7/f7`
  - `H7/g6`
  - `H7/h6`
  - `H7/js6`
  - `H7/k6`
  - `H7/m6`
  - `H7/n6`
  - `H7/p6`
  - `H7/s6`
- `tryb`: radio albo segmented control:
  - "dobierz z listy pasowan"
  - "wlasna para pol/tolerancji" jako rozszerzenie v1.1
- `jednostkaWyniku`: radio:
  - `um`
  - `mm`

Wersja v1.1, po wdrozeniu podstaw:

- `otworPole`: select `H`, opcjonalnie `G`, `J`, `K`, `M`, `N`, `P`.
- `otworKlasa`: select `6`, `7`, `8`.
- `walekPole`: select `f`, `g`, `h`, `js`, `k`, `m`, `n`, `p`, `s`.
- `walekKlasa`: select `5`, `6`, `7`.

Nie zaczynalbym od pelnej matrycy ISO, bo najwiekszy ruch SEO i tak bedzie na popularnych parach `H7/f7`, `H7/g6`, `H7/h6`, `H7/k6`, `H7/p6`.

#### Wyjscia

Dla podanej srednicy i pasowania narzedzie pokazuje:

- przedzial srednic nominalnych z tabeli, np. `18 < d <= 30 mm`;
- odchylka dolna otworu `EI` w um;
- odchylka gorna otworu `ES` w um;
- minimalny wymiar otworu w mm;
- maksymalny wymiar otworu w mm;
- odchylka dolna walka `ei` w um;
- odchylka gorna walka `es` w um;
- minimalny wymiar walka w mm;
- maksymalny wymiar walka w mm;
- luz minimalny w um i mm;
- luz maksymalny w um i mm;
- albo wcisk minimalny i maksymalny, gdy wynik jest pasowaniem wciskowym;
- klasyfikacja:
  - `luzne`
  - `mieszane`
  - `wciskowe`
- jedno zdanie zastosowania, np. "H7/g6: pasowanie ruchowe z niewielkim luzem, typowe dla dokladnego prowadzenia bez wcisku."
- ostrzezenie: "To kalkulator pomocniczy. Dla dokumentacji produkcyjnej sprawdz aktualna norme i wymagania projektu."

#### Zakres danych

Realny zakres v1: srednice nominalne od 1 do 500 mm, bo to pokrywa typowe uzycie w budowie maszyn i miesci sie w standardowych przedzialach ISO 286.

Przedzialy srednic:

- `1 < d <= 3`
- `3 < d <= 6`
- `6 < d <= 10`
- `10 < d <= 18`
- `18 < d <= 30`
- `30 < d <= 50`
- `50 < d <= 80`
- `80 < d <= 120`
- `120 < d <= 180`
- `180 < d <= 250`
- `250 < d <= 315`
- `315 < d <= 400`
- `400 < d <= 500`

Dane liczbowe nie powinny byc kopiowane z cudzej tabeli z internetu. Trzeba zbudowac wlasny plik danych na podstawie normowych wartosci liczbowych i wlasnego opisu. Same wartosci liczbowe sa faktami, ale uklad, komentarze i opracowanie tabeli maja byc nasze.

#### Format JSON

Proponowany plik: `content/tools/pasowania-iso286.json`

```json
{
  "meta": {
    "sourceNote": "Wartosci opracowane jako wlasny zbior danych na podstawie tolerancji ISO 286. Sprawdzic z aktualna norma przed uzyciem produkcyjnym.",
    "unit": "um",
    "diameterUnit": "mm"
  },
  "diameterRanges": [
    {"id": "gt1_le3", "minExclusive": 1, "maxInclusive": 3, "label": "1 < d <= 3"},
    {"id": "gt3_le6", "minExclusive": 3, "maxInclusive": 6, "label": "3 < d <= 6"}
  ],
  "toleranceZones": [
    {
      "rangeId": "gt18_le30",
      "element": "hole",
      "zone": "H",
      "grade": 7,
      "lowerUm": 0,
      "upperUm": 21
    },
    {
      "rangeId": "gt18_le30",
      "element": "shaft",
      "zone": "g",
      "grade": 6,
      "lowerUm": -20,
      "upperUm": -7
    }
  ],
  "fits": [
    {
      "id": "H7_g6",
      "label": "H7/g6",
      "hole": {"zone": "H", "grade": 7},
      "shaft": {"zone": "g", "grade": 6},
      "shortUse": "Dokladne pasowanie ruchowe z niewielkim luzem."
    }
  ]
}
```

Przyklad powyzej pokazuje strukture, nie jest kompletna tabela.

#### Realna liczba rekordow

Wersja v1:

- 13 rekordow `diameterRanges`;
- 9 rekordow `fits`;
- tolerancje:
  - otwor `H7`: 13 rekordow;
  - walki `f7`, `g6`, `h6`, `js6`, `k6`, `m6`, `n6`, `p6`, `s6`: 9 x 13 = 117 rekordow;
  - razem 130 rekordow `toleranceZones`.

Razem do wprowadzenia recznie i sprawdzenia: 152 rekordy JSON. To jest realny, ale nadal maly zbior danych.

Wersja v1.1 z dodatkowymi otworami i klasami moze urosnac do 300-500 rekordow. Tego nie warto robic na start.

#### Logika obliczen

Dla srednicy `d`:

1. Znajdz `diameterRange`, gdzie `minExclusive < d <= maxInclusive`.
2. Pobierz odchylki otworu i walka dla wybranego pasowania.
3. Policz:
   - `holeMin = d + EI / 1000`
   - `holeMax = d + ES / 1000`
   - `shaftMin = d + ei / 1000`
   - `shaftMax = d + es / 1000`
   - `clearanceMin = holeMin - shaftMax`
   - `clearanceMax = holeMax - shaftMin`
4. Jesli oba wyniki sa dodatnie, pasowanie luzne. Jesli oba ujemne, wciskowe. Jesli znaki mieszane, przejsciowe.

#### Naklad C1

- przygotowanie i weryfikacja danych: 6-10 h;
- komponent React z formularzem, wynikami i walidacja: 5-7 h;
- stylowanie zgodne z artykulem i mobile: 2-3 h;
- integracja jako blok `narzedzie`: 2-4 h, jesli robimy przy okazji C3;
- testy reczne na kilku srednicach i pasowaniach: 2-3 h;
- razem: 17-27 h.

Najwieksze ryzyko nie jest techniczne, tylko merytoryczne: blad w przepisaniu tabeli. Trzeba miec minimum podwojna walidacje danych.

### C2. Kalkulator momentu dokrecania srub

Cel: odpowiedziec na praktyczne pytanie "M8 8.8, jaki moment dokrecania?" z mozliwoscia zmiany tarcia i zobaczenia sily napiecia wstepnego.

#### Pola formularza

Minimalna wersja v1:

- `thread`: select:
  - `M3`, `M4`, `M5`, `M6`, `M8`, `M10`, `M12`, `M14`, `M16`, `M18`, `M20`, `M22`, `M24`, `M27`, `M30`
- `pitchMode`: radio:
  - `gwint zwykly`
  - `gwint drobnozwojny` jako v1.1
- `propertyClass`: select:
  - `5.8`
  - `8.8`
  - `10.9`
  - `12.9`
  - `A2-70`
- `preloadPercentOfYield`: select albo suwak:
  - 60 procent
  - 70 procent, domyslnie
  - 80 procent
- `frictionPreset`: select:
  - `suchy, ostroznie`: 0.20
  - `lekko olejony`: 0.14
  - `smarowany`: 0.10
  - `wlasny`
- `frictionCoefficient`: number, zakres 0.08-0.30, krok 0.01, aktywny przy `wlasny`;
- `calculationModel`: select w ustawieniach zaawansowanych:
  - `uproszczony K*d*F`, domyslnie;
  - opcjonalnie pozniej model rozdzielony na tarcie gwintu i pod lbem.

#### Wyjscia

Narzedzie pokazuje:

- nominalny rozmiar gwintu;
- skok gwintu;
- pole przekroju czynnego `As` w mm2;
- granica plastycznosci albo przyjeta granica dla klasy w MPa;
- docelowa sila napiecia wstepnego `Fv` w kN;
- moment dokrecania `T` w Nm;
- zakres orientacyjny dla tarcia +/- 0.02 wokol wybranego wspolczynnika, np. `22-31 Nm`;
- komentarz ryzyka:
  - "Tarcie dominuje wynik. Ten sam M8 moze miec wyraznie inny moment dla suchej i smarowanej sruby."
- przycisk "kopiuj wynik";
- dopisek: "Wynik orientacyjny. Dla polaczen krytycznych uzyj procedury firmowej, normy, danych producenta albo kontroli napiecia."

#### Dane i wzory

Dane wejściowe:

- geometria gwintow metrycznych ISO, czyli srednica nominalna, skok i pole `As`;
- klasy wlasnosci mechanicznych srub, np. ISO 898-1 dla klas 5.8, 8.8, 10.9, 12.9;
- A2-70 jako popularny przypadek nierdzewny, z osobnym komentarzem ostroznosci;
- wspolczynniki tarcia jako presety opisowe, nie jako jedna "prawda".

Najprostszy i czytelny model v1:

```text
Fv = As * Re * preloadPercent
T = K * Fv * d
```

Gdzie:

- `Fv` w N;
- `As` w mm2;
- `Re` w N/mm2;
- `d` w m;
- `K` jako nut factor powiazany z tarciem, dla v1 mapowany z presetow.

Alternatywnie mozna uzyc uproszczenia `K = 0.16-0.25` zamiast udawac precyzje z samego `mu`. Jesli formularz pokazuje `mu`, trzeba jasno napisac, ze to model orientacyjny.

#### Format JSON

Proponowany plik: `content/tools/sruby-momenty.json`

```json
{
  "meta": {
    "threadStandard": "ISO metric coarse thread",
    "unit": "metric",
    "warning": "Wyniki orientacyjne. Sprawdz procedury i dane producenta dla polaczen krytycznych."
  },
  "threads": [
    {
      "id": "M8",
      "nominalDiameterMm": 8,
      "coarsePitchMm": 1.25,
      "stressAreaMm2": 36.6
    }
  ],
  "propertyClasses": [
    {
      "id": "8.8",
      "tensileStrengthMpa": 800,
      "yieldStrengthMpa": 640
    }
  ],
  "frictionPresets": [
    {
      "id": "light_oil",
      "label": "lekko olejony",
      "mu": 0.14,
      "nutFactorK": 0.20
    }
  ]
}
```

#### Realna liczba rekordow

Wersja v1:

- 15 rekordow `threads`: M3-M30, gwint zwykly;
- 5 rekordow `propertyClasses`;
- 4 rekordy `frictionPresets`;
- razem 24 rekordy danych.

Jesli dodac gwinty drobnozwojne v1.1:

- okolo 12-20 dodatkowych rekordow `threads`, zależnie od zakresu;
- razem okolo 36-44 rekordy.

Nie trzeba wprowadzac tabeli wszystkich kombinacji M x klasa x tarcie, bo wynik liczy formula. To zmniejsza ryzyko danych i ulatwia pokazanie, jak zmiana tarcia zmienia wynik.

#### Naklad C2

- przygotowanie danych gwintow i klas: 2-4 h;
- decyzja i opis modelu obliczen, z ostrzezeniami: 2-3 h;
- komponent React z formularzem i wynikami: 4-6 h;
- stylowanie, mobile, dostepnosc: 2-3 h;
- testy reczne na popularnych przypadkach M6, M8, M10, M12: 2-3 h;
- razem: 12-19 h.

Ryzyko techniczne niskie. Ryzyko merytoryczne srednie, bo moment dokrecania latwo wyglada jak precyzyjna odpowiedz, a w praktyce mocno zalezy od tarcia, podkladki, powloki i metody montazu.

## 3. Naklad i ryzyko dla pomyslow z sekcji A i C

Szacunki zakladaja robienie tego porzadnie w obecnym Docusaurusie: komponent React, dane JSON w `content/`, integracja z artykulem, mobile, podstawowa dostepnosc i reczne sprawdzenie. Nie zakladam backendu.

| Pomysl | Naklad | Ryzyko techniczne | Komentarz |
|---|---:|---|---|
| A7. Kalkulator PERT | 4-7 h | niskie | Najprostszy szybki sukces. Dane nie sa normatywne, wzor jest juz w artykule. |
| A10. Kalkulator kosztu braku standaryzacji | 4-8 h | niskie | Prosty formularz i wynik. Dobrze pasuje do artykulu o standaryzacji. |
| A1. Konfigurator doboru sprzegla | 10-16 h | srednie | Technicznie latwy, ale trzeba dobrze napisac reguly, zeby nie udawal katalogowego doboru konkretnego indeksu. |
| A23. Konfigurator stacji roboczej pod CAD | 8-14 h | niskie-srednie | Dane szybko sie starzeja. Trzeba oprzec wynik na priorytetach, nie na konkretnych modelach CPU/GPU. |
| C1. Kalkulator pasowan i tolerancji | 17-27 h | srednie | Najwiekszy potencjal SEO. Glowny koszt to poprawne dane i walidacja. |
| C2. Kalkulator momentu dokrecania srub | 12-19 h | srednie | Technicznie proste. Trzeba mocno komunikowac orientacyjny charakter wyniku. |
| C3. Blok `narzedzie` w artykulach | 6-12 h | srednie | Architektura temu sprzyja. Trzeba zaprojektowac rejestr widgetow i konfiguracje w JSON/Decap, bez wkladania logiki do tresci. |
| C4. Model 3D do obracania | 10-20 h pierwszy model, potem 2-4 h/model | srednie-wysokie | Sam `model-viewer` jest prosty, ale problemem sa eksport glTF, optymalizacja wagi, lazy loading i Core Web Vitals. |
| C5. Wyszukiwarka po stronie | 3-8 h | niskie-srednie | Docusaurus ma gotowe opcje. Ryzyko to jakosc indeksowania polskich znakow i static export, nie sama implementacja. |

Moja kolejnosc realizacji:

1. C3 blok `narzedzie`, bo odblokowuje wszystkie kalkulatory w artykulach.
2. A7 PERT jako pierwszy pilot, bo jest maly i sprawdzi ergonomie bloku.
3. C1 pasowania, bo ma najwiekszy potencjal SEO.
4. C2 momenty dokrecania, bo jest drugim evergreenem technicznym.
5. A10 koszt braku standaryzacji.
6. A1 sprzegla.
7. C5 wyszukiwarka, gdy liczba artykulow wzrosnie powyzej kilkunastu albo od razu, jesli koszt wyjdzie blizej 3 h.
8. C4 model 3D dopiero po opanowaniu wagi assetow.
9. A23 stacja CAD, ale tylko bez konkretnych rekomendacji zakupowych po modelach sprzetu.

## 4. Co z iteracji 1 warto uratowac albo zostalo nieslusznie pominiete

Claude slusznie skupil sie na najwiekszych evergreenach technicznych, ale pominal kilka pomyslow, ktore nie sa moze najwiekszym magnesem SEO, za to pasuja do glosu strony i obecnych artykulow.

### Warto uratowac

#### 3. Decyzownik "projektowac detal czy kupic handlowke"

To jest bardzo zgodne z artykulem o handlowkach. Nie jest to quiz, tylko narzedzie do uporzadkowania myslenia. Zakres maly: pytania, proste wagi, wynik tekstowy. Naklad 6-10 h, ryzyko niskie. Dobry kandydat po kalkulatorach, bo wzmacnia praktyczny ton strony.

#### 4. Kalkulator oszczednosci na srubie pasowanej zamiast sworznia

Ten pomysl jest waski, ale przez to dobry. Po C1 moze korzystac z tego samego tematu pasowan i z artykulu o handlowkach. Naklad 5-8 h, ryzyko niskie. Nie jako osobna wielka strona, tylko blok w artykule.

#### 12. Kalkulator kosztu rysunku 2D

Prosty, praktyczny, bez danych normatywnych. Ma sens przy artykulach o kosztach i dokumentacji. Naklad 4-7 h, ryzyko niskie. To moze byc szybka druga fala po PERT i standaryzacji.

#### 13. Generator agendy kick-offu

Nie jako generator "magiczny", tylko jako filtr checklisty. Uzytkownik wybiera typ projektu i dostaje gotowe punkty do skopiowania. Dane w JSON, zero backendu. Naklad 6-10 h, ryzyko niskie. Dobrze pasuje do istniejacego artykulu o kick-offie.

#### 14. Formularz pytan przed startem projektu

Podobnie jak 13, ale bardziej uzyteczne przed prawdziwym spotkaniem. Warto polaczyc 13 i 14 w jedno narzedzie "checklista startu projektu", zamiast robic dwa osobne widgety.

#### 15. Macierz ryzyk

To jest sensowne, jesli nie budujemy schowka. Lokalnie w przegladarce, sortowanie po `P x S`, eksport CSV. Naklad 8-12 h, ryzyko niskie-srednie. Pasuje do czytelnikow bardziej liderskich.

#### 18. Audyt standardu CAD w dziale

Bardzo dobry lead doradczy. Nie jest to quiz, jesli wynik jest opisowy i pokazuje "pierwsze 3 miejsca do uporzadkowania". Naklad 8-14 h, ryzyko niskie. Moim zdaniem to jeden z mocniejszych pomyslow z iteracji 1 poza kalkulatorami.

#### 19. Generator szablonu standardu handlowek

Dobry, bo konczy sie artefaktem: tabela do skopiowania. Naklad 5-9 h, ryzyko niskie. Warto jako dodatek do 10 albo artykulu o standaryzacji.

#### 25. Symulator "czy detal da sie tanio wykonac"

Warto uratowac jako checkliste DFM, nie jako symulator kosztow. Nie wyliczac ceny, tylko wskazac czynniki podbijajace koszt. Naklad 8-12 h, ryzyko srednie, bo trzeba dobrze dobrac reguly i nie wejsc w zbyt ogolne truizmy.

#### 26. Audyt rysunku 2D przed wyslaniem na produkcje

Bardzo dobry evergreen, nawet jesli mniejszy niz pasowania. Formularz checklistowy, wynik i lista brakow. Naklad 6-10 h, ryzyko niskie. Mocno pasuje do odbiorcy.

#### 29. Kalkulator liczby srub i czasu montazu

Pomysl brzmi banalnie, ale moze byc bardzo "pocaduchowy", bo pokazuje koszt decyzji konstrukcyjnej. Naklad 6-10 h, ryzyko srednie, bo szacunki czasu trzeba opisac jako orientacyjne.

#### 30. Interaktywny slownik GD&T

To jest wartosciowy temat SEO, ale wiekszy merytorycznie. Warto, tylko nie jako pierwszy. Naklad 18-30 h, ryzyko srednie-wysokie przez potrzebe poprawnych opisow i przykladow.

#### 35. BOM chaos detector

To jest najbardziej "aplikacyjne" z calej listy i moze dac duza wartosc, ale wymaga ostroznego UX i komunikatu, ze plik nie opuszcza przegladarki. Naklad 14-24 h, ryzyko srednie. Warto pozniej, gdy strona ma juz kilka prostszych narzedzi.

#### 40. Porownaj swoj wynik z przykladem Lukasza

Claude pominal to nieslusznie. To nie musi byc osobna funkcja, tylko tryb w kazdym narzedziu: "wczytaj przyklad". Dla PERT: przykladowy projekt malego stanowiska. Dla pasowan: walek 20 mm H7/g6. Dla kosztow standaryzacji: 5 godzin miesiecznie na uchwytach. Naklad 1-2 h na narzedzie, ryzyko niskie, a mocno poprawia wiarygodnosc.

### Raczej odlozyc albo odrzucic

#### 6. Interaktywny atlas handlowek w maszynie

Fajny, ale drogi. To juz mini-aplikacja z ilustracja, hotspotami i trescia. Naklad 20-40 h. Warto dopiero, gdy wiadomo, ze artykul o handlowkach dobrze niesie ruch.

#### 8. Estymator czasu projektu maszyny

Ryzykowny merytorycznie, bo latwo obiecuje za duzo. Lepiej najpierw PERT, ktory nie udaje, ze zna projekt uzytkownika.

#### 9. Symulator malej zmiany klienta

Dobry contentowo, ale bardziej storytelling niz narzedzie. Mozna pozniej zrobic jako interaktywny artykul, nie jako priorytet techniczny.

#### 16. Podzial rol w zespole

Za malo zwiazane z unikalna przewaga Lukasza jako konstruktora CAD. Bardziej ogolne zarzadzanie projektem.

#### 22. Porownywarka CAD

SEO kuszace, ale temat sporny i szybko sie starzeje. Latwo przyciagnie dyskusje "moj CAD lepszy", a nie klienta zainteresowanego praktyka projektowania maszyn.

#### 24. Builder notesu OneNote

Niszowe i uzyteczne, ale nie tak mocne jak kalkulatory techniczne. Odlozyc.

#### 28. Montaz zostawiony na koniec

Dobry temat, ale lepiej go przerobic na serie blokow w artykule albo case study. Sam widget moze wyjsc teatralnie.

## Konkluzja

Claude ma racje co do najwiekszego przeoczenia: pasowania i momenty dokrecania sa bardziej evergreenowe i bardziej wyszukiwane niz wiekszosc moich pomyslow z iteracji 1. Ma tez racje, ze narzedzia powinny siedziec wewnatrz artykulow przez nowy blok `narzedzie`, bo to pasuje do obecnego `BlockRenderer.js` i nie wymaga osobnej sekcji "aplikacje".

Nie zgadzam sie tylko z calkowitym spaleniem interaktywnych decyzji. Format quizu odpada, ale format "decyzownik z komentarzem praktyka" nadal pasuje do marki i do artykulow. Najlepsza strategia to nie budowac duzej platformy interaktywnej, tylko dokladac lekkie, samowystarczalne narzedzia w miejscach, gdzie czytelnik juz ma problem przed oczami.

Moja propozycja MVP:

1. Dodac blok `narzedzie` do `BlockRenderer.js`.
2. Wdrozyc PERT jako pilot.
3. Wdrozyc C1 pasowania jako pierwszy duzy evergreen SEO.
4. Wdrozyc C2 momenty dokrecania jako drugi evergreen.
5. Dopiero potem dodawac lzejsze narzedzia: koszt standaryzacji, koszt rysunku 2D, agenda kick-offu, audyt CAD.
