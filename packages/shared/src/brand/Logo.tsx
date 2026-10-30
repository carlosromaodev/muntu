import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { F } from '../theme/tokens';
import { MuntuMark, MarkVariant } from './Mark';

type Props = {
  variant?: MarkVariant;
  color?: string;
  size?: number;
  layout?: 'horizontal' | 'vertical';
  tagline?: boolean;
  taglineText?: string;
  descriptor?: string;
  descriptorColor?: string;
  descriptorInk?: string;
};

/** Logotipo MUNTU — proporções exactas do ficheiro "Muntu Logo.dc.html". */
export const MuntuLogo = memo(function MuntuLogo({
  variant = 'C',
  color = '#1d1c1a',
  size: s = 48,
  layout = 'horizontal',
  tagline = false,
  taglineText = 'Gestão de ginásios',
  descriptor = 'Ginásio',
  descriptorColor = '#8a867d',
  descriptorInk = '#fbfaf7',
}: Props) {
  const vert = layout === 'vertical';
  const markSize = vert ? s * 1.5 : s;
  const gap = vert ? s * 0.4 : s * 0.24;
  const wordSize = s * 0.72;
  const descSize = Math.max(9, s * 0.2);
  const padY = Math.max(4, s * 0.09);
  const padL = Math.max(7, s * 0.15);
  const padR = Math.max(5, s * 0.12);
  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={`MUNTU ${descriptor}`}
      style={{ flexDirection: vert ? 'column' : 'row', alignItems: 'center', gap }}
    >
      <MuntuMark variant={variant} color={color} size={markSize} />
      <View style={{ flexDirection: 'column', alignItems: vert ? 'center' : 'flex-start', gap: s * 0.16 }}>
        <Text
          style={{
            fontFamily: F[500],
            fontSize: wordSize,
            lineHeight: wordSize * 0.82 + 2,
            letterSpacing: wordSize * 0.02,
            color,
            includeFontPadding: false,
          }}
        >
          MUNTU
        </Text>
        {tagline ? (
          <Text
            numberOfLines={1}
            style={{
              fontFamily: F[500],
              fontSize: Math.max(9, s * 0.15),
              letterSpacing: Math.max(9, s * 0.15) * 0.24,
              textTransform: 'uppercase',
              opacity: 0.8,
              color,
            }}
          >
            {taglineText}
          </Text>
        ) : null}
      </View>
      {descriptor ? (
        <View
          style={{
            alignSelf: vert ? 'center' : 'flex-start',
            marginTop: vert ? 0 : s * 0.12,
            paddingTop: padY,
            paddingBottom: padY,
            paddingLeft: padL,
            paddingRight: padR,
            borderRadius: 2,
            backgroundColor: descriptorColor,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontFamily: F[600],
              fontSize: descSize,
              lineHeight: descSize + 1,
              letterSpacing: descSize * 0.18,
              textTransform: 'uppercase',
              color: descriptorInk,
              includeFontPadding: false,
            }}
          >
            {descriptor}
          </Text>
        </View>
      ) : null}
    </View>
  );
});
