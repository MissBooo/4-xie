'use client'

import { useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  MessagesSquare,
  Plus,
  Scale,
  Sun,
  UserRound,
  X,
} from 'lucide-react'
import { StatusBadge } from '@/components/status-badge'
import { todayTimeline, viewer } from '@/lib/amanah-data'

const myTasks = todayTimeline.filter((t) => t.person === viewer.name)
const myUpcoming = myTasks.filter((t) => t.status === 'upcoming').length
const myDone = myTasks.filter((t) => t.status === 'done').length

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
          Good morning, Amal.
        </p>
        <p className="mt-3 text-primary-foreground/80 leading-relaxed">
          {myUpcoming} of today&apos;s tasks are yours. The rest of the family has the others covered.
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

export function TodaysCare({
  onAddHandoff,
  onOpenChat,
}: {
  onAddHandoff: () => void
  onOpenChat: () => void
}) {
  const [showGreeting, setShowGreeting] = useState(true)

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      {showGreeting && <GreetingPopup onClose={() => setShowGreeting(false)} />}

      <div>
        <h1 className="font-serif text-[25px] font-semibold tracking-tight text-foreground">
          Today&apos;s Care
        </h1>
        <p className="mt-2 text-[14px] text-muted-foreground">
          What needs you today, and what the family has covered.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <SummaryCard
          icon={UserRound}
          title="Your tasks today"
          value={String(myTasks.length)}
          detail={`${myDone} done · ${myUpcoming} upcoming`}
        />
        <SummaryCard
          icon={Scale}
          title="Family workload"
          value="Balanced"
          detail="Shared across 4 people · nobody carrying it alone"
        />
        <SummaryCard
          icon={CheckCircle2}
          title="Your access"
          value="All access"
          detail="Some items stay private to Fatima"
        />
      </div>

      {/* Amal's own tasks, pulled out of the shared timeline */}
      <section className="rounded-3xl border border-primary/20 bg-primary/5 p-5 shadow-sm md:p-6">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Assigned to you
        </h2>
        <ul className="mt-4 flex flex-col gap-2">
          {myTasks.map((t) => (
            <li
              key={`${t.time}-${t.title}`}
              className="flex flex-col gap-2 rounded-2xl border border-border bg-card px-4 py-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-serif text-sm font-semibold text-foreground">{t.time}</span>
                <StatusBadge status={t.status} />
              </div>
              <span className="text-sm font-semibold leading-snug text-foreground text-pretty">
                {t.title}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-border bg-card p-5 shadow-sm md:p-6">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Everyone&apos;s day
        </h2>
        <ol className="mt-4 flex flex-col">
          {todayTimeline.map((entry, i) => {
            const mine = entry.person === viewer.name
            return (
              <li
                key={`${entry.time}-${entry.title}`}
                className="flex items-start gap-3 py-2.5 sm:items-center"
              >
                <div className="w-12 shrink-0 pt-0.5 font-serif text-sm font-semibold text-foreground sm:pt-0">
                  {entry.time}
                </div>
                <div className="relative flex flex-col items-center self-stretch">
                  <span
                    className={mine ? 'size-2.5 rounded-full bg-primary' : 'size-2.5 rounded-full bg-border'}
                    aria-hidden
                  />
                  {i < todayTimeline.length - 1 && (
                    <span className="mt-1 w-px flex-1 bg-border" aria-hidden />
                  )}
                </div>
                <div className="flex flex-1 flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {entry.title}
                      {mine && (
                        <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-[0.65rem] font-semibold text-primary">
                          You
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {entry.person}
                      {entry.role ? ` · ${entry.role}` : ''}
                    </p>
                  </div>
                  <StatusBadge status={entry.status} />
                </div>
              </li>
            )
          })}
        </ol>
      </section>

      <div className="flex flex-col gap-6 rounded-3xl border border-accent-foreground/15 bg-accent/50 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
        <div className="flex items-start gap-3">
          <MessagesSquare className="mt-0.5 size-5 shrink-0 text-accent-foreground" aria-hidden />
          <div>
            <p className="font-semibold text-foreground">Keep the circle in sync</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Log a handoff or message the other caregivers — no more scattered WhatsApp threads.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onOpenChat}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-base font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <MessagesSquare className="size-5" aria-hidden />
            Open chat
          </button>
          <button
            type="button"
            onClick={onAddHandoff}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Plus className="size-5" aria-hidden />
            Add handoff
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  )
}
