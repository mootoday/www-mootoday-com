import type { PageServerLoad } from './$types';

import { fail } from '@sveltejs/kit';
import { FEED_AUTHORIZATION } from '$env/static/private';

export const load = (async ({locals}) => {
    try {
        const {results: entries} = await locals.D1.prepare(`SELECT * FROM entries ORDER BY id DESC`).all();
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

export const actions = {
    default: async ({locals, request}) => {
        const data = await request.formData();
        const content = await data.get("content");
        const authorization = await data.get("authorization");
        
        if (authorization !== FEED_AUTHORIZATION) {
            return fail(400, { content, unauthorized: true })
        }

        try {
            const result = await locals.D1.prepare(`INSERT INTO entries (id, content) VALUES (?1, ?2)`).bind(`${new Date().getTime()}`, content).run();
            console.log({result});
        } catch (error) {
            console.error(error);
        }
    }
} satisfies Actions;