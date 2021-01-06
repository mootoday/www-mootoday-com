<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog/${params.type}/${params.slug}.json`)
				.then(async r => {
					const res = await r.json()
					return res
				});
	}
</script>

<script>
	export let posts

	import { stores } from '@sapper/app';
	import Preview from '../../../components/blog-post/previews/index.svelte'
	const { preloading, page, session } = stores();

	$: is_category = $page.params.type === 'category'
</script>

<div class="container">
	<div class="mb-8">
		<h1 class="text-xl">{$page.params.type}: <b>{$page.params.slug}</b></h1>
		{#if is_category}
			<p class="text-gray-700">談藝術，談創作，回顧周圍看向前望。Art reviews and art criticism. Review on reviews. Critique on the practice of criticism. Back story to a performance. Free associations with a novel. Observations on the current milieu of art and social life. …</p>
		{/if}
	</div>

	{#if posts && posts.length}
		{#each posts as post}
			<Preview {post}/>
		{/each}
	{:else}
		not found
	{/if}
</div>

