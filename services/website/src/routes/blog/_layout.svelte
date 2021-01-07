<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog/meta.json`)
				.then(r => r.json());
	}
</script>

<script>
	export let tags
	export let authors
	export let categories
</script>

<div class="max-w-screen-lg mx-auto">
	<div class="flex">
		<div class="w-full" style="padding: 1em">
			<slot></slot>
		</div>

		<div class="px-8 w-56 flex-shrink-0" style="min-width: 10rem">
			<h3 class="text-2xl">Category:</h3>
			<ul class="mb-20">
				{#each categories as t}
					<li class="leading-none mb-4">
						<a href="/blog/category/{t.slug}">
							<div class="pb-1">{t.name}</div>
							<div class="text-sm text-gray-600">{t.name_en}</div>
						</a>
					</li>
				{/each}
			</ul>

			<h3 class="text-2xl">Tag:</h3>
			<ul class="mb-20">
				{#each tags as t}
					<li><a href="/blog/tags/{t}">{t}</a></li>
				{/each}
			</ul>

			<h3 class="text-2xl">Archive:</h3>
			<ul class="mb-20">
				<li>..</li>
			</ul>

			<h3 class="text-2xl">Author:</h3>
			<ul class="mb-20">
				{#each authors as t}
					<li><a href="/blog/author/{t.slug}">{t.name}</a></li>
				{/each}
			</ul>
		</div>
	</div>
</div>