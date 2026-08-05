# Kalkulatory: zestawienie po dwoch rundach

Pula po dwoch rundach i czterech niezaleznych listach: **27 unikalnych
pomyslow**. Zrodla: `kalkulatory-claude.md`, `kalkulatory-codex.md`,
`kalkulatory-runda2-claude.md`, `kalkulatory-runda2-codex.md`.

## Najwazniejszy sygnal z drugiej rundy

**Claude i Codex niezaleznie od siebie postawili na pierwszym miejscu to samo:
skladanie tolerancji w lancuchu wymiarowym.** Dwie analizy prowadzone osobno,
bez wgladu w siebie nawzajem, wskazaly ten sam pomysl jako najmocniejszy.

To jest najsilniejsza przeslanka, jaka mozna dostac z takiego procesu.

## Dziesiatka do wdrozenia

Kolejnosc wynika ze stosunku wartosci do ryzyka i kosztu, a nie z samego popytu.

| # | Kalkulator | Skad | Dlaczego tutaj | Ryzyko | Koszt |
|---|---|---|---|---|---|
| 1 | Przelicznik konstruktora | Lukasz | najwyzszy staly popyt, zero ryzyka, wersji po polsku zawezonej do jednostek technicznych po prostu nie ma | zadne | 6-8 h |
| 2 | Wspolrzedne otworow na okregu | Codex r1 | uzywane przy kazdym kolnierzu, wynik idzie wprost do CAD-a; przy nim powstaje infrastruktura | zadne | 4-6 h |
| 3 | Lancuch wymiarowy | **obie r2** | rozwiazuje najczestsza przyczyne tego, ze czesci nie pasuja przy montazu; zero konkurencji po polsku | niskie | 10-14 h |
| 4 | Druk 3D: masa, filament, koszt | obie r2 | jedyny, ktory laczy sie z **kanalem YouTube**, czyli z jedyna publicznoscia, jaka juz jest | zadne | 8-10 h |
| 5 | Optymalizator ciecia pretow i profili | Codex r2 | oszczednosc jest natychmiast materialowa, a wynikiem jest plan ciecia, nie liczba | niskie | 12-16 h |
| 6 | Rozwiniecie blachy gietej | Claude r1 | cztery zmienne naraz, tabela nie ma szans; szuka tego konstruktor i blacharnia | niskie | 8-12 h |
| 7 | Czas cyklu ruchu liniowego | Claude r1 | liczone przy kazdej maszynie taktowanej, wzor ma przypadek graniczny latwy do przeoczenia | niskie | 6-10 h |
| 8 | Sila silownika w obie strony | obie r1 | odwracalnosc; razem z nastepnym i artykulem o elektrozaworach tworzy skupisko tematyczne | srednie | 8-12 h |
| 9 | Zuzycie powietrza przez silownik | Codex r1 | pytanie kazdego, kto dobiera sprezarke, bez dobrej odpowiedzi po polsku | niskie | 8-12 h |
| 10 | Chropowatosc z posuwu i promienia naroza | Claude r2 | laczy konstruktora z technologiem: ostrzejsza chropowatosc to decyzja o czasie obrobki, nie kosmetyka | niskie | 6-8 h |

## Co wypadlo z pierwszej dziesiatki i dlaczego

**PERT spadl z pierwszego miejsca poza dziesiatke.** W pierwszej rundzie
postawilem go najwyzej, bo jest najtanszy i ma gotowy artykul na stronie.
Codex zakwestionowal to argumentem, ktoremu nie umiem nic przeciwstawic:
**popyt inzynierski jest niski**. Nikt nie wpisuje w Google „kalkulator PERT",
gdy projektuje maszyne. Rola taniego pierwszego wdrozenia lepiej pelni
kalkulator wspolrzednych otworow, ktory przy tym samym koszcie ma realny popyt.

**Moment dokrecania z wlasnym tarciem** zostaje w zapasie, nie w dziesiatce.
Nadal uwazam go za najciekawszy merytorycznie, bo jako jedyny tlumaczy,
dlaczego katalogi podaja rozne wartosci dla tej samej sruby. Ale ma najwyzsze
ryzyko z calej puli i powinien powstac dopiero, gdy reszta dziala.

**Masa polfabrykatu, pasowanie i luz, luz od temperatury** przegraly
z mocniejszymi pozycjami drugiej rundy. Zostaja w zapasie.

## Zapas, uporzadkowany wedlug sily

1. Kompensacja skurczu wydruku 3D (Codex r2) - laczy sie z kanalem
2. Pozycja rzeczywista GD&T z MMC (Codex r2) - trudne do policzenia recznie
3. Moment dokrecania z wlasnym tarciem (Claude r1) - najciekawszy, najwieksze ryzyko
4. Pasowanie na luz i odwrotnie (Claude r1)
5. Czas frezowania i objetosc wiora (Codex r2)
6. Masa i koszt polfabrykatu (obie r1)
7. Dlugosc pasa albo lancucha przy rozstawie osi (Claude r2)
8. Moment i bezwladnosc zredukowana przez przekladnie (Claude r2)
9. Zmiana luzu od temperatury (Codex r1)
10. Modul przekroju i moment bezwladnosci figur (Claude r2)
11. Nacisk powierzchniowy pod lbem sruby (Claude r2)
12. Energia uderzenia i dobor zderzaka (Claude r2)
13. Dobor sprezyny naciskowej (Claude r2)
14. Pokrycie lakierem proszkowym (Codex r2)
15. Koszt jednostkowy partii z amortyzacja przygotowania (Codex r2)
16. Wycena ciecia laserem (Codex r2)
17. Przeplyw objetosciowy FDM i maksymalna predkosc druku (Codex r2)
18. PERT (obie r1)

## Gdzie sie roznilismy w drugiej rundzie

Codex poszedl w **wycene i technologie wykonania**: optymalizacja ciecia,
czas frezowania, koszt partii, pokrycie lakierem, wycena lasera. To kierunek,
ktorego w ogole nie ruszylem, a ma sens: te pytania zadaje sobie kazdy, kto
przygotowuje produkcje, i nikt nie odpowiada na nie po polsku.

Ja poszedlem w **dokumentacje i decyzje konstrukcyjne**: lancuch wymiarowy,
chropowatosc z posuwu, nacisk pod lbem, moduly przekroju.

Wziolem od Codeksa optymalizator ciecia, bo jako jedyny z jego grupy daje
**natychmiastowa oszczednosc materialowa**, a jego wynikiem jest gotowy plan,
nie liczba do przepisania. Reszte grupy wycenowej odlozylem, bo wyniki
zaleza mocno od konkretnego zakladu i latwo o wrazenie, ze kalkulator podaje
prawde, gdy podaje zalozenie.

## Warunek, ktory dotyczy kazdej pozycji

**Sam formularz nie wypozycjonuje sie na nic.** Google indeksuje strone
kalkulatora slabo, bo tresc powstaje dopiero po interakcji uzytkownika.

Kazdy kalkulator musi miec obok siebie: wzor zapisany jawnie, wyjasnienie
symboli, przyklad liczbowy rozwiazany krok po kroku, tabele typowych wartosci
oraz zalozenia wypisane przy wyniku, a nie w stopce.
