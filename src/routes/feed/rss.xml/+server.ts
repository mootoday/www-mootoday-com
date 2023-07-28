import type { RequestHandler } from '@sveltejs/kit';

import RSS from 'rss';

export const GET: RequestHandler = async ({ locals }) => {
	const feed = new RSS({
		title: 'www.mikenikles.com - Short-form content',
		site_url: 'https://www.mikenikles.com/feed',
		feed_url: 'https://www.mikenikles.com/feed/rss.xml'
	});

	const { results: entries } = await locals.D1.prepare(
		`SELECT * FROM entries ORDER BY id DESC`
	).all();

	entries.forEach((entry) => {
		feed.item({
			title: entry.content,
			url: `https://www.mikenikles.com/feed/${entry.id}`,
			date: new Date(+entry.id).toISOString(),
			description: entry.content
		});
	});

	return new Response(feed.xml({ indent: true }), {
		headers: {
			'Cache-Control': `max-age=0, s-maxage=${60 * 10}`,
			'Content-Type': 'application/rss+xml'
		}
	});
};
