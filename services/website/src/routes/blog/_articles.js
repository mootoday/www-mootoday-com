import posts from "./_posts.js";
import {categories, authors} from "../../taxonomy";

const joinCategory = post => {
	if (post.metadata.category) {
		post.metadata.category = post.metadata.category.map(slug => {
			return categories.find(cat => cat.slug === slug) || {}
		})
	}
}

const joinAuthor = post => {
	if (post.metadata.author) {
		post.metadata.author = authors.find(author => author.slug === post.metadata.author) || {}
	}
}

posts.forEach(p => joinCategory(p))
posts.forEach(p => joinAuthor(p))

export default posts.filter(p => {
	return !p.metadata.type || p.metadata.type === 'article'
})