import type { PageServerLoad } from './$types';

export const load = (async ({platform}) => {
    const entries = platform?.env.MIKENIKLES_COM_FEED.list() || [];
    console.log({entries});
    return {
        entries
    };
}) satisfies PageServerLoad;