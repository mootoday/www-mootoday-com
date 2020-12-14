import posts from "./_posts.js";

const tags = posts
		.map(post => post.metadata.tags)
		.reduce((a,c) => [...a, ...c], [])

export default Array.from(new Set(tags))