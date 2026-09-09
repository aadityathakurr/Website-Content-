# Landing page content brief

An advisory pass on `landing.html`. Written to be handed to an assistant along
with `AI-CONTEXT.md` and `LANDING-PAGE.md`.

All hard rules from `AI-CONTEXT.md` still apply: no em or en dashes, American
spelling, no naming the Moqui founder or a founding year, one `<h1>`, FAQ
answers duplicated verbatim in the JSON-LD, no invented numbers.

## The overall read

The page is not short of content. It has too much middle and too little at the
two ends where money is actually made. The argument sections, the problem band,
the three roads, and the six feature rows, are the strongest writing on the
page and mostly need trimming rather than expanding. What is missing is the
thing an enterprise buyer needs before booking: what an engagement costs them
to start, and what the first ninety days look like. Nobody signs a custom ERP
call without knowing the shape of the commitment.

Fix in this order.

## Tier 1. Cannot take paid traffic until these are done

These are not writing problems. They need a decision or an asset.

1. **CTA destinations.** Four buttons and the sticky bar all point at
   `/connect/`. Every one needs the real HubSpot meeting URL. If the meeting
   link is not ready, the page cannot run.
2. **The email gate posts nowhere.** Point it at the real HubSpot form endpoint,
   and confirm the architecture guide it promises actually exists. Promising a
   document that does not exist is worse than having no gate.
3. **The testimonial.** Recommendation: **delete the section** until a real
   approved quote exists. Do not ship the placeholder and do not write a
   substitute. The case study cards already carry proof, and a visibly generic
   quote poisons the credibility of the real numbers sitting next to it. When a
   quote is approved, put the section back in the same slot.
4. **The money shot.** Recommendation: get a real captured screen from HotWax
   Commerce or Marble ERP. This is the single highest value asset on the page
   and the illustration is the weakest link in the top third. If a real capture
   is genuinely blocked, keep the current frame but shorten the caption to one
   plain line and keep the word "illustrative" in it.
5. **Client logo permission.** Confirm per logo. Also replace the Warby Parker
   asset, which renders as a near blank box at marquee size.
6. **The third party stat in the problem band.** Recommendation: **drop the
   TODO and do not add an analyst figure.** The validation panel already works
   using first party numbers, 50+ operations and 20+ years, which are
   defensible and specific. A borrowed Gartner style statistic that nobody
   verifies is a liability on a page that otherwise cites only real production
   figures. If someone insists on one, it must name the report and year inline.

## Tier 2. Content changes worth making

### Cut list

The page argues the same point more times than it needs to.

- **Feature row 05, multi-tenant SaaS platform engineering: remove it from this
  page.** The hero pill commits to "retail and commerce operations and
  technology leaders." Row 05 speaks to a company building a SaaS product,
  which is a different buyer with a different budget cycle. It breaks the
  through line at exactly the point the argument should be tightening. It
  belongs on the service page, which is allowed to be broader.
- **Problem bullets: six down to four.** Keep "the system cannot express how
  you fulfill", "every integration is its own project", "renewal is leverage
  against you", and "inventory truth arrives too late to act on". The peak
  season point is already made by the money shot numbers and the HotWax
  Commerce card. The "years and millions" point is made better by road one in
  the comparison directly below.
- **Secondary calls to action: collapse to one.** The page currently offers
  "See What We Have Built", "Read a Case Study First", "See it live", two
  instances of "Get the walkthrough", and the email gate. That is five
  competing not-ready paths. Keep exactly one, the architecture guide email
  gate, and make every secondary link point at it.
- **Benefit chips: three down to two per row.** The third chip is the weakest
  in almost every row and the rows will sit more evenly.

### Keep exactly as written

The three roads comparison is the best section on the page. Do not touch it.
The FAQ, especially "Who is this not a good fit for", is doing real
qualification work and reads as honest. Leave it.

### Standardize the primary call to action

The button says four different things: "Book a 30 Minute Architecture Review",
"Book the Architecture Review", "Talk to a Moqui Architect", "Book the Review".
Vary the surrounding sentence as much as you like, but the offer noun must be
constant so the visitor recognizes it as one thing. Use **Architecture Review**
in all four button labels and in the sticky bar.

### Reframe the case study section

Right now the heading says "Systems we built, and what they run", and then two
of the three cards are Marble ERP and POP Commerce, which are Moqui ecosystem
applications rather than client deliverables. A buyer who checks will feel
misled, and that costs more than the cards gain.

Recommendation: split the section into two clearly different things.

- **HotWax Commerce stays as proof.** Lead with it, give it the space, keep the
  named brands and the throughput numbers. This is the real client evidence.
- **Marble ERP and POP Commerce get demoted to a smaller strip** under a
  heading that tells the truth about what they are. Something like "What the
  stack gives you before we write a line of custom code", with the screen,
  form and endpoint counts intact. Framed that way the numbers are more
  persuasive, not less, because they support the "first production release in
  months" claim instead of pretending to be case studies.

## Tier 3. The one section that is genuinely missing

Add a section between the feature rows and the third call to action.

**What an engagement actually looks like.** This is the objection the page never
answers. A visitor who is sold on the argument still does not know whether
talking to you means a four week discovery invoice or a two year program, and
that uncertainty is what stops the click. Four steps, short, no invented
numbers, no pricing figure.

Suggested shape, to be checked against how HotWax really sells before it ships:

- **The call.** Thirty minutes with a solution architect. Free. You leave with
  an opinion about your architecture whether or not you work with us.
- **Discovery.** We model your order and inventory flow against the Mantle data
  model, name the first milestone, and come back with a defined scope and a
  range. Paid, short, and it is yours to keep if you stop there.
- **First production release.** One process, chosen because it hurts, running
  in production on your infrastructure. Months, not years.
- **Expansion.** Process by process, on the same codebase. You can take the
  work in house at any point, because the source is yours and the framework is
  public domain.

That last line is the strongest risk reversal available and it currently only
appears buried in an FAQ answer.

## Tier 4. Optional, test rather than assume

The current headline is defensible. Do not treat this as a blocker.

Current: "Custom ERP and Order Management, Built Around Your Operation"

It states a category and a positioning claim, but not a result. The framework
in `LANDING-PAGE.md` asks the headline to carry the big result. Three
alternatives, strongest first:

1. **Custom ERP and Order Management You Own Outright.** Leads with the single
   differentiator no packaged vendor can match, and the subline already carries
   the proof of it.
2. **Order Management That Fits How You Actually Sell.** Most resonant with
   paid traffic arriving from an ERP-does-not-fit search, weakest on category
   clarity.
3. **Your First Production Release in Months, Not Years.** Strongest result
   claim, but it puts the most falsifiable promise in the largest type on the
   page.

The who pill, "For retail and commerce operations and technology leaders", is
one noun too long. "For retail and commerce operations leaders" or "For retail
operations and technology leaders" both scan faster.

## What I could not decide for you

These need a business answer, not a writing one.

- Whether "#1 largest concentration of Apache OFBiz committers in the industry"
  can be stated that flatly. It is in the credentials strip in the largest
  numerals on that band. It is either substantiable or it should be softened to
  "one of the largest".
- Whether the AI and MCP claims in row 06 describe shipped client work.
  hotwax.co listing MCP Server technology as a capability supports the claim as
  written, but a prospect will ask on the call.
- Whether the delivery model, where the team sits and how it is staffed, should
  appear on the page. Enterprise services buyers ask early, and the page is
  currently silent on it.
- Whether a price range or minimum engagement size belongs on the page. Stating
  one qualifies traffic hard and cuts junk calls. Omitting one maximizes call
  volume. That is a sales decision, not a copy decision.
