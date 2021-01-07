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
	import {categories} from '../../../taxonomy'
	import Preview from '../../../components/blog-post/previews/index.svelte'
	const { preloading, page, session } = stores();

	$: type = $page.params.type
	$: slug = $page.params.slug
	$: is_category = type === 'category'
	$: category = is_category ? categories.find(cat => cat.slug === slug) : null
</script>

<div class="container">
	<div class="mb-8">
		<h1 class="text-xl">{type}: <b>{slug}</b></h1>
		{#if is_category}
			<p class="text-gray-700">{category.description}</p>
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

