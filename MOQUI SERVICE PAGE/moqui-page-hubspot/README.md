# HotWax Systems, Moqui Service Page: HubSpot CMS package

Eight custom modules, one page template and a shared stylesheet and motion
script, matching the page in `../moqui-page/`.

Everything a marketer needs to change is a module field. No HubL editing is
required to swap copy, links, logos, statistics, FAQ entries or images.

```
moqui-page-hubspot/
├── theme.json
├── templates/moqui-service-page.html    page template, wires the 8 modules in order
├── css/moqui-theme.css                  all styling, plus the Google Fonts import
├── js/moqui-interactions.js             scroll reveal, counters, marquee, logo wall, FAQ
├── assets/                              source images, upload these to the File Manager
└── modules/
    ├── moqui-hero.module
    ├── moqui-intro.module
    ├── moqui-marquee-belt.module
    ├── moqui-bento-solutions.module
    ├── moqui-proof-card.module
    ├── moqui-why-hotwax.module
    ├── moqui-testimonial.module
    └── moqui-faq-consultation.module
```

## Deploying by hand through the Design Manager

This package is set up for pasting into the Design Manager rather than the
CLI. Nothing references a local file path, so nothing breaks on upload.

**1. Upload the images first.**
Marketing, Files and Templates, Files. Upload everything in `assets/`. You will
point module image fields at these, so do this before step 4.

**2. Create the coded files.**
Design Manager, File, New file, CSS. Name it `moqui-theme.css` and paste the
whole of `css/moqui-theme.css`. Repeat for JavaScript as
`moqui-interactions.js` from `js/moqui-interactions.js`.

**3. Create the modules.**
For each folder in `modules/`, Design Manager, File, New file, Module. Tick
**Pages** under where it can be used, and name it the same as the folder
without `.module`. Then:

- paste `module.html` into the HTML and HubL pane
- open the Fields pane, switch to the code view, and paste `fields.json`
- leave the module CSS and JS panes empty, the shared files cover them

Attach the two coded files from step 2 to each module under **Linked files**,
or once to the template, whichever your setup prefers. Do it in one place only
so the CSS is not served twice.

**4. Create the template.**
Design Manager, File, New file, Template, HTML and HubL. Paste
`templates/moqui-service-page.html`. Update the two `get_asset_url()` lines
near the top and bottom to point at the coded files you made in step 2.

**5. Build the page and fill in the images.**
Create a page from the template. Every module is editable in the page editor.
Set the hero background, the HotWax Commerce lockup, the client logos and the
testimonial logo from the File Manager.

## What is editable, per module

| Module | Fields |
|---|---|
| Hero | Three heading parts, subheading, CTA text and link, background image |
| Intro | Heading in four parts, two body paragraphs |
| Marquee belt | Repeater of ribbon phrases, 1 to 30 |
| Bento solutions | Section title, five cards each with icon, title, body and chips, plus the guide banner with its form |
| Proof card | Brand logo, eyebrow, title, lead, six capability rows, three statistics, closing note, CTA |
| Why HotWax | Heading in four parts, lead, repeater of credential ticks, logo wall repeater |
| Testimonial | Quote, attribution, role, client logo |
| FAQ and consultation | Advisory card with CTA and background, plus a repeater of questions and answers |

## Things worth knowing before you edit

**The logo wall takes any number of logos, four at a time.** The first four
fill the visible slots; the rest rotate in behind a blur, one slot at a time.
Eight logos gives two pages, twelve gives three. Fewer than eight and it simply
stops rotating and shows what it has, which is correct behaviour rather than a
fault. Each logo has a shape setting: wide, square or medium.

**FAQ answers are duplicated in the JSON-LD** at the bottom of the template.
If you change an answer in the module, change it there too, or the structured
data and the visible page will disagree about what you said.

**Nothing depends on hover.** Every effect that responds to a pointer also has
a resting state that reads on touch. The logo wall pauses on hover and keeps
cycling on touch; the FAQ opens on tap.

**Reduced motion is respected.** `prefers-reduced-motion: reduce` switches off
the parallax, the counters and the logo cycle. Do not add animation that
ignores it.

## Keeping this in step with the source page

The page in `../moqui-page/` is the reference. After changing it, re-copy
`styles.css` into `css/moqui-theme.css`, keeping the `@import` on line one, and
`script.js` into `js/moqui-interactions.js`. Module markup mirrors the same
class names, so a CSS change needs no HubL change.
