# HotWax Hero Banner — HubSpot custom module

A drag-and-drop module. Editors set the card **images**, tab labels, copy, CTAs
and client logos from the sidebar — no code editing, and no fixed number of cards.

```
hotwax-hero.module/
├── meta.json      module metadata (label, allowed templates)
├── fields.json    the editor sidebar
├── module.html    HubL markup
├── module.css     all styling, scoped under .hws-hero
└── module.js      carousel controller
preview.html       local preview — not uploaded
```

## Upload

**With the HubSpot CLI** (recommended):

```bash
npm install -g @hubspot/cli
hs init                                   # once, to authenticate
hs upload hotwax-hero.module  "hotwax-hero.module"
```

**Or by hand:** Design Manager → *File* → *New file* → *Module*, tick the
templates it may be used on, then paste the contents of `module.html`,
`module.css` and `module.js` into the matching panes, and recreate the fields
using `fields.json` as the reference.

Then edit any page → drag **HotWax Hero Banner** in from the sidebar.

## The fields

| Group | What it controls |
|---|---|
| **Headline** | Line 1, line 2 (shown in the accent colour), and the sub-headline (rich text) |
| **Buttons** | Primary button text + link, secondary link text + link. Clear the text to hide either |
| **Showcase cards** | A repeater — one entry per card. Add, remove or reorder freely |
| **Client logos** | Section heading, plus a repeater of logos with optional links |
| **Animation & layout** | Seconds per card, pause-on-hover, full-width, 3D tilt, accent + text colours |

### Each showcase card

| Field | Notes |
|---|---|
| Tab label | Text shown in the tab strip, e.g. *Order Mgmt* |
| Tab icon | Optional, 16×16 SVG or PNG |
| **Card image** | The main graphic. Any dimensions |
| **Image fit** | `Fill` crops to fill the card — best for screenshots. `Fit` shows the whole image with padding — best for illustrations or transparent PNGs |
| **Floating info cards** | A repeater, up to 4 per card. See below |

### The floating info cards

These are the small cards that hover either side of the main graphic. They exist
to pull **one fact out of the graphic** — a screenshot is too dense to read at a
glance in a hero, so the chip says the thing you actually want remembered.

Each one has:

| Field | Notes |
|---|---|
| Side | Left or right of the main card |
| Content | **Typed info** (label / value / caption) or **an image** |
| Label · Value · Caption | e.g. `BROKERING` · `400/min` · `Routed to best node` |
| Image | Used instead of the typed fields when Content is set to image |
| Link | Optional — makes the whole chip clickable, e.g. to a doc or case study |

Prefer **typed info** over an image: it stays crisp on every screen, is
translatable, is readable by search engines and screen readers, needs no
redesign to edit, and costs no extra download. Use the image option only when
the thing you're showing is genuinely pictorial, like a chart fragment or a
signature.

Two per side is the practical maximum — they animate in one after another, and
past four they start to crowd the graphic. They're hidden below 768px, so never
put anything essential in them that isn't also on the card.

The card area is **690 × 420** (a 1.64:1 landscape box). Supplying images at
that ratio — 1380 × 840 for retina — means nothing gets cropped on `Fill`.
Anything else still works; `Fill` crops from the centre-top, `Fit` pads.

Adding a fifth card needs no code change: the tabs, progress bars, dots, timing
and the alternating 3D tilt are all derived from however many cards exist.

## Notes

- **Everything is scoped** under `.hws-hero`, so the module can't leak styles
  into your theme or be broken by it.
- **Full-width panel.** The showcase escapes HubSpot's page column using a
  viewport width measured in JS (not `100vw`, which overshoots by the scrollbar
  and causes a stray horizontal scrollbar). If the panel still doesn't reach the
  edges, an ancestor has `overflow: hidden` — either drop the module into a
  full-width section, or switch **Full-width showcase** off.
- **Accessibility.** Motion stops for anyone with *reduce motion* set, the
  rotation pauses on hover and on keyboard focus, and it doesn't run while
  scrolled out of view or while the tab is in the background.
- **Empty cards** show a dashed "Add an image" placeholder in the editor rather
  than collapsing, so a half-configured module is obvious.

## Local preview

`preview.html` renders the same markup and assets outside HubSpot, for checking
CSS/JS changes quickly:

```bash
cd hotwax-hero-banner && python3 -m http.server 8899
# open http://127.0.0.1:8899/hubspot/preview.html
```

It is a development aid only — don't upload it.
