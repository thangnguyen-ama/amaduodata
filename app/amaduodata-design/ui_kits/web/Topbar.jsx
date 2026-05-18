// Topbar — header with search + actions.
function Topbar({ title, breadcrumb }) {
  return (
    <header style={{
      height: 64, display: 'flex', alignItems: 'center', gap: 16,
      padding: '0 28px', borderBottom: '1px solid var(--border)',
      background: 'var(--paper)', flexShrink: 0,
    }}>
      <div style={{ flex: 1 }}>
        {breadcrumb && <div style={{ font: '600 12px var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>{breadcrumb}</div>}
        <div style={{ font: '800 20px var(--font-display)', color: 'var(--fg)', letterSpacing: '-0.01em' }}>{title}</div>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 14px', borderRadius: 12,
        background: 'var(--surface-2)', border: '1px solid var(--border)', width: 260,
        color: 'var(--fg-muted)', font: '14px var(--font-body)',
      }}>
        {window.WebIc.search(16)}
        <span>Search lessons, topics, learners…</span>
        <span style={{ marginLeft: 'auto', font: '600 11px var(--font-mono)', padding: '2px 6px', border: '1px solid var(--border)', borderRadius: 5 }}>⌘K</span>
      </div>
      <button style={{ position: 'relative', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--fg-muted)' }}>
        {window.WebIc.bell(20)}
        <span style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: '50%', background: 'var(--pink-400)' }} />
      </button>
      <window.WebButton color="violet" size="sm" icon={window.WebIc.plus(16)}>New lesson</window.WebButton>
    </header>
  );
}

window.Topbar = Topbar;
