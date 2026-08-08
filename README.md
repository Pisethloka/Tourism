# Angkor Lux — Kingdom of Wonder Luxury Tourism Portal

A high-performance luxury tourism web application built with **React 19**, **Next.js 16 (App Router)**, and **JavaScript**.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router with Turbopack)
- **UI Library**: [React 19](https://react.dev/) & React DOM 19
- **Language**: JavaScript (ES2022+)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom Glassmorphism & Google Fonts
- **Database**: [Supabase](https://supabase.com/) (Cloud PostgreSQL for Live Guestbook Reviews & Upvoting)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Media Engine**: HTML5 Canvas API (High-Res Itinerary PNG Exporter) + Google Satellite Maps

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Project Architecture

```
Web2/
├── package.json              # Next.js 16 scripts & dependencies
├── next.config.mjs           # Next.js configuration
├── postcss.config.mjs        # PostCSS Tailwind v4 plugin
├── eslint.config.js          # ESLint configuration
├── public/
│   ├── api/
│   │   └── destinations.json # Fallback destination dataset
│   └── assets/               # 46 Cambodia destination photos & patterns
└── src/
    ├── app/
    │   ├── globals.css       # Tailwind v4 theme, fonts, custom scrollbars
    │   ├── layout.js         # Root layout with OpenGraph & Metadata
    │   ├── page.js           # Home page (Hero, Video modal, Travel pillars)
    │   ├── destinations/
    │   │   └── page.js       # Destinations guide with category filters
    │   ├── gallery/
    │   │   └── page.js       # Category photo grid & fullscreen Lightbox modal
    │   ├── guestbook/
    │   │   └── page.js       # Supabase live guestbook, carousel & upvoting
    │   ├── map/
    │   │   └── page.js       # Interactive map canvas & regional filters
    │   └── plan-trip/
    │       └── page.js       # Expedition pricing engine & Canvas PNG exporter
    ├── components/
    │   ├── Navbar.js         # Active-route navigation header
    │   ├── Footer.js         # Site footer
    │   └── GlobalCTA.js      # Call-to-action banner
    └── services/
        ├── api.js            # Destination & Guestbook data service
        └── supabase.js       # Supabase client initialization
```
