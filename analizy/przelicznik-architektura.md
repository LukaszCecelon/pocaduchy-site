# Przelicznik jednostek: architektura

Dokument projektowy, stan przed kodowaniem. Ustala zakres, strukturę adresów, model
danych, warstwę SEO i kolejność wdrożenia.

## 1. Realia pozycjonowania, zanim cokolwiek zbudujemy

Trzeba to powiedzieć wprost, bo od tego zależy cała reszta.

**Na zapytania typu „5 bar na psi" Google odpowiada sam**, własnym kalkulatorem na
samej górze wyników. Nad tym widżetem nie da się stanąć. Walka o pierwszą pozycję
w takich frazach oznacza w praktyce walkę o pierwsze miejsce **pod** odpowiedzią,
którą użytkownik już dostał. Klikalność takich wyników jest niska.

Realny ruch da się zbudować tam, gdzie Google nie odpowiada dobrze albo wcale:

| Obszar | Dlaczego jest wolny |
|---|---|
| Jednostki z polskiej dokumentacji | kgf, kG, at, KM, obr/min. Google tłumaczy z angielskiego i gubi kontekst |
| Zapytania z kontekstem inżynierskim | „jaki moment w Nm to 50 lbf ft na kluczu dynamometrycznym" |
| Wielkości, które nie są przelicznikiem | Ra na Rz, HRC na HB, mesh na mikrometry. Google zwraca śmieci albo nic |
| Tabele wartości | „tabela bar psi", „przelicznik cali na mm tabela". Featured snippet bierze tabelę, nie kalkulator |
| Pytania o pułapki | „czy 1 bar to 1 at", „różnica temperatur w Fahrenheita" |

**Cel realistyczny:** pierwsza strona i pozycja zero na kilkudziesięciu polskich frazach
długiego ogona z kontekstem technicznym, a nie pierwsze miejsce na „mm na cale".

## 2. Struktura adresów

Trzy poziomy, każdy z inną rolą.

```
/przelicznik/                      hub, pełny przelicznik, wszystkie kategorie
/przelicznik/cisnienie/            strona wymiaru: wszystkie jednostki ciśnienia, tabela krzyżowa
/przelicznik/bar-na-psi/           strona pary: konkretna odpowiedź na konkretne zapytanie
```

Adresy par są płaskie, nie zagnieżdżone w kategorii. Para jest globalnie jednoznaczna,
adres krótszy, a hierarchię i tak pokazują okruszki. Kafelek w `/narzedzia/` prowadzi
do huba.

**Nazewnictwo par:** `<od>-na-<do>`, po polsku, symbole zapisane słownie tam, gdzie
symbol jest niejednoznaczny w adresie (`nm` to zarówno niutonometr, jak i nanometr,
więc `newtonometr-na-lbfft`, nie `nm-na-lbfft`).

## 3. Model danych i silnik

### Wymiar

```
{
  id: 'cisnienie',
  nazwa: 'Ciśnienie',
  bazowa: 'Pa',
  jednostki: [ ... ]
}
```

### Jednostka

```
{
  id: 'bar',
  symbol: 'bar',
  nazwa: 'bar',
  wspolczynnik: 100000,        // ile jednostek bazowych
  przesuniecie: 0,             // tylko temperatura
  dokladna: true,              // wartość z definicji, nie zaokrąglona
  aliasy: ['bary', 'barów'],   // do wyszukiwarki w interfejsie
  uklad: 'metryczny' | 'imperialny' | 'techniczny'
}
```

Przeliczenie zawsze przez jednostkę bazową: `wartosc * wspolczynnik_od / wspolczynnik_do`.
Temperatura dostaje dodatkowo przesunięcie, bo skale nie mają wspólnego zera.

### Trzy decyzje, które trzeba podjąć na starcie

**Dokładność.** Większość współczynników jest **dokładna z definicji**: cal to równo
25,4 mm, funt to 0,45359237 kg, kgf to 9,80665 N. Warto to oznaczać w wyniku, bo nikt
inny tego nie robi, a dla konstruktora to informacja, czy wolno zaokrąglić. Wyświetlanie
domyślnie na 6 cyfr znaczących, z możliwością zmiany.

**Różnica kontra wartość.** 1 °C to 33,8 °F, ale różnica 1 °C to różnica 1,8 °F. To jest
najczęstsza pomyłka przy temperaturze i musi być obsłużona jako osobny tryb, nie jako
przypis drobnym drukiem.

**Naprężenie kontra ciśnienie.** Wymiar fizyczny ten sam, ale użytkownik szuka osobno
(„MPa na N/mm²" to zapytanie konstruktora, nie hydraulika). Jeden silnik, dwie strony
wymiaru, różne zestawy jednostek na wierzchu.

## 4. Co musi znaleźć się w statycznym HTML

To jest najważniejsza decyzja techniczna całego narzędzia.

Kalkulator liczący dopiero po kliknięciu jest dla wyszukiwarki pustą stroną. Dlatego
**każda strona pary ma mieć gotową odpowiedź w kodzie strony, zanim ruszy jakikolwiek
JavaScript**:

1. Nagłówek H1 z parą i wartością odniesienia: „1 bar to 14,5038 psi".
2. **Tabela wartości typowych** w obie strony: 1, 2, 3, 5, 10, 15, 20, 25, 50, 100, 200,
   500, 1000. To ona łapie pozycję zero, nie kalkulator.
3. Wzór przeliczenia zapisany jawnie.
4. Notatka kontekstowa, o której niżej.
5. Odnośnik do pary odwrotnej.

Kalkulator jest nakładką: działa po hydratacji, ale strona ma pełną wartość bez niego.

## 5. Zakres jednostek

Około **150 jednostek w 21 wymiarach**. Kryterium doboru: czy to występuje w dokumentacji,
katalogu albo na kluczu dynamometrycznym, który konstruktor trzyma w ręce.

| Wymiar | Jednostki |
|---|---|
| Długość | mm, cm, dm, m, km, µm, nm, cal, stopa, jard, mila, mil (thou) |
| Pole | mm², cm², m², a, ha, km², cal², stopa² |
| Objętość | mm³, cm³, dm³, m³, ml, l, cal³, stopa³, galon US, galon UK |
| Masa | mg, g, dag, kg, t, uncja, funt, stone |
| Siła | N, daN, kN, MN, kgf (kG), lbf, ozf |
| Moment obrotowy | N·m, N·mm, kN·m, kgf·m, kgf·cm, lbf·ft, lbf·in, ozf·in |
| Ciśnienie | Pa, hPa, kPa, MPa, bar, mbar, at, atm, psi, mmHg, mmH₂O, mH₂O |
| Naprężenie | MPa, N/mm², psi, ksi, kgf/mm², kgf/cm² |
| Temperatura | °C, °F, K, °R, plus tryb różnicy |
| Prędkość liniowa | m/s, m/min, mm/s, km/h, ft/min, ipm, mph |
| Prędkość obrotowa | obr/min, obr/s, rad/s, Hz |
| Przyspieszenie | m/s², g, ft/s² |
| Przepływ | l/min, l/s, l/h, m³/h, m³/min, cm³/min, cfm, gpm |
| Moc | W, kW, MW, KM, hp, BTU/h, kcal/h |
| Energia | J, kJ, MJ, Wh, kWh, cal, kcal, BTU, kgf·m |
| Gęstość | kg/m³, g/cm³, kg/dm³, lb/ft³, lb/in³ |
| Kąt | stopień, radian, grad, minuta, sekunda, obrót |
| Czas | s, min, h, doba |
| Moment bezwładności | kg·m², kg·cm², lb·ft² |
| Sztywność | N/mm, N/m, kgf/mm, lbf/in |
| Lepkość kinematyczna | mm²/s (cSt), m²/s |

## 6. Trzy rzeczy, które przelicznikiem nie są

Tu leży największa przewaga nad konkurencją, pod warunkiem, że nazwiemy rzeczy po imieniu.

**Chropowatość Ra na Rz.** To nie jest przeliczenie, tylko zależność statystyczna,
zależna od kształtu profilu. Rz mieści się mniej więcej w przedziale od czterech do
siedmiu Ra. Każda strona podająca jeden współczynnik kłamie.

**Twardość HRC na HB na HV.** Tablice porównawcze wg ISO 18265, ważne tylko dla
określonych grup materiałów i tylko w podanym zakresie. To odczyt z tabeli, nie wzór.

**Mesh na mikrometry.** Zależy od normy i średnicy drutu siatki. Bez podania normy
liczba nie znaczy nic.

Wszystkie trzy dostają własne strony, jawnie oznaczone jako **przeliczenia orientacyjne**,
z tabelą i z wyjaśnieniem, dlaczego dokładna wartość nie istnieje. To jest treść,
której konkurencja nie ma, bo wymaga powiedzenia „nie da się" zamiast podania liczby.

## 7. Warstwa SEO

### Tytuły i opisy

Szablon dla pary, uzupełniany danymi, ale z ręcznie pisaną notatką:

```
seoTitle:  "Bar na psi: przelicznik i tabela wartości"     (do 60 znaków)
opis:      "Ile psi to 1 bar? 14,5038. Przelicz dowolną
            wartość, sprawdź tabelę i wzór przeliczenia."   (140 do 158 znaków)
```

### Dane strukturalne

- `WebApplication` dla kalkulatora na hubie
- `FAQPage` na stronach par, dwa albo trzy pytania typu „ile psi to 1 bar"
- `BreadcrumbList` wszędzie
- Tabelę wartości zostawiamy jako zwykłą tabelę HTML. Google czyta ją bez dodatkowego
  znacznika, a znacznik `Table` nie daje przewagi

### Linkowanie wewnętrzne

Każda strona pary linkuje do:
- pary odwrotnej,
- czterech do sześciu sąsiednich par tego samego wymiaru,
- strony wymiaru,
- huba.

Dzięki temu żadna strona nie jest sierotą, a klaster tematyczny jest czytelny dla robota.
Hub i strony wymiarów wchodzą do menu Narzędzia, strony par tylko do sitemapy i
linkowania wewnętrznego.

### Warunek konieczny: brak doorway pages

Google karze strony generowane masowo, które różnią się wyłącznie podstawionym słowem.
Zabezpieczenie jest jedno i musi być twarde:

> **Strona pary nie powstaje bez ręcznie napisanej notatki kontekstowej.**
> Od dwóch do czterech zdań o tym, gdzie ta konkretna para występuje w praktyce
> i na co uważać. Brak notatki w pliku danych oznacza brak strony.

Przykłady tego, co ma być w notatce:

- **bar na psi**: katalogi pneumatyki, siłowniki podawane w barach, sprężarki bywają w psi.
- **Nm na lbf·ft**: klucze dynamometryczne z importu, tabele momentów dokręcania w normach amerykańskich.
- **kgf na N**: starsza dokumentacja i katalogi sprężyn, gdzie kilogram siły trzyma się do dziś.
- **cal na mm**: średnice gwintów rurowych, łożyska calowe, wymiary blach.

To jest jednocześnie filtr jakości i filtr ilości. Pary, dla których nie ma nic sensownego
do napisania, po prostu nie powstają.

## 8. Wydajność

Pomiar wyjściowy: **42 strony budują się 80 sekund**, cała strona waży 13 MB.

| Element | Koszt |
|---|---|
| Tablica jednostek | około 9 kB surowe, 3 kB po kompresji |
| Komponent przelicznika | około 5 kB |
| Strona pary, HTML | około 25 kB, w tym gotowa tabela wartości |
| Build, 200 dodatkowych stron | szacunkowo plus 60 do 90 sekund |

Decyzje wydajnościowe:

- **Jeden moduł danych**, importowany przez wszystkie strony. Rspack umieści go we
  wspólnym pakiecie, więc przeglądarka pobiera go raz.
- **Tabela wartości liczona przy budowaniu**, nie w przeglądarce. Zero kosztu po stronie
  użytkownika i pełna treść dla robota.
- **Brak zależności zewnętrznych.** Przeliczenia to mnożenie, biblioteka nie jest potrzebna.
- Gdyby build zaczął się rozjeżdżać powyżej trzech minut, próg do ponownego rozważenia,
  ale przy planowanej skali to nie zagrożenie.

## 9. Ryzyka

| Ryzyko | Waga | Reakcja |
|---|---|---|
| Google odpowiada sam, klikalność niska | wysokie | Stawiamy na frazy z kontekstem i na tabele, nie na gołe pary |
| Doorway pages | wysokie | Twardy warunek notatki, brak generowania kombinatorycznego |
| Rozjazd zaokrągleń między stroną a tabelą | średnie | Jedno źródło liczb, tabela liczona tym samym silnikiem co kalkulator |
| Rozrost buildu | niskie | Skala docelowa poniżej 250 stron |
| Wysyp stron bez ruchu | średnie | Faza 1 to 40 stron, dalsze dokładane na podstawie danych z Search Console |

## 10. Wdrożenie w fazach

**Faza 1, fundament.** Silnik z testami, tablica jednostek, hub `/przelicznik/`
z pełnym przelicznikiem, sześć stron wymiarów najczęściej szukanych: ciśnienie,
długość, moment, siła, temperatura, moc. Około dziesięciu stron.

**Faza 2, pary.** Trzydzieści do czterdziestu par z ręcznymi notatkami, wybranych pod
kątem tego, co realnie występuje w polskiej dokumentacji. Pary odwrotne liczą się osobno.

**Faza 3, przeliczenia orientacyjne.** Ra na Rz, twardości, mesh. Trzy strony, każda
z tabelą i z wyjaśnieniem ograniczeń.

**Faza 4, rozbudowa na danych.** Po sześciu do ośmiu tygodni sprawdzamy w Search Console,
które strony zbierają wyświetlenia, i dokładamy pary w tych okolicach. Strony bez
jednego wyświetlenia po trzech miesiącach idą do usunięcia, nie do rozbudowy.

## 11. Podział pracy

**Claude:** architektura, model danych, tablica jednostek wraz z weryfikacją współczynników,
silnik z testami, komponent przelicznika, notatki kontekstowe do par, strony
przeliczeń orientacyjnych.

**Codex:** generator stron par w `scripts/build-content-pages.mjs`, szablony stron
wymiaru i pary, warstwa danych strukturalnych, skrypt kontrolny sprawdzający, czy każda
para ma notatkę, czy istnieje para odwrotna i czy nie ma dziur w linkowaniu.

**Łukasz:** decyzja o zakresie fazy 2, weryfikacja notatek kontekstowych pod kątem tego,
czy tak faktycznie wygląda praca z tymi jednostkami.
