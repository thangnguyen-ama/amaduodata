// Web kit shared atoms.

function WebButton({ children, color = 'violet', size = 'md', onClick, icon }) {
  const palette = {
    violet: { bg: 'var(--violet-500)', fg: '#fff',             base: 'var(--violet-700)', hover: 'var(--violet-600)' },
    ink:    { bg: '#FFFFFF',           fg: 'var(--surface-0)', base: 'rgba(255,255,255,0.4)', hover: 'rgba(255,255,255,0.85)' },
    ghost:  { bg: 'transparent',       fg: 'var(--fg)',        base: 'transparent',           hover: 'rgba(255,255,255,0.06)' },
    green:  { bg: 'var(--green-400)',  fg: 'var(--green-900)', base: 'var(--green-700)',      hover: 'var(--green-300)' },
  };
  const p = palette[color];
  const sz = size === 'sm' ? { px: 12, py: 8,  fs: 13 } : { px: 18, py: 11, fs: 14 };
  const [pressed, setPressed] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        font: `${800} ${sz.fs}px var(--font-display)`, letterSpacing: '0.02em', textTransform: 'uppercase',
        padding: `${sz.py}px ${sz.px}px`, borderRadius: 12,
        background: p.bg, color: p.fg,
        border: color === 'ghost' ? '1px solid var(--border-strong)' : 'none',
        boxShadow: pressed ? '0 0 0 0 transparent' : `0 3px 0 0 ${p.base}`,
        transform: pressed ? 'translateY(3px)' : 'translateY(0)',
        transition: 'transform .08s ease, box-shadow .08s ease',
        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
      }}>
      {icon}{children}
    </button>
  );
}

function WebCard({ children, padding = 22, style = {} }) {
  return (
    <div style={{
      background: 'var(--surface-2)', borderRadius: 18, border: '1px solid var(--border)',
      padding, boxShadow: 'var(--shadow-sm)', ...style,
    }}>{children}</div>
  );
}

function Eyebrow({ children, color = 'var(--fg-muted)' }) {
  return <div style={{ font: '700 11px var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color }}>{children}</div>;
}

const WebIc = {
  search:  (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
  plus:    (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  bell:    (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  chevR:   (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"/></svg>,
  drag:    (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>,
  more:    (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>,
  trend:   (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 17 9 11 13 15 21 7"/><polyline points="14 7 21 7 21 14"/></svg>,
};

window.WebButton = WebButton;
window.WebCard = WebCard;
window.WebIc = WebIc;
window.Eyebrow = Eyebrow;
