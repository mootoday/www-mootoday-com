import { describe, expect, it } from 'vitest';
import {
	changesSince,
	dismissChanges,
	emptyProgress,
	learnedCount,
	loadProgress,
	markOpened,
	retiredLearned,
	status,
	toggleLearned
} from './progress';
import type { StudyMap } from './types';

const concept = (id: string, rev: number, addedIn: number) => ({
	id,
	title: id.toUpperCase(),
	stage: 1,
	docs: [id],
	summary: '',
	related: [],
	rev,
	addedIn
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
		expect(loadProgress(null, null, MAP)).toEqual({
			learned: {},
			opened: [],
			seenVersion: 5,
			since: 5
		});
	});

	it('migrates v1 progress and drops unknown ids', () => {
		const p = loadProgress(null, JSON.stringify({ learned: ['hooks', 'bogus'] }), MAP);
		expect(p).toEqual({ learned: { 'hooks-guide': 1 }, opened: [], seenVersion: 1, since: 1 });
	});

	it('prefers v2 over v1', () => {
		const v2 = JSON.stringify({ learned: { b: 1 }, opened: [], seenVersion: 5, since: 5 });
		expect(loadProgress(v2, JSON.stringify({ learned: ['hooks'] }), MAP).learned).toEqual({ b: 1 });
	});

	it('resolves aliases, keeping the lowest rev (aliased entries count as rev 0)', () => {
		const v2 = JSON.stringify({
			learned: { old: 1, a: 2 },
			opened: ['old'],
			seenVersion: 5,
			since: 5
		});
		const p = loadProgress(v2, null, MAP);
		expect(p.learned).toEqual({ a: 0 });
		expect(p.opened).toEqual(['a']);
	});

	it('flags renamed concepts as learned and updated, not new', () => {
		const map: StudyMap = { ...MAP, concepts: [concept('a', 1, 5), concept('b', 1, 1)] };
		const v2 = JSON.stringify({ learned: { old: 3 }, opened: [], seenVersion: 4, since: 4 });
		const p = loadProgress(v2, null, map);
		expect(p.learned).toEqual({ a: 0 });
		expect(status(p, map, 'a')).toEqual({ learned: true, isNew: false, updated: true });
		expect(changesSince(p, map).added).toBe(0);
	});

	it('keeps progress when the alias map has a cycle', () => {
		const map: StudyMap = { ...MAP, aliases: { x: 'y', y: 'x' } };
		const v2 = JSON.stringify({ learned: { x: 1, a: 2 }, opened: ['y'], seenVersion: 5, since: 5 });
		const p = loadProgress(v2, null, map);
		expect(p.learned).toEqual({ x: 1, a: 2 });
		expect(p.opened).toEqual(['y']);
	});

	it('sanitises non-numeric stored revs to 0', () => {
		const v2 = JSON.stringify({
			learned: { a: 'x', b: null },
			opened: [],
			seenVersion: 5,
			since: 5
		});
		expect(loadProgress(v2, null, MAP).learned).toEqual({ a: 0, b: 0 });
	});

	it('rejects an array as v2 learned, falling back to v1 or empty', () => {
		const v2 = JSON.stringify({ learned: ['b'], opened: [], seenVersion: 5, since: 5 });
		expect(loadProgress(v2, JSON.stringify({ learned: ['hooks'] }), MAP).learned).toEqual({
			'hooks-guide': 1
		});
		expect(loadProgress(v2, null, MAP)).toEqual(emptyProgress(MAP));
	});

	it('drops v1 ids that only exist on the object prototype', () => {
		const p = loadProgress(null, JSON.stringify({ learned: ['toString', 'hooks'] }), MAP);
		expect(p.learned).toEqual({ 'hooks-guide': 1 });
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

	it('does not mark learned concepts as new', () => {
		const p = { ...emptyProgress(MAP), since: 4, learned: { b: 1 } };
		expect(status(p, MAP, 'b').isNew).toBe(false);
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

	it('does not count learned concepts as added', () => {
		const p = { ...emptyProgress(MAP), seenVersion: 3, learned: { b: 1 } };
		expect(changesSince(p, MAP).added).toBe(0);
	});

	it('lists retired concepts the reader had learned and excludes them from counts', () => {
		const p = { ...emptyProgress(MAP), learned: { r: 1, a: 2 } };
		expect(retiredLearned(p, MAP)).toEqual([{ id: 'r', title: 'R', retiredIn: 4 }]);
		expect(learnedCount(p, MAP)).toBe(1);
		expect(learnedCount(p, MAP, ['b'])).toBe(0);
	});
});
