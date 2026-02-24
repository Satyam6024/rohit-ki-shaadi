/* ============================================================
   MAIN ENTRY POINT — main.js
   Imports and initialises all modules in correct order.

   ── SOUND IS ON BY DEFAULT ──
   reveal-sound.mp3 plays automatically 3 seconds after the
   loader disappears. Users can toggle with the top-right button.

   ── HOW TO ADD SECTION-TRIGGERED SOUNDS ──

   Step 1: Add your MP3 to /audio/ folder
           e.g. audio/exe-sound.mp3

   Step 2: Add <audio> tag in index.html (near the other audio tags):
           <audio id="audio-exe" src="audio/exe-sound.mp3" preload="auto"></audio>

   Step 3: Register it below using SectionSounds.register():
           SectionSounds.register('#exe', 'audio-exe');
           ↑ section CSS selector    ↑ audio element ID

   Available section IDs you can target:
     #hero       #exe        #countdown   #events
     #details    #rules      #why         #scandal    #final
============================================================ */

import AudioManager    from './audio.js';
import LoaderManager   from './loader.js';
import CountdownManager from './countdown.js';
import RevealManager   from './reveal.js';
import TimelineManager from './timeline.js';
import ScandalManager  from './scandal.js';
import Utils           from './utils.js';
import SectionSounds   from './section-sounds.js';

// ── 1. Scroll reveal (must run first, before any scrolling) ──
RevealManager.init();

// ── 2. Timeline zigzag animation ──
TimelineManager.init();

// ── 3. Loader (starts dismiss timer; plays reveal sound 3s after) ──
LoaderManager.init();

// ── 4. Countdown timer ──
CountdownManager.init();

// ── 5. Scandal page link handler ──
ScandalManager.init();

// ── 6. Hashtag copy util ──
Utils.init();

// ── 7. Section-triggered sounds ──
// Register your section sounds here.
// Format: SectionSounds.register('SECTION_SELECTOR', 'AUDIO_ELEMENT_ID');
//
// ✅ EXAMPLE — uncomment and rename to match your MP3 files:
//
// SectionSounds.register('#exe',       'audio-exe');
// SectionSounds.register('#countdown', 'audio-countdown');
// SectionSounds.register('#events',    'audio-events');
// SectionSounds.register('#details',   'audio-details');
// SectionSounds.register('#rules',     'audio-rules');
// SectionSounds.register('#why',       'audio-why');
// SectionSounds.register('#scandal',   'audio-scandal');
// SectionSounds.register('#final',     'audio-final');
//
// Then add matching <audio> tags in index.html:
// <audio id="audio-exe" src="audio/exe-sound.mp3" preload="auto"></audio>

SectionSounds.init();

