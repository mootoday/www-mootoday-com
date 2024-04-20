import adapter from '@sveltejs/adapter-cloudflare';
import { mdsvex } from 'mdsvex';
import rehypePicture from 'rehype-picture';
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeToc from 'rehype-toc'
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex({
			extensions: ['.md'],
			rehypePlugins: [
				rehypeSlug,
				[rehypeAutolinkHeadings, {
					behavior: "wrap",
				}],
				[rehypeToc, {
					cssClasses: {
						list: "space-y-2",
						listItem: "my-2",
					},
				}],
				[
					rehypePicture,
					{
						jpg: { webp: 'image/webp', jp2: 'image/jp2' }
					}
				]
			]
		}),
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter()
	}
};

export default config;
