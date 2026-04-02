# How to change the Privacy Policy

The privacy policy is **hard-coded HTML** in one Astro page—same pattern as the Terms page.

---

## File and route

| | |
| --- | --- |
| **Edit this file** | [`src/pages/privacy.astro`](../../src/pages/privacy.astro) |
| **Public URL** | `/privacy` |
| **Linked from** | [`src/components/layout/Footer.astro`](../../src/components/layout/Footer.astro) (“Privacy Policy”) |

---

## What to edit

1. Open `privacy.astro`.
2. Main content is under `<main>`, after the centered header with `<h1>Privacy Policy</h1>`.
3. Sections are numbered blocks (`1. Information Collection`, `2. COPPA Compliance`, etc.). Each uses `<h2>`, paragraphs, and sometimes lists or colored callouts (e.g. COPPA in `bg-amber-50`).

**Adding a new section:** duplicate a full `<div class="mb-12">...</div>` block, increment the section number in the heading, and write your copy. Match heading levels: top-level sections use `h2` in this file.

---

## Page title and meta

Like Terms, the head uses:

```astro
<BaseHead
  title={`Privacy Policy - ${SITE_TITLE}`}
  description={SITE_DESCRIPTION}
/>
```

Override `description` here if you want a privacy-specific meta description for search/social previews.

---

## “Last updated” date

The page uses `new Date().toLocaleDateString()` in the header area—see [Terms of Service](../terms-of-service/README.md) for why that behaves like a **build-time** stamp and how to replace it with a **fixed** string for compliance records.

---

## Contact section

Section 6 (“Contact Us”) currently says to contact the team in general. If you add a **specific email or form URL**, put it in that section’s `<p>` (and consider adding the same contact block to `contact.astro` or `consts` if you centralize it later—out of scope unless you refactor).

---

## Preview

```bash
bun run dev
```

Open `http://localhost:4321/privacy`.
