# HubSpot paste sheet — HotWax Hero Banner

Design Manager panes are replace-all, so for each file below:
open the pane, select all (Cmd+A), delete, paste the block, then Publish.

Order matters only for `fields.json` — publish it first so the new
"Size & style" controls exist before the template references them.

---

## 1. `fields.json` → Fields (or the JSON editor)

<sub>490 lines</sub>

```json
[
  {
    "name": "headline_group",
    "label": "Headline",
    "type": "group",
    "expanded": true,
    "children": [
      {
        "name": "line_1",
        "label": "Line 1",
        "type": "text",
        "required": true,
        "default": "Let's Accomplish"
      },
      {
        "name": "line_2",
        "label": "Line 2 (accent colour)",
        "help_text": "Leave empty for a single-line headline.",
        "type": "text",
        "default": "Great Together"
      },
      {
        "name": "subhead",
        "label": "Sub-headline",
        "type": "richtext",
        "default": "<p>#1 choice for Apache OFBiz development &amp; support. Build custom supply chain software faster with OFBiz, Solr, NiFi, Superset, and Moqui.</p>"
      }
    ]
  },
  {
    "name": "cta_group",
    "label": "Buttons",
    "type": "group",
    "expanded": true,
    "children": [
      {
        "name": "primary_text",
        "label": "Primary button text",
        "type": "text",
        "default": "Connect With Apache OFBiz Experts"
      },
      {
        "name": "primary_link",
        "label": "Primary button link",
        "type": "link",
        "supported_types": [
          "EXTERNAL",
          "CONTENT",
          "FILE",
          "EMAIL_ADDRESS",
          "BLOG"
        ],
        "default": {
          "url": {
            "type": "EXTERNAL",
            "href": ""
          },
          "open_in_new_tab": false
        }
      },
      {
        "name": "secondary_text",
        "label": "Secondary link text",
        "help_text": "Optional. Leave empty to show only the primary button.",
        "type": "text",
        "default": ""
      },
      {
        "name": "secondary_link",
        "label": "Secondary link",
        "type": "link",
        "supported_types": [
          "EXTERNAL",
          "CONTENT",
          "FILE",
          "EMAIL_ADDRESS",
          "BLOG"
        ],
        "default": {
          "url": {
            "type": "EXTERNAL",
            "href": ""
          },
          "open_in_new_tab": false
        }
      }
    ]
  },
  {
    "name": "slides",
    "label": "Showcase cards",
    "help_text": "Each card is one step in the rotating animation. Add, remove or reorder freely — the tabs, progress bars and timing all follow automatically.",
    "type": "group",
    "expanded": true,
    "occurrence": {
      "min": 1,
      "max": 8,
      "default": 4
    },
    "default": [
      {
        "tab_label": "Order Mgmt"
      },
      {
        "tab_label": "Warehouse"
      },
      {
        "tab_label": "Manufacturing"
      },
      {
        "tab_label": "Procurement"
      }
    ],
    "children": [
      {
        "name": "tab_label",
        "label": "Tab label",
        "type": "text",
        "required": true,
        "default": "Order Mgmt"
      },
      {
        "name": "tab_icon",
        "label": "Tab icon",
        "help_text": "Small icon shown beside the tab label. Optional — a 16x16 SVG or PNG works best.",
        "type": "image",
        "responsive": false,
        "default": {
          "src": "",
          "alt": ""
        }
      },
      {
        "name": "image",
        "label": "Card image",
        "help_text": "The main graphic for this card. Any size — see 'Image fit' below.",
        "type": "image",
        "responsive": true,
        "default": {
          "src": "",
          "alt": "",
          "width": 690,
          "height": 420
        }
      },
      {
        "name": "image_fit",
        "label": "Image fit",
        "help_text": "Fill = crops to fill the card edge to edge (best for screenshots). Fit = shows the whole image with padding (best for illustrations or transparent PNGs).",
        "type": "choice",
        "display": "select",
        "default": "fill",
        "choices": [
          [
            "fill",
            "Fill the card (crop if needed)"
          ],
          [
            "fit",
            "Fit whole image (add padding)"
          ]
        ]
      },
      {
        "name": "chips",
        "label": "Floating info cards",
        "help_text": "Small cards that float beside the main graphic on desktop. Use them to pull out a number, a proof point or a doc link. Hidden below 768px. Two per side works best.",
        "type": "group",
        "occurrence": {
          "min": 0,
          "max": 4,
          "default": 0
        },
        "children": [
          {
            "name": "position",
            "label": "Side",
            "type": "choice",
            "display": "select",
            "default": "right",
            "choices": [
              [
                "left",
                "Left of the card"
              ],
              [
                "right",
                "Right of the card"
              ]
            ]
          },
          {
            "name": "style",
            "label": "Content",
            "type": "choice",
            "display": "select",
            "default": "text",
            "choices": [
              [
                "text",
                "Typed info (label, value, caption)"
              ],
              [
                "image",
                "An image"
              ]
            ]
          },
          {
            "name": "label",
            "label": "Label",
            "help_text": "Small uppercase line, e.g. BROKERING.",
            "type": "text",
            "default": "",
            "visibility": {
              "controlling_field": "style",
              "operator": "EQUAL",
              "controlling_value_regex": "text"
            }
          },
          {
            "name": "value",
            "label": "Value",
            "help_text": "The headline figure, e.g. 400/min.",
            "type": "text",
            "default": "",
            "visibility": {
              "controlling_field": "style",
              "operator": "EQUAL",
              "controlling_value_regex": "text"
            }
          },
          {
            "name": "caption",
            "label": "Caption",
            "help_text": "One short supporting line.",
            "type": "text",
            "default": "",
            "visibility": {
              "controlling_field": "style",
              "operator": "EQUAL",
              "controlling_value_regex": "text"
            }
          },
          {
            "name": "image",
            "label": "Image",
            "type": "image",
            "responsive": false,
            "default": {
              "src": "",
              "alt": ""
            },
            "visibility": {
              "controlling_field": "style",
              "operator": "EQUAL",
              "controlling_value_regex": "image"
            }
          },
          {
            "name": "link",
            "label": "Link (optional)",
            "help_text": "Makes the card clickable — handy for linking a doc or case study.",
            "type": "link",
            "supported_types": [
              "EXTERNAL",
              "CONTENT",
              "FILE",
              "BLOG"
            ],
            "default": {
              "url": {
                "type": "EXTERNAL",
                "href": ""
              },
              "open_in_new_tab": true
            }
          }
        ]
      }
    ]
  },
  {
    "name": "trust_group",
    "label": "Client logos",
    "type": "group",
    "expanded": false,
    "children": [
      {
        "name": "show",
        "label": "Show logo strip",
        "type": "boolean",
        "display": "toggle",
        "default": true
      },
      {
        "name": "title",
        "label": "Heading",
        "type": "text",
        "default": "Leading enterprises that trust HotWax Systems"
      },
      {
        "name": "logos",
        "label": "Logos",
        "type": "group",
        "occurrence": {
          "min": 0,
          "max": 20,
          "default": 0
        },
        "children": [
          {
            "name": "logo",
            "label": "Logo",
            "type": "image",
            "responsive": false,
            "default": {
              "src": "",
              "alt": ""
            }
          },
          {
            "name": "link",
            "label": "Link (optional)",
            "type": "link",
            "supported_types": [
              "EXTERNAL",
              "CONTENT"
            ],
            "default": {
              "url": {
                "type": "EXTERNAL",
                "href": ""
              },
              "open_in_new_tab": true
            }
          }
        ]
      }
    ]
  },
  {
    "name": "design",
    "label": "Size & style",
    "help_text": "Live design controls. Every one updates the banner as you drag it.",
    "type": "group",
    "expanded": false,
    "children": [
      {
        "name": "headline_size",
        "label": "Headline size (desktop)",
        "type": "number",
        "display": "slider",
        "min": 28,
        "max": 72,
        "step": 1,
        "suffix": "px",
        "default": 48
      },
      {
        "name": "subhead_size",
        "label": "Sub-headline size",
        "type": "number",
        "display": "slider",
        "min": 13,
        "max": 24,
        "step": 1,
        "suffix": "px",
        "default": 16
      },
      {
        "name": "card_width",
        "label": "Card size",
        "help_text": "Width of the main graphic on desktop. The card keeps its shape, so a wider card is a taller banner.",
        "type": "number",
        "display": "slider",
        "min": 560,
        "max": 1100,
        "step": 10,
        "suffix": "px",
        "default": 780
      },
      {
        "name": "tilt_angle",
        "label": "Tilt angle",
        "help_text": "How far the card rotates in 3D. 0 lays it flat.",
        "type": "number",
        "display": "slider",
        "min": 0,
        "max": 20,
        "step": 1,
        "suffix": "°",
        "default": 11
      },
      {
        "name": "chip_size",
        "label": "Floating card size",
        "type": "number",
        "display": "slider",
        "min": 180,
        "max": 380,
        "step": 10,
        "suffix": "px",
        "default": 280
      },
      {
        "name": "panel_tint",
        "label": "Panel background",
        "help_text": "The soft wash behind the graphic. The lower edge blends into the accent colour.",
        "type": "color",
        "default": {
          "color": "#FDECEB",
          "opacity": 100
        }
      },
      {
        "name": "panel_pad",
        "label": "Space above the graphic",
        "type": "number",
        "display": "slider",
        "min": 0,
        "max": 140,
        "step": 4,
        "suffix": "px",
        "default": 52
      }
    ]
  },
  {
    "name": "settings",
    "label": "Animation & layout",
    "type": "group",
    "expanded": false,
    "children": [
      {
        "name": "slide_duration",
        "label": "Seconds per card",
        "help_text": "How long each card stays on screen before advancing.",
        "type": "number",
        "display": "slider",
        "min": 1,
        "max": 12,
        "step": 0.1,
        "suffix": "s",
        "default": 5.0
      },
      {
        "name": "pause_on_hover",
        "label": "Pause when hovered",
        "help_text": "Stops the rotation while a visitor's cursor is over the showcase.",
        "type": "boolean",
        "display": "toggle",
        "default": true
      },
      {
        "name": "full_bleed",
        "label": "Full-width showcase",
        "help_text": "Lets the showcase panel span the whole browser width, ignoring the page container.",
        "type": "boolean",
        "display": "toggle",
        "default": true
      },
      {
        "name": "show_tilt",
        "label": "3D card tilt",
        "help_text": "Angles the card in 3D and alternates direction as the carousel advances.",
        "type": "boolean",
        "display": "toggle",
        "default": true
      },
      {
        "name": "accent_color",
        "label": "Accent colour",
        "type": "color",
        "default": {
          "color": "#FF3A2D",
          "opacity": 100
        }
      },
      {
        "name": "ink_color",
        "label": "Text colour",
        "type": "color",
        "default": {
          "color": "#212429",
          "opacity": 100
        }
      }
    ]
  }
]
```

## 2. `module.html` → HTML + HubL

<sub>213 lines</sub>

```html
{# Fonts the design needs. Without this the module inherits whatever the
   theme provides and the type falls back to system sans. #}
{% require_head %}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700&display=swap">
{% end_require_head %}

{# ============================================================
   HotWax Hero Banner
   Card images, tab labels, copy and logos all come from fields.
   The carousel reads its slides from the DOM, so adding or
   removing a card in the sidebar needs no code change.
   ============================================================ #}

{% set s          = module.settings %}
{% set d          = module.design %}
{% set duration   = (s.slide_duration|float * 1000)|round|int %}
{% set accent     = s.accent_color.color|default('#FF3A2D') %}
{% set ink        = s.ink_color.color|default('#212429') %}
{% set slide_list = module.slides %}

{# Design controls ride in as CSS variables, so every slider updates the
   banner live without touching the stylesheet. #}
{% set vars %}
--hws-accent: {{ accent }};
--hws-ink: {{ ink }};
--hws-tint: {{ d.panel_tint.color|default('#FDECEB') }};
--hws-h1: {{ d.headline_size|default(48) }}px;
--hws-sub: {{ d.subhead_size|default(16) }}px;
--hws-card-w: {{ d.card_width|default(780) }}px;
--hws-chip-w: {{ d.chip_size|default(280) }}px;
--hws-tilt: {{ d.tilt_angle|default(11) }}deg;
--hws-pad: {{ d.panel_pad|default(52) }}px;
{% endset %}

{# One floating info card. Renders typed content or an image, and wraps
   the whole thing in a link when one is set. #}
{% macro render_chip(chip) %}
  {% set has_text  = chip.label or chip.value or chip.caption %}
  {% set has_image = chip.image.src %}
  {% if has_text or has_image %}
    {% set tag = 'a' if chip.link.url.href else 'div' %}
    <{{ tag }} class="hws-chip hws-chip--{{ 'image' if chip.style == 'image' else 'text' }}{% if chip.link.url.href %} hws-chip--link{% endif %}"
      {% if chip.link.url.href %}href="{{ chip.link.url.href }}"{% if chip.link.open_in_new_tab %} target="_blank" rel="noopener"{% endif %}{% endif %}>
      {% if chip.style == 'image' and has_image %}
        <img src="{{ chip.image.src }}" alt="{{ chip.image.alt }}" loading="lazy">
      {% else %}
        {% if chip.label %}<span class="hws-chip__label">{{ chip.label }}</span>{% endif %}
        {% if chip.value %}<span class="hws-chip__value">{{ chip.value }}</span>{% endif %}
        {% if chip.caption %}<span class="hws-chip__caption">{{ chip.caption }}</span>{% endif %}
      {% endif %}
    </{{ tag }}>
  {% endif %}
{% endmacro %}

<section class="hws-hero{% if s.full_bleed %} hws-hero--bleed{% endif %}{% if not s.show_tilt %} hws-hero--flat{% endif %}"
         data-hws-hero
         data-duration="{{ duration }}"
         data-pause-on-hover="{{ 'true' if s.pause_on_hover else 'false' }}"
         style="{{ vars }}">

  {# ---------------------------------------------------- copy #}
  <div class="hws-hero__inner">
    <div class="hws-hero__content">
      {% if module.headline_group.line_1 or module.headline_group.line_2 %}
        <h1 class="hws-hero__title">
          {% if module.headline_group.line_1 %}
            <span class="hws-hero__title-line">{{ module.headline_group.line_1 }}</span>
          {% endif %}
          {% if module.headline_group.line_2 %}
            <span class="hws-hero__title-line hws-hero__title-line--accent">{{ module.headline_group.line_2 }}</span>
          {% endif %}
        </h1>
      {% endif %}

      {% if module.headline_group.subhead %}
        <div class="hws-hero__desc">{{ module.headline_group.subhead }}</div>
      {% endif %}

      {% if module.cta_group.primary_text or module.cta_group.secondary_text %}
        <div class="hws-hero__cta">
          {% if module.cta_group.primary_text %}
            <a class="hws-btn"
               href="{{ module.cta_group.primary_link.url.href }}"
               {% if module.cta_group.primary_link.open_in_new_tab %}target="_blank" rel="noopener"{% endif %}>
              <span class="hws-btn__arrow">{{ module.cta_group.primary_text }}</span>
            </a>
          {% endif %}
          {% if module.cta_group.secondary_text %}
            <a class="hws-link"
               href="{{ module.cta_group.secondary_link.url.href }}"
               {% if module.cta_group.secondary_link.open_in_new_tab %}target="_blank" rel="noopener"{% endif %}>
              {{ module.cta_group.secondary_text }}
            </a>
          {% endif %}
        </div>
      {% endif %}
    </div>
  </div>

  {# ----------------------------------------------- showcase #}
  {% if slide_list %}
    <div class="hws-hero__showcase">
      <div class="hws-panel">

        {# progress dots (mobile) #}
        <div class="hws-dots">
          {% for slide in slide_list %}
            <div class="hws-dot-track{% if loop.first %} is-active{% endif %}" data-index="{{ loop.index0 }}">
              <button type="button" class="hws-dot" aria-label="Show {{ slide.tab_label|striptags }}"></button>
              <span class="hws-dot-progress"></span>
            </div>
          {% endfor %}
        </div>

        {# tabs (desktop) #}
        <div class="hws-tabs-wrap">
          <div class="hws-tabs">
            {% for slide in slide_list %}
              <button type="button"
                      class="hws-tab{% if loop.first %} is-active is-current{% endif %}"
                      data-index="{{ loop.index0 }}">
                {# always rendered — with no icon it becomes a plain stage dot #}
                <span class="hws-tab__icon">{% if slide.tab_icon.src %}<img src="{{ slide.tab_icon.src }}" alt="" loading="lazy" width="14" height="14">{% endif %}</span>
                <span class="hws-tab__text">{{ slide.tab_label }}</span>
              </button>
              {% if not loop.last %}
                <span class="hws-line{% if loop.first %} is-active{% endif %}" data-index="{{ loop.index0 }}">
                  <span class="hws-line__track"></span><span class="hws-line__progress"></span>
                </span>
              {% endif %}
            {% endfor %}
          </div>
        </div>

        {# cards #}
        <div class="hws-stage" data-active="0">

          <div class="hws-side hws-side--left">
            {% for slide in slide_list %}
              <div class="hws-chipgroup{% if loop.first %} is-active{% endif %}" data-index="{{ loop.index0 }}">
                {% for chip in slide.chips %}
                  {% if chip.position == 'left' %}{{ render_chip(chip) }}{% endif %}
                {% endfor %}
              </div>
            {% endfor %}
          </div>

          <div class="hws-cards">
            {% for slide in slide_list %}
              <div class="hws-card hws-card--{{ slide.image_fit|default('fill') }}{% if loop.first %} is-active{% endif %}"
                   data-index="{{ loop.index0 }}">
                {% if slide.image.src %}
                  <img class="hws-card__img"
                       src="{{ slide.image.src }}"
                       alt="{{ slide.image.alt|default(slide.tab_label) }}"
                       {% if slide.image.width %}width="{{ slide.image.width }}"{% endif %}
                       {% if slide.image.height %}height="{{ slide.image.height }}"{% endif %}
                       {% if loop.first %}fetchpriority="high"{% else %}loading="lazy"{% endif %}>
                {% else %}
                  <span class="hws-card__empty">Add an image for “{{ slide.tab_label }}”</span>
                {% endif %}
              </div>
            {% endfor %}
          </div>

          <div class="hws-side hws-side--right">
            {% for slide in slide_list %}
              <div class="hws-chipgroup{% if loop.first %} is-active{% endif %}" data-index="{{ loop.index0 }}">
                {% for chip in slide.chips %}
                  {% if chip.position != 'left' %}{{ render_chip(chip) }}{% endif %}
                {% endfor %}
              </div>
            {% endfor %}
          </div>

        </div>
      </div>
    </div>
  {% endif %}

  {# -------------------------------------------------- logos #}
  {% if module.trust_group.show and (module.trust_group.title or module.trust_group.logos) %}
    <div class="hws-hero__inner">
      <div class="hws-trust">
        {% if module.trust_group.title %}
          <p class="hws-trust__title">{{ module.trust_group.title }}</p>
        {% endif %}
        {% if module.trust_group.logos %}
          <ul class="hws-logos">
            {% for item in module.trust_group.logos %}
              {% if item.logo.src %}
                <li>
                  {% if item.link.url.href %}
                    <a href="{{ item.link.url.href }}"
                       {% if item.link.open_in_new_tab %}target="_blank" rel="noopener"{% endif %}>
                      <img src="{{ item.logo.src }}" alt="{{ item.logo.alt }}" loading="lazy">
                    </a>
                  {% else %}
                    <img src="{{ item.logo.src }}" alt="{{ item.logo.alt }}" loading="lazy">
                  {% endif %}
                </li>
              {% endif %}
            {% endfor %}
          </ul>
        {% endif %}
      </div>
    </div>
  {% endif %}

</section>

```

## 3. `module.css` → CSS

<sub>664 lines</sub>

```css
/* ==========================================================
   HotWax Hero Banner
   Every rule is scoped under .hws-hero so nothing leaks into
   (or gets clobbered by) the surrounding HubSpot theme.
   Accent and text colours come from the module's colour
   fields, injected as --hws-accent / --hws-ink.
   ========================================================== */

.hws-hero {
  --hws-accent: #ff3a2d;
  --hws-ink: #212429;
  --hws-ink-soft: #4b5259;
  --hws-muted: #8b9298;
  --hws-line: #e0e3e5;
  --hws-tint: #fdeceb;
  --hws-radius: 20px;

  position: relative;
  background: #fff;
  color: var(--hws-ink);
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
}
.hws-hero *,
.hws-hero *::before,
.hws-hero *::after { box-sizing: border-box; }

/* ----------------------------------------------------------
   Theme armour. HubSpot themes ship global rules — floats from
   the row-fluid grid, heading/paragraph margins, img sizing —
   that otherwise reach inside the module and break the layout.
   These neutralise them; the component rules below still win.
   ---------------------------------------------------------- */
.hws-hero * { float: none !important; }
.hws-hero h1,
.hws-hero p,
.hws-hero ul,
.hws-hero li { margin: 0; padding: 0; }
.hws-hero ul { list-style: none; }
/* every interactive state, not just the base — themes style
   button:hover/:focus/:active, which is what painted a white chip
   behind the stage markers on hover and left it stuck after a click */
.hws-hero button,
.hws-hero button:hover,
.hws-hero button:focus,
.hws-hero button:active,
.hws-hero button:focus-visible,
.hws-hero button:visited {
  font: inherit;
  color: inherit;
  background: none !important;
  background-color: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
  text-decoration: none !important;
  border-radius: 0;
  cursor: pointer;
  text-align: inherit;
  transform: none;
}
.hws-hero a { text-decoration: none; }
.hws-hero img { max-width: 100%; border: 0; }
/* a theme's `img { height: auto }` would collapse the card to nothing */
.hws-hero .hws-card__img { width: 100% !important; height: 100% !important; }
/* the panel must be able to clip the tilted card's bottom corners */
.hws-hero .hws-panel { overflow: hidden !important; }


.hws-hero__inner {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ---------------------------------------------------------- copy */
.hws-hero__content {
  max-width: 640px;
  margin: 40px auto 60px;
  text-align: center;
}

.hws-hero__title {
  margin: 0 0 20px;
  font-family: Sora, Inter, sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.2;
  letter-spacing: -.05em;
}
.hws-hero__title-line {
  display: block;
  background-image: linear-gradient(180deg, var(--hws-ink), #3d444c);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
/* background-image, never the `background` shorthand — the
   shorthand resets background-clip and paints a solid block */
.hws-hero__title-line--accent {
  background-image: linear-gradient(180deg, var(--hws-accent), #b9261d);
}

.hws-hero__desc {
  margin: 0 0 30px;
  font-size: var(--hws-sub, 16px);
  line-height: 1.45;
  color: var(--hws-ink-soft);
  text-wrap: balance;
}
.hws-hero__desc p { margin: 0 0 .5em; }
.hws-hero__desc p:last-child { margin-bottom: 0; }
.hws-hero__desc strong { font-weight: 600; color: var(--hws-ink); }

.hws-hero__cta {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
}
@media (min-width: 640px) { .hws-hero__cta { flex-direction: row; gap: 28px; } }

/* pill button with the sliding arrow */
.hws-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  max-width: 100%;
  padding: .75rem 2.25rem .75rem 1.5rem;
  border: 2px solid var(--hws-accent);
  border-radius: 60px;
  background: var(--hws-accent);
  color: #fff;
  font-family: Sora, Inter, sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: filter .15s ease;
}
.hws-btn:hover { color: #fff; filter: brightness(.94); }
.hws-btn__arrow { position: relative; }
.hws-btn__arrow::before,
.hws-btn__arrow::after {
  content: "";
  position: absolute;
  display: block;
  border-left: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transition: all .15s cubic-bezier(.4, 0, .2, 1);
}
.hws-btn__arrow::before { right: -13px; top: calc(50% - 1px); width: 2px; height: 2px; opacity: 0; }
.hws-btn__arrow::after  { right: -12px; top: calc(50% - 4px); width: .5rem; height: .5rem; transform: rotate(-135deg); }
.hws-btn:hover .hws-btn__arrow::before { right: -16px; width: .625rem; opacity: 1; }
.hws-btn:hover .hws-btn__arrow::after  { right: -17px; }

.hws-link {
  position: relative;
  padding-bottom: 2px;
  font-size: 14px;
  font-weight: 600;
  color: var(--hws-ink);
  text-decoration: none;
  transition: color .25s ease;
}
.hws-link::after {
  content: "";
  position: absolute;
  left: 0; bottom: 0;
  width: 100%; height: 1.5px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .3s cubic-bezier(.22, .8, .3, 1);
}
.hws-link:hover { color: var(--hws-accent); }
.hws-link:hover::after,
.hws-link:focus-visible::after { transform: scaleX(1); }

/* ------------------------------------------------------ entrance */
@keyframes hwsRise {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: none; }
}
.hws-hero__title-line,
.hws-hero__desc,
.hws-hero__cta,
.hws-hero__showcase {
  animation: hwsRise .75s cubic-bezier(.22, .8, .3, 1) both;
}
.hws-hero__title-line:nth-child(1) { animation-delay: .10s; }
.hws-hero__title-line:nth-child(2) { animation-delay: .22s; }
.hws-hero__desc     { animation-delay: .36s; }
.hws-hero__cta      { animation-delay: .48s; }
.hws-hero__showcase { animation-delay: .60s; animation-duration: .9s; }

/* --------------------------------------------------- the panel */
/* Full-bleed inside HubSpot's constrained column.
   --hws-vw is set by module.js to the real content width; it falls
   back to 100vw, which overshoots by the scrollbar width and can
   cause a stray horizontal scrollbar. */
.hws-hero--bleed .hws-hero__showcase {
  width: var(--hws-vw, 100vw);
  margin-left: calc(50% - (var(--hws-vw, 100vw) / 2));
  margin-right: calc(50% - (var(--hws-vw, 100vw) / 2));
}

.hws-panel {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  text-align: center;
  background: linear-gradient(180deg, var(--hws-tint) 68%, var(--hws-accent) 112%);
}
.hws-hero:not(.hws-hero--bleed) .hws-panel { border-radius: 40px; }

.hws-panel::after {
  content: "";
  position: absolute;
  inset: 18px;
  z-index: -1;
  background: radial-gradient(circle at 1px 1px, rgba(0, 0, 0, .08) 1px, transparent 1.5px);
  background-size: 20px 20px;
  pointer-events: none;
}

/* ----------------------------------------------------- the tabs */
.hws-tabs-wrap { display: none; position: relative; z-index: 3; margin: var(--hws-pad, 52px) auto 28px; }
@media (min-width: 768px)  { .hws-tabs-wrap { display: block; } }
@media (min-width: 1280px) { .hws-tabs-wrap { margin-top: calc(var(--hws-pad, 52px) * 1.46); margin-bottom: 38px; } }

.hws-tabs {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: calc(100% - 32px);
  margin: 0 auto;
}

.hws-tab {
  display: flex;
  align-items: center;
  gap: 9px;
  flex-shrink: 0;
  padding: 4px 2px;
  border: 0;
  background: transparent;
  font-family: inherit;
  cursor: pointer;
}

/* the stage marker */
.hws-tab__icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border: 1.5px solid var(--hws-line);
  border-radius: 50%;
  background: transparent;   /* no chip behind the marker */
  color: var(--hws-muted);
  transition: border-color .3s ease, color .3s ease, box-shadow .3s ease;
}
.hws-tab__icon img { width: 12px; height: 12px; object-fit: contain; display: block; }
/* no icon set — a plain dot still reads as a stage marker */
.hws-tab__icon:empty::after {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.hws-tab__text {
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: .07em;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--hws-muted);
  transition: color .3s ease;
}

/* only the stage currently on screen is highlighted */
.hws-tab.is-current .hws-tab__icon {
  border-color: var(--hws-accent);
  color: var(--hws-accent);
  box-shadow: 0 0 0 4px rgba(255, 58, 45, .13);
}
.hws-tab.is-current .hws-tab__text { color: var(--hws-ink); }
.hws-tab.is-current { pointer-events: none; }

.hws-tab:hover .hws-tab__icon { border-color: var(--hws-accent); color: var(--hws-accent); }
.hws-tab:hover .hws-tab__text { color: var(--hws-ink); }
/* focus shows on the marker itself — a rectangle round the whole
   button reads as a stray box */
.hws-tab:focus-visible { outline: none; }
.hws-tab:focus-visible .hws-tab__icon {
  border-color: var(--hws-accent);
  color: var(--hws-accent);
  box-shadow: 0 0 0 4px rgba(255, 58, 45, .22);
}
.hws-tab:focus-visible .hws-tab__text { color: var(--hws-ink); }
.hws-dot:focus-visible { outline: none; }
.hws-dot-track:focus-within { box-shadow: 0 0 0 2px rgba(255, 58, 45, .25); }

/* long labels would burst the row on narrow desktops */
@media (min-width: 768px) and (max-width: 1023px) {
  .hws-tab { gap: 6px; }
  .hws-tab__text { font-size: 9.5px; letter-spacing: .04em; }
  .hws-tab__icon { width: 20px; height: 20px; }
  .hws-tab__icon img { width: 10px; height: 10px; }
}

.hws-line {
  position: relative;
  flex-shrink: 0;
  width: 18px;
  height: 2px;
  margin: 0 10px;
  border-radius: 2px;
  overflow: hidden;
}
@media (min-width: 1024px) { .hws-line { width: 34px; margin: 0 13px; } }
@media (min-width: 1280px) { .hws-line { width: 46px; margin: 0 15px; } }
.hws-line__track,
.hws-line__progress {
  position: absolute;
  top: 0; left: 0;
  height: 100%;
  border-radius: 2px;
}
.hws-line__track { width: 100%; background: var(--hws-line); }
.hws-line__progress { width: 0; background: var(--hws-accent); transition: width .05s linear; }
.hws-line.is-done .hws-line__progress { width: 100% !important; }

/* ------------------------------------------------ mobile dots */
.hws-dots {
  position: relative;
  z-index: 3;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 6px;
  margin: 24px 20px 20px;
}
@media (min-width: 768px) { .hws-dots { display: none; } }

.hws-dot-track {
  position: relative;
  height: 4px;
  border-radius: 4px;
  background: var(--hws-line);
  overflow: hidden;
}
.hws-dot,
.hws-dot-progress { position: absolute; height: 100%; }
.hws-dot { inset: 0; width: 100%; padding: 0; border: 0; background: transparent; cursor: pointer; z-index: 1; }
.hws-dot-progress { top: 0; left: 0; width: 0; border-radius: 4px; background: var(--hws-accent); transition: width .05s linear; }
.hws-dot-track.is-done .hws-dot-progress { width: 100% !important; }

/* ---------------------------------------------------- the cards */
.hws-stage {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  width: 100%;
  max-width: 580px;
  margin: 0 auto;
  perspective: 2400px;
}
@media (min-width: 1024px) { .hws-stage { max-width: 625px; } }
@media (min-width: 1280px) { .hws-stage { max-width: var(--hws-card-w, 780px); } }
@media (min-width: 1600px) { .hws-stage { max-width: calc(var(--hws-card-w, 780px) * 1.13); } }
@media (min-width: 1920px) { .hws-stage { max-width: calc(var(--hws-card-w, 780px) * 1.23); } }

.hws-cards {
  position: relative;
  aspect-ratio: 690 / 420;      /* card shape, independent of image size */
  transform-origin: center;
  transition: all 1s ease-in-out;
}
/* the rotated card's bottom corners are pushed below the panel's
   clip edge, so they're shaved off rather than showing */
@media (min-width: 768px) { .hws-cards { margin-top: 2.75rem; margin-bottom: -58px; } }

/* the two ghost cards stacked behind the live one */
.hws-cards::before,
.hws-cards::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  display: none;
  border-radius: 40px 40px 0 0;
  background: #fff;
  box-shadow: 4px 4px 8px -4px rgba(1, 42, 56, .2),
              -16px 19px 32px -4px rgba(9, 31, 37, .55);
  transition: all 1s ease-in-out;
}
@media (min-width: 768px) {
  .hws-cards::before,
  .hws-cards::after { display: block; }

  /* tilt alternates as the carousel advances */
  .hws-hero:not(.hws-hero--flat) .hws-stage[data-tilt="a"] .hws-cards {
    transform: translateZ(90px) rotateX(var(--hws-tilt, 11deg))
               rotateY(var(--hws-tilt, 11deg)) rotate(calc(var(--hws-tilt, 11deg) * -0.32));
  }
  .hws-hero:not(.hws-hero--flat) .hws-stage[data-tilt="b"] .hws-cards {
    transform: translateZ(90px) rotateX(var(--hws-tilt, 11deg))
               rotateY(calc(var(--hws-tilt, 11deg) * -1)) rotate(calc(var(--hws-tilt, 11deg) * 0.32));
  }
  .hws-stage[data-tilt="a"] .hws-cards::before { transform: translate3d(-34px, 0, -38px); }
  .hws-stage[data-tilt="a"] .hws-cards::after  { transform: translate3d(-17px, 0, -19px); }
  /* the stack leans left, so its shadow falls left too */
  .hws-stage[data-tilt="a"] .hws-cards::before,
  .hws-stage[data-tilt="a"] .hws-cards::after { box-shadow: -14px 18px 30px -8px rgba(9, 31, 37, .40); }
  .hws-stage[data-tilt="b"] .hws-cards::before { transform: translate3d(34px, 0, -38px); }
  .hws-stage[data-tilt="b"] .hws-cards::after  { transform: translate3d(17px, 0, -19px); }
  /* leaning right — shadow follows to the right */
  .hws-stage[data-tilt="b"] .hws-cards::before,
  .hws-stage[data-tilt="b"] .hws-cards::after { box-shadow:  14px 18px 30px -8px rgba(9, 31, 37, .40); }
}

/* the two layers behind the live card — offset in real 3D space
   (translateZ) so they sit further back, not just nudged sideways.
   Their corners peek out to read as a physical stack. */
.hws-cards::before { background: #f6f8f9; }
.hws-cards::after  { background: #fcfdfd; }

.hws-card {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
}
.hws-card.is-active { opacity: 1; pointer-events: auto; }

/* The leaving card stays opaque, comes to the FRONT and slides
   down out of frame while un-rotating — the next card is revealed
   beneath it. This is the source banner's exact mechanic. */
@media (min-width: 768px) {
  .hws-card.is-leaving {
    opacity: 1;
    z-index: 1;
    transition: all 1s ease-in-out;
    transform: translate3d(0, 100%, 0) rotateX(0) rotateY(0) rotate(0);
  }
}

.hws-card__img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: var(--hws-radius) var(--hws-radius) 0 0;
  background: #fff;
}
@media (min-width: 768px) { .hws-card__img { border-radius: 40px 40px 0 0; } }

/* card shadow leans with the stack, so only the stacked side has depth */
.hws-stage[data-tilt="a"] .hws-card.is-active .hws-card__img {
  filter: drop-shadow(-16px 20px 26px rgba(0, 0, 0, .16));
}
.hws-stage[data-tilt="b"] .hws-card.is-active .hws-card__img {
  filter: drop-shadow(16px 20px 26px rgba(0, 0, 0, .16));
}

/* Fill — crop to fill the card. Good for screenshots. */
.hws-card--fill .hws-card__img { object-fit: cover; object-position: center top; }
/* Fit — show the whole image, padded. Good for illustrations. */
.hws-card--fit .hws-card__img { object-fit: contain; padding: 24px 24px 0; }

.hws-card__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: 1px dashed #cfd4d8;
  border-radius: var(--hws-radius) var(--hws-radius) 0 0;
  background: #fff;
  color: var(--hws-muted);
  font-size: 13px;
}

/* ------------------------------------------- floating chips */
.hws-side { position: relative; }
.hws-chipgroup {
  position: absolute;
  top: 0; bottom: 0;
  display: grid;
  align-items: center;
  z-index: 10;
}
.hws-side--left  .hws-chipgroup { left: 0; }
.hws-side--right .hws-chipgroup { right: 0; }
.hws-chipgroup.is-active { z-index: 20; }

.hws-chip { display: none; }
@media (min-width: 768px) {
  .hws-chip {
    display: block;
    position: relative;
    width: max-content;
    max-width: var(--hws-chip-w, 280px);
    border-radius: 16px;
    background: #fff;
    text-decoration: none;
    box-shadow: 4px 4px 8px -4px rgba(1, 42, 56, .2),
                -16px 19px 32px -4px rgba(9, 31, 37, .45);
    opacity: 0;
    transform: translateY(20px);
    transition: all .5s cubic-bezier(.34, 1.56, .64, 1);
  }
}

/* typed info card: LABEL / value / caption */
/* the panel is centre-aligned; chips must not inherit that */
.hws-chip--text { padding: 17px 23px 19px; text-align: left; }
.hws-chip__label,
.hws-chip__value,
.hws-chip__caption { display: block; }
.hws-chip__label {
  font-family: ui-monospace, "JetBrains Mono", Menlo, Consolas, monospace;
  font-size: 11px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--hws-accent);
}
.hws-chip__value {
  margin-top: 4px;
  font-family: ui-monospace, "JetBrains Mono", Menlo, Consolas, monospace;
  font-size: 26px;
  font-weight: 600;
  line-height: 1.15;
  color: var(--hws-ink);
}
.hws-chip__caption {
  margin-top: 5px;
  font-size: 12.5px;
  line-height: 1.35;
  color: var(--hws-muted);
}

.hws-chip--image { padding: 0; overflow: hidden; }
.hws-chip--image img { display: block; width: 100%; height: auto; border-radius: inherit; }

/* clickable chips get a little lift */
.hws-chip--link { cursor: pointer; }
.hws-chip--link:hover {
  box-shadow: 4px 4px 10px -4px rgba(1, 42, 56, .25),
              -16px 22px 38px -4px rgba(9, 31, 37, .5);
}
.hws-chip--link:hover .hws-chip__value { color: var(--hws-accent); }

.hws-side--left  .hws-chip:nth-child(1) { left: calc(-100% + 30px); top: 12%; }
.hws-side--left  .hws-chip:nth-child(2) { left: calc(-100% + 30px); top: 2%; }
.hws-side--right .hws-chip:nth-child(1) { right: calc(-100% + 50px); top: 28%; }
.hws-side--right .hws-chip:nth-child(2) { right: calc(-100% + 30px); top: 10%; }

.hws-chipgroup.is-active .hws-chip { opacity: 1; transform: translateY(0); }
.hws-side--left  .hws-chipgroup.is-active .hws-chip:nth-child(1) { transition-delay: .2s; }
.hws-side--left  .hws-chipgroup.is-active .hws-chip:nth-child(2) { transition-delay: .4s; }
.hws-side--right .hws-chipgroup.is-active .hws-chip:nth-child(1) { transition-delay: .8s; }
.hws-side--right .hws-chipgroup.is-active .hws-chip:nth-child(2) { transition-delay: 1s; }

/* ------------------------------------------------- logo strip */
.hws-trust { margin: 40px auto 0; text-align: center; }
@media (min-width: 1024px) { .hws-trust { margin-top: 80px; } }

.hws-trust__title {
  display: inline-block;
  margin: 0 0 2rem;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--hws-muted);
  transition: color .3s ease;
}
.hws-trust__title:hover { color: var(--hws-accent); }

.hws-logos {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 28px 40px;
  max-width: 1150px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
}
.hws-logos li {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
}
.hws-logos img {
  max-height: 100%;
  max-width: 150px;
  width: auto;
  object-fit: contain;
  filter: grayscale(1);
  opacity: .55;
  transition: filter .3s ease, opacity .3s ease, transform .3s ease;
}
.hws-logos li:hover img {
  filter: grayscale(0);
  opacity: 1;
  transform: scale(1.06);
}
/* touch devices can't hover — don't strand them on grey logos */
@media (hover: none) {
  .hws-logos img { filter: none; opacity: .92; transform: none; }
}
@media (max-width: 767px) {
  .hws-logos { gap: 22px 30px; }
  .hws-logos li { height: 36px; }
  .hws-logos img { max-width: 112px; }
}

/* ----------------------------------------------------- mobile */
@media (min-width: 768px) {
  .hws-hero__content { margin-top: 60px; margin-bottom: 60px; }
  .hws-hero__title { font-size: var(--hws-h1, 48px); margin-bottom: 12px; }
  .hws-hero__desc { margin-bottom: 32px; }
}
@media (max-width: 767px) {
  .hws-hero__content { margin: 40px auto; }
  .hws-hero__title { font-size: 28px; margin-bottom: 16px; }
  .hws-hero__desc { font-size: 14px; margin-bottom: 24px; }
  .hws-hero__cta .hws-btn { width: 100%; min-width: 0; }

  .hws-panel { border-radius: 0; }
  .hws-panel::after { inset: 12px; background-size: 16px 16px; }

  /* side columns are hidden, so drop the 3-column grid or the
     stage would collapse to zero width */
  .hws-stage { display: block; max-width: 100%; padding: 0 16px; perspective: none; }
  .hws-side { display: none; }
  .hws-cards { transform: none; margin-top: 0; }
}
@media (max-width: 380px) {
  .hws-hero__title { font-size: 26px; }
  .hws-stage { padding: 0 12px; }
}

@media (prefers-reduced-motion: reduce) {
  .hws-hero *,
  .hws-hero *::before,
  .hws-hero *::after {
    animation-duration: .001ms !important;
    transition-duration: .001ms !important;
  }
}

```

## 4. `module.js` → JS

<sub>202 lines</sub>

```javascript
/* ==========================================================
   HotWax Hero Banner — carousel controller

   Reads its slides from the DOM, so adding or removing a card
   in the HubSpot sidebar needs no change here. Supports several
   instances of the module on one page.
   ========================================================== */

(function () {
  "use strict";

  var TICK = 50; // ms between progress-bar updates

  function initHero(root) {
    if (root.hasAttribute("data-hws-ready")) return;
    root.setAttribute("data-hws-ready", "");

    var stage = root.querySelector(".hws-stage");
    if (!stage) return;

    var cards  = Array.prototype.slice.call(stage.querySelectorAll(".hws-card"));
    var groups = Array.prototype.slice.call(stage.querySelectorAll(".hws-chipgroup"));
    var tabs   = Array.prototype.slice.call(root.querySelectorAll(".hws-tab"));
    var lines  = Array.prototype.slice.call(root.querySelectorAll(".hws-line"));
    var dots   = Array.prototype.slice.call(root.querySelectorAll(".hws-dot-track"));

    var count = cards.length;
    if (!count) return;

    var duration = parseInt(root.getAttribute("data-duration"), 10);
    if (!duration || duration < 500) duration = 5000;

    var pauseOnHover = root.getAttribute("data-pause-on-hover") !== "false";
    var reduced = window.matchMedia &&
                  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var current = 0;
    var elapsed = 0;
    var timer = null;

    function bars(i) {
      var out = [];
      if (lines[i]) out.push(lines[i].querySelector(".hws-line__progress"));
      if (dots[i])  out.push(dots[i].querySelector(".hws-dot-progress"));
      return out.filter(Boolean);
    }

    function clearProgress() {
      lines.forEach(function (l) {
        l.classList.remove("is-done");
        var p = l.querySelector(".hws-line__progress");
        if (p) p.style.width = "0%";
      });
      dots.forEach(function (d) {
        d.classList.remove("is-done");
        var p = d.querySelector(".hws-dot-progress");
        if (p) p.style.width = "0%";
      });
    }

    function render(next, prev) {
      // tilt alternates direction each slide
      stage.setAttribute("data-active", String(next));
      stage.setAttribute("data-tilt", next % 2 === 0 ? "a" : "b");

      cards.forEach(function (c, i) {
        c.classList.remove("is-leaving");
        c.classList.toggle("is-active", i === next);
      });

      // outgoing card slides down out of frame, in front, over 1s
      if (typeof prev === "number" && prev !== next && cards[prev]) {
        var leaving = cards[prev];
        leaving.classList.add("is-leaving");
        setTimeout(function () { leaving.classList.remove("is-leaving"); }, 1000);
      }

      groups.forEach(function (g) {
        var i = parseInt(g.getAttribute("data-index"), 10);
        g.classList.toggle("is-active", i === next);
      });

      tabs.forEach(function (t, i) {
        t.classList.toggle("is-active", i <= next);
        t.classList.toggle("is-current", i === next);
        t.setAttribute("aria-selected", i === next ? "true" : "false");
      });

      lines.forEach(function (l, i) {
        l.classList.toggle("is-active", i === next);
        l.classList.toggle("is-done", i < next);
      });

      dots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === next);
        d.classList.toggle("is-done", i < next);
        if (i > next) {
          var p = d.querySelector(".hws-dot-progress");
          if (p) p.style.width = "0%";
        }
      });
    }

    function goTo(index) {
      var prev = current;
      current = ((index % count) + count) % count;
      if (current === 0) clearProgress();
      render(current, prev);
      elapsed = 0;
      bars(current).forEach(function (b) { b.style.width = "0%"; });
    }

    function tick() {
      elapsed += TICK;
      var pct = Math.min(100, (elapsed / duration) * 100);
      bars(current).forEach(function (b) { b.style.width = pct + "%"; });
      if (elapsed >= duration) goTo(current + 1);
    }

    function start() {
      if (reduced || timer || count < 2) return;
      timer = setInterval(tick, TICK);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        goTo(parseInt(tab.getAttribute("data-index"), 10));
      });
    });
    dots.forEach(function (track) {
      var btn = track.querySelector(".hws-dot");
      if (!btn) return;
      btn.addEventListener("click", function () {
        goTo(parseInt(track.getAttribute("data-index"), 10));
      });
    });

    if (pauseOnHover) {
      stage.addEventListener("mouseenter", stop);
      stage.addEventListener("mouseleave", start);
      stage.addEventListener("focusin", stop);
      stage.addEventListener("focusout", start);
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });

    // don't animate off-screen
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) start(); else stop();
        });
      }, { threshold: 0.15 }).observe(stage);
    }

    render(0);
    start();
  }

  /* Feed the true content width to CSS for the full-bleed panel.
     100vw includes the scrollbar, which would push the page sideways. */
  function syncViewportWidth() {
    var w = document.documentElement.clientWidth;
    document.documentElement.style.setProperty("--hws-vw", w + "px");
  }

  function initAll() {
    syncViewportWidth();
    var roots = document.querySelectorAll("[data-hws-hero]");
    Array.prototype.forEach.call(roots, initHero);
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(syncViewportWidth, 120);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }

  // HubSpot's page editor swaps markup in without a page reload, and
  // themes sometimes inject modules late. Watch for new instances
  // instead of relying on a single load event.
  if ("MutationObserver" in window) {
    var mo = new MutationObserver(function () {
      if (document.querySelector("[data-hws-hero]:not([data-hws-ready])")) initAll();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }

  // belt and braces for slow/late renders
  window.addEventListener("load", initAll);
})();

```

## 5. `meta.json` → Meta (only if you created the module by hand)

<sub>16 lines</sub>

```json
{
  "label": "HotWax Hero Banner",
  "description": "Animated hero banner with a rotating showcase of solution cards, plus a client logo strip.",
  "icon": "",
  "is_available_for_new_content": true,
  "global": false,
  "host_template_types": ["PAGE", "BLOG_LISTING", "BLOG_POST"],
  "content_tags": [],
  "categories": ["DESIGN"],
  "smart_type": "NOT_SMART",
  "master_language": "en",
  "css_assets": [],
  "js_assets": [],
  "external_js": [],
  "other_assets": []
}

```

