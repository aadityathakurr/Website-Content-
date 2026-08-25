# ERP Architecture Graphic

An interactive three-layer architecture diagram. Hovering a layer highlights it
and turns its label to the accent color; the layers drift by different amounts
as the pointer moves, so the stack reads as having depth.

No framework, no build step, no dependencies. Plain HTML, CSS and JavaScript.

Open `index.html` in a browser to see it.

## Files

| File | Role |
|---|---|
| `index.html` | Working demo. The component markup is fenced by comments, copy it out. |
| `erp-graphic.css` | All styling. Self-contained. |
| `erp-graphic.js` | Pointer tracking, hover state, keyboard support. Self-contained. |
| `assets/arch-apps.webp` | Top layer slice, transparent |
| `assets/arch-service.webp` | Middle layer slice, transparent |
| `assets/arch-data.webp` | Base layer slice, transparent |
| `assets/source-render.jpg` | The original single-image render the slices were cut from. Keep it. |

## Use it

1. Copy `erp-graphic.css`, `erp-graphic.js` and the `assets/` folder into your project.
2. Link them:

```html
<link rel="stylesheet" href="erp-graphic.css">
<script src="erp-graphic.js" defer></script>
```

3. Paste the markup between the two `COMPONENT MARKUP` comments in `index.html`.

Every element with `data-arch3d` is wired up automatically on DOMContentLoaded.
To attach one you injected later, call `ErpGraphic.init(element)`.

## Size it

The component fills its container up to a maximum. Change that maximum:

```css
.arch3d { max-width: 680px; }
```

Everything inside is proportional, including the label type, so the whole thing
scales together. Labels have an 11px floor so they stay readable on phones.

## Rebrand it

Override these on `.arch3d`, or globally on `:root`:

```css
.arch3d {
  --arch-accent:    #e70000;          /* active label */
  --arch-label:     #4b5259;          /* resting label */
  --arch-label-dim: #a8aeb4;          /* label of a layer that is not active */
  --arch-shadow:    39, 50, 62;       /* ground shadow, as R, G, B */
  --arch-font:      Montserrat, sans-serif;
}
```

## How it works, and what not to break

The illustration is one flat render, cut into three slices. Each slice is the
**full canvas** with only its own band opaque, so they stack with `inset: 0` and
need no offset math.

**The slices overlap by 12px with a feathered edge.** The lower layer runs at
full alpha beneath the seam and only the upper one fades out. That is what makes
the three reassemble to the original exactly. Complementary fades on both sides
do not reconstruct correctly under "over" compositing, they leave a light band
at every seam.

**Nothing moves on hover.** Emphasis is carried by color and opacity only. A
lift shifts one slice against its neighbours and the stack reads as coming
apart. It also eats into the 12px seam overlap. If you add movement, keep the
difference between adjacent layers well under 12px.

**No `drop-shadow` on a layer.** The filter traces the slice's alpha edge, and
the seam feather is a horizontal edge across the full width, so it paints a dark
band along the seam.

**The ground shadow is drawn, not baked.** It is a radial gradient on
`.arch3d__stage::before`. The illustration's original shadow was removed because
its shape could not be controlled. The drawn one sits outside the scene
transform, so it stays put while the layers drift, which is what a shadow on the
ground should do.

**Hit zones are clipped to the artwork.** Each `.arch3d__zone` carries a
`clip-path` polygon tracing its layer's visible outline, so hovering empty space
does nothing. `clip-path` clips pointer events as well as paint.

**Hit zones must not be transformed.** They deliberately carry no parallax. When
they moved with the pointer, a band edge could chase the cursor and flip the
active layer back and forth. The labels live inside the plates instead, so they
still travel with their layer.

Because the zones are shaped, there is empty space between them, and an
enter/leave pair never fires when the pointer crosses that gap. Hover is
resolved with `elementFromPoint` on pointer move for that reason. Do not swap it
back to `pointerenter`/`pointerleave` or the highlight will stick.

## Accessibility

Each layer is a real `<button>` with an `aria-label`, so it can be tabbed to and
pressed. Pressing pins a layer, which is also how it works on touch, where there
is no hover. `aria-pressed` reflects the pinned state.

The labels are live text, not baked into the image, so they scale, can be
selected, and are read aloud. The slices themselves carry `alt=""` because they
are decorative; the diagram is described once in the `.sr-only` paragraph.

Under `prefers-reduced-motion: reduce` all parallax is switched off, every layer
is parked flat and the animation loop stops. The active state still reads,
because it never depended on movement.

## Changing the illustration

Regenerate all three slices together from `assets/source-render.jpg` or your own
render. The cuts sit in the gaps between the slabs. If you cut a new source, the
seam rows and the `clip-path` polygons in the CSS both need recomputing, since
both are tied to where the artwork actually is.

## Browser support

Modern evergreen browsers. Uses CSS custom properties, `clip-path`, container
query units for the label type, and `aspect-ratio`. WebP with alpha is required
for the slices.
