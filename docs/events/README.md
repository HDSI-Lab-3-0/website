# How to add, update, or edit an event

Events live in the Astro content collection **`events`**: Markdown (`.md`) or MDX (`.mdx`) under [`src/content/events/`](../../src/content/events/). The build validates frontmatter against [`src/content.config.ts`](../../src/content.config.ts).

---

## Where things connect

| Piece | Role |
| --- | --- |
| [`src/content/events/*.md(x)`](../../src/content/events/) | Source files: frontmatter + body |
| [`src/pages/events/index.astro`](../../src/pages/events/index.astro) | `/events` — loads all events, passes them to [`EventsApp`](../../src/components/events/EventsApp.tsx) |
| [`src/pages/events/[...slug].astro`](../../src/pages/events/[...slug].astro) | `/events/<id>` — one page per entry; wraps body in [`EventPost`](../../src/layouts/EventPost.astro) |
| [`src/layouts/EventPost.astro`](../../src/layouts/EventPost.astro) | Layout: hero, dates, status UI, TOC, rendered MDX |
| [`src/data/tags.json`](../../src/data/tags.json) | Category labels used by the events UI filters (keep new tags aligned when possible) |

**URL shape:** the collection entry **`id`** (usually the filename without extension) becomes the slug. Example: `robot-teddy-bear-scavenger-hunt.mdx` → `/events/robot-teddy-bear-scavenger-hunt`.

---

## Add a new event

1. **Create a file** in `src/content/events/`, e.g. `my-workshop.mdx`.
2. **Add YAML frontmatter** between `---` lines at the top (see required fields below).
3. **Write the body** in Markdown/MDX below the second `---`.
4. **Images:** add image files under [`src/assets/`](../../src/assets/) (often `src/assets/events/`) and reference them from frontmatter with a path **relative to the event file**, e.g. `../../assets/events/my-cover.webp`.
5. Run `bun run dev` and open `/events` and `/events/<your-filename-without-extension>`.

---

## Frontmatter (schema)

All required fields must be present or **`bun run build` will fail** with a Zod/content error.

### Required

| Field | Type | Notes |
| --- | --- | --- |
| `eventName` | string | Title shown in UI |
| `eventDescription` | string | Short summary (cards, meta) |
| `eventDateStart` | datetime | ISO-8601, e.g. `2026-03-01T09:00:00.000Z` |
| `eventDateEnd` | datetime | End time (same or later than start) |
| `eventStatus` | enum | **`upcoming`** \| **`ongoing`** \| **`completed`** \| **`cancelled`** |
| `eventLocation` | string | Venue or online format |
| `eventFor` | string | Audience line |
| `eventImage` | image ref | Processed by Astro’s `image()` helper—path relative to file into `src/assets/` |

### Optional

| Field | Notes |
| --- | --- |
| `heroImage` | Optional alternate hero visual |
| `imageGif` | Optional; layout may prefer GIF for hero when set |
| `eventTags` | `string[]` — used for **filters** on `/events`; see [`tags.json`](../../src/data/tags.json) for canonical category values |

### Minimal example (adjust paths and dates)

```yaml
---
eventName: "Example Workshop"
eventDescription: "One-line summary for listings."
eventDateStart: 2026-06-15T14:00:00.000Z
eventDateEnd: 2026-06-15T17:00:00.000Z
eventStatus: "upcoming"
eventLocation: "HDSI Lab 3.0, UC San Diego"
eventFor: "High school students and teachers"
eventImage: "../../assets/events/example.webp"
eventTags:
  - "at UCSD"
  - "High School"
  - "Free"
---
```

Then add `# Example Workshop` and sections in Markdown.

---

## Update an existing event

- Edit the same `.md`/`.mdx` file.
- If you **rename the file**, the **URL changes** (slug = new basename). Update any external links to the old URL.
- Keep `eventStatus` in sync with reality, or use `cancelled` if the event is called off.

---

## Remove an event

Delete the file from `src/content/events/` (or move it outside that folder). The route disappears on the next build. **RSS:** events are not in the projects RSS feed; no RSS change for events.

---

## Listing page copy and filters

- **Hero text** on `/events` (“Events & Programs”, description, stats) is in [`src/pages/events/index.astro`](../../src/pages/events/index.astro).
- **Filter chips and behavior** are implemented in [`EventsApp`](../../src/components/events/EventsApp.tsx) and related components, using tags from entries + [`tags.json`](../../src/data/tags.json).

For a long **authoring checklist** (tags, sections), use [`event-markdown-generator.txt`](../../event-markdown-generator.txt) at the repo root.

---

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Build error about frontmatter | Compare every required key and types to `events` in `content.config.ts` |
| Broken image | Path from the `.mdx` file to `src/assets/`; file exists and is committed |
| Event missing on `/events` | File is under `src/content/events/` with valid frontmatter; dev server restarted if needed |

---

## Preview

```bash
bun run dev
```

- List: `http://localhost:4321/events`
- Detail: `http://localhost:4321/events/<slug>`
