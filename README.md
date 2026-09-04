# AISA Parent Training Hub

A permanent, shareable home for every workshop, presentation and guide the
American International School in Abu Dhabi uses to train parents.

**Live site:** https://aisa-ai-web.github.io/parents/ *(once GitHub Pages is enabled — see below)*

---

## Why this exists

Parent training content has always been generous and fragile at the same time:
decks live on laptops, handouts live in inboxes, recordings live nowhere. This
repository is the fix. Anything we build to support families gets published
here, in full, and stays here — so it outlives the term it was made for.

Three rules the site is designed around:

1. **One permanent home** — every resource, in one place, organised the way
   parents look for things.
2. **Download, don't request** — nothing is view-only and nothing expires.
3. **Shareable to the resource** — every collection has its own link, so you can
   send someone straight to the thing they need.

---

## Repository layout

```
.
├── index.html              # The home page
├── assets/
│   ├── css/aisa.css        # AISA brand stylesheet — shared by every page
│   ├── js/site.js          # Search, filtering, copy-link, mobile nav
│   └── fonts/              # DM Sans (self-hosted, OFL 1.1)
└── resources/              # Published files (slides, PDFs, handouts)
    └── <collection>/       # One folder per collection
```

---

## Adding a resource

### 1. Add the file

Drop the file into the folder for its collection, creating the folder if it
doesn't exist yet:

```
resources/digital-citizenship/screen-time-agreements-2026.pdf
```

Naming convention — lowercase, hyphens, and a year so it's obvious when a
resource is due for review:

```
<topic>-<short-description>-<year>.<ext>
```

Publish the **original** file (`.pptx`, `.pdf`, `.docx`) so parents can keep,
print or translate it. If a deck is large, also export a PDF alongside it.

### 2. Update the collection card

Open `index.html`, find the matching `<li class="collection">` block, and bump
`data-count` to the number of published resources:

```html
<li class="collection" id="digital-citizenship" data-category="technology"
    data-count="3"
    data-keywords="digital citizenship online safety screen time ...">
```

The badge flips from *Coming soon* to *Available* and the resource count updates
on its own — that's handled in `assets/js/site.js`.

### 3. Adding a whole new collection

Copy any existing `<li class="collection">` block in `index.html` and change:

| Attribute / element | What to set |
|---|---|
| `id` | A short, permanent slug — this becomes the shareable link (`#your-slug`). **Never change it once shared.** |
| `data-category` | One of `wellbeing`, `technology`, `learning`, `school-life`. Adding a new one? Add a matching `.filter` button too. |
| `data-count` | Number of published resources |
| `data-keywords` | Extra words parents might search for — these are matched by the search box but not shown |
| `.collection__icon svg` | A simple line icon, `stroke-width="1.8"`, no fills |
| `<h3>` and `.collection__desc` | The title and a one- or two-sentence description |
| `.copy-link` `data-anchor` | Must match the `id` above |

---

## Brand rules

The site follows the AISA brand system. Everything is defined as CSS custom
properties at the top of `assets/css/aisa.css` — **use the tokens, never a raw
hex value.**

| Token | Value | Use |
|---|---|---|
| `--aisa-purple` | `#21076C` | Headings, header, hero, footer |
| `--aisa-gold` | `#D8B664` | Eyebrows, stat numbers, CTAs, accents |
| `--aisa-white` | `#FFFFFF` | Default background |
| `--aisa-near-black` | `#1A1A1A` | Body copy |
| `--aisa-muted-gray` | `#555555` | Captions and secondary text |
| `--aisa-purple-tint` | `#F2EFFA` | Card and section fills |
| `--aisa-purple-border` | `#C8BEE8` | Borders and dividers |

- Typeface is **DM Sans** throughout, no substitutes. It is **self-hosted** from
  `assets/fonts/` rather than pulled from a CDN, so the brand font still renders
  on school or home networks that block third-party font hosts, and the site
  works offline. Two variable-font files (~55 KB) cover every weight.
- Purple carries structure; gold only accents. Never gold for body text.
- White backgrounds by default; full-bleed purple for the hero and footer only.
- No cream, beige or off-white — `--aisa-purple-tint` is the only off-white.

---

## Running it locally

No build step, no dependencies. Either open `index.html` directly, or serve it
so that copy-link produces real URLs:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## Publishing

The site is plain static HTML, so GitHub Pages serves it as-is:

**Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**

Every push to `main` republishes. There is nothing to build.

---

## Accessibility

Please keep it that way when you edit:

- Every image and icon is either labelled or `aria-hidden` when decorative.
- Colour contrast meets WCAG AA. Note the one trap: **gold text only works on
  purple** (8.2:1). On white or the tint it drops to ~1.9:1 and fails, so on
  light backgrounds the eyebrow label uses `--aisa-muted-gray` text with a small
  gold block as the accent — that's what `.eyebrow` does by default.
  `.eyebrow--on-dark` is the gold variant, for the purple hero only.
- The page is fully keyboard navigable, with a visible gold focus ring.
- The site works with JavaScript disabled — search and filtering are
  enhancements, not requirements.
- Text reflows to a phone screen without horizontal scrolling.
