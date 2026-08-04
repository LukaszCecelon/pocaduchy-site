# Koncepcje radykalnie innych animacji otwarcia strony glownej

Kontekst: `src/pages/index.js`, `src/pages/index.module.css` i `ARCHITEKTURA.md`.
Strona ma byc wizytowka inzyniera konstruktora maszyn Lukasza Cecelona i
jednoczesnie przedluzeniem kanalu poCADuchy. Obecny hero ma juz: warstwowa
zebatke 3D w SVG, rysowanie naglowka, paralakse za kursorem, logo w odznace
z orbitujacym pierscieniem, triade osi i tabliczke CAD.

Wspolny warunek dla wszystkich koncepcji: naglowek, lead i przyciski renderuja
sie natychmiast jako zwykly HTML. Animacja jest warstwa `aria-hidden`, absolutnie
pozycjonowana w tle albo na marginesie, startuje po pierwszym renderze i nie
blokuje LCP. W `prefers-reduced-motion: reduce` zostaje statyczna plansza
techniczna albo pojedynczy stan koncowy bez petli.

## 1. Tolerancja, ktora zamyka mechanizm

**Pierwsze 2 sekundy:** uzytkownik widzi techniczny przekroj prostego zespolu:
wal, lozysko, piasta i sruby sa poczatkowo rozsuniete o ulamki milimetra,
po czym znaczniki tolerancji, pasowan i bicie osiowe zamykaja sie w jeden
precyzyjny montaz.

**Dlaczego to pasuje do konstruktora maszyn:** to nie jest ogolna animacja
"technologiczna", tylko pokaz myslenia konstruktora: pasowanie, baza, os,
lozyskowanie, sruby, luz montazowy. Uzytkownik dostaje sygnal, ze tu nie chodzi
o ladne CAD-y, ale o decyzje projektowe, ktore decyduja, czy czesc da sie
wykonac, zlozyc i utrzymac w pracy.

**Jak zrobic technicznie bez bibliotek:** SVG jako warstwa tla hero. Kazdy
element zespolu to grupa `<g>`: wal, lozysko, oprawa, piasta, sruby, osie,
wymiarowanie, ramki tolerancji geometrycznej. CSS animuje `transform` grup:
`translateX`, `translateY`, lekki `rotate`, a potem `opacity` i
`stroke-dashoffset` dla linii wymiarowych. Wartosci tolerancji mozna wpisac
jako prawdziwie techniczne etykiety, np. `H7/g6`, `0.02 A`, `Ra 1.6`, `M8x1.25`.
Sciete rogi design systemu pojawiaja sie w tabliczkach wymiarowych przez
`clip-path: polygon(...)`. Na desktopie mozna dodac subtelna reakcje kursora:
przesuniecie tylko warstwy wymiarow, nie calego montazu. Na telefonie animacja
skracana do jednego osiowego zsuniecia elementow.

**Koszt wydajnosciowy i LCP:** niski do sredniego. To kilkadziesiat elementow
SVG i animacje transform/opacity, bez canvasa i bez obliczen w petli JS. Da sie
utrzymac LCP ponizej 1 s, jesli SVG jest inline, nie zawiera rastrowych obrazow,
a tekst i CTA nie czekaja na zakonczenie animacji. Najwieksze ryzyko to zbyt
duzo linii i etykiet tekstowych w SVG; trzeba pilnowac prostoty, np. 40-70
elementow zamiast pelnego rysunku wykonawczego.

**Czym rozni sie od obecnej strony:** obecnie jest efektowna bryla zebatki
i klimat okna CAD. Ta koncepcja pokazuje proces inzynierskiego domykania
specyfikacji: tolerancje, bazy i montaz. Zamiast "model sie obraca", widac
"projekt zaczyna dzialac".

## 2. Rozwiniecie blachy z gieciem i sprezynowaniem

**Pierwsze 2 sekundy:** plaski wykroj blachy z liniami giecia pojawia sie
jak arkusz z lasera, po czym zalamuje sie w przestrzen, lapy i przetloczenia
wchodza pod kat, a na koncu pokazuje sie strzalka kompensacji sprezynowania.

**Dlaczego to pasuje do konstruktora maszyn:** giecie blachy jest konkretnym
problemem konstrukcyjnym: promien giecia, K-factor, kolejnosc operacji, kolizja
narzedzia, sprezynowanie materialu. To natychmiast odroznia strone od typowej
wizytowki, bo pokazuje temat, ktory zna praktyk, a nie osoba robiaca dekoracje
"industrial".

**Jak zrobic technicznie bez bibliotek:** hybryda HTML/CSS/SVG. W SVG rysujemy
rzut 2D: obrys wykroju, linie giecia, otwory, numeracje operacji. Na nim
nakladamy kilka absolutnych `div` albo `svg`-grup reprezentujacych panele blachy.
CSS 3D (`transform-style: preserve-3d`, `rotateX`, `rotateY`, `transform-origin`)
animuje zalamanie paneli wokol linii giecia. Otwory zostaja w panelach jako
maski SVG albo `clip-path`. Dla efektu inzynierskiego w 1.4 s pojawia sie mala
notacja: `S235 | t=3 mm | R=4 mm | K=0.42`, a w 1.8 s rdzawa linia pokazuje
korekte kata z `88.5 deg` na `90 deg`.

**Koszt wydajnosciowy i LCP:** sredni, ale kontrolowalny. CSS 3D na kilku
plaskich panelach jest tanszy niz canvas 3D i nie wymaga bibliotek. LCP ponizej
1 s jest realne, jesli elementy hero sa zwyklym tekstem, a animowane panele maja
ustalone wymiary i startuja po renderze. Na telefonie nalezy ograniczyc do
jednego wykroju, dwoch-trzech paneli i braku petli; po 2 s zostaje statyczny
aksonometryczny detal.

**Czym rozni sie od obecnej strony:** obecny motyw to ciezka obrotowa zebatka.
Tutaj bohaterem jest przemiana rysunku technologicznego w forme przestrzenna.
To inny typ konstrukcji, inny ruch i inny komunikat: projektant mysli nie tylko
w CAD, ale tez w technologii wykonania.

## 3. Symulacja kolizji w zlozeniu

**Pierwsze 2 sekundy:** w tle hero dwa elementy mechanizmu probuja wykonac
ruch roboczy; czerwona strefa kolizji zapala sie na ulamek sekundy, po czym
ramie dostaje korekte ksztaltu i mechanizm przechodzi przez pelny zakres bez
zderzenia.

**Dlaczego to pasuje do konstruktora maszyn:** to jest sytuacja z realnej pracy
konstruktora: ruch, zakres, interferencja, poprawka geometrii. Odbiorca widzi,
ze autor nie sprzedaje abstrakcyjnego "projektowania", tylko rozumie, gdzie
projekt peka w praktyce: na kolizjach, montazu, serwisie i ruchu pod obciazeniem.

**Jak zrobic technicznie bez bibliotek:** Canvas 2D z bardzo malym rendererem
wlasnym. Rysujemy mechanizm jako kilka prostych wielokatow i okregow:
podstawa, wahacz, korbowod, suwak, strefa obrysu narzedzia lub oslony. Ruch
jest parametryczny: `angle -> points`, bez fizyki i bez biblioteki. Detekcja
kolizji moze byc uproszczona: przygotowane przedzialy kata lub test przeciecia
prostokatow/poligonow dla jednej kontrolowanej sceny. W pierwszym przebiegu
mechanizm zatrzymuje sie przy kolizji, rdzawa maska pokazuje konflikt, potem
drugi ksztalt wahacza jest morfowany przez interpolacje punktow i mechanizm
robi czysty przejazd. Naglowek i CTA leza nad canvasem jako HTML. Canvas ma
`devicePixelRatio` ograniczony np. do 1.5, z pauza po 2-3 sekundach.

**Koszt wydajnosciowy i LCP:** sredni. Canvas 2D z kilkoma ksztaltami jest tani,
ale wymaga ostroznego startu: pierwszy render strony bez czekania na animacje,
canvas inicjalizowany w `requestAnimationFrame` po mount. LCP ponizej 1 s jest
osiagalne, bo canvas nie jest kandydatem LCP, jesli najwiekszym widocznym
elementem pozostanie tekst hero lub logo. Na slabszych telefonach mozna od razu
wyswietlic stan "po korekcie" jako statyczny rysunek SVG albo odtworzyc tylko
jedna polsekundowa sekwencje.

**Czym rozni sie od obecnej strony:** obecna animacja jest wizualizacja modelu.
Ta koncepcja pokazuje problem, blad i decyzje konstruktora. To bardziej
narracyjne otwarcie: w dwie sekundy widac kompetencje, nie tylko dekoracyjny
obiekt techniczny.

## 4. Rysunek wykonawczy, ktory sam przechodzi kontrole

**Pierwsze 2 sekundy:** ekran wyglada jak fragment rysunku wykonawczego:
rzuty, przekroj, wymiar bazowy, chropowatosc i tabliczka. Po chwili przez
rysunek przechodza trzy kontrolne suwaki: baza A, srednica pod lozysko i gwint.
Kazdy parametr dostaje stempelek `OK`, a jeden wymiar zostaje podswietlony jako
"kosztowny blad" i poprawiony.

**Dlaczego to pasuje do konstruktora maszyn:** rysunek techniczny jest jednym
z glownych tematow kanalu i jezykiem porozumienia z produkcja. Efekt wow nie
wynika z fajerwerkow, tylko z pokazania, ze strona rozumie odpowiedzialnosc
rysunku: baza, tolerancja, wykonanie, kontrola jakosci. To komunikat dla
inzyniera, technologa i studenta: tu bedzie konkret.

**Jak zrobic technicznie bez bibliotek:** czyste SVG inline. Rzuty i przekroje
sa prostymi pathami z `stroke-dasharray` i `pathLength="1"`. Kontrolne suwaki
to grupy SVG z linia, znacznikiem i malym prostokatem ze scietymi rogami.
Animacja: najpierw rysuja sie tylko kluczowe kontury, ale naglowek HTML jest
widoczny od razu; potem suwaki przesuwaja sie przez rysunek przez CSS
`transform`. Podswietlenie bledu mozna zrobic maska i kolorem rdzy:
`stroke: #96453b`, krotki `filter: drop-shadow(...)`, bez rozmytych gradientow.
Poprawka wymiaru to zamiana tekstu przez dwa nalozone `<text>` z animacja
opacity, np. `12.00 +/-0.01` gasnie, `12.00 h6` zostaje. Na telefonie widoczny
jest tylko jeden rzut i jedna kontrola, bez mikrotekstu.

**Koszt wydajnosciowy i LCP:** niski. SVG jest lekki, skalowalny i przewidywalny.
LCP ponizej 1 s jest najbardziej realne z calej czworki, bo animacja moze byc
czysto CSS-owa, bez JS poza ewentualnym dodaniem klasy startowej po mount.
Trzeba tylko nie przesadzic z liczba opisow tekstowych, bo male napisy i tak
nie beda czytelne na mobile. W `prefers-reduced-motion` zostaje statyczny
rysunek z jednym rdzawym akcentem i bez przesuwania suwakow.

**Czym rozni sie od obecnej strony:** obecny hero komunikuje CAD i model 3D.
Ta koncepcja przenosi akcent na dokumentacje, kontrole i odpowiedzialnosc
projektowa. Nie ma obrotu bryly ani orbitujacej dekoracji; jest techniczny
rytual sprawdzenia rysunku.

## Ktore pomysly odrzucic

- Czastki, pyl, iskry, siatki punktow i "digital rain" - generyczny kod
  technologiczny, nie konstrukcja maszyn.
- Gradient mesh, bokeh, duze rozmyte swiatla - ladne, ale nie niosa zadnej
  kompetencji inzynierskiej.
- Typewriter i zwykly fade-in - efekt z dowolnego portfolio, a obecny hero
  juz ma rysowanie naglowka.
- Kolejna obracajaca sie czesc 3D - bylaby wariantem obecnej zebatki, nie
  radykalnie inna koncepcja.
- Infantylne "skladanie z klockow" albo maskotkowy druk 3D - oslabia ton
  strony, ktora ma mowic do praktykow.

## Najmocniejszy kierunek

Najbardziej odmienna od obecnego hero jest **Symulacja kolizji w zlozeniu**,
bo pokazuje nie obiekt, tylko diagnoze problemu i decyzje projektowa. Najlatwiejsza
do wdrozenia bez ryzyka dla LCP jest **Rysunek wykonawczy, ktory sam przechodzi
kontrole**. Jesli celem jest maksymalny efekt pierwszego wrazenia przy zachowaniu
statycznej prostoty hostingu, wybralbym kierunek 3 jako docelowy i kierunek 4
jako bezpieczny wariant produkcyjny.
