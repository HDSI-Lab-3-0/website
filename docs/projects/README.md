# How to add, update, or edit a project

Projects are Markdown or MDX files in the Astro content collection `projects`.

## Where files live

- Content: [`src/content/projects/`](../../src/content/projects/) — `.md` or `.mdx`.
- URL: `/projects/<slug>` where `<slug>` is the file path without extension.
- Routing: [`src/pages/projects/[...slug].astro`](../../src/pages/projects/[...slug].astro).

## Add a new project

1. Add `your-project-name.md` (or `.mdx`) under `src/content/projects/`.
2. Fill frontmatter to match the `projects` schema in [`src/content.config.ts`](../../src/content.config.ts).

### Commonly used frontmatter

| Field | Notes |
| --- | --- |
| `title` | Required |
| `description` | Required; short summary |
| `pubDate` | Required; date |
| `updatedDate` | Optional |
| `heroImage`, `imageGif` | Optional; use `image()` paths per Astro content layer |
| `links.lessonPlan`, `links.materials` | Optional URLs |
| `tags` | Optional array; used for filters |
| `estimated_time`, `sponsor`, `status`, `audience`, `engagementType`, `location`, `relevance` | Optional metadata for listing/filters |

## Body

Write Markdown/MDX below the frontmatter; it renders inside [`ProjectPost`](../../src/layouts/ProjectPost.astro).

## Update or remove

- **Edit:** modify the same file; keep types consistent with `content.config.ts`.
- **Remove:** delete the file from `src/content/projects/` (or move to [`src/content/archive/`](../../src/content/archive/) if you keep archives there).

## Reference

See [`project-markdown-generator.txt`](../../project-markdown-generator.txt) at the repo root for authoring hints.

## Preview

```bash
bun run dev
```

Browse `/projects` and the project detail URL.
