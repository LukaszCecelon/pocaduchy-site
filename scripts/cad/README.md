# Rysunki z Inventora na stronę

Ścieżka zamiany rysunku wykonawczego z Inventora na lekki, wektorowy rysunek na stronie,
w którym wymiary są żywym tekstem podstawianym przez kalkulator.

Użyte po raz pierwszy przy `/narzedzia/pierscienie-osadcze/`, źródło:
`ROWKI POD PIERŚCIENIE OSADCZE - RYSUNEK NA STRONE.pdf` (poCADuchy, 09.08.2026).

## Jak przygotować rysunek w Inventorze

1. Zrób widok z wymiarami tak, jak na rysunku wykonawczym.
2. W miejscach, gdzie wartość ma podstawiać kalkulator, wpisz tekst zastępczy `<TEKST>`.
   Wartości, które mają zostać na stałe, wpisz normalnie.
3. Zapisz arkusz do PDF. Nie trzeba nic upraszczać ani czyścić, skrypty to zrobią.

## Jak przerobić to na SVG

Wymaga `pymupdf` i `Pillow` (`pip install pymupdf pillow`).

```bash
python scripts/cad/1-eksportuj-widoki.py    # PDF -> po jednym SVG na widok, teksty wycięte
python scripts/cad/2-odchudz-svg.py         # usuwa martwe definicje glifów, przepróbkowuje podkłady
python scripts/cad/3-przytnij-svg.py        # wyrzuca geometrię leżącą poza kadrem
python scripts/cad/4-sprzataj-svg.py        # usuwa maski osierocone po przycięciu
```

Kadr obejmuje **półprzekrój**: górną połowę widoku wraz z osią symetrii. Dolna
połowa jest lustrem górnej i niczego nie wnosi, a zabiera połowę wysokości,
w której wymiary muszą się zmieścić.

Kadry widoków i pozycje etykiet są zapisane w `1-eksportuj-widoki.py` w słownikach
`KADRY` i `POZYCJE`, we współrzędnych strony PDF. Pozycje odczytuje się raz:

```bash
python -c "import pymupdf; d=pymupdf.open('rysunek.pdf'); [print(s['text'], s['bbox']) for b in d[0].get_text('dict')['blocks'] if b['type']==0 for l in b['lines'] for s in l['spans']]"
```

Skrypt zapisuje `pozycje.json` z położeniem każdej etykiety w procentach `viewBox`,
i to na jego podstawie komponent układa wymiary nad rysunkiem.

## Jak umieścić wymiary na rysunku

Skrypt zapisuje w `pozycje.json` **punkt zaczepienia** każdej etykiety, czyli róg
pola tekstowego z oryginału, oraz sposób jej rozrostu:

| Typ | Zaczepienie | Rośnie |
|---|---|---|
| `poziomPrawo` | prawy dolny róg | w lewo i w górę |
| `poziomLewo` | lewy dolny róg | w prawo i w górę |
| `pion` | prawy dolny róg, obrót o 90 stopni | w górę i w lewo |

Reguła wzięta wprost z rysunku: tekst poziomy siada **nad** linią wymiarową,
a tekst obrócony **na lewo** od swojej linii. Etykieta zaczepiona za róg, a nie
za środek, rośnie zawsze w wolne miejsce i nigdy nie wchodzi na groty strzałek.

## Czego pilnować

- **Inventor eksportuje teksty jako krzywe.** Nie da się ich podmienić w SVG, więc krok 1
  wycina wszystkie elementy `<use>` i podstawia się własne etykiety HTML nad rysunkiem.
- **Nie ruszać zawartości `<defs>`.** Siedzą tam `clipPath` i maski, których obrys celowo
  wykracza poza kadr. Pusty `clipPath` wycina cały rysunek i zostaje biała plama.
- **Nie usuwać obrazów ze środka maski.** Do takiego obrazu nikt nie odwołuje się
  po identyfikatorze, więc automat uznaje go za martwy. Pusta maska wycina cały
  rysunek i zostaje sam kontur bez cieniowania.
- **Podkład cieniowany trzymać w wysokiej rozdzielczości.** Obraz i jego maska są
  przepróbkowywane niezależnie, więc przy 72 px krawędzie rozjeżdżają się i przy
  konturach zostaje kolorowa obwódka. 480 px wystarczy.
- Etykiet **nie podkładać prostokątem tła**. Zamalowuje groty strzałek. Czytelność
  na kreskowaniu daje poświata wokół samych glifów.
- Krok 3 sprawdza **przecięcie obrysów**, nie zawieranie punktów. Duży prostokąt maski ma
  wszystkie wierzchołki poza kadrem, a mimo to obejmuje go w całości.
- Rysunek na stronie jest schematem o stałych proporcjach. Zmienia się tekst wymiaru,
  nie geometria. Tak ustalił Łukasz i tak ma zostać.

## Efekt

| Widok | Po eksporcie | Po odchudzeniu | Po przycięciu |
|---|---|---|---|
| wałek | 172 kB | 41 kB | 15 kB |
| otwór | 172 kB | 41 kB | 26 kB |
