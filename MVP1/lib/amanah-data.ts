export type ScreenId = 'today' | 'preferences' | 'handoff' | 'team'

export type TaskStatus = 'done' | 'upcoming' | 'preference'

export interface TimelineEntry {
  time: string
  title: string
  person: string
  role: string
  status: TaskStatus
}

export const familyMembers = [
  {
    name: 'Amal',
    role: 'Daughter',
    initials: 'A',
    access: 'Main Caregiver - All Access',
  },
  {
    name: 'Youssef',
    role: 'Son',
    initials: 'Y',
    access: 'Tasks + emergencies',
  },
  {
    name: 'Mariam',
    role: 'Granddaughter',
    initials: 'M',
    access: 'Tasks + visit notes',
  },
  {
    name: 'Caregiver',
    role: 'Assigned support',
    initials: 'C',
    access: 'Assigned tasks only',
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

export const preferences = [
  { label: 'Language', value: 'French', hint: 'Speak with Fatima in French' },
  { label: 'Caregiver', value: 'Female preferred', hint: 'For personal care tasks' },
  { label: 'Food', value: 'Halal', hint: 'All meals prepared halal' },
  { label: 'Routine', value: 'Prayer reminders', hint: 'Gentle reminders, not enforced' },
  { label: 'Appointments', value: 'Notify family first', hint: 'Before confirming anything' },
  { label: 'Personal space', value: 'Ask before visits', hint: 'A quick message beforehand' },
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
  'Caregiver',
]

export interface Handoff {
  summary: string
  nextAction: string
  assignedTo: string
  savedAt: string
}

export const STORAGE_KEY = 'amanah:latest-handoff'
