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

---

## Deployment Guide

### 1. Preparing the Repository
Make sure to initialize your repository and push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Assessment Complete"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

### 2. Backend Deployment (Render)
1. In your [Render](https://render.com) Dashboard, click **New > Web Service**.
2. Connect your newly pushed GitHub repository.
3. Set the **Root Directory** to `backend`.
4. Use the following configuration:
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add your Environment Variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` = `true` *(Optional: if you plan to rely solely on cloud browser instances or face Render cache limits).*
6. Deploy! Once live, **copy the resulting Render URL** (e.g., `https://stylesync-api.onrender.com`).

### 3. Frontend Deployment (Vercel)
1. In [Vercel](https://vercel.com), click **Add New > Project** and import the GitHub repository.
2. In the setup screen, set the **Root Directory** to `frontend`.
3. Vercel will automatically detect **Vite** as the framework.
4. Expand the Environment Variables section and add:
   - Key: `VITE_API_BASE_URL`
   - Value: `[YOUR_RENDER_URL]` *(Paste the URL from the backend step)*
5. Click **Deploy**.

## Exporting & Using Tokens
Once a token theme is extracted and tweaked to perfection, users can easily export the final configuration via the dashboard into raw CSS variables for instant drop-in usage across any web project.
