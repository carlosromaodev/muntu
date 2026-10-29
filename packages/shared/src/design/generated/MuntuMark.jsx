// GERADO a partir de "Muntu Mark.dc.html" por tools/dc2rn.py — não editar à mão.
// Para mudar o visual, edite o ficheiro de desenho e volte a gerar.
/* eslint-disable */
import React from 'react';
import * as R from '../runtime';

const DCLogic = R.DCLogic;
const location = R.location;
const window = R.win;
const document = R.doc;

class Component extends DCLogic {
  renderVals() {
    const v = this.props.variant ?? "A";
    const P = (a, r) => [50 + r * Math.cos(a), 50 + r * Math.sin(a)];
    const L = (a1, r1, a2, r2, w) => { const [x1, y1] = P(a1, r1), [x2, y2] = P(a2, r2); return { x1, y1, x2, y2, w }; };
    const lines = [], dots = [];
    let ringR = 18, ringW = 8;
    if (v === "A") {
      for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6 - Math.PI / 2; lines.push(L(a, 30, a, 45, 7)); }
    } else if (v === "B") {
      for (let i = 0; i < 10; i++) { const a = i * Math.PI / 5 - Math.PI / 2; lines.push(L(a, 30, a, 36, 7)); const [cx, cy] = P(a, 44); dots.push({ cx, cy, r: 5 }); }
    } else {
      ringR = 17;
      for (let i = 0; i < 8; i++) {
        const a = i * Math.PI / 4 - Math.PI / 2;
        lines.push(L(a, 28, a, 38, 7));
        const [bx, by] = P(a, 38);
        [-0.6, 0.6].forEach(o => lines.push({ x1: bx, y1: by, x2: bx + 9 * Math.cos(a + o), y2: by + 9 * Math.sin(a + o), w: 6 }));
      }
    }
    return { lines, dots, ringR, ringW, color: this.props.color ?? "#c8640c", size: this.props.size ?? 64 };
  }
}

function render(v) {
  return (
    <>
    <R.S t="svg" viewBox="0 0 100 100" width={v.size} height={v.size} accessibilityLabel="Símbolo MUNTU"><R.S t="circle" cx="50" cy="50" r={v.ringR} fill="none" stroke={v.color} strokeWidth={v.ringW} />{R.list(v.lines).map((l, $index) => (<React.Fragment key={$index}><R.S t="line" x1={l?.x1} y1={l?.y1} x2={l?.x2} y2={l?.y2} stroke={v.color} strokeWidth={l?.w} strokeLinecap="round" /></React.Fragment>))}{R.list(v.dots).map((d, $index) => (<React.Fragment key={$index}><R.S t="circle" cx={d?.cx} cy={d?.cy} r={d?.r} fill={v.color} /></React.Fragment>))}</R.S>
    </>
  );
}

export const MuntuMark = R.makeDC(Component, render, {"variant": "A", "color": "#c8640c", "size": 64}, "MuntuMark");
export default MuntuMark;
