'use client'

import { HeartHandshake } from 'lucide-react'
import { familyMembers } from '@/lib/amanah-data'

export function CareTeam() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div>
        <h1 className="font-serif text-[25px] font-semibold tracking-tight text-foreground">
          Care Team
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Make responsibility visible.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {familyMembers.map((m) => (
          <div key={m.name} className="rounded-xl border border-border bg-card p-3 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-full bg-secondary font-serif text-base font-semibold text-secondary-foreground">
                {m.initials}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.role}</p>
              </div>
              <span className="ml-auto rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                1 task
              </span>
            </div>
            <div
              className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary"
              role="progressbar"
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${m.name} workload`}
            >
              <div className="h-full rounded-full bg-primary" style={{ width: '25%' }} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-3 rounded-2xl bg-primary p-4 text-primary-foreground shadow-sm md:p-6">
        <HeartHandshake className="mt-0.5 size-5 shrink-0" aria-hidden />
        <div>
          <p className="font-serif text-base font-semibold">Care is a shared responsibility.</p>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-primary-foreground/80">
            Amanah makes workload visible so one person doesn&apos;t quietly carry everything.
          </p>
        </div>
      </div>
    </div>
  )
}
