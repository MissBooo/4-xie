import { Menu } from 'lucide-react'

export function Topbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-card/60 px-6 py-4 backdrop-blur-sm md:justify-end md:px-10">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open menu"
        className="flex size-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:hidden"
      >
        <Menu className="size-5" aria-hidden />
      </button>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold leading-tight text-foreground">Fatima</p>
          <p className="text-xs text-muted-foreground">Care plan owner</p>
        </div>
        <span
          aria-hidden
          className="flex size-10 items-center justify-center rounded-full bg-accent font-serif text-lg font-semibold text-accent-foreground"
        >
          F
        </span>
      </div>
    </header>
  )
}
