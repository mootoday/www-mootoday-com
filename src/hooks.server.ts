import type { Handle } from '@sveltejs/kit';
import { createD1 } from 'cf-workers-proxy';

export const handle = (async ({ event, resolve }) => {
	console.log("KKKKK", event.platform?.env);
	event.locals.D1 = event.platform?.env?.D1 ?? createD1('D1');
	return await resolve(event);
}) satisfies Handle;
