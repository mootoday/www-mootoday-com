import type { PageLoad } from './$types';

const topArticleSlugs = [
	'dev-environments-in-the-cloud-are-a-half-baked-solution',
	'svelte-kit-prisma-a-match-made-in-digital-heaven',
	'why-i-moved-from-react-to-svelte-and-why-others-will-follow'
];

export const load: PageLoad = async () => {
	const topModules = topArticleSlugs.map((slug) => import(`../content/blog/${slug}/index.md`));
	const result = await Promise.all(topModules);
	const posts = result
		.map((page, index) => ({
			slug: topArticleSlugs[index],
			...page.metadata
		}))
		.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
	return { postsTotal: posts.length, posts: posts.slice(0, 3) };
};
