# Iteracja 4 z 5: punktacja i plan (Claude)

Zgadzam sie z wiekszoscia iteracji 3. Trzy rzeczy przyjmuje wprost, jedna
odrzucam, a jedno powazne ryzyko zostalo w calej dyskusji niedoszacowane.

## A. Co przyjmuje z iteracji 3

1. **"Decyzownik" zamiast quizu** - trafna korekta. Wynik warunkowy zamiast
   punktacji rzeczywiscie ratuje format i nie lamie glosu.
2. **Tryb "wczytaj przyklad" w kazdym narzedziu (pomysl 40)** - slusznie
   wypunktowane, ze to pominalem. Koszt 1-2 h na narzedzie, a rozwiazuje
   najwiekszy problem kalkulatorow: pusty formularz, w ktorym nie wiadomo,
   co wpisac. Przyjmuje jako wymog dla kazdego narzedzia, nie jako opcje.
3. **Polaczenie 13 i 14 w jedna "checkliste startu projektu"** - tak, dwa osobne
   widgety do tego samego artykulu to rozdrabnianie.

## B. Co odrzucam z iteracji 3

**Kolejnosc realizacji.** Codex stawia blok `narzedzie` (C3) na pierwszym miejscu
jako "odblokowujacy wszystko". To klasyczna pulapka: budowanie platformy przed
zbudowaniem czegokolwiek, co na niej stanie. Ryzyko jest takie, ze projektujemy
rejestr widgetow pod wyobrazone potrzeby, a potem pierwszy realny kalkulator
i tak go lamie.

Odwrotnie: **najpierw jeden kalkulator wstawiony na sztywno w jeden artykul**.
Dopiero gdy dzialа i wiemy, jak wyglada jego konfiguracja, uogolniamy to do bloku.
Refaktor jednego widgetu jest tani. Zle zaprojektowany rejestr jest drogi.

## C. Ryzyko, ktore przegapilismy oba: odpowiedzialnosc za liczbe

Kalkulator pasowan i kalkulator momentu dokrecania to nie sa narzedzia
marketingowe. To sa **narzedzia obliczeniowe, ktorych wynik moze trafic do
dokumentacji produkcyjnej**. Jesli tabela ma blad w jednym przedziale srednic,
ktos moze na tej podstawie zwymiarowac detal.

Pod tym podpisuje sie nazwisko Lukasza, ktory jest praktykujacym konstruktorem
i buduje wiarygodnosc zawodowa. Blad w kalkulatorze kosztuje go wiecej niz brak
kalkulatora.

Konsekwencje dla planu:

1. **Dane wprowadzamy raz i weryfikujemy niezaleznie.** Kazdy przedzial srednic
   sprawdzony przez druga osobe albo przez porownanie z niezaleznym zrodlem.
   To nie jest 17-27 h jak szacuje Codex, tylko blizej **25-35 h** z rzetelna
   weryfikacja.
2. **Zakres v1 wezszy, niz proponuje Codex.** Nie 1-500 mm i 9 pasowan.
   Zaczynamy od **1-120 mm i pieciu najpopularniejszych par**. Mniej danych
   do zweryfikowania, ta sama wartosc dla 90 procent uzytkownikow.
3. **Test jednostkowy na danych.** Kilkanascie znanych wartosci wpisanych jako
   asercje. Jesli ktos kiedys ruszy plik JSON, test to wylapie.
4. **Zastrzezenie widoczne przy wyniku**, nie w stopce.

Kalkulator PERT i kalkulator kosztu standaryzacji tego problemu nie maja,
bo liczą wlasne zalozenia uzytkownika, nie wartosci normatywne. To dodatkowy
argument, zeby zaczac wlasnie od nich.

## D. Punktacja

Skala 1-5. "Popyt" to szacunek zapotrzebowania w polskim Google na podstawie
audytu SEO, nie zmierzony wolumen.

| Narzedzie | Popyt | Naklad | Unikalnosc PL | Glos Lukasza | Ryzyko | Wynik |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| Kalkulator pasowan i tolerancji | 5 | 2 | 5 | 4 | 2 | **18** |
| Kalkulator momentu dokrecania srub | 5 | 3 | 3 | 3 | 2 | **16** |
| Kalkulator PERT | 2 | 5 | 5 | 5 | 5 | **22** |
| Kalkulator kosztu braku standaryzacji | 2 | 5 | 5 | 5 | 5 | **22** |
| Decyzownik projektowac czy kupic | 3 | 4 | 5 | 5 | 4 | **21** |
| Checklista startu projektu (13+14) | 2 | 4 | 4 | 5 | 5 | **20** |
| Audyt rysunku 2D przed produkcja | 3 | 4 | 5 | 5 | 4 | **21** |
| Konfigurator doboru sprzegla | 3 | 3 | 4 | 4 | 3 | **17** |
| Model 3D do obracania | 1 | 2 | 4 | 5 | 3 | **15** |
| Wyszukiwarka po stronie | 0 | 4 | 1 | 2 | 5 | **12** |
| Slownik GD&T | 4 | 1 | 4 | 4 | 2 | **15** |
| Audyt standardu CAD w dziale | 2 | 3 | 5 | 5 | 4 | **19** |

Wysoki wynik nie znaczy "robic najpierw". Znaczy "najlepszy stosunek wartosci
do kosztu i ryzyka". Pasowania maja niski wynik sumaryczny przez naklad i ryzyko,
ale najwyzszy pojedynczy potencjal ruchu. Dlatego plan lączy jedno z drugim.

## E. Plan w trzech falach

### Fala 1: udowodnic, ze to dziala (ok. 15 h)

1. **Kalkulator PERT** w artykule o szacowaniu czasu. Wstawiony na sztywno,
   bez uogolniania. Z trybem "wczytaj przyklad".
2. **Kalkulator kosztu braku standaryzacji** w artykule o standaryzacji.

Po tych dwoch wiemy: ile realnie zajmuje taki widget, jak zachowuje sie na
mobile, czy nie psuje Core Web Vitals i czy ktokolwiek go uzywa.

### Fala 2: uogolnic i uderzyc w SEO (ok. 45 h)

3. **Blok `narzedzie`** w BlockRenderer, wyprowadzony z dwoch dzialajacych
   przykladow, a nie wymyslony z gory.
4. **Kalkulator pasowan**, zakres 1-120 mm, piec par, z testami danych.
   Wlasna strona plus blok w artykule o handlowkach.
5. **Kalkulator momentu dokrecania**, gwinty M3-M24, klasy 8.8 / 10.9 / 12.9.

### Fala 3: poglebic (ok. 40 h)

6. Decyzownik "projektowac czy kupic handlowke".
7. Audyt rysunku 2D.
8. Checklista startu projektu.
9. Model 3D w artykule o sprzeglach, jesli assety nie przekrocza budzetu wagi.

Wyszukiwarke robimy wtedy, gdy artykulow bedzie ponad kilkanascie.
Slownik GD&T to osobny projekt contentowy, nie narzedziowy.

## F. Dwa ograniczenia, ktore trzeba zapisac

1. **AdSense a strony narzedziowe.** Strona zawierajaca sam kalkulator i nic
   poza tym bywa oznaczana jako niskiej wartosci. Kazde narzedzie musi miec
   przy sobie tekst wyjasniajacy, kiedy i po co sie tego uzywa. Podejscie
   "narzedzie w artykule" rozwiazuje to samo z siebie.
2. **Budzet wagi.** Kazdy widget lazy loading i ponizej 50 kB po kompresji.
   Model 3D laduje sie dopiero po kliknieciu w miniature.

## G. Zadanie na iteracje 5

Codex: zrob red team tego planu. Konkretnie:

1. Zaatakuj fale 1. Czy PERT i koszt standaryzacji to naprawde dobry start,
   czy tylko latwy start? Co jesli nikt ich nie uzyje?
2. Znajdz w tym planie najwiekszy ukryty koszt, ktorego zaden z nas nie policzyl.
3. Czy zawezenie kalkulatora pasowan do 1-120 mm i pieciu par faktycznie
   wystarczy, czy to zabija jego wartosc SEO?
4. Podaj jeden pomysl z calej dyskusji, ktory Twoim zdaniem powinien byc
   w planie, a nie ma go, i uzasadnij liczbowo.
5. Jak zmierzyc, czy to w ogole zadzialalo, majac tylko Google Search Console
   i statyczna strone bez backendu?
