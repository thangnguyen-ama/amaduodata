// Dashboard — company-wide learning overview.

function MetricCard({ label, value, delta, color = 'var(--violet-500)', spark }) {
  const up = delta > 0;
  return (
    <window.WebCard padding={18}>
      <window.Eyebrow color="var(--fg-muted)">{label}</window.Eyebrow>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
        <span style={{ font: '900 32px var(--font-display)', color: 'var(--fg)', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>{value}</span>
        {delta !== undefined && (
          <span style={{ font: '700 12px var(--font-mono)', color: up ? 'var(--blue-500)' : 'var(--danger)', display: 'flex', alignItems: 'center', gap: 2 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              {up ? <path d="M12 4l8 8h-5v8h-6v-8H4z"/> : <path d="M12 20l-8-8h5V4h6v8h5z"/>}
            </svg>
            {Math.abs(delta)}%
          </span>
        )}
      </div>
      <div style={{ marginTop: 10, height: 32, display: 'flex', alignItems: 'flex-end', gap: 3 }}>
        {spark.map((v, i) => (
          <div key={i} style={{ flex: 1, height: `${v * 100}%`, background: color, borderRadius: 2, opacity: 0.3 + (v * 0.7) }} />
        ))}
      </div>
    </window.WebCard>
  );
}

function DashboardScreen() {
  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20, overflow: 'auto' }}>
      {/* hero strip */}
      <window.WebCard padding={0} style={{ overflow: 'hidden', background: 'var(--fg)', color: 'var(--surface-2)', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '22px 28px', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.18,
            background: 'radial-gradient(circle at 85% 30%, var(--violet-500) 0%, transparent 50%)' }} />
          <img src="../../assets/mascot-beat.svg" style={{ height: 110, position: 'relative', flexShrink: 0 }} />
          <div style={{ position: 'relative', flex: 1 }}>
            <window.Eyebrow color="var(--violet-300)">This week · Mar 17 – Mar 23</window.Eyebrow>
            <div style={{ font: '900 28px var(--font-display)', letterSpacing: '-0.02em', marginTop: 4 }}>187 Amanauts learning daily.</div>
            <div style={{ font: '15px var(--font-body)', color: 'rgba(255,255,255,0.7)', marginTop: 6, maxWidth: 520 }}>
              Up 22% week-over-week. Monetization is the most-attempted unit; A/B testing has the steepest drop-off.
            </div>
          </div>
          <window.WebButton color="violet">View report</window.WebButton>
        </div>
      </window.WebCard>

      {/* metric grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <MetricCard label="Daily active learners" value="187" delta={22} color="var(--violet-500)" spark={[0.4,0.5,0.3,0.6,0.7,0.5,0.9]} />
        <MetricCard label="Lessons completed"     value="1,240" delta={14} color="var(--blue-400)" spark={[0.3,0.4,0.5,0.4,0.6,0.7,0.85]} />
        <MetricCard label="Avg streak"            value="18"   delta={6}  color="var(--pink-400)"   spark={[0.5,0.6,0.55,0.7,0.65,0.72,0.78]} />
        <MetricCard label="Total XP minted"       value="48.2k" delta={-3} color="var(--sun-400)"   spark={[0.7,0.6,0.65,0.5,0.55,0.45,0.5]} />
      </div>

      {/* two-up */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16 }}>
        {/* unit performance */}
        <window.WebCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <div>
              <window.Eyebrow>Unit performance</window.Eyebrow>
              <div style={{ font: '800 18px var(--font-display)', color: 'var(--fg)', marginTop: 4 }}>Completion by unit</div>
            </div>
            <select style={{ font: '13px var(--font-body)', padding: '6px 10px', border: '1px solid var(--border)', borderRadius: 8, background: 'var(--surface-2)' }}>
              <option>All teams</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { unit: 'Unit 1 · Retention basics',  pct: 0.78, color: 'var(--blue-400)' },
              { unit: 'Unit 2 · Monetization',      pct: 0.52, color: 'var(--violet-500)' },
              { unit: 'Unit 3 · Funnels & cohorts', pct: 0.31, color: 'var(--pink-400)' },
              { unit: 'Unit 4 · A/B testing',       pct: 0.12, color: 'var(--sun-500)' },
            ].map(u => (
              <div key={u.unit} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ font: '600 14px var(--font-body)', color: 'var(--fg)' }}>{u.unit}</span>
                  <span style={{ font: '700 13px var(--font-mono)', color: 'var(--fg-muted)' }}>{Math.round(u.pct * 100)}%</span>
                </div>
                <div style={{ height: 10, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${u.pct * 100}%`, height: '100%', background: u.color, borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
        </window.WebCard>

        {/* leaderboard mini */}
        <window.WebCard>
          <window.Eyebrow>Top of the league</window.Eyebrow>
          <div style={{ font: '800 18px var(--font-display)', color: 'var(--fg)', marginTop: 4, marginBottom: 12 }}>Diamond, this week</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { rank: 1, name: 'Linh Bui',   xp: 1840, medal: 'var(--sun-400)' },
              { rank: 2, name: 'Khoa Vu',    xp: 1612, medal: 'rgba(255,255,255,0.12)' },
              { rank: 3, name: 'Hanh Tran',  xp: 1497, medal: '#CB8842' },
              { rank: 4, name: 'Minh Le',    xp: 1280 },
              { rank: 5, name: 'You',        xp: 1240, you: true },
            ].map(r => (
              <div key={r.rank} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 10px', borderRadius: 10,
                background: r.you ? 'rgba(105,56,239,0.18)' : 'transparent', border: r.you ? '1.5px solid var(--violet-500)' : '1.5px solid transparent' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%',
                  background: r.medal || 'transparent', color: r.rank === 1 ? 'var(--sun-900)' : 'var(--surface-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 12px var(--font-display)',
                  border: r.medal ? 'none' : '1px solid var(--border-strong)' }}>{r.medal ? r.rank : <span style={{ color: 'var(--fg-subtle)' }}>{r.rank}</span>}</div>
                <span style={{ flex: 1, font: `${r.you ? 700 : 600} 14px var(--font-body)`, color: 'var(--fg)' }}>{r.name}</span>
                <span style={{ font: '700 13px var(--font-display)', color: 'var(--fg)', fontVariantNumeric: 'tabular-nums' }}>{r.xp.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </window.WebCard>
      </div>
    </div>
  );
}

window.DashboardScreen = DashboardScreen;
