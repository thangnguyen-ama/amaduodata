// PracticeScreen — quick-practice hub with topic tiles.

function PracticeCard({ title, sub, color, baseColor, mins, onStart }) {
  const [pressed, setPressed] = React.useState(false);
  return (
    <button
      onClick={onStart}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 6,
        padding: '16px 18px', borderRadius: 18, border: 'none',
        background: color, color: 'var(--surface-2)',
        boxShadow: pressed ? '0 0 0 0 transparent' : `0 4px 0 0 ${baseColor}`,
        transform: pressed ? 'translateY(4px)' : 'translateY(0)',
        transition: 'transform .09s ease, box-shadow .09s ease',
        cursor: 'pointer', position: 'relative', overflow: 'hidden',
      }}>
      <div style={{ font: '700 11px var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.75 }}>{mins} min</div>
      <div style={{ font: '800 19px var(--font-display)', letterSpacing: '-0.01em' }}>{title}</div>
      <div style={{ font: '13px var(--font-body)', opacity: 0.85 }}>{sub}</div>
    </button>
  );
}

function PracticeScreen({ onStart }) {
  const items = [
    { title: 'Mistakes',      sub: 'Redo the 6 you got wrong',           color: 'var(--pink-400)',   baseColor: 'var(--pink-700)',   mins: 3 },
    { title: 'Retention',     sub: 'D1, D7, D30 quick-fire',             color: 'var(--violet-500)', baseColor: 'var(--violet-700)', mins: 5 },
    { title: 'Monetization',  sub: 'ARPDAU, LTV, payer mix',             color: 'var(--blue-500)',  baseColor: 'var(--blue-700)',  mins: 5 },
    { title: 'Read a chart',  sub: 'Spot the lift in a cohort triangle', color: 'var(--fg)',    baseColor: 'var(--fg-muted)',    mins: 4 },
  ];
  return (
    <div style={{ padding: '4px 0 140px', minHeight: '100%' }}>
      <div style={{ padding: '4px 22px 16px' }}>
        <div style={{ font: '900 30px var(--font-display)', color: 'var(--fg)', letterSpacing: '-0.025em' }}>Practice</div>
        <div style={{ font: '15px var(--font-body)', color: 'var(--fg-muted)', marginTop: 4 }}>Short drills · no streak risk.</div>
      </div>
      <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {items.map(it => <PracticeCard key={it.title} {...it} onStart={onStart} />)}
      </div>

      {/* daily quest */}
      <div style={{ margin: '18px 16px', padding: '16px 18px', borderRadius: 20,
        background: 'var(--paper-warm)', border: '1px solid var(--border)' }}>
        <div style={{ font: '700 11px var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sun-300)' }}>Daily quest</div>
        <div style={{ font: '800 18px var(--font-display)', color: 'var(--fg)', marginTop: 4, letterSpacing: '-0.01em' }}>Earn 40 XP today</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
          <div style={{ flex: 1, height: 12, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ width: '62%', height: '100%', background: 'var(--sun-400)', borderRadius: 999 }} />
          </div>
          <div style={{ font: '800 14px var(--font-display)', color: 'var(--sun-300)' }}>25 / 40</div>
        </div>
      </div>
    </div>
  );
}

window.PracticeScreen = PracticeScreen;
