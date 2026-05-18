// LessonsScreen — lesson library (table view with status badges + actions).

function StatusPill({ status }) {
  const config = {
    live:   { bg: 'rgba(20,184,86,0.24)',  fg: 'var(--green-700)',  dot: 'var(--green-500)' },
    draft:  { bg: 'rgba(255,255,255,0.08)',    fg: 'var(--fg-muted)',    dot: 'var(--fg-subtle)' },
    review: { bg: 'rgba(255,205,60,0.24)',    fg: 'var(--sun-700)',    dot: 'var(--sun-500)' },
    paused: { bg: 'rgba(105,56,239,0.18)',  fg: 'var(--violet-700)', dot: 'var(--violet-500)' },
  };
  const c = config[status];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 999, background: c.bg, color: c.fg,
      font: '700 11px var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.dot }} />
      {status}
    </span>
  );
}

function LessonsScreen() {
  const lessons = [
    { id: 1, title: 'DAU vs MAU',           unit: 'Retention basics', status: 'live',   author: 'Linh Bui',  attempts: 184, acc: 0.92, updated: '2d' },
    { id: 2, title: 'Stickiness ratio',     unit: 'Retention basics', status: 'live',   author: 'Linh Bui',  attempts: 162, acc: 0.86, updated: '4d' },
    { id: 3, title: 'D1 retention curves',  unit: 'Retention basics', status: 'live',   author: 'Khoa Vu',   attempts: 148, acc: 0.78, updated: '1w' },
    { id: 4, title: 'Cohort triangle',      unit: 'Retention basics', status: 'review', author: 'Khoa Vu',   attempts:  21, acc: 0.61, updated: '3h' },
    { id: 5, title: 'ARPDAU',               unit: 'Monetization',     status: 'live',   author: 'Hanh Tran', attempts: 132, acc: 0.74, updated: '5d' },
    { id: 6, title: 'LTV by source',        unit: 'Monetization',     status: 'draft',  author: 'Hanh Tran', attempts:   0, acc: null, updated: '1h' },
    { id: 7, title: 'Funnel drop-off',      unit: 'Funnels',          status: 'paused', author: 'Minh Le',   attempts:  44, acc: 0.42, updated: '2w' },
  ];

  return (
    <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}>
      <div style={{ display: 'flex', gap: 10 }}>
        {['All', 'Live', 'Drafts', 'In review', 'Paused'].map((t, i) => (
          <button key={t} style={{
            padding: '8px 14px', borderRadius: 10,
            border: i === 0 ? '1px solid var(--violet-400)' : '1px solid var(--border-strong)',
            background: i === 0 ? 'var(--violet-500)' : 'transparent',
            color: i === 0 ? '#fff' : 'var(--fg-muted)',
            font: `${i === 0 ? 700 : 600} 13px var(--font-body)`, cursor: 'pointer',
          }}>{t}</button>
        ))}
        <div style={{ flex: 1 }} />
        <button style={{
          padding: '8px 14px', borderRadius: 10, border: '1px solid var(--border-strong)',
          background: 'var(--surface-2)', color: 'var(--fg-muted)', font: '600 13px var(--font-body)',
          display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
        }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg> Filter</button>
      </div>

      <window.WebCard padding={0} style={{ overflow: 'hidden' }}>
        {/* head */}
        <div style={{
          display: 'grid', gridTemplateColumns: '34px 2.6fr 1.6fr 1fr 0.8fr 1fr 0.8fr 40px',
          padding: '12px 20px', borderBottom: '1px solid var(--border)',
          font: '700 11px var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-muted)',
          gap: 12, alignItems: 'center',
        }}>
          <span></span>
          <span>Title</span>
          <span>Unit</span>
          <span>Status</span>
          <span style={{ textAlign: 'right' }}>Attempts</span>
          <span style={{ textAlign: 'right' }}>Accuracy</span>
          <span style={{ textAlign: 'right' }}>Updated</span>
          <span></span>
        </div>
        {lessons.map((l, i) => (
          <div key={l.id} style={{
            display: 'grid', gridTemplateColumns: '34px 2.6fr 1.6fr 1fr 0.8fr 1fr 0.8fr 40px',
            padding: '14px 20px',
            borderBottom: i < lessons.length - 1 ? '1px solid var(--border)' : 'none',
            gap: 12, alignItems: 'center',
            background: i === 3 ? 'rgba(255,205,60,0.18)' : 'transparent',
          }}>
            <span style={{ color: 'var(--fg-subtle)', cursor: 'grab' }}>{window.WebIc.drag(16)}</span>
            <div>
              <div style={{ font: '700 15px var(--font-body)', color: 'var(--fg)' }}>{l.title}</div>
              <div style={{ font: '12px var(--font-body)', color: 'var(--fg-muted)', marginTop: 1 }}>by {l.author}</div>
            </div>
            <span style={{ font: '600 13px var(--font-body)', color: 'var(--fg-muted)' }}>{l.unit}</span>
            <span><StatusPill status={l.status} /></span>
            <span style={{ font: '700 13px var(--font-mono)', color: 'var(--fg)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{l.attempts}</span>
            <span style={{ font: '700 13px var(--font-mono)', textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: l.acc === null ? 'var(--fg-subtle)' : l.acc > 0.7 ? 'var(--green-600)' : l.acc > 0.5 ? 'var(--sun-700)' : 'var(--danger)' }}>{l.acc === null ? '—' : `${Math.round(l.acc * 100)}%`}</span>
            <span style={{ font: '13px var(--font-body)', color: 'var(--fg-muted)', textAlign: 'right' }}>{l.updated}</span>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--fg-subtle)' }}>{window.WebIc.more(18)}</button>
          </div>
        ))}
      </window.WebCard>
    </div>
  );
}

window.LessonsScreen = LessonsScreen;
