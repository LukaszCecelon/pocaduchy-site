# -*- coding: utf-8 -*-
"""Usuwa ze sciezek SVG te, ktore w calosci leza poza widocznym viewBox.

Zawartosc <defs> zostaje nietknieta: siedza tam clipPath i maski, ktorych obrys
celowo wykracza poza kadr, a pusty clipPath wycina caly rysunek.
"""
import re, io

def punkty_sciezki(d):
    """Punkty (x, y) dla podzbioru polecen uzywanych przez eksport z Inventora."""
    tokeny = re.findall(r'[MmLlHhVvCcSsQqTtAaZz]|-?\d*\.?\d+(?:[eE][-+]?\d+)?', d)
    i, x, y = 0, 0.0, 0.0
    poprzednie = None
    punkty = []
    while i < len(tokeny):
        t = tokeny[i]
        if re.match(r'[A-Za-z]', t):
            polecenie, i = t, i + 1
        else:
            polecenie = poprzednie
        if polecenie is None:
            i += 1
            continue
        poprzednie = polecenie
        wzg = polecenie.islower()
        p = polecenie.upper()
        try:
            if p in ('M', 'L', 'T'):
                nx, ny = float(tokeny[i]), float(tokeny[i + 1]); i += 2
                x, y = (x + nx, y + ny) if wzg else (nx, ny)
                punkty.append((x, y))
            elif p == 'H':
                nx = float(tokeny[i]); i += 1
                x = x + nx if wzg else nx
                punkty.append((x, y))
            elif p == 'V':
                ny = float(tokeny[i]); i += 1
                y = y + ny if wzg else ny
                punkty.append((x, y))
            elif p == 'C':
                wsp = [float(tokeny[i + k]) for k in range(6)]; i += 6
                for k in range(0, 6, 2):
                    px, py = (x + wsp[k], y + wsp[k + 1]) if wzg else (wsp[k], wsp[k + 1])
                    punkty.append((px, py))
                x, y = punkty[-1]
            elif p in ('S', 'Q'):
                wsp = [float(tokeny[i + k]) for k in range(4)]; i += 4
                for k in range(0, 4, 2):
                    px, py = (x + wsp[k], y + wsp[k + 1]) if wzg else (wsp[k], wsp[k + 1])
                    punkty.append((px, py))
                x, y = punkty[-1]
            elif p == 'A':
                wsp = [float(tokeny[i + k]) for k in range(7)]; i += 7
                x, y = (x + wsp[5], y + wsp[6]) if wzg else (wsp[5], wsp[6])
                punkty.append((x, y))
            elif p == 'Z':
                pass
            else:
                i += 1
        except (IndexError, ValueError):
            break
    return punkty

def macierz(tekst):
    m = re.search(r'matrix\(([^)]+)\)', tekst or '')
    if not m:
        return (1, 0, 0, 1, 0, 0)
    w = [float(v) for v in re.split(r'[,\s]+', m.group(1).strip())]
    return tuple(w[:6])

def przytnij(sciezka_pliku, margines=6):
    s = io.open(sciezka_pliku, encoding='utf-8').read()
    vb = re.search(r'viewBox="([^"]+)"', s).group(1)
    vx, vy, vw, vh = [float(v) for v in re.split(r'[,\s]+', vb.strip())]
    x0, y0 = vx - margines, vy - margines
    x1, y1 = vx + vw + margines, vy + vh + margines

    m = re.search(r'<defs>.*?</defs>', s, re.S)
    glowa, defs, ogon = (s[:m.start()], m.group(0), s[m.end():]) if m else ('', '', s)
    usuniete = [0]

    def ocen(mm):
        cala = mm.group(0)
        d = re.search(r'\sd="([^"]*)"', cala)
        if not d:
            return cala
        tr = re.search(r'transform="([^"]*)"', cala)
        a, b, c, dd, e, f = macierz(tr.group(1) if tr else '')
        pkt = punkty_sciezki(d.group(1))
        if not pkt:
            return cala
        xs = [a * px + c * py + e for (px, py) in pkt]
        ys = [b * px + dd * py + f for (px, py) in pkt]
        # przeciecie obrysow, nie zawieranie punktow: duzy prostokat moze obejmowac kadr
        if min(xs) <= x1 and max(xs) >= x0 and min(ys) <= y1 and max(ys) >= y0:
            return cala
        usuniete[0] += 1
        return ''

    ogon = re.sub(r'<path\b[^>]*/>', ocen, ogon)
    ogon = re.sub(r'<g\b[^>]*>\s*</g>', '', ogon)
    wynik = re.sub(r'\n\s*\n', '\n', glowa + defs + ogon)
    io.open(sciezka_pliku, 'w', encoding='utf-8').write(wynik)
    return usuniete[0], len(wynik)

if __name__ == '__main__':
    for nazwa in ('otwor', 'walek'):
        p = 'widok_%s.svg' % nazwa
        przed = len(io.open(p, encoding='utf-8').read())
        ile, po = przytnij(p)
        print('%-6s usunieto %3d sciezek, %6d -> %5d bajtow' % (nazwa, ile, przed, po))
