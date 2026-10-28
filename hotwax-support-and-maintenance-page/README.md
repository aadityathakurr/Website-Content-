# HotWax Systems: Apache OFBiz Support and Maintenance page

Landing page for `https://www.hotwaxsystems.com/services/apache-ofbiz-support-and-maintenance`.

**Live preview:** https://aadityathakurr.github.io/Website-Content-/hotwax-support-and-maintenance-page/

## Folders

```
hotwax-support-and-maintenance-page/
├── index.html    ← the live preview: the whole page in one file (every image built in)
├── common/       ← the page code shared by every build: HTML, CSS and JS per section, global styles,
│                    head tags and schema, images, a single-file version, and its own README
└── hubspot/      ← everything for HubSpot: the 8 editable S&M modules (SM-*.module folders with
                     module.html, module.css, module.js, fields.json, meta.json), team photos,
                     the banner image, one preview page per module, and a README with setup steps
```

- **common/** is the source of the design. Open `common/index.html` to see the full page built from separate files, or `common/preview-from-modules.html` to see it assembled only from the per-section files.
- **hubspot/** is what goes into a HubSpot account. Upload each `SM-*.module` folder to Design Manager, upload the photos in `hubspot/team-photos/` to File Manager, then build the page from the S&M modules in this order: Banner, Problem, Services, CTA, Team, How It Works, Comparison, Testimonials. `hubspot/README.md` lists every editable field.
- The modules were built and tested in a test HubSpot account first; the same folders can be uploaded to the main HubSpot account.

Every HTML page in this folder is marked `noindex` and the canonical URL points at hotwaxsystems.com, so these copies stay out of search results.

Run locally:

```bash
python3 -m http.server 8899
# open http://127.0.0.1:8899/
```
