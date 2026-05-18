// Shared atoms for the Ama Duo Data mobile UI kit.
// All Tailwind-style inline styles for portability; tokens come from
// colors_and_type.css imported in index.html.

// ============================================================ Button
function DuoButton({ children, color = 'violet', size = 'lg', onClick, disabled, style = {} }) {
  const palette = {
    violet: { bg: 'var(--violet-500)', fg: '#fff',                 base: 'var(--violet-700)' },
    blue:   { bg: 'var(--blue-400)',   fg: '#fff',                 base: 'var(--blue-700)' },
    green:  { bg: 'var(--green-400)',  fg: 'var(--green-900)',     base: 'var(--green-700)' },
    pink:   { bg: 'var(--pink-400)',   fg: '#fff',                 base: 'var(--pink-700)' },
    sun:    { bg: 'var(--sun-400)',    fg: 'var(--sun-900)',       base: 'var(--sun-700)' },
    ink:    { bg: '#FFFFFF',           fg: 'var(--surface-0)',     base: 'rgba(255,255,255,0.4)' },
    ghost:  { bg: 'transparent',       fg: 'var(--fg)',            base: 'transparent' },
  };
  const p = palette[color];
  const pad = size === 'sm' ? '10px 16px' : size === 'md' ? '12px 20px' : '15px 24px';
  const fs  = size === 'sm' ? 13 : size === 'md' ? 14 : 16;
  const [pressed, setPressed] = React.useState(false);
  const baseShadow = `0 4px 0 0 ${p.base}`;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: fs,
        padding: pad, borderRadius: 16,
        background: disabled ? 'rgba(255,255,255,0.08)' : p.bg,
        color: disabled ? 'var(--fg-subtle)' : p.fg,
        border: color === 'ghost' ? '1px solid var(--border-strong)' : 'none',
        boxShadow: disabled ? 'none' : (pressed ? '0 0 0 0 transparent' : baseShadow),
        transform: pressed && !disabled ? 'translateY(4px)' : 'translateY(0)',
        transition: 'transform .09s ease, box-shadow .09s ease',
        cursor: disabled ? 'not-allowed' : 'pointer',
        textTransform: 'uppercase', letterSpacing: '0.04em',
        ...style,
      }}
    >{children}</button>
  );
}

// ============================================================ Icons (chunky, brand-stroked)
const Ic = {
  play:    (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>,
  check:   (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  x:       (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  lock:    (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>,
  star:    (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/></svg>,
  trophy:  (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h12v4a6 6 0 0 1-12 0V4z"/><path d="M6 4H4a2 2 0 0 0 0 4h2M18 4h2a2 2 0 0 1 0 4h-2M9 18v3h6v-3"/><path d="M12 14v4"/></svg>,
  user:    (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2"/></svg>,
  chart:   (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 6-6"/></svg>,
  brain:   (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 7v9a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V7"/><path d="M16 7c0-3-2-5-4-5s-4 2-4 5"/><circle cx="12" cy="13" r="2"/></svg>,
  home:    (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l10 9h-3v9h-5v-6H10v6H5v-9H2z"/></svg>,
  chevR:   (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"/></svg>,
  back:    (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 6 9 12 15 18"/></svg>,
  settings:(s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  bell:    (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
};

// ============================================================ TopBar (streak + xp + hearts)
function TopBar({ streak = 147, xp = 2840, hearts = 4 }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '8px 18px 12px', gap: 10,
    }}>
      {/* streak */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <img src="../../assets/icon-flame.svg" width="24" height="24" />
        <span style={{ font: '900 18px var(--font-display)', color: 'var(--fg)', fontVariantNumeric: 'tabular-nums' }}>{streak}</span>
      </div>
      {/* xp */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <img src="../../assets/icon-xp.svg" width="22" height="22" />
        <span style={{ font: '900 18px var(--font-display)', color: 'var(--fg)', fontVariantNumeric: 'tabular-nums' }}>{xp.toLocaleString()}</span>
      </div>
      {/* hearts */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <img src="../../assets/icon-heart.svg" width="22" height="22" />
        <span style={{ font: '900 18px var(--font-display)', color: 'var(--fg)' }}>{hearts}</span>
      </div>
    </div>
  );
}

// ============================================================ BottomNav
function BottomNav({ active, onChange }) {
  const items = [
    { id: 'learn',    label: 'Learn',    icon: Ic.home },
    { id: 'practice', label: 'Practice', icon: Ic.brain },
    { id: 'stats',    label: 'Stats',    icon: Ic.chart },
    { id: 'league',   label: 'League',   icon: Ic.trophy },
    { id: 'me',       label: 'Me',       icon: Ic.user },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingBottom: 28, paddingTop: 10, paddingLeft: 4, paddingRight: 4,
      background: 'rgba(19,19,38,0.92)',
      backdropFilter: 'blur(24px) saturate(160%)',
      WebkitBackdropFilter: 'blur(24px) saturate(160%)',
      display: 'flex', justifyContent: 'space-around',
      zIndex: 20,
    }}>
      {items.map(it => {
        const isActive = active === it.id;
        return (
          <button key={it.id} onClick={() => onChange(it.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            background: 'none', border: 'none', cursor: 'pointer', padding: '6px 8px',
            color: isActive ? 'var(--violet-300)' : 'rgba(245,242,238,0.55)',
          }}>
            {it.icon(24)}
            <span style={{ font: `${isActive ? 800 : 600} 11px var(--font-display)`, letterSpacing: '0.02em' }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

window.DuoButton = DuoButton;
window.Ic = Ic;
window.TopBar = TopBar;
window.BottomNav = BottomNav;
