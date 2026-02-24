/* ============================================================
   SCROLL REVEAL MODULE — reveal.js
   Uses IntersectionObserver to trigger .reveal → .in
   on elements as they enter the viewport.
============================================================ */

const RevealManager = (() => {
  const THRESHOLD = 0.12; // 12% of element must be visible

  function init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          // Unobserve after reveal — no need to re-watch
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: THRESHOLD });

    // Observe all .reveal elements
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  return { init };
})();

export default RevealManager;
