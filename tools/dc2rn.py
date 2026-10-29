#!/usr/bin/env python3
"""
dc2rn — converte os ficheiros de desenho MUNTU (*.dc.html) em componentes React Native.

Cada ficheiro de desenho tem um template HTML com estilos inline ({{ }} para valores,
<sc-if>, <sc-for>, <dc-import>) e uma classe de lógica (`class Component extends DCLogic`).
Este script gera um módulo .jsx com:
  - a classe de lógica copiada sem alterações (estado, acções, dados);
  - uma função de render que reproduz o template com os primitivos de design/runtime.jsx
    (os estilos CSS são convertidos em estilos React Native em tempo de execução).

Assim a app desenha exactamente o que está nos ficheiros de desenho. Quando o desenho
mudar, basta voltar a gerar:

    python3 tools/dc2rn.py design/ packages/shared/src/design/generated/

Sem dependências externas (Python 3.8+).
"""
import html
import json
import os
import re
import sys
from html.parser import HTMLParser

VOID = {"input", "br", "img", "link", "meta", "hr", "source"}
SVG_TAGS = {"svg", "circle", "line", "rect", "path", "text", "tspan", "textpath", "defs", "g", "polyline", "polygon", "ellipse"}
SVG_NAME = {"svg": "svg", "circle": "circle", "line": "line", "rect": "rect", "path": "path", "text": "text", "tspan": "tspan",
            "textpath": "textPath", "defs": "defs", "g": "g", "polyline": "polyline", "polygon": "polygon", "ellipse": "ellipse"}
ATTR_CASE = {"onclick": "onClick", "onchange": "onChange", "oninput": "onInput", "inputmode": "inputMode", "readonly": "readOnly",
             "autocomplete": "autoComplete", "viewbox": "viewBox", "textlength": "textLength", "lengthadjust": "lengthAdjust",
             "tabindex": "tabIndex", "maxlength": "maxLength"}

# Componentes importados com <dc-import name="…">
COMPONENTS = {"Muntu Logo": "MuntuLogo", "Muntu Mark": "MuntuMark", "Muntu Selo": "MuntuSelo"}

# Estilos por omissão do browser (user-agent) que os desenhos assumem.
UA = {
    "h1": "display:block;font-size:2em;font-weight:700;margin:.67em 0",
    "h2": "display:block;font-size:1.5em;font-weight:700;margin:.83em 0",
    "h3": "display:block;font-size:1.17em;font-weight:700;margin:1em 0",
    "p": "display:block;margin:1em 0",
    "dd": "display:block;margin-left:40px",
    "dl": "display:block;margin:1em 0",
    "strong": "font-weight:700",
    "b": "font-weight:700",
    "fieldset": "display:block;margin:0 2px;padding:.35em .75em .625em;border:2px groove #c0c0c0",
    "legend": "display:block;padding:0 2px",
    "button": "padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center",
    "select": "padding:1px 2px;border:1px solid #767676;background:#fff;font-size:13.333px",
    "input": "padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px",
    "textarea": "padding:2px;border:1px solid #767676;background:#fff;font-size:13.333px",
}


class Node:
    __slots__ = ("tag", "attrs", "children", "parent", "k")

    def __init__(self, tag, attrs, parent=None):
        self.tag = tag
        self.attrs = attrs
        self.children = []
        self.parent = parent
        self.k = None


class Builder(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("#root", [])
        self.cur = self.root

    def handle_starttag(self, tag, attrs):
        attrs = [(ATTR_CASE.get(k, k), v if v is not None else "") for k, v in attrs]
        n = Node(tag, attrs, self.cur)
        self.cur.children.append(n)
        if tag not in VOID:
            self.cur = n

    def handle_startendtag(self, tag, attrs):
        attrs = [(ATTR_CASE.get(k, k), v if v is not None else "") for k, v in attrs]
        self.cur.children.append(Node(tag, attrs, self.cur))

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        n = self.cur
        while n is not self.root and n.tag != tag:
            n = n.parent
        if n is not self.root:
            self.cur = n.parent

    def handle_data(self, data):
        self.cur.children.append(data)


# ───────────────────────── expressões {{ }} ─────────────────────────
IDENT = re.compile(r"^[A-Za-z_$][A-Za-z0-9_$]*")


def js_expr(src, scope):
    """Traduz uma expressão do dc-runtime (caminhos, !, ===, literais) para JS seguro."""
    e = src.strip()
    if not e:
        return "undefined"
    if e[0] == "(" and e[-1] == ")" and wraps_whole(e):
        return js_expr(e[1:-1], scope)
    eq = top_eq(e)
    if eq:
        i, op = eq
        return "(" + js_expr(e[:i], scope) + " " + op + " " + js_expr(e[i + len(op):], scope) + ")"
    if e[0] == "!":
        return "!" + js_expr(e[1:], scope)
    if e in ("true", "false", "null", "undefined"):
        return e
    if re.match(r"^-?\d+(\.\d+)?$", e):
        return e
    if len(e) >= 2 and e[0] in "\"'" and e[-1] == e[0]:
        return json.dumps(e[1:-1])
    return js_path(e, scope)


def wraps_whole(e):
    d = 0
    for i, c in enumerate(e[:-1]):
        if c == "(":
            d += 1
        elif c == ")":
            d -= 1
            if d == 0:
                return False
    return True


def top_eq(e):
    d = 0
    for i, c in enumerate(e):
        if c in "[(":
            d += 1
        elif c in "])":
            d -= 1
        elif d == 0 and c in "=!" and i + 1 < len(e) and e[i + 1] == "=":
            if i > 0 and e[i - 1] in "=!":
                continue
            if not e[:i].strip():
                continue
            op = c + "==" if i + 2 < len(e) and e[i + 2] == "=" else c + "="
            return i, op
    return None


def js_path(e, scope):
    m = IDENT.match(e)
    if not m:
        return "undefined"
    head = m.group(0)
    out = head if head in scope else "v." + head if head != "$index" else "$index"
    i = len(head)
    while i < len(e):
        if e[i] == ".":
            mm = IDENT.match(e[i + 1:]) or re.match(r"^\d+", e[i + 1:])
            if not mm:
                return "undefined"
            seg = mm.group(0)
            out += "?.[" + seg + "]" if seg.isdigit() else "?." + seg
            i += 1 + len(seg)
        elif e[i] == "[":
            d, j = 1, i + 1
            while j < len(e) and d:
                if e[j] == "[":
                    d += 1
                elif e[j] == "]":
                    d -= 1
                    if d == 0:
                        break
                j += 1
            out += "?.[" + js_expr(e[i + 1:j], scope) + "]"
            i = j + 1
        else:
            return "undefined"
    return out


INTERP = re.compile(r"\{\{([\s\S]+?)\}\}")


def attr_js(raw, scope):
    """Valor de atributo → expressão JS (inteiro {{ }}) ou template literal."""
    whole = re.match(r"^\s*\{\{([\s\S]+?)\}\}\s*$", raw)
    if whole:
        return js_expr(whole.group(1), scope)
    if "{{" in raw:
        parts = INTERP.split(raw)
        out = "`"
        for k, p in enumerate(parts):
            if k % 2:
                out += "${R.s(" + js_expr(p, scope) + ")}"
            else:
                out += p.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
        return out + "`"
    return json.dumps(raw, ensure_ascii=False)


# ───────────────────────── classificação ─────────────────────────
def attrs_of(n):
    return dict(n.attrs)


def static_display(n):
    st = attrs_of(n).get("style", "")
    m = re.findall(r"(?:^|;)\s*display\s*:\s*([^;]+)", st)
    return m[-1].strip() if m else ""


def is_ws(t):
    return isinstance(t, str) and not t.strip()


def logical_children(n):
    out = []
    for c in n.children:
        if isinstance(c, Node) and c.tag in ("sc-if", "sc-for"):
            out.extend(logical_children(c))
        else:
            out.append(c)
    return out


_kind_cache = {}


def kind(n):
    """'text' | 'view' | 'input' | 'svg' | 'comp'."""
    if n.k:
        return n.k
    if n.tag in ("input", "textarea", "select"):
        k = "input"
    elif n.tag == "svg":
        k = "svg"
    elif n.tag == "dc-import":
        k = "comp"
    elif n.tag in ("br",):
        k = "text"
    else:
        kids = [c for c in logical_children(n) if not is_ws(c)]
        disp = static_display(n)
        st = attrs_of(n).get("style", "")
        if n.tag == "button" or disp in ("flex", "grid", "inline-flex", "inline-grid") or re.search(r"display\s*:\s*\{\{", st):
            k = "view"
        elif not kids:
            k = "view"
        elif any(isinstance(c, Node) and kind(c) != "text" for c in kids):
            k = "view"
        elif re.search(r"overflow[-xy]*\s*:\s*(auto|scroll)", st):
            k = "view"
        else:
            k = "text"
    n.k = k
    return k


# ───────────────────────── emissão ─────────────────────────
A11Y = {"aria-label": "accessibilityLabel"}


class Emitter:
    def __init__(self, cfg):
        self.cfg = cfg
        self.comps = set()

    def style_attr(self, n, scope):
        a = attrs_of(n)
        st = a.get("style", "")
        ua = UA.get(n.tag)
        if ua:
            st = ua + (";" + st if st else "")
        return attr_js(st, scope) if st else None

    def common_props(self, n, scope):
        a = attrs_of(n)
        props = []
        s = self.style_attr(n, scope)
        if s:
            props.append(("s", s))
        if "style-hover" in a:
            props.append(("h", attr_js(a["style-hover"], scope)))
        if "onClick" in a:
            props.append(("onPress", attr_js(a["onClick"], scope)))
        for k, v in a.items():
            if k in A11Y:
                props.append((A11Y[k], attr_js(v, scope)))
            elif k in ("aria-pressed", "aria-selected", "aria-checked", "aria-current", "disabled", "role", "title"):
                props.append((k.replace("aria-", "a_"), attr_js(v, scope) if v != "" else "true"))
        if n.tag in ("button", "a") or "onClick" in a:
            props.append(("tag", json.dumps(n.tag)))
        return props

    @staticmethod
    def jsx_props(props):
        out = []
        for k, v in props:
            if v.startswith('"') and "\\" not in v and "{" not in v:
                out.append(f"{k}={v}")
            else:
                out.append(f"{k}={{{v}}}")
        return (" " + " ".join(out)) if out else ""

    def text_run(self, items, scope, ind):
        """Sequência de texto/interpolações/elementos de texto dentro de um Text."""
        out = []
        for c in items:
            if isinstance(c, str):
                out.extend(self.text_str(c, scope))
            elif c.tag == "sc-if":
                out.append(self.ctrl_if(c, scope, ind, inline=True))
            elif c.tag == "sc-for":
                out.append(self.ctrl_for(c, scope, ind, inline=True))
            elif c.tag == "br":
                out.append('{"\\n"}')
            else:
                out.append(self.el_text(c, scope, ind))
        return "".join(out)

    def text_str(self, s, scope):
        s = re.sub(r"\s+", " ", s)
        parts = INTERP.split(s)
        out = []
        for k, p in enumerate(parts):
            if k % 2:
                out.append("{R.x(" + js_expr(p, scope) + ")}")
            elif p:
                out.append("{" + json.dumps(p, ensure_ascii=False) + "}")
        return out

    def el_text(self, n, scope, ind):
        props = self.common_props(n, scope)
        inner = self.text_run(trim_text(n.children), scope, ind)
        return f"<R.T{self.jsx_props(props)}>{inner}</R.T>"

    def children_view(self, n, scope, ind):
        """Filhos de um View: texto agrupado em R.T, restantes elementos em linhas."""
        out = []
        run = []

        def flush():
            items = trim_text(run)
            if any(not is_ws(x) for x in items):
                out.append(ind + "<R.T>" + self.text_run(items, scope, ind) + "</R.T>")
            run.clear()

        for c in n.children:
            if isinstance(c, str):
                if c.strip():
                    run.append(c)
                elif run:
                    run.append(" ")
                continue
            if c.tag in ("sc-if", "sc-for"):
                flush()
                out.append(ind + (self.ctrl_if(c, scope, ind) if c.tag == "sc-if" else self.ctrl_for(c, scope, ind)))
                continue
            k = kind(c)
            if k == "text":
                flush()
                out.append(ind + self.el_text(c, scope, ind))
            else:
                flush()
                out.append(ind + self.el(c, scope, ind))
        flush()
        return "\n".join(out)

    def ctrl_if(self, n, scope, ind, inline=False):
        cond = attr_js(attrs_of(n).get("value", ""), scope)
        if inline:
            inner = self.text_run(trim_text(n.children), scope, ind)
            return "{" + cond + " ? (<>" + inner + "</>) : null}"
        inner = self.children_view(n, scope, ind + "  ")
        return "{" + cond + " ? (<>\n" + inner + "\n" + ind + "</>) : null}"

    def ctrl_for(self, n, scope, ind, inline=False):
        a = attrs_of(n)
        lst = attr_js(a.get("list", ""), scope)
        name = a.get("as", "item")
        sub = scope | {name, "$index"}
        if inline:
            inner = self.text_run(trim_text(n.children), sub, ind)
        else:
            inner = "\n" + self.children_view(n, sub, ind + "  ") + "\n" + ind
        return "{R.list(" + lst + ").map((" + name + ", $index) => (<React.Fragment key={$index}>" + inner + "</React.Fragment>))}"

    def el(self, n, scope, ind):
        k = kind(n)
        if k == "comp":
            return self.el_comp(n, scope)
        if k == "svg":
            return self.el_svg(n, scope, ind)
        if k == "input":
            return self.el_input(n, scope, ind)
        if k == "text":
            return self.el_text(n, scope, ind)
        props = self.common_props(n, scope)
        disp = static_display(n)
        comp = "R.G" if disp in ("grid", "inline-grid") else "R.E"
        inner = self.children_view(n, scope, ind + "  ")
        if not inner.strip():
            return f"<{comp}{self.jsx_props(props)} />"
        return f"<{comp}{self.jsx_props(props)}>\n{inner}\n{ind}</{comp}>"

    def el_input(self, n, scope, ind):
        a = attrs_of(n)
        props = self.common_props(n, scope)
        props = [p for p in props if p[0] != "tag"]
        props.append(("tag", json.dumps(n.tag)))
        for key in ("value", "onChange", "onInput", "type", "placeholder", "inputMode", "readOnly", "checked", "rows", "autoComplete", "maxLength", "name"):
            if key in a:
                v = a[key]
                props.append((key, attr_js(v, scope) if v != "" or key not in ("readOnly", "checked") else "true"))
        if n.tag == "select":
            opts = []
            self.collect_options(n, scope, opts)
            return f"<R.Sel{self.jsx_props(props)}>\n" + "\n".join(ind + "  " + o for o in opts) + f"\n{ind}</R.Sel>"
        if n.tag == "textarea":
            txt = "".join(c for c in n.children if isinstance(c, str))
            if txt.strip() and "value" not in a:
                props.append(("defaultValue", json.dumps(txt.strip(), ensure_ascii=False)))
        return f"<R.In{self.jsx_props(props)} />"

    def collect_options(self, n, scope, out):
        for c in n.children:
            if not isinstance(c, Node):
                continue
            if c.tag == "option":
                a = attrs_of(c)
                label = "".join(x for x in c.children if isinstance(x, str))
                lab_js = attr_js(re.sub(r"\s+", " ", label).strip(), scope)
                val_js = attr_js(a["value"], scope) if "value" in a else lab_js
                extra = ' disabled' if 'disabled' in a else ''
                out.append(f"<R.O value={{{val_js}}} label={{{lab_js}}}{extra} />")
            elif c.tag == "sc-for":
                a = attrs_of(c)
                name = a.get("as", "item")
                sub = scope | {name, "$index"}
                inner = []
                self.collect_options(c, sub, inner)
                out.append("{R.list(" + attr_js(a.get("list", ""), scope) + ").map((" + name + ", $index) => (<React.Fragment key={$index}>" + "".join(inner) + "</React.Fragment>))}")
            elif c.tag == "sc-if":
                inner = []
                self.collect_options(c, scope, inner)
                out.append("{" + attr_js(attrs_of(c).get("value", ""), scope) + " ? (<>" + "".join(inner) + "</>) : null}")

    def el_comp(self, n, scope):
        a = attrs_of(n)
        name = a.get("name", "")
        comp = COMPONENTS.get(name)
        if not comp:
            raise SystemExit("dc-import desconhecido: " + name)
        self.comps.add(comp)
        props = []
        for k, v in n.attrs:
            if k in ("name", "hint-size", "style"):
                continue
            key = re.sub(r"-([a-z])", lambda m: m.group(1).upper(), k)
            props.append((key, attr_js(v, scope)))
        return f"<{comp}{self.jsx_props(props)} />"

    def el_svg(self, n, scope, ind):
        props = [("t", json.dumps(SVG_NAME[n.tag]))]
        for k, v in n.attrs:
            if k == "style":
                continue
            key = k if k.startswith("aria-") else re.sub(r"-([a-z])", lambda m: m.group(1).upper(), k)
            if key == "aria-label":
                key = "accessibilityLabel"
            props.append((key, attr_js(v, scope)))
        parts = []
        for c in n.children:
            if isinstance(c, str):
                if c.strip():
                    parts.extend(self.text_str(c, scope))
            elif c.tag in ("sc-for", "sc-if"):
                sub_scope = scope
                if c.tag == "sc-for":
                    a = attrs_of(c)
                    name = a.get("as", "item")
                    sub_scope = scope | {name, "$index"}
                    inner = "".join(self.el_svg(x, sub_scope, ind) for x in c.children if isinstance(x, Node))
                    parts.append("{R.list(" + attr_js(a.get("list", ""), scope) + ").map((" + name + ", $index) => (<React.Fragment key={$index}>" + inner + "</React.Fragment>))}")
                else:
                    inner = "".join(self.el_svg(x, scope, ind) for x in c.children if isinstance(x, Node))
                    parts.append("{" + attr_js(attrs_of(c).get("value", ""), scope) + " ? (<>" + inner + "</>) : null}")
            elif c.tag in SVG_NAME:
                parts.append(self.el_svg(c, scope, ind))
        inner = "".join(parts)
        if not inner:
            return f"<R.S{self.jsx_props(props)} />"
        return f"<R.S{self.jsx_props(props)}>{inner}</R.S>"


def trim_text(items):
    items = list(items)
    while items and is_ws(items[0]):
        items.pop(0)
    while items and is_ws(items[-1]):
        items.pop()
    if items and isinstance(items[0], str):
        items[0] = items[0].lstrip()
    if items and isinstance(items[-1], str):
        items[-1] = items[-1].rstrip()
    return items


def all_text(n):
    for c in logical_children(n):
        if isinstance(c, Node) and kind(c) != "text":
            return False
    return True


# ───────────────────────── ficheiro ─────────────────────────
def convert(path, cfg):
    src = open(path, encoding="utf-8").read()
    t0 = src.index("<x-dc>") + len("<x-dc>")
    t1 = src.rindex("</x-dc>")
    tpl = src[t0:t1]
    tpl = re.sub(r"<helmet>[\s\S]*?</helmet>", "", tpl)
    for a, b in cfg.get("replace", []):
        if a not in tpl:
            raise SystemExit(f"{path}: substituição não encontrada: {a[:60]}")
        tpl = tpl.replace(a, b, 1)
    sm = re.search(r'<script type="text/x-dc" data-dc-script(?: data-props="([^"]*)")?\s*>([\s\S]*?)</script>', src)
    props_meta = json.loads(html.unescape(sm.group(1))) if sm and sm.group(1) else {}
    logic = sm.group(2).strip() if sm else ""
    for a, b in cfg.get("replace_logic", []):
        if a not in logic:
            raise SystemExit(f"{path}: substituição (lógica) não encontrada: {a[:60]}")
        logic = logic.replace(a, b)
    b = Builder()
    b.feed(tpl)
    em = Emitter(cfg)
    body = em.children_view(b.root, set(), "    ")
    defaults = {k: v["default"] for k, v in props_meta.items() if not k.startswith("$") and isinstance(v, dict) and "default" in v}
    imports = "".join(f"import {{ {c} }} from './{c}';\n" for c in sorted(em.comps) if c != cfg["export"])
    name = cfg["export"]
    has_logic = "class Component" in logic
    out = f"""// GERADO a partir de "{os.path.basename(path)}" por tools/dc2rn.py — não editar à mão.
// Para mudar o visual, edite o ficheiro de desenho e volte a gerar.
/* eslint-disable */
import React from 'react';
import * as R from '../runtime';
{imports}
const DCLogic = R.DCLogic;
const location = R.location;
const window = R.win;
const document = R.doc;

{logic if has_logic else "const Component = DCLogic;"}

function render(v) {{
  return (
    <>
{body}
    </>
  );
}}

export const {name} = R.makeDC(Component, render, {json.dumps(defaults, ensure_ascii=False)}, {json.dumps(name)});
export default {name};
"""
    return out


CONFIG = {
    "Muntu Mark.dc.html": {"export": "MuntuMark"},
    "Muntu Logo.dc.html": {"export": "MuntuLogo"},
    "Muntu Selo.dc.html": {"export": "MuntuSelo"},
    "MUNTU Mobile.dc.html": {
        "export": "MuntuMobile",
        "replace": [
            # Ecrã inteiro em vez do quadro de 390×844 do protótipo.
            ('<div style="width:390px;height:844px;background:#fbfaf7;', '<div style="flex:1;width:100%;height:100%;background:#fbfaf7;'),
            # A barra de estado falsa (9:41 · 5G) dá lugar à área segura real do telemóvel.
            ('<div style="height:44px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:0 24px;font-size:14px;font-weight:600;background:{{ barBg }}"><span>9:41</span><span style="font-size:11px;letter-spacing:.1em">5G ▮▮▮</span></div>',
             '<div style="height:{{ __safeTop }};flex-shrink:0;background:{{ barBg }}"></div>'),
        ],
    },
    "MUNTU Desktop v8.dc.html": {
        "export": "MuntuDesktop",
        "replace": [
            # Aplicação com a altura do ecrã: barra lateral fixa e conteúdo com scroll próprio
            # (no protótipo a barra é "sticky" dentro da página, o que o React Native não tem).
            ('<div style="display:grid;grid-template-columns:256px minmax(0,1fr);min-height:{{ rootMinH }};background:linear-gradient(to right,#1d1c1a 256px,#f4f1ea 256px)">',
             '<div style="display:flex;flex-direction:row;height:{{ __vh }};background:#f4f1ea">'),
            ('<aside aria-label="Navegação" style="position:sticky;top:0;align-self:start;height:{{ railH }};',
             '<aside aria-label="Navegação" style="width:256px;flex-shrink:0;height:100%;'),
            ('<div style="position:relative;min-width:0;display:flex;flex-direction:column">',
             '<div style="position:relative;flex:1;min-width:0;display:flex;flex-direction:column;overflow-y:auto">'),
        ],
        "replace_logic": [
            # A altura vem do ecrã real, não do quadro de 900 px das maquetes.
            ("rootMinH: this.props.screen ? '900px' : '100vh'", "rootMinH: this.props.__vh || '100vh'"),
            ("railH: this.props.screen ? '900px' : '100vh'", "railH: this.props.__vh || '100vh'"),
        ],
    },
}


def main():
    src_dir, out_dir = sys.argv[1], sys.argv[2]
    os.makedirs(out_dir, exist_ok=True)
    for fname, cfg in CONFIG.items():
        p = os.path.join(src_dir, fname)
        code = convert(p, cfg)
        dst = os.path.join(out_dir, cfg["export"] + ".jsx")
        open(dst, "w", encoding="utf-8").write(code)
        print(f"{fname} → {dst} ({len(code)//1024} KB)")


if __name__ == "__main__":
    main()
