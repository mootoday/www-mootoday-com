<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`events.json`)
				.then(r => r.json());
	}
</script>

<script>
	export let events

	console.log(events)

	const getCover = (post) => {
		return `blog-posts/${
				post.metadata.createdAt.split("T")[0]
		}-${post.metadata.slug}/cover-preview.jpg`
	}
</script>


<div style="padding-top: 60px;">
	<h1>events</h1>
</div>
{#each events as e}
	{e.metadata.title}
{/each}
