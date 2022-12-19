// See https://twitter.com/mikenikles/status/1604518015944753152


// import type { PageServerLoad } from './$types';

// import muxBlurHash from '@mux/blurhash';

// export const load_NOT_USED: PageServerLoad = async ({ params }) => {
// 	const { slug } = params;
// 	const post = await import(`../../../content/blog/${slug}/index.md`);
// 	const { metadata } = post;

// 	let videoMetadata = {};
// 	if (metadata.videoPlaybackIds) {
// 		const muxBlurHashPromises = metadata.videoPlaybackIds.map((playbackId: string) =>
// 			muxBlurHash(playbackId)
// 		);
// 		const muxBlurHashResults = await Promise.all(muxBlurHashPromises);
// 		videoMetadata = muxBlurHashResults.reduce((result, muxBlurHashResult, index) => {
// 			result[metadata.videoPlaybackIds[index]] = muxBlurHashResult;
// 			return result;
// 		}, {});
// 	}

// 	return {
// 		videoMetadata
// 	};
// };
