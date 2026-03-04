# Job Notification Tracker

Premium SaaS app for job discovery with preferences, match scoring, saved jobs, and daily digest.

## How to run (avoid "This site can't be reached")

The app is built with **Vite + React**. You must **start the dev server** before opening it in the browser.

### Option 1: Double-click run.bat (Windows)

1. Double-click **`run.bat`** in the project folder.
2. A **new terminal window** will open and start the server. **Do not close that window.**
3. Your browser will open automatically after a few seconds. If it shows "This site can't be reached", wait **10–15 seconds** and refresh the page (the server may still be starting).

### Option 2: Manual (any OS)

1. Open a terminal in the project folder.
2. Run:
   ```bash
   npm install
   npm run dev
   ```
3. **Leave the terminal open.** When you see something like:
   ```text
   Local:   http://localhost:5173/
   ```
   open **http://localhost:5173** in your browser.

### Why "This site can't be reached" appears

- The app is **not** a static HTML file. It needs the **Vite dev server** to run.
- If you close the terminal where `npm run dev` is running, the server stops and the site will show "This site can't be reached."
- **Fix:** Start the server again with `npm run dev` (or `run.bat`) and **keep that window open** while you use the app.

## Commands

| Command        | Description                    |
|----------------|--------------------------------|
| `npm run dev`  | Start dev server (keep running)|
| `npm run build`| Build for production           |
| `npm run preview` | Preview production build   |
| `npm run test` | Run tests                      |

## Tech

- React 18, React Router, Vite
- Design system: off-white #F7F6F3, accent #8B0000, serif headings
- Routes: /, /dashboard, /saved, /digest, /settings, /proof
