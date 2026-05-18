// ProfileScreen — stats + achievements + recent activity.

function StatBox({ label, value, color = 'var(--violet-500)', icon }) {
  return (
    <div style={{
      flex: 1, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 16,
      padding: 14, display: 'flex', flexDirection: 'column', gap: 4,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {icon && <span style={{ color }}>{icon}</span>}
        <span style={{ font: '900 22px var(--font-display)', color: 'var(--fg)', fontVariantNumeric: 'tabular-nums' }}>{value}</span>
      </div>
      <span style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>{label}</span>
    </div>
  );
}

function AchievementBadge({ icon, title, sub, locked }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: 12, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 14,
      opacity: locked ? 0.55 : 1,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: locked ? 'rgba(255,255,255,0.08)' : 'rgba(105,56,239,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: locked ? 'var(--fg-subtle)' : 'var(--violet-500)',
        flexShrink: 0,
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ font: '700 14px var(--font-display)', color: 'var(--fg)' }}>{title}</div>
        <div style={{ font: '12px var(--font-body)', color: 'var(--fg-muted)', marginTop: 1 }}>{sub}</div>
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div style={{ padding: '8px 0 140px', minHeight: '100%' }}>
      {/* header card */}
      <div style={{
        margin: '0 16px 16px', borderRadius: 24, padding: '20px 22px',
        background: 'var(--paper-warm)', border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--violet-400), var(--pink-400))',
          color: 'var(--surface-2)', font: '900 26px var(--font-display)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, border: '3px solid #fff', boxShadow: 'var(--shadow-sm)',
        }}>YN</div>
        <div style={{ flex: 1 }}>
          <div style={{ font: '900 22px var(--font-display)', color: 'var(--fg)', letterSpacing: '-0.01em' }}>You Nguyen</div>
          <div style={{ font: '13px var(--font-body)', color: 'var(--fg-muted)', marginTop: 2 }}>Product · Joined Mar 2026</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 6,
            background: 'var(--violet-500)', color: 'var(--surface-2)', padding: '3px 10px', borderRadius: 999,
            font: '700 11px var(--font-display)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            <span>Diamond</span><span style={{ opacity: 0.7 }}>· Rank 5</span>
          </div>
        </div>
      </div>

      {/* stats grid */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <StatBox label="Day streak" value="147" icon={<img src="../../assets/icon-flame.svg" width="20" height="20" />} />
          <StatBox label="Total XP"   value="12,840" icon={<img src="../../assets/icon-xp.svg" width="18" height="18" />} />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <StatBox label="Top finish" value="2nd" color="var(--sun-500)" icon={window.Ic.trophy(18)} />
          <StatBox label="Lessons" value="38" color="var(--green-500)" icon={window.Ic.brain(18)} />
        </div>
      </div>

      {/* achievements */}
      <div style={{ padding: '20px 16px 8px', font: '700 12px var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>Achievements</div>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <AchievementBadge title="Hot streak"        sub="100 day streak"           icon={<img src="../../assets/icon-flame.svg" width="26" height="26" />} />
        <AchievementBadge title="Cohort whisperer"  sub="Aced retention unit"      icon={window.Ic.brain(24)} />
        <AchievementBadge title="ARPDAU enjoyer"    sub="Finish monetization unit" icon={window.Ic.chart(24)} locked />
      </div>
    </div>
  );
}

window.ProfileScreen = ProfileScreen;
