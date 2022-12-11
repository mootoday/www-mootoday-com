// Credit: https://github.com/rodneylab/sveltekit-blog-mdx/blob/main/src/routes/%5Bslug%5D/%2Bpage.js

/** @type {import('./$types').PageLoad} */
export async function load({ params, url }) {
	const { slug } = params;
	const { pathname } = url;

	const postPromise = import(`../../../content/blog/${slug}/index.md`);
	// const imageDataPromise = import(`../../../lib/generated/posts/${pathname.slice(pathname.lastIndexOf("/") + 1)}.js`);
	const pagePromise = import(`../../../content/blog/${slug}/index.md`);

	const [postResult/*, imageDataResult*/, pageResult] = await Promise.all([
		postPromise,
		// imageDataPromise,
		pagePromise,
	]);

	const { default: body, metadata } = postResult;
	// const { default: imageData } = imageDataResult;
	const { default: page } = pageResult;

	if (!body) {
		return {
			status: 404,
		};
	}

	const {
		createdAt: datePublished,
		featuredImage,
		featuredImageAlt,
		ogImage,
		ogSquareImage,
		title: postTitle,
		summary: seoMetaDescription,
		twitterImage,
	} = metadata;

	return {
		post: {
			datePublished,
			featuredImage,
			featuredImageAlt,
			ogImage,
			ogSquareImage,
			postTitle,
			seoMetaDescription,
			twitterImage,
			slug,
			body,
		},
		slug,
		// imageData,
		page,
	};
}