import posts from "./_posts.js";

const category = posts
		.map(post => post.metadata.category)
		.filter(category => !!category)

export default Array.from(new Set(category))