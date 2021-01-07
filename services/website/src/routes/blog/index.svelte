<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`)
				.then(r => r.json());
	}
</script>

<script>
	import Preview from '../../components/blog-post/previews/index.svelte'

	export let posts

	const getCover = (post) => {
		return `blog-posts/${
				post.metadata.createdAt.split("T")[0]
		}-${post.metadata.slug}/cover-preview.jpg`
	}
</script>


{#each posts as post}
	<Preview {post}/>
{/each}


