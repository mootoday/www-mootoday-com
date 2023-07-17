import type { PageServerLoad } from './$types';

export const load = (async ({platform}) => {
    console.log(platform);
    console.log(platform?.env);
    console.log(JSON.stringify(platform?.env.D1));
    try {
        const entries = await platform?.env.D1.prepare(`SELECT * FROM entries`).run();
        return {
            entries
        };
    } catch (error) {
        console.error({
            message: error.message,
            cause: error.cause.message,
        });
    }
    return {
        entries: [],
    };
}) satisfies PageServerLoad;