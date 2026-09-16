import { describe, expect, it } from 'vitest';
import { COL_W, COL_X, HUB_H, layout } from './layout';

const SIZES = [6, 5, 5, 7, 6, 5, 6, 4, 7, 6];
const GROUPS = SIZES.map((n, g) => ({
	id: `g${g}`,
	title: `Group ${g}`,
	concepts: Array.from({ length: n }, (_, i) => `g${g}-c${i}`)
}));

type Seg = { x1: number; y1: number; x2: number; y2: number };
type Rect = { x: number; y: number; w: number; h: number };

/** Exact check: does the segment pass through the rectangle's interior (shrunk by 1e-6 to ignore touching)? */
function crosses(s: Seg, r: Rect) {
	const e = 1e-6;
	let lo = 0;
	let hi = 1;
	const axes: [number, number, number][] = [
		[s.x1, s.x2 - s.x1, 0],
		[s.y1, s.y2 - s.y1, 1]
	];
	for (const [p, d, axis] of axes) {
		const min = (axis === 0 ? r.x : r.y) + e;
		const max = (axis === 0 ? r.x + r.w : r.y + r.h) - e;
		if (d === 0) {
			if (p <= min || p >= max) return false;
			continue;
		}
		let t1 = (min - p) / d;
		let t2 = (max - p) / d;
		if (t1 > t2) [t1, t2] = [t2, t1];
		lo = Math.max(lo, t1);
		hi = Math.min(hi, t2);
	}
	return lo < hi;
}

/** Deterministic PRNG (mulberry32). */
function rng(seed: number) {
	return () => {
		seed = (seed + 0x6d2b79f5) | 0;
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

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
			for (let i = 1; i < spans.length; i++)
				expect(spans[i][0]).toBeGreaterThanOrEqual(spans[i - 1][1]);
		}
	});

	it('fits every box and the hub inside the height', () => {
		const l = layout(GROUPS);
		for (const c of l.clusters) expect(c.y + c.h).toBeLessThanOrEqual(l.height);
		expect(l.hub.y + HUB_H / 2).toBeLessThanOrEqual(l.height);
	});

	it('ends each spoke on its box edge', () => {
		for (const c of layout(GROUPS).clusters) {
			if (!c.spoke) continue;
			const { x2, y2 } = c.spoke;
			expect(x2 === c.x || x2 === c.x + COL_W || y2 === c.y || y2 === c.y + c.h).toBe(true);
		}
	});

	it('still places the hub when the middle column is empty', () => {
		const l = layout(GROUPS.slice(0, 1));
		expect(l.height).toBeGreaterThanOrEqual(l.hub.y + HUB_H / 2);
	});

	it('puts at most two boxes in the middle column', () => {
		for (let n = 1; n <= GROUPS.length; n++) {
			const l = layout(GROUPS.slice(0, n));
			expect(l.clusters.filter((c) => c.x === COL_X[1]).length).toBeLessThanOrEqual(2);
			expect(Object.keys(l.pos)).toHaveLength(SIZES.slice(0, n).reduce((a, b) => a + b));
		}
	});

	it('never draws a spoke through another box', () => {
		for (let n = 1; n <= GROUPS.length; n++) {
			const l = layout(GROUPS.slice(0, n));
			for (const c of l.clusters) {
				if (!c.spoke) continue;
				for (const o of l.clusters) {
					if (o === c) continue;
					expect(crosses(c.spoke, { x: o.x, y: o.y, w: COL_W, h: o.h })).toBe(false);
				}
			}
		}
	});

	it('keeps spokes for the middle boxes and at least one box per side column', () => {
		const l = layout(GROUPS);
		const withSpoke = (x: number) => l.clusters.filter((c) => c.x === x && c.spoke);
		expect(withSpoke(COL_X[1])).toHaveLength(2);
		expect(withSpoke(COL_X[0]).length).toBeGreaterThanOrEqual(1);
		expect(withSpoke(COL_X[2]).length).toBeGreaterThanOrEqual(1);
	});

	it('draws every spoke for the real group sizes', () => {
		expect(layout(GROUPS).clusters.filter((c) => c.spoke)).toHaveLength(GROUPS.length);
	});

	it('keeps the real-size fixture layout: lower middle box bottom-aligned, hub between middle boxes', () => {
		const l = layout(GROUPS);
		const middle = l.clusters.filter((c) => c.x === COL_X[1]).sort((a, b) => a.y - b.y);
		const sideBottom = Math.max(
			...l.clusters.filter((c) => c.x !== COL_X[1]).map((c) => c.y + c.h)
		);
		expect(middle[1].y + middle[1].h).toBe(sideBottom);
		expect(middle[1].y).toBeGreaterThanOrEqual(l.hub.y + HUB_H / 2);
		expect(l.hub.y - HUB_H / 2).toBeGreaterThanOrEqual(middle[0].y + middle[0].h);
	});

	it('holds every invariant for random group sizes', () => {
		const rand = rng(20260916);
		const RUNS = 500;
		const failures: string[] = [];
		for (let run = 0; run < RUNS; run++) {
			const count = 6 + Math.floor(rand() * 9); // 6–14 groups
			const sizes = Array.from({ length: count }, () => 3 + Math.floor(rand() * 6)); // 3–8 concepts
			const groups = sizes.map((n, g) => ({
				id: `g${g}`,
				title: '',
				concepts: Array.from({ length: n }, (_, i) => `g${g}-c${i}`)
			}));
			const l = layout(groups);
			const problems: string[] = [];

			if (Object.keys(l.pos).length !== sizes.reduce((a, b) => a + b))
				problems.push('missing positions');
			if (l.clusters.filter((c) => c.x === COL_X[1]).length > 2) problems.push('middle column > 2');
			if (l.hub.y + HUB_H / 2 > l.height) problems.push('hub outside height');
			for (const x of new Set(l.clusters.map((c) => c.x))) {
				const spans = l.clusters.filter((c) => c.x === x).map((c) => [c.y, c.y + c.h]);
				if (x === COL_X[1]) spans.push([l.hub.y - HUB_H / 2, l.hub.y + HUB_H / 2]);
				spans.sort((a, b) => a[0] - b[0]);
				for (let i = 1; i < spans.length; i++)
					if (spans[i][0] < spans[i - 1][1]) problems.push(`overlap at x=${x}`);
			}
			for (const c of l.clusters) {
				if (c.y + c.h > l.height) problems.push(`${c.id} outside height`);
				if (!c.spoke) {
					problems.push(`${c.id} has no spoke`);
					continue;
				}
				const { x2, y2 } = c.spoke;
				const onEdge =
					((x2 === c.x || x2 === c.x + COL_W) && y2 >= c.y && y2 <= c.y + c.h) ||
					((y2 === c.y || y2 === c.y + c.h) && x2 >= c.x && x2 <= c.x + COL_W);
				if (!onEdge) problems.push(`${c.id} spoke not on its edge`);
				for (const o of l.clusters) {
					if (o !== c && crosses(c.spoke, { x: o.x, y: o.y, w: COL_W, h: o.h })) {
						problems.push(`${c.id} spoke crosses ${o.id}`);
					}
				}
			}
			if (problems.length) failures.push(`[${sizes}]: ${problems.join(', ')}`);
		}
		expect(failures.slice(0, 5), `${failures.length}/${RUNS} layouts failed`).toEqual([]);
	});

	it('draws every spoke for the reviewer example sizes', () => {
		const groups = [4, 6, 7, 4, 7, 4, 5, 7, 6, 6].map((n, g) => ({
			id: `g${g}`,
			title: '',
			concepts: Array.from({ length: n }, (_, i) => `g${g}-c${i}`)
		}));
		expect(layout(groups).clusters.filter((c) => c.spoke)).toHaveLength(groups.length);
	});
});
