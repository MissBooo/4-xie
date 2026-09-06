'use client'

import { useEffect, useRef, useState } from 'react'
import { EyeOff, Send } from 'lucide-react'
import { caregiverChat, CHAT_STORAGE_KEY, viewer, type ChatMessage } from '@/lib/amanah-data'

const participants = [
  { initials: 'A', name: 'Amal' },
  { initials: 'Y', name: 'Youssef' },
  { initials: 'M', name: 'Mariam' },
  { initials: 'L', name: 'Layla' },
]

export function CaregiverChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(caregiverChat)
  const [draft, setDraft] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CHAT_STORAGE_KEY)
      if (raw) {
        const stored = JSON.parse(raw) as ChatMessage[]
        if (Array.isArray(stored) && stored.length) setMessages(stored)
      }
    } catch {
      // ignore malformed storage
    }
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function persist(next: ChatMessage[]) {
    setMessages(next)
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(next))
    } catch {
      // ignore write failures
    }
  }

  function send(e: React.FormEvent) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    const message: ChatMessage = {
      id: `local-${Date.now()}`,
      sender: viewer.name,
      initials: viewer.initials,
      role: 'Daughter',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
      self: true,
    }
    persist([...messages, message])
    setDraft('')
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-8.5rem)] max-w-3xl flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
            Caregivers Chat
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            The care circle coordinating together.
          </p>
        </div>
        <div className="flex -space-x-2" aria-label="Participants">
          {participants.map((p) => (
            <span
              key={p.initials}
              title={p.name}
              className="flex size-8 items-center justify-center rounded-full border-2 border-card bg-secondary text-xs font-semibold text-secondary-foreground"
            >
              {p.initials}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/40 px-4 py-2.5 text-xs font-medium text-muted-foreground">
        <EyeOff className="size-3.5 shrink-0" aria-hidden />
        Fatima is not in this chat. This space is for caregivers only.
      </div>

      <div className="flex-1 overflow-y-auto rounded-2xl border border-border bg-card p-4 shadow-sm">
        <ul className="flex flex-col gap-4">
          {messages.map((m) => (
            <li
              key={m.id}
              className={m.self ? 'flex flex-row-reverse items-end gap-2.5' : 'flex items-end gap-2.5'}
            >
              <span
                aria-hidden
                className={
                  m.self
                    ? 'flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground'
                    : 'flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground'
                }
              >
                {m.initials}
              </span>
              <div className={m.self ? 'flex max-w-[78%] flex-col items-end' : 'flex max-w-[78%] flex-col items-start'}>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-semibold text-foreground">
                    {m.self ? 'You' : m.sender}
                  </span>
                  <span className="text-[0.65rem] text-muted-foreground">{m.time}</span>
                </div>
                <p
                  className={
                    m.self
                      ? 'mt-1 rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm leading-relaxed text-primary-foreground'
                      : 'mt-1 rounded-2xl rounded-bl-sm bg-secondary px-4 py-2.5 text-sm leading-relaxed text-secondary-foreground'
                  }
                >
                  {m.text}
                </p>
              </div>
            </li>
          ))}
          <div ref={endRef} />
        </ul>
      </div>

      <form onSubmit={send} className="flex items-center gap-2">
        <label htmlFor="chat-input" className="sr-only">
          Message the caregivers
        </label>
        <input
          id="chat-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Message the care circle…"
          className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Send message"
        >
          <Send className="size-5" aria-hidden />
        </button>
      </form>
    </div>
  )
}
