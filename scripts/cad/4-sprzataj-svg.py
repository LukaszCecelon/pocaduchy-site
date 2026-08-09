# -*- coding: utf-8 -*-
"""Drugi przebieg po definicjach: po przycieciu geometrii czesc masek i obrazow
nie ma juz zadnego odbiorcy, a to one waza najwiecej."""
import re, io

def zywe(svg):
    """Zbiera identyfikatory, do ktorych ktokolwiek sie odwoluje."""
    return set(re.findall(r'url\(#([^)]+)\)', svg)) | set(re.findall(r'xlink:href="#([^"]+)"', svg))

def usun_martwe(sciezka):
    s = io.open(sciezka, encoding='utf-8').read()
    for _ in range(6):
        m = re.search(r'<defs>(.*?)</defs>', s, re.S)
        if not m:
            break
        defs, reszta = m.group(1), s[:m.start()] + s[m.end():]
        uzyte = zywe(reszta)
        zmiana = False
        # 'image' celowo poza lista: obrazy w srodku <mask> nie maja zadnego
        # odbiorcy po id, a ich usuniecie oproznia maske i wycina caly rysunek
        for tag in ('clipPath', 'mask', 'pattern', 'linearGradient'):
            for ident in re.findall(r'<%s\s[^>]*id="([^"]+)"' % tag, defs):
                if ident in uzyte or ident in zywe(defs):
                    continue
                wzor = r'<%s\s[^>]*id="%s"(?:[^>]*/>|[^>]*>.*?</%s>)' % (tag, re.escape(ident), tag)
                nowe = re.sub(wzor, '', defs, count=1, flags=re.S)
                if nowe != defs:
                    defs, zmiana = nowe, True
        s = s[:m.start()] + '<defs>' + defs + '</defs>' + s[m.end():]
        if not zmiana:
            break
    s = re.sub(r'\n\s*\n', '\n', s)
    io.open(sciezka, 'w', encoding='utf-8').write(s)
    return len(s)

for nazwa in ('otwor', 'walek'):
    p = 'widok_%s.svg' % nazwa
    przed = len(io.open(p, encoding='utf-8').read())
    print('%-6s %6d -> %6d bajtow' % (nazwa, przed, usun_martwe(p)))
