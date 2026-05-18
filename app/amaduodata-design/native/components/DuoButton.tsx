// DuoButton — chunky pressable with a 4px colored base that disappears on press.
// In React Native, we layer a colored View beneath the button to simulate the CSS
// `box-shadow: 0 4px 0 0 <darker>` pattern.

import React, { useState } from 'react';
import { Pressable, Text, View, StyleSheet, Animated, GestureResponderEvent } from 'react-native';
import { Color, Font, Radius, Size } from '../tokens';

type Variant = 'violet' | 'blue' | 'green' | 'pink' | 'sun' | 'ink' | 'ghost';

interface Props {
  children: React.ReactNode;
  color?: Variant;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  fullWidth?: boolean;
}

const palette: Record<Variant, { bg: string; fg: string; base: string }> = {
  violet: { bg: Color.violet[500], fg: '#fff',             base: Color.violet[700] },
  blue:   { bg: Color.blue[400],   fg: '#fff',             base: Color.blue[700] },
  green:  { bg: Color.green[400],  fg: Color.green[900],   base: Color.green[700] },
  pink:   { bg: Color.pink[400],   fg: '#fff',             base: Color.pink[700] },
  sun:    { bg: Color.sun[400],    fg: Color.sun[900],     base: Color.sun[700] },
  ink:    { bg: Color.ink[900],    fg: Color.paper,        base: Color.ink[700] },
  ghost:  { bg: '#fff',            fg: Color.ink[900],     base: Color.ink[200] },
};

export function DuoButton({ children, color = 'violet', size = 'lg', disabled, onPress, fullWidth }: Props) {
  const p = palette[color];
  const [pressed, setPressed] = useState(false);

  const sz = size === 'sm' ? { px: 16, py: 10, fs: 13 }
           : size === 'md' ? { px: 20, py: 12, fs: 14 }
           :                  { px: 24, py: 15, fs: 16 };

  if (disabled) {
    return (
      <View style={[styles.wrap, fullWidth && styles.full]}>
        <View style={[styles.button, { backgroundColor: Color.ink[100], paddingHorizontal: sz.px, paddingVertical: sz.py }]}>
          <Text style={[styles.label, { color: Color.ink[300], fontSize: sz.fs }]}>{children}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.wrap, fullWidth && styles.full]}>
      {/* base shadow layer */}
      {!pressed && (
        <View style={[styles.shadow, { backgroundColor: p.base }]} />
      )}
      <Pressable
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={[
          styles.button,
          {
            backgroundColor: p.bg,
            paddingHorizontal: sz.px,
            paddingVertical: sz.py,
            transform: [{ translateY: pressed ? 4 : 0 }],
            borderWidth: color === 'ghost' ? 2 : 0,
            borderColor: color === 'ghost' ? Color.ink[200] : 'transparent',
          },
        ]}>
        <Text style={[styles.label, { color: p.fg, fontSize: sz.fs }]}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  full: { alignSelf: 'stretch' },
  shadow: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    height: '100%',
    top: 4,
    borderRadius: Radius.md,
  },
  button: {
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: Font.display,    // Outfit 900
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
