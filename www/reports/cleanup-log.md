# Cleanup Log

- Replaced HubSpot-generated wrappers, inline styles, scripts, analytics, and modules with reusable Astro components.
- Preserved canonical clean URLs while excluding local mirror query-string and AMP duplicates.
- Consolidated responsive `hs-fs` image variants to canonical `hubfs` assets where available.
- Excluded mirrored HubSpot CSS and JavaScript from the new public asset package.
- Self-hosted canonical images, SVGs, fonts, and PDFs from the mirror.
- Recreated navigation and footer from structured JSON.
- Recreated visible contact and consultation forms as static accessible HTML.
- Used the source palette: AIA blue `#254080`, dark blue, straw yellow, orange, and teal.
- Used the live site's locally mirrored Playfair Display headings, Rubik body copy, and Caveat accent font.
- Added multilingual collection and route structure with Arabic RTL support.
- Kept all extracted source content editable as Markdown.
- Replaced the initial generic rounded-card visual system with live-derived
  `980px` content widths, compact `4px` controls, alternating cream/white
  sections, navy skill band, source imagery, and the live header/footer
  hierarchy.
- Rebuilt the homepage in the live section order and rebuilt shared service,
  library-index, and blog-post families against live public references.
- Reused the same complete live-derived homepage layout for English and Spanish.
- Replaced the extracted linear team article with a dedicated live-derived team grid.
- Repaired mirror-rewritten PDF, lightbox, CTA, and relative content links.
- Limited language-switcher choices to translations that have generated routes.
- Verified and implemented the current production likes/views API contract.
- Recovered 18 live page-banner assets that the wget mirror missed because
  HubSpot injected them through malformed inline `background-image` styles.
- Restored the live library banner and consultation form section background.
- Added a mapped-page-imagery audit to prevent missing visual assets from
  silently passing the source link audit.
- Removed duplicated article titles, author/date blocks, and featured images
  from all 65 blog Markdown bodies; these elements are rendered by the shared
  blog-post layout. Updated both extractors and added a blog-content audit to
  prevent recurrence.
- Converted 19 FAQ-bearing blog posts to MDX and restored a reusable
  `FAQAccordion.astro` component that owns the live-style accordion and
  matching `FAQPage` JSON-LD.
- Restored 32 blockquotes across 15 English and Spanish blog posts, including
  source emphasis, links, and the self-hosted quote-mark decoration; fixed
  fallback extraction to preserve them.
- Added language-qualified content collection IDs to prevent English, Spanish,
  and Arabic entries with the same slug from overwriting each other.
