'use client'

import { useState } from 'react'
import { CheckCircle2, HeartHandshake, ShieldAlert } from 'lucide-react'
import { assigneeOptions, nextActionOptions, type Handoff } from '@/lib/amanah-data'

export function CareHandoff({
  latest,
  onSave,
}: {
  latest: Handoff | null
  onSave: (h: Handoff) => void
}) {
  const [summary, setSummary] = useState('')
  const [nextAction, setNextAction] = useState(nextActionOptions[0])
  const [assignedTo, setAssignedTo] = useState(assigneeOptions[0])
  const [justSaved, setJustSaved] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!summary.trim()) return
    onSave({
      summary: summary.trim(),
      nextAction,
      assignedTo,
      savedAt: new Date().toLocaleString(),
    })
    setSummary('')
    setJustSaved(true)
    setTimeout(() => setJustSaved(false), 3500)
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
          Care Handoff
        </h1>
        <p className="mt-1 text-sm text-muted-foreground text-pretty">
          Pass the baton cleanly to the next caregiver — a short note, a next step, a name.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/40 p-4">
        <ShieldAlert className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Keep it about coordination, not medical instructions. Amanah is for organising care,
          not for storing Fatima&apos;s private health records.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 shadow-sm md:p-6"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="summary" className="text-sm font-semibold text-foreground">
            How is Mama doing right now?
          </label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={4}
            placeholder="e.g. Calm and rested. Had lunch and her afternoon medication. Prefers a quiet evening."
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="nextAction" className="text-sm font-semibold text-foreground">
              Next step
            </label>
            <select
              id="nextAction"
              value={nextAction}
              onChange={(e) => setNextAction(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {nextActionOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="assignedTo" className="text-sm font-semibold text-foreground">
              Handing off to
            </label>
            <select
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {assigneeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <HeartHandshake className="size-5" aria-hidden />
          Save handoff
        </button>

        {justSaved && (
          <p
            role="status"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            <CheckCircle2 className="size-4" aria-hidden />
            Handoff saved and shared with the team.
          </p>
        )}
      </form>

      {latest && (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-6">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-serif text-lg font-semibold text-foreground">Latest handoff</h2>
            <span className="text-xs text-muted-foreground">{latest.savedAt}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-foreground">{latest.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground">
              Next: {latest.nextAction}
            </span>
            <span className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground">
              To: {latest.assignedTo}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
