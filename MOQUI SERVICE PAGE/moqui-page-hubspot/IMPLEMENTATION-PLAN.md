# Implementation plan: Moqui service page on HubSpot CMS

Sequenced plan for getting this package live. `README.md` is the how-to for
each step; this is the order, the checks, and what is still blocking.

Route: Design Manager, pasted by hand. The HubSpot CLI is not installed on the
build machine and this package no longer depends on it.

---

## Before you start

| Need | Why |
|---|---|
| HubSpot CMS Hub, Professional or Enterprise | Custom modules and coded files are not available on Starter |
| Design Manager access | Creating modules, templates and coded files |
| File Manager access | Client logos, hero background, brand lockups |
| A form or meeting URL for the CTAs | Four buttons and a form currently point at a placeholder, see Blockers |

Nothing in the plan needs a developer after step 4. Everything a marketer
changes afterwards is a module field.

---

## Phase 1: assets

Upload everything in `assets/` to the File Manager. Do this first, because the
module fields in Phase 5 point at these files.

Keep the folder split (`brand/`, `clients/`, `hero/`) so the logo wall stays
easy to manage as clients are added and removed.

**Check:** every file resolves on its HubSpot CDN URL before moving on.

---

## Phase 2: coded files

Create two coded files in the Design Manager:

1. `moqui-theme.css` from `css/moqui-theme.css`
2. `moqui-interactions.js` from `js/moqui-interactions.js`

Keep the `@import` on line one of the CSS. It pulls Montserrat and Playfair
Display, including **weight 300**, which the body copy depends on. Without it
the browser synthesises a light weight and the page looks subtly wrong.

**Check:** open the published CSS URL and confirm the first line is the import.

---

## Phase 3: modules

Create eight modules from `modules/`. For each: paste `module.html` into the
HubL pane, paste `fields.json` into the Fields code view, tick **Pages** as a
host template type, leave the per-module CSS and JS panes empty.

Attach the two coded files from Phase 2 **in one place only**, either on the
template or on the modules. Doing both serves the CSS twice.

Order does not matter, they are independent. Suggested order, simplest first,
so you find any paste mistakes early:

1. `moqui-marquee-belt` (1 field)
2. `moqui-testimonial` (3)
3. `moqui-intro` (4)
4. `moqui-hero` (8)
5. `moqui-why-hotwax` (14)
6. `moqui-proof-card` (12)
7. `moqui-faq-consultation` (16)
8. `moqui-bento-solutions` (17)

**Check per module:** it saves without a HubL error, and the Fields pane shows
the expected field count rather than an empty list.

---

## Phase 4: template

Create a page template from `templates/moqui-service-page.html`. Point its two
asset references at the coded files from Phase 2.

The template also carries the **JSON-LD structured data**. Read the FAQ note in
Blockers before publishing.

**Check:** preview renders all eight modules in order, top to bottom.

---

## Phase 5: page assembly

Create a page from the template, then fill in what only a human can:

- hero background image
- HotWax Commerce lockup on the proof card
- eight client logos on the logo wall, each with its shape setting
- testimonial logo
- real URLs on all four CTAs and the guide form

**Check:** no module shows an empty image frame. Images are guarded with
`{% if %}`, so an unset image renders nothing rather than a broken icon, which
means a missed one is silent. Check each deliberately.

---

## Verification before publishing

Run through this on the built page, not on a local file.

**Layout**
- [ ] No horizontal scrollbar at 360, 390, 768, 1024, 1440px
- [ ] Bento grid collapses to one column on mobile
- [ ] Proof card statistics stack rather than squash
- [ ] Logo wall shows four across at every width

**Behaviour**
- [ ] FAQ opens and closes on tap, not just on click
- [ ] Logo wall cycles, and holds while hovered
- [ ] Counters run once when the proof card scrolls into view
- [ ] Card hover lifts slightly, spotlight follows the cursor
- [ ] Guide banner text is white and legible on maroon

**Accessibility**
- [ ] One `<h1>`, section headings `<h2>`, card titles `<h3>`
- [ ] Every image has meaningful alt text, decorative ones empty
- [ ] Keyboard: tab reaches every CTA and FAQ question, focus is visible
- [ ] With reduced motion on in the OS, parallax, counters and the logo cycle
      all stop, and the page is still fully readable

**Content**
- [ ] FAQ answers on the page match the JSON-LD in the template, word for word
- [ ] No em or en dashes anywhere
- [ ] American spelling throughout

---

## Blockers, resolve before go-live

These are not build problems. They need a decision or an asset.

| # | Blocker | Owner | Notes |
|---|---|---|---|
| 1 | **CTA links point at `/connect/`** | Marketing | Two placeholder links plus the guide form. Every one needs a real meeting or form URL. |
| 2 | **Guide form posts to a placeholder** | Marketing | `action="/connect/"` with `method="get"`. Replace with a real HubSpot form, and confirm the architecture guide it promises actually exists. |
| 3 | **Testimonial attribution** | Legal / Client | Quote is attributed to Steve Madden. Confirm it is approved for publication, or pull the section until it is. |
| 4 | **Client logo permission** | Legal | Eight logos on the wall. Confirm publication rights for each. |
| 5 | **AI and MCP claims** | Product | The AI and Agentic Workflows card describes MCP server capability. Confirm it reflects shipped client work. |
| 6 | **Warby Parker logo asset** | Design | Renders as a near blank pale box at wall size. Needs replacing. |
| 7 | **Hero background** | Design | Optional. Compress before upload; it roughly triples page weight. |

Items 1 and 2 are hard blockers: the page cannot convert without them.
Items 3, 4 and 5 are legal and accuracy risks. Item 6 is cosmetic.

---

## Rollback

Every phase is reversible and nothing overwrites existing content.

- Modules and templates are versioned in the Design Manager; revert from the
  version history on any file.
- The page is unpublished until you publish it, so Phase 5 is safe to redo.
- Coded files can be reverted independently of the modules, since the modules
  only reference class names.

If a module fails to save, the paste is the cause, not the package. Every file
here is validated: JSON parses, HubL blocks balance, no CLI-only paths.

---

## Keeping it in step afterwards

`../moqui-page/` is the reference implementation. After changing it:

1. copy `styles.css` into `css/moqui-theme.css`, keeping the `@import` line
2. copy `script.js` into `js/moqui-interactions.js`
3. re-paste both coded files in the Design Manager

Module markup uses the same class names as the page, so a CSS or JS change
needs no HubL change.

**One thing that will drift silently.** FAQ answers now live in three places:
the page accordion, the page JSON-LD, and the HubSpot module. `build.py`
checks the first two against each other and refuses to build if they disagree.
Nothing checks the third. Change an answer in HubSpot and you must change it in
the source page too, or the structured data will describe a page that no
longer exists.
