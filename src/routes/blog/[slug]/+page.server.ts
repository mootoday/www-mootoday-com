// Credit: https://github.com/rodneylab/sveltekit-blog-mdx/blob/main/src/routes/%5Bslug%5D/%2Bpage.js
import type { PageServerLoad } from './$types';

import muxBlurHash from '@mux/blurhash';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	const post = await import(`../../../content/blog/${slug}/index.md`);
	const { metadata } = post;

	let videoMetadata = {};
	if (metadata.videoPlaybackIds) {
		const muxBlurHashPromises = metadata.videoPlaybackIds.map((playbackId: string) =>
			muxBlurHash(playbackId)
		);
		const muxBlurHashResults = await Promise.all(muxBlurHashPromises);
		videoMetadata = muxBlurHashResults.reduce((result, muxBlurHashResult, index) => {
			result[metadata.videoPlaybackIds[index]] = muxBlurHashResult;
			return result;
		}, {});
	}

	return {
		videoMetadata
	};
};
