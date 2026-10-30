"""Resumo legível de um bloco do desenho (.dc.html): textos, listas, acções, campos.
Uso: python3 tools/outline.py <ficheiro> <regex do elemento inicial> [--style]"""
import re, sys
from html.parser import HTMLParser
VOID = {'input','img','br','hr','meta','link','path','circle','rect','line','polyline','polygon','ellipse','stop','use'}
class P(HTMLParser):
    def __init__(s, style): super().__init__(convert_charrefs=True); s.out=[]; s.d=0; s.style=style
    def handle_starttag(s, t, a):
        a=dict(a); bits=[]
        for k in ('value','list','as','name','placeholder','type','onclick','onchange','oninput','href'):
            if k in a and a[k] is not None: bits.append(f'{k}={a[k]}')
        if s.style and a.get('style'):
            st=a['style']; keep=[x.strip() for x in st.split(';') if re.match(r'\s*(font-size|font-weight|letter-spacing|background|color|border|padding|grid-template-columns|display|text-transform|width|height|gap)\b',x)]
            bits.append('{'+'; '.join(keep)[:220]+'}')
        if t in ('div','span') and not bits: pass
        else: s.out.append('  '*s.d+f'<{t}'+(' '+' '.join(bits) if bits else '')+'>')
        if t not in VOID: s.d+=1
    def handle_endtag(s,t):
        if t not in VOID: s.d=max(0,s.d-1)
    def handle_data(s,x):
        x=' '.join(x.split())
        if x: s.out.append('  '*s.d+'"'+x+'"')
def block(src, start):
    m=re.search(start, src)
    if not m: sys.exit('não encontrado')
    i=m.start(); tag=re.match(r'<([\w-]+)',src[i:]).group(1)
    depth=0; pos=i
    for mm in re.finditer(r'<(/?)'+re.escape(tag)+r'\b[^>]*?(/?)>', src[i:]):
        if mm.group(2): continue
        depth += -1 if mm.group(1) else 1
        if depth==0: return src[i:i+mm.end()]
    return src[i:]
if __name__=='__main__':
    f, start = sys.argv[1], sys.argv[2]
    src=open(f,encoding='utf-8').read(); src=src[:src.find('class Component')] if 'class Component' in src else src
    p=P('--style' in sys.argv); p.feed(block(src,start)); print('\n'.join(p.out))
