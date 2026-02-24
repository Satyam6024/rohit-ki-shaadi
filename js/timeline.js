/* ============================================================
   TIMELINE MODULE — timeline.js
   Handles scroll-triggered animations for the events timeline.
   Each .tl-item slides in from its side when it enters viewport.
   Items stagger slightly so they don't all pop in at once.
============================================================ */

const TimelineManager = (() => {
  const THRESHOLD    = 0.15;  // 15% visible before triggering
  const STAGGER_MS   = 120;   // extra delay per item (ms)

  function init() {
    const items = document.querySelectorAll('.tl-item');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el    = entry.target;
        const index = parseInt(el.dataset.tlIndex || '0', 10);
        const delay = index * STAGGER_MS;

        setTimeout(() => el.classList.add('tl-visible'), delay);
        observer.unobserve(el);
      });
    }, {
      threshold: THRESHOLD,
      rootMargin: '0px 0px -30px 0px',
    });

    // Tag each item with its index for stagger
    items.forEach((item, i) => {
      item.dataset.tlIndex = i;
      observer.observe(item);
    });
  }

  return { init };
})();

export default TimelineManager;
