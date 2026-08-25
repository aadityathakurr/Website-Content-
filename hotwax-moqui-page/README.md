# HotWax Systems — Moqui solutions page

Full-page replacement for `hotwaxsystems.com/services/moqui-framework-development/`.
Plain HTML/CSS/JS, no build step, no dependencies. **Body only** — the site header
and footer are managed separately and are deliberately not included.

```bash
cd hotwax-moqui-page
python3 -m http.server 8899
# open http://127.0.0.1:8899/
```

## Positioning

The page sells **what HotWax builds with Moqui**, not Moqui itself. The framework
explainer is compressed into one dark band mid-page; the top of the page is proof
and solutions. Roughly 70/30 HotWax to Moqui.

## Design

| Source | What was taken |
|---|---|
| Shopify Editions Winter '26 | Editorial dark hero slab, oversized display type, band rhythm, sticky tab nav, mono eyebrow labels |
| Chargebee | Clean white/tint alternating bands, card grids, restrained single-accent CTAs, stat strip, quote block, logo chips |
| hotwaxsystems.com | Brand tokens and the pill button with sliding arrow |

Tokens taken from the live hotwaxsystems.com theme CSS:
primary `#e70000`, heading maroon `#8c1c24`, deep red `#9f2d26`,
slate `#27323e`, coral `#ef6b51`, tint `#fdeceb`.
Buttons follow the live theme: 8px radius, Playfair Display 600,
15px 30px padding, `0 4px 8px rgba(140,28,36,.16)` shadow.
Type: Playfair Display (hero headline) / Montserrat (all other copy) /
JetBrains Mono (small uppercase labels).

## Page structure

1. **Hero** — headline, two line subline, single CTA
2. **Capability marquee** — infinite keyword ticker
3. **Intro** — heading left, explanation right
4. **What is Moqui + what we build** — definition, then six solution cards in a
   bento grid with mixed widths, each card sized to its own content
5. **The problem** — packaged ERP vs building from scratch
7. **Applications** — Marble ERP, HiveMind, POP REST Store, POP Commerce
8. **HotWax Commerce proof card** — logo, real throughput metrics, links to hotwax.co
9. **Inside the framework** — the four layers, plus the CC0 licence note
10. **Why HotWax** — credentials, six count-up stats, client logo marquee
11. **Testimonial** — **placeholder, needs a real approved quote**
12. **FAQ + CTA** — two equal-height columns

HotWax capability now sits directly under the framework explanation, so a visitor
reaches what we build and why it matters before any product or proof detail.

## Motion

All animation is transform/opacity only, GPU-composited, rAF-batched.

| Effect | Technique |
|---|---|
| Order-orchestration diagram | SVG with CSS `offset-path` packets, animated `stroke-dashoffset` wires, radar-pulse core rings, staggered node glow |
| Hero / band backgrounds | Three drifting blurred radial blobs, panning grid, SVG grain overlay |
| Scroll reveal | IntersectionObserver, staggered via `--d` custom property |
| Headline entrance | Per-line `overflow:hidden` mask with translate |
| Stat counters | `easeOutExpo` count-up on scroll into view |
| Marquees | Duplicated track, CSS `translate3d(-50%)`, paused on hover |
| Card spotlight | Cursor-tracked radial gradient via `--mx` / `--my` |
| Grid parallax | `data-parallax` rate, single rAF-batched scroll loop |
| Scroll progress | Fixed gradient bar |
| Live ticker | Order counter increments while visible, pauses on tab blur |

**Safety:** three layers ensure content is never trapped behind an animation —
a `<noscript>` override, a `.no-js` class hook, and a JS sweep on every scroll
tick that reveals anything at or above the fold. `prefers-reduced-motion: reduce`
disables every animation, hides the travelling packets and stops both marquees.

## SEO / AEO

- `<title>`, meta description, canonical and Open Graph tags
- One `<h1>`; strict `h1 → h2 → h3` hierarchy
- JSON-LD `@graph`: `Service` (+ seven-item `OfferCatalog`), `FAQPage`, `BreadcrumbList`
- FAQ answers duplicated verbatim in the JSON-LD so crawlers and answer engines
  see identical text
- Semantic comparison `<table>` with `<caption>` and `scope` — the most
  extractable block on the page for LLM answer synthesis
- Definitional first sentences in bold, positioned for featured snippets and AI overviews
- Internal links to `/services/apache-ofbiz-development-and-consulting/` and `/connect/`

### Keyword targeting

`moqui` alone is contaminated by "moqui marbles" (Utah geology) — zero commercial
intent, KD 51. Branded Moqui terms are targeted for easy wins; traffic comes from
the adjacent ERP terms.

| Cluster | Terms | Where used |
|---|---|---|
| Branded (KD 0–5) | moqui development, moqui consulting, moqui support, moqui solutions, moqui framework, moqui erp | H1 area, title, nav, FAQ |
| Primary commercial | custom erp development (720), erp consulting services (1,000), enterprise application development services (1,900), erp development services (590) | Hero sub, solutions, engagement |
| High-CPC integration | netsuite integration services ($33 CPC), erp integration services ($24) | Solution cards 03/04, FAQ |
| Modernisation | erp modernization, legacy erp migration, composable erp, mach architecture (880) | Problem band, solution 04, engagement 03 |
| Order management | open source order management system, custom order management system, headless erp | Proof card, solution 01 |

## Before publishing

- [ ] Replace the placeholder testimonial with a real, approved client quote
- [ ] Confirm the AI/MCP claims in solution card 06 reflect shipped work (hotwax.co lists
      "MCP Server technology" as a product capability, which supports the claim)
- [ ] Confirm HotWax Commerce can be referenced this prominently on the Systems domain
- [ ] Confirm the named brands and throughput figures in the proof card are still current
      (sourced from hotwax.co)
- [ ] Verify the 50+ client figure against the homepage counter
- [ ] Point CTA hrefs at the real HubSpot contact URLs
- [ ] Confirm published permission for each client logo in the marquee
- [ ] Port to a HubSpot module (see `../hotwax-hero-banner/hubspot/` for the pattern)

## Scope notes

Deliberately excluded per brief: the framework's launch date and its creator's
name. The OFBiz architectural lineage is retained without either — it remains the
strongest credibility signal on the page.
