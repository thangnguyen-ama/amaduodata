// Sidebar — fixed left nav with logo + sections.

function Sidebar({ active, onChange }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard',   icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg> },
    { id: 'lessons',   label: 'Lessons',     icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z"/><path d="M4 9h16M9 4v16"/></svg> },
    { id: 'units',     label: 'Units',       icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2c2.5 3 4 6 4 10s-1.5 7-4 10c-2.5-3-4-6-4-10s1.5-7 4-10z"/></svg> },
    { id: 'team',      label: 'Team',        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { id: 'insights',  label: 'Insights',    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 6-6"/></svg> },
  ];
  const settings = [
    { id: 'settings',  label: 'Settings',    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 10v6m11-11h-6M7 12H1m18.5-6.5l-4.2 4.2m-6.6 6.6l-4.2 4.2m12.7 0l-4.2-4.2M9.7 9.7L5.5 5.5"/></svg> },
  ];

  return (
    <aside style={{
      width: 232, background: 'var(--paper-warm)', borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', flexShrink: 0,
      padding: '20px 14px',
    }}>
      <img src="../../assets/logo-dark.svg" style={{ height: 32, marginBottom: 24, marginLeft: 6 }} />

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        {items.map(it => {
          const a = active === it.id;
          return (
            <button key={it.id} onClick={() => onChange(it.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10,
              border: 'none', background: a ? 'var(--violet-500)' : 'transparent',
              color: a ? '#fff' : 'var(--fg-muted)',
              font: `${a ? 700 : 600} 14px var(--font-body)`, cursor: 'pointer', textAlign: 'left',
            }}>
              {it.icon}<span>{it.label}</span>
            </button>
          );
        })}
      </nav>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
        {settings.map(it => (
          <button key={it.id} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10,
            border: 'none', background: 'transparent', color: 'var(--fg-muted)',
            font: '600 14px var(--font-body)', cursor: 'pointer', textAlign: 'left',
          }}>
            {it.icon}<span>{it.label}</span>
          </button>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 8px', marginTop: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--violet-400), var(--pink-400))',
            color: 'var(--surface-2)', font: '800 12px var(--font-display)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>YN</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: '700 13px var(--font-body)', color: 'var(--fg)' }}>You Nguyen</div>
            <div style={{ font: '11px var(--font-mono)', color: 'var(--fg-muted)' }}>Data team</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;
