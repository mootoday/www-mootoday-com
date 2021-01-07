import posts from "../_posts.js";

const types = ['tags', 'author', 'category', 'archive']

export const get = (req, res) => {
	const { slug, type } = req.params;
	console.log(slug, type)

	if (!types.includes(type)) {
		res.writeHead(404, {
			"Content-Type": "application/json",
		});

		res.end(
				JSON.stringify({
					message: `Type is not found`,
				})
		);
	}

	const filtered_post = posts.filter(p => {
		const target_meta = p.metadata[type]
		if (!target_meta) return false
		if (type === 'tags') {
			return target_meta.indexOf(slug) > -1
		} else if (type === 'author') {
			return target_meta.slug === slug
		} else if (type === 'category') {
			return target_meta.some(cat => cat.slug === slug)
		}
	})
	if (filtered_post.length) {

		const result = {posts: filtered_post}

		res.end(JSON.stringify(result));
	} else {
		res.writeHead(404, {
			"Content-Type": "application/json",
		});

		res.end(
				JSON.stringify({
					message: `Not found`,
				})
		);
	}
}