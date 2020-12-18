<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`)
				.then(r => r.json());
	}
</script>

<script>
	export let posts

	const getCover = (post) => {
		return `blog-posts/${
				post.metadata.createdAt.split("T")[0]
		}-${post.metadata.slug}/cover-preview.jpg`
	}
</script>

<ul>
	{#each posts as post}
		<li style="margin-bottom: 20px">
			<a href="blog/{post.metadata.slug}">
				<img
								src={getCover(post)}
								loading="lazy"
								width="100"
								alt="Cover picture for a blog post titled {post.metadata.title}" />
				{post.metadata.title}
			</a>
		</li>
	{/each}
</ul>


