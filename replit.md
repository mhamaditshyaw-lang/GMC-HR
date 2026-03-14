# React HR Management App

## Overview
A React + Vite + TypeScript single-page application for HR management, built with Material UI (MUI), Tailwind CSS, and Google Gemini AI integration.

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite 6
- **UI Libraries**: MUI v7 (Material UI), Tailwind CSS v4, Lucide React icons
- **AI**: Google Gemini API (`@google/genai`)
- **Charts**: Recharts
- **Routing**: React Router DOM v7
- **Animations**: Motion (Framer Motion)
- **PDF**: jsPDF + jsPDF AutoTable
- **QR Code**: html5-qrcode

## Project Structure
```
src/
  App.tsx          - Root app with routing
  main.tsx         - Entry point
  theme.ts         - MUI theme configuration
  types.ts         - TypeScript types
  components/      - Shared UI components (Header, Sidebar, BottomNav, etc.)
  contexts/        - React contexts (Auth, Language, Leave, Notification, Theme)
  i18n/            - Internationalization translations
  layouts/         - Page layouts (MainLayout)
  pages/           - Route-level page components
  utils/           - Utility functions
```

## Environment Variables
- `GEMINI_API_KEY` - Required for Google Gemini AI features. Set in `.env.local`.

## Running Locally
```bash
npm install
npm run dev   # Starts on port 5000
```

## Deployment
Configured as a **static** deployment:
- Build command: `npm run build`
- Output directory: `dist`

## Workflows
- **Start application**: `npm run dev` on port 5000 (webview)
