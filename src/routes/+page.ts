import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const mdModules = import.meta.glob('../content/blog/**/index.md');
	const posts = (await Promise.all(
		Object.keys(mdModules)
				.map(async (path) => {
				const slug = path.split('/').at(-2);
				const { metadata } = await mdModules[path]();
				const { createdAt: datePublished, lastUpdated, title: postTitle, summary: seoMetaDescription } = metadata;
				return { datePublished, lastUpdated, postTitle, seoMetaDescription, slug };
			})
	))
	.sort((a, b) => Date.parse(b.datePublished) - Date.parse(a.datePublished));
	return { posts };
};