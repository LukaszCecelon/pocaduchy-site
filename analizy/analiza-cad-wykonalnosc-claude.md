# Analiza modeli CAD i rysunkow 2D na stronie: wykonalnosc (Claude)

Ocena niezalezna od Codeksa.

## Odpowiedz w jednym zdaniu

**Da sie, ale nie to, o czym zwykle sie mysli.** Da sie zmierzyc i policzyc.
Nie da sie zrozumiec i ocenic.

To rozroznienie jest cala trescia tego dokumentu.

## Warunek brzegowy, ktory rzadzi wszystkim

Hosting jest statyczny. Nie ma serwera, wiec **caly plik uzytkownika musi byc
przetworzony w jego wlasnej przegladarce**.

To wyglada na ograniczenie, a jest **najwieksza przewaga tego pomyslu**.

Konstruktor nie wrzuci modelu klienta na losowa stronę w internecie. Ma
w umowie zakaz, a jesli nie ma, to ma zdrowy rozsadek. Kazde istniejace
narzedzie do analizy CAD w sieci wysyla plik na serwer.

Nasze nie wysyla. I da sie to **udowodnic**, a nie tylko obiecac: strona nie
ma zadnego kodu wysylajacego dane, a uzytkownik moze odlaczyc internet po
zaladowaniu strony i narzedzie nadal zadziala. To jest test, ktory kazdy moze
sam przeprowadzic w 10 sekund.

**Zdanie do umieszczenia na stronie:** „Odlacz internet i sprawdz, ze nadal
dziala. Twoj plik nigdy nie opuszcza tego komputera."

Zaden konkurent z backendem tego nie napisze.

---

## Format po formacie

### STL: latwe i wartosciowe

Format trywialny. Trojkaty i nic wiecej, wersja tekstowa i binarna, obie
proste do odczytania.

Co da sie policzyc **wiarygodnie**:

- objetosc (suma objetosci czworoscianow od poczatku ukladu)
- pole powierzchni
- gabaryt i wymiary skrajne
- masa po wybraniu materialu z listy gestosci
- srodek ciezkosci
- liczba trojkatow, czyli jakosc siatki
- **szczelnosc siatki**: czy kazda krawedz nalezy dokladnie do dwoch trojkatow
- **zwisy**: udzial powierzchni nachylonej bardziej niz kat graniczny, przy
  zadanym kierunku druku
- porownanie kilku orientacji druku pod katem powierzchni podpieranej

Co jest **tylko orientacyjne**:

- wykrywanie cienkich scianek. Da sie oszacowac, ale porzadnie to zrobic
  wymaga liczenia odleglosci wewnetrznych i wychodzi drogo. Lepiej nie
  obiecywac dokladnosci.

Czego **nie da sie** z STL: wymiarow nominalnych, tolerancji, gwintow, cech
konstrukcyjnych. STL nie wie, ze cos jest otworem. Wie tylko, ze sa tam
trojkaty.

**Koszt:** 16-24 h. **Wiarygodnosc:** wysoka poza cienkimi sciankami.
**Wartosc:** bardzo duza, bo laczy sie wprost z kanalem o druku 3D.

### DXF: srednio trudne i bardzo wartosciowe

Format tekstowy, dobrze udokumentowany. Biblioteki do odczytu w JavaScripcie
istnieja i sa dojrzale.

Co da sie policzyc:

- **laczna dlugosc ciecia**, po zsumowaniu dlugosci wszystkich konturow
- **liczba przebic**, czyli liczba zamknietych konturow: to jest drugi
  skladnik wyceny ciecia laserem, obok dlugosci
- gabaryt detalu i powierzchnia prostokata opisanego
- **srednica najmniejszego otworu** i porownanie z regula technologiczna,
  ze otwor mniejszy niz grubosc blachy jest problematyczny
- inwentarz warstw, tekstow i blokow
- **wykrycie konturow otwartych**, czyli najczestszego bledu w plikach
  wysylanych do wycinania

Ten ostatni punkt jest wart wiecej niz reszta razem. Otwarty kontur to plik,
ktory wroci od wykonawcy z pytaniem, i strata dwoch dni.

Pulapki, ktore trzeba obsluzyc uczciwie:

- **jednostki**: DXF nie zawsze deklaruje, czy to milimetry czy cale.
  Trzeba zapytac uzytkownika, a nie zgadywac
- **bloki**: geometria w blokach wymaga rozwiniecia razem z transformacja
- **splajny**: trzeba przyblizyc odcinkami, wiec dlugosc bedzie przyblizona
  i trzeba to napisac
- **duplikaty**: nalozone na siebie linie zawyzaja dlugosc ciecia, warto je
  wykrywac

**Koszt:** 24-32 h. **Wiarygodnosc:** wysoka przy prostej geometrii, dobra
przy splajnach z jawnym zastrzezeniem.

### STEP: trudne, i tu trzeba wybrac

STEP jest tekstowy, wiec **metadane** wyciaga sie latwo: nazwa produktu,
jednostki, autor, system, z ktorego pochodzi, liczba brył, liczba czesci
w zlozeniu, gabaryt z punktow.

Ale **objetosc, masa i pole powierzchni wymagaja jadra geometrycznego**,
bo STEP opisuje powierzchnie parametryczne, nie trojkaty. Trzeba obliczyc
reprezentacje brylowa.

Jedyna realna droga to OpenCascade skompilowany do WebAssembly. To dziala,
ale plik wazy od kilkunastu do kilkudziesieciu megabajtow.

**Moja rekomendacja: nie w pierwszej kolejnosci.** Nie dlatego, ze sie nie da,
tylko dlatego, ze stosunek kosztu do wartosci jest najgorszy z calej listy,
a wage strony mamy pod kontrola i szkoda ja psuc. Jesli kiedys, to jako
osobna podstrona ladowana na zadanie, nigdy na stronie glownej.

**Wersja lekka jest sensowna od razu:** czytnik metadanych STEP bez geometrii.
Odpowiada na pytanie „co ja wlasciwie dostalem od klienta": ile czesci,
w jakich jednostkach, z jakiego systemu. To jest 8-12 h i zero ciezaru.

### 3MF i OBJ: jak STL

3MF to zip z XML, niesie jednostki i kolory, wiec jest lepszy niz STL.
OBJ jest tekstowy i prosty. Oba warto obsluzyc **przy okazji** narzedzia do
STL, bo roznica to sam parser, a cala analiza jest wspolna.

**Koszt dodatkowy:** 6-8 h.

### DWG: nie

Format zamkniety. Otwarte biblioteki istnieja, ale sa niepelne i ryzykowne
licencyjnie. Odpowiedz dla uzytkownika: „zapisz jako DXF", i tyle.

### PDF: pozornie latwe, w praktyce zwodnicze

Da sie odczytac wektory i teksty przez pdf.js. Da sie policzyc dlugosc linii.

Nie da sie **wiarygodnie** powiedziec, ktora linia jest konturem detalu,
a ktora linia wymiarowa, ramka albo kreskowaniem przekroju. Bez tego
rozroznienia liczba jest bezwartosciowa, a **wyglada na wiarygodna**.

To jest gorsze niz brak narzedzia. Odradzam.

### Formaty zamkniete: nie

SLDPRT, IPT, CATPart to formaty wlasnosciowe bez publicznej specyfikacji.
Odpowiedz: eksport do STEP albo STL.

---

## Pytanie graniczne: czy da sie sprawdzic poprawnosc rysunku

**Nie.** I to nie jest kwestia nakladu pracy, tylko rodzaju problemu.

Zeby stwierdzic, ze na rysunku brakuje wymiaru, trzeba wiedziec, **co ten
detal ma robic**. Ten sam rysunek z tym samym zestawem wymiarow moze byc
kompletny dla tulei dystansowej i niekompletny dla korpusu lozyska.

Da sie sprawdzic rzeczy **formalne**: czy jest tabliczka, czy wszystkie
wymiary maja tolerancje, czy uzyto oznaczen chropowatosci, czy skala sie
zgadza. To jest lista kontrolna, a nie ocena poprawnosci, i tak nalezy to
nazwac.

Nazwanie tego „sprawdzaniem poprawnosci rysunku" byloby obietnica, ktorej
nie da sie dowiezc, a inzynier wykryje to przy pierwszym uzyciu i straci
zaufanie do calej strony.

---

## Trzy narzedzia, ktore proponuje

### 1. Analizator STL pod druk 3D

Wrzucasz plik, dostajesz: objetosc, mase w wybranym materiale, gabaryt,
pole powierzchni, szczelnosc siatki, udzial zwisow przy zadanym kacie
i porownanie kilku orientacji druku.

**Dlaczego pierwszy:** najlatwiejszy z trzech, najwyzsza wiarygodnosc wyniku
i jedyny, ktory laczy sie z kanalem YouTube. Do tego ma naturalne przedluzenie
w kalkulatorze filamentu, ktory juz jest na liscie.

**Koszt:** 16-24 h.

### 2. Analizator DXF pod wycinanie

Wrzucasz plik, dostajesz: dlugosc ciecia, liczbe przebic, gabaryt, najmniejszy
otwor, liste warstw i **ostrzezenia**: kontury otwarte, duplikaty linii,
otwory ponizej progu technologicznego.

**Dlaczego drugi:** najwieksza wartosc praktyczna z calej trojki, bo zamienia
plik w konkretna liczbe do wyceny i wykrywa blad, ktory kosztuje dwa dni.
Trudniejszy niz STL, ale nie o rzad wielkosci.

**Koszt:** 24-32 h.

### 3. Czytnik metadanych STEP

Wrzucasz plik, dostajesz: liczbe czesci, jednostki, gabaryt, system zrodlowy,
strukture zlozenia. Bez objetosci i masy.

**Dlaczego trzeci i dlaczego bez geometrii:** odpowiada na realne pytanie
„co ja dostalem od klienta" przy niskim koszcie, a pelna geometria wymaga
kilkudziesieciu megabajtow kodu i nie warta jest tej ceny na tym etapie.

**Koszt:** 8-12 h.

---

## Czego nie obiecujemy

| Rzecz | Powod |
|---|---|
| Ocena poprawnosci rysunku technicznego | wymaga wiedzy o funkcji detalu, nie o jego geometrii |
| Rozpoznawanie wymiarow i tolerancji z PDF | nie da sie wiarygodnie odroznic konturu od linii wymiarowej |
| Otwieranie SLDPRT, IPT, CATPart | formaty zamkniete bez publicznej specyfikacji |
| Objetosc i masa ze STEP w pierwszej wersji | wymaga jadra geometrycznego wazacego dziesiatki megabajtow |
| Wykrywanie cienkich scianek z gwarancja | mozliwe tylko orientacyjnie, wiec tak trzeba to nazwac |
| Porownywanie dwoch wersji modelu | osobny, duzo trudniejszy problem |

## Ryzyko, ktore widze

**Uzytkownik uzna, ze narzedzie wie wiecej, niz wie.** Analizator STL poda
mase z dokladnoscia do grama, a ta masa zalezy od gestosci, ktora uzytkownik
wybral z listy, i od tego, czy model ma poprawnie zamknieta siatke.

Dlatego przy kazdym wyniku musza byc **zalozenia wypisane obok liczby**,
a nie w stopce. Przy masie: „przyjeta gestosc 7850 kg/m3, siatka szczelna,
wynik dla modelu bez wypelnienia".

To jest ta sama zasada co przy kalkulatorach, tylko wazniejsza, bo tu
uzytkownik nie wpisywal danych recznie i latwiej mu zapomniec, skad sie wzialy.
