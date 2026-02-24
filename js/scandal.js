/* ============================================================
   SCANDAL MODULE — scandal.js
   NOTE: The scandal page is now a separate full page (scandal.html).
   The button in index.html links directly to scandal.html.
   This module is kept for any future modal needs.
============================================================ */

// No-op stubs kept for safety in case any inline onclick remains
window.openScandal  = () => { window.location.href = 'scandal.html'; };
window.closeScandal = () => {};

const ScandalManager = {
  init() {
    // Scandal content lives on scandal.html
    // Nothing to initialise on the main page
  }
};

export default ScandalManager;

