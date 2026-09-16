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
	while (Object.hasOwn(aliases, id)) {
		if (seen.has(id)) throw new Error(`Alias cycle at ${id}`);
		seen.add(id);
		id = aliases[id];
	}
	return id;
}

export const MAX_CHURN = 0.25;
export const STAGE_COUNT = 6;
const ID_RE =
	/^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$/;

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
		const docs = new Set<string>();
		for (const d of c.docs) {
			if (docs.has(d)) errors.push(`Duplicate doc slug in ${c.id}: ${d}`);
			docs.add(d);
			if (!docSlugs.has(d)) errors.push(`Unknown doc slug in ${c.id}: ${d}`);
		}
		if (!Number.isInteger(c.stage) || c.stage < 1 || c.stage > STAGE_COUNT) {
			errors.push(`Invalid stage for ${c.id}: ${c.stage}`);
		}
		if (!Number.isInteger(c.rev) || c.rev < 1) errors.push(`Invalid rev for ${c.id}: ${c.rev}`);
	}
	for (const c of draft.concepts) {
		const related = new Set<string>();
		for (const r of c.related) {
			if (related.has(r)) errors.push(`Duplicate related id in ${c.id}: ${r}`);
			related.add(r);
			if (r === c.id) errors.push(`Concept relates to itself: ${c.id}`);
			else if (!ids.has(r)) errors.push(`Unknown related id in ${c.id}: ${r}`);
		}
	}

	const stageNumbers = draft.stages.map((s) => s.n).join(',');
	const expected = Array.from({ length: STAGE_COUNT }, (_, i) => i + 1).join(',');
	if (stageNumbers !== expected)
		errors.push(`Stages must be numbered 1-6 in order, got: ${stageNumbers}`);
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

	const retiredIds = new Set<string>();
	for (const r of draft.retired) {
		if (retiredIds.has(r.id)) errors.push(`Duplicate retired id: ${r.id}`);
		retiredIds.add(r.id);
	}
	for (const id of retiredIds) if (ids.has(id)) errors.push(`Retired id is still a concept: ${id}`);

	const aliases: Record<string, string> = {};
	for (const a of draft.aliases) {
		if (Object.hasOwn(aliases, a.from)) errors.push(`Duplicate alias: ${a.from}`);
		if (ids.has(a.from)) errors.push(`Alias source is still a concept: ${a.from}`);
		aliases[a.from] = a.to;
	}
	for (const id of Object.keys(aliases))
		if (retiredIds.has(id)) errors.push(`Id is both aliased and retired: ${id}`);
	for (const from of Object.keys(aliases)) {
		try {
			const to = resolveId(from, aliases);
			// Retired targets are allowed: retiring a merge target must not break the "previous aliases kept" rule.
			if (!ids.has(to) && !retiredIds.has(to))
				errors.push(`Alias does not resolve to a concept: ${from} -> ${to}`);
		} catch (e) {
			errors.push((e as Error).message);
		}
	}

	const reasonIds = new Set<string>();
	for (const r of draft.revChanges) {
		if (reasonIds.has(r.id)) errors.push(`Duplicate rev change: ${r.id}`);
		reasonIds.add(r.id);
		if (!r.reason.trim()) errors.push(`Empty rev change reason: ${r.id}`);
	}

	if (prev) {
		const known = new Set([
			...prev.concepts.map((c) => c.id),
			...Object.keys(prev.aliases),
			...prev.retired.map((r) => r.id)
		]);
		for (const from of Object.keys(prev.aliases)) {
			if (!Object.hasOwn(aliases, from)) errors.push(`Previous alias removed: ${from}`);
			else if (aliases[from] !== prev.aliases[from]) {
				errors.push(`Previous alias changed: ${from} (${prev.aliases[from]} -> ${aliases[from]})`);
			}
		}
		for (const r of prev.retired)
			if (!retiredIds.has(r.id)) errors.push(`Previously retired id missing: ${r.id}`);
		for (const from of Object.keys(aliases))
			if (!known.has(from)) errors.push(`Alias source was never a concept: ${from}`);
		for (const id of retiredIds)
			if (!known.has(id)) errors.push(`Retired id was never a concept: ${id}`);

		const nextById = new Map(draft.concepts.map((c) => [c.id, c]));
		const increased = new Set<string>();
		let churn = 0;
		for (const c of prev.concepts) {
			const next = nextById.get(c.id);
			if (next) {
				if (next.rev < c.rev) errors.push(`rev decreased for ${c.id}: ${c.rev} -> ${next.rev}`);
				if (next.rev > c.rev) increased.add(c.id);
			} else if (Object.hasOwn(aliases, c.id) || retiredIds.has(c.id)) {
				churn++;
			} else {
				errors.push(`Concept disappeared without alias or retirement: ${c.id}`);
			}
		}
		for (const id of increased)
			if (!reasonIds.has(id)) errors.push(`Rev increased without a reason: ${id}`);
		for (const id of reasonIds)
			if (!increased.has(id)) errors.push(`Reason given but rev not increased: ${id}`);
		if (!opts.force && prev.concepts.length && churn / prev.concepts.length > MAX_CHURN) {
			errors.push(
				`Too many concepts merged or retired: ${churn} of ${prev.concepts.length} (use --force to accept)`
			);
		}
	}

	return errors;
}

/**
 * New concept ids that a newly added alias from a previous concept resolves to (renames and merges
 * into a new id), mapped to the earliest `addedIn` among those previous concepts.
 */
function renameTargets(
	prev: Pick<StudyMap, 'concepts' | 'aliases'> | null,
	aliases: Record<string, string>
): Map<string, number> {
	const targets = new Map<string, number>();
	if (!prev) return targets;
	const prevById = new Map(prev.concepts.map((c) => [c.id, c]));
	for (const from of Object.keys(aliases)) {
		const source = prevById.get(from);
		if (!source || Object.hasOwn(prev.aliases, from)) continue;
		let to: string;
		try {
			to = resolveId(from, aliases);
		} catch {
			to = aliases[from];
		}
		if (prevById.has(to)) continue;
		targets.set(to, Math.min(targets.get(to) ?? Infinity, source.addedIn));
	}
	return targets;
}

export function finalize(draft: StudyMapDraft, prev: StudyMap | null, now: Date): StudyMap {
	const version = (prev?.version ?? 0) + 1;
	const aliases = Object.fromEntries(draft.aliases.map((a) => [a.from, a.to]));
	const addedIn = new Map([
		...renameTargets(prev, aliases),
		...(prev?.concepts.map((c): [string, number] => [c.id, c.addedIn]) ?? [])
	]);
	const retiredIn = new Map(prev?.retired.map((r) => [r.id, r.retiredIn]) ?? []);
	return {
		version,
		generatedAt: now.toISOString(),
		stages: draft.stages,
		groups: draft.groups,
		concepts: draft.concepts.map((c) => ({ ...c, addedIn: addedIn.get(c.id) ?? version })),
		aliases,
		retired: draft.retired.map((r) => ({ ...r, retiredIn: retiredIn.get(r.id) ?? version }))
	};
}

/** Index pages that no current concept links to and that aren't retired ids or alias sources, in index order. */
export function uncoveredDocs(prev: StudyMap | null, docSlugs: Set<string>): string[] {
	if (!prev) return [...docSlugs];
	const covered = new Set([
		...prev.concepts.flatMap((c) => c.docs),
		...prev.retired.map((r) => r.id),
		...Object.keys(prev.aliases)
	]);
	return [...docSlugs].filter((slug) => !covered.has(slug));
}

/** Soft limits from the prompt. Breaking them is worth a look but does not fail generation. */
export const MAX_NEW_CONCEPTS = 6;

export function warnings(
	map: Pick<StudyMap, 'groups' | 'concepts' | 'aliases'>,
	prev?: Pick<StudyMap, 'concepts' | 'aliases'> | null
): string[] {
	const out: string[] = [];
	if (prev) {
		const prevIds = new Set(prev.concepts.map((c) => c.id));
		const renamed = renameTargets(prev, map.aliases);
		const added = map.concepts.filter((c) => !prevIds.has(c.id) && !renamed.has(c.id)).length;
		if (added > MAX_NEW_CONCEPTS) out.push(`More than ${MAX_NEW_CONCEPTS} new concepts: ${added}`);
	}
	if (map.concepts.length < 45 || map.concepts.length > 70)
		out.push(`Concept count outside 45-70: ${map.concepts.length}`);
	if (map.groups.length < 8 || map.groups.length > 12)
		out.push(`Group count outside 8-12: ${map.groups.length}`);
	for (const g of map.groups) {
		if (g.concepts.length < 3 || g.concepts.length > 8)
			out.push(`Group size outside 3-8: ${g.id} (${g.concepts.length})`);
	}
	for (const c of map.concepts) {
		if (c.summary.length > 200)
			out.push(`Summary over 200 characters: ${c.id} (${c.summary.length})`);
	}
	return out;
}

export function changelog(
	prev: StudyMap | null,
	next: StudyMap,
	reasons: Record<string, string> = {}
): string {
	const prevById = new Map(prev?.concepts.map((c) => [c.id, c]) ?? []);
	const title = (id: string) =>
		next.concepts.find((c) => c.id === id)?.title ?? prevById.get(id)?.title ?? id;

	const renamed = renameTargets(prev, next.aliases);
	const added = next.concepts.filter((c) => !prevById.has(c.id) && !renamed.has(c.id));
	const updated = next.concepts.filter((c) => {
		const p = prevById.get(c.id);
		return p && c.rev > p.rev;
	});
	const merged = Object.entries(next.aliases).filter(
		([from]) => !prev || !Object.hasOwn(prev.aliases, from)
	);
	const retired = next.retired.filter((r) => r.retiredIn === next.version);

	const section = (heading: string, items: string[]) =>
		items.length ? [`### ${heading}`, '', ...items.map((i) => `- ${i}`), ''] : [];

	return [
		`## Claude study map v${next.version}`,
		'',
		`${next.concepts.length} concepts in ${next.groups.length} groups.`,
		'',
		...section(
			'New',
			added.map((c) => `${c.title} (\`${c.id}\`, stage ${c.stage})`)
		),
		...section(
			'Updated',
			updated.map((c) => {
				const line = `${c.title} (\`${c.id}\`, rev ${prevById.get(c.id)!.rev} → ${c.rev})`;
				return Object.hasOwn(reasons, c.id)
					? `${line} — ${reasons[c.id].replace(/\s+/g, ' ').trim()}`
					: line;
			})
		),
		...section(
			'Merged',
			merged.map(([from, to]) => `${title(from)} (\`${from}\`) → ${title(to)} (\`${to}\`)`)
		),
		...section(
			'Retired',
			retired.map((r) => `${r.title} (\`${r.id}\`)`)
		),
		...(added.length + updated.length + merged.length + retired.length
			? []
			: ['No concept changes.', ''])
	].join('\n');
}
