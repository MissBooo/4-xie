'use client'

import {
  Bell,
  CalendarClock,
  DoorClosed,
  Eye,
  Languages,
  Lock,
  UserRound,
  Utensils,
} from 'lucide-react'
import { preferences, privateToFatima } from '@/lib/amanah-data'

const icons = [Languages, UserRound, Utensils, Bell, CalendarClock, DoorClosed]

export function Preferences() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
          Fatima&apos;s Preferences
        </h1>
        <p className="mt-1 text-sm text-muted-foreground text-pretty">
          The guardrails you coordinate around. You can read these — Fatima is the only one who edits them.
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
        <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-4 py-2 text-xs font-medium text-muted-foreground">
          <Eye className="size-3.5" aria-hidden />
          Read-only for caregivers · Fatima updates these herself
        </p>
      </section>

      {/* The core of Amal's POV: she can SEE that private things exist,
          but not their contents. */}
      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-6">
        <div className="flex items-center gap-2">
          <Lock className="size-4 text-muted-foreground" aria-hidden />
          <h2 className="font-serif text-lg font-semibold text-foreground">Private to Fatima</h2>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Being the main caregiver doesn&apos;t mean seeing everything. These stay with her.
        </p>

        <ul className="mt-4 grid gap-2 sm:grid-cols-3">
          {privateToFatima.map((item) => (
            <li
              key={item.label}
              className="flex flex-col gap-2 rounded-xl border border-dashed border-border bg-secondary/30 p-4"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                <Lock className="size-4" aria-hidden />
              </span>
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="text-xs leading-snug text-muted-foreground">{item.hint}</p>
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
