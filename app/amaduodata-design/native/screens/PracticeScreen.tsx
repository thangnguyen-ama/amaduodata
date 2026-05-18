// PracticeScreen — hub of short drills + daily quest.

import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { Color, Font, Radius, Space } from '../tokens';

const ITEMS = [
  { title: 'Mistakes',     sub: 'Redo the 6 you got wrong',           color: Color.pink[400],   base: Color.pink[700],   mins: 3 },
  { title: 'Retention',    sub: 'D1, D7, D30 quick-fire',             color: Color.violet[500], base: Color.violet[700], mins: 5 },
  { title: 'Monetization', sub: 'ARPDAU, LTV, payer mix',             color: Color.blue[400],   base: Color.blue[700],   mins: 5 },
  { title: 'Read a chart', sub: 'Spot the lift in a cohort triangle', color: Color.ink[900],    base: Color.ink[700],    mins: 4 },
];

function Card({ title, sub, color, base, mins, onPress }: typeof ITEMS[0] & { onPress: () => void }) {
  const [pressed, setPressed] = useState(false);
  return (
    <View style={cardStyles.wrap}>
      {!pressed && <View style={[cardStyles.shadow, { backgroundColor: base }]} />}
      <Pressable
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={[cardStyles.tile, { backgroundColor: color, transform: [{ translateY: pressed ? 4 : 0 }] }]}>
        <Text style={cardStyles.mins}>{mins} MIN</Text>
        <Text style={cardStyles.title}>{title}</Text>
        <Text style={cardStyles.sub}>{sub}</Text>
      </Pressable>
    </View>
  );
}

export function PracticeScreen({ onStart }: { onStart: () => void }) {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 140 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Practice</Text>
        <Text style={styles.body}>Short drills · no streak risk.</Text>
      </View>
      <View style={styles.grid}>
        {ITEMS.map(it => <Card key={it.title} {...it} onPress={onStart} />)}
      </View>

      <View style={styles.quest}>
        <Text style={styles.questEyebrow}>DAILY QUEST</Text>
        <Text style={styles.questTitle}>Earn 40 XP today</Text>
        <View style={styles.questRow}>
          <View style={styles.questTrack}>
            <View style={styles.questFill} />
          </View>
          <Text style={styles.questCount}>25 / 40</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: Color.paper },
  header: { padding: Space.s5, paddingBottom: Space.s4 },
  title: { fontFamily: Font.display, fontSize: 30, color: Color.ink[900], letterSpacing: -0.8 },
  body:  { fontFamily: Font.body, fontSize: 15, color: Color.ink[500], marginTop: 4 },
  grid:  { paddingHorizontal: Space.s4, flexDirection: 'row', flexWrap: 'wrap', gap: 10 },

  quest: {
    marginHorizontal: Space.s4, marginVertical: Space.s4,
    padding: Space.s4, borderRadius: Radius.lg,
    backgroundColor: Color.paperWarm, borderWidth: 2, borderColor: Color.ink[100],
  },
  questEyebrow: { fontFamily: Font.monoBold, fontSize: 11, color: Color.sun[700], letterSpacing: 1.2 },
  questTitle:   { fontFamily: Font.display, fontSize: 18, color: Color.ink[900], marginTop: 4 },
  questRow:     { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 10 },
  questTrack:   { flex: 1, height: 12, backgroundColor: Color.ink[100], borderRadius: Radius.pill, overflow: 'hidden' },
  questFill:    { width: '62%', height: '100%', backgroundColor: Color.sun[400] },
  questCount:   { fontFamily: Font.display, fontSize: 14, color: Color.sun[700] },
});

const cardStyles = StyleSheet.create({
  wrap:   { width: '48%', position: 'relative' },
  shadow: { position: 'absolute', left: 0, right: 0, top: 4, height: '100%', borderRadius: Radius.lg },
  tile:   { borderRadius: Radius.lg, padding: 18, gap: 6, minHeight: 110 },
  mins:   { fontFamily: Font.monoBold, fontSize: 11, color: 'rgba(255,255,255,0.75)', letterSpacing: 1.2 },
  title:  { fontFamily: Font.display, fontSize: 19, color: '#fff' },
  sub:    { fontFamily: Font.body, fontSize: 13, color: 'rgba(255,255,255,0.85)' },
});
