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

		<div style="padding: 1em; width: 20em">
			<h3>Category:</h3>
			<ul class="mb20">
				{#each categories as t}
					<li><a href="/teatime/category/{t}">{t}</a></li>
				{/each}
			</ul>

			<h3>Tag:</h3>
			<ul class="mb20">
				{#each tags as t}
					<li><a href="/teatime/tags/{t}">{t}</a></li>
				{/each}
			</ul>

			<h3>Archive:</h3>
			<ul class="mb20">
				<li>..</li>
			</ul>

			<h3>Author:</h3>
			<ul class="mb20">
				{#each authors as t}
					<li><a href="/teatime/author/{t}">{t}</a></li>
				{/each}
			</ul>
		</div>
	</div>
</div>