### Overview

This update aligns the SR5 Biomonitor's visuals, layout, and color palette with the SR5 Marketplace themes. It also upgrades the window controller to Foundry V14's ApplicationV2 API.

---

### Key Changes

**1. 🏛️ Architectural Upgrade (ApplicationV2)**

* Upgraded the main application class to use `HandlebarsApplicationMixin(ApplicationV2)`, moving away from the legacy `Application`.
* Migrated context generation to `_prepareContext()`.
* Added dynamic theme detection (light, dark, neon, silicon) on startup.
* Replaced manual jQuery click-listeners with native ApplicationV2 actions.

**2. 🎨 Visual Modernization & Marketplace Theme**

* Integrated custom theme variables to match the marketplace design.
* Unified the styling of window headers, close buttons, and resize handles with the marketplace application.

**3. 📊 Refined Damage Tracker Cards & Wound Modifiers**

* Redesigned character cards using a clean flexbox layout.
* Reordered tracks, placing Stun above Physical/Health.
* Swapped standard text indicators for color-coded Font Awesome icons (blue medical kit, red pulsing heart).
* Enhanced filled damage boxes with glossy highlights, inset borders, and drop-shadows.
* Dynamically displayed system-calculated wound penalty modifiers in styled tags directly next to the tracks.