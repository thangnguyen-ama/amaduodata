// CelebrationScreen — post-lesson moment. Beat celebrates + XP + accuracy.

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Color, Font, Radius, Space } from '../tokens';
import { DuoButton } from '../components/DuoButton';
import { Mascot } from '../components/Mascot';
import { Check } from '../svg/icons';

interface Props {
  correct: number;
  total: number;
  xp: number;
  onContinue: () => void;
}

export function CelebrationScreen({ correct, total, xp, onContinue }: Props) {
  return (
    <View style={styles.root}>
      {/* confetti dots (static placement; animate in production with Reanimated) */}
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        {[...Array(28)].map((_, i) => {
          const palette = [Color.violet[400], Color.blue[400], Color.pink[400], Color.sun[400]];
          return (
            <View
              key={i}
              style={{
                position: 'absolute',
                left: `${(i * 37) % 100}%`,
                top:  `${(i * 53) % 70}%`,
                width: 4 + (i % 4) * 2,
                height: (4 + (i % 4) * 2) * 1.4,
                borderRadius: 2,
                backgroundColor: palette[i % 4],
                transform: [{ rotate: `${(i * 13) % 360}deg` }],
                opacity: 0.85,
              }}
            />
          );
        })}
      </View>

      <View style={styles.center}>
        <Mascot size={200} celebrating />
        <Text style={styles.eyebrow}>LESSON COMPLETE</Text>
        <Text style={styles.title}>Nice streak.</Text>
        <Text style={styles.body}>That's day 148. ARPDAU clicked — and the denominator never tripped you up.</Text>

        <View style={styles.statRow}>
          <View style={styles.stat}>
            <Text style={[styles.statEyebrow, { color: Color.sun[700] }]}>TOTAL XP</Text>
            <View style={styles.statRowInner}>
              <Image source={require('../../assets/icon-xp.svg')} style={{ width: 22, height: 22 }} />
              <Text style={styles.statValue}>+{xp}</Text>
            </View>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statEyebrow, { color: Color.green[600] }]}>ACCURACY</Text>
            <View style={styles.statRowInner}>
              <Check size={20} color={Color.green[500]} />
              <Text style={styles.statValue}>{Math.round(correct / total * 100)}%</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <DuoButton color="violet" onPress={onContinue} fullWidth>Continue</DuoButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Color.paper },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Space.s6, gap: 4 },
  eyebrow: { fontFamily: Font.monoBold, fontSize: 11, color: Color.green[500], letterSpacing: 1.2, marginTop: Space.s3 },
  title: { fontFamily: Font.display, fontSize: 40, color: Color.ink[900], letterSpacing: -1.2, textAlign: 'center', marginTop: 4 },
  body: { fontFamily: Font.body, fontSize: 15, color: Color.ink[500], textAlign: 'center', maxWidth: 280, marginTop: 6 },
  statRow: { flexDirection: 'row', gap: 12, marginTop: 24 },
  stat: {
    backgroundColor: '#fff', borderWidth: 2, borderColor: Color.ink[100],
    borderRadius: Radius.md, paddingHorizontal: Space.s5, paddingVertical: Space.s3,
    alignItems: 'center', minWidth: 90,
  },
  statEyebrow: { fontFamily: Font.monoBold, fontSize: 11, letterSpacing: 1 },
  statRowInner: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  statValue: { fontFamily: Font.display, fontSize: 24, color: Color.ink[900] },
  footer: { padding: Space.s5, paddingBottom: Space.s7, borderTopWidth: 2, borderTopColor: Color.ink[100], backgroundColor: '#fff' },
});
