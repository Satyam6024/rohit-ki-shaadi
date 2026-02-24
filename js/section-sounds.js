/* ============================================================
   SECTION SOUNDS MODULE — section-sounds.js

   Plays a specific MP3 once when a section scrolls into view.
   Each sound fires only once per page load.

   ── HOW TO ADD A NEW SECTION SOUND ──

   1. Add audio file to /audio/  e.g.  audio/dhol.mp3

   2. Add <audio> tag in index.html (near the other audio tags):
        <audio id="audio-exe" src="audio/dhol.mp3" preload="auto"></audio>

   3. In main.js, call before SectionSounds.init():
        SectionSounds.register('#exe', 'audio-exe');

   Available section IDs:
     #hero  #exe  #countdown  #events  #details  #rules  #why  #scandal  #final
============================================================ */

import AudioManager from './audio.js';

const SectionSounds = (() => {
  const THRESHOLD = 0.20;

  // Registry: [{ selector, audioId }, ...]
  const registry = [];

  function register(sectionSelector, audioId) {
    registry.push({ sectionSelector, audioId });
  }

  function init() {
    if (registry.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const audioId = entry.target.getAttribute('data-ss-audio');
        if (audioId) AudioManager.playById(audioId);
        observer.unobserve(entry.target);
      });
    }, { threshold: THRESHOLD });

    registry.forEach(({ sectionSelector, audioId }) => {
      const el = document.querySelector(sectionSelector);
      if (!el) {
        console.warn(`[SectionSounds] Not found: "${sectionSelector}"`);
        return;
      }
      // Use a dedicated attribute to avoid conflicts with data-bg etc.
      el.setAttribute('data-ss-audio', audioId);
      observer.observe(el);
    });
  }

  return { register, init };
})();

export default SectionSounds;
