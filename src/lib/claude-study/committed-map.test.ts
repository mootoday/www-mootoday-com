import { describe, expect, it } from 'vitest';
import data from '../../content/blog/learn-claude-code/study-map.json';
import { layout } from './layout';
import { validate, warnings } from './study-map';
import type { StudyMap, StudyMapDraft } from './types';
import { V1_IDS } from './v1-ids';

const map = data as StudyMap;

describe('committed study-map.json', () => {
	it('knows every v1 id target as a concept, alias source or retired id', () => {
		const known = new Set([
			...map.concepts.map((c) => c.id),
			...Object.keys(map.aliases),
			...map.retired.map((r) => r.id)
		]);
		const unknown = Object.values(V1_IDS).filter((id) => !known.has(id));
		expect(unknown).toEqual([]);
	});

	it('passes validation', () => {
		const draft: StudyMapDraft = {
			stages: map.stages,
			groups: map.groups,
			concepts: map.concepts.map(({ addedIn: _addedIn, ...c }) => c),
			aliases: Object.entries(map.aliases).map(([from, to]) => ({ from, to })),
			retired: map.retired.map(({ retiredIn: _retiredIn, ...r }) => r),
			revChanges: []
		};
		// Built from the map itself so the test works offline.
		const docSlugs = new Set([
			...map.concepts.flatMap((c) => c.docs),
			...map.concepts.map((c) => c.id.split('--')[0])
		]);
		expect(validate(draft, null, docSlugs)).toEqual([]);
	});

	it('lays out every cluster with a spoke', () => {
		const missing = layout(map.groups)
			.clusters.filter((c) => c.spoke === null)
			.map((c) => c.id);
		expect(missing).toEqual([]);
	});

	it('is within the soft limits', () => {
		expect(warnings(map)).toEqual([]);
	});
});
