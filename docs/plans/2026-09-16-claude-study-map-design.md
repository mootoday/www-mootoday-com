# Claude study map: generated content

## Goal

Replace the hard-coded data in the "Learn Claude Code in a day" post with a JSON file that is regenerated with the local `claude` CLI, reviewed in a PR, and merged. Drop the "in a day" framing so readers learn at their own pace. Readers who already marked concepts as learned keep their progress across regenerations.

## Decisions

- Generation runs locally via `claude -p` on the author's subscription. No worker, no API key, no R2.
- Cadence is manual: run the script (typically on Sundays), review the diff, open a PR, merge.
- Scope stays Claude Code only (source: `code.claude.com/docs/llms.txt`).
- Everything is generated (concepts, groups, relations, stage names and exercises) within one fixed structure: exactly 6 ordered stages, no clock times.
- The post moves to `/blog/learn-claude-code` with a 301 from `/blog/learn-claude-code-in-a-day`.

## Files

```
src/content/blog/learn-claude-code/
  index.md                  title/summary without "in a day"
  claude-study-map.svelte   renders from imported JSON; computed layout
  study-map.json            generated, committed
src/lib/claude-study/
  types.ts, v1-ids.ts       shared types; old v1 id → slug id table
  study-map.ts              map logic (pure), see exports below
  progress.ts               localStorage progress logic (pure)
  layout.ts                 computed SVG layout (pure)
  *.test.ts                 Vitest; committed-map.test.ts checks the committed JSON
scripts/claude-study/
  generate.ts               fetch index, run claude, validate, write JSON, print changelog
  prompt.md                 system rules appended to claude's prompt
  schema.json               output JSON schema
src/routes/blog/[slug]/+page.ts   301 from /blog/learn-claude-code-in-a-day
tests/claude-study.test.ts        Playwright
.claude-study/                    local generator output (gitignored)
```

`study-map.json` is in `.prettierignore` so the generator's tab-indented output stays stable in PR diffs.

`study-map.ts` exports:

- `parseDocSlugs(llmsTxt)`: doc slugs from the `llms.txt` index.
- `resolveId(id, aliases)`: follows alias chains; throws on cycles.
- `validate(draft, prev, docSlugs, { force })`: list of errors (empty when valid).
- `finalize(draft, prev, now)`: the committed map (version, `generatedAt`, `addedIn`, `retiredIn`, aliases as an object; drops `revChanges`).
- `changelog(prev, next, reasons)`: Markdown for the PR description.
- `warnings(map, prev?)`: soft-limit warnings.
- `uncoveredDocs(prev, docSlugs)`: index pages no current concept, retired id or alias source covers.
- `MAX_CHURN` (0.25), `STAGE_COUNT` (6), `MAX_NEW_CONCEPTS` (6).

## Data format (`study-map.json`)

```jsonc
{
	"version": 12, // +1 per successful generation (set by script)
	"generatedAt": "2026-09-20T06:00:00Z", // set by script
	"stages": [{ "n": 1, "name": "Foundations", "exercise": "Run claude in a real repo…" }], // exactly 6
	"groups": [
		{ "id": "how-it-works", "title": "How it works", "concepts": ["how-claude-code-works"] }
	],
	"concepts": [
		{
			"id": "hooks-guide", // = primary doc slug; never reused for another concept
			"title": "Hooks",
			"stage": 3,
			"docs": ["hooks-guide", "hooks"],
			"summary": "Deterministic shell, HTTP…",
			"related": ["permissions", "plugins"], // stored one direction, made symmetric at load
			"rev": 2, // bumped only on material change to what to learn
			"addedIn": 9 // version first seen (set by script; renames keep the old id's)
		}
	],
	"aliases": { "old-id": "new-id" }, // merges/renames, kept across versions
	"retired": [{ "id": "…", "title": "…", "retiredIn": 11 }]
}
```

Array order of `concepts` within a stage is the recommended study order. Group order drives layout order.

## Generator (`npm run study:generate`)

Requires Node ≥ 22.18 (built-in type stripping): the script runs `generate.ts` directly with `node` (`engines` in `package.json`).

1. Reject unknown arguments. Fetch `https://code.claude.com/docs/llms.txt` (30 s timeout); read current `study-map.json`. Abort if the index looks wrong: fewer than 50 doc pages, or more than half of the current concepts' main doc pages missing.
2. Run `claude -p --safe-mode --restricted --no-session-persistence --output-format json --permission-mode dontAsk` with `prompt.md` appended to the system prompt (`--append-system-prompt`); on stdin: `<docs_index>` (the index), `<current_study_map>` (current JSON), and `<uncovered_doc_pages>` (index slugs not in any current concept's `docs`, not retired, not an alias source); JSON output constrained by `schema.json` via `--json-schema` (`structured_output`). Tools: `--tools WebFetch` with `--allowedTools 'WebFetch(domain:code.claude.com)'`. `--restricted` ignores user/project/local settings, so the domain rule doesn't depend on the machine. The run is killed after 15 minutes; elapsed time and permission denials (tool and URL) are printed on stderr.
   - If claude exits non-zero, is killed (timed out), returns unparseable output, `is_error`, or no `structured_output`: write raw stdout to `.claude-study/last-raw.txt` and exit non-zero with code, signal, `subtype` and the first 500 characters of `result`.
3. The draft includes `revChanges`: one `{ id, reason }` per concept whose `rev` went up, giving readers a one-sentence reason.
4. Validate (below). On failure: print reasons, write the draft to `.claude-study/last-failed.json` (gitignored), exit non-zero.
5. Script assigns `version`, `generatedAt`, `addedIn` and `retiredIn`, converts `aliases` to an object, and drops `revChanges`. Existing ids keep their `addedIn`; a new id that a newly added alias from a previous concept points to (a rename or a merge into a new id) takes that concept's `addedIn`, the minimum if several point to it; other new ids get the new version. Newly retired ids get the new version. Soft limits (45–70 concepts, 8–12 groups of 3–8, summaries ≤ 200 characters, at most 6 new concepts, not counting rename targets) print warnings on stderr but don't fail.
6. On success: write `study-map.json` and print a Markdown changelog (new / updated / merged / retired) to stdout for the PR description. Rename targets appear only under merged, not new. Updated entries end with their rev reason.

Flags: `--dry-run` (write the finalized map to `.claude-study/dry-run.json` instead of `study-map.json`, print the changelog), `--force` (bypass only the churn limit).

### Prompt rules (`prompt.md`)

- Preserve every existing id whose doc page still exists.
- New concept ids are their primary doc slug; a second concept on the same page uses `<slug>--<short-name>`. Never reuse or re-add a retired id or alias source.
- Merges and renames go into `aliases`; removals go into `retired`. Existing aliases and retired entries are carried over unchanged.
- Bump `rev` only when what a reader should learn materially changed, with a one-sentence reason in `revChanges` naming the change and the doc page; no nameable change, no bump.
- Stability applies to existing content, not coverage: keep existing titles, summaries, `docs`, `related`, stage and group text and relative order unless inaccurate; merge or retire at most a quarter of concepts.
- Add concepts (at most 6 per update) for major uncovered topics: features, workflows, surfaces, integrations, or core guides; not reference, changelog, troubleshooting, legal or pricing pages.
- Exactly 6 stages, ordered foundations → advanced; each has a name and a hands-on exercise.
- Calm, self-paced tone; no times, no "day" language.

### Validation (`validate` in `study-map.ts`)

1. Output matches `schema.json`. This is enforced by the CLI's `--json-schema` and not checked again at runtime.
2. Exactly 6 stages, `n` = 1..6 in order, each with at least one concept.
3. Concept ids unique and shaped like a doc slug, optionally with a `--suffix`, whose slug part is in `llms.txt`; `stage` is an integer 1..6; `rev` is an integer ≥ 1.
4. Every concept has at least one doc; doc slugs are unique within a concept and exist in `llms.txt`.
5. `related` entries are unique, not the concept itself, and existing concepts. Group ids are unique, groups are non-empty, group entries are existing concepts, and every concept is in exactly one group.
6. `retired` ids are unique and not current concepts. Alias sources are unique, not current concepts, and not also retired. Alias chains resolve without cycles and end at a current concept or a retired id.
7. Against the previous map: previous aliases are kept with the same target; previous retired ids are kept; new alias sources and retired ids were previously a concept, alias source or retired id.
8. Id stability: every previous concept id is still a concept, an alias source, or retired.
9. Churn limit: retired + merged ≤ 25% of previous concepts (bypass with `--force`).
10. `rev` never decreases.
11. `revChanges` ids are unique, have non-empty reasons, and match exactly the concepts whose `rev` increased.

First run: `study-map.json` was seeded from the previously hard-coded data (converted to slug ids, `version: 1`); generation builds on top.

## Component

- `import data from './study-map.json'`; no runtime fetching.
- Replace fixed geometry (`CX`/`RY`, 10 groups) with a computed layout (`layout(groups)`): pack groups into 3 columns balancing height, with the hub in the middle column (at most two groups there: one above and one below the hub); derive pill positions and spokes that cross no other box from the result.
- `related` is made symmetric at load. A map view (SVG) and a list view (default on narrow screens); pills and list buttons carry `data-id` with the concept id.
- Copy: "stages" instead of timed blocks; no clock times; progress shown as "X of N learned".

## Reader progress (`progress.ts`)

localStorage key `claude-study:v2`:

```jsonc
{
	"learned": { "hooks-guide": 2 }, // id → rev when marked learned
	"opened": ["mcp-quickstart"],
	"seenVersion": 11, // last version whose changes were dismissed
	"since": 9 // version at first visit; later concepts show as new
}
```

On load:

1. **Migrate v1** (only when there is no valid v2): read `cc-day-map:v1`, map old short ids to slug ids via a fixed table in code (`V1_IDS`, e.g. `loop` → `how-claude-code-works`), dropping unknown ids; migrated entries get rev 1 and `seenVersion`/`since` 1. The component writes v2 and leaves v1 untouched.
2. **Resolve aliases** for all stored `learned` and `opened` ids, following chains. A learned id reached through an alias gets rev 0, so it shows as "Updated — review" (its old rev counter is unrelated); when several stored ids resolve to one concept, the lowest rev wins. A broken alias map falls back to the stored id instead of dropping progress.
3. **New badge**: `addedIn > since`, not in `opened`, and not already learned. Dismissing the banner does not clear badges. Renames keep `addedIn` from the alias source, so a renamed concept does not show as new.
4. **Updated — review**: learned with stored rev < current `rev`. Still counts as learned; opening the concept updates the stored rev.
5. **Retired**: stored ids found in `retired` appear in a "Previously learned, now retired" list and are excluded from the X of N count.
6. **What changed banner**: when `seenVersion < version` and something changed, show counts of new (`addedIn > seenVersion`, not learned) / to review (learned with an older rev) / retired (`retiredIn > seenVersion`); dismissing sets `seenVersion = version`. First-time visitors get `seenVersion = version` silently.

## Testing

- Vitest: `study-map.test.ts` against hand-built previous/next fixtures (clean update, silent drop, merge, churn over limit, unknown slug, alias cycle, rev decrease, rev reasons), plus `finalize` (including `addedIn` for renames), `changelog`, `warnings` and `uncoveredDocs`.
- Vitest: `progress.test.ts` (v1 migration, alias chains, new/updated/retired states, banner counts).
- Vitest: `layout.test.ts` (no overlaps, spokes cross no box, random group sizes).
- Vitest: `committed-map.test.ts` checks the committed `study-map.json` offline: every `V1_IDS` target is known, `validate` passes, every cluster gets a spoke, no soft-limit warnings.
- Playwright (`tests/claude-study.test.ts`): load `/blog/learn-claude-code`, mark a concept learned (found by `data-id`), reload, still learned; v1 progress migrates; old URL redirects.
- Generator: manual `--dry-run` review.
