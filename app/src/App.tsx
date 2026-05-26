import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useStore } from './store'
import { Login } from './pages/Login'
import { Onboarding } from './pages/Onboarding'
import { Placement } from './pages/Placement'
import { Home } from './pages/Home'
import { Paths } from './pages/Paths'
import { PathDetail } from './pages/PathDetail'
import { LessonPlayer } from './pages/LessonPlayer'
import { Practice } from './pages/Practice'
import { League } from './pages/League'
import { Profile } from './pages/Profile'
import { MetricTree } from './pages/MetricTree'
import { Admin } from './pages/Admin'
import { SkipTest } from './pages/SkipTest'
import { About } from './pages/About'
import { AppShell } from './components/AppShell'

function Authed({ children }: { children: React.ReactNode }) {
  const user = useStore((s) => s.user)
  const loc = useLocation()
  if (!user) return <Navigate to="/" replace state={{ from: loc }} />
  if (!user.role) return <Navigate to="/onboarding" replace />
  return <AppShell>{children}</AppShell>
}

export default function App() {
  const user = useStore((s) => s.user)

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/home" replace /> : <Login />} />
      <Route path="/onboarding" element={user ? <Onboarding /> : <Navigate to="/" />} />
      <Route path="/placement" element={user?.role ? <Placement /> : <Navigate to="/onboarding" />} />

      <Route path="/home" element={<Authed><Home /></Authed>} />
      <Route path="/paths" element={<Authed><Paths /></Authed>} />
      <Route path="/paths/:slug" element={<Authed><PathDetail /></Authed>} />
      <Route path="/lesson/:pathSlug/:unitId/:lessonId" element={<Authed><LessonPlayer /></Authed>} />
      <Route path="/skip-test/:pathSlug/:unitId" element={<Authed><SkipTest /></Authed>} />
      <Route path="/practice" element={<Authed><Practice /></Authed>} />
      <Route path="/league" element={<Authed><League /></Authed>} />
      <Route path="/tree" element={<Authed><MetricTree /></Authed>} />
      <Route path="/profile" element={<Authed><Profile /></Authed>} />
      <Route path="/admin" element={<Authed><Admin /></Authed>} />
      <Route path="/about" element={<Authed><About /></Authed>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
