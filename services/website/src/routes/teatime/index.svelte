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
	<div class="mb-20">
		<a href="blog/{post.metadata.slug}" class="flex">
			<div class="flex-shrink-0 w-40">
				<img
								src={getCover(post)}
								loading="lazy"
								alt="Cover picture for a blog post titled {post.metadata.title}" />
			</div>
			<div class="fw ml-10">
				<h4 class="text-2xl mb-4">{post.metadata.title}</h4>
				<p class="mb-4 text-gray-700">{post.metadata.summary}</p>
				<p class="mb-4">
					{#each post.metadata.tags as t}
						<a href="/teatime/tags/{t}" class="tag">#{t}</a>
					{/each}
				</p>

				{#if post.metadata.category}
				<p class="mb-4">
					{#each post.metadata.category as t}
						<a href="/teatime/category/{t}" class="tag">#{t}</a>
					{/each}
				</p>
				{/if}

				<div class="flex items-center">
					<img class="block h-10 rounded-full flex-shrink-0" src="/images/profile-pic.jpg" alt="Woman's Face">
					<p class="text-black font-semibold ml-4">
						{post.metadata.author}
					</p>
				</div>
			</div>
		</a>
	</div>
{/each}


