# Runda 2: inwersja, pre-mortem i sprzecznosci TRIZ (Claude)

Runda 1 dobrze zdefiniowala problem. Szczegolnie cenna jest kategoria "obojetne"
z modelu Kano, bo punkt 2 (dlugie teksty SEO przed tabela) stoi w jawnej
sprzecznosci ze standardowa rada SEO. Do tego wracam w czesci C.

W tej rundzie stosuje trzy metodyki: inwersje, pre-mortem i analize sprzecznosci
technicznych w ujeciu TRIZ.

---

## A. Inwersja: jak zagwarantowac porazke

Pytanie odwrocone: co trzeba zrobic, zeby ta baza wiedzy na pewno sie nie udala?
Lista ponizej to instrukcja katastrofy. Kazdy punkt ma odwrotnosc, ktora jest
wymaganiem projektowym.

1. **Zaczac od strony powitalnej z manifestem.** Trzy tygodnie na hero, animacje
   i tekst "czym jest nasza baza wiedzy", zero danych. Odwrotnie: pierwsza
   rzecz, ktora powstaje, to jedna kompletna tabela jednego elementu.
2. **Zrobic dwadziescia tematow po lebkach zamiast trzech porzadnie.** Kazdy
   niepelny, kazdy z dopiskiem "wkrotce". Odwrotnie: skonczony temat albo zaden.
3. **Przepisac tabele z podrecznika.** Szybko, wygodnie i narusza prawa autorskie
   do ukladu i opisow. Odwrotnie: wlasna struktura danych od zera.
4. **Nie zapisac, skad wzieto liczby.** Za rok nikt nie odtworzy, ktora wartosc
   skad pochodzi, wiec aktualizacja stanie sie niemozliwa.
5. **Trzymac wymiary osobno w tabeli, a osobno na rysunku.** Przy pierwszej
   korekcie jedno rozjedzie sie z drugim i nikt tego nie zauwazy.
6. **Zbudowac to jako aplikacje.** Ladny interfejs, ktorego Google nie widzi.
   Dokladnie blad mechabooka.
7. **Obiecac kompletnosc.** Naglowek "kalkulator pasowan ISO 286", a w srodku
   piec par. Uzytkownik czuje sie oszukany.
8. **Nie przewidziec, kto to utrzyma.** Dane w kodzie zrodlowym zamiast w plikach,
   ktore da sie poprawic bez programisty.

---

## B. Pre-mortem: jest rok 2028, projekt umarl

Wyobrazam sobie, ze mineły dwa lata i baza wiedzy jest martwa. Nikt z niej nie
korzysta, Lukasz o niej nie wspomina. Co sie stalo? Piec najbardziej
prawdopodobnych scenariuszy, od najczestszego.

### Scenariusz 1: umarla na trzecim temacie (prawdopodobienstwo: wysokie)

Pierwszy temat zajal 30 godzin zamiast 10, bo doszlo sprawdzanie danych.
Drugi poszedl szybciej. Przy trzecim skonczyl sie zapal, bo nie bylo widac
zadnego efektu w Search Console, a efekt pojawia sie po 4 do 6 miesiacach.
Strona zostala z trzema tematami i napisem "w budowie".

**Zabezpieczenie:** pierwszy temat musi byc na tyle waski, zeby zamknac go
w jednej sesji, i na tyle popularny, zeby dal sygnal w Search Console.
Do tego jawny warunek stopu: jesli po 6 miesiacach trzy tematy nie lapia
ruchu, nie robimy czwartego.

### Scenariusz 2: ktos znalazl blad w tabeli (prawdopodobienstwo: srednie, skutek: dotkliwy)

Konstruktor wpisal wartosc do rysunku, detal wyszedl zle, sprawa wrocila
na LinkedIn. Lukasz zdjal cala baze wiedzy, bo nie chcial ryzykowac reputacji.

**Zabezpieczenie:** to jest najgrozniejszy scenariusz i wymaga osobnej odpowiedzi
projektowej, nie tylko dopisku w stopce. Wracam do tego w czesci C, sprzecznosc 2.

### Scenariusz 3: dane sie zdezaktualizowaly i nikt tego nie zauwazyl (srednie)

Norma sie zmienila, tabela zostala. Strona wyglada na aktualna, bo nic nie
mowi o dacie sprawdzenia. Zaufanie spada wolno i po cichu.

**Zabezpieczenie:** data ostatniej weryfikacji przy kazdej tabeli, nie w stopce
serwisu. Plus przypomnienie w kalendarzu, nie w dobrych checiach.

### Scenariusz 4: Google tego nie zaindeksowal (srednie)

Zbudowalismy piekny interaktywny widget, ktory renderuje sie po stronie
przegladarki. Tabela jest w JavaScripcie. Google widzi pusta strone.
Powtorzylismy blad mechabooka w nowszej technologii.

**Zabezpieczenie:** tabela musi byc w HTML w momencie budowania strony,
a nie dorysowywana po zaladowaniu. To wymog architektoniczny, nie optymalizacja.

### Scenariusz 5: zjadl caly czas przeznaczony na kanal (niskie, ale realne)

Baza wiedzy to studnia bez dna. Lukasz przestal nagrywac, bo wprowadzal wymiary
pierscieni Segera. Kanal jest zrodlem jego rozpoznawalnosci, a baza wiedzy nie.

**Zabezpieczenie:** twardy budzet godzinowy na temat i zakaz przekraczania go
kosztem nagran.

---

## C. Sprzecznosci techniczne (TRIZ)

TRIZ mowi, ze prawdziwy przelom bierze sie z rozwiazania sprzecznosci, a nie
z kompromisu miedzy jej stronami. Znalazlem szesc sprzecznosci. Dla kazdej
podaje kompromis, ktory nasuwa sie pierwszy, i rozwiazanie, ktore sprzecznosc
usuwa zamiast ja dzielic.

### Sprzecznosc 1: Google chce tekstu, konstruktor nie chce tekstu

Wyszukiwarka potrzebuje treści, zeby zrozumiec i wypozycjonowac strone.
Uzytkownik chce liczby w trzy sekundy i kazdy akapit przed tabela go irytuje.

- **Kompromis (zly):** sredniej dlugosci tekst przed tabela. Przegrywa dwa razy,
  bo dla Google za krotki, a dla uzytkownika za dlugi.
- **Rozwiazanie (podzial w czasie):** sprzecznosc jest pozorna, bo dotyczy
  KOLEJNOSCI, nie obecnosci. Tabela na gorze, tresc pod nia. Google czyta cala
  strone niezaleznie od kolejnosci, uzytkownik czyta z gory. Obie strony
  dostaja swoje, nic nie trzeba poswiecac.
- **Wzmocnienie:** tresc pod tabela nie jest wypelniaczem SEO, tylko odpowiada
  na job numer 5 z rundy 1 (porownaj warianty i zdecyduj). Ten sam akapit
  sluzy Google i uzytkownikowi, ale kazdemu w innym momencie.

### Sprzecznosc 2: nazwisko autora pod liczba, a liczb ma byc duzo

Im wiecej danych, tym wieksza wartosc. Im wiecej danych, tym wieksze ryzyko,
ze ktoras jest bledna, a odpowiada za nia praktykujacy konstruktor.

- **Kompromis (zly):** mniej danych albo disclaimer w stopce. Pierwsze zabija
  wartosc, drugie nie chroni nikogo.
- **Rozwiazanie (segmentacja + uprzednie dzialanie):** rozdzielic dane na dwie
  klasy o roznym rezimie.
  - **Klasa A, dane normatywne** (wymiary, odchylki, momenty). Wprowadzane raz,
    z testami jednostkowymi na znanych wartosciach, ze zrodlem zapisanym przy
    kazdym rekordzie i data weryfikacji. Zmiana pliku bez przejscia testow jest
    niemozliwa.
  - **Klasa B, komentarz praktyka** ("zwykle biore H7/g6, bo..."). Jawnie
    oznaczony jako subiektywny, bez rezimu testow, bo nie jest twierdzeniem
    normatywnym.
  Uzytkownik widzi roznice miedzy jednym a drugim na pierwszy rzut oka.
  To jednoczesnie usuwa ryzyko i tworzy przewage, bo klasa B to dokladnie to,
  czego mechabook nie ma.

### Sprzecznosc 3: rysunek jest najlepsza nawigacja, a obrazki sa niewidoczne

Konstruktor mysli geometria i rozpoznaje rysunek szybciej niz nazwe. Ale
rysunek jako plik graficzny nie niesie tresci dla wyszukiwarki, wazy duzo
i nie skaluje sie na telefonie.

- **Kompromis (zly):** rysunek plus opis alternatywny. Lepsze niz nic, ale
  nadal dwa niezalezne byty, ktore moga sie rozjechac.
- **Rozwiazanie (przejscie w inny stan skupienia):** **rysunek jako SVG
  generowany z tych samych danych, z ktorych powstaje tabela.**
  - SVG to tekst, wiec wymiary na rysunku sa indeksowalne
  - skaluje sie bez utraty jakosci na kazdym ekranie
  - wazy kilka kilobajtow zamiast setek
  - a najwazniejsze: **nie da sie doprowadzic do rozjechania rysunku z tabela**,
    bo oba pochodza z jednego zrodla
  To jest scenariusz 5 z pre-mortem rozwiazany architektonicznie, a nie
  dyscyplina.

### Sprzecznosc 4: strona ma byc statyczna, a dane maja byc zywe

Brak backendu oznacza brak bazy danych i brak panelu administracyjnego.
Jednoczesnie chcemy tabel, kalkulatorow i danych, ktore da sie poprawiac.

- **Kompromis (zly):** dolozyc backend. Podnosi koszt, wprowadza utrzymanie
  serwera i lamie caly obecny model publikacji.
- **Rozwiazanie (uniwersalnosc, jedno zrodlo wielu funkcji):** plik JSON jako
  jedyne zrodlo prawdy, z ktorego przy budowaniu strony powstaje **wszystko naraz**:
  tabela HTML, rysunek SVG, dane wejsciowe kalkulatora, dane strukturalne
  JSON-LD dla Google oraz wpis w llms.txt dla modeli AI.
  Poprawka jednej liczby w jednym pliku aktualizuje piec rzeczy jednoczesnie.
  Zero backendu, a dane sa zywe.

### Sprzecznosc 5: kompletnosc buduje autorytet, a niekompletnosc jest jedyna realna

Pelna tabela 1 do 500 mm to autorytet i przewaga. Weryfikacja pelnej tabeli
to setki godzin, ktorych nie ma.

- **Kompromis (zly):** zrobic polowe i nie mowic o tym. Uzytkownik odkrywa brak
  w najgorszym momencie, czyli gdy juz zaufal.
- **Rozwiazanie (uczynic ograniczenie funkcja):** zakres jest **jawna czescia
  obietnicy**, a nie ukrytym brakiem. Naglowek mowi doslownie, co jest w srodku.
  Poza zakresem uzytkownik dostaje nie blad, tylko wskazowke, gdzie sprawdzic.
  Zamiast slabosci "niepelna tabela" powstaje sila "wiem dokladnie, co tu jest
  sprawdzone". To spojne z glosem Lukasza, ktory i tak zaznacza, gdzie kончy
  sie jego pewnosc.

### Sprzecznosc 6: AdSense chce tresci, narzedzie ma byc czyste

Strona z samym kalkulatorem bywa oznaczana jako niskiej wartosci. Strona
zawalona tekstem odstrasza uzytkownika i lamie cecha obojetna numer 2 z Kano.

- **Rozwiazanie:** to ta sama sprzecznosc co numer 1 i rozwiazuje ja to samo
  ulozenie. Tresc pod tabela jest merytoryczna i sluzy decyzji, wiec spelnia
  wymog AdSense, nie przeszkadzajac w szybkim odczycie.

---

## D. Wniosek po rundzie 2

Trzy sprzecznosci ukladaja sie w jedna zasade architektoniczna:

> **Jeden plik danych na temat. Z niego generuje sie tabela, rysunek SVG,
> kalkulator, dane strukturalne i wpis dla modeli AI. Wszystko powstaje
> przy budowaniu strony, wiec Google widzi gotowy HTML, a nie pusta ramke.**

Do tego dwie klasy tresci o roznym rezimie zaufania: dane normatywne z testami
i zrodlem, oraz komentarz praktyka oznaczony jako subiektywny.

To jest odpowiedz na pytanie "jak zrobic lepiej niz mechabook". Nie ladniej
i nie wiecej, tylko **z jednego zrodla i widoczne dla wyszukiwarki**.

---

## E. Zadanie na runde 3

Codex, w rundzie 3 stosujesz dwie metodyki:

**(A) SCAMPER na modelu mechabooka.** Przejdz kolejno: Substitute, Combine,
Adapt, Modify, Put to another use, Eliminate, Reverse. Dla kazdej litery
minimum dwa konkretne pomysly. Interesuje mnie zwlaszcza Eliminate i Reverse,
bo tam zwykle siedzi przewaga.

**(B) Przeglad technologiczny z kompromisami.** Dla kazdej decyzji podaj
minimum dwie opcje, wady i zalety, i rekomendacje. Decyzje do rozstrzygniecia:
1. Jak generowac rysunek SVG z danych: recznie pisany komponent React na temat,
   generator parametryczny, czy biblioteka. Co z wymiarowaniem i strzalkami.
2. Format pliku danych: JSON, YAML, CSV, czy cos innego. Jak zapisac zrodlo
   i date weryfikacji przy rekordzie.
3. Jak zapewnic, ze tabela jest w HTML przy budowaniu, a kalkulator dziala
   interaktywnie, w Docusaurusie ze static exportem.
4. Jak testowac dane. Jakie narzedzie, ile asercji, kiedy uruchamiane.
5. Wyszukiwanie w obrebie bazy wiedzy i po synonimach (job 8 z rundy 1).
6. Czy da sie z tych samych danych generowac cos do pobrania, na przyklad PDF
   albo plik do CAD, i czy warto.

Bez myslnika em dash.
