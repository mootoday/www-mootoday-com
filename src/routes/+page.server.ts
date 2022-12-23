import type { PageLoad } from './$types';

import { posts } from "$lib/server/posts";

export const load: PageLoad = async () => {
	return { postsTotal: posts.length, posts: posts.filter(post => post.featured) };
};