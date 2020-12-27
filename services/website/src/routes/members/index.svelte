<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`members.json`)
				.then(r => r.json());
	}
</script>

<script>
	export let members

	const getCover = (post) => {
		return `blog-posts/${
				post.metadata.createdAt.split("T")[0]
		}-${post.metadata.slug}/cover-preview.jpg`
	}
</script>


<div style="padding-top: 60px;">
	<h1>members</h1>
</div>
{#each members as member}
	{member.metadata.title}
{/each}
