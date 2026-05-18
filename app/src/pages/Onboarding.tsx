import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { Role, Team } from '../types'

const ROLES: { code: Role; name: string; hint: string }[] = [
  { code: 'PO', name: 'Product Owner', hint: 'Read product dashboards, plan cycles' },
  { code: 'UA', name: 'UA Specialist', hint: 'Bidding, CPI, ROAS, networks' },
  { code: 'MO', name: 'Monetization Operator', hint: 'Ad placement, IAP, subs' },
  { code: 'GD', name: 'Game Designer', hint: 'Mechanics, hypotheses, FTUE' },
  { code: 'LD', name: 'Level Designer', hint: 'Difficulty, sumME, content cadence' },
  { code: 'MS', name: 'Music Specialist', hint: 'Song performance, sumME' },
  { code: 'DA', name: 'Data Analyst', hint: 'Metric authoring, deep dives' },
  { code: 'CRE', name: 'Creative', hint: 'IPM, CTR, winning creatives' },
  { code: 'OTHER', name: 'Other', hint: 'Leadership, BizOps, partners' }
]

const TEAMS: Team[] = ['PI', 'BH', 'DR', 'GDUC', 'NGD', 'MEP', 'GS', 'DnI', 'Other']

export function Onboarding() {
  const [role, setRole] = useState<Role | null>(null)
  const [team, setTeam] = useState<Team>('PI')
  const setRoleTeam = useStore((s) => s.setRoleTeam)
  const nav = useNavigate()

  return (
    <div className="min-h-screen bg-surface-light p-6">
      <div className="max-w-3xl mx-auto pt-10">
        <div className="text-xs text-sub-light mb-1">Step 1 of 2</div>
        <h1 className="text-2xl font-extrabold mb-2">Welcome to DuoData. What's your role?</h1>
        <p className="text-sub-light mb-6">We use this to personalize your starting path and tailor lesson examples.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {ROLES.map((r) => (
            <button
              key={r.code}
              onClick={() => setRole(r.code)}
              className={`card p-4 text-left transition-colors ${
                role === r.code ? 'border-brand ring-2 ring-brand/30' : 'hover:border-slate-300'
              }`}
            >
              <div className="font-bold">{r.name}</div>
              <div className="text-xs text-sub-light mt-1">{r.hint}</div>
            </button>
          ))}
        </div>

        <div className="card p-5 mt-6">
          <label className="text-xs font-semibold uppercase text-sub-light">Team / product</label>
          <select
            value={team}
            onChange={(e) => setTeam(e.target.value as Team)}
            className="mt-2 w-full md:w-72 px-3 py-2 border border-slate-200 rounded-md focus:border-brand focus:outline-none"
          >
            {TEAMS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <p className="text-xs text-sub-light mt-2">PI · BH · DR · GDUC = LO4 games · NGD = New Games · MEP = Music Entertainment Platform · GS · DnI · Other</p>
        </div>

        <div className="flex justify-end mt-8">
          <button
            disabled={!role}
            onClick={() => {
              if (!role) return
              setRoleTeam(role, team)
              nav('/placement')
            }}
            className="duo-btn-primary"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
