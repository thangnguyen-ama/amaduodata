import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'

export function Login() {
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const login = useStore((s) => s.login)
  const nav = useNavigate()

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.endsWith('@amanotes.com')) {
      setError('DuoData is internal-only. Please sign in with your @amanotes.com address.')
      return
    }
    if (!displayName.trim()) {
      setError('Please enter a display name.')
      return
    }
    login(email, displayName.trim())
    nav('/onboarding')
  }

  return (
    <div className="min-h-screen grid place-items-center bg-bg-0 p-6">
      <div className="card w-full max-w-md p-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-10 h-10 rounded-lg bg-brand text-white flex items-center justify-center font-extrabold text-lg">D</span>
          <span className="font-extrabold text-2xl">DuoData</span>
        </div>
        <p className="text-fgmuted text-sm mb-6">Learn the Amanotes metric tree in 5 minutes a day.</p>

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="text-xs font-semibold uppercase text-fgmuted">Display name</label>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Linh Nguyen"
              className="mt-1 w-full px-3 py-2 border border-line rounded-md focus:border-brand focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-fgmuted">Amanotes email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="linh@amanotes.com"
              className="mt-1 w-full px-3 py-2 border border-line rounded-md focus:border-brand focus:outline-none"
              type="email"
            />
          </div>
          {error && <div className="text-incorrect text-sm bg-incorrect/5 border border-incorrect/20 rounded-md p-2">{error}</div>}
          <button className="duo-btn-primary w-full" type="submit">
            Continue with Amanotes SSO (mock)
          </button>
        </form>

        <p className="text-xs text-fgmuted mt-6 leading-5">
          MVP demo build. Real version goes through Amanotes Google Workspace SSO. Internal-only — see <code>monetization.md</code>: DuoData has no ads, no IAP.
        </p>
      </div>
    </div>
  )
}
