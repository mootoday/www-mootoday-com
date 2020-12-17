import posts from "../_posts.js";

export const get = (req, res) => {
	const { slug } = req.params;
	const filtered_post = posts.filter(p => {
		return p.metadata.tags.indexOf(slug) > -1
	})
	if (filtered_post.length) {
		res.writeHead(200, {
			"Content-Type": "application/json",
		});

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