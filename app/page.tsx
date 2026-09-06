'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'
import { TodaysCare } from '@/components/screens/todays-care'
import { Preferences } from '@/components/screens/preferences'
import { CareHandoff } from '@/components/screens/care-handoff'
import { CareTeam } from '@/components/screens/care-team'
import { STORAGE_KEY, type Handoff, type ScreenId } from '@/lib/amanah-data'

export default function Page() {
  const [screen, setScreen] = useState<ScreenId>('today')
  const [handoff, setHandoff] = useState<Handoff | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setHandoff(JSON.parse(raw) as Handoff)
    } catch {
      /* ignore malformed storage */
    }
  }, [])

  function saveHandoff(next: Handoff) {
    setHandoff(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* storage unavailable — still shown in-session */
    }
  }

  function navigate(id: ScreenId) {
    setScreen(id)
    setMenuOpen(false)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 })
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar
        active={screen}
        onNavigate={navigate}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <div className="flex flex-1 flex-col">
        <Topbar onOpenMenu={() => setMenuOpen(true)} />
        <main className="flex-1 px-6 py-8 md:px-10 md:py-12">
          {screen === 'today' && <TodaysCare onAddHandoff={() => navigate('handoff')} />}
          {screen === 'preferences' && <Preferences />}
          {screen === 'handoff' && <CareHandoff latest={handoff} onSave={saveHandoff} />}
          {screen === 'team' && <CareTeam />}
        </main>
      </div>
    </div>
  )
}
