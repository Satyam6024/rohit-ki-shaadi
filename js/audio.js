/* ============================================================
   AUDIO MODULE — audio.js

   ── DEFAULT: SOUND ON ──
   Sound toggle starts as ON. The reveal-sound.mp3 plays
   automatically 3 seconds after the loader clears.

   ── BROWSER AUTOPLAY POLICY ──
   Browsers block audio until the user interacts with the page.
   loader.js handles the unlock flow — this module just plays
   when asked, silently failing if blocked.

   ── YOUR MP3 FILES ──
   Drop these in /audio/:
     reveal-sound.mp3  → the "faa" moment (auto-plays after loader)
     click-sound.mp3   → button taps

   ── SECTION SOUNDS ──
   See section-sounds.js and main.js for how to wire
   per-section MP3 triggers.
============================================================ */

const AudioManager = (() => {
  let soundOn = true;
  const btn = document.getElementById('sound-btn');
  if (btn) btn.textContent = '🔊 SOUND: ON';

  function _play(el) {
    if (!el || !soundOn) return;
    try {
      el.currentTime = 0;
      const p = el.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => { /* browser blocked autoplay — silent fail */ });
      }
    } catch (_) { /* Safari may throw synchronously */ }
  }

  function playById(audioId) {
    const el = document.getElementById(audioId);
    _play(el);
  }

  function playReveal() { playById('audio-reveal'); }
  function playClick()  { playById('audio-click');  }

  function toggle() {
    soundOn = !soundOn;
    if (btn) btn.textContent = soundOn ? '🔊 SOUND: ON' : '🔇 SOUND: OFF';
  }

  function isSoundOn() { return soundOn; }
  return { toggle, playReveal, playClick, playById, isSoundOn };
})();

window.toggleSound = AudioManager.toggle;
window.playReveal  = AudioManager.playReveal;
window.playClick   = AudioManager.playClick;

export default AudioManager;
