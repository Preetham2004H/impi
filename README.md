# Chandru & Impu — Royal Wedding Invitation Website 🌸

An autoscrolling, mobile-first wedding invitation website inspired by royal Indian palace themes.

---

## ✨ Features Included

1. **Royal Envelope Intro**:
   - Deep burgundy & gold parchment background with 60fps falling rose petals.
   - Pulsing 3D wax heart seal badge.
   - "Open" button with shiny gleam animation.
2. **Smooth Autoscroll Engine**:
   - Gentle, hands-free reading scroll down the invitation.
   - **Smart Mobile Touch Detection**: Instantly pauses when you touch or swipe with your thumb, and gracefully resumes after 3 seconds.
   - Floating Play/Pause toggle with glowing pulse ring indicator.
3. **Background Music Player**:
   - Plays a romantic Indian wedding instrumental upon tapping "Open" (compliant with mobile browser autoplay restrictions).
   - Floating spinning vinyl / gold note button to mute/unmute anytime.
4. **Countdown Timer**:
   - Live real-time countdown to Saturday, November 28, 2026, 6:30 PM IST (Days, Hours, Minutes, Seconds).
5. **Interactive Photo Gallery**:
   - 4 card grid layout.
   - Fullscreen lightbox with mobile swipe gestures (swipe left/right to change photos), pinch/zoom, and thumbnail navigation.
6. **Venue & Google Maps**:
   - Embedded interactive Google Map for **Nandhana Convention Hall, Bengaluru**.
   - "Get Directions" button that opens Google Maps directly.
   - One-tap "Add to Calendar" for Google Calendar and Apple / Outlook (.ics).
7. **Family & Blessings Section**:
   - Detailed cards for both Groom and Bride's parents and addresses.
8. **Interactive Guestbook & Wishes**:
   - Guests can write their name and blessings.
   - **Magic Wand 🪄 AI Wish Generator**: Click to autofill heartfelt traditional blessings!
   - Stores wishes in browser `localStorage` in real-time.

---

## 🚀 How to Run Locally

The server is currently running at:
👉 **[http://localhost:3000](http://localhost:3000)**

You can also start it anytime from this folder:
```bash
npm start
```
*(Or simply double-click `index.html` in file explorer to open it in Chrome/Edge!)*

---

## ☁️ How to Host on Cloudflare Pages (100% Free, Unlimited Bandwidth)

Cloudflare Pages easily handles **10,000+ clicks per day** for free without any monthly limits.

### Option 1: Direct Drag-and-Drop (Fastest — 2 Minutes)
1. Go to **[dash.cloudflare.com](https://dash.cloudflare.com/)** and log in (or sign up free).
2. In the left sidebar, click **Workers & Pages** ➔ **Create application** ➔ **Pages** tab.
3. Choose **Upload assets**.
4. Give your project a name (e.g. `chandru-impu-wedding`).
5. Drag and drop all the files from this folder (`index.html`, `style.css`, `script.js`, etc.) into the upload box.
6. Click **Deploy site**.
7. **Done!** You will immediately get a live public link like:  
   👉 `https://chandru-impu-wedding.pages.dev`

### Option 2: Via Git / GitHub
1. Push this folder to a GitHub repository.
2. In Cloudflare Pages, select **Connect to Git** ➔ choose your repo.
3. Set Build command to empty and Output directory to `.`.
4. Click **Save and Deploy**. Cloudflare will auto-deploy updates whenever you commit!

### Option 3: Via Cloudflare Wrangler CLI (1 Command)
Run in PowerShell:
```powershell
npx wrangler pages deploy . --project-name=chandru-impu
```
