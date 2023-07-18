import type { PageServerLoad } from './$types';

export const load = (async ({locals, params}) => {
    try {
        const entry = await locals.D1.prepare(`SELECT * FROM entries WHERE id = ?1`).bind(params.entry).first();
        return {
            entry
        };
    } catch (error) {
        console.error(error)
    }
    return {
        entry: [],
    };
}) satisfies PageServerLoad;