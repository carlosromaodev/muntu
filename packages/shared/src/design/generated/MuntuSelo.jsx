// GERADO a partir de "Muntu Selo.dc.html" por tools/dc2rn.py — não editar à mão.
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
  pid = "seal-" + Math.random().toString(36).slice(2, 8);
  renderVals() {
    const size = this.props.size ?? 180, color = this.props.color ?? "#1d1c1a";
    return { size, color, gray: this.props.grayColor ?? "#8a867d", markColor: this.props.markColor ?? color, markSize: Math.round(size * 0.355), pid: this.pid, pref: "#" + this.pid };
  }
}

function render(v) {
  return (
    <>
    <R.E s={`position:relative;width:${R.s(v.size)}px;height:${R.s(v.size)}px;flex-shrink:0`}>
      <R.S t="svg" viewBox="0 0 200 200" width={v.size} height={v.size} accessibilityLabel="Selo MUNTU Ginásio"><R.S t="defs"><R.S t="path" id={v.pid} d="M100,26 a74,74 0 1,1 -0.01,0" /></R.S><R.S t="circle" cx="100" cy="100" r="96" fill="none" stroke={v.gray} strokeWidth="1" /><R.S t="circle" cx="100" cy="100" r="56" fill="none" stroke={v.gray} strokeWidth="1" /><R.S t="text" fontFamily="Outfit,sans-serif" fontSize="15" fontWeight="500" letterSpacing="3"><R.S t="textPath" href={v.pref} textLength="458" lengthAdjust="spacing"><R.S t="tspan" fill={v.color}>{"MUNTU"}</R.S><R.S t="tspan" fill={v.gray} fontWeight="400">{" · GINÁSIO · "}</R.S><R.S t="tspan" fill={v.color}>{"MUNTU"}</R.S><R.S t="tspan" fill={v.gray} fontWeight="400">{" · GINÁSIO ·"}</R.S></R.S></R.S></R.S>
      <R.E s="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">
        <MuntuMark variant="C" color={v.markColor} size={v.markSize} />
      </R.E>
    </R.E>
    </>
  );
}

export const MuntuSelo = R.makeDC(Component, render, {"size": 180, "color": "#1d1c1a", "grayColor": "#8a867d", "markColor": "#1d1c1a"}, "MuntuSelo");
export default MuntuSelo;
