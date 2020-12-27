import posts from "./_posts.js";

export default posts.filter(p => {
	return !p.metadata.type || p.metadata.type === 'article'
})