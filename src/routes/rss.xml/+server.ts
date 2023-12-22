import type { RequestHandler } from '@sveltejs/kit';

import RSS from 'rss';
import { getPosts } from '$lib/server/posts';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const feed = new RSS({
		title: 'www.mootoday.com - RSS Feed',
		site_url: 'https://www.mootoday.com/',
		feed_url: 'https://www.mootoday.com/rss.xml'
	});

	const posts = await getPosts();
	posts.forEach((posts) => {
		feed.item({
			title: posts.title,
			url: `https://www.mootoday.com/blog/${posts.slug}`,
			date: posts.createdAt,
			description: posts.summary
		});
	});

	return new Response(feed.xml({ indent: true }), {
		headers: {
			'Cache-Control': `max-age=0, s-maxage=${60 * 10}`,
			'Content-Type': 'application/rss+xml'
		}
	});
};
