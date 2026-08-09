# -*- coding: utf-8 -*-
"""Rysunek z Inventora na widoki SVG dla strony.

Kadr obejmuje polprzekroj: gorna polowe widoku wraz z osia symetrii. Tak samo
kadrowal je Lukasz, przysylajac wzorzec, i tak samo robi sie to na rysunku
wykonawczym, gdy dolna polowa nic nie wnosi. Przy okazji wymiary przestaja
tonac w pustej geometrii.

Teksty Inventor eksportuje jako krzywe, wiec sa wycinane, a ich miejsca
zapisujemy jako punkty zaczepienia dla etykiet skladanych na stronie.
"""
import pymupdf, re, json, io

# kadry w ukladzie strony PDF: (x0, y0, x1, y1), dolna krawedz tuz pod osia
KADRY = {
    'otwor': (208, 168, 442, 411),
    'walek': (558, 238, 772, 430),
}

# Punkty zaczepienia etykiet, odczytane z pol tekstowych oryginalu.
# 'poziomPrawo' rosnie w lewo i w gore od punktu, 'poziomLewo' w prawo i w gore,
# 'pion' jest obrocony o 90 stopni i rosnie w gore oraz w lewo.
ZACZEPY = {
    'otwor': {
        'm':  {'x': 319.43, 'y': 259.70, 'typ': 'poziomPrawo'},
        'n':  {'x': 365.58, 'y': 259.70, 'typ': 'poziomLewo'},
        'd1': {'x': 392.39, 'y': 401.21, 'typ': 'pion'},
        'd2': {'x': 415.43, 'y': 401.21, 'typ': 'pion'},
    },
    'walek': {
        'm':  {'x': 641.09, 'y': 272.84, 'typ': 'poziomPrawo'},
        'n':  {'x': 689.22, 'y': 272.84, 'typ': 'poziomLewo'},
        'd2': {'x': 726.54, 'y': 419.94, 'typ': 'pion'},
        'd1': {'x': 748.50, 'y': 419.94, 'typ': 'pion'},
    },
}

wynik = {}
for nazwa, (x0, y0, x1, y1) in KADRY.items():
    dok = pymupdf.open('rowki.pdf')
    strona = dok[0]
    strona.set_cropbox(pymupdf.Rect(x0, y0, x1, y1))
    svg = strona.get_svg_image()
    svg = re.sub(r'<use\b[^>]*/>', '', svg)
    svg = re.sub(r'<use\b[^>]*>.*?</use>', '', svg, flags=re.S)
    svg = re.sub(r'<\?xml[^>]*\?>\s*', '', svg)
    svg = re.sub(r'<!DOCTYPE[^>]*>\s*', '', svg, flags=re.S)
    svg = re.sub(r'<svg([^>]*?)\swidth="[^"]*"', r'<svg\1', svg, count=1)
    svg = re.sub(r'<svg([^>]*?)\sheight="[^"]*"', r'<svg\1', svg, count=1)
    svg = svg.replace('<svg ', '<svg class="cad" preserveAspectRatio="xMidYMid meet" ', 1)
    io.open('widok_%s.svg' % nazwa, 'w', encoding='utf-8').write(svg)

    w, h = x1 - x0, y1 - y0
    zaczepy = {}
    for k, z in ZACZEPY[nazwa].items():
        zaczepy[k] = {
            'x': round((z['x'] - x0) / w * 100, 3),
            'y': round((z['y'] - y0) / h * 100, 3),
            'typ': z['typ'],
        }
    wynik[nazwa] = {'viewBox': [0, 0, w, h], 'zaczepy': zaczepy}
    print('%-6s %5d bajtow, kadr %d x %d' % (nazwa, len(svg), w, h))

wynik['_opis'] = ('Punkty zaczepienia etykiet wymiarowych, w procentach kadru. '
                  'Zrodlo: ROWKI POD PIERSCIENIE OSADCZE, poCADuchy, 09.08.2026.')
io.open('pozycje.json', 'w', encoding='utf-8').write(json.dumps(wynik, ensure_ascii=False, indent=1))
