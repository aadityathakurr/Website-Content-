# Section copy: Why teams come to HotWax

Final copy for the three path comparison section (`id="why-moqui"` in
`index.html`). Hand this to an assistant along with `AI-CONTEXT.md`.

Rules that apply: no em or en dashes, American spelling, no naming the Moqui
founder or a founding year, no invented numbers. Every figure below comes from
the verified list in `AI-CONTEXT.md`.

## The rules this copy was built to

Do not undo these without a reason.

1. **All three cards are the same length**, about 45 to 50 words of body. In a
   three column grid, a longer third card reads as the one that needs more
   explaining. The winning card must win on specifics, not on word count.
2. **Only card 03 carries numbers.** Cards 01 and 02 are prose about pain.
   The eye lands on 390, 400+ and zero, which does the persuading before the
   sentence is read.
3. **The verdict line is load bearing.** A skimmer reads three short italic
   lines and gets the whole argument in four seconds. Nobody scans a service
   page and reads three body paragraphs.
4. **The long capability list appears once**, in card 03, where it is proof of
   coverage. Repeating "order, inventory, warehouse, procurement, fulfillment"
   in every card kills the rhythm by the second read. In cards 01 and 02, name
   two nouns at most.
5. **Chips are outcomes, not attributes.** "Vendor dependency" is a category
   label. "Upgrades break" is a thing that happens to you.
6. **Card 03 renders permanently in the maroon fill state**, `#8c1c24` with
   white text, which `styles.css` already defines for card hover. A decisive
   winner with no new CSS.

## Section header

Eyebrow: WHY TEAMS COME TO HOTWAX

Heading: Packaged ERP makes your operation adapt. Building from scratch makes
you wait.

The heading names only the two losing options on purpose. Card 03 is the turn,
and the maroon fill announces it visually, so the heading does not need to.

## Card 01

Index: 01
Label: THE VENDOR TRAP
Name: Buy a packaged ERP
Verdict: Fastest to sign. Slowest to fit.

Body:
Workflows arrive fixed, so your order and fulfillment processes get reshaped to
match them. Whatever does not fit becomes customization, and customization is
what breaks your upgrade path. Meanwhile the license renews every year and the
feature you need sits on someone else's roadmap.

Chips: Your process bends / Upgrades break / Costs compound

## Card 02

Index: 02
Label: THE REBUILD TRAP
Name: Build it from scratch
Verdict: Perfect fit, eventually.

Body:
Before anyone writes the logic that makes your operation different, someone has
to build the party, product, order, inventory and accounting model underneath
it, plus security, authorization and audit. That is the first year, spent on
plumbing every enterprise system already needs.

Chips: First year is plumbing / Budget is a guess / Key-person risk

## Card 03

Index: 03
Label: THE THIRD PATH
Name: Build on Moqui with HotWax
Verdict: Start on the foundation. Build only what is yours.

Body:
Moqui and the Mantle data model arrive with roughly 390 entities covering
parties, products, orders, inventory and accounting, plus the service layer,
security and 400+ REST endpoints. We build the part that is actually your
business on top. The license is public domain, so the code and the roadmap stay
yours.

Chips: Live in months / Zero license fees / You own the code

## Note on keywords

If warehouse, procurement and complex integrations need to appear for search,
put them in the solutions grid below this section rather than here. This
section is doing persuasion work and the noun lists cost it rhythm.

## After editing

Run `python3 build.py`. It will refuse the build on an em dash, a British
spelling, a duplicate id, a dead anchor or a missing asset.
