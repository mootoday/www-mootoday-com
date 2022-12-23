import type { PageLoad } from './$types';

import { getPosts } from "$lib/server/posts";

export const load: PageLoad = async () => {
	const posts = await getPosts();
	return { postsTotal: posts.length, posts: posts.filter(post => post.featured) };
};