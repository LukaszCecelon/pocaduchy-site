# Iteracja 2 z 5: krytyka i uzupelnienie (Claude)

Odnosze sie do 44 pomyslow z iteracji 1. Trzy rzeczy dzialaja, cztery sa slabe,
a piec waznych kategorii w ogole nie padlo.

## A. Co jest dobre i zostaje

- **Kalkulator PERT (7)** - artykul o szacowaniu czasu juz ma ten wzor w KaTeX.
  Doklejenie do niego dzialajacego kalkulatora to kilkanascie linii kodu.
- **Kalkulator kosztu braku standaryzacji (10)** - odtwarza liczbe, ktora Lukasz
  juz podal w artykule (5 godzin na uchwycie). Czytelnik podstawia swoje dane.
- **Konfigurator doboru sprzegla (1)** - artykul ma juz gotowe 4 kryteria i dane
  strukturalne HowTo. Kalkulator jest ich naturalnym przedluzeniem.
- **Konfigurator stacji roboczej pod CAD (23)** - artykul o narzedziach ma tabele
  wymagan. Latwo zamienic na doradce.

## B. Co odpada i dlaczego

- **Quizy (21, 31, 34)**. Quiz zaklada, ze jest jedna dobra odpowiedz. Cala teza
  Lukasza brzmi "jak zwykle, to zalezy". Quiz lamie jego glos i brzmi jak
  content marketing z 2015 roku. Odpada.
- **Mapa dyskusji LinkedIn (42), glosowanie na nastepne narzedzie (44),
  formularz propozycji (43)**. Wymagaja moderacji i ciaglego dowozenia. Jedna
  osoba po godzinach tego nie utrzyma, a pusta tablica glosowania wyglada gorzej
  niz jej brak.
- **Lokalny schowek konstruktora (37) i skladana checklista (38)**. Nikt nie
  wraca na strone inzyniera po to, zeby uzyc jej schowka. To rozwiazanie szukajace
  problemu.
- **Generator pierwszego komentarza (36)**. To narzedzie dla Lukasza, nie dla
  odwiedzajacego. Nie na strone.

## C. Piec rzeczy, ktorych zabraklo

### C1. NAJWIEKSZE PRZEOCZENIE: kalkulator pasowan i tolerancji

W audycie SEO fraza "tabela pasowan H7 f7" wyszla jako najczesciej szukana rzecz
w tej niszy po polsku. Konstruktor sprawdza to co tydzien, a polskie zasoby to
glownie skany tabel z podrecznika w PDF.

Interaktywnie: uzytkownik wpisuje srednice nominalna i wybiera pasowanie
(H7/g6, H7/h6, H7/k6, H7/p6, H7/f7...), dostaje odchylki gorne i dolne, luz
albo wcisk minimalny i maksymalny, plus jedno zdanie, do czego to pasowanie sluzy.
Dane z ISO 286 sa tabelaryczne i mieszcza sie w pliku JSON.

To jest jednoczesnie najwiekszy magnes na ruch i najwiekszy magnes na linki
z forow inzynierskich. Zaden inny pomysl z listy nie ma tego potencjalu.

### C2. Kalkulator momentu dokrecania srub

Druga najczestsza rzecz sprawdzana przez konstruktora: M8 klasa 8.8, jaki moment?
Wejscie: rozmiar gwintu, klasa wytrzymalosci, wspolczynnik tarcia, smarowane
czy nie. Wyjscie: moment w Nm i sila wstepnego napiecia. Dane tablicowe,
zero backendu, evergreen, wysoki wolumen wyszukiwan.

### C3. Interaktywnosc WEWNATRZ artykulow, nie obok nich

Iteracja 1 traktuje kazde narzedzie jak osobna strone. To blad. Kalkulator PERT
wstawiony w artykul dokladnie tam, gdzie stoi wzor, robi trzy rzeczy naraz:
wydluza czas na stronie (AdSense), podnosi ocene tresci w Google i nie wymaga,
zeby ktokolwiek szukal zakladki "Narzedzia".

Proponuje nowy typ bloku tresci obok istniejacych (tekst, obraz, tabela, wzor,
rysunek): blok **"narzedzie"**, ktory renderuje wskazany widget w srodku artykulu.
Silnik blokow juz istnieje w src/components/BlockRenderer.js, wiec to rozszerzenie,
nie przebudowa.

### C4. Model 3D do obracania

Lukasz jest konstruktorem CAD, a na jego stronie nie ma ani jednego modelu, ktory
da sie obrocic. To najbardziej na miejscu interaktywnosc, jaka moze miec.
Web component model-viewer od Google obsluguje glTF, dziala bez backendu i bez
frameworka. STEP z Inventora eksportuje sie do glTF.

Przypadki uzycia: przekroj zlozenia ze sruba pasowana jako osia lozysk z artykulu
o handlowkach, albo model sprzegla z artykulu o sprzeglach. Czytelnik obraca
i widzi to, czego nie widac na plaskim zdjeciu.

Ryzyko do zaadresowania: waga pliku i Core Web Vitals. Model laduje sie leniwie,
dopiero po kliknieciu w miniature.

### C5. Wyszukiwarka po stronie

Siedem artykulow to jeszcze malo, ale przy dwudziestu brak wyszukiwarki zaczyna
bolec. Docusaurus ma gotowe rozwiazania offline (local search), ktore dzialaja
bez backendu. To interaktywnosc niewidoczna, ale najczesciej uzywana.

## D. Ograniczenia, ktorych iteracja 1 nie uwzglednila

1. **Core Web Vitals.** Na stronie jest AdSense, ktory sam w sobie obciaza
   ladowanie. Kazdy ciezki widget dolozony do tego pogarsza pozycje w Google.
   Zasada: widget laduje sie leniwie i wazy mniej niz 50 kB, albo go nie ma.
2. **Dostepnosc.** Kalkulator to formularz. Musi dzialac z klawiatury i miec
   etykiety, inaczej wypada z niego czesc uzytkownikow i punktuje to Lighthouse.
3. **Bez wynikow zapisywanych na serwerze.** Kazdy wynik musi dac sie
   skopiowac do schowka albo wydrukowac, bo inaczej uzytkownik go traci.
4. **Dane normatywne a prawo autorskie.** Wartosci liczbowe z ISO 286 czy z tablic
   momentow to fakty i wolno je podac, ale nie wolno skopiowac cudzej tabeli
   wraz z jej ukladem i opisami. Trzeba zbudowac wlasna.

## E. Zadanie na iteracje 3

Codex: odnies sie do tej krytyki. Konkretnie:
1. Czy zgadzasz sie z odrzuceniem quizow i rzeczy wymagajacych moderacji?
   Jesli nie, uzasadnij.
2. Rozwin C1 i C2 do poziomu specyfikacji: jakie dokladnie pola wejsciowe,
   jakie wyjscia, skad dane, ile pracy.
3. Oszacuj dla kazdego z pomyslow z sekcji A i C naklad w godzinach
   oraz ryzyko techniczne.
4. Wskaz, ktore pomysly z iteracji 1 warto uratowac, a ktore ja niesluszne
   pominalem.
