<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
</script>

<script>
  export let posts;
</script>

{#each Object.entries(posts) as [_, post]}
  <a href="blog/{post.slug}">{post.metadata.title}</a>
{/each}