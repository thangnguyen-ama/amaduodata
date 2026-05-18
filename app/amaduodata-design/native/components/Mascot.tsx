// Mascot — Beat, the simple violet squircle character.
// SVG version for react-native-svg. Matches assets/mascot-beat.svg.

import React from 'react';
import Svg, { Path, Circle, Ellipse, Line } from 'react-native-svg';
import { Color } from '../tokens';

interface Props {
  size?: number;
  celebrating?: boolean;
}

export function Mascot({ size = 120, celebrating = false }: Props) {
  if (celebrating) {
    return (
      <Svg width={size} height={size * 1.1} viewBox="0 0 220 220">
        <Ellipse cx="110" cy="206" rx="58" ry="6" fill={Color.ink[900]} opacity={0.10} />
        <Path d="M28 36 l 3 8 l 8 3 l -8 3 l -3 8 l -3 -8 l -8 -3 l 8 -3 z" fill={Color.sun[400]} />
        <Path d="M194 28 l 3 7 l 7 3 l -7 3 l -3 7 l -3 -7 l -7 -3 l 7 -3 z" fill={Color.sun[400]} />
        <Path d="M186 168 l 2 6 l 6 2 l -6 2 l -2 6 l -2 -6 l -6 -2 l 6 -2 z" fill={Color.pink[400]} />
        <Path d="M20 158 l 2 6 l 6 2 l -6 2 l -2 6 l -2 -6 l -6 -2 l 6 -2 z" fill={Color.pink[400]} />
        <Circle cx="110" cy="20" r="6" fill={Color.sun[400]} />
        <Line x1="110" y1="28" x2="110" y2="40" stroke={Color.ink[900]} strokeWidth="3" strokeLinecap="round" />
        <Path
          d="M50 110 C 50 66, 66 50, 110 50 C 154 50, 170 66, 170 110 C 170 154, 154 170, 110 170 C 66 170, 50 154, 50 110 Z"
          fill={Color.violet[500]} />
        <Path d="M74 74 C 90 62, 130 62, 146 74 C 132 66, 88 66, 74 74 Z" fill={Color.violet[300]} opacity={0.45} />
        <Path d="M78 102 Q 90 88 102 102" stroke={Color.ink[900]} strokeWidth="6" strokeLinecap="round" fill="none" />
        <Path d="M118 102 Q 130 88 142 102" stroke={Color.ink[900]} strokeWidth="6" strokeLinecap="round" fill="none" />
        <Path d="M82 124 Q 110 152 138 124" stroke={Color.ink[900]} strokeWidth="6" strokeLinecap="round" fill="none" />
      </Svg>
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <Ellipse cx="100" cy="186" rx="58" ry="6" fill={Color.ink[900]} opacity={0.10} />
      <Circle cx="100" cy="14" r="6" fill={Color.sun[400]} />
      <Line x1="100" y1="22" x2="100" y2="34" stroke={Color.ink[900]} strokeWidth="3" strokeLinecap="round" />
      <Path
        d="M40 100 C 40 56, 56 40, 100 40 C 144 40, 160 56, 160 100 C 160 144, 144 160, 100 160 C 56 160, 40 144, 40 100 Z"
        fill={Color.violet[500]} />
      <Path d="M64 64 C 80 52, 120 52, 136 64 C 122 56, 78 56, 64 64 Z" fill={Color.violet[300]} opacity={0.45} />
      <Circle cx="80"  cy="96" r="9" fill={Color.paper} />
      <Circle cx="120" cy="96" r="9" fill={Color.paper} />
      <Circle cx="82"  cy="98" r="4" fill={Color.ink[900]} />
      <Circle cx="122" cy="98" r="4" fill={Color.ink[900]} />
      <Path d="M82 122 Q 100 138 118 122" stroke={Color.ink[900]} strokeWidth="5" strokeLinecap="round" fill="none" />
    </Svg>
  );
}
