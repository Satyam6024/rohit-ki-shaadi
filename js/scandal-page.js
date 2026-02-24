/* ============================================================
   SCANDAL PAGE JS — scandal-page.js
   Handles: age gate, lightbox, audio player, reactions,
            category filter, subscribe prank.
   All content is parody/meme — friends roasting the groom.
============================================================ */

/* ════════════════════════════
   VERIFICATION GATE
════════════════════════════ */
const AgeGate = (() => {
  const gate = document.getElementById('age-gate');

  function confirm() {
    // YES — collegemate confirmed → redirect immediately to avoid flash of background page
    window.location.replace('college.html');
  }

  function deny() {
    // NO — not a collegemate → back to wedding site
    window.location.href = 'index.html';
  }

  function init() {
    const yesBtn = document.getElementById('age-yes');
    const noBtn  = document.getElementById('age-no');
    if (yesBtn) yesBtn.addEventListener('click', confirm);
    if (noBtn)  noBtn.addEventListener('click', deny);
  }

  return { init };
})();


/* ════════════════════════════
   LIGHTBOX
   Opens on any .video-card or .photo-card click
════════════════════════════ */
const Lightbox = (() => {
  const lb        = document.getElementById('lightbox');
  const lbTitle   = document.getElementById('lb-title');
  const lbContent = document.getElementById('lb-content');

  // Content database — all parody meme data
  const contentDB = {
    v1: {
      title: '🎬 ROHIT KA NIGHT SHIFT LIFE',
      emoji: '😴',
      headline: 'CLASSIFIED: Night Shift Chronicles',
      body: `Leaked CCTV footage from Rohit's call center shows him attempting
             to stay awake at <strong>3 AM</strong> using only chai and sheer willpower.
             The clip is <strong>47 minutes long</strong> and consists entirely of Rohit
             slowly tilting forward, then jolting awake. Repeat x 200.
             <br><br>Neha watched this and still said yes. True love.`,
    },
    v2: {
      title: '🎬 THE PROPOSAL: BEHIND THE SCENES',
      emoji: '💍',
      headline: 'EXCLUSIVE: How Rohit Actually Proposed',
      body: `Multiple witnesses confirm: Rohit practiced the proposal
             <strong>37 times</strong> in front of his bathroom mirror.
             He had cue cards. He forgot the cue cards.
             He then said — and we quote — <em>"So… shaadi?"</em>
             <br><br>Neha said yes to <strong>that</strong>. Let that sink in.`,
    },
    v3: {
      title: '🎬 ROHIT KA COOKING SHOW (CANCELLED)',
      emoji: '🍳',
      headline: 'PILOT EPISODE — Never Aired',
      body: `Episode 1 of Rohit's self-produced cooking show where he promised
             to make <strong>"ghar ka khana."</strong>
             <br><br>Runtime: 4 minutes. Recipe: Maggi.
             The show was cancelled after the fire department was called.
             The smoke alarm still hasn't recovered emotionally.`,
    },
    v4: {
      title: '🎬 GYM REGISTRATION 2019 - 2024',
      emoji: '💪',
      headline: 'A 5-Year Documentary',
      body: `Rohit has renewed his gym membership every January since 2019.
             Total gym visits documented: <strong>3</strong>.
             <br><br>Month 1: Goes daily.<br>Month 2: Goes on weekends.<br>
             Month 3: Goes when he remembers.<br>Month 4-12: Pays membership. Does not go.
             <br><br>He still owns the gym bag. It is unused. It is his most expensive shelf decoration.`,
    },
    v5: {
      title: '🎬 NEHA KI MEHERBANI — UNCUT',
      emoji: '🙏',
      headline: 'The Most Baffling Decision of 2026',
      body: `What happened when Neha realised Rohit's hobbies were:
             1. Gaming, 2. Chai, 3. Sleeping, 4. More chai.
             <br><br>She said: <strong>"This is fine."</strong>
             <br><br>Full uncut footage of Neha's thought process. 
             Runtime: Unknown. Possibly still loading.`,
    },
    v6: {
      title: '🎬 ROHIT\'S DATING PROFILE - 2018',
      emoji: '📱',
      headline: 'THE ORIGINAL PROFILE. LEAKED.',
      body: `Bio: <em>"B.Tech student. Part-time chai enthusiast. Looking for someone
             who won't judge my Maggi obsession. 5'10" (in good posture)."</em>
             <br><br>Profile picture: A photo from 2016.
             <br>Listed interests: "Coding, Gaming, Netflix, Chai"
             <br><br>It somehow worked. Respect, honestly.`,
    },
    p1: {
      title: '📸 ROHIT: MORNING EDITION',
      emoji: '😵',
      headline: 'BREAKING: Pre-Chai Rohit Documented',
      body: `Rare footage of Rohit before his first chai of the morning.
             Scientists describe the expression as <strong>"a man running on 3% battery."</strong>
             <br><br>This photo was used in a medical journal under the section:
             "Effects of Night Shift on Human Functioning."`,
    },
    p2: {
      title: '📸 THE GYM SELFIE',
      emoji: '🤳',
      headline: 'January 3rd, 2024 — The Annual Gym Visit',
      body: `One of only <strong>3 documented gym visits</strong> in Rohit's fitness journey.
             The selfie was posted with caption: <em>"New year new me 💪"</em>
             <br><br>The gym visit lasted 22 minutes.
             14 of those minutes were taking selfies.
             This is one of them.`,
    },
    p3: {
      title: '📸 ROHIT\'S DESKTOP - YEAR 3',
      emoji: '💻',
      headline: 'CLASSIFIED: Evidence of Tab Hoarding',
      body: `Photograph of Rohit's laptop screen taken without consent.
             Tab count: <strong>247</strong>.
             RAM usage: 99%.
             Browser crashes per day: 4-6.
             <br><br>Neha has been informed. She is handling it.`,
    },
    p4: {
      title: '📸 THE CHAI COLLECTION',
      emoji: '☕',
      headline: 'A Still Life Documentary',
      body: `Rohit's desk at any given moment contains between
             <strong>3 and 7 chai cups</strong> in various stages of completion.
             <br><br>Experts estimate he has consumed enough chai to fill
             a small swimming pool. He considers this an achievement.
             We don't disagree.`,
    },
    a1: {
      title: '🎙️ ROHIT\'S VOICEMAIL TO NEHA',
      emoji: '📞',
      headline: 'The Voicemail That Started It All',
      body: `Audio recording of Rohit calling Neha and immediately forgetting
             what he was going to say. Duration: <strong>2 minutes 14 seconds</strong>.
             Content: 45 seconds of "umm", 30 seconds of "so basically",
             1 minute of describing his day unprompted.
             <br><br>Neha saved this voicemail. She plays it when she needs to laugh.`,
    },
    a2: {
      title: '🎙️ ROHIT SINGS IN THE SHOWER',
      emoji: '🚿',
      headline: 'LEAKED: Concert That Never Was',
      body: `Neighbours confirm the playlist includes:<br>
             • Arijit Singh songs (incorrect lyrics)<br>
             • Old Bollywood classics (completely different lyrics)<br>
             • Sometimes just "la la la" for 3 minutes<br>
             <br>Rohit believes he sounds like a professional.
             The neighbours have filed <strong>no complaints</strong> because honestly, it's kind of wholesome.`,
    },
    a3: {
      title: '🎙️ THE 3 AM GAMING SESSION',
      emoji: '🎮',
      headline: 'AUDIO EVIDENCE: Competitive Gaming',
      body: `Recording captured during Rohit's late-night gaming session.
             Highlights include:<br>
             • "Bhai ye toh cheating hai!"<br>
             • 47 seconds of complete silence (processing a loss)<br>
             • "Ek aur game. Last one. Promise."<br>
             • This was said at 2 AM, 3 AM, and 4 AM.<br>
             <br><strong>Neha timed it.</strong>`,
    },
  };

  function open(id) {
    const data = contentDB[id];
    if (!data) return;

    lbTitle.textContent = data.title;
    lbContent.innerHTML = `
      <div class="classified-reveal">
        <div class="classified-stamp">CLASSIFIED</div>
        <div class="classified-emoji">${data.emoji}</div>
        <div class="classified-title">${data.headline}</div>
        <div class="classified-body">${data.body}</div>
      </div>
      <div class="lb-reactions">
        <button class="reaction-btn" onclick="toggleReaction(this)">😂 <span>Roast him</span></button>
        <button class="reaction-btn" onclick="toggleReaction(this)">💀 <span>RIP</span></button>
        <button class="reaction-btn" onclick="toggleReaction(this)">🙏 <span>Neha is a saint</span></button>
        <button class="reaction-btn" onclick="toggleReaction(this)">☕ <span>More chai</span></button>
      </div>
    `;

    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function init() {
    lb.addEventListener('click', (e) => {
      if (e.target === lb) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lb.classList.contains('open')) close();
    });

    // Wire all media cards
    document.querySelectorAll('[data-content]').forEach(card => {
      card.addEventListener('click', () => open(card.dataset.content));
    });
  }

  return { init, open, close };
})();


/* ════════════════════════════
   AUDIO PLAYER (fake visual)
════════════════════════════ */
const AudioPlayer = (() => {
  let currentTrack = null;

  function toggle(trackEl) {
    const id = trackEl.dataset.content;

    if (currentTrack && currentTrack !== trackEl) {
      currentTrack.classList.remove('playing');
    }

    if (trackEl.classList.contains('playing')) {
      trackEl.classList.remove('playing');
      currentTrack = null;
      // Instead of stopping, open lightbox with the content
    } else {
      trackEl.classList.add('playing');
      currentTrack = trackEl;
      // Simulate playing then open lightbox
      setTimeout(() => {
        if (typeof Lightbox !== 'undefined') {
          Lightbox.open(id);
        }
        trackEl.classList.remove('playing');
        currentTrack = null;
      }, 1200);
    }
  }

  function init() {
    document.querySelectorAll('.audio-track').forEach(track => {
      track.addEventListener('click', () => toggle(track));
    });
  }

  return { init };
})();


/* ════════════════════════════
   REACTIONS
════════════════════════════ */
function toggleReaction(btn) {
  btn.classList.toggle('active');
  const countEl = btn.querySelector('span');
  if (countEl && !countEl.dataset.original) {
    countEl.dataset.original = countEl.textContent;
  }
}


/* ════════════════════════════
   SUBSCRIBE PRANK
════════════════════════════ */
function handleSubscribe() {
  const msgs = [
    '✅ Subscribed! Rohit has been notified. He is embarrassed.',
    "💀 You're in. Welcome to the Receipts Club.",
    '🍿 Subscription confirmed. Enjoy the content.',
    '☕ Subscribed! Free chai not included.',
  ];
  const msg = msgs[Math.floor(Math.random() * msgs.length)];

  const btn = document.querySelector('.subscribe-btn');
  if (btn) {
    btn.textContent = msg;
    btn.style.background = '#00c851';
    btn.disabled = true;
  }
}


/* ════════════════════════════
   CATEGORY FILTER (visual)
════════════════════════════ */
function setCategory(el) {
  document.querySelectorAll('.cat-link').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}


/* ════════════════════════════
   SEARCH PRANK
════════════════════════════ */
function handleSearch() {
  const input = document.querySelector('.header-search input');
  if (!input || !input.value.trim()) return;

  const query = input.value.trim();
  alert(`🔍 Searching for "${query}"...\n\nResult: Only Rohit content available. That's the whole site.`);
  input.value = '';
}


/* ════════════════════════════
   INIT
════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  AgeGate.init();
  Lightbox.init();
  AudioPlayer.init();

  // Search on Enter key
  const searchInput = document.querySelector('.header-search input');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSearch();
    });
  }
});

// Global bindings for inline onclick
window.closeLightbox   = Lightbox.close;
window.handleSubscribe = handleSubscribe;
window.setCategory     = setCategory;
window.handleSearch    = handleSearch;
window.toggleReaction  = toggleReaction;
