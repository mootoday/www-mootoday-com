import type { PageServerLoad } from './$types';

export const load = (async ({locals}) => {
    try {
        const {results: entries} = await locals.D1.prepare(`SELECT * FROM entries`).all();
        return {
            entries
        };
    } catch (error) {
        console.error(error)
    }
    return {
        entries: [],
    };
}) satisfies PageServerLoad;