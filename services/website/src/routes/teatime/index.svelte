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


{#each posts as post}
	<div class="mb20">
		<a href="blog/{post.metadata.slug}" class="flex">
			<div style="min-width: 12em; max-width: 12em;">
				<img
								src={getCover(post)}
								loading="lazy"
								alt="Cover picture for a blog post titled {post.metadata.title}" />
			</div>
			<div class="fw ml10">
				<h4>{post.metadata.title}</h4>
				<p class="mt5 text-gray-700">{post.metadata.summary}</p>
				<p class="mt5">
					{#each post.metadata.tags as t}
						<a href="/teatime/tags/{t}" class="mx3 text-gray-600">#{t}</a>
					{/each}
				</p>
			</div>
		</a>
	</div>
{/each}


