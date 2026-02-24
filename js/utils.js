/* ============================================================
   UTILS MODULE — utils.js
   Shared utility functions: hashtag copy, etc.
============================================================ */

import AudioManager from './audio.js';

const Utils = (() => {

  /**
   * copyTag — copies hashtag text to clipboard with visual feedback
   * @param {HTMLElement} el — the .htag element clicked
   */
  function copyTag(el) {
    AudioManager.playClick();

    const original = el.textContent;

    navigator.clipboard.writeText(original)
      .then(() => {
        el.textContent = '✓ Copied!';
        el.classList.add('copied');
        setTimeout(() => {
          el.textContent = original;
          el.classList.remove('copied');
        }, 1600);
      })
      .catch(() => {
        // Fallback: show message anyway on older browsers
        el.textContent = '✓';
        setTimeout(() => { el.textContent = original; }, 1200);
      });
  }

  function init() {
    // Nothing to initialise — functions called via inline onclick
  }

  return { init, copyTag };
})();

// Global binding for HTML onclick
window.copyTag = Utils.copyTag;

export default Utils;
