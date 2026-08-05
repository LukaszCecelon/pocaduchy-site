# Kalkulatory na pocaduchy.pl: wszystkie pomysly w jednym miejscu

Wynik dwoch rund i czterech niezaleznych analiz (Claude i Codex osobno
w kazdej rundzie) plus propozycja Lukasza. Razem **21 pomyslow**.

Kolejnosc wdrozenia i uzasadnienia: `kalkulatory-master.md`.
Pelne opisy z wzorami, zrodlami i polami wejsciowymi: `kalkulatory-claude.md`,
`kalkulatory-codex.md`, `kalkulatory-runda2-claude.md`,
`kalkulatory-runda2-codex.md`.

Legenda ryzyka: **zadne** znaczy, ze bledny wynik kosztuje najwyzej chwile
zastanowienia. **Niskie** znaczy strate materialu albo czasu. **Srednie**
znaczy niedzialajaca maszyne. **Wysokie** znaczy uszkodzenie maszyny albo
zagrozenie dla czlowieka.

---

# RUNDA PIERWSZA

## 1. Wspolrzedne otworow na okregu podzialowym

Wpisujesz srednice okregu, liczbe otworow i kat startowy. Dostajesz
wspolrzedne X i Y kazdego otworu, gotowe do wpisania w CAD albo w program
na maszyne.

Uzywane przy kazdym kolnierzu, tarczy i pokrywie. Wynik idzie wprost do
modelu, wiec wartosc jest natychmiastowa.

**Zrodlo pomyslu:** Codex. **Ryzyko:** zadne. **Koszt:** 4-6 h.

## 2. Rozwiniecie blachy gietej

Wpisujesz grubosc, promien giecia, kat i material. Dostajesz dlugosc
rozwiniecia, dlugosci odcinkow prostych i naddatek na gniecie.

Klasyczny przypadek, w ktorym tabela nie ma szans: cztery zmienne naraz daja
tysiace kombinacji. Szuka tego i konstruktor, i blacharnia.

**Zrodlo pomyslu:** Claude. **Ryzyko:** niskie. **Koszt:** 8-12 h.

## 3. Czas cyklu ruchu liniowego

Wpisujesz droge, predkosc maksymalna, przyspieszenie i opoznienie. Dostajesz
czas przejazdu oraz informacje, czy ruch zdazyl osiagnac predkosc maksymalna,
czyli czy profil jest trapezowy czy trojkatny.

Liczone przy kazdej maszynie taktowanej. Wzor ma przypadek graniczny, o ktorym
latwo zapomniec przy krotkich przejazdach.

**Zrodlo pomyslu:** Claude. **Ryzyko:** niskie. **Koszt:** 6-10 h.

## 4. Sila silownika pneumatycznego, liczona w obie strony

Wpisujesz srednice tloka **albo** wymagana sile. W pierwszym przypadku
dostajesz sile wysuwu i wsuwu, w drugim minimalna srednice tloka z podpowiedzia
najblizszego typoszeregu.

Odwracalnosc jest tu calym sensem. Realne pytanie brzmi „jaki silownik uniesie
400 N", a nie odwrotnie.

**Zrodlo pomyslu:** obie analizy. **Ryzyko:** srednie. **Koszt:** 8-12 h.
**Laczy sie z:** artykulem o elektrozaworach.

## 5. Zuzycie powietrza przez silownik

Wpisujesz srednice tloka, skok, cisnienie i liczbe cykli na minute.
Dostajesz zuzycie w normalnych litrach na minute i szacunkowy koszt
sprezonego powietrza.

Pytanie kazdego, kto dobiera sprezarke albo tlumaczy klientowi koszt
eksploatacji. Po polsku nie ma na nie dobrej odpowiedzi.

**Zrodlo pomyslu:** Codex. **Ryzyko:** niskie. **Koszt:** 8-12 h.

## 6. Masa i koszt polfabrykatu

Wybierasz material i bryly podstawowe z wymiarami, mozesz odejmowac otwory.
Dostajesz mase calkowita, mase kazdej bryly i przyblizony srodek ciezkosci.

Przydatne na etapie koncepcji, gdy modelu jeszcze nie ma, a trzeba dobrac
manipulator, ocenic transport albo podac zgrubna wycene.

**Zrodlo pomyslu:** obie analizy. **Ryzyko:** niskie. **Koszt:** 6-8 h.

## 7. Pasowanie na luz i odwrotnie

Wpisujesz srednice i pare pasowania, albo srednice i wymagany luz. Dostajesz
luz minimalny i maksymalny, wcisk oraz interpretacje slowna.

Tabela pasowan ma dwa wymiary naraz, a konstruktor czesto idzie od strony
wymaganego luzu, nie od oznaczenia.

**Zrodlo pomyslu:** Claude. **Ryzyko:** niskie. **Koszt:** 8-10 h.

## 8. Zmiana luzu od temperatury

Wpisujesz srednice, materialy obu elementow i zakres temperatur pracy.
Dostajesz zmiane luzu albo wcisku i ostrzezenie, gdy pasowanie zmienia
charakter.

Najbardziej ekspercki temat z calej puli i najwieksza luka po polsku.

**Zrodlo pomyslu:** Codex. **Ryzyko:** srednie. **Koszt:** 8-10 h.

## 9. PERT: szacowanie czasu projektowania

Wpisujesz dla kazdego zadania czas optymistyczny, najbardziej prawdopodobny
i pesymistyczny. Dostajesz wartosc oczekiwana, odchylenie i sume dla projektu.

Najtanszy pomysl z calej puli i jedyny, ktory ma **gotowy artykul na stronie**.
Wada: popyt wyszukiwarkowy jest niski, bo nikt nie szuka tego, projektujac
maszyne.

**Zrodlo pomyslu:** obie analizy. **Ryzyko:** zadne. **Koszt:** 4-6 h.

## 10. Moment dokrecania z wlasnym wspolczynnikiem tarcia

Wpisujesz gwint, klase sruby, wspolczynnik tarcia i stopien wykorzystania
granicy plastycznosci. Dostajesz moment, sile wstepna i **roznice wzgledem
wartosci katalogowej**.

Jedyny kalkulator, ktory tlumaczy, dlaczego katalogi podaja rozne wartosci dla
tej samej sruby. W researchu wyszlo: dla M12 klasy 8.8 Wurth podaje 93 Nm,
MISUMI 99,8 Nm, a wzor przy tarciu 0,14 daje 103 Nm.

**Zrodlo pomyslu:** Claude. **Ryzyko:** wysokie. **Koszt:** 10-14 h.

---

# RUNDA DRUGA

## 11. Przelicznik konstruktora

Wpisujesz wartosc i jednostke, dostajesz **komplet odpowiednikow naraz**.
Kategorie: cisnienie (bar, MPa, psi), moment (Nm, kgf*m, lb*ft), sila,
dlugosc z calami ulamkowymi, przeplyw powietrza (Nl/min, m3/h, cfm),
predkosc obrotowa, masa, gestosc, temperatura.

Przy kazdej kategorii jedno zdanie o tym, gdzie ludzie sie mylą. Przy
przeplywie: normalny litr to objetosc sprowadzona do warunkow odniesienia,
wiec nie da sie go przeliczyc na litr rzeczywisty bez podania cisnienia.
Tego nie tlumaczy zaden przelicznik w sieci.

**Zrodlo pomyslu:** Lukasz. **Ryzyko:** zadne. **Koszt:** 6-8 h.

## 12. Lancuch wymiarowy: skladanie tolerancji

Wpisujesz liste wymiarow z tolerancjami i kierunek kazdego w lancuchu.
Dostajesz wynik metoda najgorszego przypadku **oraz** statystyczna, z jawnym
pokazaniem roznicy miedzy nimi.

Rozjezdzajacy sie lancuch wymiarowy to jedna z najczestszych przyczyn tego, ze
czesci nie pasuja przy montazu. Kazdy liczy to w Excelu, bo nie ma lepszego
narzedzia, a polski internet nie ma na to nic.

**Zrodlo pomyslu:** Claude i Codex niezaleznie, oba jako pozycja numer jeden
drugiej rundy. **Ryzyko:** niskie. **Koszt:** 10-14 h.
**Laczy sie z:** artykulem o weryfikacji CAD przed produkcja.

## 13. Druk 3D: masa, dlugosc filamentu, koszt i czas

Wpisujesz objetosc modelu albo wymiary, material, wypelnienie, liczbe scianek
i cene szpuli. Dostajesz mase wydruku, zuzyty metr filamentu, koszt materialu
i zgrubny czas.

Jedyny kalkulator z calej puli, ktory laczy sie **bezposrednio z kanalem
YouTube**, czyli z jedyna publicznoscia, jaka juz jest.

**Zrodlo pomyslu:** obie analizy. **Ryzyko:** zadne. **Koszt:** 8-10 h.

## 14. Optymalizator ciecia pretow i profili

Wpisujesz dlugosc materialu handlowego i liste potrzebnych odcinkow.
Dostajesz plan ciecia, liczbe potrzebnych sztuk i procent odpadu.

Wynikiem nie jest liczba, tylko **gotowy plan do produkcji**, a oszczednosc
jest natychmiast materialowa.

**Zrodlo pomyslu:** Codex. **Ryzyko:** niskie. **Koszt:** 12-16 h.

## 15. Chropowatosc z posuwu i promienia naroza

Wpisujesz posuw na obrot i promien naroza plytki, albo odwrotnie: wymagane Ra.
Dostajesz teoretyczne Ra i Rz, albo maksymalny posuw przy zadanej chropowatosci.

Laczy konstruktora z technologiem. Pokazuje, ze wpisanie ostrzejszej
chropowatosci to decyzja o czasie obrobki, a nie kosmetyka na rysunku.

**Zrodlo pomyslu:** Claude. **Ryzyko:** niskie. **Koszt:** 6-8 h.

## 16. Kompensacja skurczu wydruku 3D

Wpisujesz material, wymiar nominalny i zmierzony wymiar wydruku. Dostajesz
wspolczynnik korekty do wpisania w slicer albo poprawiony wymiar modelu.

**Zrodlo pomyslu:** Codex. **Ryzyko:** zadne. **Koszt:** 6-8 h.

## 17. Pozycja rzeczywista GD&T z warunkiem maksimum materialu

Wpisujesz odchylki polozenia otworu i jego srednice. Dostajesz pozycje
rzeczywista, tolerancje dostepna i bonus wynikajacy z warunku maksimum
materialu.

Trudne do policzenia recznie, a wiekszosc konstruktorow nie korzysta z bonusu,
bo nie wie, ze mu przysluguje.

**Zrodlo pomyslu:** Codex. **Ryzyko:** niskie. **Koszt:** 10-12 h.

## 18. Czas frezowania i objetosc wiora

Wpisujesz parametry narzedzia i skrawania. Dostajesz objetosc usuwanego
materialu na minute i szacunkowy czas obrobki.

**Zrodlo pomyslu:** Codex. **Ryzyko:** niskie. **Koszt:** 8-10 h.

## 19. Dlugosc pasa albo lancucha przy danym rozstawie osi

Wpisujesz srednice albo liczby zebow kol i rozstaw osi. Dostajesz wymagana
dlugosc, najblizsze dlugosci typoszeregowe **oraz rozstaw po zaokragleniu**.

Kupuje sie pas o dlugosci z katalogu, wiec rozstaw osi trzeba dopasowac do
niego, a nie odwrotnie. To jest liczenie w obie strony.

**Zrodlo pomyslu:** Claude. **Ryzyko:** niskie. **Koszt:** 8-10 h.

## 20. Moment i bezwladnosc zredukowana przez przekladnie

Wpisujesz moment albo bezwladnosc po stronie obciazenia, przelozenie
i sprawnosc. Dostajesz wartosci sprowadzone na wal silnika oraz stosunek
bezwladnosci obciazenia do silnika.

Stosunek bezwladnosci decyduje o tym, czy naped da sie nastroic, a poczatkujacy
zwykle o nim nie wiedza.

**Zrodlo pomyslu:** Claude. **Ryzyko:** niskie. **Koszt:** 8-10 h.
**Laczy sie z:** artykulem o doborze sprzegla.

## 21. Nacisk powierzchniowy pod lbem sruby

Wpisujesz sile wstepna albo moment, rodzaj lba, obecnosc podkladki i material.
Dostajesz nacisk w MPa, porownanie z dopuszczalnym i ostrzezenie o wgnieceniu.

Wgniecenie pod lbem to czesta przyczyna luzowania sie polaczen, a prawie nikt
tego nie sprawdza.

**Zrodlo pomyslu:** Claude. **Ryzyko:** srednie. **Koszt:** 8-10 h.

---

# Pomysly odrzucone i powody

| Pomysl | Powod odrzucenia |
|---|---|
| Ugiecie belki albo profilu wspornikowego | wynik decyduje o bezpieczenstwie; strona nie jest biurem obliczeniowym |
| Sruba trapezowa przy osiach pionowych | opadniecie osi pionowej to wypadek, nie usterka |
| Dobor lozyska z trwaloscia L10 | wzor jest publiczny, ale realny dobor wymaga obciazen zastepczych, ktorych uzytkownik nie poda poprawnie |
| Dobor sprezyny do zastosowan bezpieczenstwa | zawory, hamulce i zabezpieczenia wymagaja obliczen certyfikowanych |
| Modul przekroju i moment bezwladnosci figur | dopuszczalny wylacznie jako czysta geometria, bez naprezen; przy tym ograniczeniu traci wieksz osc wartosci |
| Energia uderzenia i dobor zderzaka | wchodzi tylko jako wartosc orientacyjna z odeslaniem do producenta amortyzatora |
| Wycena ciecia laserem, koszt partii, pokrycie lakierem | wyniki zaleza mocno od konkretnego zakladu; kalkulator sprawialby wrazenie, ze podaje prawde, gdy podaje zalozenie |
| Przeplyw objetosciowy FDM i maksymalna predkosc druku | zbyt zalezne od konkretnej drukarki i dyszy |
| Przelicznik jednostek ogolny | zastapiony przelicznikiem konstruktora, zawezonym do jednostek technicznych i po polsku |
| Gestosci materialow, chropowatosc jako tabela, otwor pod gwint | to sa tabele do zakladki Wiedza, nie kalkulatory |

# Zasada, ktora dotyczy kazdej pozycji

**Sam formularz nie wypozycjonuje sie na nic.** Google indeksuje strone
kalkulatora slabo, bo tresc powstaje dopiero po interakcji uzytkownika.

Kazdy kalkulator musi miec obok siebie: wzor zapisany jawnie, wyjasnienie
symboli, przyklad liczbowy rozwiazany krok po kroku, tabele typowych wartosci
oraz zalozenia wypisane przy wyniku, a nie w stopce strony.

To jest wazniejsze niz sam kalkulator.
