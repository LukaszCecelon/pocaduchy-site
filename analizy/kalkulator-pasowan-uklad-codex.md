# Kalkulator pasowan - 5 radykalnie roznych koncepcji ukladu

Kontekst z plikow:

- `src/components/KalkulatorPasowan.js` ma obecnie jeden pionowy formularz: tryb, srednica, otwor, walek albo zakres luzu, zasada, skroty pasowan, wynik, SVG dwoch slupkow, tabela, zapis i zastrzezenie.
- `KalkulatorPasowan.module.css` daje duze pionowe odstepy, duze przyciski trybu i osobne bloki wyniku, wykresu oraz tabeli.
- Strona `src/pages/wiedza/pasowania.js` traktuje kalkulator jako narzedzie nad trescia edukacyjna, wiec wynik powinien byc szybciej osiagalny niz opis.
- `content/wiedza-pasowania.json` ma teksty trybow, zasad, rodzaju pasowania, podpis wykresu i zastrzezenie; czesc opisowa jest dluga i nie musi byc widoczna w samym pierwszym ekranie kalkulatora.

Wspolne zalozenie dla wszystkich wariantow: pierwszy ekran laptopa ma pokazywac pola wejsciowe, symbol, najwazniejsza liczbe wyniku i rozpoznawalny schemat walek/otwor bez przewijania. Tabela, zapis rysunkowy, zastrzezenie i dlugie wyjasnienie rodzaju pasowania nie powinny konkurowac o pierwszy ekran.

## 1. Przekroj montazowy

**Co uzytkownik widzi po wejsciu:** kompaktowy pasek nastaw u gory, a pod nim duzy przekroj tulei z otworem i wsunietym walkiem; wynik luzu albo wcisku jest wpisany bezposrednio w szczeline miedzy elementami.

**Kompaktowosc**

- Dwa duze przyciski trybu znikaja jako osobny rzad; staja sie segmentem w prawym gornym rogu paska nastaw.
- Trzy pola z siatki lacza sie w jedna linie: `Ø [20] mm  Otwor [H][7] / Walek [g][6]`.
- Przelacznik zasady jest malym segmentem `H stale` / `h stale` przy skrotach, a nie oddzielnym blokiem.
- Trzy grupy kafelkow pasowan chowaja sie do jednego poziomego paska `Luzne | Mieszane | Ciasne`, gdzie widac po 3-5 najczestszych skrotow, a reszta jest w rozwijanym `wiecej`.
- Tabela odchylek i zapis na rysunku ida do zakladki/akordeonu `Szczegoly`, domyslnie zamknietej.
- Zastrzezenie zostaje jako jednolinijkowy link `Zakres i ograniczenia` pod kalkulatorem.

**Czytelnosc walka i otworu**

- Otwor jest pokazany jako jasny, gruby przekroj piasty/tulei z realnym pustym cylindrycznym kanalem.
- Walek jest pelnym ciemniejszym cylindrem przechodzacym przez kanal.
- Etykiety sa przypiete do geometrii, nie do legendy: `OTWOR H7` na przekroju tulei, `WALEK g6` na pelnym cylindrze.
- Luz jest rysowany jako cienki kolorowy pierscien/szczelina wokol walka; wcisk jako czerwone nachodzenie konturu walka na granice otworu z kreskowaniem strefy konfliktu.
- Wielka litera otworu i mala litera walka moga byc wzmocnione typograficznie: `H7` drukowane na tulei, `g6` drukowane na walku.

**Animacja**

- Po zmianie pasowania walek przesuwa sie w osi o 120 ms i zatrzymuje w otworze; wynik liczbowy aktualizuje sie natychmiast, animacja tylko dopowiada obraz.
- Szczelina luzu rozszerza/zweza sie przez transform/opacity w 180 ms.
- Przy pasowaniu ciasnym strefa wcisku pojawia sie jako krotkie kreskowanie 220 ms, bez opoznienia tekstu.
- Zmiana zasady `H/h` podswietla element staly pulsem obrysu 280 ms.
- `prefers-reduced-motion`: brak przesuwania, tylko natychmiastowa zmiana obrysu i koloru.

**Co traci uzytkownik**

- Nie widzi od razu pelnej tabeli wszystkich odchylek.
- Wykres pol tolerancji w mikrometrach jest mniej precyzyjny wizualnie niz obecne dwa slupki; przekroj lepiej tlumaczy geometrii, gorzej pokazuje polozenie wzgledem nominalu.
- Skroty pasowan sa mniej "wszystkie naraz" i wymagaja rozwijania przy rzadszych wyborach.

**Szacunek pracy:** 14-20 h.

## 2. Pulpit suwmiarki

**Co uzytkownik widzi po wejsciu:** kalkulator wyglada jak cyfrowa suwmiarka pomiarowa: po lewej jedna linia nastaw, po prawej duzy odczyt `Luz 7-28 µm`, a pod spodem miniaturowa szczeka pokazuje otwor i walek.

**Kompaktowosc**

- Tryb staje sie przelacznikiem ikonowym `licz z pasowania` / `dobierz pasowanie` na pasku narzedzi.
- Srednica, otwor i walek sa w jednej zwartej belce z monospace, blisko zapisu rysunkowego: `Ø20 H7/g6`.
- Skroty srednic ida do malego menu przy polu srednicy, zamiast zajmowac osobny rzad.
- Skroty pasowan sa wyszukiwalnym comboboxem albo malym menu `Najczestsze`, nie trzema widocznymi grupami.
- Wynik slowny skraca sie do dwoch linii: typ pasowania i zakres. Dlugie opisy `rodzaje.*.opis` przechodza do ikony informacji.
- Wykres slupkowy znika z pierwszego ekranu; pozostaje kompaktowy schemat szczek + akordeon `Odchylki`.

**Czytelnosc walka i otworu**

- Metafora pomiarowa: gorna szczeka suwmiarki lapie otwor od wewnatrz, dolna obejmuje walek od zewnatrz.
- Otwor jest narysowany jako dwa wewnetrzne luki z podpisem `pomiar otworu`, walek jako pelny krazek/cylinder z podpisem `pomiar walka`.
- Uzytkownik widzi dwa rozne rodzaje kontaktu: otwor mierzony "od srodka", walek mierzony "po zewnatrz".
- W stanie wyniku miniaturowe elementy ukladaja sie w jeden przekroj, z wyraznie pusta przestrzenia dla luzu albo czerwonym naciskiem dla wcisku.

**Animacja**

- Cyfrowe cyfry wyniku zmieniaja sie natychmiast, a tlo odczytu robi krotki flash 120 ms.
- Szczeki suwmiarki dosuwaja sie do nowego rozmiaru przez 180 ms.
- Po wybraniu skrotu pasowania pole `H7/g6` robi "klik" przez scale 0.98 -> 1 w 100 ms.
- Przy trybie odwrotnym propozycje pasowan wpadaja jako 3-5 wierszy z opoznieniem 30 ms miedzy wierszami, ale pierwszy wiersz jest renderowany od razu.
- `prefers-reduced-motion`: zero dosuwania szczek, zostaje statyczny odczyt.

**Co traci uzytkownik**

- Mniej miejsca na edukacyjny opis, bo projekt mocno idzie w narzedzie warsztatowe.
- Rzadsze pasowania wymagaja jednego dodatkowego klikniecia w menu.
- Graficzne tlumaczenie jest bardzo praktyczne, ale mniej pokazuje zaleznosc od linii wymiaru nominalnego.

**Szacunek pracy:** 12-18 h.

## 3. Dwa detale CAD przed montazem

**Co uzytkownik widzi po wejsciu:** po lewej stoi piasta z otworem, po prawej walek, a miedzy nimi centralnie widnieje wynik; po zmianie pasowania elementy na chwile "skladaja sie" w polaczenie.

**Kompaktowosc**

- Uklad dzieli kalkulator na dwie kolumny: lewa `Nastawy`, prawa `Wynik + montaz`.
- W lewej kolumnie tryb, zasada, srednica i symbol sa w czterech gestych wierszach, bez osobnych duzych sekcji.
- Grupy skrotow pasowan sa zastapione przez trzy pionowe przyciski kategorii z jedna linia rekomendowanych symboli pod aktywna kategoria.
- Wynik slowny jest jedna karta inline: `Pasowanie luzne | 7-28 µm | montaz reczny`.
- Tabela i zapis sa w dolnym panelu `Dane do rysunku`, domyslnie zamknietym.
- Na telefonie kolumny zmieniaja sie w: wynik u gory, grafika, nastawy, szczegoly.

**Czytelnosc walka i otworu**

- Otwor jest doslownie detalem z wycietym cylindrycznym otworem, z kreskowaniem przekroju i podpisem `PIASTA / OTWOR`.
- Walek jest oddzielnym pelnym detalem z czolem, faza i podpisem `WALEK`.
- Po kliknieciu `pokaz zlozenie` albo po zmianie symbolu detale zjezdzaja do siebie; widac, czy walek wejdzie z luzem, czy wymaga wcisku.
- Dla osoby poczatkujacej wazne jest, ze `otwor` nie jest slupkiem na wykresie, tylko pusta przestrzenia w czesci.

**Animacja**

- Zmiana symbolu: detale sa przez 0 ms juz w nowym stanie liczbowym, a animacja montazu jest dekoracyjna po renderze.
- Piasta i walek zblizaja sie do siebie przez 240 ms.
- Przy luzie po zlozeniu szczelina mruga kolorem zielonym raz, 180 ms.
- Przy wcisku walek zatrzymuje sie z 2-3 px "oporem", a strefa nachodzenia zapelnia sie kreskowaniem przez 220 ms.
- Przy pasowaniu mieszanym sa dwa cienkie kontury: minimalny i maksymalny przypadek, ktore przechodza opacity 0.45 -> 1 w 260 ms.
- `prefers-reduced-motion`: pokazywany jest tylko stan zlozony, bez przejazdu elementow.

**Co traci uzytkownik**

- Obraz zajmuje wiecej szerokosci; na waskich ekranach trzeba bardzo dobrze ustawic kolejnosc, zeby nie schowac wyniku.
- Animacja montazu moze byc efektowna, ale trzeba jej pilnowac, zeby nie robila z narzedzia zabawki.
- Uzytkownik, ktory lubi obecny widok tabelaryczny, bedzie musial rozwinac szczegoly.

**Szacunek pracy:** 18-28 h.

## 4. Jednoliniowy kalkulator konstruktora

**Co uzytkownik widzi po wejsciu:** jedna komendowa linia `Ø20 H7/g6` z podpowiedziami i natychmiastowym odczytem obok; ponizej tylko miniaturowy przekroj pokazujacy `otwor` jako gniazdo i `walek` jako trzpien.

**Kompaktowosc**

- Caly gorny formularz zamienia sie w jeden edytowalny zapis techniczny: srednica + symbol pasowania.
- Selecty dla liter i klas sa nadal dostepne, ale jako rozwiniecie po kliknieciu fragmentu `H7` albo `g6`.
- Tryb odwrotny jest druga zakladka tej samej linii: `Szukaj po luzie: Ø20, 0-50 µm`.
- Zasada stalego otworu/walka nie jest osobnym przelacznikiem w trybie normalnym; wynika ze skrotow i symbolu. W trybie odwrotnym jest malym prefiksem w linii wyszukiwania.
- Skroty pasowan pojawiaja sie jako podpowiedzi pod linia tylko podczas fokusu albo po kliknieciu `najczestsze`.
- Wynik, zapis na rysunku i symbol sa polaczone: `Ø20 H7/g6 -> luz 7-28 µm`.
- Tabela odchylek jest ikona `tabela`/link `odchylki`.

**Czytelnosc walka i otworu**

- Wpis `H7/g6` jest rozbity wizualnie: `H7` siedzi w obrysie piasty z otworem, `g6` siedzi na pelnym walku.
- Slash `/` w symbolu jest zastapiony albo wsparty mala ikonografia `otwor / walek`.
- Mini-przekroj ma podpisy na stale: `wielka litera = otwor`, `mala litera = walek`, ale nie jako akapit, tylko mikro-legenda przypieta do elementow.
- Po najechaniu/fokusie na `H7` podswietla sie otwor; po fokusie na `g6` podswietla sie walek.

**Animacja**

- Podswietlenie aktywnego fragmentu `H7`/`g6`: 120 ms.
- Mini-przekroj aktualizuje szczeline 150 ms.
- Podpowiedzi pasowan rozwijaja sie przez 120 ms opacity/height, ale odczyt wyniku nie czeka.
- Przy blednym symbolu linia ma krotki shake 140 ms; przy `prefers-reduced-motion` tylko czerwony obrys.
- Zmiana trybu robi przejscie zawartosci linii 160 ms crossfade.

**Co traci uzytkownik**

- Mniej przyjazne dla osob, ktore kompletnie nie znaja zapisu `H7/g6`; trzeba dobrze zaprojektowac podpowiedzi.
- Brak stale widocznych list liter i klas moze spowolnic uzytkownika, ktory wybiera z tablicy zamiast wpisywac.
- To najmniej edukacyjny, najbardziej "produkcyjny" wariant.

**Szacunek pracy:** 16-24 h.

## 5. Mapa pasowan z lupa wyniku

**Co uzytkownik widzi po wejsciu:** zamiast listy kafelkow widzi mala mape normalnych pasowan: wiersze `luzne/mieszane/ciasne`, kolumny najczestszych symboli; po wskazaniu komorki po prawej natychmiast widzi przekroj i wynik.

**Kompaktowosc**

- Obecne trzy grupy kafelkow staja sie glownym sterowaniem, ale sa upakowane w jedna tabele-mape o wysokosci ok. 140-180 px.
- Tryb `Wymiary na podstawie pasowania` jest domyslny i nie potrzebuje duzego przycisku; tryb odwrotny jest linkiem/zakladka `dobierz po luzie`.
- Srednica jest jednym polem nad mapa z malymi chipami najczestszych srednic w tym samym wierszu.
- Zasada stalego otworu/walka przelacza cala mape i zmienia jej naglowek.
- Wynik po prawej jest stale widoczny jako "lupa" zaznaczonej komorki: symbol, typ, zakres µm, mini-przekroj.
- Tabela i zapis sa schowane pod mapa w `Dane szczegolowe`.

**Czytelnosc walka i otworu**

- Kazda komorka mapy ma mikrosymbol: zewnetrzny pierscien `otwor` i wewnetrzny pelny walec `walek`; po zaznaczeniu komorki mikrosymbol powieksza sie w panelu wyniku.
- Naglowek mapy ma dwa stale znaczniki: `OTWOR` z ikona piasty i `WALEK` z ikona trzpienia.
- W panelu wyniku `H7` jest nadrukowane na pierscieniu otworu, `g6` na walku.
- Wariant stalego otworu moze wizualnie blokowac pierscien `H` klodka albo pinezka `staly`, a zmieniac tylko walek; wariant stalego walka odwrotnie.

**Animacja**

- Przejscie zaznaczenia po mapie: ramka komorki 100 ms.
- Lupa wyniku aktualizuje przekroj 160 ms przez morph szerokosci szczeliny.
- Zmiana zasady obraca/odwraca akcent `staly element` przez 180 ms albo po prostu przesuwa znacznik stalego elementu.
- W trybie odwrotnym znalezione propozycje podswietlaja sie na mapie od razu, a reszta blednie w 140 ms.
- `prefers-reduced-motion`: brak morphingu i bledniecia, tylko stan koncowy.

**Co traci uzytkownik**

- Uklad faworyzuje pasowania uprzywilejowane i najczestsze; mniej wygodny dla dowolnych liter spoza mapy.
- Trzeba przewidziec, gdzie schowac pelny wybor liter/klas, zeby nie popsuc kompaktowosci.
- Na telefonie mapa wymaga albo poziomego przewijania, albo zamiany na segmentowane listy.

**Szacunek pracy:** 20-30 h.

## Najbardziej sensowny kierunek

Najlepszy kompromis dla roboczego narzedzia to **Przekroj montazowy** albo **Pulpit suwmiarki**.

**Przekroj montazowy** najmocniej rozwiazuje problem "co jest walkiem, a co otworem", bo pokazuje czesc z pusta przestrzenia i pelny trzpien. Jest dobry, jesli strona ma tez uczyc poczatkujacych.

**Pulpit suwmiarki** jest bardziej kompaktowy i szybszy w uzyciu podczas projektowania. Mniej edukuje, ale szybciej prowadzi do liczby. Jesli wynik ma byc zawsze bez przewijania na laptopie, ten wariant jest najbezpieczniejszy.

Nie rekomendowalbym zaczynania od wariantu 3, mimo ze jest najbardziej obrazowy. Ma najwieksze ryzyko, ze animacja montazu zacznie dominowac nad wynikiem. Wariant 4 jest swietny dla zaawansowanych, ale moze byc zbyt skrotowy dla pierwszego kontaktu z tematem. Wariant 5 jest mocny, jezeli Lukasz chce promowac pasowania uprzywilejowane i typowe wybory, ale gorzej obsluguje dowolny symbol.

## Minimalny zakres animacji bez opozniania wyniku

- Wynik liczbowy renderowac synchronicznie po zmianie stanu.
- Animowac tylko warstwe wizualna: obrys, szczeline, podswietlenie stalego elementu, rozwijanie szczegolow.
- Czasy trzymac w zakresie 100-260 ms.
- Nie animowac wysokosci calego kalkulatora przy kazdej zmianie pola, bo to przesuwa wynik.
- Dodac globalna regule:

```css
@media (prefers-reduced-motion: reduce) {
  .kalkulator *,
  .kalkulator *::before,
  .kalkulator *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Co warto zachowac z obecnej wersji

- Obliczenia i model danych moga zostac bez zmian.
- Skroty pasowan sa wartosciowe, tylko nie powinny zajmowac trzech wysokich grup przed wynikiem.
- Tabela odchylek jest potrzebna, ale jako szczegoly po wyniku, nie jako element pierwszego odczytu.
- Zapis na rysunku jest dobry, lecz powinien byc blisko wyniku albo w akordeonie `Do rysunku`.
- Kolory typow pasowania sa czytelne: zielony dla luznego, zolty dla mieszanego, rdzawy dla ciasnego. W nowych widokach powinny kolorowac szczeline/wcisk, a nie tylko odznake.
