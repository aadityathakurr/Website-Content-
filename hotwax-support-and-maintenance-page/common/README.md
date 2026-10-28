# Apache OFBiz Support and Maintenance Landing Page: HubSpot build kit

Everything needed to rebuild the landing page in HubSpot, one module at a time.
Target URL: `https://www.hotwaxsystems.com/services/apache-ofbiz-support-and-maintenance`

> **Fully editable modules:** `../hubspot/` holds the S&M modules (S&M Banner, S&M Problem, S&M CTA, S&M Team, S&M How It Works, S&M Comparison, S&M Testimonials), each with HubL fields for every text, image, color and size. Use those for the HubSpot build; see `hubspot-modules/README.md`. The `modules/` folders below are the plain HTML/CSS/JS reference split of the same page.

## What is in this folder

```
common/
├── README.md                     ← this guide
├── index.html                    ← full page, images as separate files (open in a browser to preview)
├── preview-from-modules.html     ← the same page assembled only from the module files (proves the split works)
├── standalone/                   ← single-file version with every image built in (works anywhere, 2.1 MB)
├── head/
│   ├── head-tags.html            ← title, meta description, canonical, social tags, fonts, schema
│   ├── schema-service.json       ← Service structured data (readable copy)
│   └── schema-faq.json           ← FAQ structured data (readable copy)
├── global/
│   ├── global.css                ← brand colors, fonts, buttons, section spacing, scroll reveal
│   ├── global.js                 ← scroll reveal animation
│   └── svg-icons.html            ← shared icons (#arrow, #sign) used by several modules
├── modules/                      ← one folder per HubSpot module, in page order
│   ├── 01-hero/
│   ├── 03-problem/               ← (02, the client logo strip, was removed; numbers kept so references stay valid)
│   ├── 04-services/
│   ├── 05-email-cta/
│   ├── 06-team/
│   ├── 07-how-it-works/
│   ├── 08-comparison/
│   ├── 09-testimonials/
│   ├── 10-contact-form-and-faq/
│   └── 11-mobile-sticky-cta/
├── assets/images/
│   ├── hero-warehouse-banner.jpg ← banner background (1920 × 1080)
│   └── team/                     ← 9 black-and-white headshots
```

Each module folder has `module.html`, `module.css`, and, where the section is interactive, `module.js`.
Those three files map one to one onto the three panes of a HubSpot custom module.

## Page order

| # | Module | What it is | Has JS |
|---|---|---|---|
| 01 | Hero | Banner: eyebrow, headline, subheadline, button, "Trusted by 50+" line | no |
| 03 | Problem | "Your business runs on Apache OFBiz. Who is looking after it?" | no |
| 04 | Services | 8 Apache OFBiz support services; on phones each shows one line with "Know more" for the full text | yes |
| 05 | Email CTA | Maroon "Talk to an Apache OFBiz Expert" bar with email field | yes (preview only) |
| 06 | Team | One portrait card at a time (photo on top, details underneath); arrows (desktop), swipe and auto-slide (phones); a red "View profile" link under each title opens LinkedIn, and on phones tapping the photo does too | yes |
| 07 | How it works | 4 steps; on phones one full card at a time, swipe and auto-slide, looping | yes |
| 08 | Comparison | Table on desktop; on phones one card per row with every answer visible | no |
| 09 | Testimonials | 3 quotes plus case studies link; on phones one full card at a time, swipe and auto-slide, looping | yes |
| 10 | Contact form and FAQ | Lead form card plus FAQ (same style as the Moqui page) | yes |
| 11 | Mobile sticky CTA | "Talk to an Apache OFBiz expert" bar on phones | yes |

## Step-by-step in HubSpot

### 1. Upload the images
1. Go to **Marketing → Files and Templates → Files** (File Manager).
2. Create a folder, for example `apache-ofbiz-support`, and upload everything from `assets/images/` (keep the `team` subfolder).
3. Copy each file's HubSpot URL. You will paste these in step 3.

### 2. Add the global styles and icons (once)
1. **global.css**: add it to the page template's stylesheet, or create a CSS file in Design Manager and attach it to the template.
2. **global.js**: attach it to the template, loaded at the end of the body.
3. **svg-icons.html**: paste it once near the top of the page body, either in the template or in a small custom HTML module placed above the hero. Several modules use these icons.
4. Fonts: Playfair Display and Montserrat load from Google Fonts through the `<link>` in `head/head-tags.html`. If your theme already loads them, skip that line.

### 3. Create one custom module per folder
For each folder in `modules/`, in Design Manager:
1. **File → New file → Module**, named after the folder (for example `ofbiz-support-01-hero`).
2. Paste `module.html` into the **HTML + HubL** pane, `module.css` into **module.css**, and `module.js` into **module.js**.
3. Replace every `assets/images/...` path with the HubSpot File Manager URL from step 1:
   - `01-hero/module.css`: the `--hero-img:url("assets/images/hero-warehouse-banner.jpg")` line.
   - `06-team/module.html`: the 9 team photos.
4. Publish the module.

To make text editable by marketers later, you can turn any headline or paragraph into a module field (Text or Rich text) and replace it with `{{ module.field_name }}`. The HTML works as-is without fields.

### 4. Connect the two forms
The forms in this kit only work in the preview. In HubSpot:
- **05-email-cta**: create a HubSpot form with one field, **Email**. Replace the `<form class="cta-bar__form">…</form>` with the HubSpot form (form module or embed), keeping the `cta-bar` wrapper. Then delete `05-email-cta/module.js`.
- **10-contact-form-and-faq**: create a HubSpot form with **Full name, Work email, Company, What do you need help with? (optional)**, and a submit button labelled **Talk to an Apache OFBiz expert**. Replace the `<form id="leadForm">…</form>` with it. Then delete the last block in `module.js` (the one starting `// form (preview only…)`). Keep the FAQ block above it.
- Set both forms' follow-up and notifications to route to the sales team.

The contact form styles target `input`, `label`, `textarea` and `select` inside `.cta-card`, so a HubSpot form placed in that card picks them up without restyling other forms on the page. Fine-tune spacing after the first preview.

### 5. Build the page
1. Create the landing page (or edit the existing support page) from a template with a drag-and-drop area.
2. Add the modules in the order above (01, 03 to 11).
3. **Page settings → Title**: `Apache OFBiz Support and Maintenance | HotWax Systems`
4. **Meta description**: `Apache OFBiz support and maintenance from the world's largest team of Apache OFBiz committers: integrations, upgrades, security releases, and bug fixes.`
5. **Advanced → Head HTML**: paste `head/head-tags.html`. It includes the canonical URL, social sharing tags, the Service and FAQ structured data, and the fonts. Remove the `<title>` and description lines from it if HubSpot already sets them from the fields above, so they are not duplicated.
6. Add a social share image (og:image) using the banner's HubSpot URL.

### 6. Test before publishing
- [ ] Desktop: banner, team arrows and LinkedIn hover, FAQ hover open, comparison table.
- [ ] Phone: team, how-it-works and testimonials swipe one card at a time, auto-slide and loop without rewinding (no arrows); tapping a team photo opens LinkedIn; comparison cards show every answer; sticky bottom button.
- [ ] Both forms submit and arrive in HubSpot.
- [ ] Google Rich Results Test passes for the FAQ and Service structured data.
- [ ] No sideways scroll on a 375px-wide phone.

## Content facts used (verified)
- 50+ enterprise clients across the USA and Canada; world's largest team of Apache OFBiz committers.
- Apache roles come from the ASF public roster (checked 26 Oct 2026): Jacopo Cappellato is PMC Chair; Anil Patel, Ashish Vijaywargiya, Swapnil Shah, Mridul Pathak, Deepak Dixit and Arun Patidar are PMC Members; Divesh Dutta is a Committer; Ratnesh Upadhyay is shown as Contributor (no ASF account).

## Still open
1. Mridul Pathak's LinkedIn URL (his card has no LinkedIn icon yet).
2. Leadership confirmation of "Where it helps, we can overlap with your current vendor" (How it works, step 3).
3. Kris Shenk's title (homepage says CEO, the old page said CIO), so the testimonial shows only "Cabi".
4. A support-specific client testimonial would make the strongest proof on the page.
