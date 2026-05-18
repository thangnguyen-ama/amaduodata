// TopBar — streak / XP / hearts row at the top of every tab screen.

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Color, Font, Size, Space } from '../tokens';

interface Props {
  streak: number;
  xp: number;
  hearts: number;
}

export function TopBar({ streak, xp, hearts }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.item}>
        <Image source={require('../../assets/icon-flame.svg')} style={styles.icon24} />
        <Text style={styles.num}>{streak}</Text>
      </View>
      <View style={styles.item}>
        <Image source={require('../../assets/icon-xp.svg')} style={styles.icon22} />
        <Text style={styles.num}>{xp.toLocaleString()}</Text>
      </View>
      <View style={styles.item}>
        <Image source={require('../../assets/icon-heart.svg')} style={styles.icon22} />
        <Text style={styles.num}>{hearts}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Space.s5,
    paddingTop: Space.s2,
    paddingBottom: Space.s3,
    borderBottomWidth: 1,
    borderBottomColor: Color.border,
    backgroundColor: Color.paper,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  num: {
    fontFamily: Font.display,    // Outfit 900
    fontSize: 18,
    color: Color.ink[900],
    fontVariant: ['tabular-nums'],
  },
  icon24: { width: 24, height: 24 },
  icon22: { width: 22, height: 22 },
});
