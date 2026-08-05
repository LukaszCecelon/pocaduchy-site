# Kalkulatory na pocaduchy.pl: finalna dziesiatka

Konwergencja dwoch niezaleznych analiz: `kalkulatory-claude.md`
i `kalkulatory-codex.md`.

## Zasada, ktora rzadzi cala lista

Kalkulator ma sens tylko wtedy, gdy **wygrywa z tabela**. Tabela laduje sie
natychmiast, indeksuje w Google i da sie ja powiesic przy stanowisku.
Kalkulator zaczyna miec przewage, gdy przestrzen wejsc jest ciagla, gdy wynik
wymaga lancucha dzialan albo gdy **trzeba policzyc w druga strone**.

Ostatni przypadek jest najwazniejszy i najczesciej pomijany. Realne pytanie
konstruktora brzmi „jaki silownik uniesie 400 N", a nie „jaka sile da ten
silownik". Tabela odpowiada tylko na drugie.

## Dziesiec pozycji

| # | Kalkulator | Skad | Dlaczego wchodzi | Ryzyko | Koszt |
|---|---|---|---|---|---|
| 1 | Wspolrzedne otworow na okregu podzialowym | Codex | uzywane przy kazdym kolnierzu i tarczy, zero ryzyka, wynik wprost do CAD-a | zadne | 4-6 h |
| 2 | Rozwiniecie blachy gietej | Claude | cztery zmienne naraz, tabela nie ma szans; szuka tego konstruktor i blacharnia | niskie | 8-12 h |
| 3 | Czas cyklu ruchu liniowego | Claude | liczone przy kazdej maszynie taktowanej, a wzor ma przypadek graniczny, o ktorym latwo zapomniec | niskie | 6-10 h |
| 4 | Sila silownika, liczona w obie strony | obie | odwracalnosc; laczy sie z artykulem o elektrozaworach | srednie | 8-12 h |
| 5 | Zuzycie powietrza przez silownik | Codex | para do poprzedniego, ale odpowiada na inne pytanie: ile to kosztuje i czy sprezarka wyrobi | niskie | 8-12 h |
| 6 | Masa i koszt polfabrykatu | obie | etap koncepcji, gdy modelu jeszcze nie ma, a trzeba dobrac manipulator albo ocenic transport | niskie | 6-8 h |
| 7 | Pasowanie na luz i odwrotnie | Claude | tabela pasowan ma dwa wymiary naraz, a konstruktor czesto idzie od strony wymaganego luzu | niskie | 8-10 h |
| 8 | Zmiana luzu od temperatury | Codex | najbardziej ekspercki temat z listy i najwieksza luka po polsku; para do poprzedniego | srednie | 8-10 h |
| 9 | PERT: szacowanie czasu projektowania | obie | najtanszy, zero ryzyka, artykul o tej metodzie **juz jest na stronie** | zadne | 4-6 h |
| 10 | Moment dokrecania z wlasnym tarciem | Claude | jedyny, ktory tlumaczy, dlaczego katalogi podaja rozne wartosci | **wysokie** | 10-14 h |

## Kolejnosc wdrozenia

Nie wedlug popytu, tylko wedlug stosunku wartosci do ryzyka i kosztu.

**Etap 1, dowod ze to dziala:** wspolrzedne otworow, PERT.
Oba tanie, oba bez ryzyka. Przy pierwszym powstaje cala infrastruktura:
komponent formularza, walidacja, sposob pokazywania wyniku i zalozen.
Drugi sprawdza, czy infrastruktura naprawde jest wielokrotnego uzytku.

**Etap 2, popyt:** rozwiniecie blachy, czas cyklu, masa polfabrykatu.

**Etap 3, pneumatyka jako komplet:** sila silownika plus zuzycie powietrza,
razem z istniejacym artykulem o elektrozaworach. Trzy powiazane strony
buduja skupisko tematyczne, ktore Google ceni wyzej niz pojedyncze strony.

**Etap 4, dopiero gdy reszta dziala:** pasowanie i luz, luz od temperatury,
moment dokrecania.

Moment dokrecania jest ostatni celowo. To najciekawszy kalkulator z listy
i jednoczesnie jedyny, przy ktorym bledne uzycie konczy sie urwana sruba
w pracujacej maszynie.

## Warunek, ktory dotyczy wszystkich

**Sam formularz nie wypozycjonuje sie na nic.** Google indeksuje strone
kalkulatora slabo, bo tresc powstaje dopiero po interakcji uzytkownika.

Kazdy kalkulator musi wiec miec obok siebie tresc czytelna dla robota:

- wzor zapisany jawnie, nie ukryty w kodzie,
- wyjasnienie, skad sie bierze i co oznacza kazdy symbol,
- **przyklad liczbowy rozwiazany krok po kroku**,
- tabela typowych wartosci dla najczestszych przypadkow,
- zalozenia wypisane przy wyniku, nie w stopce strony.

To jest wazniejsze niz sam kalkulator. Bez tego powstanie narzedzie,
ktorego nikt nie znajdzie.

## Czego swiadomie nie robimy

| Pomysl | Powod |
|---|---|
| Ugiecie belki albo profilu | wynik decyduje o bezpieczenstwie, strona nie jest biurem obliczeniowym; Codex sam ocenil bezpieczenstwo tego pomyslu na 2 z 5 |
| Sruba trapezowa przy osiach pionowych | to samo: opadniecie osi pionowej to wypadek, nie usterka |
| Dobor lozyska z trwaloscia L10 | wzor jest publiczny, ale realny dobor wymaga obciazen zastepczych, ktorych uzytkownik nie poda poprawnie |
| Przelicznik jednostek | kazdy telefon ma to wbudowane |
| Gestosci materialow, chropowatosc, otwor pod gwint | to sa tabele, nie kalkulatory |

Kalkulator wyglada na autorytet. Liczba na ekranie sprawia wrazenie pewnej,
nawet gdy zalezy od dziesieciu zalozen. To jest powod, dla ktorego ta lista
jest krotsza, niz mogla by byc.

## Gdzie sie roznilismy

Codex mocniej stawial na **pneumatyke i napedy**, bo tam widzi luke w polskim
internecie. Mial racje przy zuzyciu powietrza: to pytanie, ktore zadaje sobie
kazdy, kto dobiera sprezarke, a nie ma na nie dobrej odpowiedzi po polsku.

Ja mocniej stawialem na **rzeczy liczone codziennie** niezaleznie od branzy:
rozwiniecie blachy, czas cyklu, masa. Uwazam, ze przy budowie ruchu warto
zaczac od tego, co dotyczy wiekszej liczby ludzi.

Najlepszy pojedynczy pomysl przyszedl od Codeksa: **wspolrzedne otworow na
okregu podzialowym**. Prosty, bezpieczny, uzywany stale, a jego wynik idzie
wprost do modelu. Nie mialem go na swojej liscie i to byl blad.
