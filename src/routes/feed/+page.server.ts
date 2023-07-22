import type { PageServerLoad } from './$types';

import { fail, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { FEED_AUTHORIZATION } from '$env/static/private';

export const load = (async ({ locals }) => {
	try {
		const { results: entries } = await locals.D1.prepare(
			`SELECT * FROM entries ORDER BY id DESC`
		).all();
		const { results: replies } = await locals.D1.prepare(`SELECT * FROM replies`).all();
		return {
			entries,
			replies
		};
	} catch (error) {
		console.error(error);
	}
	return {
		entries: [],
		replies: []
	};
}) satisfies PageServerLoad;

export const actions = {
	addEntry: async ({ locals, request }) => {
		const data = await request.formData();
		const content = await data.get('content');
		const authorization = await data.get('authorization');

		if (!dev && authorization !== FEED_AUTHORIZATION) {
			return fail(400, { content, unauthorized: true });
		}

		try {
			const result = await locals.D1.prepare(`INSERT INTO entries (id, content) VALUES (?1, ?2)`)
				.bind(`${new Date().getTime()}`, content)
				.run();
			console.log({ result });
		} catch (error) {
			console.error(error);
		}
	},
	addReply: async ({ locals, request }) => {
		const data = await request.formData();
		const entryId = await data.get('entry');
		const content = await data.get('content');

		if (content?.length > 300) {
			return fail(400, { content, tooLong: true });
		}

		try {
			const result = await locals.D1.prepare(
				`INSERT INTO replies (id, entryId, content) VALUES (?1, ?2, ?3)`
			)
				.bind(`${new Date().getTime()}`, entryId, content)
				.run();
			console.log({ result });
			throw redirect(303, `/feed/${entryId}`);
		} catch (error) {
			console.error(error);
		}
	}
} satisfies Actions;
