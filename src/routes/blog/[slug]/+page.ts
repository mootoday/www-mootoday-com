import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const MOVED: Record<string, string> = {
	'learn-claude-code-in-a-day': 'learn-claude-code'
};

export const load: PageLoad = async ({ params, data }) => {
	const { slug } = params;
	if (Object.hasOwn(MOVED, slug)) throw redirect(301, `/blog/${MOVED[slug]}`);

	const post = await import(`../../../content/blog/${slug}/index.md`);
	const { default: page, metadata } = post;

	if (!page) {
		return {
			status: 404
		};
	}

	return {
		metadata: {
			slug,
			...metadata
			// videoMetadata: {
			// 	...data.videoMetadata,
			// }
		},
		page
	};
};
