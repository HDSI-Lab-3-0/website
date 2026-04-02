# How to update the home page

The home page is a single Astro file, not a markdown collection.

## Site title and meta description

Edit [`src/consts.ts`](../../src/consts.ts): `SITE_TITLE` and `SITE_DESCRIPTION`. These feed `<title>`, Open Graph, and other SEO metadata via `BaseHead`.

## Hero, mission, about, and CTAs

Edit [`src/pages/index.astro`](../../src/pages/index.astro). Copy for the hero headline, mission bullets, “About Us,” and “Data Science at UC San Diego” lives inline in the HTML.

## Images

- Hero and “About Us” images are imported from [`src/assets/`](../../src/assets/) (`heroImage`, `aboutImage` at the top of `index.astro`).
- Add new assets under `src/assets/`, update the import paths, and adjust `alt` text in the `<Image>` components.

## Sponsors section

The sponsors grid reads [`src/data/sponsors.json`](../../src/data/sponsors.json). Each entry supports `name`, `description`, and `url` (the card links to `url`).

## Preview

```bash
bun run dev
```

Then open `/` on the local dev server.
