import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { createD1 } from 'cf-workers-proxy';

const handleCurl = (async ({ event, resolve }) => {
	if (event.url.pathname === "/" && event.request.headers.get("user-agent")?.startsWith("curl")) {
		const shellScript = import.meta.glob("../static/mootoday.sh", { as: "raw" });
		const shellScriptContent = await shellScript["../static/mootoday.sh"]();
		return new Response(shellScriptContent, {
			status: 200,
		});
	}
	return await resolve(event);
}) satisfies Handle;

const handleCloudflareD1 = (async ({ event, resolve }) => {
	event.locals.D1 = event.platform?.env?.D1 ?? createD1('D1');
	return await resolve(event);
}) satisfies Handle;

export const handle = sequence(handleCurl, handleCloudflareD1);
