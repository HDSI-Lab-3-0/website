# How to update members

Member profiles are **not** in the content collections; they come from JSON plus static images.

## Data file

Edit [`src/data/members.json`](../../src/data/members.json). The top-level key is `members` (array of objects).

### Typical fields

| Field | Required | Notes |
| --- | --- | --- |
| `name` | Yes | |
| `role` | Yes | Shown on the card |
| `image` | Yes | Public URL, e.g. `/images/members/name.webp` |
| `bio` | Yes | |
| `category` | Yes | Controls grouping and order (see below) |
| `sketch` | No | Optional hover image, public URL |
| `majors` | No | Array of strings |
| `minors` | No | Array of strings |
| `graduatingYear` | No | Number |

### Categories

Used by [`src/pages/members.astro`](../../src/pages/members.astro) for sections and sorting:

- `director`
- `senior-lab-fellow`, `lab-fellow`
- `senior-volunteer`, `volunteer`

Seniority within lab fellow and volunteer groups is defined in that file (`seniorityOrder`).

## Images

Place files under [`public/images/members/`](../../public/images/members/) (and optionally [`public/images/sketches/`](../../public/images/sketches/) for `sketch`). Reference them with site-root paths like `/images/members/foo.webp`.

The repo may use [`scripts/optimize-images.ts`](../../scripts/optimize-images.ts) in workflows that touch member assets—check that script if you add large originals.

## Preview

```bash
bun run dev
```

Open `/members`.
