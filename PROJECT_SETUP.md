# ASHA EHR System - Setup Instructions

## Project Overview
Complete Electronic Health Records system for ASHA workers with authentication, patient management, and comprehensive health tracking modules.

## Prerequisites
- Node.js 16+ and npm
- Backend API running (see backend documentation)

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment:**
```bash
cp .env.example .env
```
Edit `.env` and set your backend API URL:
```
VITE_API_BASE_URL=http://your-backend-url/api
```

3. **Run development server:**
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (AppLayout, Sidebar, TopNav)
│   ├── ui/              # Shadcn UI components
│   └── ProtectedRoute.tsx
├── lib/
│   ├── api.ts           # Axios instance with JWT interceptors
│   └── utils.ts
├── pages/               # All page components
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── Patients.tsx
│   ├── Pregnancies.tsx
│   ├── Visits.tsx
│   ├── Immunizations.tsx
│   ├── Reminders.tsx
│   ├── VoiceNotes.tsx
│   └── AuditLogs.tsx
├── store/
│   ├── authStore.ts     # Zustand auth state
│   └── lookupsStore.ts  # Global lookups cache
└── App.tsx              # Main routing
```

## Features Implemented

### ✅ Authentication
- Login & Register pages
- JWT token management
- Protected routes with auto-redirect
- Logout functionality

### ✅ Global Lookups
- Fetched on app load
- Cached globally in Zustand
- Used for all dropdowns (genders, roles, facilities, etc.)

### ✅ Dashboard
- Key metrics cards
- Quick stats overview
- Responsive design

### ✅ All Modules
- **Patients** - List with search
- **Pregnancies** - Track pregnancy records
- **Visits** - Patient visit management
- **Immunizations** - Vaccine tracking
- **Reminders** - Task management with complete action
- **Voice Notes** - Voice recording list
- **Audit Logs** - System activity with filters

## Tech Stack
- React 18
- TypeScript
- TailwindCSS
- React Hook Form + Zod (ready for forms)
- Axios + React Query
- Zustand
- Shadcn UI

## Next Steps

### Forms to Add
All forms need to be created using React Hook Form + Zod:
1. Patient Add/Edit Form
2. Pregnancy Form
3. Visit Form
4. Immunization Form
5. Reminder Form
6. Voice Note Form

### Backend Integration
Currently configured to connect to backend API at:
- Default: `http://localhost:3000/api`
- Configure via `VITE_API_BASE_URL` in `.env`

All API endpoints are ready:
- `/auth/login` & `/auth/register`
- `/lookups`
- `/patients`, `/pregnancies`, `/visits`, `/immunizations`, `/reminders`, `/voice`, `/audit`

## Design System
- Primary: Medical Teal (#0891b2)
- Professional, clean medical interface
- Responsive card-based layouts
- Sidebar navigation
- Light theme optimized for clinical use

## Development
```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
```

## Notes
- JWT token stored in localStorage
- All protected routes require authentication
- Lookups fetched once and cached
- Forms validation ready with Zod schemas
- All API calls use Axios with interceptors
