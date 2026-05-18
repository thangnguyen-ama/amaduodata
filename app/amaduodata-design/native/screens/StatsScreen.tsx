// StatsScreen — personal data dashboard. Mini bar chart + skill mastery.

import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Color, Font, Radius, Space } from '../tokens';

const WEEK = [12, 28, 0, 35, 41, 18, 25];
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const SKILLS = [
  { label: 'Retention basics',  pct: 0.95, color: Color.blue[400] },
  { label: 'Monetization',      pct: 0.40, color: Color.violet[500] },
  { label: 'Funnels & cohorts', pct: 0.25, color: Color.pink[400] },
  { label: 'A/B testing',       pct: 0.00, color: Color.ink[300] },
];

function Chart() {
  const max = Math.max(...WEEK);
  return (
    <View style={chartStyles.row}>
      {WEEK.map((v, i) => (
        <View key={i} style={chartStyles.col}>
          <View style={[
            chartStyles.bar,
            {
              height: v === 0 ? 4 : (v / max) * 90,
              backgroundColor: v === 0 ? Color.ink[100] : i === 4 ? Color.violet[500] : Color.violet[300],
            },
          ]} />
          <Text style={[chartStyles.day, i === 4 && { color: Color.violet[700], fontFamily: Font.monoBold }]}>{DAYS[i]}</Text>
        </View>
      ))}
    </View>
  );
}

export function StatsScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 140 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Stats</Text>
        <Text style={styles.body}>How you're learning.</Text>
      </View>

      <View style={styles.weekCard}>
        <View style={styles.weekRow}>
          <View>
            <Text style={styles.weekEyebrow}>THIS WEEK · XP</Text>
            <Text style={styles.weekValue}>159</Text>
          </View>
          <Text style={styles.weekDelta}>↑ 22%</Text>
        </View>
        <Chart />
      </View>

      <Text style={styles.sectionLabel}>SKILLS</Text>
      <View style={{ paddingHorizontal: Space.s4, gap: 8 }}>
        {SKILLS.map(s => (
          <View key={s.label} style={styles.skill}>
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>{s.label}</Text>
              <Text style={styles.skillPct}>{Math.round(s.pct * 100)}%</Text>
            </View>
            <View style={styles.skillTrack}>
              <View style={[styles.skillFill, { width: `${s.pct * 100}%`, backgroundColor: s.color }]} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: Color.paper },
  header: { padding: Space.s5, paddingBottom: Space.s4 },
  title:  { fontFamily: Font.display, fontSize: 30, color: Color.ink[900], letterSpacing: -0.8 },
  body:   { fontFamily: Font.body, fontSize: 15, color: Color.ink[500], marginTop: 4 },

  weekCard: { marginHorizontal: Space.s4, marginBottom: Space.s3, padding: Space.s5, borderRadius: Radius.lg, backgroundColor: '#fff', borderWidth: 2, borderColor: Color.ink[100] },
  weekRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  weekEyebrow: { fontFamily: Font.monoBold, fontSize: 11, color: Color.ink[500], letterSpacing: 1 },
  weekValue:   { fontFamily: Font.display, fontSize: 36, color: Color.ink[900], marginTop: 4 },
  weekDelta:   { fontFamily: Font.monoBold, fontSize: 13, color: Color.blue[500] },

  sectionLabel: { fontFamily: Font.monoBold, fontSize: 12, color: Color.ink[500], letterSpacing: 1.2, paddingHorizontal: Space.s4, marginTop: Space.s3, marginBottom: Space.s2 },

  skill: { backgroundColor: '#fff', borderWidth: 1, borderColor: Color.border, borderRadius: Radius.md, padding: Space.s3, gap: 8 },
  skillRow: { flexDirection: 'row', justifyContent: 'space-between' },
  skillLabel: { fontFamily: Font.bodyMed, fontSize: 14, color: Color.ink[900] },
  skillPct:   { fontFamily: Font.monoBold, fontSize: 12, color: Color.ink[500] },
  skillTrack: { height: 8, backgroundColor: Color.ink[100], borderRadius: Radius.pill, overflow: 'hidden' },
  skillFill:  { height: '100%', borderRadius: Radius.pill },
});

const chartStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, height: 110, marginTop: 14 },
  col: { flex: 1, alignItems: 'center', gap: 6 },
  bar: { width: '100%', borderRadius: 6 },
  day: { fontFamily: Font.monoBold, fontSize: 11, color: Color.ink[500] },
});
