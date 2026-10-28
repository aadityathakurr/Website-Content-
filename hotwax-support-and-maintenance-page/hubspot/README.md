# HubSpot modules: Apache OFBiz Support page

Each section of the page is its own editable HubSpot custom module. Each module has the standard five files:

| File | What it holds |
|---|---|
| `module.html` | HubL + HTML. Reads every text, link, image, color and size from the fields |
| `module.css` | Styles scoped to the module's own class prefix (`.hwx-…`), so they don't clash with the theme |
| `module.js` | Behaviour (empty when the section needs none) |
| `fields.json` | The editor fields marketers see in the page editor (Content tab + Style tab) |
| `meta.json` | Module label, where it can be used (pages and landing pages) |

## Modules

| Module name in HubSpot | Folder | Section | Status |
|---|---|---|---|
| S&M Banner | `SM-Banner.module` | Banner (hero) | Ready |
| S&M Problem | `SM-Problem.module` | "Who is looking after it?" + problem points | Ready |
| S&M Services | `SM-Services.module` | 8 support services; one line + "Know more" on phones | Ready |
| S&M CTA | `SM-CTA.module` | "Talk to an Apache OFBiz Expert" email bar | Ready |
| S&M Team | `SM-Team.module` | Apache OFBiz team intro + 3-card person carousel | Ready |
| S&M How It Works | `SM-How-It-Works.module` | 4 support steps + "Switching from another vendor?" line | Ready |
| S&M Comparison | `SM-Comparison.module` | Options table; card per row on phones | Ready |
| S&M Testimonials | `SM-Testimonials.module` | Featured quote + stack, case studies link | Ready |

Page order: Banner, Problem, Services, CTA, Team, How It Works, Comparison, Testimonials, (Contact form and FAQ). The client logo strip is no longer part of this page.

## Installing a module

**With the HubSpot CLI (recommended)**

```bash
hs upload "SM-Banner.module" "ofbiz-support/SM-Banner.module"
```

Uploading publishes to a live portal, so check the target account and the exact files before every upload.

**By hand in Design Manager**: Marketing > Files and Templates > Design Tools > File > New file > Module (Pages). Paste each file into the matching pane (HTML + HubL, CSS, JS). Add the fields shown in `fields.json`, or upload the folder through the CLI to get them all at once.

## S&M Banner: after installing

1. Upload `hero-warehouse-banner.jpg` (this folder) to File Manager.
2. On the page, select the banner module > Background > Background image, choose the uploaded image. You can also set it as the module default in Design Manager so every new copy has it.
3. Leave the heading level on H1; it is the page's only H1.
4. The button links to `#talk` (the contact section). Change it in Button > Button link.

Editable from the page editor: eyebrow (off by default; switch on to show "Apache OFBiz® Support and Maintenance" above the headline), headline in three parts (before / highlight / after), subheadline (rich text), button (on/off, text, link, new tab, arrow), proof line (on/off, text, hide on phones), background image, focus point and overlay strength. Style tab: alignment, desktop height, content width, colors (text, highlight, button, button text, fallback background, proof line), proof line opacity (default 62%), load animation, font loading. The load animation ends at each line's own opacity, so the eyebrow, subheadline and proof line stay as soft as set.

## S&M Problem: after installing

Nothing to upload. Place it directly under S&M Banner.

Editable from the page editor: headline, the words that change color on hover (comma separated, e.g. `Apache OFBiz, ?`), heading level, lead line ("Sound familiar?"), key message (rich text, on/off, red line on/off), problem points (add, remove, drag to reorder, up to 10), section anchor ID (default `problem`). Style tab: two columns or stacked, point icon (hexagon, check, dot, none), space above and below, content width, column gap, seven colors, hover effects, reveal on scroll, font loading.

## S&M Services: after installing

Nothing to upload. Place it directly under S&M Problem, followed by S&M CTA.

Editable: headline, words that change color on hover (default "one team"), heading level, intro (rich text), services (repeater: icon from 8 built-in icons, a custom image or none; title; description; up to 16), phone view (one line + "Know more" on/off, both link texts), section anchor ID (default `services`). Style tab: 2, 3 or 1 columns on desktop, space above and below, content width, nine colors (including the icon lines, hexagon fill and outline), hover effects, reveal on scroll, font loading.

On phones each description shows one line with **Know more**; tapping it shows the full text (the link becomes **Show less**) and the service icon pops and stays tilted until it is closed. On desktop every description is shown in full.

## S&M CTA: after installing

1. In HubSpot, create a form (Marketing > Forms) with one Email field: label `Work email`, placeholder `Email Address`, submit button text `Submit`. Turn off the form's own styling if the theme adds any.
2. On the page, select the S&M CTA module > Form, pick that form, and set the thank-you message or a redirect.
3. Until a form is picked, the module shows a look-alike form only inside the editor; the live page shows no form, so no visitor can submit into nothing.

Editable: title, heading level, description (rich text), form, thank-you message or redirect, hide labels, section anchor ID. Style tab: space above and below, width, corner radius, ten colors plus description opacity, button capitals, card shadow, reveal on scroll, font loading.

The CSS styles standard HubSpot form markup (`.hs-form`, `.hs-input`, `.hs-button`). Forms built in HubSpot's newer form editor use different markup; inputs and the button still pick up the colors, but check the one-row layout after picking the form.

## S&M Team: after installing

1. Upload the nine photos in `team-photos/` to File Manager (one folder, e.g. `ofbiz-support/team`).
2. On the page, open S&M Team > Team members and pick each person's photo. Names, roles, titles and LinkedIn links are already filled in. Mridul Pathak has no LinkedIn link yet, so his card shows no button until one is added.
3. Until a photo is picked, that card shows the person's initial instead of a broken image.

Layout: kicker and headline on the left with the intro and credential points on the right; below them a row of portrait person cards (3 at a time by default, at most 2 on tablets, 1 on phones) that moves one card at a time in an endless loop, with arrows (tablets and desktop), auto-advance that pauses while the cursor is on a card, and swipe. On phones the intro line is hidden by default so the cards come sooner.

Editable: kicker, headline, words that change color on hover (empty by default), heading level, intro (rich text), hide intro on phones (on by default), credential points (repeater, bold supported), team members (repeater: photo, Apache role, highlight role on/off, name, job title, LinkedIn URL; add, remove, drag to reorder, up to 20), carousel behavior (cards visible at once 4, 3, 2 or 1; auto-advance on/off; seconds per card, default 4; arrows; swipe), section anchor ID (default `team`). Style tab: space above and below, content width, card height (default 540px), photo focus point, black and white photos (color on hover), colors, reveal on scroll, font loading.

Keep each Apache role exactly as apache.org lists it.

On phones the arrows are hidden: people swipe, the cards auto-advance, and **tapping anywhere on a photo opens that person's LinkedIn** (a swipe never does), On every screen a red **View profile →** link under the job title opens the person's LinkedIn (text editable in *LinkedIn link text*, color in *"View profile" link*); people without a LinkedIn URL show no link. Auto-advance pauses only while the cursor is on the card.

## S&M How It Works: after installing

Nothing to upload. The closing link points to `#talk` (the contact section).

Editable: headline, words that change color on hover (default "HotWax"), heading level, intro (rich text), steps (repeater: optional custom number, title, rich text; add, remove, drag to reorder, up to 8), closing line (on/off, text before, link text, link, text after), section anchor ID (default `how`). Style tab: steps per row on desktop (4, 3 or 2), number style (solid by default, outline, none), phone carousel on/off, auto-slide on/off and seconds per step, space above and below, content width, nine colors, hover effect, reveal on scroll, font loading.

On phones the steps show **one full card at a time** and loop in one direction: after the last step the first slides in from the right, before the first the last slides in from the left (no rewind). Swipe to move, or let it auto-slide (every 5 seconds by default, paused while touched); there are no arrow buttons on phones. The card in view gets the full red line.

## S&M Comparison: after installing

Nothing to upload.

Editable: headline, words that change color on hover (empty by default), heading level, intro, the four column headings, rows (repeater: what matters, alternative 1, alternative 2, HotWax; up to 12), phone view (short names for the two alternatives, default "Your own team" and "Generalist vendor"), section anchor ID (default `compare`). Style tab: space above and below, content width, twelve colors, row hover, reveal on scroll, font loading.

On phones each row becomes a card: both alternatives side by side first, then the HotWax answer in a highlighted box with a solid hexagon. Every answer is visible, so there is nothing to tap.

## S&M Testimonials: after installing

Optional: upload square headshots (at least 104 x 104 px) and pick them per testimonial; without one, the initials are shown.

Editable: headline (empty hides it), words that change color on hover (default "IT leaders"), heading level, optional intro, testimonials (repeater: quote, name, title and company, headshot, initials; up to 9), closing line (on/off, text, link text, link, default the industry case studies page), phone carousel (on/off, auto-slide on/off, seconds per card), section anchor ID (default `voices`). Rotating cards (desktop): with the Featured layout and more than three testimonials, the cards beside the featured one show two at a time and change automatically (seconds per pair, default 6); the cursor over the testimonials pauses it and it resumes when the cursor leaves, and the cards keep the height of the longest testimonial so the featured card never stretches. Style tab: desktop layout (featured card + stack, or even grid), space above and below, content width, fourteen colors, lift on hover, reveal on scroll, font loading.

On phones every testimonial uses the maroon featured-card colors and they show **one full card at a time**, looping in one direction (no rewind from the last card to the first): swipe and auto-slide, which pauses while the visitor touches the cards. There are no arrow buttons on phones.

## Theme link colors

HubSpot themes usually color every link blue (`a:link`, `a:visited`). Each module that has links ends its `module.css` with a short **theme guard** block that keeps its own link and button colors in every state (normal, visited, hover, focus, pressed), so the banner button stays white, the LinkedIn icon stays white, and the red text links stay red. The colors still come from each module's color fields. If a link ever shows in the theme color, re-paste that module's latest `module.css`.

## Previews

`preview-SM-<Section>.html` files render one module with its default values; `preview-all.html` renders every finished module in page order. They are for checking only. Don't upload them.

## Heading words that change color on hover

Seven modules (Problem, Services, How It Works, Comparison, Team, Testimonials, CTA) let you pick any words in the headline that change color while the cursor is over the section. It works the same way in each module, so it keeps working when you rewrite the headline:

1. **Brackets in the headline:** type `[ ]` around the words, for example `Support from [the people] who maintain the platform.` The brackets are not shown on the page.
2. **Or the "Words that change color on hover" field** (right under the headline): comma separated, any letter case, for example `hotwax, one team`. A word that is not in the headline is simply ignored.

The color is set in **Style > Colors > "Heading words on hover"** (Problem: "Headline words on hover"). The default is red `#E70000`; on the CTA it is light orange `#FFB38A` because red would not show on the maroon card. It only runs on devices with a mouse, so phones always show the plain headline. Leave both empty for no effect.

## Naming rule

Every module for this page is named `S&M <Section>` in HubSpot (S&M = Support and Maintenance), for example `S&M Banner`. Folders use `SM-<Section>.module` because `&` breaks file paths and CLI uploads.
