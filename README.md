# 💀 Rohit Ki Shaadi — Meme Wedding Website

A meme-style wedding invitation website. Looks like a Web3/meme coin landing page, not a traditional wedding site.

---

## 📁 Project Structure

```
rohit-shaadi/
│
├── index.html              ← Main HTML (links all CSS + JS)
│
├── css/
│   ├── variables.css       ← Design tokens (colors, fonts, spacing)
│   ├── base.css            ← Reset, body, utilities, scroll reveal
│   ├── loader.css          ← Full-screen loading animation
│   ├── hero.css            ← Hero section + photo frames
│   ├── sections.css        ← Exe, Countdown, Detail cards, Rules, Why Attend
│   ├── events.css          ← Events schedule table
│   ├── scandal.css         ← Scandal section + modal
│   ├── final.css           ← Final section, hashtags, footer
│   └── responsive.css      ← Mobile (≤480px), tablet (≤768px) overrides
│
├── js/
│   ├── main.js             ← Entry point — imports + initialises all modules
│   ├── audio.js            ← Sound toggle + MP3 playback
│   ├── loader.js           ← Loader dismiss + triggers reveal sound
│   ├── countdown.js        ← Live countdown to April 15, 2026
│   ├── reveal.js           ← IntersectionObserver scroll animations
│   ├── scandal.js          ← Scandal modal open/close + keyboard support
│   └── utils.js            ← Hashtag copy-to-clipboard
│
└── audio/
    ├── reveal-sound.mp3    ← ⬅ ADD YOUR FILE HERE (the "faa" moment)
    └── click-sound.mp3     ← ⬅ ADD YOUR FILE HERE (button tap sound)
```

---

## 🎵 Adding Sound Effects

1. Place your MP3 files in the `/audio/` folder
2. Name them exactly:
   - `reveal-sound.mp3` → plays after the loader disappears
   - `click-sound.mp3` → plays on button taps
3. That's it — the code is already wired up

> Users control sound via the **🔇 SOUND: OFF** button (top-right corner)

---

## 📸 Adding Photos

Open `index.html` and find the two photo frames. For each:

**Step 1:** Add `class="loaded"` to the `.photo-frame` div  
**Step 2:** Set the `src` on the `<img>` tag

```html
<!-- Before (placeholder) -->
<div class="photo-frame" id="frame-rohit">
  <img src="" alt="Rohit" />

<!-- After (with photo) -->
<div class="photo-frame loaded" id="frame-rohit">
  <img src="rohit-photo.jpg" alt="Rohit" />
```

---

## 🚀 Deployment (Vercel — recommended)

### Option A: Drag & Drop
1. Go to [vercel.com](https://vercel.com)
2. Drag the entire `rohit-shaadi/` folder into the dashboard
3. Done — live in 30 seconds

### Option B: CLI
```bash
npm i -g vercel
cd rohit-shaadi
vercel
```

### Option C: Netlify Drop
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the folder in
3. Done

> **Important:** Because `js/main.js` uses ES Modules (`import/export`), this site needs to be served over HTTP — not opened as a local `file://` URL. Use a local server for development (see below).

---

## 💻 Local Development

```bash
# Option 1: Python (built-in)
cd rohit-shaadi
python3 -m http.server 3000
# → open http://localhost:3000

# Option 2: Node / npx
npx serve rohit-shaadi
# → open http://localhost:3000

# Option 3: VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

---

## 🎨 Customisation

### Change colors
Edit `css/variables.css` — all design tokens are there:
```css
--orange: #FF6B00;   /* primary accent */
--gold:   #FFB800;   /* highlight */
--black:  #0A0A0A;   /* text / borders */
```

### Change wedding date
Edit `js/countdown.js`:
```js
const WEDDING_DATE = new Date('2026-04-15T18:00:00');
```

### Add a new scandal receipt
Open `index.html`, find `#scandal-modal`, add a new `.receipt-item` div:
```html
<div class="receipt-item">
  Your new embarrassing story about Rohit here.
</div>
```

---

## 📱 Responsive Breakpoints

| Screen | Breakpoint | Key changes |
|--------|------------|-------------|
| Desktop | > 768px | Full layout, hover effects |
| Tablet | ≤ 768px | 2-col grids, tighter spacing |
| Mobile | ≤ 480px | Single column, stacked events, larger touch targets |
| Mini | ≤ 360px | Stacked photo pair, reduced font sizes |

---

## #️⃣ Hashtags

Click any hashtag on the page to copy it to clipboard. To add more, find `.hashtag-wall` in `index.html`:
```html
<div class="htag reveal" onclick="copyTag(this)">#YourHashtag</div>
```

---

*Made with 💀 and zero regrets · #RohitKeLLaagGaye*
