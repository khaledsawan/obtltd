# OBT Ltd – Architecture & Design System

---

## System Overview
A JSON-driven industrial catalog platform built with Next.js App Router.

All UI is derived from `site.config.json`.

---

## 1. Design Philosophy

- Industrial identity
- High trust visual system
- Minimal UI noise
- Structured layout hierarchy
- Function-first design

---

## 2. Design Tokens

### Colors
- Primary: #b9882d
- Navbar: #0c0d0f
- Background: #ffffff
- Text: #111111
- Muted: #6b6b6b

---

### Typography
- Arabic: Beln Black
- English: Arial Bold

---

## 3. Layout System

### Grid System
- 12-column grid (desktop)
- Fluid grid (mobile/tablet)
- No fixed-width layouts

---

### Spacing System
- 4px base scale
- Consistent vertical rhythm across sections

---

## 4. Data Architecture

### Source of Truth
- site.config.json only

### Structure Rules
- grouped by domain:
  - ui
  - assets
  - company
- avoid deep nesting unless necessary

---

## 5. Content Model Rules

### Products
Must include:
- title
- description
- images[]
- features OR uses

---

### Services
Must include:
- title
- image

---

### Assets
- logos, icons, images stored under assets
- no external uncontrolled dependencies

---

## 6. UI Behavior System

### Navigation
- static structure
- RTL alignment
- collapses on mobile

---

### Pages
- Pure render layers
- No business logic inside pages
- No data transformation inside components

---

## 7. Responsive Design System (MANDATORY)

### Philosophy
Mobile-first system. Desktop is an enhancement layer.

---

### Behavior Rules

#### Mobile
- single column layout
- stacked components
- simplified navigation

#### Tablet
- 2-column layouts where relevant
- hybrid navigation behavior

#### Desktop
- full grid system (up to 3–4 columns)
- expanded spacing

---

### Typography Rules
- No overflow on small screens
- Headings must scale responsively
- Maintain readable line-height across devices

---

### Image System
- Fully responsive images
- No fixed height containers on mobile
- Use cover/contain appropriately per context

---

## 8. Performance Strategy

- Prefer SSR/SSG
- Cache config layer
- Avoid unnecessary client hydration
- Optimize images aggressively

---

## 9. Scaling Rule

- Logic → /lib
- UI → /components
- Data → site.config.json

No mixing layers.