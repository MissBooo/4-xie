'use client'

import {
  Bell,
  CalendarClock,
  DoorClosed,
  Languages,
  Pencil,
  UserRound,
  Utensils,
} from 'lucide-react'
import { familyMembers, preferences } from '@/lib/amanah-data'

const icons = [Languages, UserRound, Utensils, Bell, CalendarClock, DoorClosed]

export function Preferences() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
          Fatima&apos;s Preferences
        </h1>
        <p className="mt-1 text-sm text-muted-foreground text-pretty">
          Care should adapt to the person, not the other way around.
        </p>
      </div>

      <section>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {preferences.map((pref, i) => {
            const Icon = icons[i]
            return (
              <div
                key={pref.label}
                className="rounded-xl border border-border bg-card p-3 shadow-sm"
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                  <Icon className="size-4" aria-hidden />
                </span>
                <p className="mt-2.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {pref.label}
                </p>
                <p className="mt-0.5 text-sm font-semibold leading-tight text-foreground">
                  {pref.value}
                </p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">{pref.hint}</p>
              </div>
            )
          })}
        </div>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Pencil className="size-3.5" aria-hidden />
          Edit preferences
        </button>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-6">
        <h2 className="font-serif text-lg font-semibold text-foreground">Who can see what?</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Fatima stays in control of her information.
        </p>

        <ul className="mt-4 flex flex-col divide-y divide-border">
          {familyMembers.map((m) => (
            <li key={m.name} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
                  {m.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                </div>
              </div>
              <span className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-secondary-foreground">
                {m.access}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-4 rounded-xl bg-accent/50 px-4 py-3 text-xs leading-relaxed text-accent-foreground">
          Being part of someone&apos;s care doesn&apos;t mean you need access to their entire life.
        </p>
      </section>
    </div>
  )
}
