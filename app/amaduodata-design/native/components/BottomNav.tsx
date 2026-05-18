// BottomNav — frosted-ink 5-item tab bar at the bottom of the app.

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Color, Font, Space } from '../tokens';
import { Home, Brain, ChartLine, Trophy, User } from '../svg/icons';   // SVG glyphs

export type TabId = 'learn' | 'practice' | 'stats' | 'league' | 'me';

interface Props {
  active: TabId;
  onChange: (id: TabId) => void;
}

const items: { id: TabId; label: string; Icon: React.FC<{ size: number; color: string }> }[] = [
  { id: 'learn',    label: 'Learn',    Icon: Home },
  { id: 'practice', label: 'Practice', Icon: Brain },
  { id: 'stats',    label: 'Stats',    Icon: ChartLine },
  { id: 'league',   label: 'League',   Icon: Trophy },
  { id: 'me',       label: 'Me',       Icon: User },
];

export function BottomNav({ active, onChange }: Props) {
  return (
    <View style={styles.wrap}>
      <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.row}>
        {items.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <Pressable key={id} onPress={() => onChange(id)} style={styles.tab}>
              <Icon size={24} color={isActive ? Color.violet[300] : 'rgba(245,242,238,0.55)'} />
              <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(19,19,38,0.92)',
    paddingTop: 10,
    paddingBottom: 28,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 3,
  },
  label: {
    fontFamily: Font.displaySemi,
    fontSize: 11,
    color: 'rgba(245,242,238,0.55)',
    letterSpacing: 0.5,
  },
  labelActive: {
    fontFamily: Font.display,         // 900 Black
    color: Color.violet[300],
  },
});
