'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'
import { TodaysCare } from '@/components/screens/todays-care'
import { Preferences } from '@/components/screens/preferences'
import { CareHandoff } from '@/components/screens/care-handoff'
import { CareTeam } from '@/components/screens/care-team'
import { CaregiverChat } from '@/components/screens/caregiver-chat'
import { STORAGE_KEY, type Handoff, type ScreenId } from '@/lib/amanah-data'

export default function Page() {
  const [screen, setScreen] = useState<ScreenId>('today')
  const [menuOpen, setMenuOpen] = useState(false)
  const [latestHandoff, setLatestHandoff] = useState<Handoff | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setLatestHandoff(JSON.parse(raw) as Handoff)
    } catch {
      // ignore malformed storage
    }
  }, [])

  function navigate(id: ScreenId) {
    setScreen(id)
    setMenuOpen(false)
  }

  function saveHandoff(h: Handoff) {
    setLatestHandoff(h)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(h))
    } catch {
      // ignore write failures
    }
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar active={screen} onNavigate={navigate} open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onOpenMenu={() => setMenuOpen(true)} />

        <main className="flex-1 px-5 py-8 md:px-10 md:py-12">
          {screen === 'today' && <TodaysCare onAddHandoff={() => navigate('handoff')} onOpenChat={() => navigate('chat')} />}
          {screen === 'preferences' && <Preferences />}
          {screen === 'handoff' && <CareHandoff latest={latestHandoff} onSave={saveHandoff} />}
          {screen === 'team' && <CareTeam onOpenChat={() => navigate('chat')} />}
          {screen === 'chat' && <CaregiverChat />}
        </main>
      </div>
    </div>
  )
}
