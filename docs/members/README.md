# How to update members

The members page is driven by **JSON + static image files**, not by Markdown collections.

| Piece | File |
| --- | --- |
| Member data | [`src/data/members.json`](../../src/data/members.json) |
| Page layout & grouping | [`src/pages/members.astro`](../../src/pages/members.astro) |
| Card UI | [`src/components/members/MemberCard.tsx`](../../src/components/members/MemberCard.tsx) |
| Photos (served as-is) | [`public/images/members/`](../../public/images/members/), optional sketches in [`public/images/sketches/`](../../public/images/sketches/) |

---

## Edit `members.json`

The file must stay **valid JSON**:

- Double quotes for keys and strings.
- Trailing commas are **not** allowed.
- Top-level shape: `{ "members": [ /* array of objects */ ] }`.

### Fields per member

| Field | Required | Description |
| --- | --- | --- |
| `name` | Yes | Full name on the card |
| `role` | Yes | Role line (e.g. “Lab Fellow”, “Director”) |
| `image` | Yes | **URL path from site root**, e.g. `/images/members/jane.webp` |
| `bio` | Yes | Paragraph shown on the card |
| `category` | Yes | Controls **which section** the person appears in and **sort order** (see below) |
| `sketch` | No | Optional “hover” image; same path style as `image` |
| `majors` | No | Array of strings; rendered as tags |
| `minors` | No | Array of strings |
| `graduatingYear` | No | Number; shown as “Class of YYYY” when set |

### Categories (`category` values)

[`members.astro`](../../src/pages/members.astro) groups people into:

1. **Director** — `category: "director"` (typically one featured card).
2. **Lab fellows** — `senior-lab-fellow` or `lab-fellow` (combined into one section; seniors sort before regular fellows).
3. **Volunteers** — `senior-volunteer` or `volunteer` (same seniority pattern).

**Seniority** inside lab-fellow and volunteer buckets is controlled by `seniorityOrder` in `members.astro`. Within the same seniority tier, members are sorted **alphabetically by name**.

If you use an unexpected `category` string, the member may not appear in the expected section—stick to the values above.

### Example object

```json
{
  "name": "Jane Doe",
  "role": "Lab Fellow",
  "image": "/images/members/jane-doe.webp",
  "sketch": "/images/sketches/jane-doe-sketch.webp",
  "bio": "Short bio for the card.",
  "category": "lab-fellow",
  "majors": ["Computer Science"],
  "minors": ["Cognitive Science"],
  "graduatingYear": 2027
}
```

---

## Add or replace photos

1. **Optimize** images (WebP is used elsewhere in the repo).
2. Put the main headshot in `public/images/members/` (e.g. `jane-doe.webp`).
3. Optionally add a sketch under `public/images/sketches/`.
4. Set `image` and `sketch` to paths starting with `/images/...` so the browser loads them from `public/`.

**Why `/images/...`?** Files in [`public/`](../../public/) are copied to the site root at build time. They are **not** imported through Astro’s asset pipeline like `src/assets/`.

The script [`scripts/optimize-images.ts`](../../scripts/optimize-images.ts) may reference member paths—if your workflow runs it, check that file when adding new filenames.

---

## Add a new member

1. Add image(s) under `public/images/...`.
2. Append a new object to the `members` array in `members.json`.
3. Set `category` so they land in Director / Lab fellows / Volunteers as intended.
4. Run `bun run dev` and open `/members`.

---

## Remove a member

Remove their object from the `members` array. You can delete unused images from `public/` in the same commit to avoid orphans.

---

## Troubleshooting

| Problem | Fix |
| --- | --- |
| JSON parse error | Validate JSON (no comments, no trailing commas) |
| Broken image | Path must match a file under `public/`; path is case-sensitive on many servers |
| Wrong section | Fix `category` to a supported value |

---

## Preview

```bash
bun run dev
```

Open `http://localhost:4321/members`.
