# Rysunek przy tablicy pierścieni osadczych

Rekomenduję jeden responsywny, przyklejony panel odniesienia z pomniejszonym rysunkiem i legendą, ograniczony do obrębu własnej tablicy, ponieważ na telefonie utrzymuje znaczenie symboli w polu widzenia, a jednocześnie zostawia miejsce na około 12 pełnych wierszy danych.

## Stan obecny i pomiary

Pomiary wykonałem na gotowym buildzie odpowiadającym obecnym źródłom, w Chromium przy powiększeniu 100 procent. Wysokości obejmują rzeczywiste fonty i zawijanie tekstu. Pionowy pasek przewijania przeglądarki miał 15 px.

### Pasek nawigacji i odsunięcie od góry

`src/css/custom.css` zmienia tło paska, ale nie zmienia jego wysokości. Infima, na której opiera się motyw Docusaurusa 3.10.2, ustawia:

```css
:root {
  --ifm-navbar-height: 3.75rem;
}

.navbar--fixed-top {
  position: sticky;
  top: 0;
  z-index: var(--ifm-z-index-fixed);
}
```

Przy bazowym rozmiarze fontu 16 px daje to pasek wysoki na 60 px. Pomiar DOM potwierdził 60 px zarówno przy szerokości 375 px, jak i 1100 px. W projekcie nie ma `scroll-padding-top`. Docusaurus stosuje tylko `scroll-margin-top: calc(var(--ifm-navbar-height) + 0.5rem)` na celach kotwic, czyli efektywnie 68 px. Dlatego drugi element przyklejony powinien mieć `top: calc(var(--ifm-navbar-height) + 8px)`, a nie wpisane na sztywno `68px`.

Istniejący panel boczny artykułu ma `top: 84px`. Nie koliduje z proponowanym panelem, ponieważ jest w osobnej kolumnie siatki, a poniżej 800 px przestaje być przyklejony.

### Szerokość kolumny artykułu

`.wrap` ma `width: 100%`, `max-width: 1180px` i poziomy padding po 32 px. Globalne `box-sizing: border-box` powoduje, że padding mieści się w tej szerokości. `.layout` odejmuje następnie pasek boczny 240 px i odstęp 56 px.

| Szerokość okna | Szerokość `.wrap` | Wnętrze po odjęciu paddingu | Kolumna artykułu | Wyliczenie |
| ---: | ---: | ---: | ---: | --- |
| 375 px | 375 px | 311 px | 311 px | poniżej 800 px siatka ma jedną kolumnę |
| 1100 px | 1085 px | 1021 px | 725 px | `1085 - 64 - 240 - 56` |
| 1400 px | 1180 px | 1116 px | 820 px | `1180 - 64 - 240 - 56` |

Przy 1100 px czysto geometryczny wynik bez klasycznego paska przewijania wyniósłby 740 px. Rzeczywisty pomiar wynosi 725 px, bo pionowy scrollbar zabiera 15 px. Przy 1400 px działa już `max-width: 1180px`, więc scrollbar poza wyśrodkowanym kontenerem nie zmienia wyniku 820 px.

### Obecna struktura i wysokość bloku

`TabelaPierscieniBlock` renderuje kolejno:

```text
figure.tabelaPierscieni
  div.plotnoRowka
    svg.cadRowka
    cztery etykiety HTML: d1, d2, m, n
  dl.legendaRowka
    pięć pozycji: d1, d2, m, t, n
  div.tabelaPierscieniWrap
    table
      caption
      thead
      tbody
  figcaption.tabelaPierscieniPodpis
```

Rysunek jest responsywnym SVG w `.plotnoRowka`, którego szerokość jest ograniczona do 340 px. Legenda jest osobnym `dl` na pełną szerokość artykułu. Oba elementy są przed kontenerem przewijania tabeli.

| Okno | Rysunek | Legenda | Od góry rysunku do dołu legendy | Miejsce zajęte do początku tabeli |
| --- | ---: | ---: | ---: | ---: |
| 375 na 812 px | 311 na 279,2 px | 311 na 212,6 px | 509,8 px | 527,8 px |
| 1100 na 812 px | 340 na 305,3 px | 725 na 148,0 px | 471,2 px | 489,2 px |

Ostatnia kolumna obejmuje margines 18 px pod rysunkiem i 18 px pod legendą. Przy 1400 px wysokość pozostaje taka sama jak przy 1100 px, ponieważ rysunek osiągnął już `max-width: 340px`, a tekst legendy nie zawija się inaczej.

Tabela ma w pomiarze nagłówek opisowy `caption` wysoki na 43,1 px, `thead` wysoki na 35,6 px oraz wiersz danych wysoki na 41,4 px. Gdyby przykleić obecny rysunek razem z legendą na telefonie, pasek nawigacji, odstęp 8 px i panel zajęłyby około 596 px z 812 px. Zostałoby 216 px, a po odjęciu `caption` i `thead` tylko 137 px, czyli około 3,3 wiersza danych. To odtwarza problem zamiast go rozwiązać.

### Poziome przewijanie

`.tabelaPierscieniWrap` ma `overflow-x: auto`, `min-width: 0` i `max-width: 100%`. Sama tabela ma `display: table`, `width: 100%` i `min-width: 640px`. Na telefonie kontener ma 311 px, ale tabela pozostaje szeroka na 640 px i jest przewijana wyłącznie wewnątrz kontenera. Tego układu nie należy zmieniać.

W podanym do kontroli `BlockRenderer.module.css` nie ma reguły `.tabelaZastosowan`. Taka klasa występuje w `KalkulatorPasowan.module.css` oraz w arkuszach stron narzędzi i dotyczy innej tabeli o `min-width: 560px`. Nie bierze udziału w DOM analizowanego artykułu i nie powinna być użyta jako wzór do tej zmiany.

## Zalecany układ

Należy opakować istniejące `SchematRowka` i `LegendaRowka` w jeden blok `.odniesienieRowka` i przykleić ten blok 8 px pod paskiem nawigacji. Panel pozostaje pierwszym elementem `figure`, więc na początku zajmuje zwykłe miejsce nad tabelą. Podczas przewijania zatrzymuje się pod navbarem, a na końcu własnego `figure` zostaje zwolniony. Panel DIN 471 nie przechodzi dzięki temu nad nagłówkiem DIN 472.

Na ekranie szerszym niż 700 px panel ma dwie kolumny: rysunek 200 px oraz pełną legendę. Na ekranie do 700 px, a także przy małej wysokości okna, rysunek ma 140 px, a legenda pokazuje krótkie, jednoznaczne opisy:

- `d1`: średnica wałka albo średnica otworu,
- `s`: grubość pierścienia,
- `d2`: średnica rowka,
- `m`: szerokość rowka,
- `t`: głębokość rowka,
- `n`: od czoła.

Warto dodać `s`, mimo że nie występuje na schemacie, bo jest kolumną tabeli i obecna legenda go nie wyjaśnia. Pełne opisy pozostają w statycznym HTML. Na małym ekranie są wizualnie ukryte, ale dostępne dla czytnika ekranu, natomiast krótkie odpowiedniki mają `aria-hidden="true"`, aby czytnik nie powtarzał tej samej informacji.

Proponowana struktura:

```jsx
<figure className={styles.tabelaPierscieni}>
  <div className={styles.odniesienieRowka}>
    <SchematRowka typ={typ} />
    <LegendaRowka typ={typ} />
  </div>

  <div className={styles.tabelaPierscieniWrap}>
    <table>{/* obecny statyczny caption, thead i tbody */}</table>
  </div>

  <figcaption className={styles.tabelaPierscieniPodpis}>
    {/* obecny podpis */}
  </figcaption>
</figure>
```

W `LegendaRowka` każda pozycja powinna przechowywać symbol, opis krótki i obecny opis pełny. Układ pojedynczego `dd` może wyglądać tak:

```jsx
<dd>
  <span className={styles.legendaOpisPelny}>{opis}</span>
  <span className={styles.legendaOpisSkrot} aria-hidden="true">
    {skrot}
  </span>
</dd>
```

Nie należy tworzyć kopii całego rysunku ani drugiego aktywnego panelu. Jeden panel oznacza jeden obraz dla czytnika ekranu, jeden porządek treści i brak synchronizacji dwóch wersji.

## Zalecane wartości CSS

Poniższy zestaw odtwarza zmierzony wariant. Nazwy istniejących klas pozostają bez zmian.

```css
.odniesienieRowka {
  position: sticky;
  top: calc(var(--ifm-navbar-height) + 8px);
  z-index: 10;
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: 16px;
  align-items: start;
  width: 100%;
  min-width: 0;
  padding: 10px;
  margin: 0 0 12px;
  border: 1px solid var(--pc-border);
  border-radius: 10px;
  background: #ffffff;
}

.odniesienieRowka .plotnoRowka {
  width: 100%;
  max-width: 200px;
  margin: 0;
}

.odniesienieRowka .legendaRowka {
  min-width: 0;
  margin: 0;
}

.legendaOpisSkrot {
  display: none;
}

@media (max-width: 700px), (max-height: 640px) {
  .odniesienieRowka {
    grid-template-columns: 140px minmax(0, 1fr);
    gap: 10px;
    padding: 8px;
  }

  .odniesienieRowka .plotnoRowka {
    max-width: 140px;
  }

  .odniesienieRowka .etRowka {
    font-size: 11px;
  }

  .odniesienieRowka .legendaRowka {
    gap: 2px;
  }

  .odniesienieRowka .legendaRowka > div {
    gap: 4px;
  }

  .odniesienieRowka .legendaRowka dt {
    flex: 0 0 2em;
    font-size: 11.5px;
  }

  .odniesienieRowka .legendaRowka dd {
    font-size: 11.5px;
    line-height: 1.25;
  }

  .legendaOpisPelny {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .legendaOpisSkrot {
    display: inline;
  }
}

@media (max-height: 640px) {
  .odniesienieRowka {
    position: static;
  }
}

@media print {
  .odniesienieRowka {
    position: static;
    grid-template-columns: 200px minmax(0, 1fr);
    break-inside: avoid;
  }

  .legendaOpisPelny {
    position: static;
    width: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .legendaOpisSkrot {
    display: none;
  }
}
```

Nie należy dodawać `overflow` do `.tabelaPierscieni`, `.odniesienieRowka` ani nadrzędnych elementów artykułu. Taki przodek stałby się kontenerem przewijania i mógłby unieruchomić `sticky` względem niewłaściwego obszaru. `overflow-x: auto` pozostaje wyłącznie na `.tabelaPierscieniWrap`, która jest rodzeństwem panelu, a nie jego przodkiem.

Nie należy też globalnie zwiększać `scroll-padding-top` o wysokość panelu. Panel występuje tylko wewnątrz dwóch figur, więc globalna wartość zostawiałaby zbędną pustą przestrzeń przy przechodzeniu do nagłówków w całej witrynie.

## Wynik liczbowy zalecanego układu

| Okno | Panel | Rysunek w panelu | Legenda | Miejsce pod navbarem i panelem | Pełne wiersze po odjęciu `caption` i `thead` |
| --- | ---: | ---: | ---: | ---: | ---: |
| 375 na 812 px | 311 na 143,8 px | 140 na 125,8 px | 143 na 123,8 px | 600,2 px | 12,6 |
| 1100 na 812 px | 725 na 201,6 px | 200 na 179,6 px | 487 na 178,3 px | 542,4 px | 11,2 |
| 1400 na 900 px | 820 na 201,6 px | 200 na 179,6 px | 582 na 178,3 px | 630,4 px | 13,3 |

Przy szerokości 375 px wszystkie cztery etykiety na pomniejszonym rysunku mieszczą się bez wzajemnego nachodzenia. Pomiar wykonano dla `font-size: 11px`. SVG pozostaje ostre na ekranie o dużej gęstości pikseli, ale 140 px należy traktować jako dolną granicę i sprawdzić jeszcze na rzeczywistym telefonie przy maszynowym oświetleniu.

Panel nie zasłania nagłówka w chwili, gdy tabela po raz pierwszy pojawia się pod nim, ponieważ zajmuje normalne miejsce w dokumencie i ma 12 px marginesu dolnego. Podczas dalszego przewijania `caption`, `thead` i wiersze przechodzą pod nieprzezroczystym panelem. Nie powstaje drugi przyklejony pasek, a rolę kontekstu przejmuje rysunek z legendą.

## Dostępność i tryby szczególne

Panel nie zawiera przycisków, linków ani pól, więc nie dodaje przystanków do nawigacji klawiaturą. Semantyka tabeli pozostaje obecna: `caption`, `th scope="col"` i `th scope="row"` nie są przenoszone ani kopiowane. Poziome przewijanie `.tabelaPierscieniWrap` także pozostaje bez zmian.

`prefers-reduced-motion` nie wymaga osobnego zachowania, ponieważ rozwiązanie nie ma animacji, przejść ani przewijania sterowanego skryptem. Nie należy dodawać animowanego zmniejszania panelu przy przyklejeniu.

Przy powiększeniu przeglądarki do 200 procent typowe okno 1100 na 812 px ma efektywny obszar CSS około 550 na 406 px. Reguła `max-height: 640px` wyłącza wtedy przyklejenie, a kompaktowy panel przewija się zwyczajnie razem z treścią. Na telefonie powiększenie gestem może nie zmienić wyniku media query, zależnie od przeglądarki. Otwarty panel zajmie wtedy około połowy widocznego obszaru, ale nie blokuje przewijania ani fokusu; pod nim pozostają około 3 wiersze. To uczciwy kompromis bez JavaScriptu śledzącego `visualViewport`.

Na telefonie w poziomie wysokość zwykle spada poniżej 640 px. Panel przechodzi wtedy do układu kompaktowego, ale nie jest przyklejony. Użytkownik traci stałą widoczność rysunku, za to tabela nie zostaje zredukowana do jednego wiersza. Próba utrzymania panelu na stałe przy wysokości około 375 px byłaby gorsza od problemu wyjściowego.

W druku panel ma `position: static`, pokazuje pełne opisy i nie powinien być rozdzielany między strony. Navbar Docusaurusa jest już ukrywany przez reguły drukowania motywu. Tabela pozostaje prawdziwą tabelą HTML, więc przeglądarka może powtarzać `thead` na kolejnych stronach.

## Koszt i ryzyka

Koszt implementacji jest mały: jeden wrapper w `TabelaPierscieniBlock`, rozszerzenie danych `LegendaRowka` o krótkie opisy i `s` oraz około 70 linii CSS wraz z wariantami mobilnym i drukowanym. Nie potrzeba stanu Reacta, efektów, obserwatorów przewijania ani biblioteki.

Najważniejsze ryzyka:

- Pomniejszony rysunek ma mniejsze opisy. Pomiar nie wykazał kolizji przy 375 px, ale czytelność trzeba sprawdzić na Androidzie i iOS przy jasnym świetle.
- `position: sticky` przestanie działać poprawnie, jeżeli ktoś później doda `overflow: hidden`, `auto` albo `scroll` do przodka panelu. W komentarzu CSS warto zapisać tę zależność.
- Panel celowo przesłania wiersze, które dochodzą do jego dolnej krawędzi. Nie może mieć półprzezroczystego tła, bo linie tabeli mieszałyby się z liniami rysunku.
- W poziomie i przy małej wysokości panel nie jest przyklejony. Jest to jawny bezpiecznik, nie błąd responsywności.
- Krótkie i pełne opisy są dwiema prezentacjami tej samej informacji. `aria-hidden` na skrócie i wizualne ukrycie pełnego tekstu na małym ekranie muszą zostać wykonane dokładnie, inaczej czytnik przeczyta opis podwójnie albo nie przeczyta go wcale.

## Odrzucone warianty

### Obecny rysunek i legenda przyklejone bez zmniejszenia

Na telefonie taki blok wraz z navbarem zajmuje około 596 px z 812 px i zostawia około 3 wierszy danych. Na ekranie 1100 na 812 px zostają około 4 wiersze, więc pełny blok jest za wysoki także na komputerze.

### Dwukolumnowy układ: rysunek po lewej, tabela po prawej

Minimalny sensowny rysunek 200 px, odstęp 16 px i tabela 640 px wymagają 856 px. Kolumna artykułu ma tylko 725 px przy oknie 1100 px i 820 px przy 1400 px, więc brakuje odpowiednio 131 i 36 px; na telefonie dostępne jest 311 px. Zwężenie prawego okna tabeli zwiększyłoby liczbę gestów poziomych i pogorszyło główny przypadek użycia.

### Sam przyklejony `thead`

Symbole `d1`, `d2`, `m`, `t` i `n` pozostałyby widoczne, ale nadal nie wyjaśniałyby geometrii. Dodatkowo `thead` znajduje się w `.tabelaPierscieniWrap` z `overflow-x: auto`, który staje się najbliższym kontenerem przewijania i utrudnia przyklejenie nagłówka do okna bez dodania pionowego przewijania wewnątrz tabeli. Zagnieżdżony pionowy scroll na telefonie odrzucam.

### Przyklejony rysunek bez legendy

Rysunek pomaga rozróżnić `d1`, `d2`, `m` i `n`, ale nie pokazuje `t` ani `s` i nie tłumaczy słownie kierunku średnic. Rozwiązuje więc tylko część problemu, mimo że nadal zabiera około 279 px wysokości na telefonie.

### Zwijany rysunek albo miniatura otwierana na żądanie

Wymaga dodatkowego działania właśnie wtedy, gdy użytkownik może mieć zajęte ręce przy maszynie. Wariant zwinięty domyślnie nie spełnia celu stałej widoczności, a otwarty domyślnie wraca do problemu zajętej wysokości; można go dodać później jako opcję, ale nie jako podstawowe rozwiązanie.

### Powtarzana legenda co kilka wierszy

Nie zabiera stałego miejsca w oknie, ale wydłuża tabelę i utrudnia skanowanie zakresów liczbowych. Dodatkowe wiersze nagłówkowe w `tbody` komplikują też semantykę dla czytnika ekranu i drukowanie.

## Czy warto

Tak. DIN 471 ma 44 wiersze, DIN 472 ma 24, a problem występuje w głównym scenariuszu pracy na telefonie. Responsywny panel zwiększa liczbę jednocześnie widocznych wierszy z około 3 do około 12,6, nie narusza poziomego przewijania tabeli, nie wymaga JavaScriptu i degraduje się bezpiecznie w poziomie, przy powiększeniu oraz w druku. Komplikacja jest proporcjonalna do zysku, pod warunkiem że nie próbuje się zachować obecnego rysunku w pełnym rozmiarze.
