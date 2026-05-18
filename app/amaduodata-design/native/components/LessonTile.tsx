// LessonTile — round chunky tile used in the LearnPath. 5 states.

import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Color, Font, Radius } from '../tokens';
import { Lock, Check, Play, Star } from '../svg/icons';

export type TileState = 'locked' | 'current' | 'start' | 'done' | 'bonus';

interface Props {
  state: TileState;
  label: string;
  onPress?: () => void;
}

const config: Record<TileState, { bg: string; fg: string; base: string; icon: React.FC<{ size: number; color: string }> }> = {
  locked:  { bg: Color.ink[100],    fg: Color.ink[300],   base: Color.ink[200],   icon: Lock  },
  current: { bg: Color.violet[500], fg: '#fff',           base: Color.violet[700], icon: Play  },
  start:   { bg: Color.violet[500], fg: '#fff',           base: Color.violet[700], icon: Play  },
  done:    { bg: Color.blue[400],   fg: '#fff',           base: Color.blue[700],  icon: Check },
  bonus:   { bg: Color.sun[400],    fg: Color.sun[900],   base: Color.sun[700],   icon: Star  },
};

export function LessonTile({ state, label, onPress }: Props) {
  const [pressed, setPressed] = useState(false);
  const c = config[state];
  const Icon = c.icon;
  const locked = state === 'locked';

  return (
    <View style={styles.column}>
      <View style={styles.tileWrap}>
        {!pressed && <View style={[styles.shadow, { backgroundColor: c.base }]} />}
        <Pressable
          disabled={locked}
          onPress={onPress}
          onPressIn={() => !locked && setPressed(true)}
          onPressOut={() => setPressed(false)}
          style={[
            styles.tile,
            { backgroundColor: c.bg, transform: [{ translateY: pressed ? 6 : 0 }] },
          ]}>
          <Icon size={32} color={c.fg} />
        </Pressable>
      </View>
      <Text style={[styles.label, locked && styles.labelLocked]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    alignItems: 'center',
    gap: 8,
  },
  tileWrap: {
    width: 88, height: 94,        // extra 6px for shadow drop
    alignItems: 'center', justifyContent: 'flex-start',
  },
  shadow: {
    position: 'absolute',
    width: 88, height: 88,
    top: 6,
    borderRadius: 44,
  },
  tile: {
    width: 88, height: 88,
    borderRadius: 44,
    alignItems: 'center', justifyContent: 'center',
  },
  label: {
    fontFamily: Font.displayBold,
    fontSize: 11,
    color: Color.ink[500],
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    textAlign: 'center',
    maxWidth: 110,
  },
  labelLocked: {
    color: Color.ink[300],
  },
});
