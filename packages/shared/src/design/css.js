// Conversão dos estilos CSS inline dos ficheiros de desenho para estilos React Native.
// Cobre o subconjunto usado nos desenhos MUNTU: flex, grid, caixas, bordas, tipografia.

const NAMED = { transparent: 'transparent', white: '#ffffff', black: '#000000', none: 'transparent', inherit: undefined, currentcolor: undefined };

/** Divide uma declaração CSS em pares [propriedade, valor], respeitando parênteses. */
export function splitDecls(css) {
  const out = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i <= css.length; i++) {
    const c = css[i];
    if (c === '(') depth++;
    else if (c === ')') depth--;
    else if ((c === ';' && depth === 0) || i === css.length) {
      const d = css.slice(start, i);
      const k = d.indexOf(':');
      if (k > 0) out.push([d.slice(0, k).trim().toLowerCase(), d.slice(k + 1).trim()]);
      start = i + 1;
    }
  }
  return out;
}

/** Divide um valor por espaços fora de parênteses: "1px solid rgba(0,0,0,.2)". */
export function splitSpaces(v) {
  const out = [];
  let depth = 0;
  let cur = '';
  for (const c of v.trim()) {
    if (c === '(') depth++;
    if (c === ')') depth--;
    if (/\s/.test(c) && depth === 0) {
      if (cur) out.push(cur);
      cur = '';
    } else cur += c;
  }
  if (cur) out.push(cur);
  return out;
}

/**
 * Converte um comprimento CSS para número (px) ou string ('50%', 'auto').
 * env: { fs: tamanho de letra efectivo, vw, vh }
 */
export function len(v, env, pctOk = true) {
  if (v == null) return undefined;
  v = String(v).trim();
  if (!v) return undefined;
  if (v === 'auto') return 'auto';
  if (v === '0') return 0;
  const clamp = v.match(/^clamp\((.+)\)$/);
  if (clamp) {
    const [a, b, c] = splitArgs(clamp[1]).map((x) => len(x, env, false));
    if (typeof a === 'number' && typeof b === 'number' && typeof c === 'number') return Math.min(c, Math.max(a, b));
    return b;
  }
  const minmax = v.match(/^(min|max)\((.+)\)$/);
  if (minmax) {
    const vals = splitArgs(minmax[2]).map((x) => len(x, env, false)).filter((x) => typeof x === 'number');
    return minmax[1] === 'min' ? Math.min(...vals) : Math.max(...vals);
  }
  const m = v.match(/^(-?[\d.]+)(px|em|rem|%|vw|vh)?$/);
  if (!m) return undefined;
  const n = parseFloat(m[1]);
  switch (m[2]) {
    case 'em':
      return n * (env.fs || 16);
    case 'rem':
      return n * 16;
    case '%':
      return pctOk ? `${n}%` : undefined;
    case 'vw':
      return (n * (env.vw || 0)) / 100;
    case 'vh':
      return (n * (env.vh || 0)) / 100;
    default:
      return n;
  }
}

function splitArgs(s) {
  const out = [];
  let depth = 0;
  let cur = '';
  for (const c of s) {
    if (c === '(') depth++;
    if (c === ')') depth--;
    if (c === ',' && depth === 0) {
      out.push(cur.trim());
      cur = '';
    } else cur += c;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

export function color(v) {
  if (v == null) return undefined;
  v = String(v).trim();
  const lower = v.toLowerCase();
  if (lower in NAMED) return NAMED[lower];
  if (/gradient\(/.test(lower)) {
    const m = v.match(/(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\))/);
    return m ? m[1] : undefined;
  }
  return v;
}

function box(v, env) {
  const p = splitSpaces(v).map((x) => len(x, env));
  const [t, r = t, b = t, l = r] = p;
  return { t, r, b, l };
}

function border(v) {
  const parts = splitSpaces(v);
  let width;
  let style;
  let col;
  for (const p of parts) {
    if (/^(none|hidden)$/.test(p)) {
      width = 0;
      style = 'none';
    } else if (/^(solid|dashed|dotted|double|groove|ridge|inset|outset)$/.test(p)) style = p;
    else if (/^-?[\d.]+(px)?$/.test(p) || /^(thin|medium|thick)$/.test(p)) width = p === 'thin' ? 1 : p === 'medium' ? 3 : p === 'thick' ? 5 : parseFloat(p);
    else col = color(p);
  }
  if (style === 'none') width = 0;
  if (width === undefined && style && style !== 'none') width = 3;
  return { width, style, color: col };
}

const ALIGN = { start: 'flex-start', end: 'flex-end', 'flex-start': 'flex-start', 'flex-end': 'flex-end', center: 'center', stretch: 'stretch', baseline: 'baseline', normal: undefined, left: 'flex-start', right: 'flex-end' };
const JUSTIFY = { start: 'flex-start', end: 'flex-end', 'flex-start': 'flex-start', 'flex-end': 'flex-end', center: 'center', 'space-between': 'space-between', 'space-around': 'space-around', 'space-evenly': 'space-evenly', normal: undefined, left: 'flex-start', right: 'flex-end' };

/**
 * Analisa uma string de estilo. Devolve:
 *  v: estilos de caixa (View), t: estilos de texto herdáveis, m: meta (display, grid, overflow…)
 * Os valores relativos ao tamanho de letra (em, line-height sem unidade, letter-spacing em em)
 * ficam em `rel` para serem resolvidos com o tamanho de letra efectivo.
 */
export function parseCss(css) {
  const v = {};
  const t = {};
  const m = {};
  const rel = {};
  if (!css) return { v, t, m, rel };
  for (const [k, raw] of splitDecls(css)) {
    const val = raw.replace(/\s*!important$/, '');
    if (val === '' || val === 'undefined') continue;
    switch (k) {
      case 'display':
        m.display = val;
        break;
      case 'flex-direction':
        m.dir = val;
        break;
      case 'flex-wrap':
        v.flexWrap = val === 'wrap' ? 'wrap' : val === 'wrap-reverse' ? 'wrap-reverse' : 'nowrap';
        break;
      case 'flex': {
        const p = splitSpaces(val);
        if (val === 'none') Object.assign(v, { flexGrow: 0, flexShrink: 0, flexBasis: 'auto' });
        else if (val === 'auto') Object.assign(v, { flexGrow: 1, flexShrink: 1, flexBasis: 'auto' });
        else if (p.length === 1 && /^[\d.]+$/.test(p[0])) Object.assign(v, { flexGrow: parseFloat(p[0]), flexShrink: 1, flexBasis: 0 });
        else {
          v.flexGrow = parseFloat(p[0]) || 0;
          if (p[1] !== undefined && /^[\d.]+$/.test(p[1])) v.flexShrink = parseFloat(p[1]);
          const basis = p.length === 3 ? p[2] : p[1] !== undefined && !/^[\d.]+$/.test(p[1]) ? p[1] : '0';
          rel.flexBasis = basis;
        }
        m.flexSet = true;
        break;
      }
      case 'flex-grow':
        v.flexGrow = parseFloat(val);
        break;
      case 'flex-shrink':
        v.flexShrink = parseFloat(val);
        m.shrinkSet = true;
        break;
      case 'flex-basis':
        rel.flexBasis = val;
        break;
      case 'align-items':
        v.alignItems = ALIGN[val];
        break;
      case 'align-self':
        v.alignSelf = val === 'auto' ? undefined : ALIGN[val];
        break;
      case 'align-content':
        v.alignContent = ALIGN[val] || JUSTIFY[val];
        break;
      case 'justify-content':
        v.justifyContent = JUSTIFY[val];
        break;
      case 'justify-self':
        m.justifySelf = ALIGN[val];
        break;
      case 'justify-items':
        m.justifyItems = ALIGN[val];
        break;
      case 'gap': {
        const p = splitSpaces(val);
        rel.rowGap = p[0];
        rel.columnGap = p[1] ?? p[0];
        break;
      }
      case 'row-gap':
        rel.rowGap = val;
        break;
      case 'column-gap':
        rel.columnGap = val;
        break;
      case 'grid-template-columns':
        m.cols = val;
        break;
      case 'grid-auto-rows':
        m.autoRows = val;
        break;
      case 'grid-column':
        m.gridColumn = val;
        break;
      case 'padding':
      case 'margin': {
        const pre = k;
        rel[pre] = val;
        break;
      }
      case 'padding-top':
      case 'padding-right':
      case 'padding-bottom':
      case 'padding-left':
      case 'margin-top':
      case 'margin-right':
      case 'margin-bottom':
      case 'margin-left':
      case 'width':
      case 'height':
      case 'min-width':
      case 'min-height':
      case 'max-width':
      case 'max-height':
      case 'top':
      case 'right':
      case 'bottom':
      case 'left':
        rel[k] = val;
        break;
      case 'inset': {
        const p = splitSpaces(val);
        const [a, b = a, c = a, d = b] = p;
        rel.top = a;
        rel.right = b;
        rel.bottom = c;
        rel.left = d;
        break;
      }
      case 'position':
        v.position = val === 'absolute' || val === 'fixed' ? 'absolute' : 'relative';
        if (val === 'sticky') m.sticky = true;
        break;
      case 'z-index':
        v.zIndex = parseInt(val, 10) || 0;
        break;
      case 'overflow':
        m.overflow = val;
        if (val === 'hidden' || val === 'clip') v.overflow = 'hidden';
        break;
      case 'overflow-x':
        m.overflowX = val;
        if (val === 'hidden') v.overflow = 'hidden';
        break;
      case 'overflow-y':
        m.overflowY = val;
        if (val === 'hidden') v.overflow = 'hidden';
        break;
      case 'opacity':
        v.opacity = parseFloat(val);
        break;
      case 'aspect-ratio': {
        const p = val.split('/').map((x) => parseFloat(x));
        v.aspectRatio = p.length === 2 ? p[0] / p[1] : p[0];
        break;
      }
      case 'background':
      case 'background-color':
        v.backgroundColor = color(val);
        break;
      case 'border':
      case 'border-top':
      case 'border-right':
      case 'border-bottom':
      case 'border-left': {
        const b = border(val);
        const side = k === 'border' ? '' : k.slice(7, 8).toUpperCase() + k.slice(8);
        if (b.width !== undefined) v[`border${side}Width`] = b.width;
        if (b.color !== undefined) v[`border${side}Color`] = b.color;
        else if (b.width && !side) v.borderColor = v.borderColor ?? 'currentColor';
        else if (b.width) v[`border${side}Color`] = v[`border${side}Color`] ?? 'currentColor';
        if (b.style === 'dashed' || b.style === 'dotted') v.borderStyle = b.style;
        break;
      }
      case 'border-width':
        v.borderWidth = parseFloat(val);
        break;
      case 'border-color':
        v.borderColor = color(val);
        break;
      case 'border-style':
        if (val === 'dashed' || val === 'dotted') v.borderStyle = val;
        if (val === 'none') v.borderWidth = 0;
        break;
      case 'border-radius':
        rel.borderRadius = val;
        break;
      case 'box-shadow':
        if (val !== 'none') v.boxShadow = val;
        break;
      // ——— texto (herdável) ———
      case 'color':
        t.color = color(val);
        break;
      case 'font-size':
        rel.fontSize = val;
        break;
      case 'font-weight':
        t.fontWeight = val === 'bold' ? 700 : val === 'normal' ? 400 : parseInt(val, 10) || 400;
        break;
      case 'font-style':
        t.fontStyle = val === 'italic' ? 'italic' : 'normal';
        break;
      case 'letter-spacing':
        rel.letterSpacing = val;
        break;
      case 'line-height':
        rel.lineHeight = val;
        break;
      case 'text-transform':
        t.textTransform = val === 'uppercase' || val === 'lowercase' || val === 'capitalize' ? val : 'none';
        break;
      case 'text-align':
        t.textAlign = val === 'start' ? 'left' : val === 'end' ? 'right' : val;
        break;
      case 'text-decoration':
      case 'text-decoration-line':
        t.textDecorationLine = /underline/.test(val) ? 'underline' : /line-through/.test(val) ? 'line-through' : 'none';
        break;
      case 'white-space':
        t.noWrap = val === 'nowrap' || val === 'pre';
        break;
      case 'text-overflow':
        m.ellipsis = val === 'ellipsis';
        break;
      case 'font-variant-numeric':
        t.fontVariant = /tabular/.test(val) ? ['tabular-nums'] : undefined;
        break;
      case 'pointer-events':
        m.pointerEvents = val === 'none' ? 'none' : 'auto';
        break;
      default:
        break;
    }
  }
  return { v, t, m, rel };
}

const cache = new Map();
export function parseCached(css) {
  if (!css) return EMPTY;
  let r = cache.get(css);
  if (!r) {
    r = parseCss(css);
    if (cache.size > 5000) cache.clear();
    cache.set(css, r);
  }
  return r;
}
const EMPTY = { v: {}, t: {}, m: {}, rel: {} };

/** Resolve comprimentos relativos (em, %, vw, clamp) com o tamanho de letra efectivo. */
export function resolveBox(p, env) {
  const out = { ...p.v };
  const r = p.rel;
  const L = (x) => len(x, env);
  if (r.padding !== undefined) {
    const b = box(r.padding, env);
    Object.assign(out, { paddingTop: b.t, paddingRight: b.r, paddingBottom: b.b, paddingLeft: b.l });
  }
  if (r.margin !== undefined) {
    const b = box(r.margin, env);
    Object.assign(out, { marginTop: b.t, marginRight: b.r, marginBottom: b.b, marginLeft: b.l });
  }
  const MAP = {
    'padding-top': 'paddingTop', 'padding-right': 'paddingRight', 'padding-bottom': 'paddingBottom', 'padding-left': 'paddingLeft',
    'margin-top': 'marginTop', 'margin-right': 'marginRight', 'margin-bottom': 'marginBottom', 'margin-left': 'marginLeft',
    width: 'width', height: 'height', 'min-width': 'minWidth', 'min-height': 'minHeight', 'max-width': 'maxWidth', 'max-height': 'maxHeight',
    top: 'top', right: 'right', bottom: 'bottom', left: 'left',
  };
  for (const k in MAP) {
    if (r[k] === undefined) continue;
    const val = L(r[k]);
    if (val === undefined) continue;
    if ((k.startsWith('min-') || k.startsWith('max-')) && val === 'auto') continue;
    if (k.startsWith('max-') && r[k] === 'none') continue;
    out[MAP[k]] = val;
  }
  if (r.flexBasis !== undefined) {
    const b = L(r.flexBasis);
    if (b !== undefined) out.flexBasis = b;
  }
  if (r.rowGap !== undefined) out.rowGap = L(r.rowGap);
  if (r.columnGap !== undefined) out.columnGap = L(r.columnGap);
  if (r.borderRadius !== undefined) {
    const parts = splitSpaces(r.borderRadius);
    if (parts.length === 1 && /%$/.test(parts[0])) {
      const pct = parseFloat(parts[0]) / 100;
      const w = typeof out.width === 'number' ? out.width : undefined;
      const h = typeof out.height === 'number' ? out.height : undefined;
      const base = w !== undefined && h !== undefined ? Math.min(w, h) : w ?? h;
      out.borderRadius = base !== undefined ? base * pct : 9999;
    } else if (parts.length === 1) out.borderRadius = L(parts[0]);
    else {
      const [a, b = a, c = a, d = b] = parts.map(L);
      Object.assign(out, { borderTopLeftRadius: a, borderTopRightRadius: b, borderBottomRightRadius: c, borderBottomLeftRadius: d });
    }
  }
  return out;
}

/** Tamanho de letra efectivo a partir do valor CSS e do herdado. */
export function fontSizeOf(raw, inherited) {
  if (raw === undefined) return inherited;
  const s = String(raw).trim();
  if (s.endsWith('em') && !s.endsWith('rem')) return parseFloat(s) * inherited;
  if (s.endsWith('%')) return (parseFloat(s) / 100) * inherited;
  const n = len(s, { fs: inherited });
  return typeof n === 'number' ? n : inherited;
}

export function letterSpacingOf(raw, fs) {
  if (raw === undefined) return undefined;
  if (raw === 'normal') return 0;
  const n = len(raw, { fs });
  return typeof n === 'number' ? n : undefined;
}

export function lineHeightOf(raw, fs) {
  if (raw === undefined || raw === 'normal') return undefined;
  if (/^[\d.]+$/.test(raw)) return parseFloat(raw) * fs;
  const n = len(raw, { fs });
  return typeof n === 'number' ? n : undefined;
}

/** Colunas da grelha: "minmax(300px,1.4fr) repeat(4,minmax(0,1fr))" → faixas. */
export function gridTracks(spec, env) {
  const tokens = [];
  for (const tok of splitSpaces(spec || '')) {
    const rep = tok.match(/^repeat\((\d+),(.+)\)$/);
    if (rep) {
      const inner = splitSpaces(rep[2].replace(/,(?![^(]*\))/g, ' '));
      for (let i = 0; i < parseInt(rep[1], 10); i++) tokens.push(...inner);
    } else tokens.push(tok);
  }
  return tokens.map((tok) => {
    const mm = tok.match(/^minmax\((.+),(.+)\)$/);
    const min = mm ? mm[1].trim() : null;
    const max = mm ? mm[2].trim() : tok;
    const tr = {};
    if (/fr$/.test(max)) tr.fr = parseFloat(max);
    else if (max === 'auto' || max === 'min-content' || max === 'max-content') tr.auto = true;
    else {
      const n = len(max, env);
      if (typeof n === 'string') tr.pct = n;
      else tr.px = n;
    }
    if (min !== null && min !== 'auto') {
      const n = len(min, env);
      if (typeof n === 'number') tr.min = n;
    }
    return tr;
  });
}
