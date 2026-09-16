import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import {
	changelog,
	finalize,
	parseDocSlugs,
	uncoveredDocs,
	validate,
	warnings
} from '../../src/lib/claude-study/study-map.ts';
import type { StudyMap, StudyMapDraft } from '../../src/lib/claude-study/types.ts';

const ROOT = new URL('../../', import.meta.url);
const MAP_PATH = new URL('src/content/blog/learn-claude-code/study-map.json', ROOT);
const OUT_DIR = new URL('.claude-study/', ROOT);
const LLMS_URL = 'https://code.claude.com/docs/llms.txt';
const CLAUDE_TIMEOUT_MS = 15 * 60_000;
const FETCH_TIMEOUT_MS = 30_000;
const USAGE = 'Usage: npm run study:generate -- [--dry-run] [--force]';

const argv = process.argv.slice(2);
const unknownArgs = argv.filter((a) => a !== '--dry-run' && a !== '--force');
if (unknownArgs.length) {
	console.error(`Unknown argument(s): ${unknownArgs.join(' ')}`);
	console.error(USAGE);
	process.exit(1);
}
const dryRun = argv.includes('--dry-run');
const force = argv.includes('--force');

async function writeOut(name: string, content: string) {
	await mkdir(OUT_DIR, { recursive: true });
	await writeFile(new URL(name, OUT_DIR), content);
}

/** Parses claude's JSON result: the whole output, or else the last line that looks like a JSON object. */
function parseResult(out: string): Record<string, unknown> {
	try {
		return JSON.parse(out.trim());
	} catch (e) {
		const line = out
			.split('\n')
			.map((l) => l.trim())
			.filter((l) => l.startsWith('{'))
			.at(-1);
		if (!line) throw e;
		return JSON.parse(line);
	}
}

type ClaudeResult = {
	structured_output: unknown;
	permission_denials?: { tool_name?: string; tool_input?: { url?: string } }[];
};

function runClaude(input: string, systemPrompt: string, schema: string): Promise<ClaudeResult> {
	return new Promise((resolve, reject) => {
		const started = Date.now();
		const child = spawn(
			'claude',
			[
				'-p',
				'--safe-mode',
				'--restricted',
				'--no-session-persistence',
				'--output-format',
				'json',
				'--json-schema',
				schema,
				'--append-system-prompt',
				systemPrompt,
				'--tools',
				'WebFetch',
				'--allowedTools',
				'WebFetch(domain:code.claude.com)',
				'--permission-mode',
				'dontAsk'
			],
			{ stdio: ['pipe', 'pipe', 'inherit'], timeout: CLAUDE_TIMEOUT_MS, killSignal: 'SIGTERM' }
		);
		let out = '';
		let settled = false;
		let stdinError: string | undefined;
		const fail = async (message: string) => {
			if (settled) return;
			settled = true;
			try {
				await writeOut('last-raw.txt', out);
				message += '\nRaw output saved to .claude-study/last-raw.txt';
			} catch {
				// Keep the original error.
			}
			reject(new Error(message));
		};

		child.stdout.on('data', (chunk) => (out += chunk));
		// Let the close handler report it: claude's own exit status usually explains a broken pipe.
		child.stdin.on('error', (e) => (stdinError = e.message));
		child.on('error', (e) => fail(`Could not run claude: ${e.message}`));
		child.on('close', (code, signal) => {
			const elapsed = Date.now() - started;
			console.error(`claude finished after ${Math.round(elapsed / 1000)}s`);
			let res: Record<string, unknown> | undefined;
			let parseError: string | undefined;
			try {
				res = parseResult(out);
			} catch (e) {
				parseError = (e as Error).message;
			}
			if (code !== 0 || signal || !res || res.is_error || !res.structured_output) {
				const details = [
					`code ${code}`,
					`signal ${signal ?? 'none'}${elapsed >= CLAUDE_TIMEOUT_MS ? ' (timed out)' : ''}`,
					`subtype ${res?.subtype ?? 'unknown'}`
				].join(', ');
				const result = String(res?.result ?? '').slice(0, 500);
				const reason = parseError
					? `could not parse claude output: ${parseError}`
					: 'claude returned no structured output';
				const stdin = stdinError ? `\nstdin error: ${stdinError}` : '';
				return void fail(`${reason} (${details})${result ? `: ${result}` : ''}${stdin}`);
			}
			settled = true;
			resolve(res as ClaudeResult);
		});
		child.stdin.end(input);
	});
}

async function fetchText(url: string): Promise<string> {
	const res = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
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

	const missing = prev.concepts.filter((c) => !docSlugs.has(c.docs[0])).length;
	if (docSlugs.size < 50 || missing > prev.concepts.length / 2) {
		throw new Error(
			`The docs index looks wrong: ${docSlugs.size} doc pages found, ${missing} of ${prev.concepts.length} current main doc pages missing. Check ${LLMS_URL}.`
		);
	}

	console.error(
		`Generating from ${docSlugs.size} doc pages and ${prev.concepts.length} current concepts…`
	);
	const uncovered = uncoveredDocs(prev, docSlugs);
	console.error(`${uncovered.length} doc pages not linked by any current concept.`);
	const input = [
		'<docs_index>',
		llmsTxt,
		'</docs_index>',
		'',
		'<current_study_map>',
		prevRaw,
		'</current_study_map>',
		'',
		'<uncovered_doc_pages>',
		...uncovered,
		'</uncovered_doc_pages>'
	].join('\n');
	const res = await runClaude(input, prompt, JSON.stringify(JSON.parse(schema)));
	const denials = res.permission_denials ?? [];
	console.error(`Permission denials: ${denials.length}`);
	for (const d of denials)
		console.error(
			`  - ${d.tool_name ?? 'unknown tool'}${d.tool_input?.url ? ` ${d.tool_input.url}` : ''}`
		);
	const draft = res.structured_output as StudyMapDraft;

	const errors = validate(draft, prev, docSlugs, { force });
	if (errors.length) {
		await writeOut('last-failed.json', JSON.stringify(draft, null, '\t') + '\n');
		console.error(`Validation failed (${errors.length}):`);
		for (const e of errors) console.error(`  - ${e}`);
		console.error('Raw output saved to .claude-study/last-failed.json');
		process.exit(1);
	}

	const next = finalize(draft, prev, new Date());
	for (const w of warnings(next, prev)) console.error(`Warning: ${w}`);
	const json = JSON.stringify(next, null, '\t') + '\n';
	if (dryRun) {
		await writeOut('dry-run.json', json);
		console.error(
			'Dry run: study-map.json not written. Output saved to .claude-study/dry-run.json'
		);
	} else {
		await writeFile(MAP_PATH, json);
	}
	const reasons = Object.fromEntries(draft.revChanges.map((r) => [r.id, r.reason]));
	console.log(changelog(prev, next, reasons));
}

main().catch((e) => {
	console.error(e instanceof Error ? e.message : e);
	if (e instanceof Error && e.cause) console.error('Cause:', e.cause);
	process.exit(1);
});
