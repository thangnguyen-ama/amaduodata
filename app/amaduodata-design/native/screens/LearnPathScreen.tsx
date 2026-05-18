// LearnPathScreen — the lesson tree. Vertical zig-zag path of round tiles.

import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { Color, Font, Radius, Space } from '../tokens';
import { LessonTile, TileState } from '../components/LessonTile';

type Unit = {
  num: number;
  title: string;
  color: string;
  colorDark: string;
  nodes: { id: string; label: string; state: TileState }[];
};

const UNITS: Unit[] = [
  {
    num: 1, title: 'The basics: DAU, MAU, retention',
    color: Color.violet[500], colorDark: Color.violet[700],
    nodes: [
      { id: 'u1n1', label: 'DAU vs MAU',       state: 'done' },
      { id: 'u1n2', label: 'Stickiness',       state: 'done' },
      { id: 'u1n3', label: 'D1 retention',     state: 'done' },
      { id: 'u1n4', label: 'Cohort curves',    state: 'current' },
      { id: 'u1n5', label: 'Retention spikes', state: 'locked' },
      { id: 'u1n6', label: 'Bonus: read a graph', state: 'locked' },
    ],
  },
  {
    num: 2, title: 'Monetization 101',
    color: Color.blue[400], colorDark: Color.blue[700],
    nodes: [
      { id: 'u2n1', label: 'ARPDAU',  state: 'locked' },
      { id: 'u2n2', label: 'LTV',     state: 'locked' },
    ],
  },
];

const OFFSETS = [0, 50, 80, 50, 0, -50, -80, -50];

export function LearnPathScreen({ onStartLesson }: { onStartLesson: (id: string) => void }) {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      {UNITS.map(unit => (
        <View key={unit.num}>
          <View style={[styles.unitHeader, { backgroundColor: unit.color }]}>
            <View style={[styles.unitHeaderShadow, { backgroundColor: unit.colorDark }]} />
            <View style={styles.unitHeaderInner}>
              <View>
                <Text style={styles.unitEyebrow}>UNIT {unit.num}</Text>
                <Text style={styles.unitTitle}>{unit.title}</Text>
              </View>
              <Pressable style={styles.guidebookBtn}>
                <Text style={styles.guidebookText}>Guidebook</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.tilesColumn}>
            {unit.nodes.map((n, i) => (
              <View key={n.id} style={[styles.tileRow, { transform: [{ translateX: OFFSETS[i % OFFSETS.length] }] }]}>
                <LessonTile state={n.state} label={n.label} onPress={() => onStartLesson(n.id)} />
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: Color.paper },
  content: { paddingTop: 4, paddingBottom: 140 },
  unitHeader: {
    marginHorizontal: Space.s4,
    marginTop: Space.s6, marginBottom: Space.s3,
    borderRadius: Radius.lg,
    position: 'relative',
  },
  unitHeaderShadow: {
    position: 'absolute', left: 0, right: 0, top: 4, height: '100%', borderRadius: Radius.lg, zIndex: -1,
  },
  unitHeaderInner: {
    flexDirection: 'row',
    padding: Space.s4,
    alignItems: 'center', justifyContent: 'space-between',
  },
  unitEyebrow: {
    fontFamily: Font.monoBold, fontSize: 11, color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1.2,
  },
  unitTitle: {
    fontFamily: Font.display, fontSize: 19, color: '#fff',
    marginTop: 2, letterSpacing: -0.2,
  },
  guidebookBtn: {
    backgroundColor: 'rgba(0,0,0,0.18)',
    paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: Radius.pill,
  },
  guidebookText: {
    fontFamily: Font.displayBold, fontSize: 11, color: '#fff',
    letterSpacing: 0.8,
  },
  tilesColumn: {
    paddingVertical: Space.s4,
    gap: 28,
  },
  tileRow: {
    alignItems: 'center',
  },
});
