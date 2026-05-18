// StatsScreen — personal data dashboard. Reflects the brand vibe (data!).

function MiniChart() {
  // bar chart of last 7 days XP
  const data = [12, 28, 0, 35, 41, 18, 25];
  const max = Math.max(...data);
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 110 }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: '100%', height: v === 0 ? 4 : `${(v / max) * 90}px`,
            background: v === 0 ? 'rgba(255,255,255,0.08)' : i === 4 ? 'var(--violet-500)' : 'var(--violet-300)',
            borderRadius: 6, transition: 'height .4s ease',
          }} />
          <span style={{ font: '700 11px var(--font-mono)', color: i === 4 ? 'var(--violet-700)' : 'var(--fg-muted)' }}>{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

function StatsScreen() {
  return (
    <div style={{ padding: '4px 0 140px', minHeight: '100%' }}>
      <div style={{ padding: '4px 22px 16px' }}>
        <div style={{ font: '900 30px var(--font-display)', color: 'var(--fg)', letterSpacing: '-0.025em' }}>Stats</div>
        <div style={{ font: '15px var(--font-body)', color: 'var(--fg-muted)', marginTop: 4 }}>How you're learning.</div>
      </div>

      {/* this week */}
      <div style={{ margin: '0 16px 12px', padding: 18, background: 'var(--surface-2)', borderRadius: 20, border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div style={{ font: '700 11px var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>THIS WEEK · XP</div>
            <div style={{ font: '900 36px var(--font-display)', color: 'var(--fg)', fontVariantNumeric: 'tabular-nums', marginTop: 4 }}>159</div>
          </div>
          <div style={{ font: '700 13px var(--font-mono)', color: 'var(--blue-500)', display: 'flex', alignItems: 'center', gap: 2 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l8 8h-5v8h-6v-8H4z"/></svg> 22%
          </div>
        </div>
        <div style={{ marginTop: 14 }}><MiniChart /></div>
      </div>

      {/* skill mastery */}
      <div style={{ padding: '4px 16px 6px', font: '700 12px var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>Skills</div>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { label: 'Retention basics', pct: 0.95, color: 'var(--blue-400)' },
          { label: 'Monetization',     pct: 0.40, color: 'var(--violet-500)' },
          { label: 'Funnels & cohorts',pct: 0.25, color: 'var(--pink-400)' },
          { label: 'A/B testing',      pct: 0.00, color: 'var(--fg-subtle)' },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 14, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ font: '600 14px var(--font-body)', color: 'var(--fg)' }}>{s.label}</span>
              <span style={{ font: '700 12px var(--font-mono)', color: 'var(--fg-muted)' }}>{Math.round(s.pct * 100)}%</span>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: `${s.pct * 100}%`, height: '100%', background: s.color, borderRadius: 999 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.StatsScreen = StatsScreen;
