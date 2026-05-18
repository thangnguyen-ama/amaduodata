export function About() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-extrabold mb-3">About this build</h1>
      <div className="card p-5 text-sm space-y-3 leading-6">
        <p>
          <strong>DuoData</strong> is the Amanotes-internal Duolingo-style app for the marketing & product metric tree.
          This build is a client-only MVP demo of the PRD in <code>../prd/</code>.
        </p>
        <p className="text-fgmuted">
          <strong>Scope of this build:</strong> F001 (mock SSO), F002 onboarding, F003 placement, F004 lesson player with all 6 card types,
          F005 profile, F020/F021 XP+hearts+streak, F022 leagues, F023 quests, F024 SRS practice,
          F050 Product 101, F051 UA 101, F053 Cross-Functional Connections, F054 metric tree, F100 minimal admin authoring.
        </p>
        <p className="text-fgmuted">
          <strong>Out of scope (per user request):</strong> F052 Mon 101 path (monetization-related content path).
          DuoData itself has no in-app monetization — see <code>prd/monetization.md</code> (it's N/A).
        </p>
        <p className="text-fgmuted">
          <strong>Mocked infrastructure:</strong> Google SSO → email allowlist; BigQuery/Firebase → in-memory event buffer
          (inspect <code>window.__duodata_events</code>); Postgres → localStorage (Zustand persist).
        </p>
        <p>
          Open the browser console and run <code className="formula">window.__duodata_debug = true</code> to see tracked events live.
        </p>
      </div>
    </div>
  )
}
