# MOQUI SERVICE PAGE

Replacement page for `hotwaxsystems.com/services/moqui-framework-development/`.
Plain HTML, CSS and JavaScript. No build tools, no dependencies.

There are two pages here:

| Page | Purpose |
|---|---|
| `index.html` | The service page. Explains the offering, carries the organic ranking. |
| `landing.html` | A conversion page for campaign and paid traffic. See `LANDING-PAGE.md`. |

## Look at it

```bash
cd "MOQUI SERVICE PAGE"
python3 -m http.server 8000
```

Then open <http://localhost:8000> for the service page, or
<http://localhost:8000/landing.html> for the conversion page.

Or double click `preview-standalone.html` or `landing-standalone.html`, which
are each the whole page in one file with everything inlined. Those are
generated, so do not edit them.

## Edit it

Change `index.html`, `styles.css` or `script.js`, then run:

```bash
python3 build.py            # both pages
python3 build.py landing    # just one
```

That validates each page and rebuilds its standalone file. It refuses to build
if it finds an em or en dash, unbalanced tags, more than one `<h1>`, a
duplicate id, an anchor pointing at nothing, a British spelling, invalid
structured data, a missing asset, or a FAQ answer that no longer matches the
accordion it is supposed to mirror.

## Working with an AI assistant

Point it at **`AI-CONTEXT.md`** first. That file records the rules this page was
built to: the no em dash rule, American spelling, the design tokens taken from
the live HotWax theme, the bento copy length budgets, and which facts have been
verified against moqui.org and hotwax.co. Without it an assistant will
cheerfully undo decisions that were made on purpose.

A good opening prompt:

> Read AI-CONTEXT.md and README.md, then [your change]. Follow the hard rules
> in AI-CONTEXT.md. Run build.py when you are done.

## Before this goes live

See the outstanding list at the end of `AI-CONTEXT.md`. The important ones: the
testimonial is a placeholder, the CTA links are placeholders, and the client
logos need publication permission confirmed.
