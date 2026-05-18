// TeamScreen — per-team progress, sortable.

function TeamScreen() {
  const teams = [
    { team: 'Product',   members: 24, dailyActive: 22, streak: 24, xpWeek: 8420, completion: 0.78, leader: 'Linh Bui' },
    { team: 'Marketing', members: 18, dailyActive: 14, streak: 12, xpWeek: 5240, completion: 0.61, leader: 'Hanh Tran' },
    { team: 'BD',        members: 12, dailyActive: 11, streak: 19, xpWeek: 4310, completion: 0.72, leader: 'Khoa Vu' },
    { team: 'Design',    members: 16, dailyActive: 10, streak:  8, xpWeek: 3680, completion: 0.54, leader: 'Bao Tran' },
    { team: 'Engineering',members: 42, dailyActive: 28, streak: 14, xpWeek: 9620, completion: 0.41, leader: 'Phuc Pham' },
    { team: 'Studio',    members: 35, dailyActive: 18, streak:  6, xpWeek: 4120, completion: 0.33, leader: 'Tien Le' },
  ];

  function progressBar(pct, color) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: `${pct * 100}%`, height: '100%', background: color, borderRadius: 999 }} />
        </div>
        <span style={{ font: '700 12px var(--font-mono)', color: 'var(--fg-muted)', minWidth: 32, textAlign: 'right' }}>{Math.round(pct * 100)}%</span>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <window.WebCard padding={18}>
          <window.Eyebrow>Total learners</window.Eyebrow>
          <div style={{ font: '900 32px var(--font-display)', color: 'var(--fg)', marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>147</div>
          <div style={{ font: '12px var(--font-body)', color: 'var(--fg-muted)', marginTop: 2 }}>across 6 teams</div>
        </window.WebCard>
        <window.WebCard padding={18}>
          <window.Eyebrow>Daily active</window.Eyebrow>
          <div style={{ font: '900 32px var(--font-display)', color: 'var(--fg)', marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>103</div>
          <div style={{ font: '12px var(--font-body)', color: 'var(--blue-600)', marginTop: 2 }}>+12 vs last week</div>
        </window.WebCard>
        <window.WebCard padding={18}>
          <window.Eyebrow>Avg streak</window.Eyebrow>
          <div style={{ font: '900 32px var(--font-display)', color: 'var(--fg)', marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>14<span style={{ font: '500 14px var(--font-body)', color: 'var(--fg-muted)' }}> days</span></div>
          <div style={{ font: '12px var(--font-body)', color: 'var(--fg-muted)', marginTop: 2 }}>company-wide</div>
        </window.WebCard>
        <window.WebCard padding={18}>
          <window.Eyebrow>Avg completion</window.Eyebrow>
          <div style={{ font: '900 32px var(--font-display)', color: 'var(--fg)', marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>56%</div>
          <div style={{ font: '12px var(--font-body)', color: 'var(--fg-muted)', marginTop: 2 }}>of curriculum</div>
        </window.WebCard>
      </div>

      <window.WebCard padding={0} style={{ overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1.6fr 1.4fr', gap: 16, alignItems: 'center',
          padding: '14px 20px', borderBottom: '1px solid var(--border)',
          font: '700 11px var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>
          <span>Team</span>
          <span style={{ textAlign: 'right' }}>Members</span>
          <span style={{ textAlign: 'right' }}>Daily active</span>
          <span style={{ textAlign: 'right' }}>XP / wk</span>
          <span>Completion</span>
          <span>Top learner</span>
        </div>
        {teams.map((t, i) => (
          <div key={t.team} style={{
            display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1.6fr 1.4fr', gap: 16, alignItems: 'center',
            padding: '14px 20px',
            borderBottom: i < teams.length - 1 ? '1px solid var(--border)' : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                background: ['var(--violet-500)','var(--pink-400)','var(--blue-400)','var(--sun-400)','var(--fg-muted)','var(--violet-300)'][i],
                color: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                font: '800 11px var(--font-display)',
              }}>{t.team.slice(0, 2).toUpperCase()}</div>
              <span style={{ font: '700 14px var(--font-body)', color: 'var(--fg)' }}>{t.team}</span>
            </div>
            <span style={{ font: '600 14px var(--font-mono)', textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: 'var(--fg-muted)' }}>{t.members}</span>
            <span style={{ font: '700 14px var(--font-mono)', textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: 'var(--fg)' }}>{t.dailyActive} <span style={{ color: 'var(--fg-muted)', fontWeight: 400 }}>/ {t.members}</span></span>
            <span style={{ font: '700 14px var(--font-mono)', textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: 'var(--fg)' }}>{t.xpWeek.toLocaleString()}</span>
            {progressBar(t.completion, t.completion > 0.7 ? 'var(--blue-400)' : t.completion > 0.5 ? 'var(--violet-500)' : 'var(--sun-400)')}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--violet-400), var(--pink-400))',
                color: 'var(--surface-2)', font: '800 10px var(--font-display)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{t.leader.split(' ').map(s => s[0]).join('')}</div>
              <span style={{ font: '600 13px var(--font-body)', color: 'var(--fg)' }}>{t.leader}</span>
            </div>
          </div>
        ))}
      </window.WebCard>
    </div>
  );
}

window.TeamScreen = TeamScreen;
