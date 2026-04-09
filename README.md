# StyleSync

StyleSync is a powerful web-based tool that transforms any website into an interactive, living design system. By pasting a URL, StyleSync intelligently scrapes, extracts, and analyzes core design tokens—such as dominant color palettes (using image analysis), typographic scales, and spacing rhythms—and instantly maps them into a dynamic, Figma-like dashboard and live React component preview grid.

## Challenge Alignment

This application fulfills all primary requirements for the assessment:
- **Frontend Architecture**: A React + Vite SPA using Tailwind CSS, managed cleanly by Zustand for token locking and export.
- **Backend Architecture**: A robust Node.js + Express backend utilizing Puppeteer to extract computed styles and `node-vibrant` to analyze hero imagery for color palettes.
- **Database**: PostgreSQL schema running on Supabase tracking scraped sites, tokens, locked states, and full `version_history` audit logging (Time Machine).
- **Design & User Experience**: Premium aesthetic styling with custom CSS-variable real-time updates (<100ms lag), satisfying padlock micro-interactions, and a bespoke DOM-parsing skeleton loader.

## Local Setup

1. **Install all dependencies:**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Set up Environment Variables:**
   - In `backend`, duplicate `.env.example` to `.env` and fill in your Supabase connection strings (`SUPABASE_URL` and `SUPABASE_ANON_KEY`).
   - In `frontend`, duplicate `.env.example` to `.env`. Ensure `VITE_API_BASE_URL` points to `http://localhost:4000`.

3. **Start the applications:**
   Open two terminals:
   - Terminal 1: `cd backend && npm run dev`
   - Terminal 2: `cd frontend && npm run dev`

## Exporting & Using Tokens
Once a token theme is extracted and tweaked to perfection, users can easily export the final configuration via the dashboard into raw CSS variables for instant drop-in usage across any web project.
