'use client'

import { MessagesSquare, ShieldCheck, Star } from 'lucide-react'
import { familyMembers } from '@/lib/amanah-data'

export function CareTeam({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            Care Team
          </h1>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">
            Everyone in Fatima&apos;s circle and what each person can access.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenChat}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <MessagesSquare className="size-4" aria-hidden />
          Message the team
        </button>
      </div>

      <ul className="flex flex-col gap-3">
        {familyMembers.map((member) => (
          <li
            key={member.name}
            className={
              member.isViewer
                ? 'flex flex-col gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-4 shadow-sm'
                : 'flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm'
            }
          >
            <div className="flex items-center gap-4">
              <span
                aria-hidden
                className={
                  member.isViewer
                    ? 'flex size-11 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-lg font-semibold text-primary-foreground'
                    : 'flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary font-serif text-lg font-semibold text-secondary-foreground'
                }
              >
                {member.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-foreground">
                  {member.name}
                  {member.isViewer && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[0.65rem] font-semibold text-primary">
                      <Star className="size-3" aria-hidden />
                      You
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground text-pretty">{member.role}</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 self-start rounded-lg border border-border bg-secondary/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <ShieldCheck className="size-3.5 shrink-0" aria-hidden />
              {member.access}
            </span>
          </li>
        ))}
      </ul>

      <p className="rounded-xl bg-accent/50 px-4 py-3 text-xs leading-relaxed text-accent-foreground">
        As the main caregiver you set what each person can access — but never more than Fatima
        has agreed to share.
      </p>
    </div>
  )
}
