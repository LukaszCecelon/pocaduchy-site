# Burza mozgow: tematy do zakladki Wiedza (Claude)

Runda 1, niezalezna od Codeksa. Konwergencja po zestawieniu obu list.

## Kryterium nadrzedne, ktore odrzuca wieksz osc pomyslow

Zakladka Wiedza nie jest miejscem na artykuly. Artykuly juz sa, jest ich 19.
Wiedza ma odpowiadac na pytanie zadane **w trakcie pracy, z otwartym CAD-em**,
gdy ktos potrzebuje wartosci albo decyzji w ciagu 30 sekund.

Test, ktory stosuje do kazdego tematu:

> Czy konstruktor wroci tu **drugi raz w tym samym miesiacu**?

Artykul o organizacji dzialu czyta sie raz. Tabele rowkow pod pierscien
osadczy otwiera sie za kazdym razem, gdy projektuje sie wal. To jest cala
roznica i ona decyduje o ruchu z wyszukiwarki.

## Drugie kryterium: co wolno opublikowac

Ustalenia z `baza-wiedzy-r6-claude.md`, sekcja A1:

- **wartosc liczbowa jest faktem**, faktow nie obejmuje prawo autorskie,
- **uklad tabeli w normie jest utworem**, wiec robimy wlasny uklad,
- **zbior danych moze byc chroniony jako baza danych**, wiec bierzemy wycinek
  uzytkowy, nie komplet,
- **numer normy wolno przywolac**: "wg DIN 471" to odwolanie, nie reprodukcja.

Zrodlem sa **publiczne katalogi producentow**, ktorzy publikuja wymiary po to,
zeby konstruktorzy dobierali ich wyroby.

---

## Tematy, ktore proponuje

Kolejnosc od najmocniejszych.

### 1. Rowek pod pierscien osadczy na wale (DIN 471)

- **Typ:** tabela + rysunek + kalkulator
- **Co znajdzie:** srednica rowka, szerokosc, promien zaokraglenia, dla
  srednic walu od 3 do 100 mm
- **Fraza:** `rowek pod pierscien seggera wymiary`, `DIN 471 tabela`
- **Dlaczego to numer jeden:** to najczystszy przypadek wartosci, ktora wpisuje
  sie wprost do rysunku, a polski internet ma to fatalnie zrobione. Do tego
  jest to wymiar, ktory konstruktor sprawdza dosłownie przy kazdym wale.
- **Ryzyko:** niskie. Wymiary sa w katalogach kazdego producenta pierscieni.

### 2. Pasowania: co znaczy H7/g6 i jak dobrac

- **Typ:** poradnik decyzyjny + tabela odchylek + kalkulator luzu
- **Co znajdzie:** znaczenie oznaczen, typowe pary pasowan, wartosci odchylek
  dla najczestszych zakresow srednic, obliczony luz albo wcisk
- **Fraza:** `pasowanie H7 g6`, `pasowania tabela`, `luz wcisk pasowanie`
- **Dlaczego:** najczestsze pytanie mlodego konstruktora i jedno z najczesciej
  wyszukiwanych hasel technicznych po polsku.
- **Uwaga:** **nie publikujemy calej tablicy ISO 286**. Wycinek uzytkowy plus
  kalkulator, ktory liczy z wzoru, to inna sytuacja niz przedruk normy.

### 3. Chropowatosc Ra i Rz: przelicznik i co osiaga dana obrobka

- **Typ:** tabela + poradnik decyzyjny
- **Co znajdzie:** przyblizona relacja Ra do Rz, jaka chropowatosc daje
  toczenie, frezowanie, szlifowanie, oraz **ile to kosztuje**
- **Fraza:** `Ra Rz przelicznik`, `chropowatosc po frezowaniu`
- **Dlaczego:** konstruktorzy nagminnie wpisuja Ra 0.8 tam, gdzie wystarczy
  Ra 3.2, i podnosza koszt detalu bez powodu. Kolumna kosztowa to jest
  dokladnie ta warstwa wlasna, ktorej nie ma nikt inny.

### 4. Momenty dokrecania srub

- **Typ:** tabela + kalkulator
- **Co znajdzie:** orientacyjny moment dla klas 8.8, 10.9, 12.9, z jawna lista
  czynnikow, ktore zmieniaja wynik
- **Fraza:** `moment dokrecania M8`, `momenty dokrecania tabela`
- **Dlaczego:** ogromny popyt, ale **najwieksze ryzyko zawodowe z calej listy**.
  Moment zalezy od tarcia, smarowania, powloki, podkladki i wymagan producenta.
- **Warunek konieczny:** publikujemy **wylacznie jako punkt startowy**, z jawnym
  zastrzezeniem i odsylaczem do dokumentacji zlacza. Bez tego nie publikujemy
  wcale.

### 5. Gwinty metryczne: srednice, skoki, otwory pod gwint

- **Typ:** tabela
- **Co znajdzie:** skok gwintu zwykly i drobnozwojny, srednica otworu pod
  gwintowanie, srednica otworu przelotowego, glebokosc gwintowania
- **Fraza:** `otwor pod gwint M8`, `tabela gwintow metrycznych`
- **Dlaczego:** absolutna podstawa, sprawdzana codziennie. Niski poziom
  trudnosci, wysoki popyt.

### 6. Wpusty pryzmatyczne: dobor wg srednicy walu

- **Typ:** tabela + rysunek
- **Co znajdzie:** przekroj wpustu, glebokosc rowka w wale i piascie,
  tolerancje osadzenia
- **Fraza:** `wpust pryzmatyczny wymiary`, `rowek wpustowy tabela`
- **Dlaczego:** naturalne przedluzenie artykulu o polaczeniach wal-piasta,
  ktory juz jest na stronie. Linkowanie samo sie uklada.

### 7. Lozyska toczne: jak czytac oznaczenie i dobrac wstepnie

- **Typ:** poradnik decyzyjny + tabela typowych serii
- **Co znajdzie:** co znacza cyfry w oznaczeniu, roznica miedzy seriami,
  kiedy kulkowe a kiedy walcowe, co to nosnosc C i C0
- **Fraza:** `oznaczenia lozysk`, `6205 wymiary`, `jak dobrac lozysko`
- **Dlaczego:** duzy popyt, a wiekszosc polskich stron to przedruki katalogow
  bez wyjasnienia decyzji.

### 8. Tolerancje ksztaltu i polozenia: symbole i co znacza

- **Typ:** tabela symboli + poradnik
- **Co znajdzie:** symbol, nazwa, co realnie ogranicza, kiedy stosowac,
  typowe bledy
- **Fraza:** `tolerancje ksztaltu i polozenia symbole`, `GD&T po polsku`
- **Dlaczego:** temat, przy ktorym wieksz osc konstruktorow czuje sie
  niepewnie. Duzy potencjal na material, do ktorego sie wraca.

### 9. Kolki bazujace i ustalajace: dobor i rozstaw

- **Typ:** poradnik decyzyjny + tabela
- **Co znajdzie:** kiedy dwa kolki, kiedy kolek i otwor podluzny, jaki luz,
  jaki rozstaw, jak to wplywa na powtarzalnosc bazowania
- **Fraza:** `kolki ustalajace dobor`, `bazowanie kolkami`
- **Dlaczego:** rzecz, ktorej **nie ma nigdzie po polsku**, a decyduje
  o powtarzalnosci przezbrojen. Laczy sie z artykulem o design for maintenance.

### 10. Blachy giete: promienie giecia i rozwiniecie

- **Typ:** kalkulator + tabela
- **Co znajdzie:** minimalny promien giecia dla grubosci i materialu,
  wspolczynnik K, dlugosc rozwiniecia
- **Fraza:** `rozwiniecie blachy wzor`, `minimalny promien giecia`
- **Dlaczego:** kalkulator daje przewage nad tabela, bo kazdy przypadek jest
  inny. Rzecz uzywana przez konstruktorow i przez blacharnie.

---

## Tematy, ktore rozwazalem i odrzucam

- **Tabela stali i ich odpowiednikow.** Ogromny popyt, ale to jest wprost
  przedruk zbioru danych z normy i katalogow hutniczych. Ryzyko prawne
  najwyzsze z calej listy, a wartosc dodana najmniejsza.
- **Kalkulator wytrzymalosciowy belki.** Wyglada atrakcyjnie, ale to jest
  narzedzie, ktorego blad prowadzi wprost do zlamanej konstrukcji. Nie chce
  brac tej odpowiedzialnosci na strone, ktora nie jest biurem obliczeniowym.
- **Slownik pojec technicznych.** Latwy do zrobienia, zerowa przewaga nad
  Wikipedia, nikt do niego nie wraca.
- **Tabela jednostek i przelicznikow.** To samo: kazda przegladarka i kazdy
  telefon ma to wbudowane.

## Czego jestem niepewny

**Kalkulatory podnosza koszt kilkukrotnie** wzgledem tabel, bo wymagaja
sprawdzenia w przegladarce i obsluzenia przypadkow brzegowych. Przy pierwszej
piatce tematow proponuje **zaczac od samych tabel** i dodawac kalkulatory
dopiero tam, gdzie dane z Search Console pokaza realny ruch.

**Nie wiem, ile Lukasz chce w to wlozyc czasu.** Pierwszy temat to okolo
30 godzin, bo powstaje przy nim cala infrastruktura. Kazdy nastepny tego
samego typu powinien zajac ponizej 6 godzin. Jesli to sie nie potwierdzi,
architektura jest zla i wracamy do projektu.
