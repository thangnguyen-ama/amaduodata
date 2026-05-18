// LeagueScreen — leaderboard / weekly league.
// Shows promotion zone, current league, demotion zone.

function LeagueRow({ rank, name, xp, you = false, status }) {
  const medal = rank <= 3;
  const medalBg = rank === 1 ? 'var(--sun-400)' : rank === 2 ? 'rgba(255,255,255,0.12)' : rank === 3 ? '#CB8842' : null;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 14px', borderRadius: 14,
      background: you ? 'rgba(105,56,239,0.18)' : 'transparent',
      border: you ? '2px solid var(--violet-500)' : '2px solid transparent',
      position: 'relative',
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: medal ? medalBg : 'transparent',
        color: medal ? (rank === 1 ? 'var(--sun-900)' : 'var(--surface-2)') : 'var(--fg-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        font: '800 14px var(--font-display)', fontVariantNumeric: 'tabular-nums',
      }}>{rank}</div>
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: `linear-gradient(135deg, ${you ? 'var(--violet-400), var(--pink-400)' : 'var(--ink-300), var(--ink-500)'})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--surface-2)', font: '800 13px var(--font-display)',
        flexShrink: 0,
      }}>{name.split(' ').map(s => s[0]).slice(0, 2).join('')}</div>
      <div style={{ flex: 1, font: `${you ? 800 : 600} 15px var(--font-body)`, color: 'var(--fg)' }}>{name}{you && <span style={{ font: '700 11px var(--font-mono)', color: 'var(--violet-500)', marginLeft: 8, letterSpacing: '0.06em' }}>YOU</span>}</div>
      <div style={{ font: '800 15px var(--font-display)', color: 'var(--fg)', fontVariantNumeric: 'tabular-nums' }}>{xp.toLocaleString()}</div>
      <span style={{ font: '600 11px var(--font-mono)', color: 'var(--fg-muted)', letterSpacing: '0.04em' }}>XP</span>
    </div>
  );
}

function LeagueScreen() {
  const promote = [
    { rank: 1, name: 'Linh Bui',   xp: 1840 },
    { rank: 2, name: 'Khoa Vu',    xp: 1612 },
    { rank: 3, name: 'Hanh Tran',  xp: 1497 },
  ];
  const mid = [
    { rank: 4, name: 'Minh Le',     xp: 1280 },
    { rank: 5, name: 'You',         xp: 1240, you: true },
    { rank: 6, name: 'Phuc Pham',   xp:  990 },
    { rank: 7, name: 'Dao Nguyen',  xp:  860 },
    { rank: 8, name: 'Bao Tran',    xp:  812 },
  ];
  const demote = [
    { rank:  9, name: 'Quan Vo',    xp:  640 },
    { rank: 10, name: 'Tien Le',    xp:  580 },
  ];

  return (
    <div style={{ padding: '8px 0 140px', minHeight: '100%' }}>
      {/* hero */}
      <div style={{ margin: '0 16px 16px', borderRadius: 24, padding: 24, background: 'var(--fg)', color: 'var(--surface-2)', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.5,
          background: 'radial-gradient(circle at 80% 20%, var(--violet-500) 0%, transparent 50%)' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ font: '700 11px var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--violet-300)' }}>This week's league</div>
          <div style={{ font: '900 28px var(--font-display)', letterSpacing: '-0.02em', marginTop: 4 }}>Diamond</div>
          <div style={{ font: '14px var(--font-body)', color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>Top 3 promote · bottom 2 demote · 3 days left</div>
        </div>
      </div>

      {/* promotion zone */}
      <div style={{ padding: '4px 16px 6px', font: '700 11px var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--green-500)', display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l8 8h-5v8h-6v-8H4z"/></svg> Promote to Master
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '0 8px 8px' }}>
        {promote.map(p => <LeagueRow key={p.rank} {...p} />)}
      </div>
      <div style={{ height: 2, background: 'var(--green-200)', margin: '4px 16px' }} />
      {/* middle */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '8px' }}>
        {mid.map(p => <LeagueRow key={p.rank} {...p} />)}
      </div>
      <div style={{ height: 2, background: '#F0B6BE', margin: '4px 16px' }} />
      {/* demote */}
      <div style={{ padding: '8px 16px 6px', font: '700 11px var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20l-8-8h5V4h6v8h5z"/></svg> Demote to Gold
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '0 8px 8px' }}>
        {demote.map(p => <LeagueRow key={p.rank} {...p} />)}
      </div>
    </div>
  );
}

window.LeagueScreen = LeagueScreen;
