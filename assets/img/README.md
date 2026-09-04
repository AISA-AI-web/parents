# Images

## The AISA logo — drop-in slot

The header and footer currently use the **AISA wordmark set in DM Sans Bold**,
which is the brand system's sanctioned placeholder when no logo file is
available. To swap in the real logo:

1. Save the file here as `aisa-logo.svg` (preferred — it stays sharp at any
   size) or `aisa-logo.png` at 2× the display size.
   - Use a version that reads clearly on **deep purple**, since the header and
     footer are `--aisa-purple`. A white or gold lockup usually works best.
2. In `index.html`, replace the wordmark span in the header:

   ```html
   <!-- from -->
   <span class="brand__mark">AISA</span>

   <!-- to -->
   <img class="brand__logo" src="assets/img/aisa-logo.svg"
        alt="American International School in Abu Dhabi">
   ```

3. Do the same for the footer wordmark (`.site-footer .brand__mark`).
4. `.brand__logo` is already styled in `assets/css/aisa.css` — it constrains
   height and lets the width scale, so no other CSS change is needed.

Keep the `alt` text as the school's full name. It is the site's identity, not
decoration, so it must not be `aria-hidden` or given empty alt text.

## Photography

Photos of real students require the school's usual media-consent checks before
they go on a public page. Once cleared, save them here and reference them from
the page; keep them under ~300 KB each so the site stays fast on a phone, and
always give a meaningful `alt` description.
