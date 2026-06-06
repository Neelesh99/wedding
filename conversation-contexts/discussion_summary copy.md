# Project Handoff Summary: Scroll-Driven Collage Wedding Website

This document provides a summary of the current project status, implemented features, and instructions for the next agent to continue work.

## 1. Project Context
* **Directory**: `/Users/neeleshravichandran/antigravity/wedding`
* **Tech Stack**: React + Vite (running on port `5173`), Vanilla CSS (in `index.css`), Lucide icons.
* **Goal**: Build a high-fidelity wedding website for Jim & Pam featuring a custom scroll-driven collage transition inspired by [cordially.io/demo](https://www.cordially.io/demo).

## 2. Key Components
1. **[ScrollCollage.jsx](file:///Users/neeleshravichandran/antigravity/wedding/src/components/ScrollCollage.jsx)**:
   - Houses the core animation stage wrapper (`230vh` container with a sticky `h-screen` viewport).
   - Animates the center card (proposal scene) directly via `width` and `height` (avoiding blurry pixelation during zoom) and crops it dynamically.
   - Translates 4 surrounding collage photos (Beach, Dancing, Canyon, Feet) from off-screen into their final coordinates.
2. **Details, RSVP, and FAQ Sections**:
   - [DetailsSection.jsx](file:///Users/neeleshravichandran/antigravity/wedding/src/components/DetailsSection.jsx), [RSVPForm.jsx](file:///Users/neeleshravichandran/antigravity/wedding/src/components/RSVPForm.jsx), and [FAQSection.jsx](file:///Users/neeleshravichandran/antigravity/wedding/src/components/FAQSection.jsx) provide full page content that scrolls into view beneath the collage.
3. **[screenshot.js](file:///Users/neeleshravichandran/antigravity/wedding/screenshot.js)**:
   - Headless Puppeteer script copied directly inside the repository.
   - Converts to ESM format to align with the project's `"type": "module"`.
   - Puppeteer has been installed as a devDependency in the wedding repo.
   - Captures screenshots at `0px`, `400px`, `800px`, and `1200px` scroll positions and outputs them directly to the local `/Users/neeleshravichandran/antigravity/wedding/screenshots/` directory.

## 3. Implemented Refinements
- **Straight Layout**: Removed all rotations/slants from the side cards; they align perfectly straight.
- **Constant Opacity**: Removed transparency fades; side images remain fully opaque (`opacity: 1`) throughout.
- **Curved Trajectories & Staggered Speeds**:
  - Implemented independent, non-linear easing functions for each card's horizontal ($X$) and vertical ($Y$) translations:
    - **Beach (top-left)**: $X$: `1 - (1-p)^3.5`, $Y$: `p^1.8` (starts shifted down by +60px, moves up)
    - **Dancing (bottom-left)**: $X$: `1 - (1-p)^2.2`, $Y$: `p^1.5` (starts shifted up by -60px, moves down)
    - **Canyon (top-right)**: $X$: `1 - (1-p)^3.0`, $Y$: `p^1.6` (starts shifted down by +50px, moves up)
    - **Feet (bottom-right)**: $X$: `1 - (1-p)^1.8`, $Y$: `p^2.2` (starts shifted up by -70px, moves down)
  - This creates curved diagonal entry paths and staggered speeds, allowing images to temporarily overlap/invade the main card mid-scroll before resolving cleanly outside the main card with balanced spacing.

## 4. Current Status
- Both dev server and production builds compile successfully (`npm run build`).
- Running `node screenshot.js` locally inside the repo captures and saves validation screenshots directly in `/Users/neeleshravichandran/antigravity/wedding/screenshots/`.
