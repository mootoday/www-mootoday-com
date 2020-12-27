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

<div style="padding-top: 60px">
	<div class="flex">
		<div class="fw" style="padding: 1em">
			<slot></slot>
		</div>

		<div style="padding: 1em">
			<h5>Category:</h5>
			<ul class="mb10">
				{#each categories as t}
					<li><a href="/teatime/category/{t}">{t}</a></li>
				{/each}
			</ul>

			<h5>Tag:</h5>
			<ul class="mb10">
				{#each tags as t}
					<li><a href="/teatime/tags/{t}">{t}</a></li>
				{/each}
			</ul>

			<h5>Archive:</h5>
			<ul class="mb10">
				<li>..</li>
			</ul>

			<h5>Author:</h5>
			<ul class="mb10">
				{#each authors as t}
					<li><a href="/teatime/author/{t}">{t}</a></li>
				{/each}
			</ul>
		</div>
	</div>
</div>