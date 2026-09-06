**Amanah — Care without taking away dignity**

Amanah is a family elderly-care coordination application designed for Muslim families. It replaces fragmented WhatsApp threads and phone calls with one shared care circle, keeping the elderly person's preferences, independence and consent at the center.

The elderly person is not the object of care. They are a participant in their care.

Caregiver POV — focused on recording visits, creating handoffs, and seeing assigned tasks.

Beneficiary POV — focused on personal preferences, visibility controls, and understanding how care is coordinated around them.

Both MVPs share the same philosophy and demo data (fictional elderly woman "Fatima" and her care circle), but expose different workflows and UI priorities.

**Features**

Shared principles
Modern, warm, trustworthy UI (desktop-first, responsive).

Fictional/demo data only (no real medical information).

Accessibility-friendly: large typography, strong contrast, clear buttons.

Core message: WhatsApp helps families talk about care. Amanah helps families coordinate it.

**Caregiver MVP**

Today's Care: overview of tasks, workload, and sharing status.

Care Handoff: record what happened, define next action, assign to a family member/caregiver.

Next Caregiver View: immediate visibility of last update + next responsibility.

Lightweight preference conflict detection (demo) when scheduling around known routines.

**Beneficiary MVP**

Her Preferences: language, caregiver gender, food, routine, appointments, personal space.

Who can see what?: fine-grained visibility rules per family member/caregiver.

Emphasis on consent and control: beneficiary approves who accesses which parts of their care information.

Same care timeline, but presented from the perspective of "what is happening for me, and who knows what".

Tech stack
Frontend: React + Tailwind CSS (generated with v0 / AI tooling).

State: local state + localStorage for simple persistence during the demo.

Deployment: Vercel (public URLs for each MVP).

Project access
Use the live demos below for your presentation and testing. Replace these placeholder links with your actual deployed MVPs.

Caregiver MVP
Live demo: https://caregiver-ruddy-xi.vercel.app/

Beneficiary MVP
Live demo: https://amanah-beneficiary.vercel.app/


Workflow example
- Open Today's Care (Caregiver MVP) and show the shared overview.

- Go to Care Handoff, record a visit, assign the next action to a family member, and save.

- Show the Next Caregiver View and explain how the next person immediately knows what happened and what to do.

- Switch to the Beneficiary MVP and open Her Preferences to show how care adapts to the person.

- Open Who can see what? to demonstrate privacy-by-design and least-privilege access.
