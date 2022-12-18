import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, data }) => {
	const { slug } = params;
	const post = await import(`../../../content/blog/${slug}/index.md`);
	const { default: page, metadata } = post;

	if (!page) {
		return {
			status: 404,
		};
	}

	return {
		metadata: {
			slug,
			...metadata,
			// videoMetadata: {
			// 	...data.videoMetadata,
			// }
		},
		page,
	};
}