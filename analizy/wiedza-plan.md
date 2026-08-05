# Zakladka Wiedza: plan wdrozenia dziesieciu tematow

Podsumowanie po burzy mozgow (Claude + Codex) i researchu ze zrodlami.
Material zrodlowy: `wiedza-burza-claude.md`, `wiedza-burza-codex.md`,
`wiedza-research-1.md`, `wiedza-research-2.md`.

## Kolejnosc wdrazania

Nie alfabetyczna i nie wedlug popytu. Kolejnosc wynika z trzech rzeczy:
ile infrastruktury powstaje przy okazji, jak temat laczy sie z istniejacymi
artykulami i jak duze jest ryzyko merytoryczne.

| # | Temat | Typ | Dlaczego w tym miejscu | Szacunek |
|---|---|---|---|---|
| 1 | Rowek pod pierscien osadczy | tabela + rysunek | przy nim powstaje cala infrastruktura Wiedzy; dane najpewniejsze z calej dziesiatki | 28-40 h |
| 2 | Gwinty metryczne | tabela | ten sam typ co pierwszy, wiec sprawdza, czy architektura dziala | do 6 h |
| 3 | Wpusty pryzmatyczne | tabela + rysunek | linkuje sie z artykulem o polaczeniu wal-piasta | 6-8 h |
| 4 | Pasowania H7/g6 | poradnik + tabela | duzy popyt, ale wymaga ostroznego zakresu | 10-14 h |
| 5 | Chropowatosc Ra i Rz | tabela + koszt | kolumna kosztowa to nasza przewaga nad kazdym innym zrodlem | 8-12 h |
| 6 | Profile aluminiowe | tabela | wysoki popyt przy budowie stanowisk, dane katalogowe | 10-14 h |
| 7 | Nitonakretki i nity | tabela | dane katalogowe, realna luka po polsku | 8-12 h |
| 8 | Sila silownika | kalkulator | pierwszy kalkulator, wiec droższy; linkuje sie z elektrozaworami | 12-16 h |
| 9 | Kolki bazujace | poradnik | najwieksze odroznienie, ale najwiecej wiedzy wlasnej Lukasza | 8-12 h |
| 10 | Momenty dokrecania | tabela | najwiekszy popyt i najwieksze ryzyko; dopiero gdy reszta dziala | 10-14 h |

Krok 2 jest testem architektury. Jesli drugi temat tego samego typu zajmie
wiecej niz 6 godzin, cos jest zle zaprojektowane i wracamy do projektu,
zamiast brnac dalej.

## Co sprawdzilem po Codeksie

### Blad, ktory trafilby na strone

Tabela pasowan miala przedzialy srednic przypisane do zlych wierszy:
30-40, 40-50 i 50-65 zamiast 30-50, 50-80 i 80-120. Wartosci liczbowe byly
poprawne, ale opisane niewlasciwym zakresem. Konstruktor projektujacy wal
45 mm odczytalby dane pasma 50-80.

Poprawione po niezaleznym przeliczeniu z odchylek podstawowych i szeregow
tolerancji, nie przez przepisanie innego zrodla.

### Kontrole, ktore wypadly dobrze

- **Rowki DIN 471**: sprawdzone srednice 10, 12, 15, 20, 25, 30, 40, 50 mm.
  Zgodne.
- **Gwinty metryczne**: skoki i wiertla pod gwint poprawne w calym zakresie
  M3 do M20. Codex sam zglosil rozbieznosc przy M8 (6,75 kontra 6,8 mm)
  zamiast usredniac po cichu.
- **Sily silownikow**: przeliczone z F = p x A dla wszystkich szesciu srednic
  przy 6 bar. Zgodne co do niutona, a przyjete srednice tloczysk odpowiadaja
  ISO 15552.
- **Momenty dokrecania**: przeliczone wzorem VDI 2230 przy wspolczynniku
  tarcia 0,14. Wartosci z raportu sa nizsze o 1 do 8 procent, co miesci sie
  w normalnym rozrzucie.

### Rozbieznosc, ktora sama uzasadnia ostroznosc

Dla sruby M12 klasy 8.8 trzy zrodla podaja: Wurth 93 Nm, MISUMI 99,8 Nm,
wzor VDI przy tarciu 0,14 daje 103 Nm. **Rozrzut okolo 10 procent miedzy
powaznymi zrodlami.** To jest najmocniejszy argument za tym, zeby publikowac
te tabele wylacznie jako punkt startowy.

## Do rozstrzygniecia przez Lukasza

1. **Momenty dokrecania: publikujemy czy nie.** Najwiekszy popyt z calej
   dziesiatki i jednoczesnie jedyny temat, przy ktorym bledne uzycie danych
   moze skonczyc sie urwana sruba w pracujacej maszynie. Jesli publikujemy,
   to z trybem `punkt-startowy`, pelna lista czynnikow i jawnym odeslaniem
   do dokumentacji zlacza.

2. **Rozstrzygniecie prawne.** Zasada, ktora stosujemy: dane z publicznych
   katalogow producentow tak, wlasny uklad tabeli tak, wycinek uzytkowy
   zamiast kompletu tak, kopia dokumentu normy nie. Warto to raz przepuscic
   przez prawnika, bo strona ma reklamy, czyli jest komercyjna.

3. **Ile czasu Lukasz chce w to wlozyc.** Pierwszy temat to tydzien wieczorow.
   Kanal YouTube jest zrodlem rozpoznawalnosci, baza wiedzy nie jest.

4. **Warstwa wlasna.** W researchu jest sporo miejsc oznaczonych jako
   wymagajace wiedzy praktycznej. To wlasnie te fragmenty decyduja, czy
   strona jest kolejnym przedrukiem katalogu, czy materialem, pod ktorym
   podpisuje sie konstruktor.
