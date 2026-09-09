# The conversion landing page

`landing.html` is a second, separate page. It does not replace
`index.html`. The service page explains what HotWax does with Moqui and
carries the organic ranking. This page has one job: convert campaign and
paid traffic into booked calls.

```bash
python3 -m http.server 8000     # then open http://localhost:8000/landing.html
python3 build.py landing        # validate and rebuild landing-standalone.html
python3 build.py                # both pages
```

## Files

| File | Role |
|---|---|
| `landing.html` | Page markup and its own JSON-LD |
| `landing.css` | Additive styles. Loads **after** `styles.css` and inherits every brand token from it |
| `landing.js` | Money shot reveal and the sticky call to action. Loads after `script.js` |
| `landing-standalone.html` | Generated single file build. **Do not edit.** |

It reuses `styles.css` and `script.js` unchanged, so the two pages cannot
drift apart visually and there is one place to change a brand token. Scroll
reveal, the count-up statistics, the logo marquee and the FAQ accordion all
come from `script.js` already.

## Why it is a separate page

The three second test wants a headline built around who the visitor is and
what they get. The service page H1 is `Moqui Development, Consulting and
Support`, kept word for word because the live URL ranks for that phrase.
Those two goals pull in opposite directions, so they get two pages: the
ranked page keeps its H1, and this one leads with the result and carries
the branded phrase on the line underneath.

Because the two pages overlap in content, this one is `noindex, follow`
with its canonical pointing at the service page. If it ever replaces that
URL outright, remove the robots tag.

## The structure, and why each part is there

Every section is commented in the markup with the question it answers.
Do not delete a section without reading its comment first.

| # | Section | Question it answers |
|---|---|---|
| 1 | Hero pill | Who is this for |
| 2 | Line under the headline | What is this |
| 3 | Headline and subline | What is the big result I get |
| 4 | Console frame | What does it actually look like |
| 5 | Logo wall and credentials | Why should I trust you |
| 6 | Four CTA placements plus the sticky bar | What do you want me to do |
| 7 | Problem band | Is this a real problem, and am I alone in it |
| 8 | Six feature and benefit rows | How does it work, and what do I get |
| 9 | Testimonial, case studies, email gate | Prove it, and give me depth if I am not ready |
| 10 | Closing band | Last chance to act |

1, 2 and 3 all sit above the fold on purpose. A visitor decides in roughly
three seconds whether to stay, and nothing further down the page matters if
they leave before it.

The feature rows are deliberately split into two columns: the mechanism on
the left, and what the visitor gets from it on the right, under **What that
means for you**. A capability list without that second half reads as a spec
sheet. If you add a row, add both halves.

## Rules that carry over

Everything in `AI-CONTEXT.md` still applies: no em or en dashes, American
spelling, no naming the Moqui founder or a founding year, one `<h1>`, FAQ
answers duplicated verbatim in the JSON-LD, and no invented numbers.
`build.py` enforces all of them and refuses to build otherwise.

Every figure on this page comes from the verified list in `AI-CONTEXT.md`.

## Outstanding before this takes traffic

- [ ] **The testimonial is a placeholder.** It needs a real approved quote.
      An obviously invented testimonial costs more trust than an empty band.
- [ ] **The money shot is an illustration, not a screenshot.** Replace the
      `.money__frame` block with a real captured screen from Marble ERP or
      HotWax Commerce and delete the `.money__caption` disclaimer. The
      throughput figures inside it are real; the console around them is not.
- [ ] **The problem band has no third party stat.** There is a TODO in the
      markup marking where an analyst figure on ERP overrun should go. Do
      not add a number there without naming the source inline.
- [ ] **Every CTA points at `/connect/`,** a placeholder. Swap for the real
      HubSpot URLs. Four buttons and the sticky bar all need it.
- [ ] **The email gate posts nowhere.** Point the form at the real HubSpot
      endpoint, and confirm the architecture guide it promises exists.
- [ ] Confirm the AI and MCP claims in row 06 describe shipped client work.
- [ ] Confirm publication permission for each client logo.
- [ ] The Warby Parker logo asset renders as a near-blank pale box at the
      marquee's size. It has the same problem on the service page. Replace
      the file.
- [ ] Decide whether `#1 largest concentration of Apache OFBiz committers`
      can be stated as flatly as the credentials strip states it.
