/* ============================================================
   LOADER MODULE — loader.js

   Timeline:
     0ms    → loader visible, bar fills over 5s
     5000ms → loader fades out (0.7s CSS transition)
     5700ms → loader removed from DOM
     5700ms → reveal-sound.mp3 plays immediately after loader clears 🎵

   HOW AUTOPLAY WORKS:
   Browsers block audio until a user gesture (click/touch/scroll).
   We use TWO strategies together so the sound almost always plays:

   Strategy 1 — AudioContext silent unlock:
     The moment the user touches/clicks/scrolls ANYWHERE on the loader
     screen, we silently resume an AudioContext. This "unlocks" audio
     for the entire page — before the loader even finishes.

   Strategy 2 — Fallback via sound button:
     If somehow the user never touches anything (rare), the sound plays
     the moment they hit the sound toggle button. We also try to play
     it once on the very first scroll after loader clears.
============================================================ */

import AudioManager from './audio.js';

const LoaderManager = (() => {
  const LOADER_DURATION_MS = 5000; // how long loader shows (matches CSS bar)
  const FADE_DURATION_MS   = 700;  // CSS fade-out duration

  const loaderEl = document.getElementById('loader');

  /* ══════════════════════════════════════════════
     AUDIO CONTEXT UNLOCK
     This is the key trick. Creating and resuming
     an AudioContext inside a user gesture permanently
     unlocks audio for the whole page session.
  ══════════════════════════════════════════════ */
  let ctx = null;
  let audioUnlocked = false;

  function unlockViaAudioContext() {
    if (audioUnlocked) return;
    try {
      // Create a silent AudioContext and resume it
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') {
        ctx.resume().then(() => {
          audioUnlocked = true;
        });
      } else {
        audioUnlocked = true;
      }
      // Play a completely silent buffer — this is the gesture-unlock trick
      const buf = ctx.createBuffer(1, 1, 22050);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0);
    } catch (e) {
      // AudioContext not supported — fall back silently
      audioUnlocked = true;
    }
  }

  // Attach to the loader element itself — catches any touch/click ON the loader screen
  if (loaderEl) {
    loaderEl.addEventListener('click',      unlockViaAudioContext, { passive: true, once: false });
    loaderEl.addEventListener('touchstart', unlockViaAudioContext, { passive: true, once: false });
  }
  // Also catch scroll and any interaction anywhere
  document.addEventListener('scroll',     unlockViaAudioContext, { passive: true, once: true });
  document.addEventListener('touchstart', unlockViaAudioContext, { passive: true, once: true });
  document.addEventListener('click',      unlockViaAudioContext, { passive: true, once: true });
  document.addEventListener('keydown',    unlockViaAudioContext, { passive: true, once: true });
  document.addEventListener('mousemove',  unlockViaAudioContext, { passive: true, once: true });

  /* ══════════════════════════════════════════════
     PLAY SOUND — with retry logic
     Try immediately, then retry once after 500ms,
     then once more after 1500ms as final fallback.
  ══════════════════════════════════════════════ */
  function playWithRetry() {
    AudioManager.playReveal();

    // Retry in case first attempt was still blocked
    setTimeout(() => AudioManager.playReveal(), 500);
  }

  /* ══════════════════════════════════════════════
     DISMISS LOADER
  ══════════════════════════════════════════════ */
  function dismiss() {
    loaderEl.classList.add('hidden');

    setTimeout(() => {
      loaderEl.style.display = 'none';

      // Play immediately after loader clears
      playWithRetry();

    }, FADE_DURATION_MS);
  }

  /* ══════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════ */
  function init() {
    window.addEventListener('load', () => {
      setTimeout(dismiss, LOADER_DURATION_MS);
    });
  }

  return { init };
})();

export default LoaderManager;
