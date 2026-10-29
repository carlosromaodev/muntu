// GERADO a partir de "Muntu Logo.dc.html" por tools/dc2rn.py — não editar à mão.
// Para mudar o visual, edite o ficheiro de desenho e volte a gerar.
/* eslint-disable */
import React from 'react';
import * as R from '../runtime';
import { MuntuMark } from './MuntuMark';

const DCLogic = R.DCLogic;
const location = R.location;
const window = R.win;
const document = R.doc;

class Component extends DCLogic {
  renderVals() {
    const s = this.props.size ?? 48, vert = this.props.layout === "vertical";
    return {
      variant: this.props.variant ?? "A", color: this.props.color ?? "#1d1c1a", tagline: !!this.props.tagline, taglineText: this.props.taglineText ?? "Gestão de ginásios",
      dir: vert ? "column" : "row", align: vert ? "center" : "flex-start",
      markSize: vert ? s * 1.5 : s, gap: vert ? s * 0.4 : s * 0.24,
      descriptor: this.props.descriptor ?? "", descColor: this.props.descriptorColor ?? "#8a867d", descInk: this.props.descriptorInk ?? "#fbfaf7",
      descAlign: vert ? "center" : "flex-start", descTop: vert ? 0 : s * 0.12, descSize: Math.max(9, s * 0.2),
      padY: Math.max(4, s * 0.09), padL: Math.max(7, s * 0.15), padR: Math.max(5, s * 0.12),
      wordSize: s * 0.72, tagSize: Math.max(9, s * 0.15), tagGap: s * 0.16
    };
  }
}

function render(v) {
  return (
    <>
    <R.E s={`display:flex;flex-direction:${R.s(v.dir)};align-items:center;gap:${R.s(v.gap)}px;color:${R.s(v.color)}`}>
      <MuntuMark variant={v.variant} color={v.color} size={v.markSize} />
      <R.E s={`display:flex;flex-direction:column;align-items:${R.s(v.align)};gap:${R.s(v.tagGap)}px`}>
        <R.T s={`font-family:Outfit,sans-serif;font-weight:500;font-size:${R.s(v.wordSize)}px;line-height:.82;letter-spacing:.02em`}>{"MUNTU"}</R.T>
        {v.tagline ? (<>
          <R.T s={`font-family:Outfit,sans-serif;font-weight:500;font-size:${R.s(v.tagSize)}px;letter-spacing:.24em;text-transform:uppercase;white-space:nowrap;opacity:.8`}>{R.x(v.taglineText)}</R.T>
        </>) : null}
      </R.E>
      {v.descriptor ? (<>
        <R.T s={`align-self:${R.s(v.descAlign)};margin-top:${R.s(v.descTop)}px;font-family:Outfit,sans-serif;font-weight:600;font-size:${R.s(v.descSize)}px;line-height:1;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;padding:${R.s(v.padY)}px ${R.s(v.padR)}px ${R.s(v.padY)}px ${R.s(v.padL)}px;border-radius:2px;background:${R.s(v.descColor)};color:${R.s(v.descInk)}`}>{R.x(v.descriptor)}</R.T>
      </>) : null}
    </R.E>
    </>
  );
}

export const MuntuLogo = R.makeDC(Component, render, {"variant": "A", "color": "#1d1c1a", "size": 48, "layout": "horizontal", "tagline": false, "descriptor": "", "descriptorColor": "#8a867d", "descriptorInk": "#fbfaf7"}, "MuntuLogo");
export default MuntuLogo;
