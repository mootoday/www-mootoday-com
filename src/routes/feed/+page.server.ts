import type { PageServerLoad } from './$types';

export const load = (async ({platform}) => {
    console.log(platform);
    console.log(platform?.env);
    console.log(platform?.env.MIKENIKLES_COM_FEED);
    const entries = platform?.env.MIKENIKLES_COM_FEED.list() || [];
    console.log({entries});
    return {
        entries
    };
}) satisfies PageServerLoad;