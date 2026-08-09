# -*- coding: utf-8 -*-
import pymupdf, re, json, io

KADRY = {
    'otwor': (100, 158, 442, 668),
    'walek': (488, 243, 772, 576),
}
# pozycje tekstow w ukladzie strony PDF (srodki), z get_text
POZYCJE = {
    'otwor': {
        'm':  (289.9, 252.9),          # poziomy, lewy
        'n':  (395.0, 252.9),          # poziomy, prawy
        'd1': (385.6, 371.7),          # pionowy, wewnetrzny  = otwor
        'd2': (408.6, 371.7),          # pionowy, zewnetrzny  = rowek
    },
    'walek': {
        'm':  (611.6, 266.0),
        'n':  (718.7, 266.0),
        'd2': (716.7, 397.4),          # pionowy, wewnetrzny = rowek
        'd1': (738.7, 397.4),          # pionowy, zewnetrzny = walek
    },
}

d = pymupdf.open('rowki.pdf')
wynik = {}
for nazwa, (x0, y0, x1, y1) in KADRY.items():
    dok = pymupdf.open('rowki.pdf')
    p = dok[0]
    p.set_cropbox(pymupdf.Rect(x0, y0, x1, y1))
    svg = p.get_svg_image()
    # usun wszystkie glify tekstu (Inventor eksportuje teksty jako krzywe w <use>)
    svg = re.sub(r'<use\b[^>]*/>', '', svg)
    svg = re.sub(r'<use\b[^>]*>.*?</use>', '', svg, flags=re.S)
    # przytnij naglowek xml i doctype
    svg = re.sub(r'<\?xml[^>]*\?>\s*', '', svg)
    svg = re.sub(r'<!DOCTYPE[^>]*>\s*', '', svg, flags=re.S)
    # ustaw responsywnosc
    svg = re.sub(r'<svg([^>]*?)\swidth="[^"]*"', r'<svg\1', svg, count=1)
    svg = re.sub(r'<svg([^>]*?)\sheight="[^"]*"', r'<svg\1', svg, count=1)
    svg = svg.replace('<svg ', '<svg class="cad" preserveAspectRatio="xMidYMid meet" ', 1)
    io.open('widok_%s.svg' % nazwa, 'w', encoding='utf-8').write(svg)
    w, h = x1 - x0, y1 - y0
    etykiety = {}
    for k, (tx, ty) in POZYCJE[nazwa].items():
        etykiety[k] = {'x': round((tx - x0) / w * 100, 3), 'y': round((ty - y0) / h * 100, 3)}
    wynik[nazwa] = {'w': w, 'h': h, 'etykiety': etykiety, 'bajty': len(svg)}
    print(nazwa, 'svg', len(svg), 'bajtow, viewBox', w, 'x', h)
    print('  ', json.dumps(etykiety, ensure_ascii=False))
io.open('pozycje.json', 'w', encoding='utf-8').write(json.dumps(wynik, ensure_ascii=False, indent=1))
