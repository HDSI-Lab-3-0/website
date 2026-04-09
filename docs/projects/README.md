# How to add, update, or edit a project

Projects use the Astro content collection **`projects`**: `.md` or `.mdx` files under [`src/content/projects/`](../../src/content/projects/). Frontmatter is validated in [`src/content.config.ts`](../../src/content.config.ts).

---

## Where things connect

| Piece | Role |
| --- | --- |
| [`src/content/projects/*`](../../src/content/projects/) | One file per project |
| [`src/pages/projects/index.astro`](../../src/pages/projects/index.astro) | `/projects` — hero, optional CTA link, passes entries to [`ProjectsApp`](../../src/components/projects/ProjectsApp.tsx) |
| [`src/pages/projects/[...slug].astro`](../../src/pages/projects/[...slug].astro) | `/projects/<id>` — renders MD/MDX body inside [`ProjectPost`](../../src/layouts/ProjectPost.astro) |
| [`src/pages/rss.xml.js`](../../src/pages/rss.xml.js) | `/rss.xml` — RSS items are **projects** only (`getCollection('projects')`) |

**Slug:** collection entry `id` is usually the filename without extension → `/projects/qubit-demo` for `qubit-demo.md`.

---

## Add a new project

1. Create `your-slug.md` (or `.mdx`) in `src/content/projects/`. **Slug** = filename without extension; use lowercase and hyphens for stable URLs.
2. Fill **required** frontmatter: `title`, `description`, `pubDate`.
3. Add optional fields for cards/filters and hero media (see below).
4. Write the body in Markdown/MDX (headings, lists, etc.).
5. Run `bun run dev` — check `/projects` and `/projects/your-slug`.

---

## Frontmatter (projects schema)

### Required

| Field | Type | Notes |
| --- | --- | --- |
| `title` | string | Project name |
| `description` | string | Short blurb for listings/cards |
| `pubDate` | date | e.g. `2026-02-02` (coerced to `Date`) |

### Optional (common)

| Field | Notes |
| --- | --- |
| `updatedDate` | Shown when you track revisions |
| `heroImage`, `imageGif` | Paths resolved via `image()` in the schema—place files under `src/assets/` and reference relative to the project file |
| `links.lessonPlan`, `links.materials` | Optional URLs for supplemental resources |
| `relevance` | Extra text/metadata depending on layout |
| `tags` | `string[]` — filters on `/projects`; align with [`src/data/tags.json`](../../src/data/tags.json) when possible |
| `estimated_time` | Number (e.g. minutes) |
| `sponsor`, `status`, `audience`, `engagementType`, `location` | Metadata for listing filters and detail header |

**Hero media priority:** if both `imageGif` and `heroImage` are set, **`imageGif` is used first** for the grid, modal, and project detail hero (`imageGif` → `heroImage`).

---

### Images: `src/assets` vs `public`

- **Frontmatter image fields** (`heroImage`, `imageGif`): paths **relative to the project file** into [`src/assets/`](../../src/assets/). They are validated by Astro’s `image()` helper and optimized at build time.
- **`public/`**: files are served at the **site root** unchanged (e.g. `/assets/project-placeholder-1.webp` for listing fallbacks when no project image is set). Use `public/` for static URLs, not for collection `image()` references.

---

### Detail hero `<Image>` dimensions

The project detail layout ([`ProjectPost.astro`](../../src/layouts/ProjectPost.astro)) passes `width` and `height` to `<Image>` for the hero. Those values set the **default displayed width** (up to the content column) and drive optimization and aspect ratio—they are not forced to stretch past that width.

### Example

```yaml
---
title: "Example Activity"
description: "One-line summary for cards and SEO."
pubDate: 2026-01-15
updatedDate: 2026-02-01
status: "Active"
audience: "Middle School"
engagementType: "Workshop"
location: "Classroom"
sponsor: "HDSI LAB 3.0"
tags: ["at UCSD", "Middle School", "Free"]
estimated_time: 45
---
```

Then add `# Example Activity` and sections in the body.

---

## Update or retire a project

- **Edit:** change the same file; keep frontmatter valid.
- **Rename file:** changes the URL — update links and any printed materials.
- **Archive:** some repos keep old writeups under [`src/content/archive/`](../../src/content/archive/) instead of deleting—**those files are not in the `projects` collection** unless you move them back into `src/content/projects/`.

---

## Listing page (`/projects`)

Hero copy (“Educational Projects”, description) and the **Google Form CTA** live in [`src/pages/projects/index.astro`](../../src/pages/projects/index.astro). To change the external form URL, edit the `href` on that hero `<a>`.

Filters and grid behavior are in [`ProjectsApp`](../../src/components/projects/ProjectsApp.tsx) and related components.

---

## RSS

Subscribers to `/rss.xml` receive **projects** entries. Adding or removing a project file updates the feed on the next deploy.

---

## Reference

[`project-markdown-generator.txt`](../../project-markdown-generator.txt) at the repo root has extra authoring notes.

---

## Troubleshooting

| Issue | Check |
| --- | --- |
| Build fails on frontmatter | Compare to `projects` in `content.config.ts` |
| Image missing | Path relative to `.md` file into `src/assets/`; extension and case correct |
| Project not in filters | `tags` and other metadata match what `ProjectsApp` / `tags.json` expect |

---

## Preview

```bash
bun run dev
```

- `http://localhost:4321/projects`
- `http://localhost:4321/projects/<slug>`
