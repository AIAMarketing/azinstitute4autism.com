# Cleanup Log

- Replaced HubSpot-generated wrappers, inline styles, scripts, analytics, and modules with reusable Astro components.
- Preserved canonical clean URLs while excluding local mirror query-string and AMP duplicates.
- Consolidated responsive `hs-fs` image variants to canonical `hubfs` assets where available.
- Excluded mirrored HubSpot CSS and JavaScript from the new public asset package.
- Self-hosted canonical images, SVGs, fonts, and PDFs from the mirror.
- Recreated navigation and footer from structured JSON.
- Recreated visible contact and consultation forms as static accessible HTML.
- Used the source palette: AIA blue `#254080`, dark blue, straw yellow, orange, and teal.
- Used locally mirrored Playfair Display headings, Lato body copy, and Caveat accent font.
- Added multilingual collection and route structure with Arabic RTL support.
- Kept all extracted source content editable as Markdown.
