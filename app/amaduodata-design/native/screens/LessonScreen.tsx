// LessonScreen — multiple-choice question with mascot speech bubble + feedback strip.

import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, Image } from 'react-native';
import { Color, Font, Radius, Space } from '../tokens';
import { DuoButton } from '../components/DuoButton';
import { Mascot } from '../components/Mascot';
import { Check, X } from '../svg/icons';

interface Props {
  onExit: () => void;
  onComplete: (right: boolean) => void;
}

const OPTIONS = [
  'Total revenue ÷ total installs',
  'Total revenue ÷ daily active users',
  'Total revenue ÷ monthly active users',
  'Paying users ÷ daily active users',
];
const CORRECT = 1;

export function LessonScreen({ onExit, onComplete }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase]       = useState<'asking' | 'feedback'>('asking');
  const isRight = selected === CORRECT;

  function check() {
    if (selected !== null) setPhase('feedback');
  }
  function next() {
    onComplete(isRight);
  }

  return (
    <View style={styles.root}>
      {/* top */}
      <View style={styles.top}>
        <Pressable onPress={onExit} style={styles.closeBtn}>
          <X size={26} color={Color.ink[400]} />
        </Pressable>
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
        <Image source={require('../../assets/icon-heart.svg')} style={styles.heart} />
        <Text style={styles.heartNum}>4</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.eyebrow}>MATCH THE DEFINITION</Text>
        <Text style={styles.question}>What's <Text style={styles.violetText}>ARPDAU</Text>?</Text>

        {/* mascot speech */}
        <View style={styles.mascotRow}>
          <Mascot size={80} />
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>Read carefully — the denominator is the trick.</Text>
          </View>
        </View>

        {/* options */}
        <View style={styles.options}>
          {OPTIONS.map((opt, i) => {
            const isSel = selected === i;
            const showCorrect = phase === 'feedback' && i === CORRECT;
            const showWrong   = phase === 'feedback' && isSel && i !== CORRECT;
            const palette = showCorrect ? { border: Color.green[500], bg: Color.green[50],  fg: Color.green[700] }
                          : showWrong   ? { border: Color.danger,    bg: '#FCE9EC',         fg: '#7a1828'        }
                          : isSel       ? { border: Color.violet[500], bg: Color.violet[50],  fg: Color.violet[700] }
                          :               { border: Color.ink[100],   bg: '#fff',             fg: Color.ink[900]   };

            return (
              <Pressable
                key={i}
                onPress={() => phase === 'asking' && setSelected(i)}
                disabled={phase !== 'asking'}
                style={[styles.option, { borderColor: palette.border, backgroundColor: palette.bg }]}
              >
                <View style={[styles.optionNum, { backgroundColor: isSel || showCorrect ? palette.border : Color.ink[100] }]}>
                  <Text style={[styles.optionNumText, { color: isSel || showCorrect ? '#fff' : Color.ink[700] }]}>{i + 1}</Text>
                </View>
                <Text style={[styles.optionText, { color: palette.fg, fontFamily: isSel ? Font.bodyBold : Font.bodyMed }]}>{opt}</Text>
                {showCorrect && <Check size={20} color={Color.green[500]} />}
                {showWrong   && <X size={20} color={Color.danger} />}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* footer */}
      {phase === 'asking' && (
        <View style={styles.footer}>
          <DuoButton color={selected === null ? 'ghost' : 'blue'} disabled={selected === null} onPress={check} fullWidth>
            Check
          </DuoButton>
        </View>
      )}
      {phase === 'feedback' && (
        <View style={[styles.feedback, { backgroundColor: isRight ? Color.green[50] : '#FCE9EC', borderTopColor: isRight ? Color.green[500] : Color.danger }]}>
          <Text style={[styles.feedbackTitle, { color: isRight ? Color.green[500] : Color.danger }]}>{isRight ? 'Right.' : 'Not quite.'}</Text>
          <Text style={styles.feedbackBody}>
            ARPDAU = avg. revenue per daily active user. The denominator is DAU, not installs or MAU.
          </Text>
          <DuoButton color={isRight ? 'green' : 'pink'} onPress={next} fullWidth>Got it</DuoButton>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Color.paper },
  top: {
    flexDirection: 'row', alignItems: 'center', gap: Space.s3,
    paddingHorizontal: Space.s5, paddingTop: Space.s3, paddingBottom: Space.s2,
  },
  closeBtn: { padding: Space.s1 },
  progressTrack: { flex: 1, height: 14, backgroundColor: Color.ink[100], borderRadius: Radius.pill, overflow: 'hidden' },
  progressFill: { width: '60%', height: '100%', backgroundColor: Color.blue[400] },
  heart: { width: 22, height: 22 },
  heartNum: { fontFamily: Font.display, fontSize: 16, color: Color.ink[900] },

  body: { padding: Space.s5, gap: Space.s4 },
  eyebrow: { fontFamily: Font.monoBold, fontSize: 12, color: Color.violet[500], letterSpacing: 1.2 },
  question: { fontFamily: Font.display, fontSize: 28, color: Color.ink[900], letterSpacing: -0.5 },
  violetText: { color: Color.violet[500] },

  mascotRow: { flexDirection: 'row', alignItems: 'flex-end', gap: Space.s3 },
  bubble: {
    backgroundColor: '#fff', borderWidth: 2, borderColor: Color.ink[100],
    borderRadius: 20, borderBottomLeftRadius: 4,
    paddingHorizontal: 14, paddingVertical: 10,
    maxWidth: 240,
  },
  bubbleText: { fontFamily: Font.bodyMed, fontSize: 14, color: Color.ink[900] },

  options: { gap: Space.s2 },
  option: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: Space.s4, paddingVertical: Space.s3,
    borderWidth: 2, borderRadius: Radius.md,
  },
  optionNum: { width: 26, height: 26, borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
  optionNumText: { fontFamily: Font.monoBold, fontSize: 13 },
  optionText: { flex: 1, fontSize: 15 },

  footer: { padding: Space.s5, borderTopWidth: 2, borderTopColor: Color.ink[100], backgroundColor: '#fff' },

  feedback: { padding: Space.s5, borderTopWidth: 2, gap: 10 },
  feedbackTitle: { fontFamily: Font.display, fontSize: 18 },
  feedbackBody: { fontFamily: Font.body, fontSize: 14, color: Color.ink[700], marginBottom: 6 },
});
