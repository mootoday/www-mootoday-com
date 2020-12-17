<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog/tag/${params.slug}.json`)
				.then(async r => {
					const res = await r.json()
					return res
				});
	}
</script>

<script>
	export let posts

	import { stores } from '@sapper/app';
	const { preloading, page, session } = stores();
</script>
<h1>tagged: <b>{$page.params.slug}</b></h1>
{#if posts && posts.length}
{#each posts as p}
	{p.metadata.title}
{/each}
{:else}
	not found
{/if}

