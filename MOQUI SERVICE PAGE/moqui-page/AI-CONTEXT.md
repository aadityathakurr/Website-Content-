# AI CONTEXT: HotWax Systems Moqui service page

Read this before editing anything. It records the rules this page was built to,
so an edit does not quietly undo a decision that was made deliberately.

## What this is

A replacement for `hotwaxsystems.com/services/moqui-framework-development/`.
Plain HTML, CSS and JavaScript. No build step, no framework, no dependencies.
It is the page body only: the site header and footer are managed separately in
HubSpot and must not be added here.

## Two pages

This project now holds two pages that share one design system.

`index.html` is the service page. It carries the organic ranking, and its
`<h1>` is fixed for that reason.

`landing.html` is a conversion page for campaign and paid traffic, built to
the landing page framework: who it is for, what it is and the big result all
answered above the fold, then money shot, proof, repeated calls to action,
the problem validated and agitated, capabilities paired with their benefits,
case studies, and a closing call to action. It reuses `styles.css` and
`script.js` unchanged and adds `landing.css` and `landing.js` on top.
**Read `LANDING-PAGE.md` before editing it.**

Every hard rule below applies to both pages, and `build.py` enforces them on
both.

## Files

| File | Role |
|---|---|
| `index.html` | Service page markup and the JSON-LD structured data |
| `landing.html` | Conversion page markup and its own JSON-LD |
| `landing.css` | Conversion page styles, additive over `styles.css` |
| `landing.js` | Conversion page money shot reveal and sticky CTA |
| `landing-standalone.html` | Generated single file build. **Do not edit.** |
| `styles.css` | All styling |
| `script.js` | Scroll reveal, count-up stats, marquees, spotlight, FAQ |
| `assets/` | Client logos, HotWax Commerce logo, hero panel SVG |
| `preview-standalone.html` | Generated single file build. **Do not edit.** |
| `build.py` | Regenerates `preview-standalone.html` from the three source files |

Run it with `python3 -m http.server 8000` and open `http://localhost:8000`.

## Hard rules

1. **No em dashes or en dashes anywhere.** Not in copy, not in code comments.
   Use a comma, a full stop or a colon and rewrite the sentence so it reads
   naturally. Do not swap the character for a hyphen.
2. **American spelling**, matching hotwax.co: fulfillment, license, catalog,
   modeling, organizations, authorization, optimize.
3. **Do not name the Moqui founder or any founding year.** This was an explicit
   client instruction. The Apache OFBiz architectural lineage may be referenced
   without either.
4. **One `<h1>` only**, in the hero.
5. **FAQ answers appear twice**, in the accordion and in the JSON-LD. If you
   change one, change the other so the text matches exactly.
6. **Hyphens inside compound words are correct** and must stay: multi-tenant,
   order-to-cash, open-source, AI-ready, ship-from-store.

## Design tokens

Taken from the live hotwaxsystems.com theme CSS, not invented.

```
--orange   #e70000   primary, buttons and accents
--maroon   #8c1c24   every heading, and the card hover fill
--deep-red #9f2d26   eyebrow labels and inline links
--ink      #212429   strongest body text
--ink-soft #4b5259   standard body text
--slate    #27323e   pull quote
--tint     #fdeceb   icon tiles
--line     #e0e3e5   borders
```

Type: **Playfair Display** for every heading, **Montserrat** for everything
else. Both are loaded by the live site already. Body copy is weight 500.
Buttons are 8px radius, Montserrat 13px bold uppercase, letter-spacing .06em.

Page background is flat white throughout. The hero is the only section allowed
a background treatment.

## Page structure

1. Hero: h1, two line subline, one CTA
2. Capability marquee
3. Intro: heading left, explanation right
4. What is Moqui, then the solutions grid
5. The problem
6. Inside the framework: the four layers
7. Applications: Marble ERP, HiveMind, POP REST Store, POP Commerce
8. HotWax Commerce proof card
9. Why HotWax: credentials, stats, client logos
10. Testimonial
11. FAQ and CTA, two equal height columns

## The solutions grid

Six cards, three columns by two rows, all the same size. Copy is levelled to
about 28 words per card so both rows sit even. If you rewrite a card, keep it
near that budget or the row it sits in will grow and leave the others hollow.

## Card hover

White card, maroon heading, grey body at rest. On hover the card fills
`#8c1c24`, all text goes white, the icon tile inverts to white and rotates
minus 8 degrees while the glyph counter rotates plus 8, and the index becomes a
white pill. All colour transitions are `.3s ease`; motion uses a spring curve.

## Verified facts

From moqui.org: 390 Mantle entities, 400+ REST endpoints, ~25MB core, 1GB
minimum RAM, CC0 1.0 licence. Marble ERP 277 screens and 885 forms. POP
Commerce 251 screens and 823 forms.

From hotwax.co: 3,500+ orders downloaded per minute, 400+ orders brokered per
minute, 35,000+ inventory updates per hour. Named brands Steve Madden, Perry
Ellis, Kurt Geiger, Dolce Vita, Cariuma.

Do not invent numbers. If a figure is not in this list, check the source first.

## Still outstanding

- [ ] The testimonial is a **placeholder**. It needs a real approved quote.
- [ ] Confirm the AI and MCP claims describe shipped client work.
      hotwax.co lists "MCP Server technology" as a product capability.
- [ ] Confirm publication permission for each client logo.
- [ ] CTA links point at `/connect/`, a placeholder. Swap for real HubSpot URLs.
- [ ] The hero can take a background image at `assets/hero/hero-bg.jpg`.
      The markup and scrim are already in place; the file is simply absent, and
      the `onerror` handler removes the img so nothing breaks without it.
- [ ] Compress any hero image before publishing. It will roughly triple the
      size of the standalone build.

## SEO and AEO

`moqui` as a search term is contaminated by "moqui marbles", a Utah rock
formation, so branded terms are cheap to win but carry no traffic. The page
targets adjacent commercial terms instead: custom erp development, erp
consulting services, enterprise application development services, netsuite
integration services, erp modernization, headless erp, open source order
management system.

The h1 keeps the exact phrase "Moqui Development, Consulting and Support"
because the live URL already ranks for it. Do not change it without checking
the ranking impact.

JSON-LD carries Service with an OfferCatalog, FAQPage and BreadcrumbList.
Validate it after any edit: `python3 -c "import json,re;[json.loads(m) for m in
re.findall(r'<script type=\"application/ld\\+json\">(.*?)</script>',
open('index.html').read(), re.S)]"`

## Checks to run after editing

```bash
grep -c '—' index.html styles.css script.js     # must be 0 everywhere
python3 - <<'PY'
h = open('index.html').read()
print('sections', h.count('<section'), h.count('</section>'))
print('divs', h.count('<div'), h.count('</div>'))
print('h1', h.count('<h1'))
PY
node --check script.js
python3 build.py                                 # regenerate the standalone file
```
