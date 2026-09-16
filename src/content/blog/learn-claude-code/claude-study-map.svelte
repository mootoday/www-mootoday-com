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

	/** @param {string} a @param {string} b */
	function curve(a, b) {
		const A = P[a];
		const Z = P[b];
		const mx = (A.x + Z.x) / 2;
		const my = (A.y + Z.y) / 2;
		const qx = mx + (O.x - mx) * 0.35;
		const qy = my + (O.y - my) * 0.35;
		return `M${A.x},${A.y}Q${qx},${qy} ${Z.x},${Z.y}`;
	}

	/** @param {(a: string, b: string) => boolean} f */
	function edges(f) {
		/** @type {string[]} */
		const out = [];
		for (const a in C) C[a].r.forEach((b) => a < b && f(a, b) && out.push(curve(a, b)));
		return out;
	}
</script>

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
	let view = 'map';
	let loaded = false;
	/** Only write to storage once stored progress has been read */
	let storageOk = false;
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
			storageOk = true;
			save();
		} catch (e) {
			// Storage unavailable; progress just won't persist
		}
		loaded = true;
	});

	function save() {
		if (!storageOk) return;
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
		if (id !== sel) reviewing = status(progress, MAP, id).updated ? id : null;
		sel = id;
		update(markOpened(progress, MAP, id));
		// When the panel sits below the map, bring it into view
		if (root && root.clientWidth < 880) {
			await tick();
			panelEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	/**
	 * Toggle learned; when marking learned, move on to the next concept in the stage,
	 * or to the next stage (the whole map after the last one)
	 * @param {string} id
	 */
	function toggleCurrent(id) {
		const wasLearned = status(progress, MAP, id).learned;
		update(toggleLearned(progress, MAP, id));
		if (wasLearned) return;
		const order = ORD[C[id].b];
		const next = order[order.indexOf(id) + 1];
		if (next) select(next);
		else selectBlock(C[id].b < STAGES.length ? C[id].b + 1 : 0);
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

	/** @param {string} id @param {Progress} progress */
	function pillLabel(id, progress) {
		const st = status(progress, MAP, id);
		let label = `${C[id].l}, stage ${C[id].b}`;
		if (st.learned) label += ', learned';
		if (st.updated) label += ', changed since you learned it';
		else if (st.isNew) label += ', new';
		return label;
	}

	/** @param {KeyboardEvent} e */
	function windowKey(e) {
		if (e.key === 'Escape' && sel) sel = null;
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
	$: bgLinks = !sel && blk ? edges((a, b) => ORD[blk].includes(a) && ORD[blk].includes(b)) : [];
	$: cur = sel ? C[sel] : null;
	$: done = !!cur && status(progress, MAP, cur.id).learned;
	$: curOrder = cur ? ORD[cur.b] : [];
	$: curIdx = cur ? curOrder.indexOf(cur.id) : -1;
	$: nextInBlock = blk ? ORD[blk].find((id) => !status(progress, MAP, id).learned) : undefined;
	$: learnedTotal = learnedCount(progress, MAP);
	$: retired = retiredLearned(progress, MAP);
	$: changes = changesSince(progress, MAP);
	$: showBanner =
		loaded &&
		progress.seenVersion < MAP.version &&
		changes.added + changes.updated + changes.retired > 0;
	$: changeText = [
		changes.added && `${changes.added} new`,
		changes.updated && `${changes.updated} to review`,
		changes.retired && `${changes.retired} retired`
	]
		.filter(Boolean)
		.join(', ');
</script>

<svelte:window on:keydown={windowKey} />

<div class="ccmap not-prose" bind:this={root}>
	{#if showBanner}
		<div class="banner" role="status">
			<span>Updated {UPDATED}. Since your last visit: {changeText}.</span>
			<button class="btn sm" on:click={() => update(dismissChanges(progress, MAP))}>Got it</button>
		</div>
	{/if}
	<nav class="day" aria-label="Stages">
		<button class="seg" aria-pressed={blk === 0} on:click={() => selectBlock(0)}>
			<span class="bar"
				><span
					class="fill"
					style="width:{(learnedTotal / TOTAL) * 100}%;background:var(--ink)"
				/></span
			>
			<span class="tm">All stages</span>
			<span class="nm">Whole map</span>
			<span class="cnt">{learnedTotal} of {TOTAL} learned</span>
		</button>
		{#each STAGES as s}
			{@const n = learnedCount(progress, MAP, ORD[s.n])}
			<button class="seg" aria-pressed={blk === s.n} on:click={() => selectBlock(s.n)}>
				<span class="bar"
					><span
						class="fill"
						style="width:{Math.round((n / ORD[s.n].length) * 100)}%;background:var(--b{s.n})"
					/></span
				>
				<span class="tm">Stage {s.n}</span>
				<span class="nm">{s.name}</span>
				<span class="cnt">{n} of {ORD[s.n].length} learned</span>
			</button>
		{/each}
	</nav>

	<div class="main">
		<section aria-label="Concept map">
			<div class="tools">
				<div class="toggle" role="group" aria-label="View">
					<button aria-pressed={view === 'map'} on:click={() => (view = 'map')}>Map</button>
					<button aria-pressed={view === 'list'} on:click={() => (view = 'list')}>List</button>
				</div>
				<span class="legend"
					>The number on each concept is its stage. ✓ learned, ↻ changed since you learned it, "new"
					added since your first visit.</span
				>
			</div>

			{#if view === 'map'}
				<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
				<svg
					class="map"
					viewBox="0 0 680 {L.height}"
					role="img"
					aria-label="Concept map of Claude Code with {MAP.groups
						.length} topic groups around a central node"
					on:click={mapClick}
				>
					<g>
						{#each clusters as cl}
							{#if cl.spoke}
								<line
									class="spoke"
									x1={cl.spoke.x1}
									y1={cl.spoke.y1}
									x2={cl.spoke.x2}
									y2={cl.spoke.y2}
								/>
							{/if}
						{/each}
						<circle class="hub" cx={O.x} cy={O.y} r={R} />
						<text class="hubt" x={O.x} y={O.y - 8} text-anchor="middle">Claude Code</text>
						<text class="hubs" x={O.x} y={O.y + 11} text-anchor="middle">study map</text>
					</g>
					<g>
						{#each bgLinks as d}
							<path class="xa" pathLength="1" {d} />
						{/each}
						{#key sel}
							{#each selLinks as d}
								<path class="xl" pathLength="1" {d} />
							{/each}
						{/key}
					</g>
					<g>
						{#each clusters as cl}
							<rect class="cr" x={cl.x} y={cl.y} width="200" height={cl.h} rx="12" />
							<text class="ct" x={cl.x + 12} y={cl.y + 16}>{cl.title}</text>
							{#each cl.pills as p (p.id)}
								<g
									class="pill {stateClass(p.id, sel, blk, progress)}"
									data-id={p.id}
									tabindex="0"
									role="button"
									aria-label={pillLabel(p.id, progress)}
									on:click={() => select(p.id)}
									on:keydown={(e) => pillKey(e, p.id)}
								>
									<rect class="pr" x={p.px} y={p.py} width="184" height="22" rx="6" />
									<circle class="d{C[p.id].b}" cx={p.px + 10} cy={p.py + 11} r="4" />
									<text class="pl" x={p.px + 20} y={p.py + 11}>{C[p.id].l}</text>
									<text class="pb" x={p.px + 180} y={p.py + 11} text-anchor="end"
										>{badge(p.id, progress)}</text
									>
								</g>
							{/each}
						{/each}
					</g>
				</svg>
			{:else}
				<div class="list">
					{#each MAP.groups as g}
						<section>
							<h3>{g.title}</h3>
							<div class="lg">
								{#each g.concepts as id}
									<button
										class="lp {stateClass(id, sel, blk, progress)}"
										data-id={id}
										aria-label={pillLabel(id, progress)}
										on:click={() => select(id)}
									>
										<span class="dot" style="background:var(--b{C[id].b})" />
										<span class="lb">{C[id].l}</span>
										<span class="bd" aria-hidden="true">{badge(id, progress)}</span>
									</button>
								{/each}
							</div>
						</section>
					{/each}
				</div>
			{/if}
		</section>

		<aside class="pn" aria-live="polite" bind:this={panelEl}>
			{#if cur}
				<div class="tag">
					<i style="background:var(--b{cur.b})" />Stage {cur.b}, {stage(cur.b).name}
				</div>
				<h2>{cur.l}</h2>
				<p class="muted" style="margin:4px 0 0">{cur.k}</p>
				{#if reviewing === cur.id}
					<p class="note">This changed since you marked it learned. Worth another look.</p>
				{/if}
				<p>{cur.w}</p>
				<div class="row nowrap">
					<button
						class="btn icon"
						class:done
						aria-pressed={done}
						aria-label={done ? 'Learned' : 'Mark as learned'}
						title={done ? 'Learned. Click to undo' : 'Mark as learned'}
						on:click={() => cur && toggleCurrent(cur.id)}
					>
						<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
							<path d="M4.5 10.5l3.5 3.5 7.5-8" />
						</svg>
					</button>
					{#if curIdx < curOrder.length - 1}
						<button class="btn next" on:click={() => select(curOrder[curIdx + 1])}>
							<span class="next-l">Next:</span>
							<span class="next-t">{C[curOrder[curIdx + 1]].l}</span>
							<span aria-hidden="true">→</span>
						</button>
					{/if}
				</div>
				<div class="sub">Connects to</div>
				<div class="chips">
					{#each [...cur.r] as r}
						<button class="btn sm" on:click={() => select(r)}>{C[r].l}</button>
					{/each}
				</div>
				<div class="sub">Read in the docs</div>
				<div class="reads">
					{#each cur.s as s}
						<a href={DOCS + s} target="_blank" rel="noopener">{s}</a>
					{/each}
				</div>
				<div class="row">
					{#if curIdx > 0}
						<button class="btn sm" on:click={() => select(curOrder[curIdx - 1])}>Previous</button>
					{/if}
					<button class="btn sm" on:click={() => cur && selectBlock(cur.b)}
						>Back to stage {cur.b}</button
					>
				</div>
			{:else if blk}
				<div class="tag"><i style="background:var(--b{blk})" />Stage {blk}</div>
				<h2>{stage(blk).name}</h2>
				<div class="sub">Hands-on</div>
				<p style="margin:0">{stage(blk).exercise}</p>
				<div class="row">
					<button class="btn pri" on:click={() => select(nextInBlock || ORD[blk][0])}>
						{nextInBlock
							? nextInBlock === ORD[blk][0]
								? 'Start this stage'
								: 'Continue with ' + C[nextInBlock].l
							: 'Review this stage'}
					</button>
				</div>
				<div class="sub">Study in this order</div>
				<ol class="ol">
					{#each ORD[blk] as id, k}
						<li>
							<span class="n">{k + 1}</span>
							<button class="linkish" on:click={() => select(id)}>{C[id].l}</button>
							{#if status(progress, MAP, id).learned}<span class="ok">✓ learned</span>{/if}
						</li>
					{/each}
				</ol>
			{:else}
				<h2>Learn at your own pace</h2>
				<p>
					Six stages take you from your first session to running Claude Code across a team. Each
					stage pairs a set of concepts with a hands-on exercise. Click a concept on the map to see
					what it connects to, or start with stage 1. Your progress stays in this browser.
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
						<button class="btn" on:click={() => update({ ...progress, learned: {} })}
							>Reset progress</button
						>
					{/if}
				</div>
				{#if retired.length}
					<div class="sub">Previously learned, now retired</div>
					<ul class="retired">
						{#each retired as r}<li>{r.title}</li>{/each}
					</ul>
				{/if}
			{/if}
		</aside>
	</div>

	<p class="foot">
		Generated from the Claude Code documentation at
		<a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noopener"
			>code.claude.com/docs</a
		>
		and refreshed as it changes. Last updated {UPDATED}.
	</p>
</div>

<style>
	.ccmap {
		--paper: #ffffff;
		--cluster: #f4f4f5;
		--ink: #18181b;
		--on-ink: #ffffff;
		--ink2: #52525b;
		--ink3: #71717a;
		--line: #e4e4e7;
		--line2: #d4d4d8;
		--selbg: #e1eaf8;
		--accent: #0d9488;
		--newc: #0f766e;
		--done: #e4f3ea;
		--okc: #237a4b;
		--b1: #2b6cb0;
		--b2: #2f855a;
		--b3: #b7791f;
		--b4: #c53030;
		--b5: #6b46c1;
		--b6: #2c7a7b;

		container-type: inline-size;
		color: var(--ink);
		font-size: 16px;
		line-height: 1.6;
		/* Break out of the narrow prose column to the full content column width */
		width: min(42rem, calc(100vw - 2rem));
	}
	@media (min-width: 640px) {
		.ccmap {
			width: min(42rem, calc(100vw - 9rem));
		}
	}
	@media (min-width: 1024px) {
		.ccmap {
			width: min(64rem, calc(100vw - 15rem));
		}
	}
	:global(html.dark) .ccmap {
		--paper: #18181b;
		--cluster: #1f1f23;
		--ink: #f4f4f5;
		--on-ink: #18181b;
		--ink2: #a1a1aa;
		--ink3: #8b8b94;
		--line: #27272a;
		--line2: #3f3f46;
		--selbg: #1f2e46;
		--accent: #2dd4bf;
		--newc: #2dd4bf;
		--done: #15301f;
		--okc: #6fd39a;
		--b1: #7fb3f0;
		--b2: #7dd3a3;
		--b3: #f0c35e;
		--b4: #f58b8b;
		--b5: #b79cf5;
		--b6: #6fd1d1;
	}

	a {
		color: var(--accent);
	}
	button {
		font: inherit;
		color: inherit;
	}
	button:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}
	h2,
	h3 {
		font-weight: 700;
		margin: 0;
	}
	.btn {
		background: transparent;
		border: 1px solid var(--line2);
		border-radius: 8px;
		padding: 6px 12px;
		font-size: 14px;
		cursor: pointer;
		line-height: 1.3;
	}
	.btn:hover {
		border-color: var(--ink2);
	}
	.btn.pri {
		background: var(--ink);
		color: var(--on-ink);
		border-color: var(--ink);
	}
	.btn.pri:hover {
		opacity: 0.9;
	}
	.btn.sm {
		font-size: 13px;
		padding: 4px 10px;
	}
	.btn.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: none;
		width: 34px;
		height: 34px;
		padding: 0;
		color: var(--ink2);
	}
	.btn.icon path {
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.btn.icon.done {
		background: var(--okc);
		border-color: var(--okc);
		color: var(--paper);
	}
	.btn.next {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		min-width: 0;
		height: 34px;
		white-space: nowrap;
	}
	.next-l {
		color: var(--ink3);
	}
	.next-t {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.day {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 8px;
		margin: 0 0 28px;
	}
	.seg {
		text-align: left;
		background: var(--paper);
		border: 1px solid var(--line);
		border-radius: 10px;
		padding: 10px 12px 12px;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}
	.seg:hover {
		border-color: var(--line2);
	}
	.seg[aria-pressed='true'] {
		border-color: var(--ink);
		box-shadow: inset 0 0 0 1px var(--ink);
	}
	.seg .bar {
		display: block;
		height: 6px;
		border-radius: 3px;
		background: var(--line);
		overflow: hidden;
		margin-bottom: 8px;
	}
	.seg .fill {
		display: block;
		height: 100%;
		border-radius: 3px;
		transition: width 0.3s;
	}
	.seg .tm {
		font-size: 13px;
		color: var(--ink3);
	}
	.seg .nm {
		font-weight: 700;
		font-size: 15px;
		line-height: 1.25;
	}
	.seg .cnt {
		font-size: 13px;
		color: var(--ink2);
	}

	.main {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 28px;
		align-items: start;
	}
	.tools {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px;
		margin: 0 0 12px;
	}
	.toggle {
		display: inline-flex;
		border: 1px solid var(--line2);
		border-radius: 8px;
		overflow: hidden;
	}
	.toggle button {
		border: 0;
		background: transparent;
		padding: 5px 14px;
		font-size: 14px;
		cursor: pointer;
	}
	.toggle button[aria-pressed='true'] {
		background: var(--ink);
		color: var(--on-ink);
	}
	.legend {
		font-size: 13px;
		color: var(--ink3);
		width: 100%;
	}

	.map {
		width: 100%;
		height: auto;
		display: block;
	}
	.map text {
		dominant-baseline: central;
	}
	.cr {
		fill: var(--cluster);
	}
	.ct {
		font-weight: 700;
		font-size: 13px;
		fill: var(--ink);
	}
	.spoke {
		stroke: var(--line2);
		stroke-width: 1;
	}
	.hub {
		fill: var(--ink);
	}
	.hubt {
		font-weight: 700;
		font-size: 14px;
		fill: var(--on-ink);
	}
	.hubs {
		font-size: 11px;
		fill: var(--on-ink);
		opacity: 0.8;
	}
	.pill {
		cursor: pointer;
	}
	.pill:focus {
		outline: none;
	}
	.pr {
		fill: var(--paper);
		stroke: var(--line2);
		stroke-width: 0.6;
	}
	.pl {
		font-size: 12px;
		fill: var(--ink);
	}
	.pb {
		font-weight: 700;
		font-size: 11px;
		fill: var(--ink3);
	}
	.pill:hover .pr {
		stroke: var(--ink2);
	}
	.pill:focus-visible .pr {
		stroke: var(--accent);
		stroke-width: 2;
	}
	.pill.learned .pr {
		fill: var(--done);
	}
	.pill.learned .pb {
		fill: var(--okc);
	}
	.pill.rel .pr,
	.pill.blk .pr {
		stroke: var(--accent);
		stroke-width: 1.3;
	}
	.pill.sel .pr {
		fill: var(--selbg);
		stroke: var(--ink);
		stroke-width: 1.6;
	}
	.dim {
		opacity: 0.25;
	}
	.xl {
		fill: none;
		stroke: var(--ink);
		stroke-width: 1.3;
	}
	.xa {
		fill: none;
		stroke: var(--line2);
		stroke-width: 0.7;
	}
	.d1 {
		fill: var(--b1);
	}
	.d2 {
		fill: var(--b2);
	}
	.d3 {
		fill: var(--b3);
	}
	.d4 {
		fill: var(--b4);
	}
	.d5 {
		fill: var(--b5);
	}
	.d6 {
		fill: var(--b6);
	}
	@media (prefers-reduced-motion: no-preference) {
		.xl {
			stroke-dasharray: 1;
			animation: draw 0.45s ease-out;
		}
		@keyframes draw {
			from {
				stroke-dashoffset: 1;
			}
			to {
				stroke-dashoffset: 0;
			}
		}
	}

	.list section {
		margin: 0 0 20px;
	}
	.list h3 {
		font-size: 16px;
		margin: 0 0 8px;
	}
	.lg {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 6px;
	}
	.lp {
		display: flex;
		align-items: center;
		gap: 8px;
		text-align: left;
		background: var(--paper);
		border: 1px solid var(--line2);
		border-radius: 8px;
		padding: 7px 10px;
		font-size: 14px;
		cursor: pointer;
	}
	.lp .dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex: none;
	}
	.lp .lb {
		flex: 1;
		min-width: 0;
	}
	.lp .bd {
		font-size: 12px;
		font-weight: 700;
		color: var(--ink3);
	}
	.lp.learned {
		background: var(--done);
	}
	.lp.learned .bd {
		color: var(--okc);
	}
	.lp.rel,
	.lp.blk {
		border-color: var(--accent);
		box-shadow: inset 0 0 0 1px var(--accent);
	}
	.lp.sel {
		background: var(--selbg);
		border-color: var(--ink);
		box-shadow: inset 0 0 0 1px var(--ink);
	}

	.pn {
		background: var(--paper);
		border: 1px solid var(--line);
		border-radius: 14px;
		padding: 20px 22px;
		scroll-margin-top: 16px;
	}
	.pn h2 {
		font-size: 24px;
		line-height: 1.15;
		letter-spacing: -0.01em;
	}
	.pn p {
		margin: 8px 0 0;
		color: var(--ink2);
	}
	.tag {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 13px;
		color: var(--ink2);
		margin: 0 0 8px;
	}
	.tag i {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		display: inline-block;
	}
	.sub {
		font-weight: 700;
		font-size: 14px;
		margin: 18px 0 8px;
		color: var(--ink);
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.reads {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 14px;
		font-size: 14px;
	}
	.row {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 16px;
	}
	.row.nowrap {
		flex-wrap: nowrap;
	}
	.ol {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.ol li {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 5px 0;
		margin: 0;
		border-bottom: 1px solid var(--line);
	}
	.ol li:last-child {
		border-bottom: 0;
	}
	.ol .n {
		width: 22px;
		font-size: 13px;
		color: var(--ink3);
		text-align: right;
	}
	.ol .ok {
		margin-left: auto;
		font-size: 13px;
		color: var(--okc);
	}
	.linkish {
		background: none;
		border: 0;
		padding: 0;
		cursor: pointer;
		color: var(--ink);
		text-align: left;
		font-size: 15px;
	}
	.linkish:hover {
		text-decoration: underline;
	}
	.agenda li {
		display: grid;
		grid-template-columns: 52px 1fr auto;
		gap: 8px;
		align-items: baseline;
		padding: 7px 0;
	}
	.agenda .tm {
		font-size: 13px;
		color: var(--ink3);
	}
	.agdot {
		display: inline-block;
		width: 9px;
		height: 9px;
		border-radius: 50%;
		margin-right: 8px;
	}
	.muted {
		color: var(--ink3);
		font-size: 14px;
	}
	.foot {
		margin-top: 36px;
		font-size: 14px;
		color: var(--ink3);
	}

	@container (min-width: 560px) {
		.day {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
	@container (min-width: 880px) {
		.day {
			grid-template-columns: repeat(7, minmax(0, 1fr));
		}
		.main {
			grid-template-columns: minmax(0, 1fr) 320px;
		}
		.pn {
			position: sticky;
			top: 16px;
			max-height: calc(100vh - 32px);
			overflow: auto;
		}
		.legend {
			width: auto;
			margin-left: auto;
		}
	}
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
		fill: var(--newc);
		font-weight: 700;
	}
	.lp.new .bd,
	.lp.upd .bd {
		color: var(--newc);
		font-weight: 700;
	}
</style>
