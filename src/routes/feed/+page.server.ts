import type { PageServerLoad } from './$types';

export const load = (async ({platform}) => {
    console.log(platform);
    console.log(platform?.env);
    console.log(JSON.stringify(platform?.env.D1));
    const entries = [] // platform?.env.D1.list() || [];
    console.log({entries});
    return {
        entries
    };
}) satisfies PageServerLoad;