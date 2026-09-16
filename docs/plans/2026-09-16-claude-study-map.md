# Claude Study Map Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the hard-coded "Learn Claude Code in a day" map with a committed `study-map.json` that is regenerated locally with `claude -p`, and keep readers' progress across regenerations.

**Architecture:** Pure TypeScript modules in `src/lib/claude-study/` hold validation, versioning, progress, and layout logic (unit-tested with Vitest). A Node script (`scripts/claude-study/generate.ts`, run with Node 24's built-in type stripping) calls the `claude` CLI with a JSON schema, validates the result, and writes the JSON plus a Markdown changelog. The Svelte component imports the JSON and renders a computed layout.

**Tech Stack:** SvelteKit 1 / Svelte 4 (JS + JSDoc in components), mdsvex, Vitest 0.33, Playwright, Node 24, Claude Code CLI 2.1.x.

**Design doc:** `docs/plans/2026-09-16-claude-study-map-design.md`

**Repo rules (from the user's CLAUDE.md):** Do NOT run any modifying git commands (`git add`, `git commit`, `git mv`, `git push`, …) and do not use worktrees. Where a TDD plan would commit, this plan has a **Checkpoint** step instead: stop and let the user review.

---

### Task 0: Baseline

**Step 1: Confirm Vitest runs**

Run: `npx vitest run src/lib 2>&1 | tail -5`
Expected: exits without a config error (it may say "No test files found").

**Step 2: Record the svelte-check baseline**

Run: `npm run check 2>&1 | tail -3`
Expected: a summary line like `svelte-check found N errors and M warnings`. Write down N and M; later tasks must not increase them.

**Step 3: Confirm Node strips types**

Run: `node --version && echo 'const x: number = 1; console.log(x)' > /tmp/strip.ts && node /tmp/strip.ts`
Expected: `v24.x` then `1`.

---

### Task 1: Types and v1 id table

**Files:**
- Create: `src/lib/claude-study/types.ts`
- Create: `src/lib/claude-study/v1-ids.ts`

**Step 1: Write `types.ts`**

```ts
export type Stage = { n: number; name: string; exercise: string };

export type Group = { id: string; title: string; concepts: string[] };

export type Concept = {
	id: string;
	title: string;
	stage: number;
	docs: string[];
	summary: string;
	related: string[];
	rev: number;
	addedIn: number;
};

export type RetiredConcept = { id: string; title: string; retiredIn: number };

export type StudyMap = {
	version: number;
	generatedAt: string;
	stages: Stage[];
	groups: Group[];
	concepts: Concept[];
	aliases: Record<string, string>;
	retired: RetiredConcept[];
};

/** What the model returns. The generator adds version, generatedAt, addedIn and retiredIn. */
export type StudyMapDraft = {
	stages: Stage[];
	groups: Group[];
	concepts: Omit<Concept, 'addedIn'>[];
	aliases: { from: string; to: string }[];
	retired: { id: string; title: string }[];
};
```

**Step 2: Write `v1-ids.ts`**

No imports in this file: the seed script imports it directly from Node.

```ts
/** Maps concept ids from the original "in a day" map (localStorage key cc-day-map:v1) to doc-slug ids. */
export const V1_IDS: Record<string, string> = {
	loop: 'how-claude-code-works',
	tools: 'tools-reference',
	context: 'context-window',
	checkpoint: 'checkpointing',
	sessions: 'sessions',
	commands: 'commands',
	claudemd: 'memory',
	automem: 'memory--auto-memory',
	claudedir: 'claude-directory',
	styles: 'output-styles',
	largecb: 'large-codebases',
	skills: 'skills',
	hooks: 'hooks-guide',
	mcp: 'mcp-quickstart',
	plugins: 'discover-plugins',
	artifacts: 'artifacts',
	cli: 'cli-reference',
	interface: 'terminal-config',
	ide: 'vs-code',
	desktop: 'desktop-quickstart',
	web: 'web-quickstart',
	remote: 'remote-control',
	computer: 'chrome',
	subagents: 'sub-agents',
	agentview: 'agent-view',
	teams: 'agent-teams',
	workflows: 'workflows',
	worktrees: 'worktrees',
	messaging: 'cross-session-messaging',
	permmodes: 'permission-modes',
	permissions: 'permissions',
	sandbox: 'sandboxing',
	settings: 'settings',
	security: 'security',
	headless: 'headless',
	ci: 'github-actions',
	codereview: 'code-review',
	routines: 'routines',
	schedule: 'scheduled-tasks',
	channels: 'channels',
	model: 'model-config',
	caching: 'prompt-caching',
	costs: 'costs',
	debug: 'debug-your-config',
	sdk: 'agent-sdk/overview',
	sdkfeatures: 'agent-sdk/claude-code-features',
	sdkext: 'agent-sdk/custom-tools',
	sdkio: 'agent-sdk/sessions',
	sdkctrl: 'agent-sdk/permissions',
	sdkprompt: 'agent-sdk/modifying-system-prompts',
	sdkhost: 'agent-sdk/hosting',
	managed: 'managed-settings',
	providers: 'authentication',
	gateways: 'gateways',
	network: 'network-config',
	cloudenv: 'cloud-environments',
	monitoring: 'monitoring-usage'
};
```

**Step 3: Sanity check**

Run: `node --input-type=module -e "import { V1_IDS } from './src/lib/claude-study/v1-ids.ts'; const v = Object.values(V1_IDS); console.log(v.length, new Set(v).size)"`
Expected: `57 57`

---

### Task 2: `parseDocSlugs` and `resolveId`

**Files:**
- Create: `src/lib/claude-study/study-map.ts`
- Test: `src/lib/claude-study/study-map.test.ts`

**Step 1: Write the failing tests**

```ts
import { describe, expect, it } from 'vitest';
import { parseDocSlugs, resolveId } from './study-map';

describe('parseDocSlugs', () => {
	it('extracts top-level and nested slugs from llms.txt', () => {
		const txt = [
			'- [Hooks](https://code.claude.com/docs/en/hooks-guide.md): Run commands on events.',
			'- [SDK](https://code.claude.com/docs/en/agent-sdk/overview.md): Build agents.',
			'- [Elsewhere](https://example.com/docs/en/nope.md): Ignored.'
		].join('\n');
		expect([...parseDocSlugs(txt)]).toEqual(['hooks-guide', 'agent-sdk/overview']);
	});
});

describe('resolveId', () => {
	it('follows alias chains', () => {
		expect(resolveId('a', { a: 'b', b: 'c' })).toBe('c');
	});

	it('returns ids without aliases unchanged', () => {
		expect(resolveId('x', { a: 'b' })).toBe('x');
	});

	it('throws on cycles', () => {
		expect(() => resolveId('a', { a: 'b', b: 'a' })).toThrow(/cycle/);
	});
});
```

**Step 2: Run to verify failure**

Run: `npx vitest run src/lib/claude-study/study-map.test.ts`
Expected: FAIL (cannot resolve `./study-map`).

**Step 3: Implement**

`src/lib/claude-study/study-map.ts`. Only use `import type` from other modules, because Node imports this file directly without extensions:

```ts
import type { StudyMap, StudyMapDraft } from './types';

export function parseDocSlugs(llmsTxt: string): Set<string> {
	const slugs = new Set<string>();
	for (const m of llmsTxt.matchAll(/https:\/\/code\.claude\.com\/docs\/en\/([^)\s]+?)\.md\b/g)) {
		slugs.add(m[1]);
	}
	return slugs;
}

export function resolveId(id: string, aliases: Record<string, string>): string {
	const seen = new Set<string>();
	while (aliases[id] !== undefined) {
		if (seen.has(id)) throw new Error(`Alias cycle at ${id}`);
		seen.add(id);
		id = aliases[id];
	}
	return id;
}
```

(The `StudyMap`/`StudyMapDraft` imports are used in Tasks 3–4.)

**Step 4: Run to verify pass**

Run: `npx vitest run src/lib/claude-study/study-map.test.ts`
Expected: PASS (4 tests).

---

### Task 3: `validate`

**Files:**
- Modify: `src/lib/claude-study/study-map.ts`
- Test: `src/lib/claude-study/study-map.test.ts`

**Step 1: Write the failing tests** (append to the test file; extend the import to include `validate` and add the types import)

```ts
import type { StudyMap, StudyMapDraft } from './types';

// 6 concepts, one per stage, so the 25% churn limit allows 1 merge/retirement and rejects 2.
const DOCS = new Set(['hooks-guide', 'hooks', 'memory', 'skills', 'costs', 'headless']);

function prevMap(): StudyMap {
	return {
		version: 3,
		generatedAt: '2026-09-13T00:00:00.000Z',
		stages: [1, 2, 3, 4, 5, 6].map((n) => ({ n, name: `Stage ${n}`, exercise: 'Try it.' })),
		groups: [
			{ id: 'basics', title: 'Basics', concepts: ['memory', 'memory--auto-memory'] },
			{ id: 'extend', title: 'Extend', concepts: ['hooks-guide', 'skills'] },
			{ id: 'ops', title: 'Ops', concepts: ['costs', 'headless'] }
		],
		concepts: [
			{ id: 'memory', title: 'CLAUDE.md', stage: 1, docs: ['memory'], summary: 'm', related: [], rev: 1, addedIn: 1 },
			{ id: 'memory--auto-memory', title: 'Auto memory', stage: 2, docs: ['memory'], summary: 'a', related: ['memory'], rev: 1, addedIn: 2 },
			{ id: 'hooks-guide', title: 'Hooks', stage: 3, docs: ['hooks-guide', 'hooks'], summary: 'h', related: ['skills'], rev: 1, addedIn: 1 },
			{ id: 'skills', title: 'Skills', stage: 4, docs: ['skills'], summary: 's', related: [], rev: 2, addedIn: 1 },
			{ id: 'costs', title: 'Costs', stage: 5, docs: ['costs'], summary: 'c', related: [], rev: 1, addedIn: 1 },
			{ id: 'headless', title: 'Headless', stage: 6, docs: ['headless'], summary: 'x', related: [], rev: 1, addedIn: 1 }
		],
		aliases: { 'old-hooks': 'hooks-guide' },
		retired: [{ id: 'gone', title: 'Gone', retiredIn: 2 }]
	};
}

function draftOf(map: StudyMap): StudyMapDraft {
	return {
		stages: map.stages.map((s) => ({ ...s })),
		groups: map.groups.map((g) => ({ ...g, concepts: [...g.concepts] })),
		concepts: map.concepts.map((c) => ({
			id: c.id, title: c.title, stage: c.stage, docs: [...c.docs],
			summary: c.summary, related: [...c.related], rev: c.rev
		})),
		aliases: Object.entries(map.aliases).map(([from, to]) => ({ from, to })),
		retired: map.retired.map((r) => ({ id: r.id, title: r.title }))
	};
}

function removeConcept(d: StudyMapDraft, id: string) {
	d.concepts = d.concepts.filter((c) => c.id !== id);
	for (const c of d.concepts) c.related = c.related.filter((r) => r !== id);
	for (const g of d.groups) g.concepts = g.concepts.filter((c) => c !== id);
}

describe('validate', () => {
	it('accepts an unchanged map', () => {
		expect(validate(draftOf(prevMap()), prevMap(), DOCS)).toEqual([]);
	});

	it('rejects a concept that disappears silently', () => {
		const d = draftOf(prevMap());
		removeConcept(d, 'skills');
		expect(validate(d, prevMap(), DOCS)).toContain('Concept disappeared without alias or retirement: skills');
	});

	// Every stage must keep at least one concept, so removals below add a replacement on the emptied stage.
	it('accepts a merge recorded as an alias', () => {
		const d = draftOf(prevMap());
		removeConcept(d, 'memory--auto-memory');
		d.aliases.push({ from: 'memory--auto-memory', to: 'memory' });
		d.concepts.push({ id: 'hooks', title: 'Hooks reference', stage: 2, docs: ['hooks'], summary: 'r', related: [], rev: 1 });
		d.groups[1].concepts.push('hooks');
		expect(validate(d, prevMap(), DOCS)).toEqual([]);
	});

	it('rejects too much churn unless forced', () => {
		const d = draftOf(prevMap());
		removeConcept(d, 'memory--auto-memory');
		d.aliases.push({ from: 'memory--auto-memory', to: 'memory' });
		d.concepts.push({ id: 'hooks', title: 'Hooks reference', stage: 2, docs: ['hooks'], summary: 'r', related: [], rev: 1 });
		d.groups[1].concepts.push('hooks');
		removeConcept(d, 'skills');
		d.retired.push({ id: 'skills', title: 'Skills' });
		d.concepts.push({ id: 'hooks-guide--events', title: 'Hook events', stage: 4, docs: ['hooks'], summary: 'e', related: [], rev: 1 });
		d.groups[1].concepts.push('hooks-guide--events');
		expect(validate(d, prevMap(), DOCS).join('\n')).toMatch(/Too many concepts merged or retired: 2 of 6/);
		expect(validate(d, prevMap(), DOCS, { force: true })).toEqual([]);
	});

	it('rejects unknown doc slugs and ids that are not doc slugs', () => {
		const d = draftOf(prevMap());
		d.concepts[0].docs = ['nope'];
		d.concepts.push({ id: 'fancy', title: 'Fancy', stage: 1, docs: ['skills'], summary: 'f', related: [], rev: 1 });
		d.groups[0].concepts.push('fancy');
		const errors = validate(d, prevMap(), DOCS);
		expect(errors).toContain('Unknown doc slug in memory: nope');
		expect(errors).toContain('Concept id is not a doc slug (or slug--suffix): fancy');
	});

	it('rejects a decreased rev', () => {
		const d = draftOf(prevMap());
		d.concepts.find((c) => c.id === 'skills')!.rev = 1;
		expect(validate(d, prevMap(), DOCS)).toContain('rev decreased for skills: 2 -> 1');
	});

	it('rejects alias cycles', () => {
		const d = draftOf(prevMap());
		d.aliases = [{ from: 'x', to: 'y' }, { from: 'y', to: 'x' }];
		expect(validate(d, null, DOCS).join('\n')).toMatch(/cycle/);
	});

	it('requires stages 1-6, each with a concept', () => {
		const d = draftOf(prevMap());
		d.stages = d.stages.slice(0, 5);
		expect(validate(d, prevMap(), DOCS)).toContain('Stages must be numbered 1-6 in order, got: 1,2,3,4,5');
		const e = draftOf(prevMap());
		e.concepts.find((c) => c.id === 'headless')!.stage = 5;
		expect(validate(e, prevMap(), DOCS)).toContain('Stage has no concepts: 6');
	});

	it('requires every concept in exactly one group', () => {
		const d = draftOf(prevMap());
		d.groups[1].concepts.push('memory');
		expect(validate(d, prevMap(), DOCS)).toContain('Concept must be in exactly one group: memory (2)');
	});

	it('rejects unknown related ids', () => {
		const d = draftOf(prevMap());
		d.concepts[0].related = ['nobody'];
		expect(validate(d, prevMap(), DOCS)).toContain('Unknown related id in memory: nobody');
	});

	it('requires previous aliases and retired entries to be kept', () => {
		const d = draftOf(prevMap());
		d.aliases = [];
		d.retired = [];
		const errors = validate(d, prevMap(), DOCS);
		expect(errors).toContain('Previous alias removed: old-hooks');
		expect(errors).toContain('Previously retired id missing: gone');
	});
});
```

**Step 2: Run to verify failure**

Run: `npx vitest run src/lib/claude-study/study-map.test.ts`
Expected: FAIL (`validate` is not exported).

**Step 3: Implement** (append to `study-map.ts`)

```ts
export const MAX_CHURN = 0.25;
export const STAGE_COUNT = 6;
const ID_RE = /^[a-z0-9-]+(\/[a-z0-9-]+)*$/;

export function validate(
	draft: StudyMapDraft,
	prev: StudyMap | null,
	docSlugs: Set<string>,
	opts: { force?: boolean } = {}
): string[] {
	const errors: string[] = [];

	const ids = new Set<string>();
	for (const c of draft.concepts) {
		if (ids.has(c.id)) errors.push(`Duplicate concept id: ${c.id}`);
		ids.add(c.id);
		if (!ID_RE.test(c.id) || !docSlugs.has(c.id.split('--')[0])) {
			errors.push(`Concept id is not a doc slug (or slug--suffix): ${c.id}`);
		}
		if (!c.docs.length) errors.push(`Concept has no docs: ${c.id}`);
		for (const d of c.docs) if (!docSlugs.has(d)) errors.push(`Unknown doc slug in ${c.id}: ${d}`);
		if (!Number.isInteger(c.stage) || c.stage < 1 || c.stage > STAGE_COUNT) {
			errors.push(`Invalid stage for ${c.id}: ${c.stage}`);
		}
		if (!Number.isInteger(c.rev) || c.rev < 1) errors.push(`Invalid rev for ${c.id}: ${c.rev}`);
	}
	for (const c of draft.concepts) {
		for (const r of c.related) {
			if (r === c.id) errors.push(`Concept relates to itself: ${c.id}`);
			else if (!ids.has(r)) errors.push(`Unknown related id in ${c.id}: ${r}`);
		}
	}

	const stageNumbers = draft.stages.map((s) => s.n).join(',');
	const expected = Array.from({ length: STAGE_COUNT }, (_, i) => i + 1).join(',');
	if (stageNumbers !== expected) errors.push(`Stages must be numbered 1-6 in order, got: ${stageNumbers}`);
	for (const s of draft.stages) {
		if (!draft.concepts.some((c) => c.stage === s.n)) errors.push(`Stage has no concepts: ${s.n}`);
	}

	const groupIds = new Set<string>();
	const membership = new Map<string, number>();
	for (const g of draft.groups) {
		if (groupIds.has(g.id)) errors.push(`Duplicate group id: ${g.id}`);
		groupIds.add(g.id);
		if (!g.concepts.length) errors.push(`Empty group: ${g.id}`);
		for (const id of g.concepts) {
			if (!ids.has(id)) errors.push(`Unknown concept in group ${g.id}: ${id}`);
			membership.set(id, (membership.get(id) ?? 0) + 1);
		}
	}
	for (const id of ids) {
		if (membership.get(id) !== 1) {
			errors.push(`Concept must be in exactly one group: ${id} (${membership.get(id) ?? 0})`);
		}
	}

	const retiredIds = new Set(draft.retired.map((r) => r.id));
	for (const id of retiredIds) if (ids.has(id)) errors.push(`Retired id is still a concept: ${id}`);

	const aliases: Record<string, string> = {};
	for (const a of draft.aliases) {
		if (aliases[a.from] !== undefined) errors.push(`Duplicate alias: ${a.from}`);
		if (ids.has(a.from)) errors.push(`Alias source is still a concept: ${a.from}`);
		aliases[a.from] = a.to;
	}
	for (const from of Object.keys(aliases)) {
		try {
			const to = resolveId(from, aliases);
			if (!ids.has(to) && !retiredIds.has(to)) errors.push(`Alias does not resolve to a concept: ${from} -> ${to}`);
		} catch (e) {
			errors.push((e as Error).message);
		}
	}

	if (prev) {
		const known = new Set([...prev.concepts.map((c) => c.id), ...Object.keys(prev.aliases), ...prev.retired.map((r) => r.id)]);
		for (const from of Object.keys(prev.aliases)) {
			if (aliases[from] === undefined) errors.push(`Previous alias removed: ${from}`);
		}
		for (const r of prev.retired) if (!retiredIds.has(r.id)) errors.push(`Previously retired id missing: ${r.id}`);
		for (const from of Object.keys(aliases)) if (!known.has(from)) errors.push(`Alias source was never a concept: ${from}`);
		for (const id of retiredIds) if (!known.has(id)) errors.push(`Retired id was never a concept: ${id}`);

		const nextById = new Map(draft.concepts.map((c) => [c.id, c]));
		let churn = 0;
		for (const c of prev.concepts) {
			const next = nextById.get(c.id);
			if (next) {
				if (next.rev < c.rev) errors.push(`rev decreased for ${c.id}: ${c.rev} -> ${next.rev}`);
			} else if (aliases[c.id] !== undefined || retiredIds.has(c.id)) {
				churn++;
			} else {
				errors.push(`Concept disappeared without alias or retirement: ${c.id}`);
			}
		}
		if (!opts.force && prev.concepts.length && churn / prev.concepts.length > MAX_CHURN) {
			errors.push(`Too many concepts merged or retired: ${churn} of ${prev.concepts.length} (use --force to accept)`);
		}
	}

	return errors;
}
```

**Step 4: Run to verify pass**

Run: `npx vitest run src/lib/claude-study/study-map.test.ts`
Expected: PASS. If a fixture-based test fails because of a *different* rule firing (e.g. a stage becoming empty), fix the fixture edit in the test, not the rule.

**Step 5: Checkpoint.** Stop for user review. No git commands.

---

### Task 4: `finalize` and `changelog`

**Files:**
- Modify: `src/lib/claude-study/study-map.ts`
- Test: `src/lib/claude-study/study-map.test.ts`

**Step 1: Write the failing tests** (add `finalize`, `changelog` to the import)

```ts
describe('finalize', () => {
	it('assigns version, addedIn and retiredIn and converts aliases to an object', () => {
		const d = draftOf(prevMap());
		removeConcept(d, 'skills');
		d.retired.push({ id: 'skills', title: 'Skills' });
		d.concepts.push({ id: 'hooks', title: 'Hooks reference', stage: 4, docs: ['hooks'], summary: 'r', related: [], rev: 1 });
		d.groups[1].concepts.push('hooks');
		const next = finalize(d, prevMap(), new Date('2026-09-20T06:00:00Z'));
		expect(next.version).toBe(4);
		expect(next.generatedAt).toBe('2026-09-20T06:00:00.000Z');
		expect(next.concepts.find((c) => c.id === 'memory--auto-memory')!.addedIn).toBe(2);
		expect(next.concepts.find((c) => c.id === 'hooks')!.addedIn).toBe(4);
		expect(next.retired).toEqual([
			{ id: 'gone', title: 'Gone', retiredIn: 2 },
			{ id: 'skills', title: 'Skills', retiredIn: 4 }
		]);
		expect(next.aliases).toEqual({ 'old-hooks': 'hooks-guide' });
	});
});

describe('changelog', () => {
	it('lists new, updated, merged and retired concepts', () => {
		const d = draftOf(prevMap());
		removeConcept(d, 'memory--auto-memory');
		d.concepts.find((c) => c.id === 'memory')!.stage = 2;
		d.aliases.push({ from: 'memory--auto-memory', to: 'memory' });
		d.concepts.find((c) => c.id === 'hooks-guide')!.rev = 2;
		d.concepts.push({ id: 'hooks', title: 'Hooks reference', stage: 3, docs: ['hooks'], summary: 'r', related: [], rev: 1 });
		d.groups[1].concepts.push('hooks');
		const md = changelog(prevMap(), finalize(d, prevMap(), new Date('2026-09-20T06:00:00Z')));
		expect(md).toContain('## Claude study map v4');
		expect(md).toContain('### New\n\n- Hooks reference (`hooks`, stage 3)');
		expect(md).toContain('### Updated\n\n- Hooks (`hooks-guide`, rev 1 → 2)');
		expect(md).toContain('### Merged\n\n- Auto memory (`memory--auto-memory`) → CLAUDE.md (`memory`)');
		expect(md).not.toContain('### Retired');
	});

	it('says so when nothing changed', () => {
		const next = finalize(draftOf(prevMap()), prevMap(), new Date('2026-09-20T06:00:00Z'));
		expect(changelog(prevMap(), next)).toContain('No concept changes.');
	});
});
```

**Step 2: Run to verify failure**

Run: `npx vitest run src/lib/claude-study/study-map.test.ts`
Expected: FAIL (`finalize` is not exported).

**Step 3: Implement** (append to `study-map.ts`)

```ts
export function finalize(draft: StudyMapDraft, prev: StudyMap | null, now: Date): StudyMap {
	const version = (prev?.version ?? 0) + 1;
	const addedIn = new Map(prev?.concepts.map((c) => [c.id, c.addedIn]) ?? []);
	const retiredIn = new Map(prev?.retired.map((r) => [r.id, r.retiredIn]) ?? []);
	return {
		version,
		generatedAt: now.toISOString(),
		stages: draft.stages,
		groups: draft.groups,
		concepts: draft.concepts.map((c) => ({ ...c, addedIn: addedIn.get(c.id) ?? version })),
		aliases: Object.fromEntries(draft.aliases.map((a) => [a.from, a.to])),
		retired: draft.retired.map((r) => ({ ...r, retiredIn: retiredIn.get(r.id) ?? version }))
	};
}

export function changelog(prev: StudyMap | null, next: StudyMap): string {
	const prevById = new Map(prev?.concepts.map((c) => [c.id, c]) ?? []);
	const title = (id: string) => next.concepts.find((c) => c.id === id)?.title ?? prevById.get(id)?.title ?? id;

	const added = next.concepts.filter((c) => !prevById.has(c.id));
	const updated = next.concepts.filter((c) => {
		const p = prevById.get(c.id);
		return p && c.rev > p.rev;
	});
	const merged = Object.entries(next.aliases).filter(([from]) => !prev || !(from in prev.aliases));
	const retired = next.retired.filter((r) => r.retiredIn === next.version);

	const section = (heading: string, items: string[]) =>
		items.length ? [`### ${heading}`, '', ...items.map((i) => `- ${i}`), ''] : [];

	return [
		`## Claude study map v${next.version}`,
		'',
		`${next.concepts.length} concepts in ${next.groups.length} groups.`,
		'',
		...section('New', added.map((c) => `${c.title} (\`${c.id}\`, stage ${c.stage})`)),
		...section('Updated', updated.map((c) => `${c.title} (\`${c.id}\`, rev ${prevById.get(c.id)!.rev} → ${c.rev})`)),
		...section('Merged', merged.map(([from, to]) => `${title(from)} (\`${from}\`) → ${title(to)} (\`${to}\`)`)),
		...section('Retired', retired.map((r) => `${r.title} (\`${r.id}\`)`)),
		...(added.length + updated.length + merged.length + retired.length ? [] : ['No concept changes.', ''])
	].join('\n');
}
```

**Step 4: Run to verify pass**

Run: `npx vitest run src/lib/claude-study/study-map.test.ts`
Expected: PASS.

---

### Task 5: Reader progress

**Files:**
- Create: `src/lib/claude-study/progress.ts`
- Test: `src/lib/claude-study/progress.test.ts`

**Step 1: Write the failing tests**

```ts
import { describe, expect, it } from 'vitest';
import {
	changesSince, dismissChanges, emptyProgress, learnedCount, loadProgress,
	markOpened, retiredLearned, status, toggleLearned
} from './progress';
import type { StudyMap } from './types';

const concept = (id: string, rev: number, addedIn: number) => ({
	id, title: id.toUpperCase(), stage: 1, docs: [id], summary: '', related: [], rev, addedIn
});

const MAP: StudyMap = {
	version: 5,
	generatedAt: '2026-09-20T06:00:00.000Z',
	stages: [],
	groups: [],
	concepts: [concept('a', 2, 1), concept('b', 1, 5), concept('hooks-guide', 1, 1)],
	aliases: { old: 'a' },
	retired: [{ id: 'r', title: 'R', retiredIn: 4 }]
};

describe('loadProgress', () => {
	it('starts empty for new visitors, at the current version', () => {
		expect(loadProgress(null, null, MAP)).toEqual({ learned: {}, opened: [], seenVersion: 5, since: 5 });
	});

	it('migrates v1 progress and drops unknown ids', () => {
		const p = loadProgress(null, JSON.stringify({ learned: ['hooks', 'bogus'] }), MAP);
		expect(p).toEqual({ learned: { 'hooks-guide': 1 }, opened: [], seenVersion: 1, since: 1 });
	});

	it('prefers v2 over v1', () => {
		const v2 = JSON.stringify({ learned: { b: 1 }, opened: [], seenVersion: 5, since: 5 });
		expect(loadProgress(v2, JSON.stringify({ learned: ['hooks'] }), MAP).learned).toEqual({ b: 1 });
	});

	it('resolves aliases, keeping the lowest rev', () => {
		const v2 = JSON.stringify({ learned: { old: 1, a: 2 }, opened: ['old'], seenVersion: 5, since: 5 });
		const p = loadProgress(v2, null, MAP);
		expect(p.learned).toEqual({ a: 1 });
		expect(p.opened).toEqual(['a']);
	});

	it('ignores corrupt storage', () => {
		expect(loadProgress('{nope', '{nope', MAP)).toEqual(emptyProgress(MAP));
	});
});

describe('status', () => {
	it('flags learned concepts whose rev increased', () => {
		const p = { ...emptyProgress(MAP), learned: { a: 1 } };
		expect(status(p, MAP, 'a')).toEqual({ learned: true, isNew: false, updated: true });
	});

	it('marks concepts added after the first visit as new until opened', () => {
		const p = { ...emptyProgress(MAP), since: 4 };
		expect(status(p, MAP, 'b').isNew).toBe(true);
		expect(status(markOpened(p, MAP, 'b'), MAP, 'b').isNew).toBe(false);
	});
});

describe('actions', () => {
	it('toggleLearned stores the current rev, and removes it again', () => {
		const on = toggleLearned(emptyProgress(MAP), MAP, 'a');
		expect(on.learned).toEqual({ a: 2 });
		expect(toggleLearned(on, MAP, 'a').learned).toEqual({});
	});

	it('markOpened clears the updated flag', () => {
		const p = markOpened({ ...emptyProgress(MAP), learned: { a: 1 } }, MAP, 'a');
		expect(p.learned).toEqual({ a: 2 });
		expect(p.opened).toEqual(['a']);
	});

	it('dismissChanges moves seenVersion to the current version', () => {
		expect(dismissChanges({ ...emptyProgress(MAP), seenVersion: 2 }, MAP).seenVersion).toBe(5);
	});
});

describe('summaries', () => {
	it('counts changes since the last seen version', () => {
		const p = { ...emptyProgress(MAP), seenVersion: 3, learned: { a: 1 } };
		expect(changesSince(p, MAP)).toEqual({ added: 1, retired: 1, updated: 1 });
	});

	it('lists retired concepts the reader had learned and excludes them from counts', () => {
		const p = { ...emptyProgress(MAP), learned: { r: 1, a: 2 } };
		expect(retiredLearned(p, MAP)).toEqual([{ id: 'r', title: 'R', retiredIn: 4 }]);
		expect(learnedCount(p, MAP)).toBe(1);
		expect(learnedCount(p, MAP, ['b'])).toBe(0);
	});
});
```

**Step 2: Run to verify failure**

Run: `npx vitest run src/lib/claude-study/progress.test.ts`
Expected: FAIL (cannot resolve `./progress`).

**Step 3: Implement**

```ts
import type { RetiredConcept, StudyMap } from './types';
import { resolveId } from './study-map';
import { V1_IDS } from './v1-ids';

export const KEY = 'claude-study:v2';
export const V1_KEY = 'cc-day-map:v1';

export type Progress = {
	/** concept id → rev at the time it was marked learned */
	learned: Record<string, number>;
	opened: string[];
	/** last version whose changes the reader dismissed */
	seenVersion: number;
	/** version at the reader's first visit; concepts added later show as new */
	since: number;
};

export function emptyProgress(map: StudyMap): Progress {
	return { learned: {}, opened: [], seenVersion: map.version, since: map.version };
}

function parse(raw: string | null): any {
	try {
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}

export function loadProgress(raw: string | null, rawV1: string | null, map: StudyMap): Progress {
	let p: Progress | null = null;
	const v2 = parse(raw);
	if (v2 && v2.learned && typeof v2.learned === 'object') {
		p = {
			learned: { ...v2.learned },
			opened: Array.isArray(v2.opened) ? v2.opened : [],
			seenVersion: Number(v2.seenVersion) || map.version,
			since: Number(v2.since) || map.version
		};
	} else {
		const v1 = parse(rawV1);
		if (v1 && Array.isArray(v1.learned)) {
			const learned = v1.learned.filter((id: string) => V1_IDS[id]).map((id: string) => [V1_IDS[id], 1]);
			p = { learned: Object.fromEntries(learned), opened: [], seenVersion: 1, since: 1 };
		}
	}
	if (!p) return emptyProgress(map);

	const learned: Record<string, number> = {};
	for (const [id, rev] of Object.entries(p.learned)) {
		const to = resolveId(id, map.aliases);
		learned[to] = to in learned ? Math.min(learned[to], Number(rev)) : Number(rev);
	}
	const opened = [...new Set(p.opened.map((id) => resolveId(id, map.aliases)))];
	return { ...p, learned, opened };
}

export function status(p: Progress, map: StudyMap, id: string) {
	const c = map.concepts.find((c) => c.id === id);
	const rev = p.learned[id];
	return {
		learned: !!c && rev !== undefined,
		isNew: !!c && c.addedIn > p.since && !p.opened.includes(id),
		updated: !!c && rev !== undefined && rev < c.rev
	};
}

export function toggleLearned(p: Progress, map: StudyMap, id: string): Progress {
	const learned = { ...p.learned };
	if (id in learned) delete learned[id];
	else learned[id] = map.concepts.find((c) => c.id === id)?.rev ?? 1;
	return { ...p, learned };
}

export function markOpened(p: Progress, map: StudyMap, id: string): Progress {
	const c = map.concepts.find((c) => c.id === id);
	const learned = c && id in p.learned ? { ...p.learned, [id]: c.rev } : p.learned;
	const opened = p.opened.includes(id) ? p.opened : [...p.opened, id];
	return { ...p, learned, opened };
}

export function dismissChanges(p: Progress, map: StudyMap): Progress {
	return { ...p, seenVersion: map.version };
}

export function changesSince(p: Progress, map: StudyMap) {
	return {
		added: map.concepts.filter((c) => c.addedIn > p.seenVersion).length,
		retired: map.retired.filter((r) => r.retiredIn > p.seenVersion).length,
		updated: map.concepts.filter((c) => p.learned[c.id] !== undefined && p.learned[c.id] < c.rev).length
	};
}

export function retiredLearned(p: Progress, map: StudyMap): RetiredConcept[] {
	return map.retired.filter((r) => p.learned[r.id] !== undefined);
}

export function learnedCount(p: Progress, map: StudyMap, ids = map.concepts.map((c) => c.id)): number {
	return ids.filter((id) => p.learned[id] !== undefined).length;
}
```

**Step 4: Run to verify pass**

Run: `npx vitest run src/lib/claude-study/progress.test.ts`
Expected: PASS.

**Step 5: Checkpoint.** Stop for user review.

---

### Task 6: Computed map layout

**Files:**
- Create: `src/lib/claude-study/layout.ts`
- Test: `src/lib/claude-study/layout.test.ts`

**Step 1: Write the failing tests**

```ts
import { describe, expect, it } from 'vitest';
import { COL_W, HUB_H, layout } from './layout';

const SIZES = [6, 5, 5, 7, 6, 5, 6, 4, 7, 6];
const GROUPS = SIZES.map((n, g) => ({
	id: `g${g}`,
	title: `Group ${g}`,
	concepts: Array.from({ length: n }, (_, i) => `g${g}-c${i}`)
}));

describe('layout', () => {
	it('positions every concept', () => {
		expect(Object.keys(layout(GROUPS).pos)).toHaveLength(SIZES.reduce((a, b) => a + b));
	});

	it('keeps boxes in a column from overlapping each other or the hub', () => {
		const l = layout(GROUPS);
		for (const x of new Set(l.clusters.map((c) => c.x))) {
			const spans = l.clusters.filter((c) => c.x === x).map((c) => [c.y, c.y + c.h]);
			if (x === l.hub.x - COL_W / 2) spans.push([l.hub.y - HUB_H / 2, l.hub.y + HUB_H / 2]);
			spans.sort((a, b) => a[0] - b[0]);
			for (let i = 1; i < spans.length; i++) expect(spans[i][0]).toBeGreaterThanOrEqual(spans[i - 1][1]);
		}
	});

	it('fits every box and the hub inside the height', () => {
		const l = layout(GROUPS);
		for (const c of l.clusters) expect(c.y + c.h).toBeLessThanOrEqual(l.height);
		expect(l.hub.y + HUB_H / 2).toBeLessThanOrEqual(l.height);
	});

	it('ends each spoke on its box edge', () => {
		for (const c of layout(GROUPS).clusters) {
			const { x2, y2 } = c.spoke;
			expect(x2 === c.x || x2 === c.x + COL_W || y2 === c.y || y2 === c.y + c.h).toBe(true);
		}
	});

	it('still places the hub when the middle column is empty', () => {
		const l = layout(GROUPS.slice(0, 1));
		expect(l.height).toBeGreaterThanOrEqual(l.hub.y + HUB_H / 2);
	});
});
```

**Step 2: Run to verify failure**

Run: `npx vitest run src/lib/claude-study/layout.test.ts`
Expected: FAIL (cannot resolve `./layout`).

**Step 3: Implement**

Geometry constants match the original component (200px boxes at x = 10/240/470, 27px pill rows, 46px hub radius).

```ts
import type { Group } from './types';

export const COL_X = [10, 240, 470];
export const COL_W = 200;
export const GAP = 20;
export const TOP = 10;
export const HUB_R = 46;
export const HUB_H = 140;
export const PILL_STEP = 27;

export type Point = { x: number; y: number };
export type ClusterBox = {
	id: string;
	title: string;
	x: number;
	y: number;
	h: number;
	pills: { id: string; px: number; py: number }[];
	spoke: { x1: number; y1: number; x2: number; y2: number };
};
export type MapLayout = { height: number; hub: Point; clusters: ClusterBox[]; pos: Record<string, Point> };

const groupHeight = (count: number) => 38 + count * PILL_STEP;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Packs groups into three columns, balancing heights, with the hub in the middle column. */
export function layout(groups: Group[]): MapLayout {
	const cols: Group[][] = [[], [], []];
	const heights = [0, HUB_H + GAP, 0];
	for (const g of groups) {
		const c = heights.indexOf(Math.min(...heights));
		cols[c].push(g);
		heights[c] += groupHeight(g.concepts.length) + GAP;
	}

	const hub: Point = { x: COL_X[1] + COL_W / 2, y: TOP + HUB_H / 2 };
	const clusters: ClusterBox[] = [];
	const pos: Record<string, Point> = {};
	let height = 0;

	cols.forEach((col, c) => {
		const x = COL_X[c];
		let y = TOP;
		if (c === 1 && col.length === 0) y += HUB_H + GAP;
		col.forEach((g, i) => {
			if (c === 1 && i === Math.floor(col.length / 2)) {
				hub.y = y + HUB_H / 2;
				y += HUB_H + GAP;
			}
			const h = groupHeight(g.concepts.length);
			const pills = g.concepts.map((id, k) => {
				const px = x + 8;
				const py = y + 28 + k * PILL_STEP;
				pos[id] = { x: px + 92, y: py + 11 };
				return { id, px, py };
			});
			clusters.push({ id: g.id, title: g.title, x, y, h, pills, spoke: { x1: 0, y1: 0, x2: 0, y2: 0 } });
			y += h + GAP;
		});
		height = Math.max(height, y - GAP + TOP);
	});

	for (const b of clusters) {
		const x2 = clamp(hub.x, b.x, b.x + COL_W);
		const y2 = clamp(hub.y, b.y, b.y + b.h);
		const dx = x2 - hub.x;
		const dy = y2 - hub.y;
		const d = Math.hypot(dx, dy) || 1;
		b.spoke = { x1: hub.x + (dx / d) * HUB_R, y1: hub.y + (dy / d) * HUB_R, x2, y2 };
	}

	return { height, hub, clusters, pos };
}
```

**Step 4: Run all lib tests**

Run: `npx vitest run src/lib/claude-study`
Expected: PASS (all three files).

---

### Task 7: Seed `study-map.json` from the current component

**Files:**
- Create (temporary): `scripts/claude-study/seed.ts`
- Create: `src/content/blog/learn-claude-code/study-map.json` (generated)

**Step 1: Write the seed script**

```ts
// One-off: converts the hard-coded data in the original component into study-map.json (version 1).
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { V1_IDS } from '../../src/lib/claude-study/v1-ids.ts';
import type { StudyMap } from '../../src/lib/claude-study/types.ts';

const src = await readFile(
	new URL('../../src/content/blog/learn-claude-code-in-a-day/claude-code-day-map.svelte', import.meta.url),
	'utf8'
);
const unescape = (s: string) => s.replace(/\\'/g, "'");
const expectCount = (what: string, actual: number, expected: number) => {
	if (actual !== expected) throw new Error(`Expected ${expected} ${what}, found ${actual}`);
};
const newId = (old: string) => {
	const id = V1_IDS[old];
	if (!id) throw new Error(`No v1 mapping for ${old}`);
	return id;
};

const stages = [...src.matchAll(/\{ t: '[^']+', n: '([^']+)', h: '((?:[^'\\]|\\.)*)' \}/g)].map((m, i) => ({
	n: i + 1,
	name: m[1],
	exercise: unescape(m[2])
}));
expectCount('stages', stages.length, 6);

const raw = [...src.matchAll(/\['([a-z]+)', (\d), '((?:[^'\\]|\\.)*)', '([^']+)', '((?:[^'\\]|\\.)*)'\]/g)];
expectCount('concepts', raw.length, 57);
const byOld = new Map(raw.map((m) => [m[1], m]));

const relStr = src.match(/'(loop:[^']+)'/);
if (!relStr) throw new Error('Relations string not found');
const related = new Map<string, Set<string>>();
for (const part of relStr[1].split('|')) {
	const [a, bs] = part.split(':');
	const set = related.get(newId(a)) ?? new Set<string>();
	for (const b of bs.split(',')) set.add(newId(b));
	related.set(newId(a), set);
}

const order = [...src.matchAll(/^\t\t(\d): '([a-z,]+)',?$/gm)].flatMap((m) => m[2].split(','));
expectCount('ordered concepts', order.length, 57);

const concepts = order.map((old) => {
	const m = byOld.get(old);
	if (!m) throw new Error(`Ordered concept not found: ${old}`);
	const id = newId(old);
	return {
		id,
		title: unescape(m[3]),
		stage: Number(m[2]),
		docs: m[4].split(','),
		summary: unescape(m[5]),
		related: [...(related.get(id) ?? [])],
		rev: 1,
		addedIn: 1
	};
});

const groups = [...src.matchAll(/\['([^']+)', \d, \d, '([a-z,]+)'\]/g)].map((m) => ({
	id: m[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
	title: m[1],
	concepts: m[2].split(',').map(newId)
}));
expectCount('groups', groups.length, 10);

const map: StudyMap = {
	version: 1,
	generatedAt: '2026-09-16T00:00:00.000Z',
	stages,
	groups,
	concepts,
	aliases: {},
	retired: []
};
const out = new URL('../../src/content/blog/learn-claude-code/study-map.json', import.meta.url);
await mkdir(new URL('.', out), { recursive: true });
await writeFile(out, JSON.stringify(map, null, '\t') + '\n');
console.log(`Wrote ${concepts.length} concepts in ${groups.length} groups`);
```

**Step 2: Run it**

Run: `node scripts/claude-study/seed.ts`
Expected: `Wrote 57 concepts in 10 groups`

**Step 3: Validate the seed against the live docs index**

Run:
```bash
node --input-type=module -e "
import { readFile } from 'node:fs/promises';
import { validate, parseDocSlugs } from './src/lib/claude-study/study-map.ts';
const map = JSON.parse(await readFile('src/content/blog/learn-claude-code/study-map.json', 'utf8'));
const slugs = parseDocSlugs(await (await fetch('https://code.claude.com/docs/llms.txt')).text());
console.log(validate({ ...map, aliases: [], retired: [] }, null, slugs));
"
```
Expected: `[]`

**Step 4: Spot-check**

Run: `node -e "const m=require('./src/content/blog/learn-claude-code/study-map.json'); console.log(m.stages.map(s=>s.name), m.concepts.find(c=>c.id==='memory--auto-memory'))"`
Expected: 6 stage names starting with `Foundations`; the auto memory concept with `docs: ['memory']`, `related` containing `memory`.

**Step 5: Delete the seed script**

Run: `rm scripts/claude-study/seed.ts`

**Step 6: Checkpoint.** Stop for user review of `study-map.json`.

---

### Task 8: Move the post and redirect the old URL

**Files:**
- Move: `src/content/blog/learn-claude-code-in-a-day/index.md` → `src/content/blog/learn-claude-code/index.md`
- Move: `src/content/blog/learn-claude-code-in-a-day/claude-code-day-map.svelte` → `src/content/blog/learn-claude-code/claude-study-map.svelte`
- Modify: `src/routes/blog/[slug]/+page.ts`

**Step 1: Move files (plain `mv`, not `git mv`)**

```bash
mv src/content/blog/learn-claude-code-in-a-day/index.md src/content/blog/learn-claude-code/index.md
mv src/content/blog/learn-claude-code-in-a-day/claude-code-day-map.svelte src/content/blog/learn-claude-code/claude-study-map.svelte
rmdir src/content/blog/learn-claude-code-in-a-day
```

**Step 2: Replace `index.md`**

```md
---
title: 'Learn Claude Code'
summary: 'Every major Claude Code concept, grouped by topic and linked to the ideas it depends on. Work through six stages at your own pace, mark concepts as learned, and see what changed as Claude Code evolves.'
createdAt: 2026-09-16T08:00:00.000Z
featured: false
---

<script>
  import ClaudeStudyMap from './claude-study-map.svelte';
</script>

<ClaudeStudyMap />
```

**Step 3: Add the redirect in `src/routes/blog/[slug]/+page.ts`**

Done in SvelteKit rather than `_redirects`, so it also works in `vite preview` and Playwright.

```ts
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const MOVED: Record<string, string> = {
	'learn-claude-code-in-a-day': 'learn-claude-code'
};

export const load: PageLoad = async ({ params, data }) => {
	const { slug } = params;
	if (MOVED[slug]) throw redirect(301, `/blog/${MOVED[slug]}`);

	const post = await import(`../../../content/blog/${slug}/index.md`);
	// …rest unchanged
```

**Step 4: Verify nothing else references the old slug**

Run: `grep -rn "learn-claude-code-in-a-day" src static tests --exclude-dir=node_modules`
Expected: only the `MOVED` entry in `+page.ts`.

---

### Task 9: Rewrite the component to use the data

**Files:**
- Modify: `src/content/blog/learn-claude-code/claude-study-map.svelte`

Keep the existing `<style>` block and CSS class names. Replace both `<script>` blocks and the markup as below, then append the new CSS.

**Step 1: Replace `<script context="module">`**

Delete everything from `const KEY` through the end of `clusters` (the `BL`, `C`, relation string, `ORD`, `K`, `TOTAL`, `BLOCKS`, `CX`/`RY`/`O`/`R`/`P`, and `clusters` definitions). Keep `curve` and `edges` exactly as they are. The block becomes:

```svelte
<script context="module">
	import data from './study-map.json';
	import { HUB_R, layout } from '$lib/claude-study/layout';

	const DOCS = 'https://code.claude.com/docs/en/';

	/** @type {import('$lib/claude-study/types').StudyMap} */
	const MAP = /** @type {any} */ (data);

	/** @type {Record<string, {id:string,b:number,l:string,s:string[],w:string,r:Set<string>,k:string}>} */
	const C = {};
	for (const c of MAP.concepts) {
		C[c.id] = { id: c.id, b: c.stage, l: c.title, s: c.docs, w: c.summary, r: new Set(), k: '' };
	}
	for (const c of MAP.concepts) {
		for (const r of c.related) {
			C[c.id].r.add(r);
			C[r].r.add(c.id);
		}
	}
	for (const g of MAP.groups) for (const id of g.concepts) C[id].k = g.title;

	const STAGES = MAP.stages;
	/** @param {number} n */
	const stage = (n) => STAGES[n - 1];
	/** @type {Record<number, string[]>} */
	const ORD = {};
	for (const s of STAGES) ORD[s.n] = MAP.concepts.filter((c) => c.stage === s.n).map((c) => c.id);

	const TOTAL = MAP.concepts.length;
	const UPDATED = new Date(MAP.generatedAt).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC'
	});

	const L = layout(MAP.groups);
	const O = L.hub;
	const R = HUB_R;
	const P = L.pos;
	const clusters = L.clusters;

	// curve() and edges() unchanged from here
```

**Step 2: Replace the instance `<script>`**

```svelte
<script>
	import { onMount, tick } from 'svelte';
	import {
		KEY,
		V1_KEY,
		changesSince,
		dismissChanges,
		emptyProgress,
		learnedCount,
		loadProgress,
		markOpened,
		retiredLearned,
		status,
		toggleLearned
	} from '$lib/claude-study/progress';

	/** @typedef {import('$lib/claude-study/progress').Progress} Progress */

	/** @type {string | null} */
	let sel = null;
	let blk = 0;
	let showAll = false;
	let view = 'map';
	let loaded = false;
	/** @type {Progress} */
	let progress = emptyProgress(MAP);
	/** @type {string | null} Concept that had changed since it was learned when it was opened */
	let reviewing = null;
	/** @type {HTMLElement} */
	let root;
	/** @type {HTMLElement} */
	let panelEl;

	onMount(() => {
		if (window.matchMedia('(max-width: 640px)').matches) view = 'list';
		try {
			progress = loadProgress(localStorage.getItem(KEY), localStorage.getItem(V1_KEY), MAP);
			save();
		} catch (e) {
			// Storage unavailable; progress just won't persist
		}
		loaded = true;
	});

	function save() {
		try {
			localStorage.setItem(KEY, JSON.stringify(progress));
		} catch (e) {
			// Ignore
		}
	}

	/** @param {Progress} p */
	function update(p) {
		progress = p;
		save();
	}

	/** @param {string} id */
	async function select(id) {
		reviewing = status(progress, MAP, id).updated ? id : null;
		sel = id;
		update(markOpened(progress, MAP, id));
		// When the panel sits below the map, bring it into view
		if (root && root.clientWidth < 880) {
			await tick();
			panelEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	/** @param {number} b */
	function selectBlock(b) {
		blk = b;
		sel = null;
	}

	/**
	 * @param {string} id
	 * @param {string | null} sel
	 * @param {number} blk
	 * @param {Progress} progress
	 */
	function stateClass(id, sel, blk, progress) {
		const st = status(progress, MAP, id);
		const c = st.learned ? ['learned'] : [];
		if (st.updated) c.push('upd');
		else if (st.isNew) c.push('new');
		if (sel) c.push(id === sel ? 'sel' : C[sel].r.has(id) ? 'rel' : 'dim');
		else if (blk) c.push(ORD[blk].includes(id) ? 'blk' : 'dim');
		return c.join(' ');
	}

	/** @param {string} id @param {Progress} progress */
	function badge(id, progress) {
		const st = status(progress, MAP, id);
		if (st.learned) return st.updated ? '↻' : '✓';
		return st.isNew ? 'new' : String(C[id].b);
	}

	/** @param {KeyboardEvent} e @param {string} id */
	function pillKey(e, id) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			select(id);
		}
	}

	/** @param {MouseEvent} e */
	function mapClick(e) {
		if (!(/** @type {Element} */ (e.target).closest('.pill'))) sel = null;
	}

	$: selLinks = sel ? [...C[sel].r].map((b) => curve(/** @type {string} */ (sel), b)) : [];
	$: bgLinks = sel
		? []
		: showAll
		? edges(() => true)
		: blk
		? edges((a, b) => ORD[blk].includes(a) && ORD[blk].includes(b))
		: [];
	$: cur = sel ? C[sel] : null;
	$: done = !!cur && status(progress, MAP, cur.id).learned;
	$: curOrder = cur ? ORD[cur.b] : [];
	$: curIdx = cur ? curOrder.indexOf(cur.id) : -1;
	$: nextInBlock = blk ? ORD[blk].find((id) => !status(progress, MAP, id).learned) : undefined;
	$: learnedTotal = learnedCount(progress, MAP);
	$: retired = retiredLearned(progress, MAP);
	$: changes = changesSince(progress, MAP);
	$: showBanner =
		loaded && progress.seenVersion < MAP.version && changes.added + changes.updated + changes.retired > 0;
	$: changeText = [
		changes.added && `${changes.added} new`,
		changes.updated && `${changes.updated} to review`,
		changes.retired && `${changes.retired} retired`
	]
		.filter(Boolean)
		.join(', ');
</script>
```

**Step 3: Update the markup.** Apply these edits to the existing markup (everything between `</script>` and `<style>`):

1. Directly inside `<div class="ccmap not-prose" bind:this={root}>`, before `<nav>`, add:
   ```svelte
   {#if showBanner}
   	<div class="banner" role="status">
   		<span>Updated {UPDATED}. Since your last visit: {changeText}.</span>
   		<button class="btn sm" on:click={() => update(dismissChanges(progress, MAP))}>Got it</button>
   	</div>
   {/if}
   ```
2. `<nav class="day" aria-label="Study blocks">` → `aria-label="Stages"`.
3. In the first `.seg` button: replace `learned.size` with `learnedTotal` (twice) and `<span class="tm">All day</span>` with `<span class="tm">All stages</span>`.
4. Replace `{#each BLOCKS as b}` … `{/each}` in the nav with:
   ```svelte
   {#each STAGES as s}
   	{@const n = learnedCount(progress, MAP, ORD[s.n])}
   	<button class="seg" aria-pressed={blk === s.n} on:click={() => selectBlock(s.n)}>
   		<span class="bar"
   			><span class="fill" style="width:{Math.round((n / ORD[s.n].length) * 100)}%;background:var(--b{s.n})" /></span
   		>
   		<span class="tm">Stage {s.n}</span>
   		<span class="nm">{s.name}</span>
   		<span class="cnt">{n} of {ORD[s.n].length} learned</span>
   	</button>
   {/each}
   ```
5. Legend: `The number on each concept is its study block.` → `The number on each concept is its stage. ✓ learned, ↻ changed since you learned it.`
6. `<svg … viewBox="0 0 680 972"` → `viewBox="0 0 680 {L.height}"`; `aria-label` → `"Concept map of Claude Code with {MAP.groups.length} topic groups around a central node"`.
7. Hub subtitle `one-day map` → `study map`. Spokes can be `null` now (`ClusterBox.spoke: Segment | null`), so wrap the `<line class="spoke" …/>` in `{#if cl.spoke}` … `{/if}`.
8. In the clusters loop: `{cl.t}` → `{cl.title}`; pill `stateClass(p.id, sel, blk, learned)` → `stateClass(p.id, sel, blk, progress)`; `aria-label="{C[p.id].l}, block {C[p.id].b}"` → `aria-label="{C[p.id].l}, stage {C[p.id].b}"`; the `.pb` text `{learned.has(p.id) ? '✓' : C[p.id].b}` → `{badge(p.id, progress)}`.
9. List view: replace `{#each K as [t, , , ids]}` … with `{#each MAP.groups as g}`, `<h3>{g.title}</h3>`, `{#each g.concepts as id}`; inside, `stateClass(id, sel, blk, progress)` and `.bd` text `{badge(id, progress)}`.
10. Concept panel (`{#if cur}`):
    - Tag: `Block {cur.b}, {BL[cur.b].t} {BL[cur.b].n}` → `Stage {cur.b}, {stage(cur.b).name}`.
    - After `<p class="muted" …>{cur.k}</p>` add:
      ```svelte
      {#if reviewing === cur.id}
      	<p class="note">This changed since you marked it learned. Worth another look.</p>
      {/if}
      ```
    - Toggle button: `on:click={() => toggleLearned(cur.id)}` → `on:click={() => cur && update(toggleLearned(progress, MAP, cur.id))}`.
    - `Back to block {cur.b}` → `Back to stage {cur.b}`.
11. Stage panel (`{:else if blk}`):
    - Tag → `Stage {blk}`; `<h2>{BL[blk].n}</h2>` → `<h2>{stage(blk).name}</h2>`; `{BL[blk].h}` → `{stage(blk).exercise}`.
    - `'Start this block'` → `'Start this stage'`; `'Review this block'` → `'Review this stage'`.
    - `{#if learned.has(id)}` → `{#if status(progress, MAP, id).learned}`.
12. Default panel (`{:else}`) — replace entirely with:
    ```svelte
    <h2>Learn at your own pace</h2>
    <p>
    	Six stages take you from your first session to running Claude Code across a team. Each stage
    	pairs a set of concepts with a hands-on exercise. Click a concept on the map to see what it
    	connects to, or start with stage 1. Your progress stays in this browser.
    </p>
    <ol class="ol agenda" style="margin-top:14px">
    	{#each STAGES as s}
    		<li>
    			<span class="tm">{s.n}</span>
    			<button class="linkish" on:click={() => selectBlock(s.n)}>
    				<span class="agdot" style="background:var(--b{s.n})" />{s.name}
    			</button>
    			<span class="muted">{learnedCount(progress, MAP, ORD[s.n])}/{ORD[s.n].length}</span>
    		</li>
    	{/each}
    </ol>
    <div class="row">
    	<button class="btn pri" on:click={() => selectBlock(1)}>Start stage 1</button>
    	{#if learnedTotal || retired.length}
    		<button class="btn" on:click={() => update({ ...progress, learned: {} })}>Reset progress</button>
    	{/if}
    </div>
    {#if retired.length}
    	<div class="sub">Previously learned, now retired</div>
    	<ul class="retired">
    		{#each retired as r}<li>{r.title}</li>{/each}
    	</ul>
    {/if}
    ```
13. Footer text → `Generated from the Claude Code documentation at <a …>code.claude.com/docs</a> and refreshed as it changes. Last updated {UPDATED}.`

**Step 4: Append CSS** (inside the existing `<style>`, at the end)

```css
	.banner {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 8px 16px;
		margin-bottom: 12px;
		padding: 10px 14px;
		border: 1px solid var(--line2);
		border-radius: 10px;
		background: var(--selbg);
	}
	.note {
		margin: 10px 0 0;
		padding: 6px 10px;
		border-left: 3px solid var(--accent);
		border-radius: 4px;
		background: var(--selbg);
	}
	.retired {
		margin: 4px 0 0;
		padding-left: 18px;
		color: var(--ink3);
	}
	.pill.new .pb,
	.pill.upd .pb {
		fill: var(--accent);
		font-weight: 700;
	}
	.lp.new .bd,
	.lp.upd .bd {
		color: var(--accent);
		font-weight: 700;
	}
```

**Step 5: Verify no stale identifiers remain**

Run: `grep -nE "\bBL\b|\bK\b|BLOCKS|learned\.(has|size)|\bKEY\b.*cc-day|one-day|All day|Plan your day" src/content/blog/learn-claude-code/claude-study-map.svelte`
Expected: no output. (`KEY` from the progress import is fine.)

**Step 6: Run the Svelte autofixer**

Use the `svelte-autofixer` MCP tool on the component and address reported issues.

**Step 7: Type check**

Run: `npm run check 2>&1 | tail -3`
Expected: error/warning counts no higher than the Task 0 baseline.

**Step 8: See it in the browser**

Run `npm run dev`, open `http://localhost:5173/blog/learn-claude-code`, and check: map renders with 10 groups and no overlaps; stage buttons filter; clicking a concept opens the panel; marking learned updates counts and survives reload; list view works; dark mode colors still apply. Then open `/blog/learn-claude-code-in-a-day` and confirm it redirects.

Migration check: in devtools run `localStorage.clear(); localStorage.setItem('cc-day-map:v1', JSON.stringify({learned:['hooks','automem']}))`, reload, confirm "2 of 57 learned", and that Hooks and Auto memory show ✓.

**Step 9: Checkpoint.** Stop for user review.

---

### Task 10: Generator

**Files:**
- Create: `scripts/claude-study/prompt.md`
- Create: `scripts/claude-study/schema.json`
- Create: `scripts/claude-study/generate.ts`
- Modify: `package.json` (scripts)
- Modify: `.gitignore`

**Step 1: Write `prompt.md`**

```md
You maintain a study map that helps people learn Claude Code at their own pace. You receive the Claude Code documentation index in `<docs_index>` and the current study map in `<current_study_map>`. Return the next version of the map as JSON matching the provided schema.

## Why ids matter

Readers work through the map over days or weeks. They mark concepts as learned, and their progress is stored against concept ids. A changed id silently erases a reader's progress, so keeping ids stable is the most important rule.

## Ids

- Keep every existing concept id as long as its main doc page still exists in the index.
- A new concept's id is the slug of its main doc page: the path after `https://code.claude.com/docs/en/` without `.md`, for example `hooks-guide` or `agent-sdk/overview`.
- When two concepts share a main doc page, the additional one uses `<slug>--<short-name>`, for example `memory--auto-memory`.
- Never reuse an id for a different concept.
- Never re-add an id that is retired or is an alias source. If such a doc page becomes relevant again, use a `<slug>--<short-name>` id instead.

## Changes from the current map

- Merged or renamed concept: leave it out of `concepts` and add `{ "from": "<old id>", "to": "<new id>" }` to `aliases`.
- Concept that no longer exists in Claude Code: leave it out of `concepts` and add `{ "id", "title" }` to `retired`.
- Carry over every existing alias and retired entry unchanged. The current map stores `aliases` as an object; return it as a list of `from`/`to` pairs.
- Every current concept must end up kept, aliased, or retired.
- `rev` starts at 1 for new concepts. Increase an existing concept's `rev` by 1 only when what a reader needs to learn changed materially: a new capability, a changed default, a removed option. Rewording a summary is not a material change. Never decrease `rev`.
- Prefer small, accurate updates over reorganizing. Move concepts between stages or groups only when it clearly improves the learning path.

## Content

- Cover the Claude Code concepts a practitioner should know, from first use to team deployment and the Agent SDK. Aim for 45–70 concepts.
- Exactly 6 stages numbered 1–6, from foundations to advanced. Each has a short name and a hands-on exercise of 2–3 sentences that practices that stage's concepts. Every stage has at least one concept.
- 8–12 groups, each with a short title, a short kebab-case id, and 3–8 concepts. Every concept belongs to exactly one group.
- Within each stage, list concepts in the recommended study order.
- `title`: 2–4 words. `summary`: one or two plain sentences, under 200 characters, saying what it is and why it matters. Mention concrete commands, flags, or settings where they help.
- `docs`: 1–3 slugs from the index, main page first. Only use slugs that appear in the index.
- `related`: ids of concepts a reader should connect this one to, usually 1–5. List each connection once, on either concept. Only reference ids that exist in `concepts`.
- Write for people learning at their own pace. Don't mention times of day, deadlines, or finishing in a day.

Use WebFetch on a code.claude.com doc page only when the index description isn't enough to write an accurate summary or to tell whether something changed.
```

**Step 2: Write `schema.json`**

```json
{
	"type": "object",
	"additionalProperties": false,
	"required": ["stages", "groups", "concepts", "aliases", "retired"],
	"properties": {
		"stages": {
			"type": "array",
			"items": {
				"type": "object",
				"additionalProperties": false,
				"required": ["n", "name", "exercise"],
				"properties": {
					"n": { "type": "integer" },
					"name": { "type": "string" },
					"exercise": { "type": "string" }
				}
			}
		},
		"groups": {
			"type": "array",
			"items": {
				"type": "object",
				"additionalProperties": false,
				"required": ["id", "title", "concepts"],
				"properties": {
					"id": { "type": "string" },
					"title": { "type": "string" },
					"concepts": { "type": "array", "items": { "type": "string" } }
				}
			}
		},
		"concepts": {
			"type": "array",
			"items": {
				"type": "object",
				"additionalProperties": false,
				"required": ["id", "title", "stage", "docs", "summary", "related", "rev"],
				"properties": {
					"id": { "type": "string" },
					"title": { "type": "string" },
					"stage": { "type": "integer" },
					"docs": { "type": "array", "items": { "type": "string" } },
					"summary": { "type": "string" },
					"related": { "type": "array", "items": { "type": "string" } },
					"rev": { "type": "integer" }
				}
			}
		},
		"aliases": {
			"type": "array",
			"items": {
				"type": "object",
				"additionalProperties": false,
				"required": ["from", "to"],
				"properties": {
					"from": { "type": "string" },
					"to": { "type": "string" }
				}
			}
		},
		"retired": {
			"type": "array",
			"items": {
				"type": "object",
				"additionalProperties": false,
				"required": ["id", "title"],
				"properties": {
					"id": { "type": "string" },
					"title": { "type": "string" }
				}
			}
		}
	}
}
```

**Step 3: Write `generate.ts`**

```ts
import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { changelog, finalize, parseDocSlugs, validate } from '../../src/lib/claude-study/study-map.ts';
import type { StudyMap, StudyMapDraft } from '../../src/lib/claude-study/types.ts';

const ROOT = new URL('../../', import.meta.url);
const MAP_PATH = new URL('src/content/blog/learn-claude-code/study-map.json', ROOT);
const FAILED_DIR = new URL('.claude-study/', ROOT);
const LLMS_URL = 'https://code.claude.com/docs/llms.txt';

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const force = args.has('--force');

function runClaude(input: string, systemPrompt: string, schema: string): Promise<unknown> {
	return new Promise((resolve, reject) => {
		const child = spawn(
			'claude',
			[
				'-p',
				'--safe-mode',
				'--no-session-persistence',
				'--output-format', 'json',
				'--json-schema', schema,
				'--append-system-prompt', systemPrompt,
				'--tools', 'WebFetch',
				'--allowedTools', 'WebFetch(domain:code.claude.com)'
			],
			{ stdio: ['pipe', 'pipe', 'inherit'] }
		);
		let out = '';
		child.stdout.on('data', (chunk) => (out += chunk));
		child.on('error', reject);
		child.on('close', (code) => {
			if (code !== 0) return reject(new Error(`claude exited with code ${code}`));
			try {
				const res = JSON.parse(out);
				if (res.is_error || !res.structured_output) {
					return reject(new Error(`claude returned no structured output (${res.subtype}): ${res.result ?? ''}`));
				}
				resolve(res.structured_output);
			} catch (e) {
				reject(new Error(`Could not parse claude output: ${(e as Error).message}`));
			}
		});
		child.stdin.end(input);
	});
}

async function fetchText(url: string): Promise<string> {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Fetching ${url} failed: ${res.status}`);
	return res.text();
}

async function main() {
	const [llmsTxt, prevRaw, prompt, schema] = await Promise.all([
		fetchText(LLMS_URL),
		readFile(MAP_PATH, 'utf8'),
		readFile(new URL('prompt.md', import.meta.url), 'utf8'),
		readFile(new URL('schema.json', import.meta.url), 'utf8')
	]);
	const prev = JSON.parse(prevRaw) as StudyMap;
	const docSlugs = parseDocSlugs(llmsTxt);

	console.error(`Generating from ${docSlugs.size} doc pages and ${prev.concepts.length} current concepts…`);
	const input = ['<docs_index>', llmsTxt, '</docs_index>', '', '<current_study_map>', prevRaw, '</current_study_map>'].join('\n');
	const draft = (await runClaude(input, prompt, JSON.stringify(JSON.parse(schema)))) as StudyMapDraft;

	const errors = validate(draft, prev, docSlugs, { force });
	if (errors.length) {
		await mkdir(FAILED_DIR, { recursive: true });
		await writeFile(new URL('last-failed.json', FAILED_DIR), JSON.stringify(draft, null, '\t') + '\n');
		console.error(`Validation failed (${errors.length}):`);
		for (const e of errors) console.error(`  - ${e}`);
		console.error('Raw output saved to .claude-study/last-failed.json');
		process.exit(1);
	}

	const next = finalize(draft, prev, new Date());
	if (dryRun) console.error('Dry run: study-map.json not written.');
	else await writeFile(MAP_PATH, JSON.stringify(next, null, '\t') + '\n');
	console.log(changelog(prev, next));
}

main().catch((e) => {
	console.error(e instanceof Error ? e.message : e);
	process.exit(1);
});
```

**Step 4: Wire up**

In `package.json` `scripts`, add after `"generate:images"`:
```json
"study:generate": "node scripts/claude-study/generate.ts"
```

Append to `.gitignore`:
```
.claude-study
```

**Step 5: Dry run**

Run: `npm run study:generate -- --dry-run`
Expected (may take several minutes): either a changelog printed to stdout starting with `## Claude study map v2`, or a list of validation errors with `.claude-study/last-failed.json` written.

If it fails:
- `claude returned no structured output` → rerun once; if persistent, check the CLI flags against `claude --help`.
- WebFetch permission denials under `--safe-mode` → drop `--safe-mode` and re-check.
- Validation errors the model keeps making → tighten the matching rule in `prompt.md`; do not loosen `validate`.

Report the output to the user. Do NOT run without `--dry-run` unless the user asks.

**Step 6: Checkpoint.** Stop for user review.

---

### Task 11: Playwright tests

**Files:**
- Create: `tests/claude-study.test.ts`

**Step 1: Write the tests**

```ts
import { expect, test } from '@playwright/test';

test.describe('Claude study map', () => {
	test('remembers a learned concept across reloads', async ({ page }) => {
		await page.goto('/blog/learn-claude-code');
		await page.getByRole('button', { name: 'Hooks, stage 3' }).click();
		await page.getByRole('button', { name: 'Mark as learned' }).click();
		await expect(page.locator('nav .seg').first()).toContainText(/^.*1 of \d+ learned/);

		await page.reload();
		await expect(page.locator('nav .seg').first()).toContainText(/1 of \d+ learned/);
	});

	test('migrates progress from the original map', async ({ page }) => {
		await page.addInitScript(() => {
			if (!localStorage.getItem('claude-study:v2')) {
				localStorage.setItem('cc-day-map:v1', JSON.stringify({ learned: ['hooks', 'automem'] }));
			}
		});
		await page.goto('/blog/learn-claude-code');
		await expect(page.locator('nav .seg').first()).toContainText(/2 of \d+ learned/);
	});

	test('redirects the old URL', async ({ page }) => {
		await page.goto('/blog/learn-claude-code-in-a-day');
		await expect(page).toHaveURL(/\/blog\/learn-claude-code$/);
	});
});
```

**Step 2: Run**

Run: `npx playwright test tests/claude-study.test.ts`
Expected: 3 passed. (The config builds and previews the site first.) If the pill role query doesn't match at the default viewport, the map may be in list view; use `page.getByRole('button', { name: /^Hooks/ }).first()` instead.

---

### Task 12: Final verification

Use @superpowers:verification-before-completion.

Run and report each result:
1. `npx vitest run src/lib/claude-study` → all pass
2. `npm run check 2>&1 | tail -3` → no more errors/warnings than baseline
3. `npm run build` → succeeds
4. `npx playwright test tests/claude-study.test.ts` → 3 passed
5. `git status --short` (read-only) → list of new/moved files for the user to review and commit themselves

**Checkpoint.** Hand over to the user with a summary. No git commands that modify state.
