// App — root of the native build. Wires together the tab navigator
// and the lesson/celebration stack. Drop into Expo's src/ and run.

import React, { useState } from 'react';
import { View, StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import {
  Outfit_600SemiBold, Outfit_700Bold, Outfit_900Black,
} from '@expo-google-fonts/outfit';
import {
  DMSans_400Regular, DMSans_500Medium, DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import {
  JetBrainsMono_400Regular, JetBrainsMono_700Bold,
} from '@expo-google-fonts/jetbrains-mono';

import { Color } from './tokens';
import { TopBar } from './components/TopBar';
import { BottomNav, TabId } from './components/BottomNav';

import { LearnPathScreen }   from './screens/LearnPathScreen';
import { LessonScreen }      from './screens/LessonScreen';
import { CelebrationScreen } from './screens/CelebrationScreen';
import { LeagueScreen }      from './screens/LeagueScreen';
import { ProfileScreen }     from './screens/ProfileScreen';
import { PracticeScreen }    from './screens/PracticeScreen';
import { StatsScreen }       from './screens/StatsScreen';

type Mode = 'tab' | 'lesson' | 'celebrate';

export default function App() {
  const [fontsLoaded] = useFonts({
    Outfit_600SemiBold, Outfit_700Bold, Outfit_900Black,
    DMSans_400Regular, DMSans_500Medium, DMSans_700Bold,
    JetBrainsMono_400Regular, JetBrainsMono_700Bold,
  });

  const [tab,  setTab]  = useState<TabId>('learn');
  const [mode, setMode] = useState<Mode>('tab');

  if (!fontsLoaded) return <View style={styles.root} />;

  const showChrome = mode === 'tab';

  let screen: React.ReactNode = null;
  if (mode === 'lesson') {
    screen = <LessonScreen onExit={() => setMode('tab')} onComplete={() => setMode('celebrate')} />;
  } else if (mode === 'celebrate') {
    screen = <CelebrationScreen correct={9} total={10} xp={15} onContinue={() => setMode('tab')} />;
  } else if (tab === 'learn')    screen = <LearnPathScreen onStartLesson={() => setMode('lesson')} />;
  else if (tab === 'practice')   screen = <PracticeScreen onStart={() => setMode('lesson')} />;
  else if (tab === 'stats')      screen = <StatsScreen />;
  else if (tab === 'league')     screen = <LeagueScreen />;
  else if (tab === 'me')         screen = <ProfileScreen />;

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={Color.paper} />
      {showChrome && <TopBar streak={147} xp={2840} hearts={4} />}
      <View style={styles.body}>{screen}</View>
      {showChrome && <BottomNav active={tab} onChange={setTab} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Color.paper },
  body: { flex: 1 },
});
