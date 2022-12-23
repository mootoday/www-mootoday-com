import type { PageLoad } from './$types';

import { posts } from "$lib/server/posts";

export const load: PageLoad = async () => {
	return { posts };
};