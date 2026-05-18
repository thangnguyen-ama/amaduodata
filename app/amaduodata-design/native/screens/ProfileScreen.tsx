// ProfileScreen — avatar + stat tiles + achievements.

import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { Color, Font, Radius, Space } from '../tokens';
import { Brain, ChartLine, Trophy } from '../svg/icons';

function StatTile({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <View style={statStyles.box}>
      <View style={statStyles.row}>
        {icon}
        <Text style={statStyles.value}>{value}</Text>
      </View>
      <Text style={statStyles.label}>{label}</Text>
    </View>
  );
}

function Achievement({ title, sub, icon, locked }: { title: string; sub: string; icon: React.ReactNode; locked?: boolean }) {
  return (
    <View style={[achievementStyles.box, locked && { opacity: 0.55 }]}>
      <View style={[achievementStyles.icon, { backgroundColor: locked ? Color.ink[100] : Color.violet[50] }]}>
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={achievementStyles.title}>{title}</Text>
        <Text style={achievementStyles.sub}>{sub}</Text>
      </View>
    </View>
  );
}

export function ProfileScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 140 }}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarInit}>YN</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>You Nguyen</Text>
          <Text style={styles.sub}>Product · Joined Mar 2026</Text>
          <View style={styles.leagueBadge}>
            <Text style={styles.leagueText}>DIAMOND · RANK 5</Text>
          </View>
        </View>
      </View>

      <View style={styles.grid}>
        <View style={styles.row}>
          <StatTile label="DAY STREAK" value="147" icon={<Image source={require('../../assets/icon-flame.svg')} style={{ width: 20, height: 20 }} />} />
          <StatTile label="TOTAL XP"   value="12,840" icon={<Image source={require('../../assets/icon-xp.svg')} style={{ width: 18, height: 18 }} />} />
        </View>
        <View style={styles.row}>
          <StatTile label="TOP FINISH" value="2nd" icon={<Trophy size={18} color={Color.sun[500]} />} />
          <StatTile label="LESSONS"    value="38" icon={<Brain size={18} color={Color.blue[500]} />} />
        </View>
      </View>

      <Text style={styles.sectionLabel}>ACHIEVEMENTS</Text>
      <View style={{ paddingHorizontal: Space.s4, gap: 8 }}>
        <Achievement title="Hot streak" sub="100 day streak"
          icon={<Image source={require('../../assets/icon-flame.svg')} style={{ width: 26, height: 26 }} />} />
        <Achievement title="Cohort whisperer" sub="Aced retention unit"
          icon={<Brain size={24} color={Color.violet[500]} />} />
        <Achievement title="ARPDAU enjoyer" sub="Finish monetization unit" locked
          icon={<ChartLine size={24} color={Color.ink[400]} />} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: Color.paper },
  header: {
    flexDirection: 'row', gap: Space.s4, alignItems: 'center',
    marginHorizontal: Space.s4, marginVertical: Space.s4,
    padding: Space.s5, borderRadius: Radius.xl,
    backgroundColor: Color.paperWarm, borderWidth: 2, borderColor: Color.ink[100],
  },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: Color.violet[500], alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#fff' },
  avatarInit: { fontFamily: Font.display, fontSize: 26, color: '#fff' },
  name: { fontFamily: Font.display, fontSize: 22, color: Color.ink[900], letterSpacing: -0.3 },
  sub:  { fontFamily: Font.body, fontSize: 13, color: Color.ink[500], marginTop: 2 },
  leagueBadge: { alignSelf: 'flex-start', backgroundColor: Color.violet[500], paddingHorizontal: 10, paddingVertical: 3, borderRadius: Radius.pill, marginTop: 6 },
  leagueText: { fontFamily: Font.displayBold, fontSize: 11, color: '#fff', letterSpacing: 0.6 },

  grid: { paddingHorizontal: Space.s4, gap: 10 },
  row: { flexDirection: 'row', gap: 10 },

  sectionLabel: { fontFamily: Font.monoBold, fontSize: 12, color: Color.ink[500], letterSpacing: 1.2, paddingHorizontal: Space.s4, marginTop: Space.s5, marginBottom: Space.s2 },
});

const statStyles = StyleSheet.create({
  box: { flex: 1, backgroundColor: '#fff', borderWidth: 2, borderColor: Color.ink[100], borderRadius: Radius.md, padding: 14, gap: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  value: { fontFamily: Font.display, fontSize: 22, color: Color.ink[900] },
  label: { fontFamily: Font.monoBold, fontSize: 11, color: Color.ink[500], letterSpacing: 0.8 },
});

const achievementStyles = StyleSheet.create({
  box: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#fff', borderWidth: 1, borderColor: Color.border, borderRadius: Radius.md, padding: 12,
  },
  icon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  title: { fontFamily: Font.displayBold, fontSize: 14, color: Color.ink[900] },
  sub:   { fontFamily: Font.body, fontSize: 12, color: Color.ink[500], marginTop: 1 },
});
