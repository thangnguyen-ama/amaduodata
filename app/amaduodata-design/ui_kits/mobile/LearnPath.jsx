// LearnPath — the lesson tree. Vertical zig-zag path of round tiles.
// Each tile is a "node" — locked, available, in-progress, complete, or bonus.

function LessonTile({ node, onStart }) {
  const isCurrent = node.state === 'current';
  const isDone    = node.state === 'done';
  const isBonus   = node.state === 'bonus';
  const isLocked  = node.state === 'locked';
  const isStart   = node.state === 'start';

  const colors = {
    current: { bg: 'var(--violet-500)', fg: 'var(--surface-2)',             base: 'var(--violet-700)' },
    start:   { bg: 'var(--violet-500)', fg: 'var(--surface-2)',             base: 'var(--violet-700)' },
    done:    { bg: 'var(--blue-400)',  fg: 'var(--blue-900)', base: 'var(--blue-700)' },
    bonus:   { bg: 'var(--sun-400)',    fg: 'var(--sun-900)',   base: 'var(--sun-700)' },
    locked:  { bg: 'rgba(255,255,255,0.08)',    fg: 'var(--fg-subtle)',   base: 'rgba(255,255,255,0.12)' },
  };
  const c = colors[node.state] || colors.locked;
  const [pressed, setPressed] = React.useState(false);

  const glyph = isDone   ? window.Ic.check(36)
              : isBonus  ? window.Ic.star(34)
              : isLocked ? window.Ic.lock(28)
              :            window.Ic.play(36);

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      {/* current pointer */}
      {isCurrent && (
        <div style={{
          position: 'absolute', top: -42, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--surface-2)', color: 'var(--violet-300)',
          padding: '6px 12px', borderRadius: 999, border: '2px solid var(--violet-500)',
          boxShadow: '0 3px 0 0 var(--violet-500)',
          font: '800 11px var(--font-display)', letterSpacing: '0.06em', textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>Start ▾</div>
      )}
      {/* progress ring for current */}
      {isCurrent && node.progress && (
        <svg width="106" height="106" viewBox="0 0 106 106" style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
          <circle cx="53" cy="53" r="49" stroke="rgba(19,19,38,0.08)" strokeWidth="6" fill="none"/>
          <circle cx="53" cy="53" r="49" stroke="var(--violet-500)" strokeWidth="6" fill="none"
            strokeDasharray={2 * Math.PI * 49}
            strokeDashoffset={2 * Math.PI * 49 * (1 - node.progress)}
            strokeLinecap="round" transform="rotate(-90 53 53)"/>
        </svg>
      )}

      <button
        onClick={() => !isLocked && onStart(node)}
        onMouseDown={() => !isLocked && setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        disabled={isLocked}
        style={{
          width: 88, height: 88, borderRadius: '50%',
          background: c.bg, color: c.fg, border: 'none',
          boxShadow: isLocked ? `0 4px 0 0 ${c.base}` : (pressed ? '0 0 0 0 transparent' : `0 6px 0 0 ${c.base}`),
          transform: pressed && !isLocked ? 'translateY(6px)' : 'translateY(0)',
          transition: 'transform .1s ease, box-shadow .1s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: isLocked ? 'not-allowed' : 'pointer',
          position: 'relative', zIndex: 1,
        }}
      >{glyph}</button>
      <span style={{
        font: '700 11px var(--font-display)', letterSpacing: '0.06em', textTransform: 'uppercase',
        color: isLocked ? 'var(--fg-subtle)' : 'var(--fg-muted)',
        marginTop: 2, textAlign: 'center', maxWidth: 110, lineHeight: 1.2,
      }}>{node.label}</span>
    </div>
  );
}

function UnitHeader({ unit }) {
  return (
    <div style={{
      margin: '24px 16px 12px',
      borderRadius: 18,
      background: unit.color,
      color: 'var(--surface-2)',
      padding: '14px 18px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: `0 4px 0 0 ${unit.colorDark}`,
    }}>
      <div>
        <div style={{ font: '700 11px var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.8 }}>Unit {unit.num}</div>
        <div style={{ font: '800 19px var(--font-display)', letterSpacing: '-0.01em', marginTop: 2 }}>{unit.title}</div>
      </div>
      <button style={{
        background: 'rgba(0,0,0,0.18)', border: 'none', borderRadius: 999,
        padding: '8px 12px', color: 'var(--surface-2)', font: '700 11px var(--font-display)',
        letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 4,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        Guidebook
      </button>
    </div>
  );
}

function LearnPath({ onStartLesson }) {
  // zig-zag layout: 5 nodes per unit, offsets cycle
  const offsets = [0, 50, 80, 50, 0, -50, -80, -50];
  const units = [
    {
      num: 1, title: 'The basics: DAU, MAU, retention',
      color: 'var(--violet-500)', colorDark: 'var(--violet-700)',
      nodes: [
        { id: 'u1n1', label: 'DAU vs MAU',       state: 'done' },
        { id: 'u1n2', label: 'Stickiness',       state: 'done' },
        { id: 'u1n3', label: 'D1 retention',     state: 'done' },
        { id: 'u1n4', label: 'Cohort curves',    state: 'current', progress: 0.4 },
        { id: 'u1n5', label: 'Retention spikes', state: 'locked' },
        { id: 'u1n6', label: 'Bonus: read a graph', state: 'locked' },
      ],
    },
    {
      num: 2, title: 'Monetization 101',
      color: 'var(--blue-500)', colorDark: 'var(--blue-700)',
      nodes: [
        { id: 'u2n1', label: 'ARPDAU',  state: 'locked' },
        { id: 'u2n2', label: 'LTV',     state: 'locked' },
        { id: 'u2n3', label: 'Payer %', state: 'locked' },
      ],
    },
  ];

  return (
    <div style={{ padding: '4px 0 140px', minHeight: '100%' }}>
      {units.map(unit => (
        <div key={unit.num}>
          <UnitHeader unit={unit} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, padding: '16px 0 8px' }}>
            {unit.nodes.map((n, i) => (
              <div key={n.id} style={{
                display: 'flex', justifyContent: 'center',
                transform: `translateX(${offsets[i % offsets.length]}px)`,
              }}>
                <LessonTile node={n} onStart={onStartLesson} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

window.LearnPath = LearnPath;
