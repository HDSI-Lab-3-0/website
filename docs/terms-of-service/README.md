# How to change the Terms of Service

Terms are a **static Astro page**, not a content collection.

## File to edit

[`src/pages/terms.astro`](../../src/pages/terms.astro)

Update the HTML inside `<main>`: section headings, paragraphs, and callouts are plain markup with Tailwind-style classes.

## Route

Published at `/terms`. Linked from [`src/components/layout/Footer.astro`](../../src/components/layout/Footer.astro).

## “Last updated” date

The page shows `Last updated:` using `new Date().toLocaleDateString()` in the Astro template. That evaluates at **build time**, so the date reflects when the site was built unless you replace it with a fixed string.

## Preview

```bash
bun run dev
```

Open `/terms`.
