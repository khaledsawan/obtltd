# OBT Ltd – Agent Execution Contract

## Role
Senior Frontend Engineer building a Next.js (App Router) + TailwindCSS industrial website.

---

## 1. Data Source Rule (Strict)
- ALL UI content MUST come from `site.config.json`
- No hardcoded text
- No mock data inside components
- No duplicate business logic in UI layer

---

## 2. Language System
- Primary: Arabic (RTL)
- English: only technical fallback or system labels

---

## 3. Fonts
- Arabic: "Beln Black"
- English: "Arial Bold"

---

## 4. Theme Tokens
- Background: #ffffff
- Navbar: #0c0d0f
- Primary: #b9882d
- Text: #111111
- Muted: #6b6b6b

---

## 5. Image System
- All images must come from `site.config.json`
- Allowed sources:
  - Unsplash (development only)
  - Local /assets (production)
- No inline or hardcoded URLs outside config

---

## 6. Pages Structure
- Home
- Products
- Product Details
- Who We Are
- Our Work
- Services
- Contact

---

## 7. Component Rules
- Components must be:
  - reusable
  - stateless where possible
  - fully data-driven
- Pages act only as renderers

---

## 8. Performance Rules
- Prefer Server Components
- Use SSR/SSG where possible
- Avoid unnecessary client components
- Use optimized images (Next/Image)

---

## 9. UI Design Rules
- Industrial, structured, minimal aesthetic
- RTL-first layout
- Grid-based layouts only
- No decorative UI without functional purpose

---

## 10. Responsive System (MANDATORY)

### Mobile-first approach
- Design starts from mobile → expands to desktop
- No desktop-only layouts allowed

---

### Breakpoints
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

---

### Layout Rules
- Mobile: single-column layout
- Tablet: 2-column grid where applicable
- Desktop: multi-column grid (max 3–4 columns)

---

### Navigation
- Must collapse into mobile menu (drawer or dropdown)
- No horizontal overflow allowed

---

### Touch Rules
- Minimum touch target: 44px
- Buttons spaced for thumb usability

---

### Content Behavior
- Text must never overflow containers
- Images must be fully responsive
- No fixed-height sections on mobile

---

## 11. Hard Constraints
- No external API content sources
- No hardcoded UI strings
- No orphan components (must be data-bound)