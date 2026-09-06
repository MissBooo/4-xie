'use client'

import { useState } from 'react'
import { AlertTriangle, ArrowRight, CheckCircle2, Lock, RotateCcw } from 'lucide-react'
import {
  assigneeOptions,
  nextActionOptions,
  type Handoff,
} from '@/lib/amanah-data'

const PRAYER_LABEL = '13:45 prayer routine'
const alternatives = ['11:30 AM', '3:00 PM']

/* Demo-only heuristic: a visit scheduled inside Fatima's preferred
   prayer window (13:00–14:15) is flagged. Not a real prayer-time calc. */
function overlapsPrayer(time: string) {
  if (!time) return false
  const [h, m] = time.split(':').map(Number)
  const minutes = h * 60 + m
  return minutes >= 13 * 60 && minutes <= 14 * 60 + 15
}

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
  const [visitTime, setVisitTime] = useState('13:45')
  const [conflictAck, setConflictAck] = useState(false)

  const showTime = nextAction === 'Visit'
  const conflict = showTime && overlapsPrayer(visitTime) && !conflictAck

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave({
      summary: summary.trim() || 'Fatima had lunch with Amal and asked for a quiet afternoon.',
      nextAction,
      assignedTo,
      savedAt: new Date().toISOString(),
    })
  }

  function applyAlternative(alt: string) {
    // convert "11:30 AM" / "3:00 PM" to 24h for the input
    const [clock, meridiem] = alt.split(' ')
    let [h, m] = clock.split(':').map(Number)
    if (meridiem === 'PM' && h !== 12) h += 12
    if (meridiem === 'AM' && h === 12) h = 0
    setVisitTime(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    setConflictAck(false)
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <div>
        <h1 className="font-serif text-[25px] font-semibold tracking-tight text-foreground">
          Care Handoff
        </h1>
        <p className="mt-2 text-[14px] text-muted-foreground">Make the next handoff effortless.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="summary" className="text-sm font-semibold text-foreground">
              What happened?
            </label>
            <textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={4}
              placeholder="Fatima had lunch with Amal and asked for a quiet afternoon."
              className="w-full resize-none rounded-2xl border border-input bg-background px-4 py-3 text-base leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:border-ring focus:outline-2 focus:outline-offset-1 focus:outline-ring"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="nextAction" className="text-sm font-semibold text-foreground">
              Next action
            </label>
            <select
              id="nextAction"
              value={nextAction}
              onChange={(e) => {
                setNextAction(e.target.value)
                setConflictAck(false)
              }}
              className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-base text-foreground focus:border-ring focus:outline-2 focus:outline-offset-1 focus:outline-ring"
            >
              {nextActionOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {showTime && (
            <div className="flex flex-col gap-2">
              <label htmlFor="visitTime" className="text-sm font-semibold text-foreground">
                Preferred time
              </label>
              <input
                id="visitTime"
                type="time"
                value={visitTime}
                onChange={(e) => {
                  setVisitTime(e.target.value)
                  setConflictAck(false)
                }}
                className="w-44 rounded-2xl border border-input bg-background px-4 py-3 text-base text-foreground focus:border-ring focus:outline-2 focus:outline-offset-1 focus:outline-ring"
              />
            </div>
          )}

          {conflict && (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/8 p-5">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden />
                <div>
                  <p className="font-semibold text-foreground">Potential preference conflict</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    This time overlaps with Fatima&apos;s preferred prayer routine ({PRAYER_LABEL}).
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Suggested alternatives
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {alternatives.map((alt) => (
                  <button
                    key={alt}
                    type="button"
                    onClick={() => applyAlternative(alt)}
                    className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                  >
                    {alt}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setConflictAck(true)}
                  className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary"
                >
                  Keep time
                </button>
                <button
                  type="button"
                  onClick={() => applyAlternative(alternatives[0])}
                  className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Change time
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="assignedTo" className="text-sm font-semibold text-foreground">
              Assign to
            </label>
            <select
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-base text-foreground focus:border-ring focus:outline-2 focus:outline-offset-1 focus:outline-ring"
            >
              {assigneeOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl bg-secondary/60 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Lock className="size-4" aria-hidden />
              Who can see this?
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Only the assigned person and approved family members can see this handoff.
            </p>
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-lg font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Save Handoff
          </button>
        </form>

        <NextCaregiverView latest={latest} />
      </div>
    </div>
  )
}

function NextCaregiverView({ latest }: { latest: Handoff | null }) {
  if (!latest) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/50 p-8 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
          <ArrowRight className="size-6" aria-hidden />
        </div>
        <p className="mt-4 font-semibold text-foreground">Next caregiver view</p>
        <p className="mt-1 max-w-xs text-sm leading-relaxed text-muted-foreground">
          Save a handoff and the next caregiver instantly sees what happened and what to do next.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-success/25 bg-success/8 p-6 shadow-sm md:p-8">
      <div className="flex items-center gap-2.5">
        <CheckCircle2 className="size-6 text-success" aria-hidden />
        <p className="font-serif text-2xl font-semibold text-foreground">Handoff saved</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Next caregiver view
        </p>

        <div className="mt-5 flex flex-col gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Last update
            </p>
            <p className="mt-1 text-base leading-relaxed text-foreground">{latest.summary}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Next action
            </p>
            <p className="mt-1 text-lg font-semibold text-foreground">{latest.nextAction}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Assigned to
            </p>
            <p className="mt-1 text-lg font-semibold text-foreground">{latest.assignedTo}</p>
          </div>
        </div>

        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/12 px-4 py-2 text-sm font-semibold text-success">
          <CheckCircle2 className="size-4" aria-hidden />
          Permission checked
        </span>
      </div>

      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <RotateCcw className="size-4" aria-hidden />
        Saved on this device — it stays after a refresh.
      </p>
    </div>
  )
}
