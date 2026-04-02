# How to change the Privacy Policy

The privacy policy is a **static Astro page**, not a content collection.

## File to edit

[`src/pages/privacy.astro`](../../src/pages/privacy.astro)

Change the HTML sections under `<main>` as needed (collection practices, COPPA, media policy, third-party links, contact, etc.).

## Route

Published at `/privacy`. Linked from [`src/components/layout/Footer.astro`](../../src/components/layout/Footer.astro).

## “Last updated” date

Like the Terms page, this uses `new Date().toLocaleDateString()` at **build time**. For a fixed legal date, replace that expression with an explicit date string.

## Preview

```bash
bun run dev
```

Open `/privacy`.
