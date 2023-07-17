import type { PageServerLoad } from './$types';

export const load = (async ({platform}) => {
    console.log(platform);
    console.log(platform?.env);
    console.log(JSON.stringify(platform?.env.D1));
    const entries = await platform?.env.D1.prepare(`SELECT * FROM entries`).run();
    console.log({entries});
    return {
        entries
    };
}) satisfies PageServerLoad;