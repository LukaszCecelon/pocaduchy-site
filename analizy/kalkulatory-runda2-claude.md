# Kalkulatory, runda druga (Claude)

Dziesiec nowych propozycji. Zadnych powtorzen z pierwszej listy.

## Najpierw korekta wlasnego bledu

W pierwszej rundzie odrzucilem **przelicznik jednostek** zdaniem, ze kazdy
telefon ma to wbudowane. To byl blad i Lukasz ma racje.

Telefon przelicza metry na cale. Nie przelicza **bar na megapaskale przy
doborze silownika**, nie mowi, ze moment 40 Nm to okolo 4,1 kilograma sily
na metrze ramienia, i nie tlumaczy, czym rozni sie normalny litr na minute
od litra rzeczywistego. Do tego robi to po angielsku, na stronach zalanych
reklamami.

**Kluczem jest slowo „po polsku" i zawezenie do jednostek, ktore konstruktor
realnie miesza.** To nie jest przelicznik jednostek, tylko przelicznik
konstruktora. Zupelnie inny produkt.

---

## Dziesiec nowych propozycji

### 1. Przelicznik jednostek konstruktora

- **Wejscie:** wartosc i jednostka, wybor kategorii
- **Wyjscie:** komplet odpowiednikow naraz, nie jeden na raz
- **Kategorie, ktore maja sens:** cisnienie (bar, MPa, psi, atm), moment
  (Nm, kgf*m, lb*ft), sila (N, kgf, lbf), dlugosc z calami ulamkowymi
  (1/4", 3/8"), przeplyw powietrza (Nl/min, m3/h, cfm), predkosc obrotowa
  (obr/min, rad/s, Hz), masa i gestosc, temperatura
- **Dlaczego kalkulator:** przestrzen wejsc jest ciagla, a wartosc polega na
  **pokazaniu wszystkich odpowiednikow naraz**, bo konstruktor porownuje
  katalogi z roznych krajow
- **Warstwa wlasna:** przy kazdej kategorii jedno zdanie, gdzie ludzie sie mylą.
  Przy przeplywie: normalny litr to objetosc sprowadzona do warunkow
  odniesienia, wiec nie da sie go przeliczyc na litr rzeczywisty bez podania
  cisnienia. Tego nie tlumaczy zaden przelicznik w sieci.
- **Ryzyko:** zadne. **Koszt:** 6-8 h. **Popyt:** wysoki i staly.

### 2. Lancuch wymiarowy: tolerancje skladane

- **Wejscie:** lista wymiarow z tolerancjami, kierunek kazdego w lancuchu
- **Wyjscie:** wynik metoda najgorszego przypadku **oraz** statystyczna,
  z pokazaniem roznicy miedzy nimi
- **Dlaczego kalkulator:** to jest liczone w Excelu przez kazdego konstruktora,
  bo nie ma lepszego narzedzia, a metoda statystyczna wymaga pierwiastkow
- **Dlaczego to moze byc najlepszy pomysl z obu rund:** rozjezdzajacy sie
  lancuch wymiarowy to jedna z najczestszych przyczyn tego, ze czesci nie
  pasuja przy montazu. Polski internet nie ma na to zadnego narzedzia.
- **Laczy sie z:** artykulem o weryfikacji CAD przed produkcja
- **Ryzyko:** niskie. **Koszt:** 10-14 h.

### 3. Chropowatosc z posuwu i promienia naroza

- **Wejscie:** posuw na obrot, promien naroza plytki, albo odwrotnie:
  wymagane Ra
- **Wyjscie:** teoretyczne Ra i Rz, **albo** maksymalny posuw przy zadanym Ra
- **Wzor:** Ra w przyblizeniu f^2 / (32 * r) dla toczenia
- **Dlaczego kalkulator:** odwracalnosc. Realne pytanie brzmi „jakim posuwem
  moge jechac, zeby wyjsc na Ra 1,6"
- **Dlaczego to mocne:** laczy konstruktora z technologiem. Pokazuje, ze
  wpisanie ostrzejszej chropowatosci to decyzja o czasie obrobki, nie kosmetyka
- **Laczy sie z:** tematem Wiedzy o chropowatosci
- **Ryzyko:** niskie, wynik jest teoretyczny i trzeba to napisac wprost

### 4. Druk 3D: masa, dlugosc filamentu, koszt i czas

- **Wejscie:** objetosc modelu albo wymiary bryly, material, wypelnienie,
  liczba scianek, cena szpuli
- **Wyjscie:** masa wydruku, zuzyty metr filamentu, koszt materialu,
  zgrubny czas
- **Dlaczego wchodzi:** Lukasz prowadzi kanal, na ktorym druk 3D jest jednym
  z filarow. To jedyny kalkulator z listy, ktory laczy sie **bezposrednio
  z YouTube**, a nie tylko ze strona
- **Ryzyko:** zadne. **Koszt:** 8-10 h. **Popyt:** bardzo wysoki, i to poza
  sama inzynieria

### 5. Energia uderzenia i dobor zderzaka

- **Wejscie:** masa, predkosc, ewentualnie wysokosc spadku
- **Wyjscie:** energia kinetyczna, wymagana zdolnosc pochlaniania,
  porownanie z typowymi zakresami amortyzatorow przemyslowych
- **Dlaczego kalkulator:** liczone przy kazdym zatrzymaniu ruchu, a pomylka
  o rzad wielkosci jest tu latwa
- **Ryzyko:** srednie. Wynik jest orientacyjny i musi odsylac do doboru
  u producenta amortyzatora
- **Laczy sie z:** kalkulatorem czasu cyklu i pneumatyka

### 6. Dlugosc pasa albo lancucha przy danym rozstawie osi

- **Wejscie:** srednice albo liczby zebow kol, rozstaw osi
- **Wyjscie:** wymagana dlugosc, najblizsze dlugosci typoszeregowe,
  **oraz rozstaw po zaokragleniu do typoszeregu**
- **Dlaczego kalkulator:** to jest lancuch przeliczen w obie strony i klasyczne
  miejsce na blad. Kupuje sie pas o dlugosci z katalogu, wiec rozstaw osi
  trzeba dopasowac do niego, a nie odwrotnie
- **Ryzyko:** niskie. **Koszt:** 8-10 h

### 7. Moment i bezwladnosc zredukowana przez przekladnie

- **Wejscie:** moment albo bezwladnosc po stronie obciazenia, przelozenie,
  sprawnosc
- **Wyjscie:** moment i bezwladnosc sprowadzone na wal silnika,
  stosunek bezwladnosci obciazenia do silnika
- **Dlaczego kalkulator:** stosunek bezwladnosci to parametr, o ktorym
  poczatkujacy nie wiedza, a decyduje o tym, czy naped da sie nastroic
- **Ryzyko:** niskie, bo to nie jest dobor napedu, tylko przeliczenie
- **Laczy sie z:** artykulem o doborze sprzegla

### 8. Nacisk powierzchniowy pod lbem sruby

- **Wejscie:** sila wstepna albo moment, rodzaj lba, obecnosc podkladki,
  material elementu
- **Wyjscie:** nacisk w MPa, porownanie z dopuszczalnym dla materialu,
  ostrzezenie o wgnieceniu
- **Dlaczego kalkulator:** wgniecenie pod lbem to czesta przyczyna luzowania
  sie polaczen, a prawie nikt tego nie sprawdza
- **Ryzyko:** srednie, wchodzi razem z tematem momentow dokrecania
- **Laczy sie z:** kalkulatorem momentu dokrecania

### 9. Moduł przekroju i moment bezwladnosci figur

- **Wejscie:** ksztalt przekroju z listy, wymiary
- **Wyjscie:** pole, moment bezwladnosci wzgledem obu osi, modul przekroju,
  promien bezwladnosci
- **Dlaczego kalkulator, a nie tabela:** wymiary sa ciagle, a profili
  zlozonych z prostokatow jest nieskonczenie wiele
- **Wazne ograniczenie:** liczymy **geometrie, nie wytrzymalosc**. Zadnych
  naprezen i ugiec. Ta granica musi byc widoczna
- **Ryzyko:** niskie przy tym ograniczeniu

### 10. Dobor sprezyny naciskowej

- **Wejscie:** wymagana sila przy zadanym ugieciu, dostepna dlugosc zabudowy
- **Wyjscie:** wymagana sztywnosc, dobor z typowych szeregow katalogowych,
  sprawdzenie, czy sprezyna zmiesci sie w zabudowie
- **Dlaczego kalkulator:** to jest zawsze liczenie w dwie strony i zawsze
  konczy sie sprawdzeniem, czy zmiesci sie w gnieździe
- **Ryzyko:** srednie przy zastosowaniach bezpieczenstwa, wiec zastrzezenie
  o zaworach i hamulcach musi byc jawne

---

## Ktore z drugiej dziesiatki sa mocniejsze niz najslabsze z pierwszej

Uwazam, ze **trzy pozycje z tej listy powinny wejsc przed czescia pierwszej
dziesiatki**:

1. **Przelicznik jednostek konstruktora** przed wszystkim poza wspolrzednymi
   otworow. Najwyzszy staly popyt, zerowe ryzyko, a wersji po polsku
   zawezonej do jednostek technicznych po prostu nie ma.
2. **Lancuch wymiarowy** przed pasowaniami i luzem od temperatury. Rozwiazuje
   wiekszy problem i nie ma zadnej konkurencji po polsku.
3. **Druk 3D** przed masa polfabrykatu. Podobna trudnosc, ale laczy sie
   z kanalem YouTube, czyli z jedynym miejscem, gdzie Lukasz ma juz publicznosc.

Reszta drugiej dziesiatki jest wartosciowa, ale nie wyprzedza pierwszej.
