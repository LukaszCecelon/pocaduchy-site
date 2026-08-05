# Analiza CAD i rysunkow 2D na pocaduchy.pl: decyzja

Zestawienie dwoch niezaleznych ocen wykonalnosci:
`analiza-cad-wykonalnosc-claude.md` i `analiza-cad-wykonalnosc-codex.md`.

## Odpowiedz

**Tak, da sie.** Ale trzeba mowic „analizator pliku" i „raport wedlug zalozen",
a nigdy „automatyczny kontroler poprawnosci CAD".

Granica przebiega miedzy **mierzeniem** a **rozumieniem**. Wszystko, co da sie
policzyc z geometrii, jest wykonalne. Wszystko, co wymaga wiedzy o tym,
do czego czesc sluzy, nie jest.

## Gdzie sie zgodzilismy

Obie analizy, prowadzone niezaleznie, daly **te sama kolejnosc**:

1. analizator STL pod druk 3D,
2. analizator DXF pod wycinanie,
3. STEP na koncu.

Obie tez odrzucily to samo: ocene poprawnosci rysunku, odczyt wymiarow z PDF,
formaty zamkniete i DWG.

## Gdzie Codex mnie poprawil

**Pomylilem sie co do STEP.** Napisalem, ze pelna geometria wymaga
kilkudziesieciu megabajtow i nie warta jest tej ceny. Codex sprawdzil realne
rozmiary paczek przez `npm view` i wyszlo, ze sa **dwie rozne drogi**:

| Biblioteka | Rozmiar | Wniosek |
|---|---:|---|
| `opencascade.js` | 66,7 MB paczki | rzeczywiscie za ciezkie |
| `occt-import-js` | 11,6 MB paczki, **7,6 MB samego wasm** | akceptowalne jako modul ladowany na zadanie |

Roznica jest zasadnicza. 7,6 MB doladowywane dopiero po wejsciu na podstrone
STEP i po wybraniu pliku to zupelnie inna sytuacja niz 66 MB. **STEP z masa
i objetoscia jest wiec realny**, tylko nie w pierwszej kolejnosci.

## Wymiar, ktory niedocenilem: licencje

Codex sprawdzil licencje wszystkich kandydatow i to okazalo sie wazniejsze,
niz zakladalem.

| Biblioteka | Licencja | Werdykt |
|---|---|---|
| `three`, `dxf-parser`, `three-mesh-bvh`, `three-mf` | MIT | bez przeszkod |
| `pdfjs-dist` | Apache-2.0 | bez przeszkod |
| `occt-import-js` | LGPL-2.1 | uzywalne bez modyfikacji, wymaga informacji o licencji |
| `@mlightcad/libredwg-web` | GPL-3.0 | **odpada**, wymuszalaby GPL na naszym kodzie |
| `@flyfish-dev/cad-viewer` | AGPL-3.0 | **odpada**, jeszcze ostrzejsza |

To jest drugi, obok wagi, powod, dla ktorego DWG nie wchodzi. Nie tylko
techniczny, ale i prawny.

## Przewaga, ktora ma tylko strona statyczna

Brak serwera oznacza, ze **plik uzytkownika nie opuszcza jego komputera**.
Kazde konkurencyjne narzedzie do analizy CAD w sieci wysyla plik na serwer.

Konstruktor nie wrzuci modelu klienta na losowa strone. Ma to w umowie, a jesli
nie ma, to ma zdrowy rozsadek.

**Tego da sie dowiesc, a nie tylko obiecac.** Zdanie na strone:

> Odlacz internet i sprawdz, ze nadal dziala. Twoj plik nigdy nie opuszcza
> tego komputera.

Zaden konkurent z backendem tego nie napisze. To jest mocniejszy argument
sprzedazowy niz jakakolwiek funkcja.

## Trzy narzedzia, kolejnosc

### 1. Analizator STL, 3MF i OBJ pod druk 3D

**Zwraca:** gabaryt, objetosc, pole powierzchni, mase w wybranym materiale,
srodek ciezkosci, liczbe trojkatow, szczelnosc siatki, udzial powierzchni
zwisajacych przy zadanym kacie oraz porownanie kilku orientacji druku.

**Dlaczego pierwszy:** najwyzsza wiarygodnosc wyniku, najnizsze ryzyko
licencyjne, a jako jedyny laczy sie z kanalem YouTube. Ma tez naturalne
przedluzenie w kalkulatorze filamentu, ktory juz jest na liscie kalkulatorow.

**Biblioteki:** `three` (MIT), opcjonalnie `three-mesh-bvh` (MIT).

**Koszt:** 16-24 h wg mojej oceny, wiecej jesli dolozymy podglad 3D.

### 2. Analizator DXF pod wycinanie

**Zwraca:** laczna dlugosc ciecia, liczbe przebic, gabaryt, srednice
najmniejszego otworu, liste warstw oraz **ostrzezenia**: kontury otwarte,
duplikaty linii, otwory ponizej progu technologicznego.

**Dlaczego drugi:** najwieksza wartosc praktyczna. Zamienia plik w konkretna
liczbe do wyceny i wylapuje otwarty kontur, czyli blad, ktory kosztuje dwa dni
oczekiwania na odpowiedz od wykonawcy.

**Biblioteki:** `dxf-parser` (MIT, 0,19 MB) albo `@tarikjabiri/dxf` (MIT).

**Pulapki do obsluzenia uczciwie:** jednostki nie zawsze sa zadeklarowane,
wiec pytamy uzytkownika zamiast zgadywac. Splajny trzeba przyblizyc odcinkami,
wiec dlugosc jest przyblizona i trzeba to napisac. Bloki wymagaja rozwiniecia
z transformacja.

**Koszt:** 24-32 h.

### 3. Przegladarka STEP z pomiarem masy

**Zwraca:** strukture zlozenia, liczbe czesci, jednostki, system zrodlowy,
gabaryt, a po doladowaniu jadra takze objetosc i mase.

**Dlaczego trzeci:** najwiekszy koszt i jedyny, ktory wymaga doladowania
7,6 MB. Warto rozbic na dwa etapy: najpierw czytnik metadanych bez geometrii
(8-12 h, zero ciezaru), potem geometria jako rozszerzenie.

**Biblioteka:** `occt-import-js` (LGPL-2.1), ladowana **wylacznie na zadanie**,
nigdy w glownej paczce strony.

**Koszt:** 60-100 h wg oceny Codeksa dla pelnej wersji.

## Czego nie obiecujemy

| Rzecz | Powod |
|---|---|
| Ocena poprawnosci rysunku technicznego | wymaga wiedzy o funkcji czesci; ten sam zestaw wymiarow bywa kompletny dla tulei i niekompletny dla korpusu lozyska |
| Wykrywanie brakujacych wymiarow | jak wyzej |
| Walidacja tolerancji i pasowan | jak wyzej |
| Odczyt wymiarow z PDF | nie da sie wiarygodnie odroznic konturu detalu od linii wymiarowej i kreskowania; wynik wygladalby na pewny, bedac bezwartosciowym |
| Obsluga DWG | format zamkniety, a dostepne biblioteki sa na GPL albo AGPL |
| Odczyt SLDPRT, IPT, CATPart | formaty wlasnosciowe bez publicznej specyfikacji |
| Gwarancja drukowalnosci na kazdej drukarce | zalezy od konkretnej maszyny, dyszy i materialu |
| Przeliczenie PDF na poprawny CAD 2D | to jest osobny, duzo trudniejszy problem |
| Wycena produkcji jako prawda | zalezy od strategii konkretnego zakladu; mozna podac kalkulacje wedlug jawnych zalozen |

## Ryzyko, o ktorym trzeba pamietac przy wdrozeniu

**Uzytkownik uzna, ze narzedzie wie wiecej, niz wie.** Analizator poda mase
z dokladnoscia do grama, a ta masa zalezy od gestosci wybranej z listy i od
tego, czy siatka jest szczelna.

Dlatego przy kazdym wyniku musza byc **zalozenia wypisane obok liczby**,
nie w stopce. Przy masie: „przyjeta gestosc 7850 kg/m3, siatka szczelna,
wynik dla bryly pelnej".

Ta zasada jest tu wazniejsza niz przy kalkulatorach, bo uzytkownik nie wpisywal
danych recznie i latwiej mu zapomniec, skad sie wziely.
