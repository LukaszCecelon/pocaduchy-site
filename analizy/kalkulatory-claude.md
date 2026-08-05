# Kalkulatory na pocaduchy.pl: analiza (Claude)

Analiza niezalezna od Codeksa. Konwergencja po zestawieniu obu list.

## Pytanie, ktore odrzuca polowe pomyslow

> Czy kalkulator jest tu lepszy niz tabela?

Tabela wygrywa, gdy kombinacji wejscia jest kilkanascie: laduje sie natychmiast,
indeksuje w Google, mozna ja wydrukowac i powiesic przy stanowisku. Kalkulator
zaczyna miec sens dopiero wtedy, gdy zachodzi **co najmniej jedno** z trzech:

1. **Przestrzen wejsc jest ciagla albo za duza na tabele.** Rozwiniecie blachy
   zalezy od grubosci, promienia, kata i materialu naraz. Tabela mialaby
   tysiace wierszy.
2. **Wynik wymaga kilku dzialan po kolei**, a konstruktor pomyli sie w ktoryms.
3. **Wartosc trzeba przeliczyc w druga strone.** Tabela czyta sie w jedna,
   a realne pytanie brzmi czesto odwrotnie: nie „jaka sila przy tym siłowniku",
   tylko „jaki siłownik przy tej sile".

Ostatni punkt jest najbardziej niedoceniany. Odwracalnosc to najmocniejszy
argument za kalkulatorem.

## Drugie kryterium: odpowiedzialnosc

Kalkulator wyglada na autorytet. Liczba na ekranie sprawia wrazenie pewnej,
nawet gdy zalezy od dziesieciu zalozen. Dlatego:

- **nie robimy kalkulatorow, ktorych wynik decyduje wprost o bezpieczenstwie
  ludzi** (wytrzymalosc dzwignicy, dobor zawiesia, srednica liny),
- kazdy wynik pokazujemy z **zalozeniami wypisanymi obok**, nie w przypisie,
- tam gdzie wynik jest orientacyjny, piszemy to **przy liczbie**, a nie
  w stopce strony.

---

## Dziesiec, ktore proponuje

### 1. Rozwiniecie blachy gietej

- **Wejscie:** grubosc, promien giecia wewnetrzny, kat, wspolczynnik K albo
  material z listy
- **Wyjscie:** dlugosc rozwiniecia, dlugosc kazdego odcinka prostego,
  naddatek na gniecie
- **Dlaczego kalkulator:** podrecznikowy przypadek przestrzeni ciaglej.
  Cztery zmienne naraz, tabela nie ma szans.
- **Ryzyko:** niskie. Blad kosztuje jedna blache, nie zdrowie.
- **Laczy sie z:** przyszlym tematem o gieciu blach.
- **Popyt:** wysoki. Szuka tego konstruktor i blacharnia.

### 2. Sila silownika pneumatycznego, liczona w obie strony

- **Wejscie:** srednica tloka albo wymagana sila, cisnienie, srednica
  tloczyska, sprawnosc
- **Wyjscie:** sila wysuwu i wsuwu, **albo** minimalna srednica tloka przy
  zadanej sile, z podpowiedzia najblizszego typoszeregu
- **Dlaczego kalkulator:** wlasnie przez odwracalnosc. Realne pytanie brzmi
  „jaki siłownik uniesie 400 N", nie odwrotnie.
- **Ryzyko:** srednie. Zaniżona sila to niedzialajaca maszyna, nie wypadek,
  ale przy chwytakach i podnoszeniu trzeba zastrzezenia.
- **Laczy sie z:** artykulem o elektrozaworach.

### 3. Dobor pasowania: z pasowania na luz i odwrotnie

- **Wejscie:** srednica nominalna i para pasowania, albo srednica i zadany luz
- **Wyjscie:** luz minimalny i maksymalny, wcisk, interpretacja („to pasowanie
  ruchowe, dopuszcza obrot bez smaru")
- **Dlaczego kalkulator:** tabela pasowan ma dwa wymiary naraz (srednica
  i para), a konstruktor czesto idzie od strony wymaganego luzu.
- **Ryzyko:** niskie.
- **Laczy sie z:** tematem Wiedzy o pasowaniach.

### 4. Moment dokrecania z wlasnym wspolczynnikiem tarcia

- **Wejscie:** gwint, klasa sruby, wspolczynnik tarcia, stopien wykorzystania
  granicy plastycznosci
- **Wyjscie:** moment i sila wstepna, **oraz roznica wzgledem tabeli katalogowej**
- **Dlaczego kalkulator:** to jest odpowiedz na rozrzut, ktory wykryliśmy
  w researchu: Wurth 93 Nm, MISUMI 99,8 Nm, wzor 103 Nm dla tej samej sruby.
  Kalkulator pokazuje, **skad ta roznica sie bierze**, zamiast udawac, ze
  istnieje jedna prawdziwa liczba.
- **Ryzyko:** wysokie. Wchodzi tylko z pelnym zastrzezeniem i dopiero po
  tabeli momentow.
- **To jest najmocniejszy pomysl z calej listy pod wzgledem odroznienia.**

### 5. Masa i srodek ciezkosci detalu z bryl podstawowych

- **Wejscie:** material z listy gestosci, seria brył (walec, prostopadloscian,
  rura, plyta) z wymiarami, mozliwosc odejmowania
- **Wyjscie:** masa laczna, masa kazdej bryly, przyblizone polozenie srodka
  ciezkosci
- **Dlaczego kalkulator:** CAD to policzy, ale nie na etapie koncepcji,
  gdy modelu jeszcze nie ma, a trzeba dobrac manipulator albo ocenic transport.
- **Ryzyko:** niskie.

### 6. Przelozenie i dobor przekladni

- **Wejscie:** obroty wejsciowe, wymagane obroty albo predkosc liniowa,
  srednica kola albo skok sruby
- **Wyjscie:** wymagane przelozenie, obroty wyjsciowe, moment po przelozeniu,
  najblizsze typoszeregowe przelozenia
- **Dlaczego kalkulator:** lancuch przeliczen, w ktorym najczesciej gubi sie
  jednostki i mnozy zamiast dzielic.
- **Ryzyko:** niskie.

### 7. Czas cyklu ruchu liniowego

- **Wejscie:** droga, predkosc maksymalna, przyspieszenie, opoznienie
- **Wyjscie:** czas calkowity, czy profil zdazyl osiagnac predkosc maksymalna
  (trojkatny czy trapezowy), droga rozpedzania
- **Dlaczego kalkulator:** to jest liczone dosłownie przy kazdej maszynie
  taktowanej, a wzor ma przypadek graniczny, o ktorym latwo zapomniec.
- **Ryzyko:** niskie.
- **Luka:** duza. Polski internet tego nie ma w uzytecznej formie.

### 8. Kalkulator PERT: szacowanie czasu projektowania

- **Wejscie:** czas optymistyczny, najbardziej prawdopodobny, pesymistyczny,
  dla wielu zadan
- **Wyjscie:** wartosc oczekiwana, odchylenie, laczny czas projektu
- **Dlaczego kalkulator:** wzor jest prosty, ale liczenie tego dla dziesieciu
  zadan w glowie jest meczace.
- **Laczy sie z:** artykulem o szacowaniu czasu projektowania, ktory **juz jest
  na stronie** i wprost opisuje te metode.
- **Ryzyko:** zadne.
- **To najtanszy pomysl z listy i najlepiej osadzony w istniejacej tresci.**

### 9. Dobor srednicy otworu pod gwint w roznych materialach

- **Wejscie:** gwint, material, wymagany procent zarysu gwintu
- **Wyjscie:** srednica wiertla, glebokosc wiercenia i gwintowania,
  ostrzezenie przy cienkiej sciance
- **Dlaczego kalkulator:** tabela obsluguje przypadek podstawowy, ale procent
  zarysu i material zmieniaja wynik, a to wlasnie sa pytania z warsztatu.
- **Ryzyko:** niskie.

### 10. Przelicznik chropowatosci i kosztu obrobki

- **Wejscie:** wymagane Ra albo Rz, proces obrobki
- **Wyjscie:** odpowiednik w drugiej jednostce, czy dany proces to osiagnie,
  **relatywny wzrost kosztu wzgledem Ra 3,2**
- **Dlaczego kalkulator:** kolumna kosztowa jest tu wartoscia, ktorej nie ma
  nikt inny, a relacja Ra do Rz jest przyblizona i zalezy od procesu, wiec
  warto pokazac zakres, a nie jedna liczbe.
- **Ryzyko:** niskie, ale relacja Ra do Rz musi byc podana jako przyblizenie.

---

## Odrzucone i dlaczego

| Pomysl | Dlaczego odpada |
|---|---|
| Wytrzymalosc belki, ugiecie | wynik decyduje o bezpieczenstwie, a strona nie jest biurem obliczeniowym |
| Dobor lozyska z trwaloscia L10 | wzor jest publiczny, ale realny dobor wymaga obciazen zastepczych, ktorych uzytkownik nie poda poprawnie |
| Przelicznik jednostek | kazdy telefon ma to wbudowane |
| Kalkulator gestosci materialow | to jest tabela, nie kalkulator |
| Kalkulator srub pod scinanie | jak belka: odpowiedzialnosc konstrukcyjna |
| Kalkulator kosztu detalu | za duzo zalozen zaleznych od zakladu, wynik bylby zmyslony |

## Kolejnosc, ktora proponuje

Nie wedlug popytu, tylko wedlug stosunku wartosci do ryzyka i kosztu:

1. **PERT** (najtanszy, zero ryzyka, gotowy artykul na stronie)
2. **Czas cyklu ruchu liniowego** (duza luka, niskie ryzyko)
3. **Rozwiniecie blachy** (wysoki popyt, klasyczny przypadek dla kalkulatora)
4. **Sila silownika w obie strony** (laczy sie z artykulem o elektrozaworach)
5. **Masa detalu** (bezpieczny, uzyteczny na etapie koncepcji)

Reszta po zebraniu pierwszych danych z Search Console. Nie ma sensu budowac
dziesieciu kalkulatorow, zanim wiadomo, czy ludzie w ogole ich uzywaja.

## Czego nie wiem

**Czy kalkulatory w ogole przyciagna ruch.** Google indeksuje strone
kalkulatora slabiej niz tabele, bo tresc powstaje dopiero po interakcji.
Dlatego kazdy kalkulator musi miec **obok siebie tresc czytelna dla robota**:
wzor, wyjasnienie, przyklad liczbowy i typowe wartosci. Sam formularz nie
wypozycjonuje sie na nic.

To jest waznniejsze niz sam kalkulator i musi trafic do specyfikacji wdrozenia.
