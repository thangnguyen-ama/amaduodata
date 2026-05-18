// LessonScreen — the actual question interaction.
// Multiple-choice card with checked/correct/wrong states.

function LessonScreen({ onExit, onComplete }) {
  const [phase, setPhase]       = React.useState('asking'); // asking | feedback | done
  const [selected, setSelected] = React.useState(null);
  const [isRight, setIsRight]   = React.useState(false);

  const correctIdx = 1;
  const options = [
    'Total revenue ÷ total installs',
    'Total revenue ÷ daily active users',
    'Total revenue ÷ monthly active users',
    'Paying users ÷ daily active users',
  ];

  function check() {
    if (selected === null) return;
    const right = selected === correctIdx;
    setIsRight(right);
    setPhase('feedback');
  }

  function next() {
    setPhase('done');
    onComplete(isRight);
  }

  // Feedback strip color
  const feedbackBg     = isRight ? 'rgba(20,184,86,0.18)' : 'rgba(229,54,75,0.18)';
  const feedbackAccent = isRight ? 'var(--green-400)'    : '#FF6B7A';
  const feedbackTitle  = isRight ? 'Right.'           : 'Not quite.';
  const feedbackBody   = isRight
    ? 'ARPDAU = avg. revenue per daily active user. The denominator is DAU, not installs or MAU.'
    : 'ARPDAU stands for avg. revenue per daily active user. Denominator is DAU — not installs, not MAU.';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--paper)' }}>
      {/* top: close + progress + hearts */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px 8px' }}>
        <button onClick={onExit} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg-subtle)', padding: 4 }}>
          {window.Ic.x(26)}
        </button>
        <div style={{ flex: 1, height: 14, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden', position: 'relative' }}>
          <div style={{ width: '60%', height: '100%', background: 'var(--blue-400)', borderRadius: 999, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 3, left: 6, right: 6, height: 3, background: 'rgba(255,255,255,0.6)', borderRadius: 999 }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <img src="../../assets/icon-heart.svg" width="22" height="22" />
          <span style={{ font: '800 16px var(--font-display)', color: 'var(--fg)' }}>4</span>
        </div>
      </div>

      {/* body */}
      <div style={{ flex: 1, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 18, overflow: 'auto' }}>
        <div style={{ font: '700 12px var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--violet-500)' }}>
          Match the definition
        </div>
        <div style={{ font: '900 28px var(--font-display)', color: 'var(--fg)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          What's <span style={{ color: 'var(--violet-500)' }}>ARPDAU</span>?
        </div>

        {/* Beat speech bubble */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
          <img src="../../assets/mascot-beat.svg" style={{ width: 80, flexShrink: 0 }} />
          <div style={{
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: '20px 20px 20px 4px',
            padding: '10px 14px', maxWidth: 240,
            font: '600 14px var(--font-body)', color: 'var(--fg)',
            position: 'relative', boxShadow: '0 2px 0 0 var(--ink-100)',
          }}>
            Read carefully — the denominator is the trick.
          </div>
        </div>

        {/* options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
          {options.map((opt, i) => {
            const isSel = selected === i;
            const isCorrect = phase === 'feedback' && i === correctIdx;
            const isWrong   = phase === 'feedback' && isSel && i !== correctIdx;
            const border = isCorrect ? 'var(--green-400)' : isWrong ? 'var(--danger)' : isSel ? 'var(--violet-400)' : 'rgba(255,255,255,0.10)';
            const bg     = isCorrect ? 'rgba(20,184,86,0.18)' : isWrong ? 'rgba(229,54,75,0.18)' : isSel ? 'rgba(105,56,239,0.22)' : 'var(--surface-1)';
            const fg     = isCorrect ? 'var(--green-300)' : isWrong ? '#FFB3BC' : isSel ? 'var(--violet-200)' : 'var(--fg)';
            const baseSh = isCorrect ? 'var(--green-500)' : isWrong ? 'var(--danger)' : isSel ? 'var(--violet-500)' : 'rgba(255,255,255,0.06)';
            return (
              <button key={i}
                disabled={phase !== 'asking'}
                onClick={() => setSelected(i)}
                style={{
                  textAlign: 'left', padding: '14px 16px', borderRadius: 14,
                  border: `2px solid ${border}`, background: bg, color: fg,
                  boxShadow: `0 3px 0 0 ${baseSh}`,
                  font: `${isSel ? 700 : 600} 15px var(--font-body)`,
                  cursor: phase === 'asking' ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 26, height: 26, borderRadius: 7,
                  background: isSel || isCorrect ? (isCorrect ? 'var(--green-500)' : isWrong ? 'var(--danger)' : 'var(--violet-500)') : 'rgba(255,255,255,0.08)',
                  color: (isSel || isCorrect) ? '#fff' : 'var(--fg-muted)',
                  font: '700 13px var(--font-mono)',
                }}>{i + 1}</span>
                <span style={{ flex: 1 }}>{opt}</span>
                {isCorrect && <span style={{ color: 'var(--green-500)' }}>{window.Ic.check(20)}</span>}
                {isWrong   && <span style={{ color: 'var(--danger)' }}>{window.Ic.x(20)}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* footer: check / next */}
      {phase === 'asking' && (
        <div style={{ padding: '14px 22px 24px', borderTop: '1px solid var(--border)', background: 'var(--surface-2)' }}>
          <window.DuoButton color={selected === null ? 'ghost' : 'blue'} disabled={selected === null} onClick={check} style={{ width: '100%' }}>
            Check
          </window.DuoButton>
        </div>
      )}
      {phase === 'feedback' && (
        <div style={{ padding: '16px 22px 24px', background: feedbackBg, borderTop: `2px solid ${feedbackAccent}` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: feedbackAccent, color: 'var(--surface-0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{isRight ? window.Ic.check(20) : window.Ic.x(18)}</div>
            <div>
              <div style={{ font: '900 18px var(--font-display)', color: feedbackAccent, letterSpacing: '-0.01em' }}>{feedbackTitle}</div>
              <div style={{ font: '14px var(--font-body)', color: 'var(--fg-muted)', marginTop: 2, lineHeight: 1.4 }}>{feedbackBody}</div>
            </div>
          </div>
          <window.DuoButton color={isRight ? 'green' : 'pink'} onClick={next} style={{ width: '100%' }}>
            {isRight ? 'Got it' : 'Got it'}
          </window.DuoButton>
        </div>
      )}
    </div>
  );
}

window.LessonScreen = LessonScreen;
