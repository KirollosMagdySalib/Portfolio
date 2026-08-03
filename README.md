# Hamza Raza — Full-Stack Developer Portfolio

A fully responsive, single-page personal portfolio built for the **Live Pakistan
Internship Program — Week 1 Task**.

Concept: an architect's **blueprint / technical drawing**. The hero reads like a
drawing title block, projects are numbered schematic cards, and the dark/light
switch is framed as **Blueprint mode ↔ Print mode** — literally how real
blueprints move from a dark negative to a white printed positive.

## Tech
- Semantic HTML5
- CSS3 — Flexbox + Grid, CSS variables for theming, mobile-first media queries
- Vanilla JavaScript — mobile nav toggle, dark/light (blueprint/print) mode with
  saved preference, live contact-form validation
- [Font Awesome](https://fontawesome.com) icons, [Google Fonts](https://fonts.google.com)
  (Space Mono + Inter) via CDN — no build step, no dependencies to install

## Sections
1. **Hero** — title-block intro with an "available for hire" stamp
2. **About** — bio + quick facts
3. **Skills** — grouped legend: Front end / Back end / Tooling
4. **Projects** — 3 schematic project cards with tags and links
5. **Contact** — validated form (name, email, message) with inline error states

## Run it locally
No build tools needed. Either:
- Open `index.html` directly in a browser, **or**
- Serve it so relative paths behave exactly like production:
  ```bash
  npx serve .
  # or
  python3 -m http.server 5500
  ```
Then visit `http://localhost:5500` (or whichever port is printed).

## Before you submit — personalize it
Open `index.html` and replace the placeholders with your own details:
- Name in the `<title>`, `.logo`, and title block (`H. RAZA`)
- Hero copy, About paragraphs, and the "Currently exploring" line
- Skills lists to match your actual stack
- The 3 project cards — description, tags, and the `href="#"` links (point them
  at your real GitHub repos / live demos)
- Contact section — email, GitHub, LinkedIn (`.contact-list`)

## Taking the required screenshots
1. Open the site in Chrome/Firefox.
2. **Desktop screenshot**: maximize the window, screenshot the hero + a scroll
   showing another section.
3. **Mobile screenshot**: open DevTools → Toggle device toolbar (Cmd/Ctrl+Shift+M)
   → pick an iPhone/Android preset → screenshot.
4. Try both **Blueprint mode** and **Print mode** at least once before you
   screenshot, to show the JS interactivity works.

## Deploying (pick one — all free)

### Option A — GitHub Pages
```bash
git init
git add .
git commit -m "Week 1: responsive portfolio landing page"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```
Then: repo **Settings → Pages → Source: `main` branch, `/root`** → Save.
Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

### Option B — Netlify
Drag the whole `portfolio` folder onto https://app.netlify.com/drop — done,
instant live URL. (Also push the same folder to GitHub separately for the
repo-link deliverable.)

### Option C — Vercel
```bash
npx vercel
```
Follow the prompts; Vercel gives you a live URL and can also link straight to
a GitHub repo for continuous deployment.

## Deliverables checklist
- [ ] Public GitHub repo link
- [ ] Live deployed link (GitHub Pages / Netlify / Vercel)
- [ ] Desktop screenshot
- [ ] Mobile screenshot

## Requirements coverage
| Requirement | Where |
|---|---|
| Hero, About, Skills, Projects (3+ cards), Contact | ✅ all 5 sections present |
| Flexbox/Grid, fully responsive | ✅ mobile-first CSS, breakpoints at 700px & 1000px |
| ≥1 JS interaction | ✅ mobile nav toggle **and** blueprint/print mode switch |
| Working contact form (front-end validation only) | ✅ `script.js` validates name/email/message inline, no backend call |
| BEM-ish, organized CSS | ✅ tokens in `:root`, sectioned comments, component-scoped classes |
