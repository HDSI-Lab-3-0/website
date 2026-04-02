# How to add, update, or edit an event

Events are Markdown or MDX files in the Astro content collection `events`.

## Where files live

- Content: [`src/content/events/`](../../src/content/events/) — use `.md` or `.mdx`.
- URL: `/events/<slug>` where `<slug>` matches the file path without extension (e.g. `workshop-name.mdx` → `/events/workshop-name`).
- Listing and detail routing: [`src/pages/events/`](../../src/pages/events/).

## Add a new event

1. Create a new file under `src/content/events/`.
2. Add YAML frontmatter that satisfies the `events` schema in [`src/content.config.ts`](../../src/content.config.ts).

### Required frontmatter

| Field | Notes |
| --- | --- |
| `eventName` | Display title |
| `eventDescription` | Short summary (cards/previews) |
| `eventDateStart` | ISO datetime, e.g. `2026-03-01T09:00:00.000Z` |
| `eventDateEnd` | End datetime |
| `eventStatus` | One of: `upcoming`, `ongoing`, `completed`, `cancelled` |
| `eventLocation` | Venue or format |
| `eventFor` | Audience line |
| `eventImage` | Required; path to an image under `src/assets/` (relative to the content file, e.g. `../../assets/events/photo.webp`) |

### Optional frontmatter

`heroImage`, `imageGif`, `eventTags` (array of strings for filters).

## Body content

Below the frontmatter, write normal Markdown/MDX. The page body is rendered inside the event layout.

## Update or remove

- **Edit:** change the same `.md`/`.mdx` file; keep frontmatter valid so the build passes.
- **Remove:** delete the file (or move it out of `src/content/events/`). The route disappears on the next build.

## Reference for authors

See [`event-markdown-generator.txt`](../../event-markdown-generator.txt) at the repo root for field descriptions and tag ideas.

## Preview

```bash
bun run dev
```

Visit `/events` and the specific event URL.
