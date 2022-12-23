const mdModules = import.meta.glob('../../content/blog/**/index.md');
export const getPosts = async () => (
	await Promise.all(
		Object.keys(mdModules).map(async (path) => {
			const slug = path.split('/').at(-2);
			const { metadata } = await mdModules[path]();
			return { slug, ...metadata };
		})
	)
).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
