# Requirements Document

## Introduction

This document defines the requirements for a visual-only redesign of the World Passport education consultancy website. The redesign applies a NOIR dark-web-agency aesthetic — inspired by the NOIR Framer template — across all pages and components. No content, data, routing, or business logic changes. Only CSS, Tailwind classes, inline styles, animation parameters, and the Hero background are modified.

The brand color palette (red `#DC2626`, blue `#2563EB`, white) is preserved. The dark base moves to near-black (`#05070F` / `#080B12`). The aesthetic adds sharp editorial typography, grain/noise texture, gradient accent lines, glowing orb elements, and glass-dark card surfaces.

---

## Glossary

- **System**: The Next.js + Tailwind CSS + Framer Motion web application ("World Passport website")
- **NOIR Aesthetic**: The specific visual style described — ultra-dark backgrounds, sharp accent lines, bold display typography, glowing highlights, grain texture, minimal borders
- **Hero Section**: The full-viewport opening section of the homepage (`Hero.tsx`)
- **Particle Canvas**: An HTML5 `<canvas>`-based animated background featuring particle nodes connected by lines, rendered in the NOIR palette
- **Card**: Any `.card-dark` surface used in Stats, Process, Testimonials, Universities, and inner pages
- **Accent Line**: A thin (1–3 px) gradient or solid line placed at the top of a card or section divider
- **Glowing Orb**: A soft radial-gradient circle element used as a decorative background accent
- **Overline Badge**: The small pill-shaped label above section headings (e.g. "Our Impact", "Your Journey")
- **Grain Texture**: A CSS-generated or SVG noise overlay applied at low opacity to add tactile depth
- **Marquee**: The horizontally scrolling university-name strip in `Universities.tsx`
- **Inner Pages**: `/overseas`, `/skill`, `/about`, `/contact`

---

## Requirements

---

### Requirement 1: Global Design System — CSS Variables & Base Styles

**User Story:** As a visitor, I want the entire site to feel cohesive with a premium dark aesthetic, so that every page looks intentional and editorial.

#### Acceptance Criteria

1. THE System SHALL use `#05070F` as the primary page background (`--bg`) and `#080B12` as the alternate dark surface (`--bg-alt`), replacing any lighter greys
2. THE System SHALL define a CSS grain/noise texture utility class (`noise-overlay`) that overlays SVG-based noise at 3–6% opacity on sections that use it
3. THE System SHALL update `.badge-blue` and `.badge-red` to use dark glass surfaces (translucent dark background, colored border, colored text) instead of light pastel backgrounds, so badges are legible on dark backgrounds
4. THE System SHALL update `.card-dark` to use `rgba(8, 11, 18, 0.92)` background with a `1px solid rgba(255,255,255,0.07)` border and a subtle inner shadow
5. WHEN `.card-dark` is hovered, THE System SHALL apply a colored border glow using `box-shadow` in the card's accent color at 20–30% opacity
6. THE System SHALL define a `section-label` typographic style: `text-[10px] uppercase tracking-[0.2em] font-semibold` in a muted slate color, used for overline text above badges
7. THE System SHALL update the scrollbar to use the dark base color (`#05070F`) as track background instead of the current light grey

---

### Requirement 2: Navbar — NOIR Floating Pill Refinement

**User Story:** As a visitor, I want the navigation to feel sharp and minimal against the dark hero, so that it doesn't visually compete with the content.

#### Acceptance Criteria

1. WHEN the page is not scrolled, THE Navbar SHALL use a fully transparent background with no border
2. WHEN the page is scrolled beyond 30px, THE Navbar SHALL transition to a `#05070F` background with a `1px solid rgba(255,255,255,0.06)` bottom border and `backdrop-filter: blur(24px)`
3. THE Navbar pill container SHALL use `bg-white/[0.04]` with a `1px solid rgba(255,255,255,0.08)` border in unscrolled state
4. WHEN scrolled, THE Navbar pill container SHALL use `bg-[#080B12]/90` with `border border-[#1E2535]`
5. THE active route pill indicator SHALL use a `bg-[#2563EB]/20 border border-[#2563EB]/40` style instead of the current light blue/white style
6. THE mobile menu SHALL use `#05070F` background with `border border-white/[0.08]` and active links SHALL use `text-blue-400 bg-blue-500/10` styling instead of `text-blue-600 bg-blue-50`
7. THE "Partner With Us" CTA button SHALL retain the `premium-btn` gradient but add a `box-shadow: 0 0 20px rgba(37,99,235,0.25)` glow effect

---

### Requirement 3: Hero Section — Animated Dark Globe / World Map Background

**User Story:** As a visitor, I want the hero section to have a cinematic dark globe/world-map animated background that communicates the "global education" theme while matching the NOIR dark aesthetic, so the opening impression is dramatic and on-brand.

#### Acceptance Criteria

1. THE System SHALL replace the `<video>` element in `Hero.tsx` with an HTML5 `<canvas>` element rendered by a React `useEffect` hook
2. THE Canvas SHALL render a dark world map silhouette (using a low-poly or dot-grid map projection) on a `#05070F` / deep navy background, matching the style shown in the design reference image — a top-down globe/map view with glowing outlines
3. THE Canvas SHALL animate glowing arc connection lines between 6–10 fixed geographic "hub" points on the map (representing India, UK, Germany, France, Netherlands, etc.) — arcs SHALL pulse in and out at staggered intervals with blue (`#2563EB`) and red (`#DC2626`) stroke colors
4. THE Canvas SHALL overlay a subtle blue-tinted grid/graticule pattern (longitude/latitude lines) at 4–6% opacity to reinforce the tech-map aesthetic
5. Small pulsing dot markers SHALL appear at each hub city location, alternating between blue and red glow, using `rgba(37,99,235,0.8)` and `rgba(220,38,38,0.7)` respectively, with a soft radial bloom
6. THE Canvas SHALL be responsive — WHEN the container resizes, THE canvas SHALL resize to match via a `ResizeObserver`
7. THE Canvas SHALL run using `requestAnimationFrame` and THE System SHALL cancel the animation on component unmount to prevent memory leaks
8. THE existing radial gradient overlays (blue top-left, red bottom-right) SHALL be preserved on top of the canvas as `z-10` layers
9. THE left-side gradient fade (`from-[#05070F]/95`) and bottom fade SHALL remain so text stays legible against the animated background
10. WHERE a user's browser does not support `<canvas>`, THE System SHALL fall back to a solid `#05070F` background with the existing radial gradient overlays

---

### Requirement 4: Stats Section — NOIR Card Treatment

**User Story:** As a visitor, I want the stats cards to look like premium dark glass panels with glowing accents, so they reinforce the high-quality brand.

#### Acceptance Criteria

1. THE Stats section background SHALL use `#05070F` with a grain noise overlay at 4% opacity
2. EACH stat card SHALL have a sharp gradient accent line on its top edge using the card's `stat.accent` color: `linear-gradient(90deg, transparent, {color}, transparent)` at full opacity (not reduced)
3. EACH stat card SHALL display a subtle glowing orb behind the stat value — a `radial-gradient` in the accent color at 8–12% opacity, `blur(40px)`, positioned behind the number
4. THE stat icon (emoji) SHALL be replaced with a styled icon container: a `40×40px` rounded square with `bg-{accent}/10 border border-{accent}/25` and the emoji inside at `text-2xl`
5. WHEN a stat card is hovered, THE System SHALL apply a `box-shadow: 0 0 30px rgba({accent-rgb}, 0.15)` glow
6. THE overline badge ("Our Impact") SHALL use the updated dark badge style from Requirement 1.3

---

### Requirement 5: Process Section — NOIR Step Cards

**User Story:** As a visitor, I want the process steps to look editorial and structured, with strong visual hierarchy, so the journey feels intentional.

#### Acceptance Criteria

1. THE Process section background SHALL be `#080B12` (slightly differentiated from Stats) with no grain texture
2. EACH step card top accent line SHALL have increased contrast: `height: 2px` and the gradient SHALL go from `{color}` at 80% opacity on both ends (not transparent), creating a more visible line
3. THE step number watermark (currently `opacity: 0.06`) SHALL increase to `opacity: 0.10` for better NOIR depth
4. THE step tag badge (e.g. "Step 1") SHALL use `tracking-[0.15em]` letter-spacing for more editorial feel
5. THE step progress indicator circles SHALL have a `box-shadow: 0 0 16px {color}` glow pulse animation on the active/hovered state
6. THE connecting lines between steps in the progress indicator SHALL use a gradient from blue to red (`linear-gradient(90deg, #3B82F6, #DC2626)`) rather than light blue

---

### Requirement 6: Universities Section — Dark Marquee & Country Grid

**User Story:** As a visitor, I want the universities section to be fully dark-themed with no light elements, so it doesn't break the immersive dark experience.

#### Acceptance Criteria

1. THE Universities section background SHALL be `#05070F`
2. THE country grid cards SHALL use `card-dark` styling with the top accent line visible in `rgba(37,99,235,0.6)` for all cards (single unified accent color)
3. THE card content overlay gradient (currently `bg-gradient-to-t from-white`) SHALL be replaced with `bg-gradient-to-t from-[#05070F] via-[#05070F]/60 to-transparent` so text sits on dark background instead of white
4. THE country name and university count text SHALL use `text-slate-100` and `text-blue-400` respectively
5. THE marquee fade overlays (currently fading to `#ffffff`) SHALL fade to `#05070F` to match the dark background
6. THE marquee university pills SHALL use `bg-[#080B12] border-[#1E2535]` with `text-slate-300`
7. THE dot divider decorative element SHALL use `bg-blue-500/50` instead of `bg-red-400/60`

---

### Requirement 7: Testimonials Section — Dark Glass Cards

**User Story:** As a visitor, I want testimonials to look cinematic and dark, with the student photos adding drama rather than breaking the aesthetic.

#### Acceptance Criteria

1. THE Testimonials section background SHALL be `#080B12`
2. THE decorative large quote marks SHALL use `text-white/[0.04]` opacity instead of the current `text-slate-700/40` for subtler NOIR depth
3. THE main testimonial card university badge (currently `bg-blue-50` with dark text) SHALL be updated to `bg-[#0D1829] border border-blue-500/25 text-blue-300` to stay dark-themed
4. THE side panel testimonial selector buttons SHALL use `bg-[#080B12] border-[#1A2333]` for unselected and `bg-[#0D1829] border-blue-500/30` for selected state
5. THE navigation "next" button gradient SHALL be `from-[#2563EB] to-[#DC2626]` (already correct) but add `box-shadow: 0 4px 20px rgba(37,99,235,0.3)`
6. THE active dot indicator SHALL use `box-shadow: 0 0 8px rgba(37,99,235,0.6)` glow

---

### Requirement 8: Footer — NOIR Dark CTA & Links

**User Story:** As a visitor, I want the footer to feel like a premium dark editorial footer with a strong CTA block, so the page ends on a high note.

#### Acceptance Criteria

1. THE Footer SHALL use `#05070F` background with `border-t border-white/[0.06]`
2. THE CTA banner block SHALL use `bg-[#080B12]` with `border border-white/[0.07]` and a top accent line `linear-gradient(90deg, #2563EB, #DC2626)` at `2px` height
3. THE CTA banner SHALL display two glowing orb elements — one blue (`rgba(37,99,235,0.12)`) top-right, one red (`rgba(220,38,38,0.10)`) bottom-left — as absolute positioned decorative blurs
4. THE "Browse Programs" secondary button SHALL use `border-white/[0.10] text-slate-400 hover:border-blue-500/50 hover:text-white` styling
5. THE footer navigation links SHALL use `text-slate-500 hover:text-blue-400` transition
6. THE social icon buttons SHALL use `bg-[#080B12] border-[#1E2535]` dark glass style
7. THE bottom bar copyright SHALL use `text-slate-600` and year links SHALL use `text-slate-600 hover:text-slate-400`

---

### Requirement 9: Inner Pages — Unified Dark Theme

**User Story:** As a visitor browsing inner pages, I want the same NOIR aesthetic consistency as the homepage, so the experience feels seamless across the site.

#### Acceptance Criteria

1. THE Overseas page Country Explorer section (currently `bg-[#F8FAFC]`) SHALL use `bg-[#05070F]` and all card surfaces inside SHALL use dark glass styling with `text-white` headings
2. THE Overseas page Program Levels section (currently `bg-white`) SHALL use `bg-[#080B12]`
3. THE Overseas page Scholarship bars (currently `bg-white` cards) SHALL use `bg-[#0B1224] border-[#1F2937]` with `text-white` primary text and `text-slate-400` secondary text
4. THE Skill page Certification Model section (currently `bg-[#F8FAFC]`) SHALL use `bg-[#05070F]` with dark card surfaces
5. THE Skill page Internship section (currently `bg-[#F8FAFC]`) SHALL use `bg-[#05070F]`
6. THE Skill page Tools and Partner Companies sections (currently alternating `bg-white`/`bg-[#F8FAFC]`) SHALL use `bg-[#080B12]` and `bg-[#05070F]` respectively, with tool/company badges using `bg-[#0B1224] border-[#1F2937] text-slate-300`
7. THE Skill page Programs grid (inside the dark `bg-[#060B17]` section) card surfaces (currently `bg-white`) SHALL use `bg-[#0B1224] border-[#1F2937]` with `text-white` headings and `text-slate-400` body text
8. THE About page mission section list items (currently `text-gray-600`) SHALL use `text-slate-400` to maintain dark legibility
9. THE Contact page contact info value text (currently `text-gray-800`) SHALL use `text-slate-200` for legibility on dark

---

### Requirement 10: Grain Texture Overlay — Global Decoration

**User Story:** As a visitor, I want subtle film-grain texture on key sections, so the site has the tactile depth characteristic of premium NOIR design.

#### Acceptance Criteria

1. THE System SHALL add a grain noise overlay SVG (4×4 repeating noise pattern) defined in `globals.css` as a `noise-overlay` pseudo-element utility
2. THE Hero section SHALL have the grain overlay at 2–3% opacity
3. THE Stats section SHALL have the grain overlay at 3–4% opacity
4. THE Footer CTA banner SHALL have the grain overlay at 2% opacity
5. IF a section already has a `bg-grid-pattern` overlay, THEN THE System SHALL NOT additionally apply the grain overlay to avoid visual clutter

---

### Requirement 11: Typography — Editorial Spacing & Weight

**User Story:** As a visitor, I want headings and labels to feel bold, spaced, and editorial, so the design communicates confidence and sophistication.

#### Acceptance Criteria

1. THE `hero-headline` CSS class SHALL update `letter-spacing` to `-0.04em` (from `-0.03em`) for tighter display type
2. ALL section `h2` headings with class `font-display font-bold text-4xl md:text-5xl` SHALL maintain `letter-spacing: -0.02em` — THE System SHALL add `tracking-tight` where not already present
3. THE overline badge text inside `.badge` elements SHALL use `letter-spacing: 0.1em` (from `0.06em`) for a more editorial uppercase feel
4. THE `premium-btn` SHALL use `letter-spacing: 0.02em` for button label breathing room

---

### Requirement 12: No Content or Logic Changes

**User Story:** As a developer, I want the redesign to be purely visual so that no features, routes, data, or accessibility semantics are altered.

#### Acceptance Criteria

1. THE System SHALL NOT change any text content, labels, link `href` values, or data arrays in any component or page
2. THE System SHALL NOT add, remove, or reorder any HTML elements beyond those needed for decorative canvas/orb/grain layers
3. THE System SHALL NOT modify any API routes, server actions, database models, or form submission logic
4. THE System SHALL NOT change font families — Inter and Space Grotesk SHALL remain the typefaces
5. IF a decorative element is added (canvas, orb div, grain pseudo-element), THEN THE System SHALL mark it `aria-hidden="true"` and `pointer-events-none` to preserve accessibility and interaction
6. THE System SHALL preserve all existing Framer Motion animation triggers, variants, and `useInView` thresholds — only visual properties (colors, shadows, backgrounds) within animations MAY be updated
