# OBT Ltd Website

Next.js App Router website for OBT Ltd with a strict JSON-driven architecture.

## Core Rules

- All business content comes from `site.config.json`
- Components stay reusable and presentational
- Arabic RTL is the primary experience
- Mobile-first responsive layouts only
- Local `/public/assets` media is the default production source

## Structure

- `app/`: routes, metadata, sitemap, robots
- `components/`: layout, shared UI, cards, page sections
- `lib/config.ts`: typed config accessors, metadata helpers, route helpers
- `site.config.json`: single source of truth for content, SEO, navigation, products, services, work, footer
- `public/assets/`: local branding, icons, and industrial visuals

## Development

```bash
cmd /c npm run dev
cmd /c npm run lint
cmd /c npm run build
```

Development note:

- `npm run dev` uses `webpack` instead of Turbopack because Turbopack was spawning an excessive number of Node.js worker processes on this Windows environment and exhausting memory.

## Notes

- `next.config.ts` pins `turbopack.root` to this repository to avoid incorrect root inference on Windows environments with multiple lockfiles.
- Beln Black is referenced as the primary Arabic font token. If an actual licensed font file becomes available, add it under `public/assets/fonts` and wire it into the global stylesheet.
