# How to update the home page

The home page is **one Astro page**: [`src/pages/index.astro`](../../src/pages/index.astro). It is **not** part of a Markdown collection—text and structure are edited directly in the template.

---

## 1. Site title and default description (SEO)

Edit [`src/consts.ts`](../../src/consts.ts):

- **`SITE_TITLE`** — default document title (e.g. tab label) when pages do not override `title`.
- **`SITE_DESCRIPTION`** — meta description used by [`BaseHead`](../../src/components/layout/BaseHead.astro) for SEO and social cards.

The home page passes these into `<BaseHead title={SITE_TITLE} description={SITE_DESCRIPTION} />`.

---

## 2. What each section of `index.astro` controls

Open `index.astro` and scroll by section (comments in the file help):

| Section | What to change | Where in the file |
| --- | --- | --- |
| **Hero** | Eyebrow text (“HDSI Lab 3”), main headline, supporting paragraph, primary button label and **link** (`href`) | First `<section>` after `<main>`; hero uses a full-bleed background image |
| **Our Mission** | Section title, intro paragraph, bullet list items | Second major `<section>` (“Our Mission”) |
| **About Us** | Heading, body copy, image | “About Us” grid: text column + `<Image>` for `aboutImage` |
| **Data Science at UC San Diego** | Heading + paragraph | Following section with centered text |
| **Our Sponsors** | Not inline—driven by JSON (see below) | `sponsors.sponsors.map(...)` |

To change **wording only**, edit the text nodes inside the relevant `<p>`, `<h1>`, `<h2>`, `<li>`, or the CTA `<a>`.

---

## 3. Hero and About images

At the top of `index.astro`, images are imported from [`src/assets/`](../../src/assets/):

- **`heroImage`** — full-width hero background (`home_group.webp` by default).
- **`aboutImage`** — “About Us” column image (`Lab3_students.webp` by default).

**To use a new image:**

1. Add the file under `src/assets/` (WebP/JPEG/PNG as appropriate).
2. Add or adjust an import: `import myPhoto from "@/assets/my-photo.webp";`
3. Replace `src={heroImage}` / `src={aboutImage}` (or the import names) on the `<Image>` components.
4. Update each image’s **`alt`** string for accessibility.

Astro’s `<Image>` handles optimization; prefer reasonable dimensions to keep the build fast.

---

## 4. Sponsors grid

Data file: [`src/data/sponsors.json`](../../src/data/sponsors.json).

Structure:

```json
{
  "sponsors": [
    {
      "name": "Display name",
      "type": "optional label (not always shown on home)",
      "description": "Short blurb shown on the card",
      "url": "https://example.org"
    }
  ]
}
```

- **Add a sponsor:** append an object to the `sponsors` array.
- **Remove:** delete that object.
- **Reorder:** change array order (the home page maps in order).

Each card is a link: clicking goes to `url` in a new tab (`target="_blank"`).

---

## 5. Checklist before you commit

- [ ] `bun run dev` — home loads at `/` with no console errors.
- [ ] If you changed `consts.ts`, spot-check another page’s tab title/description if you care about global defaults.
- [ ] New images: file size reasonable; `alt` text updated.

---

## 6. Preview command

```bash
bun run dev
```

Open `http://localhost:4321/`.
