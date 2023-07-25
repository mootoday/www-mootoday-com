import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	try {
		const entry = await locals.D1.prepare(`SELECT * FROM entries WHERE id = ?1`)
			.bind(params.entry)
			.first();
		const { results: replies } = await locals.D1.prepare(
			`SELECT * FROM replies WHERE entryId = ?1 ORDER BY id DESC`
		)
			.bind(params.entry)
			.all();
		return {
			entry,
			replies
		};
	} catch (error) {
		console.error(error);
	}
	return {
		entry: {},
		replies: []
	};
}) satisfies PageServerLoad;
