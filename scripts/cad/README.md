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
```

Kadry widoków i pozycje etykiet są zapisane w `1-eksportuj-widoki.py` w słownikach
`KADRY` i `POZYCJE`, we współrzędnych strony PDF. Pozycje odczytuje się raz:

```bash
python -c "import pymupdf; d=pymupdf.open('rysunek.pdf'); [print(s['text'], s['bbox']) for b in d[0].get_text('dict')['blocks'] if b['type']==0 for l in b['lines'] for s in l['spans']]"
```

Skrypt zapisuje `pozycje.json` z położeniem każdej etykiety w procentach `viewBox`,
i to na jego podstawie komponent układa wymiary nad rysunkiem.

## Czego pilnować

- **Inventor eksportuje teksty jako krzywe.** Nie da się ich podmienić w SVG, więc krok 1
  wycina wszystkie elementy `<use>` i podstawia się własne etykiety HTML nad rysunkiem.
- **Nie ruszać zawartości `<defs>`.** Siedzą tam `clipPath` i maski, których obrys celowo
  wykracza poza kadr. Pusty `clipPath` wycina cały rysunek i zostaje biała plama.
- Krok 3 sprawdza **przecięcie obrysów**, nie zawieranie punktów. Duży prostokąt maski ma
  wszystkie wierzchołki poza kadrem, a mimo to obejmuje go w całości.
- Rysunek na stronie jest schematem o stałych proporcjach. Zmienia się tekst wymiaru,
  nie geometria. Tak ustalił Łukasz i tak ma zostać.

## Efekt

| Widok | Po eksporcie | Po odchudzeniu | Po przycięciu |
|---|---|---|---|
| wałek | 172 kB | 41 kB | 15 kB |
| otwór | 172 kB | 41 kB | 26 kB |
