import posts from "./_posts.js";

const category = posts
		.map(post => post.metadata.category)
		.filter(category => !!category)
		.reduce((a,c) => [...a, ...c], [])

export default Array.from(new Set(category))