# How to change the Terms of Service

The Terms of Service are **hard-coded HTML** inside a single Astro page. There is **no** separate Markdown file or CMS entry.

---

## File and route

| | |
| --- | --- |
| **Edit this file** | [`src/pages/terms.astro`](../../src/pages/terms.astro) |
| **Public URL** | `/terms` |
| **Linked from** | [`src/components/layout/Footer.astro`](../../src/components/layout/Footer.astro) (“Terms of Service”) |

---

## What to edit

1. Open `terms.astro`.
2. Find `<main>...</main>` — all user-visible legal copy lives in the sections **below** the page title strip (the `<h1>Terms of Service</h1>` block).
3. Each numbered section is a `<div class="mb-12">` with an `<h2>` and `<p>` (and sometimes a styled callout `<div>`).

**Styling:** classes are Tailwind-style utilities (`prose`, `text-slate-600`, etc.). When you add a new subsection:

- Reuse the same patterns as neighboring sections so typography stays consistent.
- For emphasis boxes (like “HDSI and UCSD Branding”), copy the existing `bg-blue-50` / `border` block structure.

---

## Page title and meta

The document title is set in frontmatter:

```astro
<BaseHead
  title={`Terms of Service - ${SITE_TITLE}`}
  description={SITE_DESCRIPTION}
/>
```

To customize the **browser tab title** or **meta description** for this page only, change those props (you can pass a dedicated string instead of `SITE_DESCRIPTION`).

---

## “Last updated” date

Near the top of the content, the template prints something like:

```astro
Last updated: {new Date().toLocaleDateString()}
```

That runs at **build time** (and in dev, at request time in dev server). The date you see in production is therefore tied to **when the site was built**, not necessarily when legal counsel approved the text.

**To show a fixed legal date**, replace the expression with a string, for example:

```astro
Last updated: April 2, 2026
```

(or keep ISO format if you prefer machine-readable consistency in the HTML only).

---

## After editing

1. Run `bun run dev` and read `/terms` start-to-finish.
2. Run `bun run build` once before merging if you want to catch Astro/template errors.

---

## Preview

```bash
bun run dev
```

Open `http://localhost:4321/terms`.
