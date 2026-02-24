/* ============================================================
   COUNTDOWN MODULE — countdown.js
   Live countdown timer to the wedding date.
   Updates every second with a tick animation on seconds box.
============================================================ */

const CountdownManager = (() => {
  // ── Target: April 15, 2026 — Baraat + Shaadi — 6 PM ──
  const WEDDING_DATE = new Date('2026-04-15T18:00:00');

  const els = {
    days:  document.getElementById('cd-d'),
    hours: document.getElementById('cd-h'),
    mins:  document.getElementById('cd-m'),
    secs:  document.getElementById('cd-s'),
  };

  function pad(n) {
    return String(Math.max(0, n)).padStart(2, '0');
  }

  function tick() {
    const diff = WEDDING_DATE - new Date();

    if (diff <= 0) {
      // Wedding day!
      Object.values(els).forEach(el => { if (el) el.textContent = '00'; });
      return;
    }

    const days  = Math.floor(diff / 86_400_000);
    const hours = Math.floor((diff % 86_400_000) / 3_600_000);
    const mins  = Math.floor((diff % 3_600_000)  /    60_000);
    const secs  = Math.floor((diff % 60_000)      /     1_000);

    if (els.days)  els.days.textContent  = pad(days);
    if (els.hours) els.hours.textContent = pad(hours);
    if (els.mins)  els.mins.textContent  = pad(mins);

    // Animate seconds box on change
    if (els.secs) {
      const newSec = pad(secs);
      if (els.secs.textContent !== newSec) {
        els.secs.textContent = newSec;
        const box = els.secs.closest('.cd-box');
        if (box) {
          box.classList.add('tick');
          setTimeout(() => box.classList.remove('tick'), 120);
        }
      }
    }
  }

  function init() {
    tick();
    setInterval(tick, 1000);
  }

  return { init };
})();

export default CountdownManager;
