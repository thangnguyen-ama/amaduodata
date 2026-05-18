// SVG icon set — minimal, chunky stroke. Uses react-native-svg.
// Import as `import { Home, Brain, Check, ... } from '../svg/icons'`.

import React from 'react';
import Svg, { Path, Circle, Rect, Polyline, Polygon, Line } from 'react-native-svg';

type IconProps = { size?: number; color?: string };

export const Home: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2l10 9h-3v9h-5v-6H10v6H5v-9H2z" />
  </Svg>
);

export const Brain: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M19 7v9a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V7" />
    <Path d="M16 7c0-3-2-5-4-5s-4 2-4 5" />
    <Circle cx="12" cy="13" r="2" />
  </Svg>
);

export const ChartLine: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 3v18h18" />
    <Polyline points="7 14 11 10 15 14 21 8" />
  </Svg>
);

export const Trophy: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M6 4h12v4a6 6 0 0 1-12 0V4z" />
    <Path d="M6 4H4a2 2 0 0 0 0 4h2M18 4h2a2 2 0 0 1 0 4h-2M9 18v3h6v-3" />
    <Line x1="12" y1="14" x2="12" y2="18" />
  </Svg>
);

export const User: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="8" r="4" />
    <Path d="M4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" />
  </Svg>
);

export const Play: React.FC<IconProps> = ({ size = 32, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M8 5v14l11-7z" />
  </Svg>
);

export const Check: React.FC<IconProps> = ({ size = 32, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <Polyline points="20 6 9 17 4 12" />
  </Svg>
);

export const X: React.FC<IconProps> = ({ size = 24, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
    <Line x1="18" y1="6" x2="6" y2="18" />
    <Line x1="6" y1="6" x2="18" y2="18" />
  </Svg>
);

export const Lock: React.FC<IconProps> = ({ size = 28, color = '#888' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="4" y="10" width="16" height="11" rx="2" />
    <Path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </Svg>
);

export const Star: React.FC<IconProps> = ({ size = 32, color = '#000' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
  </Svg>
);
