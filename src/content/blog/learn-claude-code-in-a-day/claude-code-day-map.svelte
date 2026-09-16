<script context="module">
	const DOCS = 'https://code.claude.com/docs/en/';
	const KEY = 'cc-day-map:v1';

	const BL = [
		null,
		{ t: '09:00', n: 'Foundations', h: 'Run claude in a real repo. Ask it to explain the codebase, fix a small bug, then /rewind the change. Cycle permission modes with Shift+Tab and run /init to draft a CLAUDE.md.' },
		{ t: '10:30', n: 'Surfaces', h: 'Open the same repo in VS Code or JetBrains and in the desktop app. Start a web session and pull it into your terminal with claude --teleport.' },
		{ t: '12:30', n: 'Extend', h: 'Write one skill, add a PostToolUse hook that formats edited files, connect one MCP server, and create one subagent. Then install a plugin from a marketplace.' },
		{ t: '14:30', n: 'Scale and automate', h: 'Run two sessions in separate worktrees and watch them in agent view. Pipe a log into claude -p, try /loop, and run /install-github-app on a test repo.' },
		{ t: '16:30', n: 'Control and tune', h: 'Write allow and deny rules in .claude/settings.json, enable the sandbox, inspect /context and /usage, and compare effort levels on the same task.' },
		{ t: '18:00', n: 'Teams and SDK', h: 'Skim managed settings and provider setup, then write a short Agent SDK script that loads your CLAUDE.md and adds one custom tool.' }
	];

	/** @type {Record<string, {id:string,b:number,l:string,s:string[],w:string,r:Set<string>,k?:string}>} */
	const C = {};
	[
		['loop', 1, 'Agentic loop', 'how-claude-code-works', 'Claude gathers context, takes an action, checks the result, and repeats until the task is done.'],
		['tools', 1, 'Built-in tools', 'tools-reference', 'Read, Edit, Write, Bash, search, web fetch, Monitor and more. Each tool has its own permission behavior.'],
		['context', 1, 'Context window', 'context-window', 'System prompt, CLAUDE.md, files, and tool output all share one window. /compact summarizes when it fills.'],
		['checkpoint', 1, 'Checkpoints, /rewind', 'checkpointing', 'Edits are checkpointed as Claude works. /rewind restores code, conversation, or both.'],
		['sessions', 1, 'Sessions', 'sessions', 'Conversations persist. Name them, --continue, --resume, branch, export, and move them between surfaces.'],
		['commands', 1, 'Slash commands', 'commands', 'Built-in commands such as /context, /usage, /doctor, /compact, and /init, plus bundled skills.'],
		['claudemd', 1, 'CLAUDE.md', 'memory', 'Markdown instructions loaded at session start, from user, project, and nested directory files. Keep them short and specific.'],
		['automem', 1, 'Auto memory', 'memory', 'Claude records its own learnings as it works and recalls them in later sessions.'],
		['claudedir', 3, '.claude directory', 'claude-directory', 'The .claude/ and ~/.claude/ folders hold settings, skills, subagents, hooks, commands, rules, and memory.'],
		['styles', 3, 'Output styles', 'output-styles', 'Change the system-prompt persona and format, such as explanatory or concise, or write your own.'],
		['largecb', 5, 'Large codebases', 'large-codebases', 'Monorepo patterns: nested CLAUDE.md files, sparse worktrees, code intelligence, and per-package skills.'],
		['skills', 3, 'Skills', 'skills', 'Folders with a SKILL.md and optional scripts. Only the description loads until needed. Invoke with /name or let Claude choose.'],
		['hooks', 3, 'Hooks', 'hooks-guide,hooks', 'Deterministic shell, HTTP, or prompt handlers on events like PreToolUse, PostToolUse, and Stop. They can block actions.'],
		['mcp', 3, 'MCP servers', 'mcp-quickstart,mcp', 'Model Context Protocol servers add external tools and data such as issue trackers, chat, databases, and design docs.'],
		['plugins', 3, 'Plugins', 'discover-plugins,plugins,plugin-marketplaces', 'Shareable bundles of skills, subagents, hooks, and MCP servers, installed from marketplaces and testable with evals.'],
		['artifacts', 4, 'Artifacts', 'artifacts', 'Publish session output as live pages you can keep private, share with your org, or make public.'],
		['cli', 2, 'Terminal CLI', 'cli-reference,interactive-mode', 'The full-featured terminal app: flags, interactive mode, shell commands with !, and history search.'],
		['interface', 2, 'Terminal setup', 'terminal-config,statusline,keybindings', 'Terminal config, fullscreen rendering, vim mode, status line, keybindings, voice dictation, and screen readers.'],
		['ide', 2, 'VS Code, JetBrains', 'vs-code,jetbrains', 'Editor integrations with inline diffs, @-mentions, plan review, and selection context.'],
		['desktop', 2, 'Desktop app', 'desktop-quickstart,desktop', 'Parallel sessions with git isolation, visual diff review, app previews, scheduled tasks, and Dispatch from your phone.'],
		['web', 2, 'Web sessions', 'web-quickstart,claude-code-on-the-web', 'Cloud sessions from the browser with no local setup. Move work with --cloud and --teleport, and auto-fix PRs.'],
		['remote', 2, 'Remote and mobile', 'remote-control,mobile', 'Continue a local session from your phone or any browser, and start or steer tasks from the mobile app.'],
		['computer', 2, 'Chrome, computer use', 'chrome,computer-use', 'Claude in Chrome tests and debugs web apps. Computer use drives native GUI apps from the CLI.'],
		['subagents', 3, 'Subagents', 'sub-agents', 'Specialized agents with their own prompt, tools, and fresh context. They keep the main context clean and can run in the background.'],
		['agentview', 4, 'Agent view', 'agent-view', 'One screen to dispatch and watch many sessions and see which ones need your input.'],
		['teams', 4, 'Agent teams', 'agent-teams', 'Several full sessions coordinating through shared tasks and messages under a lead.'],
		['workflows', 4, 'Dynamic workflows', 'workflows', 'A script Claude writes to orchestrate many subagents, rerunnable for audits, migrations, and research.'],
		['worktrees', 4, 'Git worktrees', 'worktrees', '--worktree isolates each session in its own git worktree so parallel edits never collide.'],
		['messaging', 4, 'Session messaging', 'cross-session-messaging', 'Sessions can list and message each other on this machine, on other machines, or on the web.'],
		['permmodes', 1, 'Permission modes', 'permission-modes,auto-mode-config', 'Default, acceptEdits, plan, and auto mode, where a classifier approves safe actions. Cycle with Shift+Tab.'],
		['permissions', 5, 'Permission rules', 'permissions', 'Allow, ask, and deny rules per tool and argument pattern, for example Bash(npm test:*).'],
		['sandbox', 5, 'Sandboxing', 'sandboxing,sandbox-environments', 'OS-level filesystem and network isolation for Bash, compared with dev containers, Docker, and VMs.'],
		['settings', 5, 'Settings scopes', 'settings,settings-reference', 'settings.json at user, project, local, and managed scopes. Managed settings win over everything else.'],
		['security', 5, 'Security and data', 'security,data-usage', 'Built-in safeguards, prompt-injection defenses, data usage policy, and zero data retention.'],
		['headless', 4, 'Headless (claude -p)', 'headless', 'Run non-interactively: pipe input in, get text or JSON out. The basis for scripts and CI.'],
		['ci', 4, 'GitHub, GitLab CI', 'github-actions,gitlab-ci-cd', 'Respond to @claude in issues and PRs and run tasks in pipelines, including through cloud providers.'],
		['codereview', 4, 'Code review', 'code-review,ultrareview,security-guidance', 'Automated multi-agent PR review, /code-review, cloud ultrareview, and security plugins.'],
		['routines', 4, 'Routines', 'routines,desktop-scheduled-tasks', 'Automations on a schedule, API call, or GitHub event. Cloud routines run while your machine is off.'],
		['schedule', 4, '/loop and /goal', 'scheduled-tasks,goal', '/loop repeats a prompt inside a session. /goal keeps Claude working until a condition holds.'],
		['channels', 4, 'Channels', 'channels,channels-reference', 'Push webhooks, CI results, and chat messages into a running session through an MCP server.'],
		['model', 5, 'Models and effort', 'model-config,fast-mode,advisor', 'Choose the model, effort level, extended context, fast mode, and an advisor model for hard decisions.'],
		['caching', 5, 'Prompt caching', 'prompt-caching', 'Stable prompt prefixes are cached. Switching models or compacting causes a slower uncached turn.'],
		['costs', 5, 'Costs and usage', 'costs', '/usage shows what drives your limits. Control spend with context hygiene, model choice, and team limits.'],
		['debug', 5, 'Debugging config', 'debug-your-config,troubleshooting', '/context, /doctor, /hooks, /mcp, and safe mode show what actually loaded and why.'],
		['sdk', 6, 'SDK basics', 'agent-sdk/overview,agent-sdk/quickstart', 'Claude Code as a Python or TypeScript library, with the same agent loop and tools under your control.'],
		['sdkfeatures', 6, 'Claude Code features', 'agent-sdk/claude-code-features', 'Opt in to CLAUDE.md, skills, hooks, and plugins from the filesystem inside SDK agents.'],
		['sdkext', 6, 'Custom tools and MCP', 'agent-sdk/custom-tools,agent-sdk/mcp,agent-sdk/subagents', 'Define in-process tools, connect MCP servers, use tool search, and declare subagents in code.'],
		['sdkio', 6, 'Sessions, streaming', 'agent-sdk/sessions,agent-sdk/streaming-output,agent-sdk/structured-outputs', 'Resume and fork sessions, stream output, handle approvals, and return validated structured output.'],
		['sdkctrl', 6, 'Control, telemetry', 'agent-sdk/permissions,agent-sdk/hooks,agent-sdk/observability', 'Permission callbacks, hooks as functions, checkpointing, cost tracking, and OpenTelemetry.'],
		['sdkprompt', 6, 'System prompts', 'agent-sdk/modifying-system-prompts', 'Use the claude_code preset, append to it, or replace it with a fully custom system prompt.'],
		['sdkhost', 6, 'Hosting, security', 'agent-sdk/hosting,agent-sdk/secure-deployment', 'Run agents in containers with session persistence, tenant isolation, and credential controls.'],
		['managed', 6, 'Managed settings', 'managed-settings,server-managed-settings,managed-mcp', 'Push enforced settings, permission policy, and MCP allowlists to every machine or from the server.'],
		['providers', 6, 'Providers and auth', 'authentication,third-party-integrations,feature-availability', 'Use Claude plans, Console API keys, Amazon Bedrock, Claude Platform on AWS, Google Cloud, or Microsoft Foundry.'],
		['gateways', 6, 'LLM gateways', 'gateways,llm-gateway', 'Route traffic through Claude apps gateway or your own LLM gateway for SSO, model routing, and spend caps.'],
		['network', 6, 'Network and proxies', 'network-config,devcontainer', 'Proxies, custom certificate authorities, mTLS, corporate launchers, and dev containers.'],
		['cloudenv', 6, 'Cloud environments', 'cloud-environments,self-hosted-environments', 'Set network access and setup scripts for cloud sessions, or run them on your own runners.'],
		['monitoring', 6, 'Monitoring', 'monitoring-usage,analytics', 'OpenTelemetry metrics and events plus an analytics dashboard for adoption and usage.']
	].forEach(([id, b, l, s, w]) => (C[id] = { id, b, l, s: s.split(','), w, r: new Set() }));

	'loop:tools,context,subagents,sdk,permmodes|tools:permissions,sandbox,mcp,hooks,computer|context:claudemd,skills,subagents,caching,costs,debug|checkpoint:sessions,permmodes|sessions:web,remote,worktrees,sdkio,agentview|commands:skills,debug,cli|claudemd:automem,claudedir,largecb,sdkfeatures,styles,skills|claudedir:settings,skills,subagents,hooks|styles:sdkprompt|largecb:worktrees,skills|skills:plugins,sdkfeatures|hooks:permissions,plugins,channels,sdkctrl,schedule|mcp:plugins,channels,managed,sdkext,artifacts|plugins:subagents,codereview|subagents:teams,workflows,sdkext|agentview:teams,worktrees,desktop|teams:messaging|workflows:headless,schedule|messaging:channels|headless:ci,sdk,cli|ci:codereview,providers|codereview:web|routines:web,cloudenv,schedule,desktop|cli:ide,desktop,interface|ide:permmodes|web:remote,cloudenv|computer:desktop|settings:managed,permissions,debug|permissions:permmodes,sandbox,managed,sdkctrl|sandbox:security,network,sdkhost|security:managed|model:caching,costs,providers|costs:monitoring,gateways|managed:providers|providers:gateways|gateways:monitoring,network|network:cloudenv|monitoring:sdkctrl|sdk:sdkfeatures,sdkext,sdkio,sdkctrl,sdkprompt,sdkhost|sdkhost:cloudenv'
		.split('|')
		.forEach((p) => {
			const [a, bs] = p.split(':');
			bs.split(',').forEach((b) => {
				C[a].r.add(b);
				C[b].r.add(a);
			});
		});

	/** @type {Record<number, string[]>} */
	const ORD = {
		1: 'loop,tools,context,permmodes,claudemd,automem,checkpoint,sessions,commands',
		2: 'cli,interface,ide,desktop,web,remote,computer',
		3: 'claudedir,skills,hooks,mcp,plugins,subagents,styles',
		4: 'worktrees,agentview,teams,messaging,workflows,headless,schedule,routines,channels,ci,codereview,artifacts',
		5: 'settings,permissions,sandbox,security,model,caching,costs,debug,largecb',
		6: 'managed,providers,gateways,network,cloudenv,monitoring,sdk,sdkfeatures,sdkext,sdkio,sdkctrl,sdkprompt,sdkhost'
	};
	for (const k in ORD) ORD[k] = String(ORD[k]).split(',');

	/** @type {[string, number, number, string[]][]} */
	const K = [
		['How it works', 0, 0, 'loop,tools,context,checkpoint,sessions,commands'],
		['Instructions and memory', 0, 1, 'claudemd,automem,claudedir,styles,largecb'],
		['Extend Claude', 0, 2, 'skills,hooks,mcp,plugins,artifacts'],
		['Where it runs', 1, 0, 'cli,interface,ide,desktop,web,remote,computer'],
		['Parallel work', 1, 2, 'subagents,agentview,teams,workflows,worktrees,messaging'],
		['Safety and control', 2, 0, 'permmodes,permissions,sandbox,settings,security'],
		['Automate', 2, 2, 'headless,ci,codereview,routines,schedule,channels'],
		['Tune and debug', 3, 0, 'model,caching,costs,debug'],
		['Agent SDK', 3, 1, 'sdk,sdkfeatures,sdkext,sdkio,sdkctrl,sdkprompt,sdkhost'],
		['Teams and enterprise', 3, 2, 'managed,providers,gateways,network,cloudenv,monitoring']
	].map(([t, r, c, ids]) => [t, r, c, String(ids).split(',')]);
	K.forEach(([t, , , ids]) => ids.forEach((id) => (C[id].k = t)));

	const TOTAL = Object.keys(C).length;
	const BLOCKS = [1, 2, 3, 4, 5, 6];

	// Static map geometry
	const CX = [10, 240, 470];
	const RY = [10, 250, 490, 730];
	const O = { x: 340, y: 470 };
	const R = 46;
	/** @type {Record<string, {x:number,y:number}>} */
	const P = {};
	const clusters = K.map(([t, r, c, ids]) => {
		const x = CX[c];
		const y = RY[r];
		const h = 38 + ids.length * 27;
		const pills = ids.map((id, i) => {
			const px = x + 8;
			const py = y + 28 + i * 27;
			P[id] = { x: px + 92, y: py + 11 };
			return { id, px, py };
		});
		let ax, ay;
		if (c === 1) {
			ax = 340;
			ay = r === 0 ? y + h : y;
		} else {
			ax = c === 0 ? 210 : 470;
			ay = r === 0 ? y + h : r === 3 ? y : y + h / 2;
		}
		const dx = ax - O.x;
		const dy = ay - O.y;
		const d = Math.hypot(dx, dy);
		const spoke = { x1: O.x + (dx / d) * R, y1: O.y + (dy / d) * R, x2: ax, y2: ay };
		return { t, x, y, h, pills, spoke };
	});

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

	/** @type {string | null} */
	let sel = null;
	let blk = 0;
	let showAll = false;
	let view = 'map';
	/** @type {Set<string>} */
	let learned = new Set();
	/** @type {HTMLElement} */
	let root;
	/** @type {HTMLElement} */
	let panelEl;

	onMount(() => {
		if (window.matchMedia('(max-width: 640px)').matches) view = 'list';
		try {
			const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
			if (Array.isArray(raw.learned)) learned = new Set(raw.learned.filter((id) => C[id]));
		} catch (e) {
			// Storage unavailable; progress just won't persist
		}
	});

	function save() {
		try {
			localStorage.setItem(KEY, JSON.stringify({ learned: [...learned] }));
		} catch (e) {
			// Ignore
		}
	}

	/** @param {string} id */
	function toggleLearned(id) {
		learned.has(id) ? learned.delete(id) : learned.add(id);
		learned = learned;
		save();
	}

	/** @param {string} id */
	async function select(id) {
		sel = id;
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
	 * @param {Set<string>} learned
	 */
	function stateClass(id, sel, blk, learned) {
		const c = learned.has(id) ? ['learned'] : [];
		if (sel) c.push(id === sel ? 'sel' : C[sel].r.has(id) ? 'rel' : 'dim');
		else if (blk) c.push(ORD[blk].includes(id) ? 'blk' : 'dim');
		return c.join(' ');
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
	$: done = !!cur && learned.has(cur.id);
	$: curOrder = cur ? ORD[cur.b] : [];
	$: curIdx = cur ? curOrder.indexOf(cur.id) : -1;
	$: nextInBlock = blk ? ORD[blk].find((id) => !learned.has(id)) : undefined;
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && sel && (sel = null)} />

<div class="ccmap not-prose" bind:this={root}>
	<nav class="day" aria-label="Study blocks">
		<button class="seg" aria-pressed={blk === 0} on:click={() => selectBlock(0)}>
			<span class="bar"
				><span class="fill" style="width:{(learned.size / TOTAL) * 100}%;background:var(--ink)" /></span
			>
			<span class="tm">All day</span>
			<span class="nm">Whole map</span>
			<span class="cnt">{learned.size} of {TOTAL} learned</span>
		</button>
		{#each BLOCKS as b}
			{@const n = ORD[b].filter((id) => learned.has(id)).length}
			<button class="seg" aria-pressed={blk === b} on:click={() => selectBlock(b)}>
				<span class="bar"
					><span
						class="fill"
						style="width:{Math.round((n / ORD[b].length) * 100)}%;background:var(--b{b})"
					/></span
				>
				<span class="tm">{BL[b].t}</span>
				<span class="nm">{BL[b].n}</span>
				<span class="cnt">{n} of {ORD[b].length} learned</span>
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
				<label class="chk">
					<input type="checkbox" bind:checked={showAll} on:change={() => (sel = null)} />
					Show all cross-links
				</label>
				<span class="legend">The number on each concept is its study block.</span>
			</div>

			{#if view === 'map'}
				<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
				<svg
					class="map"
					viewBox="0 0 680 972"
					role="img"
					aria-label="Concept map of Claude Code with ten topic clusters around a central node"
					on:click={mapClick}
				>
					<g>
						{#each clusters as cl}
							<line
								class="spoke"
								x1={cl.spoke.x1}
								y1={cl.spoke.y1}
								x2={cl.spoke.x2}
								y2={cl.spoke.y2}
							/>
						{/each}
						<circle class="hub" cx={O.x} cy={O.y} r={R} />
						<text class="hubt" x={O.x} y={O.y - 8} text-anchor="middle">Claude Code</text>
						<text class="hubs" x={O.x} y={O.y + 11} text-anchor="middle">one-day map</text>
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
							<text class="ct" x={cl.x + 12} y={cl.y + 16}>{cl.t}</text>
							{#each cl.pills as p (p.id)}
								<g
									class="pill {stateClass(p.id, sel, blk, learned)}"
									tabindex="0"
									role="button"
									aria-label="{C[p.id].l}, block {C[p.id].b}"
									on:click={() => select(p.id)}
									on:keydown={(e) => pillKey(e, p.id)}
								>
									<rect class="pr" x={p.px} y={p.py} width="184" height="22" rx="6" />
									<circle class="d{C[p.id].b}" cx={p.px + 10} cy={p.py + 11} r="4" />
									<text class="pl" x={p.px + 20} y={p.py + 11}>{C[p.id].l}</text>
									<text class="pb" x={p.px + 180} y={p.py + 11} text-anchor="end"
										>{learned.has(p.id) ? '✓' : C[p.id].b}</text
									>
								</g>
							{/each}
						{/each}
					</g>
				</svg>
			{:else}
				<div class="list">
					{#each K as [t, , , ids]}
						<section>
							<h3>{t}</h3>
							<div class="lg">
								{#each ids as id}
									<button class="lp {stateClass(id, sel, blk, learned)}" on:click={() => select(id)}>
										<span class="dot" style="background:var(--b{C[id].b})" />
										<span class="lb">{C[id].l}</span>
										<span class="bd">{learned.has(id) ? '✓' : C[id].b}</span>
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
				<div class="tag"><i style="background:var(--b{cur.b})" />Block {cur.b}, {BL[cur.b].t} {BL[cur.b].n}</div>
				<h2>{cur.l}</h2>
				<p class="muted" style="margin:4px 0 0">{cur.k}</p>
				<p>{cur.w}</p>
				<div class="row">
					<button class="btn" class:pri={!done} aria-pressed={done} on:click={() => toggleLearned(cur.id)}>
						{done ? 'Learned ✓' : 'Mark as learned'}
					</button>
					{#if curIdx < curOrder.length - 1}
						<button class="btn" on:click={() => select(curOrder[curIdx + 1])}>
							Next: {C[curOrder[curIdx + 1]].l}
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
					<button class="btn sm" on:click={() => selectBlock(cur.b)}>Back to block {cur.b}</button>
				</div>
			{:else if blk}
				<div class="tag"><i style="background:var(--b{blk})" />Block {blk}, {BL[blk].t} {BL[blk].n}</div>
				<h2>{BL[blk].n}</h2>
				<div class="sub">Hands-on</div>
				<p style="margin:0">{BL[blk].h}</p>
				<div class="row">
					<button class="btn pri" on:click={() => select(nextInBlock || ORD[blk][0])}>
						{nextInBlock
							? nextInBlock === ORD[blk][0]
								? 'Start this block'
								: 'Continue with ' + C[nextInBlock].l
							: 'Review this block'}
					</button>
				</div>
				<div class="sub">Study in this order</div>
				<ol class="ol">
					{#each ORD[blk] as id, k}
						<li>
							<span class="n">{k + 1}</span>
							<button class="linkish" on:click={() => select(id)}>{C[id].l}</button>
							{#if learned.has(id)}<span class="ok">✓ learned</span>{/if}
						</li>
					{/each}
				</ol>
			{:else}
				<h2>Plan your day</h2>
				<p>
					Each block pairs a set of concepts with a hands-on exercise. Click a concept on the map to
					see what it connects to, or start with block 1. Your progress stays in this browser.
				</p>
				<ol class="ol agenda" style="margin-top:14px">
					{#each BLOCKS as b}
						<li>
							<span class="tm">{BL[b].t}</span>
							<button class="linkish" on:click={() => selectBlock(b)}>
								<span class="agdot" style="background:var(--b{b})" />{BL[b].n}
							</button>
							<span class="muted">{ORD[b].filter((id) => learned.has(id)).length}/{ORD[b].length}</span>
						</li>
					{/each}
				</ol>
				<div class="row">
					<button class="btn pri" on:click={() => selectBlock(1)}>Start block 1</button>
					{#if learned.size}
						<button
							class="btn"
							on:click={() => {
								learned = new Set();
								save();
							}}>Reset progress</button
						>
					{/if}
				</div>
			{/if}
		</aside>
	</div>

	<p class="foot">
		Built from the Claude Code documentation at
		<a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noopener"
			>code.claude.com/docs</a
		>. Features change weekly, so check exact flags and settings on the linked pages.
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
	.chk {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 14px;
		color: var(--ink2);
		cursor: pointer;
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
</style>
