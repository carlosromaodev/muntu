// Primitivos que desenham os ficheiros de desenho MUNTU em React Native (iOS, Android, web).
// O código gerado por tools/dc2rn.py usa: E (caixa), T (texto), G (grelha), In (campo),
// Sel/O (lista de opções), S (SVG), e makeDC (liga a classe de lógica ao template).
import React, { createContext, useContext, useMemo, useState } from 'react';
import { Modal, Platform, Pressable, ScrollView, Text, TextInput, View, useWindowDimensions } from 'react-native';
import Svg, { Circle, Defs, Ellipse, G as SvgG, Line, Path, Polygon, Polyline, Rect, Text as SvgText, TextPath, TSpan } from 'react-native-svg';
import { haptic } from '../lib/haptics';
import { fontSizeOf, gridTracks, len, letterSpacingOf, lineHeightOf, parseCached, resolveBox } from './css';

// ───────────────────────── contexto ─────────────────────────
const ROOT_TEXT = {
  color: '#1d1c1a',
  fs: 16,
  fontWeight: 400,
  ls: undefined,
  lhMul: undefined,
  lhPx: undefined,
  textTransform: undefined,
  textAlign: undefined,
  noWrap: false,
  fontVariant: ['tabular-nums'],
  fontStyle: undefined,
  textDecorationLine: undefined,
};
const TextCtx = createContext(ROOT_TEXT);
const ParentCtx = createContext({ row: false, cell: false });
const InTextCtx = createContext(false);
/** Largura/altura de referência para vw/vh (o shell desktop fixa um mínimo de 1024). */
export const EnvCtx = createContext(null);

function useEnv() {
  const win = useWindowDimensions();
  const o = useContext(EnvCtx);
  return { vw: o?.width ?? win.width, vh: o?.height ?? win.height };
}

const FONT = { 300: 'Outfit_300Light', 400: 'Outfit_400Regular', 500: 'Outfit_500Medium', 600: 'Outfit_600SemiBold' };
export const fontFor = (w) => (w <= 300 ? FONT[300] : w < 500 ? FONT[400] : w < 600 ? FONT[500] : FONT[600]);

// ───────────────────────── resolução de estilos ─────────────────────────
function textCtxFor(p, tc) {
  const fs = fontSizeOf(p.rel.fontSize, tc.fs);
  const t = p.t;
  const n = { ...tc, fs };
  if (t.color !== undefined) n.color = t.color;
  if (t.fontWeight !== undefined) n.fontWeight = t.fontWeight;
  if (t.textTransform !== undefined) n.textTransform = t.textTransform;
  if (t.textAlign !== undefined) n.textAlign = t.textAlign;
  if (t.noWrap !== undefined) n.noWrap = t.noWrap;
  if (t.fontVariant !== undefined) n.fontVariant = t.fontVariant;
  if (t.fontStyle !== undefined) n.fontStyle = t.fontStyle;
  if (t.textDecorationLine !== undefined) n.textDecorationLine = t.textDecorationLine;
  if (p.rel.letterSpacing !== undefined) n.ls = letterSpacingOf(p.rel.letterSpacing, fs);
  if (p.rel.lineHeight !== undefined) {
    const raw = p.rel.lineHeight;
    if (raw === 'normal') {
      n.lhMul = undefined;
      n.lhPx = undefined;
    } else if (/^[\d.]+$/.test(raw)) {
      n.lhMul = parseFloat(raw);
      n.lhPx = undefined;
    } else {
      n.lhMul = undefined;
      n.lhPx = lineHeightOf(raw, fs);
    }
  }
  return n;
}

function textStyle(n) {
  const st = { color: n.color, fontSize: n.fs, fontFamily: fontFor(n.fontWeight) };
  if (Platform.OS === 'web') st.fontWeight = String(Math.min(600, n.fontWeight));
  if (n.ls !== undefined) st.letterSpacing = n.ls;
  const lh = n.lhPx ?? (n.lhMul !== undefined ? n.lhMul * n.fs : undefined);
  if (lh !== undefined) st.lineHeight = lh;
  if (n.textTransform && n.textTransform !== 'none') st.textTransform = n.textTransform;
  if (n.textAlign) st.textAlign = n.textAlign;
  if (n.fontVariant) st.fontVariant = n.fontVariant;
  if (n.fontStyle) st.fontStyle = n.fontStyle;
  if (n.textDecorationLine && n.textDecorationLine !== 'none') st.textDecorationLine = n.textDecorationLine;
  return st;
}

function fixCurrentColor(box, col) {
  for (const k of ['borderColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'backgroundColor']) {
    if (box[k] === 'currentColor') box[k] = col;
  }
  return box;
}

function layoutFor(css, tc, parent, env, isText, isButton) {
  const p = parseCached(css);
  const n = textCtxFor(p, tc);
  const box = fixCurrentColor(resolveBox(p, { fs: n.fs, vw: env.vw, vh: env.vh }), n.color);
  const m = p.m;
  let row = false;
  if (!isText) {
    const d = m.display;
    if (d === 'none') box.display = 'none';
    if (d === 'flex' || d === 'inline-flex') {
      const dir = m.dir || 'row';
      box.flexDirection = dir;
      row = dir.startsWith('row');
      if (d === 'inline-flex' && !parent.row && box.alignSelf === undefined) box.alignSelf = 'flex-start';
    } else {
      box.flexDirection = 'column';
      if (isButton && d !== 'flex') {
        if (box.alignItems === undefined) box.alignItems = n.textAlign === 'left' ? 'flex-start' : n.textAlign === 'right' ? 'flex-end' : 'center';
        if (box.justifyContent === undefined) box.justifyContent = 'center';
      }
    }
  }
  // Itens de uma linha flex encolhem por omissão (como no CSS), excepto texto sem quebra.
  if (parent.row && !m.shrinkSet && !m.flexSet) {
    const keep = isText && n.noWrap && box.minWidth !== 0;
    box.flexShrink = keep ? 0 : 1;
  }
  if (parent.cell && box.flexGrow === undefined) box.flexGrow = 1;
  if (m.pointerEvents === 'none') box.pointerEvents = 'none';
  return { box, n, m, row };
}

const SCROLL_OUTER = new Set(['flex', 'flexGrow', 'flexShrink', 'flexBasis', 'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight', 'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'position', 'top', 'right', 'bottom', 'left', 'zIndex', 'alignSelf', 'backgroundColor', 'borderWidth', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'borderRadius', 'opacity', 'display', 'overflow', 'boxShadow']);

function splitScroll(box) {
  const outer = {};
  const inner = {};
  for (const k in box) (SCROLL_OUTER.has(k) ? outer : inner)[k] = box[k];
  return { outer, inner };
}

const isScroll = (v) => v === 'auto' || v === 'scroll';

// ───────────────────────── E: caixa ─────────────────────────
function a11y(props) {
  const st = {};
  if (props.a_pressed !== undefined) st.selected = props.a_pressed === true || props.a_pressed === 'true';
  if (props.a_selected !== undefined) st.selected = props.a_selected === true || props.a_selected === 'true';
  if (props.a_checked !== undefined) st.checked = props.a_checked === true || props.a_checked === 'true';
  const disabled = props.disabled !== undefined && props.disabled !== false && props.disabled !== 'false' && props.disabled !== null;
  if (disabled) st.disabled = true;
  const role = props.role === 'switch' ? 'switch' : props.role === 'tab' ? 'tab' : props.role === 'dialog' ? undefined : props.tag === 'button' ? 'button' : undefined;
  return { accessibilityLabel: props.accessibilityLabel, accessibilityState: Object.keys(st).length ? st : undefined, accessibilityRole: role, disabled };
}

export function E(props) {
  const { s, h, onPress, tag, children } = props;
  const tc = useContext(TextCtx);
  const parent = useContext(ParentCtx);
  const env = useEnv();
  const isButton = tag === 'button';
  const base = useMemo(() => layoutFor(s, tc, parent, env, false, isButton), [s, tc, parent, env.vw, env.vh, isButton]);
  const hov = useMemo(() => (h ? layoutFor((s || '') + ';' + h, tc, parent, env, false, isButton) : null), [s, h, tc, parent, env.vw, env.vh, isButton]);
  const pressable = !!onPress || isButton;
  const ax = a11y(props);

  const body = (L) => (
    <TextCtx.Provider value={L.n}>
      <ParentCtx.Provider value={L.row ? ROW : COL}>{children}</ParentCtx.Provider>
    </TextCtx.Provider>
  );

  const m = base.m;
  if (isScroll(m.overflow) || isScroll(m.overflowX) || isScroll(m.overflowY)) {
    const horizontal = isScroll(m.overflowX) ? !isScroll(m.overflowY) : base.row && base.box.flexWrap !== 'wrap' && !isScroll(m.overflowY);
    const { outer, inner } = splitScroll(base.box);
    if (!horizontal && outer.flexShrink === undefined) outer.flexShrink = 1;
    return (
      <ScrollView horizontal={horizontal} style={outer} contentContainerStyle={horizontal ? inner : { ...inner, flexGrow: inner.flexGrow ?? 0 }} showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps="handled" nestedScrollEnabled>
        {body(base)}
      </ScrollView>
    );
  }

  if (!pressable) {
    return (
      <View style={base.box} accessibilityLabel={ax.accessibilityLabel} accessibilityRole={ax.accessibilityRole} accessibilityState={ax.accessibilityState}>
        {body(base)}
      </View>
    );
  }
  return (
    <Pressable
      onPress={
        onPress && !ax.disabled
          ? (e) => {
              haptic(props.a_selected !== undefined || props.role === 'tab' ? 'select' : 'tap');
              onPress(synthetic(e));
            }
          : undefined
      }
      disabled={ax.disabled}
      accessibilityLabel={ax.accessibilityLabel}
      accessibilityRole={ax.accessibilityRole || 'button'}
      accessibilityState={ax.accessibilityState}
      style={(st) => (st.hovered && hov ? hov.box : base.box)}
    >
      {(st) => body(st.hovered && hov ? hov : base)}
    </Pressable>
  );
}
const ROW = { row: true, cell: false };
const COL = { row: false, cell: false };
const CELL = { row: false, cell: true };
const CELL_NOGROW = { row: false, cell: false };

function synthetic(e) {
  return {
    nativeEvent: e?.nativeEvent,
    preventDefault() {},
    stopPropagation() {
      e?.stopPropagation?.();
    },
    target: {},
    currentTarget: {},
  };
}

// ───────────────────────── T: texto ─────────────────────────
export function T({ s, onPress, children, accessibilityLabel }) {
  const tc = useContext(TextCtx);
  const parent = useContext(ParentCtx);
  const nested = useContext(InTextCtx);
  const env = useEnv();
  const L = useMemo(() => layoutFor(s, tc, parent, env, true, false), [s, tc, parent, env.vw, env.vh]);
  const style = nested ? { ...textStyle(L.n), backgroundColor: L.box.backgroundColor } : { ...L.box, ...textStyle(L.n) };
  return (
    <Text
      style={style}
      numberOfLines={!nested && L.n.noWrap ? 1 : undefined}
      onPress={onPress ? (e) => { haptic('tap'); onPress(synthetic(e)); } : undefined}
      accessibilityLabel={accessibilityLabel}
      suppressHighlighting
    >
      <TextCtx.Provider value={L.n}>
        <InTextCtx.Provider value={true}>{children}</InTextCtx.Provider>
      </TextCtx.Provider>
    </Text>
  );
}

// ───────────────────────── G: grelha ─────────────────────────
function flat(children, out = []) {
  React.Children.forEach(children, (c) => {
    if (c === null || c === undefined || c === false || c === true || c === '') return;
    if (React.isValidElement(c) && c.type === React.Fragment) flat(c.props.children, out);
    else out.push(c);
  });
  return out;
}

function spanOf(child, nCols) {
  const s = child?.props?.s;
  if (!s) return 1;
  const gc = parseCached(s).m.gridColumn;
  if (!gc) return 1;
  const sp = gc.match(/span\s+(\d+)/);
  if (sp) return Math.min(nCols, parseInt(sp[1], 10));
  const [a, b] = gc.split('/').map((x) => parseInt(x.trim(), 10));
  if (b === -1) return nCols - (a || 1) + 1;
  if (a && b) return Math.max(1, Math.min(nCols, b - a));
  return 1;
}

export function G({ s, children }) {
  const tc = useContext(TextCtx);
  const parent = useContext(ParentCtx);
  const env = useEnv();
  const L = useMemo(() => layoutFor(s, tc, parent, env, false, false), [s, tc, parent, env.vw, env.vh]);
  const p = parseCached(s);
  const tracks = gridTracks(p.m.cols, { fs: L.n.fs, vw: env.vw, vh: env.vh });
  const nCols = Math.max(1, tracks.length);
  const rowGap = L.box.rowGap ?? 0;
  const colGap = L.box.columnGap ?? 0;
  const autoRow = p.m.autoRows ? len(p.m.autoRows, { fs: L.n.fs }) : undefined;
  const alignRow = L.box.alignItems ?? 'stretch';
  const items = flat(children);

  const rows = [];
  let cur = [];
  let used = 0;
  for (const it of items) {
    const sp = spanOf(it, nCols);
    if (used + sp > nCols && cur.length) {
      rows.push(cur);
      cur = [];
      used = 0;
    }
    cur.push({ it, start: used, span: sp });
    used += sp;
    if (used >= nCols) {
      rows.push(cur);
      cur = [];
      used = 0;
    }
  }
  if (cur.length) rows.push(cur);

  const { rowGap: _r, columnGap: _c, alignItems: _a, flexDirection: _f, ...outer } = L.box;
  const cellStyle = (start, span) => {
    const ts = tracks.slice(start, start + span);
    const st = { minWidth: 0 };
    let fr = 0;
    let px = 0;
    let pct;
    let auto = false;
    let min = 0;
    for (const t of ts) {
      if (t.fr !== undefined) {
        fr += t.fr;
        min += t.min ?? 0;
      } else if (t.px !== undefined) px += t.px;
      else if (t.pct) pct = t.pct;
      else if (t.auto) auto = true;
    }
    px += colGap * (span - 1);
    if (fr) {
      st.flexGrow = fr;
      st.flexShrink = 1;
      st.flexBasis = 0;
      st.minWidth = min + (px || 0);
    } else if (pct) st.width = pct;
    else if (auto) st.flexShrink = 0;
    else st.width = px;
    if (autoRow !== undefined) st.height = autoRow;
    const js = p.m.justifyItems;
    st.alignItems = js && js !== 'stretch' ? js : 'stretch';
    return st;
  };

  return (
    <View style={{ ...outer, flexDirection: 'column', rowGap }}>
      <TextCtx.Provider value={L.n}>
        {rows.map((r, ri) => (
          <View key={ri} style={{ flexDirection: 'row', columnGap: colGap, alignItems: alignRow }}>
            {r.map(({ it, start, span }, ci) => {
              const js = it?.props?.s ? parseCached(it.props.s).m.justifySelf : undefined;
              const st = cellStyle(start, span);
              if (js) st.alignItems = js;
              return (
                <View key={ci} style={st}>
                  <ParentCtx.Provider value={alignRow === 'stretch' && !js ? CELL : CELL_NOGROW}>{it}</ParentCtx.Provider>
                </View>
              );
            })}
            {(() => {
              const usedCols = r.reduce((a, c) => a + c.span, 0);
              if (usedCols >= nCols) return null;
              const st = cellStyle(usedCols, nCols - usedCols);
              return <View style={st} />;
            })()}
          </View>
        ))}
      </TextCtx.Provider>
    </View>
  );
}

// ───────────────────────── In: campos ─────────────────────────
const KEYBOARD = { tel: 'phone-pad', numeric: 'number-pad', decimal: 'decimal-pad', email: 'email-address' };

export function In(props) {
  const { s, tag, type, value, onChange, onInput, placeholder, inputMode, readOnly, checked, rows, defaultValue } = props;
  const tc = useContext(TextCtx);
  const parent = useContext(ParentCtx);
  const env = useEnv();
  const L = useMemo(() => layoutFor(s, tc, parent, env, false, false), [s, tc, parent, env.vw, env.vh]);
  const fire = (ev) => {
    onChange?.(ev);
    onInput?.(ev);
  };

  if (type === 'checkbox') {
    const on = checked === true || checked === 'true';
    return (
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: on }}
        onPress={() => {
          haptic('select');
          fire({ target: { checked: !on, value: !on }, preventDefault() {} });
        }}
        hitSlop={6}
        style={{ ...L.box, width: L.box.width ?? 16, height: L.box.height ?? 16, borderWidth: 1, borderColor: '#1d1c1a', backgroundColor: on ? '#1d1c1a' : '#ffffff', alignItems: 'center', justifyContent: 'center', padding: 0 }}
      >
        {on ? <Text style={{ color: '#fbfaf7', fontSize: 11, lineHeight: 12 }}>✓</Text> : null}
      </Pressable>
    );
  }

  const ts = textStyle(L.n);
  const multiline = tag === 'textarea';
  const lh = ts.lineHeight ?? L.n.fs * 1.25;
  const style = { ...L.box, ...ts };
  delete style.lineHeight;
  if (multiline && rows && style.height === undefined) style.minHeight = (parseInt(rows, 10) || 2) * lh + (style.paddingTop ?? 0) + (style.paddingBottom ?? 0);
  if (Platform.OS === 'web') style.outlineStyle = 'none';
  return (
    <TextInput
      style={style}
      value={value === undefined ? undefined : String(value ?? '')}
      defaultValue={defaultValue}
      onChangeText={(t) => fire({ target: { value: t }, currentTarget: { value: t }, preventDefault() {} })}
      placeholder={placeholder}
      placeholderTextColor="#8a867d"
      editable={!(readOnly === true || readOnly === 'true' || readOnly === '' || readOnly === 'readonly')}
      secureTextEntry={type === 'password'}
      keyboardType={KEYBOARD[inputMode] || (type === 'tel' ? 'phone-pad' : type === 'number' ? 'number-pad' : 'default')}
      multiline={multiline}
      textAlignVertical={multiline ? 'top' : 'center'}
      autoCapitalize={type === 'password' || inputMode === 'tel' ? 'none' : 'sentences'}
      accessibilityLabel={props.accessibilityLabel || placeholder}
    />
  );
}

// ───────────────────────── Sel / O: lista de opções ─────────────────────────
export function O() {
  return null;
}

export function Sel({ s, value, onChange, children, accessibilityLabel }) {
  const tc = useContext(TextCtx);
  const parent = useContext(ParentCtx);
  const env = useEnv();
  const L = useMemo(() => layoutFor(s, tc, parent, env, false, false), [s, tc, parent, env.vw, env.vh]);
  const [open, setOpen] = useState(false);
  const opts = flat(children).filter((c) => c?.props && 'value' in c.props).map((c) => ({ v: String(c.props.value ?? ''), l: String(c.props.label ?? c.props.value ?? ''), disabled: !!c.props.disabled }));
  const cur = opts.find((o) => o.v === String(value ?? '')) ?? opts[0];
  const ts = textStyle(L.n);
  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        onPress={() => {
          haptic('select');
          setOpen(true);
        }}
        style={{ ...L.box, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}
      >
        <Text style={{ ...ts, flexShrink: 1 }} numberOfLines={1}>
          {cur?.l ?? ''}
        </Text>
        <Text style={{ ...ts, letterSpacing: 0 }}>▾</Text>
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(29,28,26,.45)', justifyContent: 'center', padding: 24 }} onPress={() => setOpen(false)}>
          <View style={{ backgroundColor: '#fbfaf7', maxHeight: '80%', alignSelf: 'center', width: '100%', maxWidth: 420, borderTopWidth: 4, borderColor: '#c8640c' }}>
            <ScrollView>
              {opts.map((o, i) => (
                <Pressable
                  key={o.v + i}
                  disabled={o.disabled}
                  onPress={() => {
                    haptic('select');
                    setOpen(false);
                    onChange?.({ target: { value: o.v }, currentTarget: { value: o.v }, preventDefault() {} });
                  }}
                  style={(st) => ({ paddingVertical: 14, paddingHorizontal: 20, borderTopWidth: i ? 1 : 0, borderColor: '#e4e0d6', backgroundColor: st.hovered || st.pressed ? '#f4f1ea' : 'transparent', flexDirection: 'row', alignItems: 'center', gap: 12, opacity: o.disabled ? 0.4 : 1 })}
                >
                  <View style={{ width: 8, height: 8, backgroundColor: cur && o.v === cur.v ? '#c8640c' : 'transparent' }} />
                  <Text style={{ fontFamily: fontFor(500), fontSize: 15, color: '#1d1c1a' }}>{o.l}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

// ───────────────────────── S: SVG ─────────────────────────
const SVG = { svg: Svg, circle: Circle, line: Line, rect: Rect, path: Path, text: SvgText, tspan: TSpan, textPath: TextPath, defs: Defs, g: SvgG, polyline: Polyline, polygon: Polygon, ellipse: Ellipse };
const NUM_ATTRS = new Set(['width', 'height', 'cx', 'cy', 'r', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'rx', 'ry', 'strokeWidth', 'fontSize', 'letterSpacing', 'textLength']);

export function S({ t, children, ...rest }) {
  const C = SVG[t] || SvgG;
  const props = {};
  for (const k in rest) {
    let v = rest[k];
    if (v === undefined || v === null) continue;
    if (NUM_ATTRS.has(k) && typeof v === 'string' && /^-?[\d.]+$/.test(v)) v = parseFloat(v);
    if (k === 'fontFamily' && typeof v === 'string' && /outfit/i.test(v)) {
      const w = parseInt(rest.fontWeight || '400', 10);
      v = fontFor(w);
    }
    if (k === 'fontWeight' && Platform.OS !== 'web') continue;
    props[k] = v;
  }
  if (t === 'svg') props.style = { flexShrink: 0 };
  return <C {...props}>{children}</C>;
}

// ───────────────────────── ajudas para o código gerado ─────────────────────────
/** Valor dentro de uma string de estilo. */
export const s = (x) => (x === undefined || x === null || x === false ? '' : String(x));
/** Valor interpolado num texto. */
export const x = (v) => (v === undefined || v === null || typeof v === 'boolean' ? null : typeof v === 'object' && !React.isValidElement(v) ? String(v) : v);
/** Lista para <sc-for>. */
export const list = (a) => (Array.isArray(a) ? a : []);

// Objectos globais do browser usados pela lógica dos desenhos.
export const location = typeof globalThis !== 'undefined' && globalThis.location && typeof globalThis.location.search === 'string' ? globalThis.location : { search: '', hash: '', href: '', pathname: '/' };
export const win = typeof globalThis !== 'undefined' && globalThis.window && typeof globalThis.window.scrollTo === 'function' ? globalThis.window : { scrollTo() {}, addEventListener() {}, removeEventListener() {} };
export const doc = typeof globalThis !== 'undefined' && globalThis.document ? globalThis.document : { addEventListener() {}, removeEventListener() {}, querySelector: () => null };

// ───────────────────────── lógica ─────────────────────────
/** Base das classes de lógica dos desenhos (mesma API do dc-runtime). */
export class DCLogic {
  constructor(props) {
    this.props = props || {};
    this.state = {};
    this.__host = null;
  }
  setState(update, cb) {
    this.__host && this.__host.__setLogicState(update, cb);
  }
  forceUpdate() {
    this.__host && this.__host.forceUpdate();
  }
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  renderVals() {
    return {};
  }
}

/** Liga a classe de lógica ao template gerado e devolve um componente React. */
export function makeDC(Logic, render, defaults, name) {
  class DC extends React.Component {
    constructor(props) {
      super(props);
      this.state = { __v: 0 };
      const L = Logic || DCLogic;
      try {
        this.logic = new L(this.userProps(props));
      } catch (e) {
        console.error(`[${name}]`, e);
        this.logic = new DCLogic(this.userProps(props));
      }
      this.logic.__host = this;
    }
    userProps(p) {
      return { ...defaults, ...p };
    }
    __setLogicState(update, cb) {
      const prev = this.logic.state;
      const patch = typeof update === 'function' ? update(prev) : update;
      this.logic.state = { ...prev, ...patch };
      this.setState((st) => ({ __v: st.__v + 1 }), cb);
    }
    componentDidMount() {
      try {
        this.logic.componentDidMount();
      } catch (e) {
        console.error(`[${name}]`, e);
      }
    }
    componentDidUpdate(prev) {
      this.logic.props = this.userProps(this.props);
      try {
        this.logic.componentDidUpdate(this.userProps(prev));
      } catch (e) {
        console.error(`[${name}]`, e);
      }
    }
    componentWillUnmount() {
      try {
        this.logic.componentWillUnmount();
      } catch (e) {
        console.error(`[${name}]`, e);
      }
    }
    render() {
      const props = this.userProps(this.props);
      this.logic.props = props;
      let vals = props;
      try {
        vals = { ...props, ...(this.logic.renderVals() || {}) };
      } catch (e) {
        console.error(`[${name}].renderVals`, e);
      }
      return render(vals);
    }
  }
  DC.displayName = name;
  return DC;
}
