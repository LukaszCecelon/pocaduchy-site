# -*- coding: utf-8 -*-
import re, io, base64, sys
from PIL import Image

def zmniejsz_obrazy(svg, maks=72):
    def zamien(m):
        cala = m.group(0)
        b64 = m.group(1)
        try:
            surowe = base64.b64decode(b64)
            im = Image.open(io.BytesIO(surowe))
            if max(im.size) <= maks:
                return cala
            im.thumbnail((maks, maks), Image.LANCZOS)
            buf = io.BytesIO()
            im.convert('L' if im.mode in ('L', 'P') else 'RGBA').save(buf, 'PNG', optimize=True)
            nowe = base64.b64encode(buf.getvalue()).decode()
            return cala.replace(b64, nowe)
        except Exception as e:
            return cala
    return re.sub(r'xlink:href="data:image/\w+;base64,\s*([A-Za-z0-9+/=\s]+)"', zamien, svg)

def usun_martwe_defs(svg):
    """Usuwa z <defs> elementy, do ktorych nikt sie nie odwoluje (glify tekstu po wycieciu <use>)."""
    m = re.search(r'<defs>(.*?)</defs>', svg, re.S)
    if not m:
        return svg
    defs = m.group(1)
    reszta = svg[:m.start()] + svg[m.end():]
    zmiana = True
    while zmiana:
        zmiana = False
        elementy = re.findall(r'<(\w+)\s[^>]*id="([^"]+)"[^>]*(?:/>|>.*?</\1>)', defs, re.S)
        for tag, ident in elementy:
            uzyty = (('#' + ident) in reszta) or (('#' + ident) in re.sub(
                r'<%s\s[^>]*id="%s".*?(?:/>|</%s>)' % (tag, re.escape(ident), tag), '', defs, flags=re.S))
            if uzyty:
                continue
            nowe = re.sub(r'<%s\s[^>]*id="%s"[^>]*(?:/>|>.*?</%s>)' % (tag, re.escape(ident), tag),
                          '', defs, count=1, flags=re.S)
            if nowe != defs:
                defs, zmiana = nowe, True
    return svg[:m.start()] + '<defs>' + defs + '</defs>' + svg[m.end():]

for nazwa in ('otwor', 'walek'):
    p = 'widok_%s.svg' % nazwa
    s = io.open(p, encoding='utf-8').read()
    przed = len(s)
    s = usun_martwe_defs(s)
    po_defs = len(s)
    s = zmniejsz_obrazy(s)
    s = re.sub(r'\n\s*\n', '\n', s)
    io.open(p, 'w', encoding='utf-8').write(s)
    print('%-6s %7d -> %7d (defs) -> %7d bajtow' % (nazwa, przed, po_defs, len(s)))
