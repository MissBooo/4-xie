export type ScreenId = 'today' | 'preferences' | 'handoff' | 'team' | 'chat'

export type TaskStatus = 'done' | 'upcoming' | 'preference'

export interface TimelineEntry {
  time: string
  title: string
  person: string
  role: string
  status: TaskStatus
}

/* The person using this app is Amal — Fatima's daughter and main caregiver. */
export const viewer = {
  name: 'Amal',
  role: 'Daughter · Main caregiver',
  initials: 'A',
  access: 'All access',
} as const

export const familyMembers = [
  {
    name: 'Amal',
    role: 'Daughter',
    initials: 'A',
    access: 'Main Caregiver - All Access',
    isViewer: true,
  },
  {
    name: 'Youssef',
    role: 'Son',
    initials: 'Y',
    access: 'Tasks + emergencies',
    isViewer: false,
  },
  {
    name: 'Mariam',
    role: 'Granddaughter',
    initials: 'M',
    access: 'Tasks + visit notes',
    isViewer: false,
  },
  {
    name: 'Layla',
    role: 'Assigned caregiver',
    initials: 'L',
    access: 'Assigned tasks only',
    isViewer: false,
  },
] as const

export const todayTimeline: TimelineEntry[] = [
  {
    time: '09:00',
    title: 'Breakfast',
    person: 'Amal',
    role: 'Daughter',
    status: 'done',
  },
  {
    time: '12:30',
    title: 'Lunch & check-in',
    person: 'Youssef',
    role: 'Son',
    status: 'upcoming',
  },
  {
    time: '13:00',
    title: 'Medication reminder',
    person: 'Amal',
    role: 'Daughter',
    status: 'upcoming',
  },
  {
    time: '13:45',
    title: 'Prayer routine',
    person: 'Personal preference',
    role: '',
    status: 'preference',
  },
  {
    time: '16:00',
    title: 'Family visit',
    person: 'Mariam',
    role: 'Granddaughter',
    status: 'upcoming',
  },
]

/* Preferences Amal can see — these are the guardrails she coordinates around. */
export const preferences = [
  { label: 'Language', value: 'French', hint: 'Speak with Fatima in French' },
  { label: 'Caregiver', value: 'Female preferred', hint: 'For personal care tasks' },
  { label: 'Food', value: 'Halal', hint: 'All meals prepared halal' },
  { label: 'Routine', value: 'Prayer reminders', hint: 'Gentle reminders, not enforced' },
  { label: 'Appointments', value: 'Notify family first', hint: 'Before confirming anything' },
  { label: 'Personal space', value: 'Ask before visits', hint: 'A quick message beforehand' },
]

/* Things Fatima keeps to herself. Even as main caregiver, Amal does NOT
   see the contents — only that they exist and are private. */
export const privateToFatima = [
  { label: 'Personal journal', hint: 'Visible only to Fatima' },
  { label: 'Notes with her doctor', hint: 'Shared with her physician only' },
  { label: 'Finances', hint: 'Not shared with the care circle' },
]

export const nextActionOptions = [
  'Family check-in',
  'Transportation',
  'Meal / grocery support',
  'Visit',
  'Other non-medical support',
]

export const assigneeOptions = [
  'Youssef · Son',
  'Amal · Daughter',
  'Mariam · Granddaughter',
  'Layla · Caregiver',
]

export interface Handoff {
  summary: string
  nextAction: string
  assignedTo: string
  savedAt: string
}

/* Caregivers-only coordination chat. Fatima is intentionally not in this
   thread — the care circle organises here without crowding her space. */
export interface ChatMessage {
  id: string
  sender: string
  initials: string
  role: string
  time: string
  text: string
  self: boolean
}

export const caregiverChat: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'Amal',
    initials: 'A',
    role: 'Daughter',
    time: '08:40',
    text: 'Morning everyone. Mama had a good night. Breakfast done, she is in a calm mood today.',
    self: true,
  },
  {
    id: 'm2',
    sender: 'Youssef',
    initials: 'Y',
    role: 'Son',
    time: '09:05',
    text: 'Thanks Amal. I will bring lunch at 12:30 and do the check-in. Anything she asked for?',
    self: false,
  },
  {
    id: 'm3',
    sender: 'Amal',
    initials: 'A',
    role: 'Daughter',
    time: '09:12',
    text: 'She mentioned wanting soup. Also please keep it quiet after 13:45 — that is her prayer time.',
    self: true,
  },
  {
    id: 'm4',
    sender: 'Layla',
    initials: 'L',
    role: 'Caregiver',
    time: '10:20',
    text: 'Noted. I have the 13:00 medication covered with Amal. Female caregiver only for personal care, understood.',
    self: false,
  },
  {
    id: 'm5',
    sender: 'Mariam',
    initials: 'M',
    role: 'Granddaughter',
    time: '11:02',
    text: 'I will visit at 16:00. I messaged Teta first so she is expecting me.',
    self: false,
  },
]

export const STORAGE_KEY = 'amanah:amal:latest-handoff'
export const CHAT_STORAGE_KEY = 'amanah:amal:chat'
