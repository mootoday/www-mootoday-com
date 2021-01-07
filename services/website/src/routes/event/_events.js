import {event_categories} from "../../taxonomy";
import getAllPosts from '../../helpers/get-all-post'

const events = getAllPosts.getAllPosts('./src/event-posts');

const joinCategory = post => {
	if (post.metadata.category) {
		post.metadata.category = post.metadata.category.map(slug => {
			return event_categories.find(cat => cat.slug === slug) || {}
		})
	}
}

events.forEach(e => joinCategory(e))

export default events
