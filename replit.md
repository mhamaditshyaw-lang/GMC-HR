# Hospital HR Management App

## Overview
A React + Vite + TypeScript SPA for hospital HR management, backed by a Node.js/Express REST API and a Replit-provisioned PostgreSQL database. Manages employees, departments, attendance, leave requests, and payroll.

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite 6
- **Backend**: Node.js, Express, tsx (TypeScript runner)
- **Database**: PostgreSQL (via Replit), `pg` driver
- **UI Libraries**: MUI v7 (Material UI), Tailwind CSS v4, Lucide React icons
- **AI**: Google Gemini API (`@google/genai`)
- **Charts**: Recharts
- **Routing**: React Router DOM v7
- **Animations**: Motion (Framer Motion)
- **PDF**: jsPDF + jsPDF AutoTable
- **QR Code**: html5-qrcode

## Project Structure
```
server/
  index.ts          - Express server (port 3001)
  db.ts             - PostgreSQL pool, schema creation & seeding
  routes/
    employees.ts    - CRUD /api/employees
    departments.ts  - CRUD /api/departments
    leave.ts        - CRUD /api/leave + PATCH status
    attendance.ts   - GET /api/attendance
    payroll.ts      - GET /api/payroll

src/
  api/client.ts     - Typed API client (all fetch calls)
  App.tsx           - Root app with routing
  main.tsx          - Entry point
  theme.ts          - MUI theme configuration
  types.ts          - TypeScript types
  components/       - Shared UI (Header, Sidebar, BottomNav, etc.)
  contexts/         - Auth, Language, Leave, Notification, Theme
  i18n/             - Translations
  layouts/          - Page layouts (MainLayout)
  pages/            - Route-level pages (Dashboard, StaffDirectory, Departments, AddEmployee, ...)
  utils/            - Utility functions
```

## API Routes
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/health | Health check |
| GET/POST | /api/employees | List / create employees |
| GET/PUT/DELETE | /api/employees/:id | Get / update / delete employee |
| GET/POST | /api/departments | List / create departments |
| GET | /api/leave | List leave requests |
| POST | /api/leave | Create leave request |
| PATCH | /api/leave/:id/status | Approve / reject leave |
| GET | /api/attendance | List attendance records |
| GET | /api/payroll | List payroll records |
| GET | /api/dashboard/stats | Aggregate dashboard statistics |

## Pages Connected to Live API
- **Dashboard** — stats from `/api/dashboard/stats`
- **Staff Directory** — `/api/employees`
- **Departments** — `/api/departments` (list + create)
- **Leave Management** — `/api/leave` (via LeaveContext)
- **Add Employee** — POST `/api/employees` on final step submit

## Environment Variables
- `DATABASE_URL` — Replit-provisioned PostgreSQL connection string (set as a secret)
- `GEMINI_API_KEY` — Google Gemini AI key (optional, set in `.env.local`)

## Running Locally
```bash
npm install
npm run server   # Backend on port 3001
npm run dev      # Frontend on port 5000
```

## Workflows
- **Start application**: `npm run server & sleep 3 && npm run dev` — starts both backend (3001) and Vite dev server (5000)

## Deployment
Static deployment:
- Build command: `npm run build`
- Output directory: `dist`

## Notes
- Vite proxies `/api` → `http://localhost:3001` in dev
- `server.watch.ignored` excludes `.local/**` to prevent constant HMR restarts from agent log writes
- Database seeds use `ON CONFLICT DO NOTHING` so re-running is safe
- Seed employees: IDs 1–10; ID 1 = Dr. Sarah Jenkins (HR_MANAGER), ID 7 = Alex Rivera (SUPER_ADMIN), ID 9 = Mark Wilson (STAFF)
