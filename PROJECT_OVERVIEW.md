# 🇰🇭 Cambodia Luxury Tourism Platform — Comprehensive Technical Guide

> **Project Name:** Angkor Lux / Cambodia Tourism Platform  
> **Repository:** [Pisethloka/Tourism](https://github.com/Pisethloka/Tourism.git)  
> **Framework:** Next.js (App Router) + React 19 + Tailwind CSS v4 + Supabase  

---

## 📖 Executive Summary

This project is a high-performance, full-stack web application designed for Cambodian cultural tourism and luxury travel expeditions. It allows global travelers to:
1. **Explore authentic destinations** across Cambodia's historical, natural, and coastal regions.
2. **Interact with geographical maps** featuring Google Maps integration and travel filters.
3. **Plan custom journeys** with a real-time price calculator for hotels, transport, and excursions.
4. **Generate and download itinerary summary cards** as high-resolution PNG images directly from the browser.
5. **Browse a rich photo gallery** with category filtering and a fullscreen lightbox modal.
6. **Share and read community reviews** in a persistent guestbook backed by cloud database storage.

---

## 📑 20 Key Things to Know About This Project

### 🏛️ I. Core Framework & Architecture

#### 1. Next.js App Router Architecture
* **Simple Explanation:** The foundational skeleton of the entire website. Instead of having complex routing files, each folder inside `src/app/` automatically represents a webpage on the site.
* **Technical Term:** `App Router & File-System Routing` — Leverages Next.js App Directory structure (`/`, `/destinations`, `/map`, `/gallery`, `/plan-trip`, `/guestbook`) with automatic layout inheritance and client/server boundary separation.

#### 2. React 19 Component Engine
* **Simple Explanation:** The library responsible for building reusable, reactive interface elements (interactive cards, buttons, dropdowns, filters).
* **Technical Term:** `Declarative Component Architecture` — The interface state automatically re-renders and stays synchronized whenever user inputs (search queries, checkmarks, sliders) change.

#### 3. Turbopack High-Speed Compiler
* **Simple Explanation:** An ultra-fast development and build engine that compiles the website in fractions of a second.
* **Technical Term:** `Rust-based Incremental Bundler` — Replaces traditional Webpack with sub-second compilation times (~350–500ms) for fast development and static page generation.

#### 4. Tailwind CSS v4 Utility-First Styling
* **Simple Explanation:** The styling system that controls all colors, responsive layouts, spacing, and animations directly inside component tags without separate messy CSS files.
* **Technical Term:** `Zero-Runtime Utility Engine` — Uses modern CSS theme variables, fluid layout primitives, and optimized atomic CSS rules.

---

### 🎨 II. Design System & Typography

#### 5. Royal Khmer Gold & Sandstone Palette
* **Simple Explanation:** A curated luxury color scheme inspired by Cambodia’s ancient stone temples, royal palace spires, and tropical landscapes.
* **Technical Term:** `Curated Design Tokens` — `#FAF8F5` (warm cream background), `#C59E3F` (royal gold), `#8C6B1F` (antique ochre), and `#120E0A` (deep charcoal text).

#### 6. Editorial Dual-Typography System
* **Simple Explanation:** Uses two distinct Google fonts: a classical serif font for headlines and a clean modern sans-serif font for reading body text.
* **Technical Term:** `Typographic Hierarchy` — **Cormorant Garamond** for classical editorial titles and **Plus Jakarta Sans / Inter** for optimal legibility across descriptions, buttons, and badges.

#### 7. Baseline-Aligned Lining Numerals
* **Simple Explanation:** Ensures all pricing numbers (e.g., `$85`, `$280`, `$650`, `$75 USD`) align on a flat horizontal baseline rather than jumping up and down.
* **Technical Term:** `OpenType Feature Enforcement (`lining-nums tabular-nums`)` — Enforces uniform digit heights and fixed character widths across all pricing cards.

---

### 🗺️ III. Key Pages & Features

#### 8. Interactive Map Explorer (`/map`)
* **Simple Explanation:** A visual exploration page that lets travelers filter destinations by region, view landmark coordinates, and see real-time Google Maps locations.
* **Technical Term:** `Dynamic State Binding & Google Maps Embed API` — Marker selection updates the interactive map stage, coordinate pins, and location telemetry in real time.

#### 9. Expedition Cost Calculator (`/plan-trip`)
* **Simple Explanation:** A 4-step trip planner where users pick their trip length, guest count, hotel tier, vehicle choice, and excursions, with real-time cost breakdown.
* **Technical Term:** `Reactive Derived State Calculation (`useMemo`)` — Re-computes lodging totals, daily transport fees, and per-guest excursion rates instantly upon any click without page reloads.

#### 10. Client-Side Itinerary PNG Generator
* **Simple Explanation:** Clicking "Save Itinerary as Image" draws a customized travel summary card and downloads it directly as a high-resolution PNG image to the user's device.
* **Technical Term:** `HTML5 Canvas 2D Rendering Engine` — Renders borders, typography, calculated totals, and bullet points to an in-memory `<canvas>` element and exports it via `canvas.toDataURL("image/png")` without needing any server processing.

#### 11. Fullscreen Gallery & Lightbox Viewer (`/gallery`)
* **Simple Explanation:** A photo gallery featuring 30 Cambodian landmarks with category filtering and an interactive fullscreen photo viewer with previous/next controls.
* **Technical Term:** `React Portal (`createPortal`) & Keyboard Event Listeners` — Renders the fullscreen modal directly onto `document.body` to avoid layout z-index issues, with support for `Esc`, `ArrowLeft`, and `ArrowRight` keyboard shortcuts.

#### 12. Expandable Destination Cards (`/destinations`)
* **Simple Explanation:** Displays Cambodia's top destinations with the ability to expand cards directly in place to read deep travel guides, best visiting seasons, and highlights.
* **Technical Term:** `Inline Accordion Expansion with Smooth Viewport Scroll` — Expands destination details right below the clicked card and auto-scrolls the active card smoothly into the viewport center.

---

### 💾 IV. Data Layer, Persistence & APIs

#### 13. Hybrid Persistence: Supabase Cloud & LocalStorage Fallback
* **Simple Explanation:** Community guestbook reviews are stored in the cloud (Supabase PostgreSQL database). If the internet disconnects or API keys are missing, it automatically falls back to the user's browser storage so the app never crashes.
* **Technical Term:** `Graceful Degradation & Hybrid Persistence Layer` — Tries remote REST operations first via `@supabase/supabase-js`, falling back to `window.localStorage` if offline.

#### 14. Star Rating & Community Guestbook (`/guestbook`)
* **Simple Explanation:** Allows travelers to leave review notes, select star ratings (1–5), like other travelers' reviews, and delete their own submitted notes.
* **Technical Term:** `CRUD Operations (Create, Read, Update, Delete)` — Full user interaction cycle with real-time optimistic state updates and user ownership tracking (`isMyNote`).

#### 15. Form Validation & Anti-Spam Safeguards
* **Simple Explanation:** Prevents empty reviews, overly long submissions, or spam by validating input length and sanitizing data before submission.
* **Technical Term:** `Client-Side Input Validation & State Sanitization` — Disables submission until required fields pass character constraints (e.g., minimum 5 characters, valid rating).

---

### ⚡ V. Performance, SEO & Quality Engineering

#### 16. Fast Page Navigation & Prefetching
* **Simple Explanation:** Clicking between pages happens almost instantly with zero white screens or lag.
* **Technical Term:** `Single Page Application (SPA) Client-Side Routing via next/link` — Next.js automatically pre-fetches linked routes in the background as the user scrolls.

#### 17. Responsive Mobile-First Design
* **Simple Explanation:** The website adapts seamlessly across all devices — smartphones, iPads/tablets, laptops, and ultra-wide desktop monitors.
* **Technical Term:** `Fluid CSS Grid & Flexbox with Breakpoints (`sm`, `md`, `lg`, `xl`)` — Cards stack into a single column on mobile screens and expand into 2-column or 3-column grids on desktop.

#### 18. Image Lazy Loading & Async Decoding
* **Simple Explanation:** Photos load on demand only when they are about to scroll into view, saving user mobile data and making initial page loads lightning fast.
* **Technical Term:** `Native Lazy Loading (`loading="lazy"`, `decoding="async"`)` — Offloads image decoding from the main browser thread to maintain 60 FPS scrolling performance.

#### 19. Package Import Tree-Shaking
* **Simple Explanation:** Ensures that only the specific icons and functions used by the app are bundled into the final download, keeping the file size small.
* **Technical Term:** `Dead Code Elimination & Tree-Shaking (`optimizePackageImports`)` — Configured in `next.config.mjs` to optimize libraries like `lucide-react`.

#### 20. Code Quality & Version Control
* **Simple Explanation:** The codebase is cleanly organized, strictly linted for zero bugs/warnings, and continuously synchronized with GitHub.
* **Technical Term:** `ESLint Static Analysis & Git Branch Workflow` — Clean compilation with **0 errors and 0 warnings** across all files, pushed to the **`main`** branch on **[Pisethloka/Tourism](https://github.com/Pisethloka/Tourism.git)**.

---

## 🛠️ Technology Stack Matrix

| Technology | Layer | Purpose |
| :--- | :--- | :--- |
| **Next.js 15+** | Web Framework | Routing, SSR/SSG rendering, build tooling |
| **React 19** | UI Library | Component architecture, state hooks (`useState`, `useMemo`) |
| **Tailwind CSS v4** | Styling | Utility-first CSS, theme tokens, responsive layouts |
| **Supabase JS** | Database Client | PostgreSQL cloud backend for guestbook reviews |
| **HTML5 Canvas API** | Graphics | Client-side itinerary PNG generation & download |
| **Lucide React** | Iconography | Lightweight SVG icons for navigation and metadata |
| **Turbopack** | Compiler | Sub-second builds and instantaneous hot reload |

---

## 📂 Project Directory Structure

```
Web2/
├── public/
│   ├── api/
│   │   └── destinations.json        # Fallback offline destination records
│   └── assets/                      # High-resolution optimized travel photos
│       ├── hero_angkor.png
│       ├── lodging_boutique.jpg     # Angkor Heritage Boutique Hotel
│       ├── lodging_resort.png       # Raffles Grand Hotel d'Angkor
│       ├── lodging_villa.jpg        # Luxury Pool Villa
│       ├── transport_car.png        # Private Car at Angkor Wat
│       ├── transport_flight.png     # Cambodia Angkor Air Plane
│       ├── excursion_sunrise.jpg    # Angkor Sunrise Guided Tour
│       ├── excursion_helicopter.png # Helicopter Scenic Flight
│       ├── excursion_cruise.png     # Mekong Sunset Cruise
│       ├── excursion_elephants.jpg  # Cardamoms Ranger Eco-Trek
│       └── excursion_cooking.jpg    # Khmer Cooking Class
├── src/
│   ├── app/
│   │   ├── layout.js                # Root layout with Google Fonts & Navbar/Footer
│   │   ├── page.js                  # Home Page (Hero, Slideshow, Highlights)
│   │   ├── destinations/page.js     # Destinations page with inline modal expansion
│   │   ├── map/page.js              # Interactive Map explorer with regional filters
│   │   ├── gallery/page.js          # Photo gallery with fullscreen lightbox modal
│   │   ├── plan-trip/page.js        # Expedition calculator & PNG exporter
│   │   ├── guestbook/page.js        # Community review notes with Supabase
│   │   └── globals.css              # Tailwind v4 theme tokens & typography rules
│   ├── components/
│   │   ├── Navbar.jsx               # Floating header with mobile navigation menu
│   │   └── Footer.jsx               # Universal footer with links & copyright
│   └── services/
│       ├── api.js                   # Destination mock API & Guestbook service
│       └── supabase.js              # Supabase cloud database configuration
├── next.config.mjs                  # Next.js build & package import optimizations
└── package.json                     # Project dependencies and npm scripts
```

---

## 🚀 Running and Building Locally

```bash
# 1. Start the development server
npm run dev

# 2. Check code quality and linting
npm run lint

# 3. Create an optimized production build
npm run build

# 4. Run the production server
npm start
```
