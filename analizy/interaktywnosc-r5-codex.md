# Iteracja 5 z 5: RED TEAM planu Claude'a

To jest atak na plan z iteracji 4, nie jego dopieszczanie. Najwiekszy problem planu Claude'a: miesza dwa cele, ktore wymagaja innych decyzji. Cel pierwszy to "sprawdzic, czy interaktywnosc w ogole ma sens". Cel drugi to "zbudowac ruch SEO na evergreenowych narzedziach technicznych". Fala 1 sprawdza glownie latwosc wdrozenia, nie wartosc dla strony.

## 1. Atak na fale 1: PERT i koszt standaryzacji moga byc latwym startem, ale slabym testem popytu

PERT i koszt braku standaryzacji sa wygodne technicznie, ale to nie znaczy, ze sa dobrym pierwszym ruchem biznesowo albo SEO.

Problem 1: niski popyt intencyjny. Sam Claude ocenil popyt obu narzedzi na 2/5. To oznacza, ze Fala 1 moze zakonczyc sie wynikiem "nikt nie uzywa", ale ten wynik bedzie nieinterpretowalny. Nie bedzie wiadomo, czy zawiodla interaktywnosc jako format, czy po prostu wybrano narzedzia o zbyt malym popycie.

Problem 2: PERT jest generyczny. Frazy typu "PERT wzor" albo "kalkulator PERT" nie sa unikalne dla konstrukcji maszyn. Uzytkownik moze byc studentem zarzadzania, kierownikiem IT albo osoba od budowlanki. To slaby test dla pocaduchy.pl, bo nie mierzy, czy narzedzia przyciagaja konstruktorow CAD.

Problem 3: koszt standaryzacji ma dobra zgodnosc z glosem Lukasza, ale slaby moment "musze to sprawdzic teraz". Konstruktor czesciej wpisze w Google "H7 g6 luz" albo "moment dokrecania M8 8.8" niz "ile kosztuje brak standaryzacji". Pierwsze dwa zapytania sa zadaniowe. Drugie jest refleksyjne. Zadaniowe wygrywa w narzedziach.

Problem 4: Fala 1 ma za slaby sygnal sukcesu. Przy stronie bez analityki zdarzen nie bedzie wiadomo, czy ktos wpisal dane w formularz. Search Console pokaze klikniecia i zapytania, ale nie pokaze uzycia kalkulatora. AdSense pokaze przychod i RPM, ale nie powie, czy kalkulator byl przyczyna.

Jesli nikt nie uzyje PERT i kosztu standaryzacji, plan nie powinien wyciagac wniosku "interaktywnosc nie dziala". Maksymalny uczciwy wniosek brzmi: "dwa lekkie narzedzia o niskim popycie nie wygenerowaly widocznego sygnalu".

Alternatywa: Fala 1 powinna miec jeden latwy widget i jeden widget zadaniowy.

- PERT: zostawic jako tani pilot techniczny, 4-7 h.
- Zamiast kosztu standaryzacji jako drugi pilot dac kalkulator momentu dokrecania w wersji bardzo waskiej: M6, M8, M10, klasy 8.8 i 10.9, trzy presety tarcia. Naklad 6-10 h, a popyt intencyjny 5/5.

Taki zestaw testuje dwie rzeczy naraz: czy latwo osadzic widget w artykule oraz czy techniczne narzedzie evergreenowe zaczyna lapac zapytania z Google.

## 2. Najwiekszy ukryty koszt: utrzymanie merytoryczne i odpowiedzialnosc za starzenie sie tresci

Najwiekszy niepoliczony koszt to nie implementacja Reacta. To utrzymanie zaufania do liczb i opisow przez 2-3 lata.

Plan liczy godziny wdrozenia, ale prawie nie liczy kosztu zycia narzedzia po publikacji. Dla statycznej strony to jest zdradliwe, bo narzedzie wyglada jak gotowy kalkulator, nawet jesli dane nie byly aktualizowane od dawna.

Koszty, ktorych brakuje:

1. Coroczny przeglad danych i disclaimerow.
   Minimalnie 2-4 h rocznie na kazde narzedzie normatywne. Przy 4 narzedziach to 8-16 h rocznie.

2. Walidacja merytoryczna po zmianie danych.
   Dla pasowan i srub sama zmiana JSON nie wystarczy. Trzeba sprawdzic przypadki graniczne. Minimum 20-30 asercji na kalkulator pasowan i 10-15 asercji na sruby. Pierwsze przygotowanie testow to 4-8 h, potem 1-2 h przy kazdej zmianie.

3. Obsluga maili od uzytkownikow.
   Jezeli narzedzie zacznie rankowac, beda pytania typu "dla fi 125 nie ma wyniku", "czemu M12 wyszlo inaczej niz w tabeli producenta", "czy moge tego uzyc do projektu". Nawet 2 maile miesiecznie po 15 minut to 6 h rocznie. Przy dobrym SEO moze byc wiecej.

4. Koszt reputacyjny bledu.
   Jeden blad w tabeli pasowan jest drozszy niz 20 h developmentu. Dla strony eksperckiej lepiej nie miec kalkulatora niz miec kalkulator, ktory raz poda zla wartosc i zostanie zacytowany na forum albo LinkedIn.

5. Koszt contentu pomocniczego.
   Narzedzie nie moze byc sama formatka, bo AdSense i SEO moga uznac to za cienka strone. Kazde narzedzie potrzebuje tekstu: kiedy uzywac, ograniczenia, przyklady, FAQ. To nie jest 1 h. Realnie 3-6 h na narzedzie, jesli ma byc dobre i po polsku.

Po doliczeniu utrzymania kalkulator pasowan nie kosztuje 25-35 h. Bardziej uczciwy koszt pierwszego roku to:

- wdrozenie i dane: 25-35 h;
- testy i przypadki kontrolne: 4-8 h;
- tekst SEO i FAQ: 4-6 h;
- korekta i druga weryfikacja: 3-6 h;
- utrzymanie w pierwszym roku: 3-6 h;
- razem: 39-61 h.

To nadal moze byc warte zrobienia, ale plan powinien przestac traktowac pasowania jako "Fala 2 ok. 45 h razem z blokiem i momentami". Sama porzadna wersja pasowan moze zjesc wiekszosc tej puli.

## 3. Zawezenie pasowan do 1-120 mm i pieciu par: dobre dla ryzyka, ryzykowne dla SEO

Zawezenie do 1-120 mm jest rozsadne uzytkowo, ale trzeba uczciwie powiedziec: to moze oslabic wartosc SEO, jesli strona bedzie wygladac jak niepelna tabela.

Zakres 1-120 mm prawdopodobnie pokrywa wiekszosc codziennej pracy konstruktorow maszyn. Szacunkowo 80-90 procent typowych zapytan warsztatowych dla walkow, tulei, lozyskowania pomocniczego, kolkow i elementow montazowych zmiesci sie w tym zakresie. Ale SEO nie dziala tylko na "wiekszosc przypadkow". SEO lapie tez long-tail.

Ryzyko:

- uzytkownik wpisuje "H7 g6 160" i widzi brak wyniku;
- Google indeksuje tresc jako kalkulator ograniczony, a konkurencyjna strona ma 1-500 mm;
- fora i linkujacy wola linkowac do pelnej tabeli, nie do wersji "popularne zakresy";
- naglowek "kalkulator pasowan H7/g6" tworzy oczekiwanie pelnego zakresu.

Piecdziesiat procent problemu da sie rozwiazac komunikacja, ale nie caly problem.

Lepsza alternatywa:

1. V1 danych: 1-120 mm i piec par, tak jak Claude proponuje.
2. UI nie udaje pelnosci. Naglowek: "Najczestsze pasowania H7 dla srednic 1-120 mm".
3. Dla srednic 120-500 mm pokazac kontrolowany stan braku, nie blad: "Ten zakres nie jest jeszcze w kalkulatorze. Sprawdz norme lub tabele producenta."
4. W tresci strony dodac jawna mape zakresu: obslugiwane pary i przedzialy.
5. Zaplanowac V1.1 jako rozszerzenie do 500 mm tylko wtedy, gdy Search Console pokaze zapytania zawierajace srednice powyzej 120, np. "H7 g6 160", "H7 h6 200", "pasowanie fi 250".

Czy piec par wystarczy? Dla MVP tak, ale wybor par musi byc oparty o intencje zapytan, nie o intuicje. Minimalny zestaw SEO powinien zawierac:

- H7/h6;
- H7/g6;
- H7/f7;
- H7/k6;
- H7/p6.

Jesli trzeba dodac szosta pare, wybralbym H7/js6 albo H7/m6, ale nie kosztem opoznienia MVP. Lepiej miec 5 par dobrze zweryfikowanych niz 9 par z cienka kontrola danych.

Wniosek: zawezenie nie zabija wartosci SEO, jesli jest nazwane jako "najczestsze pasowania" i jezeli plan ma warunek rozszerzenia. Zabija ja dopiero wtedy, gdy strona obiecuje pelny kalkulator ISO 286, a daje wycinek.

## 4. Pomysl, ktory powinien wejsc do planu: audyt rysunku 2D przed produkcja

Do planu powinien wejsc audyt rysunku 2D przed wyslaniem na produkcje. Jest w punktacji z wynikiem 21, ale w Fali 3 przegrywa z decyzownikiem i checklista startu projektu. To blad.

Dlaczego akurat ten:

- popyt wedlug tabeli Claude'a: 3/5, czyli wyzej niz PERT, koszt standaryzacji i checklista startu;
- naklad: 6-10 h, podobny do prostych kalkulatorow;
- ryzyko: niskie do sredniego, bo nie podaje normatywnych wartosci liczbowych;
- unikalnosc PL: 5/5;
- glos Lukasza: 5/5;
- wynik: 21, taki sam jak decyzownik, ale z bardziej konkretnym zadaniem uzytkownika.

To narzedzie ma tez lepszy "moment uzycia" niz checklista startu projektu. Konstruktor naprawde moze otworzyc strone przed wyslaniem PDF-a na produkcje i przejsc 20 punktow. To jest zachowanie powtarzalne.

Proponowana wersja:

- 20-25 punktow kontrolnych;
- sekcje: dane podstawowe, geometria, tolerancje, material i obrobka, gwinty i otwory, rewizja, czytelnosc;
- wynik nie jako procent, tylko lista brakow wedlug ryzyka: krytyczne, wazne, porzadkowe;
- przycisk "kopiuj liste brakow";
- tryb "wczytaj przyklad" z rysunkiem fikcyjnego detalu i typowymi brakami;
- brak zapisu na serwerze.

Szacunek liczbowy:

- przygotowanie listy i opisow: 3-5 h;
- komponent checklisty: 3-4 h;
- wynik i kopiowanie: 1-2 h;
- mobile i dostepnosc: 1-2 h;
- razem: 8-13 h.

W planie powinien wejsc przed modelem 3D i przed checklista startu projektu. Model 3D ma popyt 1/5 i koszt pierwszego modelu 10-20 h. Audyt rysunku 2D ma popyt 3/5, koszt 8-13 h i mniejsze ryzyko techniczne. Liczbowo model 3D przegrywa.

## 5. Jak zmierzyc sukces bez backendu i bez analityki zdarzen

Nie da sie rzetelnie zmierzyc uzycia samego formularza bez zdarzen. Trzeba to powiedziec wprost. Google Search Console i AdSense mierza skutki na poziomie strony, a nie interakcje wewnatrz strony.

Da sie jednak zmierzyc, czy narzedzia maja sens jako SEO i monetyzacja strony statycznej. Trzeba ustawic metryki, ktore sa dostepne bez backendu.

### Co mierzyc w Google Search Console

1. Klikniecia z Google do URL-i z narzedziami.
   Mierzyc osobno dla kazdego URL, np. `/narzedzia/kalkulator-pert/` albo artykul z osadzonym widgetem.

2. Wyswietlenia w Google.
   To najwczesniejszy sygnal. Klikniec moze nie byc przez 4-8 tygodni, ale impresje powinny zaczac rosnac, jesli temat lapie indeks.

3. CTR dla zapytan zadaniowych.
   Dla pasowan licza sie zapytania typu "h7 g6", "h7 h6 tabela", "pasowanie h7 p6", "luz h7 g6". Dla PERT: "pert kalkulator", "pert wzor", "szacowanie pert". Sam wzrost impresji na nietrafne frazy nie jest sukcesem.

4. Srednia pozycja dla grup zapytan.
   Nie patrzec na jedna fraze. Grupowac recznie w arkuszu co miesiac:
   - PERT;
   - standaryzacja;
   - pasowania;
   - sruby moment;
   - rysunek 2D.

5. Zapytania, ktore ujawniaja brak zakresu.
   Przy pasowaniach sprawdzac, czy pojawiaja sie frazy ze srednicami lub parami spoza MVP. To jest jedyny sensowny sposob bez eventow, zeby decydowac o rozszerzeniu danych.

Minimalny horyzont pomiaru: 8-12 tygodni od indeksacji. Po 2 tygodniach mozna sprawdzic tylko, czy strona weszla do indeksu, nie czy wygrala.

### Co mierzyc w AdSense

1. Page RPM dla stron z narzedziami vs podobne artykuly bez narzedzi.
   Porownywac tylko strony o podobnej tematyce i podobnym ruchu. Inaczej wynik bedzie losowy.

2. Szacunkowy przychod z URL-i narzedziowych.
   To ma sens dopiero przy istotnym ruchu. Przy 20 kliknieciach miesiecznie RPM nic nie znaczy.

3. Czy narzedzia nie obnizaja widocznosci reklam.
   Jesli po dodaniu widgetu RPM artykulu spada o 30-50 procent bez wzrostu klikniec z Google, widget moze zabierac miejsce albo pogarszac layout.

AdSense nie powie, czy ktos uzyl kalkulatora. Powie tylko, czy strona z kalkulatorem zarabia lepiej lub gorzej niz porownywalna tresc.

### Jak zrobic quasi-pomiar bez eventow

Mozna dodac elementy, ktore tworza mierzalne URL-e, bez backendu:

1. Osobny URL dla kazdego narzedzia.
   Nawet jesli widget jest w artykule, warto miec kanoniczna podstrone narzedzia z tekstem i kalkulatorem. Search Console wtedy mierzy wejscia na narzedzie.

2. Linki wewnetrzne z parametrem tylko do nawigacji, nie do sledzenia uzytkownika.
   Przyklady:
   - z artykulu: `/narzedzia/pasowania/?src=artykul-handlowki`;
   - z listy narzedzi: `/narzedzia/pasowania/?src=narzedzia`.
   Search Console raczej zignoruje query w raportach kanonicznych, ale logika strony moze pokazac rozny stan. Bez analityki to nie da twardych danych, wiec nie opieralbym na tym decyzji.

3. Indeksowalne podsekcje pod konkretne przypadki.
   Lepsze niz parametry sa statyczne sekcje i naglowki:
   - `#h7-g6`;
   - `#h7-h6`;
   - `#moment-m8-8-8`.
   GSC pokaze zapytania kierujace do strony, a nie klikniecia w sekcje, ale tresc bedzie lepiej dopasowana do long-tail.

4. Przyciski "kopiuj wynik" nie dadza pomiaru.
   Bez eventow klikniecie kopiowania jest niewidoczne. Nie nalezy udawac, ze to metryka.

5. Pliki do pobrania tez nie dadza pomiaru, jesli sa statyczne i nie ma logow.
   Search Console moze pokazac ruch do indeksowalnego pliku PDF, ale nie pobrania CSV generowanego lokalnie.

### Progi sukcesu

Dla Fali 1 po 90 dniach od publikacji:

- minimum 100 impresji miesiecznie lacznie dla stron lub artykulow z narzedziami;
- minimum 10 klikniec miesiecznie lacznie z Google;
- pojawienie sie przynajmniej 10 roznych zapytan zwiazanych z problemem narzedzia;
- brak spadku Page RPM o wiecej niz 20 procent wzgledem porownywalnych artykulow, jesli wolumen pozwala to ocenic.

Dla kalkulatora pasowan po 6 miesiacach:

- minimum 500 impresji miesiecznie;
- minimum 30 klikniec miesiecznie;
- przynajmniej 20 zapytan long-tail zawierajacych konkretne pasowania, np. H7/g6, H7/h6, H7/p6;
- srednia pozycja dla najlepszej grupy zapytan ponizej 20;
- decyzja o rozszerzeniu zakresu tylko wtedy, gdy co najmniej 10 procent zapytan dotyczy par albo srednic spoza MVP.

Dla kalkulatora momentu dokrecania po 6 miesiacach:

- minimum 300 impresji miesiecznie;
- minimum 20 klikniec miesiecznie;
- zapytania zawierajace konkretne kombinacje, np. M8 8.8, M10 10.9, moment dokrecania srub;
- CTR powyzej 2 procent dla zapytan z pozycja 1-10. Jesli pozycja jest dobra, a CTR slaby, problemem jest tytul i meta opis.

Najwazniejsze: nie oceniac Fali 1 po "uzyciu formularza", bo tego nie mierzymy. Oceniac po tym, czy strona z narzedziem zdobywa impresje, klikniecia i zapytania zadaniowe. Jesli potrzebny jest pomiar interakcji, trzeba dodac analityke zdarzen albo zaakceptowac brak tej wiedzy.

## WNIOSEK KONCOWY

Jako pierwsze zrobilbym nie dwa najlatwiejsze widgety, tylko jeden tani pilot techniczny i jeden waski pilot SEO: PERT w artykule o szacowaniu oraz minimalny kalkulator momentu dokrecania dla M6-M10 i klas 8.8/10.9. To daje realny test wdrozenia, mobile i Core Web Vitals, ale jednoczesnie sprawdza temat o wysokiej intencji wyszukiwania. Jesli po 90 dniach PERT nie ma ruchu, a momenty zaczynaja lapac zapytania, wiadomo, ze kierunek to narzedzia zadaniowe, nie ogolne kalkulatory "latwe do zrobienia".
