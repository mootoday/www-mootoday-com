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

/** Resolves an alias, falling back to the stored id if the alias map is broken. */
function safeResolve(id: string, aliases: Record<string, string>): string {
	try {
		return resolveId(id, aliases);
	} catch {
		return id;
	}
}

const toRev = (rev: unknown) => (Number.isFinite(Number(rev)) && rev !== null ? Number(rev) : 0);

export function loadProgress(raw: string | null, rawV1: string | null, map: StudyMap): Progress {
	let p: Progress | null = null;
	const v2 = parse(raw);
	if (v2 && v2.learned && typeof v2.learned === 'object' && !Array.isArray(v2.learned)) {
		p = {
			learned: { ...v2.learned },
			opened: Array.isArray(v2.opened) ? v2.opened : [],
			seenVersion: Number(v2.seenVersion) || map.version,
			since: Number(v2.since) || map.version
		};
	} else {
		const v1 = parse(rawV1);
		if (v1 && Array.isArray(v1.learned)) {
			const learned = v1.learned
				.filter((id: string) => Object.hasOwn(V1_IDS, id))
				.map((id: string) => [V1_IDS[id], 1]);
			p = { learned: Object.fromEntries(learned), opened: [], seenVersion: 1, since: 1 };
		}
	}
	if (!p) return emptyProgress(map);

	const learned: Record<string, number> = {};
	for (const [id, rev] of Object.entries(p.learned)) {
		const to = safeResolve(id, map.aliases);
		// A renamed/merged concept's rev counter is unrelated to the stored one, so ask for a review.
		const r = to === id ? toRev(rev) : 0;
		learned[to] = Object.hasOwn(learned, to) ? Math.min(learned[to], r) : r;
	}
	const opened = [...new Set(p.opened.map((id) => safeResolve(id, map.aliases)))];
	return { ...p, learned, opened };
}

export function status(p: Progress, map: StudyMap, id: string) {
	const c = map.concepts.find((c) => c.id === id);
	const rev = p.learned[id];
	return {
		learned: !!c && rev !== undefined,
		isNew: !!c && rev === undefined && c.addedIn > p.since && !p.opened.includes(id),
		updated: !!c && rev !== undefined && rev < c.rev
	};
}

export function toggleLearned(p: Progress, map: StudyMap, id: string): Progress {
	const learned = { ...p.learned };
	if (Object.hasOwn(learned, id)) delete learned[id];
	else learned[id] = map.concepts.find((c) => c.id === id)?.rev ?? 1;
	return { ...p, learned };
}

export function markOpened(p: Progress, map: StudyMap, id: string): Progress {
	const c = map.concepts.find((c) => c.id === id);
	const learned = c && Object.hasOwn(p.learned, id) ? { ...p.learned, [id]: c.rev } : p.learned;
	const opened = p.opened.includes(id) ? p.opened : [...p.opened, id];
	return { ...p, learned, opened };
}

export function dismissChanges(p: Progress, map: StudyMap): Progress {
	return { ...p, seenVersion: map.version };
}

export function changesSince(p: Progress, map: StudyMap) {
	return {
		added: map.concepts.filter((c) => c.addedIn > p.seenVersion && p.learned[c.id] === undefined)
			.length,
		retired: map.retired.filter((r) => r.retiredIn > p.seenVersion).length,
		updated: map.concepts.filter((c) => p.learned[c.id] !== undefined && p.learned[c.id] < c.rev)
			.length
	};
}

export function retiredLearned(p: Progress, map: StudyMap): RetiredConcept[] {
	return map.retired.filter((r) => p.learned[r.id] !== undefined);
}

export function learnedCount(
	p: Progress,
	map: StudyMap,
	ids = map.concepts.map((c) => c.id)
): number {
	return ids.filter((id) => p.learned[id] !== undefined).length;
}
