# Runda 4: korekty, RICE i MoSCoW (Claude)

Runda 3 zawiera cztery uwagi trafne i jedna, ktora uwazam za asekuranctwo.
Zaczynam od rozliczenia sie z nimi, potem priorytetyzacja.

---

## A. Przyjmuje

### A1. Testy dowodza stabilnosci, nie prawdziwosci

Racja i to jest wazna korekta. Napisalem w rundzie 2, ze testy jednostkowe
rozwiazuja ryzyko blednych danych. Nie rozwiazuja. Test wylapie, ze ktos
przypadkiem zmienil wartosc, ale nie powie, czy pierwotnie zostala dobrze
przepisana.

To sa dwa rozne problemy i potrzebuja dwoch roznych mechanizmow:

- **Prawdziwosc przy wprowadzaniu** to rezim ludzki: dwa niezalezne zrodla dla
  probki kontrolnej, zapis zrodla przy rekordzie, data weryfikacji.
- **Stabilnosc w czasie** to rezim maszynowy: testy na znanych wartosciach.

Jedno bez drugiego nie wystarcza.

### A2. Twarde pole `zakres` zamiast opisu w tekscie

Racja. Opis prozą zostanie pominiety przez czytelnika i nie da sie go
przetestowac. Zakres ma byc danymi, z ktorych generuje sie jednoczesnie
naglowek, komunikat poza zakresem i walidacja.

### A3. AdSense to nie ta sama sprzecznosc co numer 1

Racja, uproscilem. Polityka reklamowa patrzy na kompletnosc tematu i wartosc
strony jako calosci, a nie na kolejnosc elementow. Wniosek praktyczny:
lepiej opublikowac jeden temat skonczony niz piec zaczetych.

### A4. Blok decyzji zamiast tekstu SEO

Racja i to jest lepsze sformulowanie niz moje. Tekst pod tabela ma miec stala
strukture: zakres, kiedy stosowac, kiedy nie stosowac, typowe bledy, zrodla.
Wtedy nie jest wypelniaczem, tylko odpowiada na job 5 z rundy 1.

---

## B. Odrzucam

### Rysunek parametryczny jest za drogi

Codex pisze, ze generowanie SVG z danych "moze byc za drogie", bo rysunek
techniczny potrzebuje geometrii, skali, linii pomocniczych i kompromisow
wizualnych, i proponuje hybryde: geometria jako komponent React na temat.

Zgadzam sie co do hybrydy, ale nie co do jednostki. **Komponent piszemy raz na
TYP geometrii, nie raz na temat.** A typow jest kilka, nie kilkadziesiat:

1. walek z rowkiem obwodowym (pierscienie osadcze, uszczelnienia)
2. otwor z rowkiem obwodowym
3. podciecie na przejsciu srednic
4. nakielek na czole walka
5. otwor z gwintem i faza
6. rowek pod wpust

To pokrywa wiekszosc tematow, ktore w ogole chcemy robic. Kazdy komponent
przyjmuje nazwane wymiary i etykiety z danych.

Dlaczego to jest wazniejsze niz brzmi: **Codex sam podal test poprawnosci
architektury** ("jesli drugi temat powstanie szybciej niz pierwszy, architektura
jest dobra"). Przy rysunku pisanym na temat drugi temat kosztuje tyle samo co
pierwszy. Przy komponencie na typ geometrii drugi temat tego samego typu jest
prawie darmowy. Czyli hybryda per temat oblewa wlasny test Codeksa, a hybryda
per typ go zdaje.

Konsekwencja dla wyboru pierwszego tematu: ma nalezec do typu, ktory ma
NAJWIECEJ przyszlych tematow. Wracam do tego w czesci D.

---

## C. RICE: ktore tematy robic

Metoda RICE: Reach razy Impact razy Confidence, podzielone przez Effort.
Reach to szacunek miesiecznych zapytan w polskim Google, w skali 1 do 10.
Impact 1 do 3. Confidence 0.5 do 1. Effort w osobogodzinach.

| Temat | Typ geometrii | R | I | C | E | RICE |
|---|---|:--:|:--:|:--:|:--:|:--:|
| Rowki pod pierscienie osadcze (Seger) | walek + otwor z rowkiem | 7 | 3 | 0,9 | 14 | **1,35** |
| Momenty dokrecania srub | brak rysunku | 9 | 3 | 0,9 | 16 | **1,52** |
| Pasowania i tolerancje ISO 286 | brak rysunku | 10 | 3 | 0,8 | 45 | **0,53** |
| Rowki pod wpusty pryzmatyczne | rowek pod wpust | 6 | 3 | 0,9 | 16 | **1,01** |
| Nakielki | nakielek | 4 | 2 | 0,9 | 10 | **0,72** |
| Podciecia technologiczne | podciecie | 5 | 2 | 0,8 | 12 | **0,67** |
| Chropowatosc powierzchni | brak rysunku | 6 | 2 | 0,8 | 14 | **0,69** |
| GD&T | zlozony | 8 | 3 | 0,6 | 40 | **0,36** |

Wnioski, ktore nie sa oczywiste:

**Pasowania maja najwiekszy popyt i najgorszy wynik RICE.** To nie znaczy, ze
ich nie robimy. Znaczy, ze nie sa pierwsze. Przy 45 godzinach i zerowej
infrastrukturze to najgorszy mozliwy start.

**Momenty dokrecania wygrywaja**, ale nie maja rysunku, wiec nie zwaliduja
najwazniejszej czesci architektury. Sa doskonalym tematem numer dwa.

**Segery sa najlepszym pierwszym tematem** i uzasadniam to osobno.

---

## D. Decyzja: pierwszy temat to rowki pod pierscienie osadcze

Cztery powody, kazdy niezalezny:

1. **Geometria jest prosta i naprawde parametryczna.** Przekroj walka z rowkiem
   to kilka linii i trzy wymiary. Jesli parametryczne SVG ma sie sprawdzic,
   sprawdzi sie tu. Jesli nie sprawdzi sie tu, nie sprawdzi sie nigdzie
   i dowiemy sie o tym za 14 godzin, a nie za 45.
2. **Ten sam typ geometrii obsluzy od razu drugi wariant.** Rowek na walku
   (DIN 471) i rowek w otworze (DIN 472) to ten sam komponent z innymi danymi.
   Czyli juz w pierwszym temacie testujemy tezę o ponownym uzyciu.
3. **Zamknięty zbior danych.** Srednice od 3 do 100 mm to skonczona,
   przewidywalna tabela. Nie ma pokusy rozszerzania w nieskonczonosc,
   jak przy pasowaniach.
4. **Wysoki popyt przy zerowej polskiej konkurencji.** Konstruktor rysuje rowek
   pod Segera regularnie i za kazdym razem musi gdzies sprawdzic srednice
   rowka, szerokosc i promien. Dzis sprawdza w katalogu producenta albo
   w podreczniku.

Do tego jeden powod, ktory jest czysto praktyczny: **Lukasz zna ten temat
na pamiec**, wiec komentarz praktyka napisze w piętnascie minut, a nie
w dwie godziny.

---

## E. MoSCoW: zakres pierwszego wdrozenia

### Must have

- plik danych tematu z twardym polem zakresu, zrodlem i data weryfikacji
- tabela renderowana do HTML **przy budowaniu strony**, nie po zaladowaniu
- parametryczny komponent SVG dla typu "walek z rowkiem obwodowym"
- karta zaufania: kto, kiedy sprawdzil, na jakiej podstawie, jaki zakres
- blok decyzji: kiedy stosowac, kiedy nie, typowe bledy
- walidator danych uruchamiany przed buildem
- dane strukturalne i wpis w llms.txt generowane z tych samych danych

### Should have

- kalkulator "podaj srednice walka, dostaniesz wymiary rowka"
- komunikat poza zakresem zamiast bledu
- wyszukiwanie po synonimach (Seger, pierscien osadczy, DIN 471, zabezpieczenie osiowe)

### Could have

- kopiowanie wiersza tabeli do schowka
- CSV do pobrania
- drugi wariant (rowek w otworze) w tym samym wdrozeniu

### Won't have (swiadomie, w pierwszym wdrozeniu)

- wyszukiwarka calej bazy wiedzy
- generowanie PDF
- eksport DXF
- panel w Decap CMS do edycji tabel
- system zglaszania bledow z historia zmian

Ostatni punkt wymaga komentarza, bo Codex stawial go wysoko w Kano jako cecha
zachwycajaca. Zgadzam sie, ze jest wartosciowy, ale przy jednym temacie
historia zmian jest pusta i wyglada smiesznie. Wchodzi przy trzecim temacie.

---

## F. Zadanie na runde 5

Codex, to jest przedostatnia runda. Chce od Ciebie czterech rzeczy:

1. **Zaatakuj wybor Segerow jako pierwszego tematu.** Czy naprawde jest lepszy
   niz momenty dokrecania, ktore maja wyzszy RICE? Policz to.
2. **Zaatakuj tezę o komponencie na typ geometrii, nie na temat.** Ile realnie
   jest typow, jesli policzyc uczciwie? Czy szesc to nie jest myslenie zyczeniowe?
3. **Zaprojektuj schemat pliku danych.** Konkretny, z nazwami pol, dla tematu
   "rowki pod pierscienie osadcze". Ma obslugiwac: zakres, zrodlo, date
   weryfikacji, dwie klasy tresci (normatywna i subiektywna), wymiary tabeli,
   etykiety rysunku i synonimy. Pokaz fragment realnego JSON-a, nie opis.
4. **Wskaz, czego w tej dyskusji nadal brakuje.** Cztery rundy to duzo,
   ale na pewno cos przeoczylismy oba.

Bez myslnika em dash.
