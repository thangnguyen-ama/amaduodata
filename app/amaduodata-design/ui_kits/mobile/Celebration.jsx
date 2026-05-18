// Celebration — the post-lesson screen.

function Celebration({ correct, total, xp, onContinue }) {
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: 'var(--paper)', overflow: 'hidden', position: 'relative',
    }}>
      {/* confetti dots */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[...Array(28)].map((_, i) => {
          const colors = ['var(--violet-400)', 'var(--green-400)', 'var(--pink-400)', 'var(--sun-400)'];
          const c = colors[i % 4];
          const x = (i * 37) % 100;
          const y = (i * 53) % 70;
          const r = 4 + (i % 4) * 2;
          const rot = (i * 13) % 360;
          return (
            <div key={i} style={{
              position: 'absolute', left: `${x}%`, top: `${y}%`,
              width: r, height: r * 1.4, background: c, borderRadius: 2,
              transform: `rotate(${rot}deg)`, opacity: 0.85,
            }} />
          );
        })}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative' }}>
        <img src="../../assets/mascot-beat-celebrate.svg" style={{ width: 200, marginBottom: 12 }} />
        <div style={{ font: '700 11px var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--green-500)' }}>Lesson complete</div>
        <div style={{ font: '900 40px var(--font-display)', color: 'var(--fg)', letterSpacing: '-0.03em', textAlign: 'center', marginTop: 4 }}>Nice streak.</div>
        <div style={{ font: '15px var(--font-body)', color: 'var(--fg-muted)', textAlign: 'center', marginTop: 6, maxWidth: 280 }}>
          That's day {148}. ARPDAU clicked — and the denominator never tripped you up.
        </div>

        {/* score row */}
        <div style={{ display: 'flex', gap: 12, marginTop: 24, width: '100%', justifyContent: 'center' }}>
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 16, padding: '12px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 90 }}>
            <div style={{ font: '700 11px var(--font-mono)', letterSpacing: '0.06em', color: 'var(--sun-300)' }}>TOTAL XP</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
              <img src="../../assets/icon-xp.svg" width="22" height="22" />
              <span style={{ font: '900 24px var(--font-display)', color: 'var(--fg)' }}>+{xp}</span>
            </div>
          </div>
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 16, padding: '12px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 90 }}>
            <div style={{ font: '700 11px var(--font-mono)', letterSpacing: '0.06em', color: 'var(--green-600)' }}>ACCURACY</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
              <span style={{ color: 'var(--green-500)' }}>{window.Ic.check(20)}</span>
              <span style={{ font: '900 24px var(--font-display)', color: 'var(--fg)' }}>{Math.round(correct / total * 100)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '14px 22px 28px', background: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
        <window.DuoButton color="violet" onClick={onContinue} style={{ width: '100%' }}>Continue</window.DuoButton>
      </div>
    </div>
  );
}

window.Celebration = Celebration;
