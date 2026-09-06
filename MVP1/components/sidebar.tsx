'use client'

import { CalendarHeart, HeartHandshake, ShieldCheck, Users, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ScreenId } from '@/lib/amanah-data'

const items: { id: ScreenId; label: string; icon: typeof CalendarHeart }[] = [
  { id: 'today', label: "Today's Care", icon: CalendarHeart },
  { id: 'preferences', label: 'Her Preferences', icon: ShieldCheck },
  { id: 'handoff', label: 'Care Handoff', icon: HeartHandshake },
  { id: 'team', label: 'Care Team', icon: Users },
]

export function Sidebar({
  active,
  onNavigate,
  open,
  onClose,
}: {
  active: ScreenId
  onNavigate: (id: ScreenId) => void
  open: boolean
  onClose: () => void
}) {
  return (
    <>
      {/* Mobile backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm transition-opacity md:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85%] shrink-0 flex-col gap-8 bg-sidebar px-5 py-8 text-sidebar-foreground transition-transform duration-300 ease-out',
          'md:static md:z-auto md:max-w-none md:min-h-screen md:translate-x-0 md:transition-none',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-start justify-between px-2">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="flex size-9 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground font-serif text-lg font-semibold"
              >
                ا
              </span>
              <span className="font-serif text-2xl font-semibold tracking-tight">Amanah</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-sidebar-foreground/70">
              Care without taking away dignity.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="-mr-1 -mt-1 flex size-9 items-center justify-center rounded-lg text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring md:hidden"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <nav className="flex flex-col gap-1.5" aria-label="Primary">
          {items.map(({ id, label, icon: Icon }) => {
            const isActive = active === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(id)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-4 py-3 text-left text-[15px] font-medium transition-colors',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                )}
              >
                <Icon className="size-5 shrink-0" aria-hidden />
                {label}
              </button>
            )
          })}
        </nav>

        <div className="mt-auto rounded-2xl bg-sidebar-accent/60 p-4 text-sm leading-relaxed text-sidebar-foreground/80">
          <p className="font-medium text-sidebar-foreground">Demo data</p>
          <p className="mt-1 text-sidebar-foreground/70">
            Fatima and her family are fictional. No medical information is stored.
          </p>
        </div>
      </aside>
    </>
  )
}
