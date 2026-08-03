# Runda 6: konwergencja i architektura finalna (Claude)

Runda 5 trafila w trzy rzeczy, ktore zmieniaja projekt, a nie tylko go
doprecyzowuja. Przyjmuje je w calosci i domykam architekture.

---

## A. Trzy rozstrzygniecia, ktore zmieniaja projekt

### A1. Legalnosc danych jest wazniejsza niz architektura

Codex ma racje, ze to najwieksza slepa plamka. Cztery rundy o React i SVG,
zero o tym, co wolno opublikowac.

Stan faktyczny, na ile moge go stwierdzic bez prawnika:

- **Dokument normy jest utworem chronionym.** DIN i ISO sprzedaja te dokumenty
  i licencjonuja ich tresc. Skopiowanie tabeli z normy wraz z jej ukladem,
  oznaczeniami kolumn i opisami to reprodukcja utworu.
- **Pojedyncza wartosc liczbowa jest faktem** i faktow nie da sie objac prawem
  autorskim. Srednica rowka dla walka 20 mm ma taka wartosc, jaka ma.
- **Ale zbior wartosci moze byc chroniony jako baza danych**, jesli jego
  stworzenie wymagalo istotnego nakladu. To jest realna, osobna ochrona.
- **Numer normy wolno przywolac.** Napisanie "wg DIN 471" jest odwolaniem
  do standardu, nie jego reprodukcja.

Polityka, ktora z tego wynika i ktora uwazam za bezpieczna praktycznie:

1. **Dane bierzemy z publicznych katalogow producentow**, nie z dokumentu normy.
   Producenci publikuja wymiary po to, zeby konstruktorzy dobierali ich wyroby.
2. **Uklad tabeli budujemy wlasny**, inny niz zrodlowy: inna kolejnosc kolumn,
   wlasne nazwy, wlasne jednostki, wlasny podzial.
3. **Kazdy rekord ma zapisane zrodlo** i to zrodlo jest widoczne dla czytelnika.
4. **Nie publikujemy pelnego zakresu normy**, tylko wycinek uzytkowy.
   To spojne z decyzja o jawnym zakresie z rundy 2, ale teraz ma drugi powod.
5. **Dodajemy wlasna warstwe**, ktorej w zrodle nie ma: komentarz praktyka,
   typowe bledy, kiedy nie stosowac. To jest tresc oryginalna i ona stanowi
   o wartosci strony.

**Zastrzezenie, ktore musze postawic wprost:** to nie jest opinia prawna.
Strona zarabia na reklamach, wiec jest komercyjna, a przy publikowaniu danych
normatywnych to podnosi stawke. Przed pierwsza publikacja warto to przepuscic
przez prawnika, choc jeden raz, i ustalic granice na przyszlosc.

### A2. Momenty dokrecania to najbardziej ryzykowny temat, nie najlatwiejszy

Codex nazwal to czerwonym alarmem i ma racje. Moment dokrecania zalezy od klasy
sruby, materialu, wspolczynnika tarcia, smarowania, powloki, rodzaju podkladki,
sposobu montazu i wymagan producenta. Tabela "M8 klasa 8.8 to X Nm" jest
uproszczeniem, ktore ktos moze wziac dosłownie.

To odwraca moj ranking z rundy 4. Momenty maja najwyzszy popyt i najwyzsze
ryzyko zawodowe jednoczesnie. Zostaja w planie, ale:

- z polem `trybUzycia: "punkt startowy"`, nie `"wymiar do rysunku"`
- z jawna lista czynnikow, ktore zmieniaja wynik
- z wymogiem sprawdzenia u producenta zlacza

Przyjmuje pole **`trybUzycia`** jako obowiazkowe dla kazdej tabeli. Trzy wartosci:

| Wartosc | Znaczenie | Przyklad |
|---|---|---|
| `wymiar-do-rysunku` | mozna wpisac do dokumentacji | rowek pod pierscien osadczy |
| `punkt-startowy` | orientacyjne, wymaga weryfikacji | momenty dokrecania |
| `komentarz-praktyka` | subiektywna ocena autora | kiedy wybrac H7/g6 |

To jest jedno pole, ktore robi wiecej dla bezpieczenstwa niz caly disclaimer
w stopce, bo stoi przy konkretnej liczbie.

### A3. Sesc typow geometrii to bylo myslenie zyczeniowe

Codex naliczyl 18 rodzin i nie umiem tego podwazyc. Moj blad polegal na tym,
ze policzylem typy potrzebne do pierwszych czterech tematow i uznalem, ze to
jest caly zbior.

Ale jego wlasny wniosek jest wazniejszy niz sama liczba: **skoro typow jest
kilkanascie, nie stawiamy na kilka cudownych komponentow, tylko na male wspolne
prymitywy.** Czyli:

- `Wal(srednica, dlugosc)`, `Otwor(...)`, `Rowek(...)`, `Faza(...)`, `Promien(...)`
- `WymiarPoziomy(od, do, etykieta)`, `WymiarPionowy(...)`, `LiniaOsi(...)`
- `Wynoszenie(punkt, tekst)`

Komponent tematu sklada rysunek z prymitywow, zamiast rysowac go od zera.
Pierwszy temat kosztuje wiecej, bo powstaja prymitywy. Kazdy nastepny
jest tani, niezaleznie od tego, czy jest tego samego typu.

To jest odpowiedz na test Codeksa z rundy 3, mocniejsza niz moja z rundy 4.

---

## B. Cztery pozostale luki, domkniete

### B1. Proces danych

Recznie do JSON-a wpisuje sie 30 wierszy. Przy 20 tematach to najwiekszy koszt
projektu i miejsce, gdzie umrze zapal.

**Rozwiazanie:** dane powstaja w arkuszu (jedna zakladka na temat), a skrypt
`import-wiedza.mjs` zamienia arkusz na JSON i uruchamia walidacje. Ten sam
wzorzec, ktory juz dziala z plikami Worda dla tekstow.
Lukasz pracuje w arkuszu, nie w JSON-ie.

### B2. Tabele na telefonie

Slusznie wypunktowane, to nie jest detal CSS. Szeroka tabela wymiarowa na
telefonie jest bezuzyteczna, a to najczestszy scenariusz: sprawdzenie przy
maszynie.

**Rozwiazanie:** na waskim ekranie tabela nie przewija sie poziomo, tylko
zmienia postac. Selektor rozmiaru u gory, pod nim **karta jednego rekordu**
z wymiarami, zsynchronizowana z rysunkiem. Pelna tabela dostepna pod
rozwinieciem. Na desktopie: pelna tabela plus podswietlony wiersz.

Ten sam selektor steruje rysunkiem, wiec mobile dostaje najlepsza wersje
doswiadczenia, nie okrojona.

### B3. Typowane relacje miedzy tematami

Przyjmuje. `related` z bloga jest za slabe. W Wiedzy relacja niesie decyzje:

- `nastepnyKrok` - co robisz zaraz potem
- `czestoMyliSieZ` - czym to bywa mylone
- `alternatywy` - inne sposoby rozwiazania problemu
- `wymagaSprawdzenia` - co trzeba zweryfikowac osobno

### B4. Polityka publikacji

Przyjmuje propozycje Codeksa bez zmian:

- publicznie tylko `zweryfikowane` albo `ograniczone`
- `szkic` nigdy nie trafia do publicznego indeksu
- ograniczony zakres musi byc widoczny w naglowku, nie w przypisie
- **rekord bez zrodla nie przechodzi builda**

Ostatni punkt jest twardy: to walidator, nie dobre checi.

---

## C. Architektura finalna

### Zasada naczelna

> Jeden plik danych na temat. Z niego, przy budowaniu strony, powstaja:
> tabela HTML, rysunek SVG zlozony z prymitywow, kalkulator, dane strukturalne
> i wpis dla modeli AI. Kazda liczba ma zrodlo, date weryfikacji i tryb uzycia.

### Warstwy

```
content/wiedza/<kategoria>/<slug>.json     dane, jedyne zrodlo prawdy
        |
        v
scripts/validate-wiedza.mjs                walidacja przed buildem
scripts/build-content-pages.mjs            generowanie stron i manifestow
        |
        v
src/components/wiedza/
        prymitywy/                          Wal, Otwor, Rowek, Wymiar, Faza...
        rysunki/                            zlozenia prymitywow na typ geometrii
        TabelaDanych.js                     HTML przy buildzie, karta na mobile
        KartaZaufania.js                    kto, kiedy, skad, jaki zakres
        BlokDecyzji.js                      kiedy stosowac, kiedy nie, bledy
```

### Co pozostaje bez zmian

Docusaurus, static export, GitHub Pages, `BlockRenderer`, konwencja
`content/**/*.json`, publikacja przez git push. Zero nowych zaleznosci
poza tym, co konieczne.

---

## D. Plan

### Krok 0: rozstrzygniecie prawne (Lukasz, przed startem)

Potwierdzic polityke z A1. To jedyny punkt, ktorego nie zrobie za niego.

### Krok 1: pierwszy pionowy wycinek, `rowek pod pierscien osadczy na wale`

Zgodnie z korekta Codeksa: **tylko DIN 471, tylko walek**, jawnie ograniczony
zakres. Nie obiecujemy kompletu.

Powstaje przy okazji cala infrastruktura: prymitywy SVG, tabela danych,
karta zaufania, blok decyzji, walidator, import z arkusza.

Koszt: **28-40 h**, z czego wiekszosc to infrastruktura, nie temat.

### Krok 2: `momenty dokrecania srub`

Bez rysunku, wiec testuje sam format i popyt. Z `trybUzycia: punkt-startowy`
i lista czynnikow zmieniajacych wynik.

Koszt: **10-16 h**, bo infrastruktura juz jest.

### Krok 3: `rowek pod pierscien osadczy w otworze`

Ten sam typ geometrii co krok 1. **To jest test architektury.** Jesli zajmie
mniej niz 6 h, architektura jest dobra. Jesli znowu wymaga zmian w silniku,
wracamy do projektu.

### Dalej

Pasowania ISO 286 dopiero jako czwarty temat, gdy maszyna dziala i wiadomo,
ile realnie kosztuje wprowadzenie duzej tabeli.

### Kryteria oceny po kazdym kroku

1. czy tabela jest w statycznym HTML (sprawdzam przez `curl`, nie w przegladarce)
2. ile trwa dodanie kolejnego tematu tego samego typu
3. wejscia z Google po 30, 90 i 180 dniach
4. czy temat da sie znalezc po synonimie, nie tylko po nazwie normy

---

## E. Co zostalo nierozstrzygniete

Uczciwie: dwie rzeczy.

1. **Czy Lukasz w ogole chce w to wejsc.** Krok 1 to 28-40 h. To jest tydzien
   wieczorow. Kanal jest zrodlem jego rozpoznawalnosci, baza wiedzy nie.
2. **Legalnosc.** Do potwierdzenia przez prawnika, patrz A1.

Poza tym uwazam dyskusje za domknieta. Szesc rund wystarczylo.
