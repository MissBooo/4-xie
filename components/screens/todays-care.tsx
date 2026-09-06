'use client'

import { useState } from 'react'
import { ArrowRight, MessageSquareOff, Plus, Scale, ShieldCheck, Sun, X } from 'lucide-react'
import { StatusBadge } from '@/components/status-badge'
import { todayTimeline } from '@/lib/amanah-data'

function SummaryCard({
  icon: Icon,
  title,
  value,
  detail,
}: {
  icon: typeof Sun
  title: string
  value: string
  detail: string
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-sm">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/60">
        <Icon className="size-4 text-accent-foreground" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="min-w-0 text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
            {title}
          </p>
          <p className="shrink-0 font-serif text-sm font-semibold text-foreground">{value}</p>
        </div>
        <p className="text-xs leading-snug text-muted-foreground">{detail}</p>
      </div>
    </div>
  )
}

function GreetingPopup({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="greeting-title"
    >
      <button
        type="button"
        aria-label="Close greeting"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-sm rounded-3xl bg-primary p-8 text-primary-foreground shadow-lg">
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-full text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
        >
          <X className="size-5" aria-hidden />
        </button>
        <Sun className="size-8 text-primary-foreground/80" aria-hidden />
        <p id="greeting-title" className="mt-4 font-serif text-3xl font-semibold text-balance">
          Good morning, Fatima.
        </p>
        <p className="mt-3 text-primary-foreground/80 leading-relaxed">
          Your family is coordinated around your preferences.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary-foreground px-5 py-3 text-base font-semibold text-primary transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
        >
          Start the day
        </button>
      </div>
    </div>
  )
}

export function TodaysCare({ onAddHandoff }: { onAddHandoff: () => void }) {
  const [showGreeting, setShowGreeting] = useState(true)

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      {showGreeting && <GreetingPopup onClose={() => setShowGreeting(false)} />}

      <div>
        <h1 className="font-serif text-[25px] font-semibold tracking-tight text-foreground">
          Today&apos;s Care
        </h1>
        <p className="mt-2 text-[14px] text-muted-foreground">Fatima&apos;s care circle</p>
      </div>

      <div className="flex flex-col gap-2">
        <SummaryCard
          icon={Sun}
          title="Today's tasks"
          value="4"
          detail="2 completed · 2 upcoming"
        />
        <SummaryCard
          icon={Scale}
          title="Family workload"
          value="Balanced"
          detail="3 family members · 1 task each"
        />
        <SummaryCard
          icon={ShieldCheck}
          title="Sharing status"
          value="Controlled"
          detail="Fatima approves access"
        />
      </div>

      <section className="rounded-3xl border border-border bg-card p-5 shadow-sm md:p-6">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Today
        </h2>
        <ol className="mt-4 flex flex-col">
          {todayTimeline.map((entry, i) => (
            <li
              key={`${entry.time}-${entry.title}`}
              className="flex items-start gap-3 py-2.5 sm:items-center"
            >
              <div className="w-12 shrink-0 pt-0.5 font-serif text-sm font-semibold text-foreground sm:pt-0">
                {entry.time}
              </div>
              <div className="relative flex flex-col items-center self-stretch">
                <span className="size-2.5 rounded-full bg-primary" aria-hidden />
                {i < todayTimeline.length - 1 && (
                  <span className="mt-1 w-px flex-1 bg-border" aria-hidden />
                )}
              </div>
              <div className="flex flex-1 flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-foreground">{entry.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {entry.person}
                    {entry.role ? ` · ${entry.role}` : ''}
                  </p>
                </div>
                <StatusBadge status={entry.status} />
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="flex flex-col gap-6 rounded-3xl border border-accent-foreground/15 bg-accent/50 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
        <div className="flex items-start gap-3">
          <MessageSquareOff className="mt-0.5 size-5 shrink-0 text-accent-foreground" aria-hidden />
          <div>
            <p className="font-semibold text-foreground">One shared source of truth</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              No more searching through WhatsApp to figure out who is doing what.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onAddHandoff}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Plus className="size-5" aria-hidden />
          Add care handoff
          <ArrowRight className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}
