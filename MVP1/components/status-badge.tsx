import { Check, Clock, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TaskStatus } from '@/lib/amanah-data'

const config: Record<
  TaskStatus,
  { label: string; className: string; icon: typeof Check }
> = {
  done: {
    label: 'Done',
    className: 'bg-success/12 text-success border-success/25',
    icon: Check,
  },
  upcoming: {
    label: 'Upcoming',
    className: 'bg-primary/10 text-primary border-primary/20',
    icon: Clock,
  },
  preference: {
    label: 'Preference',
    className: 'bg-accent text-accent-foreground border-accent-foreground/15',
    icon: Heart,
  },
}

export function StatusBadge({ status }: { status: TaskStatus }) {
  const { label, className, icon: Icon } = config[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold',
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden />
      {label}
    </span>
  )
}
