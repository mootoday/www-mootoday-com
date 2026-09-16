import type { Group } from './types';

export const COL_X = [10, 240, 470];
export const COL_W = 200;
export const GAP = 20;
export const TOP = 10;
export const HUB_R = 46;
export const HUB_H = 140;
export const PILL_STEP = 27;
const ANCHOR_STEP = 4;
/** Extra pixels of clearance between a spoke and a middle box's corner. */
const SIGHT_MARGIN = 2;

export type Point = { x: number; y: number };
export type Segment = { x1: number; y1: number; x2: number; y2: number };
export type ClusterBox = {
	id: string;
	title: string;
	x: number;
	y: number;
	h: number;
	pills: { id: string; px: number; py: number }[];
	/**
	 * Line from the hub to this box. null is only a theoretical last resort: the layout is
	 * arranged so every spoke has a clear line that crosses no other box.
	 */
	spoke: Segment | null;
};
export type MapLayout = {
	height: number;
	hub: Point;
	clusters: ClusterBox[];
	pos: Record<string, Point>;
};

const groupHeight = (count: number) => 38 + count * PILL_STEP;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** True if the segment passes through the rectangle's interior (touching an edge or corner doesn't count). */
function crossesRect(s: Segment, rx: number, ry: number, rw: number, rh: number): boolean {
	const dx = s.x2 - s.x1;
	const dy = s.y2 - s.y1;
	let t0 = 0;
	let t1 = 1;
	// Liang–Barsky clip against the closed rectangle.
	const edges: [number, number][] = [
		[-dx, s.x1 - rx],
		[dx, rx + rw - s.x1],
		[-dy, s.y1 - ry],
		[dy, ry + rh - s.y1]
	];
	for (const [p, q] of edges) {
		if (p === 0) {
			if (q < 0) return false;
		} else {
			const t = q / p;
			if (p < 0) t0 = Math.max(t0, t);
			else t1 = Math.min(t1, t);
			if (t0 > t1) return false;
		}
	}
	if (t1 - t0 < 1e-9) return false;
	// The clipped part is inside the closed rect; it crosses the interior unless it runs along an edge.
	const tm = (t0 + t1) / 2;
	const mx = s.x1 + dx * tm;
	const my = s.y1 + dy * tm;
	return mx > rx && mx < rx + rw && my > ry && my < ry + rh;
}

/**
 * Spoke end points to try, best first: the point nearest the hub, then (for side boxes) the rest
 * of the inner edge outward from it, then the horizontal edge facing the hub from the inner corner.
 */
function anchors(b: ClusterBox, hub: Point): [number, number][] {
	const bottom = b.y + b.h;
	const nearestY = clamp(hub.y, b.y, bottom);
	const result: [number, number][] = [[clamp(hub.x, b.x, b.x + COL_W), nearestY]];
	if (b.x === COL_X[1]) return result;
	const innerX = b.x < COL_X[1] ? b.x + COL_W : b.x;
	for (let k = 1; nearestY - k * ANCHOR_STEP > b.y || nearestY + k * ANCHOR_STEP < bottom; k++) {
		if (nearestY - k * ANCHOR_STEP > b.y) result.push([innerX, nearestY - k * ANCHOR_STEP]);
		if (nearestY + k * ANCHOR_STEP < bottom) result.push([innerX, nearestY + k * ANCHOR_STEP]);
	}
	result.push([innerX, b.y], [innerX, bottom]);
	if (hub.y !== nearestY) {
		const edgeY = hub.y < b.y ? b.y : bottom;
		const dir = innerX === b.x ? 1 : -1;
		for (let k = 1; k * ANCHOR_STEP < COL_W; k++)
			result.push([innerX + dir * k * ANCHOR_STEP, edgeY]);
	}
	return result;
}

/**
 * Packs groups into three columns, balancing heights, with the hub in the middle column.
 * The middle column holds at most two groups: one at the top and one below the hub.
 * Bottom-aligning the lower middle box with the tallest side column and centring the hub between
 * the middle boxes are preferences, subject to sight-line constraints: the hub is clamped so
 * spokes to the side boxes clear the middle boxes' corners, and the lower middle box can move
 * further down when needed, which makes the map taller.
 */
export function layout(groups: Group[]): MapLayout {
	const cols: Group[][] = [[], [], []];
	const heights = [0, HUB_H + GAP, 0];
	for (const g of groups) {
		let c = -1;
		for (let i = 0; i < 3; i++) {
			if (i === 1 && cols[1].length >= 2) continue;
			if (c === -1 || heights[i] < heights[c]) c = i;
		}
		cols[c].push(g);
		heights[c] += groupHeight(g.concepts.length) + GAP;
	}

	const clusters: ClusterBox[] = [];
	const pos: Record<string, Point> = {};
	const place = (g: Group, x: number, y: number): ClusterBox => {
		const pills = g.concepts.map((id, k) => {
			const px = x + 8;
			const py = y + 28 + k * PILL_STEP;
			pos[id] = { x: px + 92, y: py + 11 };
			return { id, px, py };
		});
		const box = {
			id: g.id,
			title: g.title,
			x,
			y,
			h: groupHeight(g.concepts.length),
			pills,
			spoke: null
		};
		clusters.push(box);
		return box;
	};

	// Side columns stack from the top.
	let sideBottom = 0;
	let firstBottom = Infinity; // highest bottom edge of a side column's first box
	let lastTop = -Infinity; // lowest top edge of a side column's last box
	for (const c of [0, 2]) {
		let y = TOP;
		cols[c].forEach((g, i) => {
			const box = place(g, COL_X[c], y);
			if (i === 0) firstBottom = Math.min(firstBottom, box.y + box.h);
			if (i === cols[c].length - 1) lastTop = Math.max(lastTop, box.y);
			sideBottom = Math.max(sideBottom, box.y + box.h);
			y += box.h + GAP;
		});
	}

	// Middle column: one box at the top, one bottom-aligned with the side columns, and the hub in
	// the open space between them. A spoke to a side box leaves the middle column at its outer edge;
	// the hub must sit far enough from the middle boxes that those diagonals clear their corners.
	// R is how much a spoke's vertical offset grows between the middle column edge and the side edge.
	const hub: Point = { x: COL_X[1] + COL_W / 2, y: 0 };
	const R = (hub.x - (COL_X[0] + COL_W)) / (hub.x - COL_X[1]);
	const [upper, lower] = cols[1].length === 2 ? cols[1] : [undefined, cols[1][0]];
	const upperBottom = upper ? place(upper, COL_X[1], TOP).h + TOP : TOP - GAP;

	// Lowest acceptable hub centre: below the upper box, with a clear line to the highest side box.
	let hubMin = upperBottom + GAP + HUB_H / 2;
	if (upper && firstBottom < Infinity) {
		hubMin = Math.max(hubMin, Math.ceil((R * upperBottom - firstBottom) / (R - 1)) + SIGHT_MARGIN);
	}
	hub.y = hubMin;
	let bottom = Math.max(sideBottom, hub.y + HUB_H / 2);

	if (lower) {
		const h = groupHeight(lower.concepts.length);
		const aligned = Math.max(sideBottom - h, hubMin + HUB_H / 2 + GAP);
		// Highest acceptable hub centre with the lower box bottom-aligned.
		let hubMax = aligned - GAP - HUB_H / 2;
		if (lastTop > -Infinity)
			hubMax = Math.min(hubMax, Math.floor((R * aligned - lastTop) / (R - 1)) - SIGHT_MARGIN);
		const centre = Math.round((upperBottom + GAP + aligned - GAP) / 2);
		hub.y = hubMax >= hubMin ? clamp(centre, hubMin, hubMax) : hubMin;
		// If no hub position fits, move the lower box down until its sight lines clear.
		let y = Math.max(aligned, hub.y + HUB_H / 2 + GAP);
		if (lastTop > -Infinity)
			y = Math.max(y, Math.ceil((lastTop + (R - 1) * hub.y) / R) + SIGHT_MARGIN);
		place(lower, COL_X[1], y);
		bottom = Math.max(bottom, y + h);
	}
	const height = bottom + TOP;

	for (const b of clusters) {
		b.spoke = null;
		for (const [x2, y2] of anchors(b, hub)) {
			const dx = x2 - hub.x;
			const dy = y2 - hub.y;
			const d = Math.hypot(dx, dy) || 1;
			const spoke = { x1: hub.x + (dx / d) * HUB_R, y1: hub.y + (dy / d) * HUB_R, x2, y2 };
			if (!clusters.some((o) => o !== b && crossesRect(spoke, o.x, o.y, COL_W, o.h))) {
				b.spoke = spoke;
				break;
			}
		}
	}

	return { height, hub, clusters, pos };
}
