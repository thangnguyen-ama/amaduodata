// LeagueScreen — weekly leaderboard with promote / mid / demote zones.

import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Color, Font, Radius, Space } from '../tokens';

type Row = { rank: number; name: string; xp: number; you?: boolean };

const PROMOTE: Row[] = [
  { rank: 1, name: 'Linh Bui',   xp: 1840 },
  { rank: 2, name: 'Khoa Vu',    xp: 1612 },
  { rank: 3, name: 'Hanh Tran',  xp: 1497 },
];
const MID: Row[] = [
  { rank: 4, name: 'Minh Le',    xp: 1280 },
  { rank: 5, name: 'You',        xp: 1240, you: true },
  { rank: 6, name: 'Phuc Pham',  xp:  990 },
  { rank: 7, name: 'Dao Nguyen', xp:  860 },
  { rank: 8, name: 'Bao Tran',   xp:  812 },
];
const DEMOTE: Row[] = [
  { rank:  9, name: 'Quan Vo',   xp:  640 },
  { rank: 10, name: 'Tien Le',   xp:  580 },
];

function medalColor(rank: number) {
  if (rank === 1) return Color.sun[400];
  if (rank === 2) return Color.ink[200];
  if (rank === 3) return '#CB8842';
  return null;
}

function RowItem({ row }: { row: Row }) {
  const medal = medalColor(row.rank);
  const initials = row.name.split(' ').map(s => s[0]).slice(0, 2).join('');
  return (
    <View style={[styles.row, row.you && styles.rowYou]}>
      <View style={[styles.rank, { backgroundColor: medal || 'transparent' }]}>
        <Text style={[styles.rankText, { color: medal ? (row.rank === 1 ? Color.sun[900] : '#fff') : Color.ink[400] }]}>{row.rank}</Text>
      </View>
      <View style={styles.avatar}>
        <Text style={styles.avatarInit}>{initials}</Text>
      </View>
      <Text style={[styles.name, row.you && styles.nameYou]}>{row.name}</Text>
      {row.you && <Text style={styles.youTag}>YOU</Text>}
      <Text style={styles.xp}>{row.xp.toLocaleString()}</Text>
      <Text style={styles.xpLabel}>XP</Text>
    </View>
  );
}

export function LeagueScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 140 }}>
      {/* hero */}
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>THIS WEEK'S LEAGUE</Text>
        <Text style={styles.heroTitle}>Diamond</Text>
        <Text style={styles.heroBody}>Top 3 promote · bottom 2 demote · 3 days left</Text>
      </View>

      <Text style={styles.zoneLabel}>↑ PROMOTE TO MASTER</Text>
      <View style={styles.section}>
        {PROMOTE.map(r => <RowItem key={r.rank} row={r} />)}
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        {MID.map(r => <RowItem key={r.rank} row={r} />)}
      </View>
      <View style={[styles.divider, { backgroundColor: '#F0B6BE' }]} />
      <Text style={[styles.zoneLabel, { color: Color.danger }]}>↓ DEMOTE TO GOLD</Text>
      <View style={styles.section}>
        {DEMOTE.map(r => <RowItem key={r.rank} row={r} />)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: Color.paper },

  hero: { marginHorizontal: Space.s4, marginVertical: Space.s4, padding: Space.s6, borderRadius: Radius.xl, backgroundColor: Color.ink[900] },
  heroEyebrow: { fontFamily: Font.monoBold, fontSize: 11, color: Color.violet[300], letterSpacing: 1.2 },
  heroTitle:   { fontFamily: Font.display, fontSize: 28, color: '#fff', marginTop: 4 },
  heroBody:    { fontFamily: Font.body, fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 6 },

  zoneLabel: { fontFamily: Font.monoBold, fontSize: 11, color: Color.blue[500], letterSpacing: 1.2, paddingHorizontal: Space.s4, marginVertical: Space.s2 },
  divider:   { height: 2, backgroundColor: Color.blue[200], marginHorizontal: Space.s4 },

  section: { paddingHorizontal: Space.s2, gap: 2, paddingBottom: 4 },

  row: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: Space.s3, paddingVertical: Space.s2,
    borderRadius: Radius.md,
  },
  rowYou: { backgroundColor: Color.violet[50], borderWidth: 2, borderColor: Color.violet[500] },

  rank: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  rankText: { fontFamily: Font.display, fontSize: 14 },

  avatar: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: Color.ink[400],
    alignItems: 'center', justifyContent: 'center',
  },
  avatarInit: { fontFamily: Font.display, fontSize: 13, color: '#fff' },

  name: { flex: 1, fontFamily: Font.bodyMed, fontSize: 15, color: Color.ink[900] },
  nameYou: { fontFamily: Font.bodyBold },
  youTag: { fontFamily: Font.monoBold, fontSize: 11, color: Color.violet[500], letterSpacing: 1 },

  xp:      { fontFamily: Font.display, fontSize: 15, color: Color.ink[900] },
  xpLabel: { fontFamily: Font.monoBold, fontSize: 11, color: Color.ink[500], letterSpacing: 0.6 },
});
