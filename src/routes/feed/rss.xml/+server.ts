import type { RequestHandler } from '@sveltejs/kit';

const formatDateToRFC822 = (date: Date): string => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const pad = (num: number) => (num < 10 ? '0' : '') + num;

  return `${days[date.getUTCDay()]}, ${pad(date.getUTCDate())} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())} GMT`;
};

const createItem = (entry) => `<item>
<title><![CDATA[${entry.content}]]></title>
<description><![CDATA[${entry.content}]]></description>
<link>https://www.mootoday.com/feed/${entry.id}</link>
<guid isPermaLink="true">https://www.mootoday.com/feed/${entry.id}</guid>
<pubDate>${formatDateToRFC822(new Date(+entry.id))}</pubDate>
</item>`;

export const GET: RequestHandler = async ({ locals }) => {
	const { results: entries } = await locals.D1.prepare(
		`SELECT * FROM entries ORDER BY id DESC`
	).all();

	const rss = `<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
	<channel>
			<title><![CDATA[www.mootoday.com - Short-form content]]></title>
			<description><![CDATA[www.mootoday.com - Short-form content]]></description>
			<link>https://www.mootoday.com/feed</link>
			<lastBuildDate>${formatDateToRFC822(new Date())}</lastBuildDate>
			<atom:link href="https://www.mootoday.com/feed/rss.xml" rel="self" type="application/rss+xml"/>
			${entries.map(createItem).join("")}
	</channel>
</rss>`;

	return new Response(rss, {
		headers: {
			'Cache-Control': `max-age=0, s-maxage=${60 * 10}`,
			'Content-Type': 'application/rss+xml'
		}
	});
};
