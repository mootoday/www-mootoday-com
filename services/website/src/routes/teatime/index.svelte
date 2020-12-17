<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`)
				.then(r => r.json());
	}
</script>

<script>
	export let posts
</script>
displaying posts for xx

{#each posts as p}
	{p.metadata.title}
{/each}

