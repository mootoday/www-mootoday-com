import { describe, expect, it } from 'vitest';
import {
	changelog,
	finalize,
	parseDocSlugs,
	resolveId,
	uncoveredDocs,
	validate,
	warnings
} from './study-map';
import type { StudyMap, StudyMapDraft } from './types';

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

	it('ignores inherited object properties', () => {
		expect(resolveId('constructor', {})).toBe('constructor');
	});
});

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
			{
				id: 'memory',
				title: 'CLAUDE.md',
				stage: 1,
				docs: ['memory'],
				summary: 'm',
				related: [],
				rev: 1,
				addedIn: 1
			},
			{
				id: 'memory--auto-memory',
				title: 'Auto memory',
				stage: 2,
				docs: ['memory'],
				summary: 'a',
				related: ['memory'],
				rev: 1,
				addedIn: 2
			},
			{
				id: 'hooks-guide',
				title: 'Hooks',
				stage: 3,
				docs: ['hooks-guide', 'hooks'],
				summary: 'h',
				related: ['skills'],
				rev: 1,
				addedIn: 1
			},
			{
				id: 'skills',
				title: 'Skills',
				stage: 4,
				docs: ['skills'],
				summary: 's',
				related: [],
				rev: 2,
				addedIn: 1
			},
			{
				id: 'costs',
				title: 'Costs',
				stage: 5,
				docs: ['costs'],
				summary: 'c',
				related: [],
				rev: 1,
				addedIn: 1
			},
			{
				id: 'headless',
				title: 'Headless',
				stage: 6,
				docs: ['headless'],
				summary: 'x',
				related: [],
				rev: 1,
				addedIn: 1
			}
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
			id: c.id,
			title: c.title,
			stage: c.stage,
			docs: [...c.docs],
			summary: c.summary,
			related: [...c.related],
			rev: c.rev
		})),
		aliases: Object.entries(map.aliases).map(([from, to]) => ({ from, to })),
		retired: map.retired.map((r) => ({ id: r.id, title: r.title })),
		revChanges: []
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
		expect(validate(d, prevMap(), DOCS)).toContain(
			'Concept disappeared without alias or retirement: skills'
		);
	});

	// Every stage must keep at least one concept, so removals below add a replacement on the emptied stage.
	it('accepts a merge recorded as an alias', () => {
		const d = draftOf(prevMap());
		removeConcept(d, 'memory--auto-memory');
		d.aliases.push({ from: 'memory--auto-memory', to: 'memory' });
		d.concepts.push({
			id: 'hooks',
			title: 'Hooks reference',
			stage: 2,
			docs: ['hooks'],
			summary: 'r',
			related: [],
			rev: 1
		});
		d.groups[1].concepts.push('hooks');
		expect(validate(d, prevMap(), DOCS)).toEqual([]);
	});

	it('rejects too much churn unless forced', () => {
		const d = draftOf(prevMap());
		removeConcept(d, 'memory--auto-memory');
		d.aliases.push({ from: 'memory--auto-memory', to: 'memory' });
		d.concepts.push({
			id: 'hooks',
			title: 'Hooks reference',
			stage: 2,
			docs: ['hooks'],
			summary: 'r',
			related: [],
			rev: 1
		});
		d.groups[1].concepts.push('hooks');
		removeConcept(d, 'skills');
		d.retired.push({ id: 'skills', title: 'Skills' });
		d.concepts.push({
			id: 'hooks-guide--events',
			title: 'Hook events',
			stage: 4,
			docs: ['hooks'],
			summary: 'e',
			related: [],
			rev: 1
		});
		d.groups[1].concepts.push('hooks-guide--events');
		expect(validate(d, prevMap(), DOCS).join('\n')).toMatch(
			/Too many concepts merged or retired: 2 of 6/
		);
		expect(validate(d, prevMap(), DOCS, { force: true })).toEqual([]);
	});

	it('rejects unknown doc slugs and ids that are not doc slugs', () => {
		const d = draftOf(prevMap());
		d.concepts[0].docs = ['nope'];
		d.concepts.push({
			id: 'fancy',
			title: 'Fancy',
			stage: 1,
			docs: ['skills'],
			summary: 'f',
			related: [],
			rev: 1
		});
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
		d.aliases = [
			{ from: 'x', to: 'y' },
			{ from: 'y', to: 'x' }
		];
		expect(validate(d, null, DOCS).join('\n')).toMatch(/cycle/);
	});

	it('requires stages 1-6, each with a concept', () => {
		const d = draftOf(prevMap());
		d.stages = d.stages.slice(0, 5);
		expect(validate(d, prevMap(), DOCS)).toContain(
			'Stages must be numbered 1-6 in order, got: 1,2,3,4,5'
		);
		const e = draftOf(prevMap());
		e.concepts.find((c) => c.id === 'headless')!.stage = 5;
		expect(validate(e, prevMap(), DOCS)).toContain('Stage has no concepts: 6');
	});

	it('requires every concept in exactly one group', () => {
		const d = draftOf(prevMap());
		d.groups[1].concepts.push('memory');
		expect(validate(d, prevMap(), DOCS)).toContain(
			'Concept must be in exactly one group: memory (2)'
		);
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

	it('rejects a retargeted previous alias', () => {
		const d = draftOf(prevMap());
		d.aliases = [{ from: 'old-hooks', to: 'skills' }];
		expect(validate(d, prevMap(), DOCS)).toEqual([
			'Previous alias changed: old-hooks (hooks-guide -> skills)'
		]);
	});

	it('rejects a new alias for a retired id', () => {
		const d = draftOf(prevMap());
		d.aliases.push({ from: 'gone', to: 'memory' });
		expect(validate(d, prevMap(), DOCS)).toContain('Id is both aliased and retired: gone');
	});

	it('rejects retiring an existing alias source', () => {
		const d = draftOf(prevMap());
		d.retired.push({ id: 'old-hooks', title: 'Old hooks' });
		expect(validate(d, prevMap(), DOCS)).toContain('Id is both aliased and retired: old-hooks');
	});

	it('rejects an alias source that is still a concept', () => {
		const d = draftOf(prevMap());
		d.aliases.push({ from: 'skills', to: 'memory' });
		expect(validate(d, prevMap(), DOCS)).toContain('Alias source is still a concept: skills');
	});

	it('rejects an alias source that was never a concept', () => {
		const d = draftOf(prevMap());
		d.aliases.push({ from: 'brand-new', to: 'memory' });
		expect(validate(d, prevMap(), DOCS)).toEqual(['Alias source was never a concept: brand-new']);
	});

	it('rejects a retired id that was never a concept', () => {
		const d = draftOf(prevMap());
		d.retired.push({ id: 'phantom', title: 'Phantom' });
		expect(validate(d, prevMap(), DOCS)).toEqual(['Retired id was never a concept: phantom']);
	});

	it('rejects a retired id that is still a concept', () => {
		const d = draftOf(prevMap());
		d.retired.push({ id: 'skills', title: 'Skills' });
		expect(validate(d, prevMap(), DOCS)).toContain('Retired id is still a concept: skills');
	});

	it('rejects duplicate retired ids', () => {
		const d = draftOf(prevMap());
		d.retired.push({ id: 'gone', title: 'Gone' });
		expect(validate(d, prevMap(), DOCS)).toEqual(['Duplicate retired id: gone']);
	});

	it('rejects an alias with a dangling target', () => {
		const d = draftOf(prevMap());
		removeConcept(d, 'skills');
		d.aliases.push({ from: 'skills', to: 'nowhere' });
		d.concepts.push({
			id: 'hooks',
			title: 'Hooks reference',
			stage: 4,
			docs: ['hooks'],
			summary: 'r',
			related: [],
			rev: 1
		});
		d.groups[1].concepts.push('hooks');
		expect(validate(d, prevMap(), DOCS)).toEqual([
			'Alias does not resolve to a concept: skills -> nowhere'
		]);
	});

	it('accepts an alias that ends at a retired id', () => {
		const d = draftOf(prevMap());
		removeConcept(d, 'memory--auto-memory');
		d.aliases.push({ from: 'memory--auto-memory', to: 'gone' });
		d.concepts.push({
			id: 'hooks',
			title: 'Hooks reference',
			stage: 2,
			docs: ['hooks'],
			summary: 'r',
			related: [],
			rev: 1
		});
		d.groups[1].concepts.push('hooks');
		expect(validate(d, prevMap(), DOCS)).toEqual([]);
	});

	it('rejects duplicate concept ids', () => {
		const d = draftOf(prevMap());
		d.concepts.push({ ...d.concepts[0], docs: [...d.concepts[0].docs], related: [] });
		expect(validate(d, prevMap(), DOCS)).toContain('Duplicate concept id: memory');
	});

	it('rejects duplicate docs and related ids within a concept', () => {
		const d = draftOf(prevMap());
		const hooks = d.concepts.find((c) => c.id === 'hooks-guide')!;
		hooks.docs.push('hooks');
		hooks.related.push('skills');
		const errors = validate(d, prevMap(), DOCS);
		expect(errors).toContain('Duplicate doc slug in hooks-guide: hooks');
		expect(errors).toContain('Duplicate related id in hooks-guide: skills');
	});

	it('accepts well-formed ids and rejects malformed suffixes', () => {
		const docs = new Set([...DOCS, 'agent-sdk/overview', 'how-claude-code-works']);
		const ok = draftOf(prevMap());
		for (const id of ['agent-sdk/overview', 'how-claude-code-works']) {
			ok.concepts.push({ id, title: id, stage: 1, docs: [id], summary: 'x', related: [], rev: 1 });
			ok.groups[0].concepts.push(id);
		}
		expect(validate(ok, prevMap(), docs)).toEqual([]);

		for (const id of ['memory--', 'memory--auto--x', 'memory---x', 'agent-sdk//overview']) {
			const bad = draftOf(prevMap());
			bad.concepts.push({
				id,
				title: id,
				stage: 1,
				docs: ['memory'],
				summary: 'x',
				related: [],
				rev: 1
			});
			bad.groups[0].concepts.push(id);
			expect(validate(bad, prevMap(), DOCS)).toContain(
				`Concept id is not a doc slug (or slug--suffix): ${id}`
			);
		}
	});

	it('counts pure retirements toward churn', () => {
		const d = draftOf(prevMap());
		removeConcept(d, 'skills');
		removeConcept(d, 'costs');
		d.retired.push({ id: 'skills', title: 'Skills' }, { id: 'costs', title: 'Costs' });
		d.concepts.push(
			{
				id: 'hooks',
				title: 'Hooks reference',
				stage: 4,
				docs: ['hooks'],
				summary: 'r',
				related: [],
				rev: 1
			},
			{
				id: 'hooks-guide--events',
				title: 'Hook events',
				stage: 5,
				docs: ['hooks'],
				summary: 'e',
				related: [],
				rev: 1
			}
		);
		d.groups[1].concepts.push('hooks', 'hooks-guide--events');
		expect(validate(d, prevMap(), DOCS)).toEqual([
			'Too many concepts merged or retired: 2 of 6 (use --force to accept)'
		]);
	});

	it('accepts churn of exactly 25%', () => {
		const prev = prevMap();
		prev.concepts = prev.concepts.filter((c) => c.id !== 'costs' && c.id !== 'headless');
		prev.groups = prev.groups.filter((g) => g.id !== 'ops');
		const d = draftOf(prev);
		removeConcept(d, 'skills');
		d.retired.push({ id: 'skills', title: 'Skills' });
		d.concepts.push(
			{
				id: 'hooks',
				title: 'Hooks reference',
				stage: 4,
				docs: ['hooks'],
				summary: 'r',
				related: [],
				rev: 1
			},
			{ id: 'costs', title: 'Costs', stage: 5, docs: ['costs'], summary: 'c', related: [], rev: 1 },
			{
				id: 'headless',
				title: 'Headless',
				stage: 6,
				docs: ['headless'],
				summary: 'x',
				related: [],
				rev: 1
			}
		);
		d.groups[1].concepts.push('hooks', 'costs', 'headless');
		expect(validate(d, prev, DOCS)).toEqual([]);
	});

	it('does not let force bypass non-churn errors', () => {
		const d = draftOf(prevMap());
		removeConcept(d, 'skills');
		removeConcept(d, 'costs');
		d.retired.push({ id: 'skills', title: 'Skills' }, { id: 'costs', title: 'Costs' });
		d.concepts.push(
			{
				id: 'hooks',
				title: 'Hooks reference',
				stage: 4,
				docs: ['hooks'],
				summary: 'r',
				related: [],
				rev: 1
			},
			{
				id: 'hooks-guide--events',
				title: 'Hook events',
				stage: 5,
				docs: ['hooks'],
				summary: 'e',
				related: [],
				rev: 1
			}
		);
		d.groups[1].concepts.push('hooks', 'hooks-guide--events');
		d.concepts[0].docs = ['nope'];
		expect(validate(d, prevMap(), DOCS, { force: true })).toEqual([
			'Unknown doc slug in memory: nope'
		]);
	});
});

describe('validate revChanges', () => {
	it('accepts a rev increase with a reason', () => {
		const d = draftOf(prevMap());
		d.concepts.find((c) => c.id === 'skills')!.rev = 3;
		d.revChanges.push({ id: 'skills', reason: 'Skills can now run scripts (skills).' });
		expect(validate(d, prevMap(), DOCS)).toEqual([]);
	});

	it('rejects a rev increase without a reason', () => {
		const d = draftOf(prevMap());
		d.concepts.find((c) => c.id === 'skills')!.rev = 3;
		expect(validate(d, prevMap(), DOCS)).toEqual(['Rev increased without a reason: skills']);
	});

	it('rejects a reason without a rev increase', () => {
		const d = draftOf(prevMap());
		d.revChanges.push({ id: 'costs', reason: 'Nothing really.' });
		expect(validate(d, prevMap(), DOCS)).toEqual(['Reason given but rev not increased: costs']);
	});

	it('rejects a reason for a new concept', () => {
		const d = draftOf(prevMap());
		d.concepts.push({
			id: 'hooks',
			title: 'Hooks reference',
			stage: 2,
			docs: ['hooks'],
			summary: 'r',
			related: [],
			rev: 1
		});
		d.groups[1].concepts.push('hooks');
		d.revChanges.push({ id: 'hooks', reason: 'New.' });
		expect(validate(d, prevMap(), DOCS)).toEqual(['Reason given but rev not increased: hooks']);
	});

	it('rejects duplicate and empty reasons', () => {
		const d = draftOf(prevMap());
		d.concepts.find((c) => c.id === 'skills')!.rev = 3;
		d.revChanges.push({ id: 'skills', reason: 'A.' }, { id: 'skills', reason: '  ' });
		const errors = validate(d, prevMap(), DOCS);
		expect(errors).toContain('Duplicate rev change: skills');
		expect(errors).toContain('Empty rev change reason: skills');
	});
});

describe('warnings', () => {
	it('returns nothing for a map within the soft limits', () => {
		const concepts = Array.from({ length: 45 }, (_, i) => ({ id: `c${i}`, summary: 's' }));
		const groups = Array.from({ length: 9 }, (_, g) => ({
			id: `g${g}`,
			concepts: concepts.slice(g * 5, g * 5 + 5).map((c) => c.id)
		}));
		expect(warnings({ groups, concepts } as unknown as StudyMap)).toEqual([]);
	});

	it('flags counts, group sizes and long summaries', () => {
		const map = prevMap();
		map.concepts[0].summary = 'x'.repeat(201);
		expect(warnings(map)).toEqual([
			'Concept count outside 45-70: 6',
			'Group count outside 8-12: 3',
			'Group size outside 3-8: basics (2)',
			'Group size outside 3-8: extend (2)',
			'Group size outside 3-8: ops (2)',
			'Summary over 200 characters: memory (201)'
		]);
	});

	it('flags more than 6 new concepts when given the previous map', () => {
		const prev = prevMap();
		const next = prevMap();
		const added = (n: number) =>
			Array.from({ length: n }, (_, i) => ({
				...prev.concepts[0],
				id: `hooks--new-${i}`,
				related: []
			}));
		next.concepts.push(...added(6));
		expect(warnings(next, prev).filter((w) => w.startsWith('More than'))).toEqual([]);
		next.concepts.push(...added(7).slice(6));
		expect(warnings(next, prev)).toContain('More than 6 new concepts: 7');
		expect(warnings(next).filter((w) => w.startsWith('More than'))).toEqual([]);
	});
});

describe('warnings for renames', () => {
	it('does not count renamed or merged targets as new concepts', () => {
		const prev = prevMap();
		const next = prevMap();
		next.concepts.push(
			...Array.from({ length: 6 }, (_, i) => ({
				...prev.concepts[0],
				id: `hooks--new-${i}`,
				related: []
			}))
		);
		const skills = next.concepts.find((c) => c.id === 'skills')!;
		skills.id = 'skills--authoring';
		next.groups[1].concepts = ['hooks-guide', 'skills--authoring'];
		next.aliases = { ...next.aliases, skills: 'skills--authoring' };
		expect(warnings(next, prev).filter((w) => w.startsWith('More than'))).toEqual([]);
	});
});

describe('uncoveredDocs', () => {
	it('lists doc slugs not linked by any concept, retired id or alias source', () => {
		const docs = new Set([...DOCS, 'old-hooks', 'gone', 'quickstart', 'agent-sdk/overview']);
		expect(uncoveredDocs(prevMap(), docs)).toEqual(['quickstart', 'agent-sdk/overview']);
	});

	it('returns every slug when there is no previous map', () => {
		expect(uncoveredDocs(null, new Set(['a', 'b']))).toEqual(['a', 'b']);
	});
});

describe('finalize', () => {
	it('assigns version, addedIn and retiredIn and converts aliases to an object', () => {
		const d = draftOf(prevMap());
		removeConcept(d, 'skills');
		d.retired.push({ id: 'skills', title: 'Skills' });
		d.concepts.push({
			id: 'hooks',
			title: 'Hooks reference',
			stage: 4,
			docs: ['hooks'],
			summary: 'r',
			related: [],
			rev: 1
		});
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

	it('keeps addedIn from the previous concept when a new id is a rename target', () => {
		const d = draftOf(prevMap());
		removeConcept(d, 'skills');
		d.concepts.push({
			id: 'skills--authoring',
			title: 'Skills',
			stage: 4,
			docs: ['skills'],
			summary: 's',
			related: [],
			rev: 1
		});
		d.groups[1].concepts.push('skills--authoring');
		d.aliases.push({ from: 'skills', to: 'skills--authoring' });
		const next = finalize(d, prevMap(), new Date('2026-09-20T06:00:00Z'));
		expect(next.concepts.find((c) => c.id === 'skills--authoring')!.addedIn).toBe(1);
	});

	it('uses the earliest addedIn when several previous concepts merge into a new id', () => {
		const prev = prevMap();
		prev.concepts.find((c) => c.id === 'memory')!.addedIn = 2;
		prev.concepts.find((c) => c.id === 'memory--auto-memory')!.addedIn = 3;
		prev.concepts.find((c) => c.id === 'hooks-guide')!.addedIn = 2;
		const d = draftOf(prev);
		removeConcept(d, 'memory');
		removeConcept(d, 'memory--auto-memory');
		removeConcept(d, 'hooks-guide');
		d.concepts.push({
			id: 'memory--all',
			title: 'Memory',
			stage: 1,
			docs: ['memory'],
			summary: 'm',
			related: [],
			rev: 1
		});
		d.groups[0].concepts.push('memory--all');
		d.aliases.push(
			{ from: 'memory--auto-memory', to: 'memory' },
			{ from: 'memory', to: 'memory--all' },
			{ from: 'hooks-guide', to: 'memory--all' }
		);
		const next = finalize(d, prev, new Date('2026-09-20T06:00:00Z'));
		expect(next.concepts.find((c) => c.id === 'memory--all')!.addedIn).toBe(2);
	});

	it('does not carry addedIn over from an unrelated previous alias', () => {
		const prev = prevMap();
		prev.aliases['old-hooks'] = 'hooks--new';
		const d = draftOf(prev);
		d.concepts.push({
			id: 'hooks--new',
			title: 'New hooks',
			stage: 3,
			docs: ['hooks'],
			summary: 'n',
			related: [],
			rev: 1
		});
		d.groups[1].concepts.push('hooks--new');
		const next = finalize(d, prev, new Date('2026-09-20T06:00:00Z'));
		expect(next.concepts.find((c) => c.id === 'hooks--new')!.addedIn).toBe(4);
	});

	it('drops revChanges', () => {
		const d = draftOf(prevMap());
		d.revChanges.push({ id: 'skills', reason: 'r' });
		expect(finalize(d, prevMap(), new Date('2026-09-20T06:00:00Z'))).not.toHaveProperty(
			'revChanges'
		);
	});
});

describe('changelog', () => {
	it('lists new, updated, merged and retired concepts', () => {
		const d = draftOf(prevMap());
		removeConcept(d, 'memory--auto-memory');
		d.concepts.find((c) => c.id === 'memory')!.stage = 2;
		d.aliases.push({ from: 'memory--auto-memory', to: 'memory' });
		d.concepts.find((c) => c.id === 'hooks-guide')!.rev = 2;
		d.concepts.push({
			id: 'hooks',
			title: 'Hooks reference',
			stage: 3,
			docs: ['hooks'],
			summary: 'r',
			related: [],
			rev: 1
		});
		d.groups[1].concepts.push('hooks');
		const md = changelog(prevMap(), finalize(d, prevMap(), new Date('2026-09-20T06:00:00Z')));
		expect(md).toContain('## Claude study map v4');
		expect(md).toContain('### New\n\n- Hooks reference (`hooks`, stage 3)');
		expect(md).toContain('### Updated\n\n- Hooks (`hooks-guide`, rev 1 → 2)');
		expect(md).toContain(
			'### Merged\n\n- Auto memory (`memory--auto-memory`) → CLAUDE.md (`memory`)'
		);
		expect(md).not.toContain('### Retired');
	});

	it('appends rev change reasons to updated concepts', () => {
		const d = draftOf(prevMap());
		d.concepts.find((c) => c.id === 'hooks-guide')!.rev = 2;
		d.concepts.find((c) => c.id === 'skills')!.rev = 3;
		const md = changelog(prevMap(), finalize(d, prevMap(), new Date('2026-09-20T06:00:00Z')), {
			'hooks-guide': 'Hooks can now block tool calls.'
		});
		expect(md).toContain(
			'### Updated\n\n- Hooks (`hooks-guide`, rev 1 → 2) — Hooks can now block tool calls.\n- Skills (`skills`, rev 2 → 3)\n'
		);
	});

	it('collapses whitespace in reasons', () => {
		const d = draftOf(prevMap());
		d.concepts.find((c) => c.id === 'hooks-guide')!.rev = 2;
		const md = changelog(prevMap(), finalize(d, prevMap(), new Date('2026-09-20T06:00:00Z')), {
			'hooks-guide': '  Hooks can\n  now   block calls. '
		});
		expect(md).toContain('- Hooks (`hooks-guide`, rev 1 → 2) — Hooks can now block calls.\n');
	});

	it('lists a renamed concept under Merged but not under New', () => {
		const d = draftOf(prevMap());
		removeConcept(d, 'skills');
		d.concepts.push({
			id: 'skills--authoring',
			title: 'Skill authoring',
			stage: 4,
			docs: ['skills'],
			summary: 's',
			related: [],
			rev: 1
		});
		d.groups[1].concepts.push('skills--authoring');
		d.aliases.push({ from: 'skills', to: 'skills--authoring' });
		const md = changelog(prevMap(), finalize(d, prevMap(), new Date('2026-09-20T06:00:00Z')));
		expect(md).toContain(
			'### Merged\n\n- Skills (`skills`) → Skill authoring (`skills--authoring`)'
		);
		expect(md).not.toContain('### New');
	});

	it('says so when nothing changed', () => {
		const next = finalize(draftOf(prevMap()), prevMap(), new Date('2026-09-20T06:00:00Z'));
		expect(changelog(prevMap(), next)).toContain('No concept changes.');
	});

	it('does not treat inherited object properties as previous aliases', () => {
		const prev = prevMap();
		const next = finalize(draftOf(prev), prev, new Date('2026-09-20T06:00:00Z'));
		next.aliases = { ...next.aliases, toString: 'memory' };
		expect(changelog(prev, next)).toContain(
			'### Merged\n\n- toString (`toString`) → CLAUDE.md (`memory`)'
		);
	});
});
