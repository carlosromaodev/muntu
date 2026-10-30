import React, { memo, useId } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Defs, Path, Text as SvgText, TextPath, TSpan } from 'react-native-svg';
import { F } from '../theme/tokens';
import { MuntuMark } from './Mark';

/** Selo circular "MUNTU · GINÁSIO" do ficheiro "Muntu Selo.dc.html". */
export const MuntuSelo = memo(function MuntuSelo({
  size = 180,
  color = '#1d1c1a',
  grayColor = '#8a867d',
  markColor,
}: {
  size?: number;
  color?: string;
  grayColor?: string;
  markColor?: string;
}) {
  const pid = 'seal' + useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <View style={{ width: size, height: size }}>
      <Svg viewBox="0 0 200 200" width={size} height={size}>
        <Defs>
          <Path id={pid} d="M100,26 a74,74 0 1,1 -0.01,0" />
        </Defs>
        <Circle cx={100} cy={100} r={96} fill="none" stroke={grayColor} strokeWidth={1} />
        <Circle cx={100} cy={100} r={56} fill="none" stroke={grayColor} strokeWidth={1} />
        <SvgText fontFamily={F[500]} fontSize={15} letterSpacing={3}>
          <TextPath href={`#${pid}`} textLength="458" lengthAdjust="spacing">
            <TSpan fill={color}>MUNTU</TSpan>
            <TSpan fill={grayColor} fontFamily={F[400]}>
              {' · GINÁSIO · '}
            </TSpan>
            <TSpan fill={color}>MUNTU</TSpan>
            <TSpan fill={grayColor} fontFamily={F[400]}>
              {' · GINÁSIO ·'}
            </TSpan>
          </TextPath>
        </SvgText>
      </Svg>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
        <MuntuMark variant="C" color={markColor ?? color} size={Math.round(size * 0.355)} />
      </View>
    </View>
  );
});
